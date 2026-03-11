/**
 * Migration runner — runs SQL migration files in /database/migrations in order.
 * Idempotent: tracks executed migrations in the `schema_migrations` table.
 */
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { getDb, closeDb } from './connection';

const MIGRATIONS_DIR = path.resolve(__dirname, '../../../../database/migrations');

async function migrate(): Promise<void> {
  const db = getDb();

  // Create migrations tracking table if not exists
  await db.execute(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      filename VARCHAR(255) NOT NULL UNIQUE,
      executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Get already-executed migrations
  const [rows] = await db.execute<mysql.RowDataPacket[]>(
    'SELECT filename FROM schema_migrations ORDER BY filename'
  );
  const executed = new Set(rows.map((r) => r['filename'] as string));

  // Read migration files in order
  if (!fs.existsSync(MIGRATIONS_DIR)) {
    console.log(`[migrate] No migrations directory found at ${MIGRATIONS_DIR}. Creating it.`);
    fs.mkdirSync(MIGRATIONS_DIR, { recursive: true });
  }

  const files = fs
    .readdirSync(MIGRATIONS_DIR)
    .filter((f) => f.endsWith('.sql'))
    .sort();

  if (files.length === 0) {
    console.log('[migrate] No migration files found. Done.');
    return;
  }

  let ran = 0;
  for (const file of files) {
    if (executed.has(file)) {
      console.log(`[migrate] ⏭  ${file} (already applied)`);
      continue;
    }

    const sql = fs.readFileSync(path.join(MIGRATIONS_DIR, file), 'utf-8');
    const statements = sql
      .split(';')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    console.log(`[migrate] ▶  ${file}`);
    for (const statement of statements) {
      await db.execute(statement);
    }

    await db.execute('INSERT INTO schema_migrations (filename) VALUES (?)', [file]);
    console.log(`[migrate] ✅ ${file}`);
    ran++;
  }

  console.log(`[migrate] Done. ${ran} migration(s) applied.`);
}

// Type import for RowDataPacket
import type mysql from 'mysql2/promise';

migrate()
  .catch((err: unknown) => {
    console.error('[migrate] ❌ Error:', err);
    process.exit(1);
  })
  .finally(() => closeDb());

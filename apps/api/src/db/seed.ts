/**
 * Seed runner — runs seed files in /database/seeds for dev data.
 * Run after migrate: npm run db:seed
 */
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { getDb, closeDb } from './connection';

const SEEDS_DIR = path.resolve(__dirname, '../../../../database/seeds');

async function seed(): Promise<void> {
  const db = getDb();

  if (!fs.existsSync(SEEDS_DIR)) {
    console.log(`[seed] No seeds directory at ${SEEDS_DIR}. Creating it.`);
    fs.mkdirSync(SEEDS_DIR, { recursive: true });
    return;
  }

  const files = fs
    .readdirSync(SEEDS_DIR)
    .filter((f) => f.endsWith('.sql'))
    .sort();

  for (const file of files) {
    const sql = fs.readFileSync(path.join(SEEDS_DIR, file), 'utf-8');
    const statements = sql
      .split(';')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    console.log(`[seed] ▶  ${file}`);
    for (const statement of statements) {
      await db.execute(statement);
    }
    console.log(`[seed] ✅ ${file}`);
  }

  console.log('[seed] Done.');
}

seed()
  .catch((err: unknown) => {
    console.error('[seed] ❌ Error:', err);
    process.exit(1);
  })
  .finally(() => closeDb());

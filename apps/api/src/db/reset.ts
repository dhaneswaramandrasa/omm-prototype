/**
 * Reset script — drops all tables, re-runs migrations + seeds.
 * DEV ONLY. Blocked in production.
 */
import 'dotenv/config';
import { getDb, closeDb } from './connection';
import { env } from '../config/env';

async function reset(): Promise<void> {
  if (env.NODE_ENV === 'production') {
    console.error('[reset] ❌ db:reset is blocked in production!');
    process.exit(1);
  }

  const db = getDb();
  console.log('[reset] Dropping all tables...');

  await db.execute('SET FOREIGN_KEY_CHECKS = 0');

  const [tables] = await db.execute<import('mysql2/promise').RowDataPacket[]>(
    `SELECT table_name FROM information_schema.tables WHERE table_schema = ?`,
    [env.MYSQL_DATABASE]
  );

  for (const { table_name } of tables) {
    await db.execute(`DROP TABLE IF EXISTS \`${String(table_name)}\``);
    console.log(`[reset] Dropped: ${String(table_name)}`);
  }

  await db.execute('SET FOREIGN_KEY_CHECKS = 1');
  console.log('[reset] All tables dropped. Run npm run db:migrate && npm run db:seed to restore.');
}

reset()
  .catch((err: unknown) => {
    console.error('[reset] ❌ Error:', err);
    process.exit(1);
  })
  .finally(() => closeDb());

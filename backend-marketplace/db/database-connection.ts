import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

await process.loadEnvFile();

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, {
	logger: true,
});

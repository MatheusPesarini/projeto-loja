import { defineConfig } from 'drizzle-kit';

await process.loadEnvFile();

export default defineConfig({
	out: './drizzle',
	schema: './db/schema.ts',
	dialect: 'postgresql',
	dbCredentials: {
		url: process.env.DATABASE_URL || '',
	},
	verbose: true,
	strict: true,
});

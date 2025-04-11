## Getting Started

First:

```bash
npm i
```

Create .env:
DATABASE_URL_WITH_SCHEMA=postgresql://user:password@localhost:5432/db-name?schema=public

Then Drizzle generate:

```bash
npx drizzle-kit generate
npx drizzle-kit push
```

To run the api server:

```bash
npm run api
```

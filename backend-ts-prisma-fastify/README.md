## Getting Started
First:
```bash
npm i
```

Create .env:
DATABASE_URL_WITH_SCHEMA=postgresql://user:password@localhost:5432/db-name?schema=public

Then Prisma migrate and generate:
```bash
npx prisma generate
npx prisma migrate dev
```

To run the api server:

```bash
npm run api
```

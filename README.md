Estrutura do projeto contém a pasta do Front-End feito em Next.JS e o Back-End feito em TypeScript, com PrismaORM e Fastify na criação de rotas

Primeiro precisa ser instalado as dependências nas duas pastas com:
```bash
npm i
```

E depois gerado o schema e seed no Back-End com o banco de dados PostgreSQl com o .env configurado:
```bash
npx prisma db generate
npm prisma db seed
```

Para rodar o Front-End use:

```bash
npm run dev
```

Para rodar o Back-End use: 

```bash
npm run api
```
FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm ci

COPY . .

RUN npx drizzle-kit generate || echo "No migrations to generate, skipping..."

EXPOSE 3001

CMD ["sh", "-c", "npx drizzle-kit push && npm run dev"]
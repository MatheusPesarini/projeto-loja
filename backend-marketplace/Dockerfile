FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm ci

COPY . .

RUN npx drizzle-kit generate || echo "No migrations to generate, skipping..."

RUN npm run build || echo "No build script, skipping..."

COPY start.sh ./
RUN chmod +x start.sh

EXPOSE 3001

CMD ["./start.sh"]
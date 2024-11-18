FROM node:lts-slim AS deps

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

FROM node:lts-slim AS build

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN npm run build && npm prune --production

FROM node:lts-slim AS runner

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules

COPY --from=build /app/dist ./dist

EXPOSE 4000

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]

FROM node:22-alpine AS base
WORKDIR /app

RUN npm i -g bun
COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile || bun install

COPY . .
EXPOSE 3000
CMD ["bun", "run", "start"]

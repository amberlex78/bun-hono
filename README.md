# Bun + Hono + React + Drizzle + Better Auth (Docker)

## Stack
- Server: Bun, Hono, Zod, Drizzle ORM, Better Auth
- Client: React + Vite (Bun), shadcn/ui-ready setup
- Infra: Postgres, Nginx, Docker Compose (base/dev/prod)

## Roles
- `regular`
- `admin`

## Routes
### Front
- `/` public page
- `/profile` protected page (`regular`, `admin`)

### Back
- `/admin` dashboard (`admin`)
- `/admin/user` user CRUD (`admin`)

## Structure
- `client/`
- `server/`
- `nginx/`

## Run (dev)
```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

## Run (prod-like)
```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
```

## What to finish next
- connect real Better Auth adapters/cookies
- run Drizzle migrations
- wire client auth state from `/auth/session`
- add shadcn/ui init and components

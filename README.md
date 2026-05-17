# Bun + Hono + React + Drizzle + Better Auth (Docker)

## Stack
- Server: Bun, Hono, Zod, Drizzle ORM, Better Auth (scaffold)
- Client: React 19, React Router 7, Vite 8
- Infra: PostgreSQL 17, Nginx 1.30.0-alpine, Docker Compose

## Roles
- `regular`
- `admin`

## Routes
Front:
- `/` public
- `/profile` protected (`regular`, `admin`)

Back:
- `/api/health`
- `/api/profile`
- `/api/admin` (`admin`)
- `/api/admin/user` CRUD (`admin`)

## Project Structure
- `client/` React app
- `server/` Hono API
- `nginx/` reverse proxy configs
- `docker-compose.yml` base services
- `docker-compose.dev.yml` dev overrides
- `docker-compose.prod.yml` prod-like overrides

## Compose Files Usage
- Base file (`docker-compose.yml`) contains common services/config.
- Dev file (`docker-compose.dev.yml`) adds live-dev behavior (volumes, `bun run dev`, dev nginx config/ports).
- Prod file (`docker-compose.prod.yml`) adds prod-like behavior (`restart`, `80:80`, env-based secrets).

Effective commands:
- Dev = `docker-compose.yml + docker-compose.dev.yml`
- Prod-like = `docker-compose.yml + docker-compose.prod.yml`

## Make Commands
- `make dev-up` start dev in background
- `make dev-build` rebuild and start dev
- `make dev-down` stop dev
- `make dev-logs s=server` stream logs (or all if `s` omitted)
- `make restart` restart dev
- `make prod-up` start prod-like in background
- `make prod-build` pull/build/start prod-like
- `make prod-down` stop prod-like
- `make prod-logs s=nginx` stream prod-like logs

## URLs (dev)
- Vite direct: `http://localhost:5173`
- Nginx entrypoint: `http://localhost:8080`
- API direct: `http://localhost:3000/api/health`
- API via nginx: `http://localhost:8080/api/health`

## Notes
- Dev containers run `bun install` only when required bins are missing:
  - server checks `node_modules/.bin/tsc`
  - client checks `node_modules/.bin/vite`
- If you changed PostgreSQL major version (e.g. 16 -> 17), old volume is incompatible. Remove the DB volume and start again.

## Next Steps
- Replace mock auth middleware with real Better Auth session/cookies + Drizzle adapter
- Add Drizzle migrations + seed admin user
- Initialize shadcn/ui components

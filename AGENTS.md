# Repository Guidelines

## Project Structure & Module Organization

This repo is a Docker-first monorepo with separate client and server apps.

- `client/`: React 19 + Vite frontend (`src/pages`, `src/components`, `src/lib`).
- `server/`: Bun + Hono API (`src/routes`, `src/middleware`, `src/db`, `src/auth`).
- `nginx/`: reverse-proxy configs for dev/prod.
- `docs/`: stack/setup notes.
- `docker-compose*.yml`, `Makefile`: local/dev/prod orchestration.

Use alias imports in client code: `@/* -> client/src/*`.

## Build, Test, and Development Commands

Prefer `make` targets from repo root:

- `make dev-up`: start full dev stack (client, server, db, nginx).
- `make dev-build`: rebuild selected/all services, then start.
- `make dev-down`: stop dev stack and remove orphans.
- `make dev-logs s=server`: tail logs (`s` optional: `client`, `server`, `nginx`, `db`).
- `make db-push`: apply Drizzle schema changes in dev.
- `make prod-up` / `make prod-build` / `make prod-down`: prod-like stack management.

App-level commands:

- `cd server && bun run dev` (API hot reload), `bun run check` (TypeScript check).
- `cd client && bun run dev`, `bun run build`, `bun run preview`.

## Coding Style & Naming Conventions

TypeScript is strict in both apps; keep code type-safe and avoid `any` unless justified.

- Indentation: 2 spaces.
- Components/pages: `PascalCase` file names (e.g., `ProfilePage.tsx`).
- Utilities/hooks/routes: `camelCase` or lower-case by role (e.g., `utils.ts`, `profile.ts`).
- Keep route handlers small; move shared logic to `lib/`, `middleware/`, or `db/` modules.

## Testing Guidelines

There is no test runner configured yet. Minimum quality gate today:

- `server`: `bun run check`
- `client`: `bun run build`

When adding tests, place them near source as `*.test.ts` / `*.test.tsx` and prioritize route logic, auth guards, and form validation flows.

## Commit & Pull Request Guidelines

Commit history follows Conventional Commits (`feat:`, `fix:`, `refactor:`, `docs:`, `chore:`). Keep subject lines imperative and scoped.

PRs should include:

- clear summary of behavior changes,
- linked issue/task,
- verification steps (commands run),
- screenshots/GIFs for UI changes,
- note of env/schema impacts (e.g., `make db-push`, new `.env` keys).

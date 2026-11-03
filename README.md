# Testers Republic

## Getting Started

Requires Node.js ^20.19.0 or >=22.12.0 and pnpm. Install dependencies:

```bash
pnpm install
```

Create `.env.local` with a local SQLite path if you plan to use the database:

```dotenv
DATABASE_URL=./database.local
```

Generate a Better Auth secret and add its output as `BETTER_AUTH_SECRET` in `.env.local`:

```bash
pnpm dlx @better-auth/cli secret
```

Initialize the local database if needed:

```bash
pnpm db:push
```

Start the app at `http://localhost:3000`:

```bash
pnpm dev
```

## Useful Commands

Build for production:

```bash
pnpm build
```

Preview the build locally:

```bash
pnpm preview
```

Check types:

```bash
pnpm exec tsc --noEmit
```

Lint and format specific files (replace the paths with files you changed):

```bash
pnpm exec biome check --write path/to/file.ts path/to/file.tsx
```

Generate a database migration, apply migrations, or open Drizzle Studio:

```bash
pnpm db:generate
```

```bash
pnpm db:migrate
```

```bash
pnpm db:studio
```

Add a shadcn component:

```bash
pnpm dlx shadcn@latest add button
```

There is no test script configured yet. Git hooks installed by `pnpm install` check staged files and validate Conventional Commit messages.

## Deploy

Deploys to Cloudflare Workers. Set the Worker name in `wrangler.jsonc`, then authenticate:

```bash
pnpm exec wrangler login
```

Set production secrets as needed (repeat for each secret):

```bash
pnpm exec wrangler secret put BETTER_AUTH_SECRET
```

Build and deploy:

```bash
pnpm deploy
```

The current database uses `better-sqlite3`, which is local-only. To use database features on Workers, migrate to a compatible database (such as D1) and configure its binding in `wrangler.jsonc` before deploying.

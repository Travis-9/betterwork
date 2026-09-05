# Betterwork

Betterwork is a bilingual, Suriname-first freelance marketplace. This repository currently contains the public pre-launch landing page and its Firebase-backed early-access flow.

## Local setup

Node.js 22 or newer is required by Firebase Admin 14.

1. Run `nvm use 23.6.1` on this workstation.
2. Install dependencies with `pnpm install`.
3. Copy `.env.example` to `.env.local` and provide Firebase Admin credentials.
4. Run `pnpm dev` and open `/nl` or `/en`.

Without Firebase credentials, the site remains fully usable for visual development, but waitlist submissions return a localized unavailable state.

## Commands

- `pnpm dev` starts the development server.
- `pnpm dev:turbo` starts the optional Turbopack server; the default uses Webpack because Turbopack currently loses Next.js package resolution with pnpm during HMR on Windows.
- `pnpm lint` runs ESLint.
- `pnpm typecheck` checks TypeScript.
- `pnpm test` runs the automated tests.
- `pnpm build` creates the production build.

## Firebase data

The `POST /api/waitlist` route writes server-side to `waitlistSignups`. Each normalized email address is hashed into a deterministic document ID so duplicate registrations do not create additional records. Firebase Admin credentials are never sent to the browser.
Travis

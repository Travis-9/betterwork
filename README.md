# Betterwork

Betterwork is a bilingual, Suriname-first freelance marketplace. This repository contains the public pre-launch landing page, Firebase-backed early access, and secure public account creation.

## Local setup

Node.js 22 or newer is required by Firebase Admin 14.

1. Run `nvm use 23.6.1` on this workstation.
2. Install dependencies with `pnpm install`.
3. Copy `.env.example` to `.env.local`, use the Betterwork Web SDK values, and provide Firebase Admin credentials.
4. Run `pnpm dev` and open `/nl` or `/en`.

Without Firebase Admin credentials, the public UI remains available, but waitlist persistence and server-session creation return a safe unavailable response.

## Commands

- `pnpm dev` starts the development server.
- `pnpm dev:turbo` starts the optional Turbopack server; the default uses Webpack because Turbopack currently loses Next.js package resolution with pnpm during HMR on Windows.
- `pnpm lint` runs ESLint.
- `pnpm typecheck` checks TypeScript.
- `pnpm test` runs the automated tests.
- `pnpm build` creates the production build.

## Firebase setup

In Firebase Console:

1. Enable **Email/Password** and **Google** under Authentication > Sign-in method.
2. Configure the Google provider support email.
3. Add `localhost` and the production hostname under Authentication > Settings > Authorized domains.
4. Create a service account and add its project ID, client email, and private key to server-only environment variables.
5. Restrict the Web API key in Google Cloud to the required Firebase APIs and approved website referrers.

The `NEXT_PUBLIC_FIREBASE_*` values identify the Firebase web project and are intentionally public. Authorization depends on Auth, server validation, and Firestore rules, not secrecy of the Web API key. Never prefix Admin credentials with `NEXT_PUBLIC_`.

Deploy deny-by-default client rules after authenticating the Firebase CLI:

```powershell
pnpm dlx firebase-tools deploy --only firestore:rules --project betterwork-7dbe6
```

## Firebase data

The `POST /api/waitlist` route writes server-side to `waitlistSignups`. Each normalized email address is hashed into a deterministic document ID so duplicate registrations do not create additional records. Firebase Admin credentials are never sent to the browser.

Authentication profile writes are also server-only. Profiles are stored at `users/{uid}` with identity, role, locale, provider, verification, and server timestamp fields. Browser Auth uses in-memory persistence; the authoritative login is the five-day `betterwork_session` httpOnly cookie.

Firebase Analytics initializes only in production, on supported browsers, and after explicit consent. The preference is stored locally under `betterwork.analytics-consent.v1`.

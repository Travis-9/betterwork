# Betterwork — Claude Code Guide

## Project snapshot

Betterwork is a bilingual, Suriname-first freelance marketplace. The current product is a public pre-launch landing page with:

- Dutch and English landing pages at `/nl` and `/en`.
- Public account creation and login with email/password or Google — this is also the single early-access entry point for clients and freelancers.
- Email verification, password reset, profile onboarding, and a basic account screen.
- A five-day server-side session cookie backed by Firebase Admin.
- Privacy copy and opt-in Firebase Analytics consent.

The marketplace itself is not implemented yet. The authenticated account currently communicates that projects, profiles, and messaging are coming with the marketplace launch.

This repository is already in an intentionally dirty/in-progress state in the shared workspace. Preserve unrelated changes when editing.

## Required repository instructions

Read `AGENTS.md` before changing application code. This project uses Next.js 16, and its local installation contains the authoritative guidance for this version under `node_modules/next/dist/docs/`. For any Next.js code change, consult the relevant local guide first, especially for routing, async request APIs, route handlers, proxy, and version-16 behavior.

Important Next.js 16 conventions used here:

- `src/proxy.ts` is the request proxy entrypoint; do not reintroduce a `middleware.ts` convention without checking the current docs.
- Dynamic route `params` are promises and must be awaited.
- Request APIs such as `headers()` and `cookies()` are async and must be awaited.
- `next lint` is removed in Next.js 16; use the repository's `pnpm lint` script.
- The root HTML element deliberately includes `data-scroll-behavior="smooth"` to retain the desired navigation behavior.

## Stack and runtime

- Next.js `16.2.12`, React `19.2.4`, TypeScript 5, and the App Router.
- Node.js 22 or newer is required by Firebase Admin 14. The workstation uses `nvm use 23.6.1`.
- pnpm `9.15.0` is declared in `package.json`.
- Tailwind CSS 4 is imported through `src/app/globals.css`, but most visual styling is authored as global CSS.
- Firebase Web SDK and Firebase Admin SDK.
- Zod 4 for server and client-facing validation schemas.
- Phosphor Icons for the visual icon family.
- Vitest 4 with Testing Library and jsdom/node test environments.

## Commands

```powershell
pnpm install
pnpm dev
pnpm dev:turbo
pnpm lint
pnpm typecheck
pnpm test
pnpm test:watch
pnpm build
pnpm start
```

Use `pnpm dev` by default. It runs `next dev --webpack`; this is intentional because Turbopack currently loses Next.js package resolution with pnpm during HMR on Windows. `pnpm dev:turbo` is available for experiments.

`pnpm build` does not replace linting in Next.js 16. Run `pnpm lint`, `pnpm typecheck`, and `pnpm test` explicitly.

## Repository layout

```text
src/
  app/                         App Router pages, layouts, and API route handlers
    [locale]/                  Dutch/English route segment
    api/auth/                  CSRF, session, current-user, and profile endpoints
    globals.css                Design tokens and responsive visual system
  components/                  Landing, auth, consent, and interactive client UI
  lib/                         i18n, Firebase, auth, and consent logic
  proxy.ts                     Locale request-header proxy
public/images/                 Hero and Paramaribo River imagery
design/                        Reference and implementation screenshots
design-qa.md                   Visual QA record and known verification status
firebase.json                  Firebase CLI Firestore rules configuration
firestore.rules                Deny-by-default Firestore rules
```

The `@/*` TypeScript path alias maps to `src/*`.

## Routing and localization

### Public routes

- `/` redirects to `/nl`.
- `/nl` and `/en` render the localized landing page.
- `/{locale}/login` renders login.
- `/{locale}/signup` renders account creation.
- `/{locale}/forgot-password` renders password reset.
- `/{locale}/verify-email` handles post-signup email verification.
- `/{locale}/onboarding` completes the profile for a newly authenticated user.
- `/{locale}/account` renders the authenticated account summary.
- `/{locale}/privacy` renders the localized privacy notice.

Every `[locale]` page must validate the segment with `isLocale()` and call `notFound()` for unsupported values. The landing page exposes `generateStaticParams()` for `nl` and `en` and generates localized metadata with canonical and language alternates.

`src/proxy.ts` derives `nl` or `en` from the first URL segment and adds `x-betterwork-locale` to the request headers. The root layout uses that header for the initial document language. `LocaleSync`, `SiteHeader`, and the locale layout also update `document.documentElement.lang` after client navigation so language switching does not leave stale document metadata.

Keep translated landing content in `src/lib/i18n.ts` and auth/privacy content in `src/lib/auth-copy.ts`. Do not scatter Dutch/English strings through components. The supported locales are the literal tuple `['nl', 'en']`; roles are `client` and `freelancer`.

Use `next/link` for page navigation and regular anchors for same-page sections such as `#talent`, `#work`, `#story`, and `#early-access`.

## Firebase and data flow

### Browser Firebase

`src/lib/firebase-client.ts` owns the browser Firebase singleton. It uses Firebase Auth with `inMemoryPersistence`; browser Auth is only the short-lived identity handoff. `prepareFirebaseAuth()` configures persistence once. Firebase Analytics is lazy-loaded only in production, only in supported browsers, and only after explicit consent.

Public browser configuration comes from `NEXT_PUBLIC_FIREBASE_*` variables. Those values identify the Firebase web project and are not secrets.

### Server Firebase

`src/lib/firebase-admin.ts` lazily initializes Firebase Admin from server-only variables:

- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`

Never expose Admin credentials to the browser and never prefix them with `NEXT_PUBLIC_`. The private key may contain escaped `\\n` sequences and is normalized before creating the Admin credential.

### Authentication

The client uses Firebase Auth for email/password and Google sign-in, then exchanges a fresh Firebase ID token for a server session through `createServerSession()`.

The session route requires:

1. Same-origin request validation.
2. A matching double-submit CSRF token from `/api/auth/csrf`.
3. A Zod-valid request body.
4. Firebase Admin ID-token verification with revocation checking.
5. A recent `auth_time` (five-minute window, with a small clock-skew allowance).

Verified email is required for password accounts; Google sign-in is treated as verified. Successful exchange creates the five-day `betterwork_session` httpOnly, same-site cookie. The browser Firebase user is then signed out. The authoritative authenticated state is the server cookie, not browser persistence.

User profiles are server-managed at `users/{uid}`. Stored fields include identity, display name, primary role, accumulated roles, locale, providers, email verification, and server timestamps. A user with no completed name/role is sent to onboarding; completed users go to the account page.

`DELETE /api/auth/session` clears the session cookie. `PATCH /api/auth/profile` updates a validated profile and requires the same-origin and CSRF checks. `GET /api/auth/me` reads the current server session.

### Firestore rules

`firestore.rules` intentionally denies all direct client reads and writes. Keep application data access server-side through Firebase Admin and do not weaken the rules without a specific security review.

## Environment setup

1. Use Node 22+; on this workstation, run `nvm use 23.6.1`.
2. Run `pnpm install`.
3. Copy `.env.example` to `.env.local`.
4. Fill in the Firebase Web SDK values and server-only Firebase Admin credentials.
5. Start with `pnpm dev` and open `/nl` or `/en`.

Without Firebase Admin credentials, the public UI still renders, but server-session creation returns safe unavailable/configuration responses. Do not treat this mode as proof that live Firestore persistence works.

The current Firebase project used in the documented deployment command is `betterwork-7dbe6`. `firebase-tools` is a tracked devDependency, so authenticate and deploy the deny-by-default rules with:

```powershell
pnpm exec firebase login
pnpm exec firebase deploy --only firestore:rules --project betterwork-7dbe6
```

Firebase Console setup requires Email/Password and Google providers, a Google support email, authorized local/production domains, and a service account. Restrict the Web API key in Google Cloud to the required Firebase APIs and approved referrers.

## Component and code conventions

- Default to Server Components. Add `"use client"` only for state, effects, browser APIs, Firebase browser Auth, or event handlers.
- Keep server-only modules protected with `import "server-only"` where appropriate; never import Firebase Admin into a client component.
- Keep API route handlers on `runtime = "nodejs"` because they use Firebase Admin and Node APIs.
- Use `next/image` for local imagery and `next/font/google` for the Manrope/Fraunces font pair.
- Use Phosphor icons consistently. Use `@phosphor-icons/react/dist/ssr` for server-rendered components and the client package for interactive client components.
- Preserve semantic labels, `aria-live`/`role="alert"` status messaging, visible `:focus-visible` styles, practical mobile tap targets, alt text, and reduced-motion behavior.
- Prefer existing shared styles and design tokens in `src/app/globals.css` over introducing one-off styling systems.
- Preserve the intentional visual language: warm paper background, rainforest green, mint, sky blue, restrained Suriname red, Fraunces display type, Manrope body type, and limited glass treatment on navigation/forms/panels.
- Keep form limits and validation aligned between HTML attributes and Zod schemas.
- Avoid logging credentials, ID tokens, session cookies, private keys, or full user records.

## Design and responsive behavior

The landing page follows the selected Option 3 composition:

- Split desktop hero with editorial three-line headline.
- Collaboration image on the right, closing out the split hero.
- Trust section with four value propositions.
- Two audience paths: clients and freelancers.
- Origin-story section with Paramaribo River imagery.
- Dark forest footer with product and legal links.
- Mobile navigation, stacked CTAs, responsive cards, and a localized consent banner.

Responsive breakpoints in the global stylesheet cover desktop, tablet (`900px`/`1120px`), and mobile (`680px`). Check `/nl` at desktop, tablet, and mobile widths after substantial visual changes. Reference images and implementation captures live under `design/`; `design-qa.md` records the last QA pass.

## Testing and verification

Tests are colocated with the implementation. Current coverage includes:

- Auth validation, same-origin/CSRF checks, stale-token rejection, verification requirement, session cookie creation/clearing, and profile flow.
- Auth form email login, signup, password reset, Google onboarding routing, and localized errors.
- Firebase browser singleton and in-memory persistence setup.
- Analytics consent storage and banner behavior.

Before handing off a code change, run the narrowest relevant test first, then:

```powershell
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

The last recorded design QA pass reported all four checks passing, with 3 test files and 10 tests at that time. Live Firestore persistence was credential-dependent and not claimed as verified. The recorded dependency audit found no critical/high findings and six moderate findings inherited from Firebase Admin's Google Cloud Storage dependency; the app imports Firestore only.

## Known product boundaries

- This is a pre-launch surface, not the marketplace implementation.
- Header login/account state is real; most product navigation is still anchored to landing-page sections.
- Payment options are described as planned local options (bank transfer, Mopé, Uni5Pay). Do not claim escrow or automated settlement.
- The legal footer currently links to Privacy; the Terms label is present as copy but does not have a dedicated route yet.
- Analytics must remain consent-gated and production-only.
- Keep user-facing error responses generic while logging unexpected server errors only on the server.

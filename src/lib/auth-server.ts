import "server-only";

import type { DecodedIdToken } from "firebase-admin/auth";
import { FieldValue } from "firebase-admin/firestore";
import { cookies } from "next/headers";
import type { AuthRole, BetterworkUser, SignupProfile } from "@/lib/auth";
import { getFirebaseAdminAuth, getFirebaseDb } from "@/lib/firebase-admin";
import { isLocale, type Locale } from "@/lib/i18n";

export const SESSION_COOKIE_NAME = "betterwork_session";
export const CSRF_COOKIE_NAME = "betterwork_csrf";
export const SESSION_DURATION_MS = 5 * 24 * 60 * 60 * 1000;

type StoredUser = Omit<BetterworkUser, "uid" | "profileComplete">;

function providerIds(token: DecodedIdToken) {
  const identities = token.firebase?.identities;
  const providers = identities ? Object.keys(identities) : [];
  const signInProvider = token.firebase?.sign_in_provider;

  if (signInProvider && signInProvider !== "custom") {
    providers.push(signInProvider);
  }

  return [...new Set(providers)];
}

function toPublicUser(uid: string, data: Partial<StoredUser>): BetterworkUser {
  const storedLocale = data.locale;
  const primaryRole =
    data.primaryRole === "client" || data.primaryRole === "freelancer"
      ? data.primaryRole
      : null;
  const roles = Array.isArray(data.roles)
    ? data.roles.filter(
        (role): role is AuthRole => role === "client" || role === "freelancer",
      )
    : [];

  return {
    uid,
    email: typeof data.email === "string" ? data.email : "",
    displayName: typeof data.displayName === "string" ? data.displayName : "",
    photoURL: typeof data.photoURL === "string" ? data.photoURL : null,
    primaryRole,
    roles,
    locale: storedLocale && isLocale(storedLocale) ? storedLocale : "nl",
    providers: Array.isArray(data.providers) ? data.providers : [],
    emailVerified: data.emailVerified === true,
    profileComplete: Boolean(data.displayName && primaryRole),
  };
}

export function isVerifiedToken(token: DecodedIdToken) {
  return (
    token.email_verified === true ||
    token.firebase?.sign_in_provider === "google.com"
  );
}

export async function upsertUserFromToken(
  token: DecodedIdToken,
  profile?: SignupProfile,
) {
  const db = getFirebaseDb();
  const reference = db.collection("users").doc(token.uid);
  const verified = isVerifiedToken(token);

  await db.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(reference);
    const current = snapshot.data() as Partial<StoredUser> | undefined;
    const primaryRole = profile?.primaryRole ?? current?.primaryRole ?? null;
    const roles = primaryRole
      ? [...new Set([...(current?.roles ?? []), primaryRole])]
      : current?.roles ?? [];

    transaction.set(
      reference,
      {
        email: (token.email ?? current?.email ?? "").trim().toLowerCase(),
        displayName:
          profile?.displayName ?? token.name ?? current?.displayName ?? "",
        photoURL: token.picture ?? current?.photoURL ?? null,
        primaryRole,
        roles,
        locale: profile?.locale ?? current?.locale ?? "nl",
        providers: [...new Set([...(current?.providers ?? []), ...providerIds(token)])],
        emailVerified: verified,
        ...(snapshot.exists ? {} : { createdAt: FieldValue.serverTimestamp() }),
        updatedAt: FieldValue.serverTimestamp(),
        lastLoginAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );
  });

  const user = await getUserProfile(token.uid);
  if (!user) throw new Error("User profile was not created.");
  return user;
}

export async function getUserProfile(uid: string) {
  const snapshot = await getFirebaseDb().collection("users").doc(uid).get();
  return snapshot.exists
    ? toPublicUser(uid, snapshot.data() as Partial<StoredUser>)
    : null;
}

export async function updateUserProfile(uid: string, profile: SignupProfile) {
  const reference = getFirebaseDb().collection("users").doc(uid);
  await reference.set(
    {
      displayName: profile.displayName,
      primaryRole: profile.primaryRole,
      roles: FieldValue.arrayUnion(profile.primaryRole),
      locale: profile.locale,
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true },
  );
  return getUserProfile(uid);
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionCookie) return null;

  try {
    const token = await getFirebaseAdminAuth().verifySessionCookie(
      sessionCookie,
      true,
    );
    return getUserProfile(token.uid);
  } catch {
    return null;
  }
}

export function localeForUser(user: BetterworkUser | null, fallback: Locale) {
  return user?.locale ?? fallback;
}

"use client";

import type { User } from "firebase/auth";
import { signOut } from "firebase/auth";
import type {
  BetterworkUser,
  SessionApiResponse,
  SignupProfile,
} from "@/lib/auth";
import { getFirebaseAuth } from "@/lib/firebase-client";
import type { Locale } from "@/lib/i18n";

async function getCsrfToken() {
  const response = await fetch("/api/auth/csrf", {
    cache: "no-store",
    credentials: "same-origin",
  });
  if (!response.ok) throw new Error("csrf_failed");
  const data = (await response.json()) as { token?: string };
  if (!data.token) throw new Error("csrf_failed");
  return data.token;
}

export async function createServerSession(
  user: User,
  profile?: SignupProfile,
) {
  const [csrfToken, idToken] = await Promise.all([
    getCsrfToken(),
    user.getIdToken(true),
  ]);
  const response = await fetch("/api/auth/session", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "content-type": "application/json",
      "x-csrf-token": csrfToken,
    },
    body: JSON.stringify({ idToken, profile }),
  });
  const data = (await response.json()) as SessionApiResponse;

  if (data.status === "authenticated" || data.status === "profile_required") {
    await signOut(getFirebaseAuth());
  }

  return data;
}

export async function deleteServerSession() {
  const csrfToken = await getCsrfToken();
  const response = await fetch("/api/auth/session", {
    method: "DELETE",
    credentials: "same-origin",
    headers: { "x-csrf-token": csrfToken },
  });
  if (!response.ok) throw new Error("signout_failed");
}

export async function updateServerProfile(profile: SignupProfile) {
  const csrfToken = await getCsrfToken();
  const response = await fetch("/api/auth/profile", {
    method: "PATCH",
    credentials: "same-origin",
    headers: {
      "content-type": "application/json",
      "x-csrf-token": csrfToken,
    },
    body: JSON.stringify(profile),
  });
  if (!response.ok) throw new Error("profile_failed");
  return (await response.json()) as {
    status: "updated";
    user: BetterworkUser;
  };
}

const firebaseErrors: Record<Locale, Record<string, string>> = {
  nl: {
    "auth/email-already-in-use": "Er bestaat al een account met dit e-mailadres.",
    "auth/invalid-credential": "Het e-mailadres of wachtwoord is niet juist.",
    "auth/invalid-email": "Vul een geldig e-mailadres in.",
    "auth/popup-closed-by-user": "Het Google-venster werd gesloten voordat je klaar was.",
    "auth/popup-blocked": "Sta pop-ups toe om met Google in te loggen.",
    "auth/too-many-requests": "Te veel pogingen. Probeer het later opnieuw.",
    "auth/weak-password": "Kies een sterker wachtwoord van minimaal 8 tekens.",
    "auth/invalid-api-key": "De service is momenteel niet beschikbaar. Probeer het later opnieuw.",
    // Errors returned by our own /api/auth/session and /api/auth/profile routes.
    invalid_request: "Ongeldige aanvraag. Vernieuw de pagina en probeer het opnieuw.",
    invalid_origin: "De aanvraag is geweigerd om veiligheidsredenen. Vernieuw de pagina en probeer het opnieuw.",
    invalid_csrf: "Je sessie is verlopen. Vernieuw de pagina en probeer het opnieuw.",
    invalid_token: "Aanmelden is mislukt. Probeer het opnieuw.",
    stale_token: "Deze aanmelding is verlopen. Probeer het opnieuw.",
    unauthenticated: "Log opnieuw in om verder te gaan.",
    configuration_error: "De service is momenteel niet beschikbaar. Probeer het later opnieuw.",
    server_error: "Er ging iets mis op de server. Probeer het later opnieuw.",
    default: "Er ging iets mis. Probeer het opnieuw.",
  },
  en: {
    "auth/email-already-in-use": "An account already exists for this email address.",
    "auth/invalid-credential": "The email address or password is incorrect.",
    "auth/invalid-email": "Enter a valid email address.",
    "auth/popup-closed-by-user": "The Google window was closed before sign-in finished.",
    "auth/popup-blocked": "Allow pop-ups to continue with Google.",
    "auth/too-many-requests": "Too many attempts. Please try again later.",
    "auth/weak-password": "Choose a stronger password with at least 8 characters.",
    "auth/invalid-api-key": "The service is temporarily unavailable. Please try again later.",
    // Errors returned by our own /api/auth/session and /api/auth/profile routes.
    invalid_request: "Invalid request. Refresh the page and try again.",
    invalid_origin: "The request was blocked for security reasons. Refresh the page and try again.",
    invalid_csrf: "Your session expired. Refresh the page and try again.",
    invalid_token: "Sign-in failed. Please try again.",
    stale_token: "This sign-in expired. Please try again.",
    unauthenticated: "Please log in again to continue.",
    configuration_error: "The service is temporarily unavailable. Please try again later.",
    server_error: "Something went wrong on our end. Please try again later.",
    default: "Something went wrong. Please try again.",
  },
};

export function localizedAuthError(error: unknown, locale: Locale) {
  const code =
    typeof error === "object" && error && "code" in error
      ? String(error.code)
      : "default";
  return firebaseErrors[locale][code] ?? firebaseErrors[locale].default;
}

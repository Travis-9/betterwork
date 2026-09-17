import { z } from "zod";
import { locales, type Locale } from "@/lib/i18n";

export const authRoles = ["client", "freelancer"] as const;
export type AuthRole = (typeof authRoles)[number];

export const signupProfileSchema = z.object({
  displayName: z.string().trim().min(2).max(80),
  primaryRole: z.enum(authRoles),
  locale: z.enum(locales),
});

export type SignupProfile = z.infer<typeof signupProfileSchema>;

export const sessionRequestSchema = z.object({
  idToken: z.string().min(100).max(10000),
  profile: signupProfileSchema.optional(),
});

export const profileRequestSchema = signupProfileSchema;

export type BetterworkUser = {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string | null;
  primaryRole: AuthRole | null;
  roles: AuthRole[];
  locale: Locale;
  providers: string[];
  emailVerified: boolean;
  profileComplete: boolean;
};

export type AuthApiError =
  | "invalid_request"
  | "invalid_origin"
  | "invalid_csrf"
  | "invalid_token"
  | "stale_token"
  | "verification_required"
  | "unauthenticated"
  | "configuration_error"
  | "server_error";

export type SessionApiResponse =
  | { status: "authenticated"; user: BetterworkUser }
  | { status: "profile_required"; user: BetterworkUser }
  | { status: "verification_required" }
  | { status: "error"; error: AuthApiError };

export function isRecentAuthTime(
  authTime: number | undefined,
  nowSeconds = Math.floor(Date.now() / 1000),
  maximumAgeSeconds = 5 * 60,
) {
  return (
    typeof authTime === "number" &&
    authTime <= nowSeconds + 30 &&
    authTime >= nowSeconds - maximumAgeSeconds
  );
}

export function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return origin !== null && origin === new URL(request.url).origin;
}

export function hasValidCsrf(request: Request, cookieToken?: string) {
  const headerToken = request.headers.get("x-csrf-token");
  return Boolean(
    cookieToken &&
      headerToken &&
      cookieToken.length >= 32 &&
      cookieToken === headerToken,
  );
}

import { NextRequest, NextResponse } from "next/server";
import {
  hasValidCsrf,
  isRecentAuthTime,
  isSameOrigin,
  sessionRequestSchema,
  type SessionApiResponse,
} from "@/lib/auth";
import {
  CSRF_COOKIE_NAME,
  SESSION_COOKIE_NAME,
  SESSION_DURATION_MS,
  upsertUserFromToken,
} from "@/lib/auth-server";
import {
  FirebaseConfigurationError,
  getFirebaseAdminAuth,
} from "@/lib/firebase-admin";

export const runtime = "nodejs";

function errorResponse(
  error: Extract<SessionApiResponse, { status: "error" }>["error"],
  status: number,
) {
  return NextResponse.json<SessionApiResponse>(
    { status: "error", error },
    { status },
  );
}

function validateRequest(request: NextRequest) {
  if (!isSameOrigin(request)) return errorResponse("invalid_origin", 403);
  if (!hasValidCsrf(request, request.cookies.get(CSRF_COOKIE_NAME)?.value)) {
    return errorResponse("invalid_csrf", 403);
  }
  return null;
}

export async function POST(request: NextRequest) {
  const requestError = validateRequest(request);
  if (requestError) return requestError;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse("invalid_request", 400);
  }

  const parsed = sessionRequestSchema.safeParse(body);
  if (!parsed.success) return errorResponse("invalid_request", 400);

  try {
    const adminAuth = getFirebaseAdminAuth();
    const token = await adminAuth.verifyIdToken(parsed.data.idToken, true);

    if (!isRecentAuthTime(token.auth_time)) {
      return errorResponse("stale_token", 401);
    }

    const user = await upsertUserFromToken(token, parsed.data.profile);
    if (!user.emailVerified) {
      return NextResponse.json<SessionApiResponse>(
        { status: "verification_required" },
        { status: 403 },
      );
    }

    const sessionCookie = await adminAuth.createSessionCookie(
      parsed.data.idToken,
      { expiresIn: SESSION_DURATION_MS },
    );
    const response = NextResponse.json<SessionApiResponse>({
      status: user.profileComplete ? "authenticated" : "profile_required",
      user,
    });

    response.cookies.set(SESSION_COOKIE_NAME, sessionCookie, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: SESSION_DURATION_MS / 1000,
    });
    return response;
  } catch (error) {
    if (error instanceof FirebaseConfigurationError) {
      return errorResponse("configuration_error", 503);
    }

    const code =
      typeof error === "object" && error && "code" in error
        ? String(error.code)
        : "";
    if (code.startsWith("auth/")) return errorResponse("invalid_token", 401);

    console.error("Session creation failed", error);
    return errorResponse("server_error", 500);
  }
}

export async function DELETE(request: NextRequest) {
  const requestError = validateRequest(request);
  if (requestError) return requestError;

  const response = NextResponse.json({ status: "signed_out" });
  response.cookies.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return response;
}

import { NextRequest, NextResponse } from "next/server";
import {
  hasValidCsrf,
  isSameOrigin,
  profileRequestSchema,
} from "@/lib/auth";
import {
  CSRF_COOKIE_NAME,
  getCurrentUser,
  updateUserProfile,
} from "@/lib/auth-server";
import { FirebaseConfigurationError } from "@/lib/firebase-admin";

export const runtime = "nodejs";

export async function PATCH(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "invalid_origin" }, { status: 403 });
  }
  if (!hasValidCsrf(request, request.cookies.get(CSRF_COOKIE_NAME)?.value)) {
    return NextResponse.json({ error: "invalid_csrf" }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const parsed = profileRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
    }
    const updatedUser = await updateUserProfile(user.uid, parsed.data);
    return NextResponse.json({ status: "updated", user: updatedUser });
  } catch (error) {
    if (error instanceof FirebaseConfigurationError) {
      return NextResponse.json(
        { error: "configuration_error" },
        { status: 503 },
      );
    }
    console.error("Profile update failed", error);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

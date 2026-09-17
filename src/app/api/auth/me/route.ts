import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-server";
import { FirebaseConfigurationError } from "@/lib/firebase-admin";

export const runtime = "nodejs";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { status: "unauthenticated" },
        { status: 401 },
      );
    }
    return NextResponse.json({ status: "authenticated", user });
  } catch (error) {
    if (error instanceof FirebaseConfigurationError) {
      return NextResponse.json(
        { status: "configuration_error" },
        { status: 503 },
      );
    }
    console.error("Current-user lookup failed", error);
    return NextResponse.json({ status: "server_error" }, { status: 500 });
  }
}

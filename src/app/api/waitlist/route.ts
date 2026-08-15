import { NextResponse } from "next/server";
import { FirebaseConfigurationError } from "@/lib/firebase-admin";
import type { WaitlistApiResponse } from "@/lib/waitlist";
import { waitlistSchema } from "@/lib/waitlist";
import { saveWaitlistSignup } from "@/lib/waitlist-store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json<WaitlistApiResponse>(
      { status: "invalid" },
      { status: 400 },
    );
  }

  const parsed = waitlistSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json<WaitlistApiResponse>(
      { status: "invalid" },
      { status: 400 },
    );
  }

  try {
    const status = await saveWaitlistSignup(parsed.data);
    return NextResponse.json<WaitlistApiResponse>(
      { status },
      { status: status === "created" ? 201 : 200 },
    );
  } catch (error) {
    if (error instanceof FirebaseConfigurationError) {
      return NextResponse.json<WaitlistApiResponse>(
        { status: "unavailable" },
        { status: 503 },
      );
    }

    console.error("Waitlist submission failed", error);
    return NextResponse.json<WaitlistApiResponse>(
      { status: "error" },
      { status: 500 },
    );
  }
}

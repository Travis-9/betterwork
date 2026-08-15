import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const locale = request.nextUrl.pathname.split("/")[1] === "en" ? "en" : "nl";
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-betterwork-locale", locale);

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
};

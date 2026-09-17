import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  verifyIdToken: vi.fn(),
  createSessionCookie: vi.fn(),
  upsertUserFromToken: vi.fn(),
}));

vi.mock("@/lib/firebase-admin", () => ({
  FirebaseConfigurationError: class FirebaseConfigurationError extends Error {},
  getFirebaseAdminAuth: () => ({
    verifyIdToken: mocks.verifyIdToken,
    createSessionCookie: mocks.createSessionCookie,
  }),
}));

vi.mock("@/lib/auth-server", () => ({
  CSRF_COOKIE_NAME: "betterwork_csrf",
  SESSION_COOKIE_NAME: "betterwork_session",
  SESSION_DURATION_MS: 432000000,
  upsertUserFromToken: mocks.upsertUserFromToken,
}));

import { DELETE, POST } from "@/app/api/auth/session/route";

const csrf = "c".repeat(43);
const idToken = "t".repeat(200);
const user = {
  uid: "uid-1",
  email: "person@example.sr",
  displayName: "Person",
  photoURL: null,
  primaryRole: "client",
  roles: ["client"],
  locale: "nl",
  providers: ["password"],
  emailVerified: true,
  profileComplete: true,
};

function request(method = "POST", overrides: { origin?: string; csrfHeader?: string; csrfCookie?: string } = {}) {
  return new NextRequest("http://localhost/api/auth/session", {
    method,
    headers: {
      origin: overrides.origin ?? "http://localhost",
      "content-type": "application/json",
      "x-csrf-token": overrides.csrfHeader ?? csrf,
      cookie: `betterwork_csrf=${overrides.csrfCookie ?? csrf}`,
    },
    body: method === "POST" ? JSON.stringify({ idToken }) : undefined,
  });
}

describe("/api/auth/session", () => {
  beforeEach(() => {
    mocks.verifyIdToken.mockReset();
    mocks.createSessionCookie.mockReset();
    mocks.upsertUserFromToken.mockReset();
    mocks.verifyIdToken.mockResolvedValue({ uid: "uid-1", auth_time: Math.floor(Date.now() / 1000), email_verified: true, firebase: { sign_in_provider: "password" } });
    mocks.upsertUserFromToken.mockResolvedValue(user);
    mocks.createSessionCookie.mockResolvedValue("signed-session");
  });

  it("rejects cross-origin and invalid CSRF requests", async () => {
    expect((await POST(request("POST", { origin: "https://evil.example" }))).status).toBe(403);
    expect((await POST(request("POST", { csrfCookie: "x".repeat(43) }))).status).toBe(403);
    expect(mocks.verifyIdToken).not.toHaveBeenCalled();
  });

  it("rejects stale ID tokens", async () => {
    mocks.verifyIdToken.mockResolvedValue({ uid: "uid-1", auth_time: 1 });
    const response = await POST(request());
    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toMatchObject({ error: "stale_token" });
  });

  it("requires verification before setting a session", async () => {
    mocks.upsertUserFromToken.mockResolvedValue({ ...user, emailVerified: false });
    const response = await POST(request());
    expect(response.status).toBe(403);
    expect(response.headers.get("set-cookie")).toBeNull();
  });

  it("sets and clears the five-day server cookie", async () => {
    const created = await POST(request());
    expect(created.status).toBe(200);
    expect(created.headers.get("set-cookie")).toContain("betterwork_session=signed-session");
    expect(created.headers.get("set-cookie")).toContain("HttpOnly");

    const cleared = await DELETE(request("DELETE"));
    expect(cleared.headers.get("set-cookie")).toContain("betterwork_session=");
    expect(cleared.headers.get("set-cookie")).toContain("Max-Age=0");
  });
});

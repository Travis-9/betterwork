import { describe, expect, it } from "vitest";
import {
  hasValidCsrf,
  isRecentAuthTime,
  isSameOrigin,
  sessionRequestSchema,
  signupProfileSchema,
} from "@/lib/auth";

describe("authentication validation", () => {
  it("accepts a valid bilingual signup profile", () => {
    expect(signupProfileSchema.parse({ displayName: "Amara Pinas", primaryRole: "freelancer", locale: "nl" })).toEqual({ displayName: "Amara Pinas", primaryRole: "freelancer", locale: "nl" });
  });

  it("rejects unsupported roles and oversized names", () => {
    expect(signupProfileSchema.safeParse({ displayName: "A".repeat(81), primaryRole: "admin", locale: "en" }).success).toBe(false);
  });

  it("requires a substantial ID token", () => {
    expect(sessionRequestSchema.safeParse({ idToken: "short" }).success).toBe(false);
  });

  it("only accepts recent authentication times", () => {
    expect(isRecentAuthTime(990, 1000)).toBe(true);
    expect(isRecentAuthTime(600, 1000)).toBe(false);
    expect(isRecentAuthTime(1100, 1000)).toBe(false);
  });

  it("validates same-origin and double-submit CSRF tokens", () => {
    const token = "a".repeat(43);
    const request = new Request("https://betterwork.sr/api/auth/session", { headers: { origin: "https://betterwork.sr", "x-csrf-token": token } });
    expect(isSameOrigin(request)).toBe(true);
    expect(hasValidCsrf(request, token)).toBe(true);
    expect(hasValidCsrf(request, "b".repeat(43))).toBe(false);
  });
});

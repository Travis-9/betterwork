import { beforeEach, describe, expect, it, vi } from "vitest";
import { FirebaseConfigurationError } from "@/lib/firebase-admin";

const mocks = vi.hoisted(() => ({
  saveWaitlistSignup: vi.fn(),
}));

vi.mock("@/lib/waitlist-store", () => ({
  saveWaitlistSignup: mocks.saveWaitlistSignup,
}));

import { POST } from "@/app/api/waitlist/route";

const submission = {
  email: "person@example.sr",
  role: "client",
  projectSummary: "I need a new website for my local business.",
  locale: "en",
  company: "",
};

function requestWith(body: unknown) {
  return new Request("http://localhost/api/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/waitlist", () => {
  beforeEach(() => {
    mocks.saveWaitlistSignup.mockReset();
  });

  it("creates a valid signup", async () => {
    mocks.saveWaitlistSignup.mockResolvedValue("created");
    const response = await POST(requestWith(submission));
    expect(response.status).toBe(201);
    await expect(response.json()).resolves.toEqual({ status: "created" });
  });

  it("returns duplicate without creating another record", async () => {
    mocks.saveWaitlistSignup.mockResolvedValue("duplicate");
    const response = await POST(requestWith(submission));
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ status: "duplicate" });
  });

  it("rejects invalid and honeypot submissions", async () => {
    const response = await POST(requestWith({ ...submission, company: "Bot Inc" }));
    expect(response.status).toBe(400);
    expect(mocks.saveWaitlistSignup).not.toHaveBeenCalled();
  });

  it("reports missing Firebase configuration", async () => {
    mocks.saveWaitlistSignup.mockRejectedValue(new FirebaseConfigurationError());
    const response = await POST(requestWith(submission));
    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({ status: "unavailable" });
  });

  it("does not expose unexpected server errors", async () => {
    mocks.saveWaitlistSignup.mockRejectedValue(new Error("private details"));
    const response = await POST(requestWith(submission));
    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({ status: "error" });
  });
});

// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  initializeApp: vi.fn(() => ({ name: "app" })),
  getAuth: vi.fn(() => ({ name: "auth" })),
  setPersistence: vi.fn(async () => undefined),
}));

vi.mock("firebase/app", () => ({
  getApps: () => [],
  getApp: vi.fn(),
  initializeApp: mocks.initializeApp,
}));
vi.mock("firebase/auth", () => ({
  getAuth: mocks.getAuth,
  inMemoryPersistence: { type: "NONE" },
  setPersistence: mocks.setPersistence,
}));

describe("Firebase browser singleton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  it("does not touch Firebase at import time so SSR cannot fail on missing config", async () => {
    await import("@/lib/firebase-client");
    expect(mocks.initializeApp).not.toHaveBeenCalled();
    expect(mocks.getAuth).not.toHaveBeenCalled();
  });

  it("initializes one app and configures in-memory auth once", async () => {
    const client = await import("@/lib/firebase-client");
    await client.prepareFirebaseAuth();
    await client.prepareFirebaseAuth();
    expect(mocks.initializeApp).toHaveBeenCalledOnce();
    expect(mocks.getAuth).toHaveBeenCalledOnce();
    expect(mocks.setPersistence).toHaveBeenCalledOnce();
  });
});

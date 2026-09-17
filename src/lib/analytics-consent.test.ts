import { describe, expect, it, vi } from "vitest";
import { ANALYTICS_CONSENT_KEY, readAnalyticsConsent, saveAnalyticsConsent } from "@/lib/analytics-consent";

describe("analytics consent", () => {
  it("ignores unknown stored values", () => {
    expect(readAnalyticsConsent({ getItem: () => "legacy" })).toBeNull();
  });

  it("persists an explicit preference", () => {
    const setItem = vi.fn();
    saveAnalyticsConsent({ setItem }, "granted");
    expect(setItem).toHaveBeenCalledWith(ANALYTICS_CONSENT_KEY, "granted");
  });
});

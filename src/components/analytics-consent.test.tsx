// @vitest-environment jsdom

import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AnalyticsConsent } from "@/components/analytics-consent";
import { ANALYTICS_CONSENT_KEY } from "@/lib/analytics-consent";
import { authCopy } from "@/lib/auth-copy";

vi.mock("@/lib/firebase-client", () => ({ enableFirebaseAnalytics: vi.fn() }));

describe("AnalyticsConsent", () => {
  beforeEach(() => window.localStorage.clear());

  it("stores a decline choice and dismisses the banner", () => {
    render(<AnalyticsConsent locale="en" />);
    fireEvent.click(screen.getByRole("button", { name: authCopy.en.consent.decline }));
    expect(window.localStorage.getItem(ANALYTICS_CONSENT_KEY)).toBe("denied");
    expect(screen.queryByText(authCopy.en.consent.title)).not.toBeInTheDocument();
  });

  it("preserves the localized privacy route", () => {
    render(<AnalyticsConsent locale="nl" />);
    expect(screen.getByRole("link", { name: authCopy.nl.consent.privacy })).toHaveAttribute("href", "/nl/privacy");
  });
});

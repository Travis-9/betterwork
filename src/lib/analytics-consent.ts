export type AnalyticsConsentValue = "granted" | "denied";

export const ANALYTICS_CONSENT_KEY = "betterwork.analytics-consent.v1";

export function readAnalyticsConsent(storage: Pick<Storage, "getItem">) {
  const value = storage.getItem(ANALYTICS_CONSENT_KEY);
  return value === "granted" || value === "denied" ? value : null;
}

export function saveAnalyticsConsent(
  storage: Pick<Storage, "setItem">,
  value: AnalyticsConsentValue,
) {
  storage.setItem(ANALYTICS_CONSENT_KEY, value);
}

"use client";

import Link from "next/link";
import { useEffect, useSyncExternalStore } from "react";
import { readAnalyticsConsent, saveAnalyticsConsent, type AnalyticsConsentValue } from "@/lib/analytics-consent";
import { authCopy } from "@/lib/auth-copy";
import { enableFirebaseAnalytics } from "@/lib/firebase-client";
import type { Locale } from "@/lib/i18n";

export function AnalyticsConsent({ locale }: { locale: Locale }) {
  const copy = authCopy[locale].consent;
  const consent = useSyncExternalStore(
    (onChange) => {
      window.addEventListener("storage", onChange);
      window.addEventListener("betterwork-consent-change", onChange);
      return () => {
        window.removeEventListener("storage", onChange);
        window.removeEventListener("betterwork-consent-change", onChange);
      };
    },
    () => readAnalyticsConsent(window.localStorage) ?? "unset",
    () => "loading",
  );

  useEffect(() => {
    if (consent === "granted") void enableFirebaseAnalytics();
  }, [consent]);

  function choose(value: AnalyticsConsentValue) {
    saveAnalyticsConsent(window.localStorage, value);
    window.dispatchEvent(new Event("betterwork-consent-change"));
    if (value === "granted") void enableFirebaseAnalytics();
  }

  if (consent !== "unset") return null;

  return (
    <aside className="consent-banner glass-panel" aria-labelledby="consent-title">
      <div><strong id="consent-title">{copy.title}</strong><p>{copy.body}</p><Link href={`/${locale}/privacy`}>{copy.privacy}</Link></div>
      <div className="consent-actions"><button type="button" className="consent-secondary" onClick={() => choose("denied")}>{copy.decline}</button><button type="button" className="consent-primary" onClick={() => choose("granted")}>{copy.accept}</button></div>
    </aside>
  );
}

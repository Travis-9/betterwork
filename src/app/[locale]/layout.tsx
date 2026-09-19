import { notFound } from "next/navigation";
import { AnalyticsConsent } from "@/components/analytics-consent";
import { LocaleSync } from "@/components/locale-sync";
import { copy, isLocale } from "@/lib/i18n";
import { SiteHeader } from "@/components/site-header";
import { getCurrentUser } from "@/lib/auth-server";

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const user = await getCurrentUser();

  return (
    <>
      <LocaleSync locale={locale} />
      <SiteHeader locale={locale} copy={copy[locale].header} authenticated={Boolean(user)} />
      {children}
      <AnalyticsConsent locale={locale} />
    </>
  );
}

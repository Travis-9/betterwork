import { notFound } from "next/navigation";
import { AnalyticsConsent } from "@/components/analytics-consent";
import { LocaleSync } from "@/components/locale-sync";
import { isLocale } from "@/lib/i18n";
import { SiteHeader } from "@/components/site-header";

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <LocaleSync locale={locale} />
      <SiteHeader/>
      {children}
      <AnalyticsConsent locale={locale} />
    </>
  );
}

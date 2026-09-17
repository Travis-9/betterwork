import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPage } from "@/components/landing-page";
import { getCurrentUser } from "@/lib/auth-server";
import { copy, isLocale, locales } from "@/lib/i18n";

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  return {
    title: copy[locale].metadata.title,
    description: copy[locale].metadata.description,
    alternates: {
      canonical: `/${locale}`,
      languages: { nl: "/nl", en: "/en" },
    },
  };
}

export default async function LocalePage({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const user = await getCurrentUser();
  return <LandingPage locale={locale} copy={copy[locale]} authenticated={Boolean(user)} />;
}

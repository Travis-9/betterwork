import { notFound } from "next/navigation";
import { AboutPage } from "@/components/about-page";
import { isLocale } from "@/lib/i18n";

export default async function LocalizedAboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <AboutPage />;
}
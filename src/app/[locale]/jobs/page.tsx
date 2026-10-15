import { notFound } from "next/navigation";
import { JobsPage } from "@/components/jobs-page";
import { isLocale } from "@/lib/i18n";

export default async function LocalizedJobsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <JobsPage locale={locale} showHeader={false} />;
}
import { notFound } from "next/navigation";
import { FreelancersPage } from "@/components/freelancers-page";
import { isLocale } from "@/lib/i18n";

export default async function LocalizedFreelancersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <FreelancersPage locale={locale} showHeader={false} />;
}
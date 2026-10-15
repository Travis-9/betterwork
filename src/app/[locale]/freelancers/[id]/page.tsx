import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FreelancerDetailPage } from "@/components/freelancer-detail-page";
import { freelancers } from "@/lib/freelancers";
import { isLocale } from "@/lib/i18n";

type RouteProps = { params: Promise<{ locale: string; id: string }> };

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { locale, id } = await params;
  if (!isLocale(locale)) return {};
  const freelancer = freelancers.find((candidate) => candidate.id === id);
  return freelancer ? { title: { absolute: `${freelancer.name} | Betterwork` }, description: freelancer.description } : {};
}

export default async function FreelancerDetailRoute({ params }: RouteProps) {
  const { locale, id } = await params;
  if (!isLocale(locale)) notFound();
  const freelancer = freelancers.find((candidate) => candidate.id === id);
  if (!freelancer) notFound();
  return <FreelancerDetailPage freelancer={freelancer} locale={locale} />;
}
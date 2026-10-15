import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JobDetailPage } from "@/components/job-detail-page";
import { getJobById } from "@/lib/jobs";
import { isLocale } from "@/lib/i18n";

type RouteProps = { params: Promise<{ locale: string; id: string }> };

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { locale, id } = await params;
  if (!isLocale(locale)) return {};
  const job = getJobById(id);
  return job ? { title: { absolute: `${job.title} | Betterwork` }, description: job.description } : {};
}

export default async function JobDetailRoute({ params }: RouteProps) {
  const { locale, id } = await params;
  if (!isLocale(locale)) notFound();
  const job = getJobById(id);
  if (!job) notFound();
  return <JobDetailPage job={job} locale={locale} />;
}
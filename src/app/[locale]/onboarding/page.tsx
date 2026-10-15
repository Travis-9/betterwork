import { notFound, redirect } from "next/navigation";
import { AuthShell } from "@/components/auth-shell";
import { OnboardingForm } from "@/components/onboarding-form";
import { getCurrentUser } from "@/lib/auth-server";
import { authCopy } from "@/lib/auth-copy";
import { isLocale } from "@/lib/i18n";

export default async function OnboardingPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ next?: string }> }) {
  const { locale } = await params;
  const { next } = await searchParams;
  if (!isLocale(locale)) notFound();
  const user = await getCurrentUser();
  if (!user) redirect(`/${locale}/login`);
  if (user.profileComplete) redirect(`/${locale}/account`);
  const text = authCopy[locale];
  const nextPath = next?.startsWith(`/${locale}/`) && !next.startsWith("//") ? next : undefined;
  return <AuthShell locale={locale} route="onboarding" eyebrow={text.onboarding.eyebrow} title={text.onboarding.title} body={text.onboarding.body} backLabel={text.common.backHome}><OnboardingForm locale={locale} copy={text} initialName={user.displayName} nextPath={nextPath} /></AuthShell>;
}

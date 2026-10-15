import { notFound, redirect } from "next/navigation";
import { AuthForm } from "@/components/auth-form";
import { AuthShell } from "@/components/auth-shell";
import { getCurrentUser } from "@/lib/auth-server";
import { authCopy } from "@/lib/auth-copy";
import { isLocale } from "@/lib/i18n";

export default async function SignupPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ next?: string }> }) {
  const { locale } = await params;
  const { next } = await searchParams;
  if (!isLocale(locale)) notFound();
  const user = await getCurrentUser();
  if (user?.profileComplete) redirect(`/${locale}/account`);
  const text = authCopy[locale];
  const nextPath = next?.startsWith(`/${locale}/`) && !next.startsWith("//") ? next : undefined;
  return <AuthShell locale={locale} route="signup" eyebrow={text.signup.eyebrow} title={text.signup.title} body={text.signup.body} backLabel={text.common.backHome}><AuthForm locale={locale} copy={text} mode="signup" nextPath={nextPath} /></AuthShell>;
}

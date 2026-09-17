import { notFound } from "next/navigation";
import { AuthShell } from "@/components/auth-shell";
import { VerifyEmailCard } from "@/components/verify-email-card";
import { authCopy } from "@/lib/auth-copy";
import { isLocale } from "@/lib/i18n";

export default async function VerifyEmailPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const text = authCopy[locale];
  return <AuthShell locale={locale} route="verify-email" eyebrow={text.verify.eyebrow} title={text.verify.title} body={text.verify.body} backLabel={text.common.backHome}><VerifyEmailCard locale={locale} copy={text} /></AuthShell>;
}

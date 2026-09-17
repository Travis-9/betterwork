import { notFound } from "next/navigation";
import { AuthForm } from "@/components/auth-form";
import { AuthShell } from "@/components/auth-shell";
import { authCopy } from "@/lib/auth-copy";
import { isLocale } from "@/lib/i18n";

export default async function ForgotPasswordPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const text = authCopy[locale];
  return <AuthShell locale={locale} route="forgot-password" eyebrow={text.forgot.eyebrow} title={text.forgot.title} body={text.forgot.body} backLabel={text.common.backHome}><AuthForm locale={locale} copy={text} mode="forgot" /></AuthShell>;
}

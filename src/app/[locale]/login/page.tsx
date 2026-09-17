import { notFound, redirect } from "next/navigation";
import { AuthForm } from "@/components/auth-form";
import { AuthShell } from "@/components/auth-shell";
import { getCurrentUser } from "@/lib/auth-server";
import { authCopy } from "@/lib/auth-copy";
import { isLocale } from "@/lib/i18n";

export default async function LoginPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const user = await getCurrentUser();
  if (user?.profileComplete) redirect(`/${locale}/account`);
  const text = authCopy[locale];
  return <AuthShell locale={locale} route="login" eyebrow={text.login.eyebrow} title={text.login.title} body={text.login.body} backLabel={text.common.backHome}><AuthForm locale={locale} copy={text} mode="login" /></AuthShell>;
}

import { CheckCircle, Clock, UserCircle } from "@phosphor-icons/react/dist/ssr";
import { notFound, redirect } from "next/navigation";
import { AuthShell } from "@/components/auth-shell";
import { LogoutButton } from "@/components/logout-button";
import { getCurrentUser } from "@/lib/auth-server";
import { authCopy } from "@/lib/auth-copy";
import { isLocale } from "@/lib/i18n";

export default async function AccountPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const user = await getCurrentUser();
  if (!user) redirect(`/${locale}/login`);
  if (!user.profileComplete) redirect(`/${locale}/onboarding`);
  const text = authCopy[locale];
  const roleLabel = user.primaryRole === "client" ? text.common.client : text.common.freelancer;
  return (
    <AuthShell locale={locale} route="account" eyebrow={text.account.eyebrow} title={`${text.account.title}, ${user.displayName.split(" ")[0]}.`} body={text.account.body} backLabel={text.common.backHome}>
      <div className="account-card">
        <div className="account-identity"><span><UserCircle aria-hidden="true" weight="duotone" /></span><div><strong>{user.displayName}</strong><p>{user.email}</p></div></div>
        <dl className="account-details">
          <div><dt><CheckCircle aria-hidden="true" />{text.account.verified}</dt><dd>{user.emailVerified ? "✓" : "—"}</dd></div>
          <div><dt><UserCircle aria-hidden="true" />{text.account.role}</dt><dd>{roleLabel}</dd></div>
          <div><dt><Clock aria-hidden="true" />{text.account.status}</dt><dd>{text.account.comingSoon}</dd></div>
        </dl>
        <LogoutButton locale={locale} label={text.account.logout} />
      </div>
    </AuthShell>
  );
}

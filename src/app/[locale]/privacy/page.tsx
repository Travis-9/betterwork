import { notFound } from "next/navigation";
import { AuthShell } from "@/components/auth-shell";
import { authCopy } from "@/lib/auth-copy";
import { isLocale } from "@/lib/i18n";

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const text = authCopy[locale];
  return (
    <AuthShell locale={locale} route="privacy" eyebrow={text.privacy.eyebrow} title={text.privacy.title} body={text.privacy.intro} backLabel={text.common.backHome}>
      <div className="privacy-content">{text.privacy.sections.map((section) => <section key={section.title}><h2>{section.title}</h2><p>{section.body}</p></section>)}</div>
    </AuthShell>
  );
}

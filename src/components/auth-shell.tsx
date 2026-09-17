import { Leaf } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n";

type AuthShellProps = {
  locale: Locale;
  route: string;
  eyebrow: string;
  title: string;
  body: string;
  backLabel: string;
  children: ReactNode;
};

export function AuthShell({ locale, route, eyebrow, title, body, backLabel, children }: AuthShellProps) {
  const otherLocale = locale === "nl" ? "en" : "nl";

  return (
    <main className="auth-page">
      <div className="auth-atmosphere" aria-hidden="true" />
      <header className="auth-header">
        <Link className="wordmark" href={`/${locale}`} aria-label="Betterwork">
          <Leaf aria-hidden="true" weight="fill" />
          <span>Betterwork<small>Suriname-first</small></span>
        </Link>
        <Link className="auth-language" href={`/${otherLocale}/${route}`}>
          {otherLocale.toUpperCase()}
        </Link>
      </header>
      <section className="auth-layout">
        <div className="auth-intro reveal">
          <span className="section-eyebrow red">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{body}</p>
          <Link className="auth-back" href={`/${locale}`}>{backLabel}</Link>
        </div>
        <div className="auth-card glass-panel reveal reveal-two">{children}</div>
      </section>
    </main>
  );
}

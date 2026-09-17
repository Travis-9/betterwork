"use client";

import { Leaf, List, X } from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { LandingCopy, Locale } from "@/lib/i18n";

type SiteHeaderProps = {
  locale: Locale;
  copy: LandingCopy["header"];
  authenticated: boolean;
};

export function SiteHeader({ locale, copy, authenticated }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="header-shell glass-nav">
        <a className="wordmark" href="#top" aria-label="Betterwork">
          <Leaf aria-hidden="true" weight="fill" />
          <span>
            Betterwork
            <small>Suriname-first</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#talent">{copy.talent}</a>
          <Link href="/jobs">{copy.work}</Link>
          <a href="#story">{copy.story}</a>
        </nav>

        <div className="header-actions">
          <div className="login-wrap">
            <Link className="login-button" href={`/${locale}/${authenticated ? "account" : "login"}`}>
              {authenticated ? copy.account : copy.login}
            </Link>
          </div>

          <div className="locale-switcher" aria-label="Language">
            <Link className={locale === "nl" ? "active" : ""} href="/nl">
              NL
            </Link>
            <span aria-hidden="true">/</span>
            <Link className={locale === "en" ? "active" : ""} href="/en">
              EN
            </Link>
          </div>

          <button
            className="menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? copy.menuClose : copy.menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <List aria-hidden="true" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
          <a href="#talent" onClick={closeMenu}>
            {copy.talent}
          </a>
          <Link href="/jobs" onClick={closeMenu}>
            {copy.work}
          </Link>
          <a href="#story" onClick={closeMenu}>
            {copy.story}
          </a>
          <Link href={`/${locale}/${authenticated ? "account" : "login"}`} onClick={closeMenu}>
            {authenticated ? copy.account : copy.login}
          </Link>
        </nav>
      ) : null}
    </header>
  );
}

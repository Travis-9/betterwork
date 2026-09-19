"use client";

import { List, X } from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import type { LandingCopy, Locale } from "@/lib/i18n";

type SiteHeaderProps = {
  locale?: Locale;
  copy?: LandingCopy["header"];
  authenticated?: boolean;
  activePage?: "jobs" | "freelancers" | "about";
};

export function SiteHeader({ locale, copy, authenticated, activePage }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [soonOpen, setSoonOpen] = useState(false);
  const localized = locale && copy;

  useEffect(() => {
    if (locale) document.documentElement.lang = locale;
  }, [locale]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="header-shell glass-nav">
        <Link className="wordmark" href="/" aria-label="Betterwork">
          <Image src="/logo.png" alt="" width={40} height={40} />
          <span>
            Betterwork
            <small>Suriname-first</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link href="/freelancers" className={activePage === "freelancers" ? "active" : ""}>Freelancers</Link>
          <Link href="/jobs" className={activePage === "jobs" ? "active" : ""}>Jobs</Link>
          <Link href="/about" className={activePage === "about" ? "active" : ""}>About</Link>
        </nav>

        <div className="header-actions">
          <div className="login-wrap">
            {localized ? (
              <Link className="login-button" href={`/${locale}/${authenticated ? "account" : "login"}`}>
                {authenticated ? copy.account : copy.login}
              </Link>
            ) : (
              <>
                <button
                  className="login-button"
                  type="button"
                  aria-expanded={soonOpen}
                  onClick={() => setSoonOpen((value) => !value)}
                >
                  Sign In
                </button>
                {soonOpen ? (
                  <span className="coming-soon" role="status">
                    Coming Soon
                  </span>
                ) : null}
              </>
            )}
          </div>

          {locale ? (
            <div className="locale-switcher" aria-label="Language">
              <Link className={locale === "nl" ? "active" : ""} href="/nl">
                NL
              </Link>
              <span aria-hidden="true">/</span>
              <Link className={locale === "en" ? "active" : ""} href="/en">
                EN
              </Link>
            </div>
          ) : null}

          <button
            className="menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <List aria-hidden="true" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
          <Link href="/freelancers" className={activePage === "freelancers" ? "active" : ""} onClick={closeMenu}>
            Freelancers
          </Link>
          <Link href="/jobs" className={activePage === "jobs" ? "active" : ""} onClick={closeMenu}>
            Jobs
          </Link>
          <Link href="/about" className={activePage === "about" ? "active" : ""} onClick={closeMenu}>
            About
          </Link>
          {localized ? (
            <Link href={`/${locale}/${authenticated ? "account" : "login"}`} onClick={closeMenu}>
              {authenticated ? copy.account : copy.login}
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => {
                setSoonOpen(true);
                closeMenu();
              }}
            >
              Sign In · Coming Soon
            </button>
          )}
        </nav>
      ) : null}
    </header>
  );
}

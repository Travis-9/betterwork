import {
  ArrowRight,
  Briefcase,
  CheckCircle,
  ClipboardText,
  CreditCard,
  MapPin,
  ShieldCheck,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import type { LandingCopy, Locale } from "@/lib/i18n";
import { SiteHeader } from "@/components/site-header";
import { WaitlistForm } from "@/components/waitlist-form";

type LandingPageProps = {
  locale: Locale;
  copy: LandingCopy;
};

const trustIcons = [MapPin, ClipboardText, CreditCard, ShieldCheck];

export function LandingPage({ locale, copy }: LandingPageProps) {
  return (
    <div className="page-shell">
      <SiteHeader locale={locale} copy={copy.header} />

      <main>
        <section className="hero" id="top">
          <div className="hero-copy reveal reveal-one">
            <span className="eyebrow-pill">{copy.hero.eyebrow}</span>
            <h1>
              <span>{copy.hero.headline[0]}</span>
              <span>{copy.hero.headline[1]}</span>
              <span className="accent-line">{copy.hero.headline[2]}</span>
            </h1>
            <p className="hero-body">{copy.hero.body}</p>
            <div className="hero-actions">
              <a className="primary-cta" href="#early-access">
                {copy.hero.primary}
                <ArrowRight aria-hidden="true" />
              </a>
              <a className="secondary-cta" href="#work">
                {copy.hero.secondary}
                <ArrowRight aria-hidden="true" />
              </a>
            </div>
            <p className="local-note">
              <CheckCircle aria-hidden="true" />
              {copy.hero.note}
            </p>
          </div>

          <div className="hero-media reveal reveal-two">
            <Image
              src="/images/hero-collaboration.png"
              alt={copy.hero.imageAlt}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 58vw"
            />
          </div>

          <div className="form-position reveal reveal-three">
            <WaitlistForm locale={locale} copy={copy.form} />
          </div>
        </section>

        <section className="trust-section" aria-labelledby="trust-title">
          <div className="section-shell">
            <h2 id="trust-title">{copy.trust.title}</h2>
            <div className="trust-grid">
              {copy.trust.items.map((item, index) => {
                const Icon = trustIcons[index];
                return (
                  <article key={item.title}>
                    <span className="icon-disc">
                      <Icon aria-hidden="true" weight="fill" />
                    </span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="audience-section" id="talent" aria-labelledby="audience-title">
          <div className="section-shell audience-shell">
            <div className="audience-intro">
              <span className="section-eyebrow">{copy.talent.eyebrow}</span>
              <h2 id="audience-title">{copy.talent.title}</h2>
              <p>{copy.talent.body}</p>
            </div>
            <div className="audience-paths">
              <article>
                <span className="path-number">01</span>
                <UsersThree aria-hidden="true" weight="duotone" />
                <h3>{copy.talent.clientTitle}</h3>
                <p>{copy.talent.clientBody}</p>
                <a href="#early-access">
                  {copy.hero.primary}
                  <ArrowRight aria-hidden="true" />
                </a>
              </article>
              <article id="work">
                <span className="path-number">02</span>
                <Briefcase aria-hidden="true" weight="duotone" />
                <h3>{copy.talent.freelancerTitle}</h3>
                <p>{copy.talent.freelancerBody}</p>
                <a href="#early-access">
                  {copy.hero.secondary}
                  <ArrowRight aria-hidden="true" />
                </a>
              </article>
            </div>
          </div>
        </section>

        <section className="story-section" id="story" aria-labelledby="story-title">
          <div className="section-shell story-shell">
            <div className="story-copy">
              <span className="section-eyebrow red">{copy.story.eyebrow}</span>
              <h2 id="story-title">{copy.story.title}</h2>
              <p>{copy.story.paragraphs[0]}</p>
              <p>{copy.story.paragraphs[1]}</p>
              <strong>
                <CheckCircle aria-hidden="true" weight="fill" />
                {copy.story.signoff}
              </strong>
            </div>
            <div className="story-media">
              <Image
                src="/images/paramaribo-river.png"
                alt={copy.story.imageAlt}
                fill
                sizes="(max-width: 800px) 100vw, 54vw"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="section-shell footer-shell">
          <div>
            <a className="footer-wordmark" href="#top">
              Betterwork
            </a>
            <p>{copy.footer.tagline}</p>
          </div>
          <div className="footer-links">
            <div>
              <strong>{copy.footer.product}</strong>
              <a href="#talent">{copy.header.talent}</a>
              <a href="#work">{copy.header.work}</a>
              <a href="#story">{copy.header.story}</a>
            </div>
            <div>
              <strong>{copy.footer.legal}</strong>
              <span>{copy.footer.privacy}</span>
              <span>{copy.footer.terms}</span>
            </div>
          </div>
        </div>
        <div className="section-shell footer-bottom">
          © {new Date().getFullYear()} {copy.footer.copyright}
        </div>
      </footer>
    </div>
  );
}

"use client";

import { ArrowRight, Briefcase, Chat, Check, Globe, Handshake, MagnifyingGlass, UserPlus, Warning, X } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function AboutPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="about-page">
      <header className="about-header">
        <div className="about-header-inner">
          <Link className="about-wordmark" href="/" aria-label="ConnectSu home">
            <span>Betterwork</span>
          </Link>
          <nav className="about-nav" aria-label="Primary navigation">
            <Link href="/jobs">Jobs</Link>
            <Link href="/hire">Hire</Link>
            <Link href="/freelancers">Freelancers</Link>
            <Link className="active" href="/about">About</Link>
          </nav>
          <div className="about-header-actions">
            <Link href="/login">Sign In</Link>
            <Link className="about-cta" href="/jobs/post">Post a Job</Link>
            <button className="about-menu" type="button" aria-expanded={menuOpen} aria-controls="about-mobile-nav" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X aria-hidden="true" /> : <ArrowRight aria-hidden="true" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav id="about-mobile-nav" className="about-mobile-nav">
            <Link href="/jobs" onClick={() => setMenuOpen(false)}>Jobs</Link>
            <Link href="/hire" onClick={() => setMenuOpen(false)}>Hire</Link>
            <Link href="/freelancers" onClick={() => setMenuOpen(false)}>Freelancers</Link>
            <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
            <Link href="/login" onClick={() => setMenuOpen(false)}>Sign In</Link>
            <Link className="about-cta" href="/jobs/post" onClick={() => setMenuOpen(false)}>Post a Job</Link>
          </nav>
        )}
      </header>

      <main>
        <HeroSection />
        <MissionSection />
        <ProblemSection />
        <HowItWorksSection />
        <SurinameBannerSection />
        <VisionCTASection />
      </main>

      <footer className="about-footer">
        <div className="about-footer-inner">
          <div className="about-footer-brand">
            <span>Betterwork</span>
            <p>© 2024 Betterwork. Strengthening Suriname&rsquo;s workforce.</p>
          </div>
          <nav className="about-footer-nav">
            <Link href="/terms">Terms of Service</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/contact">Contact Us</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/partners">Partner Program</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="about-hero">
      <div className="about-hero-inner">
        <div className="about-hero-content">
          <div className="about-hero-badge">Over Betterwork</div>
          <h1>Wat is <span className="accent">Betterwork</span>?</h1>
          <p>Betterwork is de centrale, betrouwbare marktplaats voor professioneel talent in Suriname. Wij brengen ambitieuze freelancers, vakmensen en bedrijven samen op één overzichtelijk platform, speciaal gebouwd voor de Surinaamse markt.</p>
          <div className="about-hero-actions">
            <Link className="about-primary-btn" href="/freelancers">Ontdek Talent <ArrowRight aria-hidden="true" /></Link>
            <Link className="about-secondary-btn" href="/jobs">Vind Werk</Link>
          </div>
        </div>
        <div className="about-hero-image">
          <Image src="/images/hero-collaboration.png" alt="Professional team collaboration" fill style={{ objectFit: "cover" }} />
        </div>
      </div>
    </section>
  );
}

function MissionSection() {
  return (
    <section className="about-mission">
      <div className="about-mission-inner">
        <div className="about-mission-badge">Onze Missie</div>
        <h2>Lokaal talent makkelijker vindbaar maken, en professionele samenwerkingen in Suriname stimuleren.</h2>
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section className="about-problem">
      <div className="about-problem-inner">
        <h2>Welk probleem lossen we op?</h2>
        <p>De brug slaan tussen vraag en aanbod in een gefragmenteerde markt.</p>
        <div className="about-problem-cards">
          <div className="about-problem-card">
            <div className="about-problem-icon warning">
              <Warning aria-hidden="true" />
            </div>
            <h3>Voor Freelancers</h3>
            <div className="about-problem-points">
              <div className="about-problem-point negative">
                <X aria-hidden="true" />
                <p>Zonder Betterwork: Moeite om nieuwe, betrouwbare opdrachtgevers te vinden buiten het eigen, beperkte netwerk.</p>
              </div>
              <div className="about-problem-point positive">
                <Check aria-hidden="true" />
                <p>Met Betterwork: Een professioneel profiel, direct zichtbaar voor bedrijven die actief zoeken naar jouw specifieke vaardigheden.</p>
              </div>
            </div>
          </div>
          <div className="about-problem-card">
            <div className="about-problem-icon">
              <Briefcase aria-hidden="true" />
            </div>
            <h3>Voor Bedrijven</h3>
            <div className="about-problem-points">
              <div className="about-problem-point negative">
                <X aria-hidden="true" />
                <p>Zonder Betterwork: Veel tijd kwijt aan het zoeken via informele kanalen naar tijdelijke expertise, met onzekerheid over kwaliteit.</p>
              </div>
              <div className="about-problem-point positive">
                <Check aria-hidden="true" />
                <p>Met Betterwork: Direct toegang tot een gecategoriseerde pool van geverifieerde lokale professionals.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    { number: 1, icon: UserPlus, title: "Profiel Aanmaken", description: "Registreer als freelancer of bedrijf en vul je gegevens in." },
    { number: 2, icon: MagnifyingGlass, title: "Ontdekken", description: "Zoek naar opdrachten of blader door profielen van professionals." },
    { number: 3, icon: Chat, title: "Contact Leggen", description: "Stuur een bericht en bespreek de details van het project veilig via het platform." },
    { number: 4, icon: Handshake, title: "Samenwerken", description: "Start de samenwerking en bouw aan een sterker professioneel netwerk." },
  ];

  return (
    <section className="about-howitworks">
      <div className="about-howitworks-inner">
        <h2>Hoe het werkt</h2>
        <div className="about-howitworks-steps">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="about-howitworks-step">
                <div className="about-howitworks-icon">
                  <Icon aria-hidden="true" />
                </div>
                <h3>{step.number}. {step.title}</h3>
                <p>{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SurinameBannerSection() {
  return (
    <section className="about-suriname">
      <div className="about-suriname-overlay" />
      <Image src="/images/paramaribo-river.png" alt="Paramaribo skyline" fill style={{ objectFit: "cover" }} />
      <div className="about-suriname-content">
        <h2>Gebouwd voor Suriname.<br />Gedreven door Surinaams talent.</h2>
        <p>Wij geloven in de kracht van de lokale economie. Door technologie te gebruiken om de juiste mensen op het juiste moment bij elkaar te brengen, dragen we bij aan de groei van individuen en ondernemingen in heel Suriname.</p>
      </div>
    </section>
  );
}

function VisionCTASection() {
  return (
    <section className="about-vision">
      <div className="about-vision-inner">
        <div className="about-vision-content">
          <div className="about-vision-label">ONZE VISIE</div>
          <h2>Een verbonden professioneel ecosysteem</h2>
          <p>We streven naar een toekomst waarin het vinden van werk of het inhuren van lokaal talent naadloos, transparant en toegankelijk is voor iedereen.</p>
          <p>Door een betrouwbare digitale infrastructuur te bieden, verlagen we de drempels voor ondernemerschap en verhogen we de kwaliteit van zakelijke dienstverlening in Suriname.</p>
        </div>
        <div className="about-vision-cta">
          <div className="about-vision-cta-icon">
            <Globe aria-hidden="true" />
          </div>
          <h3>Bouw mee aan de toekomst</h3>
          <p>Ben jij een voorloper? Sluit je aan bij de eerste groep professionals en bedrijven op Betterwork en help de standaard te zetten.</p>
          <Link className="about-launch-btn" href="/partners">Word Launch Partner</Link>
        </div>
      </div>
    </section>
  );
}

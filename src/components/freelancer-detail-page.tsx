import { ArrowLeft, ArrowRight, MapPin, Star } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import type { Freelancer } from "@/lib/freelancers";
import type { Locale } from "@/lib/i18n";
import { DetailActions } from "@/components/detail-actions";

const copy = {
  en: { home: "Home", people: "Freelancers", back: "Back to freelancers", about: "About", skills: "Skills and expertise", details: "Engagement details", location: "Location", availability: "Availability", experience: "Experience level", rate: "Listed hourly rate", contact: "Contact this freelancer", contactBody: "Direct messaging is not available yet. Create an account to prepare your profile and return when contact opens.", account: "Create an account", saved: "Save profile", unsaved: "Profile saved", share: "Share", rating: "Listed profile rating", projects: "Listed completed projects", noPortfolio: "Portfolio details have not been added to this profile yet." },
  nl: { home: "Home", people: "Freelancers", back: "Terug naar freelancers", about: "Over", skills: "Vaardigheden en expertise", details: "Samenwerkingsgegevens", location: "Locatie", availability: "Beschikbaarheid", experience: "Ervaringsniveau", rate: "Vermeld uurtarief", contact: "Neem contact op", contactBody: "Directe berichten zijn nog niet beschikbaar. Maak een account aan en kom terug wanneer contact mogelijk is.", account: "Account aanmaken", saved: "Profiel bewaren", unsaved: "Profiel bewaard", share: "Delen", rating: "Vermelde profielscore", projects: "Vermelde afgeronde projecten", noPortfolio: "Er zijn nog geen portfoliodetails aan dit profiel toegevoegd." },
} as const;

export function FreelancerDetailPage({ freelancer, locale }: { freelancer: Freelancer; locale: Locale }) {
  const text = copy[locale];
  const profilePath = `/${locale}/freelancers/${freelancer.id}`;
  const initials = freelancer.name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2);

  return (
    <main className="detail-page freelancer-detail-page">
      <div className="detail-container">
        <nav className="detail-breadcrumbs" aria-label="Breadcrumb"><Link href={`/${locale}`}>{text.home}</Link><span aria-hidden="true">/</span><Link href={`/${locale}/freelancers`}>{text.people}</Link><span aria-hidden="true">/</span><span aria-current="page">{freelancer.name}</span></nav>
        <Link className="detail-back-link" href={`/${locale}/freelancers`}><ArrowLeft aria-hidden="true" />{text.back}</Link>
        <header className="detail-hero-card freelancer-hero-card">
          <div className="detail-identity-row">
            <div className="freelancer-detail-avatar"><Image src={freelancer.avatar} alt={`${freelancer.name} profile`} fill sizes="(max-width: 680px) 88px, 120px" priority /></div>
            <div className="detail-heading-copy"><p className="detail-eyebrow">{freelancer.categories.join(" · ")}</p><h1>{freelancer.name}</h1><p className="freelancer-detail-title">{freelancer.title}</p><div className="detail-inline-meta"><span><MapPin aria-hidden="true" />{freelancer.location}{freelancer.remote ? " · Remote" : ""}</span></div></div>
          </div>
          <DetailActions kind="freelancer" id={freelancer.id} shareLabel={text.share} savedLabel={text.saved} unsavedLabel={text.unsaved} />
          <div className="freelancer-detail-stats"><span><strong>{freelancer.availability}</strong><small>{text.availability}</small></span><span><strong>SRD {freelancer.hourlyRate} / hr</strong><small>{text.rate}</small></span><span><strong>{freelancer.experienceLevel}</strong><small>{text.experience}</small></span></div>
        </header>
        <div className="detail-layout">
          <div className="detail-main-column">
            <section className="detail-section"><h2>{text.about}</h2><p>{freelancer.description}</p></section>
            <section className="detail-section"><h2>{text.skills}</h2><div className="detail-tag-list">{freelancer.skills.map((skill) => <span className="detail-tag" key={skill}>{skill}</span>)}</div></section>
            <section className="detail-section"><h2>{text.details}</h2><dl className="detail-definition-list"><div><dt>{text.location}</dt><dd>{freelancer.location}{freelancer.remote ? " · Remote work available" : ""}</dd></div><div><dt>{text.availability}</dt><dd>{freelancer.availability}</dd></div><div><dt>{text.experience}</dt><dd>{freelancer.experienceLevel}</dd></div></dl></section>
            <section className="detail-section detail-honest-empty"><h2>Portfolio</h2><p>{text.noPortfolio}</p></section>
            <section className="detail-contact" id="contact"><span className="detail-section-kicker">Betterwork</span><h2>{text.contact}</h2><p>{text.contactBody}</p><Link className="detail-primary-button" href={`/${locale}/signup?next=${encodeURIComponent(profilePath)}`}>{text.account}<ArrowRight aria-hidden="true" /></Link></section>
          </div>
          <aside className="detail-sidebar">
            <section className="detail-side-section"><h2>{freelancer.name.split(" ")[0]}</h2><div className="detail-profile-summary"><span className="freelancer-initials" aria-hidden="true">{initials}</span><div><strong>{freelancer.title}</strong><span>{freelancer.location}</span></div></div><p>{freelancer.description}</p><div className="freelancer-listed-metrics"><span><Star weight="fill" aria-hidden="true" />{freelancer.rating} · {text.rating}</span><span>{freelancer.completedProjects} · {text.projects}</span></div></section>
            <section className="detail-side-section"><h2>{text.skills}</h2><div className="detail-tag-list">{freelancer.skills.map((skill) => <span className="detail-tag" key={skill}>{skill}</span>)}</div></section>
          </aside>
        </div>
      </div>
      <div className="detail-mobile-action"><a href="#contact">{text.contact}<ArrowRight aria-hidden="true" /></a></div>
    </main>
  );
}
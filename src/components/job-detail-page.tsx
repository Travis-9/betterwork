import { ArrowLeft, ArrowRight, Briefcase, CalendarBlank, MapPin, Tag } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type { Job } from "@/lib/jobs";
import { getRelatedJobs } from "@/lib/jobs";
import type { Locale } from "@/lib/i18n";
import { DetailActions } from "@/components/detail-actions";

const copy = {
  en: { back: "Back to jobs", home: "Home", jobs: "Jobs", posted: "Published", about: "About this role", details: "Role details", location: "Location", type: "Employment type", skills: "Skills and focus", employer: "Employer", related: "Related opportunities", apply: "Apply for this role", application: "Applications are not open yet", applicationBody: "Betterwork is preparing applications for marketplace launch. You can create an account now and return to this vacancy later.", account: "Create an account", saved: "Save", unsaved: "Saved", share: "Share", noRelated: "Explore all current opportunities.", salary: "Compensation" },
  nl: { back: "Terug naar vacatures", home: "Home", jobs: "Vacatures", posted: "Gepubliceerd", about: "Over deze functie", details: "Functiegegevens", location: "Locatie", type: "Dienstverband", skills: "Vaardigheden en focus", employer: "Werkgever", related: "Vergelijkbare vacatures", apply: "Interesse in deze functie?", application: "Solliciteren is nog niet geopend", applicationBody: "Betterwork bereidt sollicitaties voor de marktplaatslancering voor. Je kunt nu een account aanmaken en later terugkomen bij deze vacature.", account: "Account aanmaken", saved: "Bewaren", unsaved: "Bewaard", share: "Delen", noRelated: "Bekijk alle huidige vacatures.", salary: "Vergoeding" },
} as const;

export function JobDetailPage({ job, locale }: { job: Job; locale: Locale }) {
  const text = copy[locale];
  const relatedJobs = getRelatedJobs(job);
  const detailPath = `/${locale}/jobs/${job.id}`;

  return (
    <main className="detail-page job-detail-page">
      <div className="detail-container">
        <nav className="detail-breadcrumbs" aria-label="Breadcrumb">
          <Link href={`/${locale}`}>{text.home}</Link><span aria-hidden="true">/</span><Link href={`/${locale}/jobs`}>{text.jobs}</Link><span aria-hidden="true">/</span><span aria-current="page">{job.title}</span>
        </nav>
        <Link className="detail-back-link" href={`/${locale}/jobs`}><ArrowLeft aria-hidden="true" />{text.back}</Link>
        <header className="detail-hero-card">
          <div className="detail-identity-row">
            <div className="detail-company-mark" aria-hidden="true">{job.company.slice(0, 2).toUpperCase()}</div>
            <div className="detail-heading-copy"><p className="detail-eyebrow">{job.company}</p><h1>{job.title}</h1><div className="detail-inline-meta"><span><MapPin aria-hidden="true" />{job.location}</span><span><Briefcase aria-hidden="true" />{job.type}</span><span><CalendarBlank aria-hidden="true" />{job.posted}</span></div></div>
          </div>
          <DetailActions kind="job" id={job.id} shareLabel={text.share} savedLabel={text.saved} unsavedLabel={text.unsaved} />
          <div className="detail-tag-list">{job.tags.map((tag) => <span className="detail-tag" key={tag}><Tag aria-hidden="true" />{tag}</span>)}</div>
        </header>

        <div className="detail-layout">
          <div className="detail-main-column">
            <section className="detail-section"><h2>{text.about}</h2><p>{job.description}</p></section>
            <section className="detail-section"><h2>{text.details}</h2><dl className="detail-definition-list"><div><dt>{text.location}</dt><dd>{job.location}</dd></div><div><dt>{text.type}</dt><dd>{job.type}</dd></div><div><dt>{text.salary}</dt><dd>{job.salary}</dd></div></dl></section>
            <section className="detail-section"><h2>{text.skills}</h2><div className="detail-tag-list">{job.tags.map((tag) => <span className="detail-tag" key={tag}>{tag}</span>)}</div></section>
            <section className="detail-application" id="apply"><span className="detail-section-kicker">Betterwork</span><h2>{text.application}</h2><p>{text.applicationBody}</p><Link className="detail-primary-button" href={`/${locale}/signup?next=${encodeURIComponent(detailPath)}`}>{text.account}<ArrowRight aria-hidden="true" /></Link></section>
          </div>
          <aside className="detail-sidebar">
            <section className="detail-side-section"><h2>{text.employer}</h2><div className="detail-employer"><span className="detail-company-mark small" aria-hidden="true">{job.company.slice(0, 2).toUpperCase()}</span><strong>{job.company}</strong></div><Link className="detail-text-link" href={`/${locale}/jobs`}>{text.jobs}<ArrowRight aria-hidden="true" /></Link></section>
            <section className="detail-side-section"><h2>{text.related}</h2>{relatedJobs.length ? <ul className="detail-related-list">{relatedJobs.map((related) => <li key={related.id}><Link href={`/${locale}/jobs/${related.id}`}><strong>{related.title}</strong><span>{related.company} · {related.location}</span></Link></li>)}</ul> : <p>{text.noRelated}</p>}<Link className="detail-text-link" href={`/${locale}/jobs`}>{text.back}<ArrowRight aria-hidden="true" /></Link></section>
          </aside>
        </div>
      </div>
      <div className="detail-mobile-action"><a href="#apply">{text.apply}<ArrowRight aria-hidden="true" /></a></div>
    </main>
  );
}
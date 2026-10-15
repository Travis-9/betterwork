"use client";

import { ArrowRight, BookmarkSimple, CaretDown, Check, MagnifyingGlass, MapPin, SlidersHorizontal, X } from "@phosphor-icons/react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { jobTypes, jobs, locations, type Job } from "@/lib/jobs";
import { SiteHeader } from "@/components/site-header";
import type { Locale } from "@/lib/i18n";
import { toggleSavedItem, useSavedItems } from "@/components/use-saved-items";

function Badge({ children }: { children: React.ReactNode }) { return <span className="jobs-badge">{children}</span>; }
function marketplaceHref(path: string, locale: Locale) { return `/${locale}${path}`; }

function BookmarkButton({ active, onClick }: { active: boolean; onClick: () => void }) {
  return <button className={`jobs-bookmark${active ? " is-active" : ""}`} type="button" onClick={onClick} aria-label={active ? "Remove bookmark" : "Bookmark job"} aria-pressed={active}><BookmarkSimple aria-hidden="true" weight={active ? "fill" : "regular"} /></button>;
}

function Meta({ job }: { job: Job }) {
  return <div className="jobs-meta"><span><MapPin aria-hidden="true" />{job.location}</span><span>{job.type}</span><strong>{job.salary}</strong></div>;
}

type FilterProps = { selectedLocations: string[]; selectedTypes: string[]; toggleLocation: (value: string) => void; toggleType: (value: string) => void };

function FilterOptions({ selectedLocations, selectedTypes, toggleLocation, toggleType }: FilterProps) {
  const options = (values: string[], selected: string[], toggle: (value: string) => void) => values.map((value) => <label key={value} className="jobs-check-row"><input type="checkbox" checked={selected.includes(value)} onChange={() => toggle(value)} /><span className="jobs-checkbox"><Check aria-hidden="true" /></span>{value}</label>);
  return <><fieldset className="jobs-filter-group"><legend>Location</legend>{options(locations, selectedLocations, toggleLocation)}</fieldset><fieldset className="jobs-filter-group"><legend>Job Type</legend>{options(jobTypes, selectedTypes, toggleType)}</fieldset></>;
}

function FeaturedJob({ job, bookmarked, toggleBookmark, locale }: { job: Job; bookmarked: boolean; toggleBookmark: (id: string) => void; locale: Locale }) {
  return <article className="jobs-featured-card"><div className="jobs-featured-topline"><Badge>Featured</Badge><BookmarkButton active={bookmarked} onClick={() => toggleBookmark(job.id)} /></div><div className="jobs-company-mark">SCG</div><p className="jobs-company">{job.company}</p><h2>{job.title}</h2><Meta job={job} /><p className="jobs-description">{job.description}</p><div className="jobs-card-bottom"><div className="jobs-tags">{job.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}</div><Link className="jobs-primary-button" href={marketplaceHref(`/jobs/${job.id}`, locale)}>View Details <ArrowRight aria-hidden="true" /></Link></div></article>;
}

function CompactJob({ job, bookmarked, toggleBookmark, locale }: { job: Job; bookmarked: boolean; toggleBookmark: (id: string) => void; locale: Locale }) {
  return <article className="jobs-compact-card"><div className="jobs-card-heading"><div className="jobs-company-mark small">{job.company.slice(0, 2).toUpperCase()}</div><BookmarkButton active={bookmarked} onClick={() => toggleBookmark(job.id)} /></div><p className="jobs-company">{job.company}</p><h2>{job.title}</h2><Meta job={job} /><div className="jobs-tags">{job.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}</div><Link className="jobs-details-link" href={marketplaceHref(`/jobs/${job.id}`, locale)}>View Details <ArrowRight aria-hidden="true" /></Link></article>;
}

function MobileJob({ job, bookmarked, toggleBookmark, locale }: { job: Job; bookmarked: boolean; toggleBookmark: (id: string) => void; locale: Locale }) {
  return <article className="jobs-mobile-card"><div className="jobs-mobile-card-head"><div><p className="jobs-company">{job.company}</p><h2>{job.title}</h2></div><BookmarkButton active={bookmarked} onClick={() => toggleBookmark(job.id)} /></div><Meta job={job} /><p className="jobs-description">{job.description}</p><div className="jobs-mobile-card-foot"><span>{job.posted}</span><Link className="jobs-details-link" href={marketplaceHref(`/jobs/${job.id}`, locale)}>View Details <ArrowRight aria-hidden="true" /></Link></div></article>;
}

export function JobsPage({ locale = "nl", showHeader = true }: { locale?: Locale; showHeader?: boolean }) {
  const [query, setQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [sort, setSort] = useState("Most Relevant");
  const bookmarked = useSavedItems("job");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);


  const toggle = (value: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => setter((items) => items.includes(value) ? items.filter((item) => item !== value) : [...items, value]);
  const clearFilters = () => { setQuery(""); setLocationQuery(""); setSelectedLocations([]); setSelectedTypes([]); };
  const filteredJobs = useMemo(() => {
    const search = query.trim().toLowerCase();
    const location = locationQuery.trim().toLowerCase();
    const result = jobs.filter((job) => { const searchable = `${job.title} ${job.company} ${job.description} ${job.tags.join(" ")}`.toLowerCase(); return (!search || searchable.includes(search)) && (!location || job.location.toLowerCase().includes(location)) && (!selectedLocations.length || selectedLocations.some((item) => job.location.includes(item))) && (!selectedTypes.length || selectedTypes.some((item) => item.toLowerCase() === job.type.toLowerCase())); });
    return [...result].sort((a, b) => sort === "Title" ? a.title.localeCompare(b.title) : Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  }, [locationQuery, query, selectedLocations, selectedTypes, sort]);

  const desktopFeatured = filteredJobs.find((job) => job.featured);
  const desktopCompact = filteredJobs.filter((job) => job.id !== desktopFeatured?.id);
  const mobileJobs = filteredJobs.slice(0, visibleCount);
  const toggleBookmark = (id: string) => toggleSavedItem("job", id);
  const filterProps = { selectedLocations, selectedTypes, toggleLocation: (value: string) => toggle(value, setSelectedLocations), toggleType: (value: string) => toggle(value, setSelectedTypes) };

  return <div className="jobs-page">
    {showHeader ? <SiteHeader locale={locale} activePage="jobs"/> : null}
    <main><section className="jobs-hero"><p className="jobs-kicker">Opportunities, close to home</p><h1>Find Your Next Role in Suriname</h1><p>Discover meaningful opportunities across Paramaribo, Wanica and beyond. Your next chapter starts here.</p><div className="jobs-mobile-search"><label><span>Keywords</span><div><MagnifyingGlass aria-hidden="true" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Job title, skills or company" /></div></label><label><span>Location</span><div><MapPin aria-hidden="true" /><input value={locationQuery} onChange={(event) => setLocationQuery(event.target.value)} placeholder="Where do you want to work?" /></div></label><button className="jobs-primary-button" type="button">Search Jobs <ArrowRight aria-hidden="true" /></button></div></section>
      <section className="jobs-content"><aside className="jobs-sidebar"><div className="jobs-filter-heading"><h2>Filters</h2><button type="button" onClick={clearFilters}>Clear All</button></div><label className="jobs-keyword-field"><span>Keywords</span><div><MagnifyingGlass aria-hidden="true" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search jobs" /></div></label><FilterOptions {...filterProps} /></aside>
        <div className="jobs-results"><button className="jobs-mobile-filter-button" type="button" onClick={() => setMobileFiltersOpen((open) => !open)} aria-expanded={mobileFiltersOpen}><span>Filters</span><SlidersHorizontal aria-hidden="true" /></button>{mobileFiltersOpen ? <div className="jobs-mobile-filter-panel"><div className="jobs-filter-heading"><h2>Filters</h2><button type="button" onClick={clearFilters}>Clear All</button><button className="jobs-close-filter" type="button" onClick={() => setMobileFiltersOpen(false)} aria-label="Close filters"><X aria-hidden="true" /></button></div><FilterOptions {...filterProps} /></div> : null}
          <div className="jobs-results-toolbar"><span>Showing <strong className="desktop-count">{filteredJobs.length} of {jobs.length} jobs</strong><strong className="mobile-count">{filteredJobs.length} Jobs</strong></span><label>Sort by: <select value={sort} onChange={(event) => setSort(event.target.value)}><option>Most Relevant</option><option>Title</option></select><CaretDown aria-hidden="true" /></label></div>
          <div className="jobs-desktop-list">{desktopFeatured ? <FeaturedJob job={desktopFeatured} bookmarked={bookmarked.includes(desktopFeatured.id)} toggleBookmark={toggleBookmark} locale={locale} /> : null}<div className="jobs-compact-grid">{desktopCompact.map((job) => <CompactJob key={job.id} job={job} bookmarked={bookmarked.includes(job.id)} toggleBookmark={toggleBookmark} locale={locale} />)}</div></div>
          <div className="jobs-mobile-list">{mobileJobs.map((job) => <MobileJob key={job.id} job={job} bookmarked={bookmarked.includes(job.id)} toggleBookmark={toggleBookmark} locale={locale} />)}<button className="jobs-load-more" type="button" onClick={() => setVisibleCount((count) => count + 3)}>Load More Jobs</button></div>
        </div></section></main>
    <footer className="jobs-footer"><Link className="jobs-footer-brand" href={`/${locale}`}>Betterwork</Link><span>© 2026 Betterwork</span><nav aria-label="Footer navigation"><Link href={`/${locale}/privacy`}>Privacy</Link></nav></footer>
  </div>;
}
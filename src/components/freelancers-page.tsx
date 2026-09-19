"use client";

import { ArrowLeft, ArrowRight, BookmarkSimple, Check, CaretDown, Leaf, List, MagnifyingGlass, MapPin, SlidersHorizontal, Star, UserCircle, X } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { freelancerAvailability, freelancerCategories, freelancerExperience, freelancerLocations, freelancers, type Freelancer } from "@/lib/freelancers";
import { SiteHeader } from "@/components/site-header";

type FilterState = { locations: string[]; availability: string[]; experience: string[]; categories: string[] };
const emptyFilters: FilterState = { locations: [], availability: [], experience: [], categories: [] };

function SkillBadge({ children }: { children: React.ReactNode }) { return <span className="freelancer-skill">{children}</span>; }
function BookmarkButton({ active, onClick }: { active: boolean; onClick: () => void }) { return <button className={`freelancer-bookmark${active ? " active" : ""}`} type="button" onClick={onClick} aria-label={active ? "Remove freelancer bookmark" : "Bookmark freelancer"} aria-pressed={active}><BookmarkSimple aria-hidden="true" weight={active ? "fill" : "regular"} /></button>; }

function FilterGroup({ title, values, selected, onToggle }: { title: string; values: string[]; selected: string[]; onToggle: (value: string) => void }) {
  return <fieldset className="freelancer-filter-group"><legend>{title}</legend>{values.map((value) => <label className="freelancer-check" key={value}><input type="checkbox" checked={selected.includes(value)} onChange={() => onToggle(value)} /><span><Check aria-hidden="true" /></span>{value}</label>)}</fieldset>;
}

function Filters({ filters, toggleFilter }: { filters: FilterState; toggleFilter: (group: keyof FilterState, value: string) => void }) {
  return <><FilterGroup title="Location" values={freelancerLocations} selected={filters.locations} onToggle={(value) => toggleFilter("locations", value)} /><FilterGroup title="Availability" values={freelancerAvailability} selected={filters.availability} onToggle={(value) => toggleFilter("availability", value)} /><FilterGroup title="Experience" values={freelancerExperience} selected={filters.experience} onToggle={(value) => toggleFilter("experience", value)} /><FilterGroup title="Skills / Categories" values={freelancerCategories} selected={filters.categories} onToggle={(value) => toggleFilter("categories", value)} /></>;
}

function FreelancerMeta({ freelancer }: { freelancer: Freelancer }) {
  return <div className="freelancer-meta"><span><MapPin aria-hidden="true" />{freelancer.location}</span><span className="freelancer-availability"><span className="availability-dot" />{freelancer.availability}</span></div>;
}

function Avatar({ freelancer, featured = false }: { freelancer: Freelancer; featured?: boolean }) {
  return <div className={`freelancer-avatar${featured ? " featured" : ""}`}><Image src={freelancer.avatar} alt={`${freelancer.name} profile`} fill sizes={featured ? "128px" : "70px"} /></div>;
}

function FreelancerCard({ freelancer, bookmarked, toggleBookmark }: { freelancer: Freelancer; bookmarked: boolean; toggleBookmark: (id: string) => void }) {
  return <article className="freelancer-card"><div className="freelancer-card-top"><Avatar freelancer={freelancer} /><BookmarkButton active={bookmarked} onClick={() => toggleBookmark(freelancer.id)} /></div><p className="freelancer-name">{freelancer.name}</p><h2>{freelancer.title}</h2><div className="freelancer-rating"><Star aria-hidden="true" weight="fill" />{freelancer.rating}<span>({freelancer.completedProjects} projects)</span></div><FreelancerMeta freelancer={freelancer} /><p className="freelancer-description">{freelancer.description}</p><div className="freelancer-card-bottom"><div><strong>From SRD {freelancer.hourlyRate} / hour</strong><div className="freelancer-skills">{freelancer.skills.slice(0, 4).map((skill) => <SkillBadge key={skill}>{skill}</SkillBadge>)}</div></div><Link className="freelancer-view-link" href={`/freelancers/${freelancer.id}`}>View Profile <ArrowRight aria-hidden="true" /></Link></div></article>;
}

function FeaturedFreelancer({ freelancer, bookmarked, toggleBookmark }: { freelancer: Freelancer; bookmarked: boolean; toggleBookmark: (id: string) => void }) {
  return <article className="featured-freelancer"><div className="featured-freelancer-top"><span className="featured-badge">Featured Freelancer</span><BookmarkButton active={bookmarked} onClick={() => toggleBookmark(freelancer.id)} /></div><div className="featured-freelancer-content"><Avatar freelancer={freelancer} featured /><div className="featured-freelancer-copy"><p className="freelancer-name">{freelancer.name}</p><h2>{freelancer.title}</h2><FreelancerMeta freelancer={freelancer} /><div className="freelancer-rating"><Star aria-hidden="true" weight="fill" />{freelancer.rating}<span>{freelancer.completedProjects} completed projects</span></div><p className="freelancer-description">{freelancer.description}</p><div className="freelancer-card-bottom"><div><strong>From SRD {freelancer.hourlyRate} / hour</strong><div className="freelancer-skills">{freelancer.skills.map((skill) => <SkillBadge key={skill}>{skill}</SkillBadge>)}</div></div><Link className="freelancer-primary-button" href={`/freelancers/${freelancer.id}`}>View Profile <ArrowRight aria-hidden="true" /></Link></div></div></div></article>;
}

export function FreelancersPage() {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<FilterState>(emptyFilters);
  const [sort, setSort] = useState("Most Relevant");
  const [bookmarked, setBookmarked] = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const toggleFilter = (group: keyof FilterState, value: string) => setFilters((current) => ({ ...current, [group]: current[group].includes(value) ? current[group].filter((item) => item !== value) : [...current[group], value] }));
  const clearAll = () => { setFilters(emptyFilters); setQuery(""); setSearch(""); };
  const results = useMemo(() => {
    const needle = search.trim().toLowerCase();
    const filtered = freelancers.filter((freelancer) => { const text = `${freelancer.name} ${freelancer.title} ${freelancer.skills.join(" ")} ${freelancer.categories.join(" ")} ${freelancer.description} ${freelancer.location}`.toLowerCase(); return (!needle || text.includes(needle)) && (!filters.locations.length || filters.locations.some((location) => freelancer.location.includes(location))) && (!filters.availability.length || filters.availability.some((value) => freelancer.availability.toLowerCase().includes(value.replace(" now", "").toLowerCase().replace(" this week", " this week")))) && (!filters.experience.length || filters.experience.includes(freelancer.experienceLevel)) && (!filters.categories.length || filters.categories.some((category) => freelancer.categories.includes(category))); });
    return [...filtered].sort((a, b) => sort === "Highest Rated" ? b.rating - a.rating : sort === "Lowest Hourly Rate" ? a.hourlyRate - b.hourlyRate : sort === "Highest Hourly Rate" ? b.hourlyRate - a.hourlyRate : sort === "Most Experienced" ? b.completedProjects - a.completedProjects : sort === "Recently Available" ? a.lastActive - b.lastActive : Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  }, [filters, search, sort]);
  const featured = results.find((freelancer) => freelancer.featured);
  const grid = results.filter((freelancer) => freelancer.id !== featured?.id);
  const mobileOrder = ["alex-m", "ravi-s", "kevin-b"];
  const mobileResults = grid.slice().sort((a, b) => (mobileOrder.indexOf(a.id) < 0 ? 999 : mobileOrder.indexOf(a.id)) - (mobileOrder.indexOf(b.id) < 0 ? 999 : mobileOrder.indexOf(b.id))).slice(0, visibleCount);
  const toggleBookmark = (id: string) => setBookmarked((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const filterCount = Object.values(filters).flat().length;
  const searchForm = <div className="freelancer-mobile-search"><label><span>Keywords</span><div><MagnifyingGlass aria-hidden="true" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search freelancers or skills..." /></div></label><label><span>Location</span><div><MapPin aria-hidden="true" /><input placeholder="All locations" onChange={(event) => setFilters((current) => ({ ...current, locations: event.target.value ? [event.target.value] : [] }))} /></div></label><button type="button" className="freelancer-primary-button" onClick={() => setSearch(query)}>Search Freelancers <ArrowRight aria-hidden="true" /></button></div>;

  return <div className="freelancers-page">
    <SiteHeader activePage="freelancers" />
  <main><section className="freelancers-hero"><p className="freelancers-kicker">Find talent for your next project</p><h1>Find the Right Freelancer in Suriname</h1><p>Discover skilled professionals across Paramaribo, Wanica and beyond. Find the right freelancer for your next project based on skills, experience, availability and rates.</p>{searchForm}</section><section className="freelancers-content"><aside className="freelancers-sidebar"><div className="freelancer-filter-heading"><h2>Filters</h2><button type="button" onClick={clearAll}>Clear All</button></div><label className="freelancer-keyword"><span>Keywords</span><div><MagnifyingGlass aria-hidden="true" /><input value={query} onChange={(event) => { setQuery(event.target.value); setSearch(event.target.value); }} placeholder="Search freelancers or skills..." /></div></label><Filters filters={filters} toggleFilter={toggleFilter} /></aside><div className="freelancers-results"><button className="freelancer-filter-toggle" type="button" onClick={() => setFilterOpen((open) => !open)} aria-expanded={filterOpen}><span>Filters {filterCount ? `(${filterCount})` : ""}</span><SlidersHorizontal aria-hidden="true" /></button>{filterOpen ? <div className="freelancer-mobile-panel"><div className="freelancer-filter-heading"><h2>Filters</h2><button type="button" onClick={clearAll}>Clear All</button><button className="freelancer-close" type="button" aria-label="Close filters" onClick={() => setFilterOpen(false)}><X aria-hidden="true" /></button></div><Filters filters={filters} toggleFilter={toggleFilter} /></div> : null}<div className="freelancers-toolbar"><span>Showing <strong className="desktop-freelancer-count">1-12 of 148 freelancers</strong><strong className="mobile-freelancer-count">{results.length + 139} Freelancers</strong></span><label>Sort by: <select value={sort} onChange={(event) => setSort(event.target.value)}><option>Most Relevant</option><option>Highest Rated</option><option>Lowest Hourly Rate</option><option>Highest Hourly Rate</option><option>Most Experienced</option><option>Recently Available</option></select><CaretDown aria-hidden="true" /></label></div><div className="freelancer-desktop-results">{featured ? <FeaturedFreelancer freelancer={featured} bookmarked={bookmarked.includes(featured.id)} toggleBookmark={toggleBookmark} /> : null}<div className="freelancer-grid">{grid.map((freelancer) => <FreelancerCard key={freelancer.id} freelancer={freelancer} bookmarked={bookmarked.includes(freelancer.id)} toggleBookmark={toggleBookmark} />)}</div><div className="freelancer-pagination"><button type="button" aria-label="Previous page"><ArrowLeft aria-hidden="true" /></button><button className="active" type="button">1</button><button type="button">2</button><button type="button">3</button><button type="button">4</button><span>...</span><button type="button">10</button><button type="button" aria-label="Next page"><ArrowRight aria-hidden="true" /></button></div></div><div className="freelancer-mobile-results">{mobileResults.map((freelancer) => <FreelancerCard key={freelancer.id} freelancer={freelancer} bookmarked={bookmarked.includes(freelancer.id)} toggleBookmark={toggleBookmark} />)}<button className="freelancer-load-more" type="button" onClick={() => setVisibleCount((count) => count + 3)}>Load More Freelancers</button></div></div></section></main><footer className="freelancers-footer"><Link className="freelancers-footer-brand" href="/nl">Betterwork</Link><span>© 2024 Betterwork. Professional Networking for Suriname.</span><nav aria-label="Footer navigation"><Link href="/terms">Terms of Service</Link><Link href="/privacy">Privacy Policy</Link><Link href="/contact">Contact Us</Link><Link href="/careers">Careers</Link></nav></footer></div>;
}
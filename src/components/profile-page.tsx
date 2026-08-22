"use client";

import { ArrowRight, Briefcase, Check, DotsThree, Envelope, Leaf, List, MapPin, PencilSimple, Plus, UserCircle, X } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { profile, type Experience, type PortfolioProject } from "@/lib/profile";

export function ProfileHeader() {
  return <header className="profile-header"><div className="profile-header-inner"><Link className="profile-wordmark" href="/nl" aria-label="ConnectSu home"><Leaf aria-hidden="true" weight="fill" /><span>ConnectSu</span></Link><nav className="profile-nav" aria-label="Primary navigation"><Link href="/jobs">Jobs</Link><Link href="/hire">Hire</Link><Link href="/freelancers">Freelancers</Link><Link href="/about">About</Link></nav><div className="profile-header-actions"><button className="profile-search-button" type="button" aria-label="Search"><DotsThree aria-hidden="true" /></button><Link className="profile-indicator active" href="/profile"><UserCircle aria-hidden="true" /><span>Profile</span></Link><Link className="profile-auth-button" href="/signup">Log in / Sign up</Link><button className="profile-menu-button" type="button" aria-label="Open menu"><List aria-hidden="true" /></button></div></div></header>;
}

export function ProfileSidebar() {
  return <aside className="profile-sidebar"><div className="profile-avatar"><Image src="/images/hero-collaboration.png" alt="Amba Pinas" fill sizes="(max-width: 900px) 128px, 160px" /></div><h1>{profile.name}</h1><p className="profile-title">{profile.title}</p><p className="profile-location"><MapPin aria-hidden="true" />{profile.location}</p><Link className="profile-edit-button" href="/profile/edit"><PencilSimple aria-hidden="true" />Edit Profile</Link><div className="profile-contact"><h2>Contact &amp; Links</h2><a href="mailto:amba@example.sr"><Envelope aria-hidden="true" />amba@example.sr</a><a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn <ArrowRight aria-hidden="true" /></a></div></aside>;
}

export function SkillTags() {
  return <section className="profile-section profile-skills" aria-labelledby="skills-title"><div className="profile-section-heading"><h2 id="skills-title">Core Skills</h2><button type="button" aria-label="Add skill"><Plus aria-hidden="true" /></button></div><div className="profile-skill-list">{profile.skills.map((skill) => <span key={skill}>{skill}</span>)}</div></section>;
}

export function ProfileStrength() {
  return <section className="profile-strength" aria-labelledby="strength-title"><div className="profile-section-heading"><h2 id="strength-title">Profile Strength</h2><span><Check aria-hidden="true" />{profile.strength.level}</span></div><div className="profile-strength-value"><strong>{profile.strength.completion}%</strong><span>Complete</span></div><div className="profile-progress" role="progressbar" aria-valuenow={profile.strength.completion} aria-valuemin={0} aria-valuemax={100}><span style={{ width: `${profile.strength.completion}%` }} /></div><p>{profile.strength.note}</p></section>;
}

function ExperienceItem({ experience }: { experience: Experience }) {
  return <article className="profile-experience-item"><span className={`profile-timeline-dot${experience.current ? " current" : ""}`} aria-hidden="true" /><div className="profile-experience-icon"><Briefcase aria-hidden="true" /></div><div className="profile-experience-copy"><div className="profile-experience-title"><div><h3>{experience.title}</h3><p>{experience.company} <span>•</span> {experience.type}</p></div><span className="profile-date-badge">{experience.dates}</span></div><p className="profile-experience-description">{experience.description}</p><span className="profile-duration">{experience.duration}</span></div></article>;
}

export function ExperienceTimeline() {
  return <section className="profile-section profile-experience" aria-labelledby="experience-title"><div className="profile-section-heading"><h2 id="experience-title">Experience</h2><button type="button" aria-label="Add experience"><Plus aria-hidden="true" /></button></div><div className="profile-timeline">{profile.experiences.map((experience) => <ExperienceItem key={`${experience.company}-${experience.title}`} experience={experience} />)}</div></section>;
}

export function PortfolioCard({ project }: { project: PortfolioProject }) {
  return <article className="profile-project"><div className="profile-project-image"><Image src={project.image} alt={project.alt} fill sizes="(max-width: 900px) 100vw, 42vw" /></div><h3>{project.title}</h3><p>{project.type}</p></article>;
}

export function ProfilePage() {
  const [notice, setNotice] = useState(false);
  return <div className="profile-page"><ProfileHeader /><main className="profile-layout"><ProfileSidebar /><div className="profile-main"><section className="profile-mobile-hero"><div className="profile-mobile-cover" /><div className="profile-avatar mobile"><Image src="/images/hero-collaboration.png" alt="Amba Pinas" fill sizes="128px" /></div><h1>{profile.name}</h1><p className="profile-title">{profile.title}</p><p className="profile-location"><MapPin aria-hidden="true" />{profile.location}</p><Link className="profile-edit-button" href="/profile/edit"><PencilSimple aria-hidden="true" />Edit Profile</Link><p className="profile-mobile-bio">{profile.bio}</p></section><section className="profile-card profile-about"><div className="profile-section-heading"><h2>About Me</h2><button type="button" aria-label="Edit about me" onClick={() => setNotice(true)}><PencilSimple aria-hidden="true" /></button></div><p>{profile.bio}</p></section><div className="profile-skills-strength"><SkillTags /><ProfileStrength /></div><ExperienceTimeline /><section className="profile-section profile-portfolio" aria-labelledby="portfolio-title"><div className="profile-section-heading"><h2 id="portfolio-title">Featured Projects</h2><Link href="/portfolio">View All <ArrowRight aria-hidden="true" /></Link><button type="button" aria-label="Add project" onClick={() => setNotice(true)}><Plus aria-hidden="true" /></button></div><div className="profile-project-grid">{profile.projects.map((project) => <PortfolioCard key={project.title} project={project} />)}</div></section></div></main><footer className="profile-footer"><Link className="profile-footer-brand" href="/nl">ConnectSu</Link><span>© 2024 ConnectSu. Professional Networking for Suriname.</span><nav aria-label="Footer navigation"><Link href="/terms">Terms of Service</Link><Link href="/privacy">Privacy Policy</Link><Link href="/contact">Contact Us</Link><Link href="/careers">Careers</Link></nav></footer>{notice ? <div className="profile-notice" role="dialog" aria-modal="true" aria-labelledby="notice-title"><div><button type="button" aria-label="Close" onClick={() => setNotice(false)}><X aria-hidden="true" /></button><h2 id="notice-title">Coming soon</h2><p>This profile action will be available soon.</p><button className="profile-edit-button" type="button" onClick={() => setNotice(false)}>Close</button></div></div> : null}</div>;
}
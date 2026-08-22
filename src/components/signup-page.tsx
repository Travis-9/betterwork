"use client";

import { ArrowLeft, ArrowRight, Briefcase, Check, Leaf, UserCircle } from "@phosphor-icons/react";
import Link from "next/link";
import { FormEvent, useState } from "react";

type AccountType = "candidate" | "employer";

const accountTypes: Array<{ id: AccountType; desktopTitle: string; mobileTitle: string; description: string; mobileDescription: string; icon: typeof UserCircle }> = [
  { id: "candidate", desktopTitle: "Candidate", mobileTitle: "I'm a Candidate", description: "I want to find freelance work or full-time jobs in Suriname.", mobileDescription: "Looking for jobs or freelance work.", icon: UserCircle },
  { id: "employer", desktopTitle: "Employer", mobileTitle: "I'm an Employer", description: "I want to post jobs and hire top local talent.", mobileDescription: "Looking to post jobs and hire talent.", icon: Briefcase },
];

export function FormInput({ id, label, placeholder, type = "text", value, onChange }: { id: string; label: string; placeholder: string; type?: string; value: string; onChange: (value: string) => void }) {
  return <label className="signup-field" htmlFor={id}><span>{label}</span><input id={id} name={id} type={type} placeholder={placeholder} value={value} onChange={(event) => onChange(event.target.value)} required /></label>;
}

export function ProgressBar() {
  return <div className="signup-progress-wrap"><div className="signup-progress-label"><span className="desktop-progress-copy">Step 1 of 2</span><span className="mobile-progress-copy">Step 1 of 3</span><strong>Account Type</strong></div><div className="signup-progress" role="progressbar" aria-label="Registration progress" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100}><span /></div></div>;
}

export function AccountTypeCard({ account, selected, onSelect }: { account: (typeof accountTypes)[number]; selected: boolean; onSelect: () => void }) {
  const Icon = account.icon;
  return <button className={`signup-account-card${selected ? " selected" : ""}`} type="button" aria-pressed={selected} onClick={onSelect}><span className="signup-account-icon"><Icon aria-hidden="true" weight={selected ? "fill" : "regular"} /></span><span className="signup-account-copy"><strong className="desktop-account-title">{account.desktopTitle}</strong><strong className="mobile-account-title">{account.mobileTitle}</strong><span className="desktop-account-description">{account.description}</span><span className="mobile-account-description">{account.mobileDescription}</span></span><span className="signup-radio" aria-hidden="true"><Check /></span></button>;
}

export function SignupPage() {
  const [accountType, setAccountType] = useState<AccountType | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!accountType || !name.trim() || !email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Select an account type and enter a valid name and email address.");
      return;
    }
    window.location.assign(`/signup/next?type=${accountType}`);
  }

  return <div className="signup-page"><header className="signup-header"><Link className="signup-wordmark" href="/nl" aria-label="ConnectSu home"><Leaf aria-hidden="true" weight="fill" /><span>ConnectSu</span></Link></header><main className="signup-main"><form className="signup-card" onSubmit={submit} noValidate><ProgressBar /><div className="signup-heading"><h1><span className="desktop-signup-heading">Join ConnectSu</span><span className="mobile-signup-heading">Welcome to ConnectSu</span></h1><p><span className="desktop-signup-heading">Select how you want to use the platform.</span><span className="mobile-signup-heading">How are you planning to use the platform?</span></p></div><fieldset className="signup-account-options"><legend className="sr-only">Account type</legend>{accountTypes.map((account) => <AccountTypeCard key={account.id} account={account} selected={accountType === account.id} onSelect={() => { setAccountType(account.id); setError(""); }} />)}</fieldset><div className="signup-mobile-divider" /><div className="signup-fields"><FormInput id="full-name" label="Full Name" placeholder="e.g. John Doe" value={name} onChange={setName} /><FormInput id="email" label="Email Address" placeholder="john@example.com" type="email" value={email} onChange={setEmail} /></div>{error ? <p className="signup-error" role="alert">{error}</p> : null}<div className="signup-actions"><Link className="signup-back-button" href="/nl"><ArrowLeft aria-hidden="true" />Back</Link><button className="signup-continue-button" type="submit">Continue <ArrowRight aria-hidden="true" /></button></div><p className="signup-login-prompt">Already have an account? <Link href="/login">Log in</Link></p></form></main><footer className="signup-footer"><Link className="signup-footer-brand" href="/nl">ConnectSu</Link><span>© 2024 ConnectSu. Professional Networking for Suriname.</span><nav aria-label="Footer navigation"><Link href="/terms">Terms of Service</Link><Link href="/privacy">Privacy Policy</Link><Link href="/contact">Contact Us</Link><Link href="/careers">Careers</Link></nav></footer></div>;
}
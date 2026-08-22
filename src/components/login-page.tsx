"use client";

import { ArrowRight, Check, Eye, EyeSlash, GoogleLogo, LinkedinLogo, LockKey, UserCircle } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";

type LoginStatus = "idle" | "loading" | "error" | "success";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<LoginStatus>("idle");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim() || !password) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    window.setTimeout(() => setStatus("success"), 500);
  }

  return <div className="login-page"><div className="login-visual"><Image src="/images/hero-collaboration.png" alt="Professionals collaborating in a workplace" fill priority sizes="50vw" /><div className="login-visual-overlay" /><div className="login-visual-copy"><Link className="login-wordmark light" href="/nl"><UserCircle aria-hidden="true" weight="fill" /><span>ConnectSu</span></Link><p>Empowering economic growth and professional connection within Suriname. Join our community of reliable and industrious professionals today.</p></div></div><main className="login-main"><section className="login-panel" aria-labelledby="login-title"><Link className="login-wordmark mobile" href="/nl"><UserCircle aria-hidden="true" weight="fill" /><span>ConnectSu</span></Link><div className="login-heading"><h1 id="login-title"><span className="desktop-login-copy">Welcome back</span><span className="mobile-login-copy">Welcome back. Log in to continue.</span></h1><p>Please enter your details to sign in.</p></div><form className="login-form" onSubmit={submit} noValidate><label className="login-field"><span>Email address</span><div><UserCircle aria-hidden="true" /><input type="email" autoComplete="email" placeholder="Enter your email" value={email} onChange={(event) => { setEmail(event.target.value); setStatus("idle"); }} required /></div></label><label className="login-field"><span className="login-password-label">Password <Link href="/forgot-password">Forgot password?</Link></span><div><LockKey aria-hidden="true" /><input type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="Enter your password" value={password} onChange={(event) => { setPassword(event.target.value); setStatus("idle"); }} required /><button className="login-visibility" type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeSlash aria-hidden="true" /> : <Eye aria-hidden="true" />}</button></div></label><div className="login-options"><label className="login-remember"><input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} /><span><Check aria-hidden="true" /></span>Remember me</label><Link className="login-forgot desktop-forgot" href="/forgot-password">Forgot password?</Link></div>{status === "error" ? <p className="login-message error" role="alert">Enter your email and password to continue.</p> : null}{status === "success" ? <p className="login-message success" role="status">You&apos;re signed in. Welcome back.</p> : null}<button className="login-submit" type="submit" disabled={status === "loading"}>{status === "loading" ? "Signing in..." : "Sign in"}<ArrowRight aria-hidden="true" /></button></form><div className="login-divider"><span>Or continue with</span></div><div className="login-socials"><button type="button" onClick={() => setStatus("success")}><GoogleLogo aria-hidden="true" />Google</button><button type="button" onClick={() => setStatus("success")}><LinkedinLogo aria-hidden="true" />LinkedIn</button></div><p className="login-signup">Don&apos;t have an account? <Link href="/signup">Sign up</Link></p></section></main></div>;
}
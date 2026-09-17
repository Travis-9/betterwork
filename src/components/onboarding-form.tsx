"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import type { AuthRole } from "@/lib/auth";
import { updateServerProfile } from "@/lib/auth-client";
import type { AuthCopy } from "@/lib/auth-copy";
import type { Locale } from "@/lib/i18n";

export function OnboardingForm({ locale, copy, initialName = "" }: { locale: Locale; copy: AuthCopy; initialName?: string }) {
  const router = useRouter();
  const [displayName, setDisplayName] = useState(initialName);
  const [role, setRole] = useState<AuthRole>("client");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await updateServerProfile({ displayName: displayName.trim(), primaryRole: role, locale });
      router.push(`/${locale}/account`);
      router.refresh();
    } catch {
      setError(copy.common.error);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="auth-form" onSubmit={submit}>
      <div className="field-group"><label htmlFor="displayName">{copy.common.name}</label><input id="displayName" value={displayName} onChange={(event) => setDisplayName(event.target.value)} minLength={2} maxLength={80} autoComplete="name" required /></div>
      <fieldset className="role-fieldset auth-role-fieldset"><legend>{copy.common.role}</legend><div className="role-options">{(["client", "freelancer"] as const).map((value) => <label className={role === value ? "selected" : ""} key={value}><input type="radio" name="role" checked={role === value} onChange={() => setRole(value)} />{value === "client" ? copy.common.client : copy.common.freelancer}</label>)}</div></fieldset>
      {error ? <p className="form-message error" role="alert">{error}</p> : null}
      <button className="submit-button auth-submit" type="submit" disabled={busy}>{busy ? copy.common.working : copy.onboarding.submit}</button>
    </form>
  );
}

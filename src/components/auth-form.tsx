"use client";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { createServerSession, localizedAuthError } from "@/lib/auth-client";
import type { AuthRole, SessionApiResponse } from "@/lib/auth";
import type { AuthCopy } from "@/lib/auth-copy";
import { prepareFirebaseAuth } from "@/lib/firebase-client";
import type { Locale } from "@/lib/i18n";

type AuthFormProps = {
  locale: Locale;
  copy: AuthCopy;
  mode: "login" | "signup" | "forgot";
};

export function AuthForm({ locale, copy, mode }: AuthFormProps) {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<AuthRole>("client");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function followSession(response: SessionApiResponse) {
    if (response.status === "verification_required") {
      router.push(`/${locale}/verify-email`);
      return;
    }
    if (response.status === "profile_required") {
      router.push(`/${locale}/onboarding`);
      router.refresh();
      return;
    }
    if (response.status === "authenticated") {
      router.push(`/${locale}/account`);
      router.refresh();
      return;
    }
    const failure = new Error(response.error) as Error & { code: string };
    failure.code = response.error;
    throw failure;
  }

  async function submitEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");

    try {
      const auth = await prepareFirebaseAuth();
      auth.languageCode = locale;

      if (mode === "forgot") {
        await sendPasswordResetEmail(auth, email, {
          url: `${window.location.origin}/${locale}/login`,
        });
        setSent(true);
        return;
      }

      if (mode === "signup") {
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(credential.user, { displayName: displayName.trim() });
        await sendEmailVerification(credential.user, {
          url: `${window.location.origin}/${locale}/verify-email`,
        });
        followSession(
          await createServerSession(credential.user, {
            displayName: displayName.trim(),
            primaryRole: role,
            locale,
          }),
        );
        return;
      }

      const credential = await signInWithEmailAndPassword(auth, email, password);
      followSession(await createServerSession(credential.user));
    } catch (caught) {
      setError(localizedAuthError(caught, locale));
    } finally {
      setBusy(false);
    }
  }

  async function continueWithGoogle() {
    setBusy(true);
    setError("");

    try {
      const auth = await prepareFirebaseAuth();
      auth.languageCode = locale;
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const credential = await signInWithPopup(auth, provider);
      const profile =
        mode === "signup"
          ? {
              displayName: displayName.trim() || credential.user.displayName || "Betterwork member",
              primaryRole: role,
              locale,
            }
          : undefined;
      followSession(await createServerSession(credential.user, profile));
    } catch (caught) {
      setError(localizedAuthError(caught, locale));
    } finally {
      setBusy(false);
    }
  }

  const pageCopy = copy[mode];

  return (
    <form className="auth-form" onSubmit={submitEmail}>
      {mode === "signup" ? (
        <div className="field-group">
          <label htmlFor="displayName">{copy.common.name}</label>
          <input id="displayName" name="displayName" value={displayName} onChange={(event) => setDisplayName(event.target.value)} autoComplete="name" minLength={2} maxLength={80} required />
        </div>
      ) : null}

      <div className="field-group">
        <label htmlFor="email">{copy.common.email}</label>
        <input id="email" name="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" maxLength={254} required />
      </div>

      {mode !== "forgot" ? (
        <div className="field-group">
          <div className="auth-label-row">
            <label htmlFor="password">{copy.common.password}</label>
            {mode === "login" ? <Link href={`/${locale}/forgot-password`}>{copy.login.forgot}</Link> : null}
          </div>
          <input id="password" name="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete={mode === "signup" ? "new-password" : "current-password"} minLength={8} maxLength={128} required />
        </div>
      ) : null}

      {mode === "signup" ? (
        <fieldset className="role-fieldset auth-role-fieldset">
          <legend>{copy.common.role}</legend>
          <div className="role-options">
            {(["client", "freelancer"] as const).map((value) => (
              <label className={role === value ? "selected" : ""} key={value}>
                <input type="radio" name="role" value={value} checked={role === value} onChange={() => setRole(value)} />
                {value === "client" ? copy.common.client : copy.common.freelancer}
              </label>
            ))}
          </div>
        </fieldset>
      ) : null}

      {error ? <p className="form-message error" role="alert">{error}</p> : null}
      {sent && mode === "forgot" ? <p className="auth-success" role="status">{copy.forgot.success}</p> : null}

      <button className="submit-button auth-submit" type="submit" disabled={busy}>
        <span>{busy ? copy.common.working : pageCopy.submit}</span>
        <span aria-hidden="true">→</span>
      </button>

      {mode !== "forgot" ? (
        <>
          <div className="auth-divider"><span>{copy.common.or}</span></div>
          <button className="google-button" type="button" onClick={continueWithGoogle} disabled={busy}>
            <span className="google-mark" aria-hidden="true">G</span>
            {copy.common.google}
          </button>
        </>
      ) : null}

      {mode === "login" ? <p className="auth-switch">{copy.login.prompt} <Link href={`/${locale}/signup`}>{copy.login.link}</Link></p> : null}
      {mode === "signup" ? <><p className="auth-switch">{copy.signup.prompt} <Link href={`/${locale}/login`}>{copy.signup.link}</Link></p><p className="auth-disclaimer">{copy.signup.disclaimer}</p></> : null}
      {mode === "forgot" ? <p className="auth-switch"><Link href={`/${locale}/login`}>{copy.forgot.back}</Link></p> : null}
    </form>
  );
}

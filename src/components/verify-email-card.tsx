"use client";

import { sendEmailVerification } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createServerSession, localizedAuthError } from "@/lib/auth-client";
import type { AuthCopy } from "@/lib/auth-copy";
import { prepareFirebaseAuth } from "@/lib/firebase-client";
import type { Locale } from "@/lib/i18n";

export function VerifyEmailCard({ locale, copy }: { locale: Locale; copy: AuthCopy }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function currentUser() {
    const auth = await prepareFirebaseAuth();
    auth.languageCode = locale;
    return auth.currentUser;
  }

  async function checkVerification() {
    setBusy(true);
    setError("");
    try {
      const user = await currentUser();
      if (!user) throw new Error("no_user");
      await user.reload();
      const response = await createServerSession(user);
      if (response.status === "authenticated") {
        router.push(`/${locale}/account`);
        router.refresh();
      } else if (response.status === "profile_required") {
        router.push(`/${locale}/onboarding`);
        router.refresh();
      } else if (response.status === "verification_required") {
        setError(copy.verify.body);
      } else {
        throw new Error(response.error);
      }
    } catch (caught) {
      setError(caught instanceof Error && caught.message === "no_user" ? copy.verify.noUser : localizedAuthError(caught, locale));
    } finally {
      setBusy(false);
    }
  }

  async function resend() {
    setBusy(true);
    setError("");
    try {
      const user = await currentUser();
      if (!user) throw new Error("no_user");
      await sendEmailVerification(user, { url: `${window.location.origin}/${locale}/verify-email` });
      setMessage(copy.verify.resent);
    } catch (caught) {
      setError(caught instanceof Error && caught.message === "no_user" ? copy.verify.noUser : localizedAuthError(caught, locale));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="auth-form verification-actions">
      {message ? <p className="auth-success" role="status">{message}</p> : null}
      {error ? <p className="form-message error" role="alert">{error}</p> : null}
      <button className="submit-button auth-submit" type="button" onClick={checkVerification} disabled={busy}>{busy ? copy.common.working : copy.verify.check}</button>
      <button className="google-button" type="button" onClick={resend} disabled={busy}>{copy.verify.resend}</button>
      <p className="auth-switch"><Link href={`/${locale}/login`}>{copy.verify.login}</Link></p>
    </div>
  );
}

"use client";

import {
  ArrowRight,
  Briefcase,
  CheckCircle,
  LockKey,
  UserCircle,
} from "@phosphor-icons/react";
import { FormEvent, useState, useTransition } from "react";
import type { LandingCopy, Locale } from "@/lib/i18n";
import type { WaitlistApiResponse, WaitlistRole } from "@/lib/waitlist";

type WaitlistFormProps = {
  locale: Locale;
  copy: LandingCopy["form"];
};

type FormStatus = "idle" | "success" | "duplicate" | "error";

export function WaitlistForm({ locale, copy }: WaitlistFormProps) {
  const [role, setRole] = useState<WaitlistRole>("client");
  const [summary, setSummary] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  function resetForm() {
    setRole("client");
    setSummary("");
    setEmail("");
    setMessage("");
    setStatus("idle");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      setStatus("error");
      setMessage(copy.validationError);
      return;
    }

    const formData = new FormData(form);

    startTransition(async () => {
      setStatus("idle");
      setMessage("");

      try {
        const response = await fetch("/api/waitlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            role,
            projectSummary: summary,
            locale,
            company: formData.get("company") ?? "",
          }),
        });
        const result = (await response.json()) as WaitlistApiResponse;

        if (result.status === "created") {
          setStatus("success");
          return;
        }

        if (result.status === "duplicate") {
          setStatus("duplicate");
          return;
        }

        setStatus("error");
        setMessage(
          result.status === "unavailable"
            ? copy.configurationError
            : result.status === "invalid"
              ? copy.validationError
              : copy.serverError,
        );
      } catch {
        setStatus("error");
        setMessage(copy.serverError);
      }
    });
  }

  if (status === "success" || status === "duplicate") {
    return (
      <div className="waitlist-card waitlist-result glass-panel" id="early-access">
        <CheckCircle aria-hidden="true" weight="fill" />
        <h2>{status === "success" ? copy.successTitle : copy.duplicateTitle}</h2>
        <p>{status === "success" ? copy.successBody : copy.duplicateBody}</p>
        <button type="button" onClick={resetForm}>
          {copy.reset}
        </button>
      </div>
    );
  }

  return (
    <form
      className="waitlist-card glass-panel"
      id="early-access"
      noValidate
      onSubmit={handleSubmit}
    >
      <h2>{copy.title}</h2>

      <div className="field-group">
        <label htmlFor="project-summary">{copy.summaryLabel}</label>
        <textarea
          id="project-summary"
          name="projectSummary"
          minLength={10}
          maxLength={300}
          placeholder={copy.summaryPlaceholder}
          required
          rows={3}
          value={summary}
          onChange={(event) => setSummary(event.target.value)}
        />
        <span className="character-count" aria-live="polite">
          {summary.length}/300
        </span>
      </div>

      <fieldset className="role-fieldset">
        <legend>{copy.roleLabel}</legend>
        <div className="role-options">
          <button
            className={role === "client" ? "selected" : ""}
            type="button"
            aria-pressed={role === "client"}
            onClick={() => setRole("client")}
          >
            <UserCircle aria-hidden="true" weight={role === "client" ? "fill" : "regular"} />
            {copy.client}
          </button>
          <button
            className={role === "freelancer" ? "selected" : ""}
            type="button"
            aria-pressed={role === "freelancer"}
            onClick={() => setRole("freelancer")}
          >
            <Briefcase aria-hidden="true" weight={role === "freelancer" ? "fill" : "regular"} />
            {copy.freelancer}
          </button>
        </div>
      </fieldset>

      <div className="field-group">
        <label htmlFor="waitlist-email">{copy.emailLabel}</label>
        <input
          id="waitlist-email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={254}
          placeholder={copy.emailPlaceholder}
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div className="honeypot" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" ? (
        <p className="form-message error" role="alert">
          {message}
        </p>
      ) : null}

      <button className="submit-button" type="submit" disabled={isPending}>
        <span>{isPending ? copy.submitting : copy.submit}</span>
        <ArrowRight aria-hidden="true" />
      </button>

      <p className="privacy-note">
        <LockKey aria-hidden="true" />
        {copy.privacy}
      </p>
    </form>
  );
}

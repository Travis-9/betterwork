"use client";

import { useState } from "react";
import { BookmarkSimple, Check, ShareNetwork } from "@phosphor-icons/react";
import { toggleSavedItem, useSavedItems } from "@/components/use-saved-items";

type DetailActionsProps = {
  kind: "job" | "freelancer";
  id: string;
  shareLabel: string;
  savedLabel: string;
  unsavedLabel: string;
};

export function DetailActions({ kind, id, shareLabel, savedLabel, unsavedLabel }: DetailActionsProps) {
  const saved = useSavedItems(kind).includes(id);
  const [shareMessage, setShareMessage] = useState("");

  function toggleSaved() {
    if (!toggleSavedItem(kind, id)) {
      setShareMessage("This browser could not save the item.");
    }
  }

  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ url });
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        setShareMessage("Link copied");
      } else {
        const input = document.createElement("textarea");
        input.value = url;
        input.setAttribute("readonly", "");
        input.style.position = "fixed";
        input.style.opacity = "0";
        document.body.appendChild(input);
        input.select();
        const copied = document.execCommand("copy");
        input.remove();
        if (!copied) throw new Error("clipboard_unavailable");
        setShareMessage("Link copied");
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
      setShareMessage("Could not share this link");
    }
  }

  return (
    <div className="detail-actions">
      <button type="button" onClick={toggleSaved} aria-pressed={saved} aria-label={saved ? unsavedLabel : savedLabel} title={saved ? unsavedLabel : savedLabel}>
        <BookmarkSimple weight={saved ? "fill" : "regular"} aria-hidden="true" />
        <span>{saved ? unsavedLabel : savedLabel}</span>
      </button>
      <button type="button" onClick={share} aria-label={shareLabel} title={shareLabel}>
        <ShareNetwork aria-hidden="true" />
        <span>{shareLabel}</span>
      </button>
      {shareMessage ? <span className="detail-action-status" role="status"><Check aria-hidden="true" />{shareMessage}</span> : null}
    </div>
  );
}
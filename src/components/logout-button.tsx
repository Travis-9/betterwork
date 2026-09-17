"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteServerSession } from "@/lib/auth-client";
import type { Locale } from "@/lib/i18n";

export function LogoutButton({ locale, label }: { locale: Locale; label: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function logout() {
    setBusy(true);
    try {
      await deleteServerSession();
      router.push(`/${locale}`);
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return <button className="account-logout" type="button" onClick={logout} disabled={busy}>{label}</button>;
}

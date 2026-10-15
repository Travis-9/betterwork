"use client";

import { useSyncExternalStore } from "react";

type SavedKind = "job" | "freelancer";
const changeEvent = "betterwork:saved-items-changed";

function storageKey(kind: SavedKind) {
  return `betterwork:saved:${kind}s`;
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(changeEvent, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(changeEvent, callback);
  };
}

function getSnapshot(key: string) {
  try {
    return window.localStorage.getItem(key) ?? "[]";
  } catch {
    return "[]";
  }
}

export function useSavedItems(kind: SavedKind) {
  const snapshot = useSyncExternalStore(
    subscribe,
    () => getSnapshot(storageKey(kind)),
    () => "[]",
  );
  try {
    const parsed: unknown = JSON.parse(snapshot);
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : [];
  } catch {
    return [];
  }
}

export function toggleSavedItem(kind: SavedKind, id: string) {
  const key = storageKey(kind);
  const current = getSnapshot(key);
  let savedIds: string[] = [];
  try {
    const parsed: unknown = JSON.parse(current);
    if (Array.isArray(parsed)) savedIds = parsed.filter((value): value is string => typeof value === "string");
  } catch {
    savedIds = [];
  }
  const next = savedIds.includes(id)
    ? savedIds.filter((savedId) => savedId !== id)
    : [...new Set([...savedIds, id])];
  try {
    window.localStorage.setItem(key, JSON.stringify(next));
    window.dispatchEvent(new Event(changeEvent));
  } catch {
    return false;
  }
  return true;
}
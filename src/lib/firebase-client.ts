"use client";

import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  inMemoryPersistence,
  setPersistence,
  type Auth,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialized on first use, never at import: client modules are also evaluated
// during SSR, and getAuth() throws when the public config is missing, which
// would otherwise take down every page that merely imports this file.
function getFirebaseApp() {
  return getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
}

let authInstance: Auth | null = null;

export function getFirebaseAuth() {
  authInstance ??= getAuth(getFirebaseApp());
  return authInstance;
}

let persistencePromise: Promise<void> | null = null;

export function prepareFirebaseAuth() {
  const auth = getFirebaseAuth();
  persistencePromise ??= setPersistence(auth, inMemoryPersistence);
  return persistencePromise.then(() => auth);
}

let analyticsPromise: Promise<unknown> | null = null;

export function enableFirebaseAnalytics() {
  if (process.env.NODE_ENV !== "production" || typeof window === "undefined") {
    return Promise.resolve(null);
  }

  analyticsPromise ??= import("firebase/analytics")
    .then(async (analytics) => {
      if (!(await analytics.isSupported())) return null;
      return analytics.getAnalytics(getFirebaseApp());
    })
    .catch(() => null);

  return analyticsPromise;
}

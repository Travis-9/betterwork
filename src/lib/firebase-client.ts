"use client";

import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  inMemoryPersistence,
  setPersistence,
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

export const firebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);

let persistencePromise: Promise<void> | null = null;

export function prepareFirebaseAuth() {
  persistencePromise ??= setPersistence(firebaseAuth, inMemoryPersistence);
  return persistencePromise.then(() => firebaseAuth);
}

let analyticsPromise: Promise<unknown> | null = null;

export function enableFirebaseAnalytics() {
  if (process.env.NODE_ENV !== "production" || typeof window === "undefined") {
    return Promise.resolve(null);
  }

  analyticsPromise ??= import("firebase/analytics").then(async (analytics) => {
    if (!(await analytics.isSupported())) return null;
    return analytics.getAnalytics(firebaseApp);
  });

  return analyticsPromise;
}

import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

export class FirebaseConfigurationError extends Error {
  constructor() {
    super("Firebase Admin credentials are not configured.");
    this.name = "FirebaseConfigurationError";
  }
}

export function getFirebaseDb() {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new FirebaseConfigurationError();
  }

  const app =
    getApps()[0] ??
    initializeApp({
      credential: cert({ projectId, clientEmail, privateKey }),
    });

  return getFirestore(app);
}

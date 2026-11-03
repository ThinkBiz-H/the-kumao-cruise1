import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const REQUIRED_KEYS = ['apiKey', 'authDomain', 'projectId', 'appId'];

export const isFirebaseConfigured = REQUIRED_KEYS.every((key) => Boolean(firebaseConfig[key]));

export class FirebaseConfigError extends Error {
  constructor() {
    super(
      'Firebase is not configured. Copy .env.example to .env and add your Firebase web app keys.',
    );
    this.name = 'FirebaseConfigError';
  }
}

let db = null;

/** Lazily initialises Firebase so the SDK stays out of the initial bundle. */
export function getDb() {
  if (!isFirebaseConfigured) throw new FirebaseConfigError();
  if (!db) {
    const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    db = getFirestore(app);
  }
  return db;
}

import { initializeApp, getApps } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDocs, query, where } from 'firebase/firestore';

/**
 * Firebase init helper.
 * Uses FIREBASE_* env values. These are placeholders; don't commit secrets.
 * In Expo, provide env values via app.config.js or runtime config.
 */

export function initializeFirebase() {
  if (getApps().length) return;

  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  };

  try {
    initializeApp(firebaseConfig);
  } catch (e) {
    // If config missing, skip initialization (local-only mode)
    console.warn('Firebase init skipped or failed', e);
  }
}

export async function signInAnonymouslySafe() {
  try {
    const auth = getAuth();
    return await signInAnonymously(auth);
  } catch (e) {
    console.warn('Anonymous sign-in failed', e);
    return null;
  }
}

// Example Firestore helper (save profile)
export async function saveUserProfile(uid: string, profile: any) {
  try {
    const db = getFirestore();
    const ref = doc(db, 'users', uid);
    await setDoc(ref, profile, { merge: true });
  } catch (e) {
    console.warn('saveUserProfile error', e);
  }
}

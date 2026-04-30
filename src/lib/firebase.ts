import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics, Analytics, logEvent, setAnalyticsCollectionEnabled, isSupported } from "firebase/analytics";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase app (singleton-safe)
const app: FirebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);

// ---------- Analytics ----------
// We keep a module-level promise so multiple callers share the same instance.
let analyticsInstance: Analytics | null = null;

/**
 * Returns the Analytics instance when running in a supported browser environment.
 * Returns null on the server or in unsupported browsers.
 */
export async function getFirebaseAnalytics(): Promise<Analytics | null> {
    if (typeof window === "undefined") return null;
    if (analyticsInstance) return analyticsInstance;

    const supported = await isSupported();
    if (!supported) return null;

    analyticsInstance = getAnalytics(app);
    return analyticsInstance;
}

/**
 * Enable or disable analytics data collection (respects cookie consent).
 * Call with `false` when the user rejects analytical cookies.
 */
export async function setAnalyticsEnabled(enabled: boolean): Promise<void> {
    const analytics = await getFirebaseAnalytics();
    if (analytics) {
        setAnalyticsCollectionEnabled(analytics, enabled);
    }
}

/**
 * Log a custom GA4 event.
 * Silently no-ops on the server or when analytics is unavailable.
 */
export async function trackEvent(
    eventName: string,
    params?: Record<string, string | number | boolean>
): Promise<void> {
    const analytics = await getFirebaseAnalytics();
    if (analytics) {
        logEvent(analytics, eventName, params);
    }
}

export { app, storage };

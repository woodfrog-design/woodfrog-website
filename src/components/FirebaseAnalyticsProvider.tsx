'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// Measurement ID is hardcoded — safe because it's always public,
// and avoids the env-var-not-set-in-production problem.
const GA_MEASUREMENT_ID = 'G-Z23KKT3XYT';

declare global {
    interface Window {
        gtag: (...args: unknown[]) => void;
        dataLayer: unknown[];
    }
}

/**
 * Sends a GA4 page_view hit via gtag.
 * Called on mount and on every client-side navigation.
 */
function sendPageView(url: string) {
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
    window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
        page_location: window.location.href,
        page_title: document.title,
        debug_mode: false, // set true temporarily to test in DebugView
    });
}

/**
 * FirebaseAnalyticsProvider
 *
 * Tracks every page view via GA4 (Google Analytics 4 / Firebase Analytics).
 * The gtag.js loader is injected into <head> by layout.tsx via Next.js Script.
 * This component only handles the SPA page_view calls on route changes.
 */
export function FirebaseAnalyticsProvider() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
        sendPageView(url);
    }, [pathname, searchParams]);

    return null;
}

export { GA_MEASUREMENT_ID };

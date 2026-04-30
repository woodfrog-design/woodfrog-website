'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const GA_MEASUREMENT_ID = 'G-Z23KKT3XYT';

declare global {
    interface Window {
        gtag: (...args: unknown[]) => void;
        dataLayer: unknown[];
    }
}

/**
 * Injects gtag.js into the page and initialises the dataLayer.
 * Runs once — subsequent calls are no-ops.
 */
function ensureGtagLoaded(): Promise<void> {
    return new Promise((resolve) => {
        // Already loaded
        if (typeof window.gtag === 'function') {
            resolve();
            return;
        }

        // Initialise dataLayer + define gtag() immediately so calls
        // made before the network script finishes are queued.
        window.dataLayer = window.dataLayer || [];
        window.gtag = function gtag() {
            // eslint-disable-next-line prefer-rest-params
            window.dataLayer.push(arguments);
        };
        window.gtag('js', new Date());
        window.gtag('config', GA_MEASUREMENT_ID, { send_page_view: true });

        // Inject the Google tag script
        const script = document.createElement('script');
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => resolve(); // still resolve so the app isn't stuck
        document.head.appendChild(script);
    });
}

/**
 * FirebaseAnalyticsProvider
 *
 * 1. Injects gtag.js + initialises GA4 on first render (client only).
 * 2. Sends a page_view event on every Next.js route change.
 */
export function FirebaseAnalyticsProvider() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const loaded = useRef(false);

    // ── Inject gtag.js once ───────────────────────────────────────────────
    useEffect(() => {
        if (loaded.current) return;
        loaded.current = true;
        ensureGtagLoaded();
    }, []);

    // ── Track page views on every navigation ─────────────────────────────
    useEffect(() => {
        const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

        // gtag may not be ready on the very first render — wait for it
        ensureGtagLoaded().then(() => {
            window.gtag('event', 'page_view', {
                page_path: url,
                page_location: window.location.href,
                page_title: document.title,
            });
        });
    }, [pathname, searchParams]);

    return null;
}

export { GA_MEASUREMENT_ID };

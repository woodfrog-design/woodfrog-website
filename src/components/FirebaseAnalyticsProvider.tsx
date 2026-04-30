'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { getFirebaseAnalytics } from '@/lib/firebase';
import { logEvent } from 'firebase/analytics';

/**
 * FirebaseAnalyticsProvider
 *
 * Bootstraps Firebase Analytics unconditionally and sends a `page_view`
 * event on every client-side navigation.
 *
 * Mount inside a <Suspense> in the root layout.
 */
export function FirebaseAnalyticsProvider() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const initialized = useRef(false);

    // Bootstrap analytics once on mount
    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;
        getFirebaseAnalytics().catch(console.error);
    }, []);

    // Send page_view on every route change
    useEffect(() => {
        (async () => {
            const analytics = await getFirebaseAnalytics();
            if (!analytics) return;

            const url =
                pathname +
                (searchParams?.toString() ? `?${searchParams.toString()}` : '');

            logEvent(analytics, 'page_view', {
                page_path: url,
                page_location: window.location.href,
                page_title: document.title,
            });
        })();
    }, [pathname, searchParams]);

    return null;
}

'use client';

import { useEffect, useRef, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Lenis from 'lenis';

const ScrollWatcher = ({ lenisRef }: { lenisRef: React.MutableRefObject<Lenis | null> }) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { immediate: true });
        }
    }, [pathname, searchParams, lenisRef]);

    return null;
};

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 3,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
        });

        lenisRef.current = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    return (
        <>
            <Suspense fallback={null}>
                <ScrollWatcher lenisRef={lenisRef} />
            </Suspense>
            {children}
        </>
    );
};

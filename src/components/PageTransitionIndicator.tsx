"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import gsap from "gsap";

export function PageTransitionIndicator() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const overlayRef = useRef<HTMLDivElement>(null);
    const [isNavigating, setIsNavigating] = useState(false);
    const lastPathname = useRef(pathname + searchParams.toString());

    const hideOverlay = () => {
        if (overlayRef.current) {
            gsap.killTweensOf(overlayRef.current);
            gsap.to(overlayRef.current, {
                opacity: 0,
                duration: 0.4,
                ease: "power2.out",
                onComplete: () => {
                    setIsNavigating(false);
                    if (overlayRef.current) {
                        overlayRef.current.style.display = "none";
                    }
                },
            });
        }
    };

    useEffect(() => {
        const currentPath = pathname + searchParams.toString();

        // Always fade out the overlay on any path change (including back/forward navigation)
        lastPathname.current = currentPath;
        if (overlayRef.current) {
            gsap.killTweensOf(overlayRef.current);
            overlayRef.current.style.display = "block";
            gsap.to(overlayRef.current, {
                opacity: 0,
                duration: 0.6,
                ease: "power2.out",
                onComplete: () => {
                    setIsNavigating(false);
                    if (overlayRef.current) {
                        overlayRef.current.style.display = "none";
                    }
                },
            });
        }
    }, [pathname, searchParams]);

    // Handle browser back/forward button navigation explicitly
    useEffect(() => {
        const handlePopState = () => {
            // Reset the lastPathname tracking so that the path-change effect always fires
            lastPathname.current = "";
            setIsNavigating(false);
            hideOverlay();
        };

        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const handleNavigationStart = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest("a");

            if (
                anchor &&
                anchor.href &&
                anchor.href.startsWith(window.location.origin) &&
                !anchor.href.includes("#") &&
                anchor.target !== "_blank" &&
                anchor.getAttribute("download") === null
            ) {
                // Check if it's the same page
                const url = new URL(anchor.href);
                if (url.pathname + url.search === pathname + searchParams.toString()) {
                    return;
                }

                // Potential internal navigation
                setIsNavigating(true);
                if (overlayRef.current) {
                    overlayRef.current.style.display = "block";
                    gsap.to(overlayRef.current, {
                        opacity: 1,
                        duration: 0.8, // "Slowly fade in"
                        ease: "power2.inOut",
                    });
                }
            }
        };

        window.addEventListener("click", handleNavigationStart);
        return () => window.removeEventListener("click", handleNavigationStart);
    }, [pathname, searchParams]);

    return (
        <div
            ref={overlayRef}
            id="page-transition-overlay"
            className="fixed inset-0 z-[10000] pointer-events-none"
            style={{
                display: "none",
                opacity: 0,
                background: "var(--bg-dark)",
            }}
        />
    );
}

'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import { CustomCursor } from './automated-assets';
import { ANIMATION_THEME } from '@/lib/colors';

type MetricKey = 'ebitda' | 'netMargin' | 'grossMargin';

const metrics: Record<MetricKey, { label: string; value: number; color: string }> = {
    grossMargin: { label: 'Gross Margin', value: 40, color: ANIMATION_THEME.primary },
    ebitda: { label: 'EBITDA', value: 26, color: ANIMATION_THEME.text.primary },
    netMargin: { label: 'Net Margin', value: 34, color: '#f59e0b' },
};

const metricOrder: MetricKey[] = ['grossMargin', 'ebitda', 'netMargin'];
const TRACK_COLOR = '#e8e0c8';

// Donut params
const CX = 90;
const CY = 90;
const R = 70;
const STROKE = 14;
// Full continuous circle (360° arc)
const START_ANGLE = 90;
const ARC_SPAN = 360;

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
    const span = endAngle - startAngle;
    if (span >= 360) {
        // Full circle: use two semicircular arcs
        const top = polarToCartesian(cx, cy, r, startAngle);
        const bottom = polarToCartesian(cx, cy, r, startAngle + 180);
        return `M ${top.x} ${top.y} A ${r} ${r} 0 1 1 ${bottom.x} ${bottom.y} A ${r} ${r} 0 1 1 ${top.x} ${top.y}`;
    }
    const start = polarToCartesian(cx, cy, r, endAngle);
    const end = polarToCartesian(cx, cy, r, startAngle);
    const largeArc = span > 180 ? 1 : 0;
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
}

function useAnimatedValue(target: number, duration = 800): number {
    const [val, setVal] = useState(0);
    const fromRef = useRef(0);

    useEffect(() => {
        const from = fromRef.current;
        fromRef.current = target;
        let start: number | null = null;
        let raf: number;

        const step = (ts: number) => {
            if (start === null) start = ts;
            const p = Math.min((ts - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(from + (target - from) * eased);
            if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, [target, duration]);

    return val;
}

export const ProfitabilityDemo: React.FC = () => {
    const [active, setActive] = useState<MetricKey>('ebitda');
    const [isClicking, setIsClicking] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const legendRefs = useRef<Record<MetricKey, HTMLButtonElement | null>>({
        grossMargin: null,
        ebitda: null,
        netMargin: null,
    });
    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);

    const m = metrics[active];
    const animatedPct = useAnimatedValue(m.value);

    // Animated arc
    const fillEnd = START_ANGLE + (animatedPct / 100) * ARC_SPAN;
    const trackPath = describeArc(CX, CY, R, START_ANGLE, START_ANGLE + ARC_SPAN);
    const fillPath = describeArc(CX, CY, R, START_ANGLE, fillEnd);

    // Legend indicator positions (for cursor targeting)
    const legendKeys = metricOrder;

    const doClick = useCallback(async () => {
        setIsClicking(true);
        await new Promise(r => setTimeout(r, 300));
        setIsClicking(false);
        await new Promise(r => setTimeout(r, 150));
    }, []);

    // Automated cursor sequence
    useEffect(() => {
        let cancelled = false;

        const moveTo = async (x: number, y: number, duration = 1.0) => {
            if (cancelled) return;
            animate(cursorX, x, { duration, ease: [0.25, 0.1, 0.25, 1] });
            animate(cursorY, y, { duration, ease: [0.25, 0.1, 0.25, 1] });
            await new Promise(r => setTimeout(r, duration * 1000 + 200));
        };

        const wait = async (ms: number) => {
            if (cancelled) return;
            await new Promise(r => setTimeout(r, ms));
        };

        const run = async () => {
            if (!containerRef.current || cancelled) return;
            const rect = containerRef.current.getBoundingClientRect();
            const w = rect.width;
            const h = rect.height;

            // Start center
            cursorX.set(w * 0.5);
            cursorY.set(h * 0.5);
            setActive('ebitda');

            await wait(2500);

            // Get exact positions from legend badge refs
            const getPos = (key: MetricKey) => {
                const btn = legendRefs.current[key];
                if (!btn || !containerRef.current) return { x: 0, y: 0 };
                const containerRect = containerRef.current.getBoundingClientRect();

                // Calculate scale factor to account for any parent CSS scaling (like on mobile)
                const scaleX = containerRect.width / containerRef.current.offsetWidth;
                const scaleY = containerRect.height / containerRef.current.offsetHeight;

                // Target the color badge (first child div inside the button)
                const badge = btn.querySelector('div');
                if (badge) {
                    const badgeRect = badge.getBoundingClientRect();
                    return {
                        x: (badgeRect.left - containerRect.left + badgeRect.width / 2) / scaleX,
                        y: (badgeRect.top - containerRect.top + badgeRect.height / 2) / scaleY,
                    };
                }
                const btnRect = btn.getBoundingClientRect();
                return {
                    x: (btnRect.left - containerRect.left + 10) / scaleX,
                    y: (btnRect.top - containerRect.top + btnRect.height / 2) / scaleY,
                };
            };

            const sequence: MetricKey[] = ['grossMargin', 'netMargin', 'ebitda', 'grossMargin', 'ebitda', 'netMargin'];

            for (const key of sequence) {
                if (cancelled) return;
                const pos = getPos(key);
                await moveTo(pos.x, pos.y, 0.9);
                if (cancelled) return;
                await doClick();
                setActive(key);
                await wait(2200);
            }

            if (!cancelled) run();
        };

        const timer = setTimeout(run, 600);
        return () => {
            cancelled = true;
            clearTimeout(timer);
        };
    }, [cursorX, cursorY, doClick]);

    return (
        <div ref={containerRef} className="relative w-full h-full bg-white flex flex-col p-5 overflow-hidden" style={{ fontFamily: 'var(--font-geist-sans)' }}>
            {/* Header */}
            <div className="flex items-start justify-between mb-4 lg:mb-6">
                <div>
                    <p className="text-[14px] font-semibold tracking-wide text-slate-900">Profitability</p>
                    <p className="text-[11px] text-slate-400 font-medium">Financial Ratio</p>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-slate-100 flex items-center justify-center shadow-sm" style={{ backgroundColor: `${ANIMATION_THEME.primary}1A`, borderColor: `${ANIMATION_THEME.primary}33` }}>
                    <span className="text-[18px] font-bold" style={{ color: ANIMATION_THEME.primary }}>$</span>
                </div>
            </div>

            {/* Content: Donut + Legend */}
            <div className="flex items-center gap-4 lg:gap-6">
                {/* Donut */}
                <div className="relative shrink-0" style={{ width: 110, height: 110 }}>
                    <svg viewBox="0 0 180 180" className="w-full h-full">
                        {/* Track */}
                        <path
                            d={trackPath}
                            fill="none"
                            stroke={TRACK_COLOR}
                            strokeWidth={STROKE}
                            strokeLinecap="round"
                        />
                        {/* Filled portion */}
                        <path
                            d={fillPath}
                            fill="none"
                            stroke={m.color}
                            strokeWidth={STROKE}
                            strokeLinecap="round"
                        />
                    </svg>
                    {/* Center text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <motion.span
                            key={active}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                            className="text-[24px] font-bold text-slate-900 leading-none"
                            style={{ fontVariantNumeric: 'tabular-nums' }}
                        >
                            {Math.round(animatedPct)}%
                        </motion.span>
                        <motion.span
                            key={`label-${active}`}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="text-[9px] text-slate-400 font-medium mt-0.5"
                        >
                            {m.label}
                        </motion.span>
                    </div>
                </div>

                {/* Legend */}
                <div className="flex flex-col gap-2 shrink-0">
                    {legendKeys.map((key) => {
                        const item = metrics[key];
                        const isActive = active === key;
                        return (
                            <button
                                key={key}
                                ref={(el) => { legendRefs.current[key] = el; }}
                                onClick={() => setActive(key)}
                                className="flex items-center gap-2 text-left group cursor-pointer whitespace-nowrap"
                            >
                                <motion.div
                                    animate={{
                                        width: isActive ? 16 : 10,
                                        height: 6,
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="rounded-full shrink-0"
                                    style={{ backgroundColor: isActive ? item.color : TRACK_COLOR }}
                                />
                                <span
                                    className={`text-[10px] font-bold transition-colors duration-300 ${isActive ? 'text-slate-900' : 'text-slate-400'
                                        }`}
                                >
                                    {item.label}
                                </span>

                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Automated cursor */}
            <div className="absolute inset-0 pointer-events-none z-[100]">
                <CustomCursor x={cursorX} y={cursorY} isClicking={isClicking} />
            </div>
        </div>
    );
};

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Plus } from 'lucide-react';
import { CustomCursor } from './automated-assets';
import { ANIMATION_THEME } from '@/lib/colors';

const salesData = [
    { date: 'May 5', primary: 3100, secondary: 2200 },
    { date: 'May 7', primary: 2500, secondary: 3400 },
    { date: 'May 10', primary: 3200, secondary: 2800 },
    { date: 'May 12', primary: 2900, secondary: 2600 },
    { date: 'May 15', primary: 3800, secondary: 2500 },
    { date: 'May 17', primary: 4200, secondary: 3000 },
    { date: 'May 20', primary: 4800, secondary: 3200 },
    { date: 'May 22', primary: 4400, secondary: 3600 },
    { date: 'May 25', primary: 4050, secondary: 3400 },
];

/**
 * Convert an SVG-space point to wrapper-relative CSS pixel coords.
 * Correctly handles parent CSS transforms (e.g. scale-[0.5] on mobile)
 * by detecting the effective scale from offsetWidth vs getBoundingClientRect().width.
 */
function svgPointToWrapper(
    svgEl: SVGSVGElement,
    wrapperEl: HTMLDivElement,
    svgX: number,
    svgY: number,
) {
    const ctm = svgEl.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };

    // Screen-space position of the SVG point
    const screenX = ctm.a * svgX + ctm.c * svgY + ctm.e;
    const screenY = ctm.b * svgX + ctm.d * svgY + ctm.f;

    // Screen-space bounding rect of the wrapper (affected by CSS transforms)
    const wrapperRect = wrapperEl.getBoundingClientRect();

    // Screen-space offset from wrapper origin
    const screenOffsetX = screenX - wrapperRect.left;
    const screenOffsetY = screenY - wrapperRect.top;

    // Detect effective CSS scale: offsetWidth is in CSS px (unscaled),
    // getBoundingClientRect().width is in screen px (scaled).
    // If scale is 0.5, rect.width = offsetWidth * 0.5
    const cssWidth = wrapperEl.offsetWidth;
    const cssHeight = wrapperEl.offsetHeight;
    const scaleX = cssWidth > 0 ? wrapperRect.width / cssWidth : 1;
    const scaleY = cssHeight > 0 ? wrapperRect.height / cssHeight : 1;

    // Convert screen-space offset to CSS-space (local) offset
    return {
        x: screenOffsetX / scaleX,
        y: screenOffsetY / scaleY,
    };
}

export const FinanceSalesTrendsDemo: React.FC = () => {
    const [hoveredDataIndex, setHoveredDataIndex] = useState<number | null>(null);
    // Live cursor position (wrapper-relative) for dot + tooltip
    const [dotPos, setDotPos] = useState<{ x: number; y: number } | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const chartWrapperRef = useRef<HTMLDivElement>(null);
    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);

    useEffect(() => {
        let cancelled = false;
        let rafId: number;

        const SWEEP_DURATION = 6000;
        const PAUSE_AT_ENDS = 400;

        const startAnimation = () => {
            if (cancelled || !chartWrapperRef.current) return;

            // Find the primary area curve path
            const pathEl = chartWrapperRef.current.querySelector(
                '.recharts-area-curve',
            ) as SVGPathElement | null;
            if (!pathEl) {
                setTimeout(startAnimation, 200);
                return;
            }

            const svgEl = pathEl.ownerSVGElement!;
            const wrapper = chartWrapperRef.current!;
            const totalLen = pathEl.getTotalLength();

            // Pre-compute data point x-positions for closest-index lookup
            const dataXPositions: number[] = [];
            for (let i = 0; i < salesData.length; i++) {
                const frac = i / (salesData.length - 1);
                const lenAtFrac = frac * totalLen;
                const svgPt = pathEl.getPointAtLength(lenAtFrac);
                const wPt = svgPointToWrapper(svgEl, wrapper, svgPt.x, svgPt.y);
                dataXPositions.push(wPt.x);
            }

            function closestDataIndex(cx: number) {
                let best = 0;
                let bestDist = Infinity;
                for (let i = 0; i < dataXPositions.length; i++) {
                    const d = Math.abs(dataXPositions[i] - cx);
                    if (d < bestDist) { bestDist = d; best = i; }
                }
                return best;
            }

            let startTime: number | null = null;
            let direction = 1;

            const tick = (now: number) => {
                if (cancelled) return;
                if (startTime === null) startTime = now;

                const elapsed = now - startTime;
                const totalCycle = SWEEP_DURATION + PAUSE_AT_ENDS;

                if (elapsed > totalCycle) {
                    direction *= -1;
                    startTime = now;
                    rafId = requestAnimationFrame(tick);
                    return;
                }

                const sweepT = Math.min(elapsed / SWEEP_DURATION, 1);
                const eased = sweepT < 0.5
                    ? 4 * sweepT * sweepT * sweepT
                    : 1 - Math.pow(-2 * sweepT + 2, 3) / 2;

                const t = direction === 1 ? eased : 1 - eased;

                // Get exact position on the SVG path & convert properly
                const svgPt = pathEl.getPointAtLength(t * totalLen);
                const wPt = svgPointToWrapper(svgEl, wrapper, svgPt.x, svgPt.y);

                cursorX.set(wPt.x);
                cursorY.set(wPt.y);
                setDotPos({ x: wPt.x, y: wPt.y });

                const newIdx = closestDataIndex(wPt.x);
                setHoveredDataIndex(prev => prev === newIdx ? prev : newIdx);

                rafId = requestAnimationFrame(tick);
            };

            // Initial position
            const initSvgPt = pathEl.getPointAtLength(0);
            const initWPt = svgPointToWrapper(svgEl, wrapper, initSvgPt.x, initSvgPt.y);
            cursorX.set(initWPt.x);
            cursorY.set(initWPt.y);
            setDotPos({ x: initWPt.x, y: initWPt.y });
            setHoveredDataIndex(0);

            rafId = requestAnimationFrame(tick);
        };

        const timer = setTimeout(startAnimation, 800);
        return () => {
            cancelled = true;
            clearTimeout(timer);
            cancelAnimationFrame(rafId);
        };
    }, [cursorX, cursorY]);

    return (
        <div ref={containerRef} className="relative w-full h-full bg-white flex flex-col p-8 overflow-hidden" style={{ fontFamily: 'var(--font-geist-sans)' }}>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 shadow-sm">
                        <Plus size={20} />
                    </div>
                    <div>
                        <h3 className="text-[18px] lg:text-[20px] font-black text-slate-900 tracking-tight">Finance</h3>
                        <p className="text-[12px] text-slate-400 font-medium">Sales trends over time</p>
                    </div>
                </div>
            </div>

            {/* Chart */}
            <div ref={chartWrapperRef} className="relative flex-1 w-full" style={{ height: 'calc(100% - 80px)' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={salesData} margin={{ top: 10, right: 30, left: -10, bottom: 0 }}>
                        <defs>
                            <linearGradient id="primaryFill" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={ANIMATION_THEME.primary} stopOpacity={0.25} />
                                <stop offset="60%" stopColor={ANIMATION_THEME.primary} stopOpacity={0.08} />
                                <stop offset="100%" stopColor={ANIMATION_THEME.primary} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 9, fontWeight: 500 }}
                            interval={0}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 9, fontWeight: 500 }}
                            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                        />
                        <Area
                            type="monotone"
                            dataKey="primary"
                            stroke={ANIMATION_THEME.primary}
                            strokeWidth={2.5}
                            fill="url(#primaryFill)"
                            dot={false}
                            animationDuration={1500}
                            animationEasing="ease-in-out"
                        />
                        <Area
                            type="monotone"
                            dataKey="secondary"
                            stroke="#1e293b"
                            strokeWidth={2}
                            fill="transparent"
                            dot={false}
                            animationDuration={1800}
                            animationEasing="ease-in-out"
                        />
                    </AreaChart>
                </ResponsiveContainer>

                {/* Tooltip overlay - uses live cursor position */}
                <AnimatePresence>
                    {hoveredDataIndex !== null && dotPos && (() => {
                        return (
                            <>
                                {/* Vertical line */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute pointer-events-none"
                                    style={{
                                        left: dotPos.x,
                                        top: 0,
                                        bottom: 0,
                                        width: '1px',
                                        backgroundColor: `${ANIMATION_THEME.text.secondary}40`,
                                    }}
                                />
                                {/* Price badge - above the dot */}
                                <motion.div
                                    initial={{ opacity: 0, y: 4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 4 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute pointer-events-none"
                                    style={{
                                        left: dotPos.x - 24,
                                        top: dotPos.y - 30,
                                    }}
                                >
                                    <div className="text-white px-2 py-1 rounded-md shadow-lg text-[10px] font-bold whitespace-nowrap" style={{ backgroundColor: ANIMATION_THEME.text.primary }}>
                                        ${salesData[hoveredDataIndex].primary.toLocaleString()}
                                    </div>
                                </motion.div>
                                {/* Data point dot - centered exactly on the line */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    className="absolute pointer-events-none"
                                    style={{
                                        left: dotPos.x - 6,
                                        top: dotPos.y - 6,
                                    }}
                                >
                                    <div className="w-3 h-3 rounded-full border-2 border-white shadow-md" style={{ backgroundColor: ANIMATION_THEME.primary }} />
                                </motion.div>
                            </>
                        );
                    })()}
                </AnimatePresence>
            </div>

            {/* Cursor */}
            <div className="absolute inset-0 pointer-events-none z-[100]">
                <CustomCursor x={cursorX} y={cursorY} isClicking={false} />
            </div>
        </div>
    );
};

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Plus } from 'lucide-react';
import { CustomCursor } from './AutomatedAssets';

const salesData = [
    { date: 'May 1', primary: 2800, secondary: 2400 },
    { date: 'May 3', primary: 2600, secondary: 3200 },
    { date: 'May 5', primary: 3100, secondary: 2200 },
    { date: 'May 7', primary: 2500, secondary: 3400 },
    { date: 'May 10', primary: 3200, secondary: 2800 },
    { date: 'May 12', primary: 2900, secondary: 2600 },
    { date: 'May 15', primary: 3800, secondary: 2500 },
    { date: 'May 17', primary: 4200, secondary: 3000 },
    { date: 'May 20', primary: 4800, secondary: 3200 },
    { date: 'May 22', primary: 4400, secondary: 3600 },
    { date: 'May 25', primary: 4050, secondary: 3400 },
    { date: 'May 27', primary: 3200, secondary: 4200 },
    { date: 'May 30', primary: 3800, secondary: 3600 },
];

// Chart area margins matching Recharts layout
const CHART_LEFT = 0.06;
const CHART_RIGHT = 0.97;

function getChartX(index: number, total: number) {
    return CHART_LEFT + (index / (total - 1)) * (CHART_RIGHT - CHART_LEFT);
}

// Map data value to approximate Y fraction (inverted, 0=top)
function getChartY(value: number) {
    const min = 0;
    const max = 5500;
    const chartTop = 0.12;
    const chartBottom = 0.82;
    return chartBottom - ((value - min) / (max - min)) * (chartBottom - chartTop);
}

export const FinanceSalesTrendsDemo: React.FC = () => {
    const [hoveredDataIndex, setHoveredDataIndex] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);

    // Build path points (pixel coords) for smooth interpolation
    const pathRef = useRef<{ x: number; y: number }[]>([]);

    useEffect(() => {
        let cancelled = false;
        let rafId: number;

        // Interpolate between points at a given t (0..1 across all points)
        function lerp(points: { x: number; y: number }[], t: number) {
            const n = points.length - 1;
            const segment = t * n;
            const i = Math.min(Math.floor(segment), n - 1);
            const frac = segment - i;
            return {
                x: points[i].x + (points[i + 1].x - points[i].x) * frac,
                y: points[i].y + (points[i + 1].y - points[i].y) * frac,
            };
        }

        function closestIndex(points: { x: number; y: number }[], cx: number) {
            let best = 0;
            let bestDist = Infinity;
            for (let i = 0; i < points.length; i++) {
                const d = Math.abs(points[i].x - cx);
                if (d < bestDist) { bestDist = d; best = i; }
            }
            return best;
        }

        const SWEEP_DURATION = 6000; // ms for one full sweep
        const PAUSE_AT_ENDS = 400;

        const startAnimation = () => {
            if (!containerRef.current || cancelled) return;
            const rect = containerRef.current.getBoundingClientRect();
            const w = rect.width;
            const h = rect.height;

            // Compute pixel positions for each data point
            const points = salesData.map((d, i) => ({
                x: w * getChartX(i, salesData.length),
                y: h * getChartY(d.primary),
            }));
            pathRef.current = points;

            let startTime: number | null = null;
            let direction = 1; // 1 = left-to-right, -1 = right-to-left

            const tick = (now: number) => {
                if (cancelled) return;
                if (startTime === null) startTime = now;

                const elapsed = now - startTime;
                const totalCycle = SWEEP_DURATION + PAUSE_AT_ENDS;

                if (elapsed > totalCycle) {
                    // Flip direction and restart
                    direction *= -1;
                    startTime = now;
                    rafId = requestAnimationFrame(tick);
                    return;
                }

                // Clamp to sweep portion
                const sweepT = Math.min(elapsed / SWEEP_DURATION, 1);
                // Smooth easing (ease-in-out cubic)
                const eased = sweepT < 0.5
                    ? 4 * sweepT * sweepT * sweepT
                    : 1 - Math.pow(-2 * sweepT + 2, 3) / 2;

                const t = direction === 1 ? eased : 1 - eased;
                const pos = lerp(points, t);

                cursorX.set(pos.x);
                cursorY.set(pos.y);
                setHoveredDataIndex(closestIndex(points, pos.x));

                rafId = requestAnimationFrame(tick);
            };

            // Set initial position
            cursorX.set(points[0].x);
            cursorY.set(points[0].y);
            setHoveredDataIndex(0);

            rafId = requestAnimationFrame(tick);
        };

        const timer = setTimeout(startAnimation, 600);
        return () => {
            cancelled = true;
            clearTimeout(timer);
            cancelAnimationFrame(rafId);
        };
    }, [cursorX, cursorY]);

    return (
        <div ref={containerRef} className="relative w-full h-full bg-white overflow-hidden" style={{ fontFamily: 'var(--font-geist-sans)' }}>
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-4 pb-2">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400">
                        <Plus size={16} />
                    </div>
                    <div>
                        <h3 className="text-[16px] font-black text-slate-900 tracking-tight">Finance</h3>
                        <p className="text-[11px] text-slate-400 font-medium">Sales trends over time</p>
                    </div>
                </div>

            </div>

            {/* Chart */}
            <div className="flex-1 px-2" style={{ height: 'calc(100% - 70px)' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={salesData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                        <defs>
                            <linearGradient id="primaryFill" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#f97316" stopOpacity={0.25} />
                                <stop offset="60%" stopColor="#fb923c" stopOpacity={0.08} />
                                <stop offset="100%" stopColor="#fff7ed" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 9, fontWeight: 500 }}
                            interval={1}
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
                            stroke="#ef4444"
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

                {/* Tooltip + vertical line + User badge overlay */}
                <AnimatePresence>
                    {hoveredDataIndex !== null && (() => {
                        const xFrac = getChartX(hoveredDataIndex, salesData.length);
                        const yFrac = getChartY(salesData[hoveredDataIndex].primary);
                        return (
                            <>
                                {/* Vertical line */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute pointer-events-none"
                                    style={{
                                        left: `calc(${xFrac * 100}%)`,
                                        top: '70px',
                                        bottom: '20px',
                                        width: '1px',
                                        backgroundColor: 'rgba(120, 113, 80, 0.35)',
                                    }}
                                />
                                {/* Price badge */}
                                <motion.div
                                    initial={{ opacity: 0, y: 4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 4 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute pointer-events-none"
                                    style={{
                                        left: `calc(${xFrac * 100}% - 24px)`,
                                        top: `calc(${yFrac * 100}% + 30px)`,
                                    }}
                                >
                                    <div className="bg-amber-800 text-white px-2 py-1 rounded-md shadow-lg text-[10px] font-bold whitespace-nowrap">
                                        ${salesData[hoveredDataIndex].primary.toLocaleString()}
                                    </div>
                                </motion.div>
                                {/* Data point dot */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    className="absolute pointer-events-none"
                                    style={{
                                        left: `calc(${xFrac * 100}% - 6px)`,
                                        top: `calc(${yFrac * 100}% + 52px)`,
                                    }}
                                >
                                    <div className="w-3 h-3 rounded-full bg-amber-700 border-2 border-white shadow-md" />
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

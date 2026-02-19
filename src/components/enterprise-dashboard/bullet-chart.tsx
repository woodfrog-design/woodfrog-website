"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DASHBOARD_COLORS } from "./dashboard-context";
import { AnimatedNumber } from "../ui/animated-number";

gsap.registerPlugin(ScrollTrigger);

interface BulletChartData {
    label: string;
    actual: number;
    target: number;
    ranges: [number, number, number]; // Poor, Satisfactory, Good thresholds
    unit?: string;
    format?: "currency" | "percent" | "number";
}

interface BulletChartProps {
    title?: string;
    data?: BulletChartData[];
}

const defaultData: BulletChartData[] = [
    {
        label: "Revenue vs Target",
        actual: 918.9,
        target: 950,
        ranges: [700, 850, 1000],
        unit: "₹ Cr",
        format: "currency",
    },
    {
        label: "Gross Margin %",
        actual: 42.3,
        target: 45,
        ranges: [35, 42, 50],
        unit: "%",
        format: "percent",
    },
    {
        label: "Customer Acquisition",
        actual: 1247,
        target: 1200,
        ranges: [800, 1100, 1400],
        unit: "",
        format: "number",
    },
    {
        label: "NPS Score",
        actual: 67,
        target: 70,
        ranges: [40, 60, 80],
        unit: "",
        format: "number",
    },
];

export const BulletChart: React.FC<BulletChartProps> = ({
    title = "Performance Against Targets",
    data = defaultData,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const barsRef = useRef<(SVGRectElement | null)[]>([]);
    const targetLinesRef = useRef<(SVGLineElement | null)[]>([]);

    const chartWidth = 320;
    const barHeight = 28;

    const formatValue = (value: number, format?: string, unit?: string) => {
        if (format === "currency") return `₹${value.toFixed(2)} Cr`;
        if (format === "percent") return `${value.toFixed(2)}%`;
        return `${value.toFixed(2)}${unit || ""}`;
    };

    useGSAP(() => {
        if (!containerRef.current) return;

        // Container entry - Only once
        gsap.fromTo(containerRef.current,
            { opacity: 0, x: 25 },
            {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 90%",
                    once: true,
                }
            }
        );

        // Bars animation - Smooth transition on data change
        barsRef.current.forEach((bar, idx) => {
            if (bar && data[idx]) {
                const maxRange = data[idx].ranges[2];
                const targetWidth = Math.min((data[idx].actual / maxRange) * chartWidth, chartWidth);

                gsap.to(bar, {
                    attr: { width: targetWidth },
                    duration: 0.8,
                    delay: idx * 0.05,
                    ease: "power2.out"
                });
            }
        });

        // Target markers animation - Smooth transition on data change
        targetLinesRef.current.forEach((line, idx) => {
            if (line && data[idx]) {
                const maxRange = data[idx].ranges[2];
                const targetX = (data[idx].target / maxRange) * chartWidth;

                gsap.to(line, {
                    attr: { x1: targetX, x2: targetX },
                    duration: 0.6,
                    delay: 0.2 + idx * 0.05,
                    ease: "back.out(1.2)"
                });
            }
        });
    }, { scope: containerRef, dependencies: [data] });

    return (
        <div
            ref={containerRef}
            className="rounded-lg border p-5 h-full"
            style={{
                opacity: 1,
                backgroundColor: DASHBOARD_COLORS.card,
                borderColor: DASHBOARD_COLORS.border
            }}
        >
            {/* Header */}
            <h3 className="text-sm font-semibold mb-4" style={{ color: DASHBOARD_COLORS.textPrimary }}>{title}</h3>

            {/* Legend */}
            <div className="flex items-center gap-4 mb-4 text-xs">
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-2 rounded-sm" style={{ backgroundColor: DASHBOARD_COLORS.secondary, opacity: 0.1 }} />
                    <span style={{ color: DASHBOARD_COLORS.textSecondary }}>Below Target</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-2 rounded-sm" style={{ backgroundColor: DASHBOARD_COLORS.secondary, opacity: 0.25 }} />
                    <span style={{ color: DASHBOARD_COLORS.textSecondary }}>On Track</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-2 rounded-sm" style={{ backgroundColor: DASHBOARD_COLORS.secondary, opacity: 0.4 }} />
                    <span style={{ color: DASHBOARD_COLORS.textSecondary }}>Exceeding</span>
                </div>
            </div>

            {/* Charts */}
            <div className="space-y-4">
                {data.map((item, index) => {
                    const maxRange = item.ranges[2];
                    const scaleX = (val: number) => (val / maxRange) * chartWidth;
                    const actualMeetsTarget = item.actual >= item.target;

                    return (
                        <div key={index} className="flex items-center gap-4">
                            {/* Label */}
                            <div className="w-[140px] flex-shrink-0">
                                <div className="text-xs font-bold truncate" style={{ color: DASHBOARD_COLORS.textPrimary }}>
                                    {item.label}
                                </div>
                                <div className={`text-[10px] font-medium`} style={{ color: actualMeetsTarget ? DASHBOARD_COLORS.secondary : DASHBOARD_COLORS.negative }}>
                                    {actualMeetsTarget ? "▲ On Target" : "▼ Below Target"}
                                </div>
                            </div>

                            {/* Chart */}
                            <div className="flex-1 min-w-0">
                                <svg width="100%" height={barHeight} viewBox={`0 0 ${chartWidth} ${barHeight}`} preserveAspectRatio="none" className="overflow-visible">
                                    {/* Background ranges */}
                                    <rect
                                        x={0}
                                        y={4}
                                        width={scaleX(item.ranges[0])}
                                        height={barHeight - 8}
                                        fill={DASHBOARD_COLORS.secondary}
                                        rx="2"
                                        opacity="0.1"
                                    />
                                    <rect
                                        x={scaleX(item.ranges[0])}
                                        y={4}
                                        width={scaleX(item.ranges[1] - item.ranges[0])}
                                        height={barHeight - 8}
                                        fill={DASHBOARD_COLORS.secondary}
                                        opacity="0.25"
                                    />
                                    <rect
                                        x={scaleX(item.ranges[1])}
                                        y={4}
                                        width={scaleX(item.ranges[2] - item.ranges[1])}
                                        height={barHeight - 8}
                                        fill={DASHBOARD_COLORS.secondary}
                                        rx="2"
                                        opacity="0.4"
                                    />

                                    {/* Actual bar */}
                                    <rect
                                        ref={(el) => { barsRef.current[index] = el; }}
                                        width={Math.min(scaleX(item.actual), chartWidth)}
                                        x={0}
                                        y={8}
                                        height={barHeight - 16}
                                        fill={actualMeetsTarget ? DASHBOARD_COLORS.secondary : DASHBOARD_COLORS.negative}
                                        rx="2"
                                    />

                                    {/* Target marker */}
                                    <line
                                        ref={(el) => { targetLinesRef.current[index] = el; }}
                                        x1={scaleX(item.target)}
                                        y1={2}
                                        x2={scaleX(item.target)}
                                        y2={barHeight - 2}
                                        stroke={DASHBOARD_COLORS.textPrimary}
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </div>

                            {/* Value */}
                            <div className="w-[100px] flex-shrink-0 text-right">
                                <div className="text-xs font-bold tabular-nums" style={{ color: DASHBOARD_COLORS.textPrimary }}>
                                    <AnimatedNumber value={formatValue(item.actual, item.format, item.unit)} delay={0.3 + index * 0.1} />
                                </div>
                                <div className="text-[10px] tabular-nums" style={{ color: DASHBOARD_COLORS.textSecondary }}>
                                    / {formatValue(item.target, item.format, item.unit)}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

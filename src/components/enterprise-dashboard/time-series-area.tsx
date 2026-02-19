"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DASHBOARD_COLORS } from "./dashboard-context";
import { AnimatedNumber } from "../ui/animated-number";

gsap.registerPlugin(ScrollTrigger);

interface TimeSeriesDataPoint {
    month: string;
    revenue: number;
    margin: number;
    expenses: number;
}

interface TimeSeriesAreaProps {
    title?: string;
    data?: TimeSeriesDataPoint[];
}

const defaultData: TimeSeriesDataPoint[] = [
    { month: "Jan", revenue: 68.2, margin: 28.4, expenses: 22.8 },
    { month: "Feb", revenue: 71.5, margin: 30.1, expenses: 23.4 },
    { month: "Mar", revenue: 75.8, margin: 31.8, expenses: 25.2 },
    { month: "Apr", revenue: 72.3, margin: 29.7, expenses: 24.1 },
    { month: "May", revenue: 78.6, margin: 33.2, expenses: 26.3 },
    { month: "Jun", revenue: 82.1, margin: 34.8, expenses: 27.0 },
    { month: "Jul", revenue: 79.4, margin: 32.1, expenses: 25.8 },
    { month: "Aug", revenue: 84.7, margin: 35.9, expenses: 28.4 },
    { month: "Sep", revenue: 88.2, margin: 37.4, expenses: 29.6 },
    { month: "Oct", revenue: 85.9, margin: 36.1, expenses: 28.9 },
    { month: "Nov", revenue: 91.3, margin: 38.7, expenses: 30.2 },
    { month: "Dec", revenue: 95.8, margin: 40.6, expenses: 31.8 },
];

export const TimeSeriesArea: React.FC<TimeSeriesAreaProps> = ({
    title = "Monthly Revenue & Margin Trend (₹ Cr)",
    data = defaultData,
}) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [activeMetric, setActiveMetric] = useState<"all" | "revenue" | "margin" | "expenses">("all");

    const containerRef = useRef<HTMLDivElement>(null);
    const revenueLineRef = useRef<SVGPathElement>(null);
    const marginLineRef = useRef<SVGPathElement>(null);
    const expensesLineRef = useRef<SVGPathElement>(null);
    const revenueAreaRef = useRef<SVGPathElement>(null);
    const marginAreaRef = useRef<SVGPathElement>(null);

    const chartWidth = 500;
    const chartHeight = 220;
    const paddingX = 50;
    const paddingY = 20;
    const paddingBottom = 40;

    const maxValue = Math.max(...data.flatMap((d) => [d.revenue, d.margin, d.expenses])) * 1.15;
    const stepX = (chartWidth - paddingX - 20) / (data.length - 1);

    const scaleY = (val: number) =>
        chartHeight - paddingBottom - ((val / maxValue) * (chartHeight - paddingY - paddingBottom));

    const generateAreaPath = (values: number[], close = true) => {
        const points = values.map((val, i) => `${paddingX + i * stepX},${scaleY(val)}`);
        const path = `M ${points.join(" L ")}`;
        if (close) {
            return `${path} L ${paddingX + (values.length - 1) * stepX},${scaleY(0)} L ${paddingX},${scaleY(0)} Z`;
        }
        return path;
    };

    const generateLinePath = (values: number[]) => {
        const points = values.map((val, i) => `${paddingX + i * stepX},${scaleY(val)}`);
        return `M ${points.join(" L ")}`;
    };

    useGSAP(() => {
        if (!containerRef.current) return;

        // Container entry
        gsap.fromTo(containerRef.current,
            { opacity: 0, x: -25 },
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

        // Lines and Areas
        const lines = [revenueLineRef, marginLineRef, expensesLineRef];
        const areas = [revenueAreaRef, marginAreaRef];

        lines.forEach((ref, idx) => {
            if (ref.current) {
                const length = ref.current.getTotalLength();
                gsap.set(ref.current, { strokeDasharray: length, strokeDashoffset: length });
                gsap.to(ref.current, {
                    strokeDashoffset: 0,
                    duration: 1.5,
                    delay: 0.4 + idx * 0.2,
                    ease: "power1.inOut",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 90%",
                        once: true,
                    }
                });
            }
        });

        areas.forEach((ref, idx) => {
            if (ref.current) {
                gsap.fromTo(ref.current,
                    { opacity: 0 },
                    {
                        opacity: 0.1,
                        duration: 1,
                        delay: 0.8 + idx * 0.3,
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 90%",
                            once: true,
                        }
                    }
                );
            }
        });
    }, { scope: containerRef });

    const metrics = [
        { key: "revenue", label: "Revenue", color: DASHBOARD_COLORS.primary },
        { key: "margin", label: "Gross Margin", color: DASHBOARD_COLORS.secondary },
        { key: "expenses", label: "OpEx", color: DASHBOARD_COLORS.tertiary },
    ] as const;

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
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold" style={{ color: DASHBOARD_COLORS.textPrimary }}>{title}</h3>

                {/* Metric toggles */}
                <div className="flex gap-2">
                    {metrics.map((metric) => (
                        <button
                            key={metric.key}
                            onClick={() =>
                                setActiveMetric(activeMetric === metric.key ? "all" : metric.key)
                            }
                            className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs transition-all
                                ${activeMetric === metric.key || activeMetric === "all"
                                    ? "opacity-100"
                                    : "opacity-40"
                                }
                            `}
                        >
                            <div
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ backgroundColor: metric.color }}
                            />
                            <span className="font-medium" style={{ color: DASHBOARD_COLORS.textPrimary }}>{metric.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Chart */}
            <svg
                width="100%"
                height={chartHeight}
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                className="overflow-visible"
                onMouseLeave={() => setHoveredIndex(null)}
            >
                {/* Grid lines */}
                {[0, 25, 50, 75, 100].map((tick) => (
                    <g key={tick}>
                        <line
                            x={paddingX}
                            y1={scaleY(tick)}
                            x2={chartWidth - 20}
                            y2={scaleY(tick)}
                            stroke={DASHBOARD_COLORS.gridLine}
                            strokeWidth="1"
                        />
                        <text
                            x={paddingX - 8}
                            y={scaleY(tick) + 4}
                            textAnchor="end"
                            className="text-[9px]"
                            style={{ fill: DASHBOARD_COLORS.textSecondary }}
                        >
                            {tick}
                        </text>
                    </g>
                ))}

                {/* Areas (stacked effect with gradients) */}
                <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={DASHBOARD_COLORS.primary} stopOpacity="0.3" />
                        <stop offset="100%" stopColor={DASHBOARD_COLORS.primary} stopOpacity="0.05" />
                    </linearGradient>
                    <linearGradient id="marginGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={DASHBOARD_COLORS.secondary} stopOpacity="0.25" />
                        <stop offset="100%" stopColor={DASHBOARD_COLORS.secondary} stopOpacity="0.05" />
                    </linearGradient>
                </defs>

                {/* Revenue area */}
                {(activeMetric === "all" || activeMetric === "revenue") && (
                    <>
                        <path
                            ref={revenueAreaRef}
                            d={generateAreaPath(data.map((d) => d.revenue))}
                            fill="url(#revenueGradient)"
                        />
                        <path
                            ref={revenueLineRef}
                            d={generateLinePath(data.map((d) => d.revenue))}
                            fill="none"
                            stroke={DASHBOARD_COLORS.primary}
                            strokeWidth="2"
                        />
                    </>
                )}

                {/* Margin area */}
                {(activeMetric === "all" || activeMetric === "margin") && (
                    <>
                        <path
                            ref={marginAreaRef}
                            d={generateAreaPath(data.map((d) => d.margin))}
                            fill="url(#marginGradient)"
                        />
                        <path
                            ref={marginLineRef}
                            d={generateLinePath(data.map((d) => d.margin))}
                            fill="none"
                            stroke={DASHBOARD_COLORS.secondary}
                            strokeWidth="2"
                        />
                    </>
                )}

                {/* Expenses line */}
                {(activeMetric === "all" || activeMetric === "expenses") && (
                    <path
                        ref={expensesLineRef}
                        d={generateLinePath(data.map((d) => d.expenses))}
                        fill="none"
                        stroke={DASHBOARD_COLORS.tertiary}
                        strokeWidth="1.5"
                        strokeDasharray="4,2"
                    />
                )}

                {/* Data points */}
                {data.map((point, i) => (
                    <g key={i}>
                        {/* Hover area */}
                        <rect
                            x={paddingX + i * stepX - stepX / 2}
                            y={paddingY}
                            width={stepX}
                            height={chartHeight - paddingY - paddingBottom}
                            fill="transparent"
                            onMouseEnter={() => setHoveredIndex(i)}
                        />

                        {/* Dots on hover */}
                        {hoveredIndex === i && (
                            <>
                                {(activeMetric === "all" || activeMetric === "revenue") && (
                                    <circle
                                        cx={paddingX + i * stepX}
                                        cy={scaleY(point.revenue)}
                                        r="4"
                                        fill={DASHBOARD_COLORS.primary}
                                        stroke={DASHBOARD_COLORS.card}
                                        strokeWidth="2"
                                    />
                                )}
                                {(activeMetric === "all" || activeMetric === "margin") && (
                                    <circle
                                        cx={paddingX + i * stepX}
                                        cy={scaleY(point.margin)}
                                        r="4"
                                        fill={DASHBOARD_COLORS.secondary}
                                        stroke={DASHBOARD_COLORS.card}
                                        strokeWidth="2"
                                    />
                                )}
                                <line
                                    x1={paddingX + i * stepX}
                                    y1={paddingY}
                                    x2={paddingX + i * stepX}
                                    y2={chartHeight - paddingBottom}
                                    stroke={DASHBOARD_COLORS.border}
                                    strokeWidth="1"
                                    strokeDasharray="2,2"
                                    opacity="0.5"
                                />
                            </>
                        )}

                        {/* X-axis labels */}
                        <text
                            x={paddingX + i * stepX}
                            y={chartHeight - 10}
                            textAnchor="middle"
                            className="text-[9px]"
                            style={{ fill: DASHBOARD_COLORS.textSecondary }}
                        >
                            {point.month}
                        </text>
                    </g>
                ))}

                {/* Tooltip */}
                {hoveredIndex !== null && (
                    <g>
                        <rect
                            x={Math.min(paddingX + hoveredIndex * stepX - 45, chartWidth - 110)}
                            y={5}
                            width={90}
                            height={58}
                            fill={DASHBOARD_COLORS.card}
                            rx="4"
                            stroke={DASHBOARD_COLORS.border}
                            opacity="0.95"
                        />
                        <text
                            x={Math.min(paddingX + hoveredIndex * stepX, chartWidth - 65)}
                            y={20}
                            textAnchor="middle"
                            className="text-[9px] fill-white/70"
                        >
                            {data[hoveredIndex].month} 2024
                        </text>
                        <text
                            x={Math.min(paddingX + hoveredIndex * stepX, chartWidth - 65)}
                            y={34}
                            textAnchor="middle"
                            className="text-[10px] fill-white font-medium"
                        >
                            Rev: ₹{data[hoveredIndex].revenue.toFixed(1)} Cr
                        </text>
                        <text
                            x={Math.min(paddingX + hoveredIndex * stepX, chartWidth - 65)}
                            y={48}
                            textAnchor="middle"
                            className="text-[10px] fill-white font-medium"
                        >
                            Margin: ₹{data[hoveredIndex].margin.toFixed(1)} Cr
                        </text>
                        <text
                            x={Math.min(paddingX + hoveredIndex * stepX, chartWidth - 65)}
                            y={60}
                            textAnchor="middle"
                            className="text-[10px] fill-white/70"
                        >
                            OpEx: ₹{data[hoveredIndex].expenses.toFixed(1)} Cr
                        </text>
                    </g>
                )}
            </svg>

            {/* Summary stats */}
            <div
                className="mt-3 pt-3 border-t grid grid-cols-3 gap-4 text-xs"
                style={{ borderColor: DASHBOARD_COLORS.gridLine }}
            >
                <div>
                    <span style={{ color: DASHBOARD_COLORS.textSecondary }}>YTD Revenue</span>
                    <div className="font-semibold" style={{ color: DASHBOARD_COLORS.textPrimary }}>
                        <AnimatedNumber value="₹918.9 Cr" />
                    </div>
                </div>
                <div>
                    <span style={{ color: DASHBOARD_COLORS.textSecondary }}>Avg Monthly</span>
                    <div className="font-semibold" style={{ color: DASHBOARD_COLORS.textPrimary }}>
                        <AnimatedNumber value="₹76.6 Cr" />
                    </div>
                </div>
                <div>
                    <span style={{ color: DASHBOARD_COLORS.textSecondary }}>MoM Growth</span>
                    <div className="font-semibold" style={{ color: DASHBOARD_COLORS.positive }}>
                        <AnimatedNumber value="+4.9%" />
                    </div>
                </div>
            </div>
        </div>
    );
};

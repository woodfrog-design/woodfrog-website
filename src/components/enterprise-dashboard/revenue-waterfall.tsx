"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DASHBOARD_COLORS } from "./dashboard-context";
import { AnimatedNumber } from "../ui/animated-number";

gsap.registerPlugin(ScrollTrigger);

interface WaterfallData {
    label: string;
    value: number;
    type: "start" | "increase" | "decrease" | "subtotal" | "total";
}

interface RevenueWaterfallProps {
    title?: string;
    data?: WaterfallData[];
    onBarClick?: (item: WaterfallData) => void;
}

// Default enterprise data
const defaultData: WaterfallData[] = [
    { label: "FY23 Revenue", value: 847.2, type: "start" },
    { label: "Volume Growth", value: 45.3, type: "increase" },
    { label: "Price Increase", value: 28.7, type: "increase" },
    { label: "New Customers", value: 67.8, type: "increase" },
    { label: "Churn Impact", value: -32.4, type: "decrease" },
    { label: "Currency Effect", value: -15.6, type: "decrease" },
    { label: "Discounting", value: -22.1, type: "decrease" },
    { label: "FY24 Revenue", value: 918.9, type: "total" },
];

export const RevenueWaterfall: React.FC<RevenueWaterfallProps> = ({
    title = "Revenue Bridge Analysis: FY23 → FY24 (₹ Cr)",
    data = defaultData,
    onBarClick,
}) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const barsRef = useRef<(SVGRectElement | null)[]>([]);
    const connectorLinesRef = useRef<(SVGLineElement | null)[]>([]);
    const LabelsRef = useRef<(SVGTextElement | null)[]>([]);

    // Calculate positions
    const chartWidth = 900;
    const chartHeight = 280;
    const barWidth = 70;
    const gap = 20;
    const paddingX = 60;
    const paddingY = 40;
    const paddingBottom = 60;

    // Calculate running totals and bar positions
    let runningTotal = 0;
    const processedData = data.map((item, index) => {
        let barStart = 0;
        let barEnd = 0;

        if (item.type === "start") {
            runningTotal = item.value;
            barStart = 0;
            barEnd = item.value;
        } else if (item.type === "total") {
            barStart = 0;
            barEnd = item.value;
        } else if (item.type === "subtotal") {
            barStart = 0;
            barEnd = runningTotal;
        } else {
            barStart = runningTotal;
            runningTotal += item.value;
            barEnd = runningTotal;
        }

        return {
            ...item,
            barStart,
            barEnd,
            runningTotal,
        };
    });

    // Find max value for scaling
    const allValues = processedData.flatMap((d) => [d.barStart, d.barEnd]);
    const maxVal = Math.max(...allValues) * 1.1;

    // Scale function
    const scaleY = (val: number) => {
        return chartHeight - paddingBottom - ((val / maxVal) * (chartHeight - paddingY - paddingBottom));
    };

    const getBarColor = (type: string, isHovered: boolean) => {
        const colors = {
            start: isHovered ? DASHBOARD_COLORS.textSecondary : DASHBOARD_COLORS.textSecondary,
            increase: isHovered ? "#10B981" : "#059669", // Emeralds
            decrease: isHovered ? "#F43F5E" : "#E11D48", // Roses
            subtotal: isHovered ? DASHBOARD_COLORS.secondary : DASHBOARD_COLORS.accent,
            total: isHovered ? DASHBOARD_COLORS.secondary : DASHBOARD_COLORS.accent,
        };
        return colors[type as keyof typeof colors] || DASHBOARD_COLORS.textSecondary;
    };

    useGSAP(() => {
        if (!containerRef.current) return;

        // Container entry
        gsap.fromTo(containerRef.current,
            { opacity: 0 },
            {
                opacity: 1,
                duration: 0.8,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 90%",
                    once: true,
                }
            }
        );

        // Bars animation
        processedData.forEach((item, idx) => {
            const bar = barsRef.current[idx];
            if (bar) {
                const yTop = scaleY(Math.max(item.barStart, item.barEnd));
                const yBottom = scaleY(Math.min(item.barStart, item.barEnd));
                const targetHeight = Math.max(yBottom - yTop, 2);

                gsap.fromTo(bar,
                    { attr: { height: 0, y: scaleY(item.barStart) } },
                    {
                        attr: { height: targetHeight, y: yTop },
                        duration: 0.8,
                        delay: idx * 0.1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 90%",
                            once: true,
                        }
                    }
                );
            }

            const connector = connectorLinesRef.current[idx];
            if (connector) {
                const length = connector.getTotalLength();
                gsap.set(connector, { strokeDasharray: length, strokeDashoffset: length });
                gsap.to(connector, {
                    attr: { strokeDashoffset: 0 },
                    duration: 0.5,
                    delay: 0.5 + idx * 0.1,
                    ease: "power1.inOut",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 90%",
                        once: true,
                    }
                });
            }

            const label = LabelsRef.current[idx];
            if (label) {
                gsap.fromTo(label,
                    { opacity: 0 },
                    {
                        opacity: 1,
                        duration: 0.5,
                        delay: 0.5 + idx * 0.1,
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
                <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded" style={{ backgroundColor: DASHBOARD_COLORS.positive }} />
                        <span style={{ color: DASHBOARD_COLORS.textSecondary }}>Positive Impact</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded" style={{ backgroundColor: DASHBOARD_COLORS.negative }} />
                        <span style={{ color: DASHBOARD_COLORS.textSecondary }}>Negative Impact</span>
                    </div>
                </div>
            </div>

            {/* Chart */}
            <svg
                width="100%"
                height={chartHeight}
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                className="overflow-visible"
            >
                {/* Y-axis grid lines */}
                {[0, 200, 400, 600, 800, 1000].map((tick) => (
                    <g key={tick}>
                        <line
                            x1={paddingX}
                            y1={scaleY(tick)}
                            x2={chartWidth - 20}
                            y2={scaleY(tick)}
                            stroke={DASHBOARD_COLORS.gridLine}
                            strokeWidth="1"
                        />
                        <text
                            x={paddingX - 10}
                            y={scaleY(tick) + 4}
                            textAnchor="end"
                            className="text-[10px]"
                            style={{ fill: DASHBOARD_COLORS.textSecondary }}
                        >
                            {tick}
                        </text>
                    </g>
                ))}

                {/* Zero line */}
                <line
                    x1={paddingX}
                    y1={scaleY(0)}
                    x2={chartWidth - 20}
                    y2={scaleY(0)}
                    stroke={DASHBOARD_COLORS.textPrimary}
                    strokeWidth="1"
                    opacity="0.2"
                />

                {/* Bars */}
                {processedData.map((item, index) => {
                    const x = paddingX + index * (barWidth + gap);
                    const yTop = scaleY(Math.max(item.barStart, item.barEnd));
                    const isHovered = hoveredIndex === index;

                    return (
                        <g
                            key={index}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            onClick={() => onBarClick?.(item)}
                            style={{ cursor: "pointer" }}
                        >
                            {/* Connector line (for non-start/total bars) */}
                            {index > 0 && item.type !== "total" && (
                                <line
                                    ref={(el) => { connectorLinesRef.current[index] = el; }}
                                    x1={x - gap}
                                    y1={scaleY(item.barStart)}
                                    x2={x}
                                    y2={scaleY(item.barStart)}
                                    stroke={DASHBOARD_COLORS.border}
                                    strokeWidth="1"
                                    strokeDasharray="3,2"
                                />
                            )}

                            {/* Bar */}
                            <rect
                                ref={(el) => { barsRef.current[index] = el; }}
                                x={x}
                                width={barWidth}
                                fill={getBarColor(item.type, isHovered)}
                                rx="2"
                                className="transition-colors duration-150"
                            />

                            {/* Value label */}
                            <text
                                ref={(el) => { LabelsRef.current[index] = el; }}
                                x={x + barWidth / 2}
                                y={yTop - 8}
                                textAnchor="middle"
                                className={`text-[10px] font-semibold`}
                                style={{ fill: item.value >= 0 ? DASHBOARD_COLORS.textPrimary : DASHBOARD_COLORS.negative }}
                            >
                                {item.value >= 0 ? "+" : ""}
                                <AnimatedNumber value={item.value} delay={index * 0.1} duration={1} />
                            </text>

                            {/* X-axis label */}
                            <text
                                x={x + barWidth / 2}
                                y={chartHeight - 20}
                                textAnchor="middle"
                                className="text-[9px]"
                                style={{ fill: DASHBOARD_COLORS.textSecondary }}
                            >
                                {item.label.length > 12
                                    ? item.label.substring(0, 10) + "..."
                                    : item.label}
                            </text>
                        </g>
                    );
                })}

                {/* Hover tooltip */}
                {hoveredIndex !== null && (
                    <g>
                        <rect
                            x={paddingX + hoveredIndex * (barWidth + gap) - 10}
                            y={10}
                            width={barWidth + 20}
                            height={40}
                            fill={DASHBOARD_COLORS.card}
                            stroke={DASHBOARD_COLORS.border}
                            rx="4"
                            opacity="0.95"
                        />
                        <text
                            x={paddingX + hoveredIndex * (barWidth + gap) + barWidth / 2}
                            y={28}
                            textAnchor="middle"
                            className="text-[10px] fill-white font-medium"
                        >
                            {processedData[hoveredIndex].label}
                        </text>
                        <text
                            x={paddingX + hoveredIndex * (barWidth + gap) + barWidth / 2}
                            y={42}
                            textAnchor="middle"
                            className="text-[11px] fill-white font-bold"
                        >
                            ₹{Math.abs(processedData[hoveredIndex].value).toFixed(1)} Cr
                        </text>
                    </g>
                )}
            </svg>

            {/* Footer annotation */}
            <div className="mt-2 pt-2 border-t flex items-center justify-between text-xs" style={{ borderColor: DASHBOARD_COLORS.gridLine, color: DASHBOARD_COLORS.textSecondary }}>
                <span>Net Change: <span className="font-semibold" style={{ color: DASHBOARD_COLORS.positive }}>
                    +₹<AnimatedNumber value={71.7} /> Cr (+<AnimatedNumber value={8.5} />%)
                </span></span>
                <span>Data as of: Dec 2024</span>
            </div>
        </div>
    );
};

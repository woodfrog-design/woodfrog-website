"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DASHBOARD_COLORS } from "./dashboard-context";

gsap.registerPlugin(ScrollTrigger);

interface ScatterPoint {
    id: string;
    name: string;
    growth: number;
    margin: number;
    revenue: number;
    segment: string;
}

interface ScatterQuadrantProps {
    title?: string;
    data?: ScatterPoint[];
    onPointClick?: (point: ScatterPoint) => void;
}

const defaultData: ScatterPoint[] = [
    { id: "1", name: "North Enterprise", growth: 12.5, margin: 38.2, revenue: 145, segment: "Enterprise" },
    { id: "2", name: "South SMB", growth: 8.3, margin: 42.1, revenue: 112, segment: "SMB" },
    { id: "3", name: "East Consumer", growth: 15.7, margin: 28.4, revenue: 98, segment: "Consumer" },
    { id: "4", name: "West Enterprise", growth: 22.1, margin: 45.3, revenue: 167, segment: "Enterprise" },
    { id: "5", name: "Central SMB", growth: -3.2, margin: 35.8, revenue: 78, segment: "SMB" },
    { id: "6", name: "North Consumer", growth: 6.8, margin: 32.1, revenue: 89, segment: "Consumer" },
    { id: "7", name: "South Enterprise", growth: 18.4, margin: 41.2, revenue: 156, segment: "Enterprise" },
    { id: "8", name: "East SMB", growth: -1.5, margin: 29.8, revenue: 67, segment: "SMB" },
    { id: "9", name: "West Consumer", growth: 9.2, margin: 36.7, revenue: 134, segment: "Consumer" },
    { id: "10", name: "Central Gov", growth: 4.1, margin: 48.9, revenue: 56, segment: "Government" },
];

const segmentColors: Record<string, string> = {
    Enterprise: DASHBOARD_COLORS.secondary, // Electric Violet
    SMB: DASHBOARD_COLORS.accent,          // Electric Violet (mapping to same for now or distinct if accent=secondary)
    Consumer: DASHBOARD_COLORS.tertiary,     // Soft Magenta
    Government: "#3B82F6",                 // Blue 500 (Clean Blue)
};

export const ScatterQuadrant: React.FC<ScatterQuadrantProps> = ({
    title = "Growth vs Profitability Analysis",
    data: rawData = defaultData,
    onPointClick,
}) => {
    // Transform data to make negative growth positive for representation as requested
    const data = React.useMemo(() => rawData.map(d => ({
        ...d,
        displayGrowth: Math.abs(d.growth)
    })), [rawData]);

    const [hoveredPoint, setHoveredPoint] = useState<any | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const pointsRef = useRef<(SVGCircleElement | null)[]>([]);

    const chartWidth = 420;
    const chartHeight = 280;
    const paddingX = 50;
    const paddingY = 40;
    const paddingBottom = 80; // Increased buffer

    // Axis ranges
    const growthMin = -5;
    const growthMax = 40; // Increased
    const marginMin = 10; // Buffer below 20
    const marginMax = 65; // Buffer above 55

    // Quadrant thresholds
    const growthThreshold = 10;
    const marginThreshold = 35;

    const scaleX = (growth: number) => {
        return paddingX + ((growth - growthMin) / (growthMax - growthMin)) * (chartWidth - paddingX - 20);
    };

    const scaleY = (margin: number) => {
        return chartHeight - paddingBottom - ((margin - marginMin) / (marginMax - marginMin)) * (chartHeight - paddingY - paddingBottom);
    };

    const getPointRadius = (revenue: number) => {
        if (data.length <= 1) return 10;
        const minRev = Math.min(...data.map((d) => d.revenue));
        const maxRev = Math.max(...data.map((d) => d.revenue));
        if (maxRev === minRev) return 10;
        return 6 + ((revenue - minRev) / (maxRev - minRev)) * 10;
    };

    useGSAP(() => {
        if (!containerRef.current) return;

        // Container entry
        gsap.fromTo(containerRef.current,
            { opacity: 0, scale: 0.95 },
            {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 90%",
                    once: true,
                }
            }
        );

        // Points animation
        pointsRef.current.forEach((point, idx) => {
            if (point && data[idx]) {
                const targetR = getPointRadius(data[idx].revenue);
                gsap.fromTo(point,
                    { attr: { r: 0 }, opacity: 0 },
                    {
                        attr: { r: targetR },
                        opacity: 0.7,
                        duration: 0.8,
                        delay: 0.3 + idx * 0.03,
                        ease: "back.out(1.7)"
                    }
                );
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
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold" style={{ color: DASHBOARD_COLORS.textPrimary }}>{title}</h3>
                <div className="flex items-center gap-3 text-xs">
                    {Object.entries(segmentColors).map(([segment, color]) => (
                        <div key={segment} className="flex items-center gap-1">
                            <div
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ backgroundColor: color }}
                            />
                            <span style={{ color: DASHBOARD_COLORS.textSecondary }}>{segment}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chart */}
            <svg
                width="100%"
                height={chartHeight}
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                className="overflow-visible"
            >
                {/* Quadrant backgrounds */}
                <rect
                    x={scaleX(growthThreshold)}
                    y={paddingY}
                    width={chartWidth - scaleX(growthThreshold) - 20}
                    height={scaleY(marginThreshold) - paddingY}
                    fill={DASHBOARD_COLORS.positive}
                    opacity="0.05"
                />
                <rect
                    x={paddingX}
                    y={scaleY(marginThreshold)}
                    width={scaleX(growthThreshold) - paddingX}
                    height={chartHeight - paddingBottom - scaleY(marginThreshold)}
                    fill={DASHBOARD_COLORS.negative}
                    opacity="0.05"
                />

                {/* Quadrant labels */}
                <text
                    x={chartWidth - 30}
                    y={paddingY + 15}
                    textAnchor="end"
                    className="text-[8px] font-semibold"
                    style={{ fill: DASHBOARD_COLORS.positive }}
                >
                    STARS
                </text>
                <text
                    x={paddingX + 5}
                    y={chartHeight - paddingBottom - 5}
                    textAnchor="start"
                    className="text-[8px] font-semibold"
                    style={{ fill: DASHBOARD_COLORS.negative }}
                >
                    AT RISK
                </text>
                <text
                    x={chartWidth - 30}
                    y={chartHeight - paddingBottom - 5}
                    textAnchor="end"
                    className="text-[8px] font-semibold"
                    style={{ fill: DASHBOARD_COLORS.textSecondary }}
                >
                    EMERGING
                </text>
                <text
                    x={paddingX + 5}
                    y={paddingY + 15}
                    textAnchor="start"
                    className="text-[8px] font-semibold"
                    style={{ fill: DASHBOARD_COLORS.secondary }}
                >
                    CASH COWS
                </text>

                {/* Grid lines */}
                <line
                    x1={scaleX(growthThreshold)}
                    y1={paddingY}
                    x2={scaleX(growthThreshold)}
                    y2={chartHeight - paddingBottom}
                    stroke={DASHBOARD_COLORS.gridLine}
                    strokeDasharray="4,2"
                />
                <line
                    x1={paddingX}
                    y1={scaleY(marginThreshold)}
                    x2={chartWidth - 20}
                    y2={scaleY(marginThreshold)}
                    stroke={DASHBOARD_COLORS.gridLine}
                    strokeDasharray="4,2"
                />

                {/* Axes */}
                <line
                    x1={paddingX}
                    y1={chartHeight - paddingBottom}
                    x2={chartWidth - 20}
                    y2={chartHeight - paddingBottom}
                    stroke={DASHBOARD_COLORS.border}
                    strokeWidth="1"
                />
                <line
                    x1={paddingX}
                    y1={paddingY}
                    x2={paddingX}
                    y2={chartHeight - paddingBottom}
                    stroke={DASHBOARD_COLORS.border}
                    strokeWidth="1"
                />

                {/* X-axis labels */}
                {[-5, 0, 10, 20, 30, 40].map((tick) => (
                    <g key={tick}>
                        <text
                            x={scaleX(tick)}
                            y={chartHeight - 20}
                            textAnchor="middle"
                            className="text-[9px]"
                            style={{ fill: DASHBOARD_COLORS.textSecondary }}
                        >
                            {tick}%
                        </text>
                    </g>
                ))}
                <text
                    x={chartWidth / 2}
                    y={chartHeight - 5}
                    textAnchor="middle"
                    className="text-[10px] font-medium"
                    style={{ fill: DASHBOARD_COLORS.textPrimary }}
                >
                    Revenue Growth (YoY)
                </text>

                {/* Y-axis labels */}
                {[10, 25, 35, 45, 55, 65].map((tick) => (
                    <g key={tick}>
                        <text
                            x={paddingX - 8}
                            y={scaleY(tick) + 3}
                            textAnchor="end"
                            className="text-[9px]"
                            style={{ fill: DASHBOARD_COLORS.textSecondary }}
                        >
                            {tick}%
                        </text>
                    </g>
                ))}
                <text
                    x={15}
                    y={chartHeight / 2}
                    textAnchor="middle"
                    className="text-[10px] font-medium"
                    transform={`rotate(-90, 15, ${chartHeight / 2})`}
                    style={{ fill: DASHBOARD_COLORS.textPrimary }}
                >
                    Gross Margin %
                </text>

                {/* Data points */}
                {data.map((point, index) => {
                    const r = getPointRadius(point.revenue);
                    // Clamp with extra 5px buffer to ensure no touching or crossing axis
                    const cx = Math.max(paddingX + r + 5, Math.min(chartWidth - 25 - r, scaleX(point.displayGrowth)));
                    const cy = Math.max(paddingY + r + 5, Math.min(chartHeight - paddingBottom - r - 5, scaleY(point.margin)));
                    const isHovered = hoveredPoint?.id === point.id;

                    return (
                        <g
                            key={point.id}
                            onMouseEnter={() => setHoveredPoint(point)}
                            onMouseLeave={() => setHoveredPoint(null)}
                            onClick={() => onPointClick?.(point)}
                            style={{ cursor: "pointer" }}
                        >
                            <circle
                                ref={(el) => { pointsRef.current[index] = el; }}
                                cx={cx}
                                cy={cy}
                                r={r}
                                fill={segmentColors[point.segment] || DASHBOARD_COLORS.textSecondary}
                                stroke={isHovered ? DASHBOARD_COLORS.textPrimary : DASHBOARD_COLORS.card}
                                strokeWidth={isHovered ? 2 : 1}
                                className="transition-all duration-150"
                                style={{
                                    opacity: isHovered ? 1 : 0.7,
                                    transformOrigin: `${cx}px ${cy}px`
                                }}
                            />
                        </g>
                    );
                })}

                {/* Tooltip */}
                {hoveredPoint && (
                    <g>
                        <rect
                            x={Math.min(scaleX(hoveredPoint.displayGrowth) - 50, chartWidth - 120)}
                            y={Math.max(scaleY(hoveredPoint.margin) - 65, 5)}
                            width={100}
                            height={56}
                            fill={DASHBOARD_COLORS.background}
                            stroke={DASHBOARD_COLORS.border}
                            rx="4"
                            opacity="0.95"
                        />
                        <text
                            x={Math.min(scaleX(hoveredPoint.displayGrowth), chartWidth - 70)}
                            y={Math.max(scaleY(hoveredPoint.margin) - 48, 22)}
                            textAnchor="middle"
                            className="text-[10px] font-medium"
                            style={{ fill: DASHBOARD_COLORS.textPrimary }}
                        >
                            {hoveredPoint.name}
                        </text>
                        <text
                            x={Math.min(scaleX(hoveredPoint.displayGrowth), chartWidth - 70)}
                            y={Math.max(scaleY(hoveredPoint.margin) - 34, 36)}
                            textAnchor="middle"
                            className="text-[9px]"
                            style={{ fill: DASHBOARD_COLORS.textSecondary }}
                        >
                            Revenue: ₹{hoveredPoint.revenue} Cr
                        </text>
                        <text
                            x={Math.min(scaleX(hoveredPoint.displayGrowth), chartWidth - 70)}
                            y={Math.max(scaleY(hoveredPoint.margin) - 20, 50)}
                            textAnchor="middle"
                            className="text-[9px]"
                            style={{ fill: DASHBOARD_COLORS.textSecondary }}
                        >
                            Growth: {hoveredPoint.growth}% | Margin: {hoveredPoint.margin}%
                        </text>
                    </g>
                )}
            </svg>

            {/* Size legend */}
            <div className="mt-2 text-xs text-center" style={{ color: DASHBOARD_COLORS.textSecondary }}>
                Bubble size represents revenue volume
            </div>
        </div>
    );
};

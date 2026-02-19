"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DASHBOARD_COLORS, REGIONS, SEGMENTS } from "./dashboard-context";
import { AnimatedNumber } from "../ui/animated-number";

gsap.registerPlugin(ScrollTrigger);

interface HeatmapCell {
    region: string;
    segment: string;
    value: number;
    variance: number;
}

interface RegionHeatmapProps {
    title?: string;
    data?: HeatmapCell[];
    onCellClick?: (cell: HeatmapCell) => void;
}

// Generate default data
const generateDefaultData = (): HeatmapCell[] => {
    const data: HeatmapCell[] = [];
    const baseValues: Record<string, Record<string, number>> = {
        North: { Hardware: 145, Software: 89, Services: 67, Licensing: 34 },
        South: { Hardware: 112, Software: 156, Services: 78, Licensing: 45 },
        East: { Hardware: 98, Software: 67, Services: 123, Licensing: 56 },
        West: { Hardware: 167, Software: 134, Services: 89, Licensing: 67 },
        Central: { Hardware: 134, Software: 78, Services: 56, Licensing: 23 },
    };

    REGIONS.forEach((region) => {
        SEGMENTS.forEach((segment) => {
            const value = baseValues[region]?.[segment] || Math.floor(Math.random() * 150) + 20;
            const variance = Math.floor(Math.random() * 40) - 20;
            data.push({ region, segment, value, variance });
        });
    });

    return data;
};

export const RegionHeatmap: React.FC<RegionHeatmapProps> = ({
    title = "Regional Performance Matrix (₹ Cr)",
    data = generateDefaultData(),
    onCellClick,
}) => {
    const [hoveredCell, setHoveredCell] = useState<HeatmapCell | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const rowRefs = useRef<(HTMLTableRowElement | null)[]>([]);

    const maxValue = Math.max(...data.map((d) => d.value));
    const minValue = Math.min(...data.map((d) => d.value));

    const getColor = (value: number) => {
        if (maxValue === minValue) return DASHBOARD_COLORS.primary;
        const ratio = (value - minValue) / (maxValue - minValue);
        // Dark Violet to Electric Violet gradient
        if (ratio < 0.25) return "#1e1b4b"; // Indigo 950
        if (ratio < 0.5) return "#312e81";  // Indigo 900
        if (ratio < 0.75) return "#3730a3"; // Indigo 800
        return DASHBOARD_COLORS.secondary;  // Electric Violet
    };

    const getTextColor = (value: number) => {
        return DASHBOARD_COLORS.textPrimary;
    };

    // Calculate row and column totals
    const regionTotals = REGIONS.map((region) => ({
        region,
        total: data.filter((d) => d.region === region).reduce((sum, d) => sum + d.value, 0),
    }));

    const segmentTotals = SEGMENTS.map((segment) => ({
        segment,
        total: data.filter((d) => d.segment === segment).reduce((sum, d) => sum + d.value, 0),
    }));

    const grandTotal = data.reduce((sum, d) => sum + d.value, 0);

    useGSAP(() => {
        if (!containerRef.current) return;

        // Container entry
        gsap.fromTo(containerRef.current,
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 90%",
                    once: true,
                }
            }
        );

        // Rows animation
        rowRefs.current.forEach((row, idx) => {
            if (row) {
                gsap.fromTo(row,
                    { opacity: 0, x: -15 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.6,
                        delay: 0.2 + idx * 0.05,
                        ease: "power2.out",
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
                <div className="flex items-center gap-2 text-xs" style={{ color: DASHBOARD_COLORS.textSecondary }}>
                    <span>Low</span>
                    <div className="flex">
                        {["#1e1b4b", "#312e81", "#3730a3", DASHBOARD_COLORS.secondary].map((color, i) => (
                            <div
                                key={i}
                                className="w-5 h-3"
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                    <span>High</span>
                </div>
            </div>

            {/* Heatmap table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-xs">
                    <thead>
                        <tr>
                            <th className="p-2 text-left font-semibold border-b" style={{ color: DASHBOARD_COLORS.textSecondary, borderColor: DASHBOARD_COLORS.border }}>
                                Region / Segment
                            </th>
                            {SEGMENTS.map((segment) => (
                                <th
                                    key={segment}
                                    className="p-2 text-center font-semibold border-b"
                                    style={{ color: DASHBOARD_COLORS.textSecondary, borderColor: DASHBOARD_COLORS.border }}
                                >
                                    {segment}
                                </th>
                            ))}
                            <th className="p-2 text-center font-bold border-b" style={{ color: DASHBOARD_COLORS.accent, borderColor: DASHBOARD_COLORS.border, backgroundColor: DASHBOARD_COLORS.background }}>
                                Total
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {REGIONS.map((region, idx) => (
                            <tr key={region} ref={el => { rowRefs.current[idx] = el; }}>
                                <td className="p-2 font-medium border-b" style={{ color: DASHBOARD_COLORS.textPrimary, borderColor: DASHBOARD_COLORS.gridLine }}>
                                    {region}
                                </td>
                                {SEGMENTS.map((segment) => {
                                    const cell = data.find(
                                        (d) => d.region === region && d.segment === segment
                                    );
                                    if (!cell) return <td key={segment} />;

                                    const isHovered =
                                        hoveredCell?.region === region &&
                                        hoveredCell?.segment === segment;

                                    return (
                                        <td
                                            key={segment}
                                            className={`p-0 border-b transition-all duration-150 cursor-pointer`}
                                            style={{ borderColor: DASHBOARD_COLORS.gridLine }}
                                            onMouseEnter={() => setHoveredCell(cell)}
                                            onMouseLeave={() => setHoveredCell(null)}
                                            onClick={() => onCellClick?.(cell)}
                                        >
                                            <div
                                                className={`p-2 text-center font-semibold relative ${isHovered ? "ring-2 ring-white/20 ring-inset" : ""}`}
                                                style={{
                                                    backgroundColor: getColor(cell.value),
                                                    color: getTextColor(cell.value),
                                                }}
                                            >
                                                <AnimatedNumber value={Math.round(cell.value)} />
                                                {/* Variance indicator */}
                                                <span
                                                    className={`absolute top-0.5 right-0.5 text-[8px]`}
                                                    style={{
                                                        color:
                                                            cell.variance >= 0
                                                                ? DASHBOARD_COLORS.positive
                                                                : DASHBOARD_COLORS.negative,
                                                    }}
                                                >
                                                    {cell.variance >= 0 ? "▲" : "▼"}
                                                </span>
                                            </div>
                                        </td>
                                    );
                                })}
                                <td className="p-2 text-center font-bold border-b" style={{ color: DASHBOARD_COLORS.textPrimary, borderColor: DASHBOARD_COLORS.gridLine, backgroundColor: DASHBOARD_COLORS.background }}>
                                    <AnimatedNumber value={Math.round(regionTotals.find((r) => r.region === region)?.total || 0)} />
                                </td>
                            </tr>
                        ))}
                        {/* Totals row */}
                        <tr style={{ backgroundColor: DASHBOARD_COLORS.background }}>
                            <td className="p-2 font-bold" style={{ color: DASHBOARD_COLORS.textPrimary }}>Total</td>
                            {segmentTotals.map((st) => (
                                <td
                                    key={st.segment}
                                    className="p-2 text-center font-bold"
                                    style={{ color: DASHBOARD_COLORS.textPrimary }}
                                >
                                    <AnimatedNumber value={Math.round(st.total)} />
                                </td>
                            ))}
                            <td className="p-2 text-center font-bold text-sm" style={{ color: DASHBOARD_COLORS.accent }}>
                                <AnimatedNumber value={Math.round(grandTotal)} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Hover tooltip */}
            {hoveredCell && (
                <div className="mt-3 pt-3 border-t text-xs flex items-center gap-4" style={{ borderColor: DASHBOARD_COLORS.border }}>
                    <span style={{ color: DASHBOARD_COLORS.textSecondary }}>
                        <strong style={{ color: DASHBOARD_COLORS.textPrimary }}>{hoveredCell.region}</strong> × {hoveredCell.segment}
                    </span>
                    <span className="font-semibold" style={{ color: DASHBOARD_COLORS.textPrimary }}>
                        ₹{hoveredCell.value.toFixed(1)} Cr
                    </span>
                    <span
                        className="font-semibold"
                        style={{
                            color: hoveredCell.variance >= 0
                                ? DASHBOARD_COLORS.positive
                                : DASHBOARD_COLORS.negative,
                        }}
                    >
                        {hoveredCell.variance >= 0 ? "+" : ""}
                        {hoveredCell.variance}% vs LY
                    </span>
                </div>
            )}
        </div>
    );
};

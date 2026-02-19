"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedNumber } from "../ui/animated-number";
import { DASHBOARD_COLORS } from "./dashboard-context";

gsap.registerPlugin(ScrollTrigger);

interface FunnelStep {
    label: string;
    value: number;
    color: string;
}

const defaultData: FunnelStep[] = [
    { label: "Leads", value: 12400, color: "#4F46E5" }, // Indigo 600
    { label: "Qualified", value: 8200, color: "#6366F1" }, // Indigo 500
    { label: "Proposal", value: 4500, color: "#8B5CF6" }, // Violet 500 (secondary)
    { label: "Negotiation", value: 2800, color: "#A855F7" }, // Purple 500
    { label: "Closed", value: 1850, color: "#D946EF" }, // Fuchsia 500 (tertiary near)
];

interface FunnelChartProps {
    data?: FunnelStep[];
}

export const FunnelChart: React.FC<FunnelChartProps> = ({ data = defaultData }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const stepsRef = useRef<(SVGPolygonElement | null)[]>([]);

    useGSAP(() => {
        if (!containerRef.current) return;

        // Entry animation - Only once
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

        // Funnel layers animation - Smooth transition on data change
        stepsRef.current.forEach((step, idx) => {
            if (step) {
                gsap.to(step, {
                    opacity: 1,
                    scaleX: 1,
                    duration: 0.8,
                    delay: idx * 0.1,
                    ease: "power2.out"
                });
            }
        });
    }, { scope: containerRef, dependencies: [data] });

    const totalWidth = 300;
    const totalHeight = 220;
    const stepHeight = totalHeight / data.length;
    const gap = 4;

    const overallConv = data.length > 0 ? ((data[data.length - 1].value / data[0].value) * 100).toFixed(1) : "0";

    return (
        <div
            ref={containerRef}
            className="rounded-lg border p-5 h-full flex flex-col"
            style={{
                opacity: 1,
                backgroundColor: DASHBOARD_COLORS.card,
                borderColor: DASHBOARD_COLORS.border
            }}
        >
            <h3 className="text-sm font-semibold mb-4 text-center" style={{ color: DASHBOARD_COLORS.textPrimary }}>Sales Conversion Funnel</h3>

            <div className="flex-1 flex items-center justify-center relative">
                <svg width={totalWidth} height={totalHeight} viewBox={`0 0 ${totalWidth} ${totalHeight}`} className="overflow-visible">
                    {data.map((step, idx) => {
                        const h = stepHeight - gap;
                        const y = idx * stepHeight;

                        // Calculate trapezoid points
                        const currentWidth = totalWidth * (1 - (idx * 0.15));
                        const nextWidth = totalWidth * (1 - ((idx + 1) * 0.15));

                        const x1 = (totalWidth - currentWidth) / 2;
                        const x2 = x1 + currentWidth;
                        const x3 = (totalWidth - nextWidth) / 2;
                        const x4 = x3 + nextWidth;

                        const points = `${x1},${y} ${x2},${y} ${x4},${y + h} ${x3},${y + h}`;

                        return (
                            <g key={idx}>
                                <polygon
                                    ref={(el) => { stepsRef.current[idx] = el; }}
                                    points={points}
                                    fill={step.color}
                                    style={{ transformOrigin: "center" }}
                                />
                                <foreignObject
                                    x={0}
                                    y={y}
                                    width={totalWidth}
                                    height={h}
                                    className="pointer-events-none"
                                >
                                    <div className="w-full h-full flex items-center justify-center text-white text-[10px] font-bold">
                                        {step.label} <span className="ml-1"><AnimatedNumber value={step.value} duration={1.5} delay={0.5} /></span>
                                    </div>
                                </foreignObject>

                                {/* Conversion Rate Badge */}
                                {idx > 0 && (
                                    <g transform={`translate(${totalWidth - 40}, ${y - gap / 2})`}>
                                        <rect x="0" y="-8" width="35" height="16" rx="4" fill={DASHBOARD_COLORS.background} stroke={DASHBOARD_COLORS.border} />
                                        <text x="17.5" y="4" textAnchor="middle" className="text-[8px] font-bold" fill={DASHBOARD_COLORS.textSecondary}>
                                            {Math.round((step.value / data[idx - 1].value) * 100)}%
                                        </text>
                                    </g>
                                )}
                            </g>
                        );
                    })}
                </svg>
            </div>

            <div
                className="mt-4 flex justify-between text-[10px] border-t pt-2"
                style={{ borderColor: DASHBOARD_COLORS.gridLine, color: DASHBOARD_COLORS.textSecondary }}
            >
                <span>Overall Conversion: <span className="font-bold tabular-nums" style={{ color: DASHBOARD_COLORS.accent }}>{overallConv}%</span></span>
                <span>Avg. Cycle: <span className="font-bold">24 Days</span></span>
            </div>
        </div>
    );
};

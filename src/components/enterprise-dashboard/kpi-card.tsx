"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedNumber } from "../ui/animated-number";
import { DASHBOARD_COLORS } from "./dashboard-context";

gsap.registerPlugin(ScrollTrigger);

interface KPICardProps {
    title: string;
    value: string;
    unit?: string;
    change: number;
    changeLabel: string;
    target?: string;
    targetLabel?: string;
    sparklineData?: number[];
    isHighlighted?: boolean;
    onClick?: () => void;
}

export const KPICard: React.FC<KPICardProps> = ({
    title,
    value,
    unit = "",
    change,
    changeLabel,
    target,
    targetLabel,
    sparklineData,
    isHighlighted = false,
    onClick,
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const sparklineRef = useRef<SVGPathElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);

    const isPositive = change >= 0;
    const changeColor = isPositive ? DASHBOARD_COLORS.positive : DASHBOARD_COLORS.negative;

    useGSAP(() => {
        if (!cardRef.current) return;

        // Entry animation - Only once
        gsap.fromTo(cardRef.current,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: "top 90%",
                    once: true,
                }
            }
        );

        // Sparkline animation - Smooth transition on data change
        if (sparklineRef.current) {
            const length = sparklineRef.current.getTotalLength();
            gsap.set(sparklineRef.current, { strokeDasharray: length });

            // If it's a first load, animate from full offset. Otherwise, just draw it.
            gsap.to(sparklineRef.current, {
                attr: { strokeDashoffset: 0 },
                duration: 1.5,
                ease: "expo.out",
                delay: 0.2,
            });
        }

        // Badge entry
        if (badgeRef.current) {
            gsap.fromTo(badgeRef.current,
                { scale: 0.8, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.5, delay: 0.1, ease: "back.out(1.7)" }
            );
        }
    }, { scope: cardRef, dependencies: [sparklineData, value] });

    const onMouseEnter = () => {
        gsap.to(cardRef.current, { scale: 1.02, duration: 0.3, ease: "power2.out" });
    };

    const onMouseLeave = () => {
        gsap.to(cardRef.current, { scale: 1, duration: 0.3, ease: "power2.out" });
    };

    // Generate sparkline path
    const generateSparklinePath = (data: number[]) => {
        if (!data || data.length < 2) return "";
        const max = Math.max(...data);
        const min = Math.min(...data);
        const range = max - min || 1;
        const width = 80;
        const height = 24;
        const stepX = width / (data.length - 1);

        const points = data.map((val, i) => {
            const x = i * stepX;
            const y = height - ((val - min) / range) * height;
            return `${x},${y}`;
        });

        return `M ${points.join(" L ")}`;
    };

    return (
        <div
            ref={cardRef}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={`
                relative rounded-lg p-4 border transition-colors duration-200 cursor-pointer
                ${isHighlighted
                    ? "shadow-lg ring-2 ring-brand-primary/20"
                    : "hover:shadow-md"
                }
            `}
            style={{
                minWidth: "180px",
                opacity: 1,
                backgroundColor: DASHBOARD_COLORS.card,
                borderColor: isHighlighted ? DASHBOARD_COLORS.accent : DASHBOARD_COLORS.border
            }} // Initial opacity handled by GSAP
        >
            {/* Title */}
            <div
                className="text-xs font-medium uppercase tracking-wide mb-2 truncate"
                style={{ color: DASHBOARD_COLORS.textSecondary }}
            >
                {title}
            </div>

            {/* Value Row */}
            <div className="flex items-baseline gap-1 mb-1">
                <span
                    className="text-2xl font-bold tabular-nums"
                    style={{ color: DASHBOARD_COLORS.textPrimary }}
                >
                    <AnimatedNumber value={value} delay={0.2} />
                </span>
                {unit && (
                    <span
                        className="text-sm font-medium"
                        style={{ color: DASHBOARD_COLORS.textSecondary }}
                    >
                        {unit}
                    </span>
                )}
            </div>

            {/* Change Indicator */}
            <div className="flex items-center gap-2 mb-2">
                <div
                    ref={badgeRef}
                    className="flex items-center gap-1 text-xs font-semibold px-1.5 py-0.5 rounded"
                    style={{
                        backgroundColor: isPositive ? "rgba(16, 185, 129, 0.1)" : "rgba(244, 63, 94, 0.1)",
                        color: changeColor,
                    }}
                >
                    <svg
                        className={`w-3 h-3 ${isPositive ? "" : "rotate-180"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span>{Math.abs(change)}%</span>
                </div>
                <span className="text-xs" style={{ color: DASHBOARD_COLORS.textSecondary }}>{changeLabel}</span>
            </div>

            {/* Target (if provided) */}
            {target && (
                <div
                    className="flex items-center justify-between text-xs border-t pt-2 mt-2"
                    style={{ borderColor: DASHBOARD_COLORS.gridLine }}
                >
                    <span style={{ color: DASHBOARD_COLORS.textSecondary }}>{targetLabel || "Target"}</span>
                    <span className="font-semibold" style={{ color: DASHBOARD_COLORS.textPrimary }}>{target}</span>
                </div>
            )}

            {/* Sparkline */}
            {sparklineData && sparklineData.length > 1 && (
                <div className="absolute bottom-2 right-3 opacity-50">
                    <svg width="80" height="24" className="overflow-visible">
                        <path
                            ref={sparklineRef}
                            d={generateSparklinePath(sparklineData)}
                            fill="none"
                            stroke={DASHBOARD_COLORS.secondary}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            )}

            {/* Accent bar */}
            <div
                className="absolute top-0 left-0 w-1 h-full rounded-l-lg"
                style={{ backgroundColor: DASHBOARD_COLORS.primary }}
            />
        </div>
    );
};

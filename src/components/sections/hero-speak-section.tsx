'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

const HeroSpeakSection = () => {
    // Original curves coordinates
    const curve1 = "M0.597656 50.924805C17.4612 143.2965 97.8522 293.141 284.508 353.548C440.828 399.056 583.839 294.067 500.618 184.749C417.397 75.4309 238.217 282.098 499.258 441.668C551.913 477.802 817.468 561.26 1046.43 565.235";
    const curve2Offset = "C1155.979 559.631 1360.879 555.379 1562.351 491.427C1747.405 432.686 1919.707 445.894 2066.268 454.579";

    const marqueeDuration = "95s"; // Adjusted for more items
    const junctionPoint = { x: 1046, y: 565 };
    const extendedPath = `M -1500 50 L 0.5 50 ${curve1.substring(1)} ${curve2Offset} L 4500 455`;
    const flowThickness = 77; // Control this to match pill height
    const waveGap = "gap-1"; // Control distance between ripple bars
    const verticalOffset = 140; // Decrease this to move the entire animation UP

    const analysisStatuses = useMemo(() => [
        "Pattern detected", "Trend analyzed", "Risk projected", "Action triggered",
        "Anomaly identified", "Correlation found", "Outlier removed", "Variance calculated",
        "Model updated", "Signal isolated", "Feature engineered", "Insight generated",
        "Prediction verified", "Threshold crossed", "Optimization run", "Strategy refined",
        "Metric improved", "Impact measured", "Bottleneck found", "Efficiency mapped"
    ], []);

    const [statusIndex, setStatusIndex] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setStatusIndex((prev) => (prev + 1) % analysisStatuses.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [analysisStatuses.length]);

    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const pairs = useMemo(() => [
        { p: "• Traffic density rising", s: "15% Congestion Reduced" },
        { p: "• Fraud risk elevated", s: "₹2.4M Preserved" },
        { p: "• Inventory dropping", s: "17% Stock Optimized" },
        { p: "• Demand spike detected", s: "24% Efficiency Gained" },
        { p: "• Battery drain accelerating", s: "32% Risk Reduction" },
        { p: "• Cart abandonment increasing", s: "₹4.2M Revenue Recouped" },
        { p: "• Weather shift incoming", s: "17% Downtime Avoided" },
        { p: "• Latency spike detected", s: "45% Latency Saved" },
        { p: "• Delivery ETA increasing", s: "22% Speed Improved" },
        { p: "• Stock volatility rising", s: "₹8.1M Loss Prevented" },
        { p: "• Churn rate climbing", s: "12% Retention Boost" },
        { p: "• Supply chain bottleneck", s: "30% Throughput Gain" },
        { p: "• Server load peaking", s: "20% Capacity Optimized" },
        { p: "• Anomaly in checkout", s: "₹1.5M Breach Averted" },
        { p: "• Energy waste detected", s: "18% Sustainability Up" },
        { p: "• ROI decreasing", s: "22% Margin Expanded" },
        { p: "• Customer wait time up", s: "40% NPS Improvement" },
        { p: "• Quality deviation found", s: "99.9% Yield Assured" },
        { p: "• Budget overburn imminent", s: "₹5.2M OpEx Saved" },
        { p: "• Market shift detected", s: "15% Faster Pivot" },
    ], []);

    // Perfect sync helper
    const padToLength = (str: string, len: number) => {
        const current = str.length;
        if (current >= len) return str;
        return str + "\u00A0".repeat(len - current);
    };

    const maxItemLen = 32; // Reduced for higher density

    // Memoize the heavy .repeat(8) text generation so it only runs once
    const { problemsText, solutionsText } = useMemo(() => {
        const problemsArr: string[] = [];
        const solutionsArr: string[] = [];
        pairs.forEach(pair => {
            problemsArr.push(padToLength(pair.p, maxItemLen));
            solutionsArr.push(padToLength(pair.s, maxItemLen));
        });
        return {
            problemsText: problemsArr.join("").repeat(8),
            solutionsText: solutionsArr.join("").repeat(8),
        };
    }, [pairs]);

    // Waveform heights - generate stable random durations once
    const waveformBars = useMemo(() => {
        const heights = [4, 6, 8, 5, 9, 3, 7, 5, 8, 4, 10, 6, 8, 4, 12, 5, 9, 3, 7];
        return heights.map((h, i) => ({
            targetHeight: h * 2.8,
            duration: (0.25 + (i * 0.0317 + 0.15) % 0.4), // deterministic pseudo-random for SSR
            delay: i * 0.04,
        }));
    }, []);

    return (
        <section className="relative w-full min-h-[400px] md:min-h-[750px] bg-transparent flex flex-col items-center justify-start overflow-hidden pt-10 md:pt-24 pb-0">

            {/* Header Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative z-20 px-6 text-center max-w-5xl mb-12 md:mt-0"
            >
                <h2 className="text-white text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-tight mb-6">
                    Beyond Dashboards. <br className="hidden md:block" />
                    Into Decisions.
                </h2>
                <p className="text-white/60 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto font-medium">
                    Because data surrounds every moment and insight protects every dollar.
                </p>
            </motion.div>

            {/* Marquee Layer */}
            <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
                <svg
                    width="100%"
                    height="100%"
                    viewBox="-1000 0 3800 1000"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid slice"
                    className="w-full h-full opacity-80"
                >
                    <defs>
                        <path id="marquee-full-path" d={extendedPath} />

                        <clipPath id="left-side-clip">
                            <rect x="-3000" y="-1000" width={junctionPoint.x + 3000} height="3000" />
                        </clipPath>
                        <clipPath id="right-side-clip">
                            <rect x={junctionPoint.x} y="-1000" width="6000" height="3000" />
                        </clipPath>
                    </defs>

                    <g transform={`translate(${isMobile ? -80 : -250}, ${isMobile ? verticalOffset + 250 : verticalOffset}) scale(${isMobile ? 0.95 : 1.15})`}>
                        {/* Exit Flow Background Line */}
                        <path
                            d={"M1046.43 565.235 " + curve2Offset + " L 4000 455"}
                            stroke="#f9dc66"
                            strokeWidth={flowThickness}
                            fill="none"
                            className="opacity-100"
                        />

                        {/* LEFT: Problems Track */}
                        <text
                            clipPath="url(#left-side-clip)"
                            className="fill-white text-[18px]"
                            style={{ fontFamily: 'Georgia, serif', whiteSpace: 'pre' }}
                        >
                            <textPath href="#marquee-full-path" startOffset="0%">
                                {problemsText}
                                <animate
                                    attributeName="startOffset"
                                    from="-100%"
                                    to="0%"
                                    dur={marqueeDuration}
                                    repeatCount="indefinite"
                                />
                            </textPath>
                        </text>

                        {/* RIGHT: Solutions Track */}
                        <text
                            clipPath="url(#right-side-clip)"
                            className="fill-black font-medium text-[22px]"
                            style={{ fontFamily: 'Georgia, serif', whiteSpace: 'pre' }}
                        >
                            <textPath href="#marquee-full-path" startOffset="0%">
                                {solutionsText}
                                <animate
                                    attributeName="startOffset"
                                    from="-100%"
                                    to="0%"
                                    dur={marqueeDuration}
                                    repeatCount="indefinite"
                                />
                            </textPath>
                        </text>

                        {/* Middle Junction Capsule */}
                        <foreignObject
                            x={junctionPoint.x - 125}
                            y={junctionPoint.y - 120} // Shifted up to accommodate badge
                            width="250"
                            height="180" // Increased height for both badge and capsule
                        >
                            <div className="flex flex-col items-center justify-center w-full h-full gap-4">
                                {/* Analysis Badge - Static Container, Animated Text */}
                                <div className="h-10">
                                    <div className="bg-[#0D4744]/95 backdrop-blur-sm border border-[#16A34A]/40 rounded-md px-4 py-1.5 flex items-center justify-start gap-4 shadow-[0_0_20px_rgba(22,163,74,0.15)] min-w-[220px]">
                                        <div className="w-3.5 h-3.5 rounded-sm bg-[#16A34A] flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(22,163,74,0.4)]">
                                            <Check className="w-2.5 h-2.5 text-white" strokeWidth={5} />
                                        </div>
                                        <div className="relative overflow-hidden h-5 flex items-center flex-1">
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={statusIndex}
                                                    className="flex"
                                                >
                                                    {analysisStatuses[statusIndex].split('').map((char, i) => (
                                                        <motion.span
                                                            key={i}
                                                            initial={{ opacity: 0, scale: 0.5, y: 10 }}
                                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                                            exit={{ opacity: 0, scale: 0.5, y: -10 }}
                                                            transition={{
                                                                duration: 0.2,
                                                                delay: i * 0.03,
                                                                ease: "easeOut"
                                                            }}
                                                            className="text-[#4ADE80] text-[12px] font-black tracking-widest uppercase whitespace-pre"
                                                        >
                                                            {char}
                                                        </motion.span>
                                                    ))}
                                                </motion.div>
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </div>

                                {/* Waveform Pill - CSS-driven animations */}
                                <div className={`bg-[#0D2D3E] border-2 border-white/20 rounded-full px-6 py-4 flex items-center justify-center ${waveGap} h-[90px] w-[250px] shadow-2xl overflow-hidden scale-90`}>
                                    {waveformBars.map((bar, i) => (
                                        <div
                                            key={i}
                                            className="w-1.5 bg-white/80 rounded-full shrink-0"
                                            style={{
                                                height: 4,
                                                // @ts-ignore -- CSS custom property
                                                '--wave-h': `${bar.targetHeight}px`,
                                                animation: `waveBar ${bar.duration}s ease-in-out ${bar.delay}s infinite alternate`,
                                            } as React.CSSProperties}
                                        />
                                    ))}
                                </div>
                            </div>
                        </foreignObject>
                    </g>
                </svg>
            </div>
        </section>
    );
};

export default HeroSpeakSection;

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    BarChart3,
    ShieldCheck,
    User
} from 'lucide-react';
import { ANIMATION_THEME } from '@/lib/colors';

// Stable seeded values to avoid SSR/client hydration mismatch
const PARTICLE_DATA = [
    { r: 2.54, cx: 412, cy: 287, xOffset: 7, duration: 7.2, delay: 3.1 },
    { r: 1.83, cx: 178, cy: 203, xOffset: -4, duration: 5.8, delay: 0.7 },
    { r: 2.91, cx: 634, cy: 341, xOffset: 9, duration: 8.4, delay: 4.2 },
    { r: 1.42, cx: 521, cy: 156, xOffset: -8, duration: 6.1, delay: 1.5 },
    { r: 2.17, cx: 289, cy: 278, xOffset: 3, duration: 7.9, delay: 2.8 },
    { r: 1.68, cx: 703, cy: 198, xOffset: -6, duration: 5.3, delay: 0.3 },
    { r: 2.45, cx: 367, cy: 387, xOffset: 10, duration: 8.7, delay: 4.9 },
    { r: 1.94, cx: 145, cy: 312, xOffset: -3, duration: 6.6, delay: 1.1 },
    { r: 2.72, cx: 578, cy: 243, xOffset: 5, duration: 7.4, delay: 3.6 },
    { r: 1.31, cx: 456, cy: 167, xOffset: -9, duration: 5.9, delay: 0.9 },
    { r: 2.88, cx: 234, cy: 349, xOffset: 7, duration: 8.1, delay: 2.4 },
    { r: 1.57, cx: 689, cy: 271, xOffset: -5, duration: 6.8, delay: 4.6 },
];

export const AIGovernanceDemo = ({ isActive = true }: { isActive?: boolean }) => {
    return (
        <div className="relative w-full h-full min-h-[400px] flex items-center justify-center perspective-1000" style={{ backgroundColor: ANIMATION_THEME.background }}>
            {/* Background Chart Container */}
            <div className="absolute inset-4 bg-slate-50/50 border border-slate-100 rounded-[2rem] overflow-hidden backdrop-blur-3xl shadow-sm">
                <svg viewBox="0 0 800 500" className="w-full h-full">
                    <defs>
                        <linearGradient id="safetyGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={ANIMATION_THEME.primary} stopOpacity="0.2" />
                            <stop offset="100%" stopColor={ANIMATION_THEME.primary} stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* X & Y Axes Lines */}
                    <line x1="60" y1="440" x2="740" y2="440" stroke={ANIMATION_THEME.border} strokeWidth="1" />
                    <line x1="60" y1="60" x2="60" y2="440" stroke={ANIMATION_THEME.border} strokeWidth="1" />

                    {/* Axis Titles */}
                    <text
                        x="30" y="250"
                        textAnchor="middle"
                        transform="rotate(-90, 30, 250)"
                        className="fill-slate-400 text-[10px] font-black uppercase tracking-[0.2em]"
                    >
                        Compliance Score (%)
                    </text>
                    <text
                        x="400" y="490"
                        textAnchor="middle"
                        className="fill-slate-400 text-[10px] font-black uppercase tracking-[0.2em]"
                    >
                        Deployment Timeline
                    </text>

                    {/* Y-Axis Markers & Labels */}
                    {[0, 25, 50, 75, 100].map((val) => {
                        const y = 440 - (val * 3.8); // Scale to fit
                        return (
                            <g key={val}>
                                <line x1="55" y1={y} x2="60" y2={y} stroke={ANIMATION_THEME.border} strokeWidth="1" />
                                <text
                                    x="45" y={y + 4}
                                    textAnchor="end"
                                    className="fill-slate-500 text-[10px] font-bold tabular-nums"
                                >
                                    {val}
                                </text>
                                <line x1="60" y1={y} x2="740" y2={y} stroke={ANIMATION_THEME.border} strokeOpacity="0.2" strokeWidth="1" />
                            </g>
                        );
                    })}

                    {/* X-Axis Markers & Labels */}
                    {['Q1', 'Q2', 'Q3', 'Q4'].map((label, i) => {
                        const x = 60 + (i + 1) * 160;
                        return (
                            <g key={label}>
                                <line x1={x} y1="440" x2={x} y2="445" stroke={ANIMATION_THEME.border} strokeWidth="1" />
                                <text
                                    x={x} y="465"
                                    textAnchor="middle"
                                    className="fill-slate-500 text-[10px] font-bold tracking-widest"
                                >
                                    {label}
                                </text>
                            </g>
                        );
                    })}

                    {/* Data Particles (Floating Dots) */}
                    {PARTICLE_DATA.map((p, i) => (
                        <motion.circle
                            key={i}
                            r={p.r}
                            fill={ANIMATION_THEME.primary}
                            fillOpacity="0.3"
                            initial={{
                                cx: p.cx,
                                cy: p.cy
                            }}
                            animate={isActive ? {
                                y: [0, -40, 0],
                                x: [0, p.xOffset, 0],
                                opacity: [0.2, 0.5, 0.2]
                            } : { opacity: 0 }}
                            transition={{
                                duration: p.duration,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: p.delay
                            }}
                        />
                    ))}


                    {/* Safety Score Path (Orange) */}
                    <motion.path
                        d="M60,300 Q110,180 160,260 T260,340 T360,220 T460,300 T560,180 T660,280 T740,200"
                        fill="none"
                        stroke={ANIMATION_THEME.primary}
                        strokeWidth="3"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: isActive ? 1 : 0 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                    />

                    {/* Bias Guard Path (Dashed White) */}
                    <motion.path
                        d="M60,380 Q160,420 260,380 T460,420 T660,380 T740,420"
                        fill="none"
                        stroke={ANIMATION_THEME.text.muted}
                        strokeWidth="1.5"
                        strokeDasharray="6,6"
                        strokeOpacity="0.4"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: isActive ? 1 : 0 }}
                        transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
                    />

                    {/* Anchored Monitoring Points (Avatars with Pointers) */}
                    <motion.g
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, type: "spring" }}
                    >
                        {/* Pointer Stem/Triangle */}
                        <path
                            d="M360,220 L354,208 L366,208 Z"
                            fill={ANIMATION_THEME.primary}
                        />
                        {/* Avatar Circle */}
                        <circle cx="360" cy="196" r="14" fill="white" className="shadow-sm border border-slate-100" />
                        <motion.circle
                            cx="360" cy="196" r="17"
                            stroke={ANIMATION_THEME.primary} strokeWidth="1" fill="none"
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />
                        <foreignObject x="349" y="185" width="22" height="22">
                            <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                                <User size={12} className="text-gray-500" />
                            </div>
                        </foreignObject>
                    </motion.g>

                    <motion.g
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2, type: "spring" }}
                    >
                        {/* Pointer Stem/Triangle */}
                        <path
                            d="M560,180 L554,168 L566,168 Z"
                            fill={ANIMATION_THEME.primary}
                        />
                        {/* Avatar Circle */}
                        <circle cx="560" cy="156" r="14" fill="white" className="shadow-sm border border-slate-100" />
                        <motion.circle
                            cx="560" cy="156" r="17"
                            stroke={ANIMATION_THEME.primary} strokeWidth="1" fill="none"
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                        />
                        <foreignObject x="549" y="145" width="22" height="22">
                            <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                <User size={12} className="text-gray-600" />
                            </div>
                        </foreignObject>
                    </motion.g>
                </svg>

                {/* Scanning Light Effect - Subtler */}
                <motion.div
                    className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-slate-200/50 to-transparent"
                    animate={{ left: ['5%', '95%'] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
            </div>

            {/* Premium Glassmorphism Metric Cards */}
            <motion.div
                className="absolute top-20 left-8 bg-white/90 shadow-[0_20px_50px_rgba(0,0,0,0.1)] backdrop-blur-2xl p-5 rounded-[1.5rem] max-w-[180px] border border-slate-100 z-10"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
                transition={{
                    opacity: { delay: 1 },
                    x: { delay: 1 },
                    y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                }}
            >
                <div className="flex items-center gap-3 mb-2.5">
                    <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
                        <BarChart3 className="w-4 h-4" style={{ color: ANIMATION_THEME.primary }} />
                    </div>
                    <div>
                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Accuracy & Policy</p>
                        <h4 className="text-xs font-bold text-gray-900 leading-tight">Safety Index</h4>
                    </div>
                </div>
                <div className="flex items-baseline gap-1.5">
                    <span className="text-xs font-black tracking-tighter" style={{ color: ANIMATION_THEME.accent.success }}>98.2%</span>
                    <span className="text-[9px] text-gray-400 font-semibold tracking-tight uppercase">NOMINAL</span>
                </div>
            </motion.div>

            <motion.div
                className="absolute bottom-20 right-8 bg-white/90 shadow-[0_20px_50px_rgba(0,0,0,0.1)] backdrop-blur-2xl p-5 rounded-[1.5rem] max-w-[220px] border border-slate-100 z-10"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0, y: [0, 8, 0] }}
                transition={{
                    opacity: { delay: 1.5 },
                    x: { delay: 1.5 },
                    y: { duration: 7, repeat: Infinity, ease: "easeInOut" }
                }}
            >
                <div className="flex items-center gap-4 mb-3">
                    <div className="flex-1">
                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Roles & Oversight</p>
                        <h4 className="text-xs font-bold text-gray-900 leading-tight">Human Accountability</h4>
                    </div>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center border" style={{ backgroundColor: `${ANIMATION_THEME.primary}0D`, borderColor: `${ANIMATION_THEME.primary}1A` }}>
                        <ShieldCheck className="w-5 h-5" style={{ color: ANIMATION_THEME.primary }} />
                    </div>
                </div>
                <div className="flex items-baseline gap-1.5">
                    <span className="text-xs font-black tracking-tighter" style={{ color: ANIMATION_THEME.accent.success }}>↑ 12.5%</span>
                    <span className="text-[9px] text-gray-400 font-semibold tracking-tight uppercase">vs last month</span>
                </div>
            </motion.div>
        </div>
    );
};

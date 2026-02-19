"use client";

import React from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

const data = [
    { subject: 'Brute', A: 120, B: 110, fullMark: 150 },
    { subject: 'ROI', A: 98, B: 130, fullMark: 150 },
    { subject: 'EBITDA', A: 86, B: 130, fullMark: 150 },
    { subject: 'Net', A: 99, B: 100, fullMark: 150 },
    { subject: 'Efficiency', A: 85, B: 90, fullMark: 150 },
];

export const ProfitabilityChart = () => {
    return (
        <div className="w-full h-full relative group">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <defs>
                        <linearGradient id="colorRadar" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f97316" stopOpacity={0.6} />
                            <stop offset="95%" stopColor="#fbbf24" stopOpacity={0.1} />
                        </linearGradient>
                    </defs>
                    <PolarGrid stroke="#e5e7eb" strokeWidth={0.5} />
                    <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: '#9ca3af', fontSize: 8, fontWeight: 700 }}
                    />
                    <PolarRadiusAxis
                        angle={30}
                        domain={[0, 150]}
                        tick={false}
                        axisLine={false}
                    />
                    <Radar
                        name="Analysis"
                        dataKey="A"
                        stroke="#f97316"
                        strokeWidth={2}
                        fill="url(#colorRadar)"
                        fillOpacity={0.6}
                        dot={{ r: 2, fill: "#f97316" }}
                        isAnimationActive={false}
                    />
                </RadarChart>
            </ResponsiveContainer>

            {/* Central HUD Glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-12 h-12 bg-[#f97316]/5 rounded-full blur-xl" />
            </div>
        </div>
    );
};

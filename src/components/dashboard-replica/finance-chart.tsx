"use client";

import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const data = [
    { name: "1er mai", blue: 4000, brown: 2100 },
    { name: "", blue: 3200, brown: 2800 },
    { name: "", blue: 2200, brown: 3500 },
    { name: "5 mai", blue: 2500, brown: 3200 },
    { name: "", blue: 2000, brown: 3800 },
    { name: "10 mai", blue: 3500, brown: 4000 }, // Intersect near utilisateur
    { name: "", blue: 5500, brown: 1800 },
    { name: "15 mai", blue: 6200, brown: 1200 },
    { name: "", blue: 6000, brown: 1500 },
    { name: "20 mai", blue: 6800, brown: 2500 },
    { name: "", blue: 5000, brown: 1800 },
    { name: "25 mai", blue: 4200, brown: 1200 },
    { name: "", blue: 6000, brown: 2200 },
    { name: "30 mai", blue: 4000, brown: 2300 },
];

export const FinanceChart = () => {
    return (
        <div className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--brand-primary)" stopOpacity={0.1} />
                            <stop offset="95%" stopColor="var(--brand-primary)" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} stroke="#f3f4f6" />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 500 }}
                        interval={0}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 500 }}
                        tickFormatter={(val) => val === 0 ? "0" : `$${val / 1000}k`}
                        domain={[0, 8000]}
                    />
                    <Area
                        type="monotone"
                        dataKey="brown"
                        stroke="#4a1a1a"
                        strokeWidth={1.8}
                        fill="transparent"
                        dot={false}
                        isAnimationActive={false}
                    />
                    <Area
                        type="monotone"
                        dataKey="blue"
                        stroke="var(--brand-primary)"
                        strokeWidth={2.5}
                        fillOpacity={1}
                        fill="url(#colorBlue)"
                        dot={false}
                        isAnimationActive={false}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

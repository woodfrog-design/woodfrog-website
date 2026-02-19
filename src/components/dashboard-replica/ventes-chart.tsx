"use client";

import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from "recharts";

const data = [
    { name: "Août", val: 6.8, proj: null },
    { name: "", val: 8.0, proj: null },
    { name: "Sept", val: 10.0, proj: null },
    { name: "", val: 12.5, proj: null },
    { name: "", val: 14.0, proj: null },
    { name: "Oct", val: 13.2, proj: null },
    { name: "", val: 10.0, proj: null },
    { name: "", val: 7.8, proj: null },
    { name: "Nov", val: 7.0, proj: 7.0 }, // Connection point
    { name: "", val: null, proj: 6.0 },
    { name: "", val: null, proj: 5.5 },
    { name: "Déc", val: null, proj: 6.0 },
    { name: "", val: null, proj: 8.0 },
];

export const VentesChart = () => {
    return (
        <div className="w-full h-full relative">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorVentes" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b7e32" stopOpacity={0.15} />
                            <stop offset="95%" stopColor="#8b7e32" stopOpacity={0.02} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} stroke="#f3f4f6" strokeWidth={1} />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 500 }}
                        interval={0}
                        padding={{ left: 10, right: 10 }}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 500 }}
                        tickFormatter={(val) => val === 0 ? "0" : `${val}M`}
                        domain={[0, 15]}
                    />
                    <ReferenceLine x="Nov" stroke="#d1d5db" strokeWidth={1} />

                    {/* Main Area */}
                    <Area
                        type="monotone"
                        dataKey="val"
                        stroke="#8b7e32"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorVentes)"
                        dot={{ r: 3, fill: "white", stroke: "#8b7e32", strokeWidth: 1.5 }}
                        activeDot={false}
                        connectNulls={false}
                        isAnimationActive={false}
                    />

                    {/* Projection Line */}
                    <Area
                        type="monotone"
                        dataKey="proj"
                        stroke="#8b7e32"
                        strokeWidth={2}
                        strokeDasharray="4 4"
                        fill="transparent"
                        dot={{ r: 3, fill: "white", stroke: "#8b7e32", strokeWidth: 1.5, strokeDasharray: "0" }}
                        activeDot={false}
                        connectNulls={true}
                        isAnimationActive={false}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    AreaChart,
    Area,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceDot
} from 'recharts';

// Generate realistic volatile data (Random Walk) for multiple series
const generateData = () => {
    const data = [];
    let current = 50;
    let previous = 40;
    let benchmark = 30;

    for (let i = 0; i < 60; i++) {
        // Random walk logic with slight trends
        current = Math.max(10, Math.min(130, current + (Math.random() - 0.4) * 8)); // Strong growth
        previous = Math.max(10, Math.min(100, previous + (Math.random() - 0.48) * 5)); // Slower growth
        benchmark = Math.max(10, Math.min(80, benchmark + (Math.random() - 0.45) * 3)); // Steady

        data.push({
            name: i,
            current: Number(current.toFixed(1)),
            previous: Number(previous.toFixed(1)),
            benchmark: Number(benchmark.toFixed(1))
        });
    }
    return data;
};

const data = generateData();
// Find peak for reference (Current Series)
const peakValue = Math.max(...data.map(d => d.current));
const peakIndex = data.findIndex(d => d.current === peakValue);

export const WoodfrogDashboard: React.FC = () => {
    return (
        <div className="w-full h-full bg-white flex flex-col">

            {/* Standard Header */}
            <header className="h-20 border-b border-gray-200 flex items-center px-8 justify-between bg-white relative z-10">
                <div className="flex items-center gap-3">
                    {/* Chat Logo (Diagonal Arrow) */}
                    <div className="w-8 h-8 rounded-xl bg-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
                            <path d="M4 20L12 4L20 20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold text-gray-800 tracking-tight">woodfrog</span>
                </div>
                {/* Removed top-right Avatar as requested ("second image on right top side remove it") */}
            </header>

            {/* Main Content Area */}
            <main className="flex-1 p-6 flex flex-col justify-center relative z-10 w-full">
                {/* Title & Legend */}
                <div className="flex justify-between items-end mb-4 px-2">
                    <div>
                        <h3 className="text-gray-900 text-lg font-bold">Cycle Comparison</h3>
                        <p className="text-gray-500 text-xs mt-1">Cycle Length in Months</p>
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-0.5 bg-blue-600" />
                            <span className="text-[10px] text-gray-600 font-medium">Current Cycle</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-0.5 bg-red-800/60 border-t border-dashed border-red-800" />
                            <span className="text-[10px] text-gray-500 font-medium">1982 Cycle</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-0.5 bg-green-700/40 border-t border-dotted border-green-700" />
                            <span className="text-[10px] text-gray-400 font-medium">Benchmark</span>
                        </div>
                    </div>
                </div>

                {/* Professional Line Chart */}
                <div className="relative w-full h-[320px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={data}
                            margin={{
                                top: 20,
                                right: 20,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={true} stroke="#e5e7eb" />
                            <XAxis
                                dataKey="name"
                                tick={{ fill: '#6b7280', fontSize: 10 }}
                                axisLine={{ stroke: '#e5e7eb' }}
                                tickLine={{ stroke: '#e5e7eb' }}
                                tickFormatter={(i) => i % 10 === 0 ? i : ''} // Show every 10th label
                                dy={10}
                            />
                            <YAxis
                                hide={false}
                                tick={{ fill: '#6b7280', fontSize: 10 }}
                                axisLine={{ stroke: '#e5e7eb' }}
                                tickLine={{ stroke: '#e5e7eb' }}
                                tickFormatter={(value) => `${value}%`}
                                domain={[0, 150]}
                                dx={-10}
                                tickCount={8}
                            />
                            <Tooltip
                                contentStyle={{ borderRadius: '4px', border: '1px solid #e5e7eb', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}
                                labelStyle={{ color: '#374151', fontWeight: 'bold', fontSize: '11px', marginBottom: '4px' }}
                                itemStyle={{ fontSize: '11px', padding: 0 }}
                                formatter={(value: number, name: string) => [`${value}%`, name === 'current' ? 'Current' : name === 'previous' ? '1982 Cycle' : 'Benchmark']}
                            />

                            {/* Benchmark Line (Green Dotted) */}
                            <Line
                                type="linear"
                                dataKey="benchmark"
                                stroke="#15803d"
                                strokeWidth={1}
                                strokeDasharray="2 2"
                                dot={false}
                                isAnimationActive={false}
                                opacity={0.6}
                            />

                            {/* Previous Cycle Line (Red Dashed) */}
                            <Line
                                type="linear"
                                dataKey="previous"
                                stroke="#991b1b"
                                strokeWidth={1.5}
                                strokeDasharray="4 4"
                                dot={false}
                                isAnimationActive={false}
                                opacity={0.8}
                            />

                            {/* Current Cycle Line (Blue Solid - Main) */}
                            <Line
                                type="linear"
                                dataKey="current"
                                stroke="#2563eb"
                                strokeWidth={2}
                                dot={false}
                                activeDot={{ r: 4, fill: '#2563eb' }}
                                isAnimationActive={false}
                            />

                            {/* Peak Reference Dot */}
                            <ReferenceDot
                                x={peakIndex}
                                y={peakValue}
                                r={3}
                                fill="#2563eb"
                                stroke="none"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </main>
        </div>
    );
};

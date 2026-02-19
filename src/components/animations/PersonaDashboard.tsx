'use client';

import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell
} from 'recharts';
import {
    LayoutDashboard, TrendingUp, ArrowLeft,
    Target, Sparkles, ShieldCheck, ChevronRight, Network, Brain
} from 'lucide-react';

const modelPerformance = [
    { name: 'GPT-4o Fine-tuned', value: 94.2, color: '#2563eb' },
    { name: 'Predict-v4.1', value: 88.7, color: '#3b82f6' },
    { name: 'Vision-X Pro', value: 76.3, color: '#60a5fa' },
    { name: 'Agent-Core v2', value: 91.5, color: '#93c5fd' }
];

const deploymentMetrics = [
    { label: 'Avg Response', value: '142ms', trend: '-18ms' },
    { label: 'Daily Active', value: '284K', trend: '+12.4%' },
    { label: 'Cache Hit', value: '94.7%', trend: '+2.1%' },
    { label: 'Token Eff.', value: '87.3%', trend: '+5.6%' },
];

export const PersonaDashboard: React.FC = () => {
    return (
        <div className="flex w-full h-full bg-white text-slate-800 overflow-hidden" style={{ fontFamily: 'var(--font-geist-sans)' }}>
            {/* Mini Sidebar */}
            <aside className="w-12 border-r border-gray-100 flex flex-col items-center py-4 gap-5 bg-white shrink-0">
                <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center">
                    <span className="text-[8px] font-bold text-white">W</span>
                </div>

                <div className="flex flex-col gap-2 mt-2">
                    <div className="p-1.5 text-slate-300 cursor-pointer rounded-md hover:bg-slate-50">
                        <LayoutDashboard size={14} />
                    </div>
                    <div className="p-1.5 text-blue-600 bg-blue-50 rounded-md cursor-pointer">
                        <Brain size={14} />
                    </div>
                    <div className="p-1.5 text-slate-300 cursor-pointer rounded-md hover:bg-slate-50">
                        <TrendingUp size={14} />
                    </div>
                    <div className="p-1.5 text-slate-300 cursor-pointer rounded-md hover:bg-slate-50">
                        <Network size={14} />
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 flex flex-col gap-3 bg-[#fafbfc] overflow-hidden">
                <div className="flex items-center gap-3 shrink-0">
                    <div className="p-1.5 rounded-lg bg-white text-slate-400 cursor-pointer border border-slate-100">
                        <ArrowLeft size={13} />
                    </div>
                    <div>
                        <h2 className="text-[14px] font-semibold text-slate-900 tracking-tight">Intelligence Models</h2>
                        <p className="text-gray-400 text-[9px] mt-0.5">Model deployment analytics and precision benchmarks</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 flex-1 min-h-0">
                    <div className="flex flex-col gap-2.5">
                        {/* Stat Cards - compact */}
                        {[
                            { title: 'Total Inferences', value: '1.82B', label: '+24% auto-scaled this month', icon: <Sparkles size={16} /> },
                            { title: 'Training ROI', value: '4.5x', label: '-18% compute costs vs baseline', icon: <Target size={16} /> },
                            { title: 'Compliance', value: 'SOC-2', label: 'Full E2E encryption verified', icon: <ShieldCheck size={16} /> },
                        ].map((card, i) => (
                            <div key={i} className="bg-white border border-gray-100 rounded-xl p-3 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500 shrink-0">
                                    {card.icon}
                                </div>
                                <div>
                                    <p className="text-gray-400 text-[8px] font-medium uppercase tracking-wider leading-none mb-0.5">{card.title}</p>
                                    <h4 className="text-[16px] font-bold text-slate-900 tracking-tight">{card.value}</h4>
                                    <p className="text-emerald-500 text-[8px] font-medium mt-0.5">{card.label}</p>
                                </div>
                            </div>
                        ))}

                        {/* Deployment Metrics */}
                        <div className="bg-white border border-gray-100 rounded-xl p-3 flex-1">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-[8px] font-medium text-slate-400 uppercase tracking-wider">Deployment Health</span>
                                <button className="text-[8px] font-medium text-blue-500 flex items-center gap-0.5">
                                    Details <ChevronRight size={9} />
                                </button>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                {deploymentMetrics.map((m, i) => (
                                    <div key={i} className="bg-slate-50 rounded-lg p-2 border border-slate-100">
                                        <p className="text-[7px] text-slate-400 font-medium uppercase tracking-wider">{m.label}</p>
                                        <p className="text-[13px] font-bold text-slate-900 mt-0.5">{m.value}</p>
                                        <p className="text-[7px] text-emerald-500 font-medium mt-0.5">{m.trend}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col">
                        <div className="flex justify-between items-center mb-3 shrink-0">
                            <div>
                                <h3 className="text-[11px] font-semibold text-slate-900">Model Precision Score</h3>
                                <p className="text-[9px] text-slate-400 mt-0.5">Accuracy benchmarks across production models</p>
                            </div>
                            <button className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-[9px] font-medium">
                                Optimize
                            </button>
                        </div>

                        <div className="flex-1 min-h-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={modelPerformance} layout="vertical" margin={{ left: 10 }}>
                                    <XAxis type="number" hide domain={[0, 100]} />
                                    <YAxis
                                        dataKey="name"
                                        type="category"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#64748b', fontSize: 9, fontWeight: 500 }}
                                        width={95}
                                    />
                                    <Bar dataKey="value" radius={[0, 5, 5, 0]} barSize={18}>
                                        {modelPerformance.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="grid grid-cols-4 gap-3 pt-2.5 border-t border-gray-100 mt-2 shrink-0">
                            {modelPerformance.map((p, i) => (
                                <div key={i} className="flex flex-col items-center">
                                    <span className="text-[7px] font-medium text-slate-400 mb-0.5">{p.name.split(' ')[0]}</span>
                                    <span className="text-[13px] font-bold text-slate-900">{p.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

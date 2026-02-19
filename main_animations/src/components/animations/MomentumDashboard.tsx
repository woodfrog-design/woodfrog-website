'use client';

import React from 'react';
import {
    AreaChart, Area, XAxis, ResponsiveContainer
} from 'recharts';
import {
    LayoutDashboard, TrendingUp, ArrowLeft,
    Activity, Shield, Rocket, Network, ArrowUpRight
} from 'lucide-react';
import { ANIMATION_THEME } from '@/lib/colors';

const momentumData = [
    { name: 'W1', value: 28 }, { name: 'W2', value: 42 }, { name: 'W3', value: 38 },
    { name: 'W4', value: 56 }, { name: 'W5', value: 51 }, { name: 'W6', value: 72 },
    { name: 'W7', value: 68 }, { name: 'W8', value: 84 }, { name: 'W9', value: 79 },
    { name: 'W10', value: 95 }
];

const milestones = [
    { quarter: 'Q1 2026', label: 'Edge Compute v2 Launch', status: 'completed' },
    { quarter: 'Q1 2026', label: 'SOC-2 Type II Certified', status: 'completed' },
    { quarter: 'Q2 2026', label: 'Multi-region Auto-failover', status: 'in_progress' },
    { quarter: 'Q3 2026', label: 'Agent Orchestration GA', status: 'planned' },
];

export const MomentumDashboard: React.FC = () => {
    return (
        <div className="flex w-full h-full bg-white text-slate-800 overflow-hidden" style={{ fontFamily: 'var(--font-geist-sans)' }}>
            {/* Mini Sidebar */}
            <aside className="w-12 border-r border-gray-100 flex flex-col items-center py-4 gap-5 bg-white shrink-0">
                <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ backgroundColor: ANIMATION_THEME.primary }}>
                    <span className="text-[8px] font-bold" style={{ color: ANIMATION_THEME.text.primary }}>W</span>
                </div>
                <div className="flex flex-col gap-2 mt-2">
                    <div className="p-1.5 text-slate-300 cursor-pointer rounded-md hover:bg-slate-50">
                        <LayoutDashboard size={14} />
                    </div>
                    <div className="p-1.5 text-slate-300 cursor-pointer rounded-md hover:bg-slate-50">
                        <Network size={14} />
                    </div>
                    <div className="p-1.5 rounded-md cursor-pointer" style={{ backgroundColor: `${ANIMATION_THEME.primary}1A`, color: ANIMATION_THEME.primary }}>
                        <TrendingUp size={14} />
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 flex flex-col gap-3 bg-[#fafbfc] overflow-hidden">
                <div className="flex justify-between items-center shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-lg bg-white text-slate-400 cursor-pointer border border-slate-100">
                            <ArrowLeft size={13} />
                        </div>
                        <div>
                            <h2 className="text-[14px] font-semibold text-slate-900 tracking-tight">Innovation Momentum</h2>
                            <p className="text-gray-400 text-[9px] mt-0.5">Platform velocity and business impact tracking</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[9px] font-medium text-slate-600">Active</span>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-2.5 shrink-0">
                    {[
                        { icon: <Rocket size={16} />, title: 'Rapid Deployment', desc: 'Prototype to production in weeks with automated CI/CD and blue-green deploys.', bg: `bg-yellow-50`, text: `text-yellow-600` },
                        { icon: <Activity size={16} />, title: 'Dynamic Scaling', desc: 'Auto-adjusting compute responding to demand spikes within 200ms.', bg: 'bg-emerald-50', text: 'text-emerald-500' },
                        { icon: <Shield size={16} />, title: 'Trusted Compliance', desc: 'Enterprise SOC-2 and HIPAA compliance in every deployment artifact.', bg: 'bg-slate-50', text: 'text-slate-500' },
                    ].map((card, i) => (
                        <div key={i} className="bg-white border border-gray-100 rounded-xl p-3 flex flex-col gap-2">
                            <div className={`p-1.5 w-7 h-7 rounded-lg ${card.bg} ${card.text} flex items-center justify-center`}>
                                {card.icon}
                            </div>
                            <h4 className="text-[11px] font-semibold text-slate-900">{card.title}</h4>
                            <p className="text-gray-400 text-[8px] leading-relaxed">{card.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-12 gap-3 flex-1 min-h-0">
                    {/* Growth Chart */}
                    <div className="col-span-8 bg-white border border-gray-100 rounded-xl p-4 relative overflow-hidden flex flex-col">
                        <div className="flex justify-between items-start mb-1 shrink-0">
                            <div>
                                <span className="text-gray-400 text-[8px] font-medium uppercase tracking-wider">Growth Velocity</span>
                                <div className="flex items-end gap-2 mt-0.5">
                                    <h3 className="text-[28px] font-bold text-slate-900 tracking-tight leading-none">54.2%</h3>
                                    <div className="flex items-center gap-0.5 text-emerald-500 mb-1">
                                        <ArrowUpRight size={11} strokeWidth={2.5} />
                                        <span className="text-[10px] font-medium">+12.8% QoQ</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex bg-slate-50 border border-slate-100 rounded-md p-0.5 gap-0.5">
                                <button className="px-2 py-1 text-[8px] font-medium text-slate-400">Monthly</button>
                                <button className="px-2 py-1 text-[8px] font-medium bg-white shadow-sm text-slate-800 rounded border border-slate-100">Weekly</button>
                            </div>
                        </div>

                        <div className="flex-1 min-h-0 mt-2">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={momentumData}>
                                    <defs>
                                        <linearGradient id="colorMomentumBlue2" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={ANIMATION_THEME.primary} stopOpacity={0.1} />
                                            <stop offset="95%" stopColor={ANIMATION_THEME.primary} stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#94a3b8', fontSize: 8, fontWeight: 500 }}
                                        dy={6}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke={ANIMATION_THEME.primary}
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorMomentumBlue2)"
                                        animationDuration={2000}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Roadmap / Milestones */}
                    <div className="col-span-4 bg-white border border-gray-100 rounded-xl p-4 flex flex-col">
                        <h3 className="text-[11px] font-semibold text-slate-900 mb-3 shrink-0">Roadmap</h3>
                        <div className="space-y-3 flex-1 overflow-hidden">
                            {milestones.map((m, i) => (
                                <div key={i} className="flex gap-2.5">
                                    <div className="flex flex-col items-center">
                                        <div className={`w-2 h-2 rounded-full mt-0.5 ${m.status === 'completed' ? 'bg-emerald-500' :
                                                m.status === 'in_progress' ? 'bg-yellow-500' :
                                                    'bg-slate-200'
                                            }`} />
                                        {i < milestones.length - 1 && <div className="w-px h-full bg-slate-100 mt-1" />}
                                    </div>
                                    <div className="pb-2">
                                        <p className="text-[7px] text-slate-400 font-medium uppercase tracking-wider">{m.quarter}</p>
                                        <p className="text-[10px] font-medium text-slate-800 mt-0.5">{m.label}</p>
                                        <span className={`text-[7px] font-medium mt-0.5 inline-block px-1.5 py-0.5 rounded-full ${m.status === 'completed' ? 'bg-emerald-50 text-emerald-600' :
                                                m.status === 'in_progress' ? 'bg-yellow-50 text-yellow-600' :
                                                    'bg-slate-50 text-slate-400'
                                            }`}>
                                            {m.status === 'completed' ? 'Shipped' : m.status === 'in_progress' ? 'In Progress' : 'Planned'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

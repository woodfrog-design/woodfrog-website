'use client';

import React from 'react';
import {
    AreaChart, Area, XAxis, CartesianGrid, ResponsiveContainer
} from 'recharts';
import {
    ArrowLeft, TrendingUp, Clock,
    ArrowUpRight, Cpu, Zap, Activity, Globe, Database, ChevronRight
} from 'lucide-react';

const realTimeTraffic = [
    { time: '06:00', load: 32, req: 220 },
    { time: '08:00', load: 48, req: 340 },
    { time: '10:00', load: 67, req: 520 },
    { time: '12:00', load: 82, req: 710 },
    { time: '14:00', load: 74, req: 620 },
    { time: '16:00', load: 89, req: 830 },
    { time: '18:00', load: 93, req: 920 },
    { time: '20:00', load: 71, req: 580 },
    { time: '22:00', load: 43, req: 290 },
    { time: '00:00', load: 28, req: 180 },
];

const nodeStatus = [
    { id: 'EAGLE-X1', service: 'LLM Inference', load: '84%', status: 'Stable', lat: '12ms', uptime: '99.99%' },
    { id: 'EAGLE-X2', service: 'Vector Store', load: '62%', status: 'Stable', lat: '8ms', uptime: '99.97%' },
    { id: 'EAGLE-X3', service: 'Data Sync', load: '91%', status: 'Scaling', lat: '24ms', uptime: '99.94%' },
    { id: 'EAGLE-X4', service: 'Batch Jobs', load: '22%', status: 'Idle', lat: '5ms', uptime: '100%' },
];

export const TransactionDetailDashboard: React.FC = () => {
    return (
        <div className="flex flex-col w-full h-full bg-white text-slate-800 overflow-hidden" style={{ fontFamily: 'var(--font-geist-sans)' }}>
            {/* Header */}
            <header className="bg-white border-b border-gray-100 px-5 py-3 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-slate-50 text-slate-400 cursor-pointer border border-slate-100">
                        <ArrowLeft size={13} />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-[14px] font-semibold text-slate-900 tracking-tight">Eagle Engine</h2>
                            <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 text-[8px] font-medium">Performance Detail</span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <Cpu size={9} className="text-slate-400" />
                            <p className="text-slate-400 text-[9px]">US-EAST-INTEL &middot; 24 Active Nodes &middot; Updated 2m ago</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex bg-slate-50 rounded-md p-0.5 gap-0.5 border border-slate-100">
                        <div className="px-2.5 py-1 rounded bg-white shadow-sm text-[9px] font-medium text-slate-800 flex items-center gap-1.5 border border-slate-100">
                            <Activity size={10} className="text-blue-500" />
                            Live Telemetry
                        </div>
                        <div className="px-2.5 py-1 rounded text-[9px] font-medium text-slate-400">
                            Historical
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-4 flex flex-col gap-3 bg-[#fafbfc] overflow-hidden">
                {/* KPI Ribbon */}
                <div className="grid grid-cols-4 gap-3 shrink-0">
                    {[
                        { title: 'Inference Load', value: '84%', sub: 'Within safety margin', icon: <Cpu size={14} />, trend: '+3.2%' },
                        { title: 'Data Ingress', value: '1.2 TB/s', sub: 'Real-time sync active', icon: <Database size={14} />, trend: '+8.1%' },
                        { title: 'P99 Latency', value: '12ms', sub: 'Below 15ms threshold', icon: <Clock size={14} />, trend: '-2.4ms' },
                        { title: 'Availability', value: '99.99%', sub: 'Zero incidents (30d)', icon: <Globe size={14} />, trend: 'On target' },
                    ].map((card, i) => (
                        <div key={i} className="bg-white border border-gray-100 rounded-xl p-3 relative">
                            <div className="flex items-center justify-between mb-1.5">
                                <div className="p-1.5 rounded-lg bg-slate-50 text-slate-500">
                                    {card.icon}
                                </div>
                                <span className="text-emerald-500 text-[8px] font-medium flex items-center gap-0.5">
                                    <ArrowUpRight size={8} strokeWidth={2.5} />
                                    {card.trend}
                                </span>
                            </div>
                            <h4 className="text-[8px] font-medium uppercase tracking-wider text-slate-400 mb-0.5">{card.title}</h4>
                            <span className="text-[18px] font-bold text-slate-900 tracking-tight">{card.value}</span>
                            <p className="text-[8px] text-slate-400 mt-0.5">{card.sub}</p>
                        </div>
                    ))}
                </div>

                {/* Chart + Nodes */}
                <div className="grid grid-cols-12 gap-3 flex-1 min-h-0">
                    <div className="col-span-8 bg-white border border-gray-100 rounded-xl p-4 flex flex-col">
                        <div className="flex justify-between items-center mb-2 shrink-0">
                            <div>
                                <h3 className="text-[12px] font-semibold text-slate-900 tracking-tight">Engine Load Telemetry</h3>
                                <p className="text-[9px] text-slate-400 mt-0.5">Request volume and compute load over 24h</p>
                            </div>
                            <div className="flex gap-3">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                                    <span className="text-[8px] font-medium text-slate-500">Compute Load</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-slate-200" />
                                    <span className="text-[8px] font-medium text-slate-500">Request Vol.</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 min-h-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={realTimeTraffic}>
                                    <defs>
                                        <linearGradient id="colorFlowBlue2" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.12} />
                                            <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis
                                        dataKey="time"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#94a3b8', fontSize: 8, fontWeight: 500 }}
                                        dy={6}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="load"
                                        stroke="#2563eb"
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorFlowBlue2)"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="req"
                                        stroke="#cbd5e1"
                                        strokeWidth={1.5}
                                        strokeDasharray="4 4"
                                        fill="none"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="grid grid-cols-4 gap-4 pt-2.5 border-t border-gray-100 mt-2 shrink-0">
                            {[
                                { l: 'Peak QPS', v: '18,420' },
                                { l: 'Error Rate', v: '0.001%' },
                                { l: 'Active Nodes', v: '24/24' },
                                { l: 'IO Latency', v: '0.42ms' },
                            ].map((s, i) => (
                                <div key={i}>
                                    <p className="text-[8px] font-medium text-slate-400 uppercase tracking-wider">{s.l}</p>
                                    <p className="text-[14px] font-bold text-slate-900 tracking-tight mt-0.5">{s.v}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-span-4 flex flex-col gap-3">
                        <div className="bg-white border border-gray-100 rounded-xl p-3.5 flex-1 flex flex-col">
                            <div className="flex justify-between items-center mb-2 shrink-0">
                                <h3 className="text-[11px] font-semibold text-slate-900">Node Registry</h3>
                                <button className="text-[8px] font-medium text-blue-500 flex items-center gap-0.5">
                                    View all <ChevronRight size={10} />
                                </button>
                            </div>

                            <div className="space-y-2 flex-1 overflow-hidden">
                                {nodeStatus.map((node, i) => (
                                    <div key={i} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 cursor-pointer group">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-[9px] font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">{node.id}</span>
                                            <span className={`text-[7px] font-medium px-1.5 py-0.5 rounded-full ${
                                                node.status === 'Stable' ? 'bg-emerald-50 text-emerald-600' :
                                                node.status === 'Idle' ? 'bg-slate-100 text-slate-500' :
                                                'bg-amber-50 text-amber-600'
                                            }`}>
                                                {node.status}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[9px] text-slate-400">{node.service}</span>
                                            <span className="text-[10px] font-semibold text-slate-700">{node.load}</span>
                                        </div>
                                        <div className="flex justify-between items-center mt-1">
                                            <span className="text-[7px] text-slate-400">Lat: {node.lat}</span>
                                            <span className="text-[7px] text-slate-400">Up: {node.uptime}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-slate-900 rounded-xl p-3.5 text-white relative overflow-hidden shrink-0">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500 blur-[60px] opacity-20 -mr-8 -mt-8" />
                            <div className="relative z-10">
                                <span className="text-[8px] font-medium text-blue-400 uppercase tracking-wider">Operational Readiness</span>
                                <h4 className="text-[16px] font-bold mt-1 tracking-tight">High Performance</h4>
                                <p className="text-[8px] text-slate-400 mt-1 leading-relaxed">Eagle engine optimized data paths for US-EAST, +14.2% throughput ROI this quarter.</p>
                                <div className="mt-2.5 flex items-center gap-3">
                                    <div className="h-9 w-9 rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/10">
                                        <TrendingUp size={16} className="text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-[8px] font-medium text-slate-500">Model Accuracy</p>
                                        <p className="text-[16px] font-bold tracking-tight">99.8%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

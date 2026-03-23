'use client';

import React from 'react';
import {
    BarChart, Bar, XAxis, ResponsiveContainer,
    AreaChart, Area, Cell, PieChart, Pie, LineChart, Line
} from 'recharts';
import {
    LayoutDashboard, TrendingUp,
    Zap, Database, Cpu, Brain, Activity,
    ArrowUpRight, ArrowDownRight, Server, Layers, Search, Bell,
    Shield, Users, Clock
} from 'lucide-react';

const throughputData = [
    { name: 'Jan', value: 2.4 }, { name: 'Feb', value: 3.1 }, { name: 'Mar', value: 2.8 },
    { name: 'Apr', value: 4.2 }, { name: 'May', value: 3.7 }, { name: 'Jun', value: 5.1 },
    { name: 'Jul', value: 4.8 }, { name: 'Aug', value: 6.3 }, { name: 'Sep', value: 5.9 },
    { name: 'Oct', value: 7.4 }, { name: 'Nov', value: 8.2 }, { name: 'Dec', value: 9.6 }
];

const latencyTrend = [
    { t: '00', v: 142 }, { t: '04', v: 128 }, { t: '08', v: 156 },
    { t: '12', v: 134 }, { t: '16', v: 167 }, { t: '20', v: 119 },
    { t: '24', v: 124 }
];

const requestVolume = [
    { t: '1', v: 4200 }, { t: '2', v: 5100 }, { t: '3', v: 3800 },
    { t: '4', v: 6700 }, { t: '5', v: 5900 }, { t: '6', v: 7200 },
    { t: '7', v: 8100 }, { t: '8', v: 6400 }
];

const coreServices = [
    { name: 'LLM Inference', load: 84, status: 'Healthy', region: 'US-EAST-1', latency: '12ms' },
    { name: 'Vector Search', load: 67, status: 'Healthy', region: 'EU-WEST-1', latency: '8ms' },
    { name: 'Data Pipeline', load: 91, status: 'Scaling', region: 'AP-SOUTH-1', latency: '24ms' },
    { name: 'Model Registry', load: 38, status: 'Healthy', region: 'US-WEST-2', latency: '5ms' },
];

const miniSpark = [
    { v: 3 }, { v: 5 }, { v: 4 }, { v: 7 }, { v: 6 }, { v: 9 }, { v: 8 }, { v: 11 }
];

const KpiCard: React.FC<{
    title: string; value: string; trend: string; isUp: boolean;
    icon: React.ReactNode; sparkColor?: string;
}> = ({ title, value, trend, isUp, icon, sparkColor = '#2563eb' }) => (
    <div className="bg-white border border-gray-100/80 rounded-lg p-2 flex flex-col justify-between h-full">
        <div className="flex justify-between items-start">
            <span className="text-gray-400 text-[7px] font-medium uppercase tracking-wider leading-none">{title}</span>
            <div className="p-0.5 rounded bg-slate-50 text-slate-400">{icon}</div>
        </div>
        <div className="flex items-end justify-between mt-1">
            <div>
                <h4 className="text-slate-900 text-[13px] font-semibold tracking-tight leading-none">{value}</h4>
                <div className={`flex items-center gap-0.5 mt-0.5 ${isUp ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {isUp ? <ArrowUpRight size={7} strokeWidth={3} /> : <ArrowDownRight size={7} strokeWidth={3} />}
                    <span className="text-[7px] font-semibold">{trend}</span>
                </div>
            </div>
            <div className="w-10 h-5">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={miniSpark}>
                        <Line type="monotone" dataKey="v" stroke={sparkColor} strokeWidth={1.5} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    </div>
);

export const BankingDashboard: React.FC = () => {
    return (
        <div className="flex w-full h-full bg-white text-slate-800 overflow-hidden" style={{ fontFamily: 'var(--font-geist-sans)', fontSize: '11px' }}>
            {/* Sidebar */}
            <aside className="w-[140px] border-r border-gray-100/80 p-3 flex flex-col justify-between bg-white shrink-0">
                <div>
                    <div className="flex items-center gap-1.5 mb-5 px-0.5">
                        <div className="w-5 h-5 rounded-md bg-slate-900 flex items-center justify-center">
                            <Layers size={9} className="text-white" />
                        </div>
                        <span className="text-[11px] font-semibold tracking-tight text-slate-900">Woodfrog</span>
                    </div>

                    <nav className="space-y-0.5">
                        <p className="text-gray-400 text-[7px] uppercase font-medium tracking-wider px-2 mb-1.5">Platform</p>
                        <div className="flex items-center gap-2 px-2 py-1.5 text-slate-900 bg-slate-50 rounded-md cursor-pointer">
                            <LayoutDashboard size={11} />
                            <span className="text-[10px] font-medium">Overview</span>
                        </div>
                        <div className="flex items-center gap-2 px-2 py-1.5 text-slate-400 rounded-md cursor-pointer">
                            <Brain size={11} />
                            <span className="text-[10px] font-medium">Models</span>
                        </div>
                        <div className="flex items-center gap-2 px-2 py-1.5 text-slate-400 rounded-md cursor-pointer">
                            <TrendingUp size={11} />
                            <span className="text-[10px] font-medium">Analytics</span>
                        </div>
                        <div className="flex items-center gap-2 px-2 py-1.5 text-slate-400 rounded-md cursor-pointer">
                            <Database size={11} />
                            <span className="text-[10px] font-medium">Storage</span>
                        </div>
                    </nav>

                    <nav className="mt-4 space-y-0.5">
                        <p className="text-gray-400 text-[7px] uppercase font-medium tracking-wider px-2 mb-1.5">Infra</p>
                        <div className="flex items-center gap-2 px-2 py-1.5 text-slate-400 rounded-md cursor-pointer">
                            <Cpu size={11} />
                            <span className="text-[10px] font-medium">Compute</span>
                        </div>
                        <div className="flex items-center gap-2 px-2 py-1.5 text-slate-400 rounded-md cursor-pointer">
                            <Server size={11} />
                            <span className="text-[10px] font-medium">Nodes</span>
                        </div>
                        <div className="flex items-center gap-2 px-2 py-1.5 text-slate-400 rounded-md cursor-pointer">
                            <Shield size={11} />
                            <span className="text-[10px] font-medium">Security</span>
                        </div>
                    </nav>
                </div>

                <div className="flex items-center gap-2 px-2 py-2 border-t border-gray-100/80 mt-2">
                    <div className="w-5 h-5 rounded-full bg-slate-900 flex items-center justify-center text-white text-[7px] font-semibold">JL</div>
                    <div>
                        <p className="text-[9px] font-medium text-slate-700 leading-none">James Liu</p>
                        <p className="text-[7px] text-slate-400 mt-0.5">Admin</p>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-3 flex flex-col gap-2 bg-[#fafbfc] overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-[14px] font-semibold tracking-tight text-slate-900">Core Services</h3>
                        <p className="text-[8px] text-slate-400 mt-0.5">Real-time platform intelligence across 24 regions</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="flex items-center gap-1 bg-white border border-gray-200/80 rounded-md px-2 py-1 text-slate-400">
                            <Search size={9} />
                            <span className="text-[8px]">Search...</span>
                        </div>
                        <div className="relative p-1 bg-white border border-gray-200/80 rounded-md cursor-pointer">
                            <Bell size={10} className="text-slate-400" />
                            <div className="absolute top-0.5 right-0.5 w-1 h-1 rounded-full bg-rose-500" />
                        </div>
                        <div className="flex bg-white border border-gray-200/80 rounded-md p-0.5 gap-0.5">
                            <button className="px-2 py-0.5 bg-slate-900 text-white rounded text-[8px] font-medium">Live</button>
                            <button className="px-2 py-0.5 text-gray-400 text-[8px] font-medium">7d</button>
                            <button className="px-2 py-0.5 text-gray-400 text-[8px] font-medium">30d</button>
                        </div>
                    </div>
                </div>

                {/* KPI Cards Row */}
                <div className="grid grid-cols-6 gap-1.5">
                    <KpiCard title="Throughput" value="9.6 PB" trend="+18.4% MoM" isUp={true} icon={<Database size={8} />} />
                    <KpiCard title="Token Rate" value="1.24M/s" trend="+340K/s WoW" isUp={true} icon={<Brain size={8} />} sparkColor="#4f46e5" />
                    <KpiCard title="P99 Latency" value="124ms" trend="-8ms vs avg" isUp={false} icon={<Clock size={8} />} sparkColor="#f59e0b" />
                    <KpiCard title="Uptime SLA" value="99.97%" trend="+0.02% vs SLA" isUp={true} icon={<Activity size={8} />} sparkColor="#10b981" />
                    <KpiCard title="Active Users" value="284K" trend="+12.4% WoW" isUp={true} icon={<Users size={8} />} sparkColor="#8b5cf6" />
                    <KpiCard title="Cost Savings" value="$482K" trend="-23% vs Q3" isUp={true} icon={<Zap size={8} />} sparkColor="#06b6d4" />
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-12 gap-2 flex-1 min-h-0">
                    {/* Throughput Chart */}
                    <div className="col-span-4 bg-white border border-gray-100/80 rounded-lg p-2.5 flex flex-col">
                        <div className="flex justify-between items-start mb-0.5">
                            <div>
                                <span className="text-gray-400 text-[7px] font-medium uppercase tracking-wider">Monthly Throughput</span>
                                <div className="flex items-end gap-1.5 mt-0.5">
                                    <h3 className="text-[16px] font-bold text-slate-900 tracking-tight leading-none">9.6 PB</h3>
                                    <span className="text-emerald-500 text-[8px] font-medium flex items-center gap-0.5 mb-0.5">
                                        <ArrowUpRight size={8} strokeWidth={2.5} /> 18.4%
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 mt-1 min-h-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={throughputData} barCategoryGap="20%">
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 7 }} />
                                    <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                                        {throughputData.map((_, index) => (
                                            <Cell key={`cell-${index}`} fill={index >= 10 ? '#2563eb' : index >= 8 ? '#93c5fd' : '#e2e8f0'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Latency + Request Volume */}
                    <div className="col-span-4 flex flex-col gap-2">
                        <div className="bg-white border border-gray-100/80 rounded-lg p-2.5 flex-1 flex flex-col">
                            <div className="flex justify-between items-center mb-0.5">
                                <span className="text-gray-400 text-[7px] font-medium uppercase tracking-wider">Latency Distribution</span>
                                <span className="text-[7px] text-slate-400">P50 / P95 / P99</span>
                            </div>
                            <div className="flex gap-2.5 mb-1">
                                <div className="text-center">
                                    <span className="text-[12px] font-bold text-slate-900">42ms</span>
                                    <p className="text-[6px] text-slate-400 uppercase">P50</p>
                                </div>
                                <div className="text-center">
                                    <span className="text-[12px] font-bold text-slate-900">98ms</span>
                                    <p className="text-[6px] text-slate-400 uppercase">P95</p>
                                </div>
                                <div className="text-center">
                                    <span className="text-[12px] font-bold text-amber-500">124ms</span>
                                    <p className="text-[6px] text-slate-400 uppercase">P99</p>
                                </div>
                            </div>
                            <div className="flex-1 min-h-0">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={latencyTrend}>
                                        <defs>
                                            <linearGradient id="latGrad" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.1} />
                                                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <Area type="monotone" dataKey="v" stroke="#f59e0b" strokeWidth={1.5} fill="url(#latGrad)" dot={false} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div className="bg-white border border-gray-100/80 rounded-lg p-2.5 flex-1 flex flex-col">
                            <div className="flex justify-between items-center mb-0.5">
                                <span className="text-gray-400 text-[7px] font-medium uppercase tracking-wider">Request Volume</span>
                                <span className="text-emerald-500 text-[7px] font-medium">8.1K rps peak</span>
                            </div>
                            <div className="flex-1 min-h-0">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={requestVolume}>
                                        <defs>
                                            <linearGradient id="reqGrad" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.12} />
                                                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <Area type="monotone" dataKey="v" stroke="#2563eb" strokeWidth={1.5} fill="url(#reqGrad)" dot={false} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Services Table */}
                    <div className="col-span-4 bg-white border border-gray-100/80 rounded-lg p-2.5 flex flex-col">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-400 text-[7px] font-medium uppercase tracking-wider">Service Health</span>
                            <div className="bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded-full text-[6px] font-semibold flex items-center gap-0.5">
                                <div className="w-1 h-1 rounded-full bg-emerald-500" />
                                All Normal
                            </div>
                        </div>

                        <div className="flex-1 overflow-hidden">
                            <table className="w-full text-[8px]">
                                <thead className="text-gray-400 border-b border-gray-100/80">
                                    <tr>
                                        <th className="text-left pb-1.5 font-medium text-[7px] uppercase tracking-wider">Service</th>
                                        <th className="text-left pb-1.5 font-medium text-[7px] uppercase tracking-wider">Region</th>
                                        <th className="text-right pb-1.5 font-medium text-[7px] uppercase tracking-wider">Load</th>
                                        <th className="text-right pb-1.5 font-medium text-[7px] uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="text-slate-600">
                                    {coreServices.map((s, i) => (
                                        <tr key={i} className="border-b border-gray-50 hover:bg-slate-50/50 cursor-pointer">
                                            <td className="py-1.5 font-medium text-slate-800">{s.name}</td>
                                            <td className="py-1.5 text-slate-400 text-[7px]">{s.region}</td>
                                            <td className="py-1.5 text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <div className="w-8 h-1 bg-slate-100 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full rounded-full ${s.load > 85 ? 'bg-amber-500' : 'bg-blue-500'}`}
                                                            style={{ width: `${s.load}%` }}
                                                        />
                                                    </div>
                                                    <span className="font-semibold text-slate-800 text-[7px]">{s.load}%</span>
                                                </div>
                                            </td>
                                            <td className="py-1.5 text-right">
                                                <span className={`text-[6px] font-medium px-1 py-0.5 rounded-full ${
                                                    s.status === 'Healthy' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                                                }`}>{s.status}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-auto pt-2 border-t border-gray-100/80 grid grid-cols-3 gap-1.5">
                            <div>
                                <p className="text-[6px] text-slate-400 uppercase tracking-wider">Nodes</p>
                                <p className="text-[10px] font-bold text-slate-900">24/24</p>
                            </div>
                            <div>
                                <p className="text-[6px] text-slate-400 uppercase tracking-wider">Avg Lat</p>
                                <p className="text-[10px] font-bold text-slate-900">12ms</p>
                            </div>
                            <div>
                                <p className="text-[6px] text-slate-400 uppercase tracking-wider">Error</p>
                                <p className="text-[10px] font-bold text-emerald-600">0.001%</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="grid grid-cols-12 gap-2 shrink-0">
                    {/* Inference ROI */}
                    <div className="col-span-3 bg-white border border-gray-100/80 rounded-lg p-2.5">
                        <span className="text-gray-400 text-[7px] font-medium uppercase tracking-wider">Inference ROI</span>
                        <div className="flex items-end gap-1.5 mt-0.5">
                            <h4 className="text-[14px] font-bold text-slate-900 tracking-tight leading-none">$2.14M</h4>
                            <span className="text-emerald-500 text-[7px] font-medium mb-0.5">+12.6%</span>
                        </div>
                        <div className="mt-1.5 space-y-1">
                            {[
                                { label: 'Cloud Optimize', val: '$840K', p: 85 },
                                { label: 'LLM Tokens', val: '$520K', p: 55 },
                                { label: 'Automation', val: '$282K', p: 35 },
                            ].map((fee, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-[7px]">
                                        <span className="text-slate-500">{fee.label}</span>
                                        <span className="text-slate-800 font-semibold">{fee.val}</span>
                                    </div>
                                    <div className="h-0.5 w-full bg-slate-100 rounded-full overflow-hidden mt-0.5">
                                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${fee.p}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Model Performance */}
                    <div className="col-span-5 bg-white border border-gray-100/80 rounded-lg p-2.5">
                        <div className="flex justify-between items-center mb-1.5">
                            <span className="text-gray-400 text-[7px] font-medium uppercase tracking-wider">Model Performance</span>
                            <div className="flex bg-slate-50 p-0.5 rounded gap-0.5">
                                <button className="px-1.5 py-0.5 text-[6px] font-medium bg-slate-900 text-white rounded">Accuracy</button>
                                <button className="px-1.5 py-0.5 text-[6px] font-medium text-slate-400">Speed</button>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-1.5">
                            {[
                                { name: 'GPT-4o Tuned', score: '94.2%', delta: '+1.8%', color: '#2563eb' },
                                { name: 'Predict-v4', score: '88.7%', delta: '+3.2%', color: '#4f46e5' },
                                { name: 'Vision-X', score: '91.5%', delta: '+0.6%', color: '#8b5cf6' },
                                { name: 'Agent-Core', score: '87.3%', delta: '+2.1%', color: '#06b6d4' },
                            ].map((m, i) => (
                                <div key={i} className="flex flex-col items-center p-1.5 bg-slate-50/50 rounded-md border border-slate-100/50">
                                    <div className="w-7 h-7 relative mb-0.5">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={[{ value: parseFloat(m.score) }, { value: 100 - parseFloat(m.score) }]}
                                                    dataKey="value"
                                                    startAngle={90}
                                                    endAngle={-270}
                                                    innerRadius={9}
                                                    outerRadius={12}
                                                    stroke="none"
                                                >
                                                    <Cell fill={m.color} />
                                                    <Cell fill="#f1f5f9" />
                                                </Pie>
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <span className="text-[9px] font-bold text-slate-900">{m.score}</span>
                                    <span className="text-[6px] text-slate-500 font-medium">{m.name}</span>
                                    <span className="text-[6px] text-emerald-500 font-medium">{m.delta}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="col-span-4 bg-slate-900 rounded-lg p-2.5 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500 blur-[50px] opacity-15 -mr-6 -mt-6" />
                        <div className="relative z-10">
                            <span className="text-blue-400 text-[7px] font-medium uppercase tracking-wider">Monthly Savings</span>
                            <div className="flex items-end gap-1.5 mt-0.5">
                                <h4 className="text-[16px] font-bold tracking-tight leading-none">$482.5K</h4>
                                <span className="text-emerald-400 text-[7px] font-medium mb-0.5">+67% ROI</span>
                            </div>
                            <p className="text-[7px] text-slate-500 mt-0.5">Operational cost reduction vs prev quarter</p>
                        </div>
                        <div className="relative z-10 grid grid-cols-4 gap-1 mt-2 pt-2 border-t border-white/10">
                            {[
                                { label: 'Speed', val: '+42%' },
                                { label: 'Cost', val: '-23%' },
                                { label: 'ROI', val: '+67%' },
                                { label: 'Uptime', val: '99.9%' }
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col items-center">
                                    <span className="text-[6px] font-medium text-slate-500 uppercase">{item.label}</span>
                                    <span className="text-[9px] font-semibold text-blue-400">{item.val}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

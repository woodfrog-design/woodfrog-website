'use client';

import { useState } from 'react';
import { AnalyticsDashboardDemo } from '@/components/animations/AnalyticsDashboardDemo';
import { AutomatedBankingDemo } from '@/components/animations/AutomatedBankingDemo';
import { AutomatedDemo } from '@/components/animations/AutomatedDemo';
import { FinanceSalesTrendsDemo } from '@/components/animations/FinanceSalesTrendsDemo';
import { RevenueChartDemo } from '@/components/animations/RevenueChartDemo';
import { ProfitabilityDemo } from '@/components/animations/ProfitabilityDemo';
import { SearchDemo } from '@/components/animations/SearchDemo';
import { DataEngineeringDemo } from '@/components/animations/DataEngineeringDemo';
import Link from 'next/link';
import { ArrowLeft, Monitor, BarChart3, MessageSquare, PieChart, TrendingUp, DollarSign, Target, Search, Database } from 'lucide-react';

const demos = [
    {
        id: 'banking',
        label: 'Banking Dashboard',
        icon: BarChart3,
        url: 'app.woodfrog.ai/dashboard',
        component: AutomatedBankingDemo
    },
    {
        id: 'chat',
        label: 'Chat Analytics',
        icon: MessageSquare,
        url: 'app.woodfrog.ai/analytics',
        component: AutomatedDemo
    },
    {
        id: 'metrix',
        label: 'Metrix Analytics',
        icon: PieChart,
        url: 'app.woodfrog.ai/metrix',
        component: AnalyticsDashboardDemo
    },
    {
        id: 'finance',
        label: 'Finance Trends',
        icon: TrendingUp,
        url: 'app.woodfrog.ai/finance',
        component: FinanceSalesTrendsDemo
    },
    {
        id: 'revenue',
        label: 'Revenue Chart',
        icon: DollarSign,
        url: 'app.woodfrog.ai/revenue',
        component: RevenueChartDemo
    },
    {
        id: 'profitability',
        label: 'Profitability',
        icon: Target,
        url: 'app.woodfrog.ai/profitability',
        component: ProfitabilityDemo
    },
    {
        id: 'search',
        label: 'Search',
        icon: Search,
        url: 'app.woodfrog.ai/search',
        component: SearchDemo
    },
    {
        id: 'data-engineering',
        label: 'Data Engineering',
        icon: Database,
        url: 'app.woodfrog.ai/pipeline',
        component: DataEngineeringDemo
    },
];

export default function AnimationPage() {
    const [activeDemo, setActiveDemo] = useState('banking');

    const currentDemo = demos.find(d => d.id === activeDemo) || demos[0];
    const DemoComponent = currentDemo.component;

    return (
        <main className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100">
            {/* Subtle grid pattern background */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, #94a3b8 1px, transparent 0)',
                backgroundSize: '32px 32px'
            }} />

            {/* Top bar */}
            <div className="fixed top-0 left-0 right-0 z-[200] px-6 py-4 flex items-center justify-between">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-slate-400 hover:text-slate-700 transition-colors text-[11px] font-medium tracking-wide border border-slate-200/80 px-3.5 py-2 rounded-lg bg-white/80 backdrop-blur-xl shadow-sm"
                >
                    <ArrowLeft size={13} />
                    Back
                </Link>

                {/* Demo selector tabs */}
                <div className="flex items-center gap-1 bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-lg p-1 shadow-sm">
                    {demos.map((demo) => {
                        const Icon = demo.icon;
                        const isActive = activeDemo === demo.id;
                        return (
                            <button
                                key={demo.id}
                                onClick={() => setActiveDemo(demo.id)}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-[11px] font-medium tracking-wide transition-all duration-200 ${isActive
                                        ? 'bg-slate-900 text-white shadow-sm'
                                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                                    }`}
                            >
                                <Icon size={12} />
                                {demo.label}
                            </button>
                        );
                    })}
                </div>

                <div className="flex items-center gap-2 text-slate-300">
                    <Monitor size={13} />
                    <span className="text-[10px] font-medium tracking-wide uppercase">Core Services Preview</span>
                </div>
            </div>

            {/* Canvas container with browser-like chrome */}
            <div className="relative z-10 flex flex-col" style={{ width: '60vw', height: '70vh' }}>
                {/* Browser chrome bar */}
                <div className="bg-white/90 backdrop-blur-xl border border-slate-200/80 border-b-0 rounded-t-2xl px-4 py-2.5 flex items-center gap-3 shrink-0">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                    </div>
                    <div className="flex-1 flex justify-center">
                        <div className="bg-slate-50/80 border border-slate-200/60 rounded-md px-4 py-1 text-[10px] text-slate-400 font-medium tracking-wide min-w-[240px] text-center">
                            {currentDemo.url}
                        </div>
                    </div>
                    <div className="w-[52px]" />
                </div>

                {/* Demo canvas */}
                <div className="flex-1 border border-slate-200/80 rounded-b-2xl overflow-hidden bg-white shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)]">
                    <DemoComponent key={activeDemo} />
                </div>
            </div>
        </main>
    );
}

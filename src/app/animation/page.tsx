'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { User, Database, Binary, Layout, BarChart3, Settings, FileSearch, Trash2, GitMerge, CheckCircle2, Code, FileText, Share2, ClipboardCheck, Bot, Cpu, Sparkles, Wand2 } from 'lucide-react';

if (typeof window !== "undefined") {
    gsap.registerPlugin(MotionPathPlugin);
}

// Import Enterprise Dashboard Components & Context
import { DashboardProvider, DASHBOARD_COLORS, useDashboard, useFilteredData } from "@/components/enterprise-dashboard/dashboard-context";
import { KPICard } from "@/components/enterprise-dashboard/kpi-card";
import { TimeSeriesArea } from "@/components/enterprise-dashboard/time-series-area";
import { FunnelChart } from "@/components/enterprise-dashboard/funnel-chart";
import { RegionHeatmap } from "@/components/enterprise-dashboard/region-heatmap";
import { ScatterQuadrant } from "@/components/enterprise-dashboard/scatter-quadrant";

// Simple wrapper to avoid mounting issues
const SharedEnterpriseDashboard = () => {
    const { timeSeriesData, funnelSteps, heatmapData, scatterData, totals } = useFilteredData();

    const kpiData = useMemo(() => [
        { title: "Total Revenue", value: (totals.revenue || 918.9).toFixed(1), unit: "₹ Cr", change: 8.5, changeLabel: "vs FY23", target: "950 Cr", sparklineData: timeSeriesData.map(d => d.revenue) },
        { title: "Gross Margin", value: (totals.margin || 30.2).toFixed(1), unit: "%", change: 2.1, changeLabel: "vs Prior Qtr", target: "45%" },
        { title: "Operating Expenses", value: "312.4", unit: "₹ Cr", change: -4.2, changeLabel: "vs Budget", target: "320 Cr" },
        { title: "Customer Acquisition", value: "1,247", change: 15.3, changeLabel: "New Customers", sparklineData: timeSeriesData.map(d => d.revenue * 1.5) },
        { title: "NPS Score", value: "67", change: 5, changeLabel: "vs Last Survey", target: "70" },
    ], [totals, timeSeriesData]);

    return (
        <div
            id="main-dashboard-content"
            className="w-full h-full overflow-hidden"
            style={{
                backgroundColor: DASHBOARD_COLORS.background,
                border: `4px solid ${DASHBOARD_COLORS.brandOrange}`,
                borderRadius: "20px",
                boxShadow: `0 0 20px var(--brand-primary), inset 0 0 10px rgba(0,0,0,0.5)`
            }}
        >
            <div className="dashboard-item-header border-b px-8 py-6" style={{ backgroundColor: DASHBOARD_COLORS.card, borderColor: DASHBOARD_COLORS.border }}>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold" style={{ color: DASHBOARD_COLORS.textPrimary }}>Regional Sales & Operations Intelligence</h1>
                        <p className="text-base" style={{ color: DASHBOARD_COLORS.textSecondary }}>FY 2024 Performance Dashboard • Enterprise Manual Build v1.4</p>
                    </div>
                </div>
            </div>

            <div className="p-6 space-y-5">
                <div id="reveal-kpis" className="grid grid-cols-5 gap-6 opacity-0 scale-95 pointer-events-none">
                    {kpiData.map((kpi, index) => (
                        <KPICard key={index} {...kpi} />
                    ))}
                </div>

                <div className="grid grid-cols-12 gap-6">
                    <div id="reveal-main-chart" className="col-span-8 opacity-0 translate-x-10 pointer-events-none">
                        <TimeSeriesArea data={timeSeriesData} />
                    </div>
                    <div id="reveal-side-charts" className="col-span-4 opacity-0 translate-x-10 pointer-events-none">
                        <FunnelChart data={funnelSteps} />
                    </div>
                </div>

                <div id="reveal-bottom" className="grid grid-cols-2 gap-6 opacity-0 translate-y-10 pointer-events-none">
                    <RegionHeatmap data={heatmapData} />
                    <ScatterQuadrant data={scatterData} />
                </div>
            </div>

            <div className="mt-6 mr-10 flex justify-end pb-10">
                <p className="text-xl font-bold text-brand-primary italic">
                    * This data is only for representation purpose
                </p>
            </div>
        </div>
    );
};

const TaskBubble = ({ text, icon: Icon, color, className, initialPos }: any) => (
    <div
        className={`task-bubble absolute bg-white border border-zinc-200 shadow-xl rounded-xl px-4 py-2 flex items-center gap-3 scale-0 z-[150] whitespace-nowrap opacity-0 ${className}`}
        style={{ left: initialPos.x, top: initialPos.y }}
    >
        <div className={`p-1.5 rounded-lg ${color} text-white shrink-0`}>
            <Icon size={14} />
        </div>
        <div className="flex flex-col">
            {text.split('\n').map((line: string, i: number) => (
                <span key={i} className={`text-[10px] font-bold font-mono ${i === 0 ? 'text-zinc-700' : 'text-zinc-400'}`}>
                    {line}
                </span>
            ))}
        </div>
    </div>
);

const WoodfrogLogoSVG = ({ className }: { className?: string }) => (
    <svg
        width="150"
        height="110"
        viewBox="0 0 64 48"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        className={`text-[#39D6E3] ${className}`}
    >
        <path
            d="M32 4 L12 44 L18 44 L32 16 L46 44 L52 44 Z"
            fill="currentColor"
            fillOpacity="1"
        />
    </svg>
);

export default function AnimationPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const dashboardContainerRef = useRef<HTMLDivElement>(null);
    const logoContainerRef = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const nav = document.querySelector('nav');
        const footer = document.querySelector('footer');
        if (nav) nav.style.display = 'none';
        if (footer) footer.style.display = 'none';

        // Strict Scroll Lock to prevent lag
        document.body.style.overflow = 'hidden';

        return () => {
            if (nav) nav.style.display = '';
            if (footer) footer.style.display = '';
            document.body.style.overflow = '';
        };
    }, []);

    useGSAP(() => {
        if (!isMounted || !containerRef.current) return;

        const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });

        // --- STAGE 1: MANUAL WORKFLOW ---
        // Initial Reset
        tl.set([".person-node", ".bi-analyst", dashboardContainerRef.current, ".diagonal-line", ".task-bubble", ".ai-entity", ".ai-line", logoContainerRef.current], { opacity: 0 });
        tl.set(".problem-card", { xPercent: -50, yPercent: -50, left: "50%", top: "50%", scale: 1, opacity: 0 });
        tl.set([".diagonal-line", ".ai-line"], { strokeDasharray: 1000, strokeDashoffset: 1000 });
        tl.set(["#reveal-kpis", "#reveal-main-chart", "#reveal-side-charts", "#reveal-bottom"], { opacity: 0, scale: 0.95 });

        // Phase 1: Problem Statement
        tl.to(".problem-card", { opacity: 1, duration: 1 })
            .to(".problem-card", {
                scale: 0.4,
                left: "90%",
                top: "90%",
                duration: 1.2,
                delay: 1.5,
                ease: "power2.inOut"
            }, "handoff");

        // Phase 2: Deployment
        tl.set(".person-node", { opacity: 1 }, "handoff")
            .to(".problem-card", { opacity: 0, duration: 0.4 }, "conversion")
            .from(".person-node", { opacity: 0, scale: 0, stagger: 0.1, duration: 0.5, ease: "back.out" }, "conversion")
            .to(".bi-analyst", { opacity: 1, duration: 0.5 }, "conversion");

        tl.to(".diagonal-line", { opacity: 1, strokeDashoffset: 0, duration: 1, stagger: 0.1 }, "conversion+=0.5");

        // Phase 3: Building Loop
        tl.set(dashboardContainerRef.current, { opacity: 1 }, "work-start");

        const roles = ["analyst", "engineer", "developer", "bi"];
        const runBatch = (batchIdx: number, targetIds: string[], startTime: string | number) => {
            roles.forEach(role => {
                const bubble = `.bubble-${role}-${batchIdx}`;
                const path = `#path-${role}`;
                tl.to(bubble, { scale: 1, opacity: 1, duration: 0.3 }, startTime);
                tl.to(bubble, {
                    motionPath: { path: path, align: path, alignOrigin: [0.5, 0.5] },
                    duration: 2.5,
                    ease: "power1.inOut"
                }, (startTime as number) + 0.3);
                tl.to(bubble, { scale: 0, opacity: 0, duration: 0.3 }, (startTime as number) + 2.8);
            });
            targetIds.forEach(id => {
                tl.to(id, { opacity: 1, scale: 1, x: 0, y: 0, duration: 1, ease: "back.out(1.2)" }, (startTime as number) + 3.0);
            });
        };

        const batch1Start = 6.5;
        const batch2Start = 11.5;
        const batch3Start = 16.5;

        runBatch(0, ["#reveal-bottom"], batch1Start);
        runBatch(1, ["#reveal-main-chart"], batch2Start);
        runBatch(2, ["#reveal-kpis", "#reveal-side-charts"], batch3Start);

        // --- STAGE 2: TRANSITION TO AI ---
        const aiTransitionStart = 21.5;
        tl.addLabel("ai-transition", aiTransitionStart);

        // 1. User Transformation (Merging) - Dashboard remains visible (opacity 1)
        // AI Agent (Analyst + Engineer) -> Top-Left Diagonal (15%)
        tl.to(".node-analyst", { left: "15%", top: "15%", duration: 1.5, ease: "power2.inOut" }, "ai-transition");
        tl.to(".node-engineer", { left: "15%", top: "15%", duration: 1.5, ease: "power2.inOut" }, "ai-transition");
        tl.to([".node-analyst", ".node-engineer"], { opacity: 0, scale: 0.5, duration: 0.5 }, "ai-transition+=1.2");
        tl.to(".ai-entity-agent", { opacity: 1, scale: 1, duration: 0.8, ease: "back.out" }, "ai-transition+=1.4");

        // AI Tools (Developer + BI) -> Bottom-Right Diagonal (85%)
        tl.to(".node-developer", { left: "85%", top: "85%", duration: 1.5, ease: "power2.inOut" }, "ai-transition");
        tl.to(".node-bi", { left: "85%", top: "85%", duration: 1.5, ease: "power2.inOut" }, "ai-transition");
        tl.to([".node-developer", ".node-bi"], { opacity: 0, scale: 0.5, duration: 0.5 }, "ai-transition+=1.2");
        tl.to(".ai-entity-tools", { opacity: 1, scale: 1, duration: 0.8, ease: "back.out" }, "ai-transition+=1.4");

        // Hide Manual Lines
        tl.to(".diagonal-line", { opacity: 0, duration: 0.5 }, "ai-transition");

        // Persistence: Dashboard remains visible for 1s after merge completes
        tl.to({}, { duration: 1 }, "ai-transition+=2.2");

        // 2. Dashboard Morphing -> Logo (Triggered after 1s persistence)
        tl.to(dashboardContainerRef.current, { scale: 0.1, opacity: 0, duration: 1.5, ease: "power2.in" }, "ai-transition+=3.2");
        tl.to("#main-dashboard-content", { borderRadius: "100px", duration: 1.5 }, "ai-transition+=3.2");
        tl.to(logoContainerRef.current, { opacity: 1, scale: 1.5, duration: 1.5, ease: "back.out(1.7)" }, "ai-transition+=3.7");

        // 3. AI Connection Lines (Symmetric Diagonals)
        // Agent -> Dashboard Corner, Tools -> Dashboard Corner
        tl.to(".ai-line", { opacity: 1, strokeDashoffset: 0, duration: 1.2, stagger: 0.2 }, "ai-transition+=1.4");

        // Persistence: Dashboard remains visible for 1s after merge completes
        tl.to({}, { duration: 1 }, "ai-transition+=2.2");

        // 4. Dashboard Morphing -> Logo (Triggered after 1s persistence)
        tl.to(dashboardContainerRef.current, { scale: 0.1, opacity: 0, duration: 1.5, ease: "power2.in" }, "ai-transition+=3.2");
        tl.to("#main-dashboard-content", { borderRadius: "100px", duration: 1.5 }, "ai-transition+=3.2");
        tl.to(logoContainerRef.current, { opacity: 1, scale: 1, duration: 1.5, ease: "back.out(1.7)" }, "ai-transition+=3.7");

        // 5. AI Connection Lines Re-Align to Logo (Morphing the lines)
        tl.to("#ai-line-agent", { attr: { d: "M 15 15 L 45 45" }, duration: 1.5, ease: "power2.inOut" }, "ai-transition+=3.2");
        tl.to("#ai-line-tools", { attr: { d: "M 85 85 L 55 55" }, duration: 1.5, ease: "power2.inOut" }, "ai-transition+=3.2");

        // Slow float for AI entities
        tl.to(".ai-entity", { y: "+=10", duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut" }, "ai-transition+=5.5");
        tl.to(logoContainerRef.current, { scale: 1.1, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut" }, "ai-transition+=5.5");

        tl.to({}, { duration: 5 }); // Pause before loop

    }, [isMounted]);

    const tasks = {
        analyst: ["Cleaning spreadsheets", "Merging regional files", "Manual validation check"],
        engineer: ["Writing SQL queries", "Manual ETL setup", "Flattening JSON data"],
        developer: ["Coding chart components", "Styling UI layout", "Integrating endpoints"],
        bi: ["Defining KPI logic", "Mapping data visuals", "Final layout review"]
    };

    return (
        <main className="bg-transparent h-screen w-full overflow-hidden" ref={containerRef}>
            {/* SVG Layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Manual Lines */}
                <path id="path-analyst" className="diagonal-line stroke-zinc-200" d="M 12 12 L 20 20" fill="none" strokeWidth="0.2" />
                <path id="path-engineer" className="diagonal-line stroke-zinc-200" d="M 88 12 L 80 20" fill="none" strokeWidth="0.2" />
                <path id="path-developer" className="diagonal-line stroke-zinc-200" d="M 12 88 L 20 80" fill="none" strokeWidth="0.2" />
                <path id="path-bi" className="diagonal-line stroke-zinc-200" d="M 88 88 L 80 80" fill="none" strokeWidth="0.2" />

                {/* AI Lines (Stage 2) - Connecting Agent/Tools to Dashboard Corners Initial Position */}
                {/* Agent (15,15) -> Dashboard Top-Left (20,20) */}
                <path id="ai-line-agent" className="ai-line stroke-[#10B981]" d="M 15 15 L 20 20" fill="none" strokeWidth="0.3" strokeDasharray="5,3" />
                {/* Tools (85,85) -> Dashboard Bottom-Right (80,80) */}
                <path id="ai-line-tools" className="ai-line stroke-[#10B981]" d="M 85 85 L 80 80" fill="none" strokeWidth="0.3" strokeDasharray="5,3" />
                <path id="ai-line-tools" className="ai-line stroke-brand-accent" d="M 85 85 L 80 80" fill="none" strokeWidth="0.3" strokeDasharray="5,3" />
            </svg>

            {/* Stage 1: Roles */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="person-node node-analyst absolute top-[10%] left-[10%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
                    <div className="p-4 bg-white border-2 border-brand-accent shadow-xl rounded-full relative">
                        <Database size={40} className="text-brand-accent" />
                        <div className="absolute -bottom-2 -right-2 bg-zinc-900 text-white p-1 rounded-full border border-white"><FileSearch size={14} /></div>
                    </div>
                </div>

                <div className="person-node node-engineer absolute top-[10%] left-[90%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
                    <div className="p-4 bg-white border-2 border-blue-600 shadow-xl rounded-full relative">
                        <Binary size={40} className="text-blue-600" />
                        <div className="absolute -bottom-2 -right-2 bg-zinc-900 text-white p-1 rounded-full border border-white"><GitMerge size={14} /></div>
                    </div>
                </div>

                <div className="person-node node-developer absolute top-[90%] left-[10%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
                    <div className="p-4 bg-white border-2 border-green-600 shadow-xl rounded-full relative">
                        <Layout size={40} className="text-green-600" />
                        <div className="absolute -bottom-2 -right-2 bg-zinc-900 text-white p-1 rounded-full border border-white"><Settings size={14} /></div>
                    </div>
                </div>

                <div className="person-node bi-analyst node-bi absolute top-[90%] left-[90%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
                    <div className="p-4 bg-white border-2 border-purple-600 shadow-xl rounded-full relative">
                        <BarChart3 size={40} className="text-purple-600" />
                    </div>
                </div>
            </div>

            {/* Stage 2: AI Entities (Merged & Diagonally Placed at 15/85) */}
            <div className="absolute inset-0 z-[100] pointer-events-none">
                {/* AI Agent (Top-Left Diagonal) */}
                <div className="ai-entity ai-entity-agent absolute top-[15%] left-[15%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3 opacity-0 scale-0">
                    <div className="relative p-6 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-3xl shadow-[0_0_40px_rgba(16,185,129,0.4)] border-2 border-white">
                        <Bot size={50} className="text-white" />
                        <Sparkles className="absolute -top-2 -right-2 text-yellow-300 animate-pulse" size={20} />
                    </div>
                    <div className="px-6 py-2 bg-zinc-900 text-white rounded-full text-xs font-bold tracking-widest uppercase border border-zinc-700">AI Agent</div>
                </div>

                {/* AI Tools (Bottom-Right Diagonal) */}
                <div className="ai-entity ai-entity-tools absolute top-[85%] left-[85%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3 opacity-0 scale-0">
                    <div className="relative p-6 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl shadow-[0_0_40px_rgba(16,185,129,0.4)] border-2 border-white">
                        <Cpu size={50} className="text-white" />
                        <Wand2 className="absolute -top-2 -right-2 text-cyan-200 animate-pulse" size={20} />
                    </div>
                    <div className="px-6 py-2 bg-zinc-900 text-white rounded-full text-xs font-bold tracking-widest uppercase border border-zinc-700">AI Tools</div>
                </div>
            </div>

            {/* Dashboard Container (Stage 1) to Logo Morph (Stage 2) */}
            <div ref={dashboardContainerRef} className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none opacity-0">
                <div className="relative w-[60vw] h-[60vh] rounded-[24px] overflow-hidden shadow-2xl bg-[#120805]">
                    {isMounted && (
                        <DashboardProvider>
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="origin-center scale-[0.45] min-w-[133.33vw] min-h-[133.33vh] shrink-0">
                                    <SharedEnterpriseDashboard />
                                </div>
                            </div>
                        </DashboardProvider>
                    )}
                </div>
            </div>

            {/* Woodfrog Official Brand Centerpiece (Stage 2) */}
            <div ref={logoContainerRef} className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none opacity-0 scale-50">
                <div className="bg-transparent">
                    <WoodfrogLogoSVG className="scale-[1.5]" />
                </div>
            </div>

            {/* Problem Statement Card */}
            <div className="problem-card absolute z-[200] bg-white border border-zinc-200 shadow-2xl rounded-2xl p-8 w-full max-w-md pointer-events-none opacity-0">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><User size={24} /></div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Project Stakeholder</span>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-zinc-900 leading-tight">We need a manual, high-precision analysis of sales.</h3>
            </div>

            {/* Task Snippets with Rigid Origin Mapping */}
            {(Object.keys(tasks) as Array<keyof typeof tasks>).map(role => (
                tasks[role].map((text, idx) => {
                    let Icon = CheckCircle2;
                    if (role === 'analyst') Icon = FileText;
                    if (role === 'engineer') Icon = Database;
                    if (role === 'developer') Icon = Code;
                    if (role === 'bi') Icon = BarChart3;

                    const color = role === 'analyst' ? "bg-brand-primary" : (role === 'engineer' ? "bg-blue-600" : (role === 'developer' ? "bg-green-600" : "bg-purple-600"));

                    // Fixed initial positions to prevent "jumping"
                    const initialPos = {
                        analyst: { x: "10%", y: "10%" },
                        engineer: { x: "90%", y: "10%" },
                        developer: { x: "10%", y: "90%" },
                        bi: { x: "90%", y: "90%" }
                    }[role];

                    return <TaskBubble key={`${role}-${idx}`} text={text} icon={Icon} color={color} className={`bubble-${role}-${idx}`} initialPos={initialPos} />;
                })
            ))}
        </main>
    );
}

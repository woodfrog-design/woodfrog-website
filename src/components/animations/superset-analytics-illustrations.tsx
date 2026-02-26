'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ═══════════════════════════════════════════════════════
   SHARED UTILITIES
   ═══════════════════════════════════════════════════════ */

const SUPERSET_ORANGE = '#E8501A';
const SUPERSET_ORANGE_LIGHT = '#FFF0EB';

const useLoop = (fn: () => (() => void), deps: React.DependencyList, active = true) => {
    useEffect(() => {
        if (!active) return;
        const cleanup = fn();
        return cleanup;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...deps, active]);
};

const LoadingDots = ({ color = SUPERSET_ORANGE }: { color?: string }) => (
    <div className="flex gap-1 items-center">
        {[0, 1, 2].map(i => (
            <motion.div
                key={i}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2 }}
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: color }}
            />
        ))}
    </div>
);

const StatusDot = ({ ok = true }: { ok?: boolean }) => (
    <span className={`inline-block w-2 h-2 rounded-full ${ok ? 'bg-green-400' : 'bg-red-400'}`} />
);

/* ═══════════════════════════════════════════════════════
   1. DEPLOYMENT & MAINTENANCE
   Shows: Docker container startup sequence, health checks, version upgrade
   ═══════════════════════════════════════════════════════ */
export function DeploymentIllustration() {
    const [step, setStep] = useState(0);
    const [logs, setLogs] = useState<string[]>([]);

    const ALL_LOGS = [
        '$ docker-compose up -d superset',
        '  Pulling superset:4.1.2 ...',
        '  Creating superset_db_1 ... done',
        '  Creating superset_redis_1 ... done',
        '  Creating superset_app_1 ... done',
        '',
        '$ superset fab create-admin',
        '  Username: admin',
        '  Admin created.',
        '',
        '$ superset init',
        '  Importing default roles...',
        '  Done!',
        '',
        '  Health: OK  |  Version: 4.1.2  |  DB: Connected',
    ];

    useEffect(() => {
        let cancelled = false;
        const run = async () => {
            setStep(0);
            setLogs([]);
            for (let i = 0; i < ALL_LOGS.length; i++) {
                if (cancelled) return;
                await new Promise(r => setTimeout(r, 280));
                setLogs(prev => [...prev, ALL_LOGS[i]]);
            }
            setStep(1); // health check done
            await new Promise(r => setTimeout(r, 3000));
            if (!cancelled) run();
        };
        run();
        return () => { cancelled = true; };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="bg-[#0d1117] rounded-2xl overflow-hidden font-mono" style={{ height: 340 }}>
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-2 text-[11px] text-white/40">superset-deploy ~ bash</span>
                {step === 1 && (
                    <span className="ml-auto text-[10px] text-green-400 font-sans">✓ HEALTHY</span>
                )}
            </div>

            {/* Terminal body */}
            <div className="p-4 space-y-0.5 overflow-hidden" style={{ maxHeight: 280 }}>
                <AnimatePresence>
                    {logs.map((line, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.15 }}
                            className="text-[11px] leading-5"
                            style={{
                                color: line.startsWith('$') ? '#79c0ff' :
                                    line.includes('done') || line.includes('OK') || line.includes('Connected') ? '#56d364' :
                                        line.includes('Pulling') || line.includes('Importing') ? '#e3b341' :
                                            '#8b949e',
                            }}
                        >
                            {line || '\u00A0'}
                        </motion.div>
                    ))}
                </AnimatePresence>
                {logs.length < ALL_LOGS.length && (
                    <div className="flex items-center gap-1 pt-1">
                        <span className="text-[11px] text-white/40">$</span>
                        <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity }}
                            className="inline-block w-[7px] h-[13px] bg-white/50"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════
   2. CUSTOM FEATURE DEVELOPMENT
   Shows: Split code-editor + live chart preview — plugin being authored
   ═══════════════════════════════════════════════════════ */
const CHART_TYPES = ['Waterfall', 'Pareto', 'Whale', 'Mekko', 'Heatmap'];

const CODE_LINES = [
    "import { ChartPlugin } from '@superset-ui/core';",
    "import { WaterfallChart } from './WaterfallChart';",
    "",
    "export class WaterfallChartPlugin extends ChartPlugin {",
    "  constructor() {",
    "    super({",
    "      metadata: new ChartMetadata({",
    "        name: 'Waterfall Chart',",
    "        thumbnail: './thumbnail.png',",
    "      }),",
    "      Chart: WaterfallChart,",
    "    });",
    "  }",
    "}",
];

export function CustomFeatureIllustration() {
    const [visibleLines, setVisibleLines] = useState(0);
    const [chartStage, setChartStage] = useState(0); // 0=empty 1=axes 2=bars 3=done

    useEffect(() => {
        let cancelled = false;
        const run = async () => {
            setVisibleLines(0); setChartStage(0);
            for (let i = 0; i <= CODE_LINES.length; i++) {
                if (cancelled) return;
                setVisibleLines(i);
                // update chart preview as code progresses
                if (i === 4) setChartStage(1);
                if (i === 9) setChartStage(2);
                if (i === CODE_LINES.length) setChartStage(3);
                await new Promise(r => setTimeout(r, 230));
            }
            await new Promise(r => setTimeout(r, 2800));
            if (!cancelled) run();
        };
        run();
        return () => { cancelled = true; };
    }, []);

    const BAR_HEIGHTS = [30, 18, 42, 25, 38, 15, 50];
    const BAR_COLORS = ['#22c55e', '#ef4444', '#22c55e', '#ef4444', '#22c55e', '#ef4444', '#3b82f6'];

    return (
        <div className="bg-[#0d1117] rounded-2xl overflow-hidden" style={{ height: 340 }}>
            {/* Header */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-[#161b22]">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-2 text-[11px] text-white/40">waterfall-plugin.ts</span>
                {chartStage === 3 && <span className="ml-auto text-[10px] text-green-400">✓ Plugin ready</span>}
            </div>

            <div className="flex h-full">
                {/* Code Editor */}
                <div className="flex-1 p-4 overflow-hidden font-mono">
                    <div className="space-y-0.5">
                        {CODE_LINES.slice(0, visibleLines).map((line, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.1 }}
                                className="text-[10px] leading-[1.6] whitespace-pre"
                                style={{
                                    color: line.startsWith('import') ? '#79c0ff'
                                        : line.includes('class') || line.includes('constructor') ? '#ff7b72'
                                            : line.includes('name:') || line.includes('thumbnail') ? '#a5d6ff'
                                                : line.includes('//') ? '#6e7681'
                                                    : '#c9d1d9',
                                }}>
                                {line || '\u00A0'}
                            </motion.div>
                        ))}
                        {visibleLines < CODE_LINES.length && (
                            <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity }}
                                className="inline-block w-[6px] h-[12px] bg-white/50" />
                        )}
                    </div>
                </div>

                {/* Live Preview */}
                <div className="w-32 border-l border-white/10 p-3 flex flex-col">
                    <p className="text-[9px] text-white/30 mb-2 font-mono">Live Preview</p>
                    <div className="flex-1 flex flex-col">
                        {chartStage >= 1 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-1">
                                <div className="h-[1px] bg-white/20 w-full mb-0.5" />
                                <div className="h-[1px] bg-white/10 w-full" />
                            </motion.div>
                        )}
                        {chartStage >= 2 && (
                            <div className="flex items-end gap-0.5 flex-1 pt-2">
                                {BAR_HEIGHTS.map((h, i) => (
                                    <motion.div key={i} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: i * 0.07 }}
                                        className="flex-1 rounded-t-sm"
                                        style={{ height: `${h}%`, backgroundColor: BAR_COLORS[i], transformOrigin: 'bottom', opacity: 0.85 }} />
                                ))}
                            </div>
                        )}
                        {chartStage >= 3 && (
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[8px] text-green-400 text-center mt-2">Rendered ✓</motion.p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}



/* ═══════════════════════════════════════════════════════
   3. PERFORMANCE OPTIMIZATION
   Shows: Before/after load time, query plan, caching layer
   ═══════════════════════════════════════════════════════ */
export function PerformanceIllustration() {
    const [phase, setPhase] = useState<'before' | 'optimizing' | 'after'>('before');
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let cancelled = false;
        const run = async () => {
            setPhase('before'); setProgress(0);
            await new Promise(r => setTimeout(r, 2000));
            if (cancelled) return;
            setPhase('optimizing');
            for (let p = 0; p <= 100; p += 4) {
                if (cancelled) return;
                setProgress(p);
                await new Promise(r => setTimeout(r, 60));
            }
            setPhase('after');
            await new Promise(r => setTimeout(r, 3000));
            if (!cancelled) run();
        };
        run();
        return () => { cancelled = true; };
    }, []);

    const metrics = [
        { label: 'Query Time', before: '15.3s', after: '0.8s', color: '#22c55e' },
        { label: 'Cache Hit Rate', before: '12%', after: '94%', color: '#3b82f6' },
        { label: 'Concurrent Users', before: '8', after: '200+', color: SUPERSET_ORANGE },
    ];

    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden" style={{ height: 340 }}>
            <div className="bg-gray-50 border-b border-gray-100 px-4 py-3 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: SUPERSET_ORANGE }} />
                <span className="text-[12px] font-semibold text-gray-700">Performance Optimizer</span>
                <span className={`ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full ${phase === 'before' ? 'bg-red-50 text-red-500' : phase === 'after' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>
                    {phase === 'before' ? 'SLOW' : phase === 'after' ? 'OPTIMIZED' : 'RUNNING...'}
                </span>
            </div>

            <div className="p-5">
                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                    {metrics.map(m => (
                        <div key={m.label} className="rounded-xl border border-gray-100 p-3 text-center">
                            <AnimatePresence mode="wait">
                                <motion.p key={phase === 'after' ? 'after' : 'before'}
                                    className="text-[18px] font-bold"
                                    style={{ color: phase === 'after' ? m.color : '#ef4444' }}
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                >
                                    {phase === 'after' ? m.after : m.before}
                                </motion.p>
                            </AnimatePresence>
                            <p className="text-[9px] text-gray-400 mt-0.5">{m.label}</p>
                        </div>
                    ))}
                </div>

                {/* Optimization progress */}
                {phase === 'optimizing' && (
                    <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-[10px] text-gray-500">
                            <span>Applying optimizations...</span>
                            <span>{progress}%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div className="h-full rounded-full" style={{ backgroundColor: SUPERSET_ORANGE, width: `${progress}%` }} />
                        </div>
                    </div>
                )}

                {/* Steps */}
                <div className="space-y-2">
                    {[
                        { label: 'Identify slow queries (EXPLAIN ANALYZE)', done: phase !== 'before' },
                        { label: 'Integrate ClickHouse for hot data', done: phase === 'after' || (phase === 'optimizing' && progress > 40) },
                        { label: 'Configure Redis cache layer', done: phase === 'after' || (phase === 'optimizing' && progress > 70) },
                        { label: 'Pre-aggregate repeated queries', done: phase === 'after' },
                    ].map((s, i) => (
                        <div key={i} className="flex items-center gap-2 text-[11px]">
                            <span className={s.done ? 'text-green-500' : 'text-gray-300'}>{s.done ? '✓' : '○'}</span>
                            <span className={s.done ? 'text-gray-700' : 'text-gray-400'}>{s.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════
   4. EMBEDDED SUPERSET SOLUTIONS
   Shows: SaaS app iframe with Superset dashboard inside, row-level security
   ═══════════════════════════════════════════════════════ */
const ROLES = ['Manager', 'Analyst', 'Executive'];

export function EmbeddedIllustration() {
    const [authStep, setAuthStep] = useState(0); // 0: idle, 1: generating token, 2: authenticated
    const [activeRole, setActiveRole] = useState(0);
    const roles = ['Executive', 'Manager', 'Analyst'];

    useEffect(() => {
        let cancelled = false;
        const run = async () => {
            while (!cancelled) {
                setAuthStep(0);
                await new Promise(r => setTimeout(r, 1000));
                if (cancelled) break;

                setAuthStep(1); // Generating token
                await new Promise(r => setTimeout(r, 1500));
                if (cancelled) break;

                setAuthStep(2); // Authenticated
                for (let i = 0; i < roles.length; i++) {
                    setActiveRole(i);
                    await new Promise(r => setTimeout(r, 2000));
                    if (cancelled) break;
                }
                await new Promise(r => setTimeout(r, 1000));
            }
        };
        run();
        return () => { cancelled = true; };
    }, []);

    return (
        <div className="bg-[#f8fafc] rounded-2xl border border-gray-200 overflow-hidden relative" style={{ height: 340 }}>
            {/* SaaS App Header */}
            <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm z-10 relative">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">P</div>
                    <span className="text-[14px] font-bold text-gray-800">Platform Portal</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-[11px] font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {roles[activeRole]} View
                    </div>
                </div>
            </div>

            <div className="flex h-full p-4 gap-4">
                {/* Embedded Dashboard Container */}
                <div className="flex-1 bg-white rounded-xl border border-dashed border-gray-300 relative overflow-hidden flex flex-col">
                    {/* JWT Flow Overlay */}
                    <AnimatePresence>
                        {authStep < 2 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-white/90 z-20 flex flex-col items-center justify-center"
                            >
                                <motion.div
                                    animate={{
                                        scale: authStep === 1 ? [1, 1.05, 1] : 1,
                                        rotate: authStep === 1 ? [0, 5, -5, 0] : 0
                                    }}
                                    transition={{ repeat: Infinity, duration: 1 }}
                                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${authStep === 1 ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-400'}`}
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                        <path d="M7 11V7a5 5 0 0110 0v4" />
                                    </svg>
                                </motion.div>
                                <p className="text-[12px] font-semibold text-gray-700">
                                    {authStep === 0 ? 'Establishing Secure Connection...' : 'Generating JWT Access Token...'}
                                </p>
                                {authStep === 1 && (
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "120px" }}
                                        className="h-1 bg-indigo-600 mt-3 rounded-full"
                                    />
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* The actual Superset Dashboard Mock */}
                    <div className="p-4 flex-1">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-[13px] font-bold text-gray-800">Operational Performance</h4>
                            <div className="flex gap-1">
                                <span className="w-2 h-2 rounded-full bg-green-500" />
                                <span className="text-[9px] text-gray-400 uppercase font-bold tracking-tight">Embedded Active</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                                <span className="text-[10px] text-gray-500 block">Total Revenue</span>
                                <span className="text-[16px] font-black text-gray-800">$1.2M</span>
                                <div className="h-1 w-full bg-indigo-100 mt-2 rounded-full relative overflow-hidden">
                                    <motion.div
                                        animate={{ width: activeRole === 0 ? "80%" : activeRole === 1 ? "60%" : "30%" }}
                                        className="absolute top-0 left-0 h-full bg-indigo-500"
                                    />
                                </div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                                <span className="text-[10px] text-gray-500 block">Active Users</span>
                                <span className="text-[16px] font-black text-gray-800">4,821</span>
                                <div className="h-1 w-full bg-green-100 mt-2 rounded-full relative overflow-hidden">
                                    <motion.div
                                        animate={{ width: activeRole === 0 ? "90%" : activeRole === 1 ? "40%" : "20%" }}
                                        className="absolute top-0 left-0 h-full bg-green-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Chart Area */}
                        <div className="flex-1 bg-gray-50 rounded-lg border border-gray-100 p-4 flex items-end justify-between gap-1 overflow-hidden min-h-[100px]">
                            {[...Array(12)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        height: `${20 + Math.random() * 60}%`,
                                        backgroundColor: i % 2 === 0 ? "#4f46e5" : "#10b981",
                                        opacity: i > (activeRole === 0 ? 12 : activeRole === 1 ? 6 : 3) ? 0.2 : 0.8
                                    }}
                                    transition={{ duration: 0.5 }}
                                    className="flex-1 rounded-sm"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Row Level Security info */}
                    <div className="bg-indigo-900 px-4 py-2 flex items-center justify-between">
                        <span className="text-[10px] text-indigo-200 font-medium">Row-Level Security (RLS) Active</span>
                        <span className="text-[9px] text-indigo-50 px-2 py-0.5 rounded bg-white/10">
                            Filtering: {roles[activeRole]} Group
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════
   5. THEMING & UX OVERHAUL
   Shows: Theme picker, live preview of color changes
   ═══════════════════════════════════════════════════════ */
const THEMES = [
    { name: 'Brand Dark', bg: '#1a1a2e', header: '#16213e', accent: '#e94560', text: '#eee' },
    { name: 'Ocean Blue', bg: '#0f2027', header: '#203a43', accent: '#2196f3', text: '#e8f4fd' },
    { name: 'Forest', bg: '#1a2d1a', header: '#2d4a2d', accent: '#4caf50', text: '#e8f5e9' },
    { name: 'Corp Light', bg: '#f8fafc', header: '#ffffff', accent: '#5c6bc0', text: '#1a202c' },
];

export function ThemingIllustration() {
    const [themeIndex, setThemeIndex] = useState(0);
    const themes = [
        { name: 'Default Superset', primary: '#E8501A', bg: '#ffffff', text: '#333333', card: '#f9f9f9' },
        { name: 'Midnight Corporate', primary: '#3b82f6', bg: '#0f172a', text: '#f8fafc', card: '#1e293b' },
        { name: 'Forest Analytics', primary: '#10b981', bg: '#064e3b', text: '#ecfdf5', card: '#065f46' },
        { name: 'Woodfrog Brand', primary: '#E8501A', bg: '#111111', text: '#ffffff', card: '#1f1f1f' }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setThemeIndex(prev => (prev + 1) % themes.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    const t = themes[themeIndex];

    return (
        <div className="rounded-2xl border border-gray-200 overflow-hidden flex flex-col transition-colors duration-500" style={{ height: 340, backgroundColor: t.bg }}>
            {/* Theme Toolbar */}
            <div className="bg-black/5 backdrop-blur-md border-b border-white/10 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <motion.div animate={{ backgroundColor: t.primary }} className="w-2 h-2 rounded-full" />
                    <span className="text-[12px] font-bold" style={{ color: t.text }}>Theme Designer</span>
                </div>
                <div className="flex gap-2">
                    {themes.map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{ scale: themeIndex === i ? 1.2 : 1 }}
                            className={`w-3 h-3 rounded-full border ${themeIndex === i ? 'ring-2 ring-indigo-400 ring-offset-2' : ''}`}
                            style={{ backgroundColor: themes[i].primary }}
                        />
                    ))}
                </div>
            </div>

            <div className="flex-1 flex gap-4 p-4">
                {/* Branding Panel */}
                <motion.div
                    animate={{ backgroundColor: t.card }}
                    className="w-1/3 rounded-xl p-4 border border-white/5 flex flex-col gap-3 shadow-md"
                >
                    <div className="space-y-1">
                        <div className="h-2 w-12 rounded bg-gray-400/20" />
                        <motion.div
                            animate={{ backgroundColor: t.primary }}
                            className="h-10 w-full rounded-lg shadow-lg flex items-center justify-center text-[10px] font-bold uppercase tracking-wider text-white"
                        >
                            Primary color
                        </motion.div>
                    </div>
                    <div className="space-y-3 pt-2 border-t border-white/10">
                        <div className="flex justify-between items-center">
                            <span className="text-[9px] opacity-40" style={{ color: t.text }}>Variable</span>
                            <span className="text-[9px] font-mono opacity-80" style={{ color: t.text }}>--brand-color</span>
                        </div>
                        <div className="h-6 w-full rounded bg-black/20 flex items-center px-2">
                            <span className="text-[10px] font-mono" style={{ color: t.primary }}>{t.primary}</span>
                        </div>
                    </div>
                </motion.div>

                {/* Dashboard Preview */}
                <motion.div
                    animate={{ backgroundColor: t.card }}
                    className="flex-1 rounded-xl p-4 border border-white/5 flex flex-col shadow-md"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <motion.div animate={{ backgroundColor: t.primary }} className="w-10 h-10 rounded-full" />
                        <div className="flex-1 space-y-1">
                            <motion.div animate={{ backgroundColor: t.text }} className="h-3 w-3/4 rounded opacity-20" />
                            <motion.div animate={{ backgroundColor: t.text }} className="h-2 w-1/2 rounded opacity-10" />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 flex-1">
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    height: `${40 + Math.sin(i + themeIndex) * 20}%`,
                                    backgroundColor: i === 1 ? t.primary : t.text,
                                    opacity: i === 1 ? 0.9 : 0.05
                                }}
                                className="rounded-md self-end"
                            />
                        ))}
                    </div>

                    <div className="mt-4 flex items-center justify-center">
                        <motion.div
                            animate={{ borderColor: t.primary, color: t.text }}
                            className="px-4 py-1.5 rounded-full border-2 text-[10px] font-bold uppercase"
                        >
                            Update Layout
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════
   6. ADVANCED SECURITY & ROLE MANAGEMENT
   Shows: RBAC matrix, SSO token flow
   ═══════════════════════════════════════════════════════ */
const RBAC_ROLES = ['Admin', 'Data Team', 'Sales', 'Executive', 'Guest'];
const PERMISSIONS = ['View', 'Edit', 'Export', 'Admin', 'Query'];

export function SecurityRoleIllustration() {
    const [highlightRow, setHighlightRow] = useState(0);
    const [ssoActive, setSsoActive] = useState(false);

    useEffect(() => {
        let cancelled = false;
        const run = async () => {
            setSsoActive(false);
            for (let i = 0; i < RBAC_ROLES.length; i++) {
                if (cancelled) return;
                setHighlightRow(i);
                await new Promise(r => setTimeout(r, 900));
            }
            setSsoActive(true);
            await new Promise(r => setTimeout(r, 2000));
            if (!cancelled) run();
        };
        run();
        return () => { cancelled = true; };
    }, []);

    const matrix: boolean[][] = [
        [true, true, true, true, true],
        [true, true, true, false, true],
        [true, false, true, false, false],
        [true, false, false, false, false],
        [true, false, false, false, false],
    ];

    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden" style={{ height: 340 }}>
            <div className="bg-gray-50 border-b border-gray-100 px-4 py-3 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: SUPERSET_ORANGE }} />
                <span className="text-[12px] font-semibold text-gray-700">RBAC & SSO Configuration</span>
                {ssoActive && (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="ml-auto text-[10px] text-green-600 font-medium flex items-center gap-1">
                        <StatusDot /> SSO Active
                    </motion.span>
                )}
            </div>
            <div className="p-4">
                {/* Permission matrix */}
                <div className="overflow-hidden rounded-lg border border-gray-100">
                    <table className="w-full text-[10px]">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="py-1.5 px-2 text-left text-gray-500 font-semibold">Role</th>
                                {PERMISSIONS.map(p => (
                                    <th key={p} className="py-1.5 px-1 text-center text-gray-500 font-semibold">{p}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {RBAC_ROLES.map((role, ri) => (
                                <motion.tr key={role}
                                    animate={{ backgroundColor: highlightRow === ri ? SUPERSET_ORANGE_LIGHT : '#fff' }}
                                    className="border-b border-gray-50 last:border-0">
                                    <td className="py-1.5 px-2 font-semibold" style={{ color: highlightRow === ri ? SUPERSET_ORANGE : '#374151' }}>
                                        {role}
                                    </td>
                                    {matrix[ri].map((allowed, pi) => (
                                        <td key={pi} className="py-1.5 px-1 text-center">
                                            <span className={allowed ? 'text-green-500' : 'text-gray-200'}>{allowed ? '✓' : '✗'}</span>
                                        </td>
                                    ))}
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* SSO flow */}
                <div className="mt-3 flex items-center gap-2">
                    {['OAuth/SAML', '→', 'Identity Provider', '→', 'Superset Roles', '→', 'Row-Level Filter'].map((step, i) => (
                        <motion.span key={i}
                            initial={{ opacity: 0 }} animate={{ opacity: ssoActive ? 1 : 0.3 }}
                            transition={{ delay: i * 0.1 }}
                            className={`text-[9px] font-medium ${step === '→' ? 'text-gray-300' : 'text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded'}`}>
                            {step}
                        </motion.span>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════
   7. CUSTOM ALERTS & AUTOMATION
   Shows: Alert rule builder, triggered notification cards
   ═══════════════════════════════════════════════════════ */
const ALERT_NOTIFICATIONS = [
    { icon: '🔔', title: 'Revenue dropped below threshold', channel: 'Slack #ops', severity: 'warning', time: '09:42' },
    { icon: '📊', title: 'Weekly KPI report ready', channel: 'Email digest', severity: 'info', time: '10:00' },
    { icon: '⚠️', title: 'Inventory anomaly detected (ML)', channel: 'Slack #alerts', severity: 'critical', time: '10:18' },
];

export function AlertsAutomationIllustration() {
    const [visibleAlerts, setVisibleAlerts] = useState(0);
    const [ruleActive, setRuleActive] = useState(false);

    useEffect(() => {
        let cancelled = false;
        const run = async () => {
            setVisibleAlerts(0);
            setRuleActive(false);
            await new Promise(r => setTimeout(r, 800));
            if (cancelled) return;
            setRuleActive(true);
            for (let i = 1; i <= ALERT_NOTIFICATIONS.length; i++) {
                if (cancelled) return;
                await new Promise(r => setTimeout(r, 1200));
                setVisibleAlerts(i);
            }
            await new Promise(r => setTimeout(r, 2500));
            if (!cancelled) run();
        };
        run();
        return () => { cancelled = true; };
    }, []);

    const severityStyle: Record<string, string> = {
        warning: 'bg-amber-50 text-amber-600',
        info: 'bg-blue-50 text-blue-600',
        critical: 'bg-red-50 text-red-500',
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden" style={{ height: 340 }}>
            <div className="bg-gray-50 border-b border-gray-100 px-4 py-3 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: SUPERSET_ORANGE }} />
                <span className="text-[12px] font-semibold text-gray-700">Alert Rules & Automation</span>
            </div>
            <div className="p-4 space-y-3">
                {/* Rule card */}
                <div className="rounded-xl border border-gray-100 p-3 bg-gray-50">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="text-[10px] font-semibold text-gray-600">Rule Engine</div>
                        <motion.div animate={{ backgroundColor: ruleActive ? '#22c55e' : '#d1d5db' }}
                            className="w-1.5 h-1.5 rounded-full ml-auto" />
                        <span className="text-[9px] text-gray-400">{ruleActive ? 'Listening' : 'Starting...'}</span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {['IF revenue < $50k', 'AND daily_drop > 15%', 'THEN notify + log'].map(r => (
                            <span key={r} className="text-[9px] bg-white border border-gray-200 px-2 py-0.5 rounded-md text-gray-600">{r}</span>
                        ))}
                    </div>
                </div>

                {/* Triggered alerts */}
                <div className="space-y-2">
                    <AnimatePresence>
                        {ALERT_NOTIFICATIONS.slice(0, visibleAlerts).map((alert, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: -10, scale: 0.97 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className="rounded-xl border border-gray-100 p-3 flex items-start gap-3 bg-white shadow-sm">
                                <span className="text-lg">{alert.icon}</span>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[11px] font-semibold text-gray-800 truncate">{alert.title}</p>
                                    <p className="text-[10px] text-gray-400 mt-0.5">via {alert.channel}</p>
                                </div>
                                <div className="flex flex-col items-end gap-1 shrink-0">
                                    <span className={`text-[8px] font-semibold px-1.5 py-0.5 rounded-full ${severityStyle[alert.severity]}`}>
                                        {alert.severity}
                                    </span>
                                    <span className="text-[9px] text-gray-300">{alert.time}</span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════
   8. ANALYTICS & DASHBOARD DESIGN
   Shows: Dashboard being assembled — KPI cards + charts appearing
   ═══════════════════════════════════════════════════════ */
export function DashboardDesignIllustration() {
    const [assembling, setAssembling] = useState(true);
    const [dataPulse, setDataPulse] = useState(false);

    useEffect(() => {
        let cancelled = false;
        const run = async () => {
            while (!cancelled) {
                setAssembling(true);
                setDataPulse(false);
                await new Promise(r => setTimeout(r, 3000));

                if (cancelled) break;
                setAssembling(false);
                await new Promise(r => setTimeout(r, 800));

                if (cancelled) break;
                setDataPulse(true);
                await new Promise(r => setTimeout(r, 4000));
            }
        };
        run();
        return () => { cancelled = true; };
    }, []);

    return (
        <div className="bg-[#f1f5f9] rounded-2xl border border-gray-200 overflow-hidden flex flex-col" style={{ height: 340 }}>
            {/* Design Studio Header */}
            <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-500" />
                    <span className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">Dashboard Studio</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className={`px-2 py-0.5 rounded text-[9px] font-bold ${assembling ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                        {assembling ? 'ASSEMBLING...' : 'LIVE DATA'}
                    </div>
                </div>
            </div>

            <div className="flex-1 p-4 flex flex-col gap-3 relative overflow-hidden">
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '16px 16px' }} />

                {/* KPI Row */}
                <div className="grid grid-cols-3 gap-3">
                    {[
                        { label: 'Revenue', val: '₹14.2M', color: 'text-orange-600' },
                        { label: 'Conversion', val: '3.82%', color: 'text-indigo-600' },
                        { label: 'Churn', val: '1.2%', color: 'text-red-500' }
                    ].map((k, i) => (
                        <motion.div
                            key={i}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{
                                y: assembling ? (20 + i * 5) : 0,
                                opacity: assembling ? 0 : 1,
                                scale: dataPulse ? [1, 1.02, 1] : 1
                            }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="bg-white rounded-xl p-3 shadow-sm border border-gray-100"
                        >
                            <span className="text-[9px] font-bold text-gray-400 uppercase">{k.label}</span>
                            <div className={`text-[15px] font-black ${k.color}`}>{k.val}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex gap-3">
                    {/* Primary Chart */}
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{
                            x: assembling ? -20 : 0,
                            opacity: assembling ? 0 : 1
                        }}
                        transition={{ delay: 0.4 }}
                        className="flex-[2] bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="h-2 w-24 bg-gray-100 rounded" />
                            <div className="h-2 w-8 bg-orange-100 rounded" />
                        </div>
                        <div className="flex-1 flex items-end gap-1.5 relative">
                            {/* Data Pulse Effect */}
                            {dataPulse && (
                                <motion.div
                                    animate={{ left: ['0%', '100%'], opacity: [0, 1, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-orange-400/0 via-orange-400/20 to-orange-400/0 z-10"
                                />
                            )}
                            {[...Array(15)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{ height: `${30 + Math.random() * 60}%` }}
                                    transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
                                    className="flex-1 bg-orange-500/20 rounded-t-sm border-t-2 border-orange-500/40"
                                />
                            ))}
                        </div>
                    </motion.div>

                    {/* Sidebar components */}
                    <div className="flex-1 flex flex-col gap-3">
                        <motion.div
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: assembling ? 20 : 0, opacity: assembling ? 0 : 1 }}
                            transition={{ delay: 0.6 }}
                            className="flex-1 bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex flex-col justify-center"
                        >
                            <div className="h-2 w-full bg-gray-50 rounded mb-2" />
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full border-4 border-orange-500 border-t-transparent animate-spin" />
                                <span className="text-[10px] font-bold text-gray-400">SYNCING</span>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: assembling ? 20 : 0, opacity: assembling ? 0 : 1 }}
                            transition={{ delay: 0.8 }}
                            className="flex-1 bg-indigo-600 rounded-xl p-3 shadow-lg flex flex-col items-center justify-center text-white"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M12 19v-7M12 8h.01M3.31 18.9c1.5 2.5 4.5 4.1 7.69 4.1 3.19 0 6.19-1.6 7.69-4.1l1.5-2.5c.3-.5.3-1.1 0-1.6l-1.5-2.5c-1.5-2.5-4.5-4.1-7.69-4.1-3.19 0-6.19 1.6-7.69 4.1l-1.5 2.5c-.3.5-.3 1.1 0 1.6l1.5 2.5z" />
                                <path d="M5 12a10 10 0 1120 0 10 10 0 01-20 0z" />
                            </svg>
                            <span className="text-[9px] font-black uppercase mt-1 tracking-widest">Insights</span>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Design Controls Footer */}
            <div className="bg-gray-50 border-t border-gray-200 px-4 py-2 flex items-center justify-between gap-4">
                <div className="flex gap-2">
                    <div className="w-4 h-4 rounded bg-gray-200" />
                    <div className="w-4 h-4 rounded bg-gray-200" />
                    <div className="w-4 h-4 rounded bg-gray-200" />
                </div>
                <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                        animate={{ width: assembling ? ['0%', '100%'] : '100%' }}
                        transition={{ duration: 3, ease: 'easeInOut' }}
                        className="h-full bg-orange-500"
                    />
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════
   9. WORKFLOW AUTOMATION & LLM INTEGRATION
   Shows: Text-to-SQL conversation - user types natural language, SQL generated, chart appears
   ═══════════════════════════════════════════════════════ */
const NL_QUERY = 'Show me top 5 sales reps by revenue this quarter';
const SQL_RESULT = `SELECT rep_name, SUM(revenue) as total FROM sales\nWHERE quarter = 'Q1_2025' GROUP BY rep_name\nORDER BY total DESC LIMIT 5`;

export function WorkflowLLMIllustration() {
    const [phase, setPhase] = useState<'idle' | 'typing' | 'generating' | 'chart'>('idle');
    const [typedQuery, setTypedQuery] = useState('');
    const [typedSQL, setTypedSQL] = useState('');

    useEffect(() => {
        let cancelled = false;
        const wait = (ms: number) => new Promise(r => setTimeout(r, ms));

        const run = async () => {
            setPhase('idle'); setTypedQuery(''); setTypedSQL('');
            await wait(1000);
            if (cancelled) return;

            // 1. Type natural language query
            setPhase('typing');
            for (let i = 0; i <= NL_QUERY.length; i++) {
                if (cancelled) return;
                setTypedQuery(NL_QUERY.slice(0, i));
                await wait(38 + Math.random() * 20);
            }
            await wait(600);
            if (cancelled) return;

            // 2. Generate SQL
            setPhase('generating');
            for (let i = 0; i <= SQL_RESULT.length; i++) {
                if (cancelled) return;
                setTypedSQL(SQL_RESULT.slice(0, i));
                await wait(12);
            }
            await wait(800);
            if (cancelled) return;

            // 3. Show chart
            setPhase('chart');
            await wait(3500);
            if (!cancelled) run();
        };

        run();
        return () => { cancelled = true; };
    }, []);

    const BAR_DATA = [
        { name: 'Priya S.', val: 94 },
        { name: 'Rahul K.', val: 82 },
        { name: 'Anita M.', val: 76 },
        { name: 'Dev R.', val: 65 },
        { name: 'Kiran T.', val: 58 },
    ];

    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden" style={{ height: 340 }}>
            <div className="bg-gray-50 border-b border-gray-100 px-4 py-3 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: SUPERSET_ORANGE }} />
                <span className="text-[12px] font-semibold text-gray-700">Text-to-SQL (LLM Integration)</span>
            </div>
            <div className="p-3 space-y-1.5">
                {/* NL input box */}
                <div className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 flex items-center gap-2 min-h-[32px]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={SUPERSET_ORANGE} strokeWidth="2.5">
                        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                    </svg>
                    <span className="text-[11px] text-gray-700 flex-1">
                        {typedQuery}
                        {(phase === 'typing') && (
                            <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }}
                                className="inline-block w-[2px] h-[12px] bg-gray-500 ml-0.5 align-middle" />
                        )}
                        {phase === 'idle' && <span className="text-gray-300">Ask a question in plain language...</span>}
                    </span>
                </div>

                {/* SQL output */}
                <AnimatePresence>
                    {(phase === 'generating' || phase === 'chart') && (
                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                            className="rounded-xl bg-[#0d1117] p-2 overflow-hidden">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-[9px] text-blue-400 font-mono font-semibold">SQL</span>
                                <span className="text-[9px] text-gray-600">Generated by LLM</span>
                            </div>
                            <pre className="text-[9px] text-green-300 font-mono leading-tight whitespace-pre-wrap">
                                {typedSQL}
                            </pre>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Chart result */}
                <AnimatePresence>
                    {phase === 'chart' && (
                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                            className="rounded-xl border border-gray-100 p-2 shadow-sm bg-white">
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-[9px] text-gray-400 font-bold uppercase">Top Sales Reps - Q1</p>
                                <span className="text-[8px] bg-orange-50 text-orange-600 px-1.5 py-0.5 rounded font-bold">LIVE DATA</span>
                            </div>
                            <div className="space-y-1.5">
                                {BAR_DATA.map((d, i) => (
                                    <motion.div 
                                        key={d.name} 
                                        initial={{ opacity: 0, x: -5 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: SUPERSET_ORANGE }} />
                                            <span className="text-[10px] text-gray-600 font-medium">{d.name}</span>
                                        </div>
                                        <span className="text-[10px] font-bold text-gray-900">₹{d.val}L</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════
   EXPERIENCE ILLUSTRATIONS
   ═══════════════════════════════════════════════════════ */

export function TextToSQLIllustration() {
    const [phase, setPhase] = useState<'idle' | 'typing' | 'generating' | 'chart'>('idle');
    const [typedQuery, setTypedQuery] = useState('');
    const [typedSQL, setTypedSQL] = useState('');

    const QUERY = 'Compare last month\'s sales by category';
    const SQL = 'SELECT category, SUM(sales) as total FROM orders\nWHERE date >= "2025-01-01" GROUP BY category\nORDER BY total DESC';

    useEffect(() => {
        let cancelled = false;
        const wait = (ms: number) => new Promise(r => setTimeout(r, ms));

        const run = async () => {
            setPhase('idle'); setTypedQuery(''); setTypedSQL('');
            await wait(1200);
            if (cancelled) return;

            setPhase('typing');
            for (let i = 0; i <= QUERY.length; i++) {
                if (cancelled) return;
                setTypedQuery(QUERY.slice(0, i));
                await wait(35 + Math.random() * 25);
            }
            await wait(700);

            setPhase('generating');
            for (let i = 0; i <= SQL.length; i++) {
                if (cancelled) return;
                setTypedSQL(SQL.slice(0, i));
                await wait(12);
            }
            await wait(900);

            setPhase('chart');
            await wait(3500);
            if (!cancelled) run();
        };

        run();
        return () => { cancelled = true; };
    }, []);

    return (
        <div className="bg-[#fcfcfb] rounded-2xl border border-gray-100 overflow-hidden flex flex-col relative" style={{ height: 340 }}>
            <div className="bg-white border-b border-gray-100 px-4 py-2.5 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: SUPERSET_ORANGE }} />
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Natural Language Query</span>
                </div>
            </div>

            <div className="p-3 space-y-1.5">
                {/* Input Area */}
                <div className="bg-gray-50 rounded-xl p-2 border border-gray-100 flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={SUPERSET_ORANGE} strokeWidth="2.5">
                            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                        </svg>
                    </div>
                    <div className="text-[12px] font-medium text-gray-700">
                        {typedQuery}
                        {phase === 'typing' && <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} className="inline-block w-[2px] h-[14px] bg-orange-500 ml-0.5 align-middle" />}
                    </div>
                </div>

                {/* SQL Area */}
                <AnimatePresence>
                    {(phase === 'generating' || phase === 'chart') && (
                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            className="bg-[#0d1117] rounded-xl p-2 font-mono">
                            <div className="text-[9px] text-blue-400 mb-0.5 font-bold opacity-80 uppercase tracking-tighter">Generated SQL</div>
                            <pre className="text-[9px] text-green-300 leading-tight whitespace-pre">
                                {typedSQL}
                            </pre>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Result Area */}
                <AnimatePresence>
                    {phase === 'chart' && (
                        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-xl border border-gray-100 p-2 shadow-sm">
                            <div className="flex justify-between items-center mb-1">
                                <div className="text-[9px] text-gray-400 font-bold uppercase">Query Results</div>
                                <div className="text-[8px] text-green-500 font-bold">4 ROWS RETURNED</div>
                            </div>
                            <div className="space-y-0.5">
                                {[
                                    { label: 'Electronics', val: '$42,500' },
                                    { label: 'Furniture', val: '$31,200' },
                                    { label: 'Apparel', val: '$18,900' },
                                    { label: 'Accessories', val: '$12,400' }
                                ].map((d, i) => (
                                    <motion.div 
                                        key={i} 
                                        initial={{ opacity: 0, x: -5 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex justify-between items-center py-0.5 border-b border-gray-50 last:border-0"
                                    >
                                        <span className="text-[10px] text-gray-600 font-medium">{d.label}</span>
                                        <span className="text-[10px] text-gray-900 font-bold">{d.val}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export function CustomAlertsFeatureIllustration() {
    const [activeAlert, setActiveAlert] = useState(0);

    const ALERTS = [
        { id: 1, title: 'Revenue Target Met', msg: 'Daily revenue crossed $50,000 threshold', time: '10:42 AM', type: 'success' },
        { id: 2, title: 'Low Inventory Alert', msg: 'Stock for SKU-7821 is below 5 units', time: '09:15 AM', type: 'warning' },
        { id: 3, title: 'Abnormal Traffic', msg: 'Traffic from region "East" is 3x higher', time: 'Yesterday', type: 'info' }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveAlert(prev => (prev + 1) % ALERTS.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col shadow-sm" style={{ height: 340 }}>
            <div className="bg-gray-50 border-b border-gray-100 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                    <span className="text-[11px] font-bold text-gray-700 uppercase tracking-widest">Event Visibility Panel</span>
                </div>
                <div className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                    <span className="text-[9px] font-bold text-red-500">LIVE</span>
                </div>
            </div>

            <div className="flex-1 p-4 flex gap-4 overflow-hidden bg-[#fbfbfb]">
                {/* Alert List */}
                <div className="w-1/2 flex flex-col gap-2">
                    {ALERTS.map((alert, i) => (
                        <motion.div
                            key={alert.id}
                            animate={{
                                backgroundColor: activeAlert === i ? '#fff' : 'transparent',
                                borderColor: activeAlert === i ? '#eee' : 'transparent',
                                opacity: activeAlert === i ? 1 : 0.6
                            }}
                            className="p-3 rounded-xl border transition-all duration-300"
                        >
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-[10px] font-bold text-gray-800">{alert.title}</span>
                                <span className="text-[8px] text-gray-400 font-medium">{alert.time}</span>
                            </div>
                            <div className="text-[9px] text-gray-500 truncate">{alert.msg}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Detail View */}
                <div className="flex-1 bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex flex-col">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeAlert}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="space-y-4"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                    ALERTS[activeAlert].type === 'success' ? 'bg-green-50 text-green-500' :
                                    ALERTS[activeAlert].type === 'warning' ? 'bg-amber-50 text-amber-500' :
                                    'bg-blue-50 text-blue-500'
                                }`}>
                                    {ALERTS[activeAlert].type === 'success' ? '✓' : '!'}
                                </div>
                                <div>
                                    <div className="text-[12px] font-bold text-gray-900">{ALERTS[activeAlert].title}</div>
                                    <div className="text-[9px] text-gray-400 font-medium uppercase tracking-tighter">Event Details</div>
                                </div>
                            </div>

                            <p className="text-[11px] text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
                                {ALERTS[activeAlert].msg}. This event was automatically detected by the custom monitoring plugin.
                            </p>

                            <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                                <div className="text-[9px] font-bold text-gray-400">STATUS: RESOLVED</div>
                                <div className="px-3 py-1 rounded-full bg-gray-900 text-white text-[9px] font-bold">View History</div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

export function WhaleChartIllustration() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col shadow-sm" style={{ height: 340 }}>
            <div className="bg-gray-50 border-b border-gray-100 px-4 py-3">
                <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                    <span className="text-[11px] font-bold text-gray-700 uppercase tracking-widest">Cumulative Profitability (Whale Chart)</span>
                </div>
            </div>

            <div className="flex-1 p-8 flex flex-col">
                <div className="flex-1 relative">
                    {/* Y-Axis Label */}
                    <div className="absolute -left-10 top-1/2 -rotate-90 text-[7px] text-gray-400 font-bold uppercase tracking-widest">
                        Cumulative Profit (%)
                    </div>

                    {/* Grid lines */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                        {[0, 20, 40, 60, 80, 100].map(i => (
                            <div key={i} className="border-t border-gray-50 w-full flex items-center">
                                <span className="text-[7px] text-gray-300 font-mono -ml-6">{100-i}%</span>
                            </div>
                        ))}
                    </div>

                    {/* Whale Curve SVG */}
                    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="whaleGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={SUPERSET_ORANGE} stopOpacity="0.25" />
                                <stop offset="70%" stopColor={SUPERSET_ORANGE} stopOpacity="0.05" />
                                <stop offset="100%" stopColor={SUPERSET_ORANGE} stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        
                        {/* Shaded Area */}
                        <motion.path
                            d="M 0 100 C 5 80, 15 10, 35 5 C 55 0, 75 70, 100 85 L 100 100 L 0 100"
                            fill="url(#whaleGradient)"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.2 }}
                        />

                        {/* Peak Line */}
                        <motion.line 
                            x1="35" y1="5" x2="35" y2="100"
                            stroke="#e5e7eb" strokeDasharray="2 2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5 }}
                        />

                        {/* The Curve */}
                        <motion.path
                            d="M 0 100 C 5 80, 15 10, 35 5 C 55 0, 75 70, 100 85"
                            fill="none"
                            stroke={SUPERSET_ORANGE}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2.5, ease: "easeInOut" }}
                        />

                        {/* Peak Point */}
                        <motion.circle
                            cx="35" cy="5" r="3"
                            fill="#fff"
                            stroke={SUPERSET_ORANGE}
                            strokeWidth="2"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 2, type: 'spring' }}
                        />
                    </svg>

                    {/* Annotations */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 2.2 }}
                        className="absolute top-2 left-[40%] bg-white rounded-lg p-2.5 shadow-lg border border-gray-100 z-10 max-w-[130px]"
                    >
                        <div className="text-[9px] text-orange-600 font-bold mb-0.5 uppercase tracking-tighter">Profit Peak</div>
                        <div className="text-[8px] text-gray-500 font-medium leading-tight">
                            Maximum cumulative profit reached at top 35% of customers.
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 2.8 }}
                        className="absolute bottom-12 right-0 text-right"
                    >
                        <div className="text-[9px] text-red-500 font-bold uppercase tracking-tighter italic">Erosion Zone</div>
                        <div className="text-[8px] text-gray-400 font-medium leading-snug">
                            Unprofitable segments<br/>eroding total margin by 15%
                        </div>
                    </motion.div>
                </div>

                {/* X-Axis */}
                <div className="h-8 border-t border-gray-100 mt-6 flex justify-between items-center text-[8px] text-gray-400 font-bold px-2">
                    <div className="flex flex-col">
                        <span>Most Profitable</span>
                        <span className="text-[7px] opacity-60 font-normal">Customer Ranking</span>
                    </div>
                    <div className="h-1.5 w-32 bg-gray-50 rounded-full relative overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 2.5 }}
                            className="absolute inset-0 bg-gradient-to-r from-orange-500 via-orange-400 to-red-400 opacity-20" 
                        />
                    </div>
                    <span>Least Profitable</span>
                </div>
            </div>
        </div>
    );
}

export function FinancialReportIllustration() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col shadow-sm" style={{ height: 340 }}>
            <div className="bg-gray-50 border-b border-gray-100 px-4 py-3">
                <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                    <span className="text-[11px] font-bold text-gray-700 uppercase tracking-widest">Financial Reporting View</span>
                </div>
            </div>

            <div className="flex-1 p-4 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-100">
                            <th className="py-2 text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Line Item</th>
                            <th className="py-2 text-[10px] font-bold text-gray-400 uppercase tracking-tighter text-right">Q4 2024</th>
                            <th className="py-2 text-[10px] font-bold text-gray-400 uppercase tracking-tighter text-right">Q4 2025</th>
                            <th className="py-2 text-[10px] font-bold text-gray-400 uppercase tracking-tighter text-right">% Δ</th>
                        </tr>
                    </thead>
                    <tbody className="text-[11px]">
                        {[
                            { name: 'Operating Revenue', q4: '$4.2M', q5: '$5.1M', delta: '+21.4%', bold: true, indent: 0 },
                            { name: 'Product Sales', q4: '$2.8M', q5: '$3.5M', delta: '+25.0%', bold: false, indent: 4 },
                            { name: 'Service Contracts', q4: '$1.4M', q5: '$1.6M', delta: '+14.3%', bold: false, indent: 4 },
                            { name: 'Cost of Goods Sold', q4: '($1.2M)', q5: '($1.5M)', delta: '+25.0%', bold: false, indent: 0 },
                            { name: 'Gross Margin', q4: '$3.0M', q5: '$3.6M', delta: '+20.0%', bold: true, indent: 0, highlight: true },
                            { name: 'Operating Expenses', q4: '($1.8M)', q5: '($2.0M)', delta: '+11.1%', bold: false, indent: 0 },
                            { name: 'EBITDA', q4: '$1.2M', q5: '$1.6M', delta: '+33.3%', bold: true, indent: 0 }
                        ].map((row, i) => (
                            <motion.tr
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={`border-b border-gray-50 last:border-0 ${row.highlight ? 'bg-orange-50/30' : ''}`}
                            >
                                <td className={`py-2 ${row.bold ? 'font-black text-gray-900' : 'text-gray-600'}`} style={{ paddingLeft: row.indent }}>
                                    {row.name}
                                </td>
                                <td className="py-2 text-right font-medium text-gray-700">{row.q4}</td>
                                <td className="py-2 text-right font-medium text-gray-700">{row.q5}</td>
                                <td className={`py-2 text-right font-bold ${row.delta.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                                    {row.delta}
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="bg-gray-50 p-2 flex items-center justify-end gap-3 border-t border-gray-100">
                <div className="flex gap-1">
                    {[1, 2, 3].map(i => <div key={i} className="w-4 h-4 rounded bg-white shadow-sm border border-gray-200" />)}
                </div>
                <div className="text-[9px] font-bold text-gray-400">PDF EXPORT READY</div>
            </div>
        </div>
    );
}

export function MekkoChartIllustration() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col shadow-sm" style={{ height: 340 }}>
            <div className="bg-gray-50 border-b border-gray-100 px-4 py-3">
                <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                    <span className="text-[11px] font-bold text-gray-700 uppercase tracking-widest">Multi-Dimensional Analysis (Mekko)</span>
                </div>
            </div>

            <div className="flex-1 p-6 flex flex-col gap-4">
                <div className="flex-1 flex items-stretch gap-1">
                    {[
                        { label: 'Market A', width: '45%', segments: [60, 25, 15], colors: ['#E8501A', '#fca311', '#14213d'] },
                        { label: 'Market B', width: '30%', segments: [40, 35, 25], colors: ['#E8501A', '#fca311', '#14213d'] },
                        { label: 'Market C', width: '25%', segments: [20, 45, 35], colors: ['#E8501A', '#fca311', '#14213d'] }
                    ].map((col, i) => (
                        <motion.div
                            key={i}
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: col.width, opacity: 1 }}
                            transition={{ delay: i * 0.2, duration: 0.8 }}
                            className="flex flex-col gap-1 overflow-hidden"
                        >
                            {col.segments.map((s, j) => (
                                <motion.div
                                    key={j}
                                    initial={{ flex: 0 }}
                                    animate={{ flex: s }}
                                    transition={{ delay: 0.5 + (i * 0.1) + (j * 0.1), duration: 0.6 }}
                                    className="relative group rounded-sm"
                                    style={{ backgroundColor: col.colors[j], opacity: 0.9 - (j * 0.2) }}
                                >
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-[9px] font-black text-white/40 group-hover:text-white transition-colors">{s}%</span>
                                    </div>
                                </motion.div>
                            ))}
                            <div className="text-[9px] font-bold text-gray-400 text-center mt-2 uppercase">{col.label}</div>
                        </motion.div>
                    ))}
                </div>

                <div className="flex items-center gap-4 pt-2 border-t border-gray-50">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#E8501A]" />
                        <span className="text-[9px] font-bold text-gray-500 uppercase">Tier 1</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#fca311]" />
                        <span className="text-[9px] font-bold text-gray-500 uppercase">Tier 2</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#14213d]" />
                        <span className="text-[9px] font-bold text-gray-500 uppercase">Tier 3</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function DefectFixesIllustration() {
    const [phase, setPhase] = useState<'pr' | 'diff' | 'merged'>('pr');

    useEffect(() => {
        let cancelled = false;
        const run = async () => {
            setPhase('pr');
            await new Promise(r => setTimeout(r, 2000));
            if (cancelled) return;
            setPhase('diff');
            await new Promise(r => setTimeout(r, 3000));
            if (cancelled) return;
            setPhase('merged');
            await new Promise(r => setTimeout(r, 2500));
            if (!cancelled) run();
        };
        run();
        return () => { cancelled = true; };
    }, []);

    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col shadow-sm" style={{ height: 340 }}>
            <div className="bg-[#161b22] px-4 py-3 flex items-center gap-2 border-b border-white/5">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="#fff" className="opacity-60">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
                <span className="text-[11px] font-bold text-white/80 font-mono tracking-tight">apache / superset</span>
            </div>

            <div className="flex-1 p-4 bg-[#0d1117] overflow-hidden flex flex-col gap-4">
                <AnimatePresence mode="wait">
                    {phase === 'pr' && (
                        <motion.div
                            key="pr"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-4"
                        >
                            <div className="flex items-start gap-3">
                                <div className="p-1.5 rounded-full bg-green-500/20 text-green-500">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                        <path d="M12 2v8m0 0l-4-4m4 4l4-4M5 20h14" />
                                    </svg>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-[13px] font-bold text-white leading-tight">Fix: Chart Legend color mismatch in Explore vs Dashboard</div>
                                    <div className="text-[10px] text-gray-500 font-mono">#32841 opened by foundry-dev</div>
                                </div>
                            </div>

                            <div className="p-3 rounded-lg border border-white/5 bg-white/5 space-y-2">
                                <div className="h-2 w-3/4 bg-white/10 rounded" />
                                <div className="h-2 w-1/2 bg-white/5 rounded" />
                            </div>
                        </motion.div>
                    )}

                    {phase === 'diff' && (
                        <motion.div
                            key="diff"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="font-mono text-[10px] leading-relaxed"
                        >
                            <div className="text-gray-500 mb-2">@@ -142,4 +142,4 @@</div>
                            <div className="bg-red-500/10 text-red-400 -mx-4 px-4 py-1 flex gap-2">
                                <span>-</span>
                                <span>return DEFAULT_COLOR;</span>
                            </div>
                            <div className="bg-green-500/10 text-green-400 -mx-4 px-4 py-1 flex gap-2">
                                <span>+</span>
                                <span>return chart.metadata.colors[i] || DEFAULT_COLOR;</span>
                            </div>
                            <div className="text-gray-400 px-4 py-1 flex gap-2">
                                <span>&nbsp;</span>
                                <span>&#125;</span>
                            </div>
                        </motion.div>
                    )}

                    {phase === 'merged' && (
                        <motion.div
                            key="merged"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex-1 flex flex-col items-center justify-center gap-4"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring' }}
                                className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500"
                            >
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M6 3v12M18 3v12M12 19l-6-6M12 19l6-6" />
                                </svg>
                            </motion.div>
                            <div className="text-center">
                                <div className="text-[14px] font-bold text-white">Pull Request Merged</div>
                                <div className="text-[10px] text-gray-500 font-mono mt-1">Changes merged into apache:master</div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="bg-[#161b22] px-4 py-2 border-t border-white/5 flex items-center justify-between">
                <div className="flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span className="text-[9px] text-gray-400 font-mono">14 checks passed</span>
                </div>
                <div className="text-[9px] text-gray-500 font-mono uppercase tracking-widest">OSS CONTRIBUTION</div>
            </div>
        </div>
    );
}

/* ─── Master switch — services ─── */
export function SupersetServiceIllustration({ id }: { id: string }) {
    switch (id) {
        case 'deployment': return <DeploymentIllustration />;
        case 'custom': return <CustomFeatureIllustration />;
        case 'performance': return <PerformanceIllustration />;
        case 'embedded': return <EmbeddedIllustration />;
        case 'theming': return <ThemingIllustration />;
        case 'security': return <SecurityRoleIllustration />;
        case 'alerts': return <AlertsAutomationIllustration />;
        case 'dashboard': return <DashboardDesignIllustration />;
        case 'workflow': return <WorkflowLLMIllustration />;
        default: return <DeploymentIllustration />;
    }
}

/* ─── Master switch — experiences ─── */
export function SupersetExperienceIllustration({ id }: { id: string }) {
    switch (id) {
        case 'text-to-sql': return <TextToSQLIllustration />;
        case 'custom-alerts': return <CustomAlertsFeatureIllustration />;
        case 'whale-chart': return <WhaleChartIllustration />;
        case 'financial-report': return <FinancialReportIllustration />;
        case 'mekko-chart': return <MekkoChartIllustration />;
        case 'defect-fixes': return <DefectFixesIllustration />;
        default: return <TextToSQLIllustration />;
    }
}

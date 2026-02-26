'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, animate, AnimatePresence, useInView } from 'framer-motion';
import {
    Database, Terminal, Play, LayoutDashboard, 
    BarChart3, Sparkles, Download, Share2
} from 'lucide-react';
import { CustomCursor } from './automated-assets';

// ─── SQL Lab Component ───────────────────────────────────────────────────

const SQLLab: React.FC<{
    prompt: string;
    sql: string;
    isExecuting: boolean;
    progress: number;
    promptRef?: React.RefObject<HTMLDivElement | null>;
    runBtnRef?: React.RefObject<HTMLButtonElement | null>;
    navToDashboardRef?: React.RefObject<HTMLDivElement | null>;
}> = ({ prompt, sql, isExecuting, progress, promptRef, runBtnRef, navToDashboardRef }) => (
    <div className="flex flex-col h-full bg-white/80 backdrop-blur-md rounded-2xl border border-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden">
        {/* Tab Header */}
        <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-sm">
                <Terminal size={12} className="text-slate-500" />
                <span className="text-[10px] font-bold text-slate-700">SQL Lab</span>
            </div>
            <div className="w-[1px] h-4 bg-slate-200 mx-1" />
            <div ref={navToDashboardRef} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-slate-400">
                <LayoutDashboard size={12} />
                <span className="text-[10px] font-bold">Dashboards</span>
            </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 p-4 flex flex-col gap-3 min-h-0">
            {/* AI Prompt Input */}
            <div ref={promptRef} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                        <Sparkles size={14} className="text-orange-500" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Natural Language Query</div>
                        <div className="text-[11px] font-medium text-slate-700 truncate">{prompt}</div>
                    </div>
                </div>
            </div>

            {/* SQL Editor */}
            <div className="flex-1 bg-slate-900 rounded-xl p-4 font-mono text-[10px] relative group overflow-hidden">
                <div className="absolute top-3 right-3 flex items-center gap-2">
                    <div className="px-2 py-0.5 rounded bg-slate-800 text-slate-500 text-[8px] font-bold border border-slate-700">POSTGRESQL</div>
                </div>
                <div className="flex gap-3 h-full">
                    <div className="flex flex-col text-slate-600 select-none">
                        {[1, 2, 3, 4, 5, 6, 7].map(n => <span key={n}>{n}</span>)}
                    </div>
                    <div className="flex-1 text-slate-300">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="whitespace-pre-wrap leading-relaxed"
                        >
                            {sql.split('\n').map((line, i) => (
                                <div key={i}>
                                    {line.split(' ').map((word, j) => {
                                        const isKeyword = ['SELECT', 'FROM', 'WHERE', 'GROUP', 'BY', 'ORDER', 'LIMIT', 'JOIN', 'ON'].includes(word.toUpperCase());
                                        return (
                                            <span key={j} className={isKeyword ? 'text-orange-400 font-bold' : 'text-slate-300'}>
                                                {word}{' '}
                                            </span>
                                        );
                                    })}
                                </div>
                            ))}
                            {isExecuting && (
                                <motion.span
                                    animate={{ opacity: [1, 0, 1] }}
                                    transition={{ duration: 0.8, repeat: Infinity }}
                                    className="inline-block w-1.5 h-3 bg-orange-400 align-middle ml-0.5"
                                />
                            )}
                        </motion.div>
                    </div>
                </div>
                
                {/* Execution Progress Overlay */}
                <AnimatePresence>
                    {isExecuting && progress > 0 && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute bottom-4 inset-x-4 p-3 bg-slate-800/90 backdrop-blur-md rounded-lg border border-slate-700 flex items-center gap-3"
                        >
                            <div className="w-6 h-6 rounded-full border-2 border-orange-500 border-t-transparent animate-spin shrink-0" />
                            <div className="flex-1">
                                <div className="flex justify-between text-[9px] font-bold text-slate-300 mb-1">
                                    <span>Running Query...</span>
                                    <span>{Math.round(progress)}%</span>
                                </div>
                                <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                                    <motion.div 
                                        className="h-full bg-orange-500"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                    <button ref={runBtnRef} className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-sm shadow-orange-200 transition-colors">
                        <Play size={12} fill="white" />
                        <span className="text-[10px] font-black uppercase tracking-tight">Run</span>
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors">
                        <Download size={12} />
                        <span className="text-[10px] font-bold">Export</span>
                    </button>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-slate-400">
                        <Database size={12} />
                        <span className="text-[9px] font-bold">production_dw</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// ─── Dashboard Component ──────────────────────────────────────────────────

const Dashboard: React.FC<{
    dashboardTabRef?: React.RefObject<HTMLDivElement | null>;
}> = ({ dashboardTabRef }) => {
    const barData = [55, 62, 48, 75, 82, 68, 91, 85, 74, 88];

    return (
        <div className="flex flex-col h-full bg-[#fcfdfe] rounded-2xl border border-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-white/50 backdrop-blur-md sticky top-0 z-20">
                <div className="flex items-center gap-3">
                    <div ref={dashboardTabRef} className="w-8 h-8 rounded-xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-200/50">
                        <BarChart3 size={16} className="text-white" />
                    </div>
                    <div>
                        <h3 className="text-slate-900 text-[12px] font-black tracking-tight leading-none">Revenue Intelligence</h3>
                        <p className="text-slate-400 text-[8px] font-bold uppercase tracking-[0.12em] mt-0.5">Embedded Dashboard</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex bg-slate-100/50 rounded-lg p-0.5 border border-slate-200/50">
                        <button className="px-2 py-1 bg-white rounded-md text-[8px] font-bold shadow-sm">24H</button>
                        <button className="px-2 py-1 text-[8px] font-bold text-slate-400">7D</button>
                    </div>
                    <button className="p-1.5 text-slate-400 hover:text-slate-600"><Share2 size={14} /></button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-4 grid grid-cols-12 gap-3 min-h-0 overflow-hidden">
                {/* KPI row */}
                <div className="col-span-12 grid grid-cols-3 gap-3">
                    {[
                        { label: 'Total Revenue', value: '₹918.9 Cr', change: '+12.4%', color: 'text-orange-500' },
                        { label: 'Active Users', value: '1.2M', change: '+5.2%', color: 'text-blue-500' },
                        { label: 'Conversion', value: '3.42%', change: '-0.8%', color: 'text-emerald-500' }
                    ].map((kpi, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * i }}
                            className="p-3 bg-white border border-slate-100 rounded-xl shadow-sm"
                        >
                            <div className="text-[8px] text-slate-400 font-bold uppercase tracking-wider mb-1">{kpi.label}</div>
                            <div className={`text-[15px] font-black tracking-tight ${kpi.color}`}>{kpi.value}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Main chart */}
                <div className="col-span-8 bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                            <span className="text-[9px] font-black text-slate-800 uppercase tracking-widest">Growth Trajectory</span>
                        </div>
                    </div>
                    <div className="flex-1 flex items-end gap-1.5 pb-2">
                        {barData.map((h, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center h-full justify-end">
                                <motion.div
                                    className="w-full bg-orange-100 rounded-t-md relative group"
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    transition={{ delay: 0.3 + (i * 0.05), duration: 0.8 }}
                                >
                                    <div className="absolute inset-0 bg-orange-500 opacity-0 group-hover:opacity-20 transition-opacity rounded-t-md" />
                                    {i === barData.length - 1 && (
                                        <div className="absolute inset-0 bg-gradient-to-t from-orange-500 to-orange-400 rounded-t-md shadow-[0_4px_12px_rgba(249,115,22,0.3)]" />
                                    )}
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Secondary charts */}
                <div className="col-span-4 flex flex-col gap-3">
                    <div className="flex-1 bg-white border border-slate-100 rounded-xl p-3 shadow-sm flex flex-col gap-3">
                        <span className="text-[8px] font-black text-slate-800 uppercase tracking-widest">Market Share</span>
                        <div className="flex-1 flex items-center justify-center relative">
                            <svg className="w-20 h-20 -rotate-90">
                                <circle cx="40" cy="40" r="34" fill="transparent" stroke="#f1f5f9" strokeWidth="8" />
                                <motion.circle 
                                    cx="40" cy="40" r="34" fill="transparent" stroke="rgb(249, 115, 22)" strokeWidth="8"
                                    strokeDasharray="213"
                                    initial={{ strokeDashoffset: 213 }}
                                    animate={{ strokeDashoffset: 213 * 0.35 }}
                                    transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute flex flex-col items-center">
                                <span className="text-[12px] font-black text-slate-900">65%</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 bg-white border border-slate-100 rounded-xl p-3 shadow-sm flex flex-col gap-3">
                        <span className="text-[8px] font-black text-slate-800 uppercase tracking-widest">Anomalies</span>
                        <div className="flex-1 flex items-center justify-center">
                            <div className="flex flex-col items-center gap-1">
                                <motion.div 
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center"
                                >
                                    <Sparkles size={16} className="text-emerald-500" />
                                </motion.div>
                                <span className="text-[9px] font-bold text-slate-400">Stable Flow</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─── Main Demo Component ────────────────────────────────────────────────

export const SupersetAnalyticsDemo: React.FC<{ isActive?: boolean }> = ({ isActive = true }) => {
    const [isClicking, setIsClicking] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { amount: 0.3 });
    const promptRef = useRef<HTMLDivElement>(null);
    const runBtnRef = useRef<HTMLButtonElement>(null);
    const dashboardTabRef = useRef<HTMLDivElement>(null);
    const navToDashboardRef = useRef<HTMLDivElement>(null);
    
    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);

    const [view, setView] = useState<'sqllab' | 'dashboard'>('sqllab');
    const [prompt, setPrompt] = useState('');
    const [sql, setSql] = useState('');
    const [isExecuting, setIsExecuting] = useState(false);
    const [progress, setProgress] = useState(0);

    const targetPrompt = "Total revenue trends across all regions for FY2024 grouped by month";
    const targetSql = `SELECT 
  month, 
  SUM(revenue) as total_rev
FROM sales_data
WHERE year = 2024
GROUP BY month
ORDER BY month ASC;`;

    const getElementCenter = useCallback((el: HTMLElement | null) => {
        if (!el || !containerRef.current) return null;
        const containerRect = containerRef.current.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();
        // Detect CSS scale factor from parent transforms (important for ScrollStack)
        const scale = containerRect.width / (containerRef.current.offsetWidth || containerRect.width) || 1;
        return {
            x: (elRect.left - containerRect.left + elRect.width / 2) / scale,
            y: (elRect.top - containerRect.top + elRect.height / 2) / scale,
        };
    }, []);

    const doClick = async () => {
        setIsClicking(true);
        await new Promise(r => setTimeout(r, 350));
        setIsClicking(false);
        await new Promise(r => setTimeout(r, 150));
    };

    useEffect(() => {
        let cancelled = false;

        if (!isActive || !isInView) {
            return () => { cancelled = true; };
        }

        // Immediate reset for fresh start
        setView('sqllab');
        setPrompt('');
        setSql('');
        setIsExecuting(false);
        setProgress(0);

        const moveTo = async (x: number, y: number, duration = 1.2) => {
            if (cancelled) return;
            animate(cursorX, x, { duration, ease: [0.25, 0.1, 0.25, 1] });
            animate(cursorY, y, { duration, ease: [0.25, 0.1, 0.25, 1] });
            await new Promise(r => setTimeout(r, duration * 1000 + 200));
        };

        const moveToEl = async (el: HTMLElement | null, duration = 1.2) => {
            const center = getElementCenter(el);
            if (!center || cancelled) return;
            await moveTo(center.x, center.y, duration);
        };

        const wait = async (ms: number) => {
            if (cancelled) return;
            await new Promise(r => setTimeout(r, ms));
        };

        const typePrompt = async (text: string) => {
            for (let i = 0; i <= text.length; i++) {
                if (cancelled) return;
                setPrompt(text.slice(0, i));
                await new Promise(r => setTimeout(r, 30));
            }
        };

        const typeSql = async (text: string) => {
            for (let i = 0; i <= text.length; i++) {
                if (cancelled) return;
                setSql(text.slice(0, i));
                await new Promise(r => setTimeout(r, 15));
            }
        };

        const runSequence = async () => {
            if (!containerRef.current || cancelled) return;

            // Reset
            setView('sqllab');
            setPrompt('');
            setSql('');
            setIsExecuting(false);
            setProgress(0);
            cursorX.set(containerRef.current.offsetWidth * 0.5);
            cursorY.set(containerRef.current.offsetHeight * 0.5);
            await wait(1000);

            // 1. Move to prompt area and type
            if (cancelled) return;
            await moveToEl(promptRef.current, 1.2);
            await typePrompt(targetPrompt);
            await wait(800);

            // 2. Generate SQL (automatic feel)
            if (cancelled) return;
            await typeSql(targetSql);
            await wait(1000);

            // 3. Click Run Button
            if (cancelled) return;
            await moveToEl(runBtnRef.current, 1.0);
            await doClick();
            
            // 4. Execution progress
            if (cancelled) return;
            setIsExecuting(true);
            for (let p = 0; p <= 100; p += 5) {
                if (cancelled) return;
                setProgress(p);
                await wait(100);
            }
            await wait(500);
            setIsExecuting(false);

            // 5. Switch to Dashboard view (simulated navigation)
            if (cancelled) return;
            // Target the dashboard tab in the SQL Lab header
            await moveToEl(navToDashboardRef.current, 1.0);
            await doClick();
            setView('dashboard');
            await wait(4000);

            if (!cancelled) runSequence();
        };

        const timer = setTimeout(() => {
            if (isActive && isInView) runSequence();
        }, 800);
        return () => { cancelled = true; clearTimeout(timer); };
    }, [isActive, isInView, cursorX, cursorY, targetPrompt, targetSql, getElementCenter]);

    return (
        <div ref={containerRef} className="relative w-full h-full overflow-hidden bg-white" style={{ fontFamily: 'var(--font-geist-sans)' }}>
            {/* Background Aesthetic */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] blur-[120px] rounded-full" style={{ backgroundColor: 'rgba(249, 115, 22, 0.08)' }} />
            <div className="absolute bottom-[-10%] right-[-10%] w-[35%] h-[35%] blur-[100px] rounded-full" style={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }} />

            <div className="relative z-10 w-full h-full p-6">
                <AnimatePresence mode="wait">
                    {view === 'sqllab' ? (
                        <motion.div
                            key="sqllab"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                            transition={{ duration: 0.5 }}
                            className="w-full h-full"
                        >
                            <SQLLab 
                                prompt={prompt} 
                                sql={sql} 
                                isExecuting={isExecuting} 
                                progress={progress} 
                                promptRef={promptRef}
                                runBtnRef={runBtnRef}
                                navToDashboardRef={navToDashboardRef}
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="dashboard"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                            transition={{ duration: 0.5 }}
                            className="w-full h-full"
                        >
                            <Dashboard dashboardTabRef={dashboardTabRef} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Cursor */}
            <div className="absolute inset-0 pointer-events-none z-[100]">
                <CustomCursor x={cursorX} y={cursorY} isClicking={isClicking} />
            </div>
        </div>
    );
};

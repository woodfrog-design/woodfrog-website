'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, animate, AnimatePresence } from 'framer-motion';
import {
    Database, GitBranch, CheckCircle2, Layers,
    Cloud, Activity, ArrowRight, BarChart3, Zap
} from 'lucide-react';
import { CustomCursor } from './automated-assets';
import { ANIMATION_THEME } from '@/lib/colors';

// ─── Pipeline Step ──────────────────────────────────────────────────────

const PipelineStep = React.forwardRef<HTMLDivElement, {
    label: string;
    icon: React.ElementType;
    status: 'idle' | 'active' | 'done';
    detail: string;
    index: number;
}>(({ label, icon: Icon, status, detail, index }, ref) => (
    <motion.div
        ref={ref}
        className={`relative group flex flex-col items-center gap-2 p-3.5 rounded-2xl border transition-all duration-500 min-w-[100px] overflow-hidden ${status === 'active'
            ? `bg-gradient-to-b from-yellow-50/80 to-white/80 backdrop-blur-md border-yellow-200/60 shadow-[0_8px_30px_${ANIMATION_THEME.primary}1F]`
            : status === 'done'
                ? 'bg-gradient-to-b from-emerald-50/80 to-white/80 backdrop-blur-md border-emerald-200/60 shadow-[0_8px_30px_rgba(16,185,129,0.08)]'
                : 'bg-white/60 backdrop-blur-md border-white/40 shadow-[0_4px_20px_rgba(0,0,0,0.03)]'
            }`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08, duration: 0.5 }}
    >
        {/* Glow */}
        {status === 'active' && (
            <div className="absolute -right-3 -top-3 w-12 h-12 rounded-full blur-2xl opacity-15" style={{ backgroundColor: ANIMATION_THEME.primary }} />
        )}
        {status === 'done' && (
            <div className="absolute -right-3 -top-3 w-12 h-12 rounded-full bg-emerald-400 blur-2xl opacity-15" />
        )}

        <div className={`relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-500 ${status === 'active'
            ? 'shadow-lg'
            : status === 'done'
                ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-200/50'
                : 'bg-slate-100/80'
            }`} style={{ background: status === 'active' ? `linear-gradient(to bottom right, ${ANIMATION_THEME.primary}, #f59e0b)` : undefined }}>
            {status === 'done' ? (
                <CheckCircle2 size={15} className="text-white" strokeWidth={2.5} />
            ) : (
                <Icon size={15} className={status === 'active' ? 'text-white' : 'text-slate-400'} />
            )}
            {status === 'active' && (
                <motion.div
                    className="absolute inset-0 rounded-xl border-2"
                    style={{ borderColor: `${ANIMATION_THEME.primary}80` }}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            )}
        </div>
        <span className="text-[10px] font-bold tracking-wide" style={{ color: status === 'active' ? ANIMATION_THEME.primary : status === 'done' ? '#047857' : '#64748b' }}>{label}</span>
        <span className={`text-[8px] font-medium ${status === 'active' ? 'text-slate-400' : status === 'done' ? 'text-emerald-400' : 'text-slate-300'
            }`}>{detail}</span>
    </motion.div>
));
PipelineStep.displayName = 'PipelineStep';

// ─── Arrow ──────────────────────────────────────────────────────────────

const Arrow: React.FC<{ active: boolean; done: boolean }> = ({ active, done }) => (
    <div className="flex items-center px-1.5 relative">
        <div className="h-[2px] w-8 rounded-full transition-all duration-700 bg-slate-200/80">
            {(active || done) && (
                <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: done ? '#10b981' : ANIMATION_THEME.primary }}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                />
            )}
        </div>
        <ArrowRight size={11} className={`transition-colors duration-500 ${done ? 'text-emerald-400' : active ? 'text-yellow-400' : 'text-slate-300'
            }`} strokeWidth={2.5} />
    </div>
);

// ─── Source Card ─────────────────────────────────────────────────────────

const SourceCard = React.forwardRef<HTMLDivElement, {
    name: string;
    icon: React.ElementType;
    records: string;
    status: 'idle' | 'streaming' | 'done';
    color: string;
    index: number;
}>(({ name, icon: Icon, records, status, color, index }, ref) => (
    <motion.div
        ref={ref}
        className={`relative group flex items-center gap-3 px-3.5 py-2.5 rounded-xl border transition-all duration-500 overflow-hidden ${status === 'streaming'
            ? `bg-gradient-to-r from-yellow-50/80 to-white/80 backdrop-blur-md border-yellow-200/60 shadow-[0_8px_30px_${ANIMATION_THEME.primary}1A]`
            : status === 'done'
                ? 'bg-white/80 backdrop-blur-md border-emerald-200/60 shadow-[0_4px_20px_rgba(16,185,129,0.06)]'
                : 'bg-white/60 backdrop-blur-md border-white/40 shadow-[0_4px_20px_rgba(0,0,0,0.03)]'
            }`}
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
    >
        {/* Glow on streaming */}
        {status === 'streaming' && (
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full blur-xl opacity-20" style={{ backgroundColor: color }} />
        )}

        <div
            className="relative w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all duration-500"
            style={{
                backgroundColor: status === 'done' ? '#ecfdf5' : `${color}12`,
                boxShadow: status === 'streaming' ? `0 4px 12px ${color}25` : 'none'
            }}
        >
            <Icon size={13} style={{ color: status === 'done' ? '#10b981' : color }} />
        </div>
        <div className="flex-1 min-w-0">
            <div className="text-[10px] font-bold text-slate-700 tracking-wide">{name}</div>
            <AnimatePresence>
                {status !== 'idle' && (
                    <motion.div
                        className="text-[8px] text-slate-400 font-medium"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {records}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
        {status === 'streaming' && (
            <div className="flex items-center gap-1">
                {[0, 1, 2].map(i => (
                    <motion.div
                        key={i}
                        className="w-1 h-1 rounded-full"
                        style={{ backgroundColor: ANIMATION_THEME.primary }}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                    />
                ))}
            </div>
        )}
        {status === 'done' && (
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
                <CheckCircle2 size={12} className="text-emerald-500" strokeWidth={2.5} />
            </motion.div>
        )}
    </motion.div>
));
SourceCard.displayName = 'SourceCard';

// ─── KPI Card ───────────────────────────────────────────────────────────

const KpiCard: React.FC<{
    label: string;
    value: string;
    color: string;
    glowColor: string;
    index: number;
}> = ({ label, value, color, glowColor, index }) => (
    <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.12, duration: 0.5 }}
        className="relative flex-1 p-3 rounded-xl bg-white/70 backdrop-blur-md border border-white/40 shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden group"
    >
        <div className={`absolute -right-2 -top-2 w-10 h-10 rounded-full blur-2xl opacity-10 ${glowColor}`} />
        <div className="text-[8px] text-slate-400 font-bold uppercase tracking-[0.1em] mb-1.5">{label}</div>
        <motion.div
            className="text-[17px] font-black tracking-tight leading-none"
            style={{ color }}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.12 + 0.2 }}
        >
            {value}
        </motion.div>
    </motion.div>
);

// ─── Main Demo ──────────────────────────────────────────────────────────

export const DataEngineeringDemo: React.FC<{ isActive?: boolean }> = ({ isActive = true }) => {
    const [isClicking, setIsClicking] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);

    const sourceRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);
    const stepRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);

    const [activeStep, setActiveStep] = useState(-1);
    const [sourceStatuses, setSourceStatuses] = useState<('idle' | 'streaming' | 'done')[]>(['idle', 'idle', 'idle']);
    const [showResult, setShowResult] = useState(false);

    const getElementCenter = useCallback((el: HTMLDivElement | null) => {
        if (!el || !containerRef.current) return null;
        const containerRect = containerRef.current.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();
        return {
            x: elRect.left - containerRect.left + elRect.width / 2,
            y: elRect.top - containerRect.top + elRect.height / 2,
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

        const moveTo = async (x: number, y: number, duration = 1.2) => {
            if (cancelled) return;
            animate(cursorX, x, { duration, ease: [0.25, 0.1, 0.25, 1] });
            animate(cursorY, y, { duration, ease: [0.25, 0.1, 0.25, 1] });
            await new Promise(r => setTimeout(r, duration * 1000 + 200));
        };

        const moveToEl = async (el: HTMLDivElement | null, duration = 1.2) => {
            const center = getElementCenter(el);
            if (!center || cancelled) return;
            await moveTo(center.x, center.y, duration);
        };

        const wait = async (ms: number) => {
            if (cancelled) return;
            await new Promise(r => setTimeout(r, ms));
        };

        const runSequence = async () => {
            if (!containerRef.current || cancelled) return;
            const rect = containerRef.current.getBoundingClientRect();

            setActiveStep(-1);
            setSourceStatuses(['idle', 'idle', 'idle']);
            setShowResult(false);
            cursorX.set(rect.width * 0.5);
            cursorY.set(rect.height * 0.5);
            await wait(800);

            // Step 1: Ingest
            if (cancelled) return;
            setActiveStep(0);
            await wait(400);

            await moveToEl(sourceRefs.current[0]);
            if (cancelled) return;
            await doClick();
            setSourceStatuses(['streaming', 'idle', 'idle']);
            await wait(1200);
            if (cancelled) return;
            setSourceStatuses(['done', 'idle', 'idle']);

            await moveToEl(sourceRefs.current[1]);
            if (cancelled) return;
            await doClick();
            setSourceStatuses(['done', 'streaming', 'idle']);
            await wait(1200);
            if (cancelled) return;
            setSourceStatuses(['done', 'done', 'idle']);

            await moveToEl(sourceRefs.current[2]);
            if (cancelled) return;
            await doClick();
            setSourceStatuses(['done', 'done', 'streaming']);
            await wait(1200);
            if (cancelled) return;
            setSourceStatuses(['done', 'done', 'done']);
            await wait(600);

            // Step 2: Transform
            if (cancelled) return;
            setActiveStep(1);
            await moveToEl(stepRefs.current[1]);
            if (cancelled) return;
            await doClick();
            await wait(2000);

            // Step 3: Load
            if (cancelled) return;
            setActiveStep(2);
            await moveToEl(stepRefs.current[2]);
            if (cancelled) return;
            await doClick();
            await wait(1800);

            // Step 4: Serve
            if (cancelled) return;
            setActiveStep(3);
            await moveToEl(stepRefs.current[3]);
            if (cancelled) return;
            await doClick();
            setShowResult(true);
            await wait(3000);

            if (!cancelled) runSequence();
        };

        const timer = setTimeout(() => {
            if (isActive) runSequence();
        }, 400);
        return () => { cancelled = true; clearTimeout(timer); };
    }, [isActive, cursorX, cursorY, getElementCenter]);

    const steps = [
        { label: 'Ingest', icon: Cloud, detail: '3 sources' },
        { label: 'Transform', icon: GitBranch, detail: 'dbt models' },
        { label: 'Load', icon: Database, detail: 'Warehouse' },
        { label: 'Serve', icon: BarChart3, detail: 'Dashboard' },
    ];

    const sources = [
        { name: 'PostgreSQL', icon: Database, records: '2.4M rows', color: '#336791' },
        { name: 'REST API', icon: Cloud, records: '847K events', color: '#10b981' },
        { name: 'Kafka', icon: Activity, records: '5.8M msgs', color: '#e11d48' },
    ];

    const barData = [
        { h: 60, label: 'Jan' }, { h: 68, label: 'Feb' }, { h: 72, label: 'Mar' },
        { h: 65, label: 'Apr' }, { h: 78, label: 'May' }, { h: 82, label: 'Jun' },
        { h: 75, label: 'Jul' }, { h: 88, label: 'Aug' }, { h: 85, label: 'Sep' },
        { h: 90, label: 'Oct' }, { h: 92, label: 'Nov' }, { h: 95, label: 'Dec' },
    ];

    return (
        <div ref={containerRef} className="relative w-full h-full overflow-hidden bg-white" style={{ fontFamily: 'var(--font-geist-sans)' }}>
            {/* Background blurs */}
            <div className="absolute top-[-15%] right-[-10%] w-[35%] h-[35%] blur-[100px] rounded-full" style={{ backgroundColor: `${ANIMATION_THEME.primary}33` }} />
            <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-violet-200/15 blur-[100px] rounded-full" />
            <div className="absolute top-[40%] left-[30%] w-[20%] h-[20%] bg-emerald-200/10 blur-[80px] rounded-full" />

            <div className="relative z-10 w-full h-full flex flex-col p-5 gap-4">
                {/* Header */}
                <div className="flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center shadow-lg shadow-slate-200/50">
                            <Layers size={14} className="text-white" />
                        </div>
                        <div>
                            <h3 className="text-slate-900 text-[12px] font-black tracking-tight leading-none">Data Pipeline</h3>
                            <p className="text-slate-400 text-[8px] font-bold uppercase tracking-[0.12em] mt-0.5">Ingest &middot; Transform &middot; Load &middot; Serve</p>
                        </div>
                    </div>
                    <AnimatePresence>
                        {activeStep >= 0 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/70 backdrop-blur-md border border-slate-100 shadow-sm"
                            >
                                <motion.div
                                    className="w-1.5 h-1.5 rounded-full"
                                    style={{ backgroundColor: ANIMATION_THEME.primary }}
                                    animate={{ opacity: [1, 0.3, 1] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                />
                                <span className="text-[9px] font-bold tracking-wide" style={{ color: ANIMATION_THEME.primary }}>Pipeline Running</span>
                                <Zap size={10} style={{ color: ANIMATION_THEME.primary }} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Pipeline steps */}
                <div className="flex items-center justify-center gap-0 shrink-0">
                    {steps.map((step, i) => (
                        <React.Fragment key={step.label}>
                            <PipelineStep
                                ref={(el: HTMLDivElement | null) => { stepRefs.current[i] = el; }}
                                label={step.label}
                                icon={step.icon}
                                status={activeStep > i ? 'done' : activeStep === i ? 'active' : 'idle'}
                                detail={step.detail}
                                index={i}
                            />
                            {i < steps.length - 1 && (
                                <Arrow active={activeStep === i} done={activeStep > i} />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Bottom section */}
                <div className="flex-1 flex gap-4 min-h-0">
                    {/* Sources */}
                    <div className="w-[38%] flex flex-col gap-2">
                        <div className="flex items-center gap-2 mb-0.5">
                            <span className="w-1 h-1 rounded-full bg-slate-400" />
                            <span className="text-[9px] text-slate-400 font-black uppercase tracking-[0.12em]">Data Sources</span>
                        </div>
                        {sources.map((src, i) => (
                            <SourceCard
                                key={src.name}
                                ref={(el: HTMLDivElement | null) => { sourceRefs.current[i] = el; }}
                                name={src.name}
                                icon={src.icon}
                                records={src.records}
                                status={sourceStatuses[i]}
                                color={src.color}
                                index={i}
                            />
                        ))}

                        {/* Progress summary */}
                        <AnimatePresence>
                            {sourceStatuses.filter(s => s === 'done').length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 8 }}
                                    className="mt-auto px-3 py-2 rounded-xl bg-white/50 backdrop-blur-sm border border-slate-100/50"
                                >
                                    <div className="flex items-center justify-between mb-1.5">
                                        <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">Ingestion</span>
                                        <span className="text-[9px] text-slate-600 font-black">
                                            {sourceStatuses.filter(s => s === 'done').length}/{sources.length}
                                        </span>
                                    </div>
                                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full rounded-full bg-gradient-to-r"
                                            style={{ backgroundImage: `linear-gradient(to right, ${ANIMATION_THEME.primary}, #10b981)` }}
                                            initial={{ width: '0%' }}
                                            animate={{
                                                width: `${(sourceStatuses.filter(s => s === 'done').length / sources.length) * 100}%`
                                            }}
                                            transition={{ duration: 0.5, ease: 'easeOut' }}
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Output */}
                    <div className="flex-1 flex flex-col min-h-0">
                        <div className="flex items-center gap-2 mb-1.5">
                            <span className="w-1 h-1 rounded-full bg-slate-400" />
                            <span className="text-[9px] text-slate-400 font-black uppercase tracking-[0.12em]">Output</span>
                        </div>
                        <div className="flex-1 rounded-2xl border border-white/40 bg-white/40 backdrop-blur-md p-3 flex flex-col justify-center shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden relative">
                            {/* Subtle background gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-transparent" />

                            <AnimatePresence mode="wait">
                                {showResult ? (
                                    <motion.div
                                        key="result"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="relative z-10 flex flex-col gap-3 h-full"
                                    >
                                        {/* KPI cards */}
                                        <div className="flex gap-2.5">
                                            <KpiCard label="Records Loaded" value="9.1M" color={ANIMATION_THEME.primary} glowColor="bg-yellow-500" index={0} />
                                            <KpiCard label="Avg Latency" value="42ms" color="#10b981" glowColor="bg-emerald-500" index={1} />
                                            <KpiCard label="Quality Score" value="99.7%" color={ANIMATION_THEME.text.primary} glowColor="bg-slate-500" index={2} />
                                        </div>

                                        {/* Bar chart */}
                                        <div className="flex-1 p-3 rounded-xl bg-white/70 backdrop-blur-md border border-white/40 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col min-h-0 overflow-hidden relative">
                                            <div className="absolute -right-4 -bottom-4 w-16 h-16 rounded-full blur-3xl opacity-5" style={{ backgroundColor: ANIMATION_THEME.primary }} />
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: ANIMATION_THEME.primary }} />
                                                    <span className="text-[8px] text-slate-500 font-bold uppercase tracking-[0.1em]">Throughput</span>
                                                </div>
                                                <span className="text-[7px] text-slate-300 font-bold bg-slate-50 px-1.5 py-0.5 rounded-md">K rows/sec</span>
                                            </div>
                                            <div className="flex-1 flex min-h-0">
                                                {/* Y-axis */}
                                                <div className="flex flex-col justify-between pr-1.5 py-0.5">
                                                    {['50', '40', '30', '20', '10', '0'].map(v => (
                                                        <span key={v} className="text-[6px] text-slate-300 font-semibold leading-none">{v}</span>
                                                    ))}
                                                </div>
                                                {/* Bars */}
                                                <div className="flex-1 flex flex-col min-h-0">
                                                    <div className="flex-1 flex items-end gap-[3px] min-h-0 border-l border-b border-slate-100/80 pl-1 pb-1">
                                                        {barData.map((bar, bi) => (
                                                            <div key={bi} className="flex-1 flex flex-col items-center h-full justify-end">
                                                                <div
                                                                    className="w-full rounded-t-sm overflow-hidden relative"
                                                                    style={{ height: `${bar.h}%`, backgroundColor: '#f1f5f9' }}
                                                                >
                                                                    <motion.div
                                                                        className="absolute inset-0 rounded-t-sm"
                                                                        style={{
                                                                            background: bi === barData.length - 1
                                                                                ? `linear-gradient(180deg, ${ANIMATION_THEME.primary} 0%, #f59e0b 100%)`
                                                                                : `linear-gradient(180deg, ${ANIMATION_THEME.primary}80 0%, ${ANIMATION_THEME.primary}40 100%)`
                                                                        }}
                                                                        initial={{ clipPath: 'inset(0 0 100% 0)' }}
                                                                        animate={{ clipPath: 'inset(0 0 0% 0)' }}
                                                                        transition={{
                                                                            delay: bi * 0.06,
                                                                            duration: 0.5,
                                                                            ease: [0.22, 1, 0.36, 1],
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    {/* X-axis */}
                                                    <div className="flex gap-[3px] pl-1 pt-1">
                                                        {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'].map((m, i) => (
                                                            <span key={i} className="flex-1 text-center text-[6px] text-slate-300 font-semibold">{m}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="waiting"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="relative z-10 flex flex-col items-center justify-center gap-2 text-center"
                                    >
                                        <div className="w-10 h-10 rounded-2xl bg-slate-100/80 flex items-center justify-center">
                                            <BarChart3 size={16} className="text-slate-300" />
                                        </div>
                                        <span className="text-slate-300 text-[10px] font-bold">Waiting for pipeline...</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cursor */}
            <CustomCursor x={cursorX} y={cursorY} isClicking={isClicking} />
        </div>
    );
};

'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
    Building2,
    TrendingUp,
    BarChart3,
    Search,
    ShieldCheck,
    Users2,
    Scale,
    Users,
    User
} from 'lucide-react';
import { ANIMATION_THEME } from '@/lib/colors';

const BRAND = '#f9dc66';
const BRAND_LIGHT = 'rgba(249,220,102,0.15)';
const BRAND_MED = 'rgba(249,220,102,0.35)';


/* ─────────────────────── DATA ─────────────────────── */


const SERVICES = [
    {
        id: 'risk',
        title: 'AI Risk Assessment & Classification',
        description:
            'Our AI Risk Assessment as a Service gives you access to structured risk profiling without the need for a full internal governance team. Acting as an extension of your organization, we evaluate every AI model against regulatory thresholds, classify risk levels, and implement proportionate controls — building the certainty your leadership needs to deploy AI with confidence.',
    },
    {
        id: 'bias',
        title: 'Bias & Fairness Auditing',
        description:
            'Our experts assess your current and future AI models to detect and eliminate algorithmic bias. We ensure that each model\'s outcomes are equitable across all demographic groups. Whether you are launching new models or auditing existing ones, we guide you toward fair, transparent, and defensible AI.',
    },
    {
        id: 'xai',
        title: 'Model Explainability (XAI)',
        description:
            'Turn "black boxes" into transparent, auditable systems. We implement SHAP values, feature importance analysis, and local interpretability methods so your stakeholders can trust and justify every AI-driven decision. Together, we build the foundations for an explainable AI practice that is compliant, efficient, and scalable.',
    },
    {
        id: 'compliance',
        title: 'Regulatory Compliance Audit',
        description:
            'Prepare for the EU AI Act, NIST AI RMF, and global standards. Our compliance auditors provide comprehensive technical audits, documentation support, and conformity assessments. We ensure that each proposed governance measure aligns with your budget and long-term vision, guiding you toward sustainable compliance.',
    },
    {
        id: 'framework',
        title: 'Ethical AI Framework Design',
        description:
            'Develop a custom ethical constitution for your AI. We help you define principles around transparency, accountability, and human oversight that align with your brand values — then translate them into enforceable technical policies and automated guardrails.',
    },
    {
        id: 'privacy',
        title: 'Data Privacy & Security for AI',
        description:
            'Using advanced PII scanning and differential privacy techniques, we automate privacy protection with every data load to identify sensitive information, mask identifiers, and ensure compliance. Through continuous monitoring, your teams can track privacy health in real time, promoting transparency and shared responsibility.',
    },
    {
        id: 'oversight',
        title: 'Continuous Model Monitoring',
        description:
            'AI governance is not a one-time event. We set up automated guardrails that monitor live model behavior, flagging anomalies, drift, and policy breaches in real time. Our monitoring infrastructure enforces constraints automatically, at every stage of the model lifecycle.',
    },
    {
        id: 'program',
        title: 'AI Governance Program Management',
        description:
            'Drawing on extensive experience in delivering AI governance programs, our experts have developed proven accelerators to ensure efficient Agile program management. Our project managers work closely with your teams to maximize value delivery, maintain budget control, and continuously improve governance maturity.',
    },
];


const PILLARS = [
    {
        id: 'pillar-1',
        title: 'Discovery & Risk Profiling',
        description: 'Our AI governance journey begins with a complete mapping of your AI landscape. We identify every model, agent, and shadow AI deployment, classifying them by risk level to ensure your governance efforts are focused where they matter most.',
        color: '#39D6E3',
        icon: <Search className="w-6 h-6" />
    },
    {
        id: 'pillar-2',
        title: 'Quality & Safety Engineering',
        description: 'We move from mapping to mitigation. This pillar focuses on the technical guardrails: implementing automated bias detection, hallucination testing, and safety filters that live within your CI/CD pipelines.',
        color: ANIMATION_THEME.primary,
        icon: <ShieldCheck className="w-6 h-6" />
    },
    {
        id: 'pillar-3',
        title: 'Operational Accountability',
        description: 'Effective governance requires human oversight. We define clear roles (AI Officers, Data Custodians) and implement the human-in-the-loop protocols and conformity records required for regulatory transparency.',
        color: 'var(--brand-primary)',
        icon: <Users2 className="w-6 h-6" />
    },
    {
        id: 'pillar-4',
        title: 'Regulatory Lifecycle',
        description: 'AI governance is dynamic. Our final pillar ensures continuous compliance with evolving laws like the EU AI Act through automated internal audits, model cards, and transparency reporting.',
        color: 'var(--brand-primary)',
        icon: <Scale className="w-6 h-6" />
    }
];

const OUR_WAY_POINTS = [
    {
        title: 'AI-Native Framework',
        description: 'A governance framework built on your specific model deployments, not generic mandates.',
        icon: <Building2 className="w-5 h-5 text-white" />
    },
    {
        title: 'Developer-First Adoption',
        description: 'Built for seamless integration into CI/CD. Governance that enables speed.',
        icon: <TrendingUp className="w-5 h-5 text-white" />
    },
    {
        title: 'Modular Scaling',
        description: 'Small, high-impact actions that create a lasting foundation for enterprise AI.',
        icon: <BarChart3 className="w-5 h-5 text-white" />
    }
];

/* ─────────────────────── ILLUSTRATION COMPONENTS ─────────────────────── */

/* ── Shared icon primitives ── */
function ToolCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`bg-white rounded-xl shadow-sm border border-gray-200/80 flex items-center justify-center ${className}`}>
            {children}
        </div>
    );
}

function Arrow({ className = '' }: { className?: string }) {
    return (
        <svg width="24" height="10" viewBox="0 0 24 10" className={`flex-shrink-0 ${className}`}>
            <path d="M0 5h20M16 1l4 4-4 4" stroke={BRAND} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
    );
}

function DashedLine({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
    return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={BRAND} strokeWidth="1.5" strokeDasharray="4 3" />;
}

function AnimDot({ cx, cy, delay = 0 }: { cx: number; cy: number; delay?: number }) {
    return (
        <motion.circle cx={cx} cy={cy} r={3} fill={BRAND}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, delay, ease: 'easeInOut' }}
        />
    );
}

/* ── SVG icons inline ── */
const PowerBIIcon = () => (
    <svg viewBox="0 0 32 32" width="100%" height="100%">
        <rect x="4" y="14" width="6" height="14" rx="1" fill="#f9a825" />
        <rect x="13" y="8" width="6" height="20" rx="1" fill="#f57c00" />
        <rect x="22" y="2" width="6" height="26" rx="1" fill="#e65100" />
    </svg>
);

const FabricIcon = () => (
    <svg viewBox="0 0 40 40" width="100%" height="100%">
        <defs>
            <linearGradient id="fab1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00b4d8" />
                <stop offset="100%" stopColor="#48cae4" />
            </linearGradient>
            <linearGradient id="fab2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0077b6" />
                <stop offset="100%" stopColor="#00b4d8" />
            </linearGradient>
        </defs>
        <path d="M6 20 L20 6 L34 20 L20 34 Z" fill="url(#fab1)" />
        <path d="M13 20 L20 13 L27 20 L20 27 Z" fill="url(#fab2)" />
        <circle cx="20" cy="20" r="4" fill="white" opacity="0.7" />
    </svg>
);

const FivetranIcon = () => (
    <svg viewBox="0 0 40 40" width="100%" height="100%">
        <defs>
            <linearGradient id="fiv" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff6d3f" />
                <stop offset="100%" stopColor="#ff4400" />
            </linearGradient>
        </defs>
        <path d="M8 8 L24 8 L32 20 L24 32 L8 32 Z" fill="url(#fiv)" />
        <path d="M16 14 L26 20 L16 26 Z" fill="white" opacity="0.8" />
    </svg>
);

const AzureIcon = () => (
    <svg viewBox="0 0 40 40" width="100%" height="100%">
        <defs>
            <linearGradient id="az" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0078d4" />
                <stop offset="100%" stopColor="#005da6" />
            </linearGradient>
        </defs>
        <polygon points="12,6 28,6 38,20 28,34 12,34 2,20" fill="url(#az)" />
        <text x="20" y="25" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="sans-serif">A</text>
    </svg>
);

const ShieldIcon = () => (
    <svg viewBox="0 0 40 40" width="100%" height="100%">
        <path d="M20 4 L34 10 L34 22 C34 30 20 36 20 36 C20 36 6 30 6 22 L6 10 Z" fill="#3b82f6" />
        <path d="M14 20 L18 24 L26 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
);

const LockIcon = ({ size = 14, color = '#6b7280' }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
);

const CheckCircleIcon = ({ color = '#16a34a' }: { color?: string }) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <path d="M22 4L12 14.01l-3-3" />
    </svg>
);

const EUFlagIcon = () => (
    <div className="w-7 h-7 rounded-full bg-[#003399] flex items-center justify-center text-[10px]">🇪🇺</div>
);

const NistIcon = () => (
    <div className="w-7 h-7 rounded-lg bg-[#1a237e] flex items-center justify-center">
        <span className="text-white text-[7px] font-black">NIST</span>
    </div>
);

function ServiceIllustration({ id }: { id: string }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });

    switch (id) {
        /* ── 1. AI Risk Assessment — Intake → Classify → Report pipeline ── */
        case 'risk':
            return (
                <div ref={ref} className="bg-[#f4f3f0] rounded-2xl p-7 overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <span className="text-[13px] font-bold text-gray-800">AI Risk Assessment Pipeline</span>
                        <motion.span
                            className="px-2.5 py-1 rounded-full bg-red-100 text-red-600 text-[10px] font-bold"
                            animate={inView ? { opacity: [1, 0.4, 1] } : {}}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            3 HIGH RISK
                        </motion.span>
                    </div>

                    {/* Step pipeline */}
                    <div className="flex items-center gap-3 mb-8">
                        {[
                            { label: 'Intake', sub: 'Model submitted', icon: '📋', active: true },
                            { label: 'Classify', sub: 'Risk scoring', icon: '🔍', active: true },
                            { label: 'Controls', sub: 'Mitigation plan', icon: '⚙️', active: true },
                            { label: 'Report', sub: 'CEO sign-off', icon: '📊', active: false },
                        ].map((step, i) => (
                            <React.Fragment key={i}>
                                <motion.div
                                    className={`flex-1 rounded-xl p-3 text-center border ${step.active ? 'bg-white border-gray-200 shadow-sm' : 'bg-gray-200/50 border-gray-200/50'}`}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.15 * i, duration: 0.4 }}
                                >
                                    <div className="text-lg mb-1">{step.icon}</div>
                                    <div className={`text-[10px] font-bold ${step.active ? 'text-gray-800' : 'text-gray-400'}`}>{step.label}</div>
                                    <div className="text-[9px] text-gray-400 mt-0.5">{step.sub}</div>
                                    {step.active && (
                                        <motion.div
                                            className="mt-2 mx-auto w-4 h-1 rounded-full"
                                            style={{ background: BRAND }}
                                            initial={{ scaleX: 0 }}
                                            animate={inView ? { scaleX: 1 } : {}}
                                            transition={{ delay: 0.3 + 0.15 * i }}
                                        />
                                    )}
                                </motion.div>
                                {i < 3 && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={inView ? { opacity: 1 } : {}}
                                        transition={{ delay: 0.2 + 0.15 * i }}
                                    >
                                        <Arrow />
                                    </motion.div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Risk matrix grid */}
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200/60">
                        <div className="text-[10px] font-bold text-gray-500 mb-3 uppercase tracking-wider">Risk Classification Matrix</div>
                        <div className="space-y-2">
                            {[
                                { label: 'Customer Chatbot', risk: 'LOW', pct: 18, color: '#22c55e' },
                                { label: 'Credit Scoring Engine', risk: 'HIGH', pct: 82, color: '#ef4444' },
                                { label: 'HR Screening Model', risk: 'CRITICAL', pct: 95, color: '#dc2626' },
                                { label: 'Fraud Detection', risk: 'MEDIUM', pct: 45, color: '#f59e0b' },
                            ].map((row, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <span className="w-[130px] text-[10px] text-gray-600 font-medium flex-shrink-0">{row.label}</span>
                                    <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full rounded-full"
                                            style={{ background: row.color }}
                                            initial={{ width: 0 }}
                                            animate={inView ? { width: `${row.pct}%` } : {}}
                                            transition={{ duration: 0.7, delay: 0.6 + 0.1 * i, ease: 'easeOut' }}
                                        />
                                    </div>
                                    <span className="text-[9px] font-bold w-14 text-right" style={{ color: row.color }}>{row.risk}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="flex items-center gap-4 mt-4">
                        {[['#22c55e', 'Low'], ['#f59e0b', 'Medium'], ['#ef4444', 'High'], ['#dc2626', 'Critical']].map(([c, l]) => (
                            <div key={l} className="flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full" style={{ background: c }} />
                                <span className="text-[9px] text-gray-400">{l}</span>
                            </div>
                        ))}
                    </div>
                </div>
            );

        /* ── 2. Bias & Fairness Auditing — Parity chart + demographic breakdown ── */
        case 'bias':
            return (
                <div ref={ref} className="bg-[#f4f3f0] rounded-2xl p-7 overflow-hidden">
                    <div className="flex items-center justify-between mb-6">
                        <span className="text-[13px] font-bold text-gray-800">Bias & Fairness Audit</span>
                        <motion.span
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-bold"
                            initial={{ scale: 0 }}
                            animate={inView ? { scale: 1 } : {}}
                            transition={{ delay: 0.5, type: 'spring', stiffness: 300 }}
                        >
                            <CheckCircleIcon color="#16a34a" /> PASS
                        </motion.span>
                    </div>

                    {/* Demographic parity bars */}
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200/60 mb-4">
                        <div className="text-[10px] font-bold text-gray-500 mb-3 uppercase tracking-wider">Demographic Parity — Approval Rates</div>
                        <div className="space-y-3">
                            {[
                                { group: 'Group A (Male, 25-34)', pct: 82 },
                                { group: 'Group B (Female, 25-34)', pct: 80 },
                                { group: 'Group C (Male, 35-50)', pct: 84 },
                                { group: 'Group D (Female, 35-50)', pct: 83 },
                                { group: 'Group E (Non-binary)', pct: 81 },
                            ].map((item, i) => (
                                <div key={i} className="space-y-1">
                                    <div className="flex justify-between text-[10px]">
                                        <span className="text-gray-500">{item.group}</span>
                                        <span className="font-bold text-gray-700">{item.pct}%</span>
                                    </div>
                                    <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full rounded-full"
                                            style={{ background: BRAND }}
                                            initial={{ width: 0 }}
                                            animate={inView ? { width: `${item.pct}%` } : {}}
                                            transition={{ duration: 0.8, delay: 0.2 + 0.12 * i, ease: 'easeOut' }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Metrics row */}
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            { label: 'Max Variance', value: '4%', sub: '< 5% threshold', ok: true },
                            { label: 'Equalized Odds', value: '0.97', sub: 'near-perfect', ok: true },
                            { label: 'Calibration Error', value: '0.03', sub: 'excellent', ok: true },
                        ].map((m, i) => (
                            <motion.div
                                key={i}
                                className="bg-white rounded-xl p-3 shadow-sm border border-gray-200/60 text-center"
                                initial={{ opacity: 0, y: 8 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.7 + 0.1 * i }}
                            >
                                <div className="text-[11px] font-black text-gray-800">{m.value}</div>
                                <div className="text-[9px] font-bold text-gray-500 mt-0.5">{m.label}</div>
                                <div className="text-[9px] text-green-600 mt-0.5">{m.sub}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            );

        /* ── 3. Model Explainability (XAI) — SHAP + decision path ── */
        case 'xai':
            return (
                <div ref={ref} className="bg-[#f4f3f0] rounded-2xl p-7 overflow-hidden">
                    <div className="flex items-center justify-between mb-6">
                        <span className="text-[13px] font-bold text-gray-800">Model Explainability (SHAP)</span>
                        <span className="text-[10px] bg-gray-200/70 text-gray-600 px-2.5 py-1 rounded-full font-medium">Prediction: ✓ Approved</span>
                    </div>

                    {/* SHAP waterfall */}
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200/60 mb-4">
                        <div className="text-[10px] font-bold text-gray-500 mb-3 uppercase tracking-wider">Feature Contributions (SHAP Values)</div>
                        <div className="space-y-2.5">
                            {[
                                { label: 'Credit History', val: 0.42, pos: true },
                                { label: 'Annual Income', val: 0.28, pos: true },
                                { label: 'Debt-to-Income', val: -0.18, pos: false },
                                { label: 'Employment Len.', val: 0.14, pos: true },
                                { label: 'Loan Amount', val: -0.09, pos: false },
                            ].map((f, i) => (
                                <motion.div
                                    key={f.label}
                                    className="flex items-center gap-3"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={inView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 0.1 * i, duration: 0.4 }}
                                >
                                    <span className="w-[105px] text-[10px] text-gray-500 font-medium text-right flex-shrink-0">{f.label}</span>
                                    <div className="flex-1 h-5 relative">
                                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300" />
                                        <motion.div
                                            className="absolute h-full rounded-sm"
                                            style={{
                                                background: f.pos ? '#22c55e' : '#ef4444',
                                                opacity: 0.65,
                                                left: f.pos ? '50%' : undefined,
                                                right: !f.pos ? '50%' : undefined,
                                            }}
                                            initial={{ width: 0 }}
                                            animate={inView ? { width: `${Math.abs(f.val) * 100}%` } : {}}
                                            transition={{ duration: 0.7, delay: 0.15 * i }}
                                        />
                                    </div>
                                    <span className={`text-[10px] font-bold w-10 text-right ${f.pos ? 'text-green-600' : 'text-red-500'}`}>
                                        {f.pos ? '+' : ''}{f.val.toFixed(2)}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-3 pt-2 border-t border-gray-100 text-[9px] text-gray-400">
                            <span>Base value: 0.35</span>
                            <span>Output: <strong className="text-green-600">0.92</strong></span>
                        </div>
                    </div>

                    {/* Decision path */}
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200/60">
                        <div className="text-[10px] font-bold text-gray-500 mb-3 uppercase tracking-wider">Decision Path</div>
                        <div className="flex items-center gap-2 flex-wrap">
                            {['Input Data', 'Feature Extraction', 'Gradient Boost', 'SHAP Layer', 'Final Score'].map((step, i) => (
                                <React.Fragment key={i}>
                                    <motion.div
                                        className="px-3 py-1.5 rounded-lg text-[10px] font-semibold border"
                                        style={{
                                            background: i === 4 ? BRAND_LIGHT : 'white',
                                            borderColor: i === 4 ? BRAND : '#e5e7eb',
                                            color: i === 4 ? '#92710a' : '#374151',
                                        }}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                                        transition={{ delay: 0.8 + 0.1 * i, type: 'spring' }}
                                    >
                                        {step}
                                    </motion.div>
                                    {i < 4 && <span className="text-gray-300 text-[10px]">→</span>}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            );

        /* ── 4. Regulatory Compliance Audit — EU AI Act + NIST checklist ── */
        case 'compliance':
            return (
                <div ref={ref} className="bg-[#f4f3f0] rounded-2xl p-7 overflow-hidden">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex gap-2">
                            <EUFlagIcon />
                            <NistIcon />
                        </div>
                        <div>
                            <div className="text-[13px] font-bold text-gray-800">Regulatory Compliance Audit</div>
                            <div className="text-[10px] text-gray-400">EU AI Act · NIST AI RMF · ISO 42001</div>
                        </div>
                    </div>

                    {/* Compliance checklist */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200/60 overflow-hidden mb-4">
                        {[
                            { label: 'Risk Management System (Art. 9)', status: 'passed' },
                            { label: 'Data Governance & Quality (Art. 10)', status: 'passed' },
                            { label: 'Technical Documentation (Art. 11)', status: 'passed' },
                            { label: 'Record-Keeping & Logging (Art. 12)', status: 'passed' },
                            { label: 'Transparency Obligations (Art. 13)', status: 'review' },
                            { label: 'Human Oversight Mechanisms (Art. 14)', status: 'passed' },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center justify-between px-4 py-3 border-b border-gray-100 last:border-b-0"
                                initial={{ opacity: 0, x: -8 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: 0.1 + 0.1 * i, duration: 0.4 }}
                            >
                                <span className="text-[11px] text-gray-600">{item.label}</span>
                                {item.status === 'passed' ? (
                                    <motion.div
                                        className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0"
                                        initial={{ scale: 0 }}
                                        animate={inView ? { scale: 1 } : {}}
                                        transition={{ delay: 0.2 + 0.12 * i, type: 'spring', stiffness: 400 }}
                                    >
                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>
                                    </motion.div>
                                ) : (
                                    <motion.span
                                        className="px-2 py-0.5 rounded bg-amber-100 text-amber-600 text-[9px] font-bold flex-shrink-0"
                                        animate={inView ? { opacity: [1, 0.5, 1] } : {}}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        IN REVIEW
                                    </motion.span>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Progress bar */}
                    <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-200/60">
                        <div className="flex justify-between text-[10px] mb-2">
                            <span className="text-gray-500 font-medium">Overall Conformity Score</span>
                            <span className="font-bold text-gray-800">83%</span>
                        </div>
                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full rounded-full"
                                style={{ background: `linear-gradient(90deg, ${BRAND}, #f59e0b)` }}
                                initial={{ width: 0 }}
                                animate={inView ? { width: '83%' } : {}}
                                transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
                            />
                        </div>
                        <div className="flex justify-between text-[9px] text-gray-400 mt-1.5">
                            <span>5/6 articles compliant</span>
                            <span>1 in review</span>
                        </div>
                    </div>
                </div>
            );

        /* ── 5. Ethical AI Framework — 3-layer constitution diagram ── */
        case 'framework':
            return (
                <div ref={ref} className="bg-[#f4f3f0] rounded-2xl p-7 overflow-hidden">
                    <div className="text-[13px] font-bold text-gray-800 mb-6">Ethical AI Framework Architecture</div>

                    {/* Pyramid-style layers */}
                    <div className="space-y-2 mb-5">
                        {/* Layer 1: Values */}
                        <motion.div
                            className="rounded-xl p-4 border-2 text-center"
                            style={{ background: BRAND_LIGHT, borderColor: BRAND }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.1 }}
                        >
                            <div className="text-[10px] font-black text-gray-700 uppercase tracking-widest mb-1">Layer 1 — Core Values</div>
                            <div className="flex justify-center gap-4">
                                {['Transparency', 'Accountability', 'Fairness', 'Human Oversight'].map((v, i) => (
                                    <motion.span
                                        key={v}
                                        className="text-[10px] font-semibold text-gray-700"
                                        initial={{ opacity: 0 }}
                                        animate={inView ? { opacity: 1 } : {}}
                                        transition={{ delay: 0.3 + 0.08 * i }}
                                    >
                                        {v}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>

                        {/* Connector */}
                        <div className="flex justify-center">
                            <svg width="2" height="16"><line x1="1" y1="0" x2="1" y2="16" stroke="#d1d5db" strokeWidth="1.5" strokeDasharray="3 3" /></svg>
                        </div>

                        {/* Layer 2: Policies */}
                        <motion.div
                            className="rounded-xl p-4 bg-white border border-gray-200 shadow-sm"
                            initial={{ opacity: 0, y: 10 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.35 }}
                        >
                            <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Layer 2 — Governance Policies</div>
                            <div className="grid grid-cols-3 gap-2">
                                {[
                                    { label: 'Model Card Policy', icon: '📄' },
                                    { label: 'Bias Testing SLA', icon: '⚖️' },
                                    { label: 'Audit Trail Req.', icon: '🔎' },
                                ].map((p, i) => (
                                    <motion.div
                                        key={p.label}
                                        className="bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-2 flex items-center gap-1.5"
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={inView ? { scale: 1, opacity: 1 } : {}}
                                        transition={{ delay: 0.45 + 0.1 * i, type: 'spring' }}
                                    >
                                        <span className="text-sm">{p.icon}</span>
                                        <span className="text-[9px] font-semibold text-gray-600">{p.label}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Connector */}
                        <div className="flex justify-center">
                            <svg width="2" height="16"><line x1="1" y1="0" x2="1" y2="16" stroke="#d1d5db" strokeWidth="1.5" strokeDasharray="3 3" /></svg>
                        </div>

                        {/* Layer 3: Guardrails */}
                        <motion.div
                            className="rounded-xl p-4 bg-green-50 border border-green-200"
                            initial={{ opacity: 0, y: 10 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.65 }}
                        >
                            <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Layer 3 — Automated Guardrails</div>
                            <div className="grid grid-cols-2 gap-2">
                                {[
                                    { label: 'CI/CD Bias Gate', icon: '🚦' },
                                    { label: 'Real-time Monitoring', icon: '📡' },
                                    { label: 'Auto Rollback', icon: '↩️' },
                                    { label: 'Compliance Reports', icon: '📊' },
                                ].map((g, i) => (
                                    <motion.div
                                        key={g.label}
                                        className="bg-white border border-green-200 rounded-lg py-2 px-3 flex items-center gap-2 shadow-sm"
                                        initial={{ x: i % 2 === 0 ? -8 : 8, opacity: 0 }}
                                        animate={inView ? { x: 0, opacity: 1 } : {}}
                                        transition={{ delay: 0.75 + 0.1 * i }}
                                    >
                                        <span className="text-sm">{g.icon}</span>
                                        <span className="text-[9px] font-semibold text-green-700">{g.label}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            );

        /* ── 6. Data Privacy & Security — Tool cards with lock + PII scan ── */
        case 'privacy':
            return (
                <div ref={ref} className="bg-[#f4f3f0] rounded-2xl p-7 overflow-hidden">
                    <div className="flex items-center justify-between mb-6">
                        <span className="text-[13px] font-bold text-gray-800">Data Privacy & Security</span>
                        <div className="flex items-center gap-1.5">
                            <motion.div
                                className="w-2 h-2 rounded-full bg-green-500"
                                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <span className="text-[10px] text-green-600 font-bold">PROTECTED</span>
                        </div>
                    </div>

                    {/* Tool cards with lock overlays — matching ref screenshot */}
                    <div className="flex items-center justify-center gap-4 mb-6">
                        {[
                            { icon: <FivetranIcon />, opacity: 1 },
                            { icon: <AzureIcon />, opacity: 1 },
                            { icon: <FabricIcon />, opacity: 1 },
                            { icon: <PowerBIIcon />, opacity: 1 },
                        ].map((tool, i) => (
                            <div key={i} className="relative">
                                <motion.div
                                    className="w-16 h-16 bg-white rounded-xl shadow-sm border border-gray-200 flex items-center justify-center p-2.5"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={inView ? { opacity: tool.opacity, scale: 1 } : {}}
                                    transition={{ delay: 0.1 * i, type: 'spring', stiffness: 300 }}
                                >
                                    {tool.icon}
                                </motion.div>
                                {/* Lock badge */}
                                <motion.div
                                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center"
                                    initial={{ scale: 0 }}
                                    animate={inView ? { scale: 1 } : {}}
                                    transition={{ delay: 0.3 + 0.12 * i, type: 'spring' }}
                                >
                                    <LockIcon size={10} color="#6b7280" />
                                </motion.div>
                            </div>
                        ))}
                    </div>

                    {/* PII scanner */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200/60 overflow-hidden">
                        <div className="px-4 py-2.5 border-b border-gray-100 flex items-center justify-between">
                            <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">PII Detection Scanner</span>
                            {/* Animated scan bar */}
                            <div className="relative w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div
                                    className="absolute top-0 left-0 h-full w-6 rounded-full"
                                    style={{ background: BRAND }}
                                    animate={{ x: ['-100%', '200%'] }}
                                    transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                                />
                            </div>
                        </div>
                        <div className="p-4 space-y-2">
                            {[
                                { type: 'Email Addresses', count: '1,242', action: 'Redacted', color: '#3b82f6', pct: 75 },
                                { type: 'Phone Numbers', count: '856', action: 'Masked', color: '#8b5cf6', pct: 52 },
                                { type: 'SSN / Medical IDs', count: '124', action: 'Removed', color: '#ef4444', pct: 18 },
                                { type: 'Physical Addresses', count: '463', action: 'Hashed', color: '#f59e0b', pct: 35 },
                            ].map((p, i) => (
                                <div key={i} className="space-y-1">
                                    <div className="flex justify-between text-[10px]">
                                        <span className="text-gray-600">{p.type}</span>
                                        <span className="font-bold" style={{ color: p.color }}>{p.count} {p.action}</span>
                                    </div>
                                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full rounded-full"
                                            style={{ background: p.color, opacity: 0.6 }}
                                            initial={{ width: 0 }}
                                            animate={inView ? { width: `${p.pct}%` } : {}}
                                            transition={{ duration: 0.7, delay: 0.5 + 0.1 * i }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="px-4 py-2 border-t border-gray-100 flex justify-between text-[9px] text-gray-400">
                            <span>Differential Privacy: ε = 0.1</span>
                            <span>GDPR · CCPA · HIPAA</span>
                        </div>
                    </div>
                </div>
            );

        /* ── 7. Continuous Model Monitoring — Live drift + alert flow ── */
        case 'oversight':
            return (
                <div ref={ref} className="bg-[#f4f3f0] rounded-2xl p-7 overflow-hidden">
                    <div className="flex items-center justify-between mb-6">
                        <span className="text-[13px] font-bold text-gray-800">Continuous Model Monitoring</span>
                        <motion.span
                            className="px-2.5 py-1 rounded-full bg-red-100 text-red-600 text-[10px] font-bold"
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            ⚠ DRIFT DETECTED
                        </motion.span>
                    </div>

                    {/* Live chart */}
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200/60 mb-4">
                        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3">Model Accuracy Over Time</div>
                        <svg viewBox="0 0 320 110" className="w-full h-auto">
                            {/* Grid */}
                            {[20, 45, 70, 95].map(y => (
                                <line key={y} x1="30" y1={y} x2="310" y2={y} stroke="#f1f5f9" strokeWidth="1" />
                            ))}
                            {/* Y axis labels */}
                            <text x="26" y="23" textAnchor="end" fill="#94a3b8" style={{ fontSize: '7px' }}>100</text>
                            <text x="26" y="48" textAnchor="end" fill="#94a3b8" style={{ fontSize: '7px' }}>80</text>
                            <text x="26" y="73" textAnchor="end" fill="#94a3b8" style={{ fontSize: '7px' }}>60</text>
                            <text x="26" y="98" textAnchor="end" fill="#94a3b8" style={{ fontSize: '7px' }}>40</text>
                            {/* Threshold dashed line */}
                            <line x1="30" y1="45" x2="310" y2="45" stroke={BRAND} strokeWidth="1" strokeDasharray="4 3" />
                            {/* Accuracy path */}
                            <motion.path
                                d="M30,22 Q60,20 90,24 Q120,26 150,28 Q170,30 190,48 Q210,68 230,60 Q260,46 290,40 L310,42"
                                fill="none" stroke={BRAND} strokeWidth="2.5" strokeLinecap="round"
                                initial={{ pathLength: 0 }}
                                animate={inView ? { pathLength: 1 } : {}}
                                transition={{ duration: 1.8, ease: 'easeInOut' }}
                            />
                            {/* Area fill */}
                            <motion.path
                                d="M30,22 Q60,20 90,24 Q120,26 150,28 Q170,30 190,48 Q210,68 230,60 Q260,46 290,40 L310,42 L310,100 L30,100 Z"
                                fill={BRAND} fillOpacity="0.07"
                                initial={{ opacity: 0 }}
                                animate={inView ? { opacity: 1 } : {}}
                                transition={{ delay: 1.5 }}
                            />
                            {/* Drift alert point */}
                            <motion.circle cx="190" cy="48" r="5" fill="#ef4444"
                                initial={{ scale: 0 }}
                                animate={inView ? { scale: 1 } : {}}
                                transition={{ delay: 1.2, type: 'spring' }}
                            />
                            <motion.circle cx="190" cy="48" r="10" fill="none" stroke="#ef4444" strokeWidth="1.5"
                                animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                            />
                            {/* X labels */}
                            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((m, i) => (
                                <text key={m} x={30 + i * 56} y="108" textAnchor="middle" fill="#94a3b8" style={{ fontSize: '7px' }}>{m}</text>
                            ))}
                        </svg>
                    </div>

                    {/* Alert → guardrail flow */}
                    <div className="flex items-center gap-2">
                        {[
                            { label: 'Drift Alert', icon: '⚠️', bg: 'bg-red-50', border: 'border-red-200' },
                            null,
                            { label: 'Auto-Rollback', icon: '↩️', bg: 'bg-amber-50', border: 'border-amber-200' },
                            null,
                            { label: 'Incident Log', icon: '📋', bg: 'bg-blue-50', border: 'border-blue-200' },
                            null,
                            { label: 'Resolved', icon: '✅', bg: 'bg-green-50', border: 'border-green-200' },
                        ].map((item, i) => item === null ? (
                            <Arrow key={i} className="flex-shrink-0" />
                        ) : (
                            <motion.div
                                key={i}
                                className={`flex-1 rounded-xl p-2 text-center border ${item.bg} ${item.border}`}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={inView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: 0.1 * (i / 2), type: 'spring' }}
                            >
                                <div className="text-base mb-0.5">{item.icon}</div>
                                <div className="text-[9px] font-bold text-gray-600">{item.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            );

        /* ── 8. AI Governance Program Management — Gantt + Agile sprint ── */
        case 'program':
            return (
                <div ref={ref} className="bg-[#f4f3f0] rounded-2xl p-7 overflow-hidden">
                    <div className="flex items-center justify-between mb-6">
                        <span className="text-[13px] font-bold text-gray-800">AI Governance Program</span>
                        <div className="flex items-center gap-1.5">
                            <motion.div
                                className="w-2 h-2 rounded-full"
                                style={{ background: BRAND }}
                                animate={{ scale: [1, 1.4, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <span className="text-[10px] font-bold" style={{ color: BRAND }}>On Track</span>
                        </div>
                    </div>

                    {/* Gantt chart */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200/60 p-4 mb-4">
                        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3">Program Timeline</div>
                        <div className="space-y-0">
                            {/* Week headers */}
                            <div className="flex ml-[100px] mb-2">
                                {['W1', 'W2', 'W3', 'W4', 'W5', 'W6'].map((w, i) => (
                                    <span key={i} className="flex-1 text-[8px] text-gray-400 font-medium text-center">{w}</span>
                                ))}
                            </div>
                            {[
                                { label: 'Risk Assessment', start: 0, w: 33, done: true },
                                { label: 'Policy Design', start: 16, w: 33, done: true },
                                { label: 'Framework Build', start: 33, w: 34, done: false },
                                { label: 'Compliance Audit', start: 50, w: 33, done: false },
                                { label: 'Go-Live + Monitor', start: 75, w: 25, done: false },
                            ].map((task, i) => (
                                <motion.div
                                    key={i}
                                    className="flex items-center mb-1.5"
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={inView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 0.1 * i, duration: 0.4 }}
                                >
                                    <span className="w-[100px] text-[9px] text-gray-500 font-medium text-right pr-3 flex-shrink-0">{task.label}</span>
                                    <div className="flex-1 h-5 bg-gray-50 rounded relative overflow-hidden border border-gray-100">
                                        <motion.div
                                            className="absolute top-0 h-full rounded"
                                            style={{
                                                left: `${task.start}%`,
                                                background: task.done ? '#22c55e' : BRAND,
                                                opacity: task.done ? 0.8 : 1,
                                            }}
                                            initial={{ width: 0 }}
                                            animate={inView ? { width: `${task.w}%` } : {}}
                                            transition={{ duration: 0.6, delay: 0.2 + 0.12 * i, ease: 'easeOut' }}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                            {/* Today marker */}
                            <div className="relative ml-[100px] h-0">
                                <motion.div
                                    className="absolute w-px bg-red-400"
                                    style={{ left: '35%', bottom: 0, top: -95 }}
                                    initial={{ scaleY: 0 }}
                                    animate={inView ? { scaleY: 1 } : {}}
                                    transition={{ delay: 0.9 }}
                                />
                                <motion.span
                                    className="absolute text-[8px] font-bold text-red-500 -top-100"
                                    style={{ left: 'calc(35% - 10px)', top: -108 }}
                                    initial={{ opacity: 0 }}
                                    animate={inView ? { opacity: 1 } : {}}
                                    transition={{ delay: 1.1 }}
                                >
                                    Today
                                </motion.span>
                            </div>
                        </div>
                    </div>

                    {/* Sprint KPIs */}
                    <div className="grid grid-cols-4 gap-2">
                        {[
                            { label: 'Sprint', value: '3/6', icon: '🏃' },
                            { label: 'Velocity', value: '87%', icon: '⚡' },
                            { label: 'Risks Open', value: '4', icon: '⚠️' },
                            { label: 'Budget', value: 'On Track', icon: '💰' },
                        ].map((kpi, i) => (
                            <motion.div
                                key={i}
                                className="bg-white rounded-xl p-2.5 shadow-sm border border-gray-200/60 text-center"
                                initial={{ opacity: 0, y: 8 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.8 + 0.1 * i }}
                            >
                                <div className="text-base mb-0.5">{kpi.icon}</div>
                                <div className="text-[11px] font-black text-gray-800">{kpi.value}</div>
                                <div className="text-[8px] text-gray-400 font-medium">{kpi.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            );

        default:
            return (
                <div className="bg-[#f4f3f0] rounded-2xl p-6">
                    <div className="flex items-center justify-center h-20 text-gray-500 text-sm">
                        Governance preview
                    </div>
                </div>
            );
    }
}

function HeroIllustration() {
    return (
        <div className="relative w-full h-full min-h-[500px] flex items-center justify-center perspective-1000" style={{ backgroundColor: ANIMATION_THEME.background }}>
            {/* Background Chart Container */}
            <div className="absolute inset-0 bg-slate-50/50 border border-slate-100 rounded-[2.5rem] overflow-hidden backdrop-blur-3xl shadow-2xl">
                <svg viewBox="0 0 800 500" className="w-full h-full">
                    <defs>
                        <linearGradient id="safetyGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={ANIMATION_THEME.primary} stopOpacity="0.2" />
                            <stop offset="100%" stopColor={ANIMATION_THEME.primary} stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* X & Y Axes Lines */}
                    <line x1="60" y1="440" x2="740" y2="440" stroke={ANIMATION_THEME.border} strokeWidth="1" />
                    <line x1="60" y1="60" x2="60" y2="440" stroke={ANIMATION_THEME.border} strokeWidth="1" />

                    {/* Axis Titles */}
                    <text
                        x="30" y="250"
                        textAnchor="middle"
                        transform="rotate(-90, 30, 250)"
                        className="fill-slate-400 text-[10px] font-black uppercase tracking-[0.2em]"
                    >
                        Compliance Score (%)
                    </text>
                    <text
                        x="400" y="490"
                        textAnchor="middle"
                        className="fill-slate-400 text-[10px] font-black uppercase tracking-[0.2em]"
                    >
                        Deployment Timeline
                    </text>

                    {/* Y-Axis Markers & Labels */}
                    {[0, 25, 50, 75, 100].map((val) => {
                        const y = 440 - (val * 3.8); // Scale to fit
                        return (
                            <g key={val}>
                                <line x1="55" y1={y} x2="60" y2={y} stroke={ANIMATION_THEME.border} strokeWidth="1" />
                                <text
                                    x="45" y={y + 4}
                                    textAnchor="end"
                                    className="fill-slate-500 text-[10px] font-bold tabular-nums"
                                >
                                    {val}
                                </text>
                                <line x1="60" y1={y} x2="740" y2={y} stroke={ANIMATION_THEME.border} strokeOpacity="0.2" strokeWidth="1" />
                            </g>
                        );
                    })}

                    {/* X-Axis Markers & Labels */}
                    {['Q1', 'Q2', 'Q3', 'Q4'].map((label, i) => {
                        const x = 60 + (i + 1) * 160;
                        return (
                            <g key={label}>
                                <line x1={x} y1="440" x2={x} y2="445" stroke={ANIMATION_THEME.border} strokeWidth="1" />
                                <text
                                    x={x} y="465"
                                    textAnchor="middle"
                                    className="fill-slate-500 text-[10px] font-bold tracking-widest"
                                >
                                    {label}
                                </text>
                            </g>
                        );
                    })}

                    {/* Data Particles (Floating Dots) */}
                    {[...Array(12)].map((_, i) => (
                        <motion.circle
                            key={i}
                            r={Math.random() * 2 + 1}
                            fill={ANIMATION_THEME.primary}
                            fillOpacity="0.3"
                            initial={{
                                cx: 100 + Math.random() * 600,
                                cy: 100 + Math.random() * 300
                            }}
                            animate={{
                                y: [0, -40, 0],
                                x: [0, Math.random() * 20 - 10, 0],
                                opacity: [0.2, 0.5, 0.2]
                            }}
                            transition={{
                                duration: 4 + Math.random() * 5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: Math.random() * 5
                            }}
                        />
                    ))}


                    {/* Safety Score Path (Orange) */}
                    <motion.path
                        d="M60,300 Q110,180 160,260 T260,340 T360,220 T460,300 T560,180 T660,280 T740,200"
                        fill="none"
                        stroke={ANIMATION_THEME.primary}
                        strokeWidth="3"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                    />

                    {/* Bias Guard Path (Dashed White) */}
                    <motion.path
                        d="M60,380 Q160,420 260,380 T460,420 T660,380 T740,420"
                        fill="none"
                        stroke={ANIMATION_THEME.text.muted}
                        strokeWidth="1.5"
                        strokeDasharray="6,6"
                        strokeOpacity="0.4"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
                    />

                    {/* Anchored Monitoring Points (Avatars with Pointers) */}
                    <motion.g
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, type: "spring" }}
                    >
                        {/* Pointer Stem/Triangle */}
                        <path
                            d="M360,220 L354,208 L366,208 Z"
                            fill={ANIMATION_THEME.primary}
                        />
                        {/* Avatar Circle */}
                        <circle cx="360" cy="196" r="14" fill="white" className="shadow-sm border border-slate-100" />
                        <motion.circle
                            cx="360" cy="196" r="17"
                            stroke={ANIMATION_THEME.primary} strokeWidth="1" fill="none"
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />
                        <foreignObject x="349" y="185" width="22" height="22">
                            <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                                <User size={12} className="text-gray-500" />
                            </div>
                        </foreignObject>
                    </motion.g>

                    <motion.g
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2, type: "spring" }}
                    >
                        {/* Pointer Stem/Triangle */}
                        <path
                            d="M560,180 L554,168 L566,168 Z"
                            fill={ANIMATION_THEME.primary}
                        />
                        {/* Avatar Circle */}
                        <circle cx="560" cy="156" r="14" fill="white" className="shadow-2rem" />
                        <motion.circle
                            cx="560" cy="156" r="17"
                            stroke={ANIMATION_THEME.primary} strokeWidth="1" fill="none"
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                        />
                        <foreignObject x="549" y="145" width="22" height="22">
                            <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                <User size={12} className="text-gray-600" />
                            </div>
                        </foreignObject>
                    </motion.g>
                </svg>

                {/* Relocated Status Badge */}


                {/* Scanning Light Effect - Subtler */}
                <motion.div
                    className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-white/10 to-transparent shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                    animate={{ left: ['5%', '95%'] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
            </div>

            {/* Premium Glassmorphism Metric Cards */}
            <motion.div
                className="absolute top-20 left-4 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-2xl p-5 rounded-[1.5rem] max-w-[180px] border border-white/40 z-10"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
                transition={{
                    opacity: { delay: 1 },
                    x: { delay: 1 },
                    y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                }}
            >
                <div className="flex items-center gap-3 mb-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100">
                        <BarChart3 className="text-brand-primary w-4 h-4" />
                    </div>
                    <div>
                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Accuracy & Policy</p>
                        <h4 className="text-xs font-bold text-gray-900 leading-tight">Safety Index</h4>
                    </div>
                </div>
                <div className="flex items-baseline gap-1.5">
                    <span className="text-xs font-black text-green-600 tracking-tighter">98.2%</span>
                    <span className="text-[9px] text-gray-400 font-semibold tracking-tight uppercase">NOMINAL</span>
                </div>
            </motion.div>

            <motion.div
                className="absolute bottom-20 right-4 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-2xl p-5 rounded-[1.5rem] max-w-[220px] border border-white/40 z-10"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0, y: [0, 8, 0] }}
                transition={{
                    opacity: { delay: 1.5 },
                    x: { delay: 1.5 },
                    y: { duration: 7, repeat: Infinity, ease: "easeInOut" }
                }}
            >
                <div className="flex items-center gap-4 mb-3">
                    <div className="flex-1">
                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Roles & Oversight</p>
                        <h4 className="text-xs font-bold text-gray-900 leading-tight">Human Accountability</h4>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-brand-primary/5 flex items-center justify-center border border-brand-primary/10">
                        <ShieldCheck className="text-brand-primary w-5 h-5" />
                    </div>
                </div>
                <div className="flex items-baseline gap-1.5">
                    <span className="text-xs font-black text-green-600 tracking-tighter">↑ 12.5%</span>
                    <span className="text-[9px] text-gray-400 font-semibold tracking-tight uppercase">vs last month</span>
                </div>
            </motion.div>
        </div>
    );
}

/* ─────────────────────── HELPER COMPONENTS ─────────────────────── */

function OurWay() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <div className="space-y-12">
            <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our way</h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                    Instead of the usual top-down methods, we take a bottom-up approach: we start with your real AI implementations to build a governance structure that actually works.
                </p>
            </div>

            <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {OUR_WAY_POINTS.map((point, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 24 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.1 * i, ease: 'easeOut' }}
                        className="group relative flex flex-col gap-5 p-7 rounded-2xl overflow-hidden
                            border border-white/10 hover:border-[#f9dc66]/40
                            bg-gradient-to-br from-white/[0.06] to-white/[0.02]
                            hover:from-[#f9dc66]/[0.07] hover:to-white/[0.02]
                            transition-all duration-300 cursor-default"
                    >
                        {/* subtle top-left glow on hover */}
                        <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-[#f9dc66]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        {/* icon box */}
                        <div className="relative w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
                            bg-white/5 border border-white/10 group-hover:border-[#f9dc66]/30
                            group-hover:bg-[#f9dc66]/10 transition-all duration-300">
                            <motion.div
                                animate={inView ? { rotate: [0, 8, -8, 0] } : {}}
                                transition={{ duration: 0.6, delay: 0.4 + 0.1 * i }}
                            >
                                {point.icon}
                            </motion.div>
                        </div>

                        {/* text */}
                        <div className="space-y-2">
                            <h4 className="text-base font-bold text-white leading-snug">{point.title}</h4>
                            <p className="text-sm text-gray-400 leading-relaxed">{point.description}</p>
                        </div>

                        {/* bottom brand accent line */}
                        <motion.div
                            className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#f9dc66]/60 to-transparent"
                            initial={{ width: 0 }}
                            animate={inView ? { width: '60%' } : {}}
                            transition={{ duration: 0.7, delay: 0.5 + 0.1 * i, ease: 'easeOut' }}
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

function InteractivePillars() {
    const [activePillar, setActivePillar] = useState(0);
    const [progress, setProgress] = useState(0);
    const DURATION = 5000; // 5 seconds per pillar

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    setActivePillar((curr) => (curr + 1) % PILLARS.length);
                    return 0;
                }
                return prev + (100 / (DURATION / 50)); // Update every 50ms
            });
        }, 50);

        return () => clearInterval(interval);
    }, [activePillar]);

    const handlePillarClick = (idx: number) => {
        setActivePillar(idx);
        setProgress(0);
    };

    return (
        <div className="space-y-12">
            {/* Top Grid: Content on Left, Framework on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24 items-start">
                {/* Left Side: Legend / Intro */}
                <div className="space-y-6 lg:pt-8">
                    <div className="flex items-start gap-4 mb-2">
                        <span className="w-2.5 h-2.5 rounded-sm bg-white mt-2 flex-shrink-0" />
                        <h2 className="text-3xl md:text-3xl font-bold text-white leading-tight">
                            Our 4-pillar governance framework
                        </h2>
                    </div>
                    <p className="text-gray-400 text-base leading-relaxed max-w-lg">
                        Our AI governance framework rests on four core pillars: identifying assets, engineering safety, enforcing accountability, and maintaining continuous compliance.
                    </p>
                </div>

                {/* Right Side: The Interactive Visual */}
                <div className="relative group max-w-2xl ml-auto w-full space-y-8">
                    {/* Interactive Badge */}
                    <div className="absolute -top-10 left-0 flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm z-10 lg:opacity-100">
                        <div className="w-4 h-4 bg-white rounded flex items-center justify-center p-0.5">
                            <Search className="text-black w-full h-full" strokeWidth={3} />
                        </div>
                        <span className="text-[10px] text-gray-300 font-bold tracking-tight">This animation is interactive</span>
                    </div>

                    {/* Main Pillars Card */}
                    <div className="bg-white/5 border border-white/10 rounded-[2rem] p-1.5 shadow-2xl relative overflow-hidden">
                        <div className="bg-white/5 backdrop-blur-xl rounded-[1.8rem] p-8 md:p-10 border border-white/5">
                            {/* Header Area */}
                            <div className="flex items-center gap-5 mb-8 border-b border-white/5 pb-8">
                                <div className="w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center bg-white shadow-sm text-brand-primary">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                    >
                                        <Scale size={28} />
                                    </motion.div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white leading-none mb-1.5">AI Governance Framework</h3>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Define, Implement, Evolve</p>
                                </div>
                            </div>

                            {/* The 4 pillars Grid */}
                            <div className="grid grid-cols-4 gap-2 h-44">
                                {PILLARS.map((pillar, i) => (
                                    <button
                                        key={pillar.id}
                                        onClick={() => handlePillarClick(i)}
                                        className="group relative flex flex-col items-center pt-8 pb-10 rounded-xl transition-all duration-300 overflow-hidden"
                                    >
                                        <div
                                            className={`absolute inset-0 transition-colors duration-500 ${activePillar === i
                                                ? 'bg-brand-primary/20'
                                                : 'bg-white/[0.03] group-hover:bg-white/[0.06]'
                                                }`}
                                        />
                                        <div className="absolute inset-x-1.5 top-1.5 bottom-4 rounded-lg bg-white/5 pointer-events-none" />
                                        <span className={`absolute bottom-3 text-[10px] font-bold transition-colors duration-500 ${activePillar === i ? 'text-brand-primary' : 'text-gray-400'
                                            }`}>
                                            Pillar {i + 1}
                                        </span>
                                        <div className="absolute bottom-0 left-0 w-full h-[8px] bg-white/5">
                                            {activePillar === i && (
                                                <motion.div
                                                    className="h-full bg-brand-primary"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${progress}%` }}
                                                    transition={{ duration: 0.1, ease: "linear" }}
                                                />
                                            )}
                                            {activePillar > i && (
                                                <div className="h-full w-full bg-brand-primary/40" />
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Selected Stage Detail Card - NOW BELOW PILLARS ONLY */}
                    <div className="w-full">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activePillar}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl flex items-center gap-6"
                            >
                                <div className="px-6 py-2.5 rounded-full border border-brand-primary/20 bg-brand-primary/10 text-brand-primary font-bold text-sm whitespace-nowrap">
                                    Pillar {activePillar + 1}
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xl md:text-2xl font-bold text-white leading-tight">
                                        {PILLARS[activePillar].title}
                                    </h4>
                                    <p className="hidden md:block text-gray-400 mt-1 leading-relaxed text-sm italic">
                                        {PILLARS[activePillar].description}
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─────────────────────── PAGE ─────────────────────── */

export default function AIGovernancePage() {
    const [activeService, setActiveService] = useState(0);
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

    /* Scroll-driven active service detection */
    useEffect(() => {
        const handleScroll = () => {
            const refs = sectionRefs.current;
            if (!refs.length) return;

            const scrollY = window.scrollY + window.innerHeight * 0.35;
            let current = 0;

            for (let i = 0; i < refs.length; i++) {
                const el = refs[i];
                if (el && el.offsetTop <= scrollY) {
                    current = i;
                }
            }

            setActiveService(current);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToService = (idx: number) => {
        sectionRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <main className="min-h-screen bg-transparent text-white selection:bg-brand-primary/20">

            {/* ───── HERO ───── */}
            <section className="relative bg-transparent">
                <div className="w-full px-8 md:px-24 lg:px-32 pt-24 md:pt-32 pb-12 md:pb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
                        {/* Left */}
                        <div className="space-y-5 md:space-y-8 pt-4 md:pt-8">
                            <span className="text-xs md:text-sm font-medium tracking-wide text-gray-500">
                                AI Governance
                            </span>

                            <h1 className="text-[2rem] md:text-[3.2rem] font-bold leading-[1.1] tracking-tight text-white">
                                Together, we{' '}
                                <span className="relative inline-block">
                                    <span className="text-brand-primary">turn</span>
                                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-brand-primary rounded-full" />
                                </span>{' '}
                                your AI governance into real, measurable action
                            </h1>

                            <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-[480px]">
                                We build the guardrails and oversight mechanisms that make your AI trustworthy.
                                From ethics to compliance, our solutions ensure your models perform safely and
                                remain aligned with global regulatory standards.
                            </p>

                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 bg-white text-black text-xs md:text-sm font-medium rounded-full hover:bg-gray-200 transition-colors"
                            >
                                Let&apos;s work together
                            </Link>
                        </div>

                        {/* Right — Hero Illustration */}
                        <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[500px] overflow-hidden">
                            <div className="absolute inset-0 w-[200%] h-[200%] md:w-[133.33%] md:h-[133.33%] lg:w-full lg:h-full scale-[0.5] md:scale-[0.75] lg:scale-100 origin-top-left transform-gpu">
                                <HeroIllustration />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ───── OUR WAY SECTION ───── */}
            <section className="bg-transparent border-t border-white/10">
                <div className="w-full px-8 md:px-24 lg:px-32 py-24">
                    <OurWay />
                </div>
            </section>

            {/* ───── 4-PILLAR FRAMEWORK ───── */}
            <section className="bg-transparent border-y border-white/10">
                <div className="w-full px-8 md:px-24 lg:px-32 py-24">
                    <InteractivePillars />
                </div>
            </section>



            {/* ───── VALUE-DRIVEN SERVICES (scroll-driven) ───── */}
            <section className="bg-transparent border-t border-white/10">
                <div className="w-full px-8 md:px-24 lg:px-32 py-24">
                    <h2 className="text-[2rem] md:text-[2.4rem] font-bold mb-20 text-white">Our <span className="text-brand-primary">value-driven</span> services</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-16 lg:gap-24">
                        {/* Left — Sticky Nav */}
                        <div className="hidden lg:block">
                            <nav className="sticky top-28 space-y-0">
                                {SERVICES.map((s, idx) => (
                                    <button
                                        key={s.id}
                                        onClick={() => scrollToService(idx)}
                                        className={`
                      w-full text-left px-0 py-2.5 text-[13px] font-medium transition-all duration-200 leading-snug block
                      ${activeService === idx
                                                ? 'text-brand-primary font-semibold'
                                                : 'text-gray-600 hover:text-gray-400'
                                            }
                    `}
                                    >
                                        <span className="flex items-start gap-3">
                                            <span className={`inline-block w-2 h-2 rounded-[2px] mt-1 flex-shrink-0 transition-colors duration-200 ${activeService === idx ? 'bg-brand-primary' : 'bg-transparent'
                                                }`} />
                                            {s.title}
                                        </span>
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Right — Scrolling Content */}
                        <div className="space-y-0">
                            {SERVICES.map((s, idx) => (
                                <div
                                    key={s.id}
                                    ref={(el) => { sectionRefs.current[idx] = el; }}
                                    className="scroll-mt-28 pb-16 mb-0 border-b border-white/10 last:border-b-0 last:pb-0"
                                >
                                    {/* Title */}
                                    <div className="flex items-start gap-3 mb-5">
                                        <span className="inline-block w-2.5 h-2.5 rounded-[2px] bg-brand-primary mt-2 flex-shrink-0" />
                                        <h3 className="text-xl md:text-[1.35rem] font-bold leading-tight text-brand-primary">
                                            {s.title}
                                        </h3>
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-400 text-[15px] leading-[1.8] ml-0 md:ml-[22px] mb-8 max-w-[640px]">
                                        {s.description}
                                    </p>

                                    {/* Illustration */}
                                    <div className="ml-0 md:ml-[22px] mt-4 overflow-hidden">
                                        <div className="origin-top-left scale-[0.72] md:scale-100 -mr-[38%] md:mr-0">
                                            <ServiceIllustration id={s.id} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ───── TOOLS SECTION ───── */}


            {/* ───── CTA SECTION ───── */}
            <section className="bg-transparent border-t border-white/10">
                <div className="w-full px-8 md:px-24 lg:px-32 py-28">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-brand-primary font-semibold text-sm tracking-wider">
                                Let&apos;s create value
                            </span>
                        </div>
                        <div className="space-y-6">
                            <h2 className="text-[2rem] md:text-[2.4rem] font-bold leading-tight text-white">
                                To help you deploy AI with<br />
                                <span className="text-gray-600">confidence and total security.</span>
                            </h2>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-medium rounded-full hover:bg-gray-200 transition-colors"
                            >
                                Contact us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

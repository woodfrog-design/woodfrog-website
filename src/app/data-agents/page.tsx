'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AutomatedDemo } from '@/components/animations/automated-demo';
import { AgentChatDemo } from '@/components/animations/agent-chat-demo';
import { CopilotStudioDemo } from '@/components/animations/copilot-studio-demo';
import { motion, useInView } from 'framer-motion';

/* ─────────────────────── DATA ─────────────────────── */

const CAPABILITIES = [
  { num: '01', text: 'Track your performance metrics in real time' },
  { num: '02', text: 'Warn you in real time when a signal falls outside the norm' },
  { num: '03', text: 'Reveal the insights driving your trends' },
  { num: '04', text: 'Guide you toward the most effective decisions' },
  { num: '05', text: 'Automatically launch operations or campaigns' },
  { num: '06', text: 'Engage in natural conversation, just like with a trusted colleague' },
];

const WHY_ITEMS = [
  {
    id: 'analysis',
    title: 'Analysis on demand',
    description:
      'Simply ask, and get the answer directly, without switching tools or reading lengthy reports.',
  },
  {
    id: 'exploration',
    title: 'Open data exploration',
    description:
      'You no longer need to plan every chart ahead of time. The agent explores your data and uncovers answers to even the most unexpected questions.',
  },
  {
    id: 'debt',
    title: 'Reducing analytical debt',
    description:
      'Stop accumulating dashboards no one reads. A data agent delivers the right insight, to the right person, at the right time.',
  },
  {
    id: 'action',
    title: 'Action over reporting',
    description:
      'Go beyond static reports. The agent can trigger actions, send alerts, and launch workflows based on the data it analyzes.',
  },
  {
    id: 'continuous',
    title: 'Continuous, real-time insights',
    description:
      'Your agent never sleeps. It monitors your data continuously and flags anomalies, trends, and opportunities as they happen.',
  },
  {
    id: 'adaptive',
    title: 'Adaptive, real-time insights',
    description:
      'The agent learns from your questions and adapts its responses to your evolving needs, delivering increasingly relevant insights over time.',
  },
  {
    id: 'silos',
    title: 'Breaking down silos, sparking collaboration',
    description:
      'Data agents bridge departments by making shared data accessible through conversation, fostering cross-team collaboration.',
  },
  {
    id: 'rapid',
    title: 'Rapid insights without the heavy engineering work',
    description:
      'Get answers fast without waiting for a data engineering sprint. The agent leverages existing data infrastructure to deliver value immediately.',
  },
];

const FOUNDATION_POINTS = [
  {
    bold: 'Mastery of LLMs (Large Language Models)',
    rest: ' to understand and generate accurate, natural responses',
  },
  {
    bold: 'A reliable and well-governed data layer',
    rest: ' to prevent hallucinations and ensure answer quality',
  },
  {
    bold: 'Real-world expertise',
    rest: ' in data governance, integration, and business process automation',
  },
];

/* ─────────────────────── ILLUSTRATION COMPONENTS ─────────────────────── */

/* Woodfrog Agent avatar */
const AgentAvatar = () => (
  <div className="w-9 h-9 rounded-full bg-[#c0392b] flex items-center justify-center flex-shrink-0 shadow">
    <img src="/logos/woodfrog-logo.svg" width="16" height="16" alt="Woodfrog Agent" className="object-contain brightness-0 invert" />
  </div>
);

/* Fivetran icon */
const FivetranIcon = ({ size = 32 }: { size?: number }) => (
  <img src="/logos/image1.svg" width={size} height={size} alt="Fivetran" className="object-contain bg-white rounded-lg p-1" />
);

/* Power BI icon */
const PowerBIIcon = ({ size = 32 }: { size?: number }) => (
  <img src="/logos/image7.svg" width={size} height={size} alt="Power BI" className="object-contain bg-white rounded-lg p-1" />
);

/* Microsoft Fabric icon */
const FabricIcon = ({ size = 32 }: { size?: number }) => (
  <img src="/logos/tools17.svg" width={size} height={size} alt="MS Fabric" className="object-contain bg-white rounded-lg p-1" />
);

/* Copilot Studio icon */
const CopilotIcon = ({ size = 32 }: { size?: number }) => (
  <img src="/logos/tools30.svg" width={size} height={size} alt="Copilot Studio" className="object-contain bg-white rounded-lg p-1" />
);

/* Power Automate icon */
const PowerAutomateIcon = ({ size = 32 }: { size?: number }) => (
  <img src="/logos/tools21.svg" width={size} height={size} alt="Power Automate" className="object-contain bg-white rounded-lg p-1" />
);

/* Azure Synapse icon */
const AzureIcon = ({ size = 32 }: { size?: number }) => (
  <img src="/logos/tools29.svg" width={size} height={size} alt="Azure" className="object-contain bg-white rounded-lg p-1" />
);

/* SharePoint icon */
const SharePointIcon = ({ size = 32 }: { size?: number }) => (
  <img src="/logos/tools27.svg" width={size} height={size} alt="SharePoint" className="object-contain bg-white rounded-lg p-1" />
);

/* ── 1. Analysis on demand — animated chat conversation ── */
function AnalysisIllustration() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-80px' });
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!inView) { setStep(0); return; }
    const timers = [
      setTimeout(() => setStep(1), 300),
      setTimeout(() => setStep(2), 1200),
      setTimeout(() => setStep(3), 2200),
      setTimeout(() => setStep(4), 3200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  const skuRows = [
    { sku: 'SKU-1045', name: 'AA batteries', stock: 120, threshold: 200, pct: 60 },
    { sku: 'SKU-2078', name: '2m cables', stock: 35, threshold: 100, pct: 35 },
    { sku: 'SKU-3120', name: 'Security cases', stock: 8, threshold: 20, pct: 40 },
  ];

  return (
    <div ref={ref} className="bg-[#f7f5f2] rounded-2xl overflow-hidden" style={{ height: 340 }}>
      <div className="h-full flex flex-col p-5 gap-3">
        {/* User bubble */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={step >= 1 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="self-end max-w-[80%]"
        >
          <div className="bg-[#e8e4f0] rounded-2xl rounded-tr-sm px-4 py-3 text-[13px] text-gray-700 leading-relaxed">
            Track inventory levels for all SKUs and generate a list of items below reorder point.
          </div>
        </motion.div>

        {/* Agent label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={step >= 2 ? { opacity: 1 } : {}}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2"
        >
          <AgentAvatar />
          <span className="text-[11px] text-gray-400 font-medium">Agent-01-Woodfrog</span>
        </motion.div>

        {/* Agent response card */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={step >= 2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl rounded-tl-sm p-4 shadow-sm text-[12px] text-gray-600 space-y-2"
        >
          <p className="font-medium text-gray-800 text-[13px]">Here is the current inventory status:</p>
          <div className="flex gap-4 text-[11px] text-gray-500 font-medium">
            <span>1,250 active SKUs</span>
            <span className="text-red-500 font-semibold">42 below reorder point</span>
          </div>
          <div className="space-y-1.5 pt-1">
            {skuRows.map((r, i) => (
              <motion.div
                key={r.sku}
                initial={{ opacity: 0, x: -8 }}
                animate={step >= 3 ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.35 }}
                className="flex items-center gap-2"
              >
                <span className="text-[10px] font-mono text-gray-400 w-16">{r.sku}</span>
                <span className="text-[10px] text-gray-500 flex-1">{r.name}</span>
                <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: r.pct < 50 ? '#ef4444' : '#f59e0b' }}
                    initial={{ width: 0 }}
                    animate={step >= 3 ? { width: `${r.pct}%` } : {}}
                    transition={{ delay: i * 0.15 + 0.2, duration: 0.5 }}
                  />
                </div>
                <span className="text-[10px] text-red-500 font-mono">{r.stock}/{r.threshold}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Input bar */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={step >= 4 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3 }}
          className="mt-auto bg-white rounded-xl px-4 py-2.5 flex items-center gap-2 shadow-sm border border-gray-100"
        >
          <span className="text-[12px] text-gray-400 flex-1">Write a new message</span>
          <div className="flex items-center gap-2 text-gray-300">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h8M7 4l3 3-3 3" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" /></svg>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5" stroke="#9CA3AF" strokeWidth="1.2" /><path d="M5 7 L6.5 8.5 L9 5.5" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" /></svg>
            <div className="w-6 h-6 rounded-full bg-[#c0392b] flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 8 L8 5 L2 2 L2 4.5 L6 5 L2 5.5 Z" fill="white" /></svg>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ── 2. Open data exploration — Fivetran + line chart + Copilot ── */
function ExplorationIllustration() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-80px' });
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!inView) { setStep(0); return; }
    const timers = [
      setTimeout(() => setStep(1), 300),
      setTimeout(() => setStep(2), 800),
      setTimeout(() => setStep(3), 1600),
    ];
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  const chartPts = [28, 35, 32, 48, 42, 55, 50, 62, 58, 70, 65, 75];
  const svgW = 320, svgH = 80;
  const pts = chartPts.map((v, i) => ({ x: (i / (chartPts.length - 1)) * svgW, y: svgH - (v / 100) * svgH }));
  const pathD = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  const areaD = `${pathD} L${svgW} ${svgH} L0 ${svgH} Z`;

  return (
    <div ref={ref} className="bg-[#f7f5f2] rounded-2xl overflow-hidden" style={{ height: 340 }}>
      <div className="h-full p-5 flex flex-col gap-3">
        {/* Top row — tool icons */}
        <div className="flex items-center gap-3">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={step >= 1 ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.4 }}>
            <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center">
              <FivetranIcon size={36} />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={step >= 1 ? { opacity: 1, scaleX: 1 } : {}} transition={{ duration: 0.5, delay: 0.2 }} style={{ originX: 0 }}>
            <svg width="60" height="12" viewBox="0 0 60 12">
              <line x1="0" y1="6" x2="52" y2="6" stroke="#b8a060" strokeWidth="1.5" strokeDasharray="4 3" />
              <polygon points="52,3 60,6 52,9" fill="#b8a060" />
            </svg>
          </motion.div>
          {/* Chart card */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={step >= 1 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex-1 bg-white rounded-xl shadow-md p-3"
          >
            <div className="flex items-center justify-between mb-1">
              <div>
                <span className="text-[10px] text-gray-400">woodfrog</span>
                <span className="text-[9px] text-gray-300 mx-1">|</span>
                <span className="text-[10px] text-gray-500">Total amount requested</span>
              </div>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="#9CA3AF" strokeWidth="1" /><path d="M4 6 L5.5 7.5 L8 4.5" stroke="#9CA3AF" strokeWidth="1" strokeLinecap="round" /></svg>
            </div>
            <p className="text-[14px] font-bold text-gray-800">$1,200.15</p>
            <svg width="100%" height={svgH} viewBox={`0 0 ${svgW} ${svgH}`} preserveAspectRatio="none" className="mt-1">
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E8501A" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#E8501A" stopOpacity="0" />
                </linearGradient>
              </defs>
              <motion.path d={areaD} fill="url(#chartGrad)" initial={{ opacity: 0 }} animate={step >= 2 ? { opacity: 1 } : {}} transition={{ duration: 0.6 }} />
              <motion.path d={pathD} fill="none" stroke="#E8501A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                initial={{ opacity: 0 }}
                animate={step >= 2 ? { opacity: 1 } : {}}
                transition={{ duration: 0.8 }}
              />
            </svg>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={step >= 1 ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.4, delay: 0.4 }}>
            <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center">
              <CopilotIcon size={36} />
            </div>
          </motion.div>
        </div>

        {/* User query bottom */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={step >= 3 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="mt-auto bg-white rounded-xl shadow-sm p-4 border border-gray-100"
        >
          <p className="text-[13px] text-gray-700 leading-relaxed">Track available liquidity and generate the list of accounts below the minimum threshold.</p>
          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2 flex-1">
              {[
                <svg key="a" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 3l4 4-4 4" stroke="#9CA3AF" strokeWidth="1.4" strokeLinecap="round" /></svg>,
                <svg key="b" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11 L7 3 L11 11" stroke="#9CA3AF" strokeWidth="1.4" strokeLinecap="round" /></svg>,
                <svg key="c" width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5" stroke="#9CA3AF" strokeWidth="1.2" /></svg>,
                <svg key="d" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7 L8 4 L8 10 Z" fill="#9CA3AF" /></svg>,
              ].map((icon, i) => <span key={i} className="text-gray-300">{icon}</span>)}
            </div>
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ repeat: Infinity, duration: 2, delay: 1 }}
              className="w-7 h-7 rounded-full bg-[#c0392b] flex items-center justify-center"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 8 L8 5 L2 2 L2 4.5 L6 5 L2 5.5 Z" fill="white" /></svg>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ── 3. Reducing analytical debt — report-replacement flow ── */
function AnalyticalDebtIllustration() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-80px' });
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!inView) { setStep(0); return; }
    const timers = [
      setTimeout(() => setStep(1), 300),
      setTimeout(() => setStep(2), 900),
      setTimeout(() => setStep(3), 1800),
      setTimeout(() => setStep(4), 2700),
    ];
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  const oldReports = ['Dashboard Q1 2023', 'Report Sales YTD', 'KPI Weekly Board', 'Pipeline Review'];
  const savings = [
    { label: 'Reports replaced', value: '14', color: '#E8501A' },
    { label: 'Hours saved / week', value: '28h', color: '#b8a060' },
    { label: 'Insights delivered', value: '340', color: '#22c55e' },
  ];

  return (
    <div ref={ref} className="bg-[#f7f5f2] rounded-2xl overflow-hidden" style={{ height: 340 }}>
      <div className="h-full p-5 flex flex-col gap-3">
        <div className="text-[12px] font-semibold text-gray-500 mb-1">Static dashboards replaced by the agent</div>

        {/* Old stale reports being struck through */}
        <div className="grid grid-cols-2 gap-2">
          {oldReports.map((r, i) => (
            <motion.div
              key={r}
              initial={{ opacity: 1 }}
              animate={step >= 2 ? { opacity: 0.4 } : {}}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="bg-white rounded-lg px-3 py-2 flex items-center gap-2 shadow-sm relative overflow-hidden"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="1" y="1" width="10" height="10" rx="1" stroke="#D1D5DB" strokeWidth="1.2" /><path d="M3 4h6M3 6h4M3 8h5" stroke="#D1D5DB" strokeWidth="1" /></svg>
              <span className="text-[11px] text-gray-500">{r}</span>
              <motion.div
                className="absolute inset-0 flex items-center"
                initial={{ scaleX: 0 }}
                animate={step >= 2 ? { scaleX: 1 } : {}}
                transition={{ delay: i * 0.1 + 0.2, duration: 0.4, originX: 0 }}
              >
                <div className="w-full h-px bg-red-400 mx-3" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Agent replaces with on-demand insight */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.97 }}
          animate={step >= 3 ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl p-3 shadow-md flex items-start gap-3 border-l-4 border-[#E8501A]"
        >
          <AgentAvatar />
          <div>
            <p className="text-[12px] font-semibold text-gray-800">Agent delivers on-demand</p>
            <p className="text-[11px] text-gray-500 mt-0.5">Right insight, right person, right time — no maintenance required.</p>
          </div>
        </motion.div>

        {/* KPI row */}
        <div className="grid grid-cols-3 gap-2 mt-auto">
          {savings.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 8 }}
              animate={step >= 4 ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.4 }}
              className="bg-white rounded-xl p-3 shadow-sm text-center"
            >
              <p className="text-[18px] font-bold" style={{ color: s.color }}>{s.value}</p>
              <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── 4. Action over reporting — agent triggers actions ── */
function ActionIllustration() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-80px' });
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!inView) { setStep(0); return; }
    const timers = [
      setTimeout(() => setStep(1), 200),
      setTimeout(() => setStep(2), 900),
      setTimeout(() => setStep(3), 1700),
      setTimeout(() => setStep(4), 2600),
    ];
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  const recommendations = [
    'Rebalance workload by shifting OF-2032 to night shift.',
    'Automatically generate a purchase request in the ERP for steel and plastic.',
    'Adjust the weekly schedule to reduce machine utilization to 85%.',
  ];

  return (
    <div ref={ref} className="bg-[#f7f5f2] rounded-2xl overflow-hidden" style={{ height: 340 }}>
      <div className="h-full p-5 flex flex-col gap-3">
        {/* User question bubble */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={step >= 1 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="self-end max-w-[85%]"
        >
          <div className="bg-[#e8e4f0] rounded-2xl rounded-tr-sm px-4 py-3 text-[13px] text-gray-700 leading-relaxed">
            Do we have enough steel and plastic for production? If not, prepare the orders.
          </div>
        </motion.div>

        {/* Agent recommendations card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={step >= 2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl rounded-tl-sm p-4 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-3">
            <AgentAvatar />
            <p className="text-[13px] font-semibold text-gray-800">Recommendations :</p>
          </div>
          <div className="space-y-2">
            {recommendations.map((rec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={step >= 3 ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.2, duration: 0.35 }}
                className="flex items-start gap-2"
              >
                <span className="text-[12px] font-bold text-[#b8a060] flex-shrink-0 mt-0.5">{i + 1}.</span>
                <span className="text-[12px] text-gray-600 leading-relaxed">{rec}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action triggered badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={step >= 4 ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
          className="mt-auto flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm border border-green-100"
        >
          <motion.div
            animate={step >= 4 ? { rotate: [0, 360] } : {}}
            transition={{ duration: 0.5 }}
            className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6 L4.5 8.5 L10 3" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" /></svg>
          </motion.div>
          <span className="text-[12px] font-medium text-gray-700">ERP purchase request generated automatically</span>
          <span className="ml-auto text-[10px] text-green-500 font-semibold bg-green-50 px-2 py-0.5 rounded-full">Done</span>
        </motion.div>
      </div>
    </div>
  );
}

/* ── 5. Continuous, real-time insights — live monitoring dashboard ── */
function ContinuousInsightsIllustration() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-80px' });
  const [step, setStep] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!inView) { setStep(0); setTick(0); return; }
    const t1 = setTimeout(() => setStep(1), 300);
    const t2 = setTimeout(() => setStep(2), 900);
    const t3 = setTimeout(() => setStep(3), 1600);
    const interval = setInterval(() => setTick(t => t + 1), 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearInterval(interval); };
  }, [inView]);

  const baseValues = [62, 58, 71, 65, 74, 68, 55, 72, 78, 66, 80, 73];
  const liveValues = baseValues.map((v, i) => Math.min(98, Math.max(40, v + Math.sin(tick * 0.5 + i) * 5)));
  const svgW = 280, svgH = 60;
  const pts2 = liveValues.map((v, i) => ({ x: (i / (liveValues.length - 1)) * svgW, y: svgH - (v / 100) * svgH }));
  const linePath = pts2.length > 1 ? pts2.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ') : 'M0 30';

  const kpis = [
    { label: 'Accuracy', value: '97.4%', color: '#22c55e', ok: true },
    { label: 'Latency', value: '142ms', color: '#f59e0b', ok: true },
    { label: 'Drift', value: 'Normal', color: '#22c55e', ok: true },
  ];

  return (
    <div ref={ref} className="bg-[#f7f5f2] rounded-2xl overflow-hidden" style={{ height: 340 }}>
      <div className="h-full p-5 flex flex-col gap-3">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={step >= 1 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2"
        >
          <FabricIcon size={28} />
          <div>
            <p className="text-[12px] font-semibold text-gray-700">Live Model Monitor</p>
            <div className="flex items-center gap-1">
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-1.5 h-1.5 rounded-full bg-green-500"
              />
              <span className="text-[10px] text-green-600 font-medium">Monitoring active</span>
            </div>
          </div>
        </motion.div>

        {/* Live chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={step >= 1 ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl p-3 shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-medium text-gray-600">Accuracy over time</span>
            <span className="text-[10px] text-gray-400">live</span>
          </div>
          <svg width="100%" height={svgH} viewBox={`0 0 ${svgW} ${svgH}`} preserveAspectRatio="none">
            <defs>
              <linearGradient id="liveGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
              </linearGradient>
            </defs>
            {linePath !== 'M0 30' && (
              <>
                <path d={`${linePath} L${svgW} ${svgH} L0 ${svgH} Z`} fill="url(#liveGrad)" />
                <path d={linePath} fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </>
            )}
          </svg>
        </motion.div>

        {/* KPIs */}
        <div className="grid grid-cols-3 gap-2">
          {kpis.map((k, i) => (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 6 }}
              animate={step >= 2 ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.35 }}
              className="bg-white rounded-xl p-3 shadow-sm text-center"
            >
              <p className="text-[14px] font-bold" style={{ color: k.color }}>{k.value}</p>
              <p className="text-[10px] text-gray-400">{k.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Alert notification */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={step >= 3 ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.4, type: 'spring', stiffness: 160 }}
          className="bg-white rounded-xl px-4 py-2.5 shadow-sm border-l-4 border-[#b8a060] flex items-center gap-3"
        >
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1 L13 12 L1 12 Z" fill="none" stroke="#b8a060" strokeWidth="1.4" />
              <line x1="7" y1="5" x2="7" y2="8" stroke="#b8a060" strokeWidth="1.4" strokeLinecap="round" />
              <circle cx="7" cy="10" r="0.7" fill="#b8a060" />
            </svg>
          </motion.div>
          <span className="text-[11px] text-gray-600">Agent flagged anomaly in Segment B — reviewing now</span>
        </motion.div>
      </div>
    </div>
  );
}

/* ── 6. Adaptive, real-time insights — roles & responsibilities table ── */
function AdaptiveIllustration() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-80px' });
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!inView) { setStep(0); return; }
    const timers = [
      setTimeout(() => setStep(1), 300),
      setTimeout(() => setStep(2), 700),
      setTimeout(() => setStep(3), 1100),
      setTimeout(() => setStep(4), 1500),
      setTimeout(() => setStep(5), 1900),
    ];
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  const users = [
    { name: 'Mathieu G.', email: 'mathieu@exemple.com', status: 'Active', statusColor: '#22c55e', statusBg: '#f0fdf4', role: 'Product owner', avatar: '👨‍💼' },
    { name: 'Amélie C.', email: 'amelie@exemple.com', status: 'Active', statusColor: '#22c55e', statusBg: '#f0fdf4', role: 'Domain expert', avatar: '👩‍💻' },
    { name: 'Olivier T.', email: 'olivier@exemple.com', status: 'Inactive', statusColor: '#9CA3AF', statusBg: '#f9fafb', role: 'Technical expert', avatar: '👨‍🔬' },
    { name: 'Jean-François B.', email: 'jf@exemple.com', status: 'Waiting', statusColor: '#f59e0b', statusBg: '#fffbeb', role: 'Data manager', avatar: '🧑‍💼' },
  ];

  return (
    <div ref={ref} className="bg-[#f7f5f2] rounded-2xl overflow-hidden" style={{ height: 340 }}>
      <div className="h-full p-5 flex flex-col">
        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={step >= 1 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl shadow-md overflow-hidden flex-1 flex flex-col"
        >
          {/* Card header */}
          <div className="px-5 pt-4 pb-3 flex items-center gap-3 border-b border-gray-100">
            <div className="w-10 h-10 rounded-xl bg-[#E8501A]/10 flex items-center justify-center flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 16 C4 11 7 8 10 8 C13 8 16 11 16 16" stroke="#E8501A" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                <circle cx="10" cy="5" r="3" stroke="#E8501A" strokeWidth="1.5" fill="none" />
              </svg>
            </div>
            <div>
              <p className="text-[13px] font-bold text-gray-800">Roles and responsibilities</p>
              <p className="text-[10px] text-gray-400">Last user activity</p>
            </div>
          </div>

          {/* Table header */}
          <div className="grid grid-cols-3 px-5 py-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
            <span>Users</span>
            <span className="text-center">Status</span>
            <span className="text-right">Role</span>
          </div>

          {/* Rows */}
          <div className="flex-1 overflow-hidden">
            {users.map((u, i) => (
              <motion.div
                key={u.name}
                initial={{ opacity: 0, x: -12 }}
                animate={step >= i + 2 ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-3 px-5 py-2.5 border-t border-gray-100 items-center"
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-[12px] flex-shrink-0">{u.avatar}</div>
                  <div>
                    <p className="text-[11px] font-semibold text-gray-700 leading-tight">{u.name}</p>
                    <p className="text-[9px] text-gray-400 leading-tight">{u.email}</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ color: u.statusColor, background: u.statusBg }}>
                    {u.status}
                  </span>
                </div>
                <div className="flex items-center justify-end gap-1">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="4" stroke="#9CA3AF" strokeWidth="1" /><path d="M5 3 L5 5 L7 5" stroke="#9CA3AF" strokeWidth="1" strokeLinecap="round" /></svg>
                  <span className="text-[10px] text-gray-500">{u.role}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ── 7. Breaking down silos — cross-team integration hub ── */
function SilosIllustration() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-80px' });
  const [step, setStep] = useState(0);
  const [activeLine, setActiveLine] = useState(0);

  useEffect(() => {
    if (!inView) { setStep(0); setActiveLine(0); return; }
    const t1 = setTimeout(() => setStep(1), 300);
    const t2 = setTimeout(() => setStep(2), 700);
    const interval = setInterval(() => setActiveLine(l => (l + 1) % 4), 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearInterval(interval); };
  }, [inView]);

  const teams = [
    { label: 'Sales', icon: '📊', color: '#E8501A' },
    { label: 'Finance', icon: '💰', color: '#b8a060' },
    { label: 'Ops', icon: '⚙️', color: '#0078D4' },
    { label: 'HR', icon: '👥', color: '#22c55e' },
  ];

  return (
    <div ref={ref} className="bg-[#f7f5f2] rounded-2xl overflow-hidden" style={{ height: 340 }}>
      <div className="h-full p-5 flex flex-col items-center justify-center gap-4">
        {/* Center hub */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={step >= 1 ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
          className="relative"
        >
          {/* Spokes */}
          <svg className="absolute" style={{ width: 260, height: 260, left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} viewBox="0 0 260 260">
            {teams.map((t, i) => {
              const angle = (i / 4) * Math.PI * 2 - Math.PI / 2;
              const x2 = 130 + Math.cos(angle) * 100;
              const y2 = 130 + Math.sin(angle) * 100;
              return (
                <motion.line
                  key={t.label}
                  x1="130" y1="130" x2={x2} y2={y2}
                  stroke={activeLine === i ? t.color : '#D1D5DB'}
                  strokeWidth={activeLine === i ? 2 : 1}
                  strokeDasharray="5 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={step >= 2 ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                />
              );
            })}
          </svg>

          {/* Satellite team cards */}
          {teams.map((t, i) => {
            const angle = (i / 4) * Math.PI * 2 - Math.PI / 2;
            const x = Math.cos(angle) * 100;
            const y = Math.sin(angle) * 100;
            return (
              <motion.div
                key={t.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={step >= 2 ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.1 + 0.2, duration: 0.4, type: 'spring' }}
                style={{ position: 'absolute', left: `calc(50% + ${x}px - 26px)`, top: `calc(50% + ${y}px - 26px)` }}
                className={`w-[52px] h-[52px] bg-white rounded-xl shadow-md flex flex-col items-center justify-center transition-all duration-300 ${activeLine === i ? 'shadow-lg ring-2' : ''}`}
                {...(activeLine === i ? { style: { position: 'absolute', left: `calc(50% + ${x}px - 26px)`, top: `calc(50% + ${y}px - 26px)`, ringColor: t.color } } : {})}
              >
                <span className="text-[18px]">{t.icon}</span>
                <span className="text-[9px] font-semibold text-gray-500">{t.label}</span>
              </motion.div>
            );
          })}

          {/* Center node */}
          <div className="w-[60px] h-[60px] bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center z-10 relative">
            <AgentAvatar />
            <span className="text-[8px] font-bold text-gray-500 mt-0.5">Agent</span>
          </div>
        </motion.div>

        {/* Caption */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={step >= 2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="text-[12px] text-gray-500 text-center max-w-[240px]"
        >
          One shared data conversation — across all departments
        </motion.p>
      </div>
    </div>
  );
}

/* ── 8. Rapid insights — fast pipeline, no engineering sprint ── */
function RapidInsightsIllustration() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-80px' });
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!inView) { setStep(0); return; }
    const timers = [
      setTimeout(() => setStep(1), 300),
      setTimeout(() => setStep(2), 700),
      setTimeout(() => setStep(3), 1200),
      setTimeout(() => setStep(4), 1800),
      setTimeout(() => setStep(5), 2500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  const pipeline = [
    { label: 'Question', icon: '💬', time: '0s', color: '#b8a060' },
    { label: 'Data fetch', icon: '🔗', time: '0.4s', color: '#0078D4' },
    { label: 'Processing', icon: '⚡', time: '0.8s', color: '#f59e0b' },
    { label: 'Answer', icon: '✅', time: '1.2s', color: '#22c55e' },
  ];

  return (
    <div ref={ref} className="bg-[#f7f5f2] rounded-2xl overflow-hidden" style={{ height: 340 }}>
      <div className="h-full p-5 flex flex-col gap-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0 }} animate={step >= 1 ? { opacity: 1 } : {}} transition={{ duration: 0.4 }}>
          <p className="text-[12px] font-semibold text-gray-500 mb-0.5">Time to insight</p>
          <p className="text-[22px] font-bold text-gray-800">
            <motion.span
              initial={{ opacity: 0 }}
              animate={step >= 4 ? { opacity: 1 } : {}}
              transition={{ duration: 0.4 }}
            >
              ~1.2s
            </motion.span>
            {step < 4 && <span className="text-gray-300">···</span>}
          </p>
          <p className="text-[11px] text-gray-400">vs. 2–3 week engineering sprint</p>
        </motion.div>

        {/* Pipeline steps */}
        <div className="flex items-center gap-1">
          {pipeline.map((p, i) => (
            <React.Fragment key={p.label}>
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={step >= i + 2 ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.35, type: 'spring', stiffness: 200 }}
                className="flex-1 bg-white rounded-xl px-2 py-3 shadow-sm text-center"
              >
                <span className="text-[18px]">{p.icon}</span>
                <p className="text-[10px] font-semibold text-gray-600 mt-1">{p.label}</p>
                <p className="text-[9px] font-mono" style={{ color: p.color }}>{p.time}</p>
              </motion.div>
              {i < pipeline.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={step >= i + 2 ? { opacity: 1, scaleX: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.1, originX: 0 }}
                >
                  <svg width="16" height="10" viewBox="0 0 16 10">
                    <path d="M0 5 L10 5" stroke="#b8a060" strokeWidth="1.5" strokeDasharray="3 2" />
                    <polygon points="10,2 16,5 10,8" fill="#b8a060" />
                  </svg>
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Tools used */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={step >= 4 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-xl p-3 shadow-sm"
        >
          <p className="text-[11px] text-gray-400 mb-2">Powered by existing infrastructure</p>
          <div className="flex items-center gap-2">
            <FabricIcon size={28} />
            <FivetranIcon size={28} />
            <PowerBIIcon size={28} />
            <CopilotIcon size={28} />
            <PowerAutomateIcon size={28} />
            <span className="text-[10px] text-gray-400 ml-auto">No new pipeline needed</span>
          </div>
        </motion.div>

        {/* Success message */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={step >= 5 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="bg-green-50 rounded-xl px-4 py-2.5 flex items-center gap-2 border border-green-100"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7 L5.5 10.5 L12 3" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" /></svg>
          <span className="text-[12px] text-green-700 font-medium">Insight delivered — zero engineering backlog required</span>
        </motion.div>
      </div>
    </div>
  );
}

/* ── Master switch ── */
function ServiceIllustration({ id }: { id: string }) {
  switch (id) {
    case 'analysis': return <AnalysisIllustration />;
    case 'exploration': return <ExplorationIllustration />;
    case 'debt': return <AnalyticalDebtIllustration />;
    case 'action': return <ActionIllustration />;
    case 'continuous': return <ContinuousInsightsIllustration />;
    case 'adaptive': return <AdaptiveIllustration />;
    case 'silos': return <SilosIllustration />;
    case 'rapid': return <RapidInsightsIllustration />;
    default: return null;
  }
}

/* ─────────────────────── PAGE ─────────────────────── */

export default function DataAgentsPage() {
  const [activeItem, setActiveItem] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* Scroll-driven active detection */
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

      setActiveItem(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToItem = (idx: number) => {
    sectionRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };



  return (
    <main className="min-h-screen bg-transparent text-white selection:bg-brand-primary/20" style={{ overflowX: 'clip' }}>

      {/* ───── HERO ───── */}
      <section className="relative bg-transparent overflow-hidden">
        <div className="w-full px-8 md:px-24 lg:px-32 pt-24 md:pt-32 pb-12 md:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Left */}
            <div className="space-y-5 md:space-y-8 pt-4 md:pt-8">
              <span className="text-xs md:text-sm font-medium tracking-wide text-gray-500">
                Data Agents
              </span>

              <h1 className="text-[2rem] md:text-[3.2rem] font-bold leading-[1.1] tracking-tight text-white">
                Together, we{' '}
                <span className="relative inline-block">
                  <span className="text-brand-primary">build</span>
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-brand-primary rounded-full" />
                </span>{' '}
                data agents you can truly trust
              </h1>

              <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-[480px]">
                Our data agents deliver accurate and reliable insights. They rely on trustworthy,
                well-governed, high-quality data made possible by the strong analytical foundations
                we build for our partners.
              </p>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 bg-white text-black text-xs md:text-sm font-medium rounded-full hover:bg-gray-200 transition-colors"
              >
                Let&apos;s work together
              </Link>
            </div>

            {/* Right — Hero Illustration */}
            <div className="bg-white rounded-lg overflow-hidden border border-white/10 aspect-[4/3] lg:aspect-auto lg:h-[600px] relative">
              <div className="absolute inset-0 w-[200%] h-[200%] md:w-[133.33%] md:h-[133.33%] lg:w-full lg:h-full scale-[0.5] md:scale-[0.75] lg:scale-100 origin-top-left transform-gpu">
                <AutomatedDemo />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── CAPABILITIES LIST ───── */}
      <section className="bg-transparent">
        <div className="w-full px-8 md:px-24 lg:px-32 py-24">
          <h2 className="text-[1.6rem] md:text-[2rem] font-bold leading-tight mb-12 text-white">
            Our experts implement intelligent agents that can:
          </h2>

          <div className="space-y-0">
            {CAPABILITIES.map((cap) => (
              <div
                key={cap.num}
                className="flex items-center border-t border-white/10 py-5"
              >
                <span className="text-white font-bold text-base w-16 flex-shrink-0">{cap.num}</span>
                <span className="text-gray-300 text-[15px] font-medium">{cap.text}</span>
              </div>
            ))}
            <div className="border-t border-white/10" />
          </div>

          <p className="text-brand-primary text-sm font-medium mt-8">
            Our agents plug directly into your tools and workflows to make your operations smarter.
          </p>
        </div>
      </section>

      {/* ───── AGENT CHAT DEMO ───── */}
      <section className="bg-transparent">
        <div className="w-full px-8 md:px-24 lg:px-32 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left — Animated Chat UI */}
            <div className="rounded-2xl overflow-hidden border border-white/10 aspect-[4/3] lg:aspect-auto lg:h-[560px] relative">
              <div className="absolute inset-0 w-[200%] h-[200%] md:w-[133.33%] md:h-[133.33%] lg:w-full lg:h-full scale-[0.5] md:scale-[0.75] lg:scale-100 origin-top-left transform-gpu">
                <AgentChatDemo />
              </div>
            </div>

            {/* Right — Proactive agent text */}
            <div className="space-y-6 pt-8">
              <h3 className="text-xl md:text-2xl font-bold text-white">A data agent is proactive when:</h3>
              <ul className="space-y-4 text-gray-400 text-[15px] leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-brand-primary mt-1">&#8226;</span>
                  It comes to you with the answers.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-primary mt-1">&#8226;</span>
                  It knows when a chart helps and when a simple sentence is enough.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-primary mt-1">&#8226;</span>
                  It acts like a colleague connected to your data, capable of analyzing, explaining, and taking action.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-primary mt-1">&#8226;</span>
                  It understands your questions and responds without technical jargon.
                </li>
              </ul>
              <p className="text-gray-500 text-[15px] leading-relaxed mt-4">
                That is the difference between &ldquo;<em className="text-gray-300">checking a report</em>&rdquo; and
                receiving the right decision right away. We have the expertise to connect analysis with action.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───── FOUNDATION SECTION ───── */}
      <section className="bg-transparent">
        <div className="w-full px-8 md:px-24 lg:px-32 py-12 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left — Text */}
            <div className="space-y-6">
              <h2 className="text-xl md:text-2xl font-bold leading-tight text-white">
                An intelligent agent is only as strong as the foundation it&apos;s built on
              </h2>

              <p className="text-gray-400 text-[15px]">At Woodfrog, we combine:</p>

              <ul className="space-y-3 text-gray-400 text-[15px] leading-relaxed">
                {FOUNDATION_POINTS.map((p, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-brand-primary mt-1">&#8226;</span>
                    <span><strong className="text-white">{p.bold}</strong>{p.rest}</span>
                  </li>
                ))}
              </ul>

              <p className="text-brand-primary text-[15px] leading-relaxed mt-4">
                We do not just plug an LLM into your data. We build the data infrastructure that makes it truly perform securely, efficiently, and at scale.
              </p>
            </div>

            {/* Right — Copilot Studio animated illustration */}
            <div className="overflow-hidden max-h-[280px] md:max-h-none -mb-4 md:mb-0">
              <div className="origin-top-left scale-[0.72] md:scale-100 -mr-[38%] md:mr-0">
                <CopilotStudioDemo />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── WHY USE A DATA AGENT (scroll-driven) ───── */}
      <section className="bg-transparent">
        <div className="w-full px-8 md:px-24 lg:px-32 py-24">
          <h2 className="text-[2rem] md:text-[2.4rem] font-bold mb-20 text-white">Why use a data agent?</h2>

          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-16 lg:gap-24">
            {/* Left — Sticky Nav */}
            <div className="hidden lg:block">
              <nav className="sticky top-28 space-y-0">
                {WHY_ITEMS.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToItem(idx)}
                    className={`
                      w-full text-left px-0 py-2.5 text-[13px] font-medium transition-all duration-200 leading-snug block
                      ${activeItem === idx
                        ? 'text-brand-primary font-semibold'
                        : 'text-gray-600 hover:text-gray-400'
                      }
                    `}
                  >
                    <span className="flex items-start gap-3">
                      <span className={`inline-block w-2 h-2 rounded-[2px] mt-1 flex-shrink-0 transition-colors duration-200 ${activeItem === idx ? 'bg-brand-primary' : 'bg-transparent'
                        }`} />
                      {item.title}
                    </span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Right — Scrolling Content */}
            <div className="space-y-0">
              {WHY_ITEMS.map((item, idx) => (
                <div
                  key={item.id}
                  ref={(el) => { sectionRefs.current[idx] = el; }}
                  className="scroll-mt-28 pb-16 mb-0 border-b border-white/10 last:border-b-0 last:pb-0"
                >
                  {/* Title */}
                  <div className="flex items-start gap-3 mb-5">
                    <span className="inline-block w-2.5 h-2.5 rounded-[2px] bg-brand-primary mt-2 flex-shrink-0" />
                    <h3 className="text-xl md:text-[1.35rem] font-bold leading-tight text-brand-primary">
                      {item.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-[15px] leading-[1.8] ml-0 md:ml-[22px] mb-8 max-w-[640px]">
                    {item.description}
                  </p>

                  {/* Illustration */}
                  <div className="ml-0 md:ml-[22px] mt-4 overflow-hidden">
                    <div className="origin-top-left scale-[0.72] md:scale-100 -mr-[38%] md:mr-0">
                      <ServiceIllustration id={item.id} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───── CTA SECTION ───── */}
      <section className="bg-transparent">
        <div className="w-full px-8 md:px-24 lg:px-32 py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-brand-primary font-semibold text-sm tracking-wider">
                Let&apos;s create value
              </span>
            </div>
            <div className="space-y-6">
              <h2 className="text-[1.5rem] md:text-[2.4rem] font-bold leading-tight text-white">
                To help you make the<br />
                <span className="text-brand-primary">right decisions</span> at the <span className="text-brand-primary">right moment</span>.
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

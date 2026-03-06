'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

/* ─────────────────────── DATA ─────────────────────── */

const CAPABILITIES = [
  { num: '01', text: 'Track your performance metrics in real time' },
  { num: '02', text: 'Warn you in real time when a signal falls outside the norm' },
  { num: '03', text: 'Reveal the insights driving your trends' },
  { num: '04', text: 'Guide you toward the most effective decisions' },
  { num: '05', text: 'Automatically launch operations or campaigns' },
  { num: '06', text: 'Engage in natural conversation, just like with a trusted colleague' },
];

const SERVICES = [
  {
    id: 'analysis',
    title: 'Analysis on demand',
    description:
      'Simply ask, and get the answer directly, without switching tools or reading lengthy reports. Our agents connect to your live data and respond with accurate, contextual insights in seconds.',
  },
  {
    id: 'exploration',
    title: 'Open data exploration',
    description:
      'You no longer need to plan every chart ahead of time. The agent explores your data and uncovers answers to even the most unexpected questions - surfacing patterns you didn\'t know to look for.',
  },
  {
    id: 'debt',
    title: 'Reducing analytical debt',
    description:
      'Stop accumulating dashboards no one reads. An AI agent delivers the right insight, to the right person, at the right time - eliminating reporting overhead and keeping your analytics stack lean.',
  },
  {
    id: 'action',
    title: 'Action over reporting',
    description:
      'Go beyond static reports. The agent can trigger actions, send alerts, and launch workflows based on the data it analyzes. From purchase orders to campaign adjustments, decisions become automated.',
  },
  {
    id: 'continuous',
    title: 'Continuous, real-time insights',
    description:
      'Your agent never sleeps. It monitors your data continuously and flags anomalies, trends, and opportunities as they happen - ensuring you never miss a critical signal.',
  },
  {
    id: 'adaptive',
    title: 'Adaptive intelligence',
    description:
      'The agent learns from your questions and adapts its responses to your evolving needs, delivering increasingly relevant insights over time. It gets smarter the more you use it.',
  },
  {
    id: 'silos',
    title: 'Breaking down silos',
    description:
      'AI agents bridge departments by making shared data accessible through natural conversation, fostering cross-team collaboration. Finance, ops, and marketing speak to the same source of truth.',
  },
  {
    id: 'rapid',
    title: 'Rapid insights without heavy engineering',
    description:
      'Get answers fast without waiting for a data engineering sprint. The agent leverages existing data infrastructure to deliver value immediately - no new pipelines, no migration projects.',
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

function ServiceIllustration({ id }: { id: string }) {
  switch (id) {
    case 'analysis':
      return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#4DA3FF] flex items-center justify-center flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 11L7 3L12 11" stroke="white" strokeWidth="1.5" fill="none" />
              </svg>
            </div>
            <div className="space-y-3 flex-1">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-gray-300">
                <p className="mb-2">Here is the current inventory status:</p>
                <ul className="list-disc ml-4 space-y-1 text-gray-400">
                  <li>1,250 active SKUs in the warehouse.</li>
                  <li>42 items are below their reorder point.</li>
                </ul>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-gray-300">
                <p className="font-medium mb-2">Critical examples:</p>
                <ul className="list-disc ml-4 space-y-1 text-gray-400">
                  <li>SKU-1045 (AA batteries) &rarr; stock: 120, threshold: 200.</li>
                  <li>SKU-2078 (2m network cables) &rarr; stock: 35, threshold: 100.</li>
                </ul>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-gray-300">
                Recommendation: Generate a supplier purchase order for these 42 items to avoid stockouts.
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
            <span className="text-gray-500 text-sm flex-1">Write a new message</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M10 5l3 3-3 3" stroke="#666" strokeWidth="1.5" /></svg>
          </div>
        </div>
      );

    case 'exploration':
      return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#4DA3FF] flex items-center justify-center flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 11L7 3L12 11" stroke="white" strokeWidth="1.5" fill="none" />
              </svg>
            </div>
            <div className="space-y-3 flex-1">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-end gap-2 h-24 mb-3">
                  {[40, 55, 35, 70, 60, 80, 45, 90, 75, 65].map((h, i) => (
                    <div key={i} className="flex-1 bg-[#10B981] rounded-t opacity-60" style={{ height: `${h}%` }} />
                  ))}
                </div>
                <p className="text-sm text-gray-400">Sales trend analysis - Q4 performance shows 23% growth across all segments</p>
              </div>
              <p className="text-xs text-gray-500">The agent generated this chart from a natural language question - no dashboard required.</p>
            </div>
          </div>
        </div>
      );

    case 'debt':
      return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#4DA3FF]/20 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="3" width="12" height="10" rx="2" stroke="#4DA3FF" strokeWidth="1.5" fill="none" />
                <line x1="2" y1="7" x2="14" y2="7" stroke="#4DA3FF" strokeWidth="1" opacity="0.5" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-300">Dashboard audit</span>
          </div>
          <div className="space-y-2">
            {[
              { name: 'Sales Overview v3', status: 'Replaced by agent', color: 'text-green-400' },
              { name: 'Weekly KPI Tracker', status: 'Replaced by agent', color: 'text-green-400' },
              { name: 'Ops Report (legacy)', status: 'Deprecated', color: 'text-yellow-400' },
              { name: 'Finance Monthly', status: 'Active - agent-assisted', color: 'text-brand-primary' },
            ].map((d) => (
              <div key={d.name} className="flex items-center justify-between border-t border-white/10 py-2">
                <span className="text-sm text-gray-400">{d.name}</span>
                <span className={`text-xs ${d.color}`}>{d.status}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500">3 dashboards retired. 1 enhanced. Zero reports missed.</p>
        </div>
      );

    case 'action':
      return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#4DA3FF] flex items-center justify-center flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 11L7 3L12 11" stroke="white" strokeWidth="1.5" fill="none" />
              </svg>
            </div>
            <div className="space-y-3 flex-1">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-gray-300">
                <p className="font-medium mb-2">Automated workflow triggered:</p>
                <div className="space-y-2">
                  {[
                    { label: 'Data validation complete', done: true },
                    { label: 'Alert sent to procurement team', done: true },
                    { label: 'Purchase order generation in progress...', done: false },
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded-full ${step.done ? 'bg-green-500/20' : 'bg-[#4DA3FF]/20'} flex items-center justify-center`}>
                        {step.done ? (
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="#22c55e" strokeWidth="1.5" /></svg>
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-[#4DA3FF]" />
                        )}
                      </div>
                      <span className="text-gray-400">{step.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'continuous':
      return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-end gap-1.5 h-28 mb-3">
            {[35, 42, 28, 55, 48, 62, 38, 70, 45, 58, 65, 40, 72, 50, 68, 55, 75, 48, 60, 52].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t transition-all duration-500"
                style={{
                  height: `${h}%`,
                  backgroundColor: i >= 17 ? '#10B981' : i >= 14 ? '#10B981aa' : '#10B98155',
                }}
              />
            ))}
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Continuous monitoring</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              2,847 events/s
            </span>
          </div>
        </div>
      );

    case 'adaptive':
      return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="7" stroke="#10B981" strokeWidth="1.5" fill="none" />
                <path d="M7 10l2 2 4-4" stroke="#10B981" strokeWidth="1.5" fill="none" />
              </svg>
            </div>
            <div className="flex-1 space-y-2">
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[85%] bg-gradient-to-r from-[#10B981] to-[#10B981] rounded-full" />
              </div>
              <div className="flex justify-between text-[10px] text-gray-500">
                <span>Agent accuracy over time</span>
                <span>85%</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Week 1', val: '62%' },
              { label: 'Week 4', val: '78%' },
              { label: 'Week 8', val: '85%' },
            ].map((item) => (
              <div key={item.label} className="bg-white/5 border border-white/10 rounded-lg p-2 text-center">
                <p className="text-sm font-bold text-white">{item.val}</p>
                <p className="text-[10px] text-gray-500">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      );

    case 'silos':
      return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
          {[
            { dept: 'Finance', query: 'What was our burn rate in Q3?', color: 'var(--brand-primary)' },
            { dept: 'Operations', query: 'Show me warehouse utilization trends', color: 'var(--brand-primary)' },
            { dept: 'Marketing', query: 'Which campaign drove the most sign-ups?', color: '#0078D4' },
          ].map((item) => (
            <div key={item.dept} className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${item.color}20` }}>
                <span className="text-[10px] font-bold" style={{ color: item.color }}>{item.dept[0]}</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 flex-1">
                <p className="text-[10px] font-medium mb-0.5" style={{ color: item.color }}>{item.dept}</p>
                <p className="text-sm text-gray-400">{item.query}</p>
              </div>
            </div>
          ))}
          <p className="text-xs text-gray-500 mt-2">Three departments, one agent, one source of truth.</p>
        </div>
      );

    case 'rapid':
      return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 font-medium w-24">Traditional</span>
            <div className="flex-1 h-6 bg-white/5 border border-white/10 rounded-lg overflow-hidden">
              <div className="h-full w-full bg-red-500/20 flex items-center px-3">
                <span className="text-[10px] text-red-400">2-3 weeks engineering sprint</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 font-medium w-24">With AI Agent</span>
            <div className="flex-1 h-6 bg-white/5 border border-white/10 rounded-lg overflow-hidden">
              <div className="h-full w-[15%] bg-brand-primary/30 flex items-center px-3">
                <span className="text-[10px] text-brand-primary whitespace-nowrap">Minutes</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500">Leverage existing data infrastructure. No new pipelines needed.</p>
        </div>
      );

    default:
      return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-center h-20 text-gray-500 text-sm">
            Agent preview
          </div>
        </div>
      );
  }
}

/* ─────────────────────── PAGE ─────────────────────── */

export default function AIAgentsPage() {
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
    <main className="min-h-screen bg-transparent text-white selection:bg-brand-primary/20" style={{ overflowX: 'clip' }}>

      {/* ───── HERO ───── */}
      <section className="relative bg-transparent overflow-hidden">
        <div className="w-full px-8 md:px-24 lg:px-32 pt-24 md:pt-32 pb-12 md:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Left */}
            <div className="space-y-5 md:space-y-8 pt-4 md:pt-8">
              <span className="text-xs md:text-sm font-medium tracking-wide text-gray-500">
                AI Agents
              </span>

              <h1 className="text-[2rem] md:text-[3.2rem] font-bold leading-[1.1] tracking-tight text-white">
                Together, we{' '}
                <span className="relative inline-block">
                  <span className="text-brand-primary">build</span>
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-brand-primary rounded-full" />
                </span>{' '}
                AI agents you can truly trust
              </h1>

              <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-[480px]">
                Our AI agents deliver accurate and reliable insights. They rely on trustworthy,
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

            {/* Right - Hero Illustration */}
            <div className="bg-white/[0.03] rounded-2xl overflow-hidden border border-white/10 mt-8 lg:mt-0 aspect-[4/3] lg:aspect-auto lg:h-auto relative">
              <div className="absolute inset-0 w-[200%] h-[200%] md:w-[133.33%] md:h-[133.33%] lg:w-full lg:h-full scale-[0.5] md:scale-[0.75] lg:scale-100 origin-top-left transform-gpu p-6 md:p-8 space-y-6">
                {/* Stats card */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-sm text-gray-400">In strong increase</p>
                      <p className="text-3xl font-bold text-white mt-1">1 482</p>
                      <p className="text-sm text-gray-500 mt-1">
                        <span className="text-green-400">&uarr; 8.2%</span> vs last month
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-[#10B981]/20 flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <rect x="3" y="10" width="3" height="7" rx="1" fill="#10B981" />
                        <rect x="8.5" y="6" width="3" height="11" rx="1" fill="#10B981" />
                        <rect x="14" y="3" width="3" height="14" rx="1" fill="#10B981" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Mini bar chart */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="flex items-end gap-3 h-20 mb-4">
                    <div className="flex-1 space-y-1 text-right text-[10px] text-gray-600 h-full flex flex-col justify-between">
                      <span>4k</span>
                      <span>2k</span>
                      <span>0</span>
                    </div>
                    {[
                      { v: 15, s: 8 },
                      { v: 25, s: 12 },
                      { v: 20, s: 15 },
                      { v: 40, s: 20 },
                      { v: 35, s: 25 },
                      { v: 50, s: 30 },
                      { v: 55, s: 35 },
                    ].map((d, i) => (
                      <div key={i} className="flex-1 flex gap-0.5 items-end">
                        <div className="flex-1 bg-[#10B981]/40 rounded-t" style={{ height: `${d.v}%` }} />
                        <div className="flex-1 bg-gray-600/40 rounded-t" style={{ height: `${d.s}%` }} />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-600 pl-8">
                    <span>Visitors</span>
                    <span>Sign-ups</span>
                  </div>
                </div>

                {/* Chat bubble */}
                <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-gray-300">
                  Can you give me the conversion rate for the Fabric demo sign-ups?
                </div>

                {/* Tool icons */}
                <div className="w-10 h-10 rounded-lg bg-white border border-white/10 flex items-center justify-center p-2 shadow-sm">
                  <img src="/logos/image12.svg" alt="Tool" className="w-full h-full object-contain" />
                </div>
                <div className="w-10 h-10 rounded-lg bg-white border border-white/10 flex items-center justify-center p-2 shadow-sm">
                  <img src="/logos/image2.svg" alt="Tool" className="w-full h-full object-contain" />
                </div>
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

      {/* ───── APPROACH SECTION ───── */}
      <section className="bg-transparent">
        <div className="w-full px-8 md:px-24 lg:px-32 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            <div className="space-y-6">
              <h2 className="text-[2rem] md:text-[2.4rem] font-bold leading-tight text-white">
                An AI agent is <span className="text-brand-primary">proactive</span> when it works for you
              </h2>
              <p className="text-gray-400 text-[15px] leading-[1.8]">
                It comes to you with the answers. It knows when a chart helps and when a simple sentence is enough. It acts like a colleague connected to your data, capable of analyzing, explaining, and taking action. It understands your questions and responds without technical jargon.
              </p>
            </div>
            <div className="space-y-6">
              <p className="text-gray-400 text-[15px] leading-[1.8]">
                That is the difference between &ldquo;<em className="text-gray-300">checking a report</em>&rdquo; and receiving the right decision right away. We have the expertise to connect analysis with action.
              </p>
              <p className="text-gray-400 text-[15px] leading-[1.8]">
                From Copilot Studio integrations to fully custom conversational agents, we meet you where your data lives and make it speak. Our agents are built on enterprise-grade infrastructure, secured by design, and governed by the same data quality standards we apply to every project.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───── FOUNDATION SECTION ───── */}
      <section className="bg-transparent">
        <div className="w-full px-8 md:px-24 lg:px-32 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left - Text */}
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

            {/* Right - Copilot Studio illustration */}
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-4">
              {/* Header bar */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-white border border-white/10 flex items-center justify-center p-1.5 shadow-sm">
                  <img src="/logos/image3.svg" alt="Copilot Studio" className="w-full h-full object-contain" />
                </div>
                <span className="text-sm font-medium text-gray-300">Copilot Studio</span>
              </div>

              {/* Agent header */}
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="w-8 h-8 rounded-full bg-[#4DA3FF] flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 9L6 3L10 9" stroke="white" strokeWidth="1.5" fill="none" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-white">Woodfrog - Agent</span>
                <div className="flex-1" />
                <div className="flex gap-4 text-xs text-gray-500">
                  <span>Overview</span>
                  <span>Knowledge</span>
                  <span>Tools</span>
                  <span className="text-white font-semibold border-b border-white pb-1">Agents</span>
                  <span>Topics</span>
                  <span>Activity</span>
                </div>
              </div>

              {/* Add agent button */}
              <div className="mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-primary/20 border border-brand-primary/30 rounded-lg text-xs text-brand-primary font-medium">
                  + Add an agent
                </div>
              </div>

              {/* Agent list */}
              <div className="space-y-0">
                {['Agent - 01 - Woodfrog', 'Agent - 02 - Woodfrog', 'Agent - 03 - Woodfrog'].map((name, i) => (
                  <div key={i} className="flex items-center border-t border-white/10 py-3">
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`w-6 h-6 rounded flex items-center justify-center ${i === 0 ? 'bg-[#4DA3FF]' : 'bg-green-600'}`}>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 7L5 3L8 7" stroke="white" strokeWidth="1" fill="none" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-300">{name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                        Connected
                      </span>
                      <span className="text-xs text-gray-600">By agent</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── WHY USE AN AI AGENT (scroll-driven) ───── */}
      <section className="bg-transparent">
        <div className="w-full px-8 md:px-24 lg:px-32 py-24">
          <h2 className="text-[2rem] md:text-[2.4rem] font-bold mb-20 text-white">Why use an AI agent?</h2>

          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-16 lg:gap-24">
            {/* Left - Sticky Nav */}
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
                      <span className={`inline-block w-2 h-2 rounded-[2px] mt-1 flex-shrink-0 transition-colors duration-200 ${activeService === idx ? 'bg-[#4DA3FF]' : 'bg-transparent'
                        }`} />
                      {s.title}
                    </span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Right - Scrolling Content */}
            <div className="space-y-0">
              {SERVICES.map((s, idx) => (
                <div
                  key={s.id}
                  ref={(el) => { sectionRefs.current[idx] = el; }}
                    className="scroll-mt-28 pt-8 pb-8 mb-0 border-b border-white/10 last:border-b-0 last:pb-0"
                >
                  {/* Title */}
                  <div className="flex items-start gap-3 mb-5">
                    <span className="inline-block w-2.5 h-2.5 rounded-[2px] bg-brand-primary mt-2 flex-shrink-0" />
                    <h3 className="text-xl md:text-[1.35rem] font-bold leading-tight text-brand-primary">
                      {s.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-[15px] leading-[1.8] ml-[22px] mb-8 max-w-[640px]">
                    {s.description}
                  </p>

                  {/* Illustration */}
                  <div className="ml-[22px] mt-4 aspect-square md:aspect-video lg:aspect-auto overflow-hidden relative border border-white/10 rounded-xl bg-white/5">
                    <div className="absolute inset-0 w-[200%] h-[200%] md:w-[133.33%] md:h-[133.33%] lg:w-full lg:h-full scale-[0.5] md:scale-[0.75] lg:scale-100 origin-top-left transform-gpu p-6">
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
      <section className="bg-[#111111]/50">
        <div className="w-full px-8 md:px-24 lg:px-32 py-32 relative overflow-hidden">
          {/* Scattered tool icons */}
          <div className="absolute inset-0 pointer-events-none">
            {[
              { abbr: 'CS', style: { top: '8%', left: '10%' } },
              { abbr: 'PB', style: { top: '6%', right: '12%' } },
              { abbr: 'Fb', style: { top: '28%', left: '3%' } },
              { abbr: 'Az', style: { top: '22%', left: '18%' } },
              { abbr: 'GP', style: { top: '25%', right: '4%' } },
              { abbr: 'Py', style: { top: '28%', right: '18%' } },
              { abbr: 'TS', style: { top: '65%', left: '10%' } },
              { abbr: 'SQ', style: { top: '62%', left: '25%' } },
              { abbr: 'LG', style: { top: '65%', right: '10%' } },
              { abbr: 'SP', style: { top: '68%', right: '22%' } },
            ].map((tool, i) => {
              const logoFiles = [
                'tools27.svg', 'tools28.svg', 'tools29.svg', 'tools30.svg', 'image11.svg',
                'image12.svg', 'image13.svg', 'image15.svg', 'image16.svg', 'image10.svg'
              ];
              return (
                <div
                  key={i}
                  className="absolute w-14 h-14 rounded-xl bg-white border border-white/10 flex items-center justify-center p-3 shadow-md"
                  style={tool.style as React.CSSProperties}
                >
                  <img
                    src={`/logos/${logoFiles[i]}`}
                    alt="Tool"
                    className="w-full h-full object-contain"
                  />
                </div>
              );
            })}
          </div>

          {/* Center content */}
          <div className="relative text-center max-w-lg mx-auto py-20 space-y-5">
            <h2 className="text-[2rem] md:text-[2.4rem] font-bold text-white">Powered by the best AI platforms</h2>
            <p className="text-gray-400 text-[15px] leading-relaxed">
              From Copilot Studio and Azure OpenAI to LangChain and custom LLM orchestration, we choose the right platform for every agent - always optimizing for accuracy, security, and enterprise-grade performance.
            </p>
            <div className="pt-4">
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
              <h2 className="text-[2rem] md:text-[2.4rem] font-bold leading-tight text-white">
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

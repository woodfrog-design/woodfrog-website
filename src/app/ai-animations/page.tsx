'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

/* ─────────────────────── DATA ─────────────────────── */

const CAPABILITIES = [
  { num: '01', text: 'Transform static dashboards into dynamic, living visual experiences' },
  { num: '02', text: 'Animate data transitions to reveal patterns hidden in static views' },
  { num: '03', text: 'Build interactive storytelling layers that guide users through insights' },
  { num: '04', text: 'Create real-time animated feeds that react to incoming data streams' },
  { num: '05', text: 'Design micro-interactions that make complex data intuitive at a glance' },
  { num: '06', text: 'Generate AI-powered motion graphics from raw datasets automatically' },
];

const SERVICES = [
  {
    id: 'generative',
    title: 'Generative motion design',
    description:
      'We use AI models to generate fluid, data-driven animations that adapt in real time. From procedural motion graphics to generative art layers, every visual element is produced programmatically to reflect your live data with elegance and precision.',
  },
  {
    id: 'storytelling',
    title: 'Animated data storytelling',
    description:
      'Static charts tell facts. Animated stories create understanding. We craft narrative-driven animation sequences that walk stakeholders through key metrics, trends, and anomalies - turning quarterly reviews into compelling visual journeys.',
  },
  {
    id: 'realtime',
    title: 'Real-time streaming visualizations',
    description:
      'Connect your live data pipelines to animated dashboards that pulse with every new event. Our streaming visualizations handle thousands of data points per second, rendering smooth particle flows, heatmaps, and graph animations without lag.',
  },
  {
    id: 'interactive',
    title: 'Interactive 3D data environments',
    description:
      'Step inside your data. We build WebGL and Three.js-powered 3D environments where users can rotate, zoom, and explore multidimensional datasets. From network graphs to geographic terrain models, every interaction reveals a deeper layer of insight.',
  },
  {
    id: 'micro',
    title: 'Micro-interaction & transition systems',
    description:
      'The details matter. We design cohesive animation systems - hover states, page transitions, loading sequences, and scroll-triggered reveals - that give your analytics platform a polished, premium feel while keeping users oriented.',
  },
  {
    id: 'explainer',
    title: 'AI-generated explainer animations',
    description:
      'Let AI do the explaining. We build pipelines that automatically generate short animated explainers from your data: annotated chart walkthroughs, anomaly highlight reels, and summary clips ready for Slack, email, or executive briefings.',
  },
  {
    id: 'dashboard',
    title: 'Animated dashboard components',
    description:
      'Drop-in animated components for your existing dashboards. Smooth number counters, animated progress rings, morphing chart transitions, and live sparklines - all optimized for performance and designed to integrate seamlessly with Power BI, Fabric, or custom React apps.',
  },
  {
    id: 'brand',
    title: 'Brand-aligned motion identity',
    description:
      'Your animations should feel like you. We develop a motion design system tied to your brand - defining easing curves, color transitions, timing standards, and animation tokens that ensure visual consistency across every data touchpoint.',
  },
];

const PROCESS_STEPS = [
  {
    bold: 'Data audit & motion mapping',
    rest: ' - we analyze your datasets and map which metrics benefit most from animation',
  },
  {
    bold: 'Design system integration',
    rest: ' - animations follow your brand tokens, color palette, and interaction patterns',
  },
  {
    bold: 'Performance-first engineering',
    rest: ' - GPU-accelerated rendering, lazy loading, and frame-budget optimization for 60fps',
  },
];

/* ─────────────────────── ILLUSTRATION COMPONENTS ─────────────────────── */

function ServiceIllustration({ id }: { id: string }) {
  switch (id) {
    case 'generative':
      return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-brand-primary/20 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6" stroke="var(--brand-primary)" strokeWidth="1.5" fill="none" />
                <circle cx="8" cy="8" r="2" fill="var(--brand-primary)" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-300">Generative Engine</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[0.2, 0.5, 0.8, 0.4, 0.6, 0.9, 0.3, 0.7, 0.5, 0.8, 0.2, 0.6].map((o, i) => (
              <div
                key={i}
                className="h-8 rounded-md bg-[#10B981]"
                style={{ opacity: o }}
              />
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Generating frames...
          </div>
        </div>
      );

    case 'storytelling':
      return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-brand-primary flex items-center justify-center text-[10px] font-bold text-black">1</div>
              <div className="flex-1 h-2 bg-brand-primary/30 rounded-full">
                <div className="h-2 w-3/4 bg-brand-primary rounded-full" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-brand-primary/80 flex items-center justify-center text-[10px] font-bold text-white">2</div>
              <div className="flex-1 h-2 bg-brand-primary/20 rounded-full">
                <div className="h-2 w-1/2 bg-brand-primary/80 rounded-full" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold text-gray-400">3</div>
              <div className="flex-1 h-2 bg-white/10 rounded-full">
                <div className="h-2 w-1/4 bg-white/30 rounded-full" />
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-2">Scene 2 of 3 - Revenue trend reveal</p>
          </div>
        </div>
      );

    case 'realtime':
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
            <span>Live stream</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              2,847 events/s
            </span>
          </div>
        </div>
      );

    case 'interactive':
      return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="relative h-32 flex items-center justify-center">
            {/* Wireframe cube */}
            <svg width="140" height="120" viewBox="0 0 140 120" fill="none">
              <polygon points="70,10 130,40 130,90 70,110 10,90 10,40" fill="none" stroke="#10B981" strokeWidth="1" opacity="0.4" />
              <polygon points="70,10 130,40 70,60 10,40" fill="none" stroke="#10B981" strokeWidth="1.5" opacity="0.6" />
              <line x1="70" y1="60" x2="70" y2="110" stroke="#10B981" strokeWidth="1" opacity="0.4" />
              {/* Data points */}
              <circle cx="50" cy="45" r="3" fill="#10B981" opacity="0.8" />
              <circle cx="90" cy="50" r="4" fill="#10B981" />
              <circle cx="70" cy="35" r="2.5" fill="#10B981" opacity="0.6" />
              <circle cx="60" cy="70" r="3.5" fill="#10B981" opacity="0.7" />
              <circle cx="85" cy="75" r="2" fill="#10B981" />
              <circle cx="45" cy="65" r="2" fill="#10B981" opacity="0.5" />
            </svg>
          </div>
          <p className="text-xs text-gray-500 text-center mt-2">Interactive 3D scatter - drag to explore</p>
        </div>
      );

    case 'micro':
      return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full border-2 border-brand-primary border-t-transparent" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[72%] bg-gradient-to-r from-brand-primary to-brand-primary/60 rounded-full" />
              </div>
              <div className="flex justify-between text-[10px] text-gray-500">
                <span>Loading assets</span>
                <span>72%</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            {['Fade', 'Slide', 'Scale', 'Morph'].map((label) => (
              <div key={label} className="flex-1 py-2 px-3 bg-white/5 border border-white/10 rounded-lg text-center text-[10px] text-gray-400">
                {label}
              </div>
            ))}
          </div>
        </div>
      );

    case 'explainer':
      return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-brand-primary flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 9L6 3L10 9" stroke="white" strokeWidth="1.5" fill="none" />
              </svg>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex-1 text-sm text-gray-300 space-y-2">
              <p className="font-medium text-white">Auto-generated summary:</p>
              <p className="text-gray-400 text-xs">Revenue increased 18% in Q3, driven by a 32% spike in enterprise subscriptions. Churn decreased to 2.1%.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><polygon points="3,1 12,7 3,13" fill="var(--brand-primary)" /></svg>
            <div className="flex-1 h-1 bg-white/10 rounded-full">
              <div className="h-1 w-2/5 bg-brand-primary rounded-full" />
            </div>
            <span className="text-[10px] text-gray-500">0:12 / 0:30</span>
          </div>
        </div>
      );

    case 'dashboard':
      return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="grid grid-cols-3 gap-3">
            {/* Counter */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-white">4.2k</p>
              <p className="text-[10px] text-gray-500">Active users</p>
            </div>
            {/* Ring */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center justify-center">
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                <circle cx="22" cy="22" r="18" stroke="#333" strokeWidth="3" />
                <circle cx="22" cy="22" r="18" stroke="#10B981" strokeWidth="3" strokeDasharray="84 113" strokeLinecap="round" transform="rotate(-90 22 22)" />
                <text x="22" y="26" textAnchor="middle" className="text-[10px] font-bold" fill="white">74%</text>
              </svg>
            </div>
            {/* Sparkline */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-end">
              <svg width="60" height="28" viewBox="0 0 60 28" fill="none" className="w-full">
                <polyline points="0,24 8,18 16,20 24,12 32,15 40,8 48,10 56,4" fill="none" stroke="#10B981" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
          <p className="text-[10px] text-gray-500 mt-3 text-center">Animated dashboard components - plug & play</p>
        </div>
      );

    case 'brand':
      return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 font-medium w-16">Easing</span>
            <div className="flex-1 h-8 bg-white/5 border border-white/10 rounded-lg flex items-center px-3">
              <svg width="100" height="20" viewBox="0 0 100 20" fill="none" className="w-full">
                <path d="M0,18 C30,18 20,2 100,2" fill="none" stroke="var(--brand-primary)" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 font-medium w-16">Palette</span>
            <div className="flex gap-2 flex-1">
              {['#C05621', '#C9A84C', '#E25D3E', '#0078D4', '#ffffff'].map((c) => (
                <div key={c} className="w-8 h-8 rounded-lg border border-white/10" style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 font-medium w-16">Timing</span>
            <div className="flex gap-2 flex-1 text-[10px] text-gray-400">
              <span className="px-2 py-1 bg-white/5 border border-white/10 rounded">300ms</span>
              <span className="px-2 py-1 bg-white/5 border border-white/10 rounded">ease-out</span>
              <span className="px-2 py-1 bg-white/5 border border-white/10 rounded">stagger: 50ms</span>
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-center h-20 text-gray-500 text-sm">
            Animation preview
          </div>
        </div>
      );
  }
}

/* ─────────────────────── PAGE ─────────────────────── */

export default function AIAnimationsPage() {
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
        <div className="w-full px-8 md:px-24 lg:px-32 pt-32 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left */}
            <div className="space-y-8 pt-8">
              <span className="text-sm font-medium tracking-wide text-gray-500">
                AI Animations
              </span>

              <h1 className="text-[2.6rem] md:text-[3.2rem] font-bold leading-[1.1] tracking-tight text-white">
                We{' '}
                <span className="relative inline-block">
                  <span className="text-brand-primary">animate</span>
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-brand-primary rounded-full" />
                </span>{' '}
                your data into stories that move
              </h1>

              <p className="text-gray-400 text-base leading-relaxed max-w-[480px]">
                From AI-generated motion graphics to real-time streaming visualizations,
                we transform static numbers into dynamic visual experiences that captivate
                and inform.
              </p>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-medium rounded-full hover:bg-gray-200 transition-colors"
              >
                Let&apos;s work together
              </Link>
            </div>

            {/* Right - Hero Illustration */}
            <div className="hidden lg:block bg-white/[0.03] rounded-lg overflow-hidden border border-white/10 p-8">
              <div className="space-y-6">
                {/* Animated wave visualization */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <svg width="100%" height="80" viewBox="0 0 400 80" fill="none" preserveAspectRatio="none">
                    <path
                      d="M0,40 C30,20 60,60 100,40 C140,20 160,60 200,40 C240,20 260,60 300,40 C340,20 360,60 400,40"
                      stroke="#10B981"
                      strokeWidth="2"
                      fill="none"
                      opacity="0.8"
                    />
                    <path
                      d="M0,50 C30,30 60,70 100,50 C140,30 160,70 200,50 C240,30 260,70 300,50 C340,30 360,70 400,50"
                      stroke="#10B981cc"
                      strokeWidth="1.5"
                      fill="none"
                      opacity="0.5"
                    />
                    <path
                      d="M0,35 C30,55 60,15 100,35 C140,55 160,15 200,35 C240,55 260,15 300,35 C340,55 360,15 400,35"
                      stroke="#10B98188"
                      strokeWidth="1"
                      fill="none"
                      opacity="0.3"
                    />
                  </svg>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-500">Signal processing</span>
                    <span className="text-xs text-gray-500 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      Live
                    </span>
                  </div>
                </div>

                {/* Metrics row */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                    <p className="text-xl font-bold text-white">60fps</p>
                    <p className="text-[10px] text-gray-500 mt-1">Render target</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                    <p className="text-xl font-bold text-brand-primary">2.4k</p>
                    <p className="text-[10px] text-gray-500 mt-1">Data points</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                    <p className="text-xl font-bold text-brand-primary">AI</p>
                    <p className="text-[10px] text-gray-500 mt-1">Powered</p>
                  </div>
                </div>

                {/* Particle grid */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <div className="grid grid-cols-8 gap-1.5">
                    {[0.3, 0.6, 0.2, 0.5, 0.7, 0.4, 0.1, 0.6, 0.5, 0.3, 0.7, 0.2, 0.4, 0.6, 0.3, 0.5, 0.2, 0.7, 0.4, 0.1, 0.6, 0.3, 0.5, 0.7, 0.2, 0.4, 0.6, 0.1, 0.5, 0.3, 0.7, 0.4].map((o, i) => (
                      <div
                        key={i}
                        className="aspect-square rounded-sm"
                        style={{
                          backgroundColor: '#10B981',
                          opacity: o,
                        }}
                      />
                    ))}
                  </div>
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
            Our AI animation experts can:
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
            Every animation is engineered for performance, accessibility, and seamless integration with your analytics stack.
          </p>
        </div>
      </section>

      {/* ───── APPROACH SECTION ───── */}
      <section className="bg-transparent">
        <div className="w-full px-8 md:px-24 lg:px-32 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            <div className="space-y-6">
              <h2 className="text-[2rem] md:text-[2.4rem] font-bold leading-tight text-white">
                Data without <span className="text-brand-primary">motion</span> is data without emotion
              </h2>
              <p className="text-gray-400 text-[15px] leading-[1.8]">
                Static dashboards overwhelm. Animated data clarifies. Our approach bridges the gap between raw analytics and human comprehension by adding the dimension of time to your visualizations. When data moves, people understand. When transitions are meaningful, insights are memorable.
              </p>
            </div>
            <div className="space-y-6">
              <p className="text-gray-400 text-[15px] leading-[1.8]">
                We combine expertise in motion design, WebGL rendering, and machine learning to create animations that are not just beautiful - they are functional. Every frame serves a purpose: guiding attention, revealing patterns, or confirming expectations. Our AI models learn from your data&apos;s structure to produce animations that feel natural and intuitive.
              </p>
              <p className="text-gray-400 text-[15px] leading-[1.8]">
                From Power BI embedded animations to fully custom Three.js environments, we meet you where your data lives and make it move.
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
                Great animations start with great engineering
              </h2>

              <p className="text-gray-400 text-[15px]">Our process ensures every animation is:</p>

              <ul className="space-y-3 text-gray-400 text-[15px] leading-relaxed">
                {PROCESS_STEPS.map((p, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-brand-primary mt-1">&#8226;</span>
                    <span><strong className="text-white">{p.bold}</strong>{p.rest}</span>
                  </li>
                ))}
              </ul>

              <p className="text-brand-primary text-[15px] leading-relaxed mt-4">
                We don&apos;t just add animations. We architect motion systems that scale with your data infrastructure.
              </p>
            </div>

            {/* Right - Tech stack illustration */}
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-4">
              {/* Header */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-brand-primary/20 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <polygon points="3,14 8,2 13,14" fill="none" stroke="var(--brand-primary)" strokeWidth="1.5" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-300">Animation Pipeline</span>
              </div>

              {/* Pipeline steps */}
              <div className="space-y-0">
                {[
                  { label: 'Data Source', tech: 'Fabric / APIs', status: 'connected' },
                  { label: 'AI Processing', tech: 'GPT + Custom Models', status: 'connected' },
                  { label: 'Motion Engine', tech: 'Three.js / D3 / Framer', status: 'connected' },
                  { label: 'Render Output', tech: '60fps WebGL / SVG', status: 'active' },
                ].map((step, i) => (
                  <div key={i} className="flex items-center border-t border-white/10 py-3">
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold ${i === 3 ? 'bg-brand-primary text-black' : 'bg-white/10 text-gray-400'}`}>
                        {i + 1}
                      </div>
                      <div>
                        <span className="text-sm text-gray-300">{step.label}</span>
                        <span className="text-[10px] text-gray-600 ml-2">{step.tech}</span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <span className={`w-1.5 h-1.5 rounded-full ${step.status === 'active' ? 'bg-brand-primary' : 'bg-green-400'}`} />
                      {step.status === 'active' ? 'Rendering' : 'Connected'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Output preview */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-2">
                <div className="flex items-end gap-1 h-12">
                  {[20, 35, 25, 50, 40, 65, 45, 70, 55, 80, 60, 75].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t bg-gradient-to-t from-[#10B981] to-[#10B981aa]"
                      style={{ height: `${h}%`, opacity: 0.4 + (i / 12) * 0.6 }}
                    />
                  ))}
                </div>
                <p className="text-[10px] text-gray-500 mt-2 text-center">Preview - animated bar chart transition</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── SERVICES (scroll-driven) ───── */}
      <section className="bg-bg-dark">
        <div className="w-full px-8 md:px-24 lg:px-32 py-24">
          <h2 className="text-[2rem] md:text-[2.4rem] font-bold mb-20 text-white">What we deliver</h2>

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
                      <span className={`inline-block w-2 h-2 rounded-[2px] mt-1 flex-shrink-0 transition-colors duration-200 ${activeService === idx ? 'bg-brand-primary' : 'bg-transparent'
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
                  <p className="text-gray-400 text-[15px] leading-[1.8] ml-[22px] mb-8 max-w-[640px]">
                    {s.description}
                  </p>

                  {/* Illustration */}
                  <div className="ml-[22px]">
                    <ServiceIllustration id={s.id} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───── TOOLS SECTION ───── */}
      <section className="bg-[#111111]">
        <div className="w-full px-8 md:px-24 lg:px-32 py-32 relative overflow-hidden">
          {/* Scattered tool icons */}
          <div className="absolute inset-0 pointer-events-none">
            {[
              { abbr: 'D3', color: '#E25D3E', style: { top: '8%', left: '10%' } },
              { abbr: 'GL', color: '#0078D4', style: { top: '6%', right: '12%' } },
              { abbr: 'Fm', color: 'var(--brand-primary)', style: { top: '28%', left: '3%' } },
              { abbr: 'Th', color: 'var(--brand-primary)', style: { top: '22%', left: '18%' } },
              { abbr: 'Lv', color: '#22c55e', style: { top: '25%', right: '4%' } },
              { abbr: 'Rv', color: '#0073FF', style: { top: '28%', right: '18%' } },
              { abbr: 'PB', color: '#F2C811', style: { top: '65%', left: '10%' } },
              { abbr: 'Fb', color: '#E25D3E', style: { top: '62%', left: '25%' } },
              { abbr: 'Py', color: '#3776AB', style: { top: '65%', right: '10%' } },
              { abbr: 'TF', color: '#FF6F00', style: { top: '68%', right: '22%' } },
            ].map((tool) => (
              <div
                key={tool.abbr}
                className="absolute w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center"
                style={tool.style as React.CSSProperties}
              >
                <span className="text-lg font-bold" style={{ color: tool.color }}>{tool.abbr}</span>
              </div>
            ))}
          </div>

          {/* Center content */}
          <div className="relative text-center max-w-lg mx-auto py-20 space-y-5">
            <h2 className="text-[2rem] md:text-[2.4rem] font-bold text-white">Powered by the best animation tools</h2>
            <p className="text-gray-400 text-[15px] leading-relaxed">
              From D3.js and Three.js to Framer Motion and custom WebGL shaders, we choose the right tool for every animation challenge - always optimizing for performance and visual fidelity.
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
      <section className="bg-black border-t border-white/10">
        <div className="w-full px-8 md:px-24 lg:px-32 py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-brand-primary font-semibold text-sm tracking-wider">
                Let&apos;s create value
              </span>
            </div>
            <div className="space-y-6">
              <h2 className="text-[2rem] md:text-[2.4rem] font-bold leading-tight text-white">
                Make your data move<br />
                <span className="text-gray-600">and your audience act.</span>
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

'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { SearchDemo } from '@/components/animations/search-demo';
import { motion, useInView } from 'framer-motion';

/* ─────────────────────── DATA ─────────────────────── */

const CHALLENGES = [
  {
    icon: 'alert',
    text: 'Your data team is overwhelmed with support requests and can no longer deliver real value.',
  },
  {
    icon: 'disconnect',
    text: 'The workflow keeps getting disrupted by urgent support requests from business users.',
  },
  {
    icon: 'checklist',
    text: 'Support tasks frustrate developers, who feel their skills are not being used to their full potential.',
  },
  {
    icon: 'block',
    text: 'It becomes almost impossible to balance support and the development of new solutions. Teams then start falling behind on deliveries, which leads to a loss of internal confidence in their ability to deliver effectively.',
  },
  {
    icon: 'decline',
    text: 'Teams lose motivation, and some employees leave because they no longer feel recognized.',
  },
];

const WHY_ITEMS = [
  {
    id: 'workload',
    title: 'Heavy workload',
    description:
      'Support can be demanding in terms of both time and energy. Developers may feel overwhelmed by having to balance new feature development with resolving existing issues.',
  },
  {
    id: 'context',
    title: 'Different context',
    description:
      'Development and support are two very different contexts. Most developers prefer building new solutions over troubleshooting existing ones.',
  },
  {
    id: 'skills',
    title: 'Specialized skills',
    description:
      'Support often requires a different skill set than development. Debugging production issues under pressure requires patience and systematic thinking that not every developer enjoys.',
  },
  {
    id: 'stress',
    title: 'Managing stress and pressure',
    description:
      'When critical systems go down, the pressure is immense. Developers in support roles bear the brunt of urgent escalations, which can lead to burnout over time.',
  },
  {
    id: 'appreciation',
    title: 'Lack of appreciation',
    description:
      'Support work is often invisible. When things work, nobody notices. When they break, everyone complains. This lack of recognition can be deeply demotivating for talented developers.',
  },
];

const WORKFLOW_STEPS = [
  { label: 'Incident', icon: 'incident', color: 'var(--brand-primary)' },
  { label: 'Support', icon: 'support', color: '#333' },
  { label: 'Analysis', icon: 'analysis', color: '#333' },
  { label: 'Execution', icon: 'execution', color: '#333' },
  { label: 'Closing', icon: 'closing', color: 'var(--brand-primary)' },
];

const PLATFORM_CARDS = [
  {
    id: 'communication',
    title: 'Smarter, centralized communication',
    description:
      'We bring all your channels together, including email, chat, phone, social media, and customer portal, in a single environment that ensures no information is lost and every interaction is seamlessly tracked.',
    hasIllustration: 'channels',
  },
  {
    id: 'partner',
    title: '360\u00B0 partner view',
    description:
      'Every interaction is logged and easily accessible, providing our teams with instant understanding of the context, previous requests, and actions already taken.',
    hasIllustration: 'users',
  },
  {
    id: 'prioritization',
    title: 'Data and rule-based prioritization',
    description:
      'Requests are automatically sorted, assigned, and monitored according to defined criteria, ensuring efforts are directed toward the areas of highest impact.',
    hasIllustration: 'tickets',
  },
  {
    id: 'recurring',
    title: 'Recurring process automation',
    description:
      'Smart responses, dynamic routing, and optimized workflows minimize manual effort, allowing teams to concentrate on high-value tasks.',
    hasIllustration: 'recurring',
  },
  {
    id: 'analytics',
    title: 'Real-time operational analytics',
    description:
      'Interactive reports and insightful dashboards help you monitor performance, detect trends, and act on opportunities for improvement in real time.',
    hasIllustration: 'analytics',
  },
  {
    id: 'experience',
    title: 'Data-driven experience optimization',
    description:
      'Faster response times, personalized interactions, and communication through preferred channels help improve customer satisfaction and loyalty.',
    hasIllustration: 'experience',
  },
];

/* ─────────────────────── ICON COMPONENTS ─────────────────────── */

function ChallengeIcon({ type }: { type: string }) {
  const base = 'w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center';
  switch (type) {
    case 'alert':
      return (
        <div className={base}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="var(--brand-primary)" strokeWidth="1.5" />
            <line x1="12" y1="8" x2="12" y2="13" stroke="var(--brand-primary)" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="16" r="1" fill="var(--brand-primary)" />
          </svg>
        </div>
      );
    case 'disconnect':
      return (
        <div className={base}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M8 8L16 16M16 8L8 16" stroke="var(--brand-primary)" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M4 12h3M17 12h3" stroke="var(--brand-primary)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      );
    case 'checklist':
      return (
        <div className={base}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6 7L8 9L12 5" stroke="var(--brand-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="14" y1="7" x2="19" y2="7" stroke="var(--brand-primary)" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M6 13L8 15L12 11" stroke="var(--brand-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="14" y1="13" x2="19" y2="13" stroke="var(--brand-primary)" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="6" y1="19" x2="19" y2="19" stroke="var(--brand-primary)" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
          </svg>
        </div>
      );
    case 'block':
      return (
        <div className={base}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="var(--brand-primary)" strokeWidth="1.5" />
            <line x1="7" y1="7" x2="17" y2="17" stroke="var(--brand-primary)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      );
    case 'decline':
      return (
        <div className={base}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <polyline points="4,8 10,14 14,10 20,16" stroke="var(--brand-primary)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="16,16 20,16 20,12" stroke="var(--brand-primary)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      );
    default:
      return <div className={base} />;
  }
}

function WhyIllustration({ id }: { id: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-10% 0px' });

  /* ── WORKLOAD ── */
  if (id === 'workload') {
    const bars = [30, 45, 25, 60, 55, 70, 40, 80, 65, 50];
    const maxBar = 80;
    return (
      <div ref={ref} className="bg-[#f4f4f5] rounded-2xl overflow-hidden" style={{ minHeight: 380 }}>
        {/* Top row: Active Sessions + Dev badge */}
        <div className="p-6 pb-3 flex items-start gap-4">
          {/* Active sessions card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-5 shadow-sm flex-1"
          >
            <div className="flex items-start justify-between mb-3">
              <p className="text-[11px] text-gray-400 font-medium">Active Sessions</p>
              <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <rect x="1" y="7" width="2.5" height="5" rx="0.5" fill="#9ca3af" />
                  <rect x="5" y="4" width="2.5" height="8" rx="0.5" fill="#9ca3af" />
                  <rect x="9" y="1" width="2.5" height="11" rx="0.5" fill="#9ca3af" />
                </svg>
              </div>
            </div>
            <motion.p
              className="text-[2.2rem] font-bold text-gray-900 tabular-nums leading-none mb-3"
              animate={inView ? { opacity: [1, 0.7, 1] } : {}}
              transition={{ duration: 2.5, repeat: Infinity, delay: 1.2 }}
            >1 418</motion.p>
            {/* Bar chart */}
            <div className="flex items-end gap-[3px] h-10">
              {bars.map((h, i) => (
                <div key={i} className="flex-1 flex items-end" style={{ height: '100%' }}>
                  <motion.div
                    className="w-full rounded-t-[2px]"
                    style={{ backgroundColor: i >= 7 ? '#f97316' : '#fed7aa' }}
                    initial={{ height: 0 }}
                    animate={inView ? { height: `${(h / maxBar) * 100}%` } : { height: 0 }}
                    transition={{ duration: 0.45, delay: 0.15 + i * 0.06 }}
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right column: Dev badge + "Click here to correct" */}
          <div className="flex flex-col items-end gap-2 pt-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.45, delay: 0.4 }}
              className="flex items-center gap-2 bg-[#12122a] text-white text-[11px] font-medium pl-1.5 pr-3 py-1.5 rounded-full shadow-lg"
            >
              <div className="w-6 h-6 rounded-full bg-[#2d2d4e] overflow-hidden flex items-center justify-center flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="5.5" r="2.5" fill="#aaa" /><path d="M2 13c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5" fill="#aaa" /></svg>
              </div>
              Dev 01
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.45, delay: 0.65 }}
              className="bg-[#12122a] text-white text-[11px] px-3.5 py-2 rounded-xl shadow-lg font-medium whitespace-nowrap"
            >
              Click here to correct
            </motion.div>
          </div>
        </div>

        {/* Bottom row: Security incidents + Error toast */}
        <div className="px-6 pb-6 flex items-end gap-4">
          {/* Security incidents */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-2xl p-4 shadow-sm w-52 flex-shrink-0"
          >
            <p className="text-[11px] text-gray-500 mb-0.5">Security incidents</p>
            <p className="text-xl font-bold text-gray-900 mb-3">72 incidents</p>
            <div className="flex items-end gap-4">
              {[{ label: 'Minor', h: 14, color: '#f9dc66' }, { label: 'Major', h: 22, color: '#f97316' }, { label: 'Critical', h: 18, color: '#dc2626' }].map((s, i) => (
                <div key={s.label} className="flex flex-col items-center gap-1.5">
                  <motion.div
                    className="w-4 rounded-t-[2px]"
                    style={{ backgroundColor: s.color }}
                    initial={{ height: 0 }}
                    animate={inView ? { height: s.h } : { height: 0 }}
                    transition={{ duration: 0.5, delay: 0.75 + i * 0.12 }}
                  />
                  <span className="text-[8px] text-gray-400">{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Error toast */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.45, delay: 0.95 }}
            className="flex-1 bg-white border border-red-100 rounded-2xl p-4 shadow-md"
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><line x1="4" y1="2" x2="4" y2="5" stroke="#dc2626" strokeWidth="1.2" strokeLinecap="round" /><circle cx="4" cy="6.5" r="0.5" fill="#dc2626" /></svg>
              </div>
              <span className="text-[11px] font-semibold text-red-600">Form validation error</span>
            </div>
            <p className="text-[11px] text-gray-500">One or more fields contain an error</p>
          </motion.div>
        </div>
      </div>
    );
  }

  /* ── CONTEXT ── */
  if (id === 'context') {
    const devItems = [
      { tag: 'NUC-344', dev: 'Dev 01', arrowColor: '#12122a' },
      { tag: 'NUC-338', dev: 'Dev 02', arrowColor: '#374151' },
      { tag: 'NUC-331', dev: 'Dev 03', arrowColor: '#f97316' },
    ];
    const supportItems = ['NUC-343', 'NUC-335', 'NUC-312'];
    return (
      <div ref={ref} className="bg-[#f4f4f5] rounded-2xl overflow-hidden" style={{ minHeight: 400 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3 px-6 pt-6 pb-4"
        >
          <div className="w-10 h-10 rounded-xl bg-[#f97316] flex items-center justify-center shadow-md flex-shrink-0">
            <span className="text-white font-bold text-base">W</span>
          </div>
          <span className="font-bold text-gray-900 text-[15px]">woodfrog</span>
          <div className="ml-auto flex -space-x-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-[#f4f4f5] bg-gray-300 flex items-center justify-center overflow-hidden">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="6" r="3" fill="#888" /><path d="M2 15c0-3.3 2.7-6 6-6s6 2.7 6 6" fill="#888" /></svg>
              </div>
            ))}
            <div className="w-8 h-8 rounded-full border-2 border-[#f4f4f5] bg-[#f97316] flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0">+17</div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 px-6 pb-6">
          {/* New solutions col */}
          <div>
            <p className="text-[11px] text-gray-500 font-semibold mb-3 flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="2" cy="2" r="1.5" fill="#9ca3af" /><circle cx="6" cy="2" r="1.5" fill="#9ca3af" />
                <circle cx="2" cy="6" r="1.5" fill="#9ca3af" /><circle cx="6" cy="6" r="1.5" fill="#9ca3af" />
              </svg>
              New solutions
            </p>
            <div className="space-y-2.5">
              {devItems.map((item, i) => (
                <motion.div
                  key={item.tag}
                  initial={{ opacity: 0, x: -18 }} animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -18 }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.14 }}
                  className="bg-white rounded-2xl p-3.5 shadow-sm"
                >
                  <div className="h-2 bg-gray-100 rounded-full w-full mb-2" />
                  <div className="h-2 bg-gray-100 rounded-full w-2/3 mb-3.5" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <svg width="8" height="8" viewBox="0 0 8 8"><rect width="8" height="8" rx="1.5" fill="#f97316" /></svg>
                      <span className="text-[9px] text-gray-500 font-medium">{item.tag}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {/* Arrow pointer */}
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <polygon points="0,10 5,0 10,10" fill={item.arrowColor} />
                      </svg>
                      <div className="w-5 h-5 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="4.5" r="2" fill="#888" /><path d="M1.5 11c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5" fill="#888" /></svg>
                      </div>
                      <span className="text-[9px] font-semibold text-gray-700">{item.dev}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Existing problems col */}
          <div>
            <p className="text-[11px] text-gray-500 font-semibold mb-3 flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="2" cy="2" r="1.5" fill="#9ca3af" /><circle cx="6" cy="2" r="1.5" fill="#9ca3af" />
                <circle cx="2" cy="6" r="1.5" fill="#9ca3af" /><circle cx="6" cy="6" r="1.5" fill="#9ca3af" />
              </svg>
              Existing problems
            </p>
            <div className="space-y-2.5">
              {supportItems.map((tag, i) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, x: 18 }} animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 18 }}
                  transition={{ duration: 0.4, delay: 0.28 + i * 0.14 }}
                  className="bg-white rounded-2xl p-3.5 shadow-sm"
                >
                  <div className="h-2 bg-gray-100 rounded-full w-full mb-2" />
                  <div className="h-2 bg-gray-100 rounded-full w-4/5 mb-3.5" />
                  <div className="flex items-center gap-1.5">
                    <svg width="8" height="8" viewBox="0 0 8 8"><rect width="8" height="8" rx="1.5" fill="#f97316" /></svg>
                    <span className="text-[9px] text-gray-500 font-medium">{tag}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── SKILLS ── */
  if (id === 'skills') {
    const skills = [
      { icon: '👤', label: 'Communication with users' },
      { icon: '✓', label: 'Priority management' },
      { icon: '🧩', label: 'Quick problem resolution' },
    ];
    return (
      <div ref={ref} className="bg-[#f4f4f5] rounded-2xl p-6 overflow-hidden" style={{ minHeight: 320 }}>
        {/* Dev badge */}
        <motion.div
          initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 justify-end mb-4"
        >
          <span className="text-[11px] font-semibold text-gray-700">Dev 01</span>
          <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center border-2 border-white shadow">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="6" r="3" fill="#888" /><path d="M2 15c0-3.3 2.7-6 6-6s6 2.7 6 6" fill="#888" /></svg>
          </div>
          <div className="w-0 h-0 border-t-4 border-b-4 border-l-[8px] border-transparent border-l-[#1a1a2e]" />
        </motion.div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white rounded-2xl px-5 py-4 shadow-md mb-3 flex items-center justify-between"
        >
          <span className="text-[13px] text-gray-500">What specific skills are needed to provide support?</span>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="8" cy="8" r="5" stroke="#9ca3af" strokeWidth="1.5" /><path d="M12 12l3 3" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" /></svg>
        </motion.div>

        {/* Skill items */}
        <div className="space-y-2">
          {skills.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.15 }}
              className="bg-white rounded-2xl px-5 py-3 shadow-sm flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm flex-shrink-0">
                {i === 0 && <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="6" r="3" stroke="#9ca3af" strokeWidth="1.3" /><path d="M2 15c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#9ca3af" strokeWidth="1.3" /></svg>}
                {i === 1 && <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="#9ca3af" strokeWidth="1.3" /><path d="M5 8l2 2 4-4" stroke="#9ca3af" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                {i === 2 && <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="10" rx="2" stroke="#9ca3af" strokeWidth="1.3" /><path d="M5 7h6M5 10h4" stroke="#9ca3af" strokeWidth="1.1" strokeLinecap="round" /></svg>}
              </div>
              <span className="text-[13px] text-gray-700 font-medium">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  /* ── STRESS ── */
  if (id === 'stress') {
    return (
      <div ref={ref} className="bg-[#f4f4f5] rounded-2xl overflow-hidden" style={{ minHeight: 380 }}>
        <div className="p-6 flex flex-col gap-4">
          {/* Top: two KPI cards side-by-side */}
          <div className="flex gap-4">
            {/* Resolution time main card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-5 shadow-sm flex-1"
            >
              <p className="text-[10px] text-gray-400 font-medium mb-0.5">Support Team</p>
              <p className="text-[17px] font-bold text-gray-900 leading-tight">Average resolution time</p>
              <p className="text-[11px] font-semibold text-[#f97316] mt-1">
                + 20.5% <span className="text-gray-400 font-normal">average resolution time (YOY)</span>
              </p>
              {/* Area chart */}
              <div className="mt-4 relative h-24">
                <svg viewBox="0 0 300 60" className="w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="stressGrad2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f97316" stopOpacity="0.22" />
                      <stop offset="100%" stopColor="#f97316" stopOpacity="0.02" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,52 C25,48 45,20 70,17 C95,14 115,30 140,32 C165,34 185,22 210,25 C235,28 265,44 300,50 L300,60 L0,60 Z"
                    fill="url(#stressGrad2)"
                  />
                  <motion.path
                    d="M0,52 C25,48 45,20 70,17 C95,14 115,30 140,32 C165,34 185,22 210,25 C235,28 265,44 300,50"
                    fill="none" stroke="#f97316" strokeWidth="1.8"
                    initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ duration: 1.3, delay: 0.4, ease: 'easeInOut' }}
                  />
                </svg>
              </div>
            </motion.div>

            {/* Critical tickets KPI */}
            <motion.div
              initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-2xl px-5 py-4 shadow-sm flex flex-col justify-center gap-2 w-44 flex-shrink-0"
            >
              <p className="text-[10px] text-gray-400 font-medium leading-tight">Number of critical tickets</p>
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 13V5M8 5L5 8M8 5L11 8" stroke="#f97316" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-2xl font-bold text-gray-900 tabular-nums">54.31%</span>
              </div>
            </motion.div>
          </div>

          {/* Bottom: two secondary stat cards */}
          <div className="flex gap-4">
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.45, delay: 0.55 }}
              className="bg-white rounded-2xl px-5 py-4 shadow-sm flex items-center gap-3 flex-1"
            >
              <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5" stroke="#dc2626" strokeWidth="1.4" /><line x1="7" y1="4.5" x2="7" y2="7.5" stroke="#dc2626" strokeWidth="1.4" strokeLinecap="round" /><circle cx="7" cy="9.5" r="0.6" fill="#dc2626" /></svg>
              </div>
              <div>
                <p className="text-[10px] text-gray-400">Escalated tickets</p>
                <p className="text-[15px] font-bold text-gray-900">38 <span className="text-[11px] font-normal text-red-500">↑ this week</span></p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.45, delay: 0.7 }}
              className="bg-white rounded-2xl px-5 py-4 shadow-sm flex items-center gap-3 flex-1"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2L8.5 5.5H12L9.2 7.8L10.2 11.5L7 9.3L3.8 11.5L4.8 7.8L2 5.5H5.5Z" stroke="#d97706" strokeWidth="1.2" fill="none" /></svg>
              </div>
              <div>
                <p className="text-[10px] text-gray-400">Avg. stress index</p>
                <p className="text-[15px] font-bold text-gray-900">7.4 / 10 <span className="text-[11px] font-normal text-amber-500">High</span></p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  /* ── APPRECIATION ── */
  if (id === 'appreciation') {
    const segments = [
      { pct: 45, color: '#8b8b00', label: 'Demotivating', full: 'State that the support is demotivating' },
      { pct: 25, color: '#f97316', label: 'Neutral', full: 'Remain neutral toward support tasks' },
      { pct: 20, color: '#fed7aa', label: 'Some value', full: 'Find some value in the work' },
      { pct: 10, color: '#7f1d1d', label: 'Learning', full: 'See it as a learning opportunity' },
    ];

    const r = 56, cx2 = 76, cy2 = 76;
    const circumference = 2 * Math.PI * r;
    let cumulative = 0;

    return (
      <div ref={ref} className="bg-white rounded-2xl p-6 shadow-sm overflow-hidden">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="text-[15px] font-bold text-gray-900 mb-0.5">Motivation related to support tasks</p>
            <p className="text-[11px] text-gray-400">2025 — woodfrog internal survey</p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 1.1 }}
            className="text-right"
          >
            <p className="text-[10px] text-gray-400 leading-none">vs last year</p>
            <p className="text-[18px] font-bold text-[#f97316] leading-tight">+20%</p>
          </motion.div>
        </div>

        <div className="flex gap-6 items-stretch">
          {/* Donut */}
          <div className="flex-shrink-0">
            <svg width="152" height="152" viewBox="0 0 152 152">
              {segments.map((seg, i) => {
                const offset = circumference * (1 - cumulative / 100);
                const dash = circumference * seg.pct / 100;
                const el = (
                  <motion.circle
                    key={seg.color}
                    cx={cx2} cy={cy2} r={r}
                    fill="none"
                    stroke={seg.color}
                    strokeWidth="20"
                    strokeDasharray={`${dash} ${circumference - dash}`}
                    strokeDashoffset={offset}
                    style={{ transformOrigin: `${cx2}px ${cy2}px`, transform: 'rotate(-90deg)' }}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.55, delay: 0.25 + i * 0.2 }}
                  />
                );
                cumulative += seg.pct;
                return el;
              })}
              <text x={cx2} y={cy2 - 8} textAnchor="middle" style={{ fontSize: 24, fontWeight: 800, fill: '#111' }}>55%</text>
              <text x={cx2} y={cy2 + 10} textAnchor="middle" style={{ fontSize: 9.5, fill: '#9ca3af' }}>feel unsatisfied</text>
            </svg>
          </div>

          {/* Right: legend + stat cards */}
          <div className="flex-1 flex flex-col justify-between gap-3">
            {/* Legend items */}
            <div className="space-y-2">
              {segments.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, x: 14 }} animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 14 }}
                  transition={{ duration: 0.35, delay: 0.35 + i * 0.14 }}
                  className="flex items-center gap-2.5"
                >
                  <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: s.color }} />
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-[11.5px] text-gray-700 font-medium">{s.label}</span>
                    <span className="text-[11px] text-gray-400 font-semibold tabular-nums">{s.pct}%</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-2">
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: 0.9 }}
                className="bg-gray-50 rounded-xl p-3 border border-gray-100"
              >
                <p className="text-[9px] text-gray-400 mb-1">Avg. recognition score</p>
                <p className="text-[17px] font-bold text-gray-900">3.1 <span className="text-[10px] font-normal text-red-400">/ 10</span></p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: 1.05 }}
                className="bg-gray-50 rounded-xl p-3 border border-gray-100"
              >
                <p className="text-[9px] text-gray-400 mb-1">Turnover linked to support</p>
                <p className="text-[17px] font-bold text-gray-900">31% <span className="text-[10px] font-normal text-amber-500">↑</span></p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="bg-[#f4f4f5] rounded-2xl p-6 flex items-center justify-center" style={{ minHeight: 240 }}>
      <span className="text-gray-400 text-sm">Preview</span>
    </div>
  );
}

/* ─────────────────────── PAGE ─────────────────────── */

export default function HelpdeskPage() {
  const [activeWhy, setActiveWhy] = useState(0);
  const whyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  const horizontalContainerRef = useRef<HTMLDivElement>(null);

  /* Scroll-driven active "why" detection */
  useEffect(() => {
    const handleScroll = () => {
      const refs = whyRefs.current;
      if (!refs.length) return;

      const threshold = window.innerHeight * 0.35;
      let current = 0;

      for (let i = 0; i < refs.length; i++) {
        const el = refs[i];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= threshold) {
            current = i;
          }
        }
      }

      setActiveWhy(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Horizontal scroll for platform section */
  useEffect(() => {
    const container = horizontalContainerRef.current;
    const scrollContent = horizontalScrollRef.current;
    if (!container || !scrollContent) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollProgress = -rect.top / (containerHeight - viewportHeight);
      const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
      const maxTranslate = scrollContent.scrollWidth - window.innerWidth + 200;
      scrollContent.style.transform = `translateX(-${clampedProgress * maxTranslate}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToWhy = (idx: number) => {
    whyRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
                Helpdesk
              </span>

              <h1 className="text-[2rem] md:text-[3.2rem] font-bold leading-[1.1] tracking-tight text-white">
                We{' '}
                <span className="relative inline-block">
                  <span className="text-brand-primary">collaborate</span>
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-brand-primary rounded-full" />
                </span>{' '}
                with your teams as if we were part of them
              </h1>

              <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-[480px]">
                Our experts are first and foremost people who care about helping others.
                Combining a clear understanding of business challenges with strong
                technical expertise, we work alongside your teams with empathy and
                precision to drive meaningful impact.
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
                <SearchDemo />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── CHALLENGES ───── */}
      <section className="bg-transparent">
        <div className="w-full px-8 md:px-24 lg:px-32 py-24">
          <h2 className="text-[2rem] md:text-[2.4rem] font-bold leading-tight mb-16 text-white max-w-[600px]">
            We know the challenges your data team is facing
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CHALLENGES.map((challenge, idx) => (
              <div key={idx} className="space-y-4">
                <ChallengeIcon type={challenge.icon} />
                <p className="text-gray-400 text-[15px] leading-relaxed">{challenge.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── WHY YOUR TEAM DOESN'T ENJOY SUPPORT (scroll-driven) ───── */}
      <section className="bg-transparent">
        <div className="w-full px-8 md:px-24 lg:px-32 py-24">
          <h2 className="text-[2rem] md:text-[2.4rem] font-bold mb-6 text-white">
            Why your team doesn&apos;t enjoy doing support?
          </h2>
          <p className="text-gray-400 text-[15px] leading-relaxed mb-20 max-w-[600px]">
            Your data team struggles to deliver the expected value to the business because it is overwhelmed by user support tasks.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-16 lg:gap-24">
            {/* Left — Sticky Nav */}
            <div className="hidden lg:block">
              <nav className="sticky top-28 space-y-0">
                {WHY_ITEMS.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => scrollToWhy(idx)}
                    className={`
                      w-full text-left px-0 py-2.5 text-[13px] font-medium transition-all duration-200 leading-snug block
                      ${activeWhy === idx
                        ? 'text-brand-primary font-semibold'
                        : 'text-gray-600 hover:text-gray-400'
                      }
                    `}
                  >
                    <span className="flex items-start gap-3">
                      <span className={`inline-block w-2 h-2 rounded-[2px] mt-1 flex-shrink-0 transition-colors duration-200 ${activeWhy === idx ? 'bg-brand-primary' : 'bg-transparent'
                        }`} />
                      {s.title}
                    </span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Right — Scrolling Content */}
            <div className="space-y-0">
              {WHY_ITEMS.map((s, idx) => (
                <div
                  key={s.id}
                  ref={(el) => { whyRefs.current[idx] = el; }}
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
                  <div className="ml-0 md:ml-[22px] mt-4 rounded-2xl overflow-hidden">
                    <div className="origin-top-left scale-[0.72] md:scale-100 -mr-[38%] md:mr-0">
                      <WhyIllustration id={s.id} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───── STREAMLINED SUPPORT WORKFLOW ───── */}
      <section className="bg-transparent">
        <div className="w-full px-8 md:px-24 lg:px-32 py-16">
          <h2 className="text-[2rem] md:text-[2.4rem] font-bold text-white text-center mb-12">
            Streamlined support workflow
          </h2>

          <div className="flex items-center justify-center gap-3 md:gap-6 flex-wrap">
            {WORKFLOW_STEPS.map((step, idx) => (
              <React.Fragment key={step.label}>
                {/* Incident pill */}
                {idx === 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45 }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#f97316] shadow-lg shadow-orange-500/30"
                  >
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                      <circle cx="7.5" cy="7.5" r="6" stroke="white" strokeWidth="1.6" />
                      <line x1="7.5" y1="4" x2="7.5" y2="8.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                      <circle cx="7.5" cy="10.5" r="0.9" fill="white" />
                    </svg>
                    <span className="text-sm font-semibold text-white tracking-wide">{step.label}</span>
                  </motion.div>
                )}

                {/* Middle steps: big dark sticker cards */}
                {idx > 0 && idx < WORKFLOW_STEPS.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.13 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <div className="w-[80px] h-[80px] rounded-[20px] bg-[#1e1e1e] shadow-2xl flex items-center justify-center relative overflow-hidden group">
                      {/* top-left gradient sheen */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-transparent pointer-events-none rounded-[20px]" />
                      {/* bottom border glow */}
                      <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-white/10" />

                      {step.icon === 'support' && (
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                          <rect x="5" y="9" width="30" height="20" rx="4.5" fill="white" fillOpacity="0.07" />
                          <rect x="5" y="9" width="30" height="20" rx="4.5" stroke="white" strokeWidth="1.6" />
                          {/* tail */}
                          <path d="M9 29l5 5v-5" fill="white" fillOpacity="0.65" />
                          {/* lines */}
                          <line x1="12" y1="17" x2="28" y2="17" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
                          <line x1="12" y1="22" x2="22" y2="22" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
                        </svg>
                      )}

                      {step.icon === 'analysis' && (
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                          {/* magnifier */}
                          <circle cx="17" cy="18" r="9" stroke="white" strokeWidth="1.7" />
                          <line x1="23.5" y1="24.5" x2="33" y2="34" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
                          {/* mini bar chart inside */}
                          <rect x="11" y="21" width="3.5" height="5" rx="1" fill="white" fillOpacity="0.45" />
                          <rect x="16" y="17" width="3.5" height="9" rx="1" fill="#f97316" fillOpacity="0.95" />
                          <rect x="21" y="13" width="3.5" height="13" rx="1" fill="white" fillOpacity="0.28" />
                        </svg>
                      )}

                      {step.icon === 'execution' && (
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                          {/* gear teeth */}
                          <path
                            d="M20 7l2.5 3.5 4.5-.7 1.1 4.3-3.2 3 1.1 4.3-4.5 1.2L20 19.2l-2.5 3.4-4.5-1.2 1.1-4.3-3.2-3 1.1-4.3 4.5.7Z"
                            stroke="white" strokeWidth="1.5" fill="white" fillOpacity="0.08"
                          />
                          {/* center ring */}
                          <circle cx="20" cy="20" r="5.5" stroke="white" strokeWidth="1.5" />
                          {/* checkmark */}
                          <path d="M17 20l2.2 2.2 4-4" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span className="text-[12.5px] text-gray-300 font-medium tracking-wide">{step.label}</span>
                  </motion.div>
                )}

                {/* Closing pill */}
                {idx === WORKFLOW_STEPS.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, delay: 0.55 }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#7a6d2e] shadow-lg shadow-yellow-900/30"
                  >
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                      <circle cx="7.5" cy="7.5" r="6" stroke="white" strokeWidth="1.6" />
                      <path d="M4.5 7.5l2.2 2.2 3.8-3.8" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-sm font-semibold text-white tracking-wide">{step.label}</span>
                  </motion.div>
                )}

                {/* Arrow connector */}
                {idx < WORKFLOW_STEPS.length - 1 && (
                  <motion.svg
                    width="40" height="14" viewBox="0 0 40 14" fill="none"
                    className="flex-shrink-0"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: 0.08 + idx * 0.13 }}
                  >
                    <line x1="2" y1="7" x2="30" y2="7" stroke="#b5a97a" strokeWidth="1.3" strokeDasharray="4 3" />
                    <path d="M30 4l7 3-7 3" stroke="#b5a97a" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </motion.svg>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ───── UNIFIED PLATFORM (horizontal scroll) ───── */}
      <section className="bg-transparent">
        <div
          ref={horizontalContainerRef}
          className="relative"
          style={{ height: `${PLATFORM_CARDS.length * 100}vh` }}
        >
          <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
            <div className="w-full px-8 md:px-24 lg:px-32 mb-10">
              <h2 className="text-[2rem] md:text-[2.4rem] font-bold text-white">
                Unified and centralized support platform
              </h2>
            </div>

            <div
              ref={horizontalScrollRef}
              className="flex gap-12 px-8 md:px-24 lg:px-32 transition-transform duration-100 ease-out will-change-transform"
            >
              {PLATFORM_CARDS.map((card) => (
                <div
                  key={card.id}
                  className="flex-shrink-0 flex items-center gap-8"
                  style={{ width: '720px' }}
                >
                  {/* Left — Illustration/Card */}
                  <div className="w-[360px] flex-shrink-0">
                    <PlatformIllustration type={card.hasIllustration} />
                  </div>

                  {/* Right — Text */}
                  <div className="space-y-3 flex-1">
                    <h3 className="text-lg font-bold text-white">{card.title}</h3>
                    <p className="text-gray-400 text-[14px] leading-relaxed">{card.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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

/* ─────────────────────── PLATFORM ILLUSTRATIONS ─────────────────────── */

function PlatformIllustration({ type }: { type: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-5% 0px' });

  /* ── CHANNELS: tree of channel icons connected by animated lines ── */
  if (type === 'channels') {
    const channels = [
      { label: 'Microsoft Teams', color: '#5B5FC7', icon: 'teams' },
      { label: 'Outlook', color: '#0072C6', icon: 'outlook' },
      { label: 'Chat / Portal', color: '#10B981', icon: 'chat' },
      { label: 'Phone', color: '#f97316', icon: 'phone' },
    ];
    return (
      <div ref={ref} className="bg-[#f0ede8] rounded-2xl overflow-hidden h-[300px] relative flex flex-col items-center justify-center gap-0 p-6">
        {/* Top hub node */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }} animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl px-5 py-3 shadow-md flex items-center gap-2.5 z-10 mb-0"
        >
          <div className="w-8 h-8 rounded-xl bg-[#f97316] flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">W</span>
          </div>
          <span className="font-bold text-gray-900 text-[13px]">woodfrog</span>
          <span className="text-[10px] text-gray-400 bg-gray-100 rounded-full px-2 py-0.5">hub</span>
        </motion.div>

        {/* SVG connecting lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 360 300" preserveAspectRatio="none">
          {[68, 140, 212, 284].map((x, i) => (
            <motion.line key={i}
              x1="180" y1="90" x2={x} y2="190"
              stroke="#b5a97a" strokeWidth="1.2" strokeDasharray="5 3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.35 + i * 0.1 }}
            />
          ))}
        </svg>

        {/* Channel icon cards */}
        <div className="flex gap-3 mt-6 z-10">
          {channels.map((ch, i) => (
            <motion.div
              key={ch.label}
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
              className="bg-white rounded-xl p-3 shadow-sm flex flex-col items-center gap-1.5 w-[76px]"
            >
              {ch.icon === 'teams' && (
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect x="3" y="3" width="11" height="11" rx="2" fill="#5B5FC7" />
                  <rect x="16" y="3" width="9" height="9" rx="2" fill="#5B5FC7" opacity="0.55" />
                  <rect x="3" y="16" width="9" height="9" rx="2" fill="#5B5FC7" opacity="0.35" />
                  <rect x="16" y="14" width="9" height="11" rx="2" fill="#5B5FC7" opacity="0.2" />
                </svg>
              )}
              {ch.icon === 'outlook' && (
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect x="2" y="6" width="16" height="16" rx="2.5" fill="#0072C6" />
                  <rect x="10" y="10" width="16" height="12" rx="2" fill="#28A8E8" />
                  <path d="M10 10l8 6 8-6" stroke="white" strokeWidth="1.2" fill="none" />
                </svg>
              )}
              {ch.icon === 'chat' && (
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect x="3" y="5" width="22" height="15" rx="3" fill="#10B981" />
                  <path d="M8 24l4-4h8" stroke="#10B981" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="8" y1="10.5" x2="20" y2="10.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" opacity="0.7" />
                  <line x1="8" y1="14" x2="15" y2="14" stroke="white" strokeWidth="1.3" strokeLinecap="round" opacity="0.5" />
                </svg>
              )}
              {ch.icon === 'phone' && (
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect x="7" y="3" width="14" height="22" rx="3" fill="#f97316" />
                  <rect x="10" y="6" width="8" height="13" rx="1" fill="white" opacity="0.25" />
                  <circle cx="14" cy="22" r="1.5" fill="white" opacity="0.7" />
                </svg>
              )}
              <span className="text-[8px] text-gray-500 text-center leading-tight">{ch.label}</span>
            </motion.div>
          ))}
        </div>

        {/* "All synced" badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.35, delay: 1.0 }}
          className="mt-4 flex items-center gap-1.5 bg-white rounded-full px-3 py-1.5 shadow-sm"
        >
          <motion.div className="w-2 h-2 rounded-full bg-green-500"
            animate={inView ? { opacity: [1, 0.4, 1] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-[10px] text-gray-600 font-medium">All channels synced</span>
        </motion.div>
      </div>
    );
  }

  /* ── USERS: recent users table with animated rows + support badge ── */
  if (type === 'users') {
    const users = [
      { name: 'Mathieu Gagnon', email: 'mathieu@exemple.com', loc: 'Sherbrooke, QC', time: '2 min ago', avatar: '#6366f1' },
      { name: 'Amélie Côté', email: 'amelie@exemple.com', loc: 'Montréal, QC', time: '5 min ago', avatar: '#ec4899' },
      { name: 'Olivier Tremblay', email: 'olivier@exemple.com', loc: 'Magog, QC', time: '1 hr ago', avatar: '#14b8a6' },
      { name: 'Jean-François B.', email: 'jf@exemple.com', loc: 'Québec, QC', time: '3 hrs ago', avatar: '#f97316' },
    ];
    return (
      <div ref={ref} className="bg-[#f4f0e8] rounded-2xl overflow-hidden h-[300px] p-4 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: -8 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden flex-1 flex flex-col"
        >
          {/* Header */}
          <div className="px-4 pt-3.5 pb-2 border-b border-gray-100">
            <p className="text-[12px] font-semibold text-gray-900">Recent users</p>
            <p className="text-[9px] text-gray-400">User last activity</p>
          </div>
          {/* Column headers */}
          <div className="grid px-4 py-1.5 text-[9px] font-semibold text-gray-400 uppercase tracking-wide" style={{ gridTemplateColumns: '2fr 1.2fr 1fr' }}>
            <span>Users</span><span>Location</span><span>Last activity</span>
          </div>
          {/* Rows */}
          <div className="flex-1 overflow-hidden divide-y divide-gray-50">
            {users.map((u, i) => (
              <motion.div
                key={u.name}
                initial={{ opacity: 0, x: -12 }} animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
                transition={{ duration: 0.35, delay: 0.2 + i * 0.1 }}
                className="grid px-4 py-2 items-center"
                style={{ gridTemplateColumns: '2fr 1.2fr 1fr' }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0" style={{ backgroundColor: u.avatar }}>
                    {u.name[0]}
                  </div>
                  <div>
                    <p className="text-[10px] font-medium text-gray-800 leading-none">{u.name}</p>
                    <p className="text-[8px] text-gray-400 mt-0.5">{u.email}</p>
                  </div>
                </div>
                <span className="text-[9.5px] text-gray-500">{u.loc}</span>
                <span className="text-[9.5px] text-gray-400">{u.time}</span>
              </motion.div>
            ))}
          </div>
          {/* Support badge */}
          <div className="px-4 py-2.5 flex justify-end border-t border-gray-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }} animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.35, delay: 0.8 }}
              className="flex items-center gap-1.5 bg-[#f97316] text-white text-[9px] font-semibold rounded-full px-3 py-1 shadow"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
              Support agent
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  /* ── TICKETS: support board with priority badges + dev assignee ── */
  if (type === 'tickets') {
    const tickets = [
      { id: 'WUC-343', title: 'Login fails on mobile Safari after update', priority: 'Critical', dev: 'Dev 01', color: '#dc2626' },
      { id: 'WUC-344', title: 'Export to CSV produces empty file', priority: 'High', dev: 'Dev 01', color: '#f97316' },
      { id: 'WUC-338', title: 'Dashboard slow on large datasets', priority: 'Medium', dev: 'Dev 02', color: '#eab308' },
    ];
    return (
      <div ref={ref} className="bg-[#f0ede8] rounded-2xl overflow-hidden h-[300px] p-4 flex flex-col gap-2.5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between mb-0.5"
        >
          <div className="flex items-center gap-2">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="2" cy="2" r="1.5" fill="#9ca3af" /><circle cx="6" cy="2" r="1.5" fill="#9ca3af" />
              <circle cx="2" cy="6" r="1.5" fill="#9ca3af" /><circle cx="6" cy="6" r="1.5" fill="#9ca3af" />
            </svg>
            <span className="text-[11px] font-semibold text-gray-700">Support Queue</span>
          </div>
          <span className="text-[9px] text-gray-400 bg-white rounded-full px-2 py-0.5 shadow-sm">{tickets.length} open</span>
        </motion.div>

        {tickets.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.4, delay: 0.15 + i * 0.14 }}
            className="bg-white rounded-xl p-3 shadow-sm flex flex-col gap-2"
          >
            <div className="h-1.5 bg-gray-100 rounded-full w-full" />
            <p className="text-[10px] text-gray-600 leading-snug">{t.title}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <svg width="8" height="8" viewBox="0 0 8 8"><rect width="8" height="8" rx="1.5" fill={t.color} /></svg>
                <span className="text-[8.5px] text-gray-500 font-medium">{t.id}</span>
                <span className="text-[8px] font-semibold rounded-full px-1.5 py-0.5" style={{ color: t.color, backgroundColor: t.color + '18' }}>{t.priority}</span>
              </div>
              <div className="flex items-center gap-1">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><polygon points="0,10 5,0 10,10" fill="#374151" /></svg>
                <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-[7px] font-bold text-gray-600">
                  {t.dev.replace('Dev ', 'D')}
                </div>
                <span className="text-[8.5px] text-gray-600 font-medium">{t.dev}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  /* ── RECURRING: woodfrog automation flow steps ── */
  if (type === 'recurring') {
    const steps = [
      { label: 'Ticket received', sub: 'WUC-391 — Critical', icon: 'ticket', color: '#dc2626' },
      { label: 'Auto-classified', sub: 'Category: Access issue', icon: 'classify', color: '#f97316' },
      { label: 'Routed to Dev 02', sub: 'SLA: 2h remaining', icon: 'route', color: '#8b7a3c' },
      { label: 'Response sent', sub: 'Template: password reset', icon: 'check', color: '#10b981' },
    ];
    return (
      <div ref={ref} className="bg-[#1a1a2e] rounded-2xl overflow-hidden h-[300px] p-5 flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2.5 mb-4"
        >
          <div className="w-8 h-8 rounded-xl bg-[#f97316] flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">W</span>
          </div>
          <span className="text-white font-semibold text-[13px]">woodfrog</span>
          <span className="ml-auto text-[9px] text-[#f9dc66] bg-[#f9dc66]/10 border border-[#f9dc66]/30 rounded-full px-2 py-0.5">automation</span>
        </motion.div>

        <div className="flex-1 flex flex-col justify-between">
          {steps.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
              transition={{ duration: 0.38, delay: 0.2 + i * 0.15 }}
              className="flex items-center gap-3"
            >
              {/* Step connector */}
              <div className="flex flex-col items-center flex-shrink-0" style={{ width: 28 }}>
                <motion.div
                  className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                  style={{ borderColor: s.color, backgroundColor: s.color + '22' }}
                  animate={inView && i === steps.length - 1 ? { scale: [1, 1.15, 1] } : {}}
                  transition={{ duration: 1, repeat: Infinity, delay: 1.2 }}
                >
                  {s.icon === 'check' ? (
                    <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M2 4.5l2 2 3-3" stroke={s.color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  ) : (
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.color }} />
                  )}
                </motion.div>
                {i < steps.length - 1 && <div className="w-px h-full bg-white/10 mt-1" style={{ minHeight: 10 }} />}
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 flex-1">
                <p className="text-[11px] font-semibold text-white leading-none">{s.label}</p>
                <p className="text-[9px] text-gray-500 mt-0.5">{s.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  /* ── ANALYTICS: 3 KPI stat cards with animated numbers + mini bar chart ── */
  if (type === 'analytics') {
    const bars = [62, 78, 55, 83, 70, 91, 65, 88, 74, 96, 72, 85];
    return (
      <div ref={ref} className="bg-[#8b7a3c] rounded-2xl overflow-hidden h-[300px] p-4 flex flex-col gap-3">
        {/* KPI cards row */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Trends positive', value: '65%', icon: '↑', color: '#fff' },
            { label: 'Compliance rate', value: '76.3%', icon: '↑', color: '#f9dc66' },
            { label: 'Vol. handled', value: '−48%', icon: '↓', color: '#fca5a5' },
          ].map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.12 }}
              className="bg-white rounded-xl p-2.5 shadow-sm"
            >
              <p className="text-[8px] text-gray-400 leading-tight mb-1">{kpi.label}</p>
              <div className="flex items-center gap-1">
                <div className="w-5 h-5 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                    {kpi.icon === '↑'
                      ? <path d="M4.5 7V2M4.5 2L2.5 4M4.5 2L6.5 4" stroke="#f97316" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      : <path d="M4.5 2V7M4.5 7L2.5 5M4.5 7L6.5 5" stroke="#dc2626" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />}
                  </svg>
                </div>
                <span className="text-[13px] font-bold text-gray-900 tabular-nums">{kpi.value}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bar chart card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.45, delay: 0.45 }}
          className="bg-white rounded-xl p-3 flex-1 flex flex-col"
        >
          <p className="text-[9px] text-gray-400 font-medium mb-2">Monthly ticket resolution rate</p>
          <div className="flex-1 flex items-end gap-1">
            {bars.map((h, i) => (
              <div key={i} className="flex-1 flex items-end" style={{ height: '100%' }}>
                <motion.div
                  className="w-full rounded-t-[2px]"
                  style={{ backgroundColor: i >= 9 ? '#8b7a3c' : '#e5e0d0' }}
                  initial={{ height: 0 }}
                  animate={inView ? { height: `${h}%` } : { height: 0 }}
                  transition={{ duration: 0.4, delay: 0.55 + i * 0.05 }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-1.5">
            {['Feb', 'Apr', 'Jun', 'Aug', 'Oct', 'Dec'].map(m => (
              <span key={m} className="text-[7px] text-gray-300">{m}</span>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  /* ── EXPERIENCE: purple gradient, CSAT + NPS cards + icon pair ── */
  if (type === 'experience') {
    return (
      <div ref={ref} className="rounded-2xl overflow-hidden h-[300px] relative flex flex-col p-4 gap-3" style={{ background: 'linear-gradient(135deg, #4f1e8c 0%, #6d28d9 40%, #1e40af 100%)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-4 right-4 w-40 h-40 rounded-full bg-purple-400/20 blur-2xl" />
          <div className="absolute bottom-4 left-4 w-32 h-32 rounded-full bg-blue-400/15 blur-2xl" />
        </div>

        {/* Icon pair */}
        <div className="flex items-center gap-3 relative z-10">
          <motion.div
            initial={{ opacity: 0, rotate: -8, scale: 0.8 }} animate={inView ? { opacity: 1, rotate: -5, scale: 1 } : { opacity: 0, rotate: -8, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-lg"
          >
            <div className="w-8 h-8 rounded-xl bg-[#f97316] flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, rotate: 6, scale: 0.8 }} animate={inView ? { opacity: 1, rotate: 4, scale: 1 } : { opacity: 0, rotate: 6, scale: 0.8 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-lg"
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect x="3" y="3" width="11" height="11" rx="2.5" fill="#5B5FC7" />
              <rect x="16" y="3" width="9" height="9" rx="2" fill="#5B5FC7" opacity="0.6" />
              <rect x="3" y="16" width="9" height="9" rx="2" fill="#5B5FC7" opacity="0.4" />
              <rect x="16" y="14" width="9" height="11" rx="2" fill="#5B5FC7" opacity="0.25" />
            </svg>
          </motion.div>
        </div>

        {/* CSAT card */}
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.4, delay: 0.28 }}
          className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-3 relative z-10"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] text-white/60 font-medium">Customer satisfaction (CSAT)</p>
            <span className="text-[10px] font-bold text-green-300">↑ 12%</span>
          </div>
          {/* Star rating */}
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map(s => (
              <motion.svg key={s} width="14" height="14" viewBox="0 0 14 14" fill="none"
                initial={{ opacity: 0, scale: 0 }} animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ duration: 0.25, delay: 0.5 + s * 0.08 }}
              >
                <path d="M7 1.5l1.5 3.1 3.4.5-2.5 2.4.6 3.4L7 9.4l-3 1.5.6-3.4L2.1 5.1l3.4-.5z" fill={s <= 4 ? '#f9dc66' : '#f9dc66'} fillOpacity={s <= 4 ? 1 : 0.3} />
              </motion.svg>
            ))}
            <span className="text-[11px] font-bold text-white ml-1">4.7</span>
            <span className="text-[9px] text-white/40 ml-0.5">/ 5</span>
          </div>
        </motion.div>

        {/* NPS + response time row */}
        <div className="grid grid-cols-2 gap-2 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.38, delay: 0.55 }}
            className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-2.5"
          >
            <p className="text-[8px] text-white/50 mb-1">NPS Score</p>
            <p className="text-[17px] font-bold text-white tabular-nums">+68</p>
            <p className="text-[8px] text-green-300">Excellent</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.38, delay: 0.68 }}
            className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-2.5"
          >
            <p className="text-[8px] text-white/50 mb-1">Avg. response time</p>
            <p className="text-[17px] font-bold text-white tabular-nums">1.8h</p>
            <p className="text-[8px] text-[#f9dc66]">↓ 32% faster</p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="bg-white/5 border border-white/10 rounded-2xl p-6 h-[300px] flex items-center justify-center">
      <span className="text-gray-500 text-sm">Preview</span>
    </div>
  );
}

'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnalyticsDashboardDemo } from '@/components/animations/analytics-dashboard-demo';

/* ─────────────────────── DATA ─────────────────────── */

const CAPABILITIES = [
  { num: '01', text: 'Platform best practice recommendations' },
  { num: '02', text: 'Power BI licensing guidance' },
  { num: '03', text: 'Report sharing strategy implementation' },
  { num: '04', text: 'Governance processes and certification of reports and datasets' },
  { num: '05', text: 'Power BI report optimization and support' },
  { num: '06', text: 'Organizational development process implementation' },
  { num: '07', text: 'Experts in DAX and Power Query (M), the core languages powering Power BI' },
  { num: '08', text: 'Power BI Desktop and Service training' },
  { num: '09', text: 'Designing and developing tailored data visuals' },
];

const STATS = [
  {
    stat: 'Over 1,000,000',
    description: 'views on the reports we\'ve created.',
    bg: 'gold',
  },
  {
    stat: 'More than 10,000',
    description: 'unique users have engaged with the reports we developed in the past year.',
    bg: 'dark',
  },
  {
    stat: '600+',
    description: 'user interfaces designed and developed.',
    bg: 'beige',
  },
];

const FAQS = [
  {
    num: '01',
    question: 'What data visualization tools do you use?',
    answer: '95% of the projects we carry out are developed using Microsoft Power BI. However, we also have strong expertise in the development of personalized mapping using libraries available in several programming languages (Python, R). In addition, our experts are very familiar with all the other tools on the market such as Tableau, QlikView, Grafana, SAP BusinessObjects, Cognos, Google Data Studio and Looker.',
  },
  {
    num: '02',
    question: 'Are your experts certified in Microsoft Power BI?',
    answer: 'Yes, our team holds multiple Microsoft certifications including PL-300 (Power BI Data Analyst), DP-600 (Fabric Analytics Engineer), and DP-500 (Azure Enterprise Data Analyst). We maintain our certifications through continuous professional development.',
  },
  {
    num: '03',
    question: 'Are you able to develop custom visuals in Power BI?',
    answer: 'Absolutely. We have extensive experience developing custom Power BI visuals using TypeScript and the Power BI Visuals SDK. This allows us to create highly tailored visualizations that go beyond the standard library to meet unique business requirements.',
  },
  {
    num: '04',
    question: 'Did you invent the Power BI Design System concept?',
    answer: 'We pioneered the Power BI Design System methodology, establishing a comprehensive framework for creating consistent, governed, and user-friendly analytical reports across organizations. This approach has been adopted by numerous enterprises to standardize their BI reporting.',
  },
];

const SHOWCASE_ITEMS = [
  {
    title: 'Weekly Dashboard | Detailed Summary',
    subtitle: 'Quality & Health and Safety',
    description: 'Comprehensive weekly reporting with KPIs covering quality metrics, delivery performance, and operational costs — all in one unified view.',
    metrics: [
      { label: 'Services', sublabel: 'External non-quality', value: '0.9%', highlight: true },
      { label: 'Recovery', sublabel: 'External non-quality', value: '3.0%', highlight: false },
      { label: 'Delivery on time', sublabel: 'Deadline', value: '99.0%', highlight: false },
      { label: 'Average entry', sublabel: 'Deadline', value: '290', highlight: false },
    ],
  },
  {
    title: 'Designing Custom Analytical Interfaces',
    subtitle: 'Dashboard | My Portfolio',
    description: 'We create analytical reports and dashboards tailored to your users\' needs and aligned with your organization\'s goals. Our team advises you on industry-leading visualization standards while maintaining the flexibility to adapt to your unique context.',
    metrics: [
      { label: 'My Projects', sublabel: '', value: '', highlight: false },
      { label: 'My Portfolio', sublabel: '', value: '', highlight: true },
      { label: 'Web Analytics', sublabel: '', value: '', highlight: false },
    ],
  },
  {
    title: 'Implementation of a Power BI Design System',
    subtitle: 'Tourist activities in Quebec',
    description: 'We develop Power BI Design Systems to establish a consistent standard for analytical reporting across your organization. A Power BI Design System provides governance over internally developed content, enhancing the overall user experience.',
    metrics: [
      { label: 'Visits', sublabel: '', value: '4 076 346', highlight: false },
      { label: 'Excursionists', sublabel: '', value: '4 076 346', highlight: false },
      { label: 'Tourists', sublabel: '', value: '4 076 346', highlight: false },
    ],
  },
  {
    title: 'Metrics and KPIs built on a solid data model',
    subtitle: 'IT Security Dashboard | Detailed summary',
    description: 'The interfaces we develop are built on a solid data model that ensures the solution\'s long-term scalability. This model is designed based on your business processes and industry best practices.',
    metrics: [
      { label: 'Compliant IT equipment', sublabel: '', value: '512', highlight: false },
      { label: 'Security incidents', sublabel: '', value: '72', highlight: true },
      { label: 'Security incidents', sublabel: 'vs earlier this year', value: '30 inc', highlight: false },
    ],
  },
  {
    title: 'Data storytelling is in our DNA',
    subtitle: 'User engagement analytics',
    description: 'The reports and dashboards we develop tell a story. woodfrog integrates multiple methods into its development process to ensure effective data storytelling within interfaces.',
    metrics: [
      { label: 'Total users', sublabel: '', value: '24 532', highlight: false },
      { label: 'Active sessions', sublabel: '', value: '1 482', highlight: true },
    ],
  },
];

const WHY_ITEMS = [
  {
    id: 'ux-ui',
    title: 'UX/UI is optimized in every interface we develop',
    description: 'Each interface we develop is carefully reviewed by our team of experts to ensure a flawless user experience (UX) powered by optimized user interface (UI) design. We are constantly seeking the best practices in visual ergonomics and interface usability, continuously pushing our standards higher.',
  },
  {
    id: 'truth',
    title: 'We design interfaces that reveal the truth behind your data',
    description: 'Through the integration of robust data storytelling within the interfaces we design, we ensure your dashboards and reports highlight the patterns, trends, and anomalies that matter most — turning complex datasets into clear, actionable narratives.',
  },
  {
    id: 'tools',
    title: 'We push the visualization tools we use beyond their standard capabilities',
    description: 'Our team continuously explores and extends the boundaries of tools like Power BI, creating custom visuals, advanced DAX calculations, and innovative report layouts that go far beyond out-of-the-box functionality.',
  },
  {
    id: 'involvement',
    title: 'End-user involvement',
    description: 'We actively involve end users throughout the development of analytical interfaces. Through mockups, real-world demonstrations, and iterative feedback loops, we ensure transparency regarding feasibility and alignment with actual user needs.',
  },
];

const APPROACH_PARAGRAPHS = [
  'From user requirements to report deployment, our experts guide you through every step. Woodfrog has developed a proven methodology for gathering and validating requirements that actively involves end users throughout the development of analytical interfaces. We assist users in articulating their needs through mockups and real-world demonstrations, ensuring transparency regarding feasibility. Once the requirements are defined, our experts prepare your data and build the data model and calculations necessary to meet analytical goals.',
  'Our reports and dashboards are designed to deliver an exceptional user experience (UX) and intuitive interfaces (UI), while setting a new benchmark for visual standards to encourage strong adoption. After development, we assist with deployment and user adoption by integrating the solution into your decision-making processes, implementing security protocols, defining access strategies, and providing continued support.',
];

/* ─────────────────────── SHOWCASE CARD ─────────────────────── */

function ShowcaseCard({ item, index }: { item: typeof SHOWCASE_ITEMS[number]; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${!isEven ? 'lg:[direction:rtl]' : ''}`}>
      {/* Dashboard mockup */}
      <div className={`${!isEven ? 'lg:[direction:ltr]' : ''}`}>
        <div className="bg-[#f5f0e8] rounded-2xl p-6 md:p-8 overflow-hidden">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center gap-3 mb-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-gray-800 tracking-wide">woodfrog</span>
                <svg width="8" height="10" viewBox="0 0 8 10" fill="none">
                  <path d="M1 8L4 2L7 8" stroke="#22d3ee" strokeWidth="1" fill="none" />
                </svg>
              </div>
            </div>
            <h4 className="text-sm font-bold text-gray-900 mb-1">{item.title}</h4>
            <p className="text-[10px] text-gray-500 mb-4">{item.subtitle}</p>

            {/* Metrics grid */}
            <div className="grid grid-cols-2 gap-2">
              {item.metrics.map((m, i) => (
                <div
                  key={i}
                  className={`rounded-lg p-3 ${m.highlight ? 'bg-brand-primary/10 border border-brand-primary/20' : 'bg-gray-50 border border-gray-100'}`}
                >
                  {m.value && <p className={`text-lg font-bold ${m.highlight ? 'text-brand-primary' : 'text-gray-900'}`}>{m.value}</p>}
                  <p className="text-[10px] text-gray-600 font-medium">{m.label}</p>
                  {m.sublabel && <p className="text-[9px] text-gray-400">{m.sublabel}</p>}
                </div>
              ))}
            </div>

            {/* Mini bar chart */}
            <div className="flex items-end gap-1 h-12 mt-4">
              {[20, 35, 45, 30, 55, 40, 60, 50, 70, 65, 45, 55].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t"
                  style={{
                    height: `${h}%`,
                    backgroundColor: i === index % 12 ? '#10B981' : '#e5e7eb',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Text content */}
      <div className={`space-y-5 ${!isEven ? 'lg:[direction:ltr]' : ''}`}>
        <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
          {item.title}
        </h3>
        <p className="text-gray-400 text-[15px] leading-[1.8]">
          {item.description}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────── WHY ILLUSTRATION ─────────────────────── */

function WhyIllustration({ id }: { id: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 100); return () => clearTimeout(t); }, []);

  switch (id) {

    /* ── UX/UI: Product adoption curve ── */
    case 'ux-ui': {
      const segments = [
        { label: 'Innovative', pct: '2.5%', h: 14 },
        { label: 'Early\nadopters', pct: '13,5%', h: 30 },
        { label: 'Early\nmajority', pct: '48%', h: 100 },
        { label: 'Late\nmajority', pct: '20%', h: 56 },
        { label: 'Latecomers', pct: '16%', h: 18 },
      ];
      // Bell curve path across 5 columns
      const curveD = 'M 20,96 C 50,90 70,20 100,8 C 130,20 150,90 180,96';
      return (
        <div className="bg-[#f0ece3] rounded-2xl p-5 h-full">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-sm font-bold text-gray-900">Product adoption curve</h4>
              <span className="text-[10px] text-gray-400 font-medium">woodfrog</span>
            </div>
            <div className="flex items-center gap-1.5 mb-4">
              <span className="w-5 h-px bg-orange-500 inline-block" />
              <span className="text-[10px] text-gray-500">Adoption rate</span>
            </div>

            {/* Chart area */}
            <div className="flex-1 relative min-h-[140px]">
              {/* Column grid + labels */}
              <div className="absolute inset-0 flex">
                {segments.map((seg, i) => (
                  <div key={i} className="flex-1 flex flex-col justify-end border-r border-gray-100 last:border-r-0 px-0.5">
                    <div className="relative flex flex-col justify-end h-[96px]">
                      {/* Column fill */}
                      <div
                        className="w-full rounded-t transition-all duration-700"
                        style={{
                          height: mounted ? `${seg.h}%` : '0%',
                          backgroundColor: i === 2 ? '#fde68a' : '#f3f4f6',
                          transitionDelay: `${i * 80}ms`,
                        }}
                      />
                    </div>
                    {/* Column label */}
                    <p className="text-[8px] text-gray-400 text-center mt-1.5 leading-tight whitespace-pre-line">{seg.label}</p>
                  </div>
                ))}
              </div>

              {/* Bell curve SVG overlay */}
              <svg
                className="absolute inset-0 pointer-events-none"
                viewBox="0 0 200 108"
                preserveAspectRatio="none"
                width="100%"
                height="108"
              >
                <defs>
                  <linearGradient id="curveGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f97316" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                  </linearGradient>
                  <clipPath id="curveClip">
                    <rect x="0" y="0" width={mounted ? '200' : '0'} height="200">
                      <animate attributeName="width" from="0" to="200" dur="1s" begin="0.2s" fill="freeze" />
                    </rect>
                  </clipPath>
                </defs>
                {/* Fill under curve */}
                <path
                  d={`${curveD} L 180,96 L 20,96 Z`}
                  fill="url(#curveGrad)"
                  clipPath="url(#curveClip)"
                />
                {/* Curve line */}
                <path
                  d={curveD}
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="2"
                  clipPath="url(#curveClip)"
                />
                {/* Dots at each segment peak */}
                {[
                  [20, 96], [60, 54], [100, 8], [140, 54], [180, 96],
                ].map(([cx, cy], i) => (
                  <circle
                    key={i}
                    cx={cx} cy={cy} r="3"
                    fill="white" stroke="#f97316" strokeWidth="1.5"
                    opacity={mounted ? 1 : 0}
                    style={{ transition: `opacity 0.3s ${0.4 + i * 0.1}s` }}
                  />
                ))}
              </svg>
            </div>

            {/* Bottom % row */}
            <div className="flex mt-2">
              {segments.map((seg, i) => (
                <div key={i} className="flex-1 text-center">
                  <span
                    className="text-[9px] font-semibold text-gray-500"
                    style={{ opacity: mounted ? 1 : 0, transition: `opacity 0.4s ${0.6 + i * 0.07}s` }}
                  >
                    {seg.pct}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    /* ── TRUTH: Inventory / data table ── */
    case 'truth': {
      const rows = [
        { name: 'Black t-shirt', cat: 'Men', price: '19,99$', inv: 127, rop: 150, status: 'Low stock', statusColor: 'text-amber-600 bg-amber-50', warn: true, order: true },
        { name: 'Beige shirt', cat: 'Men', price: '49,99$', inv: 102, rop: 90, status: 'In stock', statusColor: 'text-green-600 bg-green-50', warn: false, order: false },
        { name: 'Straight jeans', cat: 'Women', price: '85,00$', inv: 0, rop: 200, status: 'Out of stock', statusColor: 'text-red-600 bg-red-50', warn: true, order: true },
        { name: 'Orange dress', cat: 'Women', price: '49,98$', inv: 38, rop: 100, status: 'Low stock', statusColor: 'text-amber-600 bg-amber-50', warn: true, order: true },
      ];
      return (
        <div className="bg-[#f0ece3] rounded-2xl p-5 h-full">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-full flex flex-col overflow-hidden">
            {/* Table header bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
              <div className="w-2 h-2 rounded-full bg-orange-500" />
              <span className="text-[11px] font-bold text-gray-800">woodfrog</span>
              <span className="text-gray-300 mx-1">|</span>
              <span className="text-[11px] text-gray-500">Inventory management</span>
              {/* Cursor */}
              <svg className="ml-auto" width="12" height="16" viewBox="0 0 12 16">
                <path d="M0 0L0 12L3 9L5 13L6.5 12.4L4.5 8.4L8 8Z" fill="#1e293b" />
              </svg>
            </div>

            {/* Column headers */}
            <div className="hidden md:grid px-4 py-2 border-b border-gray-100" style={{ gridTemplateColumns: '1fr 60px 56px 46px 46px 72px 52px' }}>
              {['Product', 'Category', 'Price', 'In inventory', 'ROP', 'Status', 'Action'].map((h) => (
                <span key={h} className="text-[9px] font-semibold text-gray-400 uppercase tracking-wide">{h}</span>
              ))}
            </div>
            {/* Mobile column headers — up to Status only */}
            <div className="grid md:hidden px-4 py-2 border-b border-gray-100" style={{ gridTemplateColumns: '1fr 46px 46px 64px' }}>
              {['Product', 'Stock', 'ROP', 'Status'].map((h) => (
                <span key={h} className="text-[9px] font-semibold text-gray-400 uppercase tracking-wide">{h}</span>
              ))}
            </div>

            {/* Rows — Desktop (full) */}
            <div className="hidden md:block flex-1 divide-y divide-gray-50">
              {rows.map((row, i) => (
                <div
                  key={i}
                  className="grid items-center px-4 py-2.5 transition-all duration-500"
                  style={{
                    gridTemplateColumns: '1fr 60px 56px 46px 46px 72px 52px',
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? 'translateY(0)' : 'translateY(6px)',
                    transitionDelay: `${i * 100}ms`,
                  }}
                >
                  {/* Product */}
                  <div className="flex items-center gap-1.5">
                    {row.warn && (
                      <svg width="10" height="10" viewBox="0 0 10 10" className="flex-shrink-0">
                        <path d="M5 1L9 8.5H1Z" fill="#f97316" />
                        <path d="M5 3.5V5.5M5 6.5V7" stroke="white" strokeWidth="1" strokeLinecap="round" />
                      </svg>
                    )}
                    <span className="text-[10px] font-medium text-gray-800">{row.name}</span>
                  </div>
                  <span className="text-[10px] text-gray-500">{row.cat}</span>
                  <span className="text-[10px] text-gray-600">{row.price}</span>
                  <span className="text-[10px] text-gray-600">{row.inv}</span>
                  <span className="text-[10px] text-gray-600">{row.rop}</span>
                  <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full w-fit ${row.statusColor}`}>
                    • {row.status}
                  </span>
                  {row.order ? (
                    <button className="text-[9px] font-semibold bg-gray-900 text-white rounded px-2 py-1">Order</button>
                  ) : (
                    <button className="text-[9px] font-semibold bg-gray-100 text-gray-400 rounded px-2 py-1" disabled>Order</button>
                  )}
                </div>
              ))}
            </div>
            {/* Rows — Mobile (simplified: Product, Stock, ROP, Status) */}
            <div className="md:hidden flex-1 divide-y divide-gray-50">
              {rows.map((row, i) => (
                <div
                  key={i}
                  className="grid items-center px-4 py-2.5 transition-all duration-500"
                  style={{
                    gridTemplateColumns: '1fr 46px 46px 64px',
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? 'translateY(0)' : 'translateY(6px)',
                    transitionDelay: `${i * 100}ms`,
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    {row.warn && (
                      <svg width="10" height="10" viewBox="0 0 10 10" className="flex-shrink-0">
                        <path d="M5 1L9 8.5H1Z" fill="#f97316" />
                        <path d="M5 3.5V5.5M5 6.5V7" stroke="white" strokeWidth="1" strokeLinecap="round" />
                      </svg>
                    )}
                    <span className="text-[10px] font-medium text-gray-800 truncate">{row.name}</span>
                  </div>
                  <span className="text-[10px] text-gray-600">{row.inv}</span>
                  <span className="text-[10px] text-gray-600">{row.rop}</span>
                  <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full w-fit ${row.statusColor}`}>
                    • {row.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    /* ── TOOLS: Expense tracking dashboard ── */
    case 'tools': {
      const expenseRows = [
        { name: 'Jean-François Laberge', amount: '$736.18', cat: 'Meal expenses', date: '2024/05/10', desc: 'Monthly meal', status: 'Paid', statusColor: 'text-green-700 bg-green-100' },
        { name: 'Mathieu Leblanc', amount: '$650.35', cat: 'Formation', date: '2024/05/10', desc: 'Formation', status: 'Approved', statusColor: 'text-blue-700 bg-blue-100' },
        { name: 'Michaël Sauget', amount: '$500.38', cat: 'Accommodation', date: '2024/05/10', desc: 'Hotel Québec', status: 'Approved', statusColor: 'text-blue-700 bg-blue-100' },
        { name: 'Catalina Moreno', amount: '$121.16', cat: 'Travel', date: '2024/05/10', desc: 'Travel MH', status: 'In treatment', statusColor: 'text-amber-700 bg-amber-100' },
        { name: 'Catalina Moreno', amount: '$100.00', cat: 'Formation', date: '2024/05/10', desc: 'Power BI', status: 'N/A', statusColor: 'text-gray-500 bg-gray-100' },
      ];
      const monthBars = [18, 14, 22, 28, 36, 42, 38, 44, 52, 60, 68, 72];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return (
        <div className="bg-[#f0ece3] rounded-2xl p-5 h-full">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-full flex flex-col overflow-hidden">
            {/* Top bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 flex-shrink-0">
              <div className="w-2 h-2 rounded-full bg-orange-500" />
              <span className="text-[10px] font-bold text-gray-800">woodfrog</span>
              <span className="text-[9px] text-gray-400 border-l border-gray-200 pl-2 ml-1">Expense tracking</span>
              <span className="text-[9px] text-gray-400 ml-auto">Year: 2024</span>
            </div>

            {/* Main content: left KPI + right table */}
            <div className="flex flex-1 overflow-hidden">
              {/* Left: KPI + chart */}
              <div className="w-full md:w-[160px] md:border-r border-gray-100 flex-shrink-0 p-3 flex flex-col gap-3">
                <div>
                  <p className="text-[8px] text-gray-400">Total amount requested</p>
                  <p className="text-base font-bold text-gray-900">$1 200.15</p>
                  <p className="text-[8px] text-orange-500">▲ Amount requested / Amount reimbursed</p>
                </div>
                {/* Tiny wavy chart */}
                <svg width="100%" height="40" viewBox="0 0 130 40" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f97316" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0,30 C15,20 20,10 35,15 C50,20 55,8 70,12 C85,16 90,25 105,20 C115,16 120,22 130,18" fill="none" stroke="#f97316" strokeWidth="1.5" />
                  <path d="M0,30 C15,20 20,10 35,15 C50,20 55,8 70,12 C85,16 90,25 105,20 C115,16 120,22 130,18 L130,40 L0,40Z" fill="url(#expGrad)" />
                  <path d="M0,30 C15,25 20,20 35,22 C50,24 55,18 70,20 C85,22 90,28 105,25 C115,22 120,26 130,24" fill="none" stroke="#9ca3af" strokeWidth="1" strokeDasharray="3,2" />
                </svg>

                {/* Donut status */}
                <div className="bg-gray-50 rounded-lg p-2 flex flex-col items-center gap-1">
                  <p className="text-[8px] text-gray-500">Expense status</p>
                  <svg width="56" height="56" viewBox="0 0 56 56">
                    {[
                      { pct: 55, color: '#f97316', offset: 0 },
                      { pct: 22, color: '#60a5fa', offset: 55 },
                      { pct: 15, color: '#fbbf24', offset: 77 },
                      { pct: 8, color: '#f87171', offset: 92 },
                    ].map(({ pct, color, offset }, i) => {
                      const r = 20, c = 28, circ = 2 * Math.PI * r;
                      return (
                        <circle
                          key={i}
                          cx={c} cy={c} r={r}
                          fill="none"
                          stroke={color}
                          strokeWidth="8"
                          strokeDasharray={`${(pct / 100) * circ} ${circ}`}
                          strokeDashoffset={-((offset / 100) * circ)}
                          transform={`rotate(-90 ${c} ${c})`}
                          style={{ transition: `stroke-dasharray 0.8s ${0.2 + i * 0.15}s` }}
                        />
                      );
                    })}
                    <text x="28" y="26" textAnchor="middle" className="text-[9px]" style={{ fontSize: 9, fontWeight: 700, fill: '#1e293b' }}>55%</text>
                    <text x="28" y="35" textAnchor="middle" style={{ fontSize: 6, fill: '#9ca3af' }}>Paid</text>
                  </svg>
                </div>
              </div>

              {/* Right: expense table (hidden on mobile) */}
              <div className="hidden md:flex flex-1 flex-col overflow-hidden">
                <div className="px-3 py-2 border-b border-gray-100">
                  <p className="text-[9px] font-semibold text-gray-700">Expense request details</p>
                </div>
                <div className="grid px-3 py-1 border-b border-gray-50" style={{ gridTemplateColumns: '1fr 48px 60px 60px 1fr 44px' }}>
                  {['Requester', 'Amount', 'Category', 'Exp. date', 'Description', 'Status'].map((h) => (
                    <span key={h} className="text-[7px] font-semibold text-gray-400 uppercase tracking-wide">{h}</span>
                  ))}
                </div>
                <div className="flex-1 divide-y divide-gray-50 overflow-hidden">
                  {expenseRows.map((row, i) => (
                    <div
                      key={i}
                      className="grid items-center px-3 py-1.5"
                      style={{
                        gridTemplateColumns: '1fr 48px 60px 60px 1fr 44px',
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? 'translateX(0)' : 'translateX(8px)',
                        transition: `all 0.4s ${i * 0.08}s`,
                      }}
                    >
                      <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden flex items-center justify-center">
                          <span className="text-[6px] font-bold text-gray-600">{row.name[0]}</span>
                        </div>
                        <span className="text-[8px] text-gray-700 truncate">{row.name}</span>
                      </div>
                      <span className="text-[8px] font-medium text-gray-800">{row.amount}</span>
                      <span className="text-[8px] text-gray-500 truncate">{row.cat}</span>
                      <span className="text-[8px] text-gray-400">{row.date}</span>
                      <span className="text-[8px] text-gray-500 truncate">{row.desc}</span>
                      <span className={`text-[7px] font-semibold px-1 py-0.5 rounded w-fit ${row.statusColor}`}>{row.status}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom: expenses by month */}
                <div className="border-t border-gray-100 px-3 py-2 flex-shrink-0">
                  <p className="text-[8px] font-semibold text-gray-600 mb-1.5">Expenses by month</p>
                  <div className="flex items-end gap-0.5 h-10">
                    {monthBars.map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                        <div
                          className="w-full rounded-t"
                          style={{
                            height: mounted ? `${h}%` : '0%',
                            backgroundColor: i === 11 ? '#f97316' : '#fde8d4',
                            transition: `height 0.5s ${i * 0.04}s`,
                          }}
                        />
                        {i % 3 === 0 && <span className="text-[6px] text-gray-400">{months[i]}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    /* ── INVOLVEMENT: User engagement with avatars ── */
    case 'involvement': {
      const chartPoints: [number, number][] = [
        [0, 55], [15, 52], [30, 45], [45, 48], [60, 38], [75, 32], [90, 34],
        [105, 28], [120, 35], [135, 40], [150, 30], [165, 42], [180, 25], [200, 28],
      ];

      // Build a smooth catmull-rom style path
      const smoothPath = (pts: [number, number][]) => {
        if (pts.length < 2) return '';
        let d = `M ${pts[0][0]},${pts[0][1]}`;
        for (let i = 0; i < pts.length - 1; i++) {
          const [x0, y0] = pts[i];
          const [x1, y1] = pts[i + 1];
          const cpx = (x0 + x1) / 2;
          d += ` C ${cpx},${y0} ${cpx},${y1} ${x1},${y1}`;
        }
        return d;
      };

      const linePath = smoothPath(chartPoints);
      const areaPath = linePath + ` L 200,60 L 0,60 Z`;
      const highlightPath = smoothPath([[150, 30], [165, 42], [180, 25], [200, 28]]);

      return (
        <div className="bg-[#f0ece3] rounded-2xl p-5 h-full">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-full flex flex-col overflow-hidden">
            {/* Top bar with avatars */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-500" />
                <span className="text-[11px] font-bold text-gray-800">woodfrog</span>
              </div>
              {/* Avatar stack */}
              <div className="flex -space-x-1.5">
                {[
                  { bg: 'bg-violet-300', letter: 'F' },
                  { bg: 'bg-sky-300', letter: 'M' },
                  { bg: 'bg-rose-300', letter: 'J' },
                ].map(({ bg, letter }, i) => (
                  <div key={i} className={`w-6 h-6 rounded-full ${bg} border-2 border-white flex items-center justify-center`}>
                    <span className="text-[8px] font-bold text-white">{letter}</span>
                  </div>
                ))}
                <div className="w-6 h-6 rounded-full bg-orange-100 border-2 border-white flex items-center justify-center ml-1">
                  <span className="text-[7px] font-bold text-orange-500">+4</span>
                </div>
              </div>
            </div>

            {/* Main area */}
            <div className="flex-1 flex overflow-hidden">
              {/* Left: main chart card */}
              <div className="flex-1 p-3 flex flex-col">
                <div className="bg-white border border-gray-100 rounded-xl p-3 flex-1 flex flex-col shadow-sm">
                  <p className="text-[10px] font-bold text-gray-900">User engagements</p>
                  <p className="text-[8px] text-gray-400 mb-2">Active users over time</p>

                  {/* Y axis labels */}
                  <div className="flex flex-1 gap-2">
                    <div className="flex flex-col justify-between text-[7px] text-gray-300 pb-5">
                      <span>8k</span><span>6k</span><span>4k</span>
                    </div>
                    {/* Chart */}
                    <div className="flex-1 relative">
                      <svg
                        width="100%" height="100%"
                        viewBox="0 0 200 65"
                        preserveAspectRatio="none"
                        className="overflow-visible"
                      >
                        <defs>
                          <linearGradient id="engGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#f97316" stopOpacity="0.18" />
                            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                          </linearGradient>
                          <clipPath id="engClip">
                            <rect x="0" y="0" height="80" width={mounted ? '200' : '0'}>
                              {mounted && <animate attributeName="width" from="0" to="200" dur="1s" fill="freeze" />}
                            </rect>
                          </clipPath>
                        </defs>
                        {/* Grid lines */}
                        {[20, 38, 55].map((y) => (
                          <line key={y} x1="0" y1={y} x2="200" y2={y} stroke="#f3f4f6" strokeWidth="0.5" />
                        ))}
                        {/* Area fill */}
                        <path d={areaPath} fill="url(#engGrad)" clipPath="url(#engClip)" />
                        {/* Main line — thin + smooth */}
                        <path d={linePath} fill="none" stroke="#f97316" strokeWidth="1" strokeLinejoin="round" strokeLinecap="round" clipPath="url(#engClip)" />
                        {/* Highlight segment — slightly thicker */}
                        <path d={highlightPath} fill="none" stroke="#f97316" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" clipPath="url(#engClip)" />
                        {/* Data point dots */}
                        {chartPoints.map(([x, y], i) => (
                          <circle
                            key={i} cx={x} cy={y} r="1.5"
                            fill="white" stroke="#f97316" strokeWidth="1"
                            opacity={mounted ? 1 : 0}
                            style={{ transition: `opacity 0.2s ${0.6 + i * 0.05}s` }}
                          />
                        ))}
                        {/* Orange star/flag at May 25 spike */}
                        <path d="M 180,20 L 183,13 L 192,13 L 193,20 L 183,20Z" fill="#f97316" opacity={mounted ? 1 : 0} style={{ transition: 'opacity 0.4s 1s' }} />
                        <text x="183" y="19" style={{ fontSize: 5, fill: 'white', fontWeight: 700 }}>▶</text>
                      </svg>
                      {/* X-axis labels */}
                      <div className="flex justify-between mt-1">
                        {['May 10', 'May 15', 'May 20', 'May 25', 'May 30'].map((label) => (
                          <span key={label} className="text-[7px] text-gray-300">{label}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Total users card */}
                <div
                  className="bg-white border border-gray-100 rounded-xl p-3 mt-2 shadow-sm flex items-center justify-between"
                  style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(8px)', transition: 'all 0.5s 0.5s' }}
                >
                  <div>
                    <p className="text-[8px] text-gray-400">Total users</p>
                    <p className="text-xl font-bold text-gray-900">24 532</p>
                    <p className="text-[8px] text-orange-500 font-semibold">↑ 12.5% <span className="text-gray-400 font-normal">vs last month</span></p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="4" r="2.5" stroke="#f97316" strokeWidth="1.2" />
                      <path d="M2 12c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="#f97316" strokeWidth="1.2" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Right: Active sessions + avatar badge */}
              <div className="w-[120px] flex-shrink-0 p-3 pl-0 flex flex-col gap-2">
                {/* Active sessions card */}
                <div
                  className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm"
                  style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateX(0)' : 'translateX(8px)', transition: 'all 0.5s 0.3s' }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[8px] text-gray-400">Active sessions</p>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <rect x="2" y="8" width="2" height="4" rx="0.5" fill="#e2e8f0" />
                      <rect x="6" y="5" width="2" height="7" rx="0.5" fill="#f97316" />
                      <rect x="10" y="2" width="2" height="10" rx="0.5" fill="#e2e8f0" />
                    </svg>
                  </div>
                  <p className="text-lg font-bold text-gray-900">1 482</p>
                  <p className="text-[8px] text-orange-500 font-semibold">↑ 8.2% <span className="text-gray-400 font-normal">vs last month</span></p>
                </div>

                {/* Avatar name badge */}
                <div
                  className="flex items-center gap-1.5 bg-white border border-gray-100 rounded-xl p-2 shadow-sm mt-auto"
                  style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.5s 0.8s' }}
                >
                  <div className="w-5 h-5 rounded-full bg-violet-300 flex items-center justify-center flex-shrink-0">
                    <span className="text-[7px] font-bold text-white">F</span>
                  </div>
                  <span className="text-[8px] font-semibold text-gray-700">Flavie B.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    default:
      return null;
  }
}

/* ─────────────────────── FAQ ITEM ─────────────────────── */

function FaqItem({ faq }: { faq: typeof FAQS[number] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="py-5">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-6 text-left"
      >
        <span className={`text-sm font-bold ${open ? 'text-brand-primary' : 'text-gray-500'} w-8 flex-shrink-0`}>
          {faq.num}
        </span>
        <span className={`flex-1 text-[15px] font-medium ${open ? 'text-brand-primary' : 'text-gray-300'}`}>
          {faq.question}
        </span>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="ml-14 mt-4 text-gray-400 text-[15px] leading-[1.8] max-w-[800px]">
          {faq.answer}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────── PAGE ─────────────────────── */

export default function DataVisualizationPage() {
  const [activeWhy, setActiveWhy] = useState(0);
  const whyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  const horizontalSectionRef = useRef<HTMLDivElement>(null);

  /* Scroll-driven "why" section detection */
  useEffect(() => {
    const handleScroll = () => {
      const refs = whyRefs.current;
      if (!refs.length) return;

      const scrollY = window.scrollY + window.innerHeight * 0.35;
      let current = 0;

      for (let i = 0; i < refs.length; i++) {
        const el = refs[i];
        if (el && el.offsetTop <= scrollY) {
          current = i;
        }
      }

      setActiveWhy(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Horizontal scroll driven by vertical scroll */
  useEffect(() => {
    const section = horizontalSectionRef.current;
    const container = horizontalScrollRef.current;
    if (!section || !container) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Calculate progress through the section
      const totalScroll = sectionHeight - viewportHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScroll));

      // Calculate the maximum scroll distance
      const scrollWidth = container.scrollWidth - container.offsetWidth;
      container.scrollLeft = progress * scrollWidth;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToWhy = (idx: number) => {
    whyRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className="min-h-screen bg-transparent text-white selection:bg-brand-primary/20">

      {/* ───── HERO ───── */}
      <section className="relative bg-transparent overflow-hidden">
        <div className="w-full pl-8 md:pl-24 lg:pl-32 pr-8 md:pr-24 lg:pr-0 pt-24 md:pt-32 pb-12 md:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-8 md:gap-12 items-start">
            {/* Left */}
            <div className="space-y-5 md:space-y-8 pt-4 md:pt-8 pr-8 lg:pr-0">
              <span className="text-xs md:text-sm font-medium tracking-wide text-gray-500">
                Data Visualization
              </span>

              <h1 className="text-[2rem] md:text-[3.2rem] font-bold leading-[1.1] tracking-tight text-white">
                Together, we{' '}
                <span className="relative inline-block">
                  <span className="text-brand-primary">unlock</span>
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-brand-primary rounded-full" />
                </span>{' '}
                the true value of your data
              </h1>

              <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-[480px]">
                We design innovative, data-driven solutions that empower
                responsible leaders to make informed decisions.
              </p>

              {/* Power BI badge */}
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded bg-white border border-white/10 flex items-center justify-center p-1.5 shadow-sm">
                  <img src="/logos/image7.svg" alt="Power BI" className="w-full h-full object-contain" />
                </div>
                <span className="text-xs md:text-sm font-medium text-gray-300">Power BI</span>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 bg-white text-black text-xs md:text-sm font-medium rounded-full hover:bg-gray-200 transition-colors"
              >
                Let&apos;s work together
              </Link>
            </div>


            {/* Right — Hero Dashboard Mockup */}
            <div className="bg-white rounded-2xl lg:rounded-l-2xl lg:rounded-r-none overflow-hidden border border-white/10 lg:border-y lg:border-l aspect-[1/2] lg:aspect-auto lg:h-[700px] shadow-2xl relative">
              <div className="absolute inset-0 w-[200%] h-[200%] md:w-[133.33%] md:h-[133.33%] lg:w-full lg:h-full scale-[0.5] md:scale-[0.75] lg:scale-100 origin-top-left transform-gpu">
                <AnalyticsDashboardDemo />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── CAPABILITIES LIST ───── */}
      <section className="bg-transparent">
        <div className="w-full px-8 md:px-24 lg:px-32 py-24">
          <h2 className="text-[1.6rem] md:text-[2rem] font-bold leading-tight mb-12 text-white">
            Beyond <span className="text-brand-primary">visualization</span>, towards insight
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


        </div>
      </section>

      {/* ───── HORIZONTAL SCROLL SHOWCASE ───── */}
      <section
        ref={horizontalSectionRef}
        className="relative bg-transparent"
        style={{ height: `${SHOWCASE_ITEMS.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="h-full flex items-center">
            <div
              ref={horizontalScrollRef}
              className="flex gap-12 px-8 md:px-24 lg:px-32 overflow-x-hidden w-full"
              style={{ scrollBehavior: 'auto' }}
            >
              {SHOWCASE_ITEMS.map((item, index) => (
                <div key={index} className="flex-shrink-0 w-[85vw] md:w-[70vw] lg:w-[55vw]">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center h-full">
                    {/* Dashboard mockup */}
                    <div className="bg-[#f5f0e8] rounded-2xl p-6 md:p-8">
                      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[10px] font-bold text-gray-800">woodfrog</span>
                          <img src="/logos/woodfrog-logo.svg" alt="woodfrog" className="w-2 h-2.5 object-contain" />
                        </div>
                        <h4 className="text-xs font-bold text-gray-900 mb-1">{item.subtitle}</h4>

                        {/* Metrics */}
                        <div className="grid grid-cols-2 gap-2 mt-3">
                          {item.metrics.map((m, i) => (
                            <div
                              key={i}
                              className={`rounded-lg p-2 ${m.highlight ? 'bg-brand-primary/10 border border-brand-primary/20' : 'bg-gray-50 border border-gray-100'}`}
                            >
                              {m.value && <p className={`text-sm font-bold ${m.highlight ? 'text-brand-primary' : 'text-gray-900'}`}>{m.value}</p>}
                              <p className="text-[9px] text-gray-600">{m.label}</p>
                            </div>
                          ))}
                        </div>

                        {/* Mini chart */}
                        <div className="flex items-end gap-0.5 h-10 mt-3">
                          {[20, 35, 45, 30, 55, 40, 60, 50, 70, 65, 45, 55].map((h, i) => (
                            <div
                              key={i}
                              className="flex-1 rounded-t"
                              style={{
                                height: `${h}%`,
                                backgroundColor: i === index % 12 ? '#10B981' : '#e5e7eb',
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Text */}
                    <div className="space-y-4">
                      <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 text-[15px] leading-[1.8]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───── APPROACH SECTION ───── */}
      <section className="bg-transparent">
        <div className="w-full px-8 md:px-24 lg:px-32 py-24">
          <h2 className="text-[2rem] md:text-[2.4rem] font-bold leading-tight text-white mb-12">
            Experts in data <span className="text-brand-primary">visualization</span> that drives value.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            {APPROACH_PARAGRAPHS.map((p, i) => (
              <p key={i} className="text-gray-400 text-[15px] leading-[1.8]">{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ───── WHY SECTION (scroll-driven) ───── */}
      <section className="bg-transparent">
        <div className="w-full px-8 md:px-24 lg:px-32 py-24">
          <h2 className="text-[2rem] md:text-[2.4rem] font-bold mb-20 text-white">
            Why are the <span className="text-brand-primary">analytical interfaces</span> we develop adopted by users?
          </h2>

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
                  <p className="text-gray-400 text-[15px] leading-[1.8] ml-[22px] mb-8 max-w-[640px]">
                    {s.description}
                  </p>

                  {/* Illustration */}
                  <div className="ml-0 md:ml-[22px] mt-4 overflow-hidden">
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

      {/* ───── YOUR DATA SPEAKS STATS ───── */}
      <section className="bg-transparent">
        <div className="w-full px-8 md:px-24 lg:px-32 py-24">
          <h2 className="text-[2rem] md:text-[2.4rem] font-bold text-center text-white mb-16">
            Your data speaks. Ours does too.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Card 1 — Emerald green, KPI mockup */}
            <div className="rounded-2xl overflow-hidden min-h-[440px] flex flex-col relative" style={{ backgroundColor: '#10B981' }}>
              {/* Subtle texture overlay */}
              <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: 'radial-gradient(circle at 30% 20%, #fff 0%, transparent 60%)' }} />

              {/* Top: dashboard mockup card */}
              <div className="p-6 flex-1 flex flex-col justify-start">
                <div className="bg-white rounded-xl shadow-lg p-4 w-[185px]">
                  {/* Header row */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-orange-500" />
                      <span className="text-[10px] font-bold text-gray-700">woodfrog</span>
                    </div>
                    {/* Mini bar chart icon */}
                    <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
                      <rect x="1" y="7" width="3" height="6" rx="0.5" fill="#e2e8f0" />
                      <rect x="6" y="4" width="3" height="9" rx="0.5" fill="#f97316" />
                      <rect x="11" y="1" width="3" height="12" rx="0.5" fill="#e2e8f0" />
                    </svg>
                  </div>
                  <p className="text-[22px] font-bold text-gray-900 leading-none mb-1">1 000 005</p>
                  <div className="flex items-center gap-1 mt-1.5">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M4 1L7 6H1L4 1Z" fill="#f97316" />
                    </svg>
                    <span className="text-[10px] font-semibold text-orange-500">+8.2%</span>
                    <span className="text-[9px] text-gray-400 ml-0.5">vs last year</span>
                  </div>
                  {/* Sparkline */}
                  <svg width="100%" height="28" viewBox="0 0 150 28" preserveAspectRatio="none" className="mt-2">
                    <defs>
                      <linearGradient id="sg1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f97316" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,22 C20,18 30,14 45,16 C60,18 70,10 85,8 C100,6 110,12 125,10 C135,8 142,6 150,4"
                      fill="none" stroke="#f97316" strokeWidth="1.5" />
                    <path d="M0,22 C20,18 30,14 45,16 C60,18 70,10 85,8 C100,6 110,12 125,10 C135,8 142,6 150,4 L150,28 L0,28Z"
                      fill="url(#sg1)" />
                  </svg>
                </div>
              </div>

              {/* Bottom: stat text */}
              <div className="p-6 pt-0">
                <div className="w-8 h-[2px] bg-white/30 mb-4" />
                <h3 className="text-3xl font-bold text-white mb-2">Over 1,000,000</h3>
                <p className="text-sm text-white/70 leading-relaxed">views on the reports we&apos;ve created.</p>
              </div>
            </div>

            {/* Card 2 — Dark teal */}
            <div className="rounded-2xl overflow-hidden min-h-[440px] flex flex-col relative" style={{ backgroundColor: '#1a3a3a' }}>
              {/* Gradient glow top-right */}
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-20"
                style={{ background: 'radial-gradient(circle, #f97316 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />

              {/* Decorative data grid */}
              <div className="absolute inset-0 opacity-5 pointer-events-none">
                <svg width="100%" height="100%">
                  {[0, 1, 2, 3, 4, 5].map(i => (
                    <line key={`h${i}`} x1="0" y1={`${i * 20}%`} x2="100%" y2={`${i * 20}%`} stroke="white" strokeWidth="0.5" />
                  ))}
                  {[0, 1, 2, 3, 4, 5].map(i => (
                    <line key={`v${i}`} x1={`${i * 20}%`} y1="0" x2={`${i * 20}%`} y2="100%" stroke="white" strokeWidth="0.5" />
                  ))}
                </svg>
              </div>

              {/* Top area: floating engagement metrics */}
              <div className="p-6 flex-1 flex flex-col gap-3 relative z-10">
                {/* Row of metric pills */}
                <div className="flex gap-2 flex-wrap">
                  <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1.5 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[10px] text-white font-medium">10,482 active users</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1.5">
                    <span className="text-[10px] text-white/70">↑ 23% YoY</span>
                  </div>
                </div>

                {/* Central big visualization: arc progress */}
                <div className="flex-1 flex items-center justify-center">
                  <div className="relative">
                    <svg width="160" height="100" viewBox="0 0 160 100">
                      {/* Background arc */}
                      <path d="M 20,90 A 60,60 0 0,1 140,90" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="12" strokeLinecap="round" />
                      {/* Filled arc ~75% */}
                      <path d="M 20,90 A 60,60 0 0,1 140,90" fill="none" stroke="url(#arcGrad)" strokeWidth="12" strokeLinecap="round"
                        strokeDasharray="188" strokeDashoffset="47" />
                      <defs>
                        <linearGradient id="arcGrad" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#f97316" />
                          <stop offset="100%" stopColor="#fbbf24" />
                        </linearGradient>
                      </defs>
                      <text x="80" y="78" textAnchor="middle" style={{ fontSize: 22, fontWeight: 800, fill: 'white' }}>75%</text>
                      <text x="80" y="92" textAnchor="middle" style={{ fontSize: 8, fill: 'rgba(255,255,255,0.5)' }}>engagement rate</text>
                    </svg>
                  </div>
                </div>

                {/* Bottom stats row */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { val: '4.8', label: 'Avg rating' },
                    { val: '94%', label: 'Retention' },
                    { val: '2.3m', label: 'Sessions' },
                  ].map(({ val, label }) => (
                    <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-2.5 text-center">
                      <p className="text-sm font-bold text-white">{val}</p>
                      <p className="text-[8px] text-white/40 mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom: stat text */}
              <div className="p-6 pt-0 relative z-10">
                <div className="w-8 h-[2px] bg-white/20 mb-4" />
                <h3 className="text-3xl font-bold text-white mb-2">More than 10,000</h3>
                <p className="text-sm text-white/50 leading-relaxed">unique users have engaged with the reports we developed in the past year.</p>
              </div>
            </div>

            {/* Card 3 — Warm beige */}
            <div className="rounded-2xl overflow-hidden min-h-[440px] flex flex-col relative" style={{ backgroundColor: '#f5f0e8' }}>

              {/* Top: stacked floating cards */}
              <div className="p-6 flex-1 flex flex-col gap-3">

                {/* Main session card */}
                <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[10px] text-gray-400 mb-1">Avg session duration</p>
                      <p className="text-2xl font-bold text-gray-900">4m 32s</p>
                    </div>
                    {/* Clock icon */}
                    <div className="w-9 h-9 rounded-full border-2 border-rose-200 bg-rose-50 flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <circle cx="7" cy="7" r="5.5" stroke="#f43f5e" strokeWidth="1.2" />
                        <path d="M7 4V7L9 8.5" stroke="#f43f5e" strokeWidth="1.2" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <svg width="8" height="8" viewBox="0 0 8 8"><path d="M4 1L7 6H1L4 1Z" fill="#f97316" /></svg>
                      <span className="text-[10px] font-semibold text-orange-500">0.5%</span>
                      <span className="text-[9px] text-gray-400">vs last month</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg width="8" height="8" viewBox="0 0 8 8"><path d="M4 7L7 2H1L4 7Z" fill="#ef4444" /></svg>
                      <span className="text-[10px] font-semibold text-red-400">1.8%</span>
                      <span className="text-[9px] text-gray-400">vs last month</span>
                    </div>
                  </div>
                </div>

                {/* Secondary card: interfaces */}
                <div className="bg-white rounded-xl shadow-sm p-3.5 border border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="text-[9px] text-gray-400">Interfaces delivered</p>
                    <p className="text-lg font-bold text-gray-900">600+</p>
                  </div>
                  {/* Mini progress ring */}
                  <svg width="40" height="40" viewBox="0 0 40 40">
                    <circle cx="20" cy="20" r="15" fill="none" stroke="#f3f4f6" strokeWidth="5" />
                    <circle cx="20" cy="20" r="15" fill="none" stroke="#7a6c2e" strokeWidth="5"
                      strokeDasharray="94.2" strokeDashoffset="9.4" strokeLinecap="round"
                      transform="rotate(-90 20 20)" />
                    <text x="20" y="24" textAnchor="middle" style={{ fontSize: 8, fontWeight: 700, fill: '#7a6c2e' }}>90%</text>
                  </svg>
                </div>

                {/* Third card: satisfaction score */}
                <div className="bg-white rounded-xl shadow-sm p-3.5 border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[9px] text-gray-400">User satisfaction</p>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <svg key={s} width="10" height="10" viewBox="0 0 10 10">
                          <path d="M5 1L6.2 3.6L9 4L7 5.9L7.5 8.7L5 7.4L2.5 8.7L3 5.9L1 4L3.8 3.6Z"
                            fill={s <= 4 ? '#f97316' : '#e5e7eb'} />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-end gap-1">
                    <span className="text-2xl font-bold text-gray-900">4.7</span>
                    <span className="text-[10px] text-gray-400 mb-1">/ 5.0</span>
                    <span className="ml-auto text-[9px] text-green-500 font-semibold bg-green-50 px-1.5 py-0.5 rounded-full">↑ 12%</span>
                  </div>
                </div>
              </div>

              {/* Bottom: stat text */}
              <div className="p-6 pt-0">
                <div className="w-8 h-[2px] bg-gray-300 mb-4" />
                <h3 className="text-3xl font-bold text-gray-900 mb-2">600+</h3>
                <p className="text-sm text-gray-600 leading-relaxed">user interfaces designed and developed.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ───── FAQs ───── */}
      <section className="bg-transparent">
        <div className="w-full px-8 md:px-24 lg:px-32 py-24">
          <h2 className="text-[2rem] md:text-[2.4rem] font-bold text-white mb-4">FAQs</h2>
          <div className="w-full h-[2px] bg-brand-primary mb-8" />

          <div className="divide-y divide-white/10">
            {FAQS.map((faq, idx) => (
              <FaqItem key={faq.num} faq={faq} />
            ))}
          </div>
        </div>
      </section>

      {/* ───── CTA SECTION ───── */}
      <section className="bg-transparent">
        <div className="w-full px-8 md:px-24 lg:px-32 py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-white font-semibold text-sm italic">
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

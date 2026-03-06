'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { DataEngineeringDemo } from '@/components/animations/data-engineering-demo';
import {
  CICDIllustration,
  ArchitectureIllustration,
  AutomationIllustration,
  DataModelingIllustration,
  ArchivingIllustration,
  SecurityIllustration,
  MigrationIllustration,
  CostOptimizationIllustration,
} from '@/components/animations/data-engineering-service-illustrations';

/* ─────────────────────── DATA ─────────────────────── */

const SERVICES = [
  {
    id: 'cicd',
    title: 'Deployment of CI/CD pipelines and DataOps processes',
    description:
      'Our data engineering experts integrate continuous delivery processes into every data integration project to enable automated, iterative deployments. Through the adoption of DataOps best practices, we aim to deliver ongoing value to your users while accelerating access to reliable data.',
  },
  {
    id: 'architectures',
    title: 'Design and recommendation of analytical architectures and infrastructures',
    description:
      'Aligned with your current and future analytical objectives, our experts recommend innovative, scalable solutions tailored to your business and functional needs. We ensure that the proposed architecture and infrastructure are both cost-effective and strategically aligned with your short, mid, and long-term goals. Whether for a redesign, a migration, or an ongoing optimization process, our team will provide the guidance you need.',
  },
  {
    id: 'automation',
    title: 'Implementing automated processes to capture and retrieve data efficiently',
    description:
      'Using modern data integration and orchestration platforms, we automate and standardize the extraction, transformation, and loading of your data, regardless of the source. We also automate various data retrieval processes through the implementation of RPA (Robotic Process Automation) solutions, using advanced scripting tools and workflow automation platforms, as well as through the development of custom business applications.',
  },
  {
    id: 'modeling',
    title: 'Data modeling',
    description:
      'Our experts design and implement data models that support your analytics and reporting needs. From dimensional modeling for data warehouses to graph models for complex relationships, we ensure your data is structured for optimal query performance and business insight generation.',
  },
  {
    id: 'archiving',
    title: 'Data archiving and storage solutions',
    description:
      'We help you implement robust data archiving and storage strategies using cloud-native solutions. Whether it\'s hot, warm, or cold storage tiers, we optimize your data lifecycle management to balance performance requirements with cost efficiency.',
  },
  {
    id: 'security',
    title: 'Data security management',
    description:
      'Protecting your data assets is paramount. We implement comprehensive security measures including encryption, access controls, data masking, and audit trails. Our approach ensures compliance with industry regulations while maintaining data accessibility for authorized users.',
  },
  {
    id: 'migration',
    title: 'Migrating your analytics environment to modern data platforms',
    description:
      'Leverage our expertise to seamlessly migrate your existing analytics workloads to modern data platforms. We handle the complete migration lifecycle - assessment, planning, execution, and validation - minimizing downtime and ensuring data integrity throughout the process.',
  },
  {
    id: 'cost',
    title: 'Cost management and optimization for your analytical solutions',
    description:
      'We analyze and optimize your data platform spending across compute, storage, and licensing. Through right-sizing, auto-scaling policies, and resource governance, we help you achieve significant cost reductions while maintaining or improving performance.',
  },
];

const TOOLS = [
  { name: 'Data Platform', abbr: 'D', color: '#E25D3E' },
  { name: 'DevOps Platform', abbr: 'A', color: '#0078D4' },
  { name: 'Analytics Tool', abbr: 'PB', color: '#F2C811' },
  { name: 'Data Integration', abbr: 'Fv', color: '#0073FF' },
  { name: 'Workflow Automation', abbr: 'PA', color: '#0066FF' },
  { name: 'Data Orchestration', abbr: 'DF', color: '#0078D4' },
  { name: 'Compute Platform', abbr: 'Db', color: '#FF3621' },
  { name: 'Database System', abbr: 'SQL', color: '#CC2927' },
  { name: 'Application Platform', abbr: 'Pp', color: '#742774' },
  { name: 'Storage Layer', abbr: 'SL', color: '#E25D3E' },
];

/* ─────────────────────── COMPONENTS ─────────────────────── */

/** Architecture diagram - SVG matching the reference */
const ArchitectureDiagram = () => (
  <div className="relative w-full h-full min-h-[600px] flex items-start justify-center pt-4">
    <svg viewBox="0 0 620 700" fill="none" className="w-full max-w-[580px]" xmlns="http://www.w3.org/2000/svg">
      {/* Microsoft Azure Box */}
      <rect x="140" y="10" width="230" height="140" rx="6" stroke="var(--brand-primary)" strokeWidth="1.5" fill="none" />
      <text x="260" y="38" textAnchor="middle" className="text-[13px] font-bold" fill="var(--brand-primary)">Cloud Platform</text>
      <text x="260" y="62" textAnchor="middle" className="text-[11px]" fill="#999">Landing zone</text>
      {/* Storage cylinder */}
      <ellipse cx="260" cy="82" rx="22" ry="8" fill="#E25D3E" opacity="0.8" />
      <rect x="238" y="82" width="44" height="30" fill="#E25D3E" opacity="0.7" />
      <ellipse cx="260" cy="112" rx="22" ry="8" fill="#E25D3E" opacity="0.9" />
      <ellipse cx="260" cy="82" rx="22" ry="8" fill="#E25D3E" />
      <text x="260" y="138" textAnchor="middle" className="text-[9px]" fill="#777">Cloud Storage Service</text>

      {/* Source icons left */}
      <rect x="20" y="55" width="55" height="42" rx="4" stroke="#444" strokeWidth="1" fill="#1a1a1a" />
      <rect x="33" y="64" width="8" height="22" rx="1" fill="#555" />
      <rect x="45" y="68" width="8" height="18" rx="1" fill="#444" />
      <line x1="75" y1="76" x2="140" y2="76" stroke="#10B981" strokeWidth="1.2" markerEnd="url(#arrowBrand)" />

      {/* AI Use cases */}
      <rect x="410" y="50" width="130" height="40" rx="4" stroke="#E25D3E" strokeWidth="1" strokeDasharray="4 3" fill="rgba(226,93,62,0.08)" />
      <text x="440" y="75" className="text-[11px] font-medium" fill="#E25D3E">AI Use cases</text>
      <line x1="370" y1="70" x2="410" y2="70" stroke="#4DA3FF" strokeWidth="1" strokeDasharray="3 3" />

      {/* Arrow Azure -> Fabric */}
      <line x1="260" y1="150" x2="260" y2="200" stroke="#10B981" strokeWidth="1.2" />
      <polygon points="255,197 260,207 265,197" fill="#10B981" />

      {/* Microsoft Fabric Box */}
      <rect x="30" y="210" width="560" height="180" rx="6" stroke="var(--brand-primary)" strokeWidth="1.5" fill="none" />
      <foreignObject x="60" y="222" width="22" height="22">
        <div className="w-full h-full bg-white rounded-md border border-zinc-200 flex items-center justify-center p-1">
          <img src="/logos/tools17.svg" alt="Fabric" className="w-full h-full object-contain" />
        </div>
      </foreignObject>
      <text x="85" y="240" className="text-[13px] font-bold" fill="var(--brand-primary)">Data Experience</text>

      {/* Pipeline: Data Factory */}
      <g>
        <rect x="55" y="270" width="54" height="48" rx="6" fill="#1a1a1a" stroke="#333" strokeWidth="1" />
        <foreignObject x="71" y="280" width="22" height="22">
          <div className="w-full h-full bg-white rounded-md border border-zinc-200 flex items-center justify-center p-1">
            <img src="/logos/image12.svg" alt="Data Factory" className="w-full h-full object-contain" />
          </div>
        </foreignObject>
        <text x="82" y="335" textAnchor="middle" className="text-[8px]" fill="#777">Data Integration |</text>
        <text x="82" y="346" textAnchor="middle" className="text-[8px]" fill="#777">Processing Activity</text>
      </g>

      {/* Arrow */}
      <line x1="115" y1="294" x2="155" y2="294" stroke="#10B981" strokeWidth="1" markerEnd="url(#arrowBrand)" />

      {/* Lakehouse Bronze */}
      <g>
        <rect x="160" y="270" width="54" height="48" rx="6" fill="#1a1a1a" stroke="#333" strokeWidth="1" />
        <foreignObject x="176" y="280" width="22" height="22">
          <div className="w-full h-full bg-white rounded-md border border-zinc-200 flex items-center justify-center p-1">
            <img src="/logos/tools24.svg" alt="Lakehouse" className="w-full h-full object-contain" />
          </div>
        </foreignObject>
        <text x="187" y="335" textAnchor="middle" className="text-[8px]" fill="var(--brand-primary)">Lakehouse</text>
        <text x="187" y="346" textAnchor="middle" className="text-[8px]" fill="var(--brand-primary)">Bronze Layer</text>
      </g>

      {/* Arrow */}
      <line x1="220" y1="294" x2="260" y2="294" stroke="#666" strokeWidth="1" />
      <polygon points="255,291 262,294 255,297" fill="#666" />

      {/* Data Engineering Notebook */}
      <g>
        <rect x="265" y="270" width="54" height="48" rx="6" fill="#1a1a1a" stroke="#333" strokeWidth="1" />
        <foreignObject x="176" y="280" width="22" height="22">
          <div className="w-full h-full bg-white rounded-md border border-zinc-200 flex items-center justify-center p-1">
            <img src="/logos/image10.svg" alt="Notebook" className="w-full h-full object-contain" />
          </div>
        </foreignObject>
        <text x="292" y="335" textAnchor="middle" className="text-[8px]" fill="#777">Data Engineering |</text>
        <text x="292" y="346" textAnchor="middle" className="text-[8px]" fill="#777">Notebook / Spark Job</text>
      </g>

      {/* Arrow */}
      <line x1="325" y1="294" x2="365" y2="294" stroke="#666" strokeWidth="1" />
      <polygon points="360,291 367,294 360,297" fill="#666" />

      {/* Lakehouse Silver */}
      <g>
        <rect x="370" y="270" width="54" height="48" rx="6" fill="#1a1a1a" stroke="#333" strokeWidth="1" />
        <g transform="translate(384, 280)">
          <path d="M0 20 L13 0 L26 20 Z" fill="none" stroke="#E25D3E" strokeWidth="1.5" />
          <path d="M6 20 L13 6 L20 20 Z" fill="none" stroke="#E25D3E" strokeWidth="1" opacity="0.5" />
        </g>
        <text x="397" y="335" textAnchor="middle" className="text-[8px]" fill="var(--brand-primary)">Lakehouse</text>
        <text x="397" y="346" textAnchor="middle" className="text-[8px]" fill="var(--brand-primary)">Silver Layer</text>
      </g>

      {/* Arrow */}
      <line x1="430" y1="294" x2="470" y2="294" stroke="#666" strokeWidth="1" />
      <polygon points="465,291 472,294 465,297" fill="#666" />

      {/* Data Engineering 2 */}
      <g>
        <rect x="475" y="270" width="54" height="48" rx="6" fill="#1a1a1a" stroke="#333" strokeWidth="1" />
        <foreignObject x="176" y="280" width="22" height="22">
          <div className="w-full h-full bg-white rounded-md border border-zinc-200 flex items-center justify-center p-1">
            <img src="/logos/image13.svg" alt="Engineering" className="w-full h-full object-contain" />
          </div>
        </foreignObject>
        <text x="502" y="335" textAnchor="middle" className="text-[8px]" fill="#777">Data Engineering |</text>
        <text x="502" y="346" textAnchor="middle" className="text-[8px]" fill="#777">Notebook / Spark Job</text>
      </g>

      {/* Arrow down to Gold Layer */}
      <line x1="502" y1="355" x2="502" y2="410" stroke="#10B981" strokeWidth="1.2" />
      <polygon points="497,407 502,417 507,407" fill="#10B981" />

      {/* Gold Layer Box */}
      <rect x="430" y="420" width="160" height="160" rx="6" fill="#1a1a1a" stroke="var(--brand-primary)" strokeWidth="1.5" />
      <g transform="translate(442, 432)">
        <path d="M0 16 L10 0 L20 16 Z" fill="none" stroke="var(--brand-primary)" strokeWidth="1.5" />
      </g>
      <text x="475" y="444" className="text-[11px] font-semibold" fill="var(--brand-primary)">Lakehouse</text>
      <text x="475" y="458" className="text-[10px]" fill="var(--brand-primary)">Gold Layer</text>
      {/* Star items */}
      {['A-001', 'A-002', 'A-003', 'A-004', 'A-005'].map((label, i) => (
        <g key={label}>
          <text x={450} y={482 + i * 18} className="text-[10px]" fill="var(--brand-primary)">&#9733;</text>
          <text x={468} y={482 + i * 18} className="text-[9px]" fill="#999">{label}</text>
        </g>
      ))}

      {/* Shortcut / Mirroring */}
      <text x="200" y="430" textAnchor="middle" className="text-[11px] font-medium" fill="#999">Shortcut / Mirroring</text>
      <line x1="200" y1="390" x2="200" y2="420" stroke="#555" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="200" y1="440" x2="200" y2="520" stroke="#555" strokeWidth="1" strokeDasharray="3 3" />

      {/* Direct Lake */}
      <text x="350" y="430" textAnchor="middle" className="text-[11px] font-medium" fill="#999">Direct Lake</text>
      <line x1="350" y1="390" x2="350" y2="420" stroke="#555" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="350" y1="440" x2="350" y2="520" stroke="#555" strokeWidth="1" strokeDasharray="3 3" />

      {/* Data items below (A-004, A-005, A-006 boxes) */}
      {[
        { label: 'A-004', y: 450 },
        { label: 'A-005', y: 530 },
        { label: 'A-006', y: 610 },
      ].map((item) => (
        <g key={item.label}>
          <rect x="80" y={item.y} width="120" height="60" rx="4" fill="none" stroke="#E25D3E" strokeWidth="1" />
          <text x="92" y={item.y + 18} className="text-[10px]" fill="var(--brand-primary)">{item.label}</text>
          <circle cx="100" cy={item.y + 40} r="10" fill="none" stroke="#E25D3E" strokeWidth="1" />
          <text x="100" y={item.y + 44} textAnchor="middle" className="text-[8px]" fill="#E25D3E">?</text>
          <text x="116" y={item.y + 44} className="text-[10px]" fill="#999">Data</text>
          <line x1="200" y1={item.y + 30} x2="205" y2={item.y + 30} stroke="#666" strokeWidth="1" />
          <polygon points={`202,${item.y + 27} 208,${item.y + 30} 202,${item.y + 33}`} fill="#666" />
        </g>
      ))}

      {/* Arrow marker definition */}
      <defs>
        <marker id="arrowBrand" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <polygon points="0,0 8,4 0,8" fill="#10B981" />
        </marker>
      </defs>
    </svg>
  </div>
);

/** Animated service illustrations */
function ServiceIllustration({ id }: { id: string }) {
  switch (id) {
    case 'cicd': return <CICDIllustration />;
    case 'architectures': return <ArchitectureIllustration />;
    case 'automation': return <AutomationIllustration />;
    case 'modeling': return <DataModelingIllustration />;
    case 'archiving': return <ArchivingIllustration />;
    case 'security': return <SecurityIllustration />;
    case 'migration': return <MigrationIllustration />;
    case 'cost': return <CostOptimizationIllustration />;
    default: return <CICDIllustration />;
  }
}

/* ─────────────────────── PAGE ─────────────────────── */

export default function DataEngineeringPage() {
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
                Data Engineering
              </span>

              <h1 className="text-[2rem] md:text-[3.2rem] font-bold leading-[1.1] tracking-tight text-white">
                Together, we{' '}
                <span className="relative inline-block">
                  <span className="text-brand-primary">architect</span>
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-brand-primary rounded-full" />
                </span>{' '}
                data into value
              </h1>

              <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-[420px]">
                We extract, transform, and load your data into secure environments through well-defined and transparent processes.
              </p>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 bg-white text-black text-xs md:text-sm font-medium rounded-full hover:bg-gray-200 transition-colors"
              >
                Let&apos;s work together
              </Link>
            </div>

            {/* Right - Architecture Diagram */}
            <div className="bg-white rounded-2xl overflow-hidden border border-white/10 mt-8 lg:mt-0 aspect-[4/3] lg:aspect-auto lg:h-[600px] relative">
              <div className="absolute inset-0 w-[200%] h-[200%] md:w-[133.33%] md:h-[133.33%] lg:w-full lg:h-full scale-[0.5] md:scale-[0.75] lg:scale-100 origin-top-left transform-gpu">
                <DataEngineeringDemo />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── AUTOMATION SECTION ───── */}
      <section className="bg-transparent">
        <div className="w-full px-8 md:px-24 lg:px-32 py-24">
          <h2 className="text-[2rem] md:text-[2.4rem] font-bold leading-tight max-w-2xl mb-16 text-white">
            We <span className="text-brand-primary">automate</span> recurring tasks, from<br />the simplest to the most complex
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            <p className="text-gray-400 text-[15px] leading-[1.8]">
              Our data engineering experts tackle integration challenges with a deep understanding of your business objectives. By leading workshops and collaborative sessions, they identify recurring tasks within your operations and recommend the most effective technologies to automate them. Their focus is on minimizing manual effort and mitigating data quality risks, allowing your teams to focus on higher-value activities.
            </p>
            <p className="text-gray-400 text-[15px] leading-[1.8]">
              Whether working with structured, semi-structured, or unstructured data, our experts help you implement automated processes for data ingestion, archiving, and storage. From data integration workflows to the deployment of data lakes or data warehouses, we leverage our expertise to recommend analytical architectures aligned with your business and technical requirements.
            </p>
          </div>
        </div>
      </section>

      {/* ───── VALUE-DRIVEN SERVICES (scroll-driven) ───── */}
      <section className="bg-transparent">
        <div className="w-full px-8 md:px-24 lg:px-32 py-24">
          <h2 className="text-[2rem] md:text-[2.4rem] font-bold mb-20 text-white">Our value-driven services</h2>

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
                    className="scroll-mt-28 pt-8 pb-8 mb-0 border-b border-white/10 last:border-b-0 last:pb-0"
                >
                  {/* Service Title */}
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
                  <div className="ml-0 md:ml-[22px] mt-4 overflow-hidden md:rounded-2xl md:border md:border-white/10">
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

      {/* ───── TOOLS SECTION (hidden on mobile) ───── */}
      <section className="hidden md:block bg-[#111111]/50">
        <div className="w-full px-8 md:px-24 lg:px-32 py-32 relative overflow-hidden">
          {/* Scattered tool icons */}
          <div className="absolute inset-0 pointer-events-none">
            {TOOLS.map((tool, i) => {
              const positions = [
                { top: '8%', left: '10%' },
                { top: '6%', right: '12%' },
                { top: '28%', left: '3%' },
                { top: '22%', left: '18%' },
                { top: '25%', right: '4%' },
                { top: '28%', right: '18%' },
                { top: '65%', left: '10%' },
                { top: '62%', left: '25%' },
                { top: '65%', right: '10%' },
                { top: '68%', right: '22%' },
              ];
              const pos = positions[i];
              // More diverse set of unique logos from public/logos
              const logoFiles = [
                'tools17.svg', 'tools18.svg', 'tools19.svg', 'tools20.svg', 'tools21.svg',
                'tools22.svg', 'tools23.svg', 'tools24.svg', 'tools25.svg', 'tools26.svg'
              ];
              return (
                <div
                  key={i}
                  className="absolute w-14 h-14 rounded-xl bg-white border border-white/10 flex items-center justify-center p-3 shadow-md"
                  style={pos as React.CSSProperties}
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
            <h2 className="text-[2rem] md:text-[2.4rem] font-bold text-white">Our tools deliver proven results</h2>
            <p className="text-gray-400 text-[15px] leading-relaxed">
              Guided by our experts, you&apos;ll be equipped to anticipate emerging analytics trends and ensure alignment with the best practices in your industry.
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

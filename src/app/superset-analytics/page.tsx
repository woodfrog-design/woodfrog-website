'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
    SupersetServiceIllustration,
} from '@/components/animations/superset-analytics-illustrations';
import { SupersetHeroAnimation } from '@/components/animations/superset-hero-animation';
import Image from 'next/image';

// Images for horizontal scroll showcase
import whaleChartImg from './images/Whale Curve Chart.png';
import mekkoChartImg from './images/image12.png';
import financialReportImg from './images/image5.png';
import defectFixesImg from './images/waterfall chart.png';
import filterChartsImg from './images/filter-charts.png';
import handlebarsChartImg from './images/handlebars-chart.png';
import eventVisibilityImg from './images/event-visibility.png';

/* ─────────────────────── DATA ─────────────────────── */

const SERVICES = [
    {
        id: 'deployment',
        title: 'Deployment & Maintenance',
        description:
            'We set up Superset for cloud or on-prem environments, ensuring it\'s production-ready with Docker or Kubernetes, secure networking, and full database integration. We also provide ongoing maintenance — upgrades, issue resolution, and monitoring. For example, we recently handled a multi-tenant Superset deployment for a manufacturing group with high availability and automated backups.',
    },
    {
        id: 'custom',
        title: 'Custom Feature Development',
        description:
            'We build unique features to enhance Superset — custom time filters, industry-specific chart plugins like waterfall or Pareto charts, and more. These additions help clients gain deeper, faster insights tailored to their specific business context and domain requirements.',
    },
    {
        id: 'performance',
        title: 'Performance Optimization',
        description:
            'We identify bottlenecks, improve queries, integrate caching layers, and redesign schema when needed. We helped one logistics company cut dashboard load time from 15 seconds to under 3 seconds by integrating ClickHouse and pre-aggregated tables for repeated queries.',
    },
    {
        id: 'embedded',
        title: 'Embedded Superset Solutions',
        description:
            'If you want to embed dashboards into your SaaS app or internal tools, we can theme Superset, restrict views by role, and integrate it seamlessly. A recent example: embedding retail dashboards into a customer portal with row-level security and role-based visibility for different user types.',
    },
    {
        id: 'theming',
        title: 'Theming & UX Overhaul',
        description:
            'We customize Superset\'s look and feel to match your brand and improve usability across teams. One project included adding dark/light mode switching, reorganized navigation menus, and a mobile-friendly executive dashboard that became the company\'s daily command center.',
    },
    {
        id: 'security',
        title: 'Advanced Security & Role Management',
        description:
            'We configure Superset for fine-grained access using RBAC, integrate with SSO (OAuth/SAML/LDAP), and ensure compliance through audits and access logs. For a healthcare client, we enabled role-based views scoped specifically for doctors, administrators, and analysts — each seeing only what they need.',
    },
    {
        id: 'alerts',
        title: 'Custom Alerts & Automation',
        description:
            'We go beyond built-in alerts — setting up Slack notifications, scheduled PDF report emails, or integrating real-time ML-based alerts triggered by anomalies in your data. A manufacturing client now receives automated fault alerts directly from Superset, enabling faster response times.',
    },
    {
        id: 'dashboard',
        title: 'Analytics & Dashboard Design',
        description:
            'We create dashboards that matter — from executive summaries to granular operational deep dives — helping you extract the right insights with clear visual storytelling. Every dashboard is designed with the end user in mind, ensuring data is both accessible and actionable.',
    },
    {
        id: 'workflow',
        title: 'Workflow Automation & LLM Integration',
        description:
            'We enable text-to-SQL through LLMs like OpenAI, allowing non-technical users to ask questions in plain language and receive answers rendered as charts or tables. We also build custom triggers that automate downstream actions based on data thresholds — bridging the gap between insight and action.',
    },
];

/* Data for horizontal scroll showcase */

const SHOWCASE_ITEMS = [
    {
        id: 'whale-chart',
        title: 'Whale Chart — Custom Profitability Visualization',
        subtitle: 'Advanced Profitability',
        description: 'Whale charts are incredibly useful for visualizing cumulative contribution, especially in finance. We built a custom whale chart for a finance-sector client to show how a small percentage of accounts contributed disproportionately to total revenue.',
        points: [
            'Helps stakeholders quickly identify key contributors and long-tail segments',
            'Shows exact cumulative profit contribution per account, ranked visually',
            'Highlights resource-draining outliers that standard charts miss',
            'Fully interactive and integrates seamlessly within Superset dashboards',
        ],
        image: whaleChartImg,
        contain: true,
    },
    {
        id: 'financial-report',
        title: 'Financial Reporting Format — Advanced Tabular Reports',
        subtitle: 'Enterprise Reporting',
        description: 'Reports that combine hierarchical headers, mixed formatting (currency, percentages), subtotals, and multi-level metric groupings require more than standard table visuals. This becomes a significant need for finance, sales, or operations teams relying on structured KPIs for executive reviews.',
        points: [
            'Custom chart plugin that replicates 95% of advanced reporting features',
            'Supports nested headers, custom cell formatting, and row/column subtotals',
            'Dynamic metric grouping with indentation and conditional styling',
            'Brings structured reporting into Superset — no need to export to Excel',
        ],
        image: financialReportImg,
        contain: true,
    },
    {
        id: 'mekko-chart',
        title: 'Mekko Chart — Multi-Dimensional Market View',
        subtitle: 'Market Analysis',
        description: 'We added a custom Mekko chart to Superset, enabling users to visualize data with both category share and relative size in a single view. Unlike standard bar charts, the Mekko chart displays variable-width bars, making it ideal for market share, product mix, or segmentation analysis.',
        points: [
            'Variable-width bars accurately represent relative market share',
            'Captures scale, segment performance, and profitability in one compact view',
            'Built to support multi-dimensional insights within tight dashboard space',
            'Fully interactive with drill-down and cross-filter support',
        ],
        image: mekkoChartImg,
        contain: true,
    },
    {
        id: 'defect-fixes',
        title: 'Fixing Existing Defects & Contributions',
        subtitle: 'OSS Contributions',
        description: 'When platform defaults fall short, we contribute directly to the source. We actively identify issues, develop fixes, and upstream patches to ensure a robust foundation for enterprise analytics.',
        points: [
            'Horizontal waterfall chart support in addition to vertical',
            'Axis label fixes to word-wrap longer labels instead of hiding them',
            'Added sorting options and subtotal formatting for waterfall charts',
            'Cross-filtering now feasible for waterfall charts',
            'Resolved incorrect legend color mappings post Superset 4.1.2 update',
        ],
        image: defectFixesImg,
    },
    {
        id: 'filter-charts',
        title: 'Side-by-Side Filtering — Seamless Comparison',
        subtitle: 'Data Exploration',
        description: 'Comparing complex data hierarchies often means toggling filters back and forth, breaking the analytical flow. We solved this with a dual-column filter architecture that enables seamless side-by-side comparison across deep data dives.',
        points: [
            'Dual-column layout for comparing two filter states simultaneously',
            'Nested tree filters with search, expand/collapse, and presets',
            'Persistent comparison mode keeps both views locked while exploring',
            'One-click filter presets eliminate repetitive setup for recurring analysis',
        ],
        image: filterChartsImg,
        contain: true,
    },
    {
        id: 'handlebars-reporting',
        title: 'Executive Health Cards — Operational Clarity',
        subtitle: 'Operational Intelligence',
        description: 'Complex charts are often too noisy for rapid executive feedback. We designed custom operational health cards that translate raw data into color-coded status assessments, enabling instant executive action without deep data exploration.',
        points: [
            'Color-coded status summaries (green/amber/red) for instant understanding',
            'Consolidates scattered KPIs into a single-glance overview grid',
            'Custom Handlebars extensions with conditional rendering and click-through',
            'Designed for non-technical users who need clarity, not complexity',
        ],
        image: handlebarsChartImg,
        contain: true,
    },
    {
        id: 'custom-alerts',
        title: 'Event Visibility — Custom Alert Monitoring',
        subtitle: 'Alerting & Automation',
        description: 'While Superset supports basic alerts via email or Slack, teams often need event visibility directly within the platform. We developed a custom feature that allows users to view triggered alerts, status changes, and event logs directly in the Superset UI.',
        points: [
            'Broader team engagement with in-platform alert visibility',
            'Real-time event feeds for operational monitoring dashboards',
            'Full incident timeline with searchable logs and timestamps',
            'Improves transparency and reduces the gap between observation and action',
        ],
        image: eventVisibilityImg,
        contain: true,
    },
];

/* ─────────────────────── PAGE ─────────────────────── */

export default function SupersetAnalyticsPage() {
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
                if (el && el.offsetTop <= scrollY) current = i;
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
        <main className="min-h-screen bg-transparent text-white selection:bg-brand-primary/20">

            {/* ───── HERO ───── */}
            <section className="relative bg-transparent overflow-hidden">
                <div className="w-full px-8 md:px-24 lg:px-32 pt-24 md:pt-32 pb-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
                        {/* Left */}
                        <div className="space-y-5 md:space-y-8 pt-4 md:pt-8">
                            <span className="text-xs md:text-sm font-medium tracking-wide text-gray-500">
                                Superset Analytics & Customization
                            </span>

                            <h1 className="text-[2rem] md:text-[3.2rem] font-bold leading-[1.1] tracking-tight text-white">
                                We help you{' '}
                                <span className="relative inline-block">
                                    <span className="text-brand-primary">migrate</span>
                                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-brand-primary rounded-full" />
                                </span>{' '}
                                to Apache Superset & eliminate license costs
                            </h1>

                            <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-[480px]">
                                We specialize in tailoring Apache Superset to fit your business needs — whether
                                you&apos;re scaling enterprise BI or building a standout solution as a startup.
                                We deliver high-performance, deeply integrated Superset implementations, backed
                                by hands-on experience.
                            </p>

                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 bg-white text-black text-xs md:text-sm font-medium rounded-full hover:bg-gray-200 transition-colors"
                            >
                                Let&apos;s work together
                            </Link>
                        </div>

                        {/* Right — Interactive Animation */}
                        <div className="rounded-2xl overflow-hidden border border-slate-200/60 aspect-[4/3] lg:aspect-auto lg:h-[500px] relative shadow-[0_4px_24px_rgba(0,0,0,0.06)]" style={{ background: '#ffffff' }}>
                            <SupersetHeroAnimation isActive={true} />
                        </div>
                    </div>
                </div>
            </section>

            {/* ───── SHOWCASE HEADER ───── */}
            <div className="w-full px-8 md:px-24 lg:px-32 pt-32 md:pt-48 pb-0">
                <h2 className="text-[2rem] md:text-[2.4rem] font-bold leading-tight max-w-2xl text-white">
                    Built on <span className="text-brand-primary">real delivery</span> experience
                </h2>
            </div>

            {/* ───── ALTERNATING SHOWCASE ───── */}
            <section className="relative bg-transparent z-10">
                <div className="w-full px-8 md:px-24 lg:px-32 py-16 md:py-24 space-y-20 md:space-y-32">
                    {SHOWCASE_ITEMS.map((item, index) => {
                        const isEven = index % 2 === 0;
                        return (
                            <div
                                key={item.id}
                                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center`}
                            >
                                {/* Image */}
                                <div
                                    className={`relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 shadow-lg ${item.contain ? 'bg-white p-6' : ''
                                        } ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
                                >
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className={item.contain ? 'object-contain' : 'object-cover'}
                                    />
                                </div>

                                {/* Text */}
                                <div
                                    className={`space-y-4 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
                                >
                                    <span className="text-xs md:text-sm font-medium tracking-wide text-brand-primary">
                                        {item.subtitle}
                                    </span>
                                    <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-400 text-[14px] leading-[1.8]">
                                        {item.description}
                                    </p>
                                    <ul className="space-y-2 pt-1">
                                        {item.points.map((point, pi) => (
                                            <li key={pi} className="flex items-start gap-2.5">
                                                <span className="flex-shrink-0 mt-[7px] w-1.5 h-1.5 rounded-full bg-brand-primary" />
                                                <span className="text-gray-300 text-[13px] leading-[1.7]">{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ───── VALUE-DRIVEN SERVICES (scroll-driven) ───── */}
            <section className="bg-transparent">
                <div className="w-full px-8 md:px-24 lg:px-32 py-24">
                    <h2 className="text-[2rem] md:text-[2.4rem] font-bold mb-20 text-white">Our value-driven services</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-16 lg:gap-24">
                        {/* Left — Sticky Nav */}
                        <div className="hidden lg:block">
                            <nav className="sticky top-28 space-y-0">
                                {SERVICES.map((item, idx) => (
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
                                            <span className={`inline-block w-2 h-2 rounded-[2px] mt-1 flex-shrink-0 transition-colors duration-200 ${activeItem === idx ? 'bg-brand-primary' : 'bg-transparent'}`} />
                                            {item.title}
                                        </span>
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Right — Scrolling Content */}
                        <div className="space-y-0">
                            {SERVICES.map((item, idx) => (
                                <div
                                    key={item.id}
                                    ref={(el) => { sectionRefs.current[idx] = el; }}
                                    className="scroll-mt-28 pt-8 pb-8 mb-0 border-b border-white/10 last:border-b-0 last:pb-0"
                                >
                                    <div className="flex items-start gap-3 mb-5">
                                        <span className="inline-block w-2.5 h-2.5 rounded-[2px] bg-brand-primary mt-2 flex-shrink-0" />
                                        <h3 className="text-xl md:text-[1.35rem] font-bold leading-tight text-brand-primary">
                                            {item.title}
                                        </h3>
                                    </div>

                                    <p className="text-gray-400 text-[15px] leading-[1.8] ml-0 md:ml-[22px] mb-8 max-w-[640px]">
                                        {item.description}
                                    </p>

                                    <div className="ml-0 md:ml-[22px] mt-4 overflow-hidden">
                                        <div className="origin-top-left scale-[0.72] md:scale-100 -mr-[38%] md:mr-0">
                                            <SupersetServiceIllustration id={item.id} />
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

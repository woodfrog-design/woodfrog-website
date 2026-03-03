'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
    SupersetServiceIllustration,
    SupersetExperienceIllustration,
} from '@/components/animations/superset-analytics-illustrations';
import { SupersetAnalyticsDemo } from '@/components/animations/superset-analytics-demo';
import Image from 'next/image';

// Images for horizontal scroll showcase
import whaleChartImg from './images/Whale Curve Chart.png';
import mekkoChartImg from './images/image12.png';
import financialReportImg from './images/image5.png';
import defectFixesImg from './images/waterfall chart.png';

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

/* Six real delivery examples — alternating layout */
const EXPERIENCES = [
    {
        id: 'text-to-sql',
        title: 'Text-to-SQL in Superset using LLM Integration',
        bullets: [
            'Traditional dashboards rely on fixed KPIs and can\'t adapt to every role\'s evolving questions.',
            'LLMs enable natural language queries — users explore data freely, without writing SQL.',
            'The model understands intent, generates accurate queries, and adapts to business context.',
            'Non-technical teams gain self-serve analytics without depending on the data engineering backlog.',
        ],
        note: '',
        flip: false,
    },
    {
        id: 'custom-alerts',
        title: 'Custom Event Visibility Feature on Superset',
        bullets: [
            'Superset\'s built-in alerts are limited to email/Slack — no in-platform visibility.',
            'We built a custom feature allowing users to view triggered alerts and event logs directly in the Superset UI.',
            'Status changes, threshold breaches, and audit events are surfaced in one central panel.',
            'Implemented for a client to improve transparency and enable broader team engagement in operational monitoring.',
        ],
        note: '',
        flip: true,
    },
];

const SHOWCASE_ITEMS = [
    {
        id: 'whale-chart',
        title: 'Whale Chart — Custom Visualization Plugin',
        subtitle: 'Finance Sector',
        description: 'Built for a finance-sector client to show how a small percentage of accounts drove disproportionate revenue. Helps stakeholders instantly identify key contributors and long-tail segments in a single view. Fully interactive and integrates seamlessly within Superset dashboards.',
        metrics: [
            { label: 'Net Profit', value: '100%', highlight: true },
            { label: 'Top 20% clients', value: '180%', highlight: false },
        ],
        image: whaleChartImg,
        contain: true,
    },
    {
        id: 'financial-report',
        title: 'Financial Reporting — Advanced Custom Chart Plugin',
        subtitle: 'Enterprise Reporting',
        description: 'We built a custom plugin replicating 95% of advanced reporting features — nested headers, conditional formatting, dynamic groupings. Supports CSS-driven indentation and multi-level metric groupings.',
        metrics: [
            { label: 'Feature parity', value: '95%', highlight: true },
            { label: 'Excel removal', value: '100%', highlight: false },
        ],
        image: financialReportImg,
        contain: true,
    },
    {
        id: 'mekko-chart',
        title: 'Mekko Chart — Multi-Dimensional Custom Visualization',
        subtitle: 'Market Analysis',
        description: 'Custom Mekko chart with variable-width bars for richer segmentation analysis. Ideal for market share, product mix, and multi-dimensional business insights within compact dashboard space.',
        metrics: [
            { label: 'Dimensions', value: 'Multi', highlight: true },
            { label: 'Executive level', value: 'Clarity', highlight: false },
        ],
        image: mekkoChartImg,
        contain: true,
    },
    {
        id: 'defect-fixes',
        title: 'Open-Source Contributions & Defect Fixes',
        subtitle: 'Apache Superset OSS',
        description: 'Resolved legend color mappings, enhanced Waterfall chart with horizontal orientation, and added subtotal bold formatting. Contributions merged upstream to the global Superset community.',
        metrics: [
            { label: 'Merged upstream', value: 'Yes', highlight: true },
            { label: 'Issue fixes', value: 'Critical', highlight: false },
        ],
        image: defectFixesImg,
    },
];

/* ─────────────────────── PAGE ─────────────────────── */

export default function SupersetAnalyticsPage() {
    const [activeItem, setActiveItem] = useState(0);
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
    const horizontalScrollRef = useRef<HTMLDivElement>(null);
    const horizontalSectionRef = useRef<HTMLDivElement>(null);

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
            if (totalScroll <= 0) return;

            // Progress is 0 when the top of the section hits the top of the viewport
            // Progress is 1 when the bottom of the section hits the bottom of the viewport
            const scrolled = -rect.top;
            const progress = Math.max(0, Math.min(1, scrolled / totalScroll));

            // Calculate the maximum scroll distance
            const scrollWidth = container.scrollWidth - container.clientWidth;
            container.scrollLeft = progress * scrollWidth;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    const scrollToItem = (idx: number) => {
        sectionRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <main className="min-h-screen bg-transparent text-white selection:bg-brand-primary/20">

            {/* ───── HERO ───── */}
            <section className="relative bg-transparent overflow-hidden">
                <div className="w-full px-8 md:px-24 lg:px-32 pt-24 md:pt-32 pb-12 md:pb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
                        {/* Left */}
                        <div className="space-y-5 md:space-y-8 pt-4 md:pt-8">
                            <span className="text-xs md:text-sm font-medium tracking-wide text-gray-500">
                                Superset Analytics & Customization
                            </span>

                            <h1 className="text-[2rem] md:text-[3.2rem] font-bold leading-[1.1] tracking-tight text-white">
                                Together, we{' '}
                                <span className="relative inline-block">
                                    <span className="text-brand-primary">tailor</span>
                                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-brand-primary rounded-full" />
                                </span>{' '}
                                Apache Superset to your business
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
                        <div className="bg-[#f7f5f2] rounded-2xl overflow-hidden border border-white/10 aspect-[4/3] lg:aspect-auto lg:h-[500px] relative shadow-2xl">
                            <SupersetAnalyticsDemo isActive={true} />
                        </div>
                    </div>
                </div>
            </section>

            {/* ───── PAST EXPERIENCES (alternating left-right) ───── */}
            <section className="bg-transparent">
                <div className="w-full px-8 md:px-24 lg:px-32 py-24 pb-12">
                    <h2 className="text-[2rem] md:text-[2.4rem] font-bold leading-tight max-w-2xl mb-16 text-white">
                        Built on <span className="text-brand-primary">real delivery</span> experience
                    </h2>

                    <div className="space-y-24 md:space-y-32">
                        {EXPERIENCES.map((exp) => (
                            <div
                                key={exp.id}
                                className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-start ${exp.flip ? 'lg:[&>*:first-child]:order-2' : ''}`}
                            >
                                {/* Animation side */}
                                <div className="overflow-hidden">
                                    <div className="origin-top-left scale-[0.72] md:scale-100 -mr-[38%] md:mr-0">
                                        <SupersetExperienceIllustration id={exp.id} />
                                    </div>
                                </div>

                                {/* Text side */}
                                <div className="space-y-6">
                                    <h3 className="text-xl md:text-2xl font-bold text-white leading-snug">
                                        {exp.title}
                                    </h3>
                                    <ul className="space-y-4 text-gray-400 text-[15px] leading-relaxed">
                                        {exp.bullets.map((b, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <span className="text-brand-primary mt-1">&#8226;</span>
                                                {b}
                                            </li>
                                        ))}
                                    </ul>
                                    {exp.note && (
                                        <p className="text-gray-500 text-[14px] leading-relaxed italic mt-2">
                                            {exp.note}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ───── HORIZONTAL SCROLL SHOWCASE ───── */}
            <section
                ref={horizontalSectionRef}
                className="relative bg-transparent z-10"
                style={{ height: `${SHOWCASE_ITEMS.length * 100}vh` }}
            >
                <div className="sticky top-0 h-screen overflow-hidden">
                    <div className="h-full flex items-center">
                        <div
                            ref={horizontalScrollRef}
                            className="flex gap-12 px-8 md:px-24 lg:px-32 overflow-hidden w-full"
                        >
                            {SHOWCASE_ITEMS.map((item, index) => (
                                <div key={index} className="flex-shrink-0 w-[85vw] md:w-[70vw] lg:w-[60vw]">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center h-full">
                                        {/* Animation side replaced with Image */}
                                        <div className={`relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 shadow-lg ${item.contain ? 'bg-white p-6' : ''}`}>
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className={item.contain ? 'object-contain' : 'object-cover'}
                                            />
                                        </div>

                                        {/* Text side */}
                                        <div className="space-y-5">
                                            <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-400 text-[15px] leading-[1.8]">
                                                {item.description}
                                            </p>

                                            {/* Metrics grid */}
                                            <div className="grid grid-cols-2 gap-3 mt-4">
                                                {item.metrics.map((m, i) => (
                                                    <div
                                                        key={i}
                                                        className={`rounded-xl p-4 ${m.highlight ? 'bg-brand-primary/10 border border-brand-primary/20' : 'bg-white/5 border border-white/10'}`}
                                                    >
                                                        {m.value && <p className={`text-lg font-bold ${m.highlight ? 'text-brand-primary' : 'text-white'}`}>{m.value}</p>}
                                                        <p className="text-xs text-gray-500 font-medium">{m.label}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
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

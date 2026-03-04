'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
    SupersetServiceIllustration,
} from '@/components/animations/superset-analytics-illustrations';
import { SupersetAnalyticsDemo } from '@/components/animations/superset-analytics-demo';
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
        title: 'Solving Profitability Gaps — Custom Whale Chart',
        subtitle: 'Advanced Profitability',
        description: 'Built to bridge the cumulative profit depth missing in standard BI. This custom visualization solves the "hidden loss" problem, allowing executives to see exactly which 20% of accounts drive growth while identifying resource-draining outliers.',
        image: whaleChartImg,
        contain: true,
    },
    {
        id: 'financial-report',
        title: 'Advanced P&L Reporting — Ending the Excel Trap',
        subtitle: 'Enterprise Reporting',
        description: 'Dashboards often fail at rigid financial structures. We developed advanced reporting with nested headers and conditional formatting to deliver pixel-perfect Profit & Loss statements natively, eliminating toxic manual Excel exports.',
        image: financialReportImg,
        contain: true,
    },
    {
        id: 'mekko-chart',
        title: 'Multi-Dimensional Market Depth — Custom Mekko Chart',
        subtitle: 'Market Analysis',
        description: 'Solving the "missing dimension" problem in standard charts. This custom Mekko implementation captures market scale, segment performance, and relative profitability simultaneously in a single, high-density executive view.',
        image: mekkoChartImg,
        contain: true,
    },
    {
        id: 'defect-fixes',
        title: 'Core Contributions — Fixing Upstream Limitations',
        subtitle: 'OSS Contributions',
        description: 'When platform defaults fall short, we contribute to the source. From horizontal waterfall charts to color themes, we optimize the base code to ensure a robust, feature-rich foundation for enterprise analytics.',
        image: defectFixesImg,
    },
    {
        id: 'filter-charts',
        title: 'Side-by-Side Filtering — Solving Comparison Friction',
        subtitle: 'Data Exploration',
        description: 'Comparing complex hierarchies is a major friction point. We solved this with a dual-column filter architecture that enables seamless side-by-side comparison, removing context-switching hurdles in deep data dives.',
        image: filterChartsImg,
        contain: true,
    },
    {
        id: 'handlebars-reporting',
        title: 'Executive Health Cards — Solving Operational Noise',
        subtitle: 'Operational Intelligence',
        description: 'Complex charts are often too noisy for rapid feedback. We solved the visibility gap with custom-designed operational health cards that translate raw data into color-coded status assessments for instant executive action.',
        image: handlebarsChartImg,
        contain: true,
    },
    {
        id: 'custom-alerts',
        title: 'Unified Operational Monitoring — Integrated Event Visibility',
        subtitle: 'Alerting & Automation',
        description: 'Fragmented operations lead to delayed responses. We unified these silos by embedding real-time event monitoring and audit logs directly into the UI, closing the gap between observation and action.',
        image: eventVisibilityImg,
        contain: true,
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
                <div className="w-full px-8 md:px-24 lg:px-32 pt-24 md:pt-32 pb-0">
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
                            <div className="absolute top-0 left-0 w-[154%] h-[154%] origin-top-left scale-[0.65] sm:w-[125%] sm:h-[125%] sm:scale-[0.8] lg:w-full lg:h-full lg:scale-100">
                                <SupersetAnalyticsDemo isActive={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ───── SHOWCASE HEADER ───── */}
            <div className="w-full px-8 md:px-24 lg:px-32 pt-32 md:pt-48 pb-0 -mb-20 md:-mb-32">
                <h2 className="text-[2rem] md:text-[2.4rem] font-bold leading-tight max-w-2xl text-white">
                    Built on <span className="text-brand-primary">real delivery</span> experience
                </h2>
            </div>

            {/* ───── HORIZONTAL SCROLL SHOWCASE ───── */}
            <section
                ref={horizontalSectionRef}
                className="relative bg-transparent z-10"
                style={{ height: `${SHOWCASE_ITEMS.length * 100}vh` }}
            >
                <div className="sticky top-0 h-screen overflow-hidden">
                    <div className="h-full flex items-start pt-32 md:pt-40">
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

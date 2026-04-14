'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
    SupersetServiceIllustration,
} from '@/components/animations/superset-analytics-illustrations';
import { CustomAnalyticsHeroAnimation } from '@/components/animations/custom-analytics-hero-animation';
import Image from 'next/image';

// Images for horizontal scroll showcase
// No local image imports - using public/images/custom-analytics/ paths

/* ─────────────────────── DATA ─────────────────────── */

const SERVICES = [
    {
        id: 'performance',
        title: 'Cross-Temporal Intelligence',
        description:
            'Execute complex Period-over-Period (PoP) and Year-to-Date (YTD) analysis with parallel-fetched precision. Our semantic engine automatically enforces "Higher is Better" logic, ensuring indicators reflect true business health.',
        video: '/videos/custom-analytics/comparison.mp4',
        aspect: 'aspect-[1920/870]',
    },
    {
        id: 'custom',
        title: 'Intelligent Pathfinding',
        description:
            'Break down data silos with a robust navigation framework. Pivot from executive summaries to hyper-local market metrics instantly, with persistent state management that remembers your journey.',
        video: '/videos/custom-analytics/drill-down.mp4',
        aspect: 'aspect-[1920/870]',
    },
    {
        id: 'theming',
        title: 'Adaptive Design Orchestration',
        description:
            'A production-ready design system that shifts with your brand. Toggle between "Electric High-Contrast" or "Midnight Professional" themes, with local-first persistence for a personalized daily workflow.',
        video: '/videos/custom-analytics/themes.mp4',
        aspect: 'aspect-[1920/870]',
    },
    {
        id: 'alerts',
        title: 'Curated Insight Repositories',
        description:
            'Preserve complex multi-dimensional filter states as named, persistent reports. Bookmark "Quarterly Regional Performance" or "Brand Health Audits" for instant global recall across the organization.',
        video: '/videos/custom-analytics/saved-report.mp4',
        aspect: 'aspect-[1920/982]',
    },
    {
        id: 'visualization',
        title: 'High-Impact Visual Narratives',
        description:
            'Transform complex metrics into compelling visual stories. Deploy dual-axis trend analysis, hierarchical heatmaps, and geospatial distributions without writing a single line of code.',
        video: '/videos/custom-analytics/all-charts-visualize.mp4',
        aspect: 'aspect-[1920/870]',
    },
    {
        id: 'sharing',
        title: 'Seamless Collaborative Linking',
        description:
            'Bridge the gap between discovery and action with deep-linked analytics. Share the exact state of your dashboard—filters, personas, and drill-downs included—via a single, persistent URL.',
        video: '/videos/custom-analytics/sharable-link.mp4',
        aspect: 'aspect-[1920/982]',
    },
    {
        id: 'timeframe',
        title: 'Dynamic Temporal Agility',
        description:
            'Switch effortlessly between rolling windows, fiscal calendars, and custom date ranges. All derived metrics and trend vectors re-calculate in real-time to match your selected time perspective.',
        video: '/videos/custom-analytics/timeframe.mp4',
        aspect: 'aspect-[1920/870]',
    },
];

/* Data for horizontal scroll showcase */

const SHOWCASE_ITEMS = [
    {
        id: 'page-builder',
        title: 'Zero-Code Deployment Studio',
        subtitle: 'Config-Driven Agility',
        description: 'Accelerate your go-to-market with a visual 4-step deployment wizard. Architect sophisticated dashboards, map data sources to platform queries, and fine-tune spatial layouts without writing a single line of code.',
        points: [
            'Guided 4-step wizard for instantaneous dashboard spinning',
            'Granular control over grid geometry, padding, and spacing',
            'Decoupled architecture: map data to UI via simple ID schemas',
        ],
        image: '/images/custom-analytics/whale.png',
        video: '/videos/custom-analytics/page-builder.mp4',
        aspect: 'aspect-[1920/870]',
    },
    {
        id: 'financial-report',
        title: 'Advanced Persona Orchestration',
        subtitle: 'Role-Based Intelligence',
        description: 'Deliver the right insights to the right people. Our persona engine dynamically reconfigures navigation hierarchies and metric visibility based on user roles, from C-suite summaries to ground-level operations.',
        points: [
            'Dynamic sidebar taxonomies tailored to executive or analyst roles',
            'Context-aware landing pages with personalized KPI priorities',
            'Hyper-targeted accessibility: users see only what they need to act',
            'Frictionless transition between distinct analytical environments',
        ],
        image: '/images/custom-analytics/persona.png',
        video: '/videos/custom-analytics/persona.mp4',
        aspect: 'aspect-[1920/870]',
    },
    {
        id: 'vizzy-ai',
        title: 'Vizzy: Generative Intelligence',
        subtitle: 'Natural Language Synthesis',
        description: 'Experience a new era of data discovery with Vizzy. Move beyond static reports by querying your data in plain English. Get immediate, high-fidelity visualizations and structured insights without needing technical proficiency.',
        points: [
            'Instantaneous text-to-visualization for ad-hoc exploration',
            'AI-augmented prompt suggestions for deeper trend discovery',
            'Memory-aware conversational history for iterative analysis',
            'Business-grade insights delivered in natural, action-oriented language',
        ],
        images: ['/images/custom-analytics/1.png', '/images/custom-analytics/2.png'],
        image: '/images/custom-analytics/vizzy-fallback.png',
        aspect: 'aspect-[1920/862]',
    },
    {
        id: 'global-filters',
        title: 'Unified Shield Filter Framework',
        subtitle: 'Global Governance',
        description: 'Maintain absolute continuity with a unified, hierarchical filter bar. Manage regions, segments, and temporal dimensions across the entire application, ensuring that your perspective remains intact as you explore.',
        points: [
            'Integrated US Regional & DMA mapping for spatial exploration',
            'Multi-dimensional hierarchy: Region, DMA, Segment, Brand',
            'Temporal synchronization across all analytical modules',
            'Persistent state preservation across cross-page journeys',
        ],
        video: '/videos/custom-analytics/global-filters.mp4',
        image: '/images/custom-analytics/filters.png',
        aspect: 'aspect-[1920/870]',
    },
];

/* ─────────────────────── COMPONENTS ─────────────────────── */

function ImageSlideshow({ images, contain }: { images: string[], contain?: boolean }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <div className="relative w-full h-full">
            {images.map((img, idx) => (
                <div
                    key={img}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <Image
                        src={img}
                        alt={`Slide ${idx}`}
                        fill
                        className={contain ? 'object-contain' : 'object-cover'}
                    />
                </div>
            ))}
        </div>
    );
}

/* ─────────────────────── PAGE ─────────────────────── */

export default function CustomAnalyticsPage() {
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
                <div className="w-full px-8 md:px-24 lg:px-32 pt-32 md:pt-48 pb-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
                        {/* Left */}
                        <div className="space-y-5 md:space-y-8 pt-4 md:pt-8">
                            <span className="text-xs md:text-sm font-medium tracking-wide text-gray-500">
                                Custom Analytics & Dashboards
                            </span>

                            <h1 className="text-[2rem] md:text-[3.2rem] font-bold leading-[1.1] tracking-tight text-white">
                                Beyond today&apos;s BI. <br className="hidden md:block" />
                                Find{' '}
                                <span className="relative inline-block">
                                    <span className="text-brand-primary">Critical</span>
                                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-brand-primary rounded-full" />
                                </span>{' '}
                                Numbers Faster.
                            </h1>

                            <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-[520px]">
                                Transform your professional data sources into intuitive,
                                high-velocity dashboard experiences. Woodfrog delivers the shortest path from
                                metrics to strategic impact for your entire organization.
                            </p>

                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 bg-white text-black text-xs md:text-sm font-medium rounded-full hover:bg-gray-200 transition-colors"
                            >
                                Let&apos;s work together
                            </Link>
                        </div>

                        {/* Right - Interactive Animation */}
                        <div className="rounded-2xl overflow-hidden border border-slate-200/60 aspect-[4/3] lg:aspect-auto lg:h-[500px] relative shadow-[0_4px_24px_rgba(0,0,0,0.06)]" style={{ background: '#ffffff' }}>
                            <CustomAnalyticsHeroAnimation isActive={true} />
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
                                className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-center"
                            >
                                {/* Image Column - 7/12 width for that "zoomed in" feel */}
                                <div
                                    className={`relative lg:col-span-7 w-full overflow-hidden rounded-xl border border-white/10 shadow-2xl ${(item as any).aspect || 'aspect-video'} ${(item as any).contain ? 'bg-white p-6' : 'bg-slate-950/40'
                                        } ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
                                >
                                    {(item as any).video ? (
                                        <video
                                            src={(item as any).video}
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (item as any).images ? (
                                        <ImageSlideshow images={(item as any).images} contain={(item as any).contain} />
                                    ) : (
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className={(item as any).contain ? 'object-contain' : 'object-cover'}
                                        />
                                    )}
                                </div>

                                {/* Text Column - 5/12 width */}
                                <div
                                    className={`lg:col-span-5 space-y-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
                                >
                                    <div className="space-y-2">
                                        <span className="text-xs md:text-sm font-semibold tracking-wide text-brand-primary uppercase">
                                            {item.subtitle}
                                        </span>
                                        <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                                            {item.title}
                                        </h3>
                                    </div>
                                    <p className="text-gray-400 text-[14px] leading-[1.8]">
                                        {item.description}
                                    </p>
                                    <ul className="space-y-3 pt-1">
                                        {item.points.map((point, pi) => (
                                            <li key={pi} className="flex items-start gap-3">
                                                <span className="flex-shrink-0 mt-[8px] w-1.5 h-1.5 rounded-full bg-brand-primary" />
                                                <span className="text-gray-300 text-[13px] leading-relaxed">{point}</span>
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
                        {/* Left - Sticky Nav */}
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

                        {/* Right - Scrolling Content */}
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

                                    <div className={`ml-0 md:ml-[22px] mt-4 overflow-hidden rounded-xl border border-white/5 bg-slate-950/40 ${(item as any).aspect || 'aspect-video'}`}>
                                        {(item as any).video ? (
                                            <video
                                                src={(item as any).video}
                                                autoPlay
                                                muted
                                                loop
                                                playsInline
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="origin-top-left scale-[0.72] md:scale-100 -mr-[38%] md:mr-0">
                                                <SupersetServiceIllustration id={item.id} />
                                            </div>
                                        )}
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

'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';

/* ─────────────────────── DATA ─────────────────────── */

const MISSION_POINTS = [
    'Developing innovative AI-powered solutions',
    'Delivering actionable insights for informed decision-making',
    'Fostering long-term partnerships with our clients',
    'Cultivating a culture of continuous learning and innovation',
];

const VALUES = [
    {
        title: 'Customer-centricity',
        description: 'Your success is our priority',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" stroke="var(--brand-primary)" strokeWidth="1.5" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="var(--brand-primary)" strokeWidth="1.5" fill="none" />
            </svg>
        ),
    },
    {
        title: 'Innovation',
        description: 'We continuously push boundaries',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L14.5 9H21L16 13.5L18 21L12 17L6 21L8 13.5L3 9H9.5L12 2Z" stroke="var(--brand-primary)" strokeWidth="1.5" fill="none" />
            </svg>
        ),
    },
    {
        title: 'Collaboration',
        description: 'Together, we achieve more',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="8" cy="8" r="3" stroke="var(--brand-primary)" strokeWidth="1.5" />
                <circle cx="16" cy="8" r="3" stroke="var(--brand-primary)" strokeWidth="1.5" />
                <path d="M2 18c0-3 2.5-5 6-5s6 2 6 5M10 18c0-3 2.5-5 6-5s6 2 6 5" stroke="var(--brand-primary)" strokeWidth="1.5" fill="none" />
            </svg>
        ),
    },
    {
        title: 'Integrity',
        description: 'Transparency and ethics guide our actions',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L4 6V12C4 17.5 7.8 22 12 22C16.2 22 20 17.5 20 12V6L12 2Z" stroke="var(--brand-primary)" strokeWidth="1.5" fill="none" />
                <path d="M9 12L11 14L15 10" stroke="var(--brand-primary)" strokeWidth="1.5" />
            </svg>
        ),
    },
];

const EXPERTISE = [
    {
        title: 'Advanced Analytics',
        description: 'Uncovering hidden patterns and insights',
        accent: 'from-brand-primary/20 to-transparent',
    },
    {
        title: 'Data Product',
        description: 'Crafting customizable, user-centric data solutions',
        accent: 'from-[#8B5CF6]/20 to-transparent',
    },
    {
        title: 'Data Engineering',
        description: 'Building scalable, efficient data infrastructure',
        accent: 'from-[#10B981]/20 to-transparent',
    },
    {
        title: 'Machine Learning',
        description: 'Developing predictive models for informed decision-making',
        accent: 'from-[#F59E0B]/20 to-transparent',
    },
];

const WHY_CARDS = [
    {
        title: 'Tailored AI Solutions',
        subtitle: 'Customized models addressing specific business challenges',
        points: [
            'Predictive maintenance: Minimizing downtime and optimizing resource allocation',
            'Demand forecasting: Informing inventory management and supply chain optimization',
            'Customer experience enhancements: Personalizing interactions and improving satisfaction',
            'Large language model (LLM) agents: Revolutionizing customer support and engagement',
        ],
        color: '#4DA3FF',
    },
    {
        title: 'Real-Time Insights',
        subtitle: 'Seamless integration with existing systems, enabling:',
        points: [
            'Agile decision-making: Responding promptly to changing market conditions',
            'Data-driven strategy: Informing business decisions with up-to-the-minute information',
        ],
        color: '#10B981',
    },
    {
        title: 'Intuitive Tools',
        subtitle: 'User-friendly dashboards and data visualization, facilitating:',
        points: [
            'Effective insights utilization: Empowering teams to make data-driven decisions',
            'Collaborative workflow: Enhancing cross-functional communication and alignment',
        ],
        color: 'var(--brand-primary)',
    },
];

const APPROACH_LEFT = [
    'Extract deep insights: Uncover hidden trends and opportunities',
    'Optimize processes: Streamline operations and enhance efficiency',
    'Anticipate future challenges: Proactively address potential obstacles',
];

const APPROACH_RIGHT = [
    'Data preparation: Ensuring data quality and integrity',
    'Strategy development: Aligning data goals with business objectives',
    'Deployment: Seamless integration with existing systems',
    'Ongoing support: Continuous guidance and optimization',
];

/* ─────────────────────── ANIMATED SECTION ─────────────────────── */

function AnimatedSection({
    children,
    className = '',
    delay = 0,
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}) {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/* ─────────────────────── ANIMATED COUNTER ─────────────────────── */

function AnimatedStat({ value, label }: { value: string; label: string }) {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-40px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
        >
            <p className="text-3xl md:text-5xl font-bold text-brand-primary mb-2">{value}</p>
            <p className="text-gray-400 text-sm md:text-base">{label}</p>
        </motion.div>
    );
}

/* ─────────────────────── PAGE ─────────────────────── */

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-transparent text-white selection:bg-brand-primary/20" style={{ overflowX: 'clip' }}>

            {/* ───── HERO ───── */}
            <section className="relative bg-transparent overflow-hidden">
                {/* Background glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="w-full px-8 md:px-24 lg:px-32 pt-32 md:pt-44 pb-20 md:pb-28 relative">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <AnimatedSection>
                            <span className="text-xs md:text-sm font-medium tracking-widest text-brand-primary uppercase">
                                About Us
                            </span>
                        </AnimatedSection>

                        <AnimatedSection delay={0.1}>
                            <h1 className="text-[2.2rem] md:text-[3.6rem] font-bold leading-[1.08] tracking-tight text-white">
                                Empowering decisions{' '}
                                <span className="relative inline-block">
                                    <span className="text-brand-primary">through data</span>
                                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-brand-primary rounded-full" />
                                </span>
                            </h1>
                        </AnimatedSection>

                        <AnimatedSection delay={0.2}>
                            <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-[680px] mx-auto">
                                Woodfrog, established in 2023 in Pune, India, is an innovative AI and Analytics firm.
                                With a bold vision and agile approach, we&apos;re disrupting traditional data solutions.
                                Our team&apos;s creativity, expertise, and enthusiasm enable us to craft cutting-edge
                                solutions for data-driven decision making, serving esteemed clients across industries
                                and cementing our position as a rising star in data analytics.
                            </p>
                        </AnimatedSection>

                        <AnimatedSection delay={0.3}>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-7 py-3 bg-white text-black text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors"
                            >
                                Let&apos;s work together
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M3 8h10M10 5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                            </Link>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* ───── STATS BAR ───── */}
            <section className="bg-transparent border-y border-white/5">
                <div className="w-full px-8 md:px-24 lg:px-32 py-16 md:py-20">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-5xl mx-auto">
                        <AnimatedStat value="2023" label="Founded in Pune, India" />
                        <AnimatedStat value="50+" label="Projects Delivered" />
                        <AnimatedStat value="20+" label="Happy Clients" />
                        <AnimatedStat value="100%" label="Client Satisfaction" />
                    </div>
                </div>
            </section>

            {/* ───── OUR STORY ───── */}
            <section className="bg-transparent">
                <div className="w-full px-8 md:px-24 lg:px-32 py-24 md:py-32">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center max-w-6xl mx-auto">
                        <AnimatedSection>
                            <div className="space-y-6">
                                <span className="text-xs font-semibold tracking-widest text-brand-primary uppercase">Our Story</span>
                                <h2 className="text-[1.8rem] md:text-[2.4rem] font-bold leading-tight text-white">
                                    From a bold idea to a{' '}
                                    <span className="text-brand-primary">rising star</span>
                                </h2>
                                <p className="text-gray-400 text-[15px] leading-[1.8]">
                                    We began with a simple yet ambitious goal: to empower businesses to make informed
                                    decisions through data-driven insights. Our founder &amp; core team, passionate about
                                    AI and analytics, assembled a team of talented individuals who share a common vision.
                                </p>
                                <p className="text-gray-400 text-[15px] leading-[1.8]">
                                    Today, Woodfrog stands as an innovative force in the AI and analytics space,
                                    delivering solutions that transform how businesses think about and use their data.
                                </p>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={0.15}>
                            <div className="relative">
                                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 space-y-6">
                                    {/* Timeline */}
                                    <div className="space-y-6">
                                        {[
                                            { year: '2023', event: 'Woodfrog founded in Pune, India', active: true },
                                            { year: '2023', event: 'First enterprise client onboarded', active: true },
                                            { year: '2024', event: 'Expanded into AI agent development', active: true },
                                            { year: '2025', event: 'Serving clients across industries', active: true },
                                            { year: 'Now', event: 'Disrupting traditional data solutions', active: false },
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-start gap-4">
                                                <div className="flex flex-col items-center">
                                                    <div className={`w-3 h-3 rounded-full border-2 ${item.active ? 'border-brand-primary bg-brand-primary/30' : 'border-gray-600 bg-transparent'} flex-shrink-0`} />
                                                    {i < 4 && <div className="w-[1px] h-8 bg-white/10 mt-1" />}
                                                </div>
                                                <div className="flex-1 -mt-1">
                                                    <span className={`text-xs font-bold ${item.active ? 'text-brand-primary' : 'text-gray-500'}`}>
                                                        {item.year}
                                                    </span>
                                                    <p className="text-sm text-gray-300 mt-0.5">{item.event}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* Glow effect */}
                                <div className="absolute -inset-1 bg-brand-primary/5 rounded-3xl blur-xl -z-10" />
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* ───── MISSION ───── */}
            <section className="bg-transparent">
                <div className="w-full px-8 md:px-24 lg:px-32 py-24 md:py-32">
                    <div className="max-w-6xl mx-auto">
                        <AnimatedSection>
                            <div className="text-center mb-16">
                                <span className="text-xs font-semibold tracking-widest text-brand-primary uppercase">Our Mission</span>
                                <h2 className="text-[1.8rem] md:text-[2.4rem] font-bold leading-tight text-white mt-4">
                                    To <span className="text-brand-primary">revolutionize</span> data analytics
                                </h2>
                            </div>
                        </AnimatedSection>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {MISSION_POINTS.map((point, i) => (
                                <AnimatedSection key={i} delay={i * 0.1}>
                                    <div className="group bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-brand-primary/30 transition-all duration-300 hover:bg-white/[0.05]">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-primary/20 transition-colors">
                                                <span className="text-brand-primary font-bold text-sm">
                                                    {String(i + 1).padStart(2, '0')}
                                                </span>
                                            </div>
                                            <p className="text-gray-300 text-[15px] leading-relaxed pt-2">{point}</p>
                                        </div>
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ───── VALUES ───── */}
            <section className="bg-transparent border-y border-white/5">
                <div className="w-full px-8 md:px-24 lg:px-32 py-24 md:py-32">
                    <div className="max-w-6xl mx-auto">
                        <AnimatedSection>
                            <div className="text-center mb-16">
                                <span className="text-xs font-semibold tracking-widest text-brand-primary uppercase">Our Values</span>
                                <h2 className="text-[1.8rem] md:text-[2.4rem] font-bold leading-tight text-white mt-4">
                                    What <span className="text-brand-primary">drives</span> everything we do
                                </h2>
                            </div>
                        </AnimatedSection>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {VALUES.map((value, i) => (
                                <AnimatedSection key={value.title} delay={i * 0.1}>
                                    <div className="group bg-white/[0.03] border border-white/10 rounded-2xl p-6 text-center hover:border-brand-primary/30 transition-all duration-300 hover:bg-white/[0.05] h-full">
                                        <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-brand-primary/20 group-hover:scale-110 transition-all duration-300">
                                            {value.icon}
                                        </div>
                                        <h3 className="text-white font-bold text-base mb-2">{value.title}</h3>
                                        <p className="text-gray-500 text-sm">{value.description}</p>
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ───── EXPERTISE ───── */}
            <section className="bg-transparent">
                <div className="w-full px-8 md:px-24 lg:px-32 py-24 md:py-32">
                    <div className="max-w-6xl mx-auto">
                        <AnimatedSection>
                            <div className="mb-16">
                                <span className="text-xs font-semibold tracking-widest text-brand-primary uppercase">Our Expertise</span>
                                <h2 className="text-[1.8rem] md:text-[2.4rem] font-bold leading-tight text-white mt-4">
                                    Decades of collective{' '}
                                    <span className="text-brand-primary">experience</span>
                                </h2>
                                <p className="text-gray-400 text-[15px] leading-relaxed mt-4 max-w-[600px]">
                                    Our team of seasoned data scientists, engineers, and AI specialists leverages
                                    deep expertise across critical domains.
                                </p>
                            </div>
                        </AnimatedSection>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {EXPERTISE.map((item, i) => (
                                <AnimatedSection key={item.title} delay={i * 0.1}>
                                    <div className="group relative overflow-hidden bg-white/[0.03] border border-white/10 rounded-2xl p-8 hover:border-brand-primary/30 transition-all duration-300">
                                        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${item.accent}`} />
                                        <div className="flex items-start gap-4">
                                            <span className="text-brand-primary/60 font-bold text-3xl leading-none">
                                                {String(i + 1).padStart(2, '0')}
                                            </span>
                                            <div>
                                                <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                                                <p className="text-gray-400 text-[15px] leading-relaxed">{item.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ───── APPROACH ───── */}
            <section className="bg-transparent border-y border-white/5">
                <div className="w-full px-8 md:px-24 lg:px-32 py-24 md:py-32">
                    <div className="max-w-6xl mx-auto">
                        <AnimatedSection>
                            <div className="text-center mb-16">
                                <span className="text-xs font-semibold tracking-widest text-brand-primary uppercase">Our Approach</span>
                                <h2 className="text-[1.8rem] md:text-[2.4rem] font-bold leading-tight text-white mt-4">
                                    Data should be{' '}
                                    <span className="text-brand-primary">accessible</span>,{' '}
                                    <span className="text-brand-primary">actionable</span>,{' '}
                                    and <span className="text-brand-primary">empowering</span>
                                </h2>
                                <p className="text-gray-400 text-base mt-4 max-w-[640px] mx-auto">
                                    Our customizable analytics solutions and user-centric tools enable businesses
                                    to unlock their full potential.
                                </p>
                            </div>
                        </AnimatedSection>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
                            <AnimatedSection>
                                <div className="space-y-4">
                                    <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-3">
                                        <span className="w-8 h-8 rounded-lg bg-brand-primary/20 flex items-center justify-center flex-shrink-0">
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                <path d="M2 7h10M7 2v10" stroke="var(--brand-primary)" strokeWidth="1.5" />
                                            </svg>
                                        </span>
                                        What we enable
                                    </h3>
                                    {APPROACH_LEFT.map((item, i) => (
                                        <div key={i} className="flex items-start gap-3 pl-3 border-l-2 border-brand-primary/20">
                                            <p className="text-gray-400 text-[15px] leading-relaxed">{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </AnimatedSection>

                            <AnimatedSection delay={0.15}>
                                <div className="space-y-4">
                                    <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-3">
                                        <span className="w-8 h-8 rounded-lg bg-brand-primary/20 flex items-center justify-center flex-shrink-0">
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                <path d="M3 7l3 3 5-5" stroke="var(--brand-primary)" strokeWidth="1.5" />
                                            </svg>
                                        </span>
                                        Our end-to-end process
                                    </h3>
                                    {APPROACH_RIGHT.map((item, i) => (
                                        <div key={i} className="flex items-start gap-3 pl-3 border-l-2 border-brand-primary/20">
                                            <p className="text-gray-400 text-[15px] leading-relaxed">{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </AnimatedSection>
                        </div>
                    </div>
                </div>
            </section>

            {/* ───── WHY WOODFROG ───── */}
            <section className="bg-transparent">
                <div className="w-full px-8 md:px-24 lg:px-32 py-24 md:py-32">
                    <div className="max-w-6xl mx-auto">
                        <AnimatedSection>
                            <div className="text-center mb-16">
                                <span className="text-xs font-semibold tracking-widest text-brand-primary uppercase">Why Woodfrog</span>
                                <h2 className="text-[1.8rem] md:text-[2.4rem] font-bold leading-tight text-white mt-4">
                                    Choose Woodfrog for <span className="text-brand-primary">impactful</span><br className="hidden md:block" />
                                    data-driven solutions
                                </h2>
                            </div>
                        </AnimatedSection>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {WHY_CARDS.map((card, i) => (
                                <AnimatedSection key={card.title} delay={i * 0.1}>
                                    <div className="group bg-white/[0.03] border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 h-full flex flex-col">
                                        {/* Accent bar */}
                                        <div
                                            className="w-12 h-1 rounded-full mb-6"
                                            style={{ backgroundColor: card.color }}
                                        />
                                        <h3 className="text-white font-bold text-xl mb-2">{card.title}</h3>
                                        <p className="text-gray-500 text-sm mb-6">{card.subtitle}</p>
                                        <div className="space-y-3 flex-1">
                                            {card.points.map((point, j) => (
                                                <div key={j} className="flex items-start gap-3">
                                                    <span
                                                        className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2"
                                                        style={{ backgroundColor: card.color }}
                                                    />
                                                    <p className="text-gray-400 text-[13px] leading-relaxed">{point}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ───── CTA SECTION ───── */}
            <section className="bg-transparent">
                <div className="w-full px-8 md:px-24 lg:px-32 py-28 md:py-36">
                    <AnimatedSection>
                        <div className="max-w-3xl mx-auto text-center space-y-8">
                            <span className="text-xs font-semibold tracking-widest text-brand-primary uppercase">
                                Join the Woodfrog Journey
                            </span>
                            <h2 className="text-[1.8rem] md:text-[2.8rem] font-bold leading-tight text-white">
                                Discover how our cutting-edge AI and analytics solutions can{' '}
                                <span className="text-brand-primary">transform</span> your business.
                            </h2>
                            <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                                Let&apos;s collaborate to unlock data-driven growth, efficiency, and success.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors"
                                >
                                    Get in touch
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M3 8h10M10 5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" />
                                    </svg>
                                </Link>
                                <Link
                                    href="/data-visualization"
                                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/[0.05] border border-white/10 text-white text-sm font-semibold rounded-full hover:bg-white/[0.1] transition-colors"
                                >
                                    Explore our services
                                </Link>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

        </main>
    );
}

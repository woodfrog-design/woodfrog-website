'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import { useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

import { DataEngineeringDemo } from "@/components/animations/data-engineering-demo";
import { SearchDemo } from "@/components/animations/search-demo";
import { AnalyticsDashboardDemo } from "@/components/animations/analytics-dashboard-demo";
import { AutomatedDemo } from "@/components/animations/automated-demo";
import { AIGovernanceDemo } from "@/components/animations/ai-governance-demo";
import { ApplicationsAutomationsDemo } from "@/components/animations/applications-automations-demo";
import { SupersetAnalyticsDemo } from "@/components/animations/superset-analytics-demo";

const ScrollStack = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const cards = [
        {
            id: 1,
            label: "Unlock the full power of Apache Superset",
            title: "Superset Analytics",
            description1: "Tailoring Apache Superset to fit your business needs - from custom chart plugins and embedded dashboards to performance tuning and LLM-powered text-to-SQL.",
            description2: "High-performance, deeply integrated Superset implementations for enterprise BI and startup analytics, backed by real hands-on experience.",
            bg: "var(--brand-card-bg)",
            link: "/superset-analytics"
        },
        {
            id: 2,
            label: "Enterprise Data Visualization Experts | Design-driven",
            title: "Data Visualization",
            description1: "Creating intuitive and interactive dashboards that transform complex data into clear, actionable business stories.",
            description2: "Our design-driven approach ensures that every visualization is not just beautiful, but strategically aligned with your decision-making needs.",
            bg: "var(--brand-card-bg)",
            link: "/data-visualization"
        },
        {
            id: 3,
            label: "Cloud & Modern Data Platform Experts",
            title: "Data Engineering",
            description1: "Building robust and scalable data foundations using modern cloud and data platforms to power your organization's analytics",
            description2: "We engineer high-performance data pipelines that ensure security, accessibility, and reliability for all your information assets.",
            bg: "var(--brand-card-bg)",
            link: "/data-engineering"
        },
        {
            id: 4,
            label: "Governance, Ethics & Compliance Experts",
            title: "AI Governance",
            description1: "Navigating the complexities of AI ethics and compliance with expert guidance and proven safety frameworks.",
            description2: "We ensure your AI implementations are responsible, transparent, and aligned with global regulatory standards and corporate governance.",
            bg: "var(--brand-card-bg)",
            link: "/ai-governance"
        },
        {
            id: 5,
            label: "Enterprise Automation Experts",
            title: "Applications and Automations",
            description1: "We automate your key processes to increase efficiency, reduce errors, and speed up your operations.",
            description2: "Through modern automation platforms and the integration of artificial intelligence, we design smart and scalable solutions focused on your business needs.",
            bg: "var(--brand-card-bg)",
            link: "/applications-and-automations"
        },
        {
            id: 6,
            label: "Intelligent Data Agents for Automated Insights",
            title: "Data Agents",
            description1: "Developing intelligent autonomous agents that navigate your data landscape to provide real-time, automated insights.",
            description2: "Our data agents bridge the gap between raw information and meaningful action, delivering foresight directly into your operational workflows.",
            bg: "var(--brand-card-bg)",
            link: "/data-agents"
        },
        {
            id: 7,
            label: "Specialized Assistance for Your Analytics Solutions",
            title: "Helpdesk",
            description1: "Dedicated support and specialized assistance to ensure your data and analytics solutions run smoothly 24/7.",
            description2: "Our expert helpdesk provides the technical reliability and ongoing optimization your enterprise needs to stay ahead in a data-driven world.",
            bg: "var(--brand-card-bg)",
            link: "/helpdesk"
        },
    ];

    useGSAP(() => {
        const cardElements = gsap.utils.toArray<HTMLElement>('.scroll-card');

        // Initial setup
        gsap.set(cardElements.slice(1), { yPercent: 100, opacity: 0 });
        gsap.set(cardElements[0], { x: 0, y: 0, opacity: 1 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: triggerRef.current,
                start: 'top top',
                // Reduced total scroll distance for faster progression
                end: `+=${cards.length * 100}%`,
                pin: true,
                scrub: 0.5, // Faster catch-up
                onUpdate: (self) => {
                    // Total duration of the timeline is cards.length - 1
                    // Each unit of time corresponds to one card transition
                    const progress = self.progress;
                    const totalDuration = cards.length - 1;
                    const currentTime = progress * totalDuration;

                    // Use a small shift to make the next card active slightly before it's fully landed
                    const newIndex = Math.round(currentTime);
                    if (newIndex !== activeIndex) {
                        setActiveIndex(newIndex);
                    }
                }
            },
        });

        // Strategy: Minimal hold to ensure animation starts almost immediately
        cardElements.forEach((card, i) => {
            if (i < cardElements.length - 1) {
                const nextCard = cardElements[i + 1];

                // Each card gets 1 unit of time: 10% hold, 90% transition
                const startTime = i;
                const holdDuration = 0.1;
                const transitionStartTime = startTime + holdDuration;
                const transitionDuration = 0.9;

                // Minimal threshold hold
                tl.to({}, { duration: holdDuration }, startTime);

                // SYNCED TRANSITION
                tl.to(card, {
                    x: '40vw',
                    y: '-40vh',
                    opacity: 0,
                    duration: transitionDuration,
                    ease: 'none',
                }, transitionStartTime);

                tl.to(nextCard, {
                    yPercent: 0,
                    opacity: 1,
                    duration: transitionDuration,
                    ease: 'none',
                }, transitionStartTime);
            }
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="w-full bg-transparent">
            <div
                ref={triggerRef}
                className="relative h-screen w-full flex items-center justify-center overflow-hidden"
            >
                {cards.map((card, i) => (
                    <div
                        key={card.id}
                        className="scroll-card absolute w-[92vw] md:w-[90vw] h-[85vh] md:h-[90vh] rounded-[2rem] border border-white/10 shadow-3xl overflow-hidden flex flex-col md:flex-row"
                        style={{
                            zIndex: cards.length - i,
                            backgroundColor: card.bg
                        }}
                    >
                        {/* Background subtle glow */}
                        <div className="absolute top-0 right-0 w-[50%] h-[100%] bg-gradient-to-l from-white/[0.02] to-transparent pointer-events-none" />

                        {/* LEFT COLUMN: TEXT */}
                        <div className="flex-1 p-6 md:p-16 flex flex-col justify-center relative z-10">
                            <div className="inline-flex items-center gap-3 mb-4 md:mb-8">
                                <div className="w-2 h-2 bg-brand-primary" />
                                <span className="text-brand-primary text-xs md:text-base font-medium tracking-tight">
                                    {card.label}
                                </span>
                            </div>

                            <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#f4e8df] leading-[1.1] tracking-tight mb-4 md:mb-8 max-w-xl">
                                {card.title}
                            </h3>

                            <div className="space-y-4 md:space-y-6 max-w-lg">
                                <p className="body-prose">
                                    {card.description1}
                                </p>
                                <p className="hidden md:block body-prose">
                                    {card.description2}
                                </p>
                            </div>

                            <div className="mt-8 md:mt-12 group">
                                <Link href={card.link} className="inline-flex items-center gap-3 cursor-pointer">
                                    <span className="text-[#f4e8df] text-lg font-bold border-b border-transparent group-hover:border-brand-primary/50 transition-all">
                                        Learn more
                                    </span>
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="var(--brand-primary)"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="group-hover:translate-x-1 transition-transform"
                                    >
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: MEDIA PLACEHOLDER */}
                        <div className={`flex-[1.2] md:flex-1 flex items-center justify-center relative overflow-hidden ${card.title === "Data Engineering" || card.title === "Helpdesk" || card.title === "Data Visualization" || card.title === "Data Agents" || card.title === "AI Governance" || card.title === "Superset Analytics" ? "bg-white" : "bg-zinc-900/30"}`}>
                            <div className="absolute inset-0 w-[200%] h-[200%] md:w-[133.33%] md:h-[133.33%] lg:w-full lg:h-full scale-[0.5] md:scale-[0.75] lg:scale-100 origin-top-left transform-gpu">
                                {card.title === "Data Engineering" ? (
                                    <DataEngineeringDemo isActive={i === activeIndex} />
                                ) : card.title === "Helpdesk" ? (
                                    <SearchDemo isActive={i === activeIndex} />
                                ) : card.title === "Data Visualization" ? (
                                    <AnalyticsDashboardDemo isActive={i === activeIndex} />
                                ) : card.title === "Data Agents" ? (
                                    <AutomatedDemo isActive={i === activeIndex} />
                                ) : card.title === "AI Governance" ? (
                                    <AIGovernanceDemo isActive={i === activeIndex} />
                                ) : card.title === "Applications and Automations" ? (
                                    <ApplicationsAutomationsDemo isActive={i === activeIndex} />
                                ) : card.title === "Superset Analytics" ? (
                                    <SupersetAnalyticsDemo isActive={i === activeIndex} />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center p-12">
                                        {/* Inner Glass Container for Media */}
                                        <div className="w-full h-full rounded-2xl bg-zinc-800/20 border border-white/5 backdrop-blur-sm flex items-center justify-center group relative">
                                            <div className="text-white/10 text-xl font-mono uppercase tracking-[0.2em] group-hover:text-white/20 transition-colors">
                                                Media Asset Space
                                            </div>

                                            {/* Corner decorative elements */}
                                            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/20" />
                                            <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/20" />
                                            <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/20" />
                                            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/20" />
                                        </div>

                                        {/* Animated background element */}
                                        <div className="absolute -bottom-1/4 -right-1/4 w-[80%] h-[80%] bg-brand-primary/5 blur-[100px] rounded-full pointer-events-none" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export { ScrollStack };

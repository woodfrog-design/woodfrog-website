'use client';

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from 'next/link';


gsap.registerPlugin(ScrollTrigger);
import { CurvedLines } from "@/components/ui/curved-lines";
import { RevenueChartDemo } from "@/components/animations/revenue-chart-demo";
import { FinanceSalesTrendsDemo } from "@/components/animations/finance-sales-trends-demo";
import { ProfitabilityDemo } from "@/components/animations/profitability-demo";

import { ServicesSection } from "@/components/sections/services-section";
import { CompanyLogos } from "@/components/sections/company-logos";
import { BlogsSection } from "../sections/blogs-section";
import { ProductsSection } from "../sections/products-section";
import { FAQSection } from "../sections/faq-section";
import { DataIntelligenceSection } from "@/components/sections/data-intelligence-section";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { FooterSection } from "@/components/sections/footer-section";
import { ScrollStack } from "@/components/ui/scroll-stack";
import HeroSpeakSection from "@/components/sections/hero-speak-section";
// Enterprise Dashboard Components
import { DashboardProvider, REGIONS, CATEGORIES, DASHBOARD_COLORS, useDashboard, useFilteredData } from "@/components/enterprise-dashboard/dashboard-context";
import { KPICard } from "@/components/enterprise-dashboard/kpi-card";
import { SlicerPanel } from "@/components/enterprise-dashboard/slicer-panel";
import { RevenueWaterfall } from "@/components/enterprise-dashboard/revenue-waterfall";
import { BulletChart } from "@/components/enterprise-dashboard/bullet-chart";
import { TimeSeriesArea } from "@/components/enterprise-dashboard/time-series-area";
import { FunnelChart } from "@/components/enterprise-dashboard/funnel-chart";
import { RegionHeatmap } from "@/components/enterprise-dashboard/region-heatmap";
import { ScatterQuadrant } from "@/components/enterprise-dashboard/scatter-quadrant";

// Enterprise Dashboard Component
const EnterpriseDashboard = () => {
    const { state, setFilters, setActiveView, clearAllFilters } = useDashboard();
    const { timeSeriesData, bulletData, funnelSteps, heatmapData, scatterData, totals } = useFilteredData();

    const [hasMounted, setHasMounted] = React.useState(false);
    React.useEffect(() => {
        setHasMounted(true);
    }, []);

    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        const items = containerRef.current.querySelectorAll(".dashboard-item");

        gsap.fromTo(items,
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.12,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 90%",
                    once: true,
                }
            }
        );
    }, { scope: containerRef });

    if (!hasMounted) return <div className="min-h-screen" style={{ backgroundColor: DASHBOARD_COLORS.background }} />;

    const kpiData = [
        {
            title: "Total Revenue",
            value: (totals.revenue || 918.9).toFixed(1),
            unit: "₹ Cr",
            change: 8.5,
            changeLabel: "vs FY23",
            target: (950 * ((totals.revenue || 918.9) / 918.9)).toFixed(0) + " Cr",
            targetLabel: "Annual Target",
            sparklineData: timeSeriesData.map(d => d.revenue)
        },
        {
            title: "Gross Margin",
            value: (totals.margin || 30.2).toFixed(1),
            unit: "%",
            change: 2.1,
            changeLabel: "vs Prior Qtr",
            target: "45%",
            targetLabel: "Target"
        },
        {
            title: "Operating Expenses",
            value: ((totals.revenue || 918.9) * 0.34).toFixed(1),
            unit: "₹ Cr",
            change: -4.2,
            changeLabel: "vs Budget",
            target: ((totals.revenue || 918.9) * 0.35).toFixed(0) + " Cr",
            targetLabel: "Budget"
        },
        {
            title: "Customer Acquisition",
            value: (bulletData[2]?.actual || 1247).toLocaleString(),
            unit: "",
            change: 15.3,
            changeLabel: "New Customers",
            sparklineData: timeSeriesData.map(d => d.revenue * 1.5)
        },
        {
            title: "NPS Score",
            value: (bulletData[3]?.actual || 67).toFixed(0),
            unit: "",
            change: 5,
            changeLabel: "vs Last Survey",
            target: "70",
            targetLabel: "Benchmark"
        },
    ];

    return (
        <div
            ref={containerRef}
            className="w-full h-full overflow-hidden"
            style={{
                backgroundColor: DASHBOARD_COLORS.background,
                border: `3px solid ${DASHBOARD_COLORS.brandOrange}`,
                borderRadius: "16px"
            }}
        >
            {/* Dashboard Header */}
            <div
                className="dashboard-item border-b px-6 py-4"
                style={{ backgroundColor: DASHBOARD_COLORS.card, borderColor: DASHBOARD_COLORS.border }}
            >
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold" style={{ color: DASHBOARD_COLORS.textPrimary }}>Regional Sales & Operations Intelligence</h1>
                        <p className="text-sm" style={{ color: DASHBOARD_COLORS.textSecondary }}>FY 2024 Performance Dashboard • Last updated: Feb 7, 2026</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            className="px-3 py-1.5 text-xs font-medium border rounded-md transition-colors"
                            style={{
                                color: DASHBOARD_COLORS.textSecondary,
                                borderColor: DASHBOARD_COLORS.border,
                                backgroundColor: "transparent"
                            }}
                        >
                            Export PDF
                        </button>
                        <button
                            onClick={clearAllFilters}
                            className="px-3 py-1.5 text-xs font-medium text-white rounded-md hover:opacity-80 transition-opacity"
                            style={{ backgroundColor: DASHBOARD_COLORS.primary }}
                        >
                            Reset Dashboard
                        </button>
                    </div>
                </div>
            </div>

            {/* Slicer Panel */}
            <div className="dashboard-item">
                <SlicerPanel
                    activeView={state.activeView}
                    onViewChange={setActiveView}
                    selectedRegions={state.filters.regions}
                    onRegionsChange={(regions) => setFilters({ regions })}
                    selectedCategories={state.filters.categories}
                    onCategoriesChange={(categories) => setFilters({ categories })}
                    dateRange={state.filters.dateRange}
                    onDateRangeChange={(dateRange) => setFilters({ dateRange })}
                    selectedPeriod={state.filters.period}
                    onPeriodChange={(period) => setFilters({ period })}
                />
            </div>

            {/* Main Dashboard Grid */}
            <div className="p-4 space-y-3">
                {/* KPI Row */}
                <div className="dashboard-item grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {kpiData.map((kpi, index) => (
                        <KPICard key={index} {...kpi} />
                    ))}
                </div>

                {/* Middle Row: Time Series + Funnel + Bullet Charts */}
                <div className="dashboard-item grid grid-cols-1 lg:grid-cols-12 gap-4">
                    <div className="lg:col-span-5">
                        <TimeSeriesArea data={timeSeriesData} />
                    </div>
                    <div className="lg:col-span-4">
                        <FunnelChart data={funnelSteps} />
                    </div>
                    <div className="lg:col-span-3">
                        <BulletChart data={bulletData} />
                    </div>
                </div>

                {/* Bottom Row: Heatmap + Scatter */}
                <div className="dashboard-item grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <RegionHeatmap data={heatmapData} />
                    <ScatterQuadrant data={scatterData} />
                </div>
            </div>

            {/* Disclaimer Footer */}
            <div className="dashboard-item mt-4 mr-8 flex justify-end pb-8">
                <p className="text-lg font-bold text-brand-primary italic">
                    * This data is only for representation purpose
                </p>
            </div>
        </div>
    );
};


const DemoOne = () => {
    return (
        <div className="flex flex-col w-full min-h-screen bg-transparent overflow-x-hidden relative">
            {/* Global V-Lines Layer - Commented out as requested */}
            {/* <div className="absolute top-[55vh] left-0 w-full h-[100vh] pointer-events-none z-30">
                <CurvedLines className="w-full h-full" />
            </div> */}

            {/* Hero Section - Animation Locked to Viewport */}
            <div className="h-auto lg:h-screen w-full relative flex-shrink-0 overflow-hidden pt-10 lg:pt-20 pb-0 lg:py-0">
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between w-full h-full mx-auto px-6 md:px-12 lg:px-32 select-none relative z-10 gap-0 lg:gap-12">
                    {/* Left Side: Text - Final Award-Winning Arrangement */}
                    <div className="flex-[1.6] flex flex-col items-center lg:items-start text-center lg:text-left gap-2 mb-0 lg:mb-0 -mt-[120px] lg:mt-0 relative z-20">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-xl md:text-3xl lg:text-[2.2rem] font-bold tracking-tight text-white mb-2 md:mb-4"
                        >
                            From Data to Analytics to AI
                        </motion.h2>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="flex flex-col text-5xl md:text-[6rem] lg:text-[8.5rem] font-black tracking-tighter leading-[0.95] text-white"
                        >
                            <span> End to End</span>

                            <span className="text-white italic tracking-tighter pb-2">
                                Services.
                            </span>
                        </motion.h1>

                        {/* Mobile-only subheading */}
                        <motion.p
                            className="lg:hidden text-[16px] text-slate-300 font-medium max-w-sm mb-6 px-4"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            We partner with you to streamline your data, strengthen analytics, and build AI capabilities that drive measurable growth.
                        </motion.p>

                        {/* Mobile-only Buttons */}
                        <motion.div
                            className="lg:hidden flex flex-row items-center gap-3 w-full justify-center px-4"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            <Link href="/about" className="flex-1 bg-white text-slate-900 font-bold py-3 rounded-full text-sm shadow-xl active:scale-95 transition-transform flex items-center justify-center">
                                About Us
                            </Link>
                            <Link href="/contact" className="flex-1 bg-transparent border-2 border-white/20 text-white font-bold py-3 rounded-full text-sm shadow-lg active:scale-95 transition-transform flex items-center justify-center">
                                Contact Us
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right Side Card Grid - Following fixed replica layout */}
                    <div className="flex-[1.2] flex flex-col items-center lg:items-end gap-3 md:gap-6 origin-center lg:origin-right scale-[0.5] sm:scale-[0.8] md:scale-95 lg:scale-100 -mt-24 lg:mt-0" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
                        {/* Top Card: Finance Trends (Wide) */}
                        <div className="flex-shrink-0 w-[150vw] lg:w-[620px] h-[260px] bg-white rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/20" style={{ contain: 'content' }}>
                            <FinanceSalesTrendsDemo />
                        </div>

                        {/* Bottom Row: Revenues and Profitability */}
                        <div className="flex flex-row gap-3 md:gap-6 w-[90vw] max-w-[620px] justify-center lg:justify-end items-end">
                            {/* Revenues Card (Medium) */}
                            <div className="flex-shrink-0 w-full sm:w-[336px] h-[280px] bg-white rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/20" style={{ contain: 'content' }}>
                                <RevenueChartDemo />
                            </div>

                            {/* Profitability Card (Square) */}
                            <div className="flex-shrink-0 w-full sm:w-[260px] h-[240px] bg-white rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/20" style={{ contain: 'content' }}>
                                <ProfitabilityDemo />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Enterprise Dashboard Section - Integrated into Premium Container */}
            <CompanyLogos />
            <SectionWithScrollAnimation />


            <ServicesSection />
            <ScrollStack />
            <WhyChooseUs />
            <DataIntelligenceSection />
            <ProductsSection />
            <BlogsSection />
            <FAQSection />
        </div>
    );
};

const SectionWithScrollAnimation = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const dashboardRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!sectionRef.current || !dashboardRef.current) return;

        // Dashboard grows from small to full size as user scrolls - ONE TIME ONLY
        gsap.fromTo(dashboardRef.current,
            {
                scale: 0.7,
                y: 100
            },
            {
                scale: 1,
                y: 0,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 95%",
                    end: "center 60%",
                    scrub: 1,
                    once: true, // Animation stays at end state and trigger is killed after completion
                }
            }
        );
    }, { scope: sectionRef });

    return (
        <div
            ref={sectionRef}
            className="w-full h-auto bg-transparent relative flex flex-col items-center justify-start py-0 overflow-hidden"
        >
            {/* Dashboard Container (Now full width Marquee) */}
            <div
                ref={dashboardRef}
                className="relative w-screen z-40 group"
            >
                <div className="w-full h-full">
                    <HeroSpeakSection />
                </div>

                {/* Floating Reflection Below - Desktop Only */}
                <div className="hidden md:block absolute -bottom-8 inset-x-8 h-16 bg-gradient-to-b from-white/[0.02] to-transparent rounded-b-3xl blur-lg" />
            </div>
        </div>
    );
};

export { DemoOne };

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FooterSection = () => {
    const [openMobileItem, setOpenMobileItem] = useState<string | null>(null);

    const footerLinks = {
        services: [
            { name: "Superset Analytics", href: "/superset-analytics" },
            { name: "Custom Analytics", href: "/custom-analytics" },
            { name: "Data Visualization", href: "/data-visualization" },
            { name: "Data Engineering", href: "/data-engineering" },
            { name: "AI Governance", href: "/ai-governance" },
            { name: "Applications and Automations", href: "/applications-and-automations" },
            { name: "Data Agents", href: "/data-agents" },
            // { name: "AI Agents", href: "/ai-agents" },
            { name: "Helpdesk", href: "/helpdesk" },
        ],
        products: [
            { name: "Glimvia", href: "/products/glimvia" },
            { name: "Antvia", href: "/products/antvia" },
            { name: "LetMeKnow", href: "/products/letmeknow" },
            { name: "Pre-Deployment AI Assurance", href: "/products/pre-deployment-ai-assurance" },
            { name: "Post-Deployment AI Governance", href: "/products/post-deployment-ai-governance" },
        ],
        explore: [
            { name: "About", href: "/about" },
            // { name: "Team", href: "/team" },
            { name: "Careers", href: "/careers" },
            { name: "Blog", href: "/blog" },
            { name: "Contact", href: "/contact" }
        ]
    };

    const toggleMobileItem = (item: string) => {
        setOpenMobileItem(openMobileItem === item ? null : item);
    };

    return (
        <footer className="w-full bg-transparent py-4 px-6 md:px-12 lg:px-16">
            <div className="w-full bg-[#1a1c1e] rounded-[1.25rem] md:rounded-[1.5rem] px-8 md:px-14 lg:px-16 pt-8 md:pt-12 pb-6 md:pb-10 relative overflow-hidden">

                {/* Large Background Decorative "A" - Slot-machine style entrance */}
                <div className="absolute right-[-50px] md:right-[-100px] bottom-0 md:top-1/2 md:-translate-y-1/2 opacity-15 pointer-events-none select-none w-[300px] md:w-[600px] h-[400px] md:h-[800px] flex items-center justify-end overflow-hidden">
                    <motion.div
                        initial="initial"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="relative w-[400px] md:w-[800px] h-[400px] md:h-[800px] flex items-center justify-center"
                    >
                        {/* The "Old" Logo that exits upwards */}
                        <motion.div
                            variants={{
                                initial: { y: 0, opacity: 0.8 },
                                visible: { y: -800, opacity: 0, transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } }
                            }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <svg viewBox="0 0 64 48" className="w-full h-full text-[#39D6E3] fill-current">
                                <path d="M32 4 L0 60 L12 60 L32 20 L52 60 L64 60 Z" />
                            </svg>
                        </motion.div>

                        {/* The "New" Logo that arrives from below */}
                        <motion.div
                            variants={{
                                initial: { y: 800, opacity: 0 },
                                visible: { y: 0, opacity: 1, transition: { duration: 1.5, delay: 0.1, ease: [0.76, 0, 0.24, 1] } }
                            }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <svg viewBox="0 0 64 48" className="w-full h-full text-[#39D6E3] fill-current">
                                <path d="M32 4 L0 60 L12 60 L32 20 L52 60 L64 60 Z" />
                            </svg>
                        </motion.div>
                    </motion.div>
                </div>

                <div className="relative z-10">
                    {/* Header: Logo and Brand Name */}
                    <div className="flex items-center gap-4 mb-8 md:mb-12">
                        <svg
                            width="48"
                            height="36"
                            viewBox="0 0 64 48"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            className="text-[#39D6E3]"
                        >
                            <path
                                d="M32 4 L12 44 L18 44 L32 16 L46 44 L52 44 Z"
                                fill="currentColor"
                                fillOpacity="1"
                            />
                        </svg>
                        <span className="text-3xl font-bold tracking-tight text-[#E6EAF0]">woodfrog</span>
                    </div>

                    {/* Links Grid / Accordions */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-16 lg:gap-24 max-w-4xl">
                        {/* Column 1: Services */}
                        <div className="flex flex-col md:gap-6 border-b border-white/5 md:border-0">
                            <button
                                onClick={() => toggleMobileItem('services')}
                                className="flex items-center justify-between w-full py-6 md:py-0 md:cursor-default group"
                            >
                                <h4 className="text-[#E6EAF0] font-bold text-lg uppercase tracking-wider">services</h4>
                                <ChevronDown
                                    className={`w-5 h-5 text-[#8891A5] transition-transform duration-300 md:hidden ${openMobileItem === 'services' ? 'rotate-180' : ''}`}
                                />
                            </button>

                            <AnimatePresence>
                                {(openMobileItem === 'services' || typeof window !== 'undefined' && window.innerWidth >= 768) && (
                                    <motion.div
                                        initial={typeof window !== 'undefined' && window.innerWidth < 768 ? { height: 0, opacity: 0 } : false}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden md:!h-auto md:!opacity-100"
                                    >
                                        <div className="flex flex-col gap-4 pb-6 md:pb-0">
                                            {footerLinks.services.map((link) => (
                                                <a key={link.name} href={link.href} className="text-[#8891A5] hover:text-brand-primary transition-colors text-base font-medium">
                                                    {link.name}
                                                </a>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Column 2: Products */}
                        <div className="flex flex-col md:gap-6 border-b border-white/5 md:border-0">
                            <button
                                onClick={() => toggleMobileItem('products')}
                                className="flex items-center justify-between w-full py-6 md:py-0 md:cursor-default group"
                            >
                                <h4 className="text-[#E6EAF0] font-bold text-lg uppercase tracking-wider">products</h4>
                                <ChevronDown
                                    className={`w-5 h-5 text-[#8891A5] transition-transform duration-300 md:hidden ${openMobileItem === 'products' ? 'rotate-180' : ''}`}
                                />
                            </button>

                            <AnimatePresence>
                                {(openMobileItem === 'products' || typeof window !== 'undefined' && window.innerWidth >= 768) && (
                                    <motion.div
                                        initial={typeof window !== 'undefined' && window.innerWidth < 768 ? { height: 0, opacity: 0 } : false}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden md:!h-auto md:!opacity-100"
                                    >
                                        <div className="flex flex-col gap-4 pb-6 md:pb-0">
                                            {footerLinks.products.map((link) => (
                                                <a key={link.name} href={link.href} className="text-[#8891A5] hover:text-brand-primary transition-colors text-base font-medium">
                                                    {link.name}
                                                </a>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Column 3: Woodfrog Section */}
                        <div className="flex flex-col md:gap-6">
                            <button
                                onClick={() => toggleMobileItem('explore')}
                                className="flex items-center justify-between w-full py-6 md:py-0 md:cursor-default group"
                            >
                                <h4 className="text-[#E6EAF0] font-bold text-lg uppercase tracking-wider">explore</h4>
                                <ChevronDown
                                    className={`w-5 h-5 text-[#8891A5] transition-transform duration-300 md:hidden ${openMobileItem === 'explore' ? 'rotate-180' : ''}`}
                                />
                            </button>

                            <AnimatePresence>
                                {(openMobileItem === 'explore' || typeof window !== 'undefined' && window.innerWidth >= 768) && (
                                    <motion.div
                                        initial={typeof window !== 'undefined' && window.innerWidth < 768 ? { height: 0, opacity: 0 } : false}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden md:!h-auto md:!opacity-100"
                                    >
                                        <div className="flex flex-col gap-4 pb-6 md:pb-0">
                                            {footerLinks.explore.map((link) => (
                                                <a key={link.name} href={link.href} className="text-[#8891A5] hover:text-brand-primary transition-colors text-base font-medium">
                                                    {link.name}
                                                </a>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Bottom Bar Area */}
                    <div className="mt-12 md:mt-16 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
                        <div className="text-[#8891A5]/60 text-sm font-medium">
                            © woodfrog 2026
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-[#8891A5]/60 text-sm font-medium">
                            <button
                                onClick={() => window.dispatchEvent(new CustomEvent('show-cookie-consent'))}
                                className="hover:text-brand-primary transition-colors whitespace-nowrap cursor-pointer"
                            >
                                Cookies preferences
                            </button>
                            <Link href="/privacy-policy" className="hover:text-brand-primary transition-colors whitespace-nowrap">Privacy Policy</Link>
                            <Link href="/terms-and-conditions" className="hover:text-brand-primary transition-colors whitespace-nowrap">Terms & Conditions (T&C)</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export { FooterSection };
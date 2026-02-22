'use client';

import React from 'react';
import { motion } from 'framer-motion';

function AnimatedSection({
    children,
    className = '',
    delay = 0,
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export default function TermsClient() {
    return (
        <main className="min-h-screen bg-transparent text-white selection:bg-brand-primary/20">
            <div className="w-full px-8 md:px-24 lg:px-32 pt-32 md:pt-44 pb-20 md:pb-28">
                <div className="max-w-4xl mx-auto space-y-12">
                    {/* Header */}
                    <AnimatedSection>
                        <div className="space-y-4">
                            <h1 className="text-[2.2rem] md:text-[3.6rem] font-bold leading-tight tracking-tight text-white">
                                Terms and <span className="text-brand-primary">Conditions</span>
                            </h1>
                            <p className="text-gray-400 text-sm md:text-base font-medium">
                                Last Updated: February 26, 2025
                            </p>
                        </div>
                    </AnimatedSection>

                    {/* Content */}
                    <div className="space-y-12 text-gray-300">
                        <AnimatedSection delay={0.1}>
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-white">1. Introduction</h2>
                                <p className="leading-relaxed">
                                    Welcome to Woodfrog Tech. These terms and conditions outline the rules and regulations for the use of our website and services. By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use Woodfrog Tech&apos;s website if you do not accept all the terms and conditions stated here.
                                </p>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={0.2}>
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-white">2. Intellectual Property Rights</h2>
                                <p className="leading-relaxed">
                                    Unless otherwise stated, Woodfrog Tech and/or its licensors own the intellectual property rights for all material on this website. All intellectual property rights are reserved. You may access this from Woodfrog Tech for your own personal use, subject to restrictions set in these terms.
                                </p>
                                <div className="space-y-2 pt-2">
                                    <p className="font-semibold text-white/80">You must not:</p>
                                    <ul className="list-disc list-inside space-y-1 pl-4 text-gray-400">
                                        <li>Republish material from our website.</li>
                                        <li>Sell, rent, or sub-license material.</li>
                                        <li>Reproduce, duplicate, or copy material for commercial use.</li>
                                        <li>Redistribute content from our website without proper attribution.</li>
                                    </ul>
                                </div>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={0.3}>
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-white">3. Restrictions</h2>
                                <p className="font-semibold text-white/80">You are specifically restricted from engaging in the following:</p>
                                <ul className="list-disc list-inside space-y-1 pl-4 text-gray-400">
                                    <li>Using this website in any way that is damaging.</li>
                                    <li>Using this website in any way that impacts user access.</li>
                                    <li>Engaging in data mining, data harvesting, or similar activities.</li>
                                    <li>Using this website for unlawful activities.</li>
                                </ul>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={0.4}>
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-white">4. Limitation of Liability</h2>
                                <p className="leading-relaxed">
                                    Woodfrog Tech, its directors, employees, and affiliates shall not be held liable for any damages arising from your use of this website.
                                </p>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={0.5}>
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-white">5. Changes to Terms</h2>
                                <p className="leading-relaxed">
                                    We reserve the right to modify these terms at any time. Your continued use of the website signifies acceptance of any modifications.
                                </p>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={0.6}>
                            <div className="space-y-4 pb-12 border-b border-white/5">
                                <h2 className="text-2xl font-bold text-white">6. Contact Information</h2>
                                <p className="leading-relaxed">
                                    If you have any questions regarding these terms, please contact us at{' '}
                                    <a href="mailto:info@woodfrog.tech" className="text-brand-primary hover:underline transition-all">
                                        info@woodfrog.tech
                                    </a>.
                                </p>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </div>
        </main>
    );
}

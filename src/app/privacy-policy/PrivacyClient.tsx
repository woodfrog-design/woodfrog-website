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

export default function PrivacyClient() {
    return (
        <main className="min-h-screen bg-transparent text-white selection:bg-brand-primary/20">
            <div className="w-full px-8 md:px-24 lg:px-32 pt-32 md:pt-44 pb-20 md:pb-28">
                <div className="max-w-4xl mx-auto space-y-12">
                    {/* Header */}
                    <AnimatedSection>
                        <div className="space-y-4">
                            <h1 className="text-[2.2rem] md:text-[3.6rem] font-bold leading-tight tracking-tight text-white">
                                <span className="text-brand-primary">Privacy</span> Policy
                            </h1>
                            <p className="text-gray-400 text-sm md:text-base font-medium">
                                Last Updated: February 26, 2025
                            </p>
                            <p className="text-gray-300 leading-relaxed pt-4">
                                At Woodfrog Tech, we value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information.
                            </p>
                        </div>
                    </AnimatedSection>

                    {/* Content */}
                    <div className="space-y-12 text-gray-300">
                        <AnimatedSection delay={0.1}>
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-white">1. Information We Collect</h2>
                                <p className="leading-relaxed">
                                    We collect the following types of personal data:
                                </p>
                                <ul className="list-disc list-inside space-y-1 pl-4 text-gray-400">
                                    <li>Name</li>
                                    <li>Email address</li>
                                    <li>Phone number</li>
                                    <li>Company details</li>
                                    <li>Usage data (IP address, browser type, pages visited, etc.)</li>
                                </ul>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={0.2}>
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-white">2. How We Use Your Data</h2>
                                <p className="leading-relaxed">
                                    We use collected data for:
                                </p>
                                <ul className="list-disc list-inside space-y-1 pl-4 text-gray-400">
                                    <li>Providing and maintaining our services</li>
                                    <li>Enhancing website functionality and user experience</li>
                                    <li>Marketing and communication purposes</li>
                                    <li>Ensuring compliance with legal and regulatory obligations</li>
                                </ul>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={0.3}>
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-white">3. Data Protection & Security</h2>
                                <p className="leading-relaxed">
                                    We implement industry-standard security measures to protect your personal data. However, no system is completely secure. We recommend using strong passwords and keeping your login details private.
                                </p>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={0.4}>
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-white">4. GDPR Compliance (For EU Residents)</h2>
                                <p className="leading-relaxed">
                                    Residents of the European Economic Area (EEA) have the right to:
                                </p>
                                <ul className="list-disc list-inside space-y-1 pl-4 text-gray-400">
                                    <li>Access, update, or delete personal data</li>
                                    <li>Restrict processing of personal data</li>
                                    <li>Withdraw consent for data processing</li>
                                </ul>
                                <p className="pt-2">
                                    To exercise these rights, contact us at{' '}
                                    <a href="mailto:info@woodfrog.tech" className="text-brand-primary hover:underline">info@woodfrog.tech</a>.
                                </p>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={0.5}>
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-white">5. CCPA Compliance (For California Residents)</h2>
                                <p className="leading-relaxed">
                                    Under the California Consumer Privacy Act (CCPA), you have the right to:
                                </p>
                                <ul className="list-disc list-inside space-y-1 pl-4 text-gray-400">
                                    <li>Request access to collected personal data</li>
                                    <li>Request deletion of personal data</li>
                                    <li>Opt-out of the sale of personal data (Woodfrog Tech does not sell personal data)</li>
                                </ul>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={0.6}>
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-white">6. Cloud Computing and Data Storage</h2>
                                <p className="leading-relaxed">
                                    Our services operate on secure cloud infrastructure, ensuring high availability and compliance with data protection laws.
                                </p>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={0.7}>
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-white">7. Client Data Sharing & Third-Party Services</h2>
                                <p className="leading-relaxed">
                                    We may share data with trusted third-party providers to enhance services. However, we do not sell client data, and all integrations follow strict data protection protocols.
                                </p>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={0.8}>
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-white">8. Cookies & Tracking Technologies</h2>
                                <p className="leading-relaxed">
                                    We use cookies to enhance your experience. You can manage cookies in your browser settings.
                                </p>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={0.9}>
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-white">9. Changes to This Privacy Policy</h2>
                                <p className="leading-relaxed">
                                    We may update this policy periodically. Changes will be posted on our website.
                                </p>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={1.0}>
                            <div className="space-y-4 pb-12 border-b border-white/5">
                                <h2 className="text-2xl font-bold text-white">10. Contact Us</h2>
                                <p className="leading-relaxed">
                                    If you have any questions, contact us at{' '}
                                    <a href="mailto:info@woodfrog.tech" className="text-brand-primary hover:underline">
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

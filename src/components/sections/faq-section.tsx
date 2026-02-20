'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';

const faqData = [
    {
        question: "Do you support data and analytics strategy?",
        answer: "Yes. We help organizations define clear data strategies aligned with business objectives. This includes analytics roadmaps, governance frameworks, technology selection, and operating models that ensure long-term scalability and measurable value."
    },
    {
        question: "Are you able to develop custom data visualizations?",
        answer: "Absolutely. We design and build custom visual components tailored to your specific metrics, workflows, and industry requirements. Whether extending existing platforms or creating entirely bespoke interfaces, we ensure every visualization supports clear and actionable insight."
    },
    {
        question: "Are you able to integrate directly with our analytics platform?",
        answer: "Yes. We integrate seamlessly with modern analytics and data platforms, ensuring secure data flows between dashboards, applications, and enterprise systems. Our approach prioritizes performance, governance, and scalability."
    },
    {
        question: "Can you integrate external and third-party data sources?",
        answer: "Yes. We design secure data pipelines that connect internal systems with external APIs, partner platforms, and third-party datasets. All integrations follow best practices for data quality, compliance, and security."
    }
];

const FAQItem = ({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) => {
    return (
        <div className="border border-white/10 rounded-2xl mb-4 overflow-hidden bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-300">
            <button
                onClick={onClick}
                className="w-full p-6 md:p-8 flex items-center justify-between text-left group"
            >
                <div className="flex items-center gap-6">
                    <motion.div
                        className="text-brand-primary"
                        animate={{
                            rotate: isOpen ? 405 : 0 // 720 (2 turns) + 45 (to cross)
                        }}
                        whileHover={{
                            rotate: isOpen ? 405 : 360, // 2 extra turns on hover
                            transition: { duration: 0.6, ease: "easeInOut" }
                        }}
                        transition={{ duration: 0.8, ease: "circOut" }}
                    >
                        <Plus size={18} />
                    </motion.div>
                    <span className="text-[#E6EAF0] text-lg md:text-xl font-bold tracking-tight group-hover:text-brand-primary transition-colors duration-300">
                        {question}
                    </span>
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                        <div className="px-6 pb-8 md:px-20 md:pb-12 border-t border-white/5 pt-6 mt-2">
                            <p className="text-[#8891A5] text-base md:text-lg leading-relaxed max-w-2xl">
                                {answer}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="w-full bg-transparent pt-12 pb-24 md:pt-24 md:pb-48 -mt-20">
            <div className="mx-auto px-6 md:px-32">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-32 flex-wrap lg:flex-nowrap">

                    {/* Left Column: Heading */}
                    <div className="lg:w-1/3 order-1">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-5xl md:text-7xl font-black text-[#f4e8df] mb-6 md:mb-8 tracking-tighter">
                                FAQ
                            </h2>
                            <p className="text-[#8891A5] text-base md:text-xl font-bold leading-snug max-w-xs mb-8 md:mb-10">
                                Here are some of our most asked questions. If yours is not there, contact us.
                            </p>

                            {/* AI Avatar Support CTA - visible on desktop only in this position */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="hidden lg:flex items-center gap-5 p-4 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-sm w-fit group cursor-pointer hover:bg-white/[0.06] transition-all duration-300"
                            >
                                <div className="relative">
                                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-brand-primary/30 group-hover:border-brand-primary transition-colors duration-500 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                                        <img
                                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200&h=200"
                                            alt="AI Assistant"
                                            className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-black rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[#8891A5] text-sm font-medium">More question?</span>
                                    <span className="text-[#E6EAF0] font-bold group-hover:text-brand-primary transition-colors">Contact us now</span>
                                </div>
                                <div className="ml-2 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-primary transition-all duration-300">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white group-hover:text-black transition-colors">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Right Column: Accordion List */}
                    <div className="flex-1 order-2">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            {faqData.map((item, idx) => (
                                <FAQItem
                                    key={idx}
                                    question={item.question}
                                    answer={item.answer}
                                    isOpen={openIndex === idx}
                                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                />
                            ))}
                        </motion.div>
                    </div>

                    {/* Mobile-only Contact CTA - appears below questions */}
                    <div className="lg:hidden order-3 w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="flex items-center gap-5 p-4 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-sm w-fit group cursor-pointer hover:bg-white/[0.06] transition-all duration-300"
                        >
                            <div className="relative">
                                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-brand-primary/30 group-hover:border-brand-primary transition-colors duration-500 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                                    <img
                                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200&h=200"
                                        alt="AI Assistant"
                                        className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-500"
                                    />
                                </div>
                                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-black rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[#8891A5] text-sm font-medium">More question?</span>
                                <span className="text-[#E6EAF0] font-bold group-hover:text-brand-primary transition-colors">Contact us now</span>
                            </div>
                            <div className="ml-2 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-primary transition-all duration-300">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white group-hover:text-black transition-colors">
                                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export { FAQSection };

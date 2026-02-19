'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface DemoChatProps {
    isExpanded: boolean;
    messageIndex: number;
}

export const DemoChat: React.FC<DemoChatProps> = ({ isExpanded, messageIndex }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const messages = [
        { type: 'user', text: "How does the current cycle compare to the 1982 benchmark?" },
        { type: 'ai', text: "The current cycle (blue) is tracking 32% higher than the 1982 cycle (dashed red) at the 40-month mark." },
        { type: 'user', text: "Is there any deviation from the standard trend?" },
        { type: 'ai', text: "Yes, we see a significant deviation starting at month 24, indicating stronger early-stage growth." },
        { type: 'user', text: "Forecast the next quarter based on this trajectory." },
        { type: 'ai', text: "Based on the current momentum, we project a continued breakout above the 150% threshold by month 45." },
        { type: 'user', text: "Excellent analysis. Keep tracking." },
        { type: 'ai', text: "Understood. Monitoring cycle performance in real-time." }
    ];

    // Auto-scroll logic
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messageIndex, isExpanded]);

    return (
        <AnimatePresence>
            {isExpanded && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="absolute inset-0 z-50 bg-white flex flex-col"
                >
                    {/* Header */}
                    <div className="flex justify-between items-center px-10 h-20 border-b border-gray-100 flex-shrink-0 bg-white shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
                                    <path d="M4 20L12 4L20 20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-md font-bold text-gray-900 leading-none">Woodfrog AI</span>
                                <span className="text-[10px] text-cyan-500 font-bold uppercase tracking-widest mt-1">Analyzing Live Data</span>
                            </div>
                        </div>
                        <div className="p-2 mr-[-8px] text-gray-300">
                            <X size={24} />
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div
                        ref={scrollRef}
                        className="flex-1 p-10 overflow-y-auto scroll-smooth flex flex-col gap-6"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none'
                        }}
                    >
                        {/* Custom CSS to hide scrollbars for Chrome/Safari */}
                        <style>{`
              .no-scrollbar::-webkit-scrollbar {
                display: none;
              }
            `}</style>

                        {messages.slice(0, messageIndex + 1).map((msg, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                                className={`flex gap-4 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                {msg.type === 'ai' && (
                                    <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-cyan-500">
                                            <path d="M4 20L12 4L20 20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                )}

                                <div className={`max-w-[75%] rounded-2xl p-5 text-sm md:text-md leading-relaxed shadow-sm ${msg.type === 'user'
                                    ? 'bg-gray-100 text-gray-600 rounded-tr-none'
                                    : 'bg-white text-gray-900 border border-cyan-50 font-medium rounded-tl-none whitespace-pre-wrap'
                                    }`}>
                                    {msg.text}
                                </div>
                            </motion.div>
                        ))}

                        {/* Typing Indicator */}
                        {messageIndex % 2 === 0 && messageIndex < messages.length - 1 && (
                            <div className="flex gap-1.5 ml-14 bg-gray-50/50 w-14 p-3 rounded-2xl">
                                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-6 bg-white border-t border-gray-100 flex-shrink-0 z-10">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Ask Woodfrog for insights..."
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 pl-6 pr-14 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all placeholder:text-gray-400 text-gray-700"
                                disabled // Disabled for demo purposes
                            />
                            <div className="absolute right-2 top-2 p-2 bg-gradient-to-tr from-cyan-400 to-cyan-600 rounded-lg text-white shadow-lg shadow-cyan-500/20 cursor-pointer hover:shadow-cyan-500/40 transition-shadow">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="22" y1="2" x2="11" y2="13"></line>
                                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                </svg>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

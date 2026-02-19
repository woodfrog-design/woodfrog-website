'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { ANIMATION_THEME } from '@/lib/colors';

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
                    className="absolute inset-0 z-50 flex flex-col"
                    style={{ backgroundColor: ANIMATION_THEME.background }}
                >
                    {/* Header */}
                    <div className="flex justify-between items-center px-10 h-20 border-b flex-shrink-0 shadow-sm" style={{ backgroundColor: ANIMATION_THEME.background, borderColor: ANIMATION_THEME.border }}>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style={{ backgroundColor: ANIMATION_THEME.primary }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ color: ANIMATION_THEME.text.primary }}>
                                    <path d="M4 20L12 4L20 20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-md font-bold leading-none" style={{ color: ANIMATION_THEME.text.primary }}>Woodfrog AI</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest mt-1" style={{ color: ANIMATION_THEME.primary }}>Analyzing Live Data</span>
                            </div>
                        </div>
                        <div className="p-2 mr-[-8px]" style={{ color: ANIMATION_THEME.text.muted }}>
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
                                    <div className="w-10 h-10 rounded-xl border flex items-center justify-center shrink-0" style={{ backgroundColor: '#f8fafc', borderColor: ANIMATION_THEME.border }}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ color: ANIMATION_THEME.primary }}>
                                            <path d="M4 20L12 4L20 20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                )}

                                <div className={`max-w-[75%] rounded-2xl p-5 text-sm md:text-md leading-relaxed shadow-sm ${msg.type === 'user'
                                    ? 'bg-slate-100 text-slate-600 rounded-tr-none'
                                    : 'bg-white border font-medium rounded-tl-none whitespace-pre-wrap'
                                    }`}
                                    style={msg.type === 'ai' ? { color: ANIMATION_THEME.text.primary, borderColor: `${ANIMATION_THEME.primary}33` } : {}}
                                >
                                    {msg.text}
                                </div>
                            </motion.div>
                        ))}

                        {/* Typing Indicator */}
                        {messageIndex % 2 === 0 && messageIndex < messages.length - 1 && (
                            <div className="flex gap-1.5 ml-14 w-14 p-3 rounded-2xl" style={{ backgroundColor: '#f8fafc' }}>
                                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ANIMATION_THEME.primary }} />
                                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ANIMATION_THEME.primary }} />
                                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ANIMATION_THEME.primary }} />
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-6 border-t flex-shrink-0 z-10" style={{ backgroundColor: ANIMATION_THEME.background, borderColor: ANIMATION_THEME.border }}>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Ask Woodfrog for insights..."
                                className="w-full border rounded-xl py-4 pl-6 pr-14 text-sm font-medium focus:outline-none transition-all placeholder:text-slate-400"
                                style={{
                                    backgroundColor: '#f8fafc',
                                    borderColor: ANIMATION_THEME.border,
                                    color: ANIMATION_THEME.text.primary
                                }}
                                disabled // Disabled for demo purposes
                            />
                            <div className="absolute right-2 top-2 p-2 rounded-lg text-white shadow-lg cursor-not-allowed" style={{ background: `linear-gradient(to top right, ${ANIMATION_THEME.primary}, ${ANIMATION_THEME.primary}CC)` }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: ANIMATION_THEME.text.primary }}>
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

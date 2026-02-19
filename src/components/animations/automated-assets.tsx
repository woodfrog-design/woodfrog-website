'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ANIMATION_THEME } from '@/lib/colors';

export const HighlightBox: React.FC = () => {
    return (
        <motion.div
            initial={{ x: 30, opacity: 0, scale: 0.9 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: 30, opacity: 0, scale: 0.9 }}
            className="p-6 rounded-[16px] shadow-2xl flex flex-col gap-2 min-w-[200px] border"
            style={{
                backgroundColor: ANIMATION_THEME.text.primary,
                borderColor: '#334155' // Slightly lighter than Slate 900 for border
            }}
        >
            <p className="text-gray-300 text-[13px] font-medium tracking-wide">
                Current Cycle Peak
            </p>
            <p className="text-[32px] font-bold leading-none tracking-tight" style={{ color: ANIMATION_THEME.background }}>
                132%
            </p>
            <div className="flex items-center gap-2 mt-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ color: ANIMATION_THEME.primary }}>
                    <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-sm font-medium" style={{ color: ANIMATION_THEME.primary }}>+32% vs 1982 Cycle</span>
            </div>
        </motion.div>
    );
};

export const CustomCursor: React.FC<{ x: any; y: any; isClicking?: boolean }> = ({ x, y, isClicking }) => {
    return (
        <motion.div
            style={{ x, y, left: 0, top: 0 }}
            animate={{
                scale: isClicking ? 0.9 : 1,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            className="absolute pointer-events-none z-[100]"
        >
            <div className="relative">
                {/* Cursor pointer */}
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="absolute -top-0.5 -left-0.5 drop-shadow-md"
                >
                    <path
                        d="M3 3L10.07 19.97L12.58 12.41L20.14 9.9L3 3Z"
                        fill="#1e293b"
                        stroke="white"
                        strokeWidth="2"
                    />
                </svg>



                {/* Click ripple effect */}
                <AnimatePresence>
                    {isClicking && (
                        <>
                            <motion.div
                                initial={{ scale: 0, opacity: 0.6 }}
                                animate={{ scale: 2.5, opacity: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="absolute top-0 left-0 w-5 h-5 rounded-full border-2"
                                style={{ borderColor: ANIMATION_THEME.primary }}
                            />
                            <motion.div
                                initial={{ scale: 0, opacity: 0.4 }}
                                animate={{ scale: 1.8, opacity: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
                                className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full"
                                style={{ backgroundColor: `${ANIMATION_THEME.primary}4D` }} // 30% opacity
                            />
                        </>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

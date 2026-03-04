'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, animate, AnimatePresence, useInView } from 'framer-motion';
import { WoodfrogDashboard } from './woodfrog-dashboard';
import { DemoChat } from './demo-chat';
import { HighlightBox, CustomCursor } from './automated-assets';
import { MessageSquare } from 'lucide-react';
import { ANIMATION_THEME } from '@/lib/colors';

type DemoState = 'IDLE' | 'HIGHLIGHT' | 'MOVING' | 'EXPANDED' | 'TALKING' | 'RETURNING';

export const AutomatedDemo: React.FC<{ isActive?: boolean }> = ({ isActive = true }) => {
    const [state, setState] = useState<DemoState>('IDLE');
    const [messageIndex, setMessageIndex] = useState(0);
    const [isClicking, setIsClicking] = useState(false);
    const [chartKey, setChartKey] = useState(0); // Key to restart chart animation
    const [showChatTrigger, setShowChatTrigger] = useState(false); // New state for delayed appearance
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { amount: 0.3 });

    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);

    useEffect(() => {
        let cancelled = false;

        const wait = (ms: number) => new Promise(r => setTimeout(r, ms));

        const runSequence = async () => {
            if (!containerRef.current || cancelled) return;
            const w = containerRef.current.offsetWidth;
            const h = containerRef.current.offsetHeight;
            const centerX = w / 2;
            const centerY = h / 2;

            // 1. Reset / Start Center
            setState('IDLE');
            setShowChatTrigger(false); // Hide trigger initially
            setChartKey(prev => prev + 1); // Trigger chart animation
            setMessageIndex(0);
            cursorX.set(centerX);
            cursorY.set(centerY);

            // Wait 0.5s before showing Dialog (as requested)
            await wait(500);
            if (cancelled) return;

            // 2. Show Highlight Box ("In strong increase")
            setState('HIGHLIGHT');

            // Wait 1s after dialog appears before Chat (as requested)
            await wait(1000);
            if (cancelled) return;

            // 3. Show Chat Trigger with "Hi can I help you"
            setShowChatTrigger(true);

            // Wait a bit for user to process trigger
            await wait(800);
            if (cancelled) return;

            // 4. Move Mouse to Chat Trigger
            setState('MOVING'); // Cursor starts moving
            const chatTargetX = w - 72;
            const chatTargetY = h - 72;

            animate(cursorX, chatTargetX, { duration: 1.2, ease: "easeInOut" });
            animate(cursorY, chatTargetY, { duration: 1.2, ease: "easeInOut" });
            await wait(1300);
            if (cancelled) return;

            // 5. Click Chat Bubble
            setIsClicking(true);
            await wait(200);
            setIsClicking(false);

            // Open Chat
            setState('EXPANDED');
            setShowChatTrigger(false);

            await wait(800);
            if (cancelled) return;

            // 6. Talking Sequence
            setState('TALKING');
            for (let i = 0; i < 8; i++) {
                if (cancelled) return;
                setMessageIndex(i);
                await wait(2800);
            }

            // 7. Move to Close button
            const closeTargetX = w - 60;
            const closeTargetY = 40;
            animate(cursorX, closeTargetX, { duration: 1.2, ease: "easeInOut" });
            animate(cursorY, closeTargetY, { duration: 1.2, ease: "easeInOut" });
            await wait(1300);
            if (cancelled) return;

            // 8. Click Close
            setIsClicking(true);
            await wait(200);
            setIsClicking(false);

            setState('IDLE');
            await wait(400);
            if (cancelled) return;

            // 9. Return to Center
            setState('RETURNING');
            animate(cursorX, centerX, { duration: 1.5, ease: "easeInOut" });
            animate(cursorY, centerY, { duration: 1.5, ease: "easeInOut" });
            await wait(1600);

            // Loop
            if (!cancelled) runSequence();
        };

        const timer = setTimeout(() => {
            if (isActive || isInView) runSequence();
        }, 500);

        return () => {
            cancelled = true;
            clearTimeout(timer);
        };
    }, [isActive, isInView, cursorX, cursorY]);

    return (
        <div ref={containerRef} className="relative w-full h-full bg-white overflow-hidden">
            {/* Background Dashboard Layer - Key for reset */}
            <div key={chartKey} className="w-full h-full">
                <WoodfrogDashboard />
            </div>

            {/* Analytics Insight Box ("In strong increase") */}
            <AnimatePresence>
                {state === 'HIGHLIGHT' && (
                    <div className="absolute top-24 left-12 z-[45]">
                        <HighlightBox />
                    </div>
                )}
            </AnimatePresence>

            {/* Floating Chat Trigger with Tooltip */}
            <AnimatePresence>
                {showChatTrigger && (state === 'IDLE' || state === 'HIGHLIGHT' || state === 'MOVING') && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0, opacity: 0, y: 20 }}
                        className="absolute bottom-[40px] right-[40px] z-30 pointer-events-none flex items-center gap-3"
                    >
                        {/* "Hi can I help you?" Tooltip */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white px-4 py-2 rounded-xl shadow-lg border whitespace-nowrap"
                            style={{ borderColor: ANIMATION_THEME.border }}
                        >
                            <span className="text-sm font-semibold" style={{ color: ANIMATION_THEME.text.primary }}>Hi, can I help you?</span>
                            {/* Triangle pointer */}
                            <div className="absolute top-1/2 -right-1.5 w-3 h-3 bg-white border-t border-r transform rotate-45 -translate-y-1/2" style={{ borderColor: ANIMATION_THEME.border }} />
                        </motion.div>

                        {/* Woodfrog Trigger Icon (Small) */}
                        <div className="w-14 h-14 rounded-full shadow-xl flex items-center justify-center ring-4 ring-white relative overflow-hidden group" style={{ backgroundColor: ANIMATION_THEME.primary }}>
                            {/* Shine effect */}
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            <div className="relative z-10" style={{ color: ANIMATION_THEME.text.primary }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 20L12 4L20 20" />
                                </svg>
                            </div>
                        </div>

                        {/* Notification Dot */}
                        <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 border-2 border-white rounded-full animate-pulse" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Chat Sequence (Mini/Expanded) */}
            <DemoChat
                isExpanded={state === 'EXPANDED' || state === 'TALKING'}
                messageIndex={messageIndex}
            />

            {/* Visible Interactive Cursor - HIGHEST Z-INDEX */}
            <div className="absolute inset-0 pointer-events-none z-[100]">
                <CustomCursor x={cursorX} y={cursorY} isClicking={isClicking} />
            </div>
        </div>
    );
};

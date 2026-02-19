'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, animate, AnimatePresence } from 'framer-motion';
import { WoodfrogDashboard } from './WoodfrogDashboard';
import { DemoChat } from './DemoChat';
import { HighlightBox, CustomCursor } from './AutomatedAssets';
import { MessageSquare } from 'lucide-react';

type DemoState = 'IDLE' | 'HIGHLIGHT' | 'MOVING' | 'EXPANDED' | 'TALKING' | 'RETURNING';

export const AutomatedDemo: React.FC = () => {
    const [state, setState] = useState<DemoState>('IDLE');
    const [messageIndex, setMessageIndex] = useState(0);
    const [isClicking, setIsClicking] = useState(false);
    const [chartKey, setChartKey] = useState(0); // Key to restart chart animation
    const [showChatTrigger, setShowChatTrigger] = useState(false); // New state for delayed appearance

    const containerRef = useRef<HTMLDivElement>(null);

    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        const runSequence = async () => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // 1. Reset / Start Center
            setState('IDLE');
            setShowChatTrigger(false); // Hide trigger initially
            setChartKey(prev => prev + 1); // Trigger chart animation
            setMessageIndex(0);
            cursorX.set(centerX);
            cursorY.set(centerY);

            // Wait 0.5s before showing Dialog (as requested)
            await new Promise(r => setTimeout(r, 500));

            // 2. Show Highlight Box ("In strong increase")
            setState('HIGHLIGHT');

            // Wait 1s after dialog appears before Chat (as requested)
            await new Promise(r => setTimeout(r, 1000));

            // 3. Show Chat Trigger with "Hi can I help you"
            setShowChatTrigger(true);

            // Wait a bit for user to process trigger
            await new Promise(r => setTimeout(r, 800));

            // 4. Move Mouse to Chat Trigger
            setState('MOVING'); // Cursor starts moving
            const chatTargetX = rect.width - 72;
            const chatTargetY = rect.height - 72;

            animate(cursorX, chatTargetX, { duration: 1.2, ease: "easeInOut" });
            animate(cursorY, chatTargetY, { duration: 1.2, ease: "easeInOut" });
            await new Promise(r => setTimeout(r, 1300));

            // 5. Click Chat Bubble
            setIsClicking(true);
            await new Promise(r => setTimeout(r, 200));
            setIsClicking(false);

            // Open Chat
            setState('EXPANDED');
            setShowChatTrigger(false);

            await new Promise(r => setTimeout(r, 800));

            // 6. Talking Sequence
            setState('TALKING');
            for (let i = 0; i < 8; i++) {
                setMessageIndex(i);
                await new Promise(r => setTimeout(r, 2800));
            }

            // 7. Move to Close button - Adjusted Y to 40 for better centering
            const closeTargetX = rect.width - 60;
            const closeTargetY = 40;
            animate(cursorX, closeTargetX, { duration: 1.2, ease: "easeInOut" });
            animate(cursorY, closeTargetY, { duration: 1.2, ease: "easeInOut" });
            await new Promise(r => setTimeout(r, 1300));

            // 8. Click Close
            setIsClicking(true);
            await new Promise(r => setTimeout(r, 200));
            setIsClicking(false);

            setState('IDLE');
            await new Promise(r => setTimeout(r, 400));

            // 9. Return to Center
            setState('RETURNING');
            animate(cursorX, centerX, { duration: 1.5, ease: "easeInOut" });
            animate(cursorY, centerY, { duration: 1.5, ease: "easeInOut" });
            await new Promise(r => setTimeout(r, 1600));

            // Loop
            runSequence();
        };

        setTimeout(runSequence, 500);

        return () => clearTimeout(timeout);
    }, [cursorX, cursorY]);

    return (
        <div ref={containerRef} className="relative w-full h-full bg-white overflow-hidden rounded-[40px] shadow-inner">
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

            {/* Tighter Floating Chat Trigger with Tooltip */}
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
                            className="bg-white px-4 py-2 rounded-xl shadow-lg border border-gray-100 whitespace-nowrap"
                        >
                            <span className="text-sm font-semibold text-gray-700">Hi, can I help you?</span>
                            {/* Triangle pointer */}
                            <div className="absolute top-1/2 -right-1.5 w-3 h-3 bg-white border-t border-r border-gray-100 transform rotate-45 -translate-y-1/2" />
                        </motion.div>

                        {/* Woodfrog Trigger Icon (Small) */}
                        <div className="w-14 h-14 rounded-full bg-cyan-500 shadow-xl flex items-center justify-center ring-4 ring-white relative overflow-hidden group">
                            {/* Shine effect */}
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            <div className="relative z-10 text-white">
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

            {/* Visual Frame Removed to fix white layer artifact */}
        </div>
    );
};

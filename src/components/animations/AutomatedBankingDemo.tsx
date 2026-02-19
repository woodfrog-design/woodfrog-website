'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, animate, AnimatePresence } from 'framer-motion';
import { BankingDashboard } from './BankingDashboard';
import { TransactionDetailDashboard } from './TransactionDetailDashboard';
import { PersonaDashboard } from './PersonaDashboard';
import { MomentumDashboard } from './MomentumDashboard';
import { CustomCursor } from './AutomatedAssets';

type DashboardView = 'overview' | 'detail' | 'persona' | 'momentum';

const pageTransition = {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
    exit: { opacity: 0, scale: 0.98, transition: { duration: 0.25 } },
};

export const AutomatedBankingDemo: React.FC = () => {
    const [currentView, setCurrentView] = useState<DashboardView>('overview');
    const [isClicking, setIsClicking] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);

    const doClick = async () => {
        setIsClicking(true);
        await new Promise(r => setTimeout(r, 350));
        setIsClicking(false);
        await new Promise(r => setTimeout(r, 150));
    };

    useEffect(() => {
        let cancelled = false;

        const moveTo = async (x: number, y: number, duration = 1.4) => {
            if (cancelled) return;
            animate(cursorX, x, { duration, ease: [0.25, 0.1, 0.25, 1] });
            animate(cursorY, y, { duration, ease: [0.25, 0.1, 0.25, 1] });
            await new Promise(r => setTimeout(r, duration * 1000 + 200));
        };

        const wait = async (ms: number) => {
            if (cancelled) return;
            await new Promise(r => setTimeout(r, ms));
        };

        const runSequence = async () => {
            if (!containerRef.current || cancelled) return;
            const rect = containerRef.current.getBoundingClientRect();
            const w = rect.width;
            const h = rect.height;

            // === VIEW 1: Overview ===
            setCurrentView('overview');
            cursorX.set(w * 0.5);
            cursorY.set(h * 0.5);
            await wait(2000);
            if (cancelled) return;

            // Click service table row -> drill into Detail
            await moveTo(w * 0.78, h * 0.42, 1.3);
            if (cancelled) return;
            await doClick();
            await wait(400);
            if (cancelled) return;

            // === VIEW 2: Transaction Detail ===
            setCurrentView('detail');
            await wait(2000);
            if (cancelled) return;

            // Click sidebar Models icon -> drill into Persona
            await moveTo(w * 0.035, h * 0.36, 1.3);
            if (cancelled) return;
            await doClick();
            await wait(400);
            if (cancelled) return;

            // === VIEW 3: Persona / Models ===
            setCurrentView('persona');
            await wait(2000);
            if (cancelled) return;

            // Click sidebar TrendingUp icon -> drill into Momentum
            await moveTo(w * 0.035, h * 0.46, 1.3);
            if (cancelled) return;
            await doClick();
            await wait(400);
            if (cancelled) return;

            // === VIEW 4: Momentum ===
            setCurrentView('momentum');
            await wait(2000);
            if (cancelled) return;

            // Click back -> return to Overview
            await moveTo(w * 0.09, h * 0.12, 1.3);
            if (cancelled) return;
            await doClick();
            await wait(400);
            if (cancelled) return;

            // Loop
            if (!cancelled) runSequence();
        };

        const timer = setTimeout(runSequence, 600);
        return () => {
            cancelled = true;
            clearTimeout(timer);
        };
    }, [cursorX, cursorY]);

    return (
        <div ref={containerRef} className="relative w-full h-full bg-white overflow-hidden">
            {/* Dashboard Views */}
            <AnimatePresence mode="wait">
                {currentView === 'overview' && (
                    <motion.div key="overview" className="absolute inset-0" {...pageTransition}>
                        <BankingDashboard />
                    </motion.div>
                )}
                {currentView === 'detail' && (
                    <motion.div key="detail" className="absolute inset-0" {...pageTransition}>
                        <TransactionDetailDashboard />
                    </motion.div>
                )}
                {currentView === 'persona' && (
                    <motion.div key="persona" className="absolute inset-0" {...pageTransition}>
                        <PersonaDashboard />
                    </motion.div>
                )}
                {currentView === 'momentum' && (
                    <motion.div key="momentum" className="absolute inset-0" {...pageTransition}>
                        <MomentumDashboard />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Cursor Layer */}
            <div className="absolute inset-0 pointer-events-none z-[100]">
                <CustomCursor x={cursorX} y={cursorY} isClicking={isClicking} />
            </div>
        </div>
    );
};

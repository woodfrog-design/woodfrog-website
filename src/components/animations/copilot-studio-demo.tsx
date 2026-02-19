'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import { CustomCursor } from './automated-assets';

const AGENTS_INITIAL = [
  { name: 'Agent - 01 - Woodfrog', color: '#4DA3FF' },
  { name: 'Agent - 02 - Woodfrog', color: '#22c55e' },
];
const AGENT_NEW = { name: 'Agent - 03 - Woodfrog', color: '#E8501A' };

/*
  Timeline:
  0.6s  — show panel with 2 agents
  1.4s  — cursor moves to "+ Add an agent"
  2.2s  — cursor hovers (button highlights)
  2.6s  — cursor clicks
  3.0s  — 3rd agent row appears
  3.4s  — cursor moves down to new row
  6.0s  — reset and loop
*/

export function CopilotStudioDemo() {
  const [phase, setPhase] = useState<
    'idle' | 'moving' | 'hovering' | 'clicking' | 'added' | 'cursor-down' | 'resetting'
  >('idle');
  const [isClicking, setIsClicking] = useState(false);

  const cursorX = useMotionValue(260);
  const cursorY = useMotionValue(200);

  useEffect(() => {
    let timers: ReturnType<typeof setTimeout>[] = [];
    let cancelled = false;

    const wait = (ms: number) => new Promise<void>((r) => timers.push(setTimeout(r, ms)));

    const run = async () => {
      if (cancelled) return;

      // Reset
      setPhase('idle');
      setIsClicking(false);
      cursorX.set(260);
      cursorY.set(200);

      await wait(600);
      if (cancelled) return;

      // Move to "+ Add an agent" button
      setPhase('moving');
      animate(cursorX, 108, { duration: 0.75, ease: [0.4, 0, 0.2, 1] });
      animate(cursorY, 97, { duration: 0.75, ease: [0.4, 0, 0.2, 1] });

      await wait(800);
      if (cancelled) return;

      // Hover
      setPhase('hovering');
      await wait(500);
      if (cancelled) return;

      // Click
      setPhase('clicking');
      setIsClicking(true);
      await wait(200);
      setIsClicking(false);
      if (cancelled) return;

      await wait(200);
      if (cancelled) return;

      // 3rd agent appears
      setPhase('added');

      await wait(400);
      if (cancelled) return;

      // Cursor moves down to new row
      setPhase('cursor-down');
      animate(cursorX, 108, { duration: 0.55, ease: [0.4, 0, 0.2, 1] });
      animate(cursorY, 240, { duration: 0.55, ease: [0.4, 0, 0.2, 1] });

      await wait(2800);
      if (cancelled) return;

      // Reset
      setPhase('resetting');
      animate(cursorX, 260, { duration: 0.6, ease: [0.4, 0, 0.2, 1] });
      animate(cursorY, 200, { duration: 0.6, ease: [0.4, 0, 0.2, 1] });

      await wait(700);
      if (!cancelled) run();
    };

    run();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  const buttonHighlighted = phase === 'hovering' || phase === 'clicking';
  const buttonClicked = phase === 'clicking';
  const showThirdAgent = phase === 'added' || phase === 'cursor-down' || phase === 'resetting';

  return (
    <div
      className="relative bg-white rounded-2xl overflow-hidden select-none"
      style={{ minHeight: 340 }}
    >
      {/* ── Header bar ── */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 border-b border-gray-100">
        <div className="w-8 h-8 rounded-lg bg-[#0078D4]/15 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="2" width="5" height="5" rx="1" fill="#0078D4" />
            <rect x="9" y="2" width="5" height="5" rx="1" fill="#0078D4" opacity="0.6" />
            <rect x="2" y="9" width="5" height="5" rx="1" fill="#0078D4" opacity="0.4" />
            <rect x="9" y="9" width="5" height="5" rx="1" fill="#0078D4" opacity="0.8" />
          </svg>
        </div>
        <span className="text-sm font-semibold text-gray-800">Copilot Studio</span>
      </div>

      {/* ── Agent header ── */}
      <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-100">
        <div className="w-7 h-7 rounded-full bg-[#E8501A] flex items-center justify-center flex-shrink-0">
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path d="M2 9L6 3L10 9" stroke="white" strokeWidth="1.5" fill="none" />
          </svg>
        </div>
        <span className="text-sm font-semibold text-gray-900">Woodfrog - Agent</span>
        <div className="flex-1" />
        <div className="flex gap-4 text-xs text-gray-400">
          <span>Overview</span>
          <span>Knowledge</span>
          <span>Tools</span>
          <span className="text-gray-900 font-semibold border-b-2 border-gray-900 pb-0.5">Agents</span>
          <span className="hidden md:inline">Topics</span>
          <span className="hidden md:inline">Activity</span>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="px-5 py-4 space-y-3">
        {/* Add agent button */}
        <div>
          <motion.div
            animate={{
              backgroundColor: buttonHighlighted ? 'rgba(37,99,235,0.12)' : 'rgba(37,99,235,0.06)',
              borderColor: buttonHighlighted ? 'rgba(37,99,235,0.5)' : 'rgba(37,99,235,0.2)',
              scale: buttonClicked ? 0.95 : 1,
            }}
            transition={{ duration: 0.18 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border rounded-lg text-xs font-medium cursor-pointer"
            style={{ color: '#2563eb' }}
          >
            <span className="text-base leading-none">+</span> Add an agent
          </motion.div>
        </div>

        {/* Column headers */}
        <div className="flex items-center py-1 text-[11px] text-gray-400 font-medium border-b border-gray-100">
          <span className="flex-1">Name</span>
          <span className="w-24 text-center">Relationship</span>
          <span className="w-20 text-center">Trigger</span>
        </div>

        {/* Agents */}
        {AGENTS_INITIAL.map((agent, i) => (
          <div key={i} className="flex items-center border-b border-gray-50 py-2.5">
            <div className="flex items-center gap-2 flex-1">
              <div
                className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: agent.color }}
              >
                <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                  <path d="M2 7L5 3L8 7" stroke="white" strokeWidth="1.2" fill="none" />
                </svg>
              </div>
              <span className="text-sm text-gray-700">{agent.name}</span>
            </div>
            <div className="w-24 flex justify-center">
              <span className="text-xs text-gray-500 flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-full px-2 py-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                Connected
              </span>
            </div>
            <div className="w-20 flex justify-center">
              <span className="text-xs text-gray-400 bg-gray-50 border border-gray-200 rounded-full px-2 py-0.5">By agent</span>
            </div>
          </div>
        ))}

        {/* 3rd agent — animated in */}
        <AnimatePresence>
          {showThirdAgent && (
            <motion.div
              key="agent3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="flex items-center border-b border-gray-50 py-2.5">
                <div className="flex items-center gap-2 flex-1">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.3, type: 'spring', stiffness: 300 }}
                    className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: AGENT_NEW.color }}
                  >
                    <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                      <path d="M2 7L5 3L8 7" stroke="white" strokeWidth="1.2" fill="none" />
                    </svg>
                  </motion.div>
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.18, duration: 0.3 }}
                    className="text-sm text-gray-700"
                  >
                    {AGENT_NEW.name}
                  </motion.span>
                </div>
                <div className="w-24 flex justify-center">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.32, duration: 0.3 }}
                    className="text-xs text-gray-500 flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-full px-2 py-0.5"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.38, duration: 0.25, type: 'spring' }}
                      className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0"
                    />
                    Connected
                  </motion.span>
                </div>
                <div className="w-20 flex justify-center">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.38, duration: 0.3 }}
                    className="text-xs text-gray-400 bg-gray-50 border border-gray-200 rounded-full px-2 py-0.5"
                  >
                    By agent
                  </motion.span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Animated cursor ── */}
      <div className="absolute inset-0 pointer-events-none z-50">
        <CustomCursor x={cursorX} y={cursorY} isClicking={isClicking} />
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, animate, AnimatePresence } from 'framer-motion';
import { CustomCursor } from './automated-assets';

/* ─── Tool icons ─── */
const TeamsIcon = () => (
  <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center shadow-sm">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="2" width="7" height="7" rx="1" fill="#742774" />
      <rect x="11" y="2" width="7" height="7" rx="1" fill="#742774" opacity="0.6" />
      <rect x="2" y="11" width="7" height="7" rx="1" fill="#742774" opacity="0.4" />
      <rect x="11" y="11" width="7" height="7" rx="1" fill="#742774" opacity="0.8" />
    </svg>
  </div>
);

const WoodfrogIcon = () => (
  <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center shadow-sm">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <polygon points="3,17 10,3 17,17" fill="none" stroke="#10B981" strokeWidth="1.8" strokeLinejoin="round" />
      <polygon points="7,17 10,9 13,17" fill="none" stroke="#10B981" strokeWidth="1" opacity="0.4" strokeLinejoin="round" />
    </svg>
  </div>
);

const AgentAvatar = () => (
  <div className="w-7 h-7 rounded-full bg-[#4DA3FF] flex items-center justify-center flex-shrink-0 mt-0.5">
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
      <path d="M2 9L6 3L10 9" stroke="white" strokeWidth="1.5" fill="none" />
    </svg>
  </div>
);

type Stage =
  | 'IDLE'
  | 'CURSOR_TO_INPUT'
  | 'TYPING_INPUT'
  | 'SENDING'
  | 'EXPANDING'
  | 'AGENT_TYPING'
  | 'AGENT_RESPONSE_SHOWN'
  | 'OPTIONS_SHOWN'
  | 'CURSOR_TO_SECOND_INPUT'
  | 'TYPING_SECOND_INPUT'
  | 'COLLAPSING';

export const AgentChatDemo: React.FC = () => {
  const [stage, setStage] = useState<Stage>('IDLE');
  const [isClicking, setIsClicking] = useState(false);
  const [inputText, setInputText] = useState('');
  const [secondInputText, setSecondInputText] = useState('');
  const [showUserMsg, setShowUserMsg] = useState(false);
  const [showAgentLabel, setShowAgentLabel] = useState(false);
  const [showAgentTyping, setShowAgentTyping] = useState(false);
  const [showAgentResponse, setShowAgentResponse] = useState(false);
  const [showBullets, setShowBullets] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const cursorX = useMotionValue(200);
  const cursorY = useMotionValue(200);

  const USER_QUESTION = 'Should I plan for another PO for my Segment A?';
  const SECOND_INPUT = 'Prepare a recommendation for allocating a 2nd PO to Segment A.';

  const bullets = [
    'Current workload of Segment A PO: 145 active items in the backlog, up 25% over the past two months.',
    'Internal comparison: Segment B (similar in size) has 2 POs and a comparable backlog.',
    'Identified risks: delivery delays + overload of the current PO (2 escalations last quarter).',
  ];

  const options = [
    'Maintain the current setup but reduce the scope.',
    'Add a dedicated PO to Segment A to absorb growth.',
    "Reassign part of Segment A's backlog to another team.",
  ];

  useEffect(() => {
    let cancelled = false;
    const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

    const reset = () => {
      setStage('IDLE');
      setInputText('');
      setSecondInputText('');
      setShowUserMsg(false);
      setShowAgentLabel(false);
      setShowAgentTyping(false);
      setShowAgentResponse(false);
      setShowBullets(false);
      setShowOptions(false);
      setExpanded(false);
      setIsClicking(false);
    };

    const run = async () => {
      if (cancelled) return;
      reset();
      await wait(700);
      if (cancelled || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      // Start cursor above center-input area
      cursorX.set(cx - 60);
      cursorY.set(cy - 40);

      await wait(400);
      if (cancelled) return;

      /* ── Move to input (centered) ── */
      setStage('CURSOR_TO_INPUT');
      // Input bar is centered; send cursor to left portion of it
      const inputBarY = cy + 22; // relative to container, input center
      animate(cursorX, cx - 80, { duration: 0.7, ease: 'easeInOut' });
      animate(cursorY, inputBarY, { duration: 0.7, ease: 'easeInOut' });
      await wait(800);
      if (cancelled) return;

      // Click input
      setIsClicking(true);
      await wait(160);
      setIsClicking(false);
      await wait(200);
      if (cancelled) return;

      /* ── Type ── */
      setStage('TYPING_INPUT');
      for (let i = 1; i <= USER_QUESTION.length; i++) {
        if (cancelled) return;
        setInputText(USER_QUESTION.slice(0, i));
        await wait(30);
      }
      await wait(350);
      if (cancelled) return;

      /* ── Move to send ── */
      setStage('SENDING');
      const sendX = cx + 138; // send button right side of centered input
      animate(cursorX, sendX, { duration: 0.45, ease: 'easeInOut' });
      await wait(500);
      if (cancelled) return;

      setIsClicking(true);
      await wait(160);
      setIsClicking(false);
      if (cancelled) return;

      /* ── Expand chat, show user msg ── */
      setStage('EXPANDING');
      setExpanded(true);
      setShowUserMsg(true);
      setInputText('');
      await wait(500);
      if (cancelled) return;

      /* ── Agent typing ── */
      setShowAgentLabel(true);
      setShowAgentTyping(true);
      setStage('AGENT_TYPING');
      await wait(1300);
      if (cancelled) return;

      /* ── Agent response ── */
      setShowAgentTyping(false);
      setShowAgentResponse(true);
      setStage('AGENT_RESPONSE_SHOWN');
      await wait(600);
      if (cancelled) return;

      setShowBullets(true);
      await wait(1800);
      if (cancelled) return;

      setShowOptions(true);
      setStage('OPTIONS_SHOWN');
      await wait(1400);
      if (cancelled) return;

      /* ── Move cursor down to second input bar (expanded bottom) ── */
      setStage('CURSOR_TO_SECOND_INPUT');
      const bottomInputY = rect.height - 50;
      const bottomInputX = cx - 80;
      animate(cursorX, bottomInputX, { duration: 0.7, ease: 'easeInOut' });
      animate(cursorY, bottomInputY, { duration: 0.7, ease: 'easeInOut' });
      await wait(800);
      if (cancelled) return;

      setIsClicking(true);
      await wait(160);
      setIsClicking(false);
      await wait(200);
      if (cancelled) return;

      /* ── Type second message ── */
      setStage('TYPING_SECOND_INPUT');
      for (let i = 1; i <= SECOND_INPUT.length; i++) {
        if (cancelled) return;
        setSecondInputText(SECOND_INPUT.slice(0, i));
        await wait(26);
      }
      await wait(800);
      if (cancelled) return;

      /* ── Collapse back to center ── */
      setStage('COLLAPSING');
      // Move cursor back to center
      animate(cursorX, cx - 60, { duration: 0.7, ease: 'easeInOut' });
      animate(cursorY, cy - 40, { duration: 0.7, ease: 'easeInOut' });
      await wait(400);
      if (cancelled) return;

      // Fade out content then collapse
      setShowOptions(false);
      setShowBullets(false);
      setShowAgentResponse(false);
      setShowAgentLabel(false);
      setShowUserMsg(false);
      await wait(350);
      if (cancelled) return;

      setExpanded(false);
      setSecondInputText('');
      await wait(600);
      if (cancelled) return;

      /* ── Loop ── */
      if (!cancelled) run();
    };

    const t = setTimeout(run, 400);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, []);

  const currentInputText =
    stage === 'TYPING_SECOND_INPUT' || stage === 'CURSOR_TO_SECOND_INPUT'
      ? secondInputText
      : inputText;

  const isTypingCursor =
    stage === 'TYPING_INPUT' || stage === 'TYPING_SECOND_INPUT';

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-white rounded-2xl overflow-hidden select-none"
      style={{ minHeight: 480 }}
    >
      {/* ─── Header icons ─── */}
      <div className="flex items-center gap-2 p-4 pb-2">
        <TeamsIcon />
        <WoodfrogIcon />
      </div>

      {/* ─── Messages area (only visible when expanded) ─── */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            key="messages"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            className="px-4 pb-2 flex flex-col gap-3 overflow-hidden"
          >
            {/* User bubble */}
            <AnimatePresence>
              {showUserMsg && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="self-end"
                >
                  <div className="bg-gray-100 rounded-2xl rounded-tr-sm px-4 py-2.5 text-[12.5px] text-gray-700 max-w-[85%]">
                    {USER_QUESTION}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Agent label */}
            <AnimatePresence>
              {showAgentLabel && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-[10.5px] text-gray-400 font-medium">Agent-01-Woodfrog</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Typing dots */}
            <AnimatePresence>
              {showAgentTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <AgentAvatar />
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-2.5 shadow-sm flex gap-1.5 items-center">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 0.9, delay: i * 0.2 }}
                        className="w-1.5 h-1.5 rounded-full bg-gray-400"
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Agent response */}
            <AnimatePresence>
              {showAgentResponse && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="flex items-start gap-2"
                >
                  <AgentAvatar />
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm p-3.5 shadow-sm flex-1 text-[11.5px] text-gray-600 space-y-1.5">
                    <p className="font-medium text-gray-800 text-[12.5px]">Here&apos;s a summary to help you decide:</p>
                    <div className="space-y-1">
                      {showBullets &&
                        bullets.map((b, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.18, duration: 0.28 }}
                            className="flex items-start gap-1.5"
                          >
                            <span className="text-gray-400 mt-0.5 flex-shrink-0">•</span>
                            <span className="leading-relaxed text-gray-500">{b}</span>
                          </motion.div>
                        ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Options card */}
            <AnimatePresence>
              {showOptions && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="bg-white border border-gray-100 rounded-2xl p-3.5 shadow-sm text-[11.5px] text-gray-600 space-y-1 ml-9"
                >
                  <p className="font-medium text-gray-800 text-[12px]">Possible options:</p>
                  {options.map((opt, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.13, duration: 0.28 }}
                      className="flex items-start gap-1.5"
                    >
                      <span className="text-gray-400 flex-shrink-0">{i + 1}.</span>
                      <span className="text-gray-500 leading-relaxed">{opt}</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Input bar: centered when collapsed, bottom when expanded ─── */}
      <motion.div
        layout
        animate={
          expanded
            ? { position: 'absolute', bottom: 0, left: 0, right: 0, top: 'auto' }
            : { position: 'absolute', bottom: 'auto', left: 0, right: 0, top: '50%' }
        }
        transition={{ duration: 0.45, ease: 'easeInOut' }}
        style={expanded ? {} : { transform: 'translateY(-50%)' }}
        className="px-4 py-3"
      >
        {/* Shadow backdrop when centered */}
        {!expanded && (
          <div className="absolute inset-0 rounded-2xl" />
        )}

        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5">
          <span className="text-[12px] text-gray-500 flex-1 min-h-[18px]">
            {currentInputText || (
              <span className="text-gray-300">Write a new message</span>
            )}
            {isTypingCursor && (
              <span className="inline-block w-0.5 h-3.5 bg-gray-500 ml-0.5 animate-pulse align-middle" />
            )}
          </span>

          {/* Action icons */}
          <div className="flex items-center gap-1.5 text-gray-300 flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 5h3M2 8h6M2 11h4" stroke="#D1D5DB" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M4 10 L7 4 L10 10" stroke="#D1D5DB" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="4.5" stroke="#D1D5DB" strokeWidth="1.2" />
              <path d="M5 7 L6.5 8.5 L9 5.5" stroke="#D1D5DB" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            {/* Send */}
            <motion.div
              animate={stage === 'SENDING' ? { scale: [1, 0.82, 1] } : {}}
              transition={{ duration: 0.28 }}
              className="w-6 h-6 rounded-full bg-[#10B981] flex items-center justify-center shadow"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 8 L8 5 L2 2 L2 4.5 L6 5 L2 5.5 Z" fill="white" />
              </svg>
            </motion.div>
          </div>
        </div>

        {/* cursor label */}
        <div className="flex justify-end mt-1 pr-1">
          <span className="text-[10px] text-gray-300 flex items-center gap-1">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
              <path d="M3 3L10.07 19.97L12.58 12.41L20.14 9.9L3 3Z" fill="#D1D5DB" stroke="#D1D5DB" strokeWidth="1" />
            </svg>
            Production Manager
          </span>
        </div>
      </motion.div>

      {/* ─── Cursor ─── */}
      <div className="absolute inset-0 pointer-events-none z-50">
        <CustomCursor x={cursorX} y={cursorY} isClicking={isClicking} />
      </div>
    </div>
  );
};

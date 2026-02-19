'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, animate, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { CustomCursor } from './AutomatedAssets';

type Screen = 'idle' | 'typing' | 'loading' | 'results' | 'detail';

const SEARCH_TEXT = "Why isn't my Power BI report updating anymore?";

const pageTransition = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.25 } },
};

/* ── Decorative elements ── */
const PowerBIIcon = () => (
  <motion.div
    className="absolute top-16 right-16 w-16 h-16 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center"
    animate={{ y: [0, -8, 0] }}
    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
  >
    <div className="relative">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="14" width="5" height="10" rx="1.5" fill="#e8734a" />
        <rect x="11" y="8" width="5" height="16" rx="1.5" fill="#d4503a" />
        <rect x="18" y="4" width="5" height="20" rx="1.5" fill="#c0392b" />
      </svg>
      <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full border-2 border-amber-600 bg-white flex items-center justify-center">
        <span className="text-amber-600 text-[9px] font-bold">?</span>
      </div>
    </div>
  </motion.div>
);



const AppLogo = () => (
  <motion.div
    className="absolute bottom-16 left-12 w-16 h-16 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center"
    animate={{ y: [0, -10, 0] }}
    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
  >
    <div className="relative">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M6 20L14 6L22 20" stroke="#e8734a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M10 16L14 10L18 16" stroke="#d4503a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
      <div className="absolute -top-2 -right-3 w-5 h-5 rounded-md bg-amber-700 flex items-center justify-center">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  </motion.div>
);


/* ── Wavy line decoration ── */
const WavyDecoration = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {/* Primary flowing wave */}
    <svg className="absolute top-[35%] left-[10%] w-[80%] opacity-[0.15]" viewBox="0 0 600 120" fill="none">
      <path d="M0 60 C80 20, 160 100, 240 60 C320 20, 400 100, 480 60 C560 20, 600 60, 600 60" stroke="#e8734a" strokeWidth="3.5" fill="none" />
      <path d="M0 75 C80 35, 160 115, 240 75 C320 35, 400 115, 480 75 C560 35, 600 75, 600 75" stroke="#f0a090" strokeWidth="2.5" fill="none" />
    </svg>
    {/* Secondary subtle wave lower */}
    <svg className="absolute top-[50%] left-[5%] w-[90%] opacity-[0.08]" viewBox="0 0 600 80" fill="none">
      <path d="M0 40 C100 10, 200 70, 300 40 C400 10, 500 70, 600 40" stroke="#d4503a" strokeWidth="4" fill="none" />
    </svg>
    {/* Subtle radial glow spots */}
    <div className="absolute top-[30%] left-[20%] w-32 h-32 bg-blue-200/20 rounded-full blur-3xl" />
    <div className="absolute top-[45%] right-[20%] w-40 h-40 bg-rose-200/15 rounded-full blur-3xl" />
  </div>
);

/* ── Loading dots ── */
const LoadingDots = () => (
  <div className="flex gap-1.5 items-center">
    {[0, 1, 2, 3].map((i) => (
      <motion.div
        key={i}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
        className="w-1.5 h-1.5 rounded-full bg-amber-700"
      />
    ))}
  </div>
);

/* ── Results screen ── */
const ResultsScreen = () => (
  <div className="absolute inset-0 bg-[#f0ebe0] flex flex-col">
      {/* Header bar */}
      <div className="bg-white border-b border-slate-200/60 px-6 py-3 flex items-center gap-3">
        <div className="w-6 h-6 rounded bg-amber-700/10 flex items-center justify-center">
          <Search size={12} className="text-amber-700" />
        </div>
        <span className="text-[11px] text-slate-500 font-medium flex-1 truncate">
          Results for &ldquo;Why isn&apos;t my Power BI report updating anymore?&rdquo;
        </span>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-[10px] text-slate-400">3 sources found</span>
        </div>
      </div>

      <div className="flex-1 p-5 space-y-3 overflow-hidden">
        {/* Result card 1 */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
              <svg width="16" height="16" viewBox="0 0 28 28" fill="none">
                <rect x="4" y="14" width="5" height="10" rx="1.5" fill="#e8734a" />
                <rect x="11" y="8" width="5" height="16" rx="1.5" fill="#d4503a" />
                <rect x="18" y="4" width="5" height="20" rx="1.5" fill="#c0392b" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-semibold text-slate-800">Data Gateway Connection Lost</p>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">The on-premises data gateway may have gone offline, preventing scheduled refreshes from completing.</p>
              <div className="flex gap-2 mt-2">
                <span className="text-[9px] bg-red-50 text-red-600 px-2 py-0.5 rounded-full font-medium">Critical</span>
                <span className="text-[9px] bg-slate-50 text-slate-500 px-2 py-0.5 rounded-full font-medium">Gateway</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Result card 2 */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#b45309" strokeWidth="2" />
                <path d="M12 7v5l3 3" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-semibold text-slate-800">Scheduled Refresh Expired</p>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">Dataset credentials expired. Re-authenticate with the data source in Power BI Service settings.</p>
              <div className="flex gap-2 mt-2">
                <span className="text-[9px] bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full font-medium">Warning</span>
                <span className="text-[9px] bg-slate-50 text-slate-500 px-2 py-0.5 rounded-full font-medium">Credentials</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Result card 3 */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M4 4h16v16H4z" stroke="#3b82f6" strokeWidth="2" strokeLinejoin="round" />
                <path d="M4 10h16" stroke="#3b82f6" strokeWidth="2" />
                <path d="M10 10v10" stroke="#3b82f6" strokeWidth="2" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-semibold text-slate-800">Capacity Limits Reached</p>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">Premium capacity may be throttling refreshes. Check workspace capacity metrics for overload.</p>
              <div className="flex gap-2 mt-2">
                <span className="text-[9px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">Info</span>
                <span className="text-[9px] bg-slate-50 text-slate-500 px-2 py-0.5 rounded-full font-medium">Capacity</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );

/* ── Detail screen ── */
const DetailScreen = () => (
  <div className="absolute inset-0 bg-[#f0ebe0] flex flex-col">
    <div className="bg-white border-b border-slate-200/60 px-6 py-3 flex items-center gap-3">
      <div className="w-6 h-6 rounded bg-red-50 flex items-center justify-center">
        <svg width="12" height="12" viewBox="0 0 28 28" fill="none">
          <rect x="4" y="14" width="5" height="10" rx="1.5" fill="#e8734a" />
          <rect x="11" y="8" width="5" height="16" rx="1.5" fill="#d4503a" />
          <rect x="18" y="4" width="5" height="20" rx="1.5" fill="#c0392b" />
        </svg>
      </div>
      <span className="text-[12px] text-slate-700 font-semibold">Data Gateway Connection Lost</span>
      <span className="text-[9px] bg-red-50 text-red-600 px-2 py-0.5 rounded-full font-medium ml-auto">Critical</span>
    </div>

    <div className="flex-1 p-6 space-y-5 overflow-hidden">
      {/* Root Cause */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mb-2">Root Cause</p>
        <div className="bg-white rounded-xl p-4 border border-slate-100">
          <p className="text-[11px] text-slate-600 leading-relaxed">
            The on-premises data gateway <span className="font-semibold text-slate-800">GW-PROD-01</span> lost connectivity at <span className="font-semibold text-slate-800">14:32 UTC</span>. 
            This disrupted all scheduled dataset refreshes connected through this gateway.
          </p>
        </div>
      </motion.div>

      {/* Resolution Steps */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mb-2">Resolution Steps</p>
        <div className="space-y-2">
          {[
            'Restart the gateway service on the host machine',
            'Verify network connectivity to Power BI Service',
            'Re-enter data source credentials if prompted',
            'Trigger a manual refresh to confirm recovery',
          ].map((step, i) => (
            <div key={i} className="bg-white rounded-lg px-4 py-2.5 border border-slate-100 flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-amber-700/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[10px] font-bold text-amber-700">{i + 1}</span>
              </div>
              <p className="text-[11px] text-slate-600">{step}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Impact */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
      >
        <div className="flex gap-3">
          <div className="bg-white rounded-xl p-3 border border-slate-100 flex-1 text-center">
            <p className="text-[18px] font-bold text-red-600">12</p>
            <p className="text-[9px] text-slate-400 font-medium mt-0.5">Datasets Affected</p>
          </div>
          <div className="bg-white rounded-xl p-3 border border-slate-100 flex-1 text-center">
            <p className="text-[18px] font-bold text-amber-600">3h</p>
            <p className="text-[9px] text-slate-400 font-medium mt-0.5">Downtime</p>
          </div>
          <div className="bg-white rounded-xl p-3 border border-slate-100 flex-1 text-center">
            <p className="text-[18px] font-bold text-green-600">OK</p>
            <p className="text-[9px] text-slate-400 font-medium mt-0.5">Current Status</p>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
);

/* ── Main component ── */
export const SearchDemo: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('idle');
  const [typedText, setTypedText] = useState('');
  const [isClicking, setIsClicking] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const searchBtnRef = useRef<HTMLButtonElement>(null);
  const resultCardRef = useRef<HTMLDivElement>(null);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const doClick = useCallback(async () => {
    setIsClicking(true);
    await new Promise(r => setTimeout(r, 300));
    setIsClicking(false);
    await new Promise(r => setTimeout(r, 150));
  }, []);

  useEffect(() => {
    let cancelled = false;

    const moveTo = async (x: number, y: number, duration = 1.0) => {
      if (cancelled) return;
      animate(cursorX, x, { duration, ease: [0.25, 0.1, 0.25, 1] });
      animate(cursorY, y, { duration, ease: [0.25, 0.1, 0.25, 1] });
      await new Promise(r => setTimeout(r, duration * 1000 + 200));
    };

    const moveToRef = async (ref: React.RefObject<HTMLElement | null>, duration = 1.0) => {
      if (cancelled || !ref.current || !containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const elRect = ref.current.getBoundingClientRect();
      const x = elRect.left - containerRect.left + elRect.width / 2;
      const y = elRect.top - containerRect.top + elRect.height / 2;
      await moveTo(x, y, duration);
    };

    const wait = async (ms: number) => {
      if (cancelled) return;
      await new Promise(r => setTimeout(r, ms));
    };

    const typeText = async (text: string) => {
      for (let i = 0; i <= text.length; i++) {
        if (cancelled) return;
        setTypedText(text.slice(0, i));
        await new Promise(r => setTimeout(r, 40 + Math.random() * 30));
      }
    };

    const run = async () => {
      if (!containerRef.current || cancelled) return;
      const rect = containerRef.current.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      // Reset
      setScreen('idle');
      setTypedText('');
      setSearchFocused(false);
      cursorX.set(w * 0.6);
      cursorY.set(h * 0.7);

      await wait(1500);
      if (cancelled) return;

      // Step 1: Move to search bar and click
      await moveToRef(searchBarRef, 1.1);
      if (cancelled) return;
      await doClick();
      setSearchFocused(true);
      setScreen('typing');
      await wait(500);
      if (cancelled) return;

      // Step 2: Type search text
      await typeText(SEARCH_TEXT);
      if (cancelled) return;
      await wait(600);

      // Step 3: Move to search button and click
      await moveToRef(searchBtnRef, 0.8);
      if (cancelled) return;
      await doClick();
      setScreen('loading');
      await wait(1800);
      if (cancelled) return;

      // Step 4: Show results
      setScreen('results');
      // Move cursor down to the first result card area
      await wait(600);
      if (cancelled) return;
      await moveTo(w * 0.5, h * 0.38, 1.0);
      await wait(1500);
      if (cancelled) return;

      // Step 5: Click first result
      await moveToRef(resultCardRef, 0.8);
      if (cancelled) return;
      await doClick();
      await wait(400);
      if (cancelled) return;

      // Step 6: Show detail
      setScreen('detail');
      await wait(4000);
      if (cancelled) return;

      // Loop
      if (!cancelled) run();
    };

    const timer = setTimeout(run, 600);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [cursorX, cursorY, doClick]);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden" style={{ fontFamily: 'var(--font-geist-sans)' }}>
      <AnimatePresence mode="wait">
        {/* Idle / Typing / Loading screen */}
          {(screen === 'idle' || screen === 'typing' || screen === 'loading') && (
            <motion.div key="search" className="absolute inset-0 bg-[#f0ebe0]" {...pageTransition}>
              {/* Blurred background elements */}
              <div className="absolute top-[10%] left-[10%] w-[50%] opacity-35 blur-[3px]">
                <div className="bg-white/80 rounded-xl p-4 border border-slate-200/30">
                  <div className="h-2.5 w-36 bg-red-300/50 rounded mb-2.5" />
                  <div className="flex gap-2">
                    <div className="h-6 w-16 bg-slate-200/50 rounded" />
                    <div className="h-6 w-16 bg-amber-200/50 rounded" />
                    <div className="h-6 w-16 bg-red-200/35 rounded" />
                  </div>
                </div>
              </div>


              <PowerBIIcon />
              <AppLogo />


            {/* Search bar */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                ref={searchBarRef}
                className={`bg-white rounded-xl shadow-md border px-5 py-3.5 flex items-center gap-3 transition-all duration-300 ${
                  searchFocused ? 'border-amber-300 shadow-amber-100/50 w-[70%]' : 'border-slate-200 w-[65%]'
                }`}
              >
                {screen === 'loading' ? (
                  <LoadingDots />
                ) : (
                  <div className="flex-1 min-w-0">
                    <span className="text-[13px] text-slate-700 font-medium">
                      {typedText}
                    </span>
                    {screen === 'typing' && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                        className="inline-block w-[1.5px] h-[15px] bg-slate-700 ml-0.5 align-middle"
                      />
                    )}
                    {screen === 'idle' && typedText === '' && (
                      <span className="text-[13px] text-slate-300">Search your knowledge base...</span>
                    )}
                  </div>
                )}
                <button
                  ref={searchBtnRef}
                  className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center shrink-0 hover:bg-slate-50 transition-colors"
                >
                  <Search size={16} className="text-slate-400" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Results screen */}
        {screen === 'results' && (
          <motion.div key="results" className="absolute inset-0" {...pageTransition}>
              <div className="absolute inset-0 bg-[#f0ebe0] flex flex-col">
              {/* Header bar */}
              <div className="bg-white border-b border-slate-200/60 px-6 py-3 flex items-center gap-3">
                <div className="w-6 h-6 rounded bg-amber-700/10 flex items-center justify-center">
                  <Search size={12} className="text-amber-700" />
                </div>
                <span className="text-[11px] text-slate-500 font-medium flex-1 truncate">
                  Results for &ldquo;Why isn&apos;t my Power BI report updating anymore?&rdquo;
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-[10px] text-slate-400">3 sources found</span>
                </div>
              </div>

              <div className="flex-1 p-5 space-y-3 overflow-hidden">
                {/* Result card 1 - clickable */}
                <motion.div
                  ref={resultCardRef}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                      <svg width="16" height="16" viewBox="0 0 28 28" fill="none">
                        <rect x="4" y="14" width="5" height="10" rx="1.5" fill="#e8734a" />
                        <rect x="11" y="8" width="5" height="16" rx="1.5" fill="#d4503a" />
                        <rect x="18" y="4" width="5" height="20" rx="1.5" fill="#c0392b" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-semibold text-slate-800">Data Gateway Connection Lost</p>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">The on-premises data gateway may have gone offline, preventing scheduled refreshes from completing.</p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-[9px] bg-red-50 text-red-600 px-2 py-0.5 rounded-full font-medium">Critical</span>
                        <span className="text-[9px] bg-slate-50 text-slate-500 px-2 py-0.5 rounded-full font-medium">Gateway</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Result card 2 */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="9" stroke="#b45309" strokeWidth="2" />
                        <path d="M12 7v5l3 3" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-semibold text-slate-800">Scheduled Refresh Expired</p>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">Dataset credentials expired. Re-authenticate with the data source in Power BI Service settings.</p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-[9px] bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full font-medium">Warning</span>
                        <span className="text-[9px] bg-slate-50 text-slate-500 px-2 py-0.5 rounded-full font-medium">Credentials</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Result card 3 */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M4 4h16v16H4z" stroke="#3b82f6" strokeWidth="2" strokeLinejoin="round" />
                        <path d="M4 10h16" stroke="#3b82f6" strokeWidth="2" />
                        <path d="M10 10v10" stroke="#3b82f6" strokeWidth="2" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-semibold text-slate-800">Capacity Limits Reached</p>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">Premium capacity may be throttling refreshes. Check workspace capacity metrics for overload.</p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-[9px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">Info</span>
                        <span className="text-[9px] bg-slate-50 text-slate-500 px-2 py-0.5 rounded-full font-medium">Capacity</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Detail screen */}
        {screen === 'detail' && (
          <motion.div key="detail" className="absolute inset-0" {...pageTransition}>
            <DetailScreen />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cursor */}
      <div className="absolute inset-0 pointer-events-none z-[100]">
        <CustomCursor x={cursorX} y={cursorY} isClicking={isClicking} />
      </div>
    </div>
  );
};

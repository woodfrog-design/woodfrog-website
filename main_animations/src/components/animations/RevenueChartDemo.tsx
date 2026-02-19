'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { ANIMATION_THEME } from '@/lib/colors';

const MONTHS = ['Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

const dataSets = [
  [5, 8, 14, 7, 6],
  [3, 2.5, 4, 6, 5],
  [4, 7, 3, 6, 11],
];

const revenueTargets = [14878500, 9245300, 18432100];

const NUM_POINTS = 5;
const MAX_Y = 15;
const PAD = { top: 20, right: 20, bottom: 40, left: 40 };

function toXY(values: number[], w: number, h: number) {
  const cw = w - PAD.left - PAD.right;
  const ch = h - PAD.top - PAD.bottom;
  return values.map((v, i) => ({
    x: PAD.left + (i / (NUM_POINTS - 1)) * cw,
    y: PAD.top + ch - (v / MAX_Y) * ch,
  }));
}

// Catmull-Rom spline → cubic bezier segments
// tension ~0.3 gives smooth, rounded curves like the reference
function splinePath(pts: { x: number; y: number }[]): string {
  if (pts.length < 2) return '';
  const alpha = 0.3;
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const cp1x = p1.x + (p2.x - p0.x) * alpha;
    const cp1y = p1.y + (p2.y - p0.y) * alpha;
    const cp2x = p2.x - (p3.x - p1.x) * alpha;
    const cp2y = p2.y - (p3.y - p1.y) * alpha;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

function areaPath(values: number[], w: number, h: number): string {
  const pts = toXY(values, w, h);
  const baseY = PAD.top + (h - PAD.top - PAD.bottom);
  const curve = splinePath(pts);
  const curveBody = curve.slice(curve.indexOf('C'));
  return `M ${pts[0].x} ${baseY} L ${pts[0].x} ${pts[0].y} ${curveBody} L ${pts[pts.length - 1].x} ${baseY} Z`;
}

function formatRevenue(n: number): string {
  const s = Math.round(n).toString();
  // Format as "X XXX XXX" with space separators
  return s.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function useCountUp(target: number, duration = 1500): number {
  const [value, setValue] = useState(0);
  const startRef = useRef<number | null>(null);
  const prevTarget = useRef(0);

  useEffect(() => {
    const from = prevTarget.current;
    prevTarget.current = target;
    startRef.current = null;

    const step = (ts: number) => {
      if (startRef.current === null) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(from + (target - from) * eased);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);

  return value;
}


export const RevenueChartDemo: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const [spinKey, setSpinKey] = useState(0);
  const W = 360;
  const H = 220;

  const animatedRevenue = useCountUp(revenueTargets[idx]);

  const vals = dataSets[idx];
  const line = splinePath(toXY(vals, W, H));
  const area = areaPath(vals, W, H);
  const pts = toXY(vals, W, H);

  const cw = W - PAD.left - PAD.right;
  const ch = H - PAD.top - PAD.bottom;
  const novX = PAD.left + (3 / (NUM_POINTS - 1)) * cw; // Nov is index 3

  const cycle = useCallback(() => {
    setIdx((p) => (p + 1) % dataSets.length);
    setSpinKey((p) => p + 1);
  }, []);

  useEffect(() => {
    const iv = setInterval(cycle, 3000);
    return () => clearInterval(iv);
  }, [cycle]);

  const yTicks = [0, 5, 10, 15];
  const ease = [0.4, 0, 0.2, 1] as const;
  const dur = 1.2;

  return (
    <div className="relative w-full h-full bg-white flex items-center justify-center overflow-hidden" style={{ fontFamily: 'var(--font-geist-sans)' }}>
      <div className="w-[400px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-1 px-2">
          <div>
            <p className="text-[12px] font-semibold tracking-wide" style={{ color: ANIMATION_THEME.primary }}>Revenues</p>
            <p className="text-[28px] font-bold text-slate-900 leading-tight tracking-tight" style={{ fontVariantNumeric: 'tabular-nums' }}>
              ${formatRevenue(animatedRevenue)}
            </p>
            <p className="text-[11px] font-medium mt-0.5" style={{ color: ANIMATION_THEME.accent.success }}>
              vs $12 675 450 last year
            </p>
          </div>
          <motion.div
            key={spinKey}
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="w-9 h-9 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
            onClick={cycle}
          >
            <RefreshCw size={15} strokeWidth={2.5} />
          </motion.div>
        </div>

        {/* Chart */}
        <div className="mt-3 bg-white rounded-xl border border-slate-100 p-2 shadow-sm">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ overflow: 'visible' }}>
            {/* Y grid + labels */}
            {yTicks.map((tick) => {
              const y = PAD.top + ch - (tick / MAX_Y) * ch;
              return (
                <g key={tick}>
                  <line x1={PAD.left} y1={y} x2={W - PAD.right} y2={y} stroke="#f1f5f9" strokeWidth={1} />
                  <text x={PAD.left - 8} y={y + 3} textAnchor="end" fill="#94a3b8" fontSize={9} fontWeight={500}>
                    {tick === 0 ? '0' : `${tick}M`}
                  </text>
                </g>
              );
            })}

            {/* X labels */}
            {MONTHS.map((label, i) => {
              const x = PAD.left + (i / (NUM_POINTS - 1)) * cw;
              return (
                <text key={label} x={x} y={H - 10} textAnchor="middle" fill="#94a3b8" fontSize={9} fontWeight={500}>
                  {label}
                </text>
              );
            })}

            {/* Vertical Nov reference line */}
            <line x1={novX} y1={PAD.top} x2={novX} y2={PAD.top + ch} stroke="#cbd5e1" strokeWidth={1} strokeDasharray="3 3" />

            {/* Area fill */}
            <motion.path
              d={area}
              fill="url(#revenueGrad)"
              animate={{ d: area }}
              transition={{ duration: dur, ease }}
            />

            {/* Main line */}
            <motion.path
              d={line}
              fill="none"
              stroke={ANIMATION_THEME.primary}
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{ d: line }}
              transition={{ duration: dur, ease }}
            />



            {/* Data point dots */}
            {pts.map((p, i) => (
              <motion.circle
                key={`dot-${i}`}
                r={4}
                fill="white"
                stroke={ANIMATION_THEME.primary}
                strokeWidth={2}
                animate={{ cx: p.x, cy: p.y }}
                transition={{ duration: dur, ease }}
              />
            ))}

            <defs>
              <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={ANIMATION_THEME.primary} stopOpacity={0.25} />
                <stop offset="70%" stopColor={ANIMATION_THEME.primary} stopOpacity={0.05} />
                <stop offset="100%" stopColor={ANIMATION_THEME.primary} stopOpacity={0} />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};

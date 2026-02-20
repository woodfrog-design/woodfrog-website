'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

// Brand / tool colors
const BRAND = '#f9dc66';
const BRAND_DARK = '#b8860b';
const DARK_BG = '#1a1a2e';

/* ─── Shared icon SVGs (Microsoft tools) ───────────────────────────── */

// Microsoft Fabric
const FabricIcon = ({ size = 32 }: { size?: number }) => (
  <img src="/logos/tools17.svg" width={size} height={size} alt="Data Platform" className="object-contain" />
);

// Power BI
const PowerBIIcon = ({ size = 32 }: { size?: number }) => (
  <img src="/logos/image7.svg" width={size} height={size} alt="Analytics Platform" className="object-contain" />
);

// Fivetran
const FivetranIcon = ({ size = 32 }: { size?: number }) => (
  <img src="/logos/tools18.svg" width={size} height={size} alt="Data Integration" className="object-contain" />
);

// Azure DevOps
const AzureDevOpsIcon = ({ size = 32 }: { size?: number }) => (
  <img src="/logos/tools19.svg" width={size} height={size} alt="DevOps Platform" className="object-contain" />
);

// Power Automate
const PowerAutomateIcon = ({ size = 32 }: { size?: number }) => (
  <img src="/logos/tools20.svg" width={size} height={size} alt="Workflow Automation" className="object-contain" />
);

// SQL Server / Azure SQL
const SQLServerIcon = ({ size = 32 }: { size?: number }) => (
  <img src="/logos/tools21.svg" width={size} height={size} alt="Database" className="object-contain" />
);

// Microsoft Synapse
const SynapseIcon = ({ size = 32 }: { size?: number }) => (
  <img src="/logos/tools22.svg" width={size} height={size} alt="Modern Data Platform" className="object-contain" />
);

// Microsoft Purview / Shield
const PurviewIcon = ({ size = 32 }: { size?: number }) => (
  <img src="/logos/tools23.svg" width={size} height={size} alt="Governance Service" className="object-contain" />
);

// OneLake / Data Lake
const DataLakeIcon = ({ size = 32 }: { size?: number }) => (
  <img src="/logos/tools24.svg" width={size} height={size} alt="Cloud Storage Service" className="object-contain" />
);

// Power Apps
const PowerAppsIcon = ({ size = 32 }: { size?: number }) => (
  <img src="/logos/tools25.svg" width={size} height={size} alt="Application Platform" className="object-contain" />
);

/* ─── Tool Card ─────────────────────────────────────────────────────── */
const ToolCard = ({
  icon,
  label,
  delay = 0,
  highlighted = false,
  animate: shouldAnimate = true,
}: {
  icon: React.ReactNode;
  label?: string;
  delay?: number;
  highlighted?: boolean;
  animate?: boolean;
}) => (
  <motion.div
    initial={shouldAnimate ? { opacity: 0, scale: 0.85, y: 8 } : {}}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    className="flex flex-col items-center gap-1.5"
  >
    <div
      className={`relative rounded-xl flex items-center justify-center shadow-md transition-all ${highlighted
        ? 'shadow-yellow-200/50 ring-2 ring-yellow-300/60'
        : 'shadow-black/5'
        }`}
      style={{
        width: 56,
        height: 56,
        background: highlighted ? 'linear-gradient(135deg, #fffbe6, #fff9d4)' : 'white',
        border: highlighted ? '1.5px solid #f9dc6660' : '1.5px solid #e2e8f0',
      }}
    >
      {highlighted && (
        <motion.div
          className="absolute inset-0 rounded-xl"
          style={{ background: 'radial-gradient(ellipse at 60% 30%, #f9dc6630 0%, transparent 70%)' }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      )}
      {icon}
    </div>
    {label && (
      <span className="text-[9px] font-semibold text-slate-500 tracking-wide text-center leading-tight max-w-[60px]">{label}</span>
    )}
  </motion.div>
);

/* ─── Animated Arrow ────────────────────────────────────────────────── */
const AnimArrow = ({
  direction = 'right',
  delay = 0,
  color = '#94a3b8',
  dashed = false,
}: {
  direction?: 'right' | 'left' | 'down' | 'up';
  delay?: number;
  color?: string;
  dashed?: boolean;
}) => {
  const isHorizontal = direction === 'right' || direction === 'left';
  const isReverse = direction === 'left' || direction === 'up';
  return (
    <div className={`flex items-center justify-center ${isHorizontal ? 'px-1' : 'py-1 flex-col'}`} style={{ minWidth: isHorizontal ? 28 : undefined, minHeight: !isHorizontal ? 28 : undefined }}>
      <motion.svg
        width={isHorizontal ? 28 : 12}
        height={isHorizontal ? 12 : 28}
        viewBox={isHorizontal ? '0 0 28 12' : '0 0 12 28'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay, duration: 0.3 }}
      >
        {isHorizontal ? (
          <>
            <motion.line
              x1={isReverse ? '24' : '2'} y1="6"
              x2={isReverse ? '4' : '22'} y2="6"
              stroke={color} strokeWidth="1.5"
              strokeDasharray={dashed ? '4 3' : undefined}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: delay + 0.1, duration: 0.4, ease: 'easeOut' }}
            />
            <motion.polygon
              points={isReverse ? '6,3 0,6 6,9' : '22,3 28,6 22,9'}
              fill={color}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay + 0.4 }}
            />
          </>
        ) : (
          <>
            <motion.line
              x1="6" y1={isReverse ? '24' : '2'}
              x2="6" y2={isReverse ? '4' : '22'}
              stroke={color} strokeWidth="1.5"
              strokeDasharray={dashed ? '4 3' : undefined}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: delay + 0.1, duration: 0.4, ease: 'easeOut' }}
            />
            <motion.polygon
              points={isReverse ? '3,6 6,0 9,6' : '3,22 6,28 9,22'}
              fill={color}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay + 0.4 }}
            />
          </>
        )}
      </motion.svg>
    </div>
  );
};

/* ─── Floating Dot ─────────────────────────────────────────────────── */
const FloatingDot = ({ delay = 0, color = BRAND }: { delay?: number; color?: string }) => (
  <motion.div
    className="absolute w-1.5 h-1.5 rounded-full"
    style={{ backgroundColor: color }}
    animate={{
      y: [-3, 3, -3],
      opacity: [0.4, 1, 0.4],
    }}
    transition={{ duration: 2.5, repeat: Infinity, delay, ease: 'easeInOut' }}
  />
);

/* ─── Pulse Ring ───────────────────────────────────────────────────── */
const PulseRing = ({ color = BRAND, delay = 0 }: { color?: string; delay?: number }) => (
  <motion.div
    className="absolute inset-0 rounded-xl border-2"
    style={{ borderColor: color }}
    animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0, 0.6] }}
    transition={{ duration: 2.5, repeat: Infinity, delay, ease: 'easeInOut' }}
  />
);

/* ─── Data Packet ──────────────────────────────────────────────────── */
const DataPacket = ({
  fromX, fromY, toX, toY,
  delay = 0,
  color = BRAND,
  size = 6,
}: {
  fromX: number; fromY: number;
  toX: number; toY: number;
  delay?: number; color?: string; size?: number;
}) => (
  <motion.div
    className="absolute rounded-full z-20 pointer-events-none"
    style={{
      width: size, height: size,
      backgroundColor: color,
      boxShadow: `0 0 6px ${color}80`,
      left: fromX - size / 2,
      top: fromY - size / 2,
    }}
    animate={{
      left: [fromX - size / 2, toX - size / 2],
      top: [fromY - size / 2, toY - size / 2],
      opacity: [0, 1, 1, 0],
    }}
    transition={{
      duration: 1.6,
      delay,
      repeat: Infinity,
      repeatDelay: 1.5,
      ease: 'easeInOut',
    }}
  />
);

/* ─── Wrapper ──────────────────────────────────────────────────────── */
const IllustrationWrap = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: '-10% 0px -10% 0px' });
  return (
    <div
      ref={ref}
      className="relative w-full h-full min-h-[260px] flex items-center justify-center overflow-hidden"
      style={{ background: '#f8f9fa', borderRadius: 'inherit' }}
    >
      <AnimatePresence mode="wait">
        {inView ? (
          <motion.div
            key="visible"
            className="w-full h-full flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        ) : (
          <motion.div key="hidden" className="w-full h-full" />
        )}
      </AnimatePresence>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════ */
/*  1. CI/CD - Continuous Integration / Deployment                    */
/* ═══════════════════════════════════════════════════════════════════ */
export const CICDIllustration = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setStep(s => (s + 1) % 4), 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <IllustrationWrap>
      <div className="flex flex-col items-center gap-6 w-full px-8 py-6">
        {/* Top: tool icons */}
        <div className="flex items-center gap-8 justify-center">
          <ToolCard icon={<AzureDevOpsIcon size={30} />} label="DevOps" delay={0} highlighted={step >= 0} />
          <ToolCard icon={<PowerBIIcon size={30} />} label="Analytics" delay={0.1} highlighted={step >= 2} />
        </div>

        {/* Main CI/CD flow */}
        <div className="flex items-center gap-3 relative">
          {/* CI box */}
          <motion.div
            className="relative flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold shadow-lg"
            style={{
              background: step === 1 || step === 0
                ? 'linear-gradient(135deg, #2d1b0e, #4a2c0a)'
                : 'linear-gradient(135deg, #3d2b1a, #5a3c0a)',
              color: '#fff',
              border: '1.5px solid #7a5c2a',
            }}
            animate={{
              boxShadow: step === 0 || step === 1
                ? ['0 4px 20px #f9dc6640', '0 8px 30px #f9dc6680', '0 4px 20px #f9dc6640']
                : ['0 4px 20px #f9dc6620'],
            }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            {step === 0 || step === 1 ? <PulseRing color={BRAND} /> : null}
            <span>Continuous Integration</span>
            <span
              className="ml-1 text-[10px] rounded px-1.5 py-0.5 font-bold"
              style={{ background: 'rgba(249,220,102,0.2)', color: BRAND }}
            >
              CI
            </span>
          </motion.div>

          {/* Arrow with packet */}
          <div className="relative flex items-center">
            <AnimArrow direction="right" delay={0.3} color="#f9dc66" />
            <motion.div
              className="absolute top-1/2 -translate-y-1/2"
              style={{ left: 0 }}
              animate={{ left: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1.8, delay: 0.4 }}
            >
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: BRAND, boxShadow: `0 0 8px ${BRAND}` }} />
            </motion.div>
          </div>

          {/* CD box */}
          <motion.div
            className="relative flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold shadow-lg"
            style={{
              background: step >= 2
                ? 'linear-gradient(135deg, #3d4a0a, #5a6a0a)'
                : 'linear-gradient(135deg, #2a2d18, #3a400a)',
              color: '#fff',
              border: '1.5px solid #7a8c2a',
            }}
            animate={{
              boxShadow: step >= 2
                ? ['0 4px 20px #b8d40040', '0 8px 30px #b8d40080', '0 4px 20px #b8d40040']
                : ['0 4px 20px #b8d40020'],
            }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            {step >= 2 ? <PulseRing color="#b8d400" delay={0.5} /> : null}
            <span>Continuous Deployment</span>
            <span
              className="ml-1 text-[10px] rounded px-1.5 py-0.5 font-bold"
              style={{ background: 'rgba(184,212,0,0.2)', color: '#b8d400' }}
            >
              CD
            </span>
          </motion.div>
        </div>

        {/* Bottom: Fabric & Fivetran */}
        <div className="flex items-center gap-8 justify-center">
          <ToolCard icon={<FabricIcon size={30} />} label="Data Platform" delay={0.2} highlighted={step >= 3} />
          <ToolCard icon={<FivetranIcon size={30} />} label="Integration" delay={0.3} highlighted={step >= 1} />
        </div>
      </div>
    </IllustrationWrap>
  );
};

/* ═══════════════════════════════════════════════════════════════════ */
/*  2. Architectures - Data flow from analyst to outputs              */
/* ═══════════════════════════════════════════════════════════════════ */
export const ArchitectureIllustration = () => {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep(s => (s + 1) % 5), 1600);
    return () => clearInterval(t);
  }, []);

  const nodes = [
    { icon: <SQLServerIcon size={26} />, label: 'Database', x: 80, y: 100 },
    { icon: <FivetranIcon size={26} />, label: 'Integration', x: 200, y: 60 },
    { icon: <FabricIcon size={26} />, label: 'Data Platform', x: 300, y: 100 },
    { icon: <PowerBIIcon size={26} />, label: 'Analytics', x: 420, y: 60 },
  ];

  return (
    <IllustrationWrap>
      <div className="w-full px-6 py-6 flex flex-col gap-5">
        {/* Analyst label */}
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold"
            style={{ background: BRAND, color: '#1a1a00' }}
          >
            K
          </div>
          <span className="text-xs font-semibold text-slate-500">Data analyst</span>
          <motion.div
            className="w-4 h-4 rounded-sm ml-1 flex items-center justify-center"
            style={{ background: BRAND + '40', border: `1px solid ${BRAND}` }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span className="text-[8px]" style={{ color: BRAND }}>+</span>
          </motion.div>
        </div>

        {/* Pipeline row */}
        <div className="flex items-center justify-center gap-0 flex-wrap">
          {nodes.map((node, i) => (
            <React.Fragment key={node.label}>
              <motion.div
                className="flex flex-col items-center gap-1.5"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: step >= i ? 1 : 0.9, filter: step >= i ? 'none' : 'grayscale(60%)' }}
                transition={{ delay: i * 0.12, duration: 0.4 }}
              >
                <div
                  className="rounded-xl flex items-center justify-center shadow-sm"
                  style={{
                    width: 52, height: 52,
                    background: step >= i ? 'white' : '#f1f5f9',
                    border: step >= i ? `1.5px solid ${BRAND}80` : '1.5px solid #e2e8f0',
                    boxShadow: step >= i ? `0 4px 16px ${BRAND}30` : 'none',
                  }}
                >
                  {node.icon}
                </div>
                <span className="text-[9px] font-semibold text-slate-500">{node.label}</span>
              </motion.div>
              {i < nodes.length - 1 && (
                <AnimArrow
                  direction={i % 2 === 0 ? 'right' : 'left'}
                  delay={i * 0.12 + 0.2}
                  color={step > i ? BRAND : '#cbd5e1'}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Empty dashed "add source" card */}
        <motion.div
          className="self-center flex items-center gap-2 px-4 py-2 rounded-xl border-dashed border text-xs text-slate-400 font-medium"
          style={{ borderColor: '#cbd5e1' }}
          animate={{ borderColor: [BRAND + '40', '#cbd5e1', BRAND + '40'] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <span className="text-base leading-none">+</span>
          Add source
        </motion.div>
      </div>
    </IllustrationWrap>
  );
};

/* ═══════════════════════════════════════════════════════════════════ */
/*  3. Automation - Hub & spoke (Azure Functions center)              */
/* ═══════════════════════════════════════════════════════════════════ */
export const AutomationIllustration = () => {
  const [activeSpoke, setActiveSpoke] = useState(0);
  const spokes = [
    { icon: <FivetranIcon size={22} />, label: 'Integration', angle: 210, dist: 100 },
    { icon: <PowerAutomateIcon size={22} />, label: 'Workflow Automation', angle: 270, dist: 100 },
    { icon: <FivetranIcon size={22} />, label: 'Integration 2', angle: 330, dist: 100 },
    { icon: <FabricIcon size={22} />, label: 'Data Platform', angle: 30, dist: 100 },
    { icon: <PowerAppsIcon size={22} />, label: 'Application Platform', angle: 90, dist: 100 },
    { icon: <FabricIcon size={22} />, label: 'Data Platform 2', angle: 150, dist: 100 },
  ];

  useEffect(() => {
    const t = setInterval(() => setActiveSpoke(s => (s + 1) % spokes.length), 1200);
    return () => clearInterval(t);
  }, []);

  return (
    <IllustrationWrap>
      <div className="relative" style={{ width: 280, height: 280 }}>
        {/* Spoke lines */}
        {spokes.map((spoke, i) => {
          const rad = (spoke.angle * Math.PI) / 180;
          const cx = 140, cy = 140;
          const endX = cx + Math.cos(rad) * spoke.dist;
          const endY = cy + Math.sin(rad) * spoke.dist;
          const isActive = activeSpoke === i;
          return (
            <svg
              key={i}
              className="absolute inset-0 pointer-events-none"
              width="280" height="280"
              style={{ zIndex: 0 }}
            >
              <motion.line
                x1={cx} y1={cy} x2={endX} y2={endY}
                stroke={isActive ? BRAND : '#d4b896'}
                strokeWidth={isActive ? 1.8 : 1}
                strokeDasharray="4 3"
                animate={{ opacity: isActive ? 1 : 0.5 }}
                transition={{ duration: 0.3 }}
              />
              {/* Travelling dot */}
              {isActive && (
                <motion.circle
                  r="4"
                  fill={BRAND}
                  style={{ filter: `drop-shadow(0 0 4px ${BRAND})` }}
                  animate={{
                    cx: [cx, endX, cx],
                    cy: [cy, endY, cy],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.2 }}
                />
              )}
              {/* Corner dots */}
              <motion.circle
                cx={endX} cy={endY} r={isActive ? 4.5 : 3}
                fill={isActive ? BRAND : '#c9a87a'}
                animate={{ scale: isActive ? [1, 1.3, 1] : 1 }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </svg>
          );
        })}

        {/* Center hub - Azure Functions */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center gap-2 px-4 py-3 rounded-2xl shadow-xl"
          style={{
            background: 'white',
            border: `1.5px solid ${BRAND}80`,
            minWidth: 140,
            boxShadow: `0 8px 32px ${BRAND}40`,
          }}
          animate={{ boxShadow: [`0 8px 32px ${BRAND}30`, `0 8px 40px ${BRAND}60`, `0 8px 32px ${BRAND}30`] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <FabricIcon size={22} />
          <div>
            <div className="text-[9px] text-slate-400 font-semibold">General</div>
            <div className="text-[11px] font-bold text-slate-700">Cloud Functions</div>
          </div>
        </motion.div>

        {/* Spoke icons */}
        {spokes.map((spoke, i) => {
          const rad = (spoke.angle * Math.PI) / 180;
          const cx = 140, cy = 140;
          const x = cx + Math.cos(rad) * spoke.dist;
          const y = cy + Math.sin(rad) * spoke.dist;
          const isActive = activeSpoke === i;
          return (
            <motion.div
              key={i}
              className="absolute z-10 rounded-xl flex items-center justify-center shadow-sm"
              style={{
                width: 42, height: 42,
                left: x - 21, top: y - 21,
                background: isActive ? 'white' : '#f8f9fa',
                border: isActive ? `1.5px solid ${BRAND}` : '1.5px solid #e2e8f0',
                boxShadow: isActive ? `0 4px 16px ${BRAND}40` : 'none',
              }}
              animate={{ scale: isActive ? 1.12 : 1 }}
              transition={{ duration: 0.3 }}
            >
              {spoke.icon}
            </motion.div>
          );
        })}
      </div>
    </IllustrationWrap>
  );
};

/* ═══════════════════════════════════════════════════════════════════ */
/*  4. Data Modeling - Star schema with connecting nodes              */
/* ═══════════════════════════════════════════════════════════════════ */
export const DataModelingIllustration = () => {
  const [pulse, setPulse] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setPulse(p => (p + 1) % 5), 1500);
    return () => clearInterval(t);
  }, []);

  const GridIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="9" height="9" rx="2" stroke="#b8860b" strokeWidth="1.5" fill="none" />
      <rect x="13" y="2" width="9" height="9" rx="2" stroke="#b8860b" strokeWidth="1.5" fill="none" />
      <rect x="2" y="13" width="9" height="9" rx="2" stroke="#b8860b" strokeWidth="1.5" fill="none" />
      <rect x="13" y="13" width="9" height="9" rx="2" stroke="#b8860b" strokeWidth="1.5" fill="none" />
    </svg>
  );

  const satellites = [
    { angle: 0, label: 'Fact A' },
    { angle: 72, label: 'Fact B' },
    { angle: 144, label: 'Fact C' },
    { angle: 216, label: 'Dim A' },
    { angle: 288, label: 'Dim B' },
  ];

  return (
    <IllustrationWrap>
      <div className="relative" style={{ width: 320, height: 280 }}>
        {/* Center: Transactional Systems node */}
        <motion.div
          className="absolute z-10 flex items-center gap-2 px-3 py-2.5 rounded-xl shadow-lg"
          style={{
            left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            border: `1.5px solid ${BRAND}`,
            minWidth: 140,
            boxShadow: `0 6px 24px ${BRAND}30`,
          }}
        >
          <GridIcon />
          <span className="text-[11px] font-bold text-slate-700">Transactional Systems</span>
        </motion.div>

        {/* Power BI top-right */}
        <motion.div
          className="absolute z-10 rounded-xl flex items-center justify-center shadow-sm"
          style={{
            width: 52, height: 52,
            right: 20, top: 20,
            background: pulse === 4 ? 'white' : '#fefce8',
            border: `1.5px solid ${pulse === 4 ? BRAND : BRAND + '50'}`,
            boxShadow: pulse === 4 ? `0 4px 16px ${BRAND}50` : 'none',
          }}
          animate={{ scale: pulse === 4 ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <PowerBIIcon size={28} />
        </motion.div>

        {/* Satellite grid cards */}
        {satellites.map((sat, i) => {
          const rad = (sat.angle * Math.PI) / 180;
          const dist = 105;
          const cx = 160, cy = 140;
          const x = cx + Math.cos(rad) * dist;
          const y = cy + Math.sin(rad) * dist;
          const isActive = pulse === i;
          return (
            <React.Fragment key={i}>
              {/* Line */}
              <svg className="absolute inset-0 pointer-events-none" width="320" height="280">
                <motion.line
                  x1={cx} y1={cy} x2={x} y2={y}
                  stroke={isActive ? BRAND : '#e25d3e80'}
                  strokeWidth={isActive ? 1.8 : 1}
                  strokeDasharray="5 4"
                  animate={{ opacity: isActive ? 1 : 0.5 }}
                />
                {isActive && (
                  <motion.circle
                    r="4"
                    fill={BRAND}
                    style={{ filter: `drop-shadow(0 0 3px ${BRAND})` }}
                    animate={{
                      cx: [cx, x],
                      cy: [cy, y],
                      opacity: [0, 1, 0],
                    }}
                    transition={{ duration: 0.9, repeat: Infinity }}
                  />
                )}
                <motion.polygon
                  transform={`translate(${x},${y}) rotate(${sat.angle + 90})`}
                  points="-3,4 0,-4 3,4"
                  fill={isActive ? BRAND : '#e25d3e80'}
                />
              </svg>
              {/* Card */}
              <motion.div
                className="absolute z-10 flex items-center justify-center rounded-lg shadow-sm"
                style={{
                  width: 38, height: 38,
                  left: x - 19, top: y - 19,
                  background: 'white',
                  border: `1.5px solid ${isActive ? BRAND : '#e25d3e50'}`,
                  boxShadow: isActive ? `0 4px 12px ${BRAND}40` : 'none',
                }}
                animate={{ scale: isActive ? 1.15 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <GridIcon />
              </motion.div>
            </React.Fragment>
          );
        })}
      </div>
    </IllustrationWrap>
  );
};

/* ═══════════════════════════════════════════════════════════════════ */
/*  5. Data Archiving - Lines to data lake/storage icons              */
/* ═══════════════════════════════════════════════════════════════════ */
export const ArchivingIllustration = () => {
  const [wave, setWave] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setWave(w => (w + 1) % 4), 1200);
    return () => clearInterval(t);
  }, []);

  const corners = [
    { x: 24, y: 24 }, { x: 260, y: 24 },
    { x: 24, y: 220 }, { x: 260, y: 220 },
  ];

  return (
    <IllustrationWrap>
      <div className="relative" style={{ width: 300, height: 260 }}>
        {/* Corner dots */}
        {corners.map((c, i) => (
          <React.Fragment key={i}>
            <svg className="absolute inset-0 pointer-events-none" width="300" height="260">
              {/* Lines to center */}
              <motion.line
                x1={c.x} y1={c.y} x2={150} y2={130}
                stroke={wave === i ? BRAND : '#b8a07050'}
                strokeWidth={wave === i ? 1.8 : 1}
                animate={{ opacity: wave === i ? 1 : 0.5 }}
              />
              {wave === i && (
                <motion.circle
                  r="4"
                  fill={BRAND}
                  style={{ filter: `drop-shadow(0 0 4px ${BRAND})` }}
                  animate={{ cx: [c.x, 150], cy: [c.y, 130], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 0.9, repeat: Infinity }}
                />
              )}
              <circle cx={c.x} cy={c.y} r={wave === i ? 5 : 3} fill={wave === i ? BRAND : '#b8a07080'} />
            </svg>
          </React.Fragment>
        ))}

        {/* Center: two storage cards */}
        <div
          className="absolute flex items-center gap-3"
          style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
        >
          <motion.div
            className="rounded-xl flex items-center justify-center shadow-md"
            style={{
              width: 60, height: 60,
              background: 'white',
              border: `1.5px solid ${BRAND}60`,
              boxShadow: `0 6px 20px ${BRAND}30`,
            }}
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <DataLakeIcon size={32} />
          </motion.div>
          <motion.div
            className="rounded-xl flex items-center justify-center shadow-md"
            style={{
              width: 60, height: 60,
              background: 'white',
              border: `1.5px solid ${BRAND}60`,
              boxShadow: `0 6px 20px ${BRAND}20`,
            }}
            animate={{ y: [0, 3, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          >
            <FivetranIcon size={32} />
          </motion.div>
        </div>
      </div>
    </IllustrationWrap>
  );
};

/* ═══════════════════════════════════════════════════════════════════ */
/*  6. Data Security - Lock icons with scanning animation             */
/* ═══════════════════════════════════════════════════════════════════ */
export const SecurityIllustration = () => {
  const [scanning, setScanning] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setScanning(s => (s + 1) % 4), 1400);
    return () => clearInterval(t);
  }, []);

  const LockIcon = ({ locked = true, size = 16 }: { locked?: boolean; size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <rect x="3" y="9" width="14" height="10" rx="2.5" fill={locked ? '#e25d3e' : '#94a3b8'} opacity={locked ? 0.8 : 0.4} />
      <path
        d={locked ? 'M6 9V6a4 4 0 0 1 8 0v3' : 'M6 9V6a4 4 0 0 1 8 0v3'}
        stroke={locked ? '#e25d3e' : '#94a3b8'}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        opacity={locked ? 1 : 0.4}
      />
    </svg>
  );

  const secureCards = [
    { icon: <FabricIcon size={24} />, locked: true },
    { icon: <FivetranIcon size={24} />, locked: true },
    { icon: <DataLakeIcon size={24} />, locked: true },
    { icon: <PowerBIIcon size={24} />, locked: false },
  ];

  return (
    <IllustrationWrap>
      <div className="flex flex-col items-center gap-5 w-full px-8 py-6">
        {/* Scan line indicator */}
        <div className="w-full max-w-xs relative h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full rounded-full"
            style={{ background: `linear-gradient(to right, ${BRAND}, #e25d3e)` }}
            animate={{ width: [`${(scanning / 4) * 100}%`, `${((scanning + 1) / 4) * 100}%`] }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>

        {/* Cards row */}
        <div className="flex items-end gap-4 justify-center">
          {/* Half-visible card left */}
          <motion.div
            className="rounded-xl flex items-center justify-center opacity-40"
            style={{ width: 52, height: 52, background: 'white', border: '1.5px solid #e2e8f0' }}
          >
            <SynapseIcon size={26} />
          </motion.div>

          {secureCards.map((card, i) => (
            <motion.div
              key={i}
              className="relative flex flex-col items-center gap-1.5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <motion.div
                className="rounded-xl flex items-center justify-center shadow-sm"
                style={{
                  width: 56, height: 56,
                  background: 'white',
                  border: scanning === i && card.locked ? `1.5px solid ${BRAND}` : '1.5px solid #e2e8f0',
                  boxShadow: scanning === i ? `0 4px 16px ${BRAND}40` : 'none',
                }}
                animate={{ scale: scanning === i ? 1.08 : 1 }}
                transition={{ duration: 0.3 }}
              >
                {card.icon}
                <div className="absolute -top-2 -right-2">
                  <LockIcon locked={card.locked} size={16} />
                </div>
              </motion.div>
            </motion.div>
          ))}

          {/* Half-visible card right */}
          <motion.div
            className="rounded-xl flex items-center justify-center opacity-40"
            style={{ width: 52, height: 52, background: 'white', border: '1.5px solid #e2e8f0' }}
          >
            <PowerBIIcon size={26} />
          </motion.div>
        </div>

        {/* Shield badge */}
        <motion.div
          className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold"
          style={{
            background: '#fff7ed',
            border: '1.5px solid #e25d3e50',
            color: '#e25d3e',
          }}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <PurviewIcon size={16} />
          Enterprise-grade security
        </motion.div>
      </div>
    </IllustrationWrap>
  );
};

/* ═══════════════════════════════════════════════════════════════════ */
/*  7. Synapse → Fabric Migration                                     */
/* ═══════════════════════════════════════════════════════════════════ */
export const MigrationIllustration = () => {
  const [migStep, setMigStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setMigStep(s => (s + 1) % 5), 1400);
    return () => clearInterval(t);
  }, []);

  const steps = ['Assess', 'Plan', 'Migrate', 'Validate', 'Done'];

  return (
    <IllustrationWrap>
      <div className="flex flex-col items-center gap-6 w-full px-8 py-6">
        {/* Source → Target */}
        <div className="flex items-center gap-4 justify-center">
          <div className="flex flex-col items-center gap-1.5">
            <motion.div
              className="relative rounded-xl flex items-center justify-center shadow-md"
              style={{ width: 64, height: 64, background: 'white', border: '1.5px solid #9b59b6' }}
              animate={{ opacity: migStep >= 3 ? 0.5 : 1 }}
            >
              <SynapseIcon size={34} />
              <span className="absolute -bottom-1 -right-1 text-[9px] bg-purple-100 text-purple-600 px-1 rounded font-bold">Old</span>
            </motion.div>
            <span className="text-[10px] font-semibold text-slate-500">Synapse</span>
          </div>

          {/* Migration arrow with progress */}
          <div className="flex flex-col items-center gap-1">
            <motion.div
              className="relative flex items-center"
              style={{ width: 80 }}
            >
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden relative">
                <motion.div
                  className="absolute top-0 left-0 h-full rounded-full"
                  style={{ background: `linear-gradient(to right, ${BRAND}, #00b4d8)` }}
                  animate={{ width: `${(migStep / 4) * 100}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
                {/* Travelling dot */}
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full -translate-x-1/2"
                  style={{ background: BRAND, boxShadow: `0 0 6px ${BRAND}`, left: `${(migStep / 4) * 100}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>
              <svg className="absolute right-0" width="10" height="10" viewBox="0 0 10 10">
                <polygon points="0,2 8,5 0,8" fill={BRAND} />
              </svg>
            </motion.div>
            <span className="text-[9px] text-slate-400 font-medium">Migrating…</span>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <motion.div
              className="relative rounded-xl flex items-center justify-center shadow-md"
              style={{
                width: 64, height: 64,
                background: migStep >= 3 ? 'white' : '#f8f9fa',
                border: migStep >= 3 ? `1.5px solid ${BRAND}` : '1.5px solid #e2e8f0',
                boxShadow: migStep >= 3 ? `0 6px 20px ${BRAND}40` : 'none',
              }}
              animate={{ scale: migStep >= 3 ? [1, 1.05, 1] : 1 }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <FabricIcon size={34} />
              {migStep >= 3 && (
                <motion.div
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: '#10b981' }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5.5L4 7.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </motion.div>
              )}
            </motion.div>
            <span className="text-[10px] font-semibold text-slate-500">MS Fabric</span>
          </div>
        </div>

        {/* Step tracker */}
        <div className="flex items-center gap-1.5">
          {steps.map((s, i) => (
            <React.Fragment key={s}>
              <motion.div
                className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-bold"
                style={{
                  background: migStep >= i ? BRAND + '30' : '#f1f5f9',
                  color: migStep >= i ? BRAND_DARK : '#94a3b8',
                  border: migStep === i ? `1px solid ${BRAND}` : '1px solid transparent',
                }}
                animate={{ scale: migStep === i ? 1.08 : 1 }}
                transition={{ duration: 0.3 }}
              >
                {migStep > i && (
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1.5 4L3 5.5L6.5 2" stroke={BRAND_DARK} strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                )}
                {s}
              </motion.div>
              {i < steps.length - 1 && <div className="w-3 h-px bg-slate-200" />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </IllustrationWrap>
  );
};

/* ═══════════════════════════════════════════════════════════════════ */
/*  8. Cost Optimization - Gauge/metrics                              */
/* ═══════════════════════════════════════════════════════════════════ */
export const CostOptimizationIllustration = () => {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick(t => t + 1), 1600);
    return () => clearInterval(t);
  }, []);

  const savings = Math.min(35 + (tick % 10) * 3, 72);
  const barValues = [85, 70, 60, 48, 40, 35, 30].slice(0, Math.min(tick + 1, 7));

  return (
    <IllustrationWrap>
      <div className="flex flex-col items-center gap-5 w-full px-8 py-6">
        {/* KPI badges */}
        <div className="flex gap-4 justify-center">
          {[
            { label: 'Compute', val: '-34%', color: '#10b981' },
            { label: 'Storage', val: '-28%', color: BRAND },
            { label: 'Licensing', val: '-19%', color: '#4da3ff' },
          ].map((kpi, i) => (
            <motion.div
              key={kpi.label}
              className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl shadow-sm"
              style={{ background: 'white', border: '1.5px solid #e2e8f0', minWidth: 68 }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12 }}
            >
              <span className="text-[17px] font-black" style={{ color: kpi.color }}>{kpi.val}</span>
              <span className="text-[9px] text-slate-400 font-semibold">{kpi.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Cost trend bar chart */}
        <div
          className="w-full max-w-xs rounded-xl px-4 py-3 flex flex-col gap-2"
          style={{ background: 'white', border: '1.5px solid #e2e8f0' }}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Cost Over Time</span>
            <span className="text-[10px] font-bold text-emerald-500">-{savings}%</span>
          </div>
          <div className="flex items-end gap-1.5 h-16">
            {[85, 70, 60, 48, 40, 35, 30].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end relative">
                <motion.div
                  className="rounded-t-sm"
                  style={{
                    background: i < barValues.length
                      ? `linear-gradient(180deg, ${i < 4 ? '#e25d3e' : BRAND} 0%, ${i < 4 ? '#c94a2c' : BRAND_DARK} 100%)`
                      : '#f1f5f9',
                    height: `${(val / 85) * 100}%`,
                  }}
                  initial={{ scaleY: 0, originY: 1 }}
                  animate={{ scaleY: i < barValues.length ? 1 : 0 }}
                  transition={{ delay: i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-0.5">
            <span className="text-[8px] text-slate-300">Q1</span>
            <span className="text-[8px] text-slate-300">Now</span>
          </div>
        </div>

        {/* Tool icons */}
        <div className="flex items-center gap-4 justify-center">
          <ToolCard icon={<FabricIcon size={22} />} label="Fabric" delay={0} highlighted />
          <ToolCard icon={<PowerBIIcon size={22} />} label="Power BI" delay={0.1} />
          <ToolCard icon={<AzureDevOpsIcon size={22} />} label="DevOps" delay={0.2} />
        </div>
      </div>
    </IllustrationWrap>
  );
};

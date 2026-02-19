'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import {
    BarChart, Bar, XAxis, YAxis, ResponsiveContainer,
    AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';
import {
    LayoutDashboard, Users, TrendingUp,
    Linkedin, Briefcase, FileText, CreditCard,
    Wallet, ArrowUpRight, ArrowDownRight, Building2,
    Repeat, DollarSign, ReceiptText, PiggyBank,
    ChevronDown, Monitor
} from 'lucide-react';
import { CustomCursor } from './AutomatedAssets';
import { ANIMATION_THEME } from '@/lib/colors';

// ─── Types ─────────────────────────────────────────────────────────────────

type FilterState = {
    currency: 'USD' | 'EUR';
    year: '2023' | '2024' | '2025';
};

type ProductTab = 'Revenue' | 'Transaction';

// ─── Data Sets ─────────────────────────────────────────────────────────────

const transactionAmountData: Record<string, { month: string; amount: number }[]> = {
    '2023': [
        { month: 'Jan', amount: 32 }, { month: 'Feb', amount: 28 }, { month: 'Mar', amount: 35 },
        { month: 'Apr', amount: 42 }, { month: 'May', amount: 38 }, { month: 'Jun', amount: 45 },
        { month: 'Jul', amount: 52 }, { month: 'Aug', amount: 48 }, { month: 'Sep', amount: 44 },
        { month: 'Oct', amount: 50 }, { month: 'Nov', amount: 46 }, { month: 'Dec', amount: 55 },
    ],
    '2024': [
        { month: 'Jan', amount: 38 }, { month: 'Feb', amount: 42 }, { month: 'Mar', amount: 48 },
        { month: 'Apr', amount: 52 }, { month: 'May', amount: 56 }, { month: 'Jun', amount: 62 },
        { month: 'Jul', amount: 58 }, { month: 'Aug', amount: 64 }, { month: 'Sep', amount: 68 },
        { month: 'Oct', amount: 72 }, { month: 'Nov', amount: 76 }, { month: 'Dec', amount: 82 },
    ],
    '2025': [
        { month: 'Jan', amount: 45 }, { month: 'Feb', amount: 52 }, { month: 'Mar', amount: 58 },
        { month: 'Apr', amount: 62 }, { month: 'May', amount: 68 }, { month: 'Jun', amount: 72 },
        { month: 'Jul', amount: 78 }, { month: 'Aug', amount: 82 }, { month: 'Sep', amount: 76 },
        { month: 'Oct', amount: 85 }, { month: 'Nov', amount: 88 }, { month: 'Dec', amount: 92 },
    ],
};

const revenueLineData: Record<string, { month: string; value: number }[]> = {
    '2023': [
        { month: 'Jan', value: 180 }, { month: 'Feb', value: 195 }, { month: 'Mar', value: 210 },
        { month: 'Apr', value: 225 }, { month: 'May', value: 240 }, { month: 'Jun', value: 255 },
    ],
    '2024': [
        { month: 'Jan', value: 245 }, { month: 'Feb', value: 268 }, { month: 'Mar', value: 285 },
        { month: 'Apr', value: 298 }, { month: 'May', value: 310 }, { month: 'Jun', value: 325 },
    ],
    '2025': [
        { month: 'Jan', value: 285 }, { month: 'Feb', value: 305 }, { month: 'Mar', value: 328 },
        { month: 'Apr', value: 345 }, { month: 'May', value: 362 }, { month: 'Jun', value: 378 },
    ],
};

const totalTransactionAmounts: Record<string, { amount: string; change: string; isUp: boolean; py: string }> = {
    '2023': { amount: '$38.42M', change: '-1.24%', isUp: false, py: '$38.94M' },
    '2024': { amount: '$46.88M', change: '-0.41%', isUp: false, py: '$47.07M' },
    '2025': { amount: '$52.14M', change: '+4.82%', isUp: true, py: '$49.75M' },
};

const totalRevenueAmounts: Record<string, { amount: string; change: string; isUp: boolean; py: string; lateFee: string; insurance: string; creditCard: string }> = {
    '2023': { amount: '$248.56K', change: '-3.12%', isUp: false, py: '$256.52K', lateFee: '$128.42K', insurance: '$78.24K', creditCard: '$41.90K' },
    '2024': { amount: '$292.32K', change: '-2.66%', isUp: false, py: '$300.30K', lateFee: '$152.66K', insurance: '$92.04K', creditCard: '$47.62K' },
    '2025': { amount: '$328.45K', change: '+5.18%', isUp: true, py: '$312.28K', lateFee: '$168.92K', insurance: '$104.18K', creditCard: '$55.35K' },
};

const paymentMetrics: Record<string, {
    cardPayment: { amount: string; percent: number; change: string; isUp: boolean };
    deposit: { amount: string; percent: number; change: string; isUp: boolean };
    loanRepayment: { amount: string; percent: number; change: string; isUp: boolean };
    fee: { amount: string; percent: number; change: string; isUp: boolean };
    transfer: { amount: string; percent: number; change: string; isUp: boolean };
    withdrawal: { amount: string; percent: number; change: string; isUp: boolean };
}> = {
    '2023': {
        cardPayment: { amount: '$6.12M', percent: 14.2, change: '-5.42%', isUp: false },
        deposit: { amount: '$6.58M', percent: 15.8, change: '+5.82%', isUp: true },
        loanRepayment: { amount: '$6.24M', percent: 15.2, change: '-4.18%', isUp: false },
        fee: { amount: '$6.42M', percent: 15.5, change: '+0.72%', isUp: true },
        transfer: { amount: '$6.82M', percent: 16.4, change: '+5.24%', isUp: true },
        withdrawal: { amount: '$6.24M', percent: 15.1, change: '-2.84%', isUp: false },
    },
    '2024': {
        cardPayment: { amount: '$7.41M', percent: 15.81, change: '-6.88%', isUp: false },
        deposit: { amount: '$7.92M', percent: 16.9, change: '+7.00%', isUp: true },
        loanRepayment: { amount: '$7.72M', percent: 16.48, change: '-5.11%', isUp: false },
        fee: { amount: '$7.79M', percent: 16.63, change: '+0.95%', isUp: true },
        transfer: { amount: '$8.21M', percent: 17.51, change: '+6.17%', isUp: true },
        withdrawal: { amount: '$7.82M', percent: 16.68, change: '-3.88%', isUp: false },
    },
    '2025': {
        cardPayment: { amount: '$8.24M', percent: 15.82, change: '+4.12%', isUp: true },
        deposit: { amount: '$8.86M', percent: 17.0, change: '+8.24%', isUp: true },
        loanRepayment: { amount: '$8.52M', percent: 16.35, change: '+3.82%', isUp: true },
        fee: { amount: '$8.68M', percent: 16.65, change: '+5.42%', isUp: true },
        transfer: { amount: '$9.12M', percent: 17.5, change: '+7.28%', isUp: true },
        withdrawal: { amount: '$8.72M', percent: 16.73, change: '+2.14%', isUp: true },
    },
};

const topProductsData: Record<string, Record<string, { name: string; value: number }[]>> = {
    '2023': {
        Revenue: [
            { name: 'Mortgage', value: 10.2 },
            { name: 'Loan', value: 9.8 },
            { name: 'Credit Card', value: 7.6 },
            { name: 'Checking Acct', value: 6.2 },
            { name: 'Savings Acct', value: 3.8 },
        ],
        Transaction: [
            { name: 'Mortgage', value: 8.4 },
            { name: 'Loan', value: 7.2 },
            { name: 'Credit Card', value: 9.1 },
            { name: 'Checking Acct', value: 5.8 },
            { name: 'Savings Acct', value: 4.2 },
        ],
    },
    '2024': {
        Revenue: [
            { name: 'Mortgage', value: 13.98 },
            { name: 'Loan', value: 11.88 },
            { name: 'Credit Card', value: 9.31 },
            { name: 'Checking Acct', value: 7.26 },
            { name: 'Savings Acct', value: 4.61 },
        ],
        Transaction: [
            { name: 'Mortgage', value: 11.2 },
            { name: 'Loan', value: 9.8 },
            { name: 'Credit Card', value: 12.4 },
            { name: 'Checking Acct', value: 6.8 },
            { name: 'Savings Acct', value: 5.2 },
        ],
    },
    '2025': {
        Revenue: [
            { name: 'Mortgage', value: 15.82 },
            { name: 'Loan', value: 13.42 },
            { name: 'Credit Card', value: 10.86 },
            { name: 'Checking Acct', value: 8.45 },
            { name: 'Savings Acct', value: 5.28 },
        ],
        Transaction: [
            { name: 'Mortgage', value: 12.8 },
            { name: 'Loan', value: 11.2 },
            { name: 'Credit Card', value: 14.2 },
            { name: 'Checking Acct', value: 7.8 },
            { name: 'Savings Acct', value: 6.1 },
        ],
    },
};

const regionalData: Record<string, { state: string; branch: string; transaction: string; growth: string; isUp: boolean }[]> = {
    '2023': [
        { state: 'Aragon', branch: 'Zaragoza', transaction: '$5.12M', growth: '+10.24%', isUp: true },
        { state: 'Andalucia', branch: 'Malaga', transaction: '$4.86M', growth: '+1.12%', isUp: true },
        { state: 'Murcia', branch: 'Murcia', transaction: '$4.72M', growth: '+1.86%', isUp: true },
        { state: 'Cataluña', branch: 'Barcelona', transaction: '$4.58M', growth: '-4.24%', isUp: false },
        { state: 'C. Valenciana', branch: 'Valencia', transaction: '$4.42M', growth: '+1.92%', isUp: true },
        { state: 'Andalucia', branch: 'Sevilla', transaction: '$4.28M', growth: '-3.86%', isUp: false },
        { state: 'Pais Vasco', branch: 'Bilbao', transaction: '$4.14M', growth: '+1.84%', isUp: true },
        { state: 'C. de Madrid', branch: 'Madrid', transaction: '$4.02M', growth: '+3.42%', isUp: true },
    ],
    '2024': [
        { state: 'Aragon', branch: 'Zaragoza', transaction: '$6.29M', growth: '+12.90%', isUp: true },
        { state: 'Andalucia', branch: 'Malaga', transaction: '$6.08M', growth: '+1.78%', isUp: true },
        { state: 'Murcia', branch: 'Murcia', transaction: '$6.05M', growth: '+2.12%', isUp: true },
        { state: 'Cataluña', branch: 'Barcelona', transaction: '$5.99M', growth: '-5.55%', isUp: false },
        { state: 'C. Valenciana', branch: 'Valencia', transaction: '$5.72M', growth: '+2.38%', isUp: true },
        { state: 'Andalucia', branch: 'Sevilla', transaction: '$5.68M', growth: '-4.88%', isUp: false },
        { state: 'Pais Vasco', branch: 'Bilbao', transaction: '$5.53M', growth: '+2.30%', isUp: true },
        { state: 'C. de Madrid', branch: 'Madrid', transaction: '$5.53M', growth: '+4.54%', isUp: true },
    ],
    '2025': [
        { state: 'Aragon', branch: 'Zaragoza', transaction: '$7.14M', growth: '+13.52%', isUp: true },
        { state: 'Andalucia', branch: 'Malaga', transaction: '$6.92M', growth: '+6.24%', isUp: true },
        { state: 'Murcia', branch: 'Murcia', transaction: '$6.85M', growth: '+5.82%', isUp: true },
        { state: 'Cataluña', branch: 'Barcelona', transaction: '$6.72M', growth: '+2.18%', isUp: true },
        { state: 'C. Valenciana', branch: 'Valencia', transaction: '$6.48M', growth: '+6.12%', isUp: true },
        { state: 'Andalucia', branch: 'Sevilla', transaction: '$6.32M', growth: '+3.24%', isUp: true },
        { state: 'Pais Vasco', branch: 'Bilbao', transaction: '$6.18M', growth: '+5.86%', isUp: true },
        { state: 'C. de Madrid', branch: 'Madrid', transaction: '$6.08M', growth: '+7.42%', isUp: true },
    ],
};

const recordedTransactions: Record<string, { total: string; py: string; change: string; isUp: boolean; online: number; atm: number; branch: number }> = {
    '2023': { total: '6,842', py: '7012', change: '-2.42%', isUp: false, online: 22.8, atm: 26.4, branch: 25.2 },
    '2024': { total: '8,342', py: '8407', change: '-0.77%', isUp: false, online: 24.25, atm: 26.18, branch: 24.72 },
    '2025': { total: '9,486', py: '8986', change: '+5.56%', isUp: true, online: 28.4, atm: 24.8, branch: 22.6 },
};

// ─── Metric Card Component ─────────────────────────────────────────────────

const MetricCard: React.FC<{
    title: string;
    amount: string;
    percent: number;
    change: string;
    isUp: boolean;
    icon: React.ReactNode;
    color: string;
    glowColor: string;
}> = ({ title, amount, percent, change, isUp, icon, color, glowColor }) => (
    <motion.div
        whileHover={{ y: -2, scale: 1.02 }}
        className="relative group overflow-hidden bg-white/70 backdrop-blur-md rounded-2xl border border-white/40 p-4 flex flex-col gap-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:bg-white/90"
    >
        {/* Glow Effect */}
        <div className={`absolute -right-4 -top-4 w-16 h-16 rounded-full blur-2xl opacity-10 transition-opacity group-hover:opacity-20 ${glowColor}`} />

        <div className="flex items-center justify-between relative z-10">
            <span className="text-slate-500 text-[9px] font-bold uppercase tracking-[0.1em]">{title}</span>
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-sm ${color} transition-transform duration-500 group-hover:rotate-12`}>
                {icon}
            </div>
        </div>

        <div className="flex flex-col relative z-10">
            <div className="flex items-baseline gap-2">
                <motion.span
                    key={amount}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-[18px] font-black text-slate-900 tracking-tight leading-none"
                >
                    {amount}
                </motion.span>
                <span className="text-[9px] font-semibold text-slate-400">{percent.toFixed(1)}%</span>
            </div>

            <motion.div
                key={change}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex items-center gap-1 mt-1.5 ${isUp ? 'text-emerald-500' : 'text-rose-500'}`}
            >
                <div className={`p-0.5 rounded-full ${isUp ? 'bg-emerald-50' : 'bg-rose-50'}`}>
                    {isUp ? <ArrowUpRight size={10} strokeWidth={3} /> : <ArrowDownRight size={10} strokeWidth={3} />}
                </div>
                <span className="text-[10px] font-bold">{change}</span>
                <span className="text-[8px] text-slate-400 font-medium ml-0.5">vs last period</span>
            </motion.div>
        </div>
    </motion.div>
);

// ─── Spain Map SVG (accurate regional boundaries) ───────────────────────────

const SpainMap: React.FC<{ highlightedRegion: string | null; onRegionHover?: (region: string | null) => void }> = ({ highlightedRegion, onRegionHover }) => {
    // Accurate Spain autonomous communities SVG paths (simplified but geographically correct)
    const regions = [
        {
            id: 'Galicia',
            d: 'M5,48 L18,32 L32,28 L42,35 L45,48 L38,62 L25,68 L12,65 L5,55 Z',
            base: '#fefce8',
            cities: [{ name: 'A Coruña', x: 15, y: 40 }]
        },
        {
            id: 'Asturias',
            d: 'M42,35 L58,28 L78,26 L82,38 L72,48 L55,50 L45,48 Z',
            base: '#fef9c3',
            cities: [{ name: 'Oviedo', x: 62, y: 38 }]
        },
        {
            id: 'Cantabria',
            d: 'M78,26 L95,24 L102,32 L95,42 L82,38 Z',
            base: '#fefce8',
            cities: [{ name: 'Santander', x: 90, y: 32 }]
        },
        {
            id: 'Pais Vasco',
            d: 'M95,24 L115,22 L118,35 L108,42 L102,32 Z',
            base: '#fef9c3',
            cities: [{ name: 'Bilbao', x: 105, y: 30 }]
        },
        {
            id: 'Navarra',
            d: 'M115,22 L135,18 L142,32 L135,48 L118,48 L108,42 L118,35 Z',
            base: '#fefce8',
            cities: [{ name: 'Pamplona', x: 125, y: 35 }]
        },
        {
            id: 'La Rioja',
            d: 'M108,42 L118,48 L115,58 L102,55 L98,48 Z',
            base: '#fef9c3',
            cities: [{ name: 'Logroño', x: 108, y: 50 }]
        },
        {
            id: 'Aragon',
            d: 'M118,48 L135,48 L142,32 L162,28 L175,48 L172,85 L155,95 L138,90 L125,75 L115,58 Z',
            base: '#fef9c3',
            cities: [{ name: 'Zaragoza', x: 145, y: 60 }]
        },
        {
            id: 'Cataluña',
            d: 'M162,28 L185,22 L198,38 L195,68 L175,82 L172,85 L175,48 Z',
            base: '#fefce8',
            cities: [{ name: 'Barcelona', x: 182, y: 52 }]
        },
        {
            id: 'Castilla y Leon',
            d: 'M25,68 L38,62 L45,48 L55,50 L72,48 L82,38 L95,42 L98,48 L102,55 L115,58 L125,75 L118,88 L95,95 L72,95 L48,92 L32,82 L22,72 Z',
            base: '#fefce8',
            cities: [{ name: 'Valladolid', x: 72, y: 70 }]
        },
        {
            id: 'C. de Madrid',
            d: 'M95,95 L118,88 L122,102 L115,115 L98,112 L92,102 Z',
            base: '#fef9c3',
            cities: [{ name: 'Madrid', x: 105, y: 102 }]
        },
        {
            id: 'C. Valenciana',
            d: 'M155,95 L172,85 L175,82 L195,68 L198,95 L188,125 L168,140 L152,132 L145,115 L138,90 Z',
            base: '#fefce8',
            cities: [{ name: 'Valencia', x: 175, y: 105 }]
        },
        {
            id: 'Extremadura',
            d: 'M22,72 L32,82 L48,92 L52,115 L45,138 L28,145 L12,132 L8,105 L15,85 Z',
            base: '#fef9c3',
            cities: [{ name: 'Mérida', x: 32, y: 115 }]
        },
        {
            id: 'Castilla-La Mancha',
            d: 'M48,92 L72,95 L95,95 L92,102 L98,112 L115,115 L122,102 L118,88 L125,75 L138,90 L145,115 L138,135 L118,145 L88,148 L58,142 L52,115 Z',
            base: '#fefce8',
            cities: [{ name: 'Toledo', x: 98, y: 125 }]
        },
        {
            id: 'Murcia',
            d: 'M145,115 L152,132 L168,140 L165,158 L145,165 L128,155 L125,140 L138,135 Z',
            base: '#fef9c3',
            cities: [{ name: 'Murcia', x: 148, y: 148 }]
        },
        {
            id: 'Andalucia',
            d: 'M8,105 L12,132 L28,145 L45,138 L52,115 L58,142 L88,148 L118,145 L138,135 L125,140 L128,155 L145,165 L165,158 L158,178 L125,192 L85,195 L45,188 L18,172 L5,148 L8,125 Z',
            base: '#fefce8',
            cities: [
                { name: 'Sevilla', x: 48, y: 158 },
                { name: 'Málaga', x: 95, y: 178 },
            ]
        },
    ];

    return (
        <svg viewBox="0 8 205 195" className="w-full h-full" style={{ filter: `drop-shadow(0 2px 6px ${ANIMATION_THEME.primary}26)` }}>
            <defs>
                <linearGradient id="mapHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={ANIMATION_THEME.primary} />
                    <stop offset="100%" stopColor={ANIMATION_THEME.primary} />
                </linearGradient>
                <filter id="regionGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>

            {/* Region paths */}
            {regions.map(r => {
                const isHighlighted = highlightedRegion === r.id ||
                    (highlightedRegion === 'Andalucia' && r.id === 'Andalucia') ||
                    (highlightedRegion === 'Murcia' && r.id === 'Murcia') ||
                    (highlightedRegion === 'Aragon' && r.id === 'Aragon') ||
                    (highlightedRegion === 'Cataluña' && r.id === 'Cataluña') ||
                    (highlightedRegion === 'C. Valenciana' && r.id === 'C. Valenciana') ||
                    (highlightedRegion === 'C. de Madrid' && r.id === 'C. de Madrid') ||
                    (highlightedRegion === 'Pais Vasco' && r.id === 'Pais Vasco');

                return (
                    <motion.path
                        key={r.id}
                        d={r.d}
                        fill={isHighlighted ? 'url(#mapHighlight)' : r.base}
                        stroke={isHighlighted ? ANIMATION_THEME.primary : ANIMATION_THEME.border}
                        strokeWidth={isHighlighted ? 1.5 : 0.8}
                        filter={isHighlighted ? 'url(#regionGlow)' : undefined}
                        initial={false}
                        animate={{
                            scale: isHighlighted ? 1.02 : 1,
                            opacity: highlightedRegion && !isHighlighted ? 0.6 : 1,
                        }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        style={{
                            transformOrigin: 'center',
                            cursor: 'pointer',
                        }}
                        onMouseEnter={() => onRegionHover?.(r.id)}
                        onMouseLeave={() => onRegionHover?.(null)}
                    />
                );
            })}

            {/* City markers */}
            {regions.flatMap(r => r.cities.map(city => {
                const isRegionHighlighted = highlightedRegion === r.id;
                return (
                    <g key={city.name}>
                        {/* Outer glow for highlighted cities */}
                        {isRegionHighlighted && (
                            <motion.circle
                                cx={city.x}
                                cy={city.y}
                                r="5"
                                fill={ANIMATION_THEME.primary}
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 0.3, scale: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                        )}
                        {/* City dot */}
                        <circle
                            cx={city.x}
                            cy={city.y}
                            r={isRegionHighlighted ? 3 : 2.5}
                            fill={isRegionHighlighted ? ANIMATION_THEME.text.primary : ANIMATION_THEME.primary}
                            style={{ transition: 'all 0.2s ease' }}
                        />
                        <circle
                            cx={city.x}
                            cy={city.y}
                            r="1"
                            fill="#fff"
                        />
                        {/* City label on hover */}
                        {isRegionHighlighted && (
                            <motion.text
                                x={city.x + 6}
                                y={city.y + 1}
                                fontSize="6"
                                fill={ANIMATION_THEME.text.primary}
                                fontWeight="600"
                                initial={{ opacity: 0, x: city.x }}
                                animate={{ opacity: 1, x: city.x + 6 }}
                                transition={{ duration: 0.2 }}
                            >
                                {city.name}
                            </motion.text>
                        )}
                    </g>
                );
            }))}
        </svg>
    );
};

// ─── Main Dashboard Component ──────────────────────────────────────────────

const Dashboard: React.FC<{
    filters: FilterState;
    productTab: ProductTab;
    highlightedRegion: string | null;
    onRegionHover?: (region: string | null) => void;
}> = ({ filters, productTab, highlightedRegion, onRegionHover }) => {
    const transAmount = totalTransactionAmounts[filters.year];
    const revenue = totalRevenueAmounts[filters.year];
    const metrics = paymentMetrics[filters.year];
    const products = topProductsData[filters.year][productTab];
    const regions = regionalData[filters.year];
    const recorded = recordedTransactions[filters.year];
    const barData = transactionAmountData[filters.year];
    const lineData = revenueLineData[filters.year];
    const maxProduct = Math.max(...products.map(p => p.value));

    return (
        <div className="flex w-full h-full bg-[#fcfdfe] text-slate-800 overflow-hidden relative" style={{ fontFamily: 'var(--font-geist-sans)' }}>
            {/* Background Aesthetic Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] blur-[120px] rounded-full" style={{ backgroundColor: `${ANIMATION_THEME.primary}1A` }} />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] blur-[120px] rounded-full" style={{ backgroundColor: `${ANIMATION_THEME.primary}1A` }} />

            {/* ── Left Sidebar ── */}
            <aside className="w-[120px] bg-white/40 backdrop-blur-xl border-r border-white/40 flex flex-col shrink-0 relative z-10">
                {/* Logo */}
                <div className="px-4 pt-5 pb-4">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-lg" style={{ backgroundColor: ANIMATION_THEME.primary, boxShadow: `0 10px 15px -3px ${ANIMATION_THEME.primary}33` }}>
                            <Building2 size={16} style={{ color: ANIMATION_THEME.text.primary }} />
                        </div>
                        <div className="hidden sm:block">
                            <span className="text-[11px] font-black tracking-tighter block leading-none" style={{ color: ANIMATION_THEME.text.primary }}>METRIX</span>
                            <span className="text-[7px] font-bold uppercase tracking-wider" style={{ color: ANIMATION_THEME.text.secondary }}>Analysis</span>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div className="px-3 mt-4">
                    <p className="text-slate-400 text-[7px] uppercase font-black tracking-[0.15em] px-2 mb-3 opacity-50">Menu</p>
                    <nav className="space-y-1">
                        <div className="group flex items-center gap-2.5 px-3 py-2 bg-white shadow-sm border rounded-xl cursor-not-allowed" style={{ borderColor: ANIMATION_THEME.border, color: ANIMATION_THEME.text.primary }}>
                            <LayoutDashboard size={12} className="group-hover:scale-110 transition-transform" />
                            <span className="text-[9px] font-bold">Overview</span>
                        </div>
                        <div className="group flex items-center gap-2.5 px-3 py-2 text-slate-400 hover:text-slate-600 hover:bg-white/50 rounded-xl transition-all">
                            <Users size={12} />
                            <span className="text-[9px] font-semibold">Persona</span>
                        </div>
                        <div className="group flex items-center gap-2.5 px-3 py-2 text-slate-400 hover:text-slate-600 hover:bg-white/50 rounded-xl transition-all">
                            <TrendingUp size={12} />
                            <span className="text-[9px] font-semibold">Growth</span>
                        </div>
                    </nav>
                </div>

                {/* Connect */}
                <div className="px-3 mt-8">
                    <p className="text-slate-400 text-[7px] uppercase font-black tracking-[0.15em] px-2 mb-3 opacity-50">Discovery</p>
                    <nav className="space-y-1">
                        <div className="flex items-center gap-2.5 px-3 py-2 text-slate-400 hover:text-slate-600 rounded-xl transition-all uppercase tracking-tighter">
                            <Linkedin size={11} />
                            <span className="text-[8px] font-bold">Connect</span>
                        </div>
                        <div className="flex items-center gap-2.5 px-3 py-2 text-slate-400 hover:text-slate-600 rounded-xl transition-all">
                            <Briefcase size={11} />
                            <span className="text-[8px] font-bold">Portfolio</span>
                        </div>
                    </nav>
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* User Profile */}
                <div className="px-3 py-4 mt-auto">
                    <div className="bg-white/50 border p-2 rounded-2xl flex items-center gap-2 shadow-sm" style={{ borderColor: ANIMATION_THEME.border }}>
                        <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 shadow-md" style={{ backgroundColor: ANIMATION_THEME.primary }}>
                            <span className="text-[8px] font-black" style={{ color: ANIMATION_THEME.text.primary }}>WF</span>
                        </div>
                        <div className="min-w-0">
                            <span className="text-[8px] font-black block leading-none truncate underline decoration-2" style={{ color: ANIMATION_THEME.text.primary, textDecorationColor: ANIMATION_THEME.primary }}>Woodfrog</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* ── Main Content ── */}
            <main className="flex-1 p-2.5 flex flex-col gap-2 overflow-hidden min-w-0">
                {/* Top Filter Bar */}
                <div className="flex justify-between items-center relative z-10">
                    <div>
                        <h1 className="text-[13px] font-black leading-none tracking-tight" style={{ color: ANIMATION_THEME.text.primary }}>Executive Overview</h1>
                        <p className="text-[8px] font-bold uppercase tracking-widest mt-1" style={{ color: ANIMATION_THEME.text.secondary }}>Intelligence & Performance Core</p>
                    </div>
                    <div className="flex items-center gap-2" data-filter-bar>
                        {/* Year Toggle */}
                        <div className="flex bg-white/50 backdrop-blur-sm border rounded-xl p-1 gap-1 shadow-sm" style={{ borderColor: ANIMATION_THEME.border }}>
                            {(['2023', '2024', '2025'] as const).map(yr => (
                                <button
                                    key={yr}
                                    data-filter-year={yr}
                                    className={`px-3.5 py-1.5 rounded-lg text-[8px] font-black transition-all duration-300 ${filters.year === yr
                                        ? 'bg-slate-900 text-white shadow-md scale-105'
                                        : 'text-slate-400 hover:text-slate-600 hover:bg-white/50'
                                        }`}
                                >
                                    {yr}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Dashboard Grid ── */}
                <div className="flex-1 grid grid-cols-12 grid-rows-[auto_1fr_1fr_auto] gap-2 min-h-0">

                    {/* ── Row 1: Metric Cards (6 cards) ── */}
                    <div className="col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
                        <MetricCard title="Card Payment" amount={metrics.cardPayment.amount} percent={metrics.cardPayment.percent} change={metrics.cardPayment.change} isUp={metrics.cardPayment.isUp} icon={<CreditCard size={14} style={{ color: ANIMATION_THEME.text.primary }} />} color="bg-yellow-50" glowColor="bg-yellow-400" />
                        <MetricCard title="Deposit" amount={metrics.deposit.amount} percent={metrics.deposit.percent} change={metrics.deposit.change} isUp={metrics.deposit.isUp} icon={<Wallet size={14} className="text-emerald-600" />} color="bg-emerald-50/50" glowColor="bg-emerald-500" />
                        <MetricCard title="Loan Repay" amount={metrics.loanRepayment.amount} percent={metrics.loanRepayment.percent} change={metrics.loanRepayment.change} isUp={metrics.loanRepayment.isUp} icon={<ReceiptText size={14} className="text-amber-600" />} color="bg-amber-50/50" glowColor="bg-amber-500" />
                        <MetricCard title="Fee" amount={metrics.fee.amount} percent={metrics.fee.percent} change={metrics.fee.change} isUp={metrics.fee.isUp} icon={<DollarSign size={14} style={{ color: ANIMATION_THEME.text.primary }} />} color="bg-yellow-50" glowColor="bg-yellow-400" />
                        <MetricCard title="Transfer" amount={metrics.transfer.amount} percent={metrics.transfer.percent} change={metrics.transfer.change} isUp={metrics.transfer.isUp} icon={<Repeat size={14} style={{ color: ANIMATION_THEME.primary }} />} color="bg-yellow-50/40" glowColor="bg-yellow-500" />
                        <MetricCard title="Withdrawal" amount={metrics.withdrawal.amount} percent={metrics.withdrawal.percent} change={metrics.withdrawal.change} isUp={metrics.withdrawal.isUp} icon={<PiggyBank size={14} className="text-rose-600" />} color="bg-rose-50/50" glowColor="bg-rose-500" />
                    </div>

                    {/* ── Row 2: Transaction Amount + Total Revenue ── */}
                    <div className="col-span-12 lg:col-span-5 bg-white/70 backdrop-blur-md rounded-3xl border border-white/40 p-5 flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:bg-white/80 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: ANIMATION_THEME.primary }} />
                                <span className="text-slate-800 text-[10px] font-black uppercase tracking-widest">Transactions</span>
                            </div>
                            <span className="text-[9px] text-slate-400 font-bold bg-slate-50 px-2 py-1 rounded-lg">LIVE FEED</span>
                        </div>
                        <div className="flex items-baseline gap-2 mb-1">
                            <motion.span key={transAmount.amount} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-[28px] font-black text-slate-900 tracking-tighter leading-none">
                                {transAmount.amount}
                            </motion.span>
                            <span className={`text-[10px] font-black flex items-center gap-1 px-1.5 py-0.5 rounded-full ${transAmount.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-500'}`}>
                                {transAmount.isUp ? <ArrowUpRight size={10} strokeWidth={3} /> : <ArrowDownRight size={10} strokeWidth={3} />}
                                {transAmount.change}
                            </span>
                        </div>
                        <span className="text-[9px] text-slate-400 font-medium mb-4 flex items-center gap-1">
                            <Repeat size={8} /> Previous Year: <span className="text-slate-600 font-bold">{transAmount.py}</span>
                        </span>
                        <div className="flex-1 min-h-[80px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={barData} barCategoryGap="25%">
                                    <defs>
                                        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor={ANIMATION_THEME.primary} stopOpacity={0.8} />
                                            <stop offset="100%" stopColor={ANIMATION_THEME.primary} stopOpacity={0.4} />
                                        </linearGradient>
                                        <linearGradient id="barActiveGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor={ANIMATION_THEME.primary} stopOpacity={1} />
                                            <stop offset="100%" stopColor={ANIMATION_THEME.primary} stopOpacity={0.8} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 8, fontWeight: 600 }} interval={1} />
                                    <YAxis hide />
                                    <Bar dataKey="amount" radius={[6, 6, 6, 6]}>
                                        {barData.map((_, i) => (
                                            <Cell
                                                key={i}
                                                fill={i === barData.length - 1 ? 'url(#barActiveGradient)' : 'url(#barGradient)'}
                                                style={{ filter: i === barData.length - 1 ? `drop-shadow(0 4px 6px ${ANIMATION_THEME.primary}4D)` : 'none' }}
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="col-span-12 lg:col-span-7 bg-white/70 backdrop-blur-md rounded-3xl border border-white/40 p-5 flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:bg-white/80 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                <span className="text-slate-800 text-[10px] font-black uppercase tracking-widest">Revenue Streams</span>
                            </div>
                            <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border shadow-sm" style={{ borderColor: ANIMATION_THEME.border }}>
                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ANIMATION_THEME.primary }} />
                                <span className="text-[9px] font-bold uppercase tracking-tight" style={{ color: ANIMATION_THEME.text.secondary }}>Main Flow</span>
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2 mb-1">
                            <motion.span key={revenue.amount} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-[28px] font-black text-slate-900 tracking-tighter leading-none">
                                {revenue.amount}
                            </motion.span>
                            <span className={`text-[10px] font-black flex items-center gap-1 px-1.5 py-0.5 rounded-full ${revenue.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-500'}`}>
                                {revenue.isUp ? <ArrowUpRight size={10} strokeWidth={3} /> : <ArrowDownRight size={10} strokeWidth={3} />}
                                {revenue.change}
                            </span>
                        </div>
                        <div className="flex-1 min-h-[80px] flex gap-5">
                            <div className="flex-1">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={lineData}>
                                        <defs>
                                            <linearGradient id="mainRevenueGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor={ANIMATION_THEME.primary} stopOpacity={0.3} />
                                                <stop offset="50%" stopColor={ANIMATION_THEME.primary} stopOpacity={0.1} />
                                                <stop offset="100%" stopColor={ANIMATION_THEME.primary} stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 8, fontWeight: 600 }} />
                                        <YAxis hide />
                                        <Area
                                            type="monotone"
                                            dataKey="value"
                                            stroke={ANIMATION_THEME.primary}
                                            strokeWidth={3}
                                            fill="url(#mainRevenueGradient)"
                                            dot={{ r: 3, fill: '#fff', stroke: ANIMATION_THEME.primary, strokeWidth: 2 }}
                                            activeDot={{ r: 5, fill: ANIMATION_THEME.primary, stroke: '#fff', strokeWidth: 2, filter: `drop-shadow(0 0 8px ${ANIMATION_THEME.primary}80)` }}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="w-[110px] flex flex-col justify-center gap-3 border-l border-slate-100/50 pl-5">
                                {[
                                    { label: 'Late Fee', val: revenue.lateFee, color: 'text-slate-900' },
                                    { label: 'Insurance', val: revenue.insurance, color: 'text-emerald-600' },
                                    { label: 'Credit Card', val: revenue.creditCard, color: 'text-yellow-600' }
                                ].map((item, idx) => (
                                    <div key={idx}>
                                        <span className="text-[8px] text-slate-400 font-black uppercase tracking-[0.1em]">{item.label}</span>
                                        <motion.p key={item.val} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`text-[12px] font-black ${item.color}`}>{item.val}</motion.p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── Row 3: Top Products + Recorded Transactions ── */}
                    <div className="col-span-12 lg:col-span-6 bg-white/70 backdrop-blur-md rounded-3xl border border-white/40 p-4 flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:bg-white/80 transition-all">
                        <div className="flex items-center justify-between mb-2.5">
                            <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Asset Distribution</span>
                            <div className="flex bg-slate-100/50 backdrop-blur-sm rounded-xl p-0.5 gap-1" data-product-tabs>
                                {(['Revenue', 'Transaction'] as const).map(tab => (
                                    <button
                                        key={tab}
                                        data-product-tab={tab}
                                        className={`px-3 py-1 rounded-lg text-[8px] font-black transition-all ${productTab === tab
                                            ? 'bg-slate-900 text-white shadow-sm'
                                            : 'text-slate-400 hover:text-slate-600'
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col justify-center gap-2">
                            {products.map((p, i) => (
                                <motion.div
                                    key={`${filters.year}-${productTab}-${p.name}`}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.08, duration: 0.4 }}
                                    className="flex items-center gap-3 group"
                                >
                                    <span className="text-[8px] text-slate-500 font-bold w-[70px] truncate transition-colors uppercase tracking-tight group-hover:text-yellow-600">{p.name}</span>
                                    <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden relative">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(p.value / maxProduct) * 100}%` }}
                                            transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                                            className="h-full rounded-full relative overflow-hidden"
                                            style={{
                                                background: `linear-gradient(90deg, ${[ANIMATION_THEME.primary, ANIMATION_THEME.primary, ANIMATION_THEME.primary, ANIMATION_THEME.primary, ANIMATION_THEME.primary][i]}, ${ANIMATION_THEME.primary}CC)`,
                                            }}
                                        >
                                            <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]" style={{ width: '50px' }} />
                                        </motion.div>
                                    </div>
                                    <span className="text-[10px] font-black text-slate-900 w-[45px] text-right tracking-tighter">${p.value}M</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Recorded Transactions donut */}
                    <div className="col-span-12 lg:col-span-6 bg-white/70 backdrop-blur-md rounded-3xl border border-white/40 p-4 flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:bg-white/80 transition-all overflow-hidden">
                        <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-2.5">Transaction Channels</span>
                        <div className="flex gap-4 items-center flex-1">
                            <div className="relative">
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <motion.span key={recorded.total} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-[14px] font-black text-slate-900 leading-none">
                                        {recorded.total}
                                    </motion.span>
                                    <span className="text-[5px] text-slate-400 font-bold uppercase mt-1">Total Trans</span>
                                </div>
                                <div className="w-[85px] h-[85px] shrink-0">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={[
                                                    { name: 'Online', value: recorded.online },
                                                    { name: 'ATM', value: recorded.atm },
                                                    { name: 'Branch', value: recorded.branch },
                                                ]}
                                                dataKey="value"
                                                cx="50%"
                                                cy="50%"
                                                innerRadius="65%"
                                                outerRadius="95%"
                                                paddingAngle={5}
                                                strokeWidth={0}
                                                startAngle={90}
                                                endAngle={-270}
                                            >
                                                <Cell fill={ANIMATION_THEME.primary} />
                                                <Cell fill="#fef08a" />
                                                <Cell fill="#fefce8" />
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 flex-1">
                                {[
                                    { label: 'Online', value: recorded.online, icon: <Monitor size={8} /> },
                                    { label: 'ATM', value: recorded.atm, icon: <CreditCard size={8} /> },
                                    { label: 'Branch', value: recorded.branch, icon: <Building2 size={8} /> },
                                ].map(item => (
                                    <div key={item.label} className="group flex items-center justify-between px-2 py-1.5 rounded-xl hover:bg-white/50 transition-all">
                                        <div className="flex items-center gap-2.5">
                                            {[0, 1, 2].map(idx => (
                                                <div key={idx} className={`w-5 h-5 rounded-lg flex items-center justify-center shadow-sm transition-transform group-hover:scale-110 ${item.label === ['Online', 'ATM', 'Branch'][idx] ? 'flex' : 'hidden'}`} style={{ backgroundColor: [ANIMATION_THEME.primary, '#fef08a', '#fefce8'][idx] }}>
                                                    {item.icon}
                                                </div>
                                            ))}
                                            <span className="text-[8px] text-slate-500 font-bold uppercase tracking-tight">{item.label}</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-[10px] font-black text-slate-900 block leading-none">{item.value}%</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

// ─── Animated Demo Wrapper ─────────────────────────────────────────────────

export const AnalyticsDashboardDemo: React.FC = () => {
    const [filters, setFilters] = useState<FilterState>({ currency: 'USD', year: '2024' });
    const [productTab, setProductTab] = useState<ProductTab>('Revenue');
    const [highlightedRegion, setHighlightedRegion] = useState<string | null>(null);
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

        const moveTo = async (x: number, y: number, duration = 1.2) => {
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

            // Reset
            setFilters({ currency: 'USD', year: '2024' });
            setProductTab('Revenue');
            setHighlightedRegion(null);
            cursorX.set(w * 0.5);
            cursorY.set(h * 0.5);

            await wait(2500);
            if (cancelled) return;

            // Click "2025" year filter (top right area)
            await moveTo(w * 0.96, h * 0.055, 1.0);
            if (cancelled) return;
            await doClick();
            setFilters(f => ({ ...f, year: '2025' }));
            await wait(2000);
            if (cancelled) return;

            // Click EUR
            await moveTo(w * 0.80, h * 0.055, 0.8);
            if (cancelled) return;
            await doClick();
            setFilters(f => ({ ...f, currency: 'EUR' }));
            await wait(1500);
            if (cancelled) return;

            // Click "Transaction" tab on Top Products
            await moveTo(w * 0.30, h * 0.73, 1.0);
            if (cancelled) return;
            await doClick();
            setProductTab('Transaction');
            await wait(2000);
            if (cancelled) return;

            // Hover map regions
            await moveTo(w * 0.55, h * 0.72, 1.0);
            if (cancelled) return;
            setHighlightedRegion('Aragon');
            await wait(1200);
            if (cancelled) return;

            await moveTo(w * 0.58, h * 0.82, 0.8);
            if (cancelled) return;
            setHighlightedRegion('Andalucia');
            await wait(1200);
            if (cancelled) return;

            setHighlightedRegion(null);

            // Click "2023"
            await moveTo(w * 0.88, h * 0.055, 1.0);
            if (cancelled) return;
            await doClick();
            setFilters(f => ({ ...f, year: '2023' }));
            await wait(2000);
            if (cancelled) return;

            // Click "Revenue" tab
            await moveTo(w * 0.26, h * 0.73, 0.8);
            if (cancelled) return;
            await doClick();
            setProductTab('Revenue');
            await wait(1500);
            if (cancelled) return;

            // Click USD
            await moveTo(w * 0.76, h * 0.055, 0.8);
            if (cancelled) return;
            await doClick();
            setFilters(f => ({ ...f, currency: 'USD' }));
            await wait(1500);
            if (cancelled) return;

            // Back to 2024
            await moveTo(w * 0.92, h * 0.055, 0.8);
            if (cancelled) return;
            await doClick();
            setFilters(f => ({ ...f, year: '2024' }));
            await wait(2000);
            if (cancelled) return;

            if (!cancelled) runSequence();
        };

        const timer = setTimeout(runSequence, 800);
        return () => {
            cancelled = true;
            clearTimeout(timer);
        };
    }, [cursorX, cursorY]);

    return (
        <div ref={containerRef} className="relative w-full h-full bg-white overflow-hidden">
            <Dashboard
                filters={filters}
                productTab={productTab}
                highlightedRegion={highlightedRegion}
                onRegionHover={setHighlightedRegion}
            />
            <div className="absolute inset-0 pointer-events-none z-[100]">
                <CustomCursor x={cursorX} y={cursorY} isClicking={isClicking} />
            </div>
        </div>
    );
};

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
    Database, FileSpreadsheet, BarChart3, Binary,
    Cpu, Layout, Settings, FileSearch,
    CheckCircle2, ChevronRight,
    ChevronDown, ArrowRight, Loader2
} from 'lucide-react';

interface Tool {
    id: string;
    name: string;
    category: string;
    icon?: React.ElementType;
    iconPath?: string;
    color: string;
}

interface Task {
    id: string;
    title: string;
    description: string;
    tools: string[];
    subtasks: {
        text: string;
        tools: string[];
    }[];
}

const TOOLS: Tool[] = [
    // Data Sources & Storage
    { id: 'excel', name: 'Excel', category: 'data', iconPath: '/logos/image1.svg', color: '#1D6F42' },
    { id: 'gsheets', name: 'Google Sheets', category: 'data', iconPath: '/logos/image2.svg', color: '#0F9D58' },
    { id: 'postgres', name: 'PostgreSQL', category: 'data', iconPath: '/logos/image3.svg', color: '#336791' },
    { id: 'mysql', name: 'MySQL', category: 'data', iconPath: '/logos/image4.svg', color: '#00758F' },
    { id: 'bigquery', name: 'BigQuery', category: 'data', iconPath: '/logos/image5.svg', color: '#4285F4' },
    { id: 'snowflake', name: 'Snowflake', category: 'data', iconPath: '/logos/image6.svg', color: '#29B5E8' },
    // Analytics & BI
    { id: 'powerbi', name: 'Power BI', category: 'bi', iconPath: '/logos/image7.svg', color: '#F2C811' },
    { id: 'tableau', name: 'Tableau', category: 'bi', iconPath: '/logos/image8.svg', color: '#E97627' },
    { id: 'looker', name: 'Looker', category: 'bi', iconPath: '/logos/image9.svg', color: '#4285F4' },
    // Engineering & Pipelines
    { id: 'python', name: 'Python', category: 'engineering', iconPath: '/logos/image10.svg', color: '#3776AB' },
    { id: 'pandas', name: 'Pandas', category: 'engineering', iconPath: '/logos/image11.svg', color: '#150458' },
    { id: 'airflow', name: 'Airflow', category: 'engineering', iconPath: '/logos/image12.svg', color: '#017CEE' },
    { id: 'dbt', name: 'dbt', category: 'engineering', iconPath: '/logos/image13.svg', color: 'var(--brand-primary)' },
    // AI & Advanced Analytics
    { id: 'woodfrog-ai', name: 'woodfrog AI', category: 'ai', iconPath: '/logos/woodfrog-logo.svg', color: 'var(--brand-primary)' },
    // Collaboration
    { id: 'notion', name: 'Notion', category: 'collab', iconPath: '/logos/image15.svg', color: '#FFFFFF' },
    { id: 'confluence', name: 'Confluence', category: 'collab', iconPath: '/logos/image16.svg', color: '#0052CC' },
];

const TASKS: Task[] = [
    {
        id: 'dashboard',
        title: 'Build a Business Dashboard',
        description: 'Create a decision-ready dashboard from raw, scattered data.',
        tools: ['excel', 'gsheets', 'postgres', 'mysql', 'powerbi', 'tableau', 'looker', 'woodfrog-ai'],
        subtasks: [
            { text: 'Collect data from multiple sources', tools: ['excel', 'gsheets', 'postgres', 'woodfrog-ai'] },
            { text: 'Clean and normalize values', tools: ['mysql', 'postgres', 'woodfrog-ai'] },
            { text: 'Define KPIs and metrics', tools: ['powerbi', 'tableau', 'woodfrog-ai'] },
            { text: 'Design charts and layouts', tools: ['tableau', 'looker', 'woodfrog-ai'] },
            { text: 'Validate numbers with stakeholders', tools: ['looker', 'excel', 'woodfrog-ai'] }
        ]
    },
    {
        id: 'cleaning',
        title: 'Data Cleaning & Preparation',
        description: 'Make raw data usable for analytics and reporting.',
        tools: ['excel', 'gsheets', 'postgres', 'mysql', 'python', 'pandas', 'woodfrog-ai'],
        subtasks: [
            { text: 'Handle nulls and duplicates', tools: ['python', 'pandas', 'woodfrog-ai'] },
            { text: 'Standardize formats (dates, currency)', tools: ['excel', 'python', 'woodfrog-ai'] },
            { text: 'Remove outliers and errors', tools: ['pandas', 'mysql', 'woodfrog-ai'] },
            { text: 'Join datasets across sources', tools: ['postgres', 'mysql', 'woodfrog-ai'] },
            { text: 'Validate data accuracy', tools: ['python', 'gsheets', 'woodfrog-ai'] }
        ]
    },
    {
        id: 'metrics',
        title: 'Metric & KPI Definition',
        description: 'Translate business goals into measurable metrics.',
        tools: ['excel', 'gsheets', 'postgres', 'mysql', 'notion', 'confluence', 'woodfrog-ai'],
        subtasks: [
            { text: 'Identify business goals', tools: ['notion', 'confluence', 'woodfrog-ai'] },
            { text: 'Define KPI formulas', tools: ['excel', 'gsheets', 'woodfrog-ai'] },
            { text: 'Align metrics across teams', tools: ['notion', 'postgres', 'woodfrog-ai'] },
            { text: 'Handle edge cases', tools: ['mysql', 'excel', 'woodfrog-ai'] },
            { text: 'Document metric logic', tools: ['confluence', 'notion', 'woodfrog-ai'] }
        ]
    },
    {
        id: 'reporting',
        title: 'Reporting & Monitoring',
        description: 'Keep insights reliable and up-to-date over time.',
        tools: ['powerbi', 'tableau', 'bigquery', 'snowflake', 'airflow', 'dbt', 'woodfrog-ai'],
        subtasks: [
            { text: 'Schedule data refreshes', tools: ['airflow', 'snowflake', 'woodfrog-ai'] },
            { text: 'Monitor pipeline failures', tools: ['airflow', 'dbt', 'woodfrog-ai'] },
            { text: 'Track metric changes', tools: ['bigquery', 'dbt', 'woodfrog-ai'] },
            { text: 'Maintain historical views', tools: ['snowflake', 'powerbi', 'woodfrog-ai'] },
            { text: 'Update dashboards as data evolves', tools: ['powerbi', 'tableau', 'woodfrog-ai'] }
        ]
    }
];

export const DataIntelligenceSection = () => {
    const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
    const [currentSubtaskIndex, setCurrentSubtaskIndex] = useState(-1);
    const [completedSubtasks, setCompletedSubtasks] = useState<number[]>([]);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isExecuting, setIsExecuting] = useState(false);
    const [hasAutoStarted, setHasAutoStarted] = useState(false);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.6 });

    // Auto-start task when in view
    useEffect(() => {
        if (isInView && !hasAutoStarted) {
            setActiveTaskId('dashboard');
            setHasAutoStarted(true);
        }
    }, [isInView, hasAutoStarted]);

    const activeTask = TASKS.find(t => t.id === activeTaskId);

    // Reset simulation when task changes
    useEffect(() => {
        if (activeTaskId) {
            setCurrentSubtaskIndex(0);
            setCompletedSubtasks([]);
            setTimeElapsed(0);
            setIsExecuting(true);
        } else {
            setCurrentSubtaskIndex(-1);
            setCompletedSubtasks([]);
            setIsExecuting(false);
        }
    }, [activeTaskId]);

    // Unified logic to handle reset and progression
    useEffect(() => {
        if (isExecuting && activeTask && currentSubtaskIndex >= activeTask.subtasks.length) {
            setIsExecuting(false);
        }
    }, [currentSubtaskIndex, activeTask, isExecuting]);

    // Handle sequential execution
    useEffect(() => {
        if (!isExecuting || !activeTask || currentSubtaskIndex < 0 || currentSubtaskIndex >= activeTask.subtasks.length) {
            return;
        }

        const subtaskDuration = 2000 + Math.random() * 2000; // 2-4 seconds

        const timer = setTimeout(() => {
            setCompletedSubtasks(prev => [...prev, currentSubtaskIndex]);

            // Wait slightly before moving to next
            setTimeout(() => {
                setCurrentSubtaskIndex(prev => prev + 1);
            }, 1000);
        }, subtaskDuration);

        return () => clearTimeout(timer);
    }, [isExecuting, currentSubtaskIndex, activeTaskId]);

    // Smooth time increment
    useEffect(() => {
        if (!isExecuting) return;

        const interval = setInterval(() => {
            setTimeElapsed(prev => prev + 0.1);
        }, 100);

        return () => clearInterval(interval);
    }, [isExecuting]);

    const activeSubtaskTools = activeTask?.subtasks[currentSubtaskIndex]?.tools || [];

    return (
        <section ref={sectionRef} className="relative w-full lg:min-h-screen bg-transparent pt-12 md:pt-32 pb-8 md:pb-24 overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 md:gap-16 items-center">

                {/* Mobile-only heading above the circle */}
                <div className="block lg:hidden w-full px-4 mb-0">
                    <h2 className="text-3xl md:text-5xl font-black text-white leading-tight text-center">
                        One AI. <span className="text-brand-primary italic">Every Tool.</span>
                    </h2>
                </div>

                {/* Left Side: Radial Tool Diagram */}
                <div className="flex-[1.2] relative aspect-square w-full max-w-[650px] flex items-center justify-center">

                    {/* SVG Connection Lines Layer */}
                    <svg className="absolute inset-0 w-full h-full z-0 overflow-visible pointer-events-none" viewBox="0 0 100 100">
                        {TOOLS.map((tool, index) => {
                            const angle = (index / TOOLS.length) * 2 * Math.PI - Math.PI / 2;
                            const tx = 50 + Math.cos(angle) * 38;
                            const ty = 50 + Math.sin(angle) * 38;

                            const isTaskActive = activeTask?.tools.includes(tool.id);
                            const isSubtaskActive = activeSubtaskTools.includes(tool.id);

                            return (
                                <motion.line
                                    key={`line-${tool.id}`}
                                    x1="50"
                                    y1="50"
                                    x2={tx}
                                    y2={ty}
                                    stroke={isSubtaskActive ? 'var(--brand-primary)' : (isTaskActive ? '#444' : '#222')}
                                    strokeWidth={isSubtaskActive ? 0.8 : (isTaskActive ? 0.4 : 0.1)}
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{
                                        pathLength: isTaskActive ? 1 : 0,
                                        opacity: isSubtaskActive ? 1 : (isTaskActive ? 0.4 : 0),
                                        stroke: isSubtaskActive ? 'var(--brand-primary)' : (isTaskActive ? '#333' : '#111')
                                    }}
                                    transition={{
                                        duration: isSubtaskActive ? 0.3 : 0.8,
                                        ease: "easeInOut"
                                    }}
                                />
                            );
                        })}
                    </svg>

                    {/* Center Woodfrog Logo Node */}
                    <div className="relative z-20 p-8 bg-white rounded-full border border-zinc-200 shadow-[0_0_50px_rgba(37,99,235,0.2)] scale-75 md:scale-100">
                        <img src="/logos/woodfrog-logo.svg" width="48" height="36" alt="Woodfrog" className="object-contain" />
                        <div className="absolute -inset-2 bg-blue-600/10 rounded-full blur-xl animate-pulse" />
                    </div>

                    {/* Orbiting Tool Nodes */}
                    {TOOLS.map((tool, index) => {
                        const angle = (index / TOOLS.length) * 2 * Math.PI - Math.PI / 2;
                        const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 140 : 240;
                        const x = Math.cos(angle) * radius;
                        const y = Math.sin(angle) * radius;

                        const isTaskActive = activeTask?.tools.includes(tool.id);
                        const isSubtaskActive = activeSubtaskTools.includes(tool.id);

                        return (
                            <motion.div
                                key={tool.id}
                                className={`absolute z-10 p-2.5 md:p-3 rounded-xl border transition-all duration-500 flex items-center justify-center
                                    ${isSubtaskActive || isTaskActive
                                        ? 'bg-white shadow-xl'
                                        : 'bg-white border-zinc-200 opacity-100'}`}
                                animate={{
                                    x,
                                    y,
                                    scale: isSubtaskActive ? 1.25 : (isTaskActive ? 1.1 : 1),
                                    opacity: activeTaskId ? (isTaskActive ? 1 : 0.2) : 0.6
                                }}
                                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                                style={{
                                    boxShadow: isSubtaskActive ? `0 0 30px ${tool.color}44` : 'none',
                                    borderColor: isSubtaskActive ? tool.color : (isTaskActive ? '#444' : 'transparent')
                                }}
                            >
                                {tool.iconPath ? (
                                    <img
                                        src={tool.iconPath}
                                        alt={tool.name}
                                        className="w-5 h-5 object-contain"
                                        style={{
                                            filter: 'none'
                                        }}
                                    />
                                ) : (
                                    tool.icon && <tool.icon size={20} style={{ color: isSubtaskActive || isTaskActive ? tool.color : '#333' }} />
                                )}

                                {/* Tool Name Label on Active - hidden on mobile */}
                                <AnimatePresence>
                                    {isTaskActive && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            className={`absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-[9px] font-bold tracking-wider whitespace-nowrap z-50 shadow-xl border uppercase transition-colors duration-300 hidden md:block
                                                ${isSubtaskActive ? 'bg-brand-primary text-black border-transparent' : 'bg-white text-zinc-600 border-zinc-200'}`}
                                        >
                                            {tool.name}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Right Side: Task Selector */}
                <div className="flex-1 w-full space-y-4">
                    <div className="mb-12 hidden lg:block">
                        <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                            One AI. <span className="text-brand-primary italic">Every Tool.</span>
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {TASKS.map((task) => (
                            // Cards are more compact on mobile
                            <div
                                key={task.id}
                                className={`group cursor-pointer rounded-2xl border transition-all duration-300 overflow-hidden
                  ${activeTaskId === task.id
                                        ? 'bg-zinc-900/80 border-zinc-700 shadow-[0_20px_50px_rgba(0,0,0,0.5)]'
                                        : 'bg-transparent border-transparent hover:bg-zinc-900/30'}`}
                                onClick={() => setActiveTaskId(activeTaskId === task.id ? null : task.id)}
                            >
                                <div className="p-3 md:p-6 flex items-center justify-between">
                                    <div className="flex items-center gap-3 md:gap-5">
                                        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center transition-all duration-300
                      ${activeTaskId === task.id ? 'bg-brand-primary text-black scale-110 shadow-lg' : 'bg-zinc-800 text-zinc-500 group-hover:bg-zinc-700'}`}>
                                            {activeTaskId === task.id ? <CheckCircle2 size={16} className="md:w-5 md:h-5" /> : <ArrowRight size={16} className="md:w-5 md:h-5" />}
                                        </div>
                                        <span className={`text-sm md:text-xl font-bold transition-colors ${activeTaskId === task.id ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
                                            {task.title}
                                        </span>
                                    </div>
                                    <ChevronDown className={`text-zinc-600 transition-transform duration-500 ${activeTaskId === task.id ? 'rotate-180 text-brand-primary' : ''}`} />
                                </div>

                                <AnimatePresence>
                                    {activeTaskId === task.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                                        >
                                            <div className="px-3 md:px-6 pb-4 md:pb-8 pt-0 ml-[36px] md:ml-[60px] border-l border-zinc-800 pl-4 md:pl-8 space-y-4 md:space-y-8">
                                                <p className="text-[#7C86A5] text-xs md:text-lg leading-relaxed max-w-lg">
                                                    {task.description}
                                                </p>

                                                <div className="space-y-4">
                                                    <h4 className="text-[#A9B4FF]/60 font-bold uppercase tracking-widest text-[10px] flex items-center gap-2">
                                                        Toolkits required
                                                    </h4>
                                                    <div className="flex gap-3">
                                                        {task.tools.map(toolId => {
                                                            const tool = TOOLS.find(t => t.id === toolId);
                                                            if (!tool) return null;
                                                            return (
                                                                <div key={toolId} className="w-8 h-8 rounded-lg bg-white flex items-center justify-center border border-zinc-200 shadow-sm" title={tool.name}>
                                                                    {tool.iconPath ? (
                                                                        <img
                                                                            src={tool.iconPath}
                                                                            alt={tool.name}
                                                                            className="w-4 h-4 object-contain"
                                                                        />
                                                                    ) : (
                                                                        tool.icon && <tool.icon size={16} style={{ color: tool.color }} />
                                                                    )}
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>

                                                <div className="space-y-5">
                                                    <div className="flex flex-col gap-4">
                                                        {task.subtasks.map((step, idx) => {
                                                            const isCompleted = completedSubtasks.includes(idx);
                                                            const isCurrent = currentSubtaskIndex === idx;

                                                            return (
                                                                <motion.div
                                                                    initial={{ x: -10, opacity: 0 }}
                                                                    animate={{ x: 0, opacity: 1 }}
                                                                    transition={{ delay: idx * 0.1 }}
                                                                    key={idx}
                                                                    className={`flex items-center gap-3 text-base font-medium transition-colors duration-300
                                                                        ${isCurrent ? 'text-white' : isCompleted ? 'text-[#7C86A5]/60' : 'text-[#7C86A5]'}`}
                                                                >
                                                                    {isCompleted ? (
                                                                        <CheckCircle2 size={18} className="text-brand-primary shrink-0" />
                                                                    ) : isCurrent ? (
                                                                        <Loader2 size={18} className="text-brand-primary shrink-0 animate-spin" />
                                                                    ) : (
                                                                        <div className="w-[18px] flex justify-center shrink-0">
                                                                            <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                                                                        </div>
                                                                    )}
                                                                    <span>{step.text}</span>
                                                                </motion.div>
                                                            );
                                                        })}
                                                    </div>

                                                    <div className="pt-2 flex items-center justify-start">
                                                        <div className="text-[#7C86A5] text-sm font-medium">
                                                            time taken <ArrowRight size={14} className="inline mx-1" /> <span className="text-[#A9B4FF] font-bold tabular-nums">
                                                                {timeElapsed.toFixed(1)}secs
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

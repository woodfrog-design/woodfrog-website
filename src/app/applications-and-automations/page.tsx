'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Home, Calendar, Plus, FileText, Search, User, ChevronRight, Activity, Clock, CheckCircle2, Layout, Database, FileJson, Settings, RefreshCw, Lock, Shield, Bell } from 'lucide-react';
import ApplicationsAutomationsDemo from '@/components/animations/applications-automations-demo';

/* ─────────────────────── DATA ─────────────────────── */

const SOLUTIONS = [
    { num: '01', text: 'Reduce human error through smart, automated workflows' },
    { num: '02', text: 'Bring all your data together securely in a high-performance cloud platform' },
    { num: '03', text: 'Empower your teams with user-friendly tools they can access anywhere, from any device' },
    { num: '04', text: 'Achieve higher productivity through smarter, connected teamwork' },
];

const SERVICE_ITEMS = [
    {
        id: 'custom-apps',
        title: 'Custom-built business applications',
        description: 'From smart forms to powerful management systems, we build Power Apps that align seamlessly with the way your teams work.',
    },
    {
        id: 'ux-ui',
        title: 'Optimized UX/UI and custom design',
        description: 'We design applications that feel natural and modern, aligned with your organization\'s image and built to drive engagement.',
    },
    {
        id: 'azure',
        title: 'Secure and scalable Azure-hosted backend',
        description: 'Our solutions leverage Azure\'s enterprise-grade infrastructure for reliability, security, and seamless scalability.',
    },
    {
        id: 'automation',
        title: 'Smart automation',
        description: 'We build intelligent Power Automate flows that eliminate repetitive tasks and keep your processes running smoothly.',
    },
    {
        id: 'integrations',
        title: 'Seamless integrations',
        description: 'Connect your apps with Microsoft 365, Teams, SharePoint, and third-party services for a unified digital workspace.',
    },
    {
        id: 'security',
        title: 'Security and access management',
        description: 'Role-based access, data encryption, and compliance-ready configurations to protect your business data.',
    },
    {
        id: 'monitoring',
        title: 'Data monitoring and analytics',
        description: 'Built-in dashboards and real-time analytics to track performance, usage, and key business metrics.',
    },
];

const TECHNOLOGIES = [
    { name: 'Microsoft Power Apps', desc: 'Creation of custom applications accessible on all devices.', color: '#742774', icon: 'powerapps' },
    { name: 'Azure-based application backend', desc: 'APIs, databases, and cloud services that deliver performance and scalability.', color: '#0078D4', icon: 'azure' },
    { name: 'Microsoft Power Automate', desc: 'Intelligent workflow automation and cross-application integrations.', color: '#0066FF', icon: 'automate' },
    { name: 'Microsoft Dataverse', desc: 'Used when it is the option best suited to your needs.', color: '#00A651', icon: 'dataverse' },
    { name: 'Microsoft Teams', desc: 'Real-time collaboration and notifications.', color: '#6264A7', icon: 'teams' },
    { name: 'Power BI', desc: 'Powerful data visualization and analytics.', color: '#F2C811', icon: 'powerbi' },
];

const PROFESSIONALS = [
    { name: 'Amit Patel', sub: 'Project Manager', schedule: [null, 'Absence', 'Remote Work', 'Office'] },
    { name: 'Arjun Singh', sub: 'Lead Developer', schedule: ['Office', null, null, null], isGroup: true, groupName: 'Management' },
    { name: 'Priya Sharma', sub: 'UI/UX Designer', schedule: ['Office', null, null, null] },
    { name: 'Neha Gupta', sub: 'Senior Engineer', schedule: ['Office', null, null, null] },
    { name: 'Vikram Malhotra', sub: 'QA Manager', schedule: ['Office', 'Office', 'Remote Work', 'Comp. Time'] },
    { name: 'Ananya Reddy', sub: 'Fullstack Dev', schedule: ['Office', 'Office', 'Remote Work', 'Office'] },
    { name: 'Rohan Verma', sub: 'Backend Dev', schedule: ['Office', 'Office', 'Remote Work', 'Office'] },
    { name: 'Sneha Iyer', sub: 'Project Associate', schedule: ['Office', null, null, null] },
    { name: 'Kavita Rao', sub: 'Operations Lead', schedule: ['Office', null, null, null], isGroup: true, groupName: 'Operations' },
    { name: 'Sanjay Kumar', sub: 'HR Manager', schedule: ['Office', 'Office', null, null] },
];

/* ─────────────────────── ILLUSTRATION COMPONENTS ─────────────────────── */

function StatusTag({ type }: { type: string | null }) {
    if (!type) return <div className="h-full w-full border-r border-b border-white/5" />;

    const styles: Record<string, string> = {
        'Office': 'bg-brand-primary/10 text-brand-primary border border-brand-primary/20',
        'Remote Work': 'bg-[#6b6b4a]/10 text-[#f4ead5] border border-[#f4ead5]/20',
        'Absence': 'bg-white/5 text-gray-400 border border-white/10',
        'Comp. Time': 'bg-white/5 text-gray-400 border border-white/10',
    };

    return (
        <div className="h-full w-full border-r border-b border-white/5 flex items-center justify-center p-1">
            <div className={`text-[10px] py-1 px-2 rounded-md font-medium w-full text-center ${styles[type] || styles['Absence']}`}>
                {type}
            </div>
        </div>
    );
}

/** Dashboard Home View for the mockup */
/** Dashboard Home View for the mockup - JIRA Style */
function MockupHomeView() {
    const projects = [
        { title: 'Woodfrog Website Redesign', status: 'In Progress', priority: 'High', color: 'bg-brand-primary' },
        { title: 'Mobile App API Integration', status: 'To Do', priority: 'Medium', color: 'bg-gray-500' },
        { title: 'Cloud Infrastructure Audit', status: 'Blocked', priority: 'High', color: 'bg-red-500' },
    ];

    const calendarItems = [
        { event: 'Sprint Planning', time: '10:00 AM', type: 'Meeting' },
        { event: 'Deployment Window', time: '02:00 PM', type: 'Action' },
        { event: 'Client Feedback', time: '04:30 PM', type: 'Review' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 overflow-y-auto space-y-10 pr-4 pb-10"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
            {/* Header */}
            <header>
                <div className="flex items-center gap-3 mb-2">
                    <span className="w-8 h-[2px] bg-brand-primary rounded-full" />
                    <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest">Project Dashboard</span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Active Projects</h2>
                <p className="text-sm text-gray-500">Track and manage your team&apos;s progress in real-time.</p>
            </header>

            {/* Pending Projects List */}
            <div className="space-y-4">
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest pl-2">Pending & In Progress</p>
                <div className="grid grid-cols-1 gap-4">
                    {projects.map((proj, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center justify-between group hover:bg-white/[0.08] transition-all">
                            <div className="flex items-center gap-5">
                                <div className={`w-3 h-12 rounded-full ${proj.color}`} />
                                <div>
                                    <h4 className="text-lg font-bold text-white group-hover:text-brand-primary transition-colors">{proj.title}</h4>
                                    <div className="flex gap-3 mt-1">
                                        <span className="text-[10px] font-bold text-gray-500 bg-white/5 px-2 py-0.5 rounded uppercase tracking-tighter">Priority: {proj.priority}</span>
                                        <span className="text-[10px] font-bold text-brand-primary uppercase tracking-tighter">{proj.status}</span>
                                    </div>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Calendar Focus */}
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-lg font-bold text-white">Daily Schedule</h3>
                    <Calendar className="w-5 h-5 text-brand-primary" />
                </div>
                <div className="grid grid-cols-1 gap-6">
                    {calendarItems.map((item, i) => (
                        <div key={i} className="flex items-center gap-6 group">
                            <div className="w-[80px] text-[12px] font-bold text-gray-500 tracking-tighter">{item.time}</div>
                            <div className="flex-1 h-[1px] bg-white/5" />
                            <div className="flex items-center gap-4 bg-white/5 border border-white/5 px-5 py-3 rounded-xl min-w-[200px] group-hover:bg-white/10 transition-colors">
                                <div className="w-2 h-2 rounded-full bg-brand-primary" />
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-white">{item.event}</p>
                                    <p className="text-[10px] text-gray-500 uppercase">{item.type}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

/** Schedule View for the mockup */
function MockupScheduleView() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 overflow-hidden flex flex-col"
        >
            <div className="mb-10">
                <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Organization Map</h2>
                <p className="text-sm text-gray-500">Real-time presence and availability tracking across all regional offices.</p>
            </div>

            {/* Grid Table */}
            <div className="flex-1 border border-white/5 rounded-2xl overflow-hidden bg-white/5 flex flex-col shadow-inner">
                {/* Table Header */}
                <div className="grid grid-cols-[200px_repeat(4,1fr)] bg-white/[0.04] border-b border-white/5">
                    <div className="p-5 flex items-center gap-2.5 border-r border-white/5">
                        <span className="text-[13px] font-bold text-white">Personnel</span>
                        <span className="bg-brand-primary/20 text-brand-primary text-[10px] px-2 py-0.5 rounded-full font-bold">IN</span>
                    </div>
                    {['Mon', 'Tue', 'Wed', 'Thu'].map((day, i) => (
                        <div key={i} className="p-5 text-center border-r border-white/5 last:border-r-0">
                            <span className="text-[11px] text-gray-500 uppercase tracking-[0.1em] font-bold">{day}</span>
                        </div>
                    ))}
                </div>

                {/* Table Rows - scrollbar hidden */}
                <div
                    className="flex-1 divide-y divide-white/5 overflow-y-auto"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {PROFESSIONALS.map((prof, i) => (
                        <React.Fragment key={i}>
                            {prof.isGroup && (
                                <div className="bg-white/[0.02] px-6 py-3 flex items-center gap-2.5">
                                    <ChevronRight className="w-3.5 h-3.5 text-brand-primary" />
                                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em]">{prof.groupName}</span>
                                </div>
                            )}
                            <div className="grid grid-cols-[200px_repeat(4,1fr)] group hover:bg-white/[0.03] transition-all duration-300 cursor-default">
                                <div className="p-4 flex items-center gap-4 border-r border-white/5">
                                    <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center overflow-hidden border border-white/10 group-hover:scale-110 transition-transform">
                                        <User className="w-4 h-4 text-gray-500" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[12px] font-bold text-white leading-tight group-hover:text-brand-primary transition-colors truncate">{prof.name}</p>
                                        <p className="text-[9px] text-gray-500 leading-tight mt-0.5">{prof.sub}</p>
                                    </div>
                                </div>
                                {prof.schedule.map((status, j) => (
                                    <StatusTag key={j} type={status} />
                                ))}
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

/** Plus / Create New View for the mockup */
function MockupCreateView() {
    const templates = [
        { name: 'Task Template', icon: Layout, desc: 'Standard JIRA-style issue type' },
        { name: 'Sprint Board', icon: Database, desc: 'New kanban or scrum board' },
        { name: 'Documentation', icon: FileJson, desc: 'Project wiki or spec sheet' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 space-y-10"
        >
            <header>
                <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">New Project</h2>
                <p className="text-sm text-gray-500">Initialize a new workflow for your personnel.</p>
            </header>

            <div className="space-y-4">
                <div className="p-1.5 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Project or Task name..."
                        className="bg-transparent border-none outline-none text-white px-4 py-2 flex-1 text-sm font-medium"
                    />
                    <button className="bg-brand-primary text-white px-6 py-2 rounded-xl text-xs font-bold hover:bg-brand-primary/80 transition-colors shadow-lg shadow-brand-primary/20">
                        Create
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest pl-2">Project Templates</p>
                {templates.map((temp, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-5 p-5 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.06] transition-all cursor-pointer group"
                    >
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-105 transition-transform">
                            <temp.icon className="w-6 h-6 text-brand-primary" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-bold text-white group-hover:text-brand-primary transition-colors">{temp.name}</p>
                            <p className="text-[11px] text-gray-500">{temp.desc}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-700 group-hover:text-white transition-colors" />
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

/** File / Documents View for the mockup */
function MockupFileView() {
    const files = [
        { name: 'Architecture_Phase_1.pdf', size: '2.4MB', date: '2h ago' },
        { name: 'Personnel_Onboarding.xlsx', size: '1.1MB', date: '5h ago' },
        { name: 'Sprint_24_Backlog.json', size: '128KB', date: 'Yesterday' },
        { name: 'Client_Success_Brief.txt', size: '8KB', date: 'Yesterday' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col"
        >
            <header className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-3xl font-bold text-white tracking-tight">Project Assets</h2>
                    <div className="flex gap-2">
                        <div className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-gray-300">Phase: Development</div>
                    </div>
                </div>
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search project files..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-xs text-white outline-none focus:border-brand-primary/50 transition-colors"
                    />
                </div>
            </header>

            <div className="flex-1 overflow-y-auto space-y-2 pr-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {files.map((file, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-between p-4 bg-white/[0.01] hover:bg-white/[0.03] border border-white/0 hover:border-white/5 rounded-xl transition-all group cursor-pointer"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                                <FileText className="w-5 h-5 text-brand-primary" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-white group-hover:text-brand-primary transition-colors">{file.name}</p>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest">{file.size} • {file.date}</p>
                            </div>
                        </div>
                        <Settings className="w-4 h-4 text-gray-700 group-hover:text-white transition-colors" />
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

function HeroScheduleMockup() {
    const [activeSidebar, setActiveSidebar] = useState('calendar');

    const sidebarItems = [
        { id: 'home', icon: Home },
        { id: 'calendar', icon: Calendar },
        { id: 'plus', icon: Plus },
        { id: 'file', icon: FileText },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 40 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[120%] aspect-[1.4/1] bg-white/[0.03] backdrop-blur-3xl rounded-l-[32px] overflow-hidden border-l border-t border-b border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.4)] flex"
        >
            {/* Sidebar */}
            <div className="w-[70px] border-r border-white/5 flex flex-col items-center py-8 gap-8 bg-white/[0.02] backdrop-blur-xl shrink-0">
                {sidebarItems.map(({ id, icon: Icon }) => (
                    <div
                        key={id}
                        className="relative w-full flex justify-center py-2"
                        onClick={() => setActiveSidebar(id)}
                    >
                        <Icon
                            className={`w-6 h-6 transition-all duration-300 cursor-pointer ${activeSidebar === id ? 'text-brand-primary' : 'text-gray-500 hover:text-white'
                                }`}
                        />
                        {activeSidebar === id && (
                            <motion.div
                                layoutId="sidebar-indicator"
                                className="absolute -left-[1px] top-1/2 -translate-y-1/2 w-1.5 h-8 bg-brand-primary rounded-r-full shadow-[0_0_15px_rgba(249,220,102,0.4)]"
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col bg-white/[0.01] overflow-hidden min-h-0">
                {/* Header */}
                <div className="h-[80px] border-b border-white/5 flex items-center justify-between px-10 bg-white/[0.02] shrink-0">
                    <div className="flex items-center gap-2.5">
                        <img src="/logos/woodfrog-logo.svg" width="36" height="28" alt="Woodfrog" className="object-contain" />
                        <span className="text-2xl font-bold tracking-tighter text-white">woodfrog</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-sm font-bold text-white leading-tight">Roxanne Dubois</p>
                            <p className="text-[11px] text-gray-500 leading-tight">Automation Dept.</p>
                        </div>
                        <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-brand-primary to-[#f4ead5] p-0.5 shadow-lg shadow-brand-primary/20">
                            <div className="w-full h-full rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
                                <User className="w-6 h-6 text-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* View Container */}
                <div className="flex-1 p-10 overflow-y-auto flex flex-col relative min-h-0" style={{ scrollbarWidth: 'thin' }}>
                    <AnimatePresence mode="wait">
                        {activeSidebar === 'home' && <MockupHomeView key="home" />}
                        {activeSidebar === 'calendar' && <MockupScheduleView key="schedule" />}
                        {activeSidebar === 'plus' && <MockupCreateView key="plus" />}
                        {activeSidebar === 'file' && <MockupFileView key="file" />}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
}

/** Chat-like agent conversation illustration */
function AgentChatIllustration({ variant }: { variant: 'inventory' | 'chart' | 'workflow' | 'default' }) {
    const agentIcon = (
        <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 11L7 3L12 11" stroke="white" strokeWidth="1.5" fill="none" />
            </svg>
        </div>
    );

    if (variant === 'inventory') {
        return (
            <div className="space-y-4">
                <div className="flex items-start gap-3">
                    {agentIcon}
                    <div className="space-y-3 flex-1">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-gray-300">
                            <p className="mb-2">Here is the current inventory status:</p>
                            <ul className="list-disc ml-4 space-y-1 text-gray-400">
                                <li>1,250 active SKUs in the warehouse.</li>
                                <li>42 items are below their reorder point.</li>
                            </ul>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-gray-300">
                            <p className="font-medium mb-2">Critical examples:</p>
                            <ul className="list-disc ml-4 space-y-1 text-gray-400">
                                <li>SKU-1045 (Mumbai) &rarr; stock: 120, threshold: 200.</li>
                                <li>SKU-2078 (Bangalore) &rarr; stock: 35, threshold: 100.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (variant === 'chart') {
        return (
            <div className="flex items-start gap-3">
                {agentIcon}
                <div className="space-y-3 flex-1">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <div className="flex items-end gap-2 h-24 mb-3">
                            {[40, 55, 35, 70, 60, 80, 45, 90, 75, 65].map((h, i) => (
                                <div key={i} className="flex-1 bg-[#10B981] rounded-t opacity-60" style={{ height: `${h}%` }} />
                            ))}
                        </div>
                        <p className="text-sm text-gray-400">Regional trend analysis - Mumbai performance shows 23% growth</p>
                    </div>
                </div>
            </div>
        );
    }

    if (variant === 'workflow') {
        return (
            <div className="flex items-start gap-3">
                {agentIcon}
                <div className="space-y-3 flex-1">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-gray-300">
                        <p className="font-medium mb-2">Automated workflow triggered:</p>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="#22c55e" strokeWidth="1.5" /></svg>
                                </div>
                                <span className="text-gray-400">Data validation complete</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-[#10B981]/20 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-[#10B981]" />
                                </div>
                                <span className="text-gray-400">Supply chain sync in progress...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-start gap-3">
            {agentIcon}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex-1 text-sm text-gray-300">
                Analyzing your localized data patterns...
            </div>
        </div>
    );
}

/* ─────────────────────── SERVICE ILLUSTRATIONS ─────────────────────── */

// Shared icon components matching the Microsoft tool style from screenshots

function PowerAppsIcon({ size = 40 }: { size?: number }) {
    return (
        <img src="/logos/tools25.svg" width={size} height={size} alt="Power Apps" className="object-contain" />
    );
}

function AzureIcon({ size = 40 }: { size?: number }) {
    return (
        <img src="/logos/tools29.svg" width={size} height={size} alt="Azure" className="object-contain" />
    );
}

function PowerAutomateIcon({ size = 40 }: { size?: number }) {
    return (
        <img src="/logos/tools20.svg" width={size} height={size} alt="Power Automate" className="object-contain" />
    );
}

function TeamsIcon({ size = 40 }: { size?: number }) {
    return (
        <img src="/logos/tools26.svg" width={size} height={size} alt="Teams" className="object-contain" />
    );
}

function SharePointIcon({ size = 40 }: { size?: number }) {
    return (
        <img src="/logos/tools27.svg" width={size} height={size} alt="SharePoint" className="object-contain" />
    );
}

function PowerBIIcon({ size = 40 }: { size?: number }) {
    return (
        <img src="/logos/image7.svg" width={size} height={size} alt="Power BI" className="object-contain" />
    );
}

function DataverseIcon({ size = 40 }: { size?: number }) {
    return (
        <img src="/logos/tools28.svg" width={size} height={size} alt="Dataverse" className="object-contain" />
    );
}

// Animated dashed line connector
function DashedLine({ vertical = false, length = 60, color = '#8B6914', animated = true, delay = 0 }: {
    vertical?: boolean; length?: number; color?: string; animated?: boolean; delay?: number;
}) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    return (
        <div ref={ref} className="flex items-center justify-center" style={{ [vertical ? 'height' : 'width']: length, [vertical ? 'width' : 'height']: 2, flexShrink: 0 }}>
            <svg width={vertical ? 2 : length} height={vertical ? length : 2} overflow="visible">
                <motion.line
                    x1={0} y1={0} x2={vertical ? 0 : length} y2={vertical ? length : 0}
                    stroke={color} strokeWidth={1.5} strokeDasharray="5 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={inView ? { pathLength: animated ? 1 : 1, opacity: 1 } : {}}
                    transition={{ delay, duration: 0.6, ease: 'easeOut' }}
                />
                {/* arrowhead */}
                <motion.polygon
                    points={vertical
                        ? `${-4},${length - 6} ${4},${length - 6} ${0},${length}`
                        : `${length - 6},-4 ${length - 6},4 ${length},0`
                    }
                    fill={color}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: delay + 0.5 }}
                />
            </svg>
        </div>
    );
}

// Travelling dot along a path
function TravelDot({ vertical = false, length = 60, color = '#8B6914', delay = 0 }: {
    vertical?: boolean; length?: number; color?: string; delay?: number;
}) {
    return (
        <motion.div
            className="absolute w-2.5 h-2.5 rounded-full shadow-md"
            style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}80` }}
            initial={vertical ? { top: 0, opacity: 0 } : { left: 0, opacity: 0 }}
            animate={vertical ? { top: length, opacity: [0, 1, 1, 0] } : { left: length, opacity: [0, 1, 1, 0] }}
            transition={{ delay, duration: 1.4, repeat: Infinity, repeatDelay: 1.2, ease: 'easeInOut' }}
        />
    );
}

// White rounded card
function ToolCard({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    return (
        <motion.div
            ref={ref}
            className={`bg-white rounded-2xl shadow-md flex items-center justify-center ${className}`}
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ border: '1px solid #e8e4dd' }}
        >
            {children}
        </motion.div>
    );
}

/* ── 1. Custom-built business applications ── */
function CustomAppsIllustration() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (!inView) return;
        const t = setInterval(() => setStep(s => (s + 1) % 4), 1600);
        return () => clearInterval(t);
    }, [inView]);

    const scheduleRows = [
        { name: 'Amit Patel', role: 'Project Manager', status: 'Remote', color: '#742774' },
        { name: 'Priya Sharma', role: 'UI/UX Designer', status: 'Office', color: '#0078D4' },
        { name: 'Arjun Singh', role: 'Lead Developer', status: 'Office', color: '#00A651' },
        { name: 'Neha Gupta', role: 'Sr. Engineer', status: 'Absence', color: '#8B6914' },
    ];

    return (
        <div ref={ref} className="bg-[#f7f5f2] rounded-2xl overflow-hidden p-6" style={{ minHeight: 320 }}>
            <div className="flex gap-5 h-full">
                {/* Scheduling form modal */}
                <motion.div
                    className="bg-white rounded-2xl shadow-xl p-5 w-full md:w-56 flex-shrink-0"
                    style={{ border: '1px solid #e8e4dd' }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <p className="text-[11px] font-bold text-[#8B6914] uppercase tracking-wider mb-3">Scheduling</p>
                    <div className="flex gap-1.5 mb-4">
                        <span className="px-3 py-1 text-[10px] font-bold rounded-full text-white" style={{ background: '#8B6914' }}>Full day</span>
                        <span className="px-3 py-1 text-[10px] font-bold rounded-full text-gray-400 bg-gray-100">Half day</span>
                    </div>
                    {[
                        { label: 'Day selection', value: 'Scattered days' },
                        { label: 'Duration', value: '2 business days' },
                        { label: 'Type', value: 'Office' },
                    ].map((row, i) => (
                        <motion.div
                            key={i}
                            className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                            initial={{ opacity: 0, x: -8 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.3 + i * 0.12 }}
                        >
                            <span className="text-[10px] text-gray-400">{row.label}</span>
                            <span className="text-[10px] font-semibold text-gray-700">{row.value}</span>
                        </motion.div>
                    ))}
                    <div className="flex gap-2 mt-4">
                        <button className="flex-1 py-1.5 rounded-lg text-[10px] text-gray-400 bg-gray-100 font-medium">Cancel</button>
                        <button className="flex-1 py-1.5 rounded-lg text-[10px] text-white font-bold" style={{ background: '#8B6914' }}>Save</button>
                    </div>
                </motion.div>

                {/* Team schedule grid */}
                <div className="flex-1 overflow-hidden hidden md:block">
                    <div className="grid grid-cols-5 text-[10px] text-gray-400 font-bold mb-2 px-1">
                        <div>Name</div>
                        {['Mon', 'Tue', 'Wed', 'Thu'].map(d => <div key={d} className="text-center">{d}</div>)}
                    </div>
                    {scheduleRows.map((row, i) => (
                        <motion.div
                            key={i}
                            className="grid grid-cols-5 items-center gap-1 mb-2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.2 + i * 0.1 }}
                        >
                            <div className="flex items-center gap-1.5">
                                <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[8px] font-bold flex-shrink-0" style={{ background: row.color }}>
                                    {row.name[0]}
                                </div>
                                <span className="text-[9px] text-gray-600 truncate">{row.name.split(' ')[0]}</span>
                            </div>
                            {[row.status, 'Office', i % 2 === 0 ? 'Remote' : 'Office', 'Office'].map((s, j) => {
                                const active = step === i && j === 0;
                                const bg = s === 'Remote' ? '#ef444415' : s === 'Absence' ? '#6b728015' : '#00A65115';
                                const tc = s === 'Remote' ? '#ef4444' : s === 'Absence' ? '#6b7280' : '#00A651';
                                return (
                                    <motion.div
                                        key={j}
                                        className="text-center py-1 rounded-md text-[8px] font-semibold"
                                        style={{ background: active ? `${row.color}20` : bg, color: active ? row.color : tc, border: active ? `1px solid ${row.color}40` : '1px solid transparent' }}
                                        animate={active ? { scale: [1, 1.06, 1] } : { scale: 1 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        {s}
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ── 2. Optimized UX/UI ── */
function UXUIIllustration() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });

    const navItems = ['Project Summary', 'Create a new project', 'Projects under review'];
    const tableRows = [
        { afe: '205007', name: 'Michaël', seq: '24-12-DEPT', status: 'Open', statusColor: '#22c55e' },
        { afe: '215068', name: 'Flavie', seq: '23-67-DEPT', status: 'Closed', statusColor: '#6b7280' },
        { afe: '475639', name: 'Paul-Alexandre', seq: '34-29-DEPT', status: 'Cancelled', statusColor: '#ef4444' },
        { afe: '123-24-5294-11', name: 'Mathieu', seq: '65-30-DEPT', status: 'Postponed', statusColor: '#f59e0b' },
        { afe: '140-32-3536-88', name: 'Catalina', seq: '34-20-DEPT', status: 'Blocked', statusColor: '#1d4ed8' },
    ];

    return (
        <div ref={ref} className="bg-[#f7f5f2] rounded-2xl overflow-hidden p-4" style={{ minHeight: 320 }}>
            <div className="flex gap-3 h-full">
                {/* Sidebar */}
                <motion.div
                    className="w-44 bg-[#7B2D2D] rounded-xl p-4 flex-shrink-0 hidden md:flex md:flex-col"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    <div className="text-white font-bold text-sm mb-1">woodfrog<span className="text-[#f9dc66]">✦</span></div>
                    <div className="text-[9px] text-red-300 mb-4">Enterprise Platform</div>
                    <div className="space-y-1">
                        {navItems.map((item, i) => (
                            <motion.div
                                key={i}
                                className={`text-[10px] px-2 py-1.5 rounded-lg cursor-pointer ${i === 0 ? 'bg-white/20 text-white font-semibold' : 'text-red-200 hover:bg-white/10'}`}
                                initial={{ opacity: 0, x: -8 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: 0.2 + i * 0.1 }}
                            >
                                {item}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Main content */}
                <motion.div
                    className="flex-1 bg-white rounded-xl p-4 overflow-hidden w-full"
                    style={{ border: '1px solid #e8e4dd' }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <div className="text-sm font-bold text-gray-800 mb-1">Project Summary</div>
                    <div className="border-b-2 border-[#8B6914] inline-block text-[10px] font-semibold text-[#8B6914] mb-3">All projects</div>
                    {/* Table header */}
                    <div className="grid grid-cols-4 text-[9px] text-gray-400 font-bold mb-1 px-1">
                        <div>AFE #</div><div>Employees</div><div>Sequential num.</div><div>Status</div>
                    </div>
                    {tableRows.map((row, i) => (
                        <motion.div
                            key={i}
                            className="grid grid-cols-4 items-center py-1.5 border-b border-gray-50 last:border-b-0 hover:bg-gray-50 rounded"
                            initial={{ opacity: 0, y: 6 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.4 + i * 0.08 }}
                        >
                            <span className="text-[9px] text-gray-600">{row.afe}</span>
                            <div className="flex items-center gap-1">
                                <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center text-[7px] font-bold text-gray-500">{row.name[0]}</div>
                                <span className="text-[9px] text-gray-700">{row.name}</span>
                            </div>
                            <span className="text-[9px] text-gray-500">{row.seq}</span>
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full inline-block" style={{ background: `${row.statusColor}18`, color: row.statusColor }}>
                                {row.status}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}

/* ── 3. Azure-hosted backend ── */
function AzureIllustration() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });

    const services = [
        { label: 'App Service', sublabel: 'Web API', color: '#0078D4', load: 78 },
        { label: 'Azure SQL', sublabel: 'Database', color: '#00A651', load: 62 },
        { label: 'Blob Storage', sublabel: 'Files & Media', color: '#F2C811', load: 45 },
        { label: 'Azure Functions', sublabel: 'Serverless', color: '#742774', load: 88 },
    ];

    return (
        <div ref={ref} className="bg-[#f7f5f2] rounded-2xl p-6" style={{ minHeight: 300 }}>
            {/* Azure header */}
            <motion.div
                className="flex items-center gap-3 mb-5"
                initial={{ opacity: 0, y: -8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
            >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#0078D415' }}>
                    <AzureIcon size={28} />
                </div>
                <div>
                    <div className="text-xs font-bold text-gray-800">Microsoft Azure</div>
                    <div className="text-[10px] text-gray-400">Enterprise Cloud Infrastructure</div>
                </div>
                <motion.div
                    className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold"
                    style={{ background: '#22c55e18', color: '#22c55e' }}
                    animate={{ opacity: [1, 0.6, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                    All systems operational
                </motion.div>
            </motion.div>

            {/* Service cards grid */}
            <div className="grid grid-cols-2 gap-3">
                {services.map((svc, i) => (
                    <motion.div
                        key={i}
                        className="bg-white rounded-xl p-3.5"
                        style={{ border: '1px solid #e8e4dd' }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.15 + i * 0.1, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div>
                                <div className="text-[10px] font-bold text-gray-800">{svc.label}</div>
                                <div className="text-[9px] text-gray-400">{svc.sublabel}</div>
                            </div>
                            <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: `${svc.color}15` }}>
                                <span className="text-[10px] font-bold" style={{ color: svc.color }}>{svc.load}%</span>
                            </div>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full rounded-full"
                                style={{ background: svc.color }}
                                initial={{ width: 0 }}
                                animate={inView ? { width: `${svc.load}%` } : {}}
                                transition={{ delay: 0.4 + i * 0.1, duration: 0.8, ease: 'easeOut' }}
                            />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Scalability indicator */}
            <motion.div
                className="mt-4 flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl"
                style={{ border: '1px solid #e8e4dd' }}
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 }}
            >
                <RefreshCw className="w-3.5 h-3.5 text-[#0078D4]" />
                <span className="text-[10px] text-gray-500 flex-1">Auto-scaling enabled</span>
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(n => (
                        <motion.div
                            key={n}
                            className="w-1 rounded-full"
                            style={{ background: '#0078D4', height: n <= 3 ? 10 : 6 }}
                            animate={{ height: [6, n * 3 + 4, 6] }}
                            transition={{ delay: n * 0.15, duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        />
                    ))}
                </div>
            </motion.div>
        </div>
    );
}

/* ── 4. Smart Automation ── */
function AutomationIllustration() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    const [activeStep, setActiveStep] = useState(-1);

    useEffect(() => {
        if (!inView) return;
        let i = 0;
        const t = setInterval(() => {
            setActiveStep(i);
            i++;
            if (i > 3) { i = 0; setActiveStep(-1); }
        }, 900);
        return () => clearInterval(t);
    }, [inView]);

    const flowSteps = [
        { label: 'Flow Power Automate', sub: 'When a new email with an order arrives.', icon: <PowerAutomateIcon size={44} />, isHeader: true },
        { label: 'Email processing', sub: 'Parse order details from inbox', icon: null },
        { label: 'Recording in the ERP', sub: 'Create record in business system', icon: null },
    ];

    return (
        <div ref={ref} className="bg-[#f7f5f2] rounded-2xl p-6" style={{ minHeight: 300 }}>
            <div className="flex gap-5 items-start">
                {/* Power Automate icon */}
                <motion.div
                    className="bg-white rounded-2xl shadow-md p-4 w-16 h-16 flex items-center justify-center flex-shrink-0"
                    style={{ border: '1px solid #e8e4dd' }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    <PowerAutomateIcon size={36} />
                </motion.div>

                {/* Arrow + flow */}
                <div className="flex items-start gap-4 flex-1 pt-3">
                    {/* Horizontal connector */}
                    <div className="relative mt-4" style={{ width: 48, flexShrink: 0 }}>
                        <svg width="48" height="2">
                            <motion.line x1="0" y1="1" x2="48" y2="1" stroke="#8B6914" strokeWidth="1.5" strokeDasharray="4 3"
                                initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
                                transition={{ delay: 0.4, duration: 0.5 }}
                            />
                        </svg>
                        <motion.div
                            className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                            style={{ background: '#8B6914', left: 0 }}
                            animate={{ left: [0, 44, 0] }}
                            transition={{ delay: 0.8, duration: 1.2, repeat: Infinity, repeatDelay: 0.8 }}
                        />
                    </div>

                    {/* Steps */}
                    <div className="flex-1 space-y-2">
                        {flowSteps.map((step, i) => (
                            <React.Fragment key={i}>
                                <motion.div
                                    className="bg-white rounded-xl px-4 py-3 flex items-center justify-between"
                                    style={{
                                        border: `1.5px solid ${activeStep === i ? '#8B6914' : '#e8e4dd'}`,
                                        boxShadow: activeStep === i ? '0 0 0 3px #8B691415' : 'none'
                                    }}
                                    initial={{ opacity: 0, x: 16 }}
                                    animate={inView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 0.3 + i * 0.15, duration: 0.45 }}
                                >
                                    <div>
                                        <div className="text-[11px] font-bold" style={{ color: step.isHeader ? '#8B6914' : '#374151' }}>{step.label}</div>
                                        <div className="text-[9px] text-gray-400 mt-0.5">{step.sub}</div>
                                    </div>
                                    <motion.div
                                        className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                                        style={{ borderColor: activeStep >= i ? '#22c55e' : '#d1d5db', background: activeStep >= i ? '#22c55e18' : 'transparent' }}
                                        animate={activeStep >= i ? { scale: [1, 1.15, 1] } : {}}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {activeStep >= i && <CheckCircle2 className="w-3 h-3 text-green-500" />}
                                    </motion.div>
                                </motion.div>
                                {i < flowSteps.length - 1 && (
                                    <div className="flex items-center gap-2 pl-4">
                                        <motion.div
                                            className="w-px h-5 origin-top"
                                            style={{ background: '#8B6914' }}
                                            initial={{ scaleY: 0 }}
                                            animate={inView ? { scaleY: 1 } : {}}
                                            transition={{ delay: 0.5 + i * 0.15 }}
                                        />
                                        <motion.div
                                            className="w-4 h-4 rounded-full border-2 border-[#8B6914] flex items-center justify-center text-[10px] text-[#8B6914] font-bold"
                                            initial={{ opacity: 0 }}
                                            animate={inView ? { opacity: 1 } : {}}
                                            transition={{ delay: 0.6 + i * 0.15 }}
                                        >+</motion.div>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ── 5. Seamless Integrations ── */
function IntegrationsIllustration() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    const [pulse, setPulse] = useState(0);

    useEffect(() => {
        if (!inView) return;
        const t = setInterval(() => setPulse(p => (p + 1) % 4), 800);
        return () => clearInterval(t);
    }, [inView]);

    const spokes = [
        { label: 'Power BI', Icon: PowerBIIcon, angle: -130, dist: 120 },
        { label: 'Teams', Icon: TeamsIcon, angle: -50, dist: 120 },
        { label: 'SharePoint', Icon: SharePointIcon, angle: 130, dist: 120 },
        { label: 'Dataverse', Icon: DataverseIcon, angle: 50, dist: 120 },
    ];

    return (
        <div ref={ref} className="bg-[#f7f5f2] rounded-2xl p-6 flex items-center justify-center" style={{ minHeight: 300 }}>
            <div className="relative" style={{ width: 300, height: 260 }}>
                {/* Lines from center */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 260" overflow="visible">
                    {spokes.map((spoke, i) => {
                        const cx = 150, cy = 130;
                        const rad = (spoke.angle * Math.PI) / 180;
                        const x2 = cx + Math.cos(rad) * spoke.dist;
                        const y2 = cy + Math.sin(rad) * spoke.dist;
                        return (
                            <motion.line key={i}
                                x1={cx} y1={cy} x2={x2} y2={y2}
                                stroke="#8B6914" strokeWidth="1.5" strokeDasharray="5 4"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={inView ? { pathLength: 1, opacity: 0.7 } : {}}
                                transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                            />
                        );
                    })}
                </svg>

                {/* Spoke icons */}
                {spokes.map((spoke, i) => {
                    const rad = (spoke.angle * Math.PI) / 180;
                    const x = 150 + Math.cos(rad) * spoke.dist - 28;
                    const y = 130 + Math.sin(rad) * spoke.dist - 28;
                    return (
                        <motion.div
                            key={i}
                            className="absolute bg-white rounded-2xl shadow-md p-2.5 flex flex-col items-center gap-1"
                            style={{ left: x, top: y, width: 56, border: `1.5px solid ${pulse === i ? '#8B6914' : '#e8e4dd'}`, boxShadow: pulse === i ? '0 0 0 3px #8B691418' : '0 2px 8px #0001' }}
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 0.5 + i * 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <spoke.Icon size={28} />
                            <span className="text-[8px] text-gray-500 font-semibold text-center leading-tight">{spoke.label}</span>
                        </motion.div>
                    );
                })}

                {/* Center API hub */}
                <motion.div
                    className="absolute bg-white rounded-2xl shadow-xl p-3 flex flex-col items-center gap-1"
                    style={{ left: 150 - 36, top: 130 - 36, width: 72, border: '2px solid #8B6914' }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-white" style={{ background: '#8B6914' }}>API</div>
                    <span className="text-[8px] text-[#8B6914] font-bold">Hub</span>
                </motion.div>

                {/* Travelling dots */}
                {inView && spokes.map((spoke, i) => {
                    const cx = 150, cy = 130;
                    const rad = (spoke.angle * Math.PI) / 180;
                    const ex = cx + Math.cos(rad) * spoke.dist;
                    const ey = cy + Math.sin(rad) * spoke.dist;
                    return (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 rounded-full"
                            style={{ background: '#8B6914', boxShadow: '0 0 6px #8B691480', left: cx - 4, top: cy - 4 }}
                            animate={{ left: [cx - 4, ex - 4, cx - 4], top: [cy - 4, ey - 4, cy - 4], opacity: [0, 1, 1, 0] }}
                            transition={{ delay: 1 + i * 0.7, duration: 1.2, repeat: Infinity, repeatDelay: 1.8, ease: 'easeInOut' }}
                        />
                    );
                })}
            </div>
        </div>
    );
}

/* ── 6. Security & Access Management ── */
function SecurityIllustration() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    const [scanY, setScanY] = useState(0);
    const [unlockedIndex, setUnlockedIndex] = useState(-1);

    useEffect(() => {
        if (!inView) return;
        const t = setInterval(() => setScanY(y => (y + 1) % 100), 20);
        const u = setTimeout(() => {
            let i = 0;
            const seq = setInterval(() => { setUnlockedIndex(i); i++; if (i > 3) clearInterval(seq); }, 500);
        }, 800);
        return () => { clearInterval(t); clearTimeout(u); };
    }, [inView]);

    const tools = [
        { label: 'Power Apps', Icon: PowerAppsIcon, color: '#742774' },
        { label: 'Fivetran', Icon: () => <img src="/logos/tools18.svg" width={28} height={28} alt="Fivetran" className="object-contain" />, color: '#F03E1B' },
        { label: 'Azure', Icon: AzureIcon, color: '#0078D4' },
        { label: 'Power BI', Icon: PowerBIIcon, color: '#F2C811' },
    ];

    return (
        <div ref={ref} className="bg-[#f7f5f2] rounded-2xl p-6" style={{ minHeight: 300 }}>
            {/* Scan bar header */}
            <motion.div
                className="bg-white rounded-xl p-4 mb-4 relative overflow-hidden"
                style={{ border: '1px solid #e8e4dd' }}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.2 }}
            >
                <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-[#8B6914]" />
                    <span className="text-[11px] font-bold text-gray-800">Security scan in progress</span>
                    <motion.div className="ml-auto text-[9px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full" animate={{ opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 1.2 }}>
                        ACTIVE
                    </motion.div>
                </div>
                {/* Animated scan line */}
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, #8B6914, #f9dc66)' }}
                        animate={{ width: ['0%', '100%', '0%'] }} transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }} />
                </div>
            </motion.div>

            {/* Tool cards with lock */}
            <div className="grid grid-cols-4 gap-2 mb-4">
                {tools.map((tool, i) => (
                    <motion.div
                        key={i}
                        className="bg-white rounded-xl p-3 flex flex-col items-center gap-1 relative"
                        style={{ border: `1.5px solid ${unlockedIndex >= i ? tool.color + '60' : '#e8e4dd'}` }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.3 + i * 0.1 }}
                    >
                        <tool.Icon size={32} />
                        <span className="text-[8px] text-gray-500 text-center">{tool.label}</span>
                        <motion.div
                            className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center"
                            style={{ background: unlockedIndex >= i ? '#22c55e' : '#9ca3af' }}
                            animate={unlockedIndex === i ? { scale: [1, 1.4, 1] } : {}}
                            transition={{ duration: 0.35 }}
                        >
                            <Lock className="w-2 h-2 text-white" />
                        </motion.div>
                    </motion.div>
                ))}
            </div>

            {/* Access rules */}
            <div className="grid grid-cols-2 gap-2">
                {[
                    { label: 'Role-based access', icon: Shield },
                    { label: 'Data encryption', icon: Lock },
                    { label: 'Audit logging', icon: FileText },
                    { label: 'Compliance ready', icon: CheckCircle2 },
                ].map(({ label, icon: Icon }, i) => (
                    <motion.div
                        key={i}
                        className="flex items-center gap-2 bg-white rounded-xl px-3 py-2"
                        style={{ border: '1px solid #e8e4dd' }}
                        initial={{ opacity: 0, x: i % 2 === 0 ? -8 : 8 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.6 + i * 0.08 }}
                    >
                        <Icon className="w-3 h-3 text-[#8B6914] flex-shrink-0" />
                        <span className="text-[9px] font-semibold text-gray-700">{label}</span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

/* ── 7. Data Monitoring & Analytics ── */
function MonitoringIllustration() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    const [tick, setTick] = useState(0);

    const baseData = [42, 58, 51, 67, 74, 61, 83, 78, 90, 85, 72, 95];
    const [data, setData] = useState(baseData);

    useEffect(() => {
        if (!inView) return;
        const t = setInterval(() => {
            setTick(n => n + 1);
            setData(d => {
                const next = [...d.slice(1), Math.floor(50 + Math.random() * 45)];
                return next;
            });
        }, 1000);
        return () => clearInterval(t);
    }, [inView]);

    const kpis = [
        { label: 'Uptime', value: '99.9%', color: '#22c55e', sub: 'Last 30 days' },
        { label: 'Avg. Response', value: '142ms', color: '#0078D4', sub: 'API latency' },
        { label: 'Active Users', value: '1,247', color: '#742774', sub: 'This week' },
    ];

    const max = Math.max(...data);

    return (
        <div ref={ref} className="bg-[#f7f5f2] rounded-2xl p-6" style={{ minHeight: 300 }}>
            {/* KPI row */}
            <div className="grid grid-cols-3 gap-3 mb-5">
                {kpis.map((kpi, i) => (
                    <motion.div
                        key={i}
                        className="bg-white rounded-xl p-3"
                        style={{ border: `1.5px solid ${kpi.color}30` }}
                        initial={{ opacity: 0, y: -8 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.1 + i * 0.1 }}
                    >
                        <div className="text-base font-black" style={{ color: kpi.color }}>{kpi.value}</div>
                        <div className="text-[9px] font-bold text-gray-700">{kpi.label}</div>
                        <div className="text-[8px] text-gray-400">{kpi.sub}</div>
                    </motion.div>
                ))}
            </div>

            {/* Live chart */}
            <motion.div
                className="bg-white rounded-xl p-4"
                style={{ border: '1px solid #e8e4dd' }}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 }}
            >
                <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold text-gray-700">App Performance</span>
                    <div className="flex items-center gap-1.5">
                        <motion.div className="w-1.5 h-1.5 rounded-full bg-green-500" animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 0.9 }} />
                        <span className="text-[9px] text-green-600 font-semibold">Live</span>
                    </div>
                </div>
                <div className="flex items-end gap-1 h-20">
                    {data.map((h, i) => (
                        <motion.div
                            key={`${i}-${tick}`}
                            className="flex-1 rounded-t"
                            style={{ background: `linear-gradient(to top, #8B6914, #f9dc66)`, opacity: 0.7 + (i / data.length) * 0.3 }}
                            initial={{ height: 0 }}
                            animate={{ height: `${(h / max) * 100}%` }}
                            transition={{ duration: 0.4, ease: 'easeOut' }}
                        />
                    ))}
                </div>
                <div className="flex justify-between text-[8px] text-gray-400 mt-1.5">
                    <span>Jan</span><span>Mar</span><span>Jun</span><span>Sep</span><span>Dec</span>
                </div>
            </motion.div>

            {/* Alert badge */}
            <motion.div
                className="mt-3 flex items-center gap-2 px-3 py-2 bg-white rounded-xl"
                style={{ border: '1px solid #e8e4dd' }}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.7 }}
            >
                <Bell className="w-3 h-3 text-[#8B6914]" />
                <span className="text-[9px] text-gray-500 flex-1">Threshold alerts configured</span>
                <motion.div className="w-4 h-4 rounded-full bg-[#8B6914] flex items-center justify-center text-white text-[8px] font-bold"
                    animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>3</motion.div>
            </motion.div>
        </div>
    );
}

/* ─────────────────────── DISPATCHER ─────────────────────── */

function ServiceIllustration({ variant }: { variant: string }) {
    if (variant === 'custom-apps') return <CustomAppsIllustration />;
    if (variant === 'ux-ui') return <UXUIIllustration />;
    if (variant === 'azure') return <AzureIllustration />;
    if (variant === 'automation') return <AutomationIllustration />;
    if (variant === 'integrations') return <IntegrationsIllustration />;
    if (variant === 'security') return <SecurityIllustration />;
    return <MonitoringIllustration />;
}

function TechIcon({ icon, color }: { icon: string; color: string }) {
    const iconMap: Record<string, React.ReactNode> = {
        powerapps: <img src="/logos/tools25.svg" width={24} height={24} alt="Power Apps" className="object-contain" />,
        azure: <img src="/logos/tools29.svg" width={24} height={24} alt="Azure" className="object-contain" />,
        automate: <img src="/logos/tools20.svg" width={24} height={24} alt="Power Automate" className="object-contain" />,
        dataverse: <img src="/logos/tools28.svg" width={24} height={24} alt="Dataverse" className="object-contain" />,
        teams: <img src="/logos/tools26.svg" width={24} height={24} alt="Teams" className="object-contain" />,
        powerbi: <img src="/logos/image7.svg" width={24} height={24} alt="Power BI" className="object-contain" />,
    };
    return <>{iconMap[icon] || null}</>;
}

/* ─────────────────────── PAGE ─────────────────────── */

export default function ApplicationsAndAutomationsPage() {
    const [activeItem, setActiveItem] = useState(0);
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

    /* Scroll-driven active detection using getBoundingClientRect for accuracy */
    useEffect(() => {
        const handleScroll = () => {
            const refs = sectionRefs.current;
            if (!refs.length) return;

            const threshold = window.innerHeight * 0.35;
            let current = 0;

            for (let i = 0; i < refs.length; i++) {
                const el = refs[i];
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= threshold) {
                        current = i;
                    }
                }
            }

            setActiveItem(current);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToItem = (idx: number) => {
        sectionRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <main className="min-h-screen bg-transparent text-white selection:bg-brand-primary/20" style={{ overflowX: 'clip' }}>

            {/* ───── HERO ───── */}
            <section className="relative bg-transparent">
                {/* Decorative Background Elements */}
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="w-full px-8 md:px-24 lg:px-32 pt-24 md:pt-32 pb-[80px] md:pb-[200px] lg:pb-[300px] relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 md:gap-12 items-start">
                        {/* Left Column: Text Content */}
                        <div className="space-y-5 md:space-y-8 pt-4 md:pt-8 pb-12">
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-xs md:text-sm font-medium tracking-wide text-gray-500 uppercase"
                            >
                                Applications and Automations
                            </motion.span>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-[2rem] md:text-[3.2rem] font-bold leading-[1.1] tracking-tight text-white"
                            >
                                Together, we build applications that{' '}
                                <span className="relative inline-block">
                                    <span className="text-brand-primary">automate</span>
                                    <motion.span
                                        initial={{ width: 0 }}
                                        animate={{ width: '100%' }}
                                        transition={{ delay: 0.6, duration: 0.8 }}
                                        className="absolute -bottom-1 left-0 h-[2px] bg-brand-primary rounded-full"
                                    />
                                </span>{' '}
                                your workflows and drive your growth
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-gray-400 text-sm md:text-base leading-relaxed max-w-[480px]"
                            >
                                We create custom-built apps that streamline your operations and accelerate your growth.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="pt-4"
                            >
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center group gap-3 px-5 py-2.5 md:px-8 md:py-3.5 bg-white text-black text-xs md:text-sm font-bold rounded-full hover:bg-gray-100 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.05)] hover:scale-105"
                                >
                                    Let&apos;s work together
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </motion.div>
                        </div>

                        {/* Right Column: The "Half Attached" Mockup */}
                        <div className="flex justify-end items-start relative aspect-[3/4] md:aspect-[4/3] lg:aspect-auto lg:h-[450px] mt-8 lg:mt-0 overflow-hidden lg:overflow-visible w-[120%] md:w-full">
                            <div className="absolute inset-0 w-[200%] h-[200%] md:w-[133.33%] md:h-[133.33%] lg:w-full lg:h-full scale-[0.55] md:scale-[0.75] lg:scale-100 origin-top-left transform-gpu">
                                <div className="absolute lg:right-[-320px] w-full min-w-[900px] top-0 h-[600px] overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                                    <ApplicationsAutomationsDemo isActive={true} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ───── APP MOCKUP + DESCRIPTION ───── */}
            <section className="bg-transparent">
                <div className="w-full px-8 md:px-24 lg:px-32 py-4 md:py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-16 items-start">

                        {/* Right — Description */}
                        <div className="space-y-8 pt-0 md:pt-8 lg:col-span-2 max-w-[900px]">
                            <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                                You need to move fast. Manual tasks and outdated processes are no longer an option.
                            </h3>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Our experts blend deep technical knowledge with user-focused design to build Power Apps and Power Automate solutions that fit perfectly into your Microsoft 365 ecosystem, supported by a powerful Azure backend.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ───── OUR SOLUTIONS ENABLE YOU TO ───── */}
            <section className="bg-transparent border-t border-white/10">
                <div className="w-full px-8 md:px-24 lg:px-32 py-24">
                    <h2 className="text-[1.6rem] md:text-[2rem] font-bold leading-tight mb-12 text-white">
                        Our solutions enable you to:
                    </h2>

                    <div className="space-y-0">
                        {SOLUTIONS.map((sol) => (
                            <div
                                key={sol.num}
                                className="flex items-center border-t border-white/10 py-5 hover:bg-white/[0.02] transition-colors group px-4 -mx-4 rounded-lg"
                            >
                                <span className="text-brand-primary font-bold text-lg w-16 flex-shrink-0">{sol.num}</span>
                                <span className="text-gray-300 text-[16px] font-medium group-hover:text-white transition-colors">{sol.text}</span>
                            </div>
                        ))}
                        <div className="border-t border-white/10" />
                    </div>
                </div>
            </section>

            {/* ───── SCALABLE STATEMENT ───── */}
            <section className="bg-transparent">
                <div className="w-full px-8 md:px-24 lg:px-32 py-32">
                    <h2 className="text-[2rem] md:text-[3rem] font-bold leading-[1.15] text-white tracking-tight max-w-[900px]">
                        We build scalable, future-ready{' '}
                        <span className="text-brand-primary">applications that adapt</span>{' '}
                        to your organization&apos;s growth.
                    </h2>
                </div>
            </section>

            {/* ───── OUR SERVICES (scroll-driven) ───── */}
            <section className="bg-transparent border-t border-white/10">
                <div className="w-full px-8 md:px-24 lg:px-32 py-24">
                    <h2 className="text-[2rem] md:text-[2.4rem] font-bold mb-20 text-white">Our services</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-16 lg:gap-24">
                        {/* Left — Sticky Nav */}
                        <div className="hidden lg:block">
                            <nav className="sticky top-28 space-y-0">
                                {SERVICE_ITEMS.map((item, idx) => (
                                    <button
                                        key={item.id}
                                        onClick={() => scrollToItem(idx)}
                                        className={`
                                            w-full text-left px-0 py-2.5 text-[13px] font-medium transition-all duration-200 leading-snug block
                                            ${activeItem === idx
                                                ? 'text-brand-primary font-semibold'
                                                : 'text-gray-600 hover:text-gray-400'
                                            }
                                        `}
                                    >
                                        <span className="flex items-start gap-3">
                                            <span className={`inline-block w-2 h-2 rounded-[2px] mt-1 flex-shrink-0 transition-colors duration-200 ${activeItem === idx ? 'bg-brand-primary' : 'bg-transparent'
                                                }`} />
                                            {item.title}
                                        </span>
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Right — Scrolling Content */}
                        <div className="space-y-0">
                            {SERVICE_ITEMS.map((item, idx) => (
                                <div
                                    key={item.id}
                                    ref={(el) => { sectionRefs.current[idx] = el; }}
                                    className="scroll-mt-28 pb-16 mb-0 border-b border-white/10 last:border-b-0 last:pb-0"
                                >
                                    {/* Title */}
                                    <div className="flex items-start gap-3 mb-5">
                                        <span className="inline-block w-2.5 h-2.5 rounded-[2px] bg-brand-primary mt-2 flex-shrink-0" />
                                        <h3 className="text-xl md:text-[1.35rem] font-bold leading-tight text-brand-primary">
                                            {item.title}
                                        </h3>
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-400 text-[15px] leading-[1.8] ml-0 md:ml-[22px] mb-8 max-w-[640px]">
                                        {item.description}
                                    </p>

                                    {/* Illustration */}
                                    <div className="ml-0 md:ml-[22px] overflow-hidden">
                                        <div className="origin-top-left scale-[0.72] md:scale-100 -mr-[38%] md:mr-0">
                                            <ServiceIllustration variant={item.id} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ───── TECHNOLOGIES ───── */}
            <section className="bg-transparent border-t border-white/10">
                <div className="w-full px-8 md:px-24 lg:px-32 py-24">
                    <h2 className="text-[2.5rem] md:text-[3.5rem] font-bold text-white text-center mb-4 tracking-tighter">Technologies</h2>
                    <p className="text-gray-400 text-center text-lg mb-16 max-w-[700px] mx-auto">
                        We build on the strength of Microsoft and Azure to deliver high-performance, secure, and future-ready solutions:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {TECHNOLOGIES.map((tech, i) => (
                            <div
                                key={i}
                                className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 hover:bg-white/[0.05] transition-all group"
                            >
                                <div className="w-14 h-14 rounded-xl mb-6 flex items-center justify-center" style={{ backgroundColor: `${tech.color}15` }}>
                                    <TechIcon icon={tech.icon} color={tech.color} />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand-primary transition-colors">{tech.name}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{tech.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ───── CTA SECTION ───── */}
            <section className="bg-transparent border-t border-white/10">
                <div className="w-full px-8 md:px-24 lg:px-32 py-28">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                           <span className="text-brand-primary font-semibold text-sm tracking-wider">
                                Let&apos;s create value
                            </span>
                        </div>
                        <div className="space-y-6">
                            <h2 className="text-[2rem] md:text-[2.4rem] font-bold leading-tight text-white">
                                To help you make the<br />
                                <span className="text-brand-primary">right decisions</span> at the <span className="text-brand-primary">right moment</span>.
                            </h2>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-medium rounded-full hover:bg-gray-200 transition-colors"
                            >
                                Contact us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
}

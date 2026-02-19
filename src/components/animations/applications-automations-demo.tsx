'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Calendar, Plus, FileText, Search, User, ChevronRight, Activity, CheckCircle2, Layout, Database, FileJson, Settings } from 'lucide-react';
import { ANIMATION_THEME } from '@/lib/colors';

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

function StatusTag({ type }: { type: string | null }) {
    if (!type) return <div className="h-full w-full border-r border-b border-slate-100" />;

    const styles: Record<string, { bg: string; text: string; border: string }> = {
        'Office': {
            bg: `${ANIMATION_THEME.primary}1A`,
            text: ANIMATION_THEME.primary,
            border: `${ANIMATION_THEME.primary}33`
        },
        'Remote Work': {
            bg: '#94a3b81A',
            text: '#94a3b8',
            border: '#94a3b833'
        },
        'Absence': {
            bg: 'rgba(255, 255, 255, 0.05)',
            text: '#64748b',
            border: 'rgba(255, 255, 255, 0.1)'
        },
        'Comp. Time': {
            bg: 'rgba(255, 255, 255, 0.05)',
            text: '#64748b',
            border: 'rgba(255, 255, 255, 0.1)'
        },
    };

    const style = styles[type] || styles['Absence'];

    return (
        <div className="h-full w-full border-r border-b border-slate-100 flex items-center justify-center p-1">
            <div
                className="text-[10px] py-1 px-2 rounded-md font-medium w-full text-center"
                style={{
                    backgroundColor: style.bg,
                    color: style.text,
                    border: `1px solid ${style.border}`
                }}
            >
                {type}
            </div>
        </div>
    );
}

function MockupHomeView() {
    const projects = [
        { title: 'Woodfrog Website Redesign', status: 'In Progress', priority: 'High', color: ANIMATION_THEME.primary },
        { title: 'Mobile App API Integration', status: 'To Do', priority: 'Medium', color: '#94a3b8' },
        { title: 'Cloud Infrastructure Audit', status: 'Blocked', priority: 'High', color: ANIMATION_THEME.accent.danger },
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
            <header>
                <div className="flex items-center gap-3 mb-2">
                    <span className="w-8 h-[2px] rounded-full" style={{ backgroundColor: ANIMATION_THEME.primary }} />
                    <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: ANIMATION_THEME.primary }}>Project Dashboard</span>
                </div>
                <h2 className="text-3xl font-bold mb-2 tracking-tight" style={{ color: ANIMATION_THEME.text.primary }}>Active Projects</h2>
                <p className="text-sm text-slate-500">Track and manage your team&apos;s progress in real-time.</p>
            </header>

            <div className="space-y-4">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest pl-2">Pending & In Progress</p>
                <div className="grid grid-cols-1 gap-4">
                    {projects.map((proj, i) => (
                        <div key={i} className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex items-center justify-between group hover:bg-slate-100 transition-all">
                            <div className="flex items-center gap-5">
                                <div className="w-3 h-12 rounded-full" style={{ backgroundColor: proj.color }} />
                                <div>
                                    <h4 className="text-lg font-bold transition-colors" style={{ color: ANIMATION_THEME.text.primary, '--hover-color': ANIMATION_THEME.primary } as any}>{proj.title}</h4>
                                    <div className="flex gap-3 mt-1">
                                        <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-100 uppercase tracking-tighter">Priority: {proj.priority}</span>
                                        <span className="text-[10px] font-bold uppercase tracking-tighter" style={{ color: ANIMATION_THEME.primary }}>{proj.status}</span>
                                    </div>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-600 transition-colors" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-lg font-bold" style={{ color: ANIMATION_THEME.text.primary }}>Daily Schedule</h3>
                    <Calendar className="w-5 h-5" style={{ color: ANIMATION_THEME.primary }} />
                </div>
                <div className="grid grid-cols-1 gap-6">
                    {calendarItems.map((item, i) => (
                        <div key={i} className="flex items-center gap-6 group">
                            <div className="w-[80px] text-[12px] font-bold text-slate-400 tracking-tighter">{item.time}</div>
                            <div className="flex-1 h-[1px] bg-slate-100" />
                            <div className="flex items-center gap-4 bg-white border border-slate-100 px-5 py-3 rounded-xl min-w-[200px] group-hover:bg-white group-hover:shadow-sm transition-all">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ANIMATION_THEME.primary, boxShadow: `0 0 8px ${ANIMATION_THEME.primary}` }} />
                                <div className="flex-1">
                                    <p className="text-sm font-bold" style={{ color: ANIMATION_THEME.text.primary }}>{item.event}</p>
                                    <p className="text-[10px] text-slate-500 uppercase">{item.type}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

function MockupScheduleView() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 overflow-hidden flex flex-col"
        >
            <div className="mb-10">
                <h2 className="text-3xl font-bold mb-2 tracking-tight" style={{ color: ANIMATION_THEME.text.primary }}>Organization Map</h2>
                <p className="text-sm text-slate-500">Real-time presence and availability tracking across all regional offices.</p>
            </div>

            <div className="flex-1 border border-slate-100 rounded-2xl overflow-hidden bg-slate-50 shadow-inner flex flex-col">
                <div className="grid grid-cols-[200px_repeat(4,1fr)] bg-slate-100 border-b border-slate-100">
                    <div className="p-5 flex items-center gap-2.5 border-r border-slate-100">
                        <span className="text-[13px] font-bold" style={{ color: ANIMATION_THEME.text.primary }}>Personnel</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: `${ANIMATION_THEME.primary}1A`, color: ANIMATION_THEME.primary }}>IN</span>
                    </div>
                    {['Mon', 'Tue', 'Wed', 'Thu'].map((day, i) => (
                        <div key={i} className="p-5 text-center border-r border-slate-100 last:border-r-0">
                            <span className="text-[11px] text-slate-400 uppercase tracking-[0.1em] font-bold">{day}</span>
                        </div>
                    ))}
                </div>

                <div
                    className="flex-1 divide-y divide-slate-100 overflow-y-auto"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {PROFESSIONALS.map((prof, i) => (
                        <React.Fragment key={i}>
                            {prof.isGroup && (
                                <div className="bg-slate-50/50 px-6 py-3 flex items-center gap-2.5 border-b border-slate-100">
                                    <ChevronRight className="w-3.5 h-3.5" style={{ color: ANIMATION_THEME.primary }} />
                                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em]">{prof.groupName}</span>
                                </div>
                            )}
                            <div className="grid grid-cols-[200px_repeat(4,1fr)] group hover:bg-slate-50 transition-all duration-300 cursor-default">
                                <div className="p-4 flex items-center gap-4 border-r border-slate-100">
                                    <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200 group-hover:scale-110 transition-transform">
                                        <User className="w-4 h-4 text-slate-400" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[12px] font-bold leading-tight transition-colors truncate" style={{ color: ANIMATION_THEME.text.primary, '--hover-color': ANIMATION_THEME.primary } as any}>{prof.name}</p>
                                        <p className="text-[9px] text-slate-500 leading-tight mt-0.5">{prof.sub}</p>
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
        </motion.div >
    );
}

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
                <h2 className="text-3xl font-bold mb-2 tracking-tight" style={{ color: ANIMATION_THEME.text.primary }}>New Project</h2>
                <p className="text-sm text-slate-500">Initialize a new workflow for your personnel.</p>
            </header>

            <div className="space-y-4">
                <div className="p-1.5 bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Project or Task name..."
                        className="bg-transparent border-none outline-none px-4 py-2 flex-1 text-sm font-medium"
                        style={{ color: ANIMATION_THEME.text.primary }}
                    />
                    <button className="text-white px-6 py-2 rounded-xl text-xs font-bold transition-colors shadow-lg" style={{ backgroundColor: ANIMATION_THEME.primary, boxShadow: `0 10px 15px -3px ${ANIMATION_THEME.primary}33` }}>
                        Create
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest pl-2">Project Templates</p>
                {templates.map((temp, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-5 p-5 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-slate-100 transition-all cursor-pointer group"
                    >
                        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center border border-slate-100 group-hover:scale-105 transition-transform">
                            <temp.icon className="w-6 h-6" style={{ color: ANIMATION_THEME.primary }} />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-bold transition-colors" style={{ color: ANIMATION_THEME.text.primary, '--hover-color': ANIMATION_THEME.primary } as any}>{temp.name}</p>
                            <p className="text-[11px] text-slate-500">{temp.desc}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors" />
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

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
                    <h2 className="text-3xl font-bold tracking-tight" style={{ color: ANIMATION_THEME.text.primary }}>Project Assets</h2>
                    <div className="flex gap-2">
                        <div className="px-4 py-1.5 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-bold text-slate-500">Phase: Development</div>
                    </div>
                </div>
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search project files..."
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-12 pr-4 py-3 text-xs outline-none transition-colors"
                        style={{ color: ANIMATION_THEME.text.primary, '--focus-border': ANIMATION_THEME.primary } as any}
                    />
                </div>
            </header>

            <div className="flex-1 overflow-y-auto space-y-2 pr-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {files.map((file, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 border border-slate-50 hover:border-slate-100 rounded-xl transition-all group cursor-pointer"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${ANIMATION_THEME.primary}1A` }}>
                                <FileText className="w-5 h-5" style={{ color: ANIMATION_THEME.primary }} />
                            </div>
                            <div>
                                <p className="text-xs font-bold transition-colors" style={{ color: ANIMATION_THEME.text.primary, '--hover-color': ANIMATION_THEME.primary } as any}>{file.name}</p>
                                <p className="text-[10px] text-slate-500 uppercase tracking-widest">{file.size} • {file.date}</p>
                            </div>
                        </div>
                        <Settings className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors" />
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

export const ApplicationsAutomationsDemo = ({ isActive = true }: { isActive?: boolean }) => {
    const [activeSidebar, setActiveSidebar] = useState('calendar');

    const sidebarItems = [
        { id: 'home', icon: Home },
        { id: 'calendar', icon: Calendar },
        { id: 'plus', icon: Plus },
        { id: 'file', icon: FileText },
    ];

    return (
        <div className="relative w-full h-full flex items-center justify-center" style={{ backgroundColor: ANIMATION_THEME.background, maxHeight: '100%' }}>
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 20 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full h-full max-h-full bg-white rounded-[32px] overflow-hidden border shadow-[0_24px_80px_rgba(0,0,0,0.1)] flex"
                style={{ borderColor: ANIMATION_THEME.border }}
            >
                {/* Sidebar */}
                <div className="w-[60px] md:w-[70px] border-r flex flex-col items-center py-6 md:py-8 gap-6 md:gap-8 bg-slate-50/50 backdrop-blur-xl shrink-0" style={{ borderColor: ANIMATION_THEME.border }}>
                    {sidebarItems.map(({ id, icon: Icon }) => (
                        <div
                            key={id}
                            className="relative w-full flex justify-center py-2"
                            onClick={() => setActiveSidebar(id)}
                        >
                            <Icon
                                className={`w-5 h-5 md:w-6 md:h-6 transition-all duration-300 cursor-pointer ${activeSidebar === id ? '' : 'text-slate-400 hover:text-slate-600'
                                    }`}
                                style={{ color: activeSidebar === id ? ANIMATION_THEME.primary : undefined }}
                            />
                            {activeSidebar === id && (
                                <motion.div
                                    layoutId="sidebar-indicator"
                                    className="absolute -left-[1px] top-1/2 -translate-y-1/2 w-1 md:w-1.5 h-6 md:h-8 rounded-r-full"
                                    style={{ backgroundColor: ANIMATION_THEME.primary, boxShadow: `0 0 15px ${ANIMATION_THEME.primary}66` }}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col bg-white overflow-hidden min-h-0">
                    {/* Header */}
                    <div className="h-[60px] md:h-[80px] border-b flex items-center justify-between px-6 md:px-10 bg-white/80 backdrop-blur-md shrink-0" style={{ borderColor: ANIMATION_THEME.border }}>
                        <div className="flex items-center gap-2">
                            <img src="/logos/woodfrog-logo.svg" width="28" height="22" alt="Woodfrog" className="object-contain" style={{ color: ANIMATION_THEME.text.primary }} />
                            <span className="text-xl md:text-2xl font-bold tracking-tighter" style={{ color: ANIMATION_THEME.text.primary }}>woodfrog</span>
                        </div>
                    </div>

                    {/* View Container */}
                    <div className="flex-1 p-6 md:p-10 overflow-y-auto flex flex-col relative scale-100 origin-top min-h-0" style={{ scrollbarWidth: 'thin' }}>
                        <AnimatePresence mode="wait">
                            {activeSidebar === 'home' && <MockupHomeView key="home" />}
                            {activeSidebar === 'calendar' && <MockupScheduleView key="schedule" />}
                            {activeSidebar === 'plus' && <MockupCreateView key="plus" />}
                            {activeSidebar === 'file' && <MockupFileView key="file" />}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default ApplicationsAutomationsDemo;

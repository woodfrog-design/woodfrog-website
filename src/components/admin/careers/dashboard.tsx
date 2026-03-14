'use client';

import React, { useMemo } from 'react';
import { Users, MapPin, Briefcase, GitBranch, TrendingUp } from 'lucide-react';
import { Job, JobApplication } from '@/lib/jobs';

interface DashboardProps {
    jobs: Job[];
    applications: JobApplication[];
}

export default function CareersDashboard({ jobs, applications }: DashboardProps) {
    const stats = useMemo(() => {
        const totalApps = applications.length;
        const jobCounts = applications.reduce((acc, app) => {
            acc[app.jobId] = (acc[app.jobId] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const cityCounts = applications.reduce((acc, app) => {
            const city = app.candidateAddress?.split(',').pop()?.trim() || 'Unknown';
            acc[city] = (acc[city] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const stageCounts = applications.reduce((acc, app) => {
            acc[app.status] = (acc[app.status] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        return { totalApps, jobCounts, cityCounts, stageCounts };
    }, [applications]);

    return (
        <div className="p-8 lg:p-12 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* ── Summary Cards ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={<Users className="w-5 h-5 text-blue-400" />} label="Total Applications" value={stats.totalApps} />
                <StatCard icon={<Briefcase className="w-5 h-5 text-[#ff6b3d]" />} label="Active Jobs" value={jobs.filter(j => j.isActive).length} />
                <StatCard icon={<MapPin className="w-5 h-5 text-green-400" />} label="Cities" value={Object.keys(stats.cityCounts).length} />
                <StatCard icon={<GitBranch className="w-5 h-5 text-purple-400" />} label="Ongoing Stages" value={Object.keys(stats.stageCounts).length} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* ── Job-wise Distribution ── */}
                <div className="bg-[#0F1113] border border-white/5 rounded-3xl p-8 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-[#ff6b3d]" />
                            Applications per Job
                        </h3>
                    </div>
                    <div className="space-y-4">
                        {jobs.map(job => (
                            <div key={job.id} className="space-y-2">
                                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-zinc-500">
                                    <span>{job.title}</span>
                                    <span className="text-white">{stats.jobCounts[job.id] || 0}</span>
                                </div>
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-gradient-to-r from-[#ff6b3d] to-[#ff8a65] rounded-full transition-all duration-1000"
                                        style={{ width: `${stats.totalApps ? ((stats.jobCounts[job.id] || 0) / stats.totalApps) * 100 : 0}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── City Distribution ── */}
                <div className="bg-[#0F1113] border border-white/5 rounded-3xl p-8 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-green-400" />
                            City Distribution
                        </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {Object.entries(stats.cityCounts).map(([city, count]) => (
                            <div key={city} className="flex items-center gap-3 p-4 bg-white/[0.03] border border-white/5 rounded-2xl">
                                <span className="text-2xl font-black text-white/10">{count}</span>
                                <div className="min-w-0">
                                    <p className="text-xs font-black uppercase tracking-widest text-zinc-500 truncate">{city}</p>
                                    <p className="text-[10px] text-zinc-700">Candidates</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Stage Distribution ── */}
                <div className="lg:col-span-2 bg-[#0F1113] border border-white/5 rounded-3xl p-8 space-y-8">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <GitBranch className="w-5 h-5 text-purple-400" />
                            Pipeline Overview
                        </h3>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                        {Object.entries(stats.stageCounts).sort((a, b) => b[1] - a[1]).map(([stage, count]) => (
                            <div key={stage} className="flex-1 flex flex-col items-center gap-4 text-center">
                                <div className="w-full h-3 bg-white/5 rounded-full relative">
                                    <div 
                                        className="absolute inset-y-0 left-0 bg-purple-500/40 rounded-full transition-all duration-1000"
                                        style={{ width: `${stats.totalApps ? (count / stats.totalApps) * 100 : 0}%` }}
                                    />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-white mb-1">{stage}</p>
                                    <p className="text-lg font-bold text-zinc-500">{count}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: number }) {
    return (
        <div className="bg-[#0F1113] border border-white/5 rounded-3xl p-6 flex flex-col gap-4 group hover:border-white/10 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                {icon}
            </div>
            <div>
                <p className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-1">{label}</p>
                <h4 className="text-3xl font-black tracking-tight">{value}</h4>
            </div>
        </div>
    );
}

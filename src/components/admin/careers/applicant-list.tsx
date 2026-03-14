'use client';

import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, Users, Filter, Search } from 'lucide-react';
import { JobApplication, getApplicationsForJob } from '@/lib/jobs';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import CandidateDetailView from './candidate-detail-view';

interface ApplicantListProps {
    jobId: string;
}

export default function ApplicantList({ jobId }: ApplicantListProps) {
    const [applications, setApplications] = useState<JobApplication[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null);
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchApplications = async () => {
            const data = await getApplicationsForJob(jobId);
            setApplications(data);
            setIsLoading(false);
            if (data.length > 0) setSelectedApp(data[0]);
        };
        fetchApplications();
    }, [jobId]);

    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'application received':
            case 'new':
                return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            case 'screening':
            case 'reviewing':
                return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
            case 'technical round':
                return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
            case 'final round':
                return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
            case 'selected':
            case 'hired':
                return 'bg-green-500/10 text-green-400 border-green-500/20';
            case 'rejected':
                return 'bg-red-500/10 text-red-400 border-red-500/20';
            default:
                return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'selected':
            case 'hired':
                return <CheckCircle className="w-3 h-3" />;
            case 'rejected':
                return <XCircle className="w-3 h-3" />;
            default:
                return <Clock className="w-3 h-3" />;
        }
    };

    const handleStatusChange = (appId: string, newStatus: string) => {
        setApplications(prev =>
            prev.map(app =>
                app.id === appId ? { ...app, status: newStatus } : app
            )
        );
        if (selectedApp?.id === appId) {
            setSelectedApp(prev => prev ? { ...prev, status: newStatus } : null);
        }
    };

    const filteredApplications = applications
        .filter(app => statusFilter === 'all' || app.status === statusFilter)
        .filter(app =>
            searchQuery === '' ||
            app.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.candidateEmail.toLowerCase().includes(searchQuery.toLowerCase())
        );

    if (isLoading) return <div className="p-12 text-center text-zinc-500">Loading candidate applications...</div>;

    if (applications.length === 0) {
        return (
            <div className="p-20 text-center space-y-4">
                <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mx-auto">
                    <Users className="w-10 h-10 text-zinc-700" />
                </div>
                <h3 className="text-xl font-bold">No applications yet</h3>
                <p className="text-zinc-500 max-w-xs mx-auto">Positions usually take 2-3 days to attract the first qualified candidates.</p>
            </div>
        );
    }

    return (
        <div className="flex h-full">
            {/* ── Left Sidebar: Candidate List ── */}
            <div className="w-[320px] flex-shrink-0 border-r border-white/5 flex flex-col bg-[#0A0A0A]">
                {/* Search */}
                <div className="p-4 border-b border-white/5">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                        <input
                            type="text"
                            placeholder="Search candidates..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full bg-zinc-900 border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-[#ff6b3d]/40 transition-all placeholder:text-zinc-700"
                        />
                    </div>
                </div>

                {/* Filter */}
                <div className="px-4 py-3 border-b border-white/5 bg-zinc-900/20">
                    <div className="flex items-center gap-2">
                        <Filter className="w-3 h-3 text-zinc-600 flex-shrink-0" />
                        <select
                            value={statusFilter}
                            onChange={e => setStatusFilter(e.target.value)}
                            className="bg-transparent text-[10px] font-bold uppercase tracking-widest text-zinc-500 outline-none flex-1 cursor-pointer"
                        >
                            <option value="all">All ({applications.length})</option>
                            {[...new Set(applications.map(a => a.status))].map(status => (
                                <option key={status} value={status}>
                                    {status} ({applications.filter(a => a.status === status).length})
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Candidates */}
                <div className="flex-1 overflow-y-auto">
                    {filteredApplications.map(app => (
                        <button
                            key={app.id}
                            onClick={() => setSelectedApp(app)}
                            className={cn(
                                "w-full p-4 text-left border-b border-white/[0.03] transition-all hover:bg-white/[0.03]",
                                selectedApp?.id === app.id
                                    ? "bg-white/[0.05] border-l-[3px] border-l-[#ff6b3d]"
                                    : "border-l-[3px] border-l-transparent"
                            )}
                        >
                            <div className="flex items-start justify-between mb-1.5">
                                <span className="font-bold text-sm truncate pr-2">{app.candidateName}</span>
                                <span className="text-[9px] text-zinc-600 font-medium whitespace-nowrap">
                                    {format(new Date(app.createdAt), 'MMM d')}
                                </span>
                            </div>
                            <div className="text-xs text-zinc-600 mb-2 truncate">{app.candidateEmail}</div>
                            <span className={cn(
                                "inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded border",
                                getStatusColor(app.status)
                            )}>
                                {getStatusIcon(app.status)}
                                {app.status}
                            </span>
                        </button>
                    ))}
                    {filteredApplications.length === 0 && (
                        <div className="p-8 text-center">
                            <p className="text-zinc-600 text-xs">No candidates match filter.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* ── Right: Full Detail View ── */}
            <div className="flex-1 overflow-y-auto bg-[#0C0C0E]">
                {selectedApp ? (
                    <div className="p-10 lg:p-12">
                        <CandidateDetailView
                            key={selectedApp.id}
                            application={selectedApp}
                            jobId={jobId}
                            onStatusChange={handleStatusChange}
                        />
                    </div>
                ) : (
                    <div className="h-full flex items-center justify-center text-zinc-600">
                        Select a candidate to view details
                    </div>
                )}
            </div>
        </div>
    );
}

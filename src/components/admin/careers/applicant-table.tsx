'use client';

import React, { useState, useMemo } from 'react';
import { Search, Filter, Briefcase, GitBranch, Star, MapPin, ExternalLink } from 'lucide-react';
import { Job, JobApplication } from '@/lib/jobs';
import { CandidateNote } from '@/lib/candidates';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface ApplicantTableProps {
    applications: (JobApplication & { jobTitle: string })[];
    notes: CandidateNote[];
}

export default function ApplicantTable({ applications, notes }: ApplicantTableProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [jobFilter, setJobFilter] = useState('all');
    const [stageFilter, setStageFilter] = useState('all');

    const parsedData = useMemo(() => {
        return applications.map(app => {
            // Find the most recent review note
            const reviewNote = notes
                .filter(n => n.applicationId === app.id)
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .find(n => n.content.includes('Initial Review'));

            let clarity = 0, professionalism = 0, communication = 0, reviewerNotes = '';

            if (reviewNote) {
                const ratingsMatch = reviewNote.content.match(/Clarity:\s*(\d)\/5\s*\|\s*Professionalism:\s*(\d)\/5\s*\|\s*Communication:\s*(\d)\/5/);
                if (ratingsMatch) {
                    clarity = parseInt(ratingsMatch[1]);
                    professionalism = parseInt(ratingsMatch[2]);
                    communication = parseInt(ratingsMatch[3]);
                }
                const notesMatch = reviewNote.content.match(/Notes:\s*(.*)$/m);
                if (notesMatch) reviewerNotes = notesMatch[1];
            }

            const city = app.candidateAddress?.split(',').pop()?.trim() || 'Unknown';

            return {
                ...app,
                city,
                clarity,
                professionalism,
                communication,
                reviewerNotes
            };
        });
    }, [applications, notes]);

    const filteredData = useMemo(() => {
        return parsedData.filter(app => {
            const matchesSearch = searchQuery === '' || 
                app.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                app.candidateEmail.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesJob = jobFilter === 'all' || app.jobTitle === jobFilter;
            const matchesStage = stageFilter === 'all' || app.status === stageFilter;
            return matchesSearch && matchesJob && matchesStage;
        });
    }, [parsedData, searchQuery, jobFilter, stageFilter]);

    const jobs = [...new Set(applications.map(a => a.jobTitle))];
    const stages = [...new Set(applications.map(a => a.status))];

    return (
        <div className="flex flex-col h-full bg-[#050505]">
            {/* ── Filters ── */}
            <div className="p-8 border-b border-white/5 bg-[#0F1113]/40 space-y-4">
                <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                        <input 
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full bg-black/40 border border-white/5 rounded-2xl pl-12 pr-4 py-3 text-sm outline-none focus:border-[#ff6b3d]/40 transition-all placeholder:text-zinc-800"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 px-4 py-3 bg-black/40 border border-white/5 rounded-2xl">
                            <Briefcase className="w-4 h-4 text-zinc-600" />
                            <select 
                                value={jobFilter}
                                onChange={e => setJobFilter(e.target.value)}
                                className="bg-transparent text-xs font-bold uppercase tracking-widest text-zinc-400 outline-none min-w-[140px]"
                            >
                                <option value="all">All Jobs</option>
                                {jobs.map(j => <option key={j} value={j}>{j}</option>)}
                            </select>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-3 bg-black/40 border border-white/5 rounded-2xl">
                            <GitBranch className="w-4 h-4 text-zinc-600" />
                            <select 
                                value={stageFilter}
                                onChange={e => setStageFilter(e.target.value)}
                                className="bg-transparent text-xs font-bold uppercase tracking-widest text-zinc-400 outline-none min-w-[140px]"
                            >
                                <option value="all">All Stages</option>
                                {stages.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Table ── */}
            <div className="flex-1 overflow-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="sticky top-0 bg-[#0F1113] z-10">
                        <tr>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-600 border-b border-white/5">Candidate</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-600 border-b border-white/5">Details</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-600 border-b border-white/5">Ratings</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-600 border-b border-white/5">Notes</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-600 border-b border-white/5 text-right">Applied At</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.03]">
                        {filteredData.map(app => (
                            <tr key={app.id} className="group hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-5">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-bold text-sm text-zinc-200">{app.candidateName}</span>
                                        <span className="text-[10px] text-zinc-600 font-medium">{app.candidateEmail}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-2">
                                            <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded text-[9px] font-black uppercase tracking-widest">
                                                {app.jobTitle}
                                            </span>
                                            <span className="px-2 py-0.5 bg-zinc-900 text-zinc-400 border border-white/5 rounded text-[9px] font-black uppercase tracking-widest">
                                                {app.status}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[10px] text-zinc-600">
                                            <MapPin className="w-3 h-3" />
                                            {app.city}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="space-y-1.5">
                                        <RatingRow label="CLA" value={app.clarity} />
                                        <RatingRow label="PRO" value={app.professionalism} />
                                        <RatingRow label="COM" value={app.communication} />
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <p className="text-xs text-zinc-500 max-w-[240px] line-clamp-2 italic">
                                        {app.reviewerNotes || 'No notes available'}
                                    </p>
                                </td>
                                <td className="px-6 py-5 text-right">
                                    <span className="text-xs text-zinc-600 font-medium">
                                        {format(new Date(app.createdAt), 'MMM d, yyyy')}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredData.length === 0 && (
                    <div className="p-20 text-center text-zinc-700 font-bold uppercase tracking-widest text-xs">
                        No candidates found matching filters
                    </div>
                )}
            </div>
        </div>
    );
}

function RatingRow({ label, value }: { label: string, value: number }) {
    return (
        <div className="flex items-center gap-2">
            <span className="text-[8px] font-black text-zinc-700 w-6">{label}</span>
            <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className={cn(
                        "w-1.5 h-1.5 rounded-full transition-colors",
                        i <= value ? "bg-[#ff6b3d]" : "bg-white/5"
                    )} />
                ))}
            </div>
        </div>
    );
}

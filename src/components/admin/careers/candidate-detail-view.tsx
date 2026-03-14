'use client';

import React, { useState, useEffect } from 'react';
import { Download, Phone, MapPin, Calendar, FileText, ExternalLink, StickyNote, GitBranch, User, Star } from 'lucide-react';
import { JobApplication } from '@/lib/jobs';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import CandidateNotes from './candidate-notes';
import PipelineFeedback from './pipeline-feedback';

interface CandidateDetailViewProps {
    application: JobApplication;
    jobId: string;
    onStatusChange: (appId: string, newStatus: string) => void;
}

type Tab = 'info' | 'pipeline' | 'notes';

interface InitialReviewData {
    reviewer: string;
    clarity: number;
    professionalism: number;
    communication: number;
    notes?: string;
}

function parseInitialReview(content: string): InitialReviewData | null {
    const lines = content.trim().split('\n');
    if (lines.length < 2) return null;
    const reviewerMatch = lines[0].match(/^Initial Review by (.+?):$/);
    const ratingsMatch = lines[1].match(/Clarity:\s*(\d)\/5\s*\|\s*Professionalism:\s*(\d)\/5\s*\|\s*Communication:\s*(\d)\/5/);
    if (!reviewerMatch || !ratingsMatch) return null;
    const notesLine = lines.length > 2 ? lines.slice(2).join('\n').trim().replace(/^Notes:\s*/, '') : undefined;
    return {
        reviewer: reviewerMatch[1],
        clarity: parseInt(ratingsMatch[1]),
        professionalism: parseInt(ratingsMatch[2]),
        communication: parseInt(ratingsMatch[3]),
        notes: notesLine || undefined,
    };
}

function StarRow({ label, value }: { label: string; value: number }) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">{label}</span>
            <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} className={cn("w-3 h-3", s <= value ? "fill-[#ff6b3d] text-[#ff6b3d]" : "text-zinc-800")} />
                ))}
            </div>
        </div>
    );
}

export default function CandidateDetailView({ application, jobId, onStatusChange }: CandidateDetailViewProps) {
    const [activeTab, setActiveTab] = useState<Tab>('info');
    const [currentStatus, setCurrentStatus] = useState(application.status);
    const [review, setReview] = useState<InitialReviewData | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch(`/api/candidates/notes?applicationId=${application.id}`);
                const data = await res.json();
                if (Array.isArray(data)) {
                    const importantNote = data.find((n: any) => n.noteType === 'important_info');
                    if (importantNote?.content) {
                        setReview(parseInitialReview(importantNote.content));
                    }
                }
            } catch (err) { /* ignore */ }
        };
        load();
    }, [application.id]);

    const handleStatusChange = (newStatus: string) => {
        setCurrentStatus(newStatus);
        onStatusChange(application.id, newStatus);
    };

    const tabs: { key: Tab; label: string; icon: React.ElementType }[] = [
        { key: 'info', label: 'Application', icon: FileText },
        { key: 'pipeline', label: 'Pipeline & Feedback', icon: GitBranch },
        { key: 'notes', label: 'Notes', icon: StickyNote },
    ];

    return (
        <div className="space-y-6">
            {/* ── Candidate Header ── */}
            <div className="flex justify-between items-start">
                <div className="space-y-2">
                    <h1 className="text-3xl font-black">{application.candidateName}</h1>
                    <p className="text-zinc-500">{application.candidateEmail}</p>
                    <div className="flex items-center gap-3 mt-2">
                        <span className={cn(
                            "px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-lg border",
                            currentStatus === 'Selected'
                                ? "bg-green-500/10 text-green-400 border-green-500/20"
                                : currentStatus === 'Rejected'
                                    ? "bg-red-500/10 text-red-400 border-red-500/20"
                                    : currentStatus === 'Application Received' || currentStatus === 'New'
                                        ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                        : "bg-[#ff6b3d]/10 text-[#ff6b3d] border-[#ff6b3d]/20"
                        )}>
                            {currentStatus}
                        </span>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-3">
                    {application.resumeUrl && (
                        <a href={application.resumeUrl} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-2.5 bg-[#ff6b3d] text-white font-bold rounded-xl hover:bg-[#ff8a65] transition-all text-sm">
                            <Download className="w-4 h-4" /> Resume
                        </a>
                    )}
                    {/* Initial Review — Star Ratings */}
                    {review && (
                        <div className="bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 w-52">
                            <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-2 flex items-center gap-1.5">
                                <User className="w-3 h-3" /> {review.reviewer}
                            </div>
                            <div className="space-y-1.5">
                                <StarRow label="Clarity" value={review.clarity} />
                                <StarRow label="Professionalism" value={review.professionalism} />
                                <StarRow label="Communication" value={review.communication} />
                            </div>
                            {review.notes && (
                                <p className="text-[10px] text-zinc-600 mt-2 pt-2 border-t border-white/5">{review.notes}</p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* ── Quick Info Row ── */}
            <div className="flex gap-8 text-sm">
                <div className="flex items-center gap-2 text-zinc-500">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{application.candidatePhone || 'No phone'}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-500">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{application.candidateAddress || 'No address'}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-500">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{format(new Date(application.createdAt), 'MMMM d, yyyy')}</span>
                </div>
            </div>

            {/* ── Tabs ── */}
            <div className="flex gap-1 border-b border-white/5 -mx-1">
                {tabs.map(({ key, label, icon: Icon }) => (
                    <button key={key} onClick={() => setActiveTab(key)}
                        className={cn("flex items-center gap-2 px-5 py-3 text-sm font-bold transition-all relative",
                            activeTab === key ? "text-[#ff6b3d]" : "text-zinc-600 hover:text-zinc-300")}>
                        <Icon className="w-4 h-4" />
                        {label}
                        {activeTab === key && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ff6b3d] rounded-full" />}
                    </button>
                ))}
            </div>

            {/* ── Tab Content ── */}
            <div>
                {activeTab === 'info' && (
                    <div className="animate-in fade-in duration-300 space-y-6">
                        {Object.entries(application.responses || {}).map(([key, value]: [string, any]) => (
                            <div key={key} className="space-y-2 bg-white/[0.02] border border-white/5 p-5 rounded-xl">
                                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{key.replace(/_/g, ' ')}</label>
                                <div className="text-zinc-300 text-sm leading-relaxed">
                                    {typeof value === 'string' && value.startsWith('http') ? (
                                        <a href={value} target="_blank" rel="noopener noreferrer" className="text-[#ff6b3d] hover:underline flex items-center gap-2">
                                            View Attachment <ExternalLink className="w-3 h-3" />
                                        </a>
                                    ) : (value || 'No response')}
                                </div>
                            </div>
                        ))}
                        {(!application.responses || Object.keys(application.responses).length === 0) && (
                            <p className="text-zinc-700 italic text-sm">No additional responses for this applicant.</p>
                        )}
                    </div>
                )}

                {activeTab === 'pipeline' && (
                    <div className="animate-in fade-in duration-300">
                        <PipelineFeedback
                            key={application.id}
                            applicationId={application.id}
                            jobId={jobId}
                            currentStatus={currentStatus}
                            candidateName={application.candidateName}
                            candidateEmail={application.candidateEmail}
                            onStatusChange={handleStatusChange}
                        />
                    </div>
                )}

                {activeTab === 'notes' && (
                    <div className="animate-in fade-in duration-300">
                        <CandidateNotes applicationId={application.id} />
                    </div>
                )}
            </div>
        </div>
    );
}

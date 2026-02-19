'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Calendar, FileText, Download, CheckCircle, Clock, XCircle, Users, ExternalLink } from 'lucide-react';
import { JobApplication, getApplicationsForJob } from '@/lib/jobs';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface ApplicantListProps {
    jobId: string;
}

export default function ApplicantList({ jobId }: ApplicantListProps) {
    const [applications, setApplications] = useState<JobApplication[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null);

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
            case 'new': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            case 'reviewing': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
            case 'hired': return 'bg-green-500/10 text-green-400 border-green-500/20';
            case 'rejected': return 'bg-red-500/10 text-red-400 border-red-500/20';
            default: return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
        }
    };

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
        <div className="flex h-full min-h-[600px] bg-zinc-900/20 rounded-[2rem] border border-white/5 overflow-hidden">
            {/* List Sidebar */}
            <div className="w-1/3 border-r border-white/5 overflow-y-auto">
                {applications.map((app) => (
                    <button
                        key={app.id}
                        onClick={() => setSelectedApp(app)}
                        className={cn(
                            "w-full p-6 text-left border-b border-white/5 transition-all hover:bg-white/[0.02]",
                            selectedApp?.id === app.id ? "bg-white/[0.05] border-l-4 border-l-[#ff6b3d]" : "border-l-4 border-l-transparent"
                        )}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <span className="font-bold text-lg truncate pr-2">{app.candidateName}</span>
                            <span className={cn("text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md border", getStatusColor(app.status))}>
                                {app.status}
                            </span>
                        </div>
                        <div className="text-sm text-zinc-500 mb-3 truncate">{app.candidateEmail}</div>
                        <div className="flex items-center justify-between text-[10px] text-zinc-600 font-medium">
                            <span>{format(new Date(app.createdAt), 'MMM d, yyyy')}</span>
                        </div>
                    </button>
                ))}
            </div>

            {/* Detail View */}
            <div className="flex-1 bg-[#0F1113]/50 p-12 overflow-y-auto">
                {selectedApp ? (
                    <div className="space-y-12">
                        <div className="flex justify-between items-start">
                            <div className="space-y-2">
                                <h1 className="text-4xl font-black">{selectedApp.candidateName}</h1>
                                <p className="text-zinc-500 text-lg">{selectedApp.candidateEmail}</p>
                            </div>
                            <div className="flex gap-4">
                                {selectedApp.resumeUrl && (
                                    <a
                                        href={selectedApp.resumeUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-6 py-3 bg-[#ff6b3d] text-white font-bold rounded-2xl hover:bg-[#ff8a65] transition-all shadow-lg"
                                    >
                                        <Download className="w-4 h-4" /> View Resume (PDF)
                                    </a>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="space-y-1">
                                <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-2"><Phone className="w-3 h-3" /> Phone</span>
                                <p className="font-bold">{selectedApp.candidatePhone || 'Not provided'}</p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-2"><MapPin className="w-3 h-3" /> Address</span>
                                <p className="font-bold">{selectedApp.candidateAddress || 'Not provided'}</p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-2"><Calendar className="w-3 h-3" /> Applied On</span>
                                <p className="font-bold">{format(new Date(selectedApp.createdAt), 'MMMM d, yyyy')}</p>
                            </div>
                        </div>

                        <div className="h-[1px] w-full bg-white/5" />

                        {/* Custom Responses */}
                        <div className="space-y-8">
                            <h3 className="text-xl font-bold flex items-center gap-3">
                                <FileText className="w-5 h-5 text-[#ff6b3d]" /> Application Responses
                            </h3>
                            <div className="grid grid-cols-1 gap-8">
                                {Object.entries(selectedApp.responses || {}).map(([key, value]: [string, any]) => (
                                    <div key={key} className="space-y-3 bg-white/[0.02] border border-white/5 p-6 rounded-[2rem]">
                                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{key.replace(/_/g, ' ')}</label>
                                        <div className="text-zinc-300 leading-relaxed font-medium">
                                            {typeof value === 'string' && value.startsWith('http') ? (
                                                <a href={value} target="_blank" rel="noopener noreferrer" className="text-[#ff6b3d] hover:underline flex items-center gap-2">
                                                    View Attachment <ExternalLink className="w-3 h-3" />
                                                </a>
                                            ) : (
                                                value || 'No response provided'
                                            )}
                                        </div>
                                    </div>
                                ))}
                                {(!selectedApp.responses || Object.keys(selectedApp.responses).length === 0) && (
                                    <p className="text-zinc-600 italic">No additional custom responses for this applicant.</p>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="h-full flex items-center justify-center text-zinc-600">
                        Select an applicant to view details
                    </div>
                )}
            </div>
        </div>
    );
}

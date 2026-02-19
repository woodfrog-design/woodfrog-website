'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Settings, LogOut, ChevronLeft, Briefcase, Users, Search, Edit3, Trash2, CheckCircle, XCircle, Eye } from 'lucide-react';
import { Job, getJobs, updateJobStatus } from '@/lib/jobs';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import JobEditor from '@/components/admin/careers/job-editor';
import ApplicantList from '@/components/admin/careers/applicant-list';

export default function AdminCareersPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isGateOpen, setIsGateOpen] = useState(false);
    const [gatePassword, setGatePassword] = useState('');
    const [gateError, setGateError] = useState('');

    const [jobs, setJobs] = useState<Job[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [view, setView] = useState<'list' | 'editor' | 'applications'>('list');
    const [selectedJob, setSelectedJob] = useState<Job | undefined>(undefined);

    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        if (token !== 'logged_in') {
            router.push('/admin/login');
        } else {
            setIsAuthenticated(true);
            const gateToken = sessionStorage.getItem('career_gate_token');
            if (gateToken === 'unlocked') {
                setIsGateOpen(true);
                fetchJobs();
            }
        }
    }, [router]);

    const handleGateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Secondary gate password
        if (gatePassword === 'woodfrog-careers-2026') {
            sessionStorage.setItem('career_gate_token', 'unlocked');
            setIsGateOpen(true);
            fetchJobs();
        } else {
            setGateError('Incorrect careers management password');
        }
    };

    const fetchJobs = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/jobs');
            const data = await res.json();
            setJobs(data);
        } catch (error) {
            console.error('Failed to fetch jobs', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        sessionStorage.removeItem('career_gate_token');
        router.push('/admin/login');
    };

    const handleToggleStatus = async (job: Job) => {
        const success = await updateJobStatus(job.id, !job.isActive);
        if (success) {
            fetchJobs(); // Refresh
        }
    };

    if (!isAuthenticated) return null;

    if (!isGateOpen) {
        return (
            <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6">
                <div className="w-full max-w-md p-8 rounded-3xl bg-[#141618] border border-white/10 shadow-2xl text-center">
                    <Briefcase className="w-12 h-12 text-[#ff6b3d] mx-auto mb-6" />
                    <h1 className="text-2xl font-bold mb-2">Careers Management</h1>
                    <p className="text-zinc-500 mb-8 text-sm">Please enter the secondary password to access career data and applications.</p>

                    <form onSubmit={handleGateSubmit} className="space-y-6">
                        <input
                            type="password"
                            value={gatePassword}
                            onChange={(e) => setGatePassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-white/5 focus:border-[#ff6b3d] outline-none transition-all text-center"
                            placeholder="Enter careers password"
                            required
                        />
                        {gateError && <p className="text-red-400 text-xs">{gateError}</p>}
                        <button
                            type="submit"
                            className="w-full py-4 bg-[#ff6b3d] text-white font-bold rounded-xl hover:bg-[#ff8a65] transition-all"
                        >
                            Unlock Careers Section
                        </button>
                    </form>
                    <button
                        onClick={() => router.push('/admin/users/blogs')}
                        className="mt-6 text-zinc-500 hover:text-white text-sm"
                    >
                        Back to Blogs Admin
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#050505] text-white flex flex-col">
            {/* Header */}
            <div className="px-8 py-5 border-b border-white/5 bg-[#0A0A0A]/80 backdrop-blur-xl flex items-center justify-between sticky top-0 z-20">
                <div className="flex items-center gap-6">
                    <h1 className="text-xl font-bold flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-[#ff6b3d]" />
                        Careers Admin
                    </h1>
                    <div className="h-6 w-[1px] bg-white/10" />
                    <nav className="flex items-center gap-4">
                        <button
                            onClick={() => { setView('list'); setSelectedJob(undefined); }}
                            className={cn(
                                "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                                view === 'list' ? "bg-white/10 text-white" : "text-zinc-500 hover:text-white"
                            )}
                        >
                            Job Openings
                        </button>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-white/5 rounded-full text-zinc-500 hover:text-white transition-all text-sm font-medium"
                    >
                        <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                </div>
            </div>

            <div className="flex-1 p-8 lg:p-12 max-w-7xl mx-auto w-full">
                {view === 'list' && (
                    <>
                        <div className="flex items-center justify-between mb-16">
                            <div>
                                <h2 className="text-4xl font-bold mb-3">Opportunities</h2>
                                <p className="text-zinc-500">Manage your job listings and track applicants.</p>
                            </div>
                            <button
                                onClick={() => setView('editor')}
                                className="flex items-center gap-2 px-8 py-4 bg-[#ff6b3d] text-white font-black rounded-full hover:shadow-[0_0_20px_rgba(255,107,61,0.3)] transition-all active:scale-95"
                            >
                                <Plus className="w-5 h-5" /> Post New Job
                            </button>
                        </div>

                        {isLoading ? (
                            <div className="space-y-4">
                                {[1, 2, 3].map(i => <div key={i} className="h-24 w-full rounded-2xl bg-zinc-900 animate-pulse" />)}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4">
                                {jobs.map((job) => (
                                    <div
                                        key={job.id}
                                        className="group bg-[#0F1113] border border-white/5 rounded-2xl p-6 hover:border-[#ff6b3d]/30 transition-all"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-3">
                                                    <h3 className="text-xl font-bold">{job.title}</h3>
                                                    <button
                                                        onClick={() => handleToggleStatus(job)}
                                                        className={cn(
                                                            "px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded border transition-all",
                                                            job.isActive
                                                                ? "bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20"
                                                                : "bg-zinc-500/10 text-zinc-400 border-zinc-500/20 hover:bg-zinc-500/20"
                                                        )}
                                                    >
                                                        {job.isActive ? 'Active' : 'Inactive'}
                                                    </button>
                                                    {job.newApplicantCount! > 0 && (
                                                        <span className="px-2 py-0.5 bg-[#ff6b3d] text-white text-[10px] font-black uppercase tracking-widest rounded-full animate-pulse">
                                                            {job.newApplicantCount} New
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-4 text-xs text-zinc-500 font-medium">
                                                    <span>{job.department}</span>
                                                    <span className="w-1 h-1 bg-zinc-800 rounded-full" />
                                                    <span>{job.location}</span>
                                                    <span className="w-1 h-1 bg-zinc-800 rounded-full" />
                                                    <span>{job.employmentType}</span>
                                                    <span className="w-1 h-1 bg-zinc-800 rounded-full" />
                                                    <div className="flex items-center gap-1.5 text-[#ff6b3d]/70">
                                                        <Eye className="w-3 h-3" />
                                                        <span>{job.viewCount || 0} views</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => { setSelectedJob(job); setView('applications'); }}
                                                    className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-bold flex items-center gap-2 transition-all group/btn"
                                                >
                                                    <Users className="w-4 h-4 text-[#ff6b3d]" />
                                                    View Applicants
                                                    <span className="ml-1 px-2 py-0.5 bg-white/5 rounded-md text-[10px] text-zinc-400 group-hover/btn:text-white transition-colors">
                                                        {job.applicantCount} total
                                                    </span>
                                                </button>
                                                <button
                                                    onClick={() => { setSelectedJob(job); setView('editor'); }}
                                                    className="p-2.5 bg-zinc-900 hover:bg-[#ff6b3d]/10 hover:text-[#ff6b3d] rounded-xl transition-all"
                                                >
                                                    <Edit3 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {jobs.length === 0 && (
                                    <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-[2.5rem]">
                                        <Briefcase className="w-12 h-12 text-zinc-800 mx-auto mb-4" />
                                        <p className="text-zinc-600 font-bold uppercase tracking-widest text-xs">No jobs posted yet</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                )}



                {view === 'editor' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-[calc(100vh-160px)] flex flex-col">
                        <div className="mb-8 flex items-center justify-between">
                            <button
                                onClick={() => setView('list')}
                                className="flex items-center gap-2 text-zinc-500 hover:text-white transition-all text-sm font-bold group"
                            >
                                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
                            </button>
                            <h2 className="text-2xl font-bold">{selectedJob ? 'Edit Job' : 'Create New Job'}</h2>
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <JobEditor
                                job={selectedJob}
                                onSave={() => { setView('list'); fetchJobs(); }}
                                onCancel={() => setView('list')}
                            />
                        </div>
                    </div>
                )}

                {view === 'applications' && selectedJob && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-[calc(100vh-160px)] flex flex-col">
                        <div className="mb-8 flex items-center justify-between">
                            <button
                                onClick={() => setView('list')}
                                className="flex items-center gap-2 text-zinc-500 hover:text-white transition-all text-sm font-bold group"
                            >
                                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
                            </button>
                            <div>
                                <h2 className="text-2xl font-bold">Applicants for {selectedJob.title}</h2>
                                <p className="text-xs text-[#ff6b3d] mt-1">{selectedJob.department} • {selectedJob.location}</p>
                            </div>
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <ApplicantList jobId={selectedJob.id} />
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}

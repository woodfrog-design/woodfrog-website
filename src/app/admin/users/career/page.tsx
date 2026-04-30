'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, LogOut, ChevronLeft, Briefcase, Users, Edit3, Eye, GitBranch, BarChart3, Settings, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Job, getJobs, updateJobStatus, getAllApplications, JobApplication } from '@/lib/jobs';
import { cn } from '@/lib/utils';
import JobEditor from '@/components/admin/careers/job-editor';
import ApplicantList from '@/components/admin/careers/applicant-list';
import StageManager from '@/components/admin/careers/stage-manager';
import CareersDashboard from '@/components/admin/careers/dashboard';
import ApplicantTable from '@/components/admin/careers/applicant-table';
import { CandidateNote, getAllCandidateNotes } from '@/lib/candidates';

export default function AdminCareersPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [allApplications, setAllApplications] = useState<(JobApplication & { jobTitle: string })[]>([]);
    const [allNotes, setAllNotes] = useState<CandidateNote[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [view, setView] = useState<'list' | 'editor' | 'applications' | 'stages' | 'insights' | 'settings'>('list');
    const [selectedJob, setSelectedJob] = useState<Job | undefined>(undefined);
    const [smtpForm, setSmtpForm] = useState({ host: '', port: '587', user: '', pass: '', senderName: 'Woodfrog' });
    const [smtpStatus, setSmtpStatus] = useState<{ type: 'success' | 'error' | ''; message: string }>({ type: '', message: '' });
    const [smtpLoading, setSmtpLoading] = useState(false);
    const [smtpTesting, setSmtpTesting] = useState(false);
    const [contactSmtpForm, setContactSmtpForm] = useState({ host: '', port: '587', user: '', pass: '', senderName: 'Woodfrog' });
    const [contactSmtpStatus, setContactSmtpStatus] = useState<{ type: 'success' | 'error' | ''; message: string }>({ type: '', message: '' });
    const [contactSmtpLoading, setContactSmtpLoading] = useState(false);
    const [contactSmtpTesting, setContactSmtpTesting] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        if (token !== 'logged_in') {
            router.push('/admin/users/login');
        } else {
            setIsAuthenticated(true);
            fetchJobs();
            fetchGlobalData();
        }
    }, [router]);

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

    const fetchGlobalData = async () => {
        try {
            const [apps, notes] = await Promise.all([
                getAllApplications(),
                getAllCandidateNotes()
            ]);
            setAllApplications(apps);
            setAllNotes(notes);
        } catch (error) {
            console.error('Failed to fetch global data', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        router.push('/admin/users/login');
    };

    const handleToggleStatus = async (job: Job) => {
        const success = await updateJobStatus(job.id, !job.isActive);
        if (success) {
            fetchJobs();
        }
    };

    if (!isAuthenticated) return null;

    // ── Full-bleed views: applicants and stages fill the entire viewport below navbar ──
    const isFullBleed = view === 'applications' || view === 'stages' || view === 'editor' || view === 'insights' || view === 'settings';

    const loadSmtpSettings = async () => {
        try {
            const [careersRes, contactRes] = await Promise.all([
                fetch('/api/admin/settings?purpose=careers'),
                fetch('/api/admin/settings?purpose=contact'),
            ]);
            const careersData = await careersRes.json();
            const contactData = await contactRes.json();
            setSmtpForm({
                host: careersData.host || '', port: String(careersData.port || '587'),
                user: careersData.user || '', pass: careersData.hasPassword ? careersData.pass : '',
                senderName: careersData.senderName || 'Woodfrog',
            });
            setContactSmtpForm({
                host: contactData.host || '', port: String(contactData.port || '587'),
                user: contactData.user || '', pass: contactData.hasPassword ? contactData.pass : '',
                senderName: contactData.senderName || 'Woodfrog',
            });
        } catch (err) {
            console.error('Failed to load SMTP settings', err);
        }
    };

    const handleSmtpAction = async (form: typeof smtpForm, purpose: 'careers' | 'contact', action: 'test' | 'save') => {
        const isTest = action === 'test';
        const setLoading = purpose === 'contact' ? (isTest ? setContactSmtpTesting : setContactSmtpLoading) : (isTest ? setSmtpTesting : setSmtpLoading);
        const setStatus = purpose === 'contact' ? setContactSmtpStatus : setSmtpStatus;
        setLoading(true);
        setStatus({ type: '', message: '' });
        try {
            const passToSend = isTest ? form.pass : (form.pass === '••••••••' ? undefined : form.pass);
            const res = await fetch('/api/admin/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, pass: passToSend, port: Number(form.port), purpose, ...(isTest ? { testConnection: true } : {}) }),
            });
            const data = await res.json();
            if (isTest) {
                setStatus({ type: data.success ? 'success' : 'error', message: data.message });
            } else {
                setStatus({ type: data.success ? 'success' : 'error', message: data.success ? 'SMTP settings saved successfully!' : (data.error || 'Failed to save') });
            }
        } catch (err: any) {
            setStatus({ type: 'error', message: err.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#050505] text-white flex flex-col">
            {/* ── Navbar ── */}
            <div className="px-8 py-4 border-b border-white/5 bg-[#0A0A0A]/80 backdrop-blur-xl flex items-center justify-between sticky top-0 z-20 flex-shrink-0">
                <div className="flex items-center gap-5">
                    {isFullBleed && (
                        <button
                            onClick={() => setView('list')}
                            className="flex items-center gap-1.5 text-zinc-500 hover:text-white transition-all text-sm font-bold group mr-2"
                        >
                            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        </button>
                    )}
                    <h1 className="text-lg font-bold flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-[#ff6b3d]" />
                        {view === 'applications' && selectedJob
                            ? <>
                                <span>Applicants</span>
                                <span className="text-zinc-600 mx-1">•</span>
                                <span className="text-[#ff6b3d]">{selectedJob.title}</span>
                                <span className="text-xs text-zinc-600 font-medium ml-2">{selectedJob.department} · {selectedJob.location}</span>
                              </>
                            : view === 'stages' && selectedJob
                                ? <>
                                    <span>Interview Stages</span>
                                    <span className="text-zinc-600 mx-1">•</span>
                                    <span className="text-[#ff6b3d]">{selectedJob.title}</span>
                                  </>
                                : view === 'editor'
                                    ? <>
                                        <span>{selectedJob ? 'Edit Job' : 'New Job'}</span>
                                        {selectedJob && <>
                                            <span className="text-zinc-600 mx-1">•</span>
                                            <span className="text-[#ff6b3d]">{selectedJob.title}</span>
                                        </>}
                                      </>
                                    : view === 'insights'
                                        ? <span>Dashboard & Insights</span>
                                        : 'Careers Admin'
                        }
                    </h1>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => { setView('list'); setSelectedJob(undefined); }}
                        className={cn(
                            "px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
                            view === 'list' ? "bg-white/10 text-white" : "text-zinc-500 hover:text-white"
                        )}
                    >
                        <Briefcase className="w-4 h-4" />
                        Job Openings
                    </button>
                    <button
                        onClick={() => { setView('insights'); setSelectedJob(undefined); }}
                        className={cn(
                            "px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
                            view === 'insights' ? "bg-white/10 text-white" : "text-zinc-500 hover:text-white"
                        )}
                    >
                        <BarChart3 className="w-4 h-4" />
                        Insights
                    </button>
                    <button
                        onClick={() => { setView('settings'); setSelectedJob(undefined); loadSmtpSettings(); }}
                        className={cn(
                            "px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
                            view === 'settings' ? "bg-white/10 text-white" : "text-zinc-500 hover:text-white"
                        )}
                    >
                        <Settings className="w-4 h-4" />
                        Settings
                    </button>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-white/5 rounded-full text-zinc-500 hover:text-white transition-all text-sm font-medium"
                    >
                        <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                </div>
            </div>

            {/* ── Content ── */}
            {view === 'list' && (
                <div className="flex-1 p-8 lg:p-12 max-w-7xl mx-auto w-full">
                    <div className="flex items-center justify-between mb-16">
                        <div>
                            <h2 className="text-4xl font-bold mb-3">Opportunities</h2>
                            <p className="text-zinc-500">Manage your job listings, interview pipelines, and track applicants.</p>
                        </div>
                        <button
                            onClick={() => { setSelectedJob(undefined); setView('editor'); }}
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
                                                onClick={() => { setSelectedJob(job); setView('stages'); }}
                                                className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-bold flex items-center gap-2 transition-all text-zinc-400 hover:text-white"
                                                title="Configure interview stages"
                                            >
                                                <GitBranch className="w-4 h-4 text-purple-400" />
                                                Stages
                                            </button>
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
                </div>
            )}

            {view === 'editor' && (
                <div className="flex-1 overflow-hidden px-8 lg:px-12 py-8 max-w-7xl mx-auto w-full">
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
                        <JobEditor
                            job={selectedJob}
                            onSave={() => { setView('list'); fetchJobs(); }}
                            onCancel={() => setView('list')}
                        />
                    </div>
                </div>
            )}

            {/* ── Applicants: Full-bleed, fills everything below navbar ── */}
            {view === 'applications' && selectedJob && (
                <div className="flex-1 overflow-hidden">
                    <ApplicantList jobId={selectedJob.id} jobTitle={selectedJob.title} formFields={selectedJob.formFields} />
                </div>
            )}

            {/* ── Stages: Full-bleed ── */}
            {view === 'stages' && selectedJob && (
                <div className="flex-1 p-8 lg:p-12 max-w-5xl mx-auto w-full">
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-[calc(100vh-160px)] flex flex-col">
                        <div className="flex-1 overflow-hidden">
                            <StageManager jobId={selectedJob.id} onClose={() => setView('list')} />
                        </div>
                    </div>
                </div>
            )}

            {/* ── Insights: Dashboard and Applicant Table ── */}
            {view === 'insights' && (
                <div className="flex-1 flex flex-col overflow-hidden bg-[#050505]">
                    <div className="flex-1 overflow-y-auto">
                        <div className="max-w-7xl mx-auto w-full">
                            <CareersDashboard jobs={jobs} applications={allApplications} />
                            
                            <div className="px-8 lg:px-12 pb-20">
                                <div className="bg-[#0F1113] border border-white/5 rounded-[2.5rem] overflow-hidden min-h-[600px] flex flex-col">
                                    <div className="p-8 border-b border-white/5 bg-gradient-to-r from-white/[0.02] to-transparent">
                                        <h3 className="text-2xl font-black flex items-center gap-3">
                                            <Users className="w-6 h-6 text-[#ff6b3d]" />
                                            Applicant Ledger
                                        </h3>
                                        <p className="text-zinc-500 text-sm mt-1">Detailed candidate reviews and performance ratings.</p>
                                    </div>
                                    <div className="flex-1 overflow-hidden">
                                        <ApplicantTable applications={allApplications} notes={allNotes} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Settings ── */}
            {view === 'settings' && (
                <div className="flex-1 p-8 lg:p-12 max-w-3xl mx-auto w-full">
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-12">

                        {/* ── Section 1: Interview & Candidate Emails (careers) ── */}
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-3xl font-bold mb-2">Interview & Candidate Emails</h2>
                                <p className="text-zinc-500 text-sm">SMTP credentials used for sending interview invitations, stage updates, and candidate communications.</p>
                            </div>
                            <div className="bg-[#0F1113] border border-white/5 rounded-2xl p-8 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">SMTP Host</label>
                                        <input type="text" value={smtpForm.host} onChange={e => setSmtpForm({ ...smtpForm, host: e.target.value })} className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-[#ff6b3d]/50 transition-all text-sm" placeholder="smtp.gmail.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Port</label>
                                        <input type="text" value={smtpForm.port} onChange={e => setSmtpForm({ ...smtpForm, port: e.target.value })} className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-[#ff6b3d]/50 transition-all text-sm" placeholder="587" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Username / Email</label>
                                        <input type="text" value={smtpForm.user} onChange={e => setSmtpForm({ ...smtpForm, user: e.target.value })} className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-[#ff6b3d]/50 transition-all text-sm" placeholder="you@example.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Password / App Password</label>
                                        <input type="password" value={smtpForm.pass} onFocus={e => { if (e.target.value === '••••••••') setSmtpForm({ ...smtpForm, pass: '' }); }} onChange={e => setSmtpForm({ ...smtpForm, pass: e.target.value })} className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-[#ff6b3d]/50 transition-all text-sm" placeholder="••••••••" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Sender Name</label>
                                    <input type="text" value={smtpForm.senderName} onChange={e => setSmtpForm({ ...smtpForm, senderName: e.target.value })} className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-[#ff6b3d]/50 transition-all text-sm max-w-sm" placeholder="Woodfrog" />
                                    <p className="text-[10px] text-zinc-700 ml-1">Appears as the sender name in emails, e.g. &quot;Woodfrog Careers&quot;</p>
                                </div>
                                {smtpStatus.message && (
                                    <div className={cn("p-4 rounded-xl flex items-center gap-3 text-sm", smtpStatus.type === 'success' ? "bg-green-500/10 border border-green-500/20 text-green-400" : "bg-red-500/10 border border-red-500/20 text-red-400")}>
                                        {smtpStatus.type === 'success' ? <CheckCircle className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                                        {smtpStatus.message}
                                    </div>
                                )}
                                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                                    <button onClick={() => handleSmtpAction(smtpForm, 'careers', 'test')} disabled={smtpTesting || !smtpForm.host || !smtpForm.user} className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all disabled:opacity-40 text-sm">
                                        {smtpTesting ? <Loader2 className="w-4 h-4 animate-spin" /> : null} Test Connection
                                    </button>
                                    <button onClick={() => handleSmtpAction(smtpForm, 'careers', 'save')} disabled={smtpLoading || !smtpForm.host || !smtpForm.user} className="flex items-center gap-2 px-6 py-3 bg-[#ff6b3d] text-white font-bold rounded-xl hover:bg-[#ff8a65] transition-all disabled:opacity-40 shadow-[0_10px_20px_rgba(255,107,61,0.2)] text-sm">
                                        {smtpLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null} Save Settings
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* ── Section 2: Inbound Queries / Contact Form ── */}
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-3xl font-bold mb-2">Inbound Queries (Contact Form)</h2>
                                <p className="text-zinc-500 text-sm">SMTP credentials used for delivering messages submitted through the website contact form.</p>
                            </div>
                            <div className="bg-[#0F1113] border border-white/5 rounded-2xl p-8 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">SMTP Host</label>
                                        <input type="text" value={contactSmtpForm.host} onChange={e => setContactSmtpForm({ ...contactSmtpForm, host: e.target.value })} className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-[#ff6b3d]/50 transition-all text-sm" placeholder="smtp.gmail.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Port</label>
                                        <input type="text" value={contactSmtpForm.port} onChange={e => setContactSmtpForm({ ...contactSmtpForm, port: e.target.value })} className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-[#ff6b3d]/50 transition-all text-sm" placeholder="587" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Username / Email</label>
                                        <input type="text" value={contactSmtpForm.user} onChange={e => setContactSmtpForm({ ...contactSmtpForm, user: e.target.value })} className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-[#ff6b3d]/50 transition-all text-sm" placeholder="you@example.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Password / App Password</label>
                                        <input type="password" value={contactSmtpForm.pass} onFocus={e => { if (e.target.value === '••••••••') setContactSmtpForm({ ...contactSmtpForm, pass: '' }); }} onChange={e => setContactSmtpForm({ ...contactSmtpForm, pass: e.target.value })} className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-[#ff6b3d]/50 transition-all text-sm" placeholder="••••••••" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Sender Name</label>
                                    <input type="text" value={contactSmtpForm.senderName} onChange={e => setContactSmtpForm({ ...contactSmtpForm, senderName: e.target.value })} className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-[#ff6b3d]/50 transition-all text-sm max-w-sm" placeholder="Woodfrog" />
                                    <p className="text-[10px] text-zinc-700 ml-1">Appears as the sender name in contact form emails, e.g. &quot;Woodfrog Contact Form&quot;</p>
                                </div>
                                {contactSmtpStatus.message && (
                                    <div className={cn("p-4 rounded-xl flex items-center gap-3 text-sm", contactSmtpStatus.type === 'success' ? "bg-green-500/10 border border-green-500/20 text-green-400" : "bg-red-500/10 border border-red-500/20 text-red-400")}>
                                        {contactSmtpStatus.type === 'success' ? <CheckCircle className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                                        {contactSmtpStatus.message}
                                    </div>
                                )}
                                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                                    <button onClick={() => handleSmtpAction(contactSmtpForm, 'contact', 'test')} disabled={contactSmtpTesting || !contactSmtpForm.host || !contactSmtpForm.user} className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all disabled:opacity-40 text-sm">
                                        {contactSmtpTesting ? <Loader2 className="w-4 h-4 animate-spin" /> : null} Test Connection
                                    </button>
                                    <button onClick={() => handleSmtpAction(contactSmtpForm, 'contact', 'save')} disabled={contactSmtpLoading || !contactSmtpForm.host || !contactSmtpForm.user} className="flex items-center gap-2 px-6 py-3 bg-[#ff6b3d] text-white font-bold rounded-xl hover:bg-[#ff8a65] transition-all disabled:opacity-40 shadow-[0_10px_20px_rgba(255,107,61,0.2)] text-sm">
                                        {contactSmtpLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null} Save Settings
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </main>
    );
}

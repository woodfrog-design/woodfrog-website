'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, MapPin, Briefcase, Clock, Send, CheckCircle, Linkedin, Twitter, Facebook, Globe, Upload, AlertCircle, Loader2 } from 'lucide-react';
import { Job, getJobBySlug, incrementJobViewCount } from '@/lib/jobs';
import { cn } from '@/lib/utils';
import { ShareButtons } from '@/components/ui/share-buttons';
import { useRouter, useSearchParams } from 'next/navigation';

export default function JobDetailPage() {
    const { slug } = useParams();
    const [job, setJob] = useState<Job | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [view, setView] = useState<'description' | 'form'>('description');
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLinkedInAuthenticated, setIsLinkedInAuthenticated] = useState(false);
    const [isLinking, setIsLinking] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();

    const [formResponses, setFormResponses] = useState<Record<string, any>>({});
    const [candidateInfo, setCandidateInfo] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });
    const [linkedinProfileUrl, setLinkedinProfileUrl] = useState('');
    const [files, setFiles] = useState<Record<string, File>>({});

    useEffect(() => {
        const fetchJob = async () => {
            const data = await getJobBySlug(slug as string);
            if (data) {
                setJob(data);
                // Increment view count only once per visitor (unique views)
                try {
                    const viewedKey = 'viewed_jobs';
                    const viewed: string[] = JSON.parse(localStorage.getItem(viewedKey) || '[]');
                    if (!viewed.includes(data.id)) {
                        incrementJobViewCount(data.id);
                        viewed.push(data.id);
                        localStorage.setItem(viewedKey, JSON.stringify(viewed));
                    }
                } catch {
                    // localStorage unavailable (e.g. private browsing), increment anyway
                    incrementJobViewCount(data.id);
                }
            }
            setIsLoading(false);
        };
        fetchJob();

        // Check for LinkedIn data in URL (fresh login)
        const linkedinData = searchParams.get('linkedin_data');
        if (linkedinData) {
            try {
                const decoded = JSON.parse(atob(linkedinData));
                setCandidateInfo(prev => ({
                    ...prev,
                    name: decoded.name || '',
                    email: decoded.email || ''
                }));
                setLinkedinProfileUrl(decoded.linkedinProfileUrl || '');
                setIsLinkedInAuthenticated(true);
                setView('form');
                
                // Clear the URL param without refreshing
                const newUrl = window.location.pathname;
                window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);
            } catch (e) {
                console.error('Failed to decode LinkedIn data', e);
            }
        } else {
            // No URL data — check for existing session cookie
            fetch('/api/auth/linkedin/session')
                .then(res => res.json())
                .then(session => {
                    if (session.authenticated) {
                        setCandidateInfo(prev => ({
                            ...prev,
                            name: session.name || '',
                            email: session.email || ''
                        }));
                        setLinkedinProfileUrl(session.linkedinProfileUrl || '');
                        setIsLinkedInAuthenticated(true);
                    }
                })
                .catch(() => { /* session check failed, user will login fresh */ });
        }

        const error = searchParams.get('error');
        if (error === 'linkedin_denied') {
            setErrorMessage('LinkedIn authentication was cancelled or denied.');
            setTimeout(() => setErrorMessage(''), 5000);
        } else if (error === 'linkedin_failed') {
            setErrorMessage('LinkedIn authentication failed. Please try again.');
            setTimeout(() => setErrorMessage(''), 5000);
        }
    }, [slug, searchParams]);

    const handleLinkedInLogin = async () => {
        setIsLinking(true);
        try {
            const res = await fetch(`/api/auth/linkedin/url?slug=${slug}`);
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            }
        } catch (e) {
            setErrorMessage('Failed to initiate LinkedIn login');
            setIsLinking(false);
        }
    };

    const handleFileChange = (fieldId: string, file: File, maxSize: number = 5) => {
        if (file.type !== 'application/pdf') {
            setErrorMessage('Only PDF files are accepted.');
            return;
        }
        if (file.size > maxSize * 1024 * 1024) {
            setErrorMessage(`File size must be less than ${maxSize}MB.`);
            return;
        }
        setErrorMessage('');
        setFiles({ ...files, [fieldId]: file });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('submitting');
        setErrorMessage('');

        try {
            const formData = new FormData();
            formData.append('jobId', job?.id || '');
            formData.append('jobTitle', job?.title || '');
            formData.append('candidateName', candidateInfo.name);
            formData.append('candidateEmail', candidateInfo.email);
            formData.append('candidatePhone', candidateInfo.phone);
            formData.append('candidateAddress', candidateInfo.address);
            formData.append('linkedinProfileUrl', linkedinProfileUrl);
            formData.append('responses', JSON.stringify(formResponses));

            // Append resume file
            if (files['resume']) {
                formData.append('resume', files['resume']);
            }

            const res = await fetch('/api/job-applications', {
                method: 'POST',
                body: formData // Fetch automatically sets content-type to multipart/form-data for FormData
            });

            if (res.ok) setFormStatus('success');
            else {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Failed to save application');
            }

        } catch (error: any) {
            console.error('Submission failed', error);
            setErrorMessage(error.message || 'Something went wrong. Please try again.');
            setFormStatus('error');
            setTimeout(() => setFormStatus('idle'), 5000);
        }
    };

    if (isLoading) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading opportunity...</div>;
    if (!job) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Position not found.</div>;

    return (
        <main className="min-h-screen bg-transparent text-white selection:bg-[#ff6b3d]/30 pb-20">

            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-32 lg:pt-40">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Left Column: Description or Form */}
                    <div className="lg:col-span-8 space-y-12">
                        <motion.button
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            onClick={() => view === 'form' ? setView('description') : window.history.back()}
                            className="flex items-center gap-2 text-zinc-500 hover:text-white transition-all text-sm font-bold group"
                        >
                            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            {view === 'form' ? 'Back to Job Description' : 'Explore All Positions'}
                        </motion.button>

                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
                                {job.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-6 text-zinc-500 font-medium">
                                <span className="text-[#ff6b3d] font-bold tracking-widest uppercase">{job.department}</span>
                                <span className="w-1.5 h-1.5 bg-zinc-800 rounded-full" />
                                <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {job.location}</span>
                            </div>
                        </div>

                        <div className="h-[1px] w-full bg-white/5" />

                        <AnimatePresence mode="wait">
                            {view === 'description' ? (
                                <motion.div
                                    key="description"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="space-y-12"
                                >
                                    {/* Position Details Highlights */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 bg-white/[0.02] border border-white/5 rounded-3xl relative overflow-hidden group/details">
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Position</span>
                                            <p className="font-bold text-sm text-zinc-300 truncate" title={job.title}>{job.title}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Location</span>
                                            <p className="font-bold text-sm text-zinc-300">{job.location}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Type</span>
                                            <p className="font-bold text-sm text-zinc-300">{job.employmentType}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Mode</span>
                                            <p className="font-bold text-sm text-[#ff6b3d]">{job.workMode}</p>
                                        </div>
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff6b3d]/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover/details:bg-[#ff6b3d]/10 transition-all duration-700" />
                                    </div>

                                    {/* Render Structured Sections or Legacy Description */}
                                    <div className="space-y-16">
                                        {job.descriptionSections && job.descriptionSections.length > 0 ? (
                                            job.descriptionSections.map((section, idx) => (
                                                <div key={section.id || idx} className="group/section">
                                                    <div className="flex items-center gap-6 mb-8">
                                                        <h2 className="text-3xl font-black text-white shrink-0">{section.title}</h2>
                                                        <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent group-hover/section:from-[#ff6b3d]/30 transition-all duration-700" />
                                                    </div>
                                                    <div
                                                        dangerouslySetInnerHTML={{ __html: section.content }}
                                                        className="prose prose-invert prose-orange max-w-none text-zinc-400 text-lg leading-relaxed space-y-4 rich-text-content"
                                                    />
                                                </div>
                                            ))
                                        ) : (
                                            <div
                                                dangerouslySetInnerHTML={{ __html: job.description }}
                                                className="prose prose-invert prose-orange max-w-none text-zinc-400 text-lg leading-relaxed space-y-4 rich-text-content"
                                            />
                                        )}
                                    </div>

                                    <div className="mt-20 p-12 bg-white/[0.02] border border-white/5 rounded-[3rem] text-center space-y-8 relative overflow-hidden group">
                                        <div className="relative z-10">
                                            <h3 className="text-3xl font-bold">Ready to make an impact?</h3>
                                            <p className="text-zinc-500 max-w-lg mx-auto">Join a team of elite data engineers and AI specialists building the future of enterprise intelligence.</p>
                                            <button
                                                onClick={() => setView('form')}
                                                className="mt-8 px-10 py-5 bg-[#ff6b3d] text-white font-black rounded-full hover:scale-105 hover:bg-[#ff8a65] transition-all shadow-[0_20px_40px_rgba(255,107,61,0.2)]"
                                            >
                                                Apply for this Position
                                            </button>
                                        </div>
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff6b3d]/5 blur-[100px] -mr-32 -mt-32 rounded-full" />
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="form"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="bg-white/[0.02] border border-white/5 rounded-[3.5rem] p-8 md:p-14 relative overflow-hidden"
                                >
                                    {formStatus === 'success' ? (
                                        <div className="text-center py-24 space-y-8">
                                            <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                                                <CheckCircle className="w-12 h-12 text-green-400" />
                                            </div>
                                            <div className="space-y-4">
                                                <h2 className="text-4xl font-bold">Application Sent!</h2>
                                                <p className="text-zinc-500 max-md mx-auto text-lg">Thank you for your interest in Woodfrog. Our team will review your profile and reach out within 48 hours.</p>
                                            </div>
                                            <button
                                                onClick={() => setView('description')}
                                                className="text-[#ff6b3d] font-bold hover:underline py-4 px-8 rounded-full bg-white/5"
                                            >
                                                Back to Job Details
                                            </button>
                                        </div>
                                    ) : !isLinkedInAuthenticated ? (
                                        <div className="text-center py-24 space-y-10">
                                            <div className="w-24 h-24 bg-[#ff6b3d]/10 rounded-full flex items-center justify-center mx-auto ring-1 ring-[#ff6b3d]/20">
                                                <Linkedin className="w-10 h-10 text-[#ff6b3d]" />
                                            </div>
                                            <div className="space-y-4">
                                                <h2 className="text-4xl font-bold">Verify your Identity</h2>
                                                <p className="text-zinc-500 max-w-sm mx-auto text-lg">To provide the most authentic responses and speed up your application, please connect with LinkedIn.</p>
                                            </div>
                                            
                                            {errorMessage && (
                                                <div className="max-w-md mx-auto p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 text-sm">
                                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                                    {errorMessage}
                                                </div>
                                            )}

                                            <button
                                                onClick={handleLinkedInLogin}
                                                disabled={isLinking}
                                                className="px-12 py-6 bg-white text-black font-black rounded-3xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-4 mx-auto shadow-[0_20px_40px_rgba(255,255,255,0.05)] active:scale-95 disabled:opacity-50"
                                            >
                                                {isLinking ? <Loader2 className="w-6 h-6 animate-spin" /> : <Linkedin className="w-6 h-6 fill-current" />}
                                                Apply with LinkedIn
                                            </button>
                                            <p className="text-zinc-600 text-xs">This verifies your professional identity and pre-fills your application form.</p>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-12">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-zinc-400">
                                                <div className="space-y-3">
                                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] ml-1">Full Name*</label>
                                                    <input
                                                        type="text" required value={candidateInfo.name} onChange={e => setCandidateInfo({ ...candidateInfo, name: e.target.value })}
                                                        className="w-full bg-[#0F1113] border border-white/5 rounded-2xl p-5 focus:border-[#ff6b3d]/50 outline-none transition-all placeholder:text-zinc-800" placeholder="John Doe"
                                                    />
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] ml-1">Email Address*</label>
                                                    <input
                                                        type="email" required value={candidateInfo.email} onChange={e => setCandidateInfo({ ...candidateInfo, email: e.target.value })}
                                                        className="w-full bg-[#0F1113] border border-white/5 rounded-2xl p-5 focus:border-[#ff6b3d]/50 outline-none transition-all placeholder:text-zinc-800" placeholder="john@company.com"
                                                    />
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] ml-1">Phone Number</label>
                                                    <input
                                                        type="tel" value={candidateInfo.phone} onChange={e => setCandidateInfo({ ...candidateInfo, phone: e.target.value })}
                                                        className="w-full bg-[#0F1113] border border-white/5 rounded-2xl p-5 focus:border-[#ff6b3d]/50 outline-none transition-all placeholder:text-zinc-800" placeholder="+1 (555) 000-0000"
                                                    />
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] ml-1">Current Address</label>
                                                    <input
                                                        type="text" value={candidateInfo.address} onChange={e => setCandidateInfo({ ...candidateInfo, address: e.target.value })}
                                                        className="w-full bg-[#0F1113] border border-white/5 rounded-2xl p-5 focus:border-[#ff6b3d]/50 outline-none transition-all placeholder:text-zinc-800" placeholder="City, Country"
                                                    />
                                                </div>
                                            </div>

                                            {/* Dynamic Custom Fields */}
                                            <div className="space-y-10 pt-10 border-t border-white/5 text-zinc-400">
                                                {job.formFields.map((field) => (
                                                    <div key={field.id} className="space-y-4">
                                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] ml-1 flex items-center justify-between">
                                                            <span>{field.label}{field.required ? '*' : ''}</span>
                                                            {field.type === 'file' && <span className="opacity-40 leading-none">PDF • Max {field.maxSize || 5}MB</span>}
                                                        </label>

                                                        {field.type === 'textarea' ? (
                                                            <textarea
                                                                required={field.required}
                                                                value={formResponses[field.id] || ''}
                                                                onChange={e => setFormResponses({ ...formResponses, [field.id]: e.target.value })}
                                                                className="w-full bg-[#0F1113] border border-white/5 rounded-3xl p-6 min-h-[150px] focus:border-[#ff6b3d]/50 outline-none transition-all placeholder:text-zinc-800"
                                                            />
                                                        ) : field.type === 'select' ? (
                                                            <select
                                                                required={field.required}
                                                                value={formResponses[field.id] || ''}
                                                                onChange={e => setFormResponses({ ...formResponses, [field.id]: e.target.value })}
                                                                className="w-full bg-[#0F1113] border border-white/5 rounded-2xl p-5 focus:border-[#ff6b3d]/50 outline-none transition-all appearance-none cursor-pointer"
                                                            >
                                                                <option value="">Select an option</option>
                                                                {(field.options || []).map((opt: string) => (
                                                                    <option key={opt} value={opt}>{opt}</option>
                                                                ))}
                                                            </select>
                                                        ) : field.type === 'file' ? (
                                                            <div className="relative group/file">
                                                                <input
                                                                    type="file"
                                                                    accept="application/pdf"
                                                                    required={field.required && !files[field.id]}
                                                                    onChange={e => e.target.files && handleFileChange(field.id, e.target.files[0], field.maxSize)}
                                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                                />
                                                                <div className={cn(
                                                                    "w-full bg-[#0F1113]/50 border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center gap-3 transition-all",
                                                                    files[field.id] ? "border-green-500/30 bg-green-500/[0.02]" : "border-white/5 group-hover/file:border-[#ff6b3d]/30"
                                                                )}>
                                                                    {files[field.id] ? (
                                                                        <>
                                                                            <CheckCircle className="w-8 h-8 text-green-400" />
                                                                            <span className="text-sm font-bold text-white">{files[field.id].name}</span>
                                                                            <span className="text-xs text-zinc-500">Click or drag to replace</span>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <Upload className="w-8 h-8 text-zinc-600 group-hover/file:text-[#ff6b3d] transition-colors" />
                                                                            <span className="text-sm font-bold text-zinc-400">Upload your PDF Resume</span>
                                                                            <span className="text-xs text-zinc-600">Drag and drop or click here</span>
                                                                        </>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <input
                                                                type={field.type}
                                                                required={field.required}
                                                                value={formResponses[field.id] || ''}
                                                                onChange={e => setFormResponses({ ...formResponses, [field.id]: e.target.value })}
                                                                className="w-full bg-[#0F1113] border border-white/5 rounded-2xl p-5 focus:border-[#ff6b3d]/50 outline-none transition-all"
                                                            />
                                                        )}
                                                    </div>
                                                ))}
                                            </div>

                                            {errorMessage && (
                                                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 text-sm animate-in fade-in slide-in-from-top-2">
                                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                                    {errorMessage}
                                                </div>
                                            )}

                                            <button
                                                type="submit"
                                                disabled={formStatus === 'submitting'}
                                                className="w-full py-6 bg-[#ff6b3d] text-white font-black rounded-2xl hover:bg-[#ff8a65] transition-all flex items-center justify-center gap-3 disabled:opacity-50 active:scale-[0.98] shadow-2xl"
                                            >
                                                {formStatus === 'submitting' ? (
                                                    <><Loader2 className="w-5 h-5 animate-spin" /> Finalizing Application...</>
                                                ) : (
                                                    <><Send className="w-5 h-5" /> Submit Application</>
                                                )}
                                            </button>
                                        </form>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right Column: Floating Sidebar */}
                    <div className="lg:col-span-4 lg:sticky lg:top-40 h-fit space-y-8">
                        <div className="p-8 bg-white/[0.04] border border-white/5 rounded-[2.5rem] backdrop-blur-xl relative overflow-hidden group">
                            <div className="relative z-10 space-y-8">
                                <button
                                    onClick={() => setView('form')}
                                    className="w-full py-5 bg-white text-black font-black rounded-2xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-xl"
                                >
                                    Apply for this Job
                                </button>

                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Link to this job</h4>
                                    <div className="flex items-center gap-2 p-4 bg-black/40 border border-white/5 rounded-2xl">
                                        <Globe className="w-4 h-4 text-zinc-600 shrink-0" />
                                        <input
                                            readOnly
                                            value={typeof window !== 'undefined' ? `${window.location.origin}/careers/${job.slug}` : `https://woodfrog.com/careers/${job.slug}`}
                                            className="bg-transparent text-[11px] font-bold text-zinc-400 outline-none w-full"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-center pt-6 border-t border-white/5">
                                    <ShareButtons
                                        title={`Join Woodfrog as ${job.title}`}
                                        path={`/careers/${job.slug}`}
                                        buttonClassName="border-none hover:bg-white/10"
                                        iconClassName="w-6 h-6"
                                    />
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff6b3d]/10 blur-[60px] rounded-full -mr-16 -mt-16 group-hover:bg-[#ff6b3d]/20 transition-all duration-700" />
                        </div>

                        <div className="p-10 space-y-10 text-sm bg-white/[0.02] border border-white/5 rounded-[3rem]">
                            <div className="space-y-6 border-b border-white/5 pb-8">
                                <div className="flex items-center justify-between">
                                    <span className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest flex items-center gap-2"><MapPin className="w-3 h-3" /> Location</span>
                                    <span className="font-bold">{job.location}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest">Department</span>
                                    <span className="font-bold">{job.department}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest flex items-center gap-2"><Globe className="w-3 h-3" /> Mode</span>
                                    <span className="font-bold">{job.workMode}</span>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest flex items-center gap-2"><Briefcase className="w-3 h-3" /> Type</span>
                                    <span className="font-bold">{job.employmentType}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest flex items-center gap-2"><Clock className="w-3 h-3" /> Experience</span>
                                    <span className="font-bold">{job.experienceLevel}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <style jsx global>{`
                .rich-text-content h2 { color: white; font-weight: 900; font-size: 2.25rem; margin-top: 3rem; margin-bottom: 1.5rem; }
                .rich-text-content h3 { color: white; font-weight: 800; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem; }
                .rich-text-content ul { list-style: disc; padding-left: 1.5rem; margin-bottom: 2rem; }
                .rich-text-content li { margin-bottom: 0.75rem; }
                .rich-text-content p { margin-bottom: 1.5rem; line-height: 1.8; }
                .rich-text-content b, .rich-text-content strong { color: white; font-weight: 700; }
            `}</style>
        </main>
    );
}

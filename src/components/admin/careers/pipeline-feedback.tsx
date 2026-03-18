'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

import {
    CheckCircle, Circle, ChevronRight, XCircle, Trophy, Loader2,
    Star, Send, User, Clock, ChevronDown, ChevronUp,
    ArrowRight, ThumbsDown, Mail, MailCheck, X, Edit3, Video, Calendar as CalendarIcon, Eye, UserPlus, AlertTriangle, AlertCircle
} from 'lucide-react';
import { InterviewStage, InterviewFeedback, FeedbackFormField } from '@/lib/candidates';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface PipelineFeedbackProps {
    applicationId: string;
    jobId: string;
    jobTitle: string;
    currentStatus: string;
    candidateName: string;
    candidateEmail: string;
    resumeUrl?: string;
    onStatusChange: (newStatus: string) => void;
}

// ─── Generate a Google Meet-style link ────────────────────────
function generateMeetCode(): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    const pick = () => chars[Math.floor(Math.random() * chars.length)];
    const seg = (n: number) => Array.from({ length: n }, pick).join('');
    // Google Meet codes follow the pattern: xxx-xxxx-xxx
    return `${seg(3)}-${seg(4)}-${seg(3)}`;
}

// ─── Hook: lock background scroll when a dialog is open ───────
function useScrollLock() {
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const overlay = overlayRef.current;
        if (!overlay) return;

        // Block ALL scroll/wheel events from bubbling up the DOM tree
        // This prevents the parent scrollable div in applicant-list.tsx from scrolling.
        const stopPropagation = (e: Event) => {
            e.stopPropagation();
        };

        // If scrolling directly on the backdrop (not its children), block scrolling
        const blockBackdropScroll = (e: Event) => {
            if (e.target === overlay) {
                e.preventDefault();
            }
        };

        // Attach listeners to the overlay element itself
        overlay.addEventListener('wheel', stopPropagation, { passive: true });
        overlay.addEventListener('touchmove', stopPropagation, { passive: true });
        overlay.addEventListener('wheel', blockBackdropScroll, { passive: false });
        overlay.addEventListener('touchmove', blockBackdropScroll, { passive: false });

        // Standard body lock as a secondary measure
        const html = document.documentElement;
        const body = document.body;
        const originalHtmlOverflow = html.style.overflow;
        const originalBodyOverflow = body.style.overflow;
        html.style.overflow = 'hidden';
        body.style.overflow = 'hidden';

        return () => {
            overlay.removeEventListener('wheel', stopPropagation);
            overlay.removeEventListener('touchmove', stopPropagation);
            overlay.removeEventListener('wheel', blockBackdropScroll);
            overlay.removeEventListener('touchmove', blockBackdropScroll);
            html.style.overflow = originalHtmlOverflow;
            body.style.overflow = originalBodyOverflow;
        };
    }, []);

    return overlayRef;
}

// ─── Advance Choice Dialog (Schedule Interview vs Selection Mail) ──

function AdvanceChoiceDialog({ nextStageName, onScheduleInterview, onSelectionMail, onScheduleLater, onClose }: {
    nextStageName: string;
    onScheduleInterview: () => void;
    onSelectionMail: () => void;
    onScheduleLater: () => void;
    onClose: () => void;
}) {
    const overlayRef = useScrollLock();

    return (
        <div ref={overlayRef} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" 
            onClick={onClose} onWheel={e => e.stopPropagation()} onTouchMove={e => e.stopPropagation()}>
            <div data-modal-content className="bg-[#0F1113] border border-white/10 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                    <h3 className="text-lg font-bold">Advance to {nextStageName}</h3>
                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg text-zinc-500"><X className="w-5 h-5" /></button>
                </div>
                <div className="p-6 space-y-3">
                    <p className="text-sm text-zinc-500 mb-4">How would you like to notify the candidate?</p>
                    <button onClick={onScheduleInterview}
                        className="w-full flex items-center gap-4 p-4 bg-white/[0.03] border border-white/5 rounded-xl hover:border-[#ff6b3d]/30 hover:bg-[#ff6b3d]/5 transition-all text-left group">
                        <div className="w-10 h-10 rounded-xl bg-[#ff6b3d]/10 flex items-center justify-center flex-shrink-0">
                            <CalendarIcon className="w-5 h-5 text-[#ff6b3d]" />
                        </div>
                        <div>
                            <div className="font-bold text-sm group-hover:text-[#ff6b3d] transition-colors">Schedule Interview</div>
                            <div className="text-[10px] text-zinc-600">Set date, time, duration & generate a Google Meet link</div>
                        </div>
                    </button>
                    <button onClick={onSelectionMail}
                        className="w-full flex items-center gap-4 p-4 bg-white/[0.03] border border-white/5 rounded-xl hover:border-blue-500/30 hover:bg-blue-500/5 transition-all text-left group">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                            <Mail className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                            <div className="font-bold text-sm group-hover:text-blue-400 transition-colors">Selection Mail</div>
                            <div className="text-[10px] text-zinc-600">Notify candidate, interview details will be shared later</div>
                        </div>
                    </button>
                    <button onClick={onScheduleLater}
                        className="w-full flex items-center gap-4 p-4 bg-white/[0.03] border border-white/5 rounded-xl hover:border-zinc-500/30 hover:bg-zinc-500/5 transition-all text-left group">
                        <div className="w-10 h-10 rounded-xl bg-zinc-500/10 flex items-center justify-center flex-shrink-0">
                            <Clock className="w-5 h-5 text-zinc-400" />
                        </div>
                        <div>
                            <div className="font-bold text-sm group-hover:text-zinc-400 transition-colors">Schedule Later</div>
                            <div className="text-[10px] text-zinc-600">Advance status now, notify the candidate at a later time</div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── Schedule Interview Dialog ─────────────────────────────────

function ScheduleInterviewDialog({ candidateName, candidateEmail, nextStageName, jobTitle, resumeUrl, onSend, onScheduleLater, onClose }: {
    candidateName: string;
    candidateEmail: string;
    nextStageName: string;
    jobTitle: string;
    resumeUrl?: string;
    onSend: (subject: string, body: string, meetLink: string, dateTime: string, interviewerData?: { name: string; email: string; criteria: string }) => Promise<void>;
    onScheduleLater: () => void;
    onClose: () => void;
}) {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [duration, setDuration] = useState('60');
    const [customDuration, setCustomDuration] = useState('');
    const [additionalDetails, setAdditionalDetails] = useState('');
    const [subject, setSubject] = useState(`Congratulations! You Have Been Selected for the ${nextStageName} Interview | Woodfrog`);
    const [meetLink, setMeetLink] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState('');
    const [showPreview, setShowPreview] = useState(false);
    const [sendStatus, setSendStatus] = useState<string[]>([]);
    const [isGoogleConnected, setIsGoogleConnected] = useState<boolean | null>(null);


    // Interviewer fields
    const [interviewerName, setInterviewerName] = useState('');
    const [interviewerEmail, setInterviewerEmail] = useState('');
    const [informInterviewer, setInformInterviewer] = useState(false);
    const [assessmentCriteria, setAssessmentCriteria] = useState('');

    const overlayRef = useScrollLock();

    const effectiveDuration = duration === 'custom' ? customDuration : duration;

    const formattedDateTime = date && time
        ? format(new Date(`${date}T${time}`), "EEEE, MMMM d, yyyy 'at' h:mm a")
        : '';

    useEffect(() => {
        const checkConnection = async () => {
            try {
                const res = await fetch('/api/candidates/create-meet', { method: 'HEAD' });
                // We'll update create-meet to return 200 for HEAD if connected
                setIsGoogleConnected(res.status !== 401);
            } catch { setIsGoogleConnected(false); }
        };
        checkConnection();
    }, []);

    const handleConnectGoogle = async () => {
        try {
            const res = await fetch('/api/auth/google/url');
            const { url } = await res.json();
            const win = window.open(url, '_blank', 'width=600,height=700');
            const timer = setInterval(() => {
                if (win?.closed) {
                    clearInterval(timer);
                    // Re-check connection
                    fetch('/api/candidates/create-meet', { method: 'HEAD' })
                        .then(res => setIsGoogleConnected(res.status !== 401));
                }
            }, 1000);
        } catch (err) { setError('Failed to initiate Google login'); }
    };


    const meetLinkDisplay = meetLink || '(Will be generated on send)';

    const emailBody = `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1a1a1a; line-height: 1.6;">
<p>Dear ${candidateName},</p>
<p>Congratulations! You have been selected to proceed to the <strong>${nextStageName}</strong> of our interview process for the job role of <strong>“${jobTitle}”</strong> at Woodfrog.</p>
<p>Please find the interview details below:</p>
<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 24px 0;">
    <div style="margin-bottom: 12px;">📅 <strong>Date & Time:</strong> ${formattedDateTime || '[Select Date & Time]'}</div>
    <div style="margin-bottom: 12px;">⏱️ <strong>Duration:</strong> ${effectiveDuration} minutes</div>
    <div>🔗 <strong>Google Meet:</strong> <a href="${meetLinkDisplay}" style="color: #ff6b3d; text-decoration: none; font-weight: bold;">${meetLinkDisplay}</a></div>
</div>
${additionalDetails ? `<div style="background: #fffbeb; border: 1px solid #fef3c7; border-radius: 12px; padding: 16px; margin-bottom: 24px; color: #92400e; font-size: 14px;"><strong>Topics to Prepare (Recommended):</strong><br/>${additionalDetails.replace(/\n/g, '<br/>')}</div>` : ''}
<p>Kindly ensure you join the meeting on time using the link above. If you need to reschedule, please reply to this email.</p>
<p>We look forward to speaking with you and discussing your suitability for the role.</p>
<p style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #eee;">Best regards,<br/><strong>Hiring Team</strong><br/>Woodfrog</p>
</div>`;

    const [editableBody, setEditableBody] = useState('');

    React.useEffect(() => {
        setEditableBody(emailBody);
    }, [date, time, duration, additionalDetails, meetLink]);

    const handleSend = async () => {
        setIsSending(true);
        setError('');
        setSendStatus([]);
        try {
            // 1. Create real Google Meet link
            setSendStatus(['Creating Google Meet link...']);
            const attendeeEmails = [candidateEmail];
            if (informInterviewer && interviewerEmail.trim()) attendeeEmails.push(interviewerEmail);
            const meetRes = await fetch('/api/candidates/create-meet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    summary: `${nextStageName} Interview - ${candidateName} | Woodfrog`,
                    dateTime: date && time ? `${date}T${time}` : undefined,
                    duration: effectiveDuration,
                }),
            });
            let finalMeetLink = meetLink;
            if (meetRes.ok) {
                const meetData = await meetRes.json();
                finalMeetLink = meetData.meetLink;
                if (!finalMeetLink) {
                    throw new Error('cant send mail due to failure in meeting link generation');
                }
                setMeetLink(finalMeetLink);
                setSendStatus(prev => [...prev, '\u2705 Google Meet link created']);
            } else {
                const errorData = await meetRes.json();
                console.error('Meet API error:', errorData);
                throw new Error('cant send mail due to failure in meeting link generation');
            }
            // 2. Replace placeholder in email body
            const finalBody = editableBody
                .replace(/\{\{MEET_LINK\}\}/g, finalMeetLink)
                .replace(/\(Will be generated on send\)/g, finalMeetLink)
                .replace(/https:\/\/meet\.google\.com\/[a-z]{3}-[a-z]{4}-[a-z]{3}/g, finalMeetLink);
            // 3. Send email
            setSendStatus(prev => [...prev, 'Sending email to candidate...']);
            const interviewerData = informInterviewer && interviewerEmail.trim()
                ? { name: interviewerName, email: interviewerEmail, criteria: assessmentCriteria }
                : undefined;
            await onSend(
                subject,
                finalBody,
                finalMeetLink,
                `${formattedDateTime} (${effectiveDuration} min)`,
                interviewerData
            );
            setSendStatus(prev => [...prev, `\u2705 Email sent to ${candidateEmail}`, ...(interviewerData ? [`\u2705 Email sent to interviewer (${interviewerData.email})`] : [])]);
            await new Promise(r => setTimeout(r, 1500));
        } catch (err: any) {
            setError(err.message || 'Failed to send email.');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div ref={overlayRef} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" 
            onClick={onClose} onWheel={e => e.stopPropagation()} onTouchMove={e => e.stopPropagation()}>
            <div data-modal-content className="bg-[#0F1113] border border-white/10 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <CalendarIcon className="w-5 h-5 text-[#ff6b3d]" />
                        <div>
                            <h3 className="text-lg font-bold">Schedule Interview — {nextStageName}</h3>
                            <p className="text-[10px] text-zinc-600">To: <span className="text-zinc-400">{candidateEmail}</span></p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg text-zinc-500"><X className="w-5 h-5" /></button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-5" style={{ scrollbarWidth: 'none', overscrollBehaviorY: 'contain' }}>
                    {/* Google Connection Status */}
                    {isGoogleConnected === false && (
                        <div className="bg-red-400/10 border border-red-400/20 rounded-xl p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <AlertTriangle className="w-5 h-5 text-red-400" />
                                <div>
                                    <p className="text-sm font-bold text-red-400">Google Calendar Not Connected</p>
                                    <p className="text-xs text-zinc-400">You must connect your Google account to generate Meet links.</p>
                                </div>
                            </div>
                            <button onClick={handleConnectGoogle}
                                className="px-4 py-2 bg-red-400 text-black font-bold rounded-lg text-xs hover:bg-red-300 transition-all">
                                Connect Now
                            </button>
                        </div>
                    )}
                    {isGoogleConnected === true && (
                        <div className="bg-green-400/10 border border-green-400/20 rounded-xl p-3 flex items-center gap-3">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <p className="text-xs font-medium text-green-400">Google Calendar Connected</p>
                        </div>
                    )}

                    {/* Subject Field */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Subject</label>
                        <input type="text" value={subject} onChange={e => setSubject(e.target.value)}
                            className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#ff6b3d]/40 transition-all font-medium" />
                    </div>

                    {/* Schedule Fields */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Date</label>
                            <input type="date" value={date} onChange={e => setDate(e.target.value)}
                                className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#ff6b3d]/40 transition-all" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Time</label>
                            <input type="time" value={time} onChange={e => setTime(e.target.value)}
                                className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#ff6b3d]/40 transition-all" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Duration (min)</label>
                            <select value={duration} onChange={e => setDuration(e.target.value)}
                                className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#ff6b3d]/40 transition-all">
                                <option value="30">30 min</option>
                                <option value="45">45 min</option>
                                <option value="60">60 min</option>
                                <option value="90">90 min</option>
                                <option value="120">120 min</option>
                                <option value="custom">Custom</option>
                            </select>
                            {duration === 'custom' && (
                                <input type="number" value={customDuration} onChange={e => setCustomDuration(e.target.value)}
                                    placeholder="Minutes" min="1"
                                    className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#ff6b3d]/40 transition-all mt-2" />
                            )}
                        </div>
                    </div>

                    {/* Meet Link Preview */}
                    <div className="flex items-center gap-3 bg-blue-500/5 border border-blue-500/10 rounded-xl px-4 py-3">
                        <Video className="w-4 h-4 text-blue-400 flex-shrink-0" />
                        <span className="text-xs font-bold text-blue-400">{meetLink}</span>
                        <span className="text-[9px] text-zinc-600 ml-auto">Auto-generated</span>
                    </div>

                    {/* Interviewer Details */}
                    <div className="space-y-3 bg-white/[0.02] border border-white/5 rounded-xl p-4">
                        <div className="flex items-center gap-2">
                            <UserPlus className="w-4 h-4 text-purple-400" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Interviewer Details</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-zinc-600">Interviewer Name</label>
                                <input type="text" value={interviewerName} onChange={e => setInterviewerName(e.target.value)}
                                    placeholder="e.g., John Doe"
                                    className="w-full bg-zinc-900 border border-white/5 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-purple-500/40 transition-all placeholder:text-zinc-700" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-zinc-600">Interviewer Email</label>
                                <input type="email" value={interviewerEmail} onChange={e => setInterviewerEmail(e.target.value)}
                                    placeholder="interviewer@company.com"
                                    className="w-full bg-zinc-900 border border-white/5 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-purple-500/40 transition-all placeholder:text-zinc-700" />
                            </div>
                        </div>
                        {interviewerName.trim() && interviewerEmail.trim() && (
                            <div className="space-y-3 pt-2 border-t border-white/5">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input type="checkbox" checked={informInterviewer} onChange={e => setInformInterviewer(e.target.checked)}
                                        className="accent-purple-500 w-4 h-4" />
                                    <span className="text-xs font-bold text-zinc-400 group-hover:text-white transition-all">Inform Interviewer via Email</span>
                                    <span className="text-[9px] text-zinc-700 ml-auto">Sends interview details + resume</span>
                                </label>
                                {informInterviewer && (
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-zinc-600">Assessment & Judging Criteria (optional)</label>
                                        <textarea value={assessmentCriteria} onChange={e => setAssessmentCriteria(e.target.value)} rows={3}
                                            placeholder="e.g., Evaluate coding skills, system design ability, communication clarity..."
                                            className="w-full bg-zinc-900 border border-white/5 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-purple-500/40 transition-all resize-none placeholder:text-zinc-700" />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Additional Details */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Topics to Prepare (Recommended)</label>
                        <textarea value={additionalDetails} onChange={e => setAdditionalDetails(e.target.value)} rows={2}
                            placeholder="e.g., Topics to prepare..."
                            className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#ff6b3d]/40 transition-all resize-none placeholder:text-zinc-700" />
                    </div>

                    {/* Email Body — Toggle Edit/Preview */}
                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Email Body</label>
                            <button onClick={() => setShowPreview(!showPreview)}
                                className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border transition-all"
                                style={{ color: showPreview ? '#ff6b3d' : '#71717a', borderColor: showPreview ? 'rgba(255,107,61,0.2)' : 'rgba(255,255,255,0.05)', background: showPreview ? 'rgba(255,107,61,0.05)' : 'transparent' }}>
                                {showPreview ? <><Edit3 className="w-3 h-3" /> Edit</> : <><Eye className="w-3 h-3" /> Preview</>}
                            </button>
                        </div>
                        {showPreview ? (
                            <div className="bg-white text-[#1a1a1a] rounded-xl p-6 max-h-[300px] overflow-y-auto" dangerouslySetInnerHTML={{ __html: editableBody }} />
                        ) : (
                            <textarea value={editableBody} onChange={e => setEditableBody(e.target.value)} rows={10}
                                className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 text-xs outline-none focus:border-[#ff6b3d]/40 transition-all resize-none font-mono leading-relaxed" />
                        )}
                    </div>

                    {error && <p className="text-red-400 text-xs">{error}</p>}
                    {sendStatus.length > 0 && (
                        <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-3 space-y-1.5">
                            {sendStatus.map((s, i) => (
                                <p key={i} className="text-xs text-zinc-400 flex items-center gap-2">
                                    {s.startsWith('\u2705') ? <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" /> :
                                     s.startsWith('\u26a0') ? <XCircle className="w-3 h-3 text-yellow-400 flex-shrink-0" /> :
                                     <Loader2 className="w-3 h-3 text-[#ff6b3d] animate-spin flex-shrink-0" />}
                                    <span>{s.replace(/^[\u2705\u26a0\ufe0f]\s*/, '')}</span>
                                </p>
                            ))}
                        </div>
                    )}

                </div>

                <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between">
                    <button onClick={onScheduleLater}
                        className="px-5 py-2.5 bg-white/5 text-zinc-400 font-bold rounded-xl hover:bg-white/10 transition-all text-sm flex items-center gap-2">
                        <Clock className="w-4 h-4" /> Schedule Later
                    </button>
                    <button onClick={handleSend}
                        disabled={isSending || !date || !time}
                        className="px-6 py-2.5 bg-[#ff6b3d] text-white font-bold rounded-xl hover:bg-[#ff8a65] transition-all disabled:opacity-50 flex items-center gap-2 shadow-[0_10px_20px_rgba(255,107,61,0.2)]">
                        {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                        {isSending ? 'Sending...' : 'Send Mail'}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── Selection Mail Dialog ─────────────────────────────────────

function SelectionMailDialog({ candidateName, candidateEmail, nextStageName, jobTitle, onSend, onScheduleLater, onClose }: {
    candidateName: string;
    candidateEmail: string;
    nextStageName: string;
    jobTitle: string;
    onSend: (subject: string, body: string) => Promise<void>;
    onScheduleLater: () => void;
    onClose: () => void;
}) {
    const [subject, setSubject] = useState(`Interview Update — ${nextStageName} Round | ${jobTitle}`);
    const [body, setBody] = useState(
        `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
<p>Dear ${candidateName},</p>
<p>We are pleased to inform you that you have been advanced to the <strong>${nextStageName}</strong> round of our interview process.</p>
<p>The details of your upcoming interview (date, time, and format) will be shared with you shortly. Please keep an eye on your inbox.</p>
<p>If you have any questions, feel free to reply to this email.</p>
<p>Best regards,<br/>The Hiring Team<br/><strong>Woodfrog</strong></p>
</div>`
    );
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState('');
    const [showPreview, setShowPreview] = useState(false);

    const overlayRef = useScrollLock();

    const handleSend = async () => {
        setIsSending(true);
        setError('');
        try { await onSend(subject, body); }
        catch { setError('Failed to send email.'); }
        finally { setIsSending(false); }
    };

    return (
        <div ref={overlayRef} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" 
            onClick={onClose} onWheel={e => e.stopPropagation()} onTouchMove={e => e.stopPropagation()}>
            <div data-modal-content className="bg-[#0F1113] border border-white/10 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-blue-400" />
                        <div>
                            <h3 className="text-lg font-bold">Selection Mail — {nextStageName}</h3>
                            <p className="text-[10px] text-zinc-600">To: <span className="text-zinc-400">{candidateEmail}</span></p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg text-zinc-500"><X className="w-5 h-5" /></button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-4" style={{ scrollbarWidth: 'none', overscrollBehaviorY: 'contain' }}>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Subject</label>
                        <input type="text" value={subject} onChange={e => setSubject(e.target.value)}
                            className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#ff6b3d]/40 transition-all" />
                    </div>
                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Email Body</label>
                            <button onClick={() => setShowPreview(!showPreview)}
                                className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border transition-all"
                                style={{ color: showPreview ? '#ff6b3d' : '#71717a', borderColor: showPreview ? 'rgba(255,107,61,0.2)' : 'rgba(255,255,255,0.05)', background: showPreview ? 'rgba(255,107,61,0.05)' : 'transparent' }}>
                                {showPreview ? <><Edit3 className="w-3 h-3" /> Edit</> : <><Eye className="w-3 h-3" /> Preview</>}
                            </button>
                        </div>
                        {showPreview ? (
                            <div className="bg-white text-[#1a1a1a] rounded-xl p-6 max-h-[400px] overflow-y-auto" dangerouslySetInnerHTML={{ __html: body }} />
                        ) : (
                            <textarea value={body} onChange={e => setBody(e.target.value)} rows={12}
                                className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#ff6b3d]/40 transition-all resize-none font-mono text-xs leading-relaxed" />
                        )}
                    </div>
                    {error && <p className="text-red-400 text-xs">{error}</p>}
                </div>
                <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between">
                    <button onClick={onScheduleLater}
                        className="px-5 py-2.5 bg-white/5 text-zinc-400 font-bold rounded-xl hover:bg-white/10 transition-all text-sm flex items-center gap-2">
                        <Clock className="w-4 h-4" /> Schedule Later
                    </button>
                    <button onClick={handleSend} disabled={isSending || !subject.trim()}
                        className="px-6 py-2.5 bg-[#ff6b3d] text-white font-bold rounded-xl hover:bg-[#ff8a65] transition-all disabled:opacity-50 flex items-center gap-2 shadow-[0_10px_20px_rgba(255,107,61,0.2)]">
                        {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                        {isSending ? 'Sending...' : 'Send Mail'}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── Application Received: Initial Rating ─────────────────────

function InitialRatingForm({ applicationId, onAdvance, onReject, isUpdating }: {
    applicationId: string; onAdvance: () => void; onReject: () => void; isUpdating: boolean;
}) {
    const [clarity, setClarity] = useState(0);
    const [professionalism, setProfessionalism] = useState(0);
    const [communication, setCommunication] = useState(0);
    const [interviewerName, setInterviewerName] = useState('');
    const [comments, setComments] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const ratingFields = [
        { key: 'clarity', label: 'Clarity', value: clarity, set: setClarity, desc: 'How clear and organized was the application?' },
        { key: 'professionalism', label: 'Professionalism', value: professionalism, set: setProfessionalism, desc: 'Professional presentation and demeanor' },
        { key: 'communication', label: 'Communication', value: communication, set: setCommunication, desc: 'Written communication quality' },
    ];

    const handleSubmit = async () => {
        if (!interviewerName.trim()) return;
        setIsSubmitting(true);
        try {
            await fetch('/api/candidates/notes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    applicationId,
                    noteType: 'important_info',
                    content: `Initial Review by ${interviewerName}:\nClarity: ${clarity}/5 | Professionalism: ${professionalism}/5 | Communication: ${communication}/5\n${comments ? `Notes: ${comments}` : ''}`,
                }),
            });
            setSubmitted(true);
        } catch (err) { console.error(err); }
        finally { setIsSubmitting(false); }
    };

    if (submitted) {
        return (
            <div className="space-y-6">
                <div className="bg-green-500/5 border border-green-500/10 rounded-2xl p-8 text-center space-y-3">
                    <CheckCircle className="w-10 h-10 text-green-400 mx-auto" />
                    <h4 className="text-lg font-bold text-green-400">Initial Rating Saved!</h4>
                </div>
                <div className="flex gap-3">
                    <button onClick={onAdvance} disabled={isUpdating}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#ff6b3d] text-white font-bold rounded-xl hover:bg-[#ff8a65] transition-all disabled:opacity-50 shadow-[0_10px_20px_rgba(255,107,61,0.15)]">
                        <ArrowRight className="w-5 h-5" /> Advance to Next Round
                    </button>
                    <button onClick={onReject} disabled={isUpdating}
                        className="px-6 py-4 bg-red-500/10 text-red-400 border border-red-500/20 font-bold rounded-xl hover:bg-red-500/20 transition-all disabled:opacity-50 flex items-center gap-2">
                        <ThumbsDown className="w-5 h-5" /> Reject
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h4 className="text-base font-bold">Initial Application Review</h4>
                <p className="text-xs text-zinc-600">Rate the candidate's application before deciding to move forward.</p>
            </div>
            <div className="space-y-5">
                {ratingFields.map(({ key, label, value, set, desc }) => (
                    <div key={key} className="flex items-center gap-6">
                        <div className="w-40 flex-shrink-0">
                            <div className="text-sm font-bold">{label}</div>
                            <div className="text-[10px] text-zinc-600">{desc}</div>
                        </div>
                        <div className="flex gap-1.5">
                            {[1,2,3,4,5].map(star => (
                                <button key={star} onClick={() => set(star)} className="p-0.5 transition-all hover:scale-110">
                                    <Star className={cn("w-6 h-6 transition-all", star <= value ? "fill-[#ff6b3d] text-[#ff6b3d]" : "text-zinc-800 hover:text-zinc-600")} />
                                </button>
                            ))}
                            {value > 0 && <span className="text-xs text-zinc-500 ml-2 self-center">{value}/5</span>}
                        </div>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Reviewer Name</label>
                    <input type="text" value={interviewerName} onChange={e => setInterviewerName(e.target.value)} placeholder="Your name"
                        className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-[#ff6b3d]/50 transition-all text-sm" />
                </div>
                <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Quick Notes</label>
                    <input type="text" value={comments} onChange={e => setComments(e.target.value)} placeholder="Any initial observations..."
                        className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-[#ff6b3d]/50 transition-all text-sm" />
                </div>
            </div>
            <button onClick={handleSubmit}
                disabled={isSubmitting || !interviewerName.trim() || (clarity === 0 && professionalism === 0 && communication === 0)}
                className="flex items-center gap-2 px-6 py-3 bg-[#ff6b3d] text-white font-bold rounded-xl hover:bg-[#ff8a65] transition-all disabled:opacity-50 w-full justify-center">
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                {isSubmitting ? 'Saving...' : 'Save Rating'}
            </button>
        </div>
    );
}

// ─── Stage Feedback Form (inline, with mail/meet status top-right) ──

function InlineStageFeedback({ stage, applicationId, onAdvance, onReject, isLast, isUpdating, mailStatus, meetLink, interviewDateTime, onScheduleMail, onSelectionMail, scheduledInterviewerName }: {
    stage: InterviewStage; applicationId: string; onAdvance: () => void; onReject: () => void;
    isLast: boolean; isUpdating: boolean;
    mailStatus: 'sent' | 'pending' | 'none';
    meetLink?: string;
    interviewDateTime?: string;
    onScheduleMail: () => void;
    onSelectionMail: () => void;
    scheduledInterviewerName?: string;
}) {
    const [interviewerName, setInterviewerName] = useState(scheduledInterviewerName || '');
    const [responses, setResponses] = useState<Record<string, any>>({});
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comments, setComments] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const formFields = stage.feedbackFormFields || [];

    const handleSubmit = async () => {
        if (!interviewerName.trim()) return;
        setIsSubmitting(true);
        try {
            await fetch('/api/candidates/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ applicationId, stageId: stage.id, interviewerName, responses, rating, comments }),
            });
            setSubmitted(true);
        } catch (err) { console.error(err); }
        finally { setIsSubmitting(false); }
    };

    if (submitted) {
        return (
            <div className="space-y-6">
                <div className="bg-green-500/5 border border-green-500/10 rounded-2xl p-6 text-center space-y-2">
                    <CheckCircle className="w-8 h-8 text-green-400 mx-auto" />
                    <h4 className="text-base font-bold text-green-400">Feedback Submitted for {stage.name}!</h4>
                </div>
                <div className="flex gap-3">
                    {isLast ? (
                        <button onClick={onAdvance} disabled={isUpdating}
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-all disabled:opacity-50 shadow-[0_10px_20px_rgba(34,197,94,0.15)]">
                            <Trophy className="w-5 h-5" /> Select Candidate
                        </button>
                    ) : (
                        <button onClick={onAdvance} disabled={isUpdating}
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#ff6b3d] text-white font-bold rounded-xl hover:bg-[#ff8a65] transition-all disabled:opacity-50 shadow-[0_10px_20px_rgba(255,107,61,0.15)]">
                            <ArrowRight className="w-5 h-5" /> Advance to Next Stage
                        </button>
                    )}
                    <button onClick={onReject} disabled={isUpdating}
                        className="px-6 py-4 bg-red-500/10 text-red-400 border border-red-500/20 font-bold rounded-xl hover:bg-red-500/20 transition-all disabled:opacity-50 flex items-center gap-2">
                        <ThumbsDown className="w-5 h-5" /> Reject
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header with mail status / actions top-right */}
            <div className="flex items-start justify-between">
                <div className="space-y-2">
                    <h4 className="text-base font-bold">{stage.name} — Feedback Form</h4>
                    <p className="text-xs text-zinc-600">Fill in the interview feedback, then advance or reject the candidate.</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                    {/* Mail NOT sent → show Schedule Interview + Selection Mail buttons */}
                    {mailStatus === 'pending' && (
                        <div className="flex gap-2">
                            <button onClick={onScheduleMail}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#ff6b3d]/10 text-[#ff6b3d] border border-[#ff6b3d]/20 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-[#ff6b3d]/20 transition-all">
                                <CalendarIcon className="w-3 h-3" /> Schedule Interview
                            </button>
                            <button onClick={onSelectionMail}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-500/20 transition-all">
                                <Mail className="w-3 h-3" /> Selection Mail
                            </button>
                        </div>
                    )}
                    {mailStatus === 'none' && (
                        <div className="flex gap-2">
                            <button onClick={onScheduleMail}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#ff6b3d]/10 text-[#ff6b3d] border border-[#ff6b3d]/20 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-[#ff6b3d]/20 transition-all">
                                <CalendarIcon className="w-3 h-3" /> Schedule Interview
                            </button>
                            <button onClick={onSelectionMail}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-500/20 transition-all">
                                <Mail className="w-3 h-3" /> Selection Mail
                            </button>
                        </div>
                    )}
                    {/* Mail SENT → show interview date/time + Meet link */}
                    {mailStatus === 'sent' && (
                        <>
                            <span className="flex items-center gap-1.5 text-[10px] font-black text-green-400 bg-green-500/10 px-3 py-1.5 rounded-lg border border-green-500/20">
                                <MailCheck className="w-3 h-3" /> Mail Sent
                            </span>
                            {interviewDateTime && (
                                <span className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-300 bg-white/[0.03] px-3 py-1.5 rounded-lg border border-white/5">
                                    <CalendarIcon className="w-3 h-3 text-[#ff6b3d]" /> {interviewDateTime}
                                </span>
                            )}
                            {meetLink && (
                                <a href={meetLink} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 text-[10px] font-black text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-lg border border-blue-500/20 hover:bg-blue-500/20 transition-all">
                                    <Video className="w-3 h-3" /> {meetLink.replace('https://','')}
                                </a>
                            )}
                        </>
                    )}
                </div>
            </div>

            <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Interviewer Name</label>
                <input type="text" value={interviewerName} onChange={e => setInterviewerName(e.target.value)} placeholder="Your name"
                    className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-[#ff6b3d]/50 transition-all text-sm max-w-sm" />
            </div>
            {formFields.length > 0 && (
                <div className="space-y-4">
                    {formFields.map((field: FeedbackFormField) => (
                        <div key={field.id} className="space-y-1.5">
                            <label className="text-xs font-bold text-zinc-400 flex items-center gap-2">
                                {field.label} {field.required && <span className="text-[#ff6b3d] text-[10px]">*</span>}
                            </label>
                            {field.type === 'text' && <input type="text" value={responses[field.id]||''} onChange={e => setResponses({...responses,[field.id]:e.target.value})} className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-[#ff6b3d]/50 transition-all text-sm" />}
                            {field.type === 'textarea' && <textarea value={responses[field.id]||''} onChange={e => setResponses({...responses,[field.id]:e.target.value})} rows={3} className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-[#ff6b3d]/50 transition-all text-sm resize-none" />}
                            {field.type === 'rating' && <div className="flex gap-1">{[1,2,3,4,5].map(s => <button key={s} type="button" onClick={() => setResponses({...responses,[field.id]:s})} className="p-0.5 transition-all hover:scale-110"><Star className={cn("w-5 h-5 transition-all", s<=(responses[field.id]||0)?"fill-[#ff6b3d] text-[#ff6b3d]":"text-zinc-700")} /></button>)}</div>}
                            {field.type === 'select' && field.options && <select value={responses[field.id]||''} onChange={e => setResponses({...responses,[field.id]:e.target.value})} className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-[#ff6b3d]/50 transition-all text-sm"><option value="">Select...</option>{field.options.map(o=><option key={o} value={o}>{o}</option>)}</select>}
                        </div>
                    ))}
                </div>
            )}
            <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Overall Rating</label>
                <div className="flex gap-1.5">
                    {[1,2,3,4,5].map(star => (
                        <button key={star} type="button" onClick={() => setRating(star)} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)} className="p-0.5 transition-all hover:scale-110">
                            <Star className={cn("w-7 h-7 transition-all", star<=(hoverRating||rating)?"fill-[#ff6b3d] text-[#ff6b3d]":"text-zinc-800")} />
                        </button>
                    ))}
                    {rating > 0 && <span className="text-sm text-zinc-500 self-center ml-2">{rating}/5</span>}
                </div>
            </div>
            <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Comments</label>
                <textarea value={comments} onChange={e => setComments(e.target.value)} placeholder="Overall thoughts..." rows={3}
                    className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-[#ff6b3d]/50 transition-all text-sm resize-none placeholder:text-zinc-700" />
            </div>
            <button onClick={handleSubmit} disabled={isSubmitting || !interviewerName.trim()}
                className="flex items-center gap-2 px-6 py-3 bg-[#ff6b3d] text-white font-bold rounded-xl hover:bg-[#ff8a65] transition-all disabled:opacity-50 w-full justify-center">
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </button>
        </div>
    );
}

// ─── Feedback History ─────────────────────────────────────────

function FeedbackHistory({ applicationId }: { applicationId: string }) {
    const [feedback, setFeedback] = useState<InterviewFeedback[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch(`/api/candidates/feedback?applicationId=${applicationId}`);
                const data = await res.json();
                if (Array.isArray(data)) setFeedback(data);
            } catch (err) { console.error(err); }
            finally { setIsLoading(false); }
        };
        load();
    }, [applicationId]);

    if (isLoading || feedback.length === 0) return null;

    const grouped = feedback.reduce((acc: Record<string, InterviewFeedback[]>, fb) => {
        const s = fb.stageName || 'Review';
        if (!acc[s]) acc[s] = [];
        acc[s].push(fb);
        return acc;
    }, {});

    return (
        <div className="space-y-4 pt-2">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-600 flex items-center gap-2"><Clock className="w-3 h-3" /> Previous Feedback</h4>
            {Object.entries(grouped).map(([stageName, entries]) => (
                <div key={stageName} className="space-y-2">
                    <span className="text-xs font-bold text-zinc-500">{stageName}</span>
                    {entries.map(fb => (
                        <div key={fb.id} className="bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden">
                            <button onClick={() => setExpandedIds(prev => { const n=new Set(prev); n.has(fb.id)?n.delete(fb.id):n.add(fb.id); return n; })}
                                className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-white/[0.02] transition-all">
                                <div className="flex items-center gap-3">
                                    <div className="w-7 h-7 rounded-full bg-zinc-900 flex items-center justify-center"><User className="w-3.5 h-3.5 text-zinc-500" /></div>
                                    <span className="text-sm font-bold">{fb.interviewerName}</span>
                                    <span className="text-[10px] text-zinc-700">{format(new Date(fb.createdAt), 'MMM d, h:mm a')}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    {fb.rating > 0 && <div className="flex gap-0.5">{[1,2,3,4,5].map(s=><Star key={s} className={cn("w-3 h-3",s<=fb.rating?"fill-[#ff6b3d] text-[#ff6b3d]":"text-zinc-800")} />)}</div>}
                                    {expandedIds.has(fb.id)?<ChevronUp className="w-3.5 h-3.5 text-zinc-600" />:<ChevronDown className="w-3.5 h-3.5 text-zinc-600" />}
                                </div>
                            </button>
                            {expandedIds.has(fb.id) && (
                                <div className="px-4 pb-4 pt-2 border-t border-white/5 space-y-2">
                                    {Object.entries(fb.responses).map(([key,value]) => (
                                        <div key={key} className="flex gap-3">
                                            <span className="text-[10px] font-bold uppercase text-zinc-600 w-32 flex-shrink-0">{key.replace(/_/g,' ')}</span>
                                            <span className="text-sm text-zinc-400">{typeof value==='number'?<span className="flex gap-0.5">{[1,2,3,4,5].map(s=><Star key={s} className={cn("w-3 h-3",s<=value?"fill-yellow-400 text-yellow-400":"text-zinc-800")} />)}</span>:String(value)}</span>
                                        </div>
                                    ))}
                                    {fb.comments && <p className="text-sm text-zinc-400 pt-1 border-t border-white/5 mt-2">{fb.comments}</p>}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────

export default function PipelineFeedback({ applicationId, jobId, jobTitle, currentStatus, candidateName, candidateEmail, resumeUrl, onStatusChange }: PipelineFeedbackProps) {
    const [stages, setStages] = useState<InterviewStage[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [feedbackKey, setFeedbackKey] = useState(0);

    // Dialog state
    const [showChoiceDialog, setShowChoiceDialog] = useState(false);
    const [showScheduleDialog, setShowScheduleDialog] = useState(false);
    const [showSelectionDialog, setShowSelectionDialog] = useState(false);
    const [pendingTarget, setPendingTarget] = useState<string | null>(null);

    // Per-stage mail/meet state
    const [mailSent, setMailSent] = useState<Record<string, boolean>>({});
    const [mailPending, setMailPending] = useState<Record<string, boolean>>({});
    const [meetLinks, setMeetLinks] = useState<Record<string, string>>({});
    const [interviewDateTimes, setInterviewDateTimes] = useState<Record<string, string>>({});
    const [scheduledInterviewerNames, setScheduledInterviewerNames] = useState<Record<string, string>>({});

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch(`/api/jobs/stages?jobId=${jobId}`);
                const data = await res.json();
                if (Array.isArray(data)) setStages(data);
            } catch (err) { console.error(err); }
            finally { setIsLoading(false); }
        };
        load();
    }, [jobId]);

    // Auto-advance from 'New' to 'Application Received' when pipeline is opened
    useEffect(() => {
        if (!isLoading && currentStatus === 'New') {
            updateStatus('Application Received');
        }
    }, [isLoading, currentStatus]);

    // Load persisted interview details on mount
    useEffect(() => {
        const loadDetails = async () => {
            try {
                const res = await fetch(`/api/candidates/interview-details?applicationId=${applicationId}`);
                if (res.ok) {
                    const details = await res.json();
                    const sent: Record<string, boolean> = {};
                    const links: Record<string, string> = {};
                    const dts: Record<string, string> = {};
                    const names: Record<string, string> = {};
                    const pending: Record<string, boolean> = {};
                    for (const [stage, info] of Object.entries(details) as [string, any][]) {
                        if (info.mailSent) sent[stage] = true;
                        if (info.meetLink) links[stage] = info.meetLink;
                        if (info.dateTime) dts[stage] = info.dateTime;
                        if (info.interviewerName) names[stage] = info.interviewerName;
                        if (info.mailPending) pending[stage] = true;
                    }
                    setMailSent(sent);
                    setMeetLinks(links);
                    setInterviewDateTimes(dts);
                    setScheduledInterviewerNames(names);
                    setMailPending(pending);
                }
            } catch (err) { console.error('Error loading interview details:', err); }
        };
        loadDetails();
    }, [applicationId]);

    const pipelineSteps = React.useMemo(() => {
        const steps: { key: string; label: string; stageId?: string }[] = [{ key: 'Application Received', label: 'Application Received' }];
        if (stages.length > 0) stages.forEach(s => steps.push({ key: s.name, label: s.name, stageId: s.id }));
        else { steps.push({ key: 'Screening', label: 'Screening' }, { key: 'Technical Round', label: 'Technical Round' }, { key: 'Final Round', label: 'Final Round' }); }
        return steps;
    }, [stages]);

    const currentIdx = pipelineSteps.findIndex(s => s.key === currentStatus);
    const isTerminal = currentStatus === 'Selected' || currentStatus === 'Rejected';
    const currentStep = pipelineSteps[currentIdx];
    const currentStage = currentStep?.stageId ? stages.find(s => s.id === currentStep.stageId) : null;
    const isLastStage = currentIdx === pipelineSteps.length - 1;

    const updateStatus = async (newStatus: string) => {
        setIsUpdating(true);
        try {
            const res = await fetch('/api/candidates/status', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ applicationId, status: newStatus }) });
            if (res.ok) { onStatusChange(newStatus); setFeedbackKey(k => k + 1); }
        } catch (err) { console.error(err); }
        finally { setIsUpdating(false); }
    };

    const handleAdvanceClick = () => {
        let target: string;
        if (isLastStage) target = 'Selected';
        else target = pipelineSteps[currentIdx + 1]?.key || 'Selected';
        if (target === 'Selected') { updateStatus('Selected'); return; }
        setPendingTarget(target);
        setShowChoiceDialog(true);
    };

    const handleScheduleInterview = () => { setShowChoiceDialog(false); setShowScheduleDialog(true); };
    const handleSelectionMail = () => { setShowChoiceDialog(false); setShowSelectionDialog(true); };

    const handleScheduleSend = async (subject: string, body: string, meetLink: string, dateTime?: string, interviewerData?: { name: string; email: string; criteria: string }) => {
        // 1. Send email to candidate
        const res = await fetch('/api/candidates/send-email', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ to: candidateEmail, subject, body }) });
        if (!res.ok) throw new Error('Failed to send candidate email');

        // 2. Send SEPARATE email to interviewer if requested
        if (interviewerData) {
            const interviewerBody = `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
<h2 style="color: #ff6b3d; margin-bottom: 20px;">Interview Assignment — ${pendingTarget}</h2>
<p>Hi ${interviewerData.name},</p>
<p>You have been assigned to interview <strong>${candidateName}</strong> for the <strong>${pendingTarget}</strong> round.</p>
<table style="width: 100%; border-collapse: collapse; margin: 20px 0; background: #f9f9f9; border-radius: 8px;">
<tr><td style="padding: 12px 16px; font-weight: bold; color: #555; border-bottom: 1px solid #eee;">📅 Date & Time</td><td style="padding: 12px 16px; color: #1a1a1a; border-bottom: 1px solid #eee;">${dateTime || 'TBD'}</td></tr>
<tr><td style="padding: 12px 16px; font-weight: bold; color: #555; border-bottom: 1px solid #eee;">🔗 Google Meet</td><td style="padding: 12px 16px;"><a href="${meetLink}" style="color: #ff6b3d; text-decoration: none; font-weight: bold;">${meetLink}</a></td></tr>
<tr><td style="padding: 12px 16px; font-weight: bold; color: #555;">👤 Candidate</td><td style="padding: 12px 16px; color: #1a1a1a;">${candidateName} (${candidateEmail})</td></tr>
</table>
${interviewerData.criteria ? `<div style="background: #fff3e0; padding: 16px; border-radius: 8px; margin: 16px 0; border-left: 4px solid #ff6b3d;">
<p style="margin: 0 0 8px 0; font-weight: bold; color: #333;">🎯 Assessment & Judging Criteria:</p>
<p style="margin: 0; color: #555; white-space: pre-wrap;">${interviewerData.criteria}</p>
</div>` : ''}
${resumeUrl ? `<p>📄 <strong>Candidate Resume:</strong> <a href="${resumeUrl}" style="color: #ff6b3d; text-decoration: none; font-weight: bold;">Download Resume</a></p>` : '<p>No resume was attached by the candidate.</p>'}
<p>Best regards,<br/>The Hiring Team<br/><strong>Woodfrog</strong></p>
</div>`;

            await fetch('/api/candidates/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to: interviewerData.email,
                    subject: `Interview Assignment: ${candidateName} — ${pendingTarget}`,
                    body: interviewerBody,
                    attachmentUrl: resumeUrl || undefined,
                    attachmentName: `${candidateName.replace(/\s+/g, '_')}_Resume.pdf`
                })
            });
        }

        setMailSent(prev => ({ ...prev, [pendingTarget!]: true }));
        setMeetLinks(prev => ({ ...prev, [pendingTarget!]: meetLink }));
        if (dateTime) setInterviewDateTimes(prev => ({ ...prev, [pendingTarget!]: dateTime }));
        if (interviewerData?.name) setScheduledInterviewerNames(prev => ({ ...prev, [pendingTarget!]: interviewerData.name }));

        // Persist interview details to DB
        try {
            const existingRes = await fetch(`/api/candidates/interview-details?applicationId=${applicationId}`);
            const existing = existingRes.ok ? await existingRes.json() : {};
            const updated = {
                ...existing,
                [pendingTarget!]: {
                    meetLink,
                    dateTime: dateTime || undefined,
                    interviewerName: interviewerData?.name || undefined,
                    mailSent: true,
                },
            };
            await fetch('/api/candidates/interview-details', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ applicationId, details: updated }),
            });
        } catch (e) { console.error('Failed to persist interview details:', e); }

        // Close all dialogs first so the new stage form renders cleanly
        setShowScheduleDialog(false);
        setShowChoiceDialog(false);
        setShowSelectionDialog(false);
        // If already on the stage just update mail state, don't re-update status
        if (pendingTarget === currentStatus) {
            setMailPending(prev => { const n = {...prev}; delete n[pendingTarget!]; return n; });
            setPendingTarget(null);
        } else {
            const target = pendingTarget!;
            setPendingTarget(null);
            await updateStatus(target);
        }
    };

    const handleSelectionSend = async (subject: string, body: string) => {
        const res = await fetch('/api/candidates/send-email', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ to: candidateEmail, subject, body }) });
        if (!res.ok) throw new Error('Failed');
        setMailSent(prev => ({ ...prev, [pendingTarget!]: true }));

        // Persist to DB
        try {
            const existingRes = await fetch(`/api/candidates/interview-details?applicationId=${applicationId}`);
            const existing = existingRes.ok ? await existingRes.json() : {};
            const updated = { ...existing, [pendingTarget!]: { ...existing[pendingTarget!], mailSent: true } };
            await fetch('/api/candidates/interview-details', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ applicationId, details: updated }) });
        } catch (e) { console.error('Failed to persist:', e); }

        // Close all dialogs first so the new stage form renders cleanly
        setShowSelectionDialog(false);
        setShowChoiceDialog(false);
        setShowScheduleDialog(false);
        if (pendingTarget === currentStatus) {
            setMailPending(prev => { const n = {...prev}; delete n[pendingTarget!]; return n; });
            setPendingTarget(null);
        } else {
            const target = pendingTarget!;
            setPendingTarget(null);
            await updateStatus(target);
        }
    };

    const handleScheduleLater = async () => {
        const target = pendingTarget;
        if (!target) return;
        try {
            setMailPending(prev => ({ ...prev, [target]: true }));
            setShowScheduleDialog(false);
            setShowSelectionDialog(false);
            setShowChoiceDialog(false);
            setPendingTarget(null);

            // Persist mailPending to DB
            try {
                const existingRes = await fetch(`/api/candidates/interview-details?applicationId=${applicationId}`);
                const existing = existingRes.ok ? await existingRes.json() : {};
                const updated = { ...existing, [target]: { ...existing[target], mailPending: true } };
                await fetch('/api/candidates/interview-details', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ applicationId, details: updated }) });
            } catch (e) { console.error('Failed to persist:', e); }

            await updateStatus(target);
        } catch (err) {
            console.error('Schedule later failed:', err);
        }
    };

    const handleReject = () => updateStatus('Rejected');

    // For pending mail stages — send mail inline
    const handlePendingSend = async (stageName: string) => {
        setPendingTarget(stageName);
        setShowChoiceDialog(true);
    };

    if (isLoading) return <div className="h-40 rounded-2xl bg-zinc-900 animate-pulse" />;

    // Current stage mail/meet status
    const currentMailStatus: 'sent' | 'pending' | 'none' = mailSent[currentStatus] ? 'sent' : mailPending[currentStatus] ? 'pending' : 'none';
    const currentMeetLink = meetLinks[currentStatus];
    const currentInterviewDT = interviewDateTimes[currentStatus];

    // Handlers for inline mail buttons on feedback form
    const handleInlineSchedule = () => { setPendingTarget(currentStatus); setShowScheduleDialog(true); };
    const handleInlineSelection = () => { setPendingTarget(currentStatus); setShowSelectionDialog(true); };

    return (
        <div className="space-y-8">
            {/* ── Pipeline Visual ── */}
            <div className="space-y-5">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Interview Pipeline</h4>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                    {pipelineSteps.map((step, idx) => {
                        const isCompleted = (!isTerminal && currentIdx > idx) || (currentStatus === 'Selected');
                        const isCurrent = step.key === currentStatus;
                        return (
                            <React.Fragment key={step.key}>
                                <div className={cn(
                                    "flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap",
                                    isCurrent ? "bg-[#ff6b3d] text-white shadow-[0_0_20px_rgba(255,107,61,0.25)]"
                                    : isCompleted ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                    : "bg-zinc-900/60 text-zinc-600 border border-white/5"
                                )}>
                                    {isCompleted ? <CheckCircle className="w-3.5 h-3.5" /> : isCurrent ? <div className="w-3.5 h-3.5 rounded-full border-2 border-white flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-white" /></div> : <Circle className="w-3.5 h-3.5" />}
                                    {step.label}
                                </div>
                                {idx < pipelineSteps.length - 1 && <ChevronRight className="w-3.5 h-3.5 text-zinc-800 flex-shrink-0" />}
                            </React.Fragment>
                        );
                    })}
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-800 flex-shrink-0" />
                    <div className={cn(
                        "flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap",
                        currentStatus === 'Selected' ? "bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.25)]"
                        : currentStatus === 'Rejected' ? "bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.25)]"
                        : "bg-zinc-900/60 text-zinc-700 border border-white/5"
                    )}>
                        {currentStatus === 'Selected' ? <Trophy className="w-3.5 h-3.5" /> : currentStatus === 'Rejected' ? <XCircle className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />}
                        {currentStatus === 'Selected' ? 'Selected' : currentStatus === 'Rejected' ? 'Rejected' : 'Decision'}
                    </div>
                </div>
            </div>

            <div className="h-[1px] w-full bg-white/5" />

            {/* ── Current Stage Action Area ── */}
            {isTerminal ? (
                <div className={cn("rounded-2xl p-8 text-center space-y-3", currentStatus==='Selected'?"bg-green-500/5 border border-green-500/10":"bg-red-500/5 border border-red-500/10")}>
                    {currentStatus==='Selected'?<Trophy className="w-12 h-12 text-green-400 mx-auto" />:<XCircle className="w-12 h-12 text-red-400 mx-auto" />}
                    <h4 className={cn("text-xl font-bold", currentStatus==='Selected'?"text-green-400":"text-red-400")}>Candidate {currentStatus}</h4>
                    <p className="text-zinc-600 text-sm">This candidate's pipeline has been finalized.</p>
                    <button onClick={() => updateStatus('Application Received')} disabled={isUpdating} className="mt-4 px-4 py-2 bg-white/5 text-zinc-400 text-xs font-bold rounded-lg hover:bg-white/10 transition-all disabled:opacity-50">Reset Pipeline</button>
                </div>
            ) : currentStatus === 'New' ? (
                /* New candidates auto-advance to Application Received above — show loading */
                <div className="h-40 rounded-2xl bg-zinc-900 animate-pulse flex items-center justify-center">
                    <Loader2 className="w-6 h-6 text-[#ff6b3d] animate-spin" />
                </div>
            ) : currentStatus === 'Application Received' ? (
                <InitialRatingForm applicationId={applicationId} onAdvance={handleAdvanceClick} onReject={handleReject} isUpdating={isUpdating} />
            ) : currentStage ? (
                <InlineStageFeedback key={currentStatus} stage={currentStage} applicationId={applicationId}
                    onAdvance={handleAdvanceClick} onReject={handleReject} isLast={isLastStage} isUpdating={isUpdating}
                    mailStatus={currentMailStatus} meetLink={currentMeetLink} interviewDateTime={currentInterviewDT}
                    onScheduleMail={handleInlineSchedule} onSelectionMail={handleInlineSelection}
                    scheduledInterviewerName={scheduledInterviewerNames[currentStatus]} />
            ) : (
                <div className="space-y-6">
                    {/* Fallback header with mail status top-right */}
                    <div className="flex items-start justify-between">
                        <div className="space-y-2">
                            <h4 className="text-base font-bold">{currentStatus} Stage</h4>
                            <p className="text-xs text-zinc-600">No feedback form configured. Use quick actions below.</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            {currentMailStatus !== 'sent' && (
                                <div className="flex gap-2">
                                    <button onClick={handleInlineSchedule} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#ff6b3d]/10 text-[#ff6b3d] border border-[#ff6b3d]/20 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-[#ff6b3d]/20 transition-all"><CalendarIcon className="w-3 h-3" /> Schedule Interview</button>
                                    <button onClick={handleInlineSelection} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-500/20 transition-all"><Mail className="w-3 h-3" /> Selection Mail</button>
                                </div>
                            )}
                            {currentMailStatus === 'sent' && (
                                <>
                                    <span className="flex items-center gap-1.5 text-[10px] font-black text-green-400 bg-green-500/10 px-3 py-1.5 rounded-lg border border-green-500/20"><MailCheck className="w-3 h-3" /> Mail Sent</span>
                                    {currentInterviewDT && <span className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-300 bg-white/[0.03] px-3 py-1.5 rounded-lg border border-white/5"><CalendarIcon className="w-3 h-3 text-[#ff6b3d]" /> {currentInterviewDT}</span>}
                                    {currentMeetLink && <a href={currentMeetLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[10px] font-black text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-lg border border-blue-500/20 hover:bg-blue-500/20 transition-all"><Video className="w-3 h-3" /> {currentMeetLink.replace('https://','')}</a>}
                                </>
                            )}
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={handleAdvanceClick} disabled={isUpdating} className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-[#ff6b3d] text-white font-bold rounded-xl hover:bg-[#ff8a65] transition-all disabled:opacity-50"><ArrowRight className="w-4 h-4" /> {isLastStage ? 'Select Candidate' : 'Advance'}</button>
                        <button onClick={handleReject} disabled={isUpdating} className="px-5 py-3 bg-red-500/10 text-red-400 border border-red-500/20 font-bold rounded-xl hover:bg-red-500/20 transition-all disabled:opacity-50 flex items-center gap-2"><ThumbsDown className="w-4 h-4" /> Reject</button>
                    </div>
                </div>
            )}

            {/* ── Feedback History ── */}
            <FeedbackHistory key={feedbackKey} applicationId={applicationId} />

            {/* ── Dialogs ── */}
            {showChoiceDialog && pendingTarget && (
                <AdvanceChoiceDialog 
                    nextStageName={pendingTarget} 
                    onScheduleInterview={handleScheduleInterview} 
                    onSelectionMail={handleSelectionMail} 
                    onScheduleLater={handleScheduleLater} 
                    onClose={() => { setShowChoiceDialog(false); setPendingTarget(null); }} 
                />
            )}
            {showScheduleDialog && pendingTarget && (
                <ScheduleInterviewDialog candidateName={candidateName} candidateEmail={candidateEmail} nextStageName={pendingTarget} jobTitle={jobTitle} resumeUrl={resumeUrl}
                    onSend={handleScheduleSend} onScheduleLater={handleScheduleLater} onClose={() => { setShowScheduleDialog(false); setPendingTarget(null); }} />
            )}
            {showSelectionDialog && pendingTarget && (
                <SelectionMailDialog candidateName={candidateName} candidateEmail={candidateEmail} nextStageName={pendingTarget} jobTitle={jobTitle}
                    onSend={handleSelectionSend} onScheduleLater={handleScheduleLater} onClose={() => { setShowSelectionDialog(false); setPendingTarget(null); }} />
            )}
        </div>
    );
}

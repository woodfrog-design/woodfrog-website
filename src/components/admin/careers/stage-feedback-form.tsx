'use client';

import React, { useState, useEffect } from 'react';
import { Send, Star, Loader2 } from 'lucide-react';
import { InterviewStage, FeedbackFormField } from '@/lib/candidates';
import { cn } from '@/lib/utils';

interface StageFeedbackFormProps {
    applicationId: string;
    jobId: string;
    onSubmitted: () => void;
}

export default function StageFeedbackForm({ applicationId, jobId, onSubmitted }: StageFeedbackFormProps) {
    const [stages, setStages] = useState<InterviewStage[]>([]);
    const [selectedStageId, setSelectedStageId] = useState('');
    const [interviewerName, setInterviewerName] = useState('');
    const [responses, setResponses] = useState<Record<string, any>>({});
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comments, setComments] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const fetchStages = async () => {
            try {
                const res = await fetch(`/api/jobs/stages?jobId=${jobId}`);
                const data = await res.json();
                if (Array.isArray(data)) {
                    setStages(data);
                    if (data.length > 0) setSelectedStageId(data[0].id);
                }
            } catch (err) {
                console.error('Failed to fetch stages:', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStages();
    }, [jobId]);

    const selectedStage = stages.find(s => s.id === selectedStageId);
    const formFields = selectedStage?.feedbackFormFields || [];

    const handleSubmit = async () => {
        if (!selectedStageId || !interviewerName.trim()) return;

        setIsSubmitting(true);
        try {
            const res = await fetch('/api/candidates/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    applicationId,
                    stageId: selectedStageId,
                    interviewerName,
                    responses,
                    rating,
                    comments,
                }),
            });
            if (res.ok) {
                setSubmitted(true);
                setTimeout(() => {
                    setSubmitted(false);
                    setInterviewerName('');
                    setResponses({});
                    setRating(0);
                    setComments('');
                    onSubmitted();
                }, 2000);
            }
        } catch (err) {
            console.error('Failed to submit feedback:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return <div className="h-40 rounded-2xl bg-zinc-900 animate-pulse" />;
    }

    if (stages.length === 0) {
        return (
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 text-center">
                <p className="text-zinc-500 text-sm">No interview stages configured for this job.</p>
                <p className="text-zinc-600 text-xs mt-1">Go to the job settings to configure stages and feedback forms.</p>
            </div>
        );
    }

    if (submitted) {
        return (
            <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-12 text-center space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
                    <Send className="w-8 h-8 text-green-400" />
                </div>
                <h4 className="text-xl font-bold text-green-400">Feedback Submitted!</h4>
                <p className="text-green-400/70 text-sm">Thank you for your assessment.</p>
            </div>
        );
    }

    return (
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/5 bg-zinc-900/30">
                <h4 className="text-sm font-bold">Submit Interview Feedback</h4>
                <p className="text-[10px] text-zinc-600 mt-0.5">Select the interview stage and provide your assessment</p>
            </div>

            <div className="p-6 space-y-6">
                {/* Stage Selector */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Interview Stage</label>
                        <select
                            value={selectedStageId}
                            onChange={e => setSelectedStageId(e.target.value)}
                            className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-[#ff6b3d]/50 transition-all text-sm"
                        >
                            {stages.map(stage => (
                                <option key={stage.id} value={stage.id}>{stage.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Interviewer Name</label>
                        <input
                            type="text"
                            value={interviewerName}
                            onChange={e => setInterviewerName(e.target.value)}
                            placeholder="Your name"
                            className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-[#ff6b3d]/50 transition-all text-sm"
                        />
                    </div>
                </div>

                {/* Dynamic Form Fields */}
                {formFields.length > 0 && (
                    <div className="space-y-4 pt-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Stage-Specific Questions</label>
                        {formFields.map((field: FeedbackFormField) => (
                            <div key={field.id} className="space-y-2">
                                <label className="text-xs font-bold text-zinc-400 flex items-center gap-2">
                                    {field.label}
                                    {field.required && <span className="text-[#ff6b3d] text-[10px]">*</span>}
                                </label>
                                {field.type === 'text' && (
                                    <input
                                        type="text"
                                        value={responses[field.id] || ''}
                                        onChange={e => setResponses({ ...responses, [field.id]: e.target.value })}
                                        className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-[#ff6b3d]/50 transition-all text-sm"
                                    />
                                )}
                                {field.type === 'textarea' && (
                                    <textarea
                                        value={responses[field.id] || ''}
                                        onChange={e => setResponses({ ...responses, [field.id]: e.target.value })}
                                        rows={3}
                                        className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-[#ff6b3d]/50 transition-all text-sm resize-none"
                                    />
                                )}
                                {field.type === 'rating' && (
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setResponses({ ...responses, [field.id]: star })}
                                                className="p-1 transition-all"
                                            >
                                                <Star
                                                    className={cn(
                                                        "w-5 h-5 transition-all",
                                                        star <= (responses[field.id] || 0)
                                                            ? "fill-[#ff6b3d] text-[#ff6b3d]"
                                                            : "text-zinc-700"
                                                    )}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}
                                {field.type === 'select' && field.options && (
                                    <select
                                        value={responses[field.id] || ''}
                                        onChange={e => setResponses({ ...responses, [field.id]: e.target.value })}
                                        className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-[#ff6b3d]/50 transition-all text-sm"
                                    >
                                        <option value="">Select...</option>
                                        {field.options.map(opt => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Overall Rating */}
                <div className="space-y-2 pt-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Overall Rating</label>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map(star => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                className="p-1 transition-all hover:scale-110"
                            >
                                <Star
                                    className={cn(
                                        "w-7 h-7 transition-all",
                                        star <= (hoverRating || rating)
                                            ? "fill-[#ff6b3d] text-[#ff6b3d]"
                                            : "text-zinc-700"
                                    )}
                                />
                            </button>
                        ))}
                        {rating > 0 && (
                            <span className="ml-2 text-sm text-zinc-500 self-center">{rating}/5</span>
                        )}
                    </div>
                </div>

                {/* Comments */}
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Additional Comments</label>
                    <textarea
                        value={comments}
                        onChange={e => setComments(e.target.value)}
                        placeholder="Share your overall thoughts on this candidate..."
                        rows={4}
                        className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-[#ff6b3d]/50 transition-all text-sm resize-none placeholder:text-zinc-700"
                    />
                </div>

                {/* Submit */}
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !interviewerName.trim()}
                    className="flex items-center gap-2 px-6 py-3 bg-[#ff6b3d] text-white font-bold rounded-xl hover:bg-[#ff8a65] transition-all disabled:opacity-50 shadow-[0_10px_20px_rgba(255,107,61,0.2)] w-full justify-center"
                >
                    {isSubmitting ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                    ) : (
                        <><Send className="w-4 h-4" /> Submit Feedback</>
                    )}
                </button>
            </div>
        </div>
    );
}

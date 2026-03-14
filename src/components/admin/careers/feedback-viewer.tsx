'use client';

import React, { useState, useEffect } from 'react';
import { Star, User, Clock, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import { InterviewFeedback } from '@/lib/candidates';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface FeedbackViewerProps {
    applicationId: string;
}

export default function FeedbackViewer({ applicationId }: FeedbackViewerProps) {
    const [feedback, setFeedback] = useState<InterviewFeedback[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

    useEffect(() => {
        fetchFeedback();
    }, [applicationId]);

    const fetchFeedback = async () => {
        try {
            const res = await fetch(`/api/candidates/feedback?applicationId=${applicationId}`);
            const data = await res.json();
            if (Array.isArray(data)) {
                setFeedback(data);
                // Auto-expand all
                setExpandedIds(new Set(data.map((f: InterviewFeedback) => f.id)));
            }
        } catch (err) {
            console.error('Failed to fetch feedback:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleExpand = (id: string) => {
        setExpandedIds(prev => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    // Group feedback by stage
    const groupedFeedback = feedback.reduce((acc: Record<string, InterviewFeedback[]>, fb) => {
        const stage = fb.stageName || 'Unknown Stage';
        if (!acc[stage]) acc[stage] = [];
        acc[stage].push(fb);
        return acc;
    }, {});

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[1, 2].map(i => (
                    <div key={i} className="h-32 rounded-2xl bg-zinc-900 animate-pulse" />
                ))}
            </div>
        );
    }

    if (feedback.length === 0) {
        return (
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-12 text-center space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-zinc-900 flex items-center justify-center">
                    <MessageCircle className="w-8 h-8 text-zinc-700" />
                </div>
                <h4 className="text-lg font-bold text-zinc-400">No Feedback Yet</h4>
                <p className="text-zinc-600 text-sm">Use the form above to submit interview feedback for this candidate.</p>
            </div>
        );
    }

    const avgRating = feedback.length > 0
        ? (feedback.reduce((sum, f) => sum + (f.rating || 0), 0) / feedback.filter(f => f.rating > 0).length).toFixed(1)
        : '0';

    return (
        <div className="space-y-6">
            {/* Summary Bar */}
            <div className="flex items-center gap-6 bg-white/[0.02] border border-white/5 rounded-xl px-6 py-4">
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Total Reviews</span>
                    <span className="text-lg font-bold text-white">{feedback.length}</span>
                </div>
                <div className="w-[1px] h-6 bg-white/5" />
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Avg Rating</span>
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-[#ff6b3d] text-[#ff6b3d]" />
                        <span className="text-lg font-bold text-white">{avgRating}</span>
                        <span className="text-zinc-600 text-sm">/5</span>
                    </div>
                </div>
            </div>

            {/* Grouped by Stage */}
            {Object.entries(groupedFeedback).map(([stageName, entries]) => (
                <div key={stageName} className="space-y-3">
                    <h4 className="text-xs font-bold text-[#ff6b3d] uppercase tracking-widest flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#ff6b3d]" />
                        {stageName}
                        <span className="text-zinc-600 font-medium normal-case">({entries.length} review{entries.length !== 1 ? 's' : ''})</span>
                    </h4>

                    {entries.map(fb => (
                        <div
                            key={fb.id}
                            className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden transition-all"
                        >
                            <button
                                onClick={() => toggleExpand(fb.id)}
                                className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-all"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center">
                                        <User className="w-5 h-5 text-zinc-500" />
                                    </div>
                                    <div className="text-left">
                                        <div className="font-bold text-sm">{fb.interviewerName}</div>
                                        <div className="flex items-center gap-2 text-[10px] text-zinc-600">
                                            <Clock className="w-3 h-3" />
                                            {format(new Date(fb.createdAt), 'MMM d, yyyy h:mm a')}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    {fb.rating > 0 && (
                                        <div className="flex items-center gap-1">
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <Star
                                                    key={star}
                                                    className={cn(
                                                        "w-3.5 h-3.5",
                                                        star <= fb.rating
                                                            ? "fill-[#ff6b3d] text-[#ff6b3d]"
                                                            : "text-zinc-800"
                                                    )}
                                                />
                                            ))}
                                        </div>
                                    )}
                                    {expandedIds.has(fb.id) ? (
                                        <ChevronUp className="w-4 h-4 text-zinc-600" />
                                    ) : (
                                        <ChevronDown className="w-4 h-4 text-zinc-600" />
                                    )}
                                </div>
                            </button>

                            {expandedIds.has(fb.id) && (
                                <div className="px-6 pb-6 space-y-4 border-t border-white/5 pt-4">
                                    {/* Dynamic Responses */}
                                    {Object.keys(fb.responses).length > 0 && (
                                        <div className="space-y-3">
                                            {Object.entries(fb.responses).map(([key, value]) => (
                                                <div key={key} className="space-y-1">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">
                                                        {key.replace(/_/g, ' ')}
                                                    </span>
                                                    <p className="text-sm text-zinc-300">
                                                        {typeof value === 'number' ? (
                                                            <span className="flex items-center gap-1">
                                                                {[1, 2, 3, 4, 5].map(s => (
                                                                    <Star key={s} className={cn("w-3 h-3", s <= value ? "fill-yellow-400 text-yellow-400" : "text-zinc-800")} />
                                                                ))}
                                                            </span>
                                                        ) : (
                                                            String(value) || 'No response'
                                                        )}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Comments */}
                                    {fb.comments && (
                                        <div className="space-y-1 pt-2 border-t border-white/5">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Comments</span>
                                            <p className="text-sm text-zinc-300 leading-relaxed">{fb.comments}</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle, Circle, ChevronRight, ArrowRight, XCircle, Trophy, Loader2 } from 'lucide-react';
import { InterviewStage, PIPELINE_STATUSES, PipelineStatus } from '@/lib/candidates';
import { cn } from '@/lib/utils';

interface InterviewPipelineProps {
    applicationId: string;
    jobId: string;
    currentStatus: string;
    onStatusChange: (newStatus: string) => void;
}

export default function InterviewPipeline({ applicationId, jobId, currentStatus, onStatusChange }: InterviewPipelineProps) {
    const [stages, setStages] = useState<InterviewStage[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);

    // Build the full pipeline from default + custom stages
    const pipelineSteps = React.useMemo(() => {
        // If custom stages exist, use them in the middle
        const steps: { key: string; label: string; stageId?: string }[] = [];
        steps.push({ key: 'Application Received', label: 'Application Received' });

        if (stages.length > 0) {
            // Filter out custom stages that duplicate hardcoded stage names
            const hardcodedNames = new Set(['Application Received', 'Selected', 'Rejected']);
            stages
                .filter(s => !hardcodedNames.has(s.name))
                .forEach(s => {
                    steps.push({ key: s.name, label: s.name, stageId: s.id });
                });
        } else {
            // Default stages if none configured
            steps.push({ key: 'Screening', label: 'Screening' });
            steps.push({ key: 'Technical Round', label: 'Technical Round' });
            steps.push({ key: 'Final Round', label: 'Final Round' });
        }

        steps.push({ key: 'Selected', label: 'Selected' });
        steps.push({ key: 'Rejected', label: 'Rejected' });

        return steps;
    }, [stages]);

    const currentIdx = pipelineSteps.findIndex(s => s.key === currentStatus);
    const isTerminal = currentStatus === 'Selected' || currentStatus === 'Rejected';

    useEffect(() => {
        const fetchStages = async () => {
            try {
                const res = await fetch(`/api/jobs/stages?jobId=${jobId}`);
                const data = await res.json();
                if (Array.isArray(data)) setStages(data);
            } catch (err) {
                console.error('Failed to fetch stages:', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStages();
    }, [jobId]);

    const handleAdvance = async (targetStatus: string) => {
        setIsUpdating(true);
        try {
            const res = await fetch('/api/candidates/status', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ applicationId, status: targetStatus }),
            });
            if (res.ok) {
                onStatusChange(targetStatus);
            }
        } catch (err) {
            console.error('Failed to update status:', err);
        } finally {
            setIsUpdating(false);
        }
    };

    if (isLoading) {
        return <div className="h-32 rounded-2xl bg-zinc-900 animate-pulse" />;
    }

    const mainSteps = pipelineSteps.filter(s => s.key !== 'Selected' && s.key !== 'Rejected');
    const finalSteps = pipelineSteps.filter(s => s.key === 'Selected' || s.key === 'Rejected');

    return (
        <div className="space-y-8">
            {/* Visual Pipeline */}
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-6">Interview Pipeline</h4>

                {/* Main Stages */}
                <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
                    {mainSteps.map((step, idx) => {
                        const stepGlobalIdx = pipelineSteps.findIndex(s => s.key === step.key);
                        const isCompleted = currentIdx > stepGlobalIdx && !isTerminal;
                        const isCurrent = step.key === currentStatus;
                        const isSelectedTerminal = currentStatus === 'Selected' && idx < mainSteps.length;
                        const isAllCompleted = isSelectedTerminal;

                        return (
                            <React.Fragment key={step.key}>
                                <button
                                    onClick={() => handleAdvance(step.key)}
                                    disabled={isUpdating || isCurrent}
                                    className={cn(
                                        "flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap min-w-fit",
                                        isCurrent
                                            ? "bg-[#ff6b3d] text-white shadow-[0_0_20px_rgba(255,107,61,0.3)]"
                                            : isCompleted || isAllCompleted
                                                ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                                : "bg-zinc-900 text-zinc-600 border border-white/5 hover:border-[#ff6b3d]/30 hover:text-zinc-400"
                                    )}
                                >
                                    {isCompleted || isAllCompleted ? (
                                        <CheckCircle className="w-4 h-4" />
                                    ) : isCurrent ? (
                                        <div className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center">
                                            <div className="w-2 h-2 rounded-full bg-white" />
                                        </div>
                                    ) : (
                                        <Circle className="w-4 h-4" />
                                    )}
                                    {step.label}
                                </button>
                                {idx < mainSteps.length - 1 && (
                                    <ChevronRight className="w-4 h-4 text-zinc-700 flex-shrink-0" />
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>

                {/* Terminal States */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mr-2">Final Decision</span>
                    {finalSteps.map(step => (
                        <button
                            key={step.key}
                            onClick={() => handleAdvance(step.key)}
                            disabled={isUpdating}
                            className={cn(
                                "flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all",
                                step.key === currentStatus
                                    ? step.key === 'Selected'
                                        ? "bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                                        : "bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                                    : step.key === 'Selected'
                                        ? "bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20"
                                        : "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20"
                            )}
                        >
                            {step.key === 'Selected' ? <Trophy className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                            {step.label}
                        </button>
                    ))}
                    {isUpdating && <Loader2 className="w-4 h-4 text-zinc-500 animate-spin" />}
                </div>
            </div>

            {/* Quick Actions */}
            {!isTerminal && currentIdx >= 0 && currentIdx < pipelineSteps.length - 2 && (
                <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Quick Advance</span>
                    <button
                        onClick={() => {
                            // Find next non-terminal step
                            const nextIdx = currentIdx + 1;
                            if (nextIdx < pipelineSteps.length) {
                                const next = pipelineSteps[nextIdx];
                                if (next.key !== 'Selected' && next.key !== 'Rejected') {
                                    handleAdvance(next.key);
                                }
                            }
                        }}
                        disabled={isUpdating}
                        className="flex items-center gap-2 px-4 py-2 bg-[#ff6b3d]/10 text-[#ff6b3d] text-sm font-bold rounded-lg hover:bg-[#ff6b3d]/20 transition-all disabled:opacity-50"
                    >
                        Advance to Next Stage <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );
}

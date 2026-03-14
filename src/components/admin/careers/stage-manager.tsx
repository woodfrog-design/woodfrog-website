'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, GripVertical, Save, X, ChevronDown, ChevronUp, Settings, Loader2 } from 'lucide-react';
import { InterviewStage, FeedbackFormField } from '@/lib/candidates';
import { cn } from '@/lib/utils';

interface StageManagerProps {
    jobId: string;
    onClose: () => void;
}

const DEFAULT_STAGES = [
    { name: 'Screening', orderIndex: 0, feedbackFormFields: [
        { id: 'communication', label: 'Communication Skills', type: 'rating' as const, required: true },
        { id: 'culture_fit', label: 'Culture Fit Assessment', type: 'textarea' as const, required: true },
        { id: 'initial_impression', label: 'Initial Impression', type: 'textarea' as const, required: false },
    ]},
    { name: 'Technical Round', orderIndex: 1, feedbackFormFields: [
        { id: 'technical_skills', label: 'Technical Skills', type: 'rating' as const, required: true },
        { id: 'problem_solving', label: 'Problem Solving', type: 'rating' as const, required: true },
        { id: 'coding_quality', label: 'Code Quality', type: 'select' as const, required: true, options: ['Excellent', 'Good', 'Average', 'Below Average'] },
        { id: 'technical_notes', label: 'Technical Assessment Notes', type: 'textarea' as const, required: true },
    ]},
    { name: 'Final Round', orderIndex: 2, feedbackFormFields: [
        { id: 'leadership', label: 'Leadership Potential', type: 'rating' as const, required: false },
        { id: 'overall_fit', label: 'Overall Team Fit', type: 'rating' as const, required: true },
        { id: 'recommendation', label: 'Hiring Recommendation', type: 'select' as const, required: true, options: ['Strong Yes', 'Yes', 'Maybe', 'No', 'Strong No'] },
        { id: 'final_notes', label: 'Final Comments', type: 'textarea' as const, required: true },
    ]},
];

export default function StageManager({ jobId, onClose }: StageManagerProps) {
    const [stages, setStages] = useState<(InterviewStage & { isNew?: boolean })[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [expandedStageIdx, setExpandedStageIdx] = useState<number | null>(null);
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        fetchStages();
    }, [jobId]);

    const fetchStages = async () => {
        try {
            const res = await fetch(`/api/jobs/stages?jobId=${jobId}`);
            const data = await res.json();
            if (Array.isArray(data) && data.length > 0) {
                setStages(data);
            } else {
                // Initialize with default stages
                setStages(DEFAULT_STAGES.map((s, i) => ({
                    ...s,
                    id: `new_${Date.now()}_${i}`,
                    jobId,
                    createdAt: new Date().toISOString(),
                    isNew: true,
                })));
                setHasChanges(true);
            }
        } catch (err) {
            console.error('Failed to fetch stages:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const addStage = () => {
        const newStage: InterviewStage & { isNew?: boolean } = {
            id: `new_${Date.now()}`,
            jobId,
            name: 'New Stage',
            orderIndex: stages.length,
            feedbackFormFields: [],
            createdAt: new Date().toISOString(),
            isNew: true,
        };
        setStages([...stages, newStage]);
        setExpandedStageIdx(stages.length);
        setHasChanges(true);
    };

    const removeStage = async (idx: number) => {
        const stage = stages[idx];
        if (!stage.isNew) {
            try {
                await fetch(`/api/jobs/stages?stageId=${stage.id}`, { method: 'DELETE' });
            } catch (err) {
                console.error('Failed to delete stage:', err);
            }
        }
        setStages(prev => prev.filter((_, i) => i !== idx).map((s, i) => ({ ...s, orderIndex: i })));
        setHasChanges(true);
    };

    const updateStage = (idx: number, updates: Partial<InterviewStage>) => {
        setStages(prev => prev.map((s, i) => i === idx ? { ...s, ...updates } : s));
        setHasChanges(true);
    };

    const addFormField = (stageIdx: number) => {
        const newField: FeedbackFormField = {
            id: `field_${Date.now()}`,
            label: 'New Question',
            type: 'text',
            required: false,
        };
        const stage = stages[stageIdx];
        updateStage(stageIdx, {
            feedbackFormFields: [...stage.feedbackFormFields, newField],
        });
    };

    const updateFormField = (stageIdx: number, fieldIdx: number, updates: Partial<FeedbackFormField>) => {
        const stage = stages[stageIdx];
        const newFields = [...stage.feedbackFormFields];
        newFields[fieldIdx] = { ...newFields[fieldIdx], ...updates };
        updateStage(stageIdx, { feedbackFormFields: newFields });
    };

    const removeFormField = (stageIdx: number, fieldIdx: number) => {
        const stage = stages[stageIdx];
        const newFields = stage.feedbackFormFields.filter((_, i) => i !== fieldIdx);
        updateStage(stageIdx, { feedbackFormFields: newFields });
    };

    const addFieldOption = (stageIdx: number, fieldIdx: number) => {
        const stage = stages[stageIdx];
        const newFields = [...stage.feedbackFormFields];
        const field = newFields[fieldIdx];
        if (!field.options) field.options = [];
        field.options.push('New Option');
        updateStage(stageIdx, { feedbackFormFields: newFields });
    };

    const removeFieldOption = (stageIdx: number, fieldIdx: number, optIdx: number) => {
        const stage = stages[stageIdx];
        const newFields = [...stage.feedbackFormFields];
        newFields[fieldIdx].options?.splice(optIdx, 1);
        updateStage(stageIdx, { feedbackFormFields: newFields });
    };

    const handleSaveAll = async () => {
        setIsSaving(true);
        try {
            for (const stage of stages) {
                await fetch('/api/jobs/stages', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id: stage.isNew ? undefined : stage.id,
                        jobId,
                        name: stage.name,
                        orderIndex: stage.orderIndex,
                        feedbackFormFields: stage.feedbackFormFields,
                    }),
                });
            }
            setHasChanges(false);
            await fetchStages();
        } catch (err) {
            console.error('Failed to save stages:', err);
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map(i => <div key={i} className="h-20 rounded-2xl bg-zinc-900 animate-pulse" />)}
            </div>
        );
    }

    return (
        <div className="bg-[#0F1113] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col h-full max-h-[85vh]">
            {/* Header */}
            <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-zinc-900/30">
                <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-[#ff6b3d]" />
                    <div>
                        <h3 className="text-xl font-bold">Interview Stages</h3>
                        <p className="text-[10px] text-zinc-600 mt-0.5">Configure interview pipeline and feedback forms</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-zinc-500 transition-all">
                        <X className="w-6 h-6" />
                    </button>
                    <button
                        onClick={handleSaveAll}
                        disabled={isSaving || !hasChanges}
                        className="flex items-center gap-2 px-6 py-2.5 bg-[#ff6b3d] text-white font-bold rounded-full hover:bg-[#ff8a65] transition-all disabled:opacity-50 shadow-[0_10px_20px_rgba(255,107,61,0.2)]"
                    >
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {isSaving ? 'Saving...' : 'Save All'}
                    </button>
                </div>
            </div>

            {/* Stages List */}
            <div className="flex-1 overflow-y-auto p-8 space-y-4">
                {stages.map((stage, idx) => (
                    <div
                        key={stage.id}
                        className="bg-zinc-900/50 border border-white/5 rounded-2xl overflow-hidden transition-all"
                    >
                        {/* Stage Header */}
                        <div className="px-6 py-4 flex items-center gap-4">
                            <GripVertical className="w-4 h-4 text-zinc-700 cursor-grab flex-shrink-0" />
                            <div className="w-8 h-8 rounded-lg bg-[#ff6b3d]/10 flex items-center justify-center text-[#ff6b3d] font-bold text-sm flex-shrink-0">
                                {idx + 1}
                            </div>
                            <input
                                type="text"
                                value={stage.name}
                                onChange={e => updateStage(idx, { name: e.target.value })}
                                className="bg-transparent text-lg font-bold outline-none flex-1 min-w-0"
                                placeholder="Stage Name"
                            />
                            <span className="text-[10px] text-zinc-600 font-medium flex-shrink-0">
                                {stage.feedbackFormFields.length} field{stage.feedbackFormFields.length !== 1 ? 's' : ''}
                            </span>
                            <button
                                onClick={() => setExpandedStageIdx(expandedStageIdx === idx ? null : idx)}
                                className="p-2 hover:bg-white/5 rounded-lg text-zinc-500 transition-all"
                            >
                                {expandedStageIdx === idx ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                            <button
                                onClick={() => removeStage(idx)}
                                className="p-2 text-zinc-600 hover:text-red-400 transition-all"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Feedback Form Builder (Expanded) */}
                        {expandedStageIdx === idx && (
                            <div className="px-6 pb-6 pt-2 border-t border-white/5 space-y-4">
                                <div className="flex items-center justify-between">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Feedback Form Fields</label>
                                    <button
                                        onClick={() => addFormField(idx)}
                                        className="text-[10px] font-bold uppercase tracking-widest text-[#ff6b3d] hover:text-[#ff8a65] flex items-center gap-1"
                                    >
                                        <Plus className="w-3 h-3" /> Add Question
                                    </button>
                                </div>

                                {stage.feedbackFormFields.length === 0 && (
                                    <p className="text-zinc-700 text-sm italic py-4 text-center">No feedback questions yet. Add questions to create a feedback form.</p>
                                )}

                                {stage.feedbackFormFields.map((field, fIdx) => (
                                    <div key={field.id} className="p-4 bg-black/20 border border-white/5 rounded-xl space-y-3">
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="text"
                                                value={field.label}
                                                onChange={e => updateFormField(idx, fIdx, { label: e.target.value })}
                                                className="bg-transparent text-sm font-bold outline-none flex-1"
                                                placeholder="Question Label"
                                            />
                                            <select
                                                value={field.type}
                                                onChange={e => {
                                                    const type = e.target.value as FeedbackFormField['type'];
                                                    const updates: Partial<FeedbackFormField> = { type };
                                                    if (type === 'select' && !field.options) updates.options = [];
                                                    updateFormField(idx, fIdx, updates);
                                                }}
                                                className="bg-zinc-900 text-[10px] rounded-lg px-3 py-1.5 outline-none border border-white/5"
                                            >
                                                <option value="text">Short Text</option>
                                                <option value="textarea">Long Text</option>
                                                <option value="rating">Star Rating (1-5)</option>
                                                <option value="select">Dropdown</option>
                                            </select>
                                            <label className="flex items-center gap-1.5 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={field.required}
                                                    onChange={e => updateFormField(idx, fIdx, { required: e.target.checked })}
                                                    className="accent-[#ff6b3d] w-3.5 h-3.5"
                                                />
                                                <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Req</span>
                                            </label>
                                            <button onClick={() => removeFormField(idx, fIdx)} className="p-1 text-zinc-600 hover:text-red-400 transition-all">
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>

                                        {/* Options for select type */}
                                        {field.type === 'select' && (
                                            <div className="pl-4 space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[10px] font-black uppercase text-zinc-600 tracking-widest">Options</span>
                                                    <button onClick={() => addFieldOption(idx, fIdx)} className="text-[10px] font-black uppercase text-[#ff6b3d] hover:underline flex items-center gap-1">
                                                        <Plus className="w-3 h-3" /> Add
                                                    </button>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {(field.options || []).map((opt, optIdx) => (
                                                        <div key={optIdx} className="flex items-center gap-1.5 bg-zinc-900 px-3 py-1.5 rounded-lg group/opt">
                                                            <input
                                                                type="text"
                                                                value={opt}
                                                                onChange={e => {
                                                                    const newFields = [...stage.feedbackFormFields];
                                                                    if (newFields[fIdx].options) {
                                                                        newFields[fIdx].options![optIdx] = e.target.value;
                                                                        updateStage(idx, { feedbackFormFields: newFields });
                                                                    }
                                                                }}
                                                                className="bg-transparent text-xs outline-none w-24"
                                                            />
                                                            <button
                                                                onClick={() => removeFieldOption(idx, fIdx, optIdx)}
                                                                className="p-0.5 opacity-0 group-hover/opt:opacity-100 text-zinc-600 hover:text-red-400 transition-all"
                                                            >
                                                                <X className="w-3 h-3" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}

                {/* Add Stage Button */}
                <button
                    onClick={addStage}
                    className="w-full py-4 border-2 border-dashed border-white/5 rounded-2xl text-zinc-600 hover:text-[#ff6b3d] hover:border-[#ff6b3d]/20 transition-all flex items-center justify-center gap-2 font-bold text-sm"
                >
                    <Plus className="w-4 h-4" /> Add Interview Stage
                </button>
            </div>
        </div>
    );
}

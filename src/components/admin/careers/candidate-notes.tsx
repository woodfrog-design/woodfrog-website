'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { MessageSquare, Lightbulb, Users, Save, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CandidateNotesProps {
    applicationId: string;
}

interface NoteState {
    content: string;
    saved: boolean;
    saving: boolean;
}

const NOTE_TYPES = [
    {
        key: 'important_info' as const,
        label: 'Important Information',
        description: 'Key details discussed but not captured in the application form',
        icon: MessageSquare,
        placeholder: 'e.g. Candidate mentioned relocation plans, salary expectations discussed, availability constraints...',
    },
    {
        key: 'overall_experience' as const,
        label: 'Overall Experience',
        description: 'Your general impression and experience with this candidate',
        icon: Users,
        placeholder: 'e.g. Strong communicator, showed genuine enthusiasm, demonstrated deep technical knowledge...',
    },
    {
        key: 'future_fit' as const,
        label: 'Potential Future Fit',
        description: 'Where this candidate might suit in future requirements',
        icon: Lightbulb,
        placeholder: 'e.g. Would be a great fit for the upcoming ML team expansion, consider for senior roles in 6 months...',
    },
];

export default function CandidateNotes({ applicationId }: CandidateNotesProps) {
    const [notes, setNotes] = useState<Record<string, NoteState>>({
        important_info: { content: '', saved: true, saving: false },
        overall_experience: { content: '', saved: true, saving: false },
        future_fit: { content: '', saved: true, saving: false },
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await fetch(`/api/candidates/notes?applicationId=${applicationId}`);
                const data = await res.json();
                if (Array.isArray(data)) {
                    const noteMap: Record<string, NoteState> = { ...notes };
                    data.forEach((note: any) => {
                        noteMap[note.noteType] = { content: note.content || '', saved: true, saving: false };
                    });
                    setNotes(noteMap);
                }
            } catch (err) {
                console.error('Failed to fetch notes:', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchNotes();
    }, [applicationId]);

    const saveNote = useCallback(async (noteType: string) => {
        setNotes(prev => ({
            ...prev,
            [noteType]: { ...prev[noteType], saving: true },
        }));

        try {
            await fetch('/api/candidates/notes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    applicationId,
                    noteType,
                    content: notes[noteType].content,
                }),
            });
            setNotes(prev => ({
                ...prev,
                [noteType]: { ...prev[noteType], saved: true, saving: false },
            }));
        } catch (err) {
            console.error('Failed to save note:', err);
            setNotes(prev => ({
                ...prev,
                [noteType]: { ...prev[noteType], saving: false },
            }));
        }
    }, [applicationId, notes]);

    const handleChange = (noteType: string, content: string) => {
        setNotes(prev => ({
            ...prev,
            [noteType]: { content, saved: false, saving: false },
        }));
    };

    if (isLoading) {
        return (
            <div className="space-y-6">
                {[1, 2, 3].map(i => (
                    <div key={i} className="h-40 rounded-2xl bg-zinc-900 animate-pulse" />
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {NOTE_TYPES.map(({ key, label, description, icon: Icon, placeholder }) => (
                <div key={key} className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#ff6b3d]/10 flex items-center justify-center">
                                <Icon className="w-4 h-4 text-[#ff6b3d]" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold">{label}</h4>
                                <p className="text-[10px] text-zinc-600">{description}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {notes[key].saved && !notes[key].saving && (
                                <span className="text-[10px] text-green-500/70 flex items-center gap-1">
                                    <CheckCircle className="w-3 h-3" /> Saved
                                </span>
                            )}
                            {!notes[key].saved && (
                                <button
                                    onClick={() => saveNote(key)}
                                    disabled={notes[key].saving}
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#ff6b3d] text-white text-[10px] font-bold rounded-lg hover:bg-[#ff8a65] transition-all disabled:opacity-50"
                                >
                                    <Save className="w-3 h-3" />
                                    {notes[key].saving ? 'Saving...' : 'Save'}
                                </button>
                            )}
                        </div>
                    </div>
                    <textarea
                        value={notes[key].content}
                        onChange={e => handleChange(key, e.target.value)}
                        placeholder={placeholder}
                        rows={4}
                        className="w-full bg-transparent px-6 py-4 outline-none resize-none text-sm text-zinc-300 placeholder:text-zinc-700 leading-relaxed"
                    />
                </div>
            ))}
        </div>
    );
}

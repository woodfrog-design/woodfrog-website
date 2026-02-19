'use client';

import React, { useState, useRef } from 'react';
import { Save, X, Plus, Trash2, GripVertical, Bold, Italic, List, ListOrdered, Type } from 'lucide-react';
import { Job } from '@/lib/jobs';
import { cn } from '@/lib/utils';

interface JobEditorProps {
    job?: Job;
    onSave: () => void;
    onCancel: () => void;
}

export default function JobEditor({ job, onSave, onCancel }: JobEditorProps) {
    const [formData, setFormData] = useState<Partial<Job>>(job || {
        title: '',
        slug: '',
        location: 'Remote',
        department: 'Engineering',
        employmentType: 'Full-time',
        experienceLevel: 'Senior',
        description: '',
        formFields: [
            { id: 'resume', label: 'Resume/CV', type: 'file', required: true, maxSize: 5, acceptedTypes: 'application/pdf' },
            { id: 'cover_letter', label: 'Cover Letter', type: 'textarea', required: false }
        ],
        isActive: true
    });
    const [isSaving, setIsSaving] = useState(false);
    const editorRef = useRef<HTMLDivElement>(null);

    const handleSave = async () => {
        setIsSaving(true);
        const finalDescription = editorRef.current?.innerHTML || formData.description;
        try {
            const res = await fetch('/api/jobs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, description: finalDescription })
            });
            if (res.ok) onSave();
        } catch (error) {
            console.error('Save failed', error);
        } finally {
            setIsSaving(false);
        }
    };

    const execCommand = (command: string, value?: string) => {
        document.execCommand(command, false, value);
    };

    const addFormField = () => {
        const newField = { id: `field_${Date.now()}`, label: 'New Field', type: 'text', required: false, options: [], maxSize: 5 };
        setFormData(prev => ({ ...prev, formFields: [...(prev.formFields || []), newField] }));
    };

    const removeField = (id: string) => {
        setFormData(prev => ({ ...prev, formFields: (prev.formFields || []).filter(f => f.id !== id) }));
    };

    const addOption = (fieldIdx: number) => {
        const newFields = [...(formData.formFields || [])];
        if (newFields[fieldIdx]) {
            if (!newFields[fieldIdx].options) newFields[fieldIdx].options = [];
            newFields[fieldIdx].options!.push('New Option');
            setFormData(prev => ({ ...prev, formFields: newFields }));
        }
    };

    const removeOption = (fieldIdx: number, optIdx: number) => {
        const newFields = [...(formData.formFields || [])];
        if (newFields[fieldIdx] && newFields[fieldIdx].options) {
            newFields[fieldIdx].options!.splice(optIdx, 1);
            setFormData(prev => ({ ...prev, formFields: newFields }));
        }
    };

    return (
        <div className="bg-[#0F1113] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col h-full max-h-[85vh]">
            <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-zinc-900/30">
                <h3 className="text-xl font-bold">{job ? 'Update Position' : 'New Opening'}</h3>
                <div className="flex items-center gap-3">
                    <button onClick={onCancel} className="p-2 hover:bg-white/5 rounded-full text-zinc-500 transition-all"><X className="w-6 h-6" /></button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-6 py-2.5 bg-[#ff6b3d] text-white font-bold rounded-full hover:bg-[#ff8a65] transition-all disabled:opacity-50 shadow-[0_10px_20px_rgba(255,107,61,0.2)]"
                    >
                        <Save className="w-4 h-4" /> {isSaving ? 'Saving...' : 'Publish Job'}
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-12">
                {/* Basic Info */}
                <section className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Job Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })}
                                className="w-full bg-zinc-900 border border-white/5 rounded-2xl px-5 py-4 outline-none focus:border-[#ff6b3d]/50 transition-all"
                                placeholder="e.g. Senior Data Scientist"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Slug (URL)</label>
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={e => setFormData({ ...formData, slug: e.target.value })}
                                className="w-full bg-zinc-900 border border-white/5 rounded-2xl px-5 py-4 outline-none focus:border-[#ff6b3d]/50 transition-all text-zinc-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Location</label>
                            <input type="text" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-[#ff6b3d]/50 transition-all" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Department</label>
                            <input type="text" value={formData.department} onChange={e => setFormData({ ...formData, department: e.target.value })} className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-[#ff6b3d]/50 transition-all" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Type</label>
                            <select value={formData.employmentType} onChange={e => setFormData({ ...formData, employmentType: e.target.value })} className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-[#ff6b3d]/50 transition-all">
                                <option>Full-time</option>
                                <option>Part-time</option>
                                <option>Contract</option>
                                <option>Freelance</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Experience</label>
                            <input type="text" value={formData.experienceLevel} onChange={e => setFormData({ ...formData, experienceLevel: e.target.value })} className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-[#ff6b3d]/50 transition-all" />
                        </div>
                    </div>
                </section>

                {/* Rich Text Job Description */}
                <section className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Job Description (Rich Text)</label>
                    <div className="border border-white/5 rounded-3xl overflow-hidden bg-zinc-900/50">
                        <div className="p-3 border-b border-white/5 bg-zinc-900 flex items-center gap-2">
                            <button onClick={() => execCommand('bold')} className="p-2 hover:bg-white/5 rounded text-zinc-400 hover:text-white" title="Bold"><Bold className="w-4 h-4" /></button>
                            <button onClick={() => execCommand('italic')} className="p-2 hover:bg-white/5 rounded text-zinc-400 hover:text-white" title="Italic"><Italic className="w-4 h-4" /></button>
                            <div className="w-[1px] h-4 bg-white/10 mx-1" />
                            <button onClick={() => execCommand('insertUnorderedList')} className="p-2 hover:bg-white/5 rounded text-zinc-400 hover:text-white" title="Bullet List"><List className="w-4 h-4" /></button>
                            <button onClick={() => execCommand('insertOrderedList')} className="p-2 hover:bg-white/5 rounded text-zinc-400 hover:text-white" title="Numbered List"><ListOrdered className="w-4 h-4" /></button>
                            <div className="w-[1px] h-4 bg-white/10 mx-1" />
                            <button onClick={() => execCommand('formatBlock', '<h2>')} className="p-2 hover:bg-white/5 rounded text-zinc-400 hover:text-white font-bold" title="H2">H2</button>
                            <button onClick={() => execCommand('formatBlock', '<h3>')} className="p-2 hover:bg-white/5 rounded text-zinc-400 hover:text-white font-bold" title="H3">H3</button>
                        </div>
                        <div
                            ref={editorRef}
                            contentEditable
                            dangerouslySetInnerHTML={{ __html: formData.description || '' }}
                            onBlur={(e) => setFormData({ ...formData, description: e.currentTarget.innerHTML })}
                            className="p-8 min-h-[400px] outline-none prose prose-invert prose-orange max-w-none text-zinc-400 text-lg leading-relaxed focus:bg-white/[0.02] transition-colors"
                        />
                    </div>
                </section>

                {/* Custom Form Fields */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Application Form Fields</label>
                        <button
                            onClick={addFormField}
                            className="text-[10px] font-bold uppercase tracking-widest text-[#ff6b3d] hover:text-[#ff8a65] flex items-center gap-1"
                        >
                            <Plus className="w-3 h-3" /> Add Question
                        </button>
                    </div>

                    <div className="space-y-6">
                        {formData.formFields?.map((field, idx) => (
                            <div key={field.id} className="p-6 bg-zinc-900/50 border border-white/5 rounded-[2rem] space-y-4 relative group">
                                <div className="flex items-center gap-4">
                                    <GripVertical className="w-4 h-4 text-zinc-700 cursor-grab" />
                                    <input
                                        type="text"
                                        value={field.label}
                                        onChange={e => {
                                            const newFields = [...(formData.formFields || [])];
                                            newFields[idx].label = e.target.value;
                                            setFormData({ ...formData, formFields: newFields });
                                        }}
                                        className="bg-transparent text-lg font-bold outline-none flex-1"
                                        placeholder="Question Label"
                                    />
                                    <select
                                        value={field.type}
                                        onChange={e => {
                                            const newFields = [...(formData.formFields || [])];
                                            newFields[idx].type = e.target.value;
                                            if (e.target.value === 'select' && !newFields[idx].options) newFields[idx].options = [];
                                            if (e.target.value === 'file') {
                                                newFields[idx].maxSize = 5;
                                                newFields[idx].acceptedTypes = 'application/pdf';
                                            }
                                            setFormData({ ...formData, formFields: newFields });
                                        }}
                                        className="bg-zinc-900 text-xs rounded-lg px-4 py-2 outline-none border border-white/5"
                                    >
                                        <option value="text">Short Text</option>
                                        <option value="textarea">Long Text</option>
                                        <option value="file">File Upload (PDF)</option>
                                        <option value="select">Selection / Dropdown</option>
                                    </select>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={field.required}
                                            onChange={e => {
                                                const newFields = [...(formData.formFields || [])];
                                                newFields[idx].required = e.target.checked;
                                                setFormData({ ...formData, formFields: newFields });
                                            }}
                                            className="accent-[#ff6b3d] w-4 h-4"
                                        />
                                        <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Required</span>
                                    </div>
                                    <button onClick={() => removeField(field.id)} className="p-2 text-zinc-600 hover:text-red-400 transition-all"><Trash2 className="w-4 h-4" /></button>
                                </div>

                                {/* Advanced Settings for File Upload */}
                                {field.type === 'file' && (
                                    <div className="pl-8 flex items-center gap-6 text-xs text-zinc-500 bg-black/20 p-4 rounded-xl border border-white/5">
                                        <div className="flex items-center gap-2">
                                            <span>Max Size:</span>
                                            <input
                                                type="number"
                                                value={field.maxSize || 5}
                                                onChange={e => {
                                                    const newFields = [...(formData.formFields || [])];
                                                    newFields[idx].maxSize = parseInt(e.target.value);
                                                    setFormData({ ...formData, formFields: newFields });
                                                }}
                                                className="w-16 bg-zinc-900 border border-white/5 rounded px-2 py-1 outline-none focus:border-[#ff6b3d]"
                                            />
                                            <span>MB</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span>Accepted:</span>
                                            <span className="px-2 py-0.5 bg-zinc-800 rounded font-mono text-[10px]">PDF only</span>
                                        </div>
                                    </div>
                                )}

                                {/* Advanced Settings for Select Fields */}
                                {field.type === 'select' && (
                                    <div className="pl-8 space-y-3 bg-black/20 p-6 rounded-2xl border border-white/5">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Options</span>
                                            <button onClick={() => addOption(idx)} className="text-[10px] font-black uppercase text-[#ff6b3d] hover:underline flex items-center gap-1">
                                                <Plus className="w-3 h-3" /> Add Option
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                            {(field.options || []).map((opt: string, optIdx: number) => (
                                                <div key={optIdx} className="flex items-center gap-2 bg-zinc-900 p-2 rounded-xl group/opt">
                                                    <input
                                                        type="text"
                                                        value={opt}
                                                        onChange={e => {
                                                            const newFields = [...(formData.formFields || [])];
                                                            if (newFields[idx].options) {
                                                                newFields[idx].options![optIdx] = e.target.value;
                                                                setFormData(prev => ({ ...prev, formFields: newFields }));
                                                            }
                                                        }}
                                                        className="bg-transparent text-sm flex-1 outline-none"
                                                    />
                                                    <button onClick={() => removeOption(idx, optIdx)} className="p-1 opacity-0 group-hover/opt:opacity-100 text-zinc-600 hover:text-red-400 transition-all"><X className="w-3 h-3" /></button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

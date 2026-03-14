'use client';

import React, { useState, useRef } from 'react';
import { Save, X, Plus, Trash2, GripVertical, Bold, Italic, List, ListOrdered, ChevronLeft } from 'lucide-react';
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

    const fieldTypeOptions = [
        { value: 'text', label: 'Short Text' },
        { value: 'textarea', label: 'Long Text' },
        { value: 'email', label: 'Email' },
        { value: 'number', label: 'Number' },
        { value: 'url', label: 'URL / Link' },
        { value: 'date', label: 'Date' },
        { value: 'phone', label: 'Phone Number' },
        { value: 'file', label: 'File Upload (PDF)' },
        { value: 'select', label: 'Dropdown' },
        { value: 'radio', label: 'Radio Buttons' },
        { value: 'checkbox', label: 'Checkboxes' },
    ];

    return (
        <div className="flex flex-col h-full">
            {/* ── Sticky Header ── */}
            <div className="flex items-center justify-between pb-6 border-b border-white/5 mb-8 flex-shrink-0">
                <div className="flex items-center gap-4">
                    <button onClick={onCancel} className="flex items-center gap-1.5 text-zinc-500 hover:text-white transition-all text-sm font-bold group">
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <h2 className="text-2xl font-bold">{job ? 'Edit Position' : 'New Opening'}</h2>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={onCancel} className="px-5 py-2.5 hover:bg-white/5 rounded-xl text-zinc-500 hover:text-white transition-all text-sm font-bold">
                        Cancel
                    </button>
                    <button onClick={handleSave} disabled={isSaving}
                        className="flex items-center gap-2 px-6 py-2.5 bg-[#ff6b3d] text-white font-bold rounded-xl hover:bg-[#ff8a65] transition-all disabled:opacity-50 shadow-[0_10px_20px_rgba(255,107,61,0.2)]">
                        <Save className="w-4 h-4" /> {isSaving ? 'Saving...' : 'Publish Job'}
                    </button>
                </div>
            </div>

            {/* ── Scrollable Content ── */}
            <div className="flex-1 overflow-y-auto space-y-10 pb-10">
                {/* Basic Info */}
                <section className="space-y-6">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Job Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Job Title</label>
                            <input type="text" value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })}
                                className="w-full bg-zinc-900 border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-[#ff6b3d]/50 transition-all"
                                placeholder="e.g. Senior Data Scientist" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Slug (URL)</label>
                            <input type="text" value={formData.slug}
                                onChange={e => setFormData({ ...formData, slug: e.target.value })}
                                className="w-full bg-zinc-900 border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-[#ff6b3d]/50 transition-all text-zinc-500" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Location</label>
                            <input type="text" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })}
                                className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-[#ff6b3d]/50 transition-all" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Department</label>
                            <input type="text" value={formData.department} onChange={e => setFormData({ ...formData, department: e.target.value })}
                                className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-[#ff6b3d]/50 transition-all" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Type</label>
                            <select value={formData.employmentType} onChange={e => setFormData({ ...formData, employmentType: e.target.value })}
                                className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-[#ff6b3d]/50 transition-all">
                                <option>Full-time</option><option>Part-time</option><option>Contract</option><option>Freelance</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Experience</label>
                            <input type="text" value={formData.experienceLevel} onChange={e => setFormData({ ...formData, experienceLevel: e.target.value })}
                                className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-[#ff6b3d]/50 transition-all" />
                        </div>
                    </div>
                </section>

                <div className="h-[1px] w-full bg-white/5" />

                {/* Rich Text Job Description */}
                <section className="space-y-4">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Job Description</h3>
                    <div className="border border-white/5 rounded-2xl overflow-hidden bg-zinc-900/30">
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
                        <div ref={editorRef} contentEditable
                            dangerouslySetInnerHTML={{ __html: formData.description || '' }}
                            onBlur={(e) => setFormData({ ...formData, description: e.currentTarget.innerHTML })}
                            className="p-8 min-h-[300px] outline-none prose prose-invert prose-orange max-w-none text-zinc-400 text-lg leading-relaxed focus:bg-white/[0.02] transition-colors" />
                    </div>
                </section>

                <div className="h-[1px] w-full bg-white/5" />

                {/* Custom Form Fields */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Application Form Fields</h3>
                            <p className="text-xs text-zinc-700 mt-1">Customize what information applicants need to provide.</p>
                        </div>
                        <button onClick={addFormField}
                            className="flex items-center gap-2 px-4 py-2 bg-[#ff6b3d]/10 text-[#ff6b3d] border border-[#ff6b3d]/20 rounded-xl text-xs font-bold hover:bg-[#ff6b3d]/20 transition-all">
                            <Plus className="w-3.5 h-3.5" /> Add Field
                        </button>
                    </div>

                    <div className="space-y-4">
                        {formData.formFields?.map((field, idx) => (
                            <div key={field.id} className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-4 group hover:border-white/10 transition-all">
                                <div className="flex items-center gap-4">
                                    <GripVertical className="w-4 h-4 text-zinc-700 cursor-grab flex-shrink-0" />
                                    <input type="text" value={field.label}
                                        onChange={e => {
                                            const newFields = [...(formData.formFields || [])];
                                            newFields[idx].label = e.target.value;
                                            newFields[idx].id = e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '_');
                                            setFormData({ ...formData, formFields: newFields });
                                        }}
                                        className="bg-transparent text-sm font-bold outline-none flex-1" placeholder="Field Label" />
                                    <select value={field.type}
                                        onChange={e => {
                                            const newFields = [...(formData.formFields || [])];
                                            newFields[idx].type = e.target.value;
                                            if (['select', 'radio', 'checkbox'].includes(e.target.value) && !newFields[idx].options) newFields[idx].options = [];
                                            if (e.target.value === 'file') { newFields[idx].maxSize = 5; newFields[idx].acceptedTypes = 'application/pdf'; }
                                            setFormData({ ...formData, formFields: newFields });
                                        }}
                                        className="bg-zinc-900 text-[10px] font-bold uppercase tracking-wider rounded-lg px-3 py-2 outline-none border border-white/5">
                                        {fieldTypeOptions.map(opt => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" checked={field.required}
                                            onChange={e => {
                                                const newFields = [...(formData.formFields || [])];
                                                newFields[idx].required = e.target.checked;
                                                setFormData({ ...formData, formFields: newFields });
                                            }}
                                            className="accent-[#ff6b3d] w-3.5 h-3.5" />
                                        <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Required</span>
                                    </label>
                                    <button onClick={() => removeField(field.id)} className="p-2 text-zinc-700 hover:text-red-400 transition-all opacity-0 group-hover:opacity-100">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* File Upload Settings */}
                                {field.type === 'file' && (
                                    <div className="ml-8 flex items-center gap-6 text-xs text-zinc-500 bg-white/[0.02] p-4 rounded-xl border border-white/5">
                                        <div className="flex items-center gap-2">
                                            <span>Max Size:</span>
                                            <input type="number" value={field.maxSize || 5}
                                                onChange={e => {
                                                    const newFields = [...(formData.formFields || [])];
                                                    newFields[idx].maxSize = parseInt(e.target.value);
                                                    setFormData({ ...formData, formFields: newFields });
                                                }}
                                                className="w-16 bg-zinc-900 border border-white/5 rounded px-2 py-1 outline-none focus:border-[#ff6b3d]" />
                                            <span>MB</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span>Accepted:</span>
                                            <span className="px-2 py-0.5 bg-zinc-800 rounded font-mono text-[10px]">PDF only</span>
                                        </div>
                                    </div>
                                )}

                                {/* Options for Select / Radio / Checkbox */}
                                {['select', 'radio', 'checkbox'].includes(field.type) && (
                                    <div className="ml-8 space-y-3 bg-white/[0.02] p-5 rounded-xl border border-white/5">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Options</span>
                                            <button onClick={() => addOption(idx)} className="text-[10px] font-black uppercase text-[#ff6b3d] hover:underline flex items-center gap-1">
                                                <Plus className="w-3 h-3" /> Add Option
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                            {(field.options || []).map((opt: string, optIdx: number) => (
                                                <div key={optIdx} className="flex items-center gap-2 bg-zinc-900 p-2 rounded-xl group/opt">
                                                    {field.type === 'radio' && <div className="w-3 h-3 rounded-full border-2 border-zinc-600 flex-shrink-0" />}
                                                    {field.type === 'checkbox' && <div className="w-3 h-3 rounded border-2 border-zinc-600 flex-shrink-0" />}
                                                    <input type="text" value={opt}
                                                        onChange={e => {
                                                            const newFields = [...(formData.formFields || [])];
                                                            if (newFields[idx].options) {
                                                                newFields[idx].options![optIdx] = e.target.value;
                                                                setFormData(prev => ({ ...prev, formFields: newFields }));
                                                            }
                                                        }}
                                                        className="bg-transparent text-sm flex-1 outline-none" />
                                                    <button onClick={() => removeOption(idx, optIdx)} className="p-1 opacity-0 group-hover/opt:opacity-100 text-zinc-600 hover:text-red-400 transition-all">
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Preview hint for special types */}
                                {field.type === 'email' && (
                                    <div className="ml-8 text-[10px] text-zinc-600 flex items-center gap-2">
                                        <span className="px-2 py-0.5 bg-zinc-900 rounded text-zinc-500">Validates email format automatically</span>
                                    </div>
                                )}
                                {field.type === 'url' && (
                                    <div className="ml-8 text-[10px] text-zinc-600 flex items-center gap-2">
                                        <span className="px-2 py-0.5 bg-zinc-900 rounded text-zinc-500">Accepts URLs (portfolio links, LinkedIn, etc.)</span>
                                    </div>
                                )}
                                {field.type === 'phone' && (
                                    <div className="ml-8 text-[10px] text-zinc-600 flex items-center gap-2">
                                        <span className="px-2 py-0.5 bg-zinc-900 rounded text-zinc-500">Phone number input</span>
                                    </div>
                                )}
                            </div>
                        ))}

                        {(!formData.formFields || formData.formFields.length === 0) && (
                            <div className="text-center py-12 border-2 border-dashed border-white/5 rounded-2xl">
                                <p className="text-zinc-600 text-sm">No form fields yet. Click "Add Field" to start building your application form.</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}

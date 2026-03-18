'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Save, X, Plus, Trash2, GripVertical, Bold, Italic, List, ListOrdered, ChevronLeft, ChevronUp, ChevronDown } from 'lucide-react';
import { Job } from '@/lib/jobs';
import { cn } from '@/lib/utils';

interface JobEditorProps {
    job?: Job;
    onSave: () => void;
    onCancel: () => void;
}

// Editable dropdown that lets you pick or create new options
function EditableSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (val: string) => void }) {
    const [isAdding, setIsAdding] = useState(false);
    const [newValue, setNewValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleAddNew = () => {
        const trimmed = newValue.trim();
        if (trimmed) {
            onChange(trimmed);
            setNewValue('');
            setIsAdding(false);
        }
    };

    return (
        <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">{label}</label>
            {isAdding ? (
                <div className="flex gap-2">
                    <input ref={inputRef} autoFocus type="text" value={newValue}
                        onChange={e => setNewValue(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') handleAddNew(); if (e.key === 'Escape') setIsAdding(false); }}
                        placeholder={`New ${label.toLowerCase()}...`}
                        className="flex-1 bg-zinc-900 border border-[#ff6b3d]/30 rounded-xl px-4 py-3 outline-none focus:border-[#ff6b3d]/50 transition-all text-sm" />
                    <button onClick={handleAddNew} className="px-4 py-2 bg-[#ff6b3d]/20 text-[#ff6b3d] rounded-xl text-xs font-bold hover:bg-[#ff6b3d]/30 transition-all">Add</button>
                    <button onClick={() => setIsAdding(false)} className="px-3 py-2 bg-white/5 text-zinc-500 rounded-xl text-xs font-bold hover:bg-white/10 transition-all">✕</button>
                </div>
            ) : (
                <select value={value} onChange={e => {
                    if (e.target.value === '__add_new__') {
                        setIsAdding(true);
                        setTimeout(() => inputRef.current?.focus(), 50);
                    } else {
                        onChange(e.target.value);
                    }
                }}
                    className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-[#ff6b3d]/50 transition-all appearance-none cursor-pointer">
                    {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    <option value="__add_new__" className="text-[#ff6b3d]">+ Add New {label}</option>
                </select>
            )}
        </div>
    );
}

export default function JobEditor({ job, onSave, onCancel }: JobEditorProps) {
    const [formData, setFormData] = useState<Partial<Job>>(() => {
        if (job) return { ...job };
        return {
            title: '',
            slug: '',
            location: '',
            department: 'Engineering',
            employmentType: 'Full-time',
            experienceLevel: 'Senior',
            workMode: 'Remote',
            description: '',
            descriptionSections: [],
            formFields: [
                { id: 'full_name', label: 'Full Name', type: 'text', required: true },
                { id: 'email_address', label: 'Email Address', type: 'email', required: true },
                { id: 'phone_number', label: 'Phone Number', type: 'phone', required: false },
                { id: 'address', label: 'Address', type: 'textarea', required: false },
                { id: 'resume', label: 'Resume/CV', type: 'file', required: true, maxSize: 5, acceptedTypes: 'application/pdf' },
                { id: 'cover_letter', label: 'Cover Letter', type: 'textarea', required: false }
            ],
            isActive: true
        } as Job;
    });
    const [isSaving, setIsSaving] = useState(false);
    const [showQuickAdd, setShowQuickAdd] = useState(false);
    const quickAddRef = useRef<HTMLDivElement>(null);
    const editorRef = useRef<HTMLDivElement>(null);

    // Close Quick Add dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (quickAddRef.current && !quickAddRef.current.contains(e.target as Node)) {
                setShowQuickAdd(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        // If we have sections, description might be empty or used as a fallback
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
        const newField = { id: `field_${Date.now()}`, label: '', type: 'text', required: false, options: [], maxSize: 5 };
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

    const addSection = () => {
        const newSection = { id: `section_${Date.now()}`, title: '', content: '' };
        setFormData(prev => ({ ...prev, descriptionSections: [...(prev.descriptionSections || []), newSection] }));
    };

    const removeSection = (id: string) => {
        setFormData(prev => ({ ...prev, descriptionSections: (prev.descriptionSections || []).filter(s => s.id !== id) }));
    };

    const updateSection = (id: string, updates: any) => {
        setFormData(prev => ({
            ...prev,
            descriptionSections: (prev.descriptionSections || []).map(s => s.id === id ? { ...s, ...updates } : s)
        }));
    };

    const moveSection = (idx: number, direction: 'up' | 'down') => {
        const sections = [...(formData.descriptionSections || [])];
        const target = direction === 'up' ? idx - 1 : idx + 1;
        if (target < 0 || target >= sections.length) return;
        [sections[idx], sections[target]] = [sections[target], sections[idx]];
        setFormData(prev => ({ ...prev, descriptionSections: sections }));
    };

    const moveField = (idx: number, direction: 'up' | 'down') => {
        const fields = [...(formData.formFields || [])];
        const target = direction === 'up' ? idx - 1 : idx + 1;
        if (target < 0 || target >= fields.length) return;
        [fields[idx], fields[target]] = [fields[target], fields[idx]];
        setFormData(prev => ({ ...prev, formFields: fields }));
    };

    const basicDetailPresets = [
        { label: 'Naukri URL', type: 'url', required: false },
        { label: 'Current Company', type: 'text', required: false },
        { label: 'Years of Experience', type: 'number', required: false },
    ];

    const addBasicDetailField = (preset: typeof basicDetailPresets[0]) => {
        const newField = { id: `field_${Date.now()}`, label: preset.label, type: preset.type, required: preset.required, options: [], maxSize: 5 };
        setFormData(prev => ({ ...prev, formFields: [...(prev.formFields || []), newField] }));
    };

    // Only show presets that aren't already in the form
    const existingLabels = (formData.formFields || []).map(f => f.label.toLowerCase());
    const availablePresets = basicDetailPresets.filter(p => !existingLabels.includes(p.label.toLowerCase()));

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

    // --- Custom Dropdown with "Add New" ---
    const getStoredOptions = (key: string, defaults: string[]): string[] => {
        if (typeof window === 'undefined') return defaults;
        try {
            const stored = localStorage.getItem(`woodfrog_options_${key}`);
            if (stored) {
                const parsed = JSON.parse(stored) as string[];
                // Merge defaults + custom, deduped
                const merged = [...new Set([...defaults, ...parsed])];
                return merged;
            }
        } catch {}
        return defaults;
    };

    const saveCustomOption = (key: string, defaults: string[], newVal: string) => {
        if (typeof window === 'undefined') return;
        const current = getStoredOptions(key, defaults);
        if (!current.includes(newVal)) {
            const customs = current.filter(v => !defaults.includes(v));
            customs.push(newVal);
            localStorage.setItem(`woodfrog_options_${key}`, JSON.stringify([...defaults, ...customs]));
        }
    };

    const employmentDefaults = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'];
    const workModeDefaults = ['Remote', 'On-site', 'Hybrid'];
    const departmentDefaults = ['Engineering', 'Design', 'Marketing', 'Sales', 'Operations', 'HR', 'Finance', 'Data Science'];

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
                {/* Position Details */}
                <section className="space-y-6">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Position Details</h3>
                    
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
                            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Location (City)</label>
                            <input type="text" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })}
                                placeholder="e.g. San Francisco"
                                className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-[#ff6b3d]/50 transition-all" />
                        </div>
                        <EditableSelect label="Employment Type" value={formData.employmentType || ''}
                            options={getStoredOptions('employmentType', employmentDefaults)}
                            onChange={val => { setFormData({ ...formData, employmentType: val }); saveCustomOption('employmentType', employmentDefaults, val); }} />
                        <EditableSelect label="Work Mode" value={formData.workMode || ''}
                            options={getStoredOptions('workMode', workModeDefaults)}
                            onChange={val => { setFormData({ ...formData, workMode: val }); saveCustomOption('workMode', workModeDefaults, val); }} />
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Experience Level</label>
                            <input type="text" value={formData.experienceLevel} onChange={e => setFormData({ ...formData, experienceLevel: e.target.value })}
                                placeholder="e.g. Senior"
                                className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-[#ff6b3d]/50 transition-all" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <EditableSelect label="Department" value={formData.department || ''}
                            options={getStoredOptions('department', departmentDefaults)}
                            onChange={val => { setFormData({ ...formData, department: val }); saveCustomOption('department', departmentDefaults, val); }} />
                    </div>
                </section>

                <div className="h-[1px] w-full bg-white/5" />

                {/* Structured Job Description Sections */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Detailed Description Sections</h3>
                            <p className="text-xs text-zinc-700 mt-1">Add logically separated blocks (e.g. About Company, Key Requirements, Benefits).</p>
                        </div>
                        <button onClick={addSection}
                            className="flex items-center gap-2 px-4 py-2 bg-[#ff6b3d]/10 text-[#ff6b3d] border border-[#ff6b3d]/20 rounded-xl text-xs font-bold hover:bg-[#ff6b3d]/20 transition-all">
                            <Plus className="w-3.5 h-3.5" /> Add Section
                        </button>
                    </div>

                    <div className="space-y-8">
                        {(formData.descriptionSections || []).map((section, idx) => (
                            <div key={section.id} className="space-y-4 bg-zinc-900/40 border border-white/5 p-6 rounded-[2rem] group relative">
                                <div className="flex items-center gap-4">
                                    <div className="flex-1 space-y-1">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-700 ml-1">Section Title</label>
                                        <input type="text" value={section.title}
                                            onChange={e => updateSection(section.id, { title: e.target.value })}
                                            className="w-full bg-transparent text-xl font-bold outline-none text-white focus:text-[#ff6b3d] transition-colors"
                                            placeholder="e.g. About Woodfrog" />
                                    </div>
                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                        <button onClick={() => moveSection(idx, 'up')} disabled={idx === 0}
                                            className="p-1.5 text-zinc-600 hover:text-white disabled:opacity-20 transition-all" title="Move Up">
                                            <ChevronUp className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => moveSection(idx, 'down')} disabled={idx === (formData.descriptionSections || []).length - 1}
                                            className="p-1.5 text-zinc-600 hover:text-white disabled:opacity-20 transition-all" title="Move Down">
                                            <ChevronDown className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => removeSection(section.id)} className="p-1.5 text-zinc-700 hover:text-red-400 transition-all" title="Delete">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="border border-white/5 rounded-2xl overflow-hidden bg-zinc-900/30">
                                    <div className="p-2 border-b border-white/5 bg-zinc-900/50 flex items-center gap-1">
                                        <button onMouseDown={(e) => { e.preventDefault(); execCommand('bold'); }} className="p-1.5 hover:bg-white/5 rounded text-zinc-400 hover:text-white" title="Bold"><Bold className="w-3.5 h-3.5" /></button>
                                        <button onMouseDown={(e) => { e.preventDefault(); execCommand('italic'); }} className="p-1.5 hover:bg-white/5 rounded text-zinc-400 hover:text-white" title="Italic"><Italic className="w-3.5 h-3.5" /></button>
                                        <div className="w-[1px] h-4 bg-white/10 mx-1" />
                                        <button onMouseDown={(e) => { e.preventDefault(); execCommand('insertUnorderedList'); }} className="p-1.5 hover:bg-white/5 rounded text-zinc-400 hover:text-white" title="Bullet List"><List className="w-3.5 h-3.5" /></button>
                                        <button onMouseDown={(e) => { e.preventDefault(); execCommand('insertOrderedList'); }} className="p-1.5 hover:bg-white/5 rounded text-zinc-400 hover:text-white" title="Numbered List"><ListOrdered className="w-3.5 h-3.5" /></button>
                                    </div>
                                    <div contentEditable
                                        dangerouslySetInnerHTML={{ __html: section.content }}
                                        onBlur={(e) => updateSection(section.id, { content: e.currentTarget.innerHTML })}
                                        className="p-6 min-h-[150px] outline-none prose prose-invert prose-orange max-w-none text-zinc-400 text-base leading-relaxed focus:bg-white/[0.02] transition-colors" />
                                </div>
                            </div>
                        ))}

                        {/* Legacy Description Fallback if no sections */}
                        {(!formData.descriptionSections || formData.descriptionSections.length === 0) && (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">General Description</h3>
                                    <span className="text-[10px] text-zinc-700 italic">No sections created yet. Using legacy description.</span>
                                </div>
                                <div className="border border-white/5 rounded-2xl overflow-hidden bg-zinc-900/30">
                                    <div className="p-3 border-b border-white/5 bg-zinc-900 flex items-center gap-2">
                                        <button onMouseDown={(e) => { e.preventDefault(); execCommand('bold'); }} className="p-2 hover:bg-white/5 rounded text-zinc-400 hover:text-white" title="Bold"><Bold className="w-4 h-4" /></button>
                                        <button onMouseDown={(e) => { e.preventDefault(); execCommand('italic'); }} className="p-2 hover:bg-white/5 rounded text-zinc-400 hover:text-white" title="Italic"><Italic className="w-4 h-4" /></button>
                                        <div className="w-[1px] h-4 bg-white/10 mx-1" />
                                        <button onMouseDown={(e) => { e.preventDefault(); execCommand('insertUnorderedList'); }} className="p-2 hover:bg-white/5 rounded text-zinc-400 hover:text-white" title="Bullet List"><List className="w-4 h-4" /></button>
                                        <button onMouseDown={(e) => { e.preventDefault(); execCommand('insertOrderedList'); }} className="p-2 hover:bg-white/5 rounded text-zinc-400 hover:text-white" title="Numbered List"><ListOrdered className="w-4 h-4" /></button>
                                    </div>
                                    <div ref={editorRef} contentEditable
                                        dangerouslySetInnerHTML={{ __html: formData.description || '' }}
                                        onBlur={(e) => setFormData({ ...formData, description: e.currentTarget.innerHTML })}
                                        className="p-8 min-h-[300px] outline-none prose prose-invert prose-orange max-w-none text-zinc-400 text-lg leading-relaxed focus:bg-white/[0.02] transition-colors" />
                                </div>
                            </div>
                        )}
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
                        <div className="flex items-center gap-2">
                            <div className="relative" ref={quickAddRef}>
                                <button onClick={() => setShowQuickAdd(!showQuickAdd)}
                                    className={cn("flex items-center gap-2 px-4 py-2 border rounded-xl text-xs font-bold transition-all",
                                        showQuickAdd ? 'bg-white/10 text-white border-white/10' : 'bg-white/5 text-zinc-400 border-white/5 hover:bg-white/10')}>
                                    <Plus className="w-3.5 h-3.5" /> Quick Add
                                </button>
                                {showQuickAdd && (
                                    <div className="absolute right-0 top-full mt-2 w-56 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl p-2 z-50">
                                        {availablePresets.length > 0 ? availablePresets.map(preset => (
                                            <button key={preset.label} onClick={() => { addBasicDetailField(preset); }}
                                                className="w-full text-left px-4 py-2.5 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all flex items-center justify-between">
                                                <span>{preset.label}</span>
                                                <span className="text-[10px] uppercase tracking-wider text-zinc-700">{preset.type}</span>
                                            </button>
                                        )) : (
                                            <p className="text-center text-xs text-zinc-600 py-4">All preset fields are already added</p>
                                        )}
                                    </div>
                                )}
                            </div>
                            <button onClick={addFormField}
                                className="flex items-center gap-2 px-4 py-2 bg-[#ff6b3d]/10 text-[#ff6b3d] border border-[#ff6b3d]/20 rounded-xl text-xs font-bold hover:bg-[#ff6b3d]/20 transition-all">
                                <Plus className="w-3.5 h-3.5" /> Custom Field
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {formData.formFields?.map((field, idx) => (
                            <div key={field.id} className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-4 group hover:border-white/10 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="flex flex-col gap-0.5">
                                        <button onClick={() => moveField(idx, 'up')} disabled={idx === 0}
                                            className="p-0.5 text-zinc-700 hover:text-white disabled:opacity-20 transition-all" title="Move Up">
                                            <ChevronUp className="w-3.5 h-3.5" />
                                        </button>
                                        <button onClick={() => moveField(idx, 'down')} disabled={idx === (formData.formFields || []).length - 1}
                                            className="p-0.5 text-zinc-700 hover:text-white disabled:opacity-20 transition-all" title="Move Down">
                                            <ChevronDown className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                    <input type="text" value={field.label}
                                        onChange={e => {
                                            const newFields = [...(formData.formFields || [])];
                                            newFields[idx] = { ...newFields[idx], label: e.target.value };
                                            setFormData(prev => ({ ...prev, formFields: newFields }));
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

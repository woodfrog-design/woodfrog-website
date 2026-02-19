'use client';

import React, { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import { Plus, GripVertical, Trash2, Bold, Italic, Type, Image as LucideImage, Code, Eye, Save, PanelLeft, PanelRight, Columns2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BlogContent, Blog } from '@/lib/blogs';

interface Block extends BlogContent {
    id: string;
}

export default function BlockEditor({ blog }: { blog?: Blog }) {
    const [id, setId] = useState(blog?.id || crypto.randomUUID());
    const [title, setTitle] = useState(blog?.title || 'New Blog Post');
    const [excerpt, setExcerpt] = useState(blog?.excerpt || 'Write a short summary here...');
    const [authorName, setAuthorName] = useState(blog?.author.name || 'Woodfrog Team');
    const [authorAvatar, setAuthorAvatar] = useState(blog?.author.avatar || '');
    const [coverImage, setCoverImage] = useState(blog?.coverImage || '');
    const [categories, setCategories] = useState<string[]>(blog?.categories || ['Design']);
    const [isFeatured, setIsFeatured] = useState(blog?.isFeatured || false);
    const [blocks, setBlocks] = useState<Block[]>((blog?.content as Block[]) || [
        { id: '1', type: 'heading', level: 1, content: 'Introduction' },
        { id: '2', type: 'paragraph', content: 'Start writing your amazing story...' }
    ]);

    // Reset editor when switching blogs
    React.useEffect(() => {
        if (blog) {
            setId(blog.id);
            setTitle(blog.title);
            setExcerpt(blog.excerpt);
            setAuthorName(blog.author.name);
            setAuthorAvatar(blog.author.avatar);
            setCoverImage(blog.coverImage);
            setCategories(blog.categories);
            setIsFeatured(blog.isFeatured || false);
            setBlocks(blog.content as Block[]);
            setIsDirty(false);
            setLastSaved(new Date(blog.date));
        }
    }, [blog]);

    const [previewMode, setPreviewMode] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const [isDirty, setIsDirty] = useState(false);

    const fileInputRefs = React.useRef<{ [key: string]: HTMLInputElement | null }>({});

    // Tracking changes to set dirty state
    React.useEffect(() => {
        setIsDirty(true);
    }, [blocks, title, excerpt, authorName, authorAvatar, coverImage, categories, isFeatured]);

    const addBlock = (type: Block['type']) => {
        const newBlock: Block = {
            id: crypto.randomUUID(),
            type,
            content: '',
            text: '',
            ...(type === 'heading' ? { level: 2 } : {}),
            ...(type === 'image' || type === 'image-text' || type === 'text-image' ? { src: '', alt: '' } : {}),
            ...(type === 'table' ? { rows: [['Header 1', 'Header 2'], ['Cell 1', 'Cell 2']] } : {})
        };
        setBlocks([...blocks, newBlock]);
    };

    const updateBlock = (id: string, updates: Partial<Block>) => {
        setBlocks(blocks.map(b => b.id === id ? { ...b, ...updates } : b));
    };

    const removeBlock = (id: string) => {
        setBlocks(blocks.filter(b => b.id !== id));
    };

    const handleImageUpload = (file: File, callback: (src: string) => void) => {
        const reader = new FileReader();
        reader.onloadend = () => callback(reader.result as string);
        reader.readAsDataURL(file);
    };

    const handleSave = async () => {
        setIsSaving(true);

        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

        const blogData: Blog = {
            id,
            title,
            slug,
            excerpt,
            coverImage: coverImage || 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop',
            date: new Date().toISOString(),
            author: {
                name: authorName,
                avatar: authorAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop'
            },
            categories,
            isFeatured,
            content: blocks
        };

        try {
            const res = await fetch('/api/blogs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(blogData)
            });

            if (res.ok) {
                setLastSaved(new Date());
                setIsDirty(false);
                setSaveSuccess(true);
                setTimeout(() => setSaveSuccess(false), 3000);
            }
        } catch (error) {
            console.error('Save failed', error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="flex flex-col h-full text-white relative">
            {/* Preview Overlay */}
            {previewMode && (
                <div className="absolute inset-0 z-50 bg-[#0A0A0A] overflow-y-auto">
                    {/* Floating Close button top right - maybe redundant now with the one in-page */}
                    <div className="fixed top-8 right-8 z-[60]">
                        <button
                            onClick={() => setPreviewMode(false)}
                            className="bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white px-5 py-2.5 rounded-full font-bold shadow-2xl transition-all flex items-center gap-2 border border-white/10"
                        >
                            Close Preview
                        </button>
                    </div>

                    {/* Simulated Blog Detail Page Layout */}
                    <div className="max-w-4xl mx-auto py-32 px-6">
                        <div className="mb-12 flex items-center gap-2 pt-8 border-t border-white/5">
                            <button
                                onClick={() => setPreviewMode(false)}
                                className="text-zinc-500 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
                            >
                                ← Close Preview and return to editor
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-8">
                            {categories.map(c => (
                                <span key={c} className="px-5 py-2 border border-white/10 text-zinc-300 text-[10px] uppercase font-black rounded-full tracking-widest">{c}</span>
                            ))}
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-12 leading-tight">{title}</h1>
                        <div className="flex items-center gap-4 mb-16 pb-16 border-b border-white/5">
                            <div className="w-12 h-12 rounded-full bg-zinc-800 overflow-hidden border border-white/10">
                                {authorAvatar ? <img src={authorAvatar} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gradient-to-tr from-zinc-700 to-zinc-600" />}
                            </div>
                            <div>
                                <p className="font-bold text-white">{authorName}</p>
                                <p className="text-sm text-zinc-500">{new Date().toLocaleDateString()}</p>
                            </div>
                        </div>

                        {coverImage && (
                            <div className="rounded-[2.5rem] overflow-hidden mb-16 aspect-[16/9] border border-white/5 bg-zinc-900 shadow-2xl">
                                <img src={coverImage} className="w-full h-full object-cover" />
                            </div>
                        )}

                        <div className="space-y-12">
                            {blocks.map(block => (
                                <div key={block.id}>
                                    {block.type === 'heading' && <h2 className="text-4xl font-bold text-white leading-tight">{block.content}</h2>}
                                    {block.type === 'paragraph' && <p className="text-zinc-400 text-xl leading-relaxed">{block.content}</p>}
                                    {block.type === 'image' && (
                                        <div className="rounded-[2rem] overflow-hidden bg-zinc-800 aspect-video border border-white/5 shadow-xl">
                                            {block.src && <img src={block.src} className="w-full h-full object-cover" />}
                                        </div>
                                    )}
                                    {block.type === 'image-text' && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                            <div className="rounded-[2rem] overflow-hidden bg-zinc-800 aspect-video border border-white/5">
                                                {block.src && <img src={block.src} className="w-full h-full object-cover" />}
                                            </div>
                                            <p className="text-zinc-400 text-xl leading-relaxed">{block.content}</p>
                                        </div>
                                    )}
                                    {block.type === 'text-image' && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                            <p className="text-zinc-400 text-xl leading-relaxed order-2 md:order-1">{block.content}</p>
                                            <div className="rounded-[2rem] overflow-hidden bg-zinc-800 aspect-video border border-white/5 order-1 md:order-2">
                                                {block.src && <img src={block.src} className="w-full h-full object-cover" />}
                                            </div>
                                        </div>
                                    )}
                                    {block.type === 'table' && (
                                        <div className="overflow-x-auto my-12">
                                            <table className="w-full border-collapse border border-white/10 rounded-2xl overflow-hidden">
                                                <thead>
                                                    <tr className="bg-zinc-900">
                                                        {block.rows?.[0].map((cell, i) => (
                                                            <th key={i} className="border border-white/10 p-4 text-left font-bold text-white text-sm">{cell}</th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {block.rows?.slice(1).map((row, i) => (
                                                        <tr key={i} className="border-t border-white/5">
                                                            {row.map((cell, j) => (
                                                                <td key={j} className="border border-white/10 p-4 text-zinc-400 text-sm leading-relaxed">{cell}</td>
                                                            ))}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                    {block.type === 'heading-paragraph' && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-12">
                                            <h2 className="text-4xl font-bold text-white leading-tight">{block.content}</h2>
                                            <p className="text-zinc-400 text-xl leading-relaxed">{block.text}</p>
                                        </div>
                                    )}
                                    {block.type === 'paragraph-heading' && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-12">
                                            <p className="text-zinc-400 text-xl leading-relaxed order-2 md:order-1">{block.text}</p>
                                            <h2 className="text-4xl font-bold text-white leading-tight order-1 md:order-2">{block.content}</h2>
                                        </div>
                                    )}
                                    {block.type === 'code' && (
                                        <pre className="bg-zinc-900 p-8 rounded-3xl text-amber-200 overflow-x-auto font-mono text-sm border border-white/5">{block.content}</pre>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Toolbar */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#141618] sticky top-0 z-10">
                <div className="flex items-center gap-1">
                    <button onClick={() => addBlock('heading')} className="p-2.5 hover:bg-white/5 rounded-xl transition-all" title="Add Heading"><Type className="w-5 h-5" /></button>
                    <button onClick={() => addBlock('paragraph')} className="p-2.5 hover:bg-white/5 rounded-xl transition-all" title="Add Paragraph"><Plus className="w-5 h-5" /></button>
                    <button onClick={() => addBlock('image')} className="p-2.5 hover:bg-white/5 rounded-xl transition-all" title="Add Image"><LucideImage className="w-5 h-5" /></button>
                    <button onClick={() => addBlock('image-text')} className="p-2.5 hover:bg-white/5 rounded-xl transition-all" title="Left Image + Right Text"><PanelLeft className="w-5 h-5" /></button>
                    <button onClick={() => addBlock('text-image')} className="p-2.5 hover:bg-white/5 rounded-xl transition-all" title="Left Text + Right Image"><PanelRight className="w-5 h-5" /></button>
                    <button onClick={() => addBlock('table')} className="p-2.5 hover:bg-white/5 rounded-xl transition-all" title="Add Table"><Columns2 className="w-5 h-5" /></button>
                    <button onClick={() => addBlock('heading-paragraph')} className="p-2.5 hover:bg-white/5 rounded-xl transition-all" title="Left Heading + Right Para"><Type className="w-5 h-5 text-zinc-500" /></button>
                    <button onClick={() => addBlock('paragraph-heading')} className="p-2.5 hover:bg-white/5 rounded-xl transition-all" title="Left Para + Right Heading"><Type className="w-5 h-5 text-amber-500" /></button>
                    <button onClick={() => addBlock('code')} className="p-2.5 hover:bg-white/5 rounded-xl transition-all" title="Add Code"><Code className="w-5 h-5" /></button>
                </div>

                <div className="flex items-center gap-6">
                    {lastSaved && (
                        <span className="text-[10px] text-zinc-500 font-medium hidden sm:block">
                            Last saved: {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    )}
                    <button
                        onClick={() => setPreviewMode(true)}
                        className="flex items-center gap-2 px-5 py-2 hover:bg-white/5 rounded-full transition-all text-sm font-bold border border-white/5"
                    >
                        <Eye className="w-4 h-4" /> Preview
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving || !isDirty}
                        className={cn(
                            "flex items-center gap-2 px-8 py-2 rounded-full font-bold text-sm transition-all active:scale-95 disabled:opacity-30 disabled:grayscale",
                            saveSuccess ? "bg-green-500 text-white" : "bg-white text-black hover:bg-zinc-200"
                        )}
                    >
                        {isSaving ? (
                            <div className="w-4 h-4 border-2 border-zinc-400 border-t-black rounded-full animate-spin" />
                        ) : saveSuccess ? (
                            "Saved!"
                        ) : (
                            <><Save className="w-4 h-4" /> Save Post</>
                        )}
                    </button>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Editor Settings Sidebar */}
                <div className="w-80 border-r border-white/5 bg-[#0F1113] p-8 overflow-y-auto hidden lg:block">
                    <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-600 mb-8">Blog Settings</h3>

                    <div className="space-y-8">
                        <section className="space-y-3">
                            <label className="text-xs font-bold text-zinc-500">Post Title</label>
                            <input
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                className="w-full bg-zinc-900/50 border border-white/5 rounded-xl px-4 py-3 text-sm focus:border-white/20 outline-none transition-all"
                                placeholder="The title of your article..."
                            />
                        </section>

                        <section className="space-y-3">
                            <label className="text-xs font-bold text-zinc-500">Short Summary</label>
                            <textarea
                                value={excerpt}
                                onChange={e => setExcerpt(e.target.value)}
                                className="w-full bg-zinc-900/50 border border-white/5 rounded-xl px-4 py-3 text-sm focus:border-white/20 outline-none h-24 resize-none leading-relaxed transition-all"
                                placeholder="What is this blog about?"
                            />
                        </section>

                        <section className="space-y-3">
                            <label className="text-xs font-bold text-zinc-500">Cover Image / Thumbnail</label>
                            <div
                                onClick={() => fileInputRefs.current.cover?.click()}
                                className="aspect-video bg-zinc-900 border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center cursor-pointer overflow-hidden relative group/cover hover:bg-zinc-800 transition-all hover:border-white/10"
                            >
                                {coverImage ? (
                                    <>
                                        <img src={coverImage} className="w-full h-full object-cover opacity-60 group-hover/cover:opacity-40 transition-opacity" />
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/cover:opacity-100 transition-opacity">
                                            <LucideImage className="w-8 h-8 text-white" />
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center gap-2">
                                        <Plus className="w-5 h-5 text-zinc-700" />
                                        <span className="text-[10px] font-bold text-zinc-700 uppercase">Upload</span>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={el => { if (el) fileInputRefs.current.cover = el; }}
                                    className="hidden"
                                    onChange={e => e.target.files?.[0] && handleImageUpload(e.target.files[0], setCoverImage)}
                                />
                            </div>
                        </section>

                        <section className="space-y-3">
                            <label className="text-xs font-bold text-zinc-500">Post Settings</label>
                            <div className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl">
                                <span className="text-xs font-semibold">Featured Story</span>
                                <button
                                    onClick={() => setIsFeatured(!isFeatured)}
                                    className={cn(
                                        "w-12 h-6 rounded-full transition-all relative flex items-center px-1",
                                        isFeatured ? "bg-[#B59560]" : "bg-zinc-800"
                                    )}
                                >
                                    <div className={cn(
                                        "w-4 h-4 bg-white rounded-full transition-all",
                                        isFeatured ? "translate-x-6" : "translate-x-0"
                                    )} />
                                </button>
                            </div>
                        </section>

                        <section className="space-y-3">
                            <label className="text-xs font-bold text-zinc-500">Categories / Tags</label>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {categories.map((cat, i) => (
                                    <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-zinc-300 flex items-center gap-2 group/tag">
                                        {cat}
                                        <button
                                            onClick={() => setCategories(categories.filter(c => c !== cat))}
                                            className="hover:text-red-400 transition-colors"
                                        >
                                            <Trash2 className="w-3 h-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <input
                                    id="new-category"
                                    type="text"
                                    placeholder="Add category..."
                                    className="flex-1 bg-zinc-900/50 border border-white/5 rounded-xl px-4 py-2 text-xs focus:border-white/20 outline-none transition-all"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            const input = e.currentTarget;
                                            const val = input.value.trim();
                                            if (val && !categories.includes(val)) {
                                                setCategories([...categories, val]);
                                                input.value = '';
                                            }
                                        }
                                    }}
                                />
                                <button
                                    onClick={() => {
                                        const input = document.getElementById('new-category') as HTMLInputElement;
                                        const val = input.value.trim();
                                        if (val && !categories.includes(val)) {
                                            setCategories([...categories, val]);
                                            input.value = '';
                                        }
                                    }}
                                    className="p-2 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-all"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        </section>

                        <section className="space-y-3">
                            <label className="text-xs font-bold text-zinc-500">Author Details</label>
                            <div className="flex gap-4">
                                <div
                                    onClick={() => fileInputRefs.current.avatar?.click()}
                                    className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center border border-white/5 cursor-pointer overflow-hidden hover:bg-zinc-800 transition-all group/avatar shrink-0"
                                >
                                    {authorAvatar ? <img src={authorAvatar} className="w-full h-full object-cover" /> : <Plus className="w-4 h-4 text-zinc-700 group-hover/avatar:scale-110 transition-transform" />}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        ref={el => { if (el) fileInputRefs.current.avatar = el; }}
                                        className="hidden"
                                        onChange={e => e.target.files?.[0] && handleImageUpload(e.target.files[0], setAuthorAvatar)}
                                    />
                                </div>
                                <input
                                    value={authorName}
                                    onChange={e => setAuthorName(e.target.value)}
                                    className="flex-1 bg-zinc-900/50 border border-white/5 rounded-xl px-4 py-3 text-sm focus:border-white/20 outline-none transition-all"
                                    placeholder="Author name"
                                />
                            </div>
                        </section>
                    </div>
                </div>

                {/* Main Canvas */}
                <div className="flex-1 overflow-y-auto p-12 lg:p-20 bg-[#0A0A0A]">
                    <div className="max-w-4xl mx-auto mb-16 lg:hidden">
                        <input value={title} onChange={e => setTitle(e.target.value)} className="bg-transparent text-5xl font-black w-full outline-none placeholder:text-zinc-900 mb-4" placeholder="Untitled Story" />
                    </div>

                    <Reorder.Group axis="y" values={blocks} onReorder={setBlocks} className="max-w-4xl mx-auto space-y-8">
                        {blocks.map((block) => (
                            <Reorder.Item
                                key={block.id}
                                value={block}
                                className="group relative bg-[#141618] border border-white/5 rounded-3xl p-8 hover:border-white/20 transition-all shadow-xl"
                            >
                                <div className="absolute -left-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing p-2">
                                    <GripVertical className="w-6 h-6 text-zinc-600" />
                                </div>

                                <div className="flex flex-col gap-6">
                                    <div className="flex items-center justify-between pb-4 border-b border-white/[0.03]">
                                        <span className="text-[10px] uppercase tracking-[0.2em] font-black text-zinc-600">
                                            {block.type} Block
                                        </span>
                                        <button onClick={() => removeBlock(block.id)} className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-all">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {block.type === 'heading' && (
                                        <input
                                            type="text"
                                            value={block.content}
                                            onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                                            className="bg-transparent text-4xl font-bold w-full outline-none placeholder:text-zinc-800 leading-tight"
                                            placeholder="Enter a descriptive heading..."
                                        />
                                    )}

                                    {block.type === 'paragraph' && (
                                        <textarea
                                            value={block.content}
                                            onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                                            className="bg-transparent text-xl text-zinc-400 w-full outline-none min-h-[140px] resize-none leading-relaxed placeholder:text-zinc-800"
                                            placeholder="Tell your story here. Use descriptive and engaging language."
                                        />
                                    )}

                                    {block.type === 'image' && (
                                        <div className="space-y-6">
                                            <div
                                                onClick={() => fileInputRefs.current[block.id]?.click()}
                                                className="aspect-video bg-zinc-900/50 border-2 border-dashed border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 text-zinc-600 hover:border-white/10 hover:bg-zinc-900 transition-all cursor-pointer group/content relative overflow-hidden"
                                            >
                                                {block.src ? (
                                                    <>
                                                        <img src={block.src} alt={block.alt} className="absolute inset-0 w-full h-full object-cover group-hover/content:opacity-40 transition-opacity" />
                                                        <div className="relative z-10 opacity-0 group-hover/content:opacity-100 flex flex-col items-center gap-2 transition-opacity">
                                                            <LucideImage className="w-10 h-10 text-white" />
                                                            <span className="text-white font-black uppercase text-[10px] tracking-widest bg-black/50 px-6 py-3 rounded-full backdrop-blur-xl border border-white/10">Replace Image</span>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center group-hover/content:scale-110 transition-transform">
                                                            <LucideImage className="w-6 h-6" />
                                                        </div>
                                                        <div className="text-center">
                                                            <p className="font-bold text-zinc-400">Click to upload an image</p>
                                                            <p className="text-xs mt-1 text-zinc-600">SVG, PNG, JPG or WebP (max. 5MB)</p>
                                                        </div>
                                                    </>
                                                )}
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    ref={el => { fileInputRefs.current[block.id] = el; }}
                                                    onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], src => updateBlock(block.id, { src }))}
                                                />
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Add an image caption or alt text..."
                                                value={block.alt}
                                                onChange={(e) => updateBlock(block.id, { alt: e.target.value })}
                                                className="bg-transparent text-sm text-zinc-500 w-full outline-none italic placeholder:text-zinc-800 text-center"
                                            />
                                        </div>
                                    )}

                                    {(block.type === 'image-text' || block.type === 'text-image') && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className={cn("space-y-4", block.type === 'text-image' ? "md:order-2" : "md:order-1")}>
                                                <div
                                                    onClick={() => fileInputRefs.current[block.id]?.click()}
                                                    className="aspect-[4/3] bg-zinc-900/50 border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center gap-4 text-zinc-600 hover:border-white/10 hover:bg-zinc-900 transition-all cursor-pointer group/content relative overflow-hidden"
                                                >
                                                    {block.src ? (
                                                        <img src={block.src} className="absolute inset-0 w-full h-full object-cover" />
                                                    ) : (
                                                        <LucideImage className="w-8 h-8 opacity-20" />
                                                    )}
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        ref={el => { fileInputRefs.current[block.id] = el; }}
                                                        onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], src => updateBlock(block.id, { src }))}
                                                    />
                                                </div>
                                            </div>
                                            <div className={cn("flex flex-col justify-center", block.type === 'text-image' ? "md:order-1" : "md:order-2")}>
                                                <textarea
                                                    value={block.content}
                                                    onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                                                    className="bg-transparent text-xl text-zinc-400 w-full outline-none min-h-[140px] resize-none leading-relaxed placeholder:text-zinc-800"
                                                    placeholder="Add text side-by-side with the image..."
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {block.type === 'table' && (
                                        <div className="space-y-6">
                                            <div className="bg-zinc-950/50 border border-white/5 rounded-3xl p-6 overflow-x-auto">
                                                <div className="flex gap-4 mb-6">
                                                    <button
                                                        onClick={() => {
                                                            const newRows = block.rows ? [...block.rows, new Array(block.rows[0].length).fill('')] : [];
                                                            updateBlock(block.id, { rows: newRows });
                                                        }}
                                                        className="text-[10px] uppercase font-black px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all"
                                                    >+ Add Row</button>
                                                    <button
                                                        onClick={() => {
                                                            const newRows = block.rows ? block.rows.map(r => [...r, '']) : [];
                                                            updateBlock(block.id, { rows: newRows });
                                                        }}
                                                        className="text-[10px] uppercase font-black px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all"
                                                    >+ Add Column</button>
                                                </div>
                                                <table className="w-full">
                                                    <tbody>
                                                        {block.rows?.map((row, i) => (
                                                            <tr key={i}>
                                                                {row.map((cell, j) => (
                                                                    <td key={j} className="p-1">
                                                                        <input
                                                                            value={cell}
                                                                            onChange={(e) => {
                                                                                const newRows = [...(block.rows || [])];
                                                                                newRows[i][j] = e.target.value;
                                                                                updateBlock(block.id, { rows: newRows });
                                                                            }}
                                                                            className={cn(
                                                                                "w-full bg-zinc-900/50 border border-white/5 rounded-lg px-3 py-2 text-sm focus:border-white/20 outline-none",
                                                                                i === 0 && "font-bold text-white bg-zinc-800"
                                                                            )}
                                                                        />
                                                                    </td>
                                                                ))}
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )}

                                    {(block.type === 'heading-paragraph' || block.type === 'paragraph-heading') && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className={cn("space-y-4", block.type === 'paragraph-heading' ? "md:order-2" : "md:order-1")}>
                                                <input
                                                    type="text"
                                                    value={block.content}
                                                    onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                                                    className="bg-transparent text-3xl font-bold w-full outline-none placeholder:text-zinc-800 leading-tight"
                                                    placeholder="Section Heading..."
                                                />
                                            </div>
                                            <div className={cn("flex flex-col justify-center", block.type === 'paragraph-heading' ? "md:order-1" : "md:order-2")}>
                                                <textarea
                                                    value={block.text}
                                                    onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                                                    className="bg-transparent text-lg text-zinc-400 w-full outline-none min-h-[140px] resize-none leading-relaxed placeholder:text-zinc-800"
                                                    placeholder="Add descriptive text for this section..."
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {block.type === 'code' && (
                                        <div className="space-y-4">
                                            <textarea
                                                value={block.content}
                                                onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                                                className="bg-zinc-950 text-amber-200 font-mono text-sm w-full outline-none p-8 rounded-3xl min-h-[220px] border border-white/5 focus:border-white/10 transition-all leading-relaxed shadow-inner"
                                                placeholder="// Paste your code snippet here..."
                                            />
                                        </div>
                                    )}
                                </div>
                            </Reorder.Item>
                        ))}
                    </Reorder.Group>

                </div>
            </div>
        </div>
    );
}

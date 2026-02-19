'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Settings, LogOut, ChevronLeft, Calendar, User, Tag, Edit3, Eye } from 'lucide-react';
import BlockEditor from '@/components/admin/editor/block-editor';
import { Blog } from '@/lib/blogs';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

export default function AdminBlogsPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [selectedBlog, setSelectedBlog] = useState<Blog | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        if (token === 'logged_in') {
            setIsAuthenticated(true);
            fetchBlogs();
        } else {
            router.push('/admin/login');
        }
    }, [router]);

    const fetchBlogs = async () => {
        try {
            const res = await fetch('/api/blogs');
            const data = await res.json();
            setBlogs(data);
        } catch (error) {
            console.error('Failed to fetch blogs', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        router.push('/admin/login');
    };

    const handleEdit = (blog?: Blog) => {
        setSelectedBlog(blog);
        setIsEditing(true);
    };

    const handleBack = () => {
        setIsEditing(false);
        setSelectedBlog(undefined);
        fetchBlogs(); // Refresh list
    };

    if (!isAuthenticated) return null;

    return (
        <main className="min-h-screen bg-[#050505] text-white flex flex-col">
            {/* Sidebar/Header */}
            <div className="px-8 py-5 border-b border-white/5 bg-[#0A0A0A]/80 backdrop-blur-xl flex items-center justify-between sticky top-0 z-20">
                <div className="flex items-center gap-6">
                    <h1 className="text-xl font-bold flex items-center gap-2">
                        <Settings className="w-5 h-5 text-[#B59560]" />
                        Admin Panel
                    </h1>
                    <div className="h-6 w-[1px] bg-white/10" />
                    <nav className="flex items-center gap-4">
                        <button
                            onClick={() => handleBack()}
                            className={cn(
                                "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                                !isEditing ? "bg-white/10 text-white" : "text-zinc-500 hover:text-white"
                            )}
                        >
                            Articles
                        </button>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-white/5 rounded-full text-zinc-500 hover:text-white transition-all text-sm font-medium"
                    >
                        <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                </div>
            </div>

            {isEditing ? (
                <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="px-8 py-4 bg-[#0A0A0A] border-b border-white/5 flex items-center justify-between">
                        <button
                            onClick={handleBack}
                            className="flex items-center gap-2 text-zinc-500 hover:text-white transition-all text-sm font-bold group"
                        >
                            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
                        </button>
                        {selectedBlog && <span className="text-xs text-zinc-500 italic">Editing: {selectedBlog.title}</span>}
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <BlockEditor blog={selectedBlog} />
                    </div>
                </div>
            ) : (
                <div className="flex-1 p-8 lg:p-12 max-w-7xl mx-auto w-full">
                    <div className="flex items-center justify-between mb-16">
                        <div>
                            <h2 className="text-4xl font-bold mb-3">Blog Posts</h2>
                            <p className="text-zinc-500">You have {blogs.length} published or draft articles.</p>
                        </div>
                        <button
                            onClick={() => handleEdit()}
                            className="flex items-center gap-2 px-8 py-4 bg-[#B59560] text-black font-black rounded-full hover:bg-[#D4AF37] transition-all active:scale-95 shadow-[0_0_20px_rgba(181,149,96,0.3)]"
                        >
                            <Plus className="w-5 h-5" /> New Article
                        </button>
                    </div>

                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3].map(i => <div key={i} className="aspect-[4/3] rounded-3xl bg-zinc-900/50 animate-pulse border border-white/5" />)}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Create Button */}
                            <div
                                onClick={() => handleEdit()}
                                className="aspect-[4/3] rounded-[2.5rem] border-2 border-dashed border-white/5 flex flex-col items-center justify-center gap-6 text-zinc-700 hover:border-[#B59560]/30 hover:text-zinc-300 transition-all cursor-pointer group bg-zinc-950"
                            >
                                <div className="w-20 h-20 rounded-full bg-zinc-900 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#B59560]/10 group-hover:text-[#B59560] transition-all border border-white/5">
                                    <Plus className="w-10 h-10" />
                                </div>
                                <span className="font-black uppercase tracking-widest text-[10px]">Create Story</span>
                            </div>

                            {/* Blog List */}
                            {blogs.map((blog) => (
                                <div
                                    key={blog.id}
                                    onClick={() => handleEdit(blog)}
                                    className="group relative aspect-[4/3] rounded-[2rem] overflow-hidden border border-white/5 bg-[#0F1113] hover:border-[#B59560]/30 transition-all cursor-pointer shadow-2xl"
                                >
                                    <img src={blog.coverImage} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                        <div className="flex gap-2 mb-4 overflow-hidden">
                                            {blog.categories.slice(0, 2).map(cat => (
                                                <span key={cat} className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[8px] uppercase font-bold tracking-widest text-white border border-white/10">{cat}</span>
                                            ))}
                                        </div>
                                        <h3 className="text-xl font-bold mb-6 line-clamp-2 group-hover:text-[#B59560] transition-colors leading-tight">{blog.title}</h3>

                                        <div className="flex items-center justify-between text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                                            <div className="flex items-center gap-4">
                                                <span className="flex items-center gap-1.5"><User className="w-3 h-3" /> {blog.author.name.split(' ')[0]}</span>
                                                <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {format(new Date(blog.date), 'MMM d')}</span>
                                                <span className="flex items-center gap-1.5 text-[#B59560]/80"><Eye className="w-3 h-3" /> {blog.viewCount || 0}</span>
                                            </div>
                                            <Edit3 className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </main>
    );
}

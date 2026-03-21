'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, Briefcase, LogOut, Shield } from 'lucide-react';

export default function AdminDashboardPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        if (token !== 'logged_in') {
            router.push('/admin/users/login');
        } else {
            setIsAuthenticated(true);
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        sessionStorage.removeItem('career_gate_token');
        router.push('/admin/users/login');
    };

    if (!isAuthenticated) return null;

    return (
        <main className="min-h-screen bg-[#050505] text-white flex flex-col">
            {/* Header */}
            <div className="px-8 py-5 border-b border-white/5 bg-[#0A0A0A]/80 backdrop-blur-xl flex items-center justify-between sticky top-0 z-20">
                <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-amber-400" />
                    <h1 className="text-xl font-bold">Admin Portal</h1>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-white/5 rounded-full text-zinc-500 hover:text-white transition-all text-sm font-medium"
                >
                    <LogOut className="w-4 h-4" /> Sign Out
                </button>
            </div>

            {/* Dashboard Content */}
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-3xl">
                    <div className="text-center mb-14">
                        <h2 className="text-4xl font-bold mb-3">Welcome, Admin</h2>
                        <p className="text-zinc-500 text-lg">Choose a section to manage</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Blog Portal Card */}
                        <button
                            onClick={() => router.push('/admin/users/blogs')}
                            className="group relative overflow-hidden rounded-[2rem] border border-white/5 bg-[#0F1113] p-10 text-left hover:border-[#B59560]/40 transition-all duration-500 cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#B59560]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-[#B59560]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                    <FileText className="w-8 h-8 text-[#B59560]" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2 group-hover:text-[#B59560] transition-colors">Blog Manager</h3>
                                <p className="text-zinc-500 text-sm leading-relaxed">Create, edit, and publish blog articles. Manage your content library.</p>
                            </div>
                            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-500">
                                <span className="text-[#B59560] text-sm font-bold uppercase tracking-widest">Open →</span>
                            </div>
                        </button>

                        {/* Career/Job Portal Card */}
                        <button
                            onClick={() => router.push('/admin/users/career')}
                            className="group relative overflow-hidden rounded-[2rem] border border-white/5 bg-[#0F1113] p-10 text-left hover:border-[#ff6b3d]/40 transition-all duration-500 cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b3d]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-[#ff6b3d]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                    <Briefcase className="w-8 h-8 text-[#ff6b3d]" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2 group-hover:text-[#ff6b3d] transition-colors">Job Manager</h3>
                                <p className="text-zinc-500 text-sm leading-relaxed">Post job openings, review applicants, and manage career listings.</p>
                            </div>
                            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-500">
                                <span className="text-[#ff6b3d] text-sm font-bold uppercase tracking-widest">Open →</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

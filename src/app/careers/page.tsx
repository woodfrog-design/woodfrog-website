'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { Job, getActiveJobs } from '@/lib/jobs';

const CareersPage = () => {
    const [jobs, setJobs] = React.useState<Job[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchJobs = async () => {
            const data = await getActiveJobs();
            setJobs(data);
            setIsLoading(false);
        };
        fetchJobs();
    }, []);

    return (
        <main className="min-h-screen bg-transparent text-white selection:bg-brand-primary/30">

            <div className="w-full px-8 md:px-24 lg:px-32 pt-32 pb-20">
                <div className="space-y-16">
                    <div className="space-y-6">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-brand-primary font-bold tracking-widest uppercase text-sm"
                        >
                            Careers
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl md:text-7xl font-bold leading-tight"
                        >
                            Job openings
                        </motion.h1>
                    </div>

                    <div className="space-y-4">
                        {isLoading ? (
                            <div className="space-y-4">
                                {[1, 2, 3].map(i => <div key={i} className="h-24 w-full rounded-2xl bg-zinc-900 animate-pulse border border-white/5" />)}
                            </div>
                        ) : jobs.length > 0 ? (
                            jobs.map((job, idx) => (
                                <Link key={job.id} href={`/careers/${job.slug}`}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 15 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 + (idx * 0.1) }}
                                        className="group bg-white/5 border border-white/5 rounded-2xl p-8 hover:bg-white/[0.08] hover:border-[#ff6b3d]/30 transition-all cursor-pointer overflow-hidden relative mb-4"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-2 h-2 bg-[#ff6b3d] rounded-sm group-hover:scale-125 transition-transform" />
                                                <h2 className="text-2xl font-bold group-hover:text-white transition-colors">{job.title}</h2>
                                            </div>
                                            <div className="flex items-center justify-between md:justify-end gap-8">
                                                <div className="flex flex-col items-end">
                                                    <span className="text-zinc-400 font-medium">{job.location}</span>
                                                    <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mt-1">{job.department} • {job.employmentType}</span>
                                                </div>
                                                <ChevronRight className="w-6 h-6 text-zinc-600 group-hover:text-[#ff6b3d] group-hover:translate-x-1 transition-all" />
                                            </div>
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#ff6b3d]/0 via-[#ff6b3d]/5 to-[#ff6b3d]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                    </motion.div>
                                </Link>
                            ))
                        ) : (
                            <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-[3rem]">
                                <p className="text-zinc-600 font-bold uppercase tracking-widest text-xs">No active positions at the moment</p>
                            </div>
                        )}

                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                        className="text-xl text-zinc-400"
                    >
                        No current openings? <Link href="/contact" className="text-brand-primary hover:underline underline-offset-8 transition-all">Reach out</Link> anyway!
                    </motion.p>
                </div>
            </div>
        </main>
    );
};

export default CareersPage;

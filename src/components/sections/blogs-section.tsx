'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { getFeaturedBlogs, Blog } from '@/lib/blogs';
import { format } from 'date-fns';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const PlusIcon = () => (
    <svg
        width="100%"
        height="100%"
        viewBox="0 0 67 67"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g id="rightBlade">
            <path
                d="M66.9329 29.1321L66.9332 30.5046L66.935 30.5028L66.9377 32.2259L66.9724 32.2254L66.9724 35.1913H66.941L66.9444 37.3247L66.9465 38.6954L45.2918 38.6614C43.3481 38.6565 41.6068 38.4493 39.1516 37.6275C38.9875 37.5664 38.8234 37.5054 38.6631 37.4517C37.2186 37.3868 37.2305 37.9137 37.4046 38.5146L37.6415 39.204C38.4485 41.6297 38.6539 43.3582 38.6569 45.2889L38.6909 66.9436H29.094L29.0302 0.770621H38.6298L38.6298 22.4424C38.631 24.386 38.4292 26.1267 37.6151 28.5794C37.3805 30.5116 37.9074 30.5014 38.5077 30.3292L39.1963 30.0944C41.6196 29.295 43.3474 29.095 45.2781 29.0981L66.9329 29.1321Z"
                fill="var(--brand-primary)"
            />
        </g>
        <use
            href="#rightBlade"
            transform="translate(67 0) scale(-1 1)"
        />
    </svg>
);

const BlogsSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const fanRef = useRef<HTMLDivElement>(null);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            const data = await getFeaturedBlogs();
            setBlogs(data.slice(0, 2)); // Show top 2 featured as requested previously
            setIsLoading(false);
        };
        fetchBlogs();
    }, []);

    useGSAP(() => {
        if (!sectionRef.current || !fanRef.current) return;

        gsap.to(fanRef.current, {
            rotate: 720,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
            }
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="w-full bg-transparent py-12 md:py-20 flex flex-col items-center justify-center overflow-hidden">
            {/* Section Heading */}
            <div className="w-full px-6 md:px-32 mb-10 md:mb-20 text-left">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="md:px-0"
                >
                    <h2 className="text-3xl md:text-6xl font-black text-[#f4e8df] leading-tight mb-4">
                        We like to <span className="text-brand-primary">read</span> between the lines.
                    </h2>
                    <p className="text-[#8891A5] text-base md:text-xl font-bold tracking-wide">
                        Read more on our blog
                    </p>
                </motion.div>
            </div>

            <div className="relative flex items-center justify-center md:translate-x-[150px]">
                <div
                    ref={fanRef}
                    className="absolute left-[-262.5px] top-1/2 -translate-y-1/2 w-[350px] h-auto pointer-events-none z-[-1] opacity-100 hidden md:block"
                >
                    <PlusIcon />
                </div>

                {/* Boxed Content Container */}
                <div className="w-full max-w-[1050px] md:min-h-[609px] border border-white/10 rounded-[1.25rem] md:rounded-[2.5rem] p-4 md:p-16 bg-[#031722] relative z-10 shadow-2xl overflow-hidden mx-4 md:mx-0">
                    <div className="flex flex-col gap-10 md:gap-20">
                        {isLoading ? (
                            <div className="flex items-center justify-center h-[300px]">
                                <div className="w-8 h-8 border-4 border-[#e07a3f] border-t-transparent rounded-full animate-spin" />
                            </div>
                        ) : blogs.length > 0 ? (
                            blogs.map((post, idx) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: idx * 0.2 }}
                                    className="group flex flex-col md:flex-row gap-8 md:gap-12 border-b border-white/5 pb-16 last:border-0 last:pb-0"
                                >
                                    {/* Left Column: Text Content */}
                                    <div className="flex-[1.6] flex flex-col justify-center">
                                        <div className="flex flex-wrap items-center gap-1.5 text-zinc-500 text-[10px] font-bold uppercase tracking-[0.15em] mb-6">
                                            <span className="text-zinc-600">{post.categories[0]}</span>
                                            {post.caseStudy && <><span className="w-0.5 h-0.5 rounded-full bg-zinc-800 mx-1" /><span>{post.caseStudy}</span></>}
                                            {post.subtitle && <><span className="w-0.5 h-0.5 rounded-full bg-zinc-800 mx-1" /><span>{post.subtitle}</span></>}
                                            <span className="w-0.5 h-0.5 rounded-full bg-zinc-800 mx-1" />
                                            <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
                                        </div>

                                        <h2 className="text-2xl md:text-3xl font-black text-white leading-tight mb-4 group-hover:text-brand-primary transition-colors duration-500">
                                            {post.title}
                                        </h2>

                                        <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8 line-clamp-2">
                                            {post.excerpt}
                                        </p>

                                        <Link href={`/blog/${post.slug}`} className="flex items-center gap-4 group/btn cursor-pointer w-fit">
                                            <span className="text-brand-primary font-black uppercase text-[10px] tracking-[0.2em] relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-brand-primary group-hover/btn:after:w-full after:transition-all after:duration-500">
                                                Read More
                                            </span>
                                        </Link>
                                    </div>

                                    {/* Right Column: Media Content */}
                                    <div className="flex-1 flex items-center justify-center">
                                        <Link href={`/blog/${post.slug}`} className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/5 bg-zinc-900 group-hover:border-brand-primary/40 transition-all duration-500 shadow-xl block">
                                            <img
                                                src={post.coverImage}
                                                alt={post.title}
                                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-1000 ease-out"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/5 pointer-events-none" />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="flex items-center justify-center h-[300px]">
                                <p className="text-zinc-500 font-bold uppercase tracking-widest">No featured articles available</p>
                            </div>
                        )}

                    </div>

                    {/* See All Button */}
                    {!isLoading && blogs.length > 0 && (
                        <div className="mt-12 md:mt-20 flex justify-start">
                            <Link
                                href="/blog"
                                className="group/seeall flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:border-brand-primary/50 transition-all duration-300"
                            >
                                <span className="text-[#E6EAF0] font-bold text-sm tracking-tight group-hover/seeall:text-brand-primary transition-colors">
                                    View all blogs
                                </span>
                                <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center -rotate-45 group-hover/seeall:rotate-0 transition-transform duration-500">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export { BlogsSection };

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Blog } from '@/lib/blogs';

interface BlogCardProps {
    blog: Blog;
    className?: string;
    isHero?: boolean;
}

const BlogCard = ({ blog, className, isHero = false }: BlogCardProps) => {
    return (
        <Link
            href={`/blog/${blog.slug}`}
            className={cn(
                "group relative flex flex-col overflow-hidden transition-all duration-300 gap-6",
                className
            )}
        >
            {/* Image Container */}
            <div className={cn(
                "relative overflow-hidden rounded-[2.5rem] bg-[#1A1A1A] border border-white/5 aspect-[16/10]"
            )}>
                {blog.coverImage ? (
                    <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                        <span className="text-zinc-600 font-medium">No Image</span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-col gap-6 px-2">
                {/* Blog Categories */}
                <div className="flex flex-wrap gap-2">
                    {blog.categories.slice(0, 3).map((cat) => (
                        <span key={cat} className="px-4 py-1.5 border border-white/5 bg-white/5 text-zinc-400 text-[9px] uppercase tracking-[0.2em] font-black rounded-full transition-all group-hover:border-[#B59560]/30 group-hover:text-white">
                            {cat}
                        </span>
                    ))}
                </div>

                <h3 className={cn(
                    "font-bold text-white transition-colors group-hover:text-[#B59560] leading-tight",
                    isHero ? "text-3xl lg:text-5xl" : "text-2xl"
                )}>
                    {blog.title}
                </h3>

                <div className="mt-2 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-zinc-900 border border-white/10 overflow-hidden shrink-0">
                        {blog.author.avatar ? (
                            <img src={blog.author.avatar} alt={blog.author.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-tr from-zinc-800 to-zinc-700" />
                        )}
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <span className="text-white text-sm font-bold">{blog.author.name}</span>
                        <span className="text-zinc-600 text-[10px] font-black uppercase tracking-widest">{format(new Date(blog.date), 'MMMM d, yyyy')}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default BlogCard;

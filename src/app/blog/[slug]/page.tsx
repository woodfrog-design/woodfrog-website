import React from 'react';
import { notFound } from 'next/navigation';
import { getBlogBySlug, getBlogs, BlogContent, incrementBlogViewCount } from '@/lib/blogs';
import { format } from 'date-fns';
import { Facebook, Linkedin, Twitter, Mail, Link as LinkIcon, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import BlogCard from '@/components/blog/blog-card';
import ViewTracker from '@/components/analytics/view-tracker';
import { ShareButtons } from '@/components/ui/share-buttons';
import { Metadata } from 'next';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const blog = await getBlogBySlug(slug);

    return {
        title: blog?.title || 'Blog Post',
    };
}

interface PageProps {
    params: Promise<{ slug: string }>;
}

const RenderBlock = (block: BlogContent) => {
    switch (block.type) {
        case 'heading':
            const Tag = (`h${block.level || 1}`) as keyof React.JSX.IntrinsicElements;
            return <Tag className="text-white font-bold my-8 text-4xl leading-tight">{block.content}</Tag>;
        case 'paragraph':
            return <p className="text-zinc-400 text-lg leading-relaxed mb-6">{block.content}</p>;
        case 'image':
            return (
                <div className="my-16">
                    <div className="relative rounded-[2.5rem] overflow-hidden bg-[#0A0A0A] border border-white/5">
                        {block.src ? (
                            <img src={block.src} alt={block.alt} className="w-full h-auto object-cover" />
                        ) : (
                            <div className="aspect-[16/9] bg-zinc-900 flex items-center justify-center text-zinc-700 font-bold uppercase tracking-widest text-xs">
                                No Image Provided
                            </div>
                        )}
                    </div>
                    {block.alt && <p className="text-zinc-500 text-sm mt-6 text-center italic font-medium">{block.alt}</p>}
                </div>
            );
        case 'image-text':
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center my-16">
                    <div className="flex flex-col gap-4">
                        <div className="rounded-[2rem] overflow-hidden bg-zinc-900 border border-white/5 aspect-square md:aspect-auto">
                            {block.src && <img src={block.src} alt={block.alt} className="w-full h-full object-cover" />}
                        </div>
                        {block.alt && <p className="text-zinc-500 text-xs italic font-medium mt-2">{block.alt}</p>}
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="text-zinc-400 text-xl leading-relaxed">{block.content}</p>
                    </div>
                </div>
            );
        case 'text-image':
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center my-16">
                    <div className="flex flex-col gap-4 order-2 md:order-1">
                        <p className="text-zinc-400 text-xl leading-relaxed">{block.content}</p>
                    </div>
                    <div className="flex flex-col gap-4 order-1 md:order-2">
                        <div className="rounded-[2rem] overflow-hidden bg-zinc-900 border border-white/5 aspect-square md:aspect-auto">
                            {block.src && <img src={block.src} alt={block.alt} className="w-full h-full object-cover" />}
                        </div>
                        {block.alt && <p className="text-zinc-500 text-xs italic font-medium mt-2 text-right">{block.alt}</p>}
                    </div>
                </div>
            );
        case 'table':
            return (
                <div className="overflow-x-auto my-16">
                    <table className="w-full border-collapse border border-white/10 rounded-3xl overflow-hidden">
                        <thead>
                            <tr className="bg-zinc-900/50">
                                {block.rows?.[0].map((cell, i) => (
                                    <th key={i} className="border border-white/10 p-6 text-left font-bold text-white uppercase tracking-wider text-xs">{cell}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {block.rows?.slice(1).map((row, i) => (
                                <tr key={i} className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                                    {row.map((cell, j) => (
                                        <td key={j} className="border border-white/10 p-6 text-zinc-400 text-base leading-relaxed">{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        case 'heading-paragraph':
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start my-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">{block.content}</h2>
                    <p className="text-zinc-400 text-xl leading-relaxed">{block.text}</p>
                </div>
            );
        case 'paragraph-heading':
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start my-16">
                    <p className="text-zinc-400 text-xl leading-relaxed order-2 md:order-1">{block.text}</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight order-1 md:order-2">{block.content}</h2>
                </div>
            );
        case 'code':
            return (
                <pre className="bg-zinc-900 border border-white/10 rounded-2xl p-6 overflow-x-auto my-8">
                    <code className="text-amber-200 text-sm">{block.content}</code>
                </pre>
            );
        default:
            return null;
    }
};

export default async function BlogDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const blog = await getBlogBySlug(slug);
    const allBlogs = await getBlogs();

    if (!blog) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-transparent text-white">
            <ViewTracker id={blog.id} type="blog" incrementFn={incrementBlogViewCount} />

            <article className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-zinc-500 text-sm mb-12">
                    <Link href="/blog" className="hover:text-white flex items-center gap-1">
                        <ArrowLeft className="w-3 h-3" />
                        <span>All Blogs</span>
                    </Link>
                    <span>/</span>
                    <span className="text-zinc-400">{blog.categories[0]}</span>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-12 leading-tight">
                    {blog.title}
                </h1>

                {/* Author & Share */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-y border-white/5 py-8 mb-16">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-zinc-900 border border-white/10 overflow-hidden">
                            {blog.author.avatar ? (
                                <img src={blog.author.avatar} alt={blog.author.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-tr from-zinc-800 to-zinc-700" />
                            )}
                        </div>
                        <div>
                            <p className="font-bold text-white">{blog.author.name}</p>
                            <p className="text-zinc-500 text-sm">{format(new Date(blog.date), 'dd.MM.yyyy')}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-zinc-500 text-sm font-bold uppercase tracking-widest">Share</span>
                        <ShareButtons title={blog.title} path={`/blog/${blog.slug}`} />
                    </div>
                </div>

                {/* Content Section */}
                <div className="prose prose-invert max-w-none">
                    {blog.content.length > 0 ? (
                        blog.content.map((block, i) => <RenderBlock key={i} {...block} />)
                    ) : (
                        <p className="text-zinc-400 italic">No content available for this blog post.</p>
                    )}
                </div>

                {/* Categories Section - Bottom */}
                <div className="mt-16 pt-8 border-transparent">
                    <div className="flex flex-wrap gap-2">
                        {blog.categories.map(cat => (
                            <span key={cat} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-zinc-400 text-xs font-bold uppercase tracking-wider">
                                {cat}
                            </span>
                        ))}
                    </div>
                </div>
            </article>

            {/* More Articles Section */}
            <section className="py-20 bg-transparent border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-3xl font-bold">More articles</h2>
                        <Link href="/blog" className="px-6 py-2 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-all">
                            View all
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {allBlogs
                            .filter(b => b.slug !== slug)
                            .slice(0, 3)
                            .map((otherBlog) => (
                                <BlogCard
                                    key={otherBlog.id}
                                    blog={otherBlog}
                                    className="scale-95 hover:scale-100"
                                />
                            ))
                        }
                        {allBlogs.filter(b => b.slug !== slug).length === 0 && (
                            <p className="text-zinc-500 col-span-3">More insights coming soon.</p>
                        )}
                    </div>
                </div>
            </section>

            <footer className="py-20 text-center text-zinc-600 text-sm border-t border-white/5">
                © {new Date().getFullYear()} Woodfrog. All rights reserved.
            </footer>
        </main>
    );
}

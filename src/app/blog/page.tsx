import React from 'react';
import { getBlogs } from '@/lib/blogs';
import BlogCard from '@/components/blog/blog-card';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { BlogAnimations } from './blog-animations';

export const dynamic = 'force-dynamic';

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
    const { category: activeCategory = 'All' } = await searchParams;
    const blogs = await getBlogs();

    // Filter by category
    const filteredBlogs = activeCategory === 'All'
        ? blogs
        : blogs.filter(b => b.categories.includes(activeCategory));

    // Featured blogs (Top 2 of the filtered set or overall)
    const featuredBlogs = filteredBlogs.filter(b => b.isFeatured).slice(0, 2);
    // Grid blogs (The rest of the filtered set)
    const otherBlogs = filteredBlogs.filter(b => !featuredBlogs.find(fb => fb.id === b.id));

    const categories = ["All", ...Array.from(new Set(blogs.flatMap(b => b.categories)))];

    return (
        <main className="min-h-screen bg-transparent text-white selection:bg-brand-primary/20">
            <BlogAnimations>

                {/* Hero Section - Only shown when no category is selected */}
                {activeCategory === 'All' && (
                    <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-16 leading-tight">
                            We love to <span className="text-[#B59560]">read</span> between the lines.
                        </h1>

                        {featuredBlogs.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                                {featuredBlogs.map((blog) => (
                                    <BlogCard key={blog.id} blog={blog} isHero />
                                ))}
                            </div>
                        ) : (
                            <div className="py-20 text-center border border-white/5 rounded-[2.5rem] bg-white/5">
                                <p className="text-zinc-500">No featured stories yet.</p>
                            </div>
                        )}
                    </section>
                )}

                {/* Filter Section */}
                <section className={cn("py-10 px-6 max-w-7xl mx-auto", activeCategory !== 'All' && "pt-32")}>
                    {activeCategory !== 'All' && (
                        <h1 className="text-4xl md:text-5xl font-bold mb-12 capitalize">
                            {activeCategory} <span className="text-zinc-500 font-normal text-2xl ml-4">({filteredBlogs.length})</span>
                        </h1>
                    )}
                    <div className="flex flex-wrap gap-2 mb-12">
                        {categories.map((cat) => (
                            <Link
                                key={cat}
                                href={cat === 'All' ? '/blog' : `/blog?category=${encodeURIComponent(cat)}`}
                                className={`px-6 py-2 rounded-full border border-white/10 text-sm font-semibold transition-all hover:bg-white/5 ${activeCategory === cat
                                    ? 'bg-white text-black border-white'
                                    : 'text-zinc-400'
                                    }`}
                            >
                                {cat}
                            </Link>
                        ))}
                    </div>

                    {/* Blog Grid */}
                    {otherBlogs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                            {otherBlogs.map((blog) => (
                                <BlogCard key={blog.id} blog={blog} />
                            ))}
                        </div>
                    ) : featuredBlogs.length === 0 && (
                        <div className="py-32 text-center">
                            <p className="text-zinc-500 text-xl font-medium">No articles found in {activeCategory}.</p>
                        </div>
                    )}
                </section>
            </BlogAnimations>

            <footer className="py-20 text-center text-zinc-600 text-sm mt-20">
                © {new Date().getFullYear()} Woodfrog. All rights reserved.
            </footer>
        </main>
    );
}

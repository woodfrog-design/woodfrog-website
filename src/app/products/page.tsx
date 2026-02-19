import React from 'react';
import { getProducts } from '@/lib/products';
import ProductCard from '@/components/products/product-card';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';
import { LandingAnimations } from '@/app/products/landing-animations';

export const metadata: Metadata = {
    title: 'Woodfrog Website',
    description: 'Transforming data into proactive intelligence with our suite of AI and analytics products including Glimvia, Antvia, and LetMeKnow.',
};

export const dynamic = 'force-dynamic';

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
    const { category: activeCategory = 'All' } = await searchParams;
    const products = await getProducts();

    // Filter by category
    const filteredProducts = activeCategory === 'All'
        ? products
        : products.filter(p => p.categories.includes(activeCategory));

    // Featured products (Top 2 of the filtered set or overall)
    const featuredProducts = filteredProducts.filter(p => p.isFeatured).slice(0, 2);
    // Grid products (The rest of the filtered set)
    const otherProducts = filteredProducts.filter(p => !featuredProducts.find(fp => fp.id === p.id));

    const categories = ["All", ...Array.from(new Set(products.flatMap(p => p.categories)))];

    return (
        <main className="min-h-screen bg-transparent text-white selection:bg-brand-primary/20">
            <LandingAnimations>
                {/* Hero Section - Only shown when no category is selected */}
                {activeCategory === 'All' && (
                    <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-16 leading-tight">
                            Transforming data into <span className="text-[#B59560]">proactive</span> intelligence.
                        </h1>

                        {featuredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                                {featuredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} isHero />
                                ))}
                            </div>
                        ) : (
                            <div className="py-20 text-center border border-white/5 rounded-[2.5rem] bg-white/5">
                                <p className="text-zinc-500">No featured products yet.</p>
                            </div>
                        )}
                    </section>
                )}

                {/* Filter Section */}
                <section className={cn("py-10 px-6 max-w-7xl mx-auto", activeCategory !== 'All' && "pt-32")}>
                    {activeCategory !== 'All' && (
                        <h1 className="text-4xl md:text-5xl font-bold mb-12 capitalize">
                            {activeCategory} <span className="text-zinc-500 font-normal text-2xl ml-4">({filteredProducts.length})</span>
                        </h1>
                    )}
                    <div className="flex flex-wrap gap-2 mb-12">
                        {categories.map((cat) => (
                            <Link
                                key={cat}
                                href={cat === 'All' ? '/products' : `/products?category=${encodeURIComponent(cat)}`}
                                className={`px-6 py-2 rounded-full border border-white/10 text-sm font-semibold transition-all hover:bg-white/5 ${activeCategory === cat
                                    ? 'bg-white text-black border-white'
                                    : 'text-zinc-400'
                                    }`}
                            >
                                {cat}
                            </Link>
                        ))}
                    </div>

                    {/* Product Grid */}
                    {otherProducts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                            {otherProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : featuredProducts.length === 0 && (
                        <div className="py-32 text-center">
                            <p className="text-zinc-500 text-xl font-medium">No products found in {activeCategory}.</p>
                        </div>
                    )}
                </section>
            </LandingAnimations>

            <footer className="py-20 text-center text-zinc-600 text-sm mt-20 border-t border-white/5">
                © {new Date().getFullYear()} Woodfrog. All rights reserved.
            </footer>
        </main>
    );
}

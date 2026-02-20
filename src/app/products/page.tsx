import React from 'react';
import { getProducts } from '@/lib/products';
import ProductCard from '@/components/products/product-card';
import { Metadata } from 'next';
import { LandingAnimations } from '@/app/products/landing-animations';

export const metadata: Metadata = {
    title: 'Products',
    description: 'Transforming data into proactive intelligence with our suite of AI and analytics products including Glimvia, Antvia, and LetMeKnow.',
};

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
    const products = await getProducts();
    const featuredProducts = products.filter(p => p.isFeatured).slice(0, 2);
    const otherProducts = products.filter(p => !featuredProducts.find(fp => fp.id === p.id));

    return (
        <main className="min-h-screen bg-transparent text-white selection:bg-brand-primary/20">
            <LandingAnimations>
                {/* Hero Section */}
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

                {/* All Products Grid */}
                <section className="py-10 px-6 max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12">All Solutions</h2>
                    {otherProducts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                            {otherProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : featuredProducts.length === 0 && (
                        <div className="py-32 text-center">
                            <p className="text-zinc-500 text-xl font-medium">No products found.</p>
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

import React from 'react';
import { notFound } from 'next/navigation';
import { getProductBySlug, getProducts, ProductContent } from '@/lib/products';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import ProductCard from '@/components/products/product-card';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';
import Image from 'next/image';
import { DetailAnimations } from '@/app/products/detail-animations';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) return { title: 'Product Not Found' };

    return {
        title: product.title,
        description: product.tagline,
        openGraph: {
            title: product.title,
            description: product.tagline,
            images: [product.coverImage],
        }
    };
}

export async function generateStaticParams() {
    const products = await getProducts();
    return products.map((product) => ({
        slug: product.slug,
    }));
}

import { RichText, ImageTextImage, ImageLabeling, ProductTable, ProductChart } from '@/components/products/product-blocks';

const RenderBlock = (block: ProductContent) => {
    switch (block.type) {
        case 'heading':
            return (
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 mt-12 first:mt-0">
                    <span className="w-8 h-[1px] bg-[#B59560]"></span> {block.title}
                </h2>
            );
        case 'paragraph':
            return <p className="text-zinc-400 text-lg leading-relaxed mb-6">{block.content}</p>;
        case 'text':
            return <RichText content={block.content || ''} />;
        case 'list':
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {block.items?.map((item, i) => (
                        <div key={i} className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-[#B59560]/30 transition-all group">
                            <p className="text-zinc-300 group-hover:text-white transition-colors">{item}</p>
                        </div>
                    ))}
                </div>
            );
        case 'image':
            return (
                <div className="my-12 flex flex-col items-center">
                    <div className="relative rounded-[2.5rem] overflow-hidden bg-[#0A0A0A] border border-white/5 shadow-2xl max-w-[260px] md:max-w-[320px] aspect-[9/19.5]">
                        {block.src && <img src={block.src} alt={block.alt} className="w-full h-full object-cover" />}
                    </div>
                    {block.alt && <p className="text-zinc-500 text-sm mt-6 text-center italic font-medium">{block.alt}</p>}
                </div>
            );
        case 'image-text-left':
            return <ImageTextImage src={block.src || ''} alt={block.alt || ''} title={block.title} content={block.content} reverse />;
        case 'image-text-right':
            return <ImageTextImage src={block.src || ''} alt={block.alt || ''} title={block.title} content={block.content} />;
        case 'image-labeling':
            return <ImageLabeling src={block.src || ''} alt={block.alt || ''} labels={block.labels || []} />;
        case 'table':
            return <ProductTable title={block.title} data={block.tableData || { headers: [], rows: [] }} />;
        case 'charts':
            return (
                <div className="my-12">
                    {block.title && <h3 className="text-xl font-bold text-white mb-8 underline decoration-[#B59560]/30">{block.title}</h3>}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {block.chartData && <ProductChart title={`${block.chartData.type.toUpperCase()} View`} chart={block.chartData} />}
                    </div>
                </div>
            );
        default:
            return null;
    }
};

export default async function ProductDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);
    const allProducts = await getProducts();

    if (!product) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-transparent text-white">
            <DetailAnimations>
                <article className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                        <Link href="/products" className="text-zinc-500 hover:text-white transition-colors">Products</Link>
                        <span className="text-zinc-800">/</span>
                        <span className="text-brand-primary">{product.title}</span>
                    </nav>

                    {/* Hero Content */}
                    <div className="mb-16">
                        <div className="flex flex-wrap gap-2 mb-6">
                            {product.categories.map(cat => (
                                <span key={cat} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[#B59560] text-[10px] font-black uppercase tracking-widest">
                                    {cat}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                            {product.title}
                        </h1>
                        <p className="text-xl text-zinc-400 leading-relaxed font-medium mb-12">
                            {product.tagline}
                        </p>

                        <div className="relative rounded-[2.5rem] overflow-hidden bg-[#1A1A1A] border border-white/5 aspect-[21/10] shadow-2xl mb-20 max-w-4xl mx-auto">
                            <img
                                src={product.coverImage}
                                alt={product.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex flex-col gap-16">
                        {/* Content Column */}
                        <div className="w-full max-w-4xl mx-auto">
                            <div className="prose prose-invert max-w-none">
                                {product.blocks.map((block, i) => <RenderBlock key={i} {...block} />)}
                            </div>
                        </div>
                    </div>
                </article>
            </DetailAnimations>

            {/* Related Products Section */}
            <section className="py-24 bg-transparent border-t border-white/5 mt-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-between mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold">Related Solutions</h2>
                        <Link href="/products" className="text-[#B59560] font-bold flex items-center gap-2 hover:gap-3 transition-all">
                            View all products <ArrowLeft className="w-4 h-4 rotate-180" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        {allProducts
                            .filter(p => p.slug !== slug)
                            .slice(0, 3)
                            .map((otherProduct) => (
                                <ProductCard
                                    key={otherProduct.id}
                                    product={otherProduct}
                                    className="scale-95 hover:scale-100 opacity-80 hover:opacity-100 transition-all duration-500"
                                />
                            ))
                        }
                    </div>
                </div>
            </section>

            <footer className="py-20 text-center text-zinc-600 text-sm border-t border-white/5">
                © {new Date().getFullYear()} Woodfrog. All rights reserved.
            </footer>
        </main>
    );
}

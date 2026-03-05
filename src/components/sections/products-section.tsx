'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { getFeaturedProducts, Product } from '@/lib/products';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const ProductsSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getProducts();
            // Show 3 products, prioritizing featured ones
            const sorted = [...data].sort((a, b) => {
                if (a.isFeatured && !b.isFeatured) return -1;
                if (!a.isFeatured && b.isFeatured) return 1;
                return 0;
            });
            setProducts(sorted.slice(0, 3));
            setIsLoading(false);
        };
        fetchProducts();
    }, []);

    return (
        <section ref={sectionRef} className="w-full bg-transparent py-8 md:py-16 flex flex-col items-center justify-center overflow-hidden">
            {/* Section Heading */}
            <div className="w-full px-6 md:px-32 mb-6 md:mb-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-3xl md:text-5xl font-black text-[#f4e8df] leading-tight mb-2">
                        Designed beyond the <span className="text-brand-primary">obvious.</span>
                    </h2>
                    <p className="text-[#8891A5] text-sm md:text-lg font-bold tracking-wide">
                        Step inside our work.
                    </p>
                </motion.div>
            </div>

            {/* Products Row/Grid */}
            <div className="w-full px-6 md:px-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {isLoading ? (
                        Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="aspect-[16/10] bg-white/5 rounded-2xl animate-pulse border border-white/10" />
                        ))
                    ) : products.length > 0 ? (
                        products.map((product, idx) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                className="group relative flex flex-col bg-[#031722]/40 border border-white/10 rounded-2xl overflow-hidden hover:border-brand-primary/40 transition-all duration-500 shadow-xl"
                            >
                                {/* Media Content */}
                                <Link href={`/products/${product.slug}`} className="relative w-full aspect-[16/10] overflow-hidden block border-b border-white/5">
                                    <img
                                        src={product.coverImage}
                                        alt={product.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                                    {/* Category Bubble */}
                                    <div className="absolute bottom-4 left-4">
                                        <span className="px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                                            {product.categories[0]}
                                        </span>
                                    </div>
                                </Link>

                                {/* Text Content */}
                                <div className="p-6 flex flex-col flex-1">
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-primary transition-colors duration-300">
                                        {product.title}
                                    </h3>
                                    <p className="text-zinc-500 text-sm leading-relaxed mb-6 line-clamp-2">
                                        {product.tagline}
                                    </p>

                                    <div className="mt-auto flex flex-wrap items-center gap-6">
                                        <Link href={`/products/${product.slug}`} className="flex items-center gap-4 group/btn cursor-pointer w-fit">
                                            <span className="text-brand-primary font-black uppercase text-[10px] tracking-[0.2em] relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-brand-primary group-hover/btn:after:w-full after:transition-all after:duration-500">
                                                View product details
                                            </span>
                                        </Link>

                                        {product.slug === 'glimvia' && (
                                            <a href="https://www.glimvia.app/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group/btn cursor-pointer w-fit">
                                                <span className="text-[#B59560] font-black uppercase text-[10px] tracking-[0.2em] relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#B59560] group-hover/btn:after:w-full after:transition-all after:duration-500">
                                                    Visit the product
                                                </span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center">
                            <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm">No products found</p>
                        </div>
                    )}
                </div>
            </div>

            {/* See All Button */}
            {!isLoading && products.length > 2 && (
                <div className="mt-8 flex justify-center">
                    <Link
                        href="/products"
                        className="group/seeall flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:border-brand-primary/50 transition-all duration-300"
                    >
                        <span className="text-[#E6EAF0] font-bold text-sm tracking-tight group-hover/seeall:text-brand-primary transition-colors">
                            Browse Portfolio
                        </span>
                        <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </Link>
                </div>
            )}
        </section>
    );
};

export { ProductsSection };

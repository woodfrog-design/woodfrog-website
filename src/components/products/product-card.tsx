'use client';

import React from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Product } from '@/lib/products';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ProductCardProps {
    product: Product;
    className?: string;
    isHero?: boolean;
}

const ProductCard = ({ product, className, isHero = false }: ProductCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={cn("h-full", className)}
        >
            <Link
                href={`/products/${product.slug}`}
                className="group relative flex flex-col h-full transition-all duration-300 gap-6"
            >
                {/* Image Container */}
                <div className={cn(
                    "relative overflow-hidden rounded-[2.5rem] bg-[#1A1A1A] border border-white/5 aspect-[16/10]"
                )}>
                    {product.coverImage ? (
                        <Image
                            src={product.coverImage}
                            alt={product.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                            <span className="text-zinc-600 font-medium">No Image</span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="flex flex-col gap-6 px-2">
                    {/* Product Categories */}
                    <div className="flex flex-wrap gap-2">
                        {product.categories.slice(0, 3).map((cat) => (
                            <span key={cat} className="px-4 py-1.5 border border-white/10 bg-white/5 text-zinc-400 text-[9px] uppercase tracking-[0.2em] font-black rounded-full transition-all group-hover:border-[#B59560]/30 group-hover:text-white">
                                {cat}
                            </span>
                        ))}
                    </div>

                    <h3 className={cn(
                        "font-bold text-white transition-colors group-hover:text-[#B59560] leading-tight",
                        isHero ? "text-3xl lg:text-5xl" : "text-2xl"
                    )}>
                        {product.title}
                    </h3>

                    <div className="mt-2 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                            {/* Placeholder for Product Icon / Logo */}
                            <div className="w-full h-full bg-gradient-to-tr from-zinc-800 to-zinc-700 flex items-center justify-center text-[10px] font-bold text-white/50">
                                {product.title.charAt(0)}
                            </div>
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <span className="text-white text-sm font-bold">{product.tagline}</span>
                            <span className="text-zinc-600 text-[10px] font-black uppercase tracking-widest">{format(new Date(product.date), 'MMMM d, yyyy')}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default ProductCard;

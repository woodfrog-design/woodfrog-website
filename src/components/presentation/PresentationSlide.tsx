'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PresentationVideo } from './PresentationVideo';

interface PresentationSlideProps {
  tagline: string;
  title: string;
  description: string;
  order: 'text-first' | 'animation-first';
  videoSrc?: string;
  metadata?: {
    left: string;
    right: string;
  };
}

export const PresentationSlide: React.FC<PresentationSlideProps> = ({
  tagline,
  title,
  description,
  order,
  videoSrc,
  metadata
}) => {
  const isTextFirst = order === 'text-first';

  return (
    <section className="h-screen w-full flex flex-col justify-center px-8 md:px-24 bg-[#0a0d14] relative overflow-hidden">
      {/* Slide Chrome (Meta information) */}
      <div className="absolute top-10 left-8 md:left-24 right-8 md:right-24 flex justify-between items-center z-20">
        <span className="font-mono text-[10px] text-[#7a8394] uppercase tracking-[0.2em]">
          {metadata?.left || 'WOODFROG · PRESENTATION'}
        </span>
        <span className="font-mono text-[10px] text-[#4a5364] uppercase tracking-[0.2em]">
          {metadata?.right || '2026_DECK'}
        </span>
      </div>

      <div className="absolute top-16 left-8 md:left-24 right-8 md:right-24 h-px bg-white/5 z-20" />

      {/* Main Content Grid */}
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center`}>
        {/* Text Section */}
        <motion.div 
          initial={{ opacity: 0, x: isTextFirst ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.5 }}
          className={`space-y-6 lg:space-y-8 ${isTextFirst ? 'lg:order-1' : 'lg:order-2'}`}
        >
          <span className="font-mono text-xs text-[#5eead4] uppercase tracking-[0.3em] block">
            {tagline}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-[1.1] tracking-tight">
            {title}
          </h2>
          <p className="text-[#b4bcca] text-lg md:text-xl leading-relaxed max-w-xl">
            {description}
          </p>
          <div className="pt-4 flex gap-6 items-center">
            <div className="h-px w-12 bg-[#c9a961]" />
            <span className="text-[#7a8394] font-mono text-[10px] uppercase tracking-widest">
              Woodfrog Intelligence
            </span>
          </div>
        </motion.div>

        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
          className={`${isTextFirst ? 'lg:order-2' : 'lg:order-1'}`}
        >
          <PresentationVideo src={videoSrc} />
        </motion.div>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-10 left-8 md:left-24 right-8 md:right-24 flex justify-between items-center z-20">
        <span className="font-mono text-[9px] text-[#4a5364] uppercase tracking-[0.3em]">
          © 2026 WOODFROG LTD
        </span>
        <div className="flex gap-4">
          <div className="w-1.5 h-1.5 bg-[#5eead4]/40 rounded-full" />
          <div className="w-1.5 h-1.5 bg-[#c9a961]/40 rounded-full" />
        </div>
      </div>
    </section>
  );
};

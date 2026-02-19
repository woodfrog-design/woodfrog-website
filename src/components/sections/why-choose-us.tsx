'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const GoldCurveGraphic = () => (
    <motion.svg
        width="300" height="300" viewBox="0 0 200 200" fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="scale-x-[-1]"
        variants={{
            initial: { x: 0, transition: { duration: 0.2 } },
            hover: { x: -20, transition: { duration: 0.4, ease: "easeOut" } }
        }}
    >
        <path
            d="M100 100 C85 80 70 65 45 40 L65 20 C95 50 115 75 130 100 C115 125 95 150 65 180 L45 160 C70 135 85 120 100 100 Z"
            fill="#E6B86A"
            fillOpacity="0.8"
        />
    </motion.svg>
);

const SunburstPlaceholder = () => (
    <svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#d9f99d]/20">
        <path d="M120 0L125.511 84.4889L210 90L134.489 130.511L140 215L90 145.511L10 180L75.5111 114.489L0 45L84.4889 74.4889L120 0Z" fill="currentColor" fillOpacity="0.5" />
        <rect x="110" y="110" width="20" height="20" transform="rotate(45 120 120)" fill="currentColor" />
    </svg>
);

const WFLogoAnimation = ({ trigger }: { trigger: boolean }) => {
    const [hasMerged, setHasMerged] = React.useState(false);

    React.useEffect(() => {
        if (trigger && !hasMerged) {
            setHasMerged(true);
        }
    }, [trigger, hasMerged]);

    return (
        <div className="relative w-[340px] h-[260px]">
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 64 48"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="w-full h-full overflow-visible"
            >
                {/* STATIC LOGO - Disappears instantly on trigger */}
                <motion.path
                    initial={{ opacity: 1 }}
                    animate={hasMerged ? { opacity: 0 } : { opacity: 1 }}
                    transition={{ duration: 0 }}
                    d="M32 4 L12 44 L18 44 L32 16 L46 44 L52 44 Z"
                    fill="#39D6E3"
                    fillOpacity="1"
                />

                {/* ANIMATING PARTS - Appear and merge */}
                {/* LEFT PART - Comes from Up */}
                <motion.path
                    initial={{ opacity: 0, y: -80 }}
                    animate={hasMerged ? { opacity: 1, y: 0 } : { opacity: 0, y: -80 }}
                    transition={{
                        opacity: { duration: 0, delay: 0.05 },
                        y: { delay: 0.1, duration: 0.8, ease: "easeOut" }
                    }}
                    d="M32 4 L12 44 L18 44 L32 16 Z"
                    fill="#39D6E3"
                    fillOpacity="1"
                />
                {/* RIGHT PART - Comes from Down */}
                <motion.path
                    initial={{ opacity: 0, y: 80 }}
                    animate={hasMerged ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
                    transition={{
                        opacity: { duration: 0, delay: 0.05 },
                        y: { delay: 0.1, duration: 0.8, ease: "easeOut" }
                    }}
                    d="M32 4 L32 16 L46 44 L52 44 Z"
                    fill="#39D6E3"
                    fillOpacity="1"
                />
            </svg>
        </div>
    );
};

const choices = [
    {
        id: 1,
        title: "For AI Model",
        subtitle: "Developers",
        description: "Build, train, and monetize AI models with access to high-quality datasets, end-to-end developer tools, and multiple revenue opportunities in an open, collaborative ecosystem.",
        cta: "AI Developer Platform"
    },
    {
        id: 2,
        title: "AI Data Services",
        subtitle: "for Enterprises",
        description: "Access a global, on-demand workforce for high-quality data pipelines, spanning data collection, labeling, enrichment, and validation for AI development.",
        cta: "AI Data Services"
    },
    {
        id: 3,
        title: "For Resource",
        subtitle: "Providers",
        description: "Contribute compute, storage, or bandwidth to the network and earn rewards. Power the next generation of AI applications while maximizing your hardware utility.",
        cta: "Provider Portal"
    },
    {
        id: 4,
        title: "Decentralized",
        subtitle: "Governance",
        description: "Participate in the evolution of the platform through democratic voting and proposal systems. Your voice matters in shaping the future of AI infrastructure.",
        cta: "Governance Hub"
    }
];

const WhyChooseUs = () => {
    const [hoveredIdx, setHoveredIdx] = React.useState<number | null>(null);

    return (
        <section className="w-full bg-transparent py-12 md:py-24 relative overflow-hidden">
            <div className="mx-auto px-4 md:px-12 md:px-32">

                {/* Branding Heading */}
                <div className="mb-8 md:mb-24 lg:-translate-x-[60px]">
                    <h2 className="text-4xl md:text-7xl lg:text-8xl font-black text-[#f4e8df] tracking-tighter leading-none">
                        Woodfrog <br />
                        <span className="text-brand-primary italic">is for Everyone</span>
                    </h2>
                </div>

                {/* Container */}
                <div className="relative flex flex-col items-stretch md:items-start lg:-translate-x-[60px] gap-5 md:gap-0">

                    {choices.map((choice, idx) => (
                        <motion.div
                            key={choice.id}
                            initial="initial"
                            whileHover="hover"
                            onMouseEnter={() => setHoveredIdx(idx)}
                            onMouseLeave={() => setHoveredIdx(null)}
                            viewport={{ once: true }}
                            className={`
                relative w-full lg:w-[75%] p-5 md:p-10 rounded-[1.25rem] md:rounded-[3rem] border border-white/5 shadow-2xl overflow-hidden
                bg-[var(--brand-card-bg)]
                ${idx === 0 ? 'z-0 md:self-start' : ''}
                ${idx === 1 ? 'z-10 md:self-end md:-mt-32 lg:-ml-24' : ''}
                ${idx === 2 ? 'z-20 md:self-start md:-mt-24 lg:-mr-16' : ''}
                ${idx === 3 ? 'z-30 md:self-end md:-mt-32 lg:-ml-12' : ''}
              `}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 50, scale: 0.98 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: idx * 0.15 }}
                                className="w-full h-full absolute inset-0 pointer-events-none"
                            />

                            {/* Background Decoration */}
                            <div className={`absolute
                ${idx === 0 ? 'top-0 right-0 opacity-30 mix-blend-overlay rotate-12 -translate-y-1/2 translate-x-1/4 max-md:scale-[0.45] max-md:translate-x-1/2 max-md:-translate-y-1/3' : ''}
                ${idx === 1 ? 'top-[30px] right-[20px] opacity-100 scale-110 rotate-0 max-md:scale-[0.5] max-md:top-[-20px] max-md:right-[-105px]' : ''}
                ${idx === 2 ? 'top-0 right-0 opacity-30 mix-blend-overlay rotate-90 -translate-y-1/2 translate-x-1/4 max-md:scale-[0.45] max-md:translate-x-1/2 max-md:-translate-y-1/4' : ''}
                ${idx === 3 ? 'top-[160px] right-[10px] opacity-100 scale-150 rotate-0 -translate-y-1/2 translate-x-1/4 max-md:scale-75 max-md:top-[130px] max-md:right-[-40px]' : ''}
              `}>
                                {idx === 1 ? <WFLogoAnimation trigger={hoveredIdx === 1} /> :
                                    idx === 3 ? <GoldCurveGraphic /> : <SunburstPlaceholder />}
                            </div>

                            <div className="relative z-10 flex flex-col items-start gap-3 md:gap-5">
                                <div className="max-w-[65%] md:max-w-xl">
                                    <h3 className="text-xl md:text-5xl font-black text-[#E6EAF0] leading-tight tracking-tight">
                                        {idx === 0 ? <>For AI Model <br /><span className="text-brand-primary">Developers</span></> :
                                            idx === 1 ? <>AI Data Services <br /><span className="text-[#E6EAF0]">for </span><span className="text-brand-primary">Enterprises</span></> :
                                                idx === 2 ? <>For Resource <br /><span className="text-brand-primary">Providers</span></> :
                                                    idx === 3 ? <><span className="text-[#E6EAF0]">Decentralized</span> <br /><span className="text-brand-primary">Governance</span></> :
                                                        choice.title}
                                    </h3>
                                </div>

                                <p className="text-[#8891A5] text-xs md:text-lg leading-relaxed max-w-[75%] md:max-w-lg font-medium">
                                    {choice.description}
                                </p>

                                <div className="flex flex-wrap items-center gap-3 md:gap-6 mt-1 md:mt-2">
                                    <button className="bg-[#d9f99d] text-black px-3 md:px-6 py-1.5 md:py-2.5 rounded-full font-bold text-[10px] md:text-sm tracking-tight transition-transform duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-[#d9f99d]/10">
                                        {choice.cta}
                                    </button>
                                    <div className="group flex items-center gap-1 md:gap-2 cursor-pointer">
                                        <span className="text-[#E6EAF0] font-bold text-[10px] md:text-sm tracking-tight group-hover:text-[#d9f99d] transition-colors">
                                            Learn More
                                        </span>
                                        <ArrowUpRight size={12} className="md:w-4 md:h-4 text-[#d9f99d] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                </div>
            </div>
        </section>
    );
};

export { WhyChooseUs };


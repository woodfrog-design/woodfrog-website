'use client';

import React from 'react';

const companyImages = [
    '/company1.svg',
    '/company2.svg',
    '/company3.svg',
    '/company4.svg',
    '/company5.svg',
    '/company6.svg',
    '/company7.svg',
    '/company8.svg',
];

const CompanyLogos = () => {
    // Mobile detection for aggressive scaling
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Scaling variable as requested by the user
    // logoScale controls the height of symbols and the spacing between them
    const logoScale = isMobile ? 0.6 : 1;

    // Triple the items for a seamless long duration loop
    const marqueeItems = [...companyImages, ...companyImages, ...companyImages];
    const duration = isMobile ? 25 : 35;

    return (
        <section className={`w-full bg-transparent ${isMobile ? 'py-12' : 'py-24'} overflow-hidden`}>
            {/* CSS keyframe for marquee - much lighter than Framer Motion's JS-driven animation loop */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes marqueeScroll {
                    0% { transform: translateX(-33.33%); }
                    100% { transform: translateX(0%); }
                }
            `}} />

            <div className={`mx-auto ${isMobile ? 'px-6 mb-8 text-center' : 'px-12 md:px-32 mb-16'}`}>
                <p className="text-[#8891A5] text-sm font-bold uppercase tracking-[0.4em]">
                    Trusted partner of
                </p>
            </div>

            <div
                className="relative flex items-center"
                style={{
                    maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
                }}
            >
                <div
                    className="flex items-center px-12"
                    style={{
                        width: 'fit-content',
                        gap: isMobile ? '3rem' : '6rem',
                        animation: `marqueeScroll ${duration}s linear infinite`,
                        willChange: 'transform',
                    }}
                >
                    {marqueeItems.map((src, idx) => (
                        <div
                            key={idx}
                            className={`flex items-center justify-center ${isMobile ? 'min-w-[100px]' : 'min-w-[180px]'} opacity-50 hover:opacity-100 transition-opacity duration-500`}
                        >
                            {/* Using standard img tag so it's easier for the user to debug local file addition */}
                            <img
                                src={src}
                                alt={`Company ${idx % 8 + 1}`}
                                className="object-contain brightness-0 invert"
                                style={{
                                    height: isMobile ? '1.75rem' : '3rem', // ~h-7 vs h-12
                                    width: 'auto'
                                }}
                                onError={(e) => {
                                    // Fallback for missing images
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                        </div>
                    ))}
                </div>


            </div>
        </section>
    );
};

export { CompanyLogos };

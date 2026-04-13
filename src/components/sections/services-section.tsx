"use client";

import React from "react";

export const ServicesSection = () => {
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const svgScale = isMobile ? 1.5 : 1;
    const mobileMargin = isMobile ? "mt-12" : "mt-0";

    return (
        <section className="w-full bg-transparent pt-0 pb-20 md:pb-32 px-6 md:px-32 relative overflow-hidden">
            <div className="max-w-[1400px] mx-auto w-full">
                <div
                    className={`relative w-full aspect-[1400/320] md:scale-110 lg:scale-125 origin-center transition-transform duration-500 ${mobileMargin}`}
                    style={{ transform: isMobile ? `scale(${svgScale})` : undefined }}
                >
                    <svg
                        viewBox="0 0 1400 320"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full overflow-visible"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        {/* Lower looping line */}
                        <path
                            d="M637.5 170 H287.5 C227.5 170 227.5 235 287.5 235 H1099.5"
                            fill="none"
                            stroke="var(--brand-primary)"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />

                        {/* Upper looping line */}
                        <path
                            d="M617.5 105 H1112.5 C1172.5 105 1172.5 165 1112.5 165"
                            fill="none"
                            stroke="var(--brand-primary)"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />

                        {/* Text */}
                        <text
                            x="287.5"
                            y="130"
                            fontSize="52"
                            fill="#FFFFFF"
                            fontFamily="Inter, Helvetica, Arial, sans-serif"
                        >
                            We make the
                        </text>

                        <text
                            x="647.5"
                            y="190"
                            fontSize="64"
                            fill="#FFFFFF"
                            fontFamily="Georgia, 'Times New Roman', serif"
                        >
                            complex
                        </text>

                        <text
                            x="917.5"
                            y="190"
                            fontSize="64"
                            fill="var(--brand-primary)"
                            fontFamily="Georgia, 'Times New Roman', serif"
                        >
                            simple.
                        </text>
                    </svg>
                </div>
            </div>

            {/* Subtle Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]" />
        </section>
    );
};

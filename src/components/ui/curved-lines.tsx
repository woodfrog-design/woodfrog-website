'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CurvedLinesProps {
    className?: string;
}

const CurvedLines: React.FC<CurvedLinesProps> = ({ className }) => {
    /**
     * === V-SHAPE CONTROL PARAMETERS ===
     * 
     * BEAM ANIMATION: Uses stroke-dasharray to create a traveling light segment
     * that follows the EXACT curve shape (like water flowing through a pipe)
     * 
     * - dashLength: Length of the bright segment (smaller = shorter beam)
     * - gapLength: Total path length to create the gap
     * - Animation moves strokeDashoffset to slide the bright segment along
     */

    const vShapeLines = [
        // Broad U-shape (95% of width) with small symmetric concave edges
        // Edge curves are just 5% on each side, main U takes the remaining 90%
        // {
        //     d: "M -600 650 C -700 500, -450 0, -1200 +1800 C 250 150, 320 750, 500 788 C 780 710, +780 550, 1030 +750 C 1130 0, 1300 400, 1300 400",
        //     opacity: 0.12,
        //     strokeWidth: 1.5,
        //     beamWidth: 3
        // },
        // {
        //     d: "M-39.9999 373.913 C154.266 364.127 279.431 381.037 404.794 437.56 C514.014 492.449 581.279 583.38 618.35 712.787 C626.639 741.72 652.314 762.881 682.411 762.881 V762.881 C712.507 762.881 738.182 741.72 746.471 712.787 C783.543 583.38 850.808 492.449 960.03 437.56 C1064.53 383.389 1207.69 364.321 1400 373.668",

        //     opacity: 0.12,
        //     transform: "translate(-1000, 1160)",
        //     strokeWidth: 1.5,
        //     beamWidth: 3
        // },
        // {
        //     d:"M-0.000154656 4.57922C212.022 7.36982 347.714 37.5073 444.794 98.9625C558.954 171.064 620.07 286.424 688.681 453.122C695.6 466.965 701.942 483.693 722.122 483.693C742.302 483.693 749.221 466.965 756.14 453.122C824.751 287.578 885.867 172.217 1000.03 98.9627C1096.36 37.9829 1231.21 7.83826 1440 4.64919",
        //     opacity: 0.08,
        //     strokeWidth: 1.0,
        //     beamWidth: 2.5
        // },
        {
            d: "M -300 200 C -100 1800, 200 1800, 400 800 C 460 700, 540 700, 600 800 C 800 1800, 1100 1800, 1300 200",





            opacity: 0.15,
            strokeWidth: 2.0,
            beamWidth: 4.0
        },
        {
            d: "M -300 400 C -200 400, -130 0, -30 200 C 220 250, 320 1000, 500 1100 C 680 1000, 780 250, 1030 200 C 1130 0, 1200 400, 1300 400",
            opacity: 0.15,
            strokeWidth: 2.0,
            beamWidth: 4.0                  //main line
        },



    ];

    // Beam segment length (how long the bright part is)
    const beamLength = 100;
    // Total path length estimate
    const pathLength = 3000;

    return (
        <div className={`pointer-events-none select-none ${className}`}>
            <svg
                viewBox="0 0 1000 900"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full overflow-visible"
                preserveAspectRatio="none"
            >
                <defs>
                    <filter id="beam-glow" x="-100%" y="-100%" width="300%" height="300%">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>

                    <filter id="intense-glow" x="-100%" y="-100%" width="300%" height="300%">
                        <feGaussianBlur stdDeviation="6" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Base static lines with subtle glow */}
                <g filter="url(#beam-glow)">
                    {vShapeLines.map((line, i) => (
                        <path
                            key={`base-${i}`}
                            d={line.d}
                            stroke="var(--brand-primary)"
                            strokeWidth={line.strokeWidth}
                            strokeLinecap="round"
                            opacity={line.opacity}
                            fill="none"
                        />
                    ))}
                </g>

                {/* Traveling beam - follows EXACT curve shape like water in pipe */}
                {vShapeLines.map((line, i) => (
                    <motion.path
                        key={`beam-${i}`}
                        d={line.d}
                        stroke="var(--brand-primary)"
                        strokeWidth={line.beamWidth}
                        strokeLinecap="round"
                        fill="none"
                        filter="url(#intense-glow)"
                        strokeDasharray={`${beamLength} ${pathLength}`}
                        initial={{ strokeDashoffset: pathLength }}
                        animate={{ strokeDashoffset: -pathLength }}
                        transition={{
                            duration: 5,
                            delay: 0,
                            repeat: Infinity,
                            repeatDelay: 1,
                            ease: "easeInOut"
                        }}
                        style={{ opacity: 0.9 }}
                    />
                ))}
            </svg>
        </div>
    );
};

export { CurvedLines };

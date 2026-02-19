"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedNumberProps {
    value: string | number;
    className?: string;
    delay?: number;
    duration?: number;
}

export const AnimatedNumber = ({ value, className, delay = 0, duration = 1.5 }: AnimatedNumberProps) => {
    const textRef = useRef<HTMLSpanElement>(null);
    const containerRef = useRef<HTMLSpanElement>(null);

    // Parse numeric value and suffix
    const strValue = value.toString();
    const numericMatch = strValue.match(/[\d,.]+/);
    const numericPart = numericMatch ? numericMatch[0] : "0";
    const suffix = strValue.replace(numericPart, "");
    const prefixMatch = strValue.match(/^[^\d,.]+/);
    const prefix = prefixMatch ? prefixMatch[0] : "";
    const cleanNumericPart = numericPart.replace(/,/g, "");

    const targetValue = parseFloat(cleanNumericPart);
    const [displayValue, setDisplayValue] = useState(prefix + "0" + suffix);

    useGSAP(() => {
        if (!containerRef.current) return;

        const obj = { val: 0 };

        gsap.to(obj, {
            val: targetValue,
            duration: duration,
            delay: delay,
            ease: "power2.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 95%",
                once: true,
            },
            onUpdate: () => {
                let formatted: string;
                if (numericPart.includes(",")) {
                    formatted = Math.round(obj.val).toLocaleString();
                } else if (numericPart.includes(".")) {
                    const decimals = numericPart.split(".")[1].length;
                    formatted = obj.val.toFixed(decimals);
                } else {
                    formatted = Math.round(obj.val).toString();
                }
                setDisplayValue(prefix + formatted + suffix);
            }
        });
    }, { dependencies: [targetValue, delay, duration], scope: containerRef });

    return (
        <span ref={containerRef} className={className}>
            <span ref={textRef}>{displayValue}</span>
        </span>
    );
};

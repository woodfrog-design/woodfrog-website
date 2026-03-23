'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const SERVICES = [
    {
        title: "Superset Analytics",
        description: "Apache Superset Customization, Embedding & Optimization",
        href: "/superset-analytics",
    },
    {
        title: "Data Visualization",
        description: "Enterprise Data Visualization Experts | Design-driven",
        href: "/data-visualization",
    },
    {
        title: "Data Engineering",
        description: "Cloud Infrastructure & Data Platform Experts",
        href: "/data-engineering",
    },
    {
        title: "AI Governance",
        description: "Governance, Ethics & Compliance Experts",
        href: "/ai-governance",
    },
    {
        title: "Applications and Automations",
        description: "Enterprise Automation Experts",
        href: "/applications-and-automations",
    },
    // {
    //     title: "Design UI/UX",
    //     description: "UI/UX Design Experts",
    //     href: "/design-ui-ux",
    // },
    {
        title: "Data Agents",
        description: "Intelligent Data Agents for Automated Insights",
        href: "/data-agents",
    },
    // {
    //     title: "AI Agents",
    //     description: "Custom AI Agents & Intelligent Automation Experts",
    //     href: "/ai-agents",
    // },
    {
        title: "Helpdesk",
        description: "Specialized Assistance for Your Analytics Solutions",
        href: "/helpdesk",
    },
];

const PRODUCTS = [
    {
        title: "Glimvia",
        description: "Mobile-first Analytics Alerting",
        href: "/products/glimvia",
    },
    {
        title: "Antvia",
        description: "Unified Data & AI Platform",
        href: "/products/antvia",
    },
    {
        title: "LetMeKnow",
        description: "Intelligent Monitoring Platform",
        href: "/products/letmeknow",
    },
    {
        title: "AI Assurance & Governance",
        description: "Pre & Post Deployment Solutions",
        href: "/products",
    }
];

const WOODFROG_LINKS = [
    {
        title: "About",
        description: "What Drives Us",
        href: "/about"
    },
    // {
    //     title: "Team",
    //     description: "Meet The Experts Behind Our Solutions",
    //     href: "/team"
    // },
    {
        title: "Careers",
        description: "Grow Your Potential With Us",
        href: "/careers"
    },
    {
        title: "Blog",
        description: "The Go-To Blog to Help You Get The Most Out of Your Data",
        href: "/blog"
    },
    {
        title: "Contact",
        description: "Ready to Talk About Your Next Project?",
        href: "/contact"
    }
];

const ServiceIcon = ({ title }: { title: string }) => {
    const iconBaseClass = "flex-shrink-0 w-12 h-12 block";

    // Data Visualization
    if (title === "Data Visualization") {
        return (
            <svg className={iconBaseClass} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <rect width="64" height="64" rx="12" fill="#1F1F1F" />
                <path d="M32 10 A22 22 0 0 1 54 32" stroke="#10B981" strokeWidth="4" fill="none" strokeLinecap="round" />
                <path d="M54 32 A22 22 0 0 1 32 54" stroke="#FBBF24" strokeWidth="4" fill="none" strokeLinecap="round" />
                <path d="M32 54 A22 22 0 0 1 10 32" stroke="#10B981" strokeWidth="4" fill="none" strokeLinecap="round" />
                <path d="M10 32 A22 22 0 0 1 32 10" stroke="#FBBF24" strokeWidth="4" fill="none" strokeLinecap="round" />
            </svg>
        );
    }

    // Data Engineering
    if (title === "Data Engineering") {
        return (
            <svg className={iconBaseClass} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <rect width="64" height="64" rx="12" fill="#1F1F1F" />
                <rect x="18" y="18" width="12" height="12" fill="#10B981" />
                <rect x="34" y="18" width="12" height="12" fill="#FBBF24" />
                <rect x="18" y="34" width="12" height="12" fill="#10B981" />
                <rect x="34" y="34" width="12" height="12" fill="#FBBF24" />
            </svg>
        );
    }

    // AI Governance
    if (title === "AI Governance") {
        return (
            <svg className={iconBaseClass} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <rect width="64" height="64" rx="12" fill="#1F1F1F" />
                <rect x="16" y="20" width="20" height="24" fill="#10B981" />
                <rect x="40" y="20" width="4" height="24" fill="#FBBF24" />
                <rect x="48" y="20" width="4" height="24" fill="#FBBF24" />
            </svg>
        );
    }

    // Applications and Automations
    if (title === "Applications and Automations") {
        return (
            <svg className={iconBaseClass} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <rect width="64" height="64" rx="12" fill="#1F1F1F" />
                <rect x="14" y="26" width="22" height="12" fill="#10B981" />
                <rect x="40" y="18" width="10" height="8" fill="#FBBF24" />
                <rect x="40" y="28" width="10" height="8" fill="#FBBF24" />
                <rect x="40" y="38" width="10" height="8" fill="#FBBF24" />
                <line x1="36" y1="32" x2="40" y2="22" stroke="#FBBF24" strokeWidth="2" />
                <line x1="36" y1="32" x2="40" y2="32" stroke="#FBBF24" strokeWidth="2" />
                <line x1="36" y1="32" x2="40" y2="42" stroke="#FBBF24" strokeWidth="2" />
            </svg>
        );
    }

    // Data Agents
    if (title === "Data Agents") {
        return (
            <svg className={iconBaseClass} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <rect width="64" height="64" rx="12" fill="#1F1F1F" />
                <rect x="18" y="22" width="28" height="4" fill="#10B981" />
                <rect x="18" y="30" width="20" height="4" fill="#FBBF24" />
                <rect x="18" y="40" width="28" height="4" fill="#10B981" />
                <circle cx="14" cy="24" r="2" fill="#FBBF24" />
            </svg>
        );
    }

    // Helpdesk
    if (title === "Helpdesk") {
        return (
            <svg className={iconBaseClass} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <rect width="64" height="64" rx="12" fill="#1F1F1F" />
                <polygon points="22,22 46,28 28,46" fill="#10B981" />
            </svg>
        );
    }

    // Superset Analytics
    if (title === "Superset Analytics") {
        return (
            <svg className={iconBaseClass} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" rx="12" fill="#1F1F1F" />
                <rect x="14" y="16" width="3" height="16" rx="1.5" fill="#10B981" />
                <rect x="20" y="20" width="3" height="12" rx="1.5" fill="#10B981" />
                <rect x="26" y="14" width="3" height="18" rx="1.5" fill="#10B981" />
                <circle cx="36" cy="17" r="3" fill="#FBBF24" />
            </svg>
        );
    }

    return <div className="w-12 h-12" />;
};

const MotionLink = motion(Link);

const Navbar = () => {
    const pathname = usePathname();
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [isWoodfrogOpen, setIsWoodfrogOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const servicesRef = useRef<HTMLDivElement>(null);
    const woodfrogRef = useRef<HTMLDivElement>(null);

    const isServicesActive = SERVICES.some(service => pathname === service.href);
    const isProductsActive = pathname === '/products' || pathname.startsWith('/products/');
    const isExploreActive = WOODFROG_LINKS.some(link => pathname === link.href);

    const toggleMobileAccordion = (key: string) => {
        setMobileAccordion(mobileAccordion === key ? null : key);
    };

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Show if at top (less than 100px) or if scrolling UP
            if (currentScrollY < 100) {
                setIsVisible(true);
            } else if (currentScrollY > lastScrollY) {
                // Scrolling down - hide
                if (isVisible) setIsVisible(false);
            } else {
                // Scrolling up - show
                if (!isVisible) setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY, isVisible]);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
                setIsServicesOpen(false);
            }
            if (woodfrogRef.current && !woodfrogRef.current.contains(event.target as Node)) {
                setIsWoodfrogOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <motion.nav
            initial={{ y: 0 }}
            animate={{ y: isVisible ? 0 : -120 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-3 md:top-0 left-0 right-0 z-[100] p-0 md:p-6 pointer-events-none"
        >
            <div className="flex items-center justify-between w-full px-5 md:px-6 py-4 md:py-3 pointer-events-auto transition-all duration-300 cursor-default bg-transparent md:backdrop-blur-none md:border-none">
                {/* Logo */}
                <Link 
                    href="/" 
                    aria-label="Woodfrog Home"
                    className="flex-shrink-0 flex items-center cursor-pointer" 
                    onClick={() => { setIsServicesOpen(false); setIsWoodfrogOpen(false); setIsMobileMenuOpen(false); }}
                >
                    <svg width="112" height="24" viewBox="0 0 112 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[100px] md:w-[140px] h-auto transition-all">
                        <path d="M99.1818 18.5693C99.1818 19.3612 99.0425 20.0798 98.7639 20.7251C98.4999 21.385 98.1187 21.9496 97.6201 22.4188C97.1215 22.9028 96.5202 23.2767 95.8163 23.5407C95.1124 23.8047 94.3352 23.9367 93.4847 23.9367C92.4875 23.9367 91.5709 23.7973 90.7351 23.5187C89.9138 23.2401 89.1293 22.7561 88.3814 22.0669L89.7232 20.3951C90.2365 20.9524 90.7937 21.3703 91.395 21.6489C91.9962 21.9422 92.6781 22.0889 93.4407 22.0889C94.1739 22.0889 94.7825 21.9789 95.2664 21.7589C95.7503 21.5536 96.1316 21.2823 96.4102 20.945C96.7035 20.6077 96.9088 20.2191 97.0261 19.7792C97.1435 19.3539 97.2021 18.9213 97.2021 18.4813V16.9415H97.1361C96.7549 17.5721 96.2343 18.0414 95.5744 18.3494C94.9291 18.6427 94.2472 18.7893 93.5287 18.7893C92.7661 18.7893 92.0549 18.6573 91.395 18.3934C90.7497 18.1147 90.1925 17.7408 89.7232 17.2715C89.2539 16.7876 88.8873 16.223 88.6234 15.5777C88.3594 14.9178 88.2274 14.2066 88.2274 13.444C88.2274 12.6814 88.3521 11.9702 88.6014 11.3103C88.8507 10.6357 89.2026 10.0491 89.6572 9.55047C90.1265 9.05187 90.6837 8.66325 91.329 8.38462C91.9889 8.10599 92.7221 7.96667 93.5287 7.96667C94.2325 7.96667 94.9145 8.12066 95.5744 8.42862C96.2489 8.73658 96.7768 9.16919 97.1581 9.72645H97.2021V8.23064H99.1818V18.5693ZM93.7706 9.81444C93.2427 9.81444 92.7661 9.90976 92.3408 10.1004C91.9156 10.2764 91.5563 10.5257 91.263 10.8483C90.9697 11.1563 90.7424 11.5376 90.5811 11.9922C90.4198 12.4321 90.3391 12.9161 90.3391 13.444C90.3391 14.4999 90.6471 15.3504 91.263 15.9957C91.8789 16.6262 92.7148 16.9415 93.7706 16.9415C94.8265 16.9415 95.6623 16.6262 96.2783 15.9957C96.8942 15.3504 97.2021 14.4999 97.2021 13.444C97.2021 12.9161 97.1215 12.4321 96.9602 11.9922C96.7989 11.5376 96.5715 11.1563 96.2783 10.8483C95.985 10.5257 95.6257 10.2764 95.2004 10.1004C94.7751 9.90976 94.2985 9.81444 93.7706 9.81444Z" fill="white" />
                        <path d="M76.8386 13.444C76.8386 13.9719 76.9192 14.4632 77.0805 14.9178C77.2418 15.3577 77.4691 15.739 77.7624 16.0617C78.0557 16.3696 78.4150 16.6189 78.8403 16.8096C79.2655 16.9855 79.7421 17.0735 80.2701 17.0735C80.7980 17.0735 81.2746 16.9855 81.6999 16.8096C82.1251 16.6189 82.4844 16.3696 82.7777 16.0617C83.0710 15.739 83.2983 15.3577 83.4596 14.9178C83.6209 14.4632 83.7016 13.9719 83.7016 13.444C83.7016 12.9161 83.6209 12.4321 83.4596 11.9922C83.2983 11.5376 83.0710 11.1563 82.7777 10.8483C82.4844 10.5257 82.1251 10.2764 81.6999 10.1004C81.2746 9.90976 80.7980 9.81444 80.2701 9.81444C79.7421 9.81444 79.2655 9.90976 78.8403 10.1004C78.4150 10.2764 78.0557 10.5257 77.7624 10.8483C77.4691 11.1563 77.2418 11.5376 77.0805 11.9922C76.9192 12.4321 76.8386 12.9161 76.8386 13.444ZM74.7269 13.444C74.7269 12.6814 74.8662 11.9702 75.1448 11.3103C75.4381 10.6503 75.8340 10.0711 76.3326 9.57247C76.8312 9.07387 77.4178 8.68525 78.0924 8.40662C78.7669 8.11332 79.4928 7.96667 80.2701 7.96667C81.0473 7.96667 81.7732 8.11332 82.4478 8.40662C83.1223 8.68525 83.7089 9.07387 84.2075 9.57247C84.7061 10.0711 85.0947 10.6503 85.3733 11.3103C85.6666 11.9702 85.8133 12.6814 85.8133 13.444C85.8133 14.2066 85.6666 14.9251 85.3733 15.5997C85.0947 16.2596 84.7061 16.8389 84.2075 17.3375C83.7089 17.8214 83.1223 18.21 82.4478 18.5033C81.7732 18.782 81.0473 18.9213 80.2701 18.9213C79.4928 18.9213 78.7669 18.782 78.0924 18.5033C77.4178 18.21 76.8312 17.8214 76.3326 17.3375C75.8340 16.8389 75.4381 16.2596 75.1448 15.5997C74.8662 14.9251 74.7269 14.2066 74.7269 13.444Z" fill="white" />
                        <path d="M67.0382 8.23064H69.0179V9.83644H69.0619C69.1939 9.55781 69.3699 9.30851 69.5898 9.08853C69.8098 8.8539 70.0518 8.65592 70.3157 8.49461C70.5944 8.3333 70.895 8.20864 71.2176 8.12066C71.5402 8.018 71.8628 7.96667 72.1855 7.96667C72.5081 7.96667 72.8014 8.01067 73.0653 8.09866L72.9773 10.2324C72.816 10.1884 72.6547 10.1517 72.4934 10.1224C72.3321 10.0931 72.1708 10.0784 72.0095 10.0784C71.0416 10.0784 70.3011 10.3497 69.7878 10.8923C69.2746 11.4349 69.0179 12.2781 69.0179 13.422V18.6573H67.0382V8.23064Z" fill="white" />
                        <path d="M60.0429 9.94676H57.7992V8.23098H60.0429V5.89927C60.0429 4.50611 60.3068 3.47224 60.8348 2.79766C61.3773 2.10842 62.3012 1.76379 63.6064 1.76379C63.8263 1.76379 64.0536 1.77113 64.2883 1.78579C64.5376 1.80046 64.8015 1.84445 65.0802 1.91777L64.8602 3.67755C64.6695 3.60423 64.4862 3.5529 64.3103 3.52357C64.1343 3.49424 63.9436 3.47958 63.7383 3.47958C63.3717 3.47958 63.0784 3.53824 62.8585 3.65555C62.6385 3.75821 62.4625 3.91219 62.3305 4.1175C62.2132 4.3228 62.1326 4.57211 62.0886 4.8654C62.0593 5.14403 62.0446 5.46666 62.0446 5.83328V8.23098H64.3982V9.94676H62.0226V18.6577H60.0429V9.94676Z" fill="white" />
                        <path d="M55.8344 18.6579H53.8547V17.162H53.8107C53.4294 17.7193 52.9015 18.1519 52.2269 18.4599C51.567 18.7678 50.8851 18.9218 50.1812 18.9218C49.3747 18.9218 48.6415 18.7825 47.9816 18.5039C47.3363 18.2252 46.7791 17.8366 46.3098 17.338C45.8552 16.8394 45.5032 16.2602 45.2539 15.6002C45.0047 14.9403 44.88 14.2217 44.88 13.4445C44.88 12.6673 45.0047 11.9487 45.2539 11.2888C45.5032 10.6142 45.8552 10.0349 46.3098 9.551C46.7791 9.0524 47.3363 8.66378 47.9816 8.38515C48.6415 8.10652 49.3747 7.9672 50.1812 7.9672C50.9291 7.9672 51.633 8.12852 52.2929 8.45114C52.9528 8.7591 53.4588 9.18438 53.8107 9.72698H53.8547V2.02795H55.8344V18.6579ZM50.4232 17.0741C50.9511 17.0741 51.4277 16.9861 51.853 16.8101C52.2783 16.6194 52.6376 16.3701 52.9308 16.0622C53.2241 15.7396 53.4583 15.3583 53.6127 14.9183C53.7741 14.4637 53.8547 13.9724 53.8547 13.4445C53.8547 12.9166 53.7741 12.4326 53.6127 11.9927C53.4514 11.5381 53.2241 11.1568 52.9308 10.8488C52.6376 10.5262 52.2783 10.2769 51.853 10.1009C51.4277 9.91029 50.4232 9.81497 50.4232 9.81497C49.8953 9.81497 49.4187 9.91029 48.9934 10.1009C48.5681 10.2764 48.2089 10.5262 47.9156 10.8488C47.6223 11.1568 47.395 11.5381 47.2337 11.9927C47.0724 12.4326 46.9917 12.9166 46.9917 13.4445C46.9917 13.9724 47.0724 14.4637 47.2337 14.9183C47.395 15.3583 47.6223 15.7396 47.9156 16.0622C48.2089 16.3701 48.5681 16.6194 48.9934 16.8101C49.4187 16.9861 49.8953 17.0741 50.4232 17.0741Z" fill="white" />
                        <path d="M33.4910 13.444C33.4910 13.9719 33.5716 14.4632 33.7329 14.9178C33.8942 15.3577 34.1215 15.739 34.4148 16.0617C34.7081 16.3696 35.0674 16.6189 35.4927 16.8096C35.9179 16.9855 36.3945 17.0735 36.9225 17.0735C37.4504 17.0735 37.9270 16.9855 38.3523 16.8096C38.7775 16.6189 39.1368 16.3696 39.4301 16.0617C39.7234 15.739 39.9507 15.3577 40.1120 14.9178C40.2733 14.4632 40.3540 13.9719 40.3540 13.444C40.3540 12.9161 40.2733 12.4321 40.1120 11.9922C39.9507 11.5376 39.7234 11.1563 39.4301 10.8483C39.1368 10.5257 38.7775 10.2764 38.3523 10.1004C37.9270 9.90976 37.4504 9.81444 36.9225 9.81444C36.3945 9.81444 35.9179 9.90976 35.4927 10.1004C35.0674 10.2764 34.7081 10.5257 34.4148 10.8483C34.1215 11.1563 33.8942 11.5376 33.7329 11.9922C33.5716 12.4321 33.4910 12.9161 33.4910 13.444ZM31.3793 13.444C31.3793 12.6814 31.5186 11.9702 31.7972 11.3103C32.0905 10.6503 32.4864 10.0711 32.9850 9.57247C33.4836 9.07387 34.0702 8.68525 34.7448 8.40662C35.4193 8.11332 36.1452 7.96667 36.9225 7.96667C37.6997 7.96667 38.4256 8.11332 39.1002 8.40662C39.7747 8.68525 40.3613 9.07387 40.8599 9.57247C41.3585 10.0711 41.7471 10.6503 42.0257 11.3103C42.3190 11.9702 42.4657 12.6814 42.4657 13.444C42.4657 14.2066 42.3190 14.9251 42.0257 15.5997C41.7471 16.2596 41.3585 16.8389 40.8599 17.3375C40.3613 17.8214 39.7747 18.21 39.1002 18.5033C38.4256 18.782 37.6997 18.9213 36.9225 18.9213C36.1452 18.9213 35.4193 18.782 34.7448 18.5033C34.0702 18.21 33.4836 17.8214 32.9850 17.3375C32.4864 16.8389 32.0905 16.2596 31.7972 15.5997C31.5186 14.9251 31.3793 14.2066 31.3793 13.444Z" fill="white" />
                        <path d="M19.9904 13.444C19.9904 13.9719 20.071 14.4632 20.2323 14.9178C20.3936 15.3577 20.6209 15.739 20.9142 16.0617C21.2075 16.3696 21.5668 16.6189 21.9921 16.8096C22.4173 16.9855 22.8939 17.0735 23.4219 17.0735C23.9498 17.0735 24.4264 16.9855 24.8517 16.8096C25.2769 16.6189 25.6362 16.3696 25.9295 16.0617C26.2228 15.739 26.4501 15.3577 26.6114 14.9178C26.7727 14.4632 26.8534 13.9719 26.8534 13.444C26.8534 12.9161 26.7727 12.4321 26.6114 11.9922C26.4501 11.5376 26.2228 11.1563 25.9295 10.8483C25.6362 10.5257 25.2769 10.2764 24.8517 10.1004C24.4264 9.90976 23.9498 9.81444 23.4219 9.81444C22.8939 9.81444 22.4173 9.90976 21.9921 10.1004C21.5668 10.2764 21.2075 10.5257 20.9142 10.8483C20.6209 11.1563 20.3936 11.5376 20.2323 11.9922C20.071 12.4321 19.9904 12.9161 19.9904 13.444ZM17.8787 13.444C17.8787 12.6814 18.018 11.9702 18.2966 11.3103C18.5899 10.6503 18.9858 10.0711 19.4844 9.57247C19.983 9.07387 20.5696 8.68525 21.2442 8.40662C21.9187 8.11332 22.6446 7.96667 23.4219 7.96667C24.1991 7.96667 24.925 8.11332 25.5996 8.40662C26.2741 8.68525 26.8607 9.07387 27.3593 9.57247C27.8579 10.0711 28.2465 10.6503 28.5251 11.3103C28.8184 11.9702 28.9651 12.6814 28.9651 13.444C28.9651 14.2066 28.8184 14.9251 28.5251 15.5997C28.2465 16.2596 27.8579 16.8389 27.3593 17.3375C26.8607 17.8214 26.2741 18.21 25.5996 18.5033C24.925 18.782 24.1991 18.9213 23.4219 18.9213C22.6446 18.9213 21.9187 18.782 21.2442 18.5033C20.5696 18.21 19.983 17.8214 19.4844 17.3375C18.9858 16.8389 18.5899 16.2596 18.2966 15.5997C18.018 14.9251 17.8787 14.2066 17.8787 13.444Z" fill="white" />
                        <path d="M0 8.23071H2.22168L4.57534 16.0177H4.61934L7.10498 8.23071H9.19468L11.8343 16.0177H11.8783L14.122 8.23071H16.2117L12.8462 18.6574H10.8444L8.09484 10.8704H8.05084L5.5652 18.6574H3.43151L0 8.23071Z" fill="white" />
                        <image href="/logos/woodfrog-logo2.svg" x="98.5" y="-1" width="12" height="9" />
                    </svg>
                </Link>

                {/* Navigation Links - Subtle Glass Capsule */}
                <div className="hidden md:flex items-center space-x-1 bg-white/[0.03] backdrop-blur-md p-1.5 rounded-full border border-white/10 shadow-lg">
                    <div className="relative" ref={servicesRef} onMouseEnter={() => setIsServicesOpen(true)} onMouseLeave={() => setIsServicesOpen(false)}>
                        <button
                            aria-label="Services menu"
                            onClick={() => setIsServicesOpen(!isServicesOpen)}
                            className={cn(
                                "flex items-center space-x-1 px-5 py-2 font-semibold text-base rounded-full cursor-pointer transition-[background-color,box-shadow] duration-300 text-[#E6EAF0]/90 hover:text-black hover:bg-brand-primary/90",
                                (isServicesOpen || isServicesActive) ? "text-black bg-brand-primary shadow-[0_8px_30px_rgba(249,220,102,0.25)]" : "transition-all duration-300"
                            )}
                        >
                            <span>services</span>
                            <ChevronDown className={cn("w-4 h-4 transition-all duration-300 opacity-50", isServicesOpen && "rotate-180 opacity-100 text-black")} />
                        </button>

                        <AnimatePresence>
                            {isServicesOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95, x: "-50%" }}
                                    animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95, x: "-50%" }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-full left-1/2 pt-4 w-[900px] z-[100]"
                                >
                                    <div className="p-8 bg-[#141618] border border-white/10 rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.5)] overflow-hidden">
                                        <div className="grid grid-cols-3 gap-x-6 gap-y-6">
                                            {SERVICES.map((service, index) => (
                                                <Link key={service.title} href={service.href} onClick={() => setIsServicesOpen(false)}>
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        whileHover="hover"
                                                        transition={{ delay: index * 0.05 }}
                                                        className="group flex items-center space-x-4 p-3 rounded-2xl transition-all hover:bg-white/[0.03] cursor-pointer"
                                                    >
                                                        <ServiceIcon title={service.title} />
                                                        <div className="flex-1 flex flex-col space-y-0.5">
                                                            <div className="flex items-center justify-between">
                                                                <h3 className="text-[#E6EAF0] font-bold text-[15px] group-hover:text-brand-primary transition-colors">{service.title}</h3>
                                                                <ArrowRight className="w-4 h-4 text-brand-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                                            </div>
                                                            <p className="text-zinc-500 text-[11px] leading-tight font-medium">{service.description}</p>
                                                        </div>
                                                    </motion.div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <Link
                        href="/products"
                        className={cn(
                            "flex items-center space-x-1 px-5 py-2 font-semibold text-base rounded-full cursor-pointer transition-all duration-300 text-[#E6EAF0]/90 hover:text-black hover:bg-brand-primary/90",
                            isProductsActive && "text-black bg-brand-primary shadow-[0_8px_30px_rgba(249,220,102,0.25)]"
                        )}
                        onClick={() => { setIsServicesOpen(false); setIsWoodfrogOpen(false); }}
                    >
                        <span>products</span>
                    </Link>

                    <div className="relative" ref={woodfrogRef} onMouseEnter={() => setIsWoodfrogOpen(true)} onMouseLeave={() => setIsWoodfrogOpen(false)}>
                        <button
                            aria-label="Explore menu"
                            onClick={() => setIsWoodfrogOpen(!isWoodfrogOpen)}
                            className={cn(
                                "flex items-center space-x-1 px-5 py-2 font-semibold text-base rounded-full cursor-pointer transition-[background-color,box-shadow] duration-300 text-[#E6EAF0]/90 hover:text-black hover:bg-brand-primary/90",
                                (isWoodfrogOpen || isExploreActive) ? "text-black bg-brand-primary shadow-[0_8px_30px_rgba(249,220,102,0.25)]" : "transition-all duration-300"
                            )}
                        >
                            <span>explore</span>
                            <ChevronDown className={cn("w-4 h-4 transition-all duration-300 opacity-50", isWoodfrogOpen && "rotate-180 opacity-100 text-black")} />
                        </button>

                        <AnimatePresence>
                            {isWoodfrogOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95, x: "-50%" }}
                                    animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95, x: "-50%" }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-full left-1/2 pt-4 w-[600px] z-[100]"
                                >
                                    <div className="p-6 bg-[#141618] border border-white/10 rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.5)] overflow-hidden">
                                        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                                            {WOODFROG_LINKS.map((link, index) => (
                                                <Link
                                                    key={link.title}
                                                    href={link.href}
                                                    className="group flex flex-col space-y-1 p-3 rounded-2xl transition-all hover:bg-white/[0.03] cursor-pointer"
                                                    onClick={() => setIsWoodfrogOpen(false)}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <h3 className="text-[#E6EAF0] font-bold text-[17px] group-hover:text-brand-primary transition-colors">{link.title}</h3>
                                                        <ArrowRight className="w-4 h-4 text-brand-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                                    </div>
                                                    <p className="text-zinc-500 text-[13px] leading-tight font-medium">{link.description}</p>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="hidden md:flex flex-shrink-0 items-center space-x-6">
                    <Link
                        href="/contact"
                        className={cn(
                            "px-7 py-2.5 text-[15px] font-bold rounded-full transition-all shadow-xl cursor-pointer active:scale-95 bg-brand-primary text-black hover:bg-brand-primary/90"
                        )}
                        onClick={() => { setIsServicesOpen(false); setIsWoodfrogOpen(false); }}
                    >
                        Contact us
                    </Link>
                </div>

                <div className="flex md:hidden items-center space-x-3">
                    <Link
                        href="/contact"
                        className={cn(
                            "px-4 py-1.5 text-[13px] font-bold rounded-full transition-all shadow-lg active:scale-95 bg-brand-primary text-black"
                        )}
                        onClick={() => { setIsMobileMenuOpen(false); }}
                    >
                        Contact us
                    </Link>
                    <button
                        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                        className="p-1 text-white cursor-pointer"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[110] bg-[#061A25] p-8 flex flex-col pointer-events-auto overflow-y-auto"
                        data-lenis-prevent
                    >
                        <div className="flex items-center justify-between mb-12">
                            <div className="flex items-center gap-1.5">
                                <span className="text-2xl font-bold tracking-tight text-white">woodfrog</span>
                            </div>
                            <button aria-label="Close menu" onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-white">
                                <X className="w-8 h-8" />
                            </button>
                        </div>

                        <div className="flex flex-col space-y-4">
                            {/* Services Accordion */}
                            <div className="border-b border-white/10 pb-4">
                                <button
                                    aria-label="Toggle services"
                                    onClick={() => toggleMobileAccordion('services')}
                                    className="w-full flex items-center justify-between py-2"
                                >
                                    <span className="text-2xl font-bold text-white">services</span>
                                    <ChevronDown className={cn("w-6 h-6 text-brand-primary transition-transform duration-300", mobileAccordion === 'services' && "rotate-180")} />
                                </button>
                                <AnimatePresence>
                                    {mobileAccordion === 'services' && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="flex flex-col space-y-4 mt-4 pl-4">
                                                {SERVICES.map((service) => (
                                                    <Link
                                                        key={service.title}
                                                        href={service.href}
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                        className="flex flex-col space-y-0.5"
                                                    >
                                                        <span className="text-white font-semibold text-lg">{service.title}</span>
                                                        <span className="text-zinc-500 text-xs">{service.description}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Products Link (Direct) */}
                            <div className="border-b border-white/10 pb-4">
                                <Link
                                    href="/products"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="w-full flex items-center justify-between py-2"
                                >
                                    <span className="text-2xl font-bold text-white">products</span>
                                    <ArrowRight className="w-6 h-6 text-brand-primary" />
                                </Link>
                            </div>

                            {/* Explore Accordion */}
                            <div className="border-b border-white/10 pb-4">
                                <button
                                    aria-label="Toggle explore"
                                    onClick={() => toggleMobileAccordion('explore')}
                                    className="w-full flex items-center justify-between py-2"
                                >
                                    <span className="text-2xl font-bold text-white">explore</span>
                                    <ChevronDown className={cn("w-6 h-6 text-brand-primary transition-transform duration-300", mobileAccordion === 'explore' && "rotate-180")} />
                                </button>
                                <AnimatePresence>
                                    {mobileAccordion === 'explore' && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="flex flex-col space-y-4 mt-4 pl-4">
                                                {WOODFROG_LINKS.map((link) => (
                                                    <Link
                                                        key={link.title}
                                                        href={link.href}
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                        className="flex flex-col space-y-0.5"
                                                    >
                                                        <span className="text-white font-semibold text-lg">{link.title}</span>
                                                        <span className="text-zinc-500 text-xs">{link.description}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <Link
                                href="/contact"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-full py-4 bg-brand-primary text-black text-center font-bold rounded-2xl active:scale-95 transition-all mt-8"
                            >
                                Contact us
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export { Navbar };

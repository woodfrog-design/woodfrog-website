'use client';

import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Check, Mail, Linkedin, MapPin, Loader2, ChevronDown } from 'lucide-react';

const ContactPage = () => {
    const [mounted, setMounted] = React.useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        countryCode: '+91',
        organization: '',
        lookingFor: '',
        message: '',
        specifyService: '',
    });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const validatePhone = () => {
        if (!formData.phone) return true; // Optional field

        if (formData.countryCode === '+91') {
            const digits = formData.phone.replace(/\D/g, '');
            return digits.length === 10;
        }
        return formData.phone.length >= 7; // Basic validation for others
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!formData.firstName || !formData.lastName || !formData.lookingFor) {
            setErrorMsg('Please fill in all required fields.');
            return;
        }

        if (formData.lookingFor.includes('None of the above / Other') && !formData.specifyService) {
            setErrorMsg('Please mention the service.');
            return;
        }

        if (!validatePhone()) {
            setStatus('error');
            setErrorMsg(formData.countryCode === '+91' ? 'Please enter a valid 10-digit phone number.' : 'Please enter a valid phone number.');
            return;
        }

        setStatus('sending');
        setErrorMsg('');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    phone: formData.phone ? `${formData.countryCode} ${formData.phone}` : ''
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Something went wrong.');
            }

            setStatus('success');
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                countryCode: '+91',
                organization: '',
                lookingFor: '',
                message: '',
                specifyService: '',
            });
        } catch (err: unknown) {
            setStatus('error');
            setErrorMsg(err instanceof Error ? err.message : 'Failed to send message.');
        }
    };

    if (!mounted) return null;

    return (
        <main className="min-h-screen bg-transparent text-white selection:bg-brand-primary/30">
            {/* Same as before but with Phone Field update */}
            <div className="w-full px-8 md:px-24 lg:px-32 pt-24 md:pt-32 pb-12 md:pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 lg:gap-24 items-start">
                    {/* Left Column: Information (Same) */}
                    <div className="space-y-8 md:space-y-12">
                        <div className="space-y-6">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight"
                            >
                                Let’s create clarity, intelligence, and impact <span className="relative">
                                    <span className="text-brand-primary">together</span>
                                    <svg className="absolute -bottom-2 left-0 w-full" width="100%" height="8" viewBox="0 0 100 8" fill="none">
                                        <motion.path
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ delay: 0.5, duration: 0.8 }}
                                            d="M1 5.5C20 2.5 40 2.5 99 5.5"
                                            stroke="var(--brand-primary)"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </span>.
                            </motion.h1>
                        </div>

                        <div className="space-y-8">
                            {[
                                { icon: MapPin, label: 'Pune, India', subLabel: 'Office', href: 'https://maps.app.goo.gl/cwh2md1Gq4asiFku6' },
                                { icon: Mail, label: 'hello@woodfrog.tech', href: 'mailto:hello@woodfrog.tech' },
                                { icon: Linkedin, label: 'Linkedin', href: 'https://www.linkedin.com/company/woodfrogtech/' },
                            ].map((item, idx) => {
                                const Content = (
                                    <div className="flex items-center space-x-4 group">
                                        <item.icon className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity shrink-0" />
                                        <div className="flex flex-col">
                                            <span className={`text-xl font-medium ${item.href ? 'border-b border-white/10 group-hover:border-[#4DA3FF]' : ''} transition-colors`}>
                                                {item.label}
                                            </span>
                                            {item.subLabel && (
                                                <span className="text-xs uppercase tracking-wider opacity-50">
                                                    {item.subLabel}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                );

                                if (item.href) {
                                    return (
                                        <motion.a
                                            key={idx}
                                            href={item.href}
                                            target={item.href.startsWith('http') ? '_blank' : undefined}
                                            rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 + (idx * 0.1) }}
                                            className="block hover:text-[#4DA3FF] transition-colors"
                                        >
                                            {Content}
                                        </motion.a>
                                    );
                                }

                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 + (idx * 0.1) }}
                                    >
                                        {Content}
                                    </motion.div>
                                );
                            })}
                        </div>

                        <div className="space-y-6 pt-6">
                            {[
                                'Partnering with over 20 growing companies',
                                'A team of 20+ data experts',
                                'Business Intelligence & Artificial Intelligence',
                            ].map((text, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.5 + (idx * 0.1) }}
                                    className="flex items-center space-x-4"
                                >
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full border border-[#4DA3FF] flex items-center justify-center">
                                        <Check className="w-3.5 h-3.5 text-[#4DA3FF]" />
                                    </div>
                                    <p className="text-zinc-300 font-medium">{text}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-transparent md:bg-[#141618] border-0 md:border md:border-white/5 rounded-none md:rounded-[40px] p-0 md:p-10 lg:p-14 shadow-none md:shadow-2xl relative"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#4DA3FF]/5 blur-[80px] rounded-full pointer-events-none" />

                        <div className="space-y-16">
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold leading-tight text-white">
                                    Every great partnership starts with a coffee.
                                </h2>
                                <h3 className="text-2xl font-bold text-white/50">
                                    <span className="text-white">Let's talk!</span>
                                </h3>
                            </div>

                            <form className="space-y-10" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
                                    <InputField label="First name*" value={formData.firstName} onChange={(v) => handleChange('firstName', v)} />
                                    <InputField label="Last name*" value={formData.lastName} onChange={(v) => handleChange('lastName', v)} />
                                    <InputField label="Email" value={formData.email} onChange={(v) => handleChange('email', v)} />
                                    <PhoneInputField
                                        label="Phone"
                                        value={formData.phone}
                                        countryCode={formData.countryCode}
                                        onPhoneChange={(v) => handleChange('phone', v)}
                                        onCountryCodeChange={(v) => handleChange('countryCode', v)}
                                    />
                                    <InputField
                                        label="Organization"
                                        value={formData.organization}
                                        onChange={(v) => handleChange('organization', v)}
                                        className="col-span-1 md:col-span-2"
                                    />
                                    <MultiSelectField
                                        label="I'm looking for*"
                                        value={formData.lookingFor ? formData.lookingFor.split(', ') : []}
                                        options={[
                                            'AI & ML Strategy Development',
                                            'Product Development',
                                            'Enterprise Data Management',
                                            'Advanced Analytics',
                                            'Custom LLM Solutions',
                                            'Automation & Scaling',
                                            'Intelligent Agents',
                                            'Benchmarking and Evaluation',
                                            'None of the above / Other'
                                        ]}
                                        onChange={(v) => handleChange('lookingFor', v.join(', '))}
                                        disabled={formData.lookingFor.includes('None of the above / Other')}
                                    />
                                    {formData.lookingFor.includes('None of the above / Other') && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="col-span-1 md:col-span-2"
                                        >
                                            <InputField
                                                label="Mention the service*"
                                                value={formData.specifyService}
                                                onChange={(v) => handleChange('specifyService', v)}
                                            />
                                        </motion.div>
                                    )}
                                </div>
                                <InputField label="Message" isTextArea value={formData.message} onChange={(v) => handleChange('message', v)} />

                                {/* Status messages */}
                                {status === 'success' && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-green-400 font-medium flex items-center gap-2"
                                    >
                                        <Check className="w-4 h-4" /> Message sent successfully!
                                    </motion.p>
                                )}
                                {status === 'error' && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-red-400 font-medium"
                                    >
                                        {errorMsg}
                                    </motion.p>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === 'sending'}
                                    className="group relative overflow-hidden px-10 py-4 bg-white text-black font-bold rounded-full transition-all active:scale-95 shadow-xl hover:shadow-[#4DA3FF]/10 disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    <div className="relative z-10 h-6 overflow-hidden pointer-events-none">
                                        {status === 'sending' ? (
                                            <span className="flex items-center justify-center h-6 gap-2">
                                                <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                                            </span>
                                        ) : (
                                            <motion.div
                                                initial="initial"
                                                whileHover="hover"
                                                variants={{
                                                    initial: { y: 0 },
                                                    hover: { y: -24 }
                                                }}
                                                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                                            >
                                                <span className="flex items-center justify-center h-6">Send</span>
                                                <span className="flex items-center justify-center h-6 text-white text-lg">Send</span>
                                            </motion.div>
                                        )}
                                    </div>
                                    <motion.div
                                        className="absolute inset-0 bg-[#4A3728]"
                                        initial={{ y: "100%" }}
                                        whileHover={{ y: 0 }}
                                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                                    />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
};

const InputField = ({
    label,
    isTextArea = false,
    value,
    onChange,
    className = "col-span-1",
}: {
    label: string;
    isTextArea?: boolean;
    value: string;
    onChange: (v: string) => void;
    className?: string;
}) => {
    return (
        <div className={`relative space-y-2 group ${className}`}>
            {isTextArea ? (
                <textarea
                    className="w-full bg-transparent border-b border-white/10 py-2 focus:border-[#4DA3FF] outline-none transition-colors peer min-h-[100px] resize-none"
                    placeholder=" "
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            ) : (
                <input
                    type="text"
                    className="w-full bg-transparent border-b border-white/10 py-2 focus:border-[#4DA3FF] outline-none transition-colors peer"
                    placeholder=" "
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            )}
            <label className="absolute left-0 top-0 text-zinc-500 text-base font-medium transition-all duration-300 pointer-events-none 
                peer-focus:-top-6 peer-focus:text-brand-primary peer-focus:text-xs uppercase tracking-wider
                peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-zinc-500 peer-[:not(:placeholder-shown)]:text-xs">
                {label}
            </label>
        </div>
    );
};

const PhoneInputField = ({
    label,
    value,
    countryCode,
    onPhoneChange,
    onCountryCodeChange,
}: {
    label: string;
    value: string;
    countryCode: string;
    onPhoneChange: (v: string) => void;
    onCountryCodeChange: (v: string) => void;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const countries = [
        { code: '+91', flag: '🇮🇳', name: 'India' },
        { code: '+1', flag: '🇺🇸', name: 'USA' },
        { code: '+44', flag: '🇬🇧', name: 'UK' },
        { code: '+61', flag: '🇦🇺', name: 'Australia' },
        { code: '+81', flag: '🇯🇵', name: 'Japan' },
        { code: '+49', flag: '🇩🇪', name: 'Germany' },
        { code: '+33', flag: '🇫🇷', name: 'France' },
        { code: '+971', flag: '🇦🇪', name: 'UAE' },
        { code: '+65', flag: '🇸🇬', name: 'Singapore' },
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative col-span-1 space-y-2 group">
            <div className="flex items-end space-x-2 border-b border-white/10 focus-within:border-[#4DA3FF] transition-colors pb-2">
                <div className="relative" ref={dropdownRef}>
                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center space-x-1.5 text-zinc-300 font-medium hover:text-white transition-colors pb-0.5"
                    >
                        <span className="text-lg">{countries.find(c => c.code === countryCode)?.flag}</span>
                        <span className="text-base">{countryCode}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} opacity-50`} />
                    </button>

                    {isOpen && (
                        <div className="absolute z-[100] left-0 mt-4 w-48 bg-[#1A1D1F] border border-white/10 rounded-xl shadow-2xl backdrop-blur-xl overflow-hidden py-1 animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="max-h-[200px] overflow-y-auto custom-scrollbar">
                                {countries.map((c) => (
                                    <button
                                        key={c.code}
                                        type="button"
                                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-white/5 transition-colors flex items-center space-x-3 ${countryCode === c.code ? 'text-brand-primary font-bold bg-white/[0.02]' : 'text-zinc-400'}`}
                                        onClick={() => {
                                            onCountryCodeChange(c.code);
                                            setIsOpen(false);
                                        }}
                                    >
                                        <span className="text-base">{c.flag}</span>
                                        <span>{c.name}</span>
                                        <span className="ml-auto opacity-50 font-medium">{c.code}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <input
                    type="tel"
                    className="w-full bg-transparent outline-none transition-colors peer text-base py-0.5"
                    placeholder=" "
                    value={value}
                    onChange={(e) => onPhoneChange(e.target.value.replace(/\D/g, ''))}
                />
            </div>
            <label className="absolute left-0 -top-6 text-zinc-500 text-xs uppercase tracking-wider pointer-events-none transition-all duration-300 group-focus-within:text-brand-primary">
                {label}
            </label>
        </div>
    );
};

const MultiSelectField = ({
    label,
    value,
    options,
    onChange,
    disabled,
}: {
    label: string;
    value: string[];
    options: string[];
    onChange: (v: string[]) => void;
    disabled?: boolean;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const colors: { [key: string]: string } = {
        'AI & ML Strategy Development': 'bg-[#E6F6F4] text-[#006D5B] border-[#006D5B]/10',
        'Product Development': 'bg-[#EBF5FF] text-[#0055D4] border-[#0055D4]/10',
        'Enterprise Data Management': 'bg-[#F3EFFB] text-[#5B21B6] border-[#5B21B6]/10',
        'Advanced Analytics': 'bg-[#FFF1F2] text-[#BE123C] border-[#BE123C]/10',
        'Custom LLM Solutions': 'bg-[#FFF2EB] text-[#C2410C] border-[#C2410C]/10',
        'Automation & Scaling': 'bg-[#FFFBEB] text-[#B45309] border-[#B45309]/10',
        'Intelligent Agents': 'bg-[#F0FDF4] text-[#15803D] border-[#15803D]/10',
        'Benchmarking and Evaluation': 'bg-[#F1F5F9] text-[#334155] border-[#334155]/10',
        'None of the above / Other': 'bg-[#F0FDFA] text-[#0F766E] border-[#0F766E]/10',
    };

    const toggleOption = (option: string) => {
        const newValue = value.includes(option)
            ? value.filter((v) => v !== option)
            : [...value, option];

        // Instantly close dropdown if "None of the above" is selected
        if (option === 'None of the above / Other' && !value.includes(option)) {
            setIsOpen(false);
        }

        onChange(newValue);
    };

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape' || event.code === 'Escape') {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscKey);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [isOpen]);

    return (
        <div className={`relative space-y-4 group col-span-1 md:col-span-2 ${disabled ? 'opacity-70 pointer-events-auto' : ''}`} ref={containerRef}>
            <div
                onClick={() => !disabled && setIsOpen(!isOpen)}
                className={`w-full bg-transparent border-b border-white/10 py-2 focus:border-[#4DA3FF] outline-none transition-colors min-h-[50px] ${disabled ? 'cursor-default' : 'cursor-pointer'}`}
            >
                <div className="flex flex-wrap gap-2 pr-8">
                    {value.length > 0 &&
                        value.map((item) => (
                            <motion.span
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                key={item}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleOption(item);
                                }}
                                className={`px-3 py-1.5 rounded-full text-sm font-semibold border flex items-center gap-2 group/tag transition-all hover:brightness-95 ${colors[item] || 'bg-white/5 text-white/70'}`}
                            >
                                {item}
                                <span className="text-lg leading-none opacity-60 group-hover/tag:opacity-100">×</span>
                            </motion.span>
                        ))
                    }
                </div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2">
                    {!disabled && (
                        <svg
                            className={`w-4 h-4 text-zinc-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                            fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    )}
                </div>
            </div>

            <label className={`absolute left-0 text-base font-medium transition-all duration-300 pointer-events-none uppercase tracking-wider
                ${(isOpen || value.length > 0) ? '-top-6 text-xs' : 'top-2 text-zinc-500'} 
                ${isOpen ? 'text-brand-primary' : (value.length > 0 ? 'text-zinc-500' : 'text-zinc-500')}`}>
                {label}
            </label>

            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-[#1A1D1F] border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden">
                    <div className="max-h-[300px] overflow-y-auto custom-scrollbar p-2 grid grid-cols-1 sm:grid-cols-2 gap-1">
                        {options.map((option) => {
                            // Only show 'None of the above' if no other services are selected
                            if (option === 'None of the above / Other' && value.length > 0 && !value.includes(option)) {
                                return null;
                            }

                            return (
                                <div
                                    key={option}
                                    className={`px-4 py-3 text-sm cursor-pointer transition-all rounded-xl flex items-center justify-between border border-transparent
                                        ${value.includes(option)
                                            ? 'bg-[#4DA3FF]/10 text-[#4DA3FF] border-[#4DA3FF]/20 font-semibold'
                                            : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}
                                    onClick={() => toggleOption(option)}
                                >
                                    <span>{option}</span>
                                    {value.includes(option) ? (
                                        <div className="w-5 h-5 rounded-full bg-[#4DA3FF] flex items-center justify-center">
                                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    ) : (
                                        <div className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center text-zinc-600">+</div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactPage;

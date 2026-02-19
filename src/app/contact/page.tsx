'use client';

import React, { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Check, Mail, Linkedin, MapPin, Loader2 } from 'lucide-react';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        lastName: '',
        firstName: '',
        email: '',
        phone: '',
        organization: '',
        lookingFor: '',
        message: '',
    });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        setErrorMsg('');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Something went wrong.');
            }

            setStatus('success');
            setFormData({
                lastName: '',
                firstName: '',
                email: '',
                phone: '',
                organization: '',
                lookingFor: '',
                message: '',
            });
        } catch (err: unknown) {
            setStatus('error');
            setErrorMsg(err instanceof Error ? err.message : 'Failed to send message.');
        }
    };

    return (
        <main className="min-h-screen bg-transparent text-white selection:bg-brand-primary/30">

            <div className="w-full px-8 md:px-24 lg:px-32 pt-24 md:pt-32 pb-12 md:pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 lg:gap-24 items-start">

                    {/* Left Column: Information */}
                    <div className="space-y-8 md:space-y-12">
                        <div className="space-y-6">
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-brand-primary font-bold tracking-widest uppercase text-xs md:text-sm"
                            >
                                Contact
                            </motion.span>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight"
                            >
                                Let's develop your business intelligence <span className="relative">
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

                        <div className="flex flex-wrap gap-10 text-zinc-400">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                    <MapPin className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-white font-semibold">Pune, India</p>
                                    <p className="text-xs uppercase tracking-wider">Office</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {[
                                { icon: Mail, label: 'hello@woodfrog.tech', href: 'mailto:hello@woodfrog.tech' },
                                { icon: Linkedin, label: 'Linkedin', href: 'https://www.linkedin.com/company/woodfrogtech/' },
                            ].map((item, idx) => (
                                <motion.a
                                    key={idx}
                                    href={item.href}
                                    target={item.href.startsWith('http') ? '_blank' : undefined}
                                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + (idx * 0.1) }}
                                    className="flex items-center space-x-4 text-xl font-medium hover:text-[#4DA3FF] transition-colors group"
                                >
                                    <item.icon className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
                                    <span className="border-b border-white/10 group-hover:border-[#4DA3FF] transition-colors">{item.label}</span>
                                </motion.a>
                            ))}
                        </div>

                        <div className="space-y-6 pt-6">
                            {[
                                'Partnering with over 80 growing companies',
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
                                    <InputField label="Last name*" value={formData.lastName} onChange={(v) => handleChange('lastName', v)} />
                                    <InputField label="First name*" value={formData.firstName} onChange={(v) => handleChange('firstName', v)} />
                                    <InputField label="Email" value={formData.email} onChange={(v) => handleChange('email', v)} />
                                    <InputField label="Phone" value={formData.phone} onChange={(v) => handleChange('phone', v)} />
                                    <InputField label="Organization" value={formData.organization} onChange={(v) => handleChange('organization', v)} />
                                    <InputField label="I'm looking for*" value={formData.lookingFor} onChange={(v) => handleChange('lookingFor', v)} />
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
}: {
    label: string;
    isTextArea?: boolean;
    value: string;
    onChange: (v: string) => void;
}) => {
    return (
        <div className="relative space-y-2 group">
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

export default ContactPage;

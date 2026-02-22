'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);
    const [view, setView] = useState<'main' | 'personalize'>('main');
    const [preferences, setPreferences] = useState({
        analytical: true,
        marketing: true
    });
    const [userId, setUserId] = useState('');

    useEffect(() => {
        // Generate or retrieve User ID
        let id = localStorage.getItem('woodfrog-user-id');
        if (!id) {
            id = `${Math.floor(Math.random() * 90000) + 10000}-${Date.now()}`;
            localStorage.setItem('woodfrog-user-id', id);
        }
        setUserId(id);

        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        } else {
            // Load saved preferences
            try {
                const savedPrefs = JSON.parse(localStorage.getItem('cookie-preferences') || '{}');
                setPreferences(prev => ({ ...prev, ...savedPrefs }));
            } catch (e) {
                console.error('Failed to parse cookie preferences');
            }
        }
    }, []);

    useEffect(() => {
        const handleShowConsent = () => {
            setView('main');
            setIsVisible(true);
        };
        window.addEventListener('show-cookie-consent', handleShowConsent);
        return () => window.removeEventListener('show-cookie-consent', handleShowConsent);
    }, []);

    const saveSettings = (choice: 'accepted' | 'rejected' | 'custom', customPrefs?: typeof preferences) => {
        localStorage.setItem('cookie-consent', choice);
        const finalPrefs = customPrefs || (choice === 'accepted' ? { analytical: true, marketing: true } : { analytical: false, marketing: false });
        localStorage.setItem('cookie-preferences', JSON.stringify(finalPrefs));
        setPreferences(finalPrefs);
        setIsVisible(false);

        // In real implementation, you would trigger Analytics/Pixel loading here based on finalPrefs
        console.log(`Cookie settings saved: ${choice}`, finalPrefs);
    };

    const Toggle = ({ active, onToggle }: { active: boolean; onToggle: () => void }) => (
        <button
            onClick={onToggle}
            className={`relative w-12 h-6 rounded-full cursor-pointer transition-colors duration-300 flex items-center px-1 ${active ? 'bg-brand-primary' : 'bg-white/10'}`}
        >
            <motion.div
                animate={{ x: active ? 24 : 0 }}
                className="w-4 h-4 bg-white rounded-full shadow-sm"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
        </button>
    );

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed bottom-6 right-6 z-[9999] w-[calc(100%-3rem)] md:w-[460px]"
                >
                    <div className="bg-[#1A1D1F]/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-6 md:p-8 relative overflow-hidden group">
                        <div className="absolute -top-12 -right-12 w-24 h-24 bg-brand-primary/5 blur-[40px] rounded-full group-hover:bg-brand-primary/10 transition-colors duration-500" />

                        <div className="relative z-10">
                            {view === 'main' ? (
                                <div className="space-y-6">
                                    <p className="text-gray-300 text-sm md:text-[15px] leading-relaxed">
                                        We use cookies to analyze site usage and marketing efforts. For more information, consult our{' '}
                                        <Link
                                            href="/privacy-policy"
                                            className="text-white hover:text-brand-primary underline transition-colors"
                                            onClick={() => setIsVisible(false)}
                                        >
                                            Privacy policy
                                        </Link>.
                                    </p>

                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                                        <button
                                            onClick={() => setView('personalize')}
                                            className="text-xs md:text-sm font-bold text-white/40 hover:text-white cursor-pointer transition-colors flex items-center group/btn"
                                        >
                                            Personalize
                                            <svg
                                                width="12" height="12" viewBox="0 0 16 16" fill="none"
                                                className="ml-1.5 opacity-0 -translate-x-1 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all"
                                            >
                                                <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>

                                        <div className="flex items-center gap-4 w-full sm:w-auto">
                                            <button
                                                onClick={() => saveSettings('rejected')}
                                                className="flex-1 sm:flex-none text-xs md:text-sm font-bold text-white/60 hover:text-white cursor-pointer transition-colors py-2"
                                            >
                                                Reject & close
                                            </button>
                                            <button
                                                onClick={() => saveSettings('accepted')}
                                                className="flex-1 sm:flex-none px-6 py-2.5 bg-white text-black text-xs md:text-sm font-bold rounded-full cursor-pointer hover:bg-brand-primary transition-all active:scale-95 whitespace-nowrap"
                                            >
                                                Allow all
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-8">
                                    <div className="space-y-6">
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-white font-bold text-base">Accept analytical cookies?</h3>
                                                <Toggle
                                                    active={preferences.analytical}
                                                    onToggle={() => setPreferences(p => ({ ...p, analytical: !p.analytical }))}
                                                />
                                            </div>
                                            <p className="text-gray-400 text-sm leading-relaxed">
                                                We use Google Analytics to better understand our users&apos; web preferences and interests.
                                            </p>
                                        </div>

                                        <div className="space-y-3 pt-2">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-white font-bold text-base">Accept marketing cookies?</h3>
                                                <Toggle
                                                    active={preferences.marketing}
                                                    onToggle={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                                                />
                                            </div>
                                            <p className="text-gray-400 text-sm leading-relaxed">
                                                We use the Linkedin Insight Tag to better personalize our ads. These cookies are used solely by woodfrog through these platforms and will not be shared with any other third parties.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between gap-6 pt-4">
                                        <button
                                            onClick={() => setView('main')}
                                            className="text-white/60 hover:text-white cursor-pointer transition-colors flex items-center gap-2 text-sm font-bold"
                                        >
                                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="rotate-180">
                                                <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            Back
                                        </button>
                                        <button
                                            onClick={() => saveSettings('custom', preferences)}
                                            className="px-8 py-3 bg-white text-black text-sm font-bold rounded-full cursor-pointer hover:bg-brand-primary transition-all active:scale-95"
                                        >
                                            Save & close
                                        </button>
                                    </div>

                                    <div className="pt-6 border-t border-white/5">
                                        <p className="text-[10px] text-white/30 font-medium">
                                            Your User ID: <span className="text-white/50">{userId}</span>
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

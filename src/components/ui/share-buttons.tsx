'use client';

import React, { useState } from 'react';
import { Facebook, Linkedin, Twitter, Mail, Link as LinkIcon, Check, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ShareButtonsProps {
    title: string;
    path: string;
    className?: string;
    buttonClassName?: string;
    iconClassName?: string;
}

export const ShareButtons = ({ title, path, className, buttonClassName, iconClassName }: ShareButtonsProps) => {
    const [copied, setCopied] = useState(false);

    const getFullUrl = () => {
        if (typeof window === 'undefined') return '';
        const origin = window.location.origin;
        return `${origin}${path}`;
    };

    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getFullUrl())}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(getFullUrl())}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getFullUrl())}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} — ${getFullUrl()}`)}`,
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(getFullUrl());
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy link:', err);
        }
    };

    const handleShare = (platform: keyof typeof shareLinks) => {
        window.open(shareLinks[platform], '_blank', 'noopener,noreferrer,width=600,height=500');
    };

    const handleEmail = () => {
        window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this job posting:\n\n${title}\n${getFullUrl()}`)}`;
    };

    return (
        <div className={cn("flex items-center gap-3", className)}>
            <button
                onClick={() => handleShare('facebook')}
                className={cn("p-2 rounded-full border border-white/5 hover:bg-white/5 text-zinc-400 hover:text-white transition-all", buttonClassName)}
                aria-label="Share on Facebook"
                title="Share on Facebook"
            >
                <Facebook className={cn("w-4 h-4", iconClassName)} />
            </button>
            <button
                onClick={() => handleShare('linkedin')}
                className={cn("p-2 rounded-full border border-white/5 hover:bg-white/5 text-zinc-400 hover:text-white transition-all", buttonClassName)}
                aria-label="Share on LinkedIn"
                title="Share on LinkedIn"
            >
                <Linkedin className={cn("w-4 h-4", iconClassName)} />
            </button>
            <button
                onClick={() => handleShare('twitter')}
                className={cn("p-2 rounded-full border border-white/5 hover:bg-white/5 text-zinc-400 hover:text-white transition-all", buttonClassName)}
                aria-label="Share on Twitter"
                title="Share on Twitter"
            >
                <Twitter className={cn("w-4 h-4", iconClassName)} />
            </button>
            <button
                onClick={() => handleShare('whatsapp')}
                className={cn("p-2 rounded-full border border-white/5 hover:bg-white/5 text-zinc-400 hover:text-[#25D366] transition-all", buttonClassName)}
                aria-label="Share on WhatsApp"
                title="Share on WhatsApp"
            >
                <MessageCircle className={cn("w-4 h-4", iconClassName)} />
            </button>
            <button
                onClick={handleEmail}
                className={cn("p-2 rounded-full border border-white/5 hover:bg-white/5 text-zinc-400 hover:text-white transition-all", buttonClassName)}
                aria-label="Share via Email"
                title="Share via Email"
            >
                <Mail className={cn("w-4 h-4", iconClassName)} />
            </button>
            <button
                onClick={handleCopyLink}
                className={cn("p-2 rounded-full border border-white/5 hover:bg-white/5 text-zinc-400 hover:text-white transition-all relative", buttonClassName)}
                aria-label="Copy Link"
                title="Copy Link"
            >
                {copied ? (
                    <Check className={cn("w-4 h-4 text-green-500", iconClassName)} />
                ) : (
                    <LinkIcon className={cn("w-4 h-4", iconClassName)} />
                )}
            </button>
        </div>
    );
};

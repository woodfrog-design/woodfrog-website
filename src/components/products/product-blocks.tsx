'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from 'recharts';

export const RichText = ({ content }: { content: string }) => {
    // Basic formatting support
    let formatted = content
        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>')
        .replace(/__(.*?)__/g, '<u class="decoration-[#B59560]/50">$1</u>')
        .replace(/\*(.*?)\*/g, '<em class="text-zinc-300">$1</em>');

    // Bullet point support (lines starting with * or -)
    const lines = formatted.split('\n');
    let inList = false;
    const processedLines = lines.map(line => {
        const trimmed = line.trim();
        if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
            const listContent = trimmed.substring(2);
            if (!inList) {
                inList = true;
                return `<ul class="space-y-1 my-6 list-none"><li class="flex items-start gap-3"><span class="w-1.5 h-1.5 rounded-full bg-[#B59560] mt-2.5 shrink-0"></span><span>${listContent}</span></li>`;
            }
            return `<li class="flex items-start gap-3"><span class="w-1.5 h-1.5 rounded-full bg-[#B59560] mt-2.5 shrink-0"></span><span>${listContent}</span></li>`;
        } else {
            if (inList) {
                inList = false;
                return `</ul>${line}`;
            }
            return line;
        }
    });

    if (inList) {
        processedLines.push('</ul>');
    }

    return (
        <div
            className="text-zinc-400 text-lg leading-relaxed mb-6 whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: processedLines.join('\n') }}
        />
    );
};

export const ImageTextImage = ({
    src,
    alt,
    title,
    content,
    reverse
}: {
    src: string;
    alt: string;
    title?: string;
    content?: string;
    reverse?: boolean
}) => {
    return (
        <div className={cn(
            "flex flex-col lg:flex-row gap-12 items-center my-20",
            reverse && "lg:flex-row-reverse"
        )}>
            <div className="flex-1 w-full flex justify-center">
                <div className="relative rounded-[2.5rem] overflow-hidden bg-[#0A0A0A] border border-white/5 shadow-2xl w-full max-w-[260px] md:max-w-[320px] aspect-[9/19.5]">
                    <img src={src} alt={alt} className="w-full h-full object-cover" />
                </div>
            </div>
            <div className="flex-1">
                {title && <h3 className="text-3xl font-bold text-white mb-6 underline decoration-[#B59560]/30">{title}</h3>}
                {content && <RichText content={content} />}
            </div>
        </div>
    );
};

export const ImageLabeling = ({ src, alt, labels, title }: { src: string; alt: string; labels: { x: number; y: number; text: string; color?: string }[]; title?: string }) => {
    return (
        <div className="my-20 flex flex-col items-center">
            <div className="w-full max-w-4xl">
                {title && <h3 className="text-2xl font-bold text-white mb-8 underline decoration-[#B59560]/30">{title}</h3>}
            </div>
            <div className="relative rounded-[2.5rem] overflow-hidden bg-[#0A0A0A] border border-white/5 shadow-2xl max-w-[260px] md:max-w-[320px] aspect-[9/19.5]">
                <img src={src} alt={alt} className="w-full h-full object-cover" />
                {labels.map((label, i) => (
                    <div
                        key={i}
                        className="absolute flex items-center gap-2 group cursor-pointer"
                        style={{ left: `${label.x}%`, top: `${label.y}%` }}
                    >
                        <div className={cn(
                            "w-3 h-3 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)] animate-pulse shadow-glow",
                            label.color === 'red' ? "bg-red-500 shadow-red-500/50" : "bg-[#B59560] shadow-[#B59560]/50"
                        )} />
                        <div className="bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 whitespace-nowrap z-20">
                            {label.text}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const ProductTable = ({ title, data }: { title?: string; data: { headers: string[]; rows: string[][] } }) => {
    return (
        <div className="my-16 overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02]">
            {title && <div className="p-6 border-b border-white/5 bg-white/[0.01]"><h4 className="font-bold text-white">{title}</h4></div>}
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="bg-white/5">
                            {data.headers.map((h, i) => (
                                <th key={i} className="p-4 font-black uppercase tracking-wider text-[#B59560] text-[10px]">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {data.rows.map((row, i) => (
                            <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                                {row.map((cell, j) => (
                                    <td key={j} className="p-4 text-zinc-300 font-medium">{cell}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const COLORS = ['#B59560', '#8B734D', '#D4AF37', '#C5A059'];

export const ProductChart = ({ title, chart }: { title?: string; chart: { type: 'area' | 'bar' | 'pie' | 'line'; data: any[] } }) => {
    const renderChart = () => {
        switch (chart.type) {
            case 'area':
                return (
                    <AreaChart data={chart.data}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#B59560" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#B59560" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" hide />
                        <YAxis hide />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                            itemStyle={{ color: '#B59560' }}
                        />
                        <Area type="monotone" dataKey="value" stroke="#B59560" fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                );
            case 'bar':
                return (
                    <BarChart data={chart.data}>
                        <XAxis dataKey="name" hide />
                        <YAxis hide />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                            itemStyle={{ color: '#B59560' }}
                        />
                        <Bar dataKey="value" fill="#B59560" radius={[4, 4, 0, 0]} />
                    </BarChart>
                );
            case 'pie':
                return (
                    <PieChart>
                        <Pie
                            data={chart.data}
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {chart.data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                        />
                    </PieChart>
                );
            case 'line':
                return (
                    <LineChart data={chart.data}>
                        <XAxis dataKey="name" hide />
                        <YAxis hide />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                            itemStyle={{ color: '#B59560' }}
                        />
                        <Line type="monotone" dataKey="value" stroke="#B59560" strokeWidth={3} dot={{ fill: '#B59560' }} />
                    </LineChart>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 hover:border-[#B59560]/30 transition-all group">
            <h5 className="text-zinc-400 text-sm font-bold mb-6 group-hover:text-white transition-colors">{title}</h5>
            <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    {renderChart()}
                </ResponsiveContainer>
            </div>
        </div>
    );
};

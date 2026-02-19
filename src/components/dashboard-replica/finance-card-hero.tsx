"use client";

import React from "react";
import { FinanceChart } from "./finance-chart";

export const FinanceCardHero = () => {
    return (
        <div className="bg-white rounded-xl shadow-[0_10px_35px_rgba(0,0,0,0.05)] border border-gray-100 p-4 w-full max-w-[420px] font-sans text-gray-900 select-none flex flex-col origin-right">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    {/* Circular Chart Icon */}
                    <div className="w-8 h-8 rounded-full bg-[#f6f3eb] flex items-center justify-center border border-dashed border-gray-200 shadow-inner">
                        <div className="flex items-end gap-[1.5px] h-3 mb-0.5">
                            <div className="w-[2.5px] h-1.5 bg-[#8b5e3c]/40 rounded-full" />
                            <div className="w-[2.5px] h-3.5 bg-[#8b5e3c] rounded-full" />
                            <div className="w-[2.5px] h-2.5 bg-[#8b5e3c]/60 rounded-full" />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <h3 className="text-sm font-black text-[#4a1a1a] tracking-tight leading-none mb-0.5">Finance</h3>
                        <p className="text-[7px] text-gray-400 font-bold uppercase tracking-wide">Tendance des ventes au fil du temps</p>
                    </div>

                    <div className="flex items-center gap-1.5 ml-2 self-start mt-0.5">
                        <div className="relative">
                            <img
                                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                                className="w-6 h-6 rounded-full grayscale border border-white shadow-sm"
                                alt=""
                            />
                            <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-500 border border-white rounded-full" />
                        </div>
                        <div className="bg-gray-50 border border-gray-100 rounded px-1.5 py-0 shadow-sm flex items-center gap-1">
                            <span className="text-[8px] font-black text-gray-800 tracking-tight">Dev 01</span>
                        </div>
                    </div>
                </div>

                {/* Top Right Golden Arrow cursor */}
                <div className="text-[#8b5e3c] transform rotate-[160deg]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21 12l-18 12v-24z" />
                    </svg>
                </div>
            </div>

            {/* Chart Section */}
            <div className="h-40 w-full relative pl-2">
                {/* Floating Tooltip Marker - Utilisateur */}
                <div className="absolute top-[8%] left-[18%] z-10 flex flex-col items-center scale-50 origin-top">
                    <div className="bg-white px-3 py-1.5 rounded-lg shadow-lg border border-gray-50 flex items-center gap-2 mb-2">
                        <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka"
                            alt="User"
                            className="w-5 h-5 rounded-full border border-blue-100"
                        />
                        <span className="text-[10px] font-black text-gray-800 tracking-tight">Utilisateur</span>
                    </div>

                    <div className="w-[1.5px] h-10 bg-gradient-to-b from-[#8b5e3c]/30 to-transparent" />

                    <div className="flex flex-col items-center">
                        <div className="text-[9px] font-black text-[#8b5e3c] tracking-widest">$2150</div>
                        {/* Golden Arrow pointing to brown data point */}
                        <div className="mt-0.5 text-[#8b5e3c] transform rotate-[130deg]">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M21 12l-18 12v-24z" />
                            </svg>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-[#8b5e3c] mt-0.5 border border-white shadow-sm" />
                    </div>
                </div>

                <FinanceChart />
            </div>
        </div>
    );
};

"use client";

import React from "react";
import { ProfitabilityChart } from "./profitability-chart";

export const ProfitabilityCardHero = () => {
    return (
        <div className="bg-white rounded-xl shadow-[0_10px_35px_rgba(0,0,0,0.05)] border border-gray-100 p-3 w-full max-w-[320px] font-sans text-gray-900 select-none flex flex-col min-h-[148px] overflow-hidden relative group">
            {/* Background HUD Accent */}
            <div className="absolute top-0 right-0 p-1 opacity-20 pointer-events-none">
                <div className="text-[6px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-1 rounded border border-gray-100">Analytic-HUD</div>
            </div>

            <div className="flex justify-between items-start mb-1.5 relative z-10">
                <div>
                    <h3 className="text-[10px] font-black text-black mb-0.5 uppercase tracking-wider">Profitabilité</h3>
                    <div className="flex items-center gap-1 opacity-60">
                        <div className="w-1 h-1 rounded-full bg-green-500" />
                        <span className="text-[7px] font-bold text-gray-500 uppercase tracking-tighter">Auto-refresh</span>
                    </div>
                </div>

                <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="bg-gray-50 border border-gray-100 rounded-sm px-1.5 py-0 shadow-sm flex items-center">
                        <span className="text-[8px] font-black text-gray-800 tracking-tight">CFO</span>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#fff5f2] to-white flex items-center justify-center border border-gray-100 shadow-inner">
                        <span className="text-xs font-black text-[#f97316] translate-y-[0.5px]">$</span>
                    </div>
                </div>
            </div>

            <div className="h-[92px] w-full mt-0.5 scale-110">
                <ProfitabilityChart />
            </div>

            {/* Sexy Bottom Accent */}
            <div className="mt-auto pt-1 flex justify-center">
                <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-[#f97316]/30 to-transparent rounded-full" />
            </div>
        </div>
    );
};

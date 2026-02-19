"use client";

import React from "react";
import { VentesChart } from "./ventes-chart";

export const VentesCardHero = () => {
    return (
        <div className="bg-white rounded-xl shadow-[0_10px_35px_rgba(0,0,0,0.05)] border border-gray-100 p-3 w-full max-w-[320px] font-sans text-gray-900 select-none">
            <div className="flex justify-between items-start mb-0.5">
                <div>
                    <h3 className="text-[10px] font-bold text-[#4a1a1a] mb-0.5">Ventes</h3>
                    <div className="text-lg font-black text-gray-900 tracking-tight flex items-baseline gap-0.5">
                        14 878 500<span className="text-sm font-bold">$</span>
                    </div>
                    <p className="text-[8px] text-[#8b7e32] font-black mt-0">
                        vs 12 675 450$ l'an passé
                    </p>
                </div>

                <div className="w-7 h-7 rounded-full bg-[#fdfaf5] flex items-center justify-center border border-gray-100">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8b7e32" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
                        <path d="M22 12A10 10 0 0 0 12 2v10z" />
                    </svg>
                </div>
            </div>

            <div className="h-24 w-full mt-2">
                <VentesChart />
            </div>
        </div>
    );
};

"use client";

import React from "react";
import { DASHBOARD_COLORS, REGIONS, CATEGORIES, useDashboard } from "./dashboard-context";

interface SlicerPanelProps {
    activeView: "executive" | "operational" | "analytical";
    onViewChange: (view: "executive" | "operational" | "analytical") => void;
    selectedRegions: string[];
    onRegionsChange: (regions: string[]) => void;
    selectedCategories: string[];
    onCategoriesChange: (categories: string[]) => void;
    dateRange: { start: Date; end: Date };
    onDateRangeChange: (range: { start: Date; end: Date }) => void;
    selectedPeriod: string;
    onPeriodChange: (period: string) => void;
}

export const SlicerPanel: React.FC<SlicerPanelProps> = ({
    activeView,
    onViewChange,
    selectedRegions,
    onRegionsChange,
    selectedCategories,
    onCategoriesChange,
    selectedPeriod,
    onPeriodChange,
}) => {
    const { clearAllFilters } = useDashboard();
    const views = [
        { id: "executive", label: "Executive Summary" },
        { id: "operational", label: "Operational View" },
        { id: "analytical", label: "Deep Analysis" },
    ] as const;

    const toggleRegion = (region: string) => {
        if (selectedRegions.includes(region)) {
            if (selectedRegions.length > 1) {
                onRegionsChange(selectedRegions.filter((r) => r !== region));
            }
        } else {
            onRegionsChange([...selectedRegions, region]);
        }
    };

    const toggleCategory = (category: string) => {
        if (selectedCategories.includes(category)) {
            if (selectedCategories.length > 1) {
                onCategoriesChange(selectedCategories.filter((c) => c !== category));
            }
        } else {
            onCategoriesChange([...selectedCategories, category]);
        }
    };

    return (
        <div
            className="border-b px-6 py-3"
            style={{ backgroundColor: DASHBOARD_COLORS.card, borderColor: DASHBOARD_COLORS.border }}
        >
            <div className="flex flex-wrap items-center gap-6">
                {/* View Toggle */}
                <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: DASHBOARD_COLORS.textSecondary }}>
                        View:
                    </span>
                    <div className="flex rounded-lg p-0.5" style={{ backgroundColor: DASHBOARD_COLORS.background }}>
                        {views.map((view) => (
                            <button
                                key={view.id}
                                onClick={() => onViewChange(view.id)}
                                className={`
                                    px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200
                                    ${activeView === view.id
                                        ? "shadow-sm"
                                        : "hover:bg-white/5"
                                    }
                                `}
                                style={{
                                    backgroundColor: activeView === view.id ? DASHBOARD_COLORS.card : "transparent",
                                    color: activeView === view.id ? DASHBOARD_COLORS.accent : DASHBOARD_COLORS.textSecondary,
                                    boxShadow: activeView === view.id ? "0 1px 3px rgba(0,0,0,0.4)" : "none"
                                }}
                            >
                                {view.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div className="h-8 w-px" style={{ backgroundColor: DASHBOARD_COLORS.border }} />

                {/* Date Range */}
                <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: DASHBOARD_COLORS.textSecondary }}>
                        Period:
                    </span>
                    <select
                        value={selectedPeriod}
                        onChange={(e) => onPeriodChange(e.target.value)}
                        className="text-sm border rounded-md px-3 py-1.5 focus:outline-none"
                        style={{
                            backgroundColor: DASHBOARD_COLORS.card,
                            borderColor: DASHBOARD_COLORS.border,
                            color: DASHBOARD_COLORS.textPrimary
                        }}
                    >
                        <option value="FY 2024 (Full Year)">FY 2024 (Full Year)</option>
                        <option value="Q4 2024">Q4 2024</option>
                        <option value="Q3 2024">Q3 2024</option>
                        <option value="Q2 2024">Q2 2024</option>
                        <option value="Q1 2024">Q1 2024</option>
                        <option value="Last 12 Months">Last 12 Months</option>
                    </select>
                </div>

                {/* Divider */}
                <div className="h-8 w-px" style={{ backgroundColor: DASHBOARD_COLORS.border }} />

                {/* Region Slicer */}
                <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: DASHBOARD_COLORS.textSecondary }}>
                        Region:
                    </span>
                    <div className="flex gap-1">
                        {REGIONS.map((region) => (
                            <button
                                key={region}
                                onClick={() => toggleRegion(region)}
                                className={`
                                    px-2.5 py-1 text-xs font-medium rounded border transition-all duration-150
                                    ${selectedRegions.includes(region)
                                        ? "text-white shadow-lg shadow-blue-900/20"
                                        : "hover:border-blue-500/50"
                                    }
                                `}
                                style={{
                                    backgroundColor: selectedRegions.includes(region) ? DASHBOARD_COLORS.accent : DASHBOARD_COLORS.card,
                                    borderColor: selectedRegions.includes(region) ? DASHBOARD_COLORS.accent : DASHBOARD_COLORS.border,
                                    color: selectedRegions.includes(region) ? "#FFFFFF" : DASHBOARD_COLORS.textSecondary
                                }}
                            >
                                {region}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div className="h-8 w-px" style={{ backgroundColor: DASHBOARD_COLORS.border }} />

                {/* Category Slicer */}
                <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: DASHBOARD_COLORS.textSecondary }}>
                        Segment:
                    </span>
                    <div className="flex gap-1">
                        {CATEGORIES.map((category) => (
                            <button
                                key={category}
                                onClick={() => toggleCategory(category)}
                                className={`
                                    px-2.5 py-1 text-xs font-medium rounded border transition-all duration-150
                                    ${selectedCategories.includes(category)
                                        ? "text-white shadow-lg shadow-blue-800/20"
                                        : "hover:border-blue-400/50"
                                    }
                                `}
                                style={{
                                    backgroundColor: selectedCategories.includes(category) ? DASHBOARD_COLORS.secondary : DASHBOARD_COLORS.card,
                                    borderColor: selectedCategories.includes(category) ? DASHBOARD_COLORS.secondary : DASHBOARD_COLORS.border,
                                    color: selectedCategories.includes(category) ? "#FFFFFF" : DASHBOARD_COLORS.textSecondary
                                }}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Reset Filters */}
                <button
                    onClick={clearAllFilters}
                    className="ml-auto text-xs font-medium hover:underline transition-colors"
                    style={{ color: DASHBOARD_COLORS.accent }}
                >
                    Reset Filters
                </button>
            </div>
        </div>
    );
};

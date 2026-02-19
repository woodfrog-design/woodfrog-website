"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Types for dashboard state
interface DateRange {
    start: Date;
    end: Date;
}

interface DashboardFilters {
    dateRange: DateRange;
    regions: string[];
    categories: string[];
    segments: string[];
    period: string;
}

interface DashboardState {
    filters: DashboardFilters;
    activeView: "executive" | "operational" | "analytical";
    highlightedRegion: string | null;
    highlightedCategory: string | null;
    isLoading: boolean;
}

interface DashboardContextType {
    state: DashboardState;
    setFilters: (filters: Partial<DashboardFilters>) => void;
    setActiveView: (view: DashboardState["activeView"]) => void;
    setHighlightedRegion: (region: string | null) => void;
    setHighlightedCategory: (category: string | null) => void;
    clearAllFilters: () => void;
}

// Sample data configuration
export const REGIONS = ["North", "South", "East", "West", "Central"];
export const CATEGORIES = ["Enterprise", "SMB", "Consumer", "Government"];
export const SEGMENTS = ["Hardware", "Software", "Services", "Licensing"];

// Default values
const defaultFilters: DashboardFilters = {
    dateRange: {
        start: new Date(2024, 0, 1),
        end: new Date(2024, 11, 31),
    },
    regions: [...REGIONS],
    categories: [...CATEGORIES],
    segments: [...SEGMENTS],
    period: "FY 2024 (Full Year)",
};

const defaultState: DashboardState = {
    filters: defaultFilters,
    activeView: "executive",
    highlightedRegion: null,
    highlightedCategory: null,
    isLoading: false,
};

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<DashboardState>(defaultState);

    const setFilters = (newFilters: Partial<DashboardFilters>) => {
        setState((prev) => ({
            ...prev,
            filters: { ...prev.filters, ...newFilters },
        }));
    };

    const setActiveView = (view: DashboardState["activeView"]) => {
        setState((prev) => ({ ...prev, activeView: view }));
    };

    const setHighlightedRegion = (region: string | null) => {
        setState((prev) => ({ ...prev, highlightedRegion: region }));
    };

    const setHighlightedCategory = (category: string | null) => {
        setState((prev) => ({ ...prev, highlightedCategory: category }));
    };

    const clearAllFilters = () => {
        setState((prev) => ({ ...prev, filters: defaultFilters }));
    };

    return (
        <DashboardContext.Provider
            value={{
                state,
                setFilters,
                setActiveView,
                setHighlightedRegion,
                setHighlightedCategory,
                clearAllFilters,
            }}
        >
            {children}
        </DashboardContext.Provider>
    );
};

export const useDashboard = () => {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error("useDashboard must be used within DashboardProvider");
    }
    return context;
};

// --- Mock Data Engine (Zero Lag) ---

const seededRandom = (seed: string) => {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = ((hash << 5) - hash) + seed.charCodeAt(i);
        hash |= 0;
    }
    return () => {
        hash = (hash * 16807) % 2147483647;
        return (hash - 1) / 2147483646;
    };
};

export const useFilteredData = () => {
    const { state } = useDashboard();
    const { filters, activeView } = state;

    // Use filters as seed to ensure data stays consistent for the same selection
    const seed = `${filters.regions.join(",")}-${filters.categories.join(",")}-${filters.period}-${activeView}`;
    const rng = seededRandom(seed);

    // Filter Impact Multiplier: Fewer regions/categories = lower totals
    const coverageMultiplier = (filters.regions.length / REGIONS.length) * (filters.categories.length / CATEGORIES.length);
    const baseMultiplier = 0.5 + (coverageMultiplier * 0.5); // Range 0.5 to 1.0

    // 1. Time Series Data
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const timeSeriesData = months.map((m, i) => {
        const trend = 1 + (i * 0.05); // Growth trend
        const rev = (60 + rng() * 30) * baseMultiplier * trend;
        return {
            month: m,
            revenue: rev,
            margin: rev * (0.35 + rng() * 0.1),
            expenses: rev * (0.2 + rng() * 0.1),
        };
    });

    // 2. Bullet Chart Data (KPIs vs Targets)
    const bulletData = [
        { label: "Revenue vs Target", actual: timeSeriesData.reduce((a, b) => a + b.revenue, 0), target: 950 * baseMultiplier, ranges: [700, 850, 1000].map(r => r * baseMultiplier) as [number, number, number], unit: "₹ Cr", format: "currency" as const },
        { label: "Gross Margin %", actual: (timeSeriesData.reduce((a, b) => a + b.margin, 0) / timeSeriesData.reduce((a, b) => a + b.revenue, 0)) * 100, target: 45, ranges: [35, 42, 50] as [number, number, number], unit: "%", format: "percent" as const },
        { label: "Customer Acquisition", actual: Math.floor(1200 * baseMultiplier * (0.9 + rng() * 0.2)), target: 1200 * baseMultiplier, ranges: [800, 1100, 1400].map(r => r * baseMultiplier) as [number, number, number], unit: "", format: "number" as const },
        { label: "NPS Score", actual: 65 + rng() * 10, target: 70, ranges: [40, 60, 80] as [number, number, number], unit: "", format: "number" as const },
    ];

    // 3. Funnel Data
    const baseLeads = 15000 * baseMultiplier;
    const funnelSteps = [
        { label: "Leads", value: Math.floor(baseLeads), color: "#6D28D9" },      // Violet 700
        { label: "Qualified", value: Math.floor(baseLeads * 0.65), color: "#7C3AED" }, // Violet 600
        { label: "Proposal", value: Math.floor(baseLeads * 0.4), color: "#8B5CF6" },  // Violet 500
        { label: "Negotiation", value: Math.floor(baseLeads * 0.25), color: "#A855F7" }, // Purple 500
        { label: "Closed", value: Math.floor(baseLeads * 0.15), color: "#D946EF" },  // Fuchsia 500
    ];

    // 4. Heatmap Data (Matrix)
    const heatmapData: any[] = [];
    filters.regions.forEach(region => {
        SEGMENTS.forEach(segment => {
            const baseVal = 80 + rng() * 100;
            heatmapData.push({
                region,
                segment,
                value: baseVal * baseMultiplier,
                variance: (rng() * 40) - 20
            });
        });
    });

    // 5. Scatter Data
    const scatterData = filters.regions.map((region, i) => ({
        id: `reg-${i}`,
        name: region,
        revenue: (200 + rng() * 300) * baseMultiplier,
        growth: (rng() * 20) - 5,
        margin: 30 + (rng() * 20),
        segment: i % 2 === 0 ? "Enterprise" : "SMB"
    }));

    return {
        timeSeriesData,
        bulletData,
        funnelSteps,
        heatmapData,
        scatterData,
        totals: {
            revenue: bulletData[0].actual,
            margin: bulletData[1].actual,
            growth: (i: number) => (4 + rng() * 2).toFixed(1) + "%"
        }
    };
};

import { ENTERPRISE_DASHBOARD_THEME } from "@/lib/colors";

// Color palette - Controlled via colors.ts
export const DASHBOARD_COLORS = {
    primary: ENTERPRISE_DASHBOARD_THEME.primary,
    secondary: ENTERPRISE_DASHBOARD_THEME.secondary,
    tertiary: ENTERPRISE_DASHBOARD_THEME.tertiary,
    accent: ENTERPRISE_DASHBOARD_THEME.secondary,
    brandOrange: "#f9dc66",  // Brand Identity (Yellow)
    background: ENTERPRISE_DASHBOARD_THEME.background,
    card: ENTERPRISE_DASHBOARD_THEME.card,
    textPrimary: ENTERPRISE_DASHBOARD_THEME.textPrimary,
    textSecondary: ENTERPRISE_DASHBOARD_THEME.textSecondary,
    positive: ENTERPRISE_DASHBOARD_THEME.success,
    negative: ENTERPRISE_DASHBOARD_THEME.danger,
    border: ENTERPRISE_DASHBOARD_THEME.border,
    gridLine: ENTERPRISE_DASHBOARD_THEME.gridLine,
};

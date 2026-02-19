export const ENTERPRISE_DASHBOARD_THEME = {
    // ===== Base Surfaces =====
    background: "#0A0F14",      // Main app background (deep graphite)
    card: "#121A22",            // Card surface
    surface: "#1A2632",         // Elevated sections (filters/nav areas)

    // ===== Brand / Accent =====
    primary: "#3B82F6",         // Chart Primary (Clean Blue)
    secondary: "#8B5CF6",       // Electric Violet Accent
    tertiary: "#EC4899",        // Soft Magenta Highlight

    // ===== Status Colors =====
    success: "#10B981",         // Woodfrog Emerald (positive metrics)
    warning: "#F59E0B",         // Warning
    danger: "#F43F5E",          // Rose
    info: "#3B82F6",            // Blue

    // ===== Typography =====
    textPrimary: "#F1F5F9",     // Main text
    textSecondary: "#94A3B8",   // Muted text
    textMuted: "#64748B",       // Subtle labels

    // ===== Borders & Grid =====
    border: "rgba(148,163,184,0.15)",
    gridLine: "rgba(148,163,184,0.08)",

    // ===== Shadows =====
    cardShadow: "0 8px 24px rgba(0,0,0,0.4)",

} as const;






export const ANIMATION_THEME = {
    primary: '#10B981',         // Woodfrog Brand Yellow
    background: 'rgba(255, 255, 255, 1)',      // Neutral White
    text: {
        primary: '#0f172a',    // Slate 900
        secondary: '#64748b',  // Slate 500
        muted: '#94a3b8',      // Slate 400
    },
    accent: {
        success: '#10b981',    // Emerald 500
        danger: '#f43f5e',     // Rose 500
        info: '#3b82f6',       // Blue 500
    },
    border: '#e2e8f0',         // Slate 200
} as const;


//#10B981
// ThemeContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

type ThemeContextType = {
    isDarkTheme: boolean;
    toggleTheme: () => void;
};

declare global {
    interface Window {
        __THEME_PREFERENCE__?: string;
    }
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Try to match the initialization with what happens in the HTML
    const [isDarkTheme, setIsDarkTheme] = useState(() => {
        return window.__THEME_PREFERENCE__ === 'dark';
    });

    const applyTheme = (isDark: boolean) => {
        const root: HTMLElement = document.documentElement;
        const body = document.body;

        if (isDark) {
            // Dark theme
            root.style.setProperty('--color-gray-200', '#1e1e1e');
            root.style.setProperty('--color-gray-300', '#F5F5F5');
            root.style.setProperty('--dark-secondary-text', '#c7c6c8');
            root.style.setProperty('--color-darkslategray-100', '#2f2f37');
            root.style.setProperty('--color-gray-400', 'rgba(18, 18, 18, 0.95)');
            root.style.setProperty('--dark-primary-text', '#f9f8fa');
            root.style.setProperty('--color-darkgray', '#abafb5');
            root.style.setProperty('--color-darkslategray-200', '#2f2f2d');
            root.style.setProperty('--toggle-icon', '50px');
            
            // Apply classes
            root.classList.add('dark-theme', 'dark-mode');
            root.classList.remove('light-theme', 'light-mode');
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
            
            // Directly set background and color for immediate effect
            root.style.backgroundColor = '#2f2f37';
            root.style.color = '#f9f8fa';
        } else {
            // Light theme
            root.style.setProperty('--color-gray-200', '#F5F5F5');
            root.style.setProperty('--color-gray-300', '#F5F5F5');
            root.style.setProperty('--dark-secondary-text', '#000000');
            root.style.setProperty('--color-darkslategray-100', '#ffffff');
            root.style.setProperty('--color-gray-400', '#ffffff');
            root.style.setProperty('--dark-primary-text', '#000000');
            root.style.setProperty('--color-darkgray', '#808080');
            root.style.setProperty('--color-darkslategray-200', '#ffffff');
            root.style.setProperty('--toggle-icon', '50px');
            
            // Apply classes
            root.classList.add('light-theme', 'light-mode');
            root.classList.remove('dark-theme', 'dark-mode');
            body.classList.add('light-mode');
            body.classList.remove('dark-mode');
            
            // Directly set background and color for immediate effect
            root.style.backgroundColor = '#ffffff';
            root.style.color = '#000000';
        }
        
        // Update window preference for page reloads
        window.__THEME_PREFERENCE__ = isDark ? 'dark' : 'light';
    };

    const toggleTheme = () => {
        const newTheme = !isDarkTheme;
        setIsDarkTheme(newTheme);
        localStorage.setItem("theme", newTheme ? "dark" : "light");
    };

    // Apply theme when it changes
    useEffect(() => {
        applyTheme(isDarkTheme);
    }, [isDarkTheme]);
    
    // System preference detection
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        const handleChange = (e: MediaQueryListEvent) => {
            if (!localStorage.getItem('theme')) {
                setIsDarkTheme(e.matches);
            }
        };
        
        // Modern browsers
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        } 
        // Legacy browsers
        else {
            mediaQuery.addListener(handleChange as any);
            return () => mediaQuery.removeListener(handleChange as any);
        }
    }, []);

    return (
        <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};

export default ThemeContext;
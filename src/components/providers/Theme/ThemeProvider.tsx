import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

// ============================================================================
// TYPES
// ============================================================================

export type ThemeName = 'neobrutalist' | 'earthy';
export type ThemeMode = 'light' | 'dark';

export interface ThemeContextValue {
  /** Current theme name */
  theme: ThemeName;
  /** Current color mode */
  mode: ThemeMode;
  /** Set the theme */
  setTheme: (theme: ThemeName) => void;
  /** Set the color mode */
  setMode: (mode: ThemeMode) => void;
  /** Toggle between themes */
  toggleTheme: () => void;
  /** Toggle between light and dark mode */
  toggleMode: () => void;
}

export interface ThemeProviderProps {
  /** Initial theme to use */
  defaultTheme?: ThemeName;
  /** Initial color mode */
  defaultMode?: ThemeMode;
  /** Persist theme selection to localStorage */
  storageKey?: string;
  /** Children to render */
  children: React.ReactNode;
}

// ============================================================================
// CONTEXT
// ============================================================================

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// ============================================================================
// PROVIDER COMPONENT
// ============================================================================

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  defaultTheme = 'neobrutalist',
  defaultMode = 'light',
  storageKey = 'vibe-theme',
  children,
}) => {
  // Initialize state from localStorage or defaults
  const [theme, setThemeState] = useState<ThemeName>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`${storageKey}-name`);
      if (stored === 'neobrutalist' || stored === 'earthy') {
        return stored;
      }
    }
    return defaultTheme;
  });

  const [mode, setModeState] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`${storageKey}-mode`);
      if (stored === 'light' || stored === 'dark') {
        return stored;
      }
      // Check system preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return defaultMode;
  });

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.setAttribute('data-mode', mode);
    
    // Persist to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(`${storageKey}-name`, theme);
      localStorage.setItem(`${storageKey}-mode`, mode);
    }
  }, [theme, mode, storageKey]);

  // Listen for system preference changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      // Only auto-switch if user hasn't explicitly set a preference
      const storedMode = localStorage.getItem(`${storageKey}-mode`);
      if (!storedMode) {
        setModeState(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [storageKey]);

  const setTheme = useCallback((newTheme: ThemeName) => {
    setThemeState(newTheme);
  }, []);

  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => prev === 'neobrutalist' ? 'earthy' : 'neobrutalist');
  }, []);

  const toggleMode = useCallback(() => {
    setModeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const value: ThemeContextValue = {
    theme,
    mode,
    setTheme,
    setMode,
    toggleTheme,
    toggleMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// ============================================================================
// HOOK
// ============================================================================

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// ============================================================================
// DISPLAY NAME
// ============================================================================

ThemeProvider.displayName = 'ThemeProvider';


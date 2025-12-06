// 'use client';

// import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// type Theme =
//     | 'gold'
//     | 'diamond'
//     | 'rose'
//     | 'professional'
//     | 'sapphire'
//     | 'tech'
//     | 'darkblue';

// type ThemeContextType = {
//     theme: Theme;
//     setTheme: (theme: Theme) => void;
//     toggleTheme: () => void;
// };

// const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// const themeClasses: Record<Theme, string> = {
//     gold: '',
//     diamond: 'theme-diamond',
//     rose: 'theme-rose',
//     professional: 'theme-professional',
//     sapphire: 'theme-sapphire',
//     tech: 'theme-tech',
//     darkblue: 'theme-darkblue',
// };

// interface ThemeProviderProps {
//     children: ReactNode;
// }

// export function ThemeProvider({ children }: ThemeProviderProps) {
//     const [theme, setTheme] = useState<Theme>('gold');
//     const [mounted, setMounted] = useState(false);

//     useEffect(() => {
//         setMounted(true);
//         const savedTheme = localStorage.getItem('jewelry-platform-theme') as Theme;
//         if (savedTheme && themeClasses[savedTheme]) {
//             setTheme(savedTheme);
//         }
//     }, []);

//     useEffect(() => {
//         if (!mounted) return;
        
//         const root = document.documentElement;

//         Object.values(themeClasses).forEach((className) => {
//             if (className) {
//                 root.classList.remove(className);
//             }
//         });

//         if (themeClasses[theme]) {
//             root.classList.add(themeClasses[theme]);
//         }

//         localStorage.setItem('jewelry-platform-theme', theme);
//     }, [theme, mounted]);

//     const toggleTheme = () => {
//         const themes: Theme[] = ['gold', 'diamond', 'rose'];
//         const currentIndex = themes.indexOf(theme);
//         const nextIndex = (currentIndex + 1) % themes.length;
//         setTheme(themes[nextIndex]);
//     };

//     const providerValue = {
//         theme,
//         setTheme,
//         toggleTheme
//     };

//     return (
//         <ThemeContext.Provider value={providerValue}>
//             {children}
//         </ThemeContext.Provider>
//     );
// }

// export function useTheme(): ThemeContextType {
//     const context = useContext(ThemeContext);
//     if (context === undefined) {
//         throw new Error('useTheme must be used within a ThemeProvider');
//     }
//     return context;
// }

// export function getThemeColors(theme: Theme) {
//     const colors = {
//         gold: {
//             primary: '#D4AF37',
//             secondary: '#FFFFF0',
//             accent: '#1a1a1a',
//             gradient: 'bg-gradient-gold',
//         },
//         diamond: {
//             primary: '#C0C0C0',
//             secondary: '#191970',
//             accent: '#ffffff',
//             gradient: 'bg-gradient-silver',
//         },
//         rose: {
//             primary: '#E0BFB8',
//             secondary: '#2F4F4F',
//             accent: '#FAFAFA',
//             gradient: 'bg-gradient-rose',
//         },
//         professional: {
//             primary: '#D4AF37',
//             secondary: '#2c3e50',
//             accent: '#ffffff',
//             gradient: 'bg-gradient-gold',
//         },
//         sapphire: {
//             primary: '#3b82f6',
//             secondary: '#1e3a8a',
//             accent: '#f8fafc',
//             gradient: 'bg-gradient-blue',
//         },
//         tech: {
//             primary: '#10b981',
//             secondary: '#374151',
//             accent: '#111827',
//             gradient: 'bg-gradient-dark',
//         },
//         darkblue: {
//             primary: '#3b82f6',
//             secondary: '#0f172a',
//             accent: '#1e293b',
//             gradient: 'bg-gradient-dark',
//         },
//     };

//     return colors[theme];
// }

// export function getButtonClass(theme: Theme, variant: 'primary' | 'secondary' = 'primary'): string {
//     const baseClasses = 'btn-luxury';

//     const variantClasses = {
//         gold: variant === 'primary' ? 'btn-gold' : 'btn-secondary',
//         diamond: variant === 'primary' ? 'btn-silver' : 'btn-secondary',
//         rose: variant === 'primary' ? 'btn-rose' : 'btn-secondary',
//         professional: variant === 'primary' ? 'btn-gold' : 'btn-secondary',
//         sapphire: variant === 'primary' ? 'btn-blue' : 'btn-secondary',
//         tech: variant === 'primary' ? 'btn-green' : 'btn-secondary',
//         darkblue: variant === 'primary' ? 'btn-blue' : 'btn-secondary',
//     };

//     return `${baseClasses} ${variantClasses[theme]}`;
// }

'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme =
    | 'gold'
    | 'diamond'
    | 'rose'
    | 'professional'
    | 'sapphire'
    | 'tech'
    | 'darkblue';

type ThemeContextType = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themeClasses: Record<Theme, string> = {
    gold: '',
    diamond: 'theme-diamond',
    rose: 'theme-rose',
    professional: 'theme-professional',
    sapphire: 'theme-sapphire',
    tech: 'theme-tech',
    darkblue: 'theme-darkblue',
};

interface ThemeProviderProps {
    children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>('gold');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem('jewelry-platform-theme') as Theme;
        if (savedTheme && themeClasses[savedTheme]) {
            setTheme(savedTheme);
        }
    }, []);

    useEffect(() => {
        if (!mounted) return;
        
        const root = document.documentElement;

        Object.values(themeClasses).forEach((className) => {
            if (className) {
                root.classList.remove(className);
            }
        });

        if (themeClasses[theme]) {
            root.classList.add(themeClasses[theme]);
        }

        localStorage.setItem('jewelry-platform-theme', theme);
    }, [theme, mounted]);

    const toggleTheme = () => {
        const themes: Theme[] = ['gold', 'diamond', 'rose'];
        const currentIndex = themes.indexOf(theme);
        const nextIndex = (currentIndex + 1) % themes.length;
        setTheme(themes[nextIndex]);
    };

    const providerValue: ThemeContextType = {
        theme,
        setTheme,
        toggleTheme
    };

    return React.createElement(
        ThemeContext.Provider,
        { value: providerValue },
        children
    );
}

export function useTheme(): ThemeContextType {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

export function getThemeColors(theme: Theme) {
    const colors = {
        gold: {
            primary: '#D4AF37',
            secondary: '#FFFFF0',
            accent: '#1a1a1a',
            gradient: 'bg-gradient-gold',
        },
        diamond: {
            primary: '#C0C0C0',
            secondary: '#191970',
            accent: '#ffffff',
            gradient: 'bg-gradient-silver',
        },
        rose: {
            primary: '#E0BFB8',
            secondary: '#2F4F4F',
            accent: '#FAFAFA',
            gradient: 'bg-gradient-rose',
        },
        professional: {
            primary: '#D4AF37',
            secondary: '#2c3e50',
            accent: '#ffffff',
            gradient: 'bg-gradient-gold',
        },
        sapphire: {
            primary: '#3b82f6',
            secondary: '#1e3a8a',
            accent: '#f8fafc',
            gradient: 'bg-gradient-blue',
        },
        tech: {
            primary: '#10b981',
            secondary: '#374151',
            accent: '#111827',
            gradient: 'bg-gradient-dark',
        },
        darkblue: {
            primary: '#3b82f6',
            secondary: '#0f172a',
            accent: '#1e293b',
            gradient: 'bg-gradient-dark',
        },
    };

    return colors[theme];
}

export function getButtonClass(theme: Theme, variant: 'primary' | 'secondary' = 'primary'): string {
    const baseClasses = 'btn-luxury';

    const variantClasses = {
        gold: variant === 'primary' ? 'btn-gold' : 'btn-secondary',
        diamond: variant === 'primary' ? 'btn-silver' : 'btn-secondary',
        rose: variant === 'primary' ? 'btn-rose' : 'btn-secondary',
        professional: variant === 'primary' ? 'btn-gold' : 'btn-secondary',
        sapphire: variant === 'primary' ? 'btn-blue' : 'btn-secondary',
        tech: variant === 'primary' ? 'btn-green' : 'btn-secondary',
        darkblue: variant === 'primary' ? 'btn-blue' : 'btn-secondary',
    };

    return `${baseClasses} ${variantClasses[theme]}`;
}
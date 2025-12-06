'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@/lib/themes/useTheme';
import { ReactNode } from 'react';

interface ProvidersProps {
    children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    return (
        <ThemeProvider>
            <SessionProvider>
                {children}
            </SessionProvider>
        </ThemeProvider>
    );
}
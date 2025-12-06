// import './globals.css';
// import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google';
// import { SessionProvider } from 'next-auth/react';
// import { ThemeProvider } from '@/lib/themes/useTheme';
// import { Toaster } from '@/components/ui/toaster';

// const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
// const playfair = Playfair_Display({
//   subsets: ['latin'],
//   variable: '--font-playfair',
//   weight: ['400', '500', '600', '700'],
// });
// const jetbrains = JetBrains_Mono({
//   subsets: ['latin'],
//   variable: '--font-jetbrains',
//   weight: ['400', '500'],
// });

// export const metadata = {
//   title: 'Luxury Custom Jewelry Platform',
//   description: 'Create your own custom jewelry with our 3D design tool. Premium materials, expert craftsmanship, and worldwide shipping.',
//   keywords: ['custom jewelry', '3D design', 'luxury', 'rings', 'pendants', 'bracelets'],
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`}>
//       <body className="min-h-screen bg-background font-sans antialiased">
//         <ThemeProvider>
//           <SessionProvider>
//             <div className="relative min-h-screen">
//               <main>{children}</main>
//               <Toaster />
//             </div>
//           </SessionProvider>
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }

import './globals.css';
import { Inter, Playfair_Display } from 'next/font/google';
import { Providers } from '@/components/Provider';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata = {
  title: 'Luxury Custom Jewelry Platform',
  description: 'Create your own custom jewelry with our 3D design tool. Premium materials, expert craftsmanship, and worldwide shipping.',
  keywords: ['custom jewelry', '3D design', 'luxury', 'rings', 'pendants', 'bracelets'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>
          <div className="relative min-h-screen">
            <main>{children}</main>
            <Toaster />
          </div>
        </Providers>
      </body>
    </html>
  );
}
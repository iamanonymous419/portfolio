import type React from 'react';
import '@/app/globals.css';
import { Inter, Poppins } from 'next/font/google';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { cn } from '@/lib/utils';
import type { NextFontWithVariable } from 'next/dist/compiled/@next/font';

const inter: NextFontWithVariable = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const poppins: NextFontWithVariable = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
});

export const metadata: {
  title: string;
  description: string;
} = {
  title: 'Anonymous - Web Developer & DevOps Expert',
  description:
    'Portfolio website of Anonymous, a Web Developer and DevOps expert specializing in full-stack development and infrastructure as code.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={cn(
              inter.variable,
          poppins.variable,
          'font-sans antialiased'
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

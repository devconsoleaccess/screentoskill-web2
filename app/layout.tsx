import type {Metadata} from 'next';
import {Inter, Space_Grotesk} from 'next/font/google';
import './globals.css'; // Global styles
import LenisProvider from '@/components/lenis-provider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ScreenToSkill – Screen Time in Exchange for Learning',
  description: 'Premium parental control & gamified learning application that converts addictive screen time into skill-building educational MCQ sessions.',
  icons: {
    icon: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><style>line{stroke:%2300D084;stroke-width:6.5;stroke-linecap:round}</style><line x1="11" y1="24" x2="11" y2="76" /><line x1="24" y1="17" x2="24" y2="83" /><line x1="37" y1="10" x2="37" y2="90" /><line x1="50" y1="4" x2="50" y2="96" /><line x1="63" y1="10" x2="63" y2="90" /><line x1="76" y1="17" x2="76" y2="83" /><line x1="89" y1="24" x2="89" y2="76" /></svg>`
  }
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} antialiased`} suppressHydrationWarning>
      <body suppressHydrationWarning className="font-sans antialiased text-rendering-optimizeLegibility bg-slate-50 text-slate-800 selection:bg-emerald-100 selection:text-emerald-950">
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}

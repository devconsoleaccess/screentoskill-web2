import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
// @ts-ignore
import './globals.css';
import LenisProvider from '@/components/providers/LenisProvider';
import { ThemeProvider, ThemeNoFlashScript } from '@/components/providers/ThemeProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Providers from './providers';

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

const BASE_URL = 'https://screentoskill.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'ScreenToSkill – Turn Screen Time Into Learning',
    template: '%s | ScreenToSkill',
  },
  description:
    'ScreenToSkill is a premium parental control app that gamifies screen time. Kids earn device time by completing educational MCQ sessions — making learning addictive, not scrolling.',
  keywords: [
    'parental control app',
    'screen time management',
    'educational app for kids',
    'gamified learning',
    'kids learning app',
    'screen time to learning',
    'MCQ for children',
    'parental controls iPhone Android',
    'reduce screen time kids',
    'educational screen time',
  ],
  authors: [{ name: 'ScreenToSkill', url: BASE_URL }],
  creator: 'ScreenToSkill',
  publisher: 'ScreenToSkill',
  category: 'Education',
  applicationName: 'ScreenToSkill',

  alternates: {
    canonical: '/',
    languages: { 'en-US': '/en-US' },
  },

  openGraph: {
    type: 'website',
    url: BASE_URL,
    siteName: 'ScreenToSkill',
    title: 'ScreenToSkill – Turn Screen Time Into Learning',
    description:
      'Kids earn screen time by completing fun educational quizzes. A smarter way to parent in the digital age.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ScreenToSkill – Screen Time in Exchange for Learning',
      },
    ],
    locale: 'en_US',
  },

  twitter: {
    card: 'summary_large_image',
    site: '@screentoskill',
    creator: '@screentoskill',
    title: 'ScreenToSkill – Turn Screen Time Into Learning',
    description:
      'Kids earn screen time by completing fun educational quizzes. A smarter way to parent in the digital age.',
    images: ['/og-image.png'],
  },

  icons: {
    icon: [
      {
        url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><style>line{stroke:%2300D084;stroke-width:6.5;stroke-linecap:round}</style><line x1="11" y1="24" x2="11" y2="76" /><line x1="24" y1="17" x2="24" y2="83" /><line x1="37" y1="10" x2="37" y2="90" /><line x1="50" y1="4" x2="50" y2="96" /><line x1="63" y1="10" x2="63" y2="90" /><line x1="76" y1="17" x2="76" y2="83" /><line x1="89" y1="24" x2="89" y2="76" /></svg>`,
        type: 'image/svg+xml',
      },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },

  manifest: '/site.webmanifest',

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  verification: {
    google: 'YOUR_GOOGLE_SITE_VERIFICATION_TOKEN',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: BASE_URL,
      name: 'ScreenToSkill',
      description:
        'Premium parental control & gamified learning app that converts screen time into educational MCQ sessions.',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'ScreenToSkill',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.png`,
        width: 512,
        height: 512,
      },
      sameAs: [
        'https://twitter.com/screentoskill',
        'https://www.instagram.com/screentoskill',
        'https://www.linkedin.com/company/screentoskill',
      ],
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${BASE_URL}/#app`,
      name: 'ScreenToSkill',
      operatingSystem: 'iOS, Android',
      applicationCategory: 'EducationApplication',
      description:
        "ScreenToSkill lets parents convert their children's screen time into skill-building educational quiz sessions.",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <ThemeNoFlashScript />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        <meta name="theme-color" content="#00D084" />
        <meta name="msapplication-TileColor" content="#00D084" />

        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ScreenToSkill" />

        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
      </head>
      <body
        suppressHydrationWarning
        className="font-sans antialiased text-rendering-optimizeLegibility bg-[var(--background)] text-[var(--foreground)] selection:bg-emerald-100 selection:text-emerald-950 dark:selection:bg-emerald-500/30 dark:selection:text-emerald-50"
      >
        <Providers>

        <ThemeProvider>
         
          <LenisProvider>{children}</LenisProvider>
        </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}

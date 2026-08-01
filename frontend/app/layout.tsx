import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import type { ReactNode } from 'react';
import './globals.css';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' });

export const metadata: Metadata = {
  title: {
    default: 'Pomvix — Software that moves businesses forward',
    template: '%s — Pomvix',
  },
  description:
    'Pomvix builds thoughtful software, SaaS platforms, and AI products for ambitious teams.',
  metadataBase: new URL('https://pomvix.com'),
  alternates: { canonical: '/' },
  icons: {
    icon: '/icon.webp',
    shortcut: '/icon.webp',
    apple: '/icon.webp',
  },
  openGraph: {
    title: 'Pomvix — Software that moves businesses forward',
    description: 'Digital products engineered for what comes next.',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={manrope.variable}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

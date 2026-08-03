import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import type { ReactNode } from 'react';
import './globals.css';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { siteConfig } from '@/lib/site';
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' });

export const metadata: Metadata = {
  title: {
    default: 'Pomvix — Software that moves businesses forward',
    template: '%s — Pomvix',
  },
  description:
    'Pomvix builds thoughtful software, SaaS platforms, and AI products for ambitious teams.',
  metadataBase: new URL(siteConfig.url),
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
    siteName: 'Pomvix',
    locale: 'en_US',
    url: '/',
    images: [{ url: '/logo.png', alt: 'Pomvix' }],
  },
  twitter: { card: 'summary_large_image', title: 'Pomvix — Software that moves businesses forward', images: ['/logo.png'] },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={manrope.variable}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              { '@type': 'Organization', name: 'Pomvix', url: siteConfig.url, logo: `${siteConfig.url}/logo.png`, email: `mailto:${siteConfig.contactEmail}` },
              { '@type': 'WebSite', name: 'Pomvix', url: siteConfig.url },
              { '@type': 'ProfessionalService', name: 'Pomvix', url: siteConfig.url, email: `mailto:${siteConfig.contactEmail}` },
            ],
          })
        }} />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

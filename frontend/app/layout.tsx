import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import Script from 'next/script';
import type { ReactNode } from 'react';
import './globals.css';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { siteConfig } from '@/lib/site';
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' });

export const metadata: Metadata = {
  title: {
    default: 'Pomvix — AI & SaaS Product Development',
    template: '%s — Pomvix',
  },
  description:
    'Pomvix helps startups and growing companies build, extend, and automate AI-powered products, SaaS applications, MVPs, and modern web software.',
  metadataBase: new URL(siteConfig.url),
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  manifest: '/manifest.webmanifest',
  category: 'technology',
  applicationName: 'Pomvix',
  formatDetection: { telephone: false },
  icons: {
    icon: '/icon.webp',
    shortcut: '/icon.webp',
    apple: '/icon.webp',
  },
  openGraph: {
    title: 'Pomvix — AI & SaaS Product Development Partner',
    description:
      'AI-powered products, SaaS applications, MVPs, and senior software engineering for startups and growing companies.',
    type: 'website',
    siteName: 'Pomvix',
    locale: 'en_US',
    url: '/',
    images: [
      { url: '/logo.png', width: 1200, height: 630, alt: 'Pomvix software development studio' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pomvix — AI & SaaS Product Development Partner',
    description:
      'AI-powered products, SaaS applications, MVPs, and senior software engineering for startups and growing companies.',
    images: ['/logo.png'],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MKJ558NQ');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body className={manrope.variable}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MKJ558NQ"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  '@id': `${siteConfig.url}#organization`,
                  name: 'Pomvix',
                  url: siteConfig.url,
                  logo: `${siteConfig.url}/logo.png`,
                  email: `mailto:${siteConfig.contactEmail}`,
                  description: siteConfig.description,
                  knowsAbout: [
                    'Software development',
                    'AI product development',
                    'SaaS development',
                    'Web applications',
                  ],
                  contactPoint: {
                    '@type': 'ContactPoint',
                    contactType: 'sales',
                    email: `mailto:${siteConfig.contactEmail}`,
                  },
                },
                {
                  '@type': 'WebSite',
                  '@id': `${siteConfig.url}#website`,
                  name: 'Pomvix',
                  url: siteConfig.url,
                  description: siteConfig.description,
                  publisher: { '@id': `${siteConfig.url}#organization` },
                },
              ],
            }),
          }}
        />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

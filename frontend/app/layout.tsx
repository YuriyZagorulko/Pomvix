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
      <head>
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MKJ558NQ');`
        }} />
        {/* End Google Tag Manager */}
      </head>
      <body className={manrope.variable}>
        {/* Google Tag Manager (noscript) */}
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MKJ558NQ"
height="0" width="0" style={{display:'none',visibility:'hidden'}}></iframe></noscript>
        {/* End Google Tag Manager (noscript) */}
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

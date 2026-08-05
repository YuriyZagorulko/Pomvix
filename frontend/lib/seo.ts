import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site';
import type { Service } from '@/lib/services';

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = `${siteConfig.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: { index: true, follow: true },
    openGraph: {
      title: `${title} — Pomvix`,
      description,
      url,
      type: 'website',
      siteName: siteConfig.name,
      locale: 'en_US',
      images: [
        {
          url: `${siteConfig.url}/logo.png`,
          width: 1200,
          height: 630,
          alt: 'Pomvix software development studio',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} — Pomvix`,
      description,
      images: [`${siteConfig.url}/logo.png`],
    },
  };
}

export function serviceJsonLd(service: Service) {
  const url = `${siteConfig.url}/services/${service.slug}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: service.title,
        serviceType: service.shortTitle,
        description: service.description,
        provider: { '@type': 'ProfessionalService', name: siteConfig.name, url: siteConfig.url },
        url,
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        name: service.title,
        description: service.description,
        url,
        isPartOf: { '@type': 'WebSite', name: siteConfig.name, url: siteConfig.url },
        about: { '@id': `${url}#service` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Services',
            item: `${siteConfig.url}/services`,
          },
          { '@type': 'ListItem', position: 3, name: service.title, item: url },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: service.faqs.map(({ question, answer }) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer },
        })),
      },
    ],
  };
}

export function pageJsonLd(title: string, description: string, path: string, type = 'WebPage') {
  const url = `${siteConfig.url}${path}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': type,
        '@id': `${url}#page`,
        name: title,
        description,
        url,
        isPartOf: { '@type': 'WebSite', name: siteConfig.name, url: siteConfig.url },
        inLanguage: 'en-US',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
          { '@type': 'ListItem', position: 2, name: title, item: url },
        ],
      },
    ],
  };
}

export function faqJsonLd(
  groups: { title: string; items: { question: string; answer: string }[] }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: groups
      .flatMap((group) => group.items)
      .map(({ question, answer }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
  };
}

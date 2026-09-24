import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/site';
import { services } from '@/lib/services';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date().toISOString();
  const paths = [
    '/',
    '/services',
    '/process',
    '/faq',
    '/technologies',
    '/about',
    '/contact',
    ...services.map(({ slug }) => `/services/${slug}`),
  ];

  return paths.map((path) => ({
    url: getSiteUrl(path),
    lastModified,
  }));
}

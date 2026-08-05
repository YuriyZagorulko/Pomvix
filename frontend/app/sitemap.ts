import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';
import { services } from '@/lib/services';
export default function sitemap(): MetadataRoute.Sitemap {
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
    url: `${siteConfig.url}${path}`,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path.startsWith('/services/') ? 0.8 : 0.6,
  }));
}

import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';
export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', '/services', '/portfolio', '/technologies', '/about', '/contact'].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
  }));
}

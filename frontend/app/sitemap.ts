import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';
export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', '/services', '/technologies', '/about', '/contact'].map((path) => ({
    url: `${siteConfig.url}${path}`,
  }));
}

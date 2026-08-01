import type { MetadataRoute } from 'next';
export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', '/services', '/portfolio', '/technologies', '/about', '/contact'].map((path) => ({
    url: `https://pomvix.com${path}`,
    lastModified: new Date(),
  }));
}

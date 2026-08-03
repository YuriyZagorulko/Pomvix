import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Pomvix',
    short_name: 'Pomvix',
    description: 'Software that moves businesses forward.',
    start_url: '/',
    display: 'standalone',
    background_color: '#060816',
    theme_color: '#060816',
    icons: [{ src: '/icon.webp', sizes: 'any', type: 'image/webp', purpose: 'any' }],
  };
}
/** @type {import('next').NextConfig} */
const devApiConnectSrc =
  process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_API_URL
    ? ` ${new URL(process.env.NEXT_PUBLIC_API_URL).origin}`
    : '';

// Next.js dev compiles page code with eval(). Without this source, the dev
// client never hydrates and click handlers, including accordions, never run.
const devScriptSrc = process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : '';

const nextConfig = {
  output: 'standalone',
  images: { formats: ['image/avif', 'image/webp'] },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self'; " +
              "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://static.cloudflareinsights.com https://bzrcdn.openai.com" +
              devScriptSrc +
              '; ' +
              "style-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://fonts.googleapis.com; " +
              "img-src 'self' data: blob: https://www.googletagmanager.com https://www.google-analytics.com https://www.google.com https://fonts.gstatic.com https://bzr.openai.com; " +
              "font-src 'self' https://fonts.gstatic.com; " +
              "connect-src 'self' https://api.pomvix.com https://www.googletagmanager.com https://www.google-analytics.com https://analytics.google.com https://www.google.com https://static.cloudflareinsights.com https://bzr.openai.com https://bzrcdn.openai.com" +
              devApiConnectSrc +
              '; ' +
              "frame-src 'self' https://www.googletagmanager.com; " +
              "object-src 'none'; " +
              "base-uri 'self'; " +
              "frame-ancestors 'self'; " +
              "form-action 'self'",
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;

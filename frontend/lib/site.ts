/**
 * Central site configuration.
 *
 * All values are environment-driven. `NEXT_PUBLIC_*` variables are inlined
 * at build time by Next.js, so they must be provided when building the
 * frontend image (see docker-compose.prod.yml).
 */

export const siteConfig = {
  /** Public site URL, e.g. https://pomvix.com */
  // Keep production URLs canonical even if a build is run without env vars.
  // Local development can still override this with NEXT_PUBLIC_SITE_URL.
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://pomvix.com',
  /** Public API base URL, e.g. https://pomvix.com/api/v1 */
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  /** Public contact email address */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@pomvix.com',
  name: 'Pomvix',
  description:
    'Pomvix builds web applications, SaaS platforms, MVPs, and practical AI products for ambitious teams.',
} as const;

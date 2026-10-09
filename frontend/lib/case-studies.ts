export type CaseStudyMeta = {
  slug: string;
  title: string;
  subtitle: string;
  badge: string;
  excerpt: string;
  /** Public, non-admin URL only */
  publicSiteUrl?: string;
  relatedServiceSlugs: string[];
  technologies: string[];
};

export const caseStudies: CaseStudyMeta[] = [
  {
    slug: 'gadgeto',
    title: 'Gadgeto',
    subtitle: 'E-commerce Platform Engineering & Catalog Automation',
    badge: 'Founder-owned project',
    excerpt:
      'A custom electronics e-commerce platform with supplier imports, normalized catalog data, pricing, and multi-channel exports—built as an independent product, not a client engagement.',
    publicSiteUrl: 'https://gadgeto.com.ua/',
    relatedServiceSlugs: ['web-development', 'backend-development', 'saas-development'],
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'FastAPI',
      'PostgreSQL',
      'Redis',
      'Celery',
      'Docker',
    ],
  },
];

export const caseStudyBySlug = Object.fromEntries(
  caseStudies.map((study) => [study.slug, study]),
) as Record<string, CaseStudyMeta>;

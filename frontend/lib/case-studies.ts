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
    badge: 'E-commerce platform',
    excerpt:
      'Gadgeto is an e-commerce platform for electronics and computer equipment, covering supplier imports, catalog normalization, and multi-channel exports.',
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

import type { Metadata } from 'next';
import { PageHero } from '@/components/page-hero';
import { Section } from '@/components/section';
import { CaseStudyCards } from '@/components/case-study-cards';
import { pageJsonLd, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata(
  'Case Studies',
  'Technical case studies from Pomvix covering e-commerce, catalog automation, and custom platform development.',
  '/case-studies',
);

export default function CaseStudiesIndexPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            pageJsonLd(String(metadata.title), String(metadata.description), '/case-studies'),
          ),
        }}
      />
      <PageHero
        eyebrow="Pomvix case studies"
        title="Real engineering, described honestly."
        description="These pages document engineering work Pomvix has built: platform decisions, trade-offs, and delivery."
      />
      <Section eyebrow="Featured work" title="In-depth technical case studies.">
        <CaseStudyCards />
      </Section>
    </main>
  );
}

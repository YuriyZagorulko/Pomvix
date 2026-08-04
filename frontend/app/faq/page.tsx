import type { Metadata } from 'next';
import { PageHero } from '@/components/page-hero';
import { Section } from '@/components/section';
import { faqGroups } from '@/lib/faq';
import { faqJsonLd, pageJsonLd, pageMetadata } from '@/lib/seo';
export const metadata: Metadata = pageMetadata(
  'Software Development FAQ',
  'Answers to common questions about hiring Pomvix, development, pricing, timelines, communication, support, technology, AI, and SaaS.',
  '/faq',
);
export default function FAQ() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            pageJsonLd(String(metadata.title), String(metadata.description), '/faq'),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqGroups)) }}
      />
      <PageHero
        eyebrow="Questions, answered"
        title="A practical FAQ for software projects."
        description="Useful answers about working with Pomvix—from the first conversation to technology choices, launch, and ongoing support."
      />
      {faqGroups.map((group) => (
        <Section eyebrow="Pomvix FAQ" title={group.title} key={group.title}>
          <div className="mt-10 max-w-4xl space-y-3">
            {group.items.map((faq) => (
              <details className="card p-6" key={faq.question}>
                <summary className="cursor-pointer list-none pr-6 text-lg font-medium">
                  {faq.question}
                </summary>
                <p className="mt-4 leading-7 text-slate-400">{faq.answer}</p>
              </details>
            ))}
          </div>
        </Section>
      ))}
    </main>
  );
}

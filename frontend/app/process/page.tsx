import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/page-hero';
import { Section } from '@/components/section';
import { pageJsonLd, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata(
  'Software Development Process',
  'See how Pomvix takes software projects from discovery and planning through development, launch, and support.',
  '/process',
);
const steps = [
  [
    '01',
    'Discovery',
    'We understand the business goal, users, workflow, constraints, and the decision the product needs to support.',
  ],
  [
    '02',
    'Planning',
    'We turn the problem into a practical scope, delivery sequence, risks, responsibilities, and success criteria.',
  ],
  [
    '03',
    'UX/UI',
    'We shape information architecture and key interactions so the product is clear before engineering complexity grows.',
  ],
  [
    '04',
    'Architecture',
    'We choose application boundaries, data models, integrations, and technologies that match the product rather than a trend.',
  ],
  [
    '05',
    'Development',
    'We build in reviewable increments with visible decisions, working software, and feedback loops that protect momentum.',
  ],
  [
    '06',
    'Testing',
    'We test realistic workflows, edge cases, responsive behavior, accessibility, integrations, and the failure modes that matter.',
  ],
  [
    '07',
    'Deployment',
    'We prepare a clear release, documentation, handoff, and operational checklist for the intended environment.',
  ],
  [
    '08',
    'Support',
    'We can continue with fixes, improvements, performance work, and planning for the next validated product step.',
  ],
];
export default function Process() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            pageJsonLd(String(metadata.title), String(metadata.description), '/process'),
          ),
        }}
      />
      <PageHero
        eyebrow="How we work"
        title="A software process built for clear decisions."
        description="Pomvix combines product thinking and engineering craft in a practical process for US businesses, founders, and product teams."
      />
      <Section title="From first conversation to a product your team can operate.">
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {steps.map(([number, title, text]) => (
            <div className="card p-8" key={number}>
              <span className="text-4xl font-light text-lavender">{number}</span>
              <h2 className="mt-8 text-2xl">{title}</h2>
              <p className="mt-4 leading-7 text-slate-400">{text}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section
        eyebrow="A collaborative rhythm"
        title="The process adapts without becoming vague."
        className="border-y border-white/[.06] bg-white/[.015]"
      >
        <div className="max-w-3xl space-y-6 text-slate-400 mt-7">
          <p className="leading-8">
            Every project has different risks. A startup MVP may spend more time defining the
            learning goal, while backend modernization may start with system behavior and failure
            analysis. The stages remain useful because they create shared checkpoints, not because
            they are a rigid ceremony.
          </p>
          <p className="leading-8">
            You see working progress, open questions, and trade-offs throughout delivery. That gives
            your team the context to make decisions early, when changing direction is less
            expensive.
          </p>
        </div>
      </Section>
      <Section title="Ready to discuss your next step?">
        <Link href="/contact" className="button button-primary mt-8">
          Start a conversation <ArrowRight size={16} />
        </Link>
        <Link href="/services" className="button button-ghost ml-3 mt-8">
          Explore services
        </Link>
      </Section>
    </main>
  );
}

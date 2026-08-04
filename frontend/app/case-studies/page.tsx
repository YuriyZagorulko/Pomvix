import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/page-hero';
import { Section } from '@/components/section';
import { pageJsonLd, pageMetadata } from '@/lib/seo';
export const metadata: Metadata = pageMetadata(
  'Software Development Case Studies',
  'Explore Pomvix project work. Public client case studies will be added as projects become available.',
  '/case-studies',
);
export default function CaseStudies() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            pageJsonLd(
              String(metadata.title),
              String(metadata.description),
              '/case-studies',
              'CollectionPage',
            ),
          ),
        }}
      />
      <PageHero
        eyebrow="Selected work"
        title="Proof through the work itself."
        description="Pomvix does not publish invented client stories. Public case studies will be added as projects become available and clients approve sharing them."
      />
      <Section eyebrow="Internal project" title="The Pomvix website">
        <div className="mt-12 grid gap-10 md:grid-cols-[1.1fr_.9fr]">
          <div className="space-y-6 text-slate-400">
            <p className="leading-8">
              This website is an internal Pomvix project created to explain our capabilities,
              communicate our working approach, and give prospective partners a clear way to start a
              conversation.
            </p>
            <p className="leading-8">
              The goal was a fast, accessible, content-led experience that preserves a distinctive
              visual identity while providing a solid foundation for service pages, SEO, and future
              commercial content.
            </p>
            <p className="leading-8">
              It is clearly identified as internal work—not a client case study or performance claim
              for another organization.
            </p>
          </div>
          <div className="card p-8">
            <h3 className="text-2xl">Project focus</h3>
            <ul className="mt-6 space-y-3 text-slate-400">
              <li>— Clear service architecture and internal linking</li>
              <li>— Server-rendered Next.js pages</li>
              <li>— Semantic content and metadata</li>
              <li>— Reusable content-driven components</li>
              <li>— A deployment-ready frontend structure</li>
            </ul>
          </div>
        </div>
      </Section>
      <Section
        eyebrow="Architecture and technology"
        title="A maintainable foundation for the next release."
        className="border-y border-white/[.06] bg-white/[.015]"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div className="card p-7">
            <h3 className="text-xl">Architecture</h3>
            <p className="mt-4 leading-7 text-slate-400">
              The site uses the Next.js App Router, shared layout components, data-driven service
              routes, centralized site configuration, and reusable metadata helpers.
            </p>
          </div>
          <div className="card p-7">
            <h3 className="text-xl">Technologies</h3>
            <p className="mt-4 leading-7 text-slate-400">
              Next.js, React, TypeScript, Tailwind CSS, Lucide icons, semantic HTML, and structured
              data support the frontend experience.
            </p>
          </div>
          <div className="card p-7">
            <h3 className="text-xl">Performance</h3>
            <p className="mt-4 leading-7 text-slate-400">
              The frontend favors server-rendered content, lightweight shared components, optimized
              local imagery, and a focused dependency set.
            </p>
          </div>
          <div className="card p-7">
            <h3 className="text-xl">SEO</h3>
            <p className="mt-4 leading-7 text-slate-400">
              Each commercial page has unique metadata, canonical URLs, Open Graph and Twitter
              fields, structured data, and links into related content.
            </p>
          </div>
        </div>
      </Section>
      <Section title="Want to see how we would approach your product?">
        <Link href="/process" className="button button-ghost">
          See our process
        </Link>
        <Link href="/contact" className="button button-primary ml-3">
          Discuss your project <ArrowRight size={16} />
        </Link>
      </Section>
    </main>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/section';
import { PageHero } from '@/components/page-hero';
import { services } from '@/lib/services';
import { pageMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  ...pageMetadata(
    'Software Development Services',
    'Pomvix provides AI, SaaS, MVP, custom web, and backend development services for teams in the US and beyond.',
    '/services',
  ),
};

export default function Services() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'WebPage',
                name: 'Software Development Services',
                url: `${siteConfig.url}/services`,
                description: metadata.description,
              },
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
                  {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'Services',
                    item: `${siteConfig.url}/services`,
                  },
                ],
              },
            ],
          }),
        }}
      />
      <PageHero
        eyebrow="Our capabilities"
        title="Software built around the work that matters."
        description="Pomvix helps US businesses and product teams plan, build, and improve software that has a clear job to do. Explore the service that fits your next step."
      />
      <Section eyebrow="How we can help" title="Choose a focused capability for your product.">
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                href={`/services/${service.slug}`}
                className="card group p-7 transition duration-300 hover:-translate-y-1 hover:border-indigo-300/40"
                key={service.slug}
              >
                <Icon className="mb-12 text-mint" size={24} aria-hidden="true" />
                <h3 className="text-xl font-medium">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{service.description}</p>
                <span className="mt-7 inline-flex items-center gap-2 text-sm text-slate-400 group-hover:text-white">
                  Explore service <ArrowRight size={15} />
                </span>
              </Link>
            );
          })}
        </div>
      </Section>
      <section className="shell pb-32">
        <div className="card relative overflow-hidden p-10 md:p-16">
          <div className="orb absolute -right-10 -top-20 h-72 w-72 rounded-full bg-indigo-400/10 blur-3xl" />
          <div className="relative max-w-2xl">
            <p className="eyebrow mb-5">Have a challenge?</p>
            <h2 className="text-4xl md:text-6xl">Let’s find the clearest way forward.</h2>
            <p className="mt-6 max-w-lg leading-7 text-slate-400">
              Tell us what you’re building and what is getting in the way. We’ll help you identify a
              sensible next step.
            </p>
            <Link href="/contact" className="button button-primary mt-8">
              Start a conversation <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

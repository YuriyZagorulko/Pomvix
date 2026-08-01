import type { Metadata } from 'next';
import { Section } from '@/components/section';
import { ServiceCards } from '@/components/cards';
import { PageHero } from '@/components/page-hero';
export const metadata: Metadata = {
  title: 'Services',
  description: 'Software product design and engineering services from Pomvix.',
};
export default function Services() {
  return (
    <main>
      <PageHero
        eyebrow="Our capabilities"
        title="Complex problems deserve clear solutions."
        description="We partner with ambitious teams to turn hard problems into digital products that are useful, resilient, and ready to scale."
      />
      <Section title="From first thought to lasting advantage.">
        <ServiceCards />
        <div className="mt-20 grid gap-5 md:grid-cols-2">
          <div className="card p-8">
            <h3 className="text-2xl">MVP development</h3>
            <p className="mt-4 leading-7 text-slate-400">
              Validate your most important assumptions with a focused, well-engineered first
              version.
            </p>
          </div>
          <div className="card p-8">
            <h3 className="text-2xl">Cloud & API architecture</h3>
            <p className="mt-4 leading-7 text-slate-400">
              Secure, observable foundations that stay fast as your product and team grow.
            </p>
          </div>
        </div>
      </Section>
    </main>
  );
}

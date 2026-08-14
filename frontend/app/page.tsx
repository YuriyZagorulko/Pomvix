import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Hero } from '@/components/hero';
import { Section } from '@/components/section';
import { ServiceCards } from '@/components/cards';
import { pageJsonLd, pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata(
  'AI & SaaS Product Development Partner',
  'Pomvix helps startups and growing companies build AI-powered products, SaaS applications, MVPs, and modern web software.',
  '/',
);
export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            pageJsonLd(String(metadata.title), String(metadata.description), '/'),
          ),
        }}
      />
      <Hero />
      <Section
        eyebrow="What Pomvix does"
        title="Experienced engineering for the next stage of your product."
      >
        <ServiceCards />
      </Section>
      <Section
        eyebrow="Three ways to work together"
        title="From first release to the engineering capacity you need next."
      >
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {[
            [
              'Build',
              'MVP and SaaS product development',
              'Turn a validated idea into a focused, usable product foundation.',
            ],
            [
              'Extend',
              'Senior engineering support',
              'Add experienced React, Next.js, and Python capacity to an existing team.',
            ],
            [
              'Automate',
              'AI integrations and workflows',
              'Connect models, agents, and business systems to remove repetitive work.',
            ],
          ].map(([label, title, description]) => (
            <div className="card p-7" key={label}>
              <span className="text-sm uppercase tracking-[.15em] text-mint">{label}</span>
              <h3 className="mt-6 text-xl">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">{description}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section
        eyebrow="Why Pomvix"
        title="Build reliable software with focused technical execution."
        className="border-y border-white/[.06] bg-white/[.015]"
      >
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          <div>
            <span className="text-5xl font-light text-lavender">01</span>
            <h3 className="mt-7 text-xl">Direct communication</h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              Work closely with experienced engineering throughout product planning, development,
              and delivery.
            </p>
          </div>
          <div>
            <span className="text-5xl font-light text-lavender">02</span>
            <h3 className="mt-7 text-xl">Fast, focused execution</h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              Keep scope clear, review working software early, and make practical trade-offs
              quickly.
            </p>
          </div>
          <div>
            <span className="text-5xl font-light text-lavender">03</span>
            <h3 className="mt-7 text-xl">A foundation you can own</h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              Get understandable software, documented decisions, and an architecture ready for the
              next step.
            </p>
          </div>
        </div>
      </Section>
      <section className="shell pb-32">
        <div className="card relative overflow-hidden p-10 md:p-16">
          <div className="orb absolute -right-10 -top-20 h-72 w-72 rounded-full bg-indigo-400/10 blur-3xl" />
          <div className="relative max-w-2xl">
            <p className="eyebrow mb-5">Have a challenge?</p>
            <h2 className="text-4xl md:text-6xl">
              Let’s make something <span className="gradient-text">meaningful.</span>
            </h2>
            <p className="mt-6 max-w-lg leading-7 text-slate-400">
              Tell us where you want to go. We’ll help you find the clearest way to get there.
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

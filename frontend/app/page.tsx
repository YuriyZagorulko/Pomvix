import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Hero } from '@/components/hero';
import { Section } from '@/components/section';
import { ServiceCards, WorkCards } from '@/components/cards';
import { pageJsonLd, pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata(
  'Custom Software Development Company',
  'Pomvix is a software development company building AI products, SaaS platforms, MVPs, and custom web applications for ambitious teams.',
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
      <Section eyebrow="What we do" title="The right mix of clarity, craft, and technical depth.">
        <ServiceCards />
      </Section>
      <Section
        eyebrow="A better way to build"
        title="Built around your ambition, not a fixed process."
        className="border-y border-white/[.06] bg-white/[.015]"
      >
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          <div>
            <span className="text-5xl font-light text-lavender">01</span>
            <h3 className="mt-7 text-xl">Start with why</h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              We ask better questions before we write a line of code.
            </p>
          </div>
          <div>
            <span className="text-5xl font-light text-lavender">02</span>
            <h3 className="mt-7 text-xl">Make it tangible</h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              Fast feedback loops turn uncertainty into momentum.
            </p>
          </div>
          <div>
            <span className="text-5xl font-light text-lavender">03</span>
            <h3 className="mt-7 text-xl">Keep it moving</h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              We build foundations that stay useful long after launch.
            </p>
          </div>
        </div>
      </Section>
      <Section
        eyebrow="Selected work"
        title="A small selection of things we've helped bring to life."
      >
        <WorkCards />
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

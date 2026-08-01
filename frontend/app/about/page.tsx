import type { Metadata } from 'next';
import { PageHero } from '@/components/page-hero';
import { Section } from '@/components/section';
export const metadata: Metadata = {
  title: 'About',
  description: 'Meet Pomvix, an independent software studio for ambitious teams.',
};
export default function About() {
  return (
    <main>
      <PageHero
        eyebrow="A little about us"
        title="We believe technology is at its best when it feels inevitable."
        description="Pomvix is an independent software studio. We bring product thinking and engineering craft together to help good ideas become useful realities."
      />
      <Section title="Our principles">
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {[
            [
              'Clarity over noise',
              'The best solution is often the one that makes the fewest things feel complicated.',
            ],
            [
              'Craft over shortcuts',
              'Small details compound. We care about the quality of every layer.',
            ],
            [
              'Partnership over handoff',
              'We work alongside you, sharing context and responsibility from day one.',
            ],
          ].map(([x, y]) => (
            <div className="card p-7" key={x}>
              <h3 className="text-xl">{x}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-400">{y}</p>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}

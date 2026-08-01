import type { Metadata } from 'next';
import { PageHero } from '@/components/page-hero';
import { Section } from '@/components/section';
import { WorkCards } from '@/components/cards';
export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Selected digital products and platforms built by Pomvix.',
};
export default function Portfolio() {
  return (
    <main>
      <PageHero
        eyebrow="Selected work"
        title="Good work leaves things better than it found them."
        description="A selection of placeholder case studies. We’ll be adding the full stories behind our work soon."
      />
      <Section title="Selected projects">
        <WorkCards />
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {[
            'A calmer way to collaborate.',
            'Making data feel human.',
            'The next chapter of commerce.',
          ].map((x, i) => (
            <div className="card min-h-[280px] p-7" key={x}>
              <p className="eyebrow">{['SaaS', 'Data', 'Commerce'][i]}</p>
              <h3 className="mt-28 text-xl">{x}</h3>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}

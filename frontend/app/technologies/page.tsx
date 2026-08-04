import type { Metadata } from 'next';
import { Code2, Database, Cloud, BrainCircuit } from 'lucide-react';
import { PageHero } from '@/components/page-hero';
import { Section } from '@/components/section';
import { pageMetadata } from '@/lib/seo';
export const metadata: Metadata = pageMetadata(
  'Technology Stack',
  'Explore the modern technologies Pomvix uses to build reliable web, SaaS, AI, and backend products.',
  '/technologies',
);
const groups = [
  ['Frontend', Code2, ['React', 'Next.js', 'TypeScript', 'Tailwind CSS']],
  ['Backend', Database, ['Python', 'FastAPI', 'PostgreSQL', 'SQLAlchemy']],
  ['Cloud & delivery', Cloud, ['Docker', 'Nginx', 'CI/CD', 'Observability']],
  ['AI systems', BrainCircuit, ['OpenAI', 'Anthropic', 'Ollama', 'Vector search']],
];
export default function Technologies() {
  return (
    <main>
      <PageHero
        eyebrow="Our toolkit"
        title="The right tool for the right job."
        description="We choose technologies for their clarity, maturity, and ability to serve your product for years—not because they’re trending."
      />
      <Section title="A stack designed to last.">
        <div className="grid gap-5 md:grid-cols-2">
          {groups.map(([name, I, items]) => (
            <div className="card p-8" key={name as string}>
              {typeof I === 'function' && <I className="text-mint" size={25} />}
              <h3 className="mt-12 text-2xl">{name as string}</h3>
              <div className="mt-6 flex flex-wrap gap-2">
                {(items as string[]).map((x) => (
                  <span
                    className="rounded-full border border-white/10 bg-white/[.04] px-3 py-2 text-xs text-slate-300"
                    key={x}
                  >
                    {x}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}

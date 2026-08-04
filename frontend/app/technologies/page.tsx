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
  {
    name: 'Frontend',
    icon: Code2,
    description: 'Fast, responsive interfaces optimized for usability and SEO.',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    name: 'Backend',
    icon: Database,
    description: 'Reliable APIs and scalable business logic built for long-term growth.',
    items: ['Python', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Alembic', 'Pydantic'],
  },
  {
    name: 'Cloud & Infrastructure',
    icon: Cloud,
    description: 'Secure infrastructure, automated deployments, and production-ready operations.',
    items: [
      'AWS',
      'Docker',
      'Docker Compose',
      'Nginx',
      'Cloudflare',
      'GitHub Actions',
      'CI/CD',
      'Linux',
    ],
  },
  {
    name: 'AI Systems',
    icon: BrainCircuit,
    description: 'Modern AI integrations, agents, automation, and retrieval systems.',
    items: ['OpenAI', 'Anthropic', 'Ollama', 'OpenRouter', 'Vector Search', 'AI Agents'],
  },
];
export default function Technologies() {
  return (
    <main>
      <PageHero
        eyebrow="Technology with intent"
        title="A reliable foundation for ambitious products."
        description="We choose proven technologies that keep your product maintainable today, scalable tomorrow, and valuable for the long term—not tools selected because they are trending."
      />
      <Section title="A stack designed to last.">
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {groups.map(({ name, icon: Icon, description, items }) => (
            <div
              className="card group p-7 transition duration-300 hover:-translate-y-1 hover:border-indigo-300/40"
              key={name}
            >
              <div className="flex items-center justify-between">
                <Icon className="text-mint" size={25} aria-hidden="true" />
                <span className="text-xs uppercase tracking-[0.16em] text-slate-500">
                  {String(items.length).padStart(2, '0')} tools
                </span>
              </div>
              <h3 className="mt-10 text-2xl">{name}</h3>
              <p className="mt-3 max-w-md text-sm leading-7 text-slate-400">{description}</p>
              <div className="mt-7 flex flex-wrap gap-2">
                {items.map((x) => (
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
      <Section
        eyebrow="Our approach"
        title="We don't sell technologies—we solve business problems."
        className="border-y border-white/[.06] bg-white/[.015]"
      >
        <p className="max-w-3xl leading-8 text-slate-400">
          Our stack evolves over time, but our goal stays the same: build reliable software that is
          easy to maintain, secure to operate, and ready to scale as your business grows.
        </p>
      </Section>
    </main>
  );
}

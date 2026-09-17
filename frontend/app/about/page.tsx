import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Code2, Database, Workflow } from 'lucide-react';
import { PageHero } from '@/components/page-hero';
import { Section } from '@/components/section';
import { pageJsonLd, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata(
  'About the Practice',
  'Pomvix is an independent software engineering practice. Learn about the developer’s full-stack focus, direct delivery model, and practical approach to web and AI products.',
  '/about',
);

const capabilities = [
  {
    title: 'Interfaces and product workflows',
    icon: Code2,
    text: 'React, Next.js, and TypeScript / JavaScript for web applications: frontend architecture, accessible interactions, and the loading, empty, and error states that make a workflow usable.',
  },
  {
    title: 'APIs and data foundations',
    icon: Database,
    text: 'Python, Django or FastAPI where appropriate, and PostgreSQL for application logic, APIs, integrations, and data modeling. SaaS work connects these foundations to accounts, permissions, and customer workflows.',
  },
  {
    title: 'AI features and operation',
    icon: Workflow,
    text: 'AI / LLM applications built around a defined task, approved data, and evaluation. Docker and CI/CD support repeatable delivery, with testing and operational behavior considered alongside implementation.',
  },
];

const principles = [
  [
    'Start with the decision',
    'An MVP should help a real user complete a useful task and give you evidence for the next investment. Features that do neither can wait.',
  ],
  [
    'Keep the architecture understandable',
    'Prefer clear modules, data ownership, and API boundaries. Independent services should solve a concrete operational problem, not add complexity by default.',
  ],
  [
    'Show the trade-offs',
    'Make assumptions, constraints, and technical decisions visible so scope changes can be discussed with their effect on effort and delivery.',
  ],
  [
    'Engineer the AI workflow',
    'Model calls need structured outputs, bounded tool access, evaluation, and visibility into failures and cost. Add human review where the task requires it.',
  ],
  [
    'Leave room to change',
    'Keep business rules separate from presentation and external integrations. Preserve what works as a product learns, rather than promising that no code will ever need to change.',
  ],
];

export default function About() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            pageJsonLd(String(metadata.title), String(metadata.description), '/about'),
          ),
        }}
      />
      <PageHero
        eyebrow="About Pomvix · Independent by design"
        title="Work directly with the engineer building your product."
        description="Pomvix is an independent software development practice, operated by one developer. I build full-stack web applications, SaaS products, and AI features with React, Next.js, TypeScript, and Python."
      />
      <Section eyebrow="Who is behind Pomvix" title="One developer. Direct responsibility.">
        <div className="mt-10 grid gap-8 md:grid-cols-[1.2fr_.8fr]">
          <div className="space-y-5 leading-8 text-slate-400">
            <p>
              I’m the software engineer behind Pomvix. My background is in commercial software
              development, working across the frontend, backend, and the systems that connect them.
              My focus is web-based products and the engineering needed to make them useful in
              practice.
            </p>
            <p>
              Pomvix is my solo practice, not a staffed agency. You discuss the product,
              architecture, and implementation with the person doing the engineering. Scope and
              delivery are agreed around that model, rather than an assumed pool of developers.
            </p>
          </div>
          <aside className="card p-7">
            <p className="eyebrow">The working relationship</p>
            <h3 className="mt-5 text-xl">Technical conversations from the start.</h3>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              Bring an idea, an existing application, or a specific engineering problem. The first
              step is to understand what you need, where the constraints are, and whether the work
              fits an independent practice.
            </p>
          </aside>
        </div>
      </Section>
      <Section
        eyebrow="Engineering background"
        title="From the interface to the underlying systems."
        className="border-y border-white/[.06] bg-white/[.015]"
      >
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {capabilities.map(({ title, icon: Icon, text }) => (
            <div className="card p-7" key={title}>
              <Icon className="text-mint" size={24} aria-hidden="true" />
              <h3 className="mt-6 text-xl">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-400">{text}</p>
            </div>
          ))}
        </div>
        <Link href="/technologies" className="button button-ghost mt-8">
          Explore the technology stack <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </Section>
      <Section
        eyebrow="What Pomvix focuses on"
        title="Different starting points. One connected product."
      >
        <div className="mt-10 max-w-3xl space-y-5 leading-8 text-slate-400">
          <p>
            An MVP defines the smallest useful release. SaaS development adds the account,
            permission, and operational foundations of a product serving multiple customers. Web and
            backend development connect the interface to the APIs, data, and business rules
            underneath it.
          </p>
          <p>
            AI development can add a specific capability to that product, such as document retrieval
            or a bounded assistant. These are connected parts of a web-based system, not five
            separate departments. An engagement can focus on one layer or a defined product
            workflow.
          </p>
        </div>
        <Link href="/services" className="button button-ghost mt-8">
          Find the right service <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </Section>
      <Section
        eyebrow="How projects are delivered"
        title="A clear scope, then visible progress."
        className="border-y border-white/[.06] bg-white/[.015]"
      >
        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            [
              'Agree on the work',
              'We clarify the users, existing systems, constraints, and the outcome you need. I make scope, architecture choices, and open questions explicit before implementation.',
            ],
            [
              'Build and review',
              'I implement in reviewable increments. You see working progress and can discuss trade-offs while there is still room to adjust. Testing covers the important workflows and failure states.',
            ],
            [
              'Prepare the handoff',
              'Deployment support, setup notes, technical decisions, and operational guidance are agreed as part of the scope. Ongoing support is discussed explicitly, not assumed to be unlimited.',
            ],
          ].map(([title, text], index) => (
            <li className="card p-7" key={title}>
              <span className="text-4xl font-light text-lavender" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-6 text-xl">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-400">{text}</p>
            </li>
          ))}
        </ol>
        <Link href="/process" className="button button-ghost mt-8">
          See the development process <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </Section>
      <Section
        eyebrow="Engineering principles"
        title="Practical choices, not complexity for its own sake."
      >
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {principles.map(([title, text]) => (
            <div className="card p-7" key={title}>
              <h3 className="text-xl">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-400">{text}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section
        eyebrow="Inside Pomvix"
        title="A small example: this website."
        className="border-y border-white/[.06] bg-white/[.015]"
      >
        <p className="mt-8 max-w-3xl leading-8 text-slate-400">
          Pomvix’s own website is a concrete example of these choices, not a client case study or a
          claim about enterprise scale. Its public pages and contact workflow connect a Next.js
          frontend to a FastAPI backend and PostgreSQL persistence.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="card p-7">
            <h3 className="text-xl">Content before browser JavaScript</h3>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              Next.js renders the main page content and links into the initial HTML. Browser
              JavaScript adds interactions, but visitors do not need it to receive the About text.
            </p>
          </div>
          <div className="card p-7">
            <h3 className="text-xl">A contact request is more than an email</h3>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              The API validates submissions and applies rate limits. A message is saved before an
              email notification is attempted. If notification delivery fails, the saved message is
              retained and the response distinguishes receipt from notification delivery.
            </p>
          </div>
        </div>
        <p className="mt-8 max-w-3xl leading-8 text-slate-400">
          Alembic migrations manage database changes, Docker defines the application builds, and
          automated tests cover the email-failure path. These are modest, inspectable engineering
          decisions rather than claims of an elaborate platform.
        </p>
      </Section>
      <Section
        eyebrow="What clients can expect"
        title="Know who is responsible and what comes next."
      >
        <ul className="mt-10 max-w-3xl space-y-5 leading-8 text-slate-400">
          <li>
            <strong className="font-medium text-white">Direct communication.</strong> Technical
            questions go to the developer doing the work, without a separate sales-to-delivery
            handoff.
          </li>
          <li>
            <strong className="font-medium text-white">Clear commitments.</strong> Scope, review
            points, dependencies, and changes are discussed together so you can make informed
            decisions.
          </li>
          <li>
            <strong className="font-medium text-white">A usable handoff.</strong> The aim is
            understandable code and the documentation and deployment support agreed for your
            project, not dependence on undocumented knowledge.
          </li>
        </ul>
      </Section>
      <section className="shell pb-24 md:pb-32">
        <div className="card p-7 sm:p-10 md:p-14">
          <p className="eyebrow">Start with a conversation</p>
          <h2 className="mt-5 max-w-2xl text-3xl font-semibold md:text-5xl">
            Tell me what you’re building.
          </h2>
          <p className="mt-6 max-w-2xl leading-8 text-slate-400">
            Share the problem, the current product, and the next decision you need to make. We can
            discuss the technical context, relevant background, and whether Pomvix is the right fit.
          </p>
          <Link href="/contact" className="button button-primary mt-8">
            Discuss a project <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}

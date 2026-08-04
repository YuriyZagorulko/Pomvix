import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { PageHero } from '@/components/page-hero';
import { Section } from '@/components/section';
import { serviceJsonLd } from '@/lib/seo';
import { services, type Service } from '@/lib/services';

export function ServicePage({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd(service)) }}
      />
      <PageHero eyebrow="Pomvix services" title={service.title} description={service.description} />
      <section className="shell pb-24">
        <div className="flex flex-wrap gap-4">
          <Link href="/contact" className="button button-primary">
            Discuss your project <ArrowRight size={16} />
          </Link>
          <Link href="/services" className="button button-ghost">
            View all services
          </Link>
        </div>
      </section>
      <Section
        eyebrow="Service overview"
        title="A practical path from a business problem to useful software."
      >
        <div className="mt-12 grid gap-10 md:grid-cols-[1.2fr_.8fr]">
          <div>
            <p className="max-w-2xl leading-8 text-slate-400">{service.overview}</p>
            <h3 className="mt-10 text-2xl">What this service helps solve</h3>
            <ul className="mt-5 space-y-3 text-slate-400">
              {service.problems.map((item) => (
                <li className="flex gap-3" key={item}>
                  <Check className="mt-1 shrink-0 text-mint" size={17} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-8">
            <Icon className="text-mint" size={28} />
            <h3 className="mt-8 text-2xl">A good fit for</h3>
            <p className="mt-4 leading-7 text-slate-400">{service.audience}</p>
            <h3 className="mt-8 text-2xl">Expected outcomes</h3>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-400">
              {service.outcomes.map((item) => (
                <li key={item}>— {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
      <Section eyebrow="Business challenges" title="Solve the constraint behind the request.">
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {(service.challenges ?? service.problems).map((item) => (
            <div className="card p-7" key={item}>
              <p className="leading-7 text-slate-400">{item}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section
        eyebrow="Business value"
        title="What a stronger software foundation makes possible."
        className="border-y border-white/[.06] bg-white/[.015]"
      >
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {(service.benefits ?? service.outcomes).map((item) => (
            <div className="flex gap-3 card p-6" key={item}>
              <Check className="mt-1 shrink-0 text-mint" size={17} />
              <p className="leading-7 text-slate-400">{item}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section eyebrow="What we build" title="Typical project types and requested features.">
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="text-2xl">Project types</h3>
            <ul className="mt-5 space-y-3 text-slate-400">
              {(service.projectTypes ?? []).map((item) => (
                <li key={item}>— {item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-2xl">Frequently requested features</h3>
            <ul className="mt-5 space-y-3 text-slate-400">
              {(service.features ?? []).map((item) => (
                <li key={item}>— {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
      <Section
        eyebrow="Industries"
        title="Experience that adapts to your operating context."
        className="border-y border-white/[.06] bg-white/[.015]"
      >
        <div className="mt-10 flex flex-wrap gap-3">
          {(service.industries ?? []).map((item) => (
            <span
              className="rounded-full border border-white/10 bg-white/[.04] px-4 py-2 text-sm text-slate-300"
              key={item}
            >
              {item}
            </span>
          ))}
        </div>
        <p className="mt-8 max-w-3xl leading-8 text-slate-400">
          The domain changes from one business to the next, but the delivery discipline stays
          consistent: understand the workflow, make assumptions visible, protect sensitive data, and
          build a product that can be improved after launch.
        </p>
      </Section>
      <Section eyebrow="Engagement models" title="A delivery shape that matches your stage.">
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {(service.engagementModels ?? []).map((model) => (
            <div className="card p-7" key={model.name}>
              <h3 className="text-xl">{model.name}</h3>
              <p className="mt-3 leading-7 text-slate-400">{model.description}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-3xl leading-8 text-slate-400">
          <strong className="font-medium text-white">Typical timeline:</strong> {service.timeline}
        </p>
      </Section>
      <Section
        eyebrow="A deeper view"
        title="Software decisions made with the whole product in mind."
        className="border-y border-white/[.06] bg-white/[.015]"
      >
        <div className="mt-10 max-w-3xl space-y-6 text-slate-400">
          {(service.longDescription ?? []).map((paragraph) => (
            <p className="leading-8" key={paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
      </Section>
      <Section
        eyebrow="How we work"
        title="A process designed to reduce uncertainty."
        className="border-y border-white/[.06] bg-white/[.015]"
      >
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {service.process.map((item, index) => (
            <div className="card p-7" key={item}>
              <span className="text-4xl font-light text-lavender">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-8 text-xl">{item}</h3>
            </div>
          ))}
        </div>
      </Section>
      <Section eyebrow="Technology choices" title="A focused stack for the job at hand.">
        <div className="mt-12 flex flex-wrap gap-3">
          {service.technologies.map((technology) => (
            <span
              className="rounded-full border border-white/10 bg-white/[.04] px-4 py-2 text-sm text-slate-300"
              key={technology}
            >
              {technology}
            </span>
          ))}
        </div>
      </Section>
      <Section eyebrow="Why Pomvix" title="Experienced engineering without unnecessary ceremony.">
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {service.why.map((item) => (
            <div className="card p-7" key={item}>
              <p className="leading-7 text-slate-400">{item}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section
        eyebrow="Questions"
        title="Frequently asked questions"
        className="border-y border-white/[.06] bg-white/[.015]"
      >
        <div className="mt-10 max-w-3xl space-y-3">
          {service.faqs.map((faq) => (
            <details className="card p-6" key={faq.question}>
              <summary className="cursor-pointer list-none pr-6 text-lg font-medium">
                {faq.question}
              </summary>
              <p className="mt-4 leading-7 text-slate-400">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Section>
      <Section title="Choose the right next step.">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services
            .filter((item) => item.slug !== service.slug)
            .map((item) => (
              <Link
                className="card group p-6 transition hover:-translate-y-1 hover:border-indigo-300/40"
                href={`/services/${item.slug}`}
                key={item.slug}
              >
                <span className="text-sm text-mint">{item.shortTitle}</span>
                <h3 className="mt-3 text-xl">{item.title}</h3>
                <span className="mt-6 inline-flex items-center gap-2 text-sm text-slate-400 group-hover:text-white">
                  Explore service <ArrowRight size={15} />
                </span>
              </Link>
            ))}
        </div>
        <Link href="/contact" className="button button-primary mt-10">
          Start a conversation <ArrowRight size={16} />
        </Link>
        <div className="mt-8 flex flex-wrap gap-5 text-sm text-slate-400">
          <Link href="/process">See the Pomvix process</Link>
          <Link href="/faq">Read all FAQs</Link>
          <Link href="/contact">Contact Pomvix</Link>
        </div>
      </Section>
    </main>
  );
}

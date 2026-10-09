import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, ExternalLink } from 'lucide-react';
import { Section } from '@/components/section';
import { CaseStudyFigure } from '@/components/case-study-figure';
import { GadgetoArchitectureDiagram } from '@/components/gadgeto-architecture-diagram';
import { caseStudyBySlug } from '@/lib/case-studies';
import { gadgetoCaseStudyImageSpecs } from '@/lib/gadgeto-case-study-images';
import { caseStudyJsonLd, pageMetadata } from '@/lib/seo';

const study = caseStudyBySlug.gadgeto;

const metaDescription =
  'How Pomvix engineered Gadgeto: a founder-owned electronics e-commerce platform with FastAPI, PostgreSQL, Celery supplier imports, catalog normalization, and Rozetka, Prom.ua, and Google Merchant exports.';

export const metadata: Metadata = pageMetadata(
  study.subtitle,
  metaDescription,
  '/case-studies/gadgeto',
);

function StatusPill({ label, tone }: { label: string; tone: 'live' | 'built' | 'progress' }) {
  const colors = {
    live: 'border-mint/40 text-mint bg-mint/10',
    built: 'border-lavender/40 text-lavender bg-lavender/10',
    progress: 'border-white/15 text-slate-300 bg-white/[.04]',
  };
  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-medium ${colors[tone]}`}>
      {label}
    </span>
  );
}

export default function GadgetoCaseStudyPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            caseStudyJsonLd(study.subtitle, metaDescription, study.slug, study.publicSiteUrl),
          ),
        }}
      />

      <section className="pt-40 pb-16 md:pt-48 md:pb-24">
        <div className="shell max-w-4xl">
          <nav className="mb-8 text-sm text-slate-500" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-slate-300">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/case-studies" className="hover:text-slate-300">
                  Case studies
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-slate-300">Gadgeto</li>
            </ol>
          </nav>
          <p className="eyebrow mb-5">Case study · E-commerce platform engineering</p>
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-mint/35 bg-mint/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-mint">
              {study.badge}
            </span>
            <span className="text-sm text-slate-500">Not a client engagement</span>
          </div>
          <h1 className="text-4xl font-semibold md:text-6xl">{study.subtitle}</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-400">
            Gadgeto is an electronics and computer-equipment retailer in Ukraine. Pomvix is building
            the custom catalog, backend, and integration layer that supports multi-supplier
            inventory and sales-channel exports—while the public storefront runs on the same modern
            stack.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {study.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/[.04] px-4 py-2 text-sm text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/contact" className="button button-primary">
              Discuss similar work <ArrowRight size={16} />
            </Link>
            {study.publicSiteUrl && (
              <a
                href={study.publicSiteUrl}
                className="button button-ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit gadgeto.com.ua <ExternalLink size={15} />
              </a>
            )}
          </div>
          <CaseStudyFigure
            spec={gadgetoCaseStudyImageSpecs.homepage}
            priority
            className="mt-14 max-w-5xl"
          />
        </div>
      </section>

      <Section
        eyebrow="Project overview"
        title="More than a storefront—a catalog operating system."
      >
        <div className="mt-10 grid gap-10 md:grid-cols-[1.15fr_.85fr]">
          <div className="space-y-5 leading-8 text-slate-400">
            <p>
              Gadgeto sells technical products where specifications, compatibility, and stock change
              frequently. A generic theme can list products; it does not reliably absorb two
              wholesale suppliers with different category trees, attribute names, and incomplete
              rows.
            </p>
            <p>
              The engineering focus is an internal catalog model—categories, attributes, values,
              pricing, and stock—fed by repeatable imports and mapped to outbound feeds for
              marketplaces and Google Merchant. Business logic lives in a FastAPI backend; long
              imports and exports run in Celery workers backed by Redis, not in HTTP request cycles.
            </p>
            <p>
              The legacy production stack was WordPress and WooCommerce (documented in the
              project&apos;s migration materials). The public site at{' '}
              <a
                href="https://gadgeto.com.ua/"
                className="text-lavender underline-offset-2 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                gadgeto.com.ua
              </a>{' '}
              now responds as a Next.js application (verified October 2026). Platform work continues
              on import validation, catalog coverage, and operational hardening described in the
              project roadmap.
            </p>
          </div>
          <aside className="card p-7">
            <h3 className="text-lg font-medium text-white">At a glance</h3>
            <dl className="mt-6 space-y-4 text-sm">
              <div>
                <dt className="text-slate-500">Ownership</dt>
                <dd className="mt-1 text-slate-300">Founder-owned product (Pomvix operator)</dd>
              </div>
              <div>
                <dt className="text-slate-500">Domain</dt>
                <dd className="mt-1 text-slate-300">
                  Electronics &amp; computer equipment e-commerce
                </dd>
              </div>
              <div>
                <dt className="text-slate-500">Suppliers integrated</dt>
                <dd className="mt-1 text-slate-300">IT-Link (YML/XML), DC-Link (JSON API)</dd>
              </div>
              <div>
                <dt className="text-slate-500">Sales channels</dt>
                <dd className="mt-1 text-slate-300">Rozetka, Prom.ua, Google Merchant</dd>
              </div>
            </dl>
          </aside>
        </div>
        <CaseStudyFigure
          spec={gadgetoCaseStudyImageSpecs.catalogCategory}
          className="mt-14 max-w-5xl"
        />
      </Section>

      <Section
        eyebrow="Challenge"
        title="Supplier reality does not match a clean product taxonomy."
        className="border-y border-white/[.06] bg-white/[.015]"
      >
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {[
            'Wholesale feeds use different category paths, attribute names, and value formats for the same concept.',
            'Rows arrive incomplete or inconsistent; guessing semantics would corrupt filters and channel listings.',
            'Price and stock must stay aligned with supplier updates without blocking the storefront.',
            'Each marketplace expects its own export shape—API listings, YML, or Merchant Center RSS.',
          ].map((item) => (
            <div className="card p-7" key={item}>
              <p className="leading-7 text-slate-400">{item}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-sm leading-7 text-slate-500">
          Legacy migration notes reference on the order of tens of thousands of WooCommerce product
          rows and structured mapping files (categories, attributes, and values). Those figures
          describe audit snapshots, not a fixed live count—catalog size changes with every import.
        </p>
      </Section>

      <Section
        eyebrow="Engineering approach"
        title="Separate concerns so data quality stays visible."
      >
        <div className="mt-10 max-w-3xl space-y-6 leading-8 text-slate-400">
          <p>
            <strong className="font-medium text-white">Internal catalog vs. supplier views.</strong>{' '}
            Products, categories, and attributes are normalized in PostgreSQL. Supplier-specific
            categories, attributes, and values map into that taxonomy through admin-editable
            mappings—ambiguous supplier data is flagged rather than silently attached to unrelated
            internal fields.
          </p>
          <p>
            <strong className="font-medium text-white">Imports as observable jobs.</strong> Each
            supplier run is tracked with statistics, logs, and reports (created, updated, skipped,
            failed, unmapped categories/attributes/values). Operators can review outcomes without
            reading raw server logs.
          </p>
          <p>
            <strong className="font-medium text-white">
              Channel exports decoupled from imports.
            </strong>{' '}
            A scheduled catalog sync can run supplier imports first, then channel exports when
            imports succeed—Rozetka via seller API, Prom.ua via generated YML, Google Merchant via
            RSS—so listing logic does not sprawl across the storefront.
          </p>
          <p>
            <strong className="font-medium text-white">Storefront stays thin.</strong> The Next.js
            public app and admin UI consume APIs; pricing rules and feed generation remain on the
            backend where they can be tested and audited.
          </p>
        </div>
        <CaseStudyFigure
          spec={gadgetoCaseStudyImageSpecs.adminImportReport}
          className="mt-12 max-w-5xl"
        />
      </Section>

      <Section eyebrow="Architecture" title="Verified components and data flow.">
        <p className="mt-8 max-w-3xl leading-8 text-slate-400">
          The diagram summarizes relationships implemented in the Gadgeto codebase—supplier import
          tasks, PostgreSQL as source of truth, Celery workers, and channel export modules—not every
          optional integration or future service.
        </p>
        <div className="mt-12">
          <GadgetoArchitectureDiagram />
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            {
              title: 'Frontend & admin',
              body: 'Next.js App Router, React, TypeScript, Tailwind, and shadcn/ui for the public storefront and staff admin (separate Next.js apps in Docker).',
            },
            {
              title: 'Backend',
              body: 'FastAPI application with SQLAlchemy models, Alembic migrations, repository/service layers, and admin APIs for catalog and import control.',
            },
            {
              title: 'Operations',
              body: 'Docker Compose locally; production layout documented for Coolify with PostgreSQL, Redis, API, Celery worker, Celery beat, migrate/bootstrap jobs, and reverse-proxy TLS termination.',
            },
          ].map((item) => (
            <div className="card p-7" key={item.title}>
              <h3 className="text-xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Scope & capabilities"
        title="What the platform implements today."
        className="border-y border-white/[.06] bg-white/[.015]"
      >
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="text-xl text-white">Catalog &amp; imports</h3>
            <ul className="mt-5 space-y-3 text-slate-400">
              {[
                'IT-Link and DC-Link download, parse, map, and upsert products with import job history',
                'Category, attribute, and attribute-value mapping with explicit handling of unmapped data',
                'Import reports: counts, warnings, errors, and execution duration',
                'PostgreSQL full-text search planned as primary search (per architecture docs)',
              ].map((item) => (
                <li className="flex gap-3" key={item}>
                  <Check className="mt-1 shrink-0 text-mint" size={17} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl text-white">Channels &amp; automation</h3>
            <ul className="mt-5 space-y-3 text-slate-400">
              {[
                'Rozetka product push via seller API; separate manual order sync path',
                'Prom.ua YML feed export and Prom order ingestion',
                'Google Merchant Center RSS feed generation',
                'Celery Beat–driven catalog sync pipeline (imports gated before exports)',
              ].map((item) => (
                <li className="flex gap-3" key={item}>
                  <Check className="mt-1 shrink-0 text-mint" size={17} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl text-white">Commerce foundations</h3>
            <ul className="mt-5 space-y-3 text-slate-400">
              {[
                'Checkout-oriented models with LiqPay payment verification and Nova Poshta shipping integrations in codebase',
                'Automated backend test suite covering imports, mappings, shipping, and admin behaviors',
              ].map((item) => (
                <li className="flex gap-3" key={item}>
                  <Check className="mt-1 shrink-0 text-mint" size={17} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl text-white">Still active on the roadmap</h3>
            <ul className="mt-5 space-y-3 text-slate-400">
              {[
                'Broader import validation and mapping coverage',
                'Expanded storefront and search completeness',
                'Additional automated test coverage and production hardening',
              ].map((item) => (
                <li className="flex gap-3" key={item}>
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-lavender/80" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <CaseStudyFigure
          spec={gadgetoCaseStudyImageSpecs.productDetail}
          className="mt-14 max-w-5xl"
        />
      </Section>

      <Section eyebrow="Results & status" title="Engineering outcomes without invented metrics.">
        <div className="mt-10 flex flex-wrap gap-3">
          <StatusPill label="Public storefront live (Next.js)" tone="live" />
          <StatusPill label="Backend, workers & admin implemented" tone="built" />
          <StatusPill label="Catalog parity & ops hardening in progress" tone="progress" />
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="card p-7">
            <h3 className="text-lg font-medium">1 · Live today</h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              The customer-facing website at gadgeto.com.ua is served by the Next.js storefront
              (HTTP responses identify Next.js as of October 2026). It is the public face of the
              founder-owned business—not a separate demo site.
            </p>
          </div>
          <div className="card p-7">
            <h3 className="text-lg font-medium">2 · Built &amp; tested</h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              A multi-service Docker deployment, FastAPI API, Celery import and export tasks, admin
              tooling for mappings and imports, and channel export modules for Rozetka, Prom.ua, and
              Google Merchant—with backend automated tests across critical import and integration
              paths.
            </p>
          </div>
          <div className="card p-7">
            <h3 className="text-lg font-medium">3 · In development</h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              Full legacy-to-platform migration checkpoints, exhaustive mapping coverage, and
              end-to-end commerce validation remain explicit roadmap items in project documentation.
              No revenue, conversion, or traffic claims are made here.
            </p>
          </div>
        </div>
      </Section>

      <section className="shell pb-32">
        <div className="card relative overflow-hidden p-10 md:p-16">
          <div className="orb absolute -right-10 -top-20 h-72 w-72 rounded-full bg-indigo-400/10 blur-3xl" />
          <div className="relative max-w-2xl">
            <p className="eyebrow mb-5">Similar engineering needs?</p>
            <h2 className="text-3xl md:text-5xl">
              Custom e-commerce, catalog automation, or complex integrations.
            </h2>
            <p className="mt-6 leading-7 text-slate-400">
              If you are replacing a monolithic store, normalizing supplier data, or wiring
              marketplaces and feeds into one system, Pomvix can help you design the architecture
              and ship it incrementally—with the same transparency as this case study.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact" className="button button-primary">
                Start a conversation <ArrowRight size={15} />
              </Link>
              <Link href="/services/backend-development" className="button button-ghost">
                Backend development
              </Link>
              <Link href="/services/web-development" className="button button-ghost">
                Web development
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

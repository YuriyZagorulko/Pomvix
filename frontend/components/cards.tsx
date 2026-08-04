import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { services } from '@/lib/services';
export function ServiceCards() {
  return (
    <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => {
        const I = service.icon;
        return (
          <Link
            href={`/services/${service.slug}`}
            className="card group p-7 transition duration-300 hover:-translate-y-1 hover:border-indigo-300/40"
            key={service.slug}
          >
            <I className="mb-12 text-mint" size={24} aria-hidden="true" />
            <h3 className="text-xl font-medium">{service.shortTitle}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">{service.description}</p>
            <ArrowUpRight
              className="mt-7 text-slate-600 transition group-hover:text-lavender"
              size={18}
            />
          </Link>
        );
      })}
    </div>
  );
}
export function WorkCards() {
  return (
    <div className="mt-14 grid gap-5 md:grid-cols-2">
      <div className="card min-h-[360px] overflow-hidden bg-gradient-to-br from-indigo-950 to-panel p-8">
        <p className="eyebrow">Fintech · Platform</p>
        <h3 className="mt-20 text-3xl">The infrastructure behind better decisions.</h3>
        <p className="mt-4 text-sm text-slate-400">
          A unified operations platform for a new generation of financial teams.
        </p>
      </div>
      <div className="card min-h-[360px] overflow-hidden bg-gradient-to-br from-teal-950/60 to-panel p-8">
        <p className="eyebrow">Health · Product</p>
        <h3 className="mt-20 text-3xl">Care, made more human.</h3>
        <p className="mt-4 text-sm text-slate-400">
          Connecting people and practitioners through a calm, thoughtful experience.
        </p>
      </div>
    </div>
  );
}

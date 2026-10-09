import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { caseStudies } from '@/lib/case-studies';

export function CaseStudyCards() {
  return (
    <div className="mt-14 grid gap-5 md:grid-cols-2">
      {caseStudies.map((study) => (
        <Link
          href={`/case-studies/${study.slug}`}
          className="card group p-8 transition duration-300 hover:-translate-y-1 hover:border-indigo-300/40"
          key={study.slug}
        >
          <p className="eyebrow">{study.badge}</p>
          <h3 className="mt-6 text-2xl font-medium">{study.subtitle}</h3>
          <p className="mt-4 text-sm leading-7 text-slate-400">{study.excerpt}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {study.technologies.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1 text-xs text-slate-400"
              >
                {tech}
              </span>
            ))}
          </div>
          <ArrowUpRight
            className="mt-8 text-slate-600 transition group-hover:text-lavender"
            size={20}
            aria-hidden
          />
        </Link>
      ))}
    </div>
  );
}

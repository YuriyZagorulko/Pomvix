import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
export function Hero() {
  return (
    <section className="grid-bg relative overflow-hidden pt-40 pb-24 md:pt-52 md:pb-36">
      <div className="orb absolute -right-24 top-24 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="orb absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-teal-300/[.07] blur-3xl" />
      <div className="shell relative">
        <div className="max-w-4xl reveal">
          <p className="eyebrow mb-7">Independent software studio</p>
          <h1 className="text-5xl font-semibold leading-[1.04] md:text-8xl">
            Software that moves <span className="gradient-text">businesses forward.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-slate-400 md:text-xl">
            We design and engineer digital products that make complex ideas simple, useful, and
            ready for what comes next.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/contact" className="button button-primary">
              Tell us about your idea <ArrowRight size={16} />
            </Link>
          </div>
        </div>
        <div className="mt-24 flex items-center gap-5 text-xs uppercase tracking-[.15em] text-slate-500">
          <span className="h-px w-12 bg-slate-700" /> Product thinking · Engineering craft ·
          Long-term partnership
        </div>
      </div>
    </section>
  );
}

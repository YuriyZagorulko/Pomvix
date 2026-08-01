import { ArrowUpRight, BrainCircuit, Cloud, Code2, Layers3, Workflow } from 'lucide-react';
const icons = [Code2, Layers3, BrainCircuit, Workflow, Cloud];
export function ServiceCards() {
  const data = [
    ['Custom software', 'Purpose-built systems that fit the way your business actually works.'],
    ['SaaS products', 'From first sketch to a scalable platform customers love to use.'],
    ['AI, thoughtfully applied', 'Practical AI capabilities that create leverage, not noise.'],
    ['Web applications', 'Fast, accessible experiences for your customers and your team.'],
    ['Technical direction', 'Clear decisions, resilient architecture, and a path forward.'],
  ];
  return (
    <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data.map(([title, desc], i) => {
        const I = icons[i];
        return (
          <div
            className="card group p-7 transition duration-300 hover:-translate-y-1 hover:border-indigo-300/40"
            key={title}
          >
            <I className="mb-12 text-mint" size={24} />
            <h3 className="text-xl font-medium">{title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">{desc}</p>
            <ArrowUpRight
              className="mt-7 text-slate-600 transition group-hover:text-lavender"
              size={18}
            />
          </div>
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
        <h3 className="mt-20 text-3xl">
          The infrastructure behind better decisions.
        </h3>
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

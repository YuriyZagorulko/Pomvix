export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="grid-bg pt-40 pb-20 md:pt-48 md:pb-28">
      <div className="shell max-w-4xl">
        <p className="eyebrow mb-6">{eyebrow}</p>
        <h1 className="text-5xl font-semibold md:text-7xl">{title}</h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-400">{description}</p>
      </div>
    </section>
  );
}

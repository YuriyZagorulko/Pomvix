export function Section({
  eyebrow,
  title,
  children,
  className = '',
}: {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`py-24 md:py-32 ${className}`}>
      <div className="shell">
        {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
        <h2 className="max-w-3xl text-3xl font-semibold md:text-5xl">{title}</h2>
        {children}
      </div>
    </section>
  );
}

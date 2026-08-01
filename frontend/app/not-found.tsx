import Link from 'next/link';
export default function NotFound() {
  return (
    <main className="grid min-h-[75vh] place-items-center pt-20">
      <div className="shell text-center">
        <p className="eyebrow">404 / Lost in the atmosphere</p>
        <h1 className="mt-6 text-7xl font-semibold md:text-9xl">Not here.</h1>
        <p className="mx-auto mt-6 max-w-md leading-7 text-slate-400">
          The page you’re looking for drifted somewhere else.
        </p>
        <Link className="button button-primary mt-8" href="/">
          Return home
        </Link>
      </div>
    </main>
  );
}

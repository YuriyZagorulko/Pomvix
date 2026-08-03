import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/lib/site';
export function Footer() {
  return (
    <footer className="border-t border-white/[.08] py-14">
      <div className="shell grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <Image src="/logo.png" alt="Pomvix" width={38} height={30} className="h-8 w-auto" />
          </div>
          <p className="max-w-xs text-sm leading-7 text-slate-400">
            Digital products for teams building what comes next.
          </p>
        </div>
        <div>
          <p className="eyebrow mb-5">Explore</p>
          <div className="flex flex-col gap-3 text-sm text-slate-400">
            <Link href="/services">Services</Link>
            <Link href="/technologies">Technologies</Link>
            <Link href="/about">About us</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
        <div>
          <p className="eyebrow mb-5">Connect</p>
          <div className="flex flex-col gap-3 text-sm text-slate-400">
            <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
          </div>
        </div>
      </div>
      <div className="shell mt-14 flex justify-between border-t border-white/[.08] pt-6 text-xs text-slate-500">
        <span>© {new Date().getFullYear()} Pomvix</span>
        <span>Built with intention.</span>
      </div>
    </footer>
  );
}

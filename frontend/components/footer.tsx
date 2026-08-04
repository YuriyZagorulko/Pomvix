import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/lib/site';

const serviceLinks = [
  { label: 'AI Development', href: '/services/ai-development' },
  { label: 'SaaS Development', href: '/services/saas-development' },
  { label: 'MVP Development', href: '/services/mvp-development' },
  { label: 'Web Development', href: '/services/web-development' },
  { label: 'Backend Development', href: '/services/backend-development' },
];

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Process', href: '/process' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Technologies', href: '/technologies' },
  { label: 'Contact', href: '/contact' },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[.08] py-14">
      <div className="shell grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <Image src="/logo.png" alt="Pomvix" width={38} height={30} className="h-8 w-auto" />
          </div>
          <p className="max-w-xs text-sm leading-7 text-slate-400">
            We build AI products, SaaS platforms, and custom software for ambitious businesses.
          </p>
          <span className="mt-6 block text-xs text-slate-500">© 2026 Pomvix</span>
        </div>
        <nav aria-label="Services">
          <p className="eyebrow mb-5">Services</p>
          <div className="flex flex-col gap-3 text-sm text-slate-400">
            {serviceLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
        <nav aria-label="Company">
          <p className="eyebrow mb-5">Company</p>
          <div className="flex flex-col gap-3 text-sm text-slate-400">
            {companyLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
        <div>
          <p className="eyebrow mb-5">Contact</p>
          <div className="flex flex-col gap-3 text-sm text-slate-400">
            <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const navigationLinks = [
  ['Services', '/services'],
  ['Process', '/process'],
  ['FAQ', '/faq'],
  ['Technologies', '/technologies'],
  ['About', '/about'],
  ['Contact', '/contact'],
] as const;

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    if (!isMenuOpen) return;
    firstLinkRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isMenuOpen]);
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/[.07] bg-ink/75 backdrop-blur-xl">
      <div className="shell flex h-[76px] items-center justify-between">
        <Link href="/" aria-label="Pomvix home" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Pomvix"
            width={210}
            height={160}
            className="h-9 w-auto object-contain"
            priority
          />
        </Link>
        <nav
          id="site-navigation"
          className={`${isMenuOpen ? 'flex' : 'hidden'} absolute left-0 top-[76px] w-full flex-col gap-5 bg-ink px-7 py-7 md:static md:flex md:w-auto md:flex-row md:items-center md:gap-8 md:bg-transparent md:p-0`}
        >
          {navigationLinks.map(([label, href]) => (
            <Link
              key={label}
              ref={label === navigationLinks[0][0] ? firstLinkRef : undefined}
              href={href}
              onClick={() => setIsMenuOpen(false)}
              className="text-sm text-slate-300 transition hover:text-white"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            aria-label="Start a project with Pomvix"
            className="button button-primary justify-center"
          >
            Start a project <ArrowUpRight size={15} />
          </Link>
        </nav>
        <button
          ref={menuButtonRef}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          aria-controls="site-navigation"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}

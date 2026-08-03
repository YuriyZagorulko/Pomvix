import type { Metadata } from 'next';
import { Mail, MapPin } from 'lucide-react';
import { PageHero } from '@/components/page-hero';
import { ContactForm } from '@/components/contact-form';
import { siteConfig } from '@/lib/site';
export const metadata: Metadata = {
  title: 'Contact',
  description: 'Start a conversation with the Pomvix team.',
  alternates: { canonical: '/contact' },
};
export default function Contact() {
  return (
    <main>
      <PageHero
        eyebrow="Start a conversation"
        title="Have something in mind?"
        description="Tell us what you’re building, what’s getting in the way, or simply where you want to go. We’ll get back to you within two business days."
      />
      <section className="shell grid gap-12 pb-32 md:grid-cols-[1.1fr_.7fr]">
        <ContactForm />
        <aside className="space-y-8 py-4">
          <div>
            <Mail className="text-mint" size={21} />
            <h3 className="mt-5">Email us</h3>
            <a className="mt-2 block text-slate-400" href={`mailto:${siteConfig.contactEmail}`}>
              {siteConfig.contactEmail}
            </a>
          </div>
          <div>
            <MapPin className="text-mint" size={21} />
            <h3 className="mt-5">Based anywhere useful</h3>
            <p className="mt-2 max-w-xs leading-7 text-slate-400">
              Remote by design, connected by purpose.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}

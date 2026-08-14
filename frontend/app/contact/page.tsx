import type { Metadata } from 'next';
import { Mail } from 'lucide-react';
import { PageHero } from '@/components/page-hero';
import { ContactForm } from '@/components/contact-form';
import { siteConfig } from '@/lib/site';
import { pageJsonLd, pageMetadata } from '@/lib/seo';
export const metadata: Metadata = pageMetadata(
  'Contact Pomvix',
  'Talk with Pomvix about your AI product, SaaS platform, MVP, web application, or backend project.',
  '/contact',
);
export default function Contact() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            pageJsonLd(String(metadata.title), String(metadata.description), '/contact'),
          ),
        }}
      />
      <PageHero
        eyebrow="Start a conversation"
        title="Have something in mind?"
        description="Tell us what you’re building, what’s getting in the way, or where you want to go. A rough description is enough to start a useful conversation."
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
        </aside>
      </section>
    </main>
  );
}

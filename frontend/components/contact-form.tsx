'use client';
import { FormEvent, useEffect, useState } from 'react';
import { ArrowRight, Check, LoaderCircle } from 'lucide-react';
import { siteConfig } from '@/lib/site';
export function ContactForm() {
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [attribution, setAttribution] = useState<Record<string, string>>({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const values: Record<string, string> = {
      landing_page_url: window.location.href,
      referrer: document.referrer,
    };
    for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
      const value = params.get(key);
      if (value) values[key] = value;
    }
    setAttribution(values);
  }, []);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('loading');
    setErrorMessage('');
    const form = e.currentTarget;
    if (!form.reportValidity()) {
      setState('idle');
      return;
    }
    const body = { ...Object.fromEntries(new FormData(form)), ...attribution };
    try {
      const r = await fetch(`${siteConfig.apiUrl}/api/v1/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const response = (await r.json().catch(() => ({}))) as { message?: string; detail?: string };
      if (!r.ok)
        throw new Error(response.detail || response.message || 'Unable to send your message.');
      setSuccessMessage(response.message || 'Your message has been received.');
      setState('success');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to send your message.');
      setState('error');
    }
  }
  if (state === 'success')
    return (
      <div className="card p-9">
        <Check className="mb-6 text-mint" size={30} />
        <h3 className="text-2xl">Message received.</h3>
        <p className="mt-3 leading-7 text-slate-400">{successMessage} We’ll be in touch shortly.</p>
      </div>
    );
  return (
    <form onSubmit={submit} className="card space-y-5 p-7 md:p-9" aria-live="polite">
      <div className="grid gap-5 md:grid-cols-2">
        <label htmlFor="contact-name" className="text-sm text-slate-300">
          Full Name
          <input
            required
            id="contact-name"
            name="name"
            autoComplete="name"
            minLength={2}
            aria-invalid={state === 'error'}
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/[.04] p-3.5 text-white outline-none transition focus:border-lavender"
            placeholder="Your name"
          />
        </label>
        <label htmlFor="contact-email" className="text-sm text-slate-300">
          Work Email
          <input
            required
            type="email"
            id="contact-email"
            name="email"
            autoComplete="email"
            aria-invalid={state === 'error'}
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/[.04] p-3.5 text-white outline-none transition focus:border-lavender"
            placeholder="you@company.com"
          />
        </label>
      </div>
      <label htmlFor="contact-company" className="block text-sm text-slate-300">
        Company <span className="text-slate-600">(optional)</span>
        <input
          id="contact-company"
          name="company"
          autoComplete="organization"
          className="mt-2 w-full rounded-xl border border-white/10 bg-white/[.04] p-3.5 text-white outline-none focus:border-lavender"
          placeholder="Company name"
        />
      </label>
      <label htmlFor="contact-website" className="block text-sm text-slate-300">
        Company Website <span className="text-slate-600">(optional)</span>
        <input
          id="contact-website"
          name="website"
          type="url"
          inputMode="url"
          autoComplete="url"
          pattern="https?://.+"
          title="Enter a complete website URL beginning with https://"
          className="mt-2 w-full rounded-xl border border-white/10 bg-white/[.04] p-3.5 text-white outline-none focus:border-lavender"
          placeholder="https://yourcompany.com"
        />
      </label>
      <label htmlFor="contact-linkedin" className="block text-sm text-slate-300">
        LinkedIn Profile <span className="text-slate-600">(optional)</span>
        <input
          id="contact-linkedin"
          name="linkedin"
          type="url"
          inputMode="url"
          autoComplete="url"
          pattern="https?://.+"
          title="Enter a complete LinkedIn profile URL beginning with https://"
          className="mt-2 w-full rounded-xl border border-white/10 bg-white/[.04] p-3.5 text-white outline-none focus:border-lavender"
          placeholder="https://www.linkedin.com/in/your-name"
        />
      </label>
      <label htmlFor="contact-message" className="block text-sm text-slate-300">
        Project Description
        <textarea
          required
          id="contact-message"
          name="message"
          minLength={10}
          aria-invalid={state === 'error'}
          rows={5}
          className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/[.04] p-3.5 text-white outline-none focus:border-lavender"
          placeholder="Tell us a little about your project..."
        />
      </label>
      {state === 'error' && (
        <p role="alert" className="text-sm text-lavender">
          {errorMessage ||
            `Something went wrong. Please email us directly at ${siteConfig.contactEmail}.`}
        </p>
      )}
      <button
        type="submit"
        disabled={state === 'loading'}
        className="button button-primary"
        aria-label="Send contact message"
      >
        {state === 'loading' ? (
          <LoaderCircle className="animate-spin" size={16} />
        ) : (
          <>
            Send message <ArrowRight size={16} />
          </>
        )}
      </button>
    </form>
  );
}

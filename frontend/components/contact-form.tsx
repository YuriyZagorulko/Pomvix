'use client';
import { FormEvent, useState } from 'react';
import { ArrowRight, Check, LoaderCircle } from 'lucide-react';
import { siteConfig } from '@/lib/site';
export function ContactForm() {
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('loading');
    const body = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const r = await fetch(`${siteConfig.apiUrl}/api/v1/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!r.ok) throw Error();
      setState('success');
    } catch {
      setState('error');
    }
  }
  if (state === 'success')
    return (
      <div className="card p-9">
        <Check className="mb-6 text-mint" size={30} />
        <h3 className="text-2xl">Message received.</h3>
        <p className="mt-3 leading-7 text-slate-400">
          Thanks for reaching out. We’ll be in touch shortly.
        </p>
      </div>
    );
  return (
    <form onSubmit={submit} className="card space-y-5 p-7 md:p-9">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="text-sm text-slate-300">
          Name
          <input
            required
            name="name"
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/[.04] p-3.5 text-white outline-none transition focus:border-lavender"
            placeholder="Your name"
          />
        </label>
        <label className="text-sm text-slate-300">
          Email
          <input
            required
            type="email"
            name="email"
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/[.04] p-3.5 text-white outline-none transition focus:border-lavender"
            placeholder="you@company.com"
          />
        </label>
      </div>
      <label className="block text-sm text-slate-300">
        Company <span className="text-slate-600">(optional)</span>
        <input
          name="company"
          className="mt-2 w-full rounded-xl border border-white/10 bg-white/[.04] p-3.5 text-white outline-none focus:border-lavender"
          placeholder="Company name"
        />
      </label>
      <label className="block text-sm text-slate-300">
        How can we help?
        <textarea
          required
          name="message"
          rows={5}
          className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/[.04] p-3.5 text-white outline-none focus:border-lavender"
          placeholder="Tell us a little about your project..."
        />
      </label>
      {state === 'error' && (
        <p className="text-sm text-lavender">
          Something went wrong. Please email us directly at {siteConfig.contactEmail}.
        </p>
      )}
      <button disabled={state === 'loading'} className="button button-primary">
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

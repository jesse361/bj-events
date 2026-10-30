"use client";

import { useState, type FormEvent } from "react";
import { submitContact, type FormResult } from "@/lib/actions";

const fieldClass = "mt-2 h-12 w-full rounded-2xl border border-line bg-white px-4 text-sm text-ink";

export function ContactForm({ initialSubject = "" }: { initialSubject?: string }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FormResult | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setResult(null);
    const form = event.currentTarget;
    try {
      const next = await submitContact(new FormData(form));
      setResult(next);
      if (next.status === "success") form.reset();
    } catch {
      setResult({ status: "error", message: "The message could not be delivered. Please try again later." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-[1.8rem] bg-white p-6 sm:p-8">
      <div className="grid gap-5">
        <div>
          <label htmlFor="contact-name" className="text-sm font-semibold text-forest">
            Name
          </label>
          <input id="contact-name" name="name" autoComplete="name" required className={fieldClass} />
        </div>
        <div>
          <label htmlFor="contact-email" className="text-sm font-semibold text-forest">
            Email
          </label>
          <input id="contact-email" name="email" type="email" autoComplete="email" required className={fieldClass} />
        </div>
        <div>
          <label htmlFor="contact-subject" className="text-sm font-semibold text-forest">
            Subject
          </label>
          <input id="contact-subject" name="subject" defaultValue={initialSubject} required className={fieldClass} />
        </div>
        <div>
          <label htmlFor="contact-message" className="text-sm font-semibold text-forest">
            Message
          </label>
          <textarea id="contact-message" name="message" required rows={6} className="mt-2 w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm text-ink" />
        </div>
      </div>
      <input name="company" tabIndex={-1} autoComplete="off" className="sr-only" aria-hidden="true" />
      <button
        type="submit"
        disabled={loading}
        className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-forest px-6 text-sm font-semibold text-white disabled:opacity-70"
      >
        {loading ? "Sending" : "Send message"}
      </button>
      <p role={result ? "status" : undefined} className="mt-4 min-h-5 text-sm text-ink">
        {result?.message}
      </p>
    </form>
  );
}

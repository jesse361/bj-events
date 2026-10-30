"use client";

import { useState, type FormEvent } from "react";
import { submitNewsletter, type FormResult } from "@/lib/actions";
import { cn } from "@/lib/cn";

export function NewsletterForm({ id, tone = "sage" }: { id: string; tone?: "sage" | "dark" }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FormResult | null>(null);
  const dark = tone === "dark";

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setResult(null);
    const form = event.currentTarget;
    try {
      const next = await submitNewsletter(new FormData(form));
      setResult(next);
      if (next.status === "success") form.reset();
    } catch {
      setResult({ status: "error", message: "The subscription could not be completed. Please try again later." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor={id} className="sr-only">
          Email address
        </label>
        <input
          id={id}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Email address"
          aria-invalid={result?.status === "invalid"}
          aria-describedby={`${id}-status`}
          className={cn(
            "h-12 min-w-0 flex-1 rounded-full border px-4 text-sm text-ink placeholder:text-muted",
            dark ? "border-white/20 bg-white" : "border-forest/15 bg-white",
          )}
        />
        <input name="company" tabIndex={-1} autoComplete="off" className="sr-only" aria-hidden="true" />
        <button
          type="submit"
          disabled={loading}
          className={cn(
            "inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold disabled:opacity-70",
            dark ? "bg-white text-forest" : "bg-forest text-white hover:bg-forest-deep",
          )}
        >
          {loading ? "Checking" : "Subscribe"}
        </button>
      </div>
      <p
        id={`${id}-status`}
        role={result ? "status" : undefined}
        className={cn("mt-3 min-h-5 text-sm", dark ? "text-mist" : "text-quiet")}
      >
        {result?.message}
      </p>
    </form>
  );
}

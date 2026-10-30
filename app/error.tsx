"use client";

import { Container } from "@/components/ui/Container";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Container className="py-24">
      <h1 className="section-title text-forest">Something went wrong.</h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-muted">The page could not be shown. You can try again.</p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 inline-flex h-12 items-center rounded-full bg-forest px-6 text-sm font-semibold text-white"
      >
        Try again
      </button>
    </Container>
  );
}

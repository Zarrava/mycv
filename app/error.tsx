"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="shell flex min-h-[70svh] flex-col items-start justify-center py-20">
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">Error</p>
      <h1 className="mt-4 font-display text-[length:var(--text-h2)] tracking-tight">
        Something went wrong.
      </h1>
      <p className="mt-4 max-w-lg text-muted">
        The page could not be displayed. You can try again, or return home.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 inline-flex min-h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground"
      >
        Try again
      </button>
    </section>
  );
}

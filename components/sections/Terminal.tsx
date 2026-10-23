"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

const transcript = `› ${site.terminal.prompt}\n\n${site.terminal.response}`;

export function Terminal() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    let frame = 0;
    const timer = window.setInterval(() => {
      frame += 1;
      setCount((current) => {
        if (current >= transcript.length) {
          window.clearInterval(timer);
          return current;
        }
        return current + 1;
      });
      if (frame > transcript.length + 2) window.clearInterval(timer);
    }, 18);

    return () => window.clearInterval(timer);
  }, []);

  const typed = transcript.slice(0, count);

  return (
    <div className="surface overflow-hidden">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="size-2.5 rounded-full bg-danger/80" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-warning/80" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-success/80" aria-hidden="true" />
        <span className="ml-2 font-mono text-xs text-muted">llm — production</span>
      </div>
      <div className="relative px-4 py-5 sm:px-5">
        <p className="sr-only">{transcript}</p>
        <pre className="type-reserve whitespace-pre-wrap font-mono text-sm leading-relaxed">
          {transcript}
          <span aria-hidden="true"> ▍</span>
        </pre>
        <pre
          className="type-overlay absolute inset-0 whitespace-pre-wrap px-4 py-5 font-mono text-sm leading-relaxed text-foreground sm:px-5"
          aria-hidden="true"
        >
          {typed}
          <span className="cursor-blink text-accent"> ▍</span>
        </pre>
      </div>
    </div>
  );
}

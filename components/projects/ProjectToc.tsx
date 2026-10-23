"use client";

import { useEffect, useState } from "react";
import { caseSections } from "@/lib/categories";

export function ProjectToc() {
  const [active, setActive] = useState<string>(caseSections[0].id);

  useEffect(() => {
    const sections = caseSections
      .map((section) => document.getElementById(section.id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0.2, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="On this page" className="xl:sticky xl:top-24">
      <p className="mb-3 hidden font-mono text-xs uppercase tracking-[0.18em] text-muted xl:block">
        On this page
      </p>
      <ol className="flex gap-2 overflow-x-auto pb-1 xl:flex-col xl:overflow-visible">
        {caseSections.map((section) => {
          const current = active === section.id;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={current ? "true" : undefined}
                className={`inline-flex min-h-11 shrink-0 items-center rounded-full px-3 text-sm xl:w-full xl:rounded-xl ${
                  current ? "bg-foreground/10 text-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                {section.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

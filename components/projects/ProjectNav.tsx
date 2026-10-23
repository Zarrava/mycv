import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Project } from "@/data/projects";

export function ProjectNav({
  previous,
  next,
}: {
  previous?: Project;
  next?: Project;
}) {
  return (
    <nav aria-label="More projects" className="mt-16 grid gap-3 border-t border-border pt-8 sm:grid-cols-2">
      {previous ? (
        <Link
          href={`/projects/${previous.slug}`}
          className="surface flex min-h-20 items-center gap-3 p-4 hover:border-accent/40"
        >
          <ArrowLeft className="size-4 shrink-0" aria-hidden="true" />
          <span>
            <span className="block text-xs uppercase tracking-[0.16em] text-muted">Previous</span>
            <span className="mt-1 block font-medium">{previous.title}</span>
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={`/projects/${next.slug}`}
          className="surface flex min-h-20 items-center justify-end gap-3 p-4 text-right hover:border-accent/40"
        >
          <span>
            <span className="block text-xs uppercase tracking-[0.16em] text-muted">Next</span>
            <span className="mt-1 block font-medium">{next.title}</span>
          </span>
          <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
        </Link>
      ) : null}
    </nav>
  );
}

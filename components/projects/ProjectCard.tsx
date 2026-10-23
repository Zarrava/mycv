"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ProjectCardData } from "@/lib/projects";
import { BLUR_DATA_URL, cn } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/Badge";

export function ProjectCard({ project }: { project: ProjectCardData }) {
  const [missing, setMissing] = useState(false);

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "glow-card group flex h-full flex-col overflow-hidden outline-offset-4",
      )}
    >
      <div className="relative aspect-video overflow-hidden bg-[radial-gradient(circle_at_20%_20%,hsl(var(--accent)/0.45),transparent_40%),radial-gradient(circle_at_80%_70%,hsl(var(--accent-2)/0.35),transparent_42%),hsl(var(--card))]">
        {missing ? null : (
          <Image
            src={project.thumbnail}
            alt=""
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.03]"
            onError={() => setMissing(true)}
          />
        )}
        <div className="absolute left-3 top-3">
          <StatusBadge status={project.status} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl tracking-tight">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
          {project.shortDescription}
        </p>
        <ul className="mt-4 flex flex-wrap gap-2" aria-hidden="true">
          {project.tags.slice(0, 4).map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-border px-2.5 py-1 text-xs text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent" aria-hidden="true">
          See more
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}

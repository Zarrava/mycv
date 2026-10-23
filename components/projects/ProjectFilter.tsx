"use client";

import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { categoryLabel } from "@/lib/categories";
import type { ProjectCategory } from "@/data/projects";
import { cn } from "@/lib/utils";

export function ProjectFilter({
  categories,
  active,
  onChange,
}: {
  categories: readonly ("All" | ProjectCategory)[];
  active: "All" | ProjectCategory;
  onChange: (category: "All" | ProjectCategory) => void;
}) {
  const reduce = useReducedMotion();

  return (
    <LayoutGroup>
      <div className="mt-8 -mx-1 flex gap-2 overflow-x-auto px-1 pb-1" role="toolbar" aria-label="Filter projects">
        {categories.map((category) => {
          const selected = category === active;
          const label = category === "All" ? "All" : categoryLabel[category];
          return (
            <button
              key={category}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(category)}
              className={cn(
                "relative inline-flex min-h-11 shrink-0 items-center rounded-full px-4 text-sm font-medium",
                selected ? "text-primary-foreground" : "text-muted hover:text-foreground",
              )}
            >
              {selected ? (
                <motion.span
                  layoutId="project-filter"
                  className="absolute inset-0 rounded-full bg-primary"
                  transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
                />
              ) : (
                <span className="absolute inset-0 rounded-full border border-border" />
              )}
              <span className="relative">{label}</span>
            </button>
          );
        })}
      </div>
    </LayoutGroup>
  );
}

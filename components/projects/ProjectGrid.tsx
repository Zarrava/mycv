"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ProjectCategory } from "@/data/projects";
import { getCategories } from "@/lib/categories";
import type { ProjectCardData } from "@/lib/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectFilter } from "@/components/projects/ProjectFilter";

export function ProjectGrid({ projects }: { projects: ProjectCardData[] }) {
  const categories = useMemo(
    () => getCategories(projects.map((project) => project.category)),
    [projects],
  );
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const reduce = useReducedMotion();
  const visible = projects.filter((project) => active === "All" || project.category === active);

  return (
    <div>
      <ProjectFilter
        categories={categories}
        active={active}
        onChange={(category: "All" | ProjectCategory) => setActive(category)}
      />
      {visible.length === 0 ? (
        <p className="mt-8 text-muted">No projects in this category yet.</p>
      ) : (
        <ul className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.li
                key={project.slug}
                layout
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: 8 }}
                transition={{ duration: reduce ? 0 : 0.25 }}
              >
                <ProjectCard project={project} />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}

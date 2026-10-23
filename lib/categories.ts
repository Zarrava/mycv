import type { ProjectCategory } from "@/data/projects";

export const caseSections = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "The Problem" },
  { id: "solution", label: "The Solution" },
  { id: "features", label: "Key Features" },
  { id: "architecture", label: "Architecture" },
  { id: "stack", label: "Tech Stack" },
  { id: "challenges", label: "Challenges" },
  { id: "results", label: "Results" },
  { id: "learnings", label: "Learnings" },
] as const;

const CATEGORY_ORDER: ProjectCategory[] = [
  "RAG",
  "Agents",
  "Voice",
  "API",
  "Automation",
  "Other",
];

export const categoryLabel: Record<ProjectCategory, string> = {
  RAG: "RAG",
  Agents: "Agents",
  Voice: "Voice",
  API: "APIs",
  Automation: "Automation",
  Other: "Other",
};

export function getCategories(categories: ProjectCategory[]) {
  const present = new Set(categories);
  const ordered = CATEGORY_ORDER.filter((category) => present.has(category));
  for (const category of present) {
    if (!ordered.includes(category)) ordered.push(category);
  }
  return ["All", ...ordered] as const;
}

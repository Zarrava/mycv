import { projects, type Project } from "@/data/projects";

export type ProjectCardData = Pick<
  Project,
  | "slug"
  | "title"
  | "shortDescription"
  | "category"
  | "thumbnail"
  | "tags"
  | "year"
  | "status"
  | "featured"
>;

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectCards(): ProjectCardData[] {
  return projects.map((project) => ({
    slug: project.slug,
    title: project.title,
    shortDescription: project.shortDescription,
    category: project.category,
    thumbnail: project.thumbnail,
    tags: project.tags,
    year: project.year,
    status: project.status,
    featured: project.featured,
  }));
}

export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return { previous: undefined, next: undefined };
  return {
    previous: projects[index - 1],
    next: projects[index + 1],
  };
}


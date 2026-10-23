import { ImageResponse } from "next/og";
import { OgCard } from "@/components/og/OgCard";
import { site } from "@/data/site";
import { getProject } from "@/lib/projects";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export const alt = "Project case study";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);

  return new ImageResponse(
    (
      <OgCard
        title={project?.title ?? site.name}
        kicker={project ? `${project.year} · ${project.category}` : "Portfolio"}
        subtitle={project?.tagline ?? site.valueProposition}
      />
    ),
    { ...size },
  );
}

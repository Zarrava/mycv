import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";
import { getAdjacentProjects, getProject } from "@/lib/projects";
import { breadcrumbJsonLd, projectMetadata } from "@/lib/metadata";
import { Badge, StatusBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CaseStudySection, projectImages } from "@/components/projects/CaseStudySection";
import { PreviewButton } from "@/components/projects/PreviewButton";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { ProjectNav } from "@/components/projects/ProjectNav";
import { ProjectToc } from "@/components/projects/ProjectToc";

type Params = { slug: string };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return projectMetadata(project);
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { previous, next } = getAdjacentProjects(slug);

  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Projects", path: "/#projects" },
    { name: project.title, path: `/projects/${project.slug}` },
  ]);

  return (
    <article className="shell py-10 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumb).replace(/</g, "\\u003c"),
        }}
      />
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
          <li>
            <Link href="/" className="inline-flex min-h-11 items-center hover:text-foreground">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/#projects" className="inline-flex min-h-11 items-center hover:text-foreground">
              Projects
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-foreground">
            {project.title}
          </li>
        </ol>
      </nav>

      <Link
        href="/#projects"
        className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        All projects
      </Link>

      <header className="mt-6 max-w-3xl">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={project.status} />
          <Badge>{project.category}</Badge>
          <Badge>{project.year}</Badge>
        </div>
        <h1 className="mt-4 font-display text-[length:var(--text-h2)] leading-[1.05] tracking-tight text-balance">
          {project.title}
        </h1>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted">{project.tagline}</p>
        <p className="mt-3 text-sm text-muted">{project.role}</p>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
          {project.tags.map((tag) => (
            <li key={tag}>
              <Badge>{tag}</Badge>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <PreviewButton url={project.previewUrl} title={project.title} />
          {project.repoUrl ? (
            <Button href={project.repoUrl} external variant="secondary">
              View source
              <span className="sr-only"> (opens in a new tab)</span>
              <ExternalLink className="size-4" aria-hidden="true" />
            </Button>
          ) : null}
        </div>
      </header>

      <div className="mt-10">
        <ProjectGallery images={projectImages(project)} title={project.title} />
      </div>

      <div className="mt-12 xl:grid xl:grid-cols-[220px_minmax(0,1fr)] xl:items-start xl:gap-10">
        <ProjectToc />
        <CaseStudySection project={project} />
      </div>

      <ProjectNav previous={previous} next={next} />
    </article>
  );
}

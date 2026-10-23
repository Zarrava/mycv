import { getProjectCards } from "@/lib/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectGrid } from "@/components/projects/ProjectGrid";

export function Projects() {
  const cards = getProjectCards();

  return (
    <section id="projects" aria-labelledby="projects-title" className="section scroll-mt-24">
      <div className="shell">
        <SectionHeading
          id="projects-title"
          eyebrow="Projects"
          title="Selected GenAI systems."
          description={`${cards.length} systems from client and teaching work: retrieval, agents, document ingestion, voice, and FastAPI services. Each one opens into the problem, the approach, and what it took to ship.`}
        />
        <ProjectGrid projects={cards} />
      </div>
    </section>
  );
}

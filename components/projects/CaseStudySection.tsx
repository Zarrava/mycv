import {
  Braces,
  Gauge,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import type { Project } from "@/data/projects";
import { Badge } from "@/components/ui/Badge";
import { ArchitectureDiagram } from "@/components/projects/ArchitectureDiagram";
import { SkillMark } from "@/components/ui/BrandIcon";
import type { SkillIcon } from "@/data/skills";

const featureIcons = [Sparkles, ShieldCheck, Gauge, Workflow, Braces];

const tagIcons: Record<string, SkillIcon> = {
  LangChain: "langchain",
  "GPT-4": "openai",
  FAISS: "vector",
  FastAPI: "fastapi",
  "Speech-to-text": "voice",
  "Text-to-speech": "voice",
  Pydantic: "parse",
  Python: "python",
  OpenAI: "openai",
  Redis: "vector",
  "Function calling": "api",
  Guardrails: "prompt",
  Docker: "docker",
  Flask: "flask",
  AWS: "aws",
  Whisper: "voice",
  Cohere: "api",
};

export function CaseStudySection({ project }: { project: Project }) {
  return (
    <div className="grid min-w-0 gap-12">
          <section id="overview" className="scroll-mt-28">
            <h2 className="font-display text-2xl tracking-tight">Overview</h2>
            <p className="mt-3 max-w-3xl text-pretty leading-relaxed text-muted">{project.overview}</p>
          </section>
          <section id="problem" className="scroll-mt-28">
            <h2 className="font-display text-2xl tracking-tight">The problem</h2>
            <p className="mt-3 max-w-3xl text-pretty leading-relaxed text-muted">{project.problem}</p>
          </section>
          <section id="solution" className="scroll-mt-28">
            <h2 className="font-display text-2xl tracking-tight">The solution</h2>
            <p className="mt-3 max-w-3xl text-pretty leading-relaxed text-muted">{project.solution}</p>
          </section>
          <section id="features" className="scroll-mt-28">
            <h2 className="font-display text-2xl tracking-tight">Key features</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {project.features.map((feature, index) => {
                const Icon = featureIcons[index % featureIcons.length] ?? Sparkles;
                return (
                  <li key={feature.title} className="surface p-5">
                    <Icon className="size-5 text-accent" aria-hidden="true" />
                    <h3 className="mt-3 font-medium">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{feature.description}</p>
                  </li>
                );
              })}
            </ul>
          </section>
          <section id="architecture" className="scroll-mt-28">
            <h2 className="font-display text-2xl tracking-tight">Architecture</h2>
            <p className="mt-3 max-w-3xl text-pretty leading-relaxed text-muted">
              {project.architecture.description}
            </p>
            <div className="surface mt-5 p-4 text-foreground sm:p-6">
              {project.architecture.mermaid ? (
                <ArchitectureDiagram source={project.architecture.mermaid} />
              ) : null}
            </div>
          </section>
          <section id="stack" className="scroll-mt-28">
            <h2 className="font-display text-2xl tracking-tight">Tech stack used</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => {
                const icon = tagIcons[tag];
                return (
                  <li key={tag}>
                    <Badge className="min-h-11 gap-2 px-3 text-sm">
                      {icon ? <SkillMark icon={icon} /> : null}
                      {tag}
                    </Badge>
                  </li>
                );
              })}
            </ul>
          </section>
          <section id="challenges" className="scroll-mt-28">
            <h2 className="font-display text-2xl tracking-tight">Challenges and how I solved them</h2>
            <ul className="mt-5 grid gap-4">
              {project.challenges.map((item) => (
                <li key={item.challenge} className="surface grid gap-3 p-5 md:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-medium uppercase tracking-[0.14em] text-muted">
                      Challenge
                    </h3>
                    <p className="mt-2 leading-relaxed">{item.challenge}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium uppercase tracking-[0.14em] text-muted">
                      What I did
                    </h3>
                    <p className="mt-2 leading-relaxed">{item.solution}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
          <section id="results" className="scroll-mt-28">
            <h2 className="font-display text-2xl tracking-tight">Results</h2>
            <dl className="mt-5 grid gap-3 sm:grid-cols-2">
              {project.results.map((result) => (
                <div key={result.label} className="surface p-5">
                  <dt className="text-sm text-muted">{result.label}</dt>
                  <dd className="mt-2 font-display text-2xl tracking-tight">{result.value}</dd>
                </div>
              ))}
            </dl>
          </section>
          <section id="learnings" className="scroll-mt-28">
            <h2 className="font-display text-2xl tracking-tight">What I learned</h2>
            <p className="mt-3 max-w-3xl text-pretty leading-relaxed text-muted">{project.learnings}</p>
          </section>
    </div>
  );
}

export function projectImages(project: Project) {
  return project.gallery?.length ? project.gallery : [project.thumbnail];
}

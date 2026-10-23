import { experience } from "@/data/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="section scroll-mt-24">
      <div className="shell">
        <SectionHeading
          id="experience-title"
          eyebrow="Experience"
          title="Four overlapping appointments."
          description="AI engineering, Python, and teaching work in Lagos and remotely, from 2021 to the present."
        />
        <p className="mt-6">
          <Badge tone="accent">Overlapping · 2021 — Present</Badge>
        </p>
        <ol className="relative mt-8 space-y-6 border-l border-border pl-0">
          {experience.map((role, index) => (
            <li key={role.id} className="relative pl-8">
              <span
                className="absolute -left-[5px] top-7 size-2.5 rounded-full bg-primary"
                aria-hidden="true"
              />
              <Reveal delay={index * 0.05}>
                <article className="surface p-6 sm:p-7">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <h3 className="font-display text-xl leading-snug tracking-tight text-balance sm:text-2xl">
                        {role.title}
                      </h3>
                      <p className="mt-1 text-muted">
                        {role.company}
                        <span className="text-border" aria-hidden="true">
                          {" "}
                          ·{" "}
                        </span>
                        {role.place}
                      </p>
                    </div>
                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                      {role.start} — {role.end}
                      {role.mode ? ` · ${role.mode}` : ""}
                    </p>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted">{role.summary}</p>
                  <ul className="mt-4 space-y-3 text-sm leading-relaxed">
                    {role.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
                    {role.tags.map((tag) => (
                      <li key={tag}>
                        <Badge>{tag}</Badge>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

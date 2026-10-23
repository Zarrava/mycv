import { skills } from "@/data/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SkillMark } from "@/components/ui/BrandIcon";

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section scroll-mt-24">
      <div className="shell">
        <SectionHeading
          id="skills-title"
          eyebrow="Skills"
          title="The stack behind the case studies."
          description="Grouped by the work, not by a percentage bar."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-6">
          {skills.map((group, index) => (
            <Reveal
              key={group.id}
              delay={index * 0.04}
              className={index === 0 ? "xl:col-span-3" : index === 1 ? "xl:col-span-3" : "xl:col-span-2"}
            >
              <article className="surface h-full p-6">
                <h3 className="font-display text-xl tracking-tight">{group.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{group.summary}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-background/50 px-3 text-sm"
                    >
                      <SkillMark icon={item.icon} />
                      {item.name}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

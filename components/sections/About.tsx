import { bioParagraphs, experienceStat, site } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { Portrait } from "@/components/sections/Portrait";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section scroll-mt-24">
      <div className="shell grid items-center gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <Reveal>
          <Portrait />
        </Reveal>
        <div>
          <SectionHeading
            id="about-title"
            eyebrow="About"
            title="An AI Native Developer who ships the model and the system around it."
            description="Retrieval, parsing, latency, and a service someone else can operate."
          />
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
            {bioParagraphs().map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="text-pretty">
                {paragraph}
              </p>
            ))}
          </div>
          <dl className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
            {[experienceStat(), ...site.stats].map((stat) => (
              <div key={stat.label} className="surface px-4 py-4">
                <dt className="text-sm leading-snug text-muted">{stat.label}</dt>
                <dd className="mt-2 font-display text-3xl tracking-tight sm:text-4xl">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

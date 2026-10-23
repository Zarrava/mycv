import { site } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Credentials() {
  return (
    <section
      id="credentials"
      aria-labelledby="credentials-title"
      className="section scroll-mt-24"
    >
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div>
          <SectionHeading
            id="credentials-title"
            eyebrow="Education"
            title={site.education.degree}
            description={`${site.education.school}, ${site.education.place}.`}
          />
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-muted">
            {site.education.years}
          </p>
        </div>
        <Reveal>
          <h3 className="font-display text-2xl tracking-tight">Certifications</h3>
          <ul className="mt-4 space-y-3">
            {site.certifications.map((item) => (
              <li key={item} className="surface px-4 py-3 text-sm leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

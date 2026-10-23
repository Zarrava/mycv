import { site, testimonials, whatIBring } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function WhatIBring() {
  if (!site.showWhatIBring && !site.showTestimonials) return null;

  return (
    <section aria-labelledby="bring-title" className="section scroll-mt-24">
      <div className="shell">
        {site.showWhatIBring ? (
          <>
            <SectionHeading
              id="bring-title"
              eyebrow="What I bring"
              title="Judgment you can put in a pull request."
            />
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {whatIBring.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.04}>
                  <article className="surface h-full p-6">
                    <h3 className="font-display text-xl tracking-tight">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </>
        ) : null}

        {site.showTestimonials && testimonials.length > 0 ? (
          <div className={site.showWhatIBring ? "mt-12" : undefined}>
            {!site.showWhatIBring ? (
              <SectionHeading id="bring-title" eyebrow="Testimonials" title="Notes from collaborators." />
            ) : (
              <h3 className="font-display text-2xl tracking-tight">Notes from collaborators</h3>
            )}
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {testimonials.map((item) => (
                <li key={item.name} className="surface p-6">
                  <blockquote>
                    <p className="text-pretty leading-relaxed">“{item.quote}”</p>
                    <footer className="mt-4 text-sm text-muted">
                      {item.name}
                      <span className="text-border"> · </span>
                      {item.role}
                    </footer>
                  </blockquote>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}

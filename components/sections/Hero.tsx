import { ArrowDownRight, Download } from "lucide-react";
import { headlineText, roleLine, site } from "@/data/site";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { Terminal } from "@/components/sections/Terminal";

export function Hero() {
  return (
    <section className="shell flex min-h-[calc(100svh-var(--header))] items-center py-12 sm:py-16">
      <div className="grid w-full items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
        <div>
          <p className="inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-border bg-card/70 px-3 py-2 text-sm text-muted">
            <span className="availability-dot size-2 rounded-full bg-success" aria-hidden="true" />
            {site.availabilityLabel}
            <span className="text-border" aria-hidden="true">
              /
            </span>
            <span>{site.openTo.join(" · ")}</span>
          </p>
          <h1 className="mt-6 font-display text-[length:var(--text-display)] font-medium leading-[0.95] tracking-tight text-balance">
            {site.name}
          </h1>
          <p className="mt-5 max-w-xl font-display text-[length:var(--text-h3)] leading-snug tracking-tight text-pretty">
            {site.headline.before}{" "}
            <span className="text-gradient">{site.headline.accent}</span>
          </p>
          <p className="mt-4 max-w-xl text-pretty text-[length:var(--text-lead)] leading-relaxed text-muted">
            {site.valueProposition}
          </p>
          <p className="sr-only">{headlineText()}</p>
          <p className="mt-4 max-w-xl text-pretty font-mono text-[0.68rem] uppercase leading-relaxed tracking-[0.14em] text-muted sm:text-xs sm:tracking-[0.18em]">
            {roleLine()}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Magnetic>
              <Button href="#projects">
                View projects
                <ArrowDownRight className="size-4" aria-hidden="true" />
              </Button>
            </Magnetic>
            <Button href={site.resumeHref} variant="secondary" download>
              <Download className="size-4" aria-hidden="true" />
              Download résumé
            </Button>
          </div>
          <SocialLinks className="mt-8" />
        </div>
        <Terminal />
      </div>
    </section>
  );
}

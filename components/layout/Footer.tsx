import { nav, site } from "@/data/site";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { Avatar } from "@/components/ui/Avatar";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="shell flex flex-col gap-8 py-10 sm:py-12">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
          <div>
            <p className="flex items-center gap-3 font-display text-lg">
              <Avatar className="size-9" />
              {site.name}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              AI Native Developer building production GenAI systems — retrieval, structured output, voice, and the services around them.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:items-end">
            <nav aria-label="Footer">
              <ul className="flex flex-wrap gap-x-4 gap-y-2">
                {nav.map((item) => (
                  <li key={item.id}>
                    <a href={item.href} className="inline-flex min-h-11 items-center text-sm text-muted hover:text-foreground">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <SocialLinks />
          </div>
        </div>
        <div className="flex flex-col gap-2 border-t border-border pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>Built with Next.js</p>
        </div>
      </div>
    </footer>
  );
}

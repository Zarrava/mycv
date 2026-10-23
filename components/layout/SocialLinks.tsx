import { site } from "@/data/site";
import { BrandIcon, LinkedInMark } from "@/components/ui/BrandIcon";
import { Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  site.github
    ? { href: site.github, label: "GitHub", icon: "github" as const }
    : null,
  site.linkedin
    ? { href: site.linkedin, label: "LinkedIn", icon: "linkedin" as const }
    : null,
  site.x ? { href: site.x, label: "X", icon: "x" as const } : null,
].flatMap((link) => (link ? [link] : []));

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${link.label} (opens in a new tab)`}
            className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-card/60 text-foreground hover:border-accent/50"
          >
            {link.icon === "linkedin" ? <LinkedInMark /> : <BrandIcon name={link.icon} />}
          </a>
        </li>
      ))}
      <li>
        <a
          href={`mailto:${site.email}`}
          aria-label={`Email ${site.name}`}
          className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-card/60 text-foreground hover:border-accent/50"
        >
          <Mail className="size-4" aria-hidden="true" />
        </a>
      </li>
    </ul>
  );
}

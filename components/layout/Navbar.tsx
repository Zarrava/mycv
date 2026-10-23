"use client";

import { useEffect, useId, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { nav, site } from "@/data/site";
import { Avatar } from "@/components/ui/Avatar";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const menuButtonRef = useId();

  useEffect(() => {
    if (pathname !== "/") return;
    const sections = nav
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0.1, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/80 backdrop-blur-xl">
      <div
        className="shell flex h-[var(--header)] items-center justify-between gap-3"
        inert={open ? true : undefined}
      >
        <a href={pathname === "/" ? "#content" : "/"} className="flex min-h-11 items-center gap-3" aria-label={`${site.name}, home`}>
          <Avatar className="size-10" />
          <span className="hidden font-display text-sm font-medium tracking-tight sm:block">
            {site.name}
          </span>
        </a>

        <nav className="hidden lg:block" aria-label="Primary">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const href = pathname === "/" ? `#${item.id}` : item.href;
              const current = pathname === "/" && active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={href}
                    aria-current={current ? "true" : undefined}
                    className={`inline-flex min-h-11 items-center rounded-full px-3 text-sm ${
                      current ? "text-foreground" : "text-muted hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <ThemeToggle />
          </div>
          <a
            href={pathname === "/" ? "#contact" : "/#contact"}
            className="inline-flex min-h-11 items-center rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground"
          >
            Hire me
          </a>
          <button
            type="button"
            id={menuButtonRef}
            className="inline-flex size-11 items-center justify-center rounded-full border border-border lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <Menu className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}

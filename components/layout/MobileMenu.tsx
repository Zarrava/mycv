"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { nav, site } from "@/data/site";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const content = document.getElementById("content");
    const footer = document.querySelector("footer");
    if (content) content.inert = true;
    if (footer instanceof HTMLElement) footer.inert = true;
    closeRef.current?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const root = panelRef.current;
      if (!root) return;
      const items = root.querySelectorAll<HTMLElement>("a, button");
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      if (content) content.inert = false;
      if (footer instanceof HTMLElement) footer.inert = false;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div
      ref={panelRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      hidden={!open}
      className="fixed inset-0 z-50 flex flex-col bg-background/95 px-[max(1.25rem,env(safe-area-inset-left))] pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))] backdrop-blur-xl lg:hidden"
    >
      <div className="flex items-center justify-between">
        <p className="font-display text-lg">{site.name}</p>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            ref={closeRef}
            type="button"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-4 text-sm font-medium"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
      <nav className="mt-10" aria-label="Mobile">
        <ul className="flex flex-col">
          {nav.map((item) => {
            const href = pathname === "/" ? `#${item.id}` : item.href;
            return (
              <li key={item.id}>
                <a
                  href={href}
                  onClick={onClose}
                  className="flex min-h-14 items-center border-b border-border font-display text-3xl tracking-tight"
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      <a
        href={pathname === "/" ? "#contact" : "/#contact"}
        onClick={onClose}
        className="mt-auto inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-5 font-semibold text-primary-foreground"
      >
        Hire me
      </a>
    </div>
  );
}

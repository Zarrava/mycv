"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  function toggle() {
    const isLight = document.documentElement.classList.contains("light");
    setTheme(isLight ? "dark" : "light");
  }

  return (
    <button
      type="button"
      className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-card/70 text-foreground"
      aria-label="Toggle color theme"
      onClick={toggle}
    >
      <Sun className="hidden size-4 dark:block" aria-hidden="true" />
      <Moon className="size-4 dark:hidden" aria-hidden="true" />
    </button>
  );
}

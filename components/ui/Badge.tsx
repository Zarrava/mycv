import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { ProjectStatus } from "@/data/projects";

const tones = {
  neutral: "border-border bg-foreground/5 text-foreground",
  accent: "border-accent/30 bg-accent/10 text-accent",
  success: "border-success/30 bg-success/10 text-success",
  warning: "border-warning/30 bg-warning/10 text-warning",
} as const;

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

const statusTone: Record<ProjectStatus, keyof typeof tones> = {
  Live: "success",
  "In Production": "accent",
  Prototype: "warning",
  Archived: "neutral",
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return <Badge tone={statusTone[status]}>{status}</Badge>;
}

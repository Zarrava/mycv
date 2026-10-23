import {
  siDocker,
  siFastapi,
  siFlask,
  siGit,
  siGithub,
  siLangchain,
  siPython,
  siX,
} from "simple-icons";
import {
  AudioLines,
  Braces,
  Cable,
  Cloud,
  CloudCog,
  Coins,
  Database,
  Hexagon,
  Library,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { SkillIcon } from "@/data/skills";
import { cn } from "@/lib/utils";

type Brand = { path: string };

const brands: Partial<Record<SkillIcon | "github" | "x", Brand>> = {
  python: siPython,
  fastapi: siFastapi,
  flask: siFlask,
  docker: siDocker,
  git: siGit,
  langchain: siLangchain,
  github: siGithub,
  x: siX,
};

const concepts: Partial<Record<SkillIcon, LucideIcon>> = {
  openai: Hexagon,
  prompt: Sparkles,
  parse: Braces,
  tokens: Coins,
  rag: Library,
  vector: Database,
  api: Cable,
  voice: AudioLines,
  aws: Cloud,
  gcp: CloudCog,
};

export function BrandIcon({
  name,
  className,
}: {
  name: "github" | "x" | SkillIcon;
  className?: string;
}) {
  const brand = brands[name];
  if (!brand) return null;
  return (
    <svg viewBox="0 0 24 24" className={cn("size-4", className)} aria-hidden="true">
      <path d={brand.path} fill="currentColor" />
    </svg>
  );
}

export function SkillMark({ icon, className }: { icon: SkillIcon; className?: string }) {
  const Concept = concepts[icon];
  if (Concept) return <Concept className={cn("size-4", className)} aria-hidden="true" />;
  return <BrandIcon name={icon} className={className} />;
}

export function LinkedInMark({ className }: { className?: string }) {
  return (
    <span
      className={cn("font-display text-[13px] font-semibold leading-none", className)}
      aria-hidden="true"
    >
      in
    </span>
  );
}

import Image from "next/image";
import { site } from "@/data/site";
import { monogram } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function Avatar({ className }: { className?: string }) {
  if (!site.portraitIsPhoto) {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-full bg-primary font-display font-semibold text-primary-foreground",
          className,
        )}
      >
        {monogram(site.name)}
      </span>
    );
  }

  return (
    <span className={cn("relative inline-flex overflow-hidden rounded-full bg-card", className)}>
      <Image
        src={site.portraitMark}
        alt=""
        fill
        sizes="56px"
        className="object-cover"
      />
    </span>
  );
}

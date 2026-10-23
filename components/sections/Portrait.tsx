import Image from "next/image";
import { site } from "@/data/site";
import { monogram } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function Portrait({ className }: { className?: string }) {
  const raster = /\.(png|jpe?g|webp|avif)$/i.test(site.portrait);
  const alt = site.portraitIsPhoto
    ? `Portrait of ${site.name}`
    : `Monogram for ${site.name}`;

  return (
    <div
      className={cn(
        "relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[1.75rem] border border-border shadow-glow",
        className,
      )}
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--accent)/0.45),transparent_42%),radial-gradient(circle_at_80%_80%,hsl(var(--accent-2)/0.35),transparent_40%),hsl(var(--card))]"
        aria-hidden="true"
      />
      {raster ? (
        <Image
          src={site.portrait}
          alt={alt}
          fill
          sizes="(max-width: 768px) 90vw, 380px"
          className="object-cover object-center"
        />
      ) : site.portrait ? (
        // SVG artwork. Swap the path in data/site.ts for a photograph.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={site.portrait} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
      ) : null}
      {!raster && !site.portraitIsPhoto ? (
        <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <span className="font-display text-7xl font-medium tracking-tight text-foreground">
            {monogram(site.name)}
          </span>
        </div>
      ) : null}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/75 to-transparent" />
      <p className="absolute bottom-4 left-4 right-4 font-mono text-xs uppercase tracking-[0.18em] text-[#f7f3ea]">
        {site.location}
      </p>
    </div>
  );
}

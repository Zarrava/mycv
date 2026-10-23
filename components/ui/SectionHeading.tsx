export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="max-w-2xl">
      <p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-accent">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-3 font-display text-[length:var(--text-h2)] font-medium leading-[1.05] tracking-tight text-balance"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted">
          {description}
        </p>
      ) : null}
    </header>
  );
}

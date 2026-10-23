export default function Loading() {
  return (
    <div className="shell py-16" aria-live="polite" aria-busy="true">
      <p className="sr-only">Loading</p>
      <div className="h-8 w-40 animate-pulse rounded-full bg-foreground/10" />
      <div className="mt-6 h-16 max-w-xl animate-pulse rounded-2xl bg-foreground/10" />
      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div className="h-64 animate-pulse rounded-3xl bg-foreground/10" />
        <div className="h-64 animate-pulse rounded-3xl bg-foreground/10" />
        <div className="hidden h-64 animate-pulse rounded-3xl bg-foreground/10 xl:block" />
      </div>
    </div>
  );
}

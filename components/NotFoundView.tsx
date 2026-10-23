import { Button } from "@/components/ui/Button";

export function NotFoundView({ project = false }: { project?: boolean }) {
  return (
    <section className="shell flex min-h-[70svh] flex-col items-start justify-center py-20">
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">404</p>
      <h1 className="mt-4 font-display text-[length:var(--text-h2)] tracking-tight">
        {project ? "That project is not on this site." : "This page does not exist."}
      </h1>
      <p className="mt-4 max-w-lg text-muted">
        {project
          ? "The link may be out of date. The case studies that are published are listed on the home page."
          : "The address may be mistyped, or the page has moved."}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/">Back home</Button>
        <Button href="/#projects" variant="secondary">
          View projects
        </Button>
      </div>
    </section>
  );
}

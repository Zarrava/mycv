import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function PreviewButton({ url, title }: { url?: string; title: string }) {
  if (!url) {
    return (
      <button
        type="button"
        disabled
        aria-disabled="true"
        className="inline-flex min-h-11 cursor-not-allowed items-center justify-center rounded-full border border-border px-5 text-sm font-semibold text-muted opacity-70"
      >
        Preview coming soon
      </button>
    );
  }

  return (
    <Button href={url} external>
      <span className="sr-only">{`Preview ${title}, opens in a new tab`}</span>
      <span aria-hidden="true">Preview project</span>
      <ExternalLink className="size-4" aria-hidden="true" />
    </Button>
  );
}

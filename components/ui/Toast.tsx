"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";

export function Toast({
  message,
  tone = "success",
  onClose,
}: {
  message: string;
  tone?: "success" | "error";
  onClose: () => void;
}) {
  useEffect(() => {
    const timer = window.setTimeout(onClose, 5000);
    return () => window.clearTimeout(timer);
  }, [message, onClose]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "surface fixed z-50 max-w-sm px-4 py-3 text-sm shadow-glow",
        "bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))]",
        tone === "error" ? "border-danger/40" : "border-success/40",
      )}
    >
      {message}
    </div>
  );
}

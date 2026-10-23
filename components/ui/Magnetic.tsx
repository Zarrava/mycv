"use client";

import { useRef } from "react";

export function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const node = ref.current;
    if (!node) return;
    const bounds = node.getBoundingClientRect();
    const x = Math.max(-8, Math.min(8, (event.clientX - (bounds.left + bounds.width / 2)) * 0.18));
    const y = Math.max(-6, Math.min(6, (event.clientY - (bounds.top + bounds.height / 2)) * 0.28));
    node.style.transform = `translate(${x}px, ${y}px)`;
  }

  function reset() {
    if (ref.current) ref.current.style.transform = "";
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className="inline-flex transition-transform duration-200 ease-out"
    >
      {children}
    </div>
  );
}

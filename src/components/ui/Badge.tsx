import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export function Badge({
  children,
  className,
  tone = "neutral",
}: {
  children: ReactNode;
  className?: string;
  tone?: "neutral" | "success" | "warning" | "brand";
}) {
  const tones = {
    neutral: "bg-cmp-surface-strong text-cmp-text border-cmp-border shadow-sm",
    success: "bg-emerald-950/35 text-emerald-200 border-emerald-500/30 shadow-sm shadow-black/30",
    warning: "bg-amber-950/35 text-amber-200 border-amber-500/30 shadow-sm",
    brand: "bg-cmp-accent/10 text-cmp-text border-cmp-accent/35 shadow-sm shadow-black/50",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

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
    neutral: "bg-cmp-surface-strong text-cmp-text border-cmp-border shadow-cmp-sm",
    success:
      "border border-[color:var(--cmp-success-border)] bg-[var(--cmp-success-bg)] text-[var(--cmp-success-fg)] shadow-cmp-sm",
    warning:
      "border border-[color:var(--cmp-warn-border)] bg-[var(--cmp-warn-bg)] text-[var(--cmp-warn-fg)] shadow-cmp-sm",
    brand: "bg-cmp-accent/10 text-cmp-text border-cmp-accent/35 shadow-cmp-sm",
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

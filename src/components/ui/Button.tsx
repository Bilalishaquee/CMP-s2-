import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-b from-cmp-accent to-cmp-violet text-white shadow-cmp-md ring-1 ring-[color:var(--cmp-ring-on-primary)] hover:from-cmp-accent-dim hover:to-cmp-violet active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100",
  secondary:
    "bg-cmp-bg-elevated text-cmp-text border border-cmp-border shadow-cmp-sm hover:border-cmp-border hover:bg-cmp-surface-strong/90 active:scale-[0.99] disabled:opacity-50",
  ghost:
    "text-cmp-text hover:bg-cmp-surface-strong active:scale-[0.99] disabled:opacity-50",
  outline:
    "border border-cmp-border bg-cmp-surface/50 text-cmp-text backdrop-blur hover:bg-cmp-bg-elevated active:scale-[0.99]",
};

export function Button({
  className,
  variant = "primary",
  type = "button",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; children: ReactNode }) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cmp-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-cmp-bg",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

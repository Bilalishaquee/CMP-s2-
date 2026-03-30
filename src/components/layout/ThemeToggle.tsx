"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/theme-context";
import { cn } from "@/lib/cn";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <div
      className="flex items-center rounded-xl border border-cmp-border bg-cmp-bg-elevated/90 p-1 shadow-cmp-sm"
      role="group"
      aria-label="Theme toggle"
    >
      <button
        type="button"
        onClick={() => setTheme("light")}
        aria-pressed={isLight}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg px-2.5 py-1.5 text-sm font-medium transition active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cmp-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-cmp-bg",
          isLight
            ? "bg-cmp-surface-strong text-cmp-text ring-1 ring-cmp-accent/25"
            : "text-cmp-muted hover:bg-cmp-surface-strong/60 hover:text-cmp-text",
        )}
      >
        <Sun className="h-4 w-4" aria-hidden />
        <span className="hidden sm:inline">Light</span>
      </button>
      <button
        type="button"
        onClick={() => setTheme("dark")}
        aria-pressed={!isLight}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg px-2.5 py-1.5 text-sm font-medium transition active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cmp-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-cmp-bg",
          !isLight
            ? "bg-cmp-surface-strong text-cmp-text ring-1 ring-cmp-accent/25"
            : "text-cmp-muted hover:bg-cmp-surface-strong/60 hover:text-cmp-text",
        )}
      >
        <Moon className="h-4 w-4" aria-hidden />
        <span className="hidden sm:inline">Dark</span>
      </button>
    </div>
  );
}


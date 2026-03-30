import { cn } from "@/lib/cn";

export function SearchSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse space-y-4", className)}>
      <div className="h-10 w-2/3 rounded-lg bg-cmp-surface-strong" />
      <div className="grid gap-4 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-xl border border-cmp-border bg-cmp-bg-elevated p-4 shadow-sm">
            <div className="h-4 w-1/3 rounded bg-cmp-surface-strong" />
            <div className="mt-4 h-6 w-2/3 rounded bg-cmp-surface-strong" />
            <div className="mt-3 space-y-2">
              <div className="h-3 w-full rounded bg-cmp-surface-strong" />
              <div className="h-3 w-5/6 rounded bg-cmp-surface-strong" />
            </div>
            <div className="mt-6 h-9 w-full rounded bg-cmp-surface-strong" />
          </div>
        ))}
      </div>
    </div>
  );
}

import { cn } from "@/lib/cn";
import type { AttributeComparison, MatchStatus } from "@/types";
import { AlertTriangle, CheckCircle2, MinusCircle } from "lucide-react";

function StatusIcon({ status }: { status: MatchStatus }) {
  if (status === "match")
    return <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" aria-label="Match" />;
  if (status === "compatible")
    return <AlertTriangle className="h-4 w-4 shrink-0 text-amber-400" aria-label="Compatible" />;
  return <MinusCircle className="h-4 w-4 shrink-0 text-rose-400" aria-label="Different" />;
}

function rowTone(status: MatchStatus) {
  if (status === "match") return "bg-emerald-950/25 border-emerald-500/25";
  if (status === "compatible") return "bg-amber-950/25 border-amber-500/25";
  return "bg-rose-950/25 border-rose-500/25";
}

export function AttributeBreakdown({
  searchedPartLabel,
  rows,
}: {
  searchedPartLabel: string;
  rows: AttributeComparison[];
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-cmp-border">
      <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2 border-b border-cmp-border bg-cmp-surface-strong px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-cmp-muted">
        <span>Attribute</span>
        <span>Searched ({searchedPartLabel})</span>
        <span>Candidate</span>
        <span className="text-right">Status</span>
      </div>
      <div className="divide-y divide-cmp-border/50">
        {rows.map((row) => (
          <div
            key={row.name}
            className={cn("grid grid-cols-[1fr_1fr_1fr_auto] gap-2 px-3 py-2.5 text-sm", rowTone(row.status))}
          >
            <span className="font-medium text-cmp-text">{row.name}</span>
            <span className="font-mono text-xs text-cmp-text">{row.searchedValue}</span>
            <span className="font-mono text-xs text-cmp-text">{row.candidateValue}</span>
            <div className="flex justify-end">
              <StatusIcon status={row.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

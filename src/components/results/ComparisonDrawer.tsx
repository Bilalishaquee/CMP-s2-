"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { PartOffer } from "@/types";
import { X } from "lucide-react";
import { useEffect } from "react";

export function ComparisonDrawer({
  open,
  onClose,
  offers,
  lowestPriceId,
  exactMatchId,
  zephyrId,
}: {
  open: boolean;
  onClose: () => void;
  offers: PartOffer[];
  lowestPriceId: string | null;
  exactMatchId: string | null;
  zephyrId: string | null;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const rows = [
    { key: "Supplier", get: (o: PartOffer) => o.supplierBadge },
    { key: "Manufacturer", get: (o: PartOffer) => o.manufacturer },
    {
      key: "Price",
      get: (o: PartOffer) => `${o.currency} ${o.price.toFixed(2)}`,
      highlight: (o: PartOffer) => `${o.option}-${o.partNumber}` === lowestPriceId,
    },
    { key: "Stock", get: (o: PartOffer) => `${o.stock.toLocaleString()}` },
    {
      key: "Match",
      get: (o: PartOffer) => (o.matchScore != null ? `${o.matchScore}%` : "—"),
      highlight: (o: PartOffer) => o.tag.includes("Exact"),
    },
  ];

  const attrNames = Array.from(
    new Set(offers.flatMap((o) => o.attributes?.map((a) => a.name) ?? [])),
  ).slice(0, 5);

  return (
    <div className="fixed inset-0 z-[80] flex justify-end">
      <button
        type="button"
        className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"
        aria-label="Close comparison"
        onClick={onClose}
      />
      <div
        className="relative flex h-full w-full max-w-5xl flex-col border-l border-cmp-border bg-cmp-bg-elevated shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="comparison-title"
      >
        <div className="flex items-center justify-between border-b border-cmp-border px-6 py-4">
          <div>
            <h2 id="comparison-title" className="text-lg font-semibold text-cmp-text">
              Side-by-side comparison
            </h2>
            <p className="text-sm text-cmp-muted">
              Evaluation view — verify datasheets before committing to a build.
            </p>
          </div>
          <Button variant="ghost" onClick={onClose} aria-label="Close">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex-1 overflow-auto px-6 py-4">
          <div className="mb-4 flex flex-wrap gap-2">
            {lowestPriceId && <Badge tone="success">Lowest indicative price highlighted</Badge>}
            {exactMatchId && <Badge tone="brand">Exact match highlighted</Badge>}
            {zephyrId && <Badge tone="brand">Zephyr preferred option</Badge>}
          </div>
          <div className="overflow-x-auto rounded-lg border border-cmp-border">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-cmp-border bg-cmp-surface-strong">
                  <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-cmp-muted">
                    Field
                  </th>
                  {offers.map((o) => (
                    <th key={`${o.option}-${o.partNumber}`} className="px-3 py-2 text-left text-xs font-semibold text-cmp-text">
                      {o.label} · {o.supplierBadge}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.key} className="border-b border-cmp-border/50">
                    <td className="px-3 py-2.5 font-medium text-cmp-text">{row.key}</td>
                    {offers.map((o) => {
                      const id = `${o.option}-${o.partNumber}`;
                      const hl =
                        "highlight" in row && row.highlight
                          ? row.highlight(o)
                          : row.key === "Match" && o.tag.includes("Exact");
                      const priceHl = row.key === "Price" && id === lowestPriceId;
                      const zephyrHl = o.option === "C" && o.supplierName.includes("Zephyr");
                      return (
                        <td
                          key={id}
                          className={cn(
                            "px-3 py-2.5",
                            (hl || priceHl) && "bg-emerald-950/35 font-medium text-emerald-200",
                            zephyrHl && row.key === "Supplier" && "bg-cmp-accent/10 text-cmp-text",
                          )}
                        >
                          {row.get(o)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
                {attrNames.map((name) => (
                  <tr key={name} className="border-b border-cmp-border/50">
                    <td className="px-3 py-2.5 font-medium text-cmp-text">{name}</td>
                    {offers.map((o) => {
                      const attr = o.attributes?.find((a) => a.name === name);
                      return (
                        <td key={`${o.option}-${name}`} className="px-3 py-2.5 font-mono text-xs text-cmp-text">
                          {attr ? (
                            <span
                              className={cn(
                                attr.status === "match" && "text-emerald-800",
                                attr.status === "compatible" && "text-amber-800",
                                attr.status === "different" && "text-rose-800",
                              )}
                            >
                              {attr.candidateValue}
                            </span>
                          ) : (
                            "—"
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
                <tr>
                  <td className="px-3 py-2.5 font-medium text-cmp-text">Datasheet</td>
                  {offers.map((o) => (
                    <td key={`ds-${o.option}`} className="px-3 py-2.5">
                      <a
                        href={o.datasheetUrl}
                        className="text-cmp-accent underline-offset-2 hover:underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Open
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

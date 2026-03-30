"use client";

import { AttributeBreakdown } from "@/components/results/AttributeBreakdown";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/context/toast-context";
import { cn } from "@/lib/cn";
import type { PartOffer } from "@/types";
import { ExternalLink, Package } from "lucide-react";

export function ResultOptionCard({
  offer,
  searchedQuery,
  onCompare,
  emphasizePreferred,
}: {
  offer: PartOffer;
  searchedQuery: string;
  onCompare?: () => void;
  emphasizePreferred?: boolean;
}) {
  const { addLine } = useCart();
  const { show } = useToast();

  const isB = offer.option === "B";
  const isC = offer.option === "C";

  return (
    <article
      className={cn(
        "card-elevated flex flex-col rounded-2xl border bg-cmp-bg-elevated/95 backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-cmp-xl",
        emphasizePreferred
          ? "border-cmp-accent/40 ring-2 ring-cmp-accent/25 shadow-[var(--cmp-shadow-card-selected)]"
          : "border-cmp-border shadow-cmp-sm",
        isC && emphasizePreferred && "border-l-[5px] border-l-cmp-accent bg-gradient-to-b from-cmp-bg-elevated to-cmp-accent/10",
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-cmp-border/50 px-5 py-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-cmp-muted">{offer.label}</span>
            <Badge tone="neutral">{offer.supplierBadge}</Badge>
            <Badge tone={offer.tag.includes("Exact") ? "success" : isC ? "brand" : "neutral"}>{offer.tag}</Badge>
          </div>
          <h3 className="mt-2 font-mono text-lg font-semibold text-cmp-text">{offer.partNumber}</h3>
          <p className="text-sm text-cmp-muted">{offer.manufacturer}</p>
        </div>
        <div className="text-right">
          {offer.matchScore != null ? (
            <div className="inline-flex flex-col items-end rounded-lg border border-cmp-border bg-cmp-surface-strong px-3 py-2">
              <span className="text-[10px] font-semibold uppercase tracking-wide text-cmp-muted">
                Match score
              </span>
              <span
                className={cn(
                  "text-2xl font-bold tabular-nums",
                  isB || isC ? "text-cmp-text" : "text-cmp-text",
                )}
              >
                {offer.matchScore}%
              </span>
            </div>
          ) : (
            offer.option === "A" && (
              <Badge tone="success" className="text-[11px]">
                DigiKey exact catalog
              </Badge>
            )
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 px-5 py-4">
        <ul className="space-y-1.5 text-sm text-cmp-text">
          {offer.specs.map((s) => (
            <li key={s} className="flex gap-2">
              <Package className="mt-0.5 h-4 w-4 shrink-0 text-cmp-muted" aria-hidden />
              <span>{s}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-end justify-between gap-3 border-t border-cmp-border/50 pt-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wide text-cmp-muted">Unit price</p>
            <p className="text-xl font-semibold tabular-nums text-cmp-text">
              {offer.currency} {offer.price.toFixed(2)}
            </p>
            {offer.isIndicativePricing && (
              <Badge tone="warning" className="mt-1">
                Indicative pricing
              </Badge>
            )}
          </div>
          <div className="text-right">
            <p className="text-[11px] font-medium uppercase tracking-wide text-cmp-muted">Stock</p>
            <p className="text-sm font-medium tabular-nums text-cmp-text">{offer.stock.toLocaleString()} units</p>
          </div>
        </div>

        {offer.disclosure && (
          <div className="rounded-lg border border-cmp-accent/20 bg-cmp-accent/15 px-3 py-2 text-xs leading-relaxed text-cmp-text">
            {offer.disclosure}
          </div>
        )}

        {offer.attributes && offer.attributes.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-cmp-muted">
              Attribute comparison
            </p>
            <AttributeBreakdown searchedPartLabel={searchedQuery} rows={offer.attributes} />
          </div>
        )}

        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          <Button
            variant="secondary"
            className="flex-1 min-w-[120px]"
            onClick={() => window.open(offer.datasheetUrl, "_blank", "noopener,noreferrer")}
          >
            <ExternalLink className="h-4 w-4" />
            Datasheet
          </Button>
          <Button
            className="flex-1 min-w-[120px]"
            onClick={() => {
              addLine(offer, 1, searchedQuery);
              show(`Added ${offer.partNumber} (${offer.label}) to cart`, "success");
            }}
          >
            Add to cart
          </Button>
          {onCompare && (
            <Button variant="ghost" className="w-full sm:w-auto" onClick={onCompare}>
              Compare
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}

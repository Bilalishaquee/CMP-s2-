"use client";

import { ComparisonDrawer } from "@/components/results/ComparisonDrawer";
import { ResultOptionCard } from "@/components/results/ResultOptionCard";
import { SeoPreview } from "@/components/results/SeoPreview";
import { SearchSkeleton } from "@/components/search/SearchSkeleton";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getSearchResults, type ResultScenario } from "@/data/parts";
import { cn } from "@/lib/cn";
import type { PartOffer } from "@/types";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, GitCompare, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/cart-context";

type Filter = "all" | "price" | "match" | "stock";

export function ResultsPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const q = searchParams.get("q") ?? "";
  const scenario = (searchParams.get("scenario") as ResultScenario | null) ?? "full";
  const [compareOpen, setCompareOpen] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [transitioning, setTransitioning] = useState(false);
  const [boot, setBoot] = useState(true);
  const { lines } = useCart();

  useEffect(() => {
    const id = window.setTimeout(() => setBoot(false), 600);
    return () => window.clearTimeout(id);
  }, []);

  const bundle = useMemo(() => getSearchResults(q || "MT25QU512ABB", scenario), [q, scenario]);

  const offers: PartOffer[] = useMemo(() => {
    const list = [bundle.optionA, bundle.optionB, bundle.optionC].filter(Boolean) as PartOffer[];
    if (filter === "price") {
      return [...list].sort((a, b) => a.price - b.price);
    }
    if (filter === "match") {
      return [...list].sort((a, b) => (b.matchScore ?? 0) - (a.matchScore ?? 0));
    }
    if (filter === "stock") {
      return [...list].sort((a, b) => b.stock - a.stock);
    }
    return list;
  }, [bundle, filter]);

  const prices = offers.map((o) => o.price);
  const lowestPrice = Math.min(...prices, Infinity);
  const lowestPriceId =
    offers.find((o) => o.price === lowestPrice) != null
      ? `${offers.find((o) => o.price === lowestPrice)!.option}-${offers.find((o) => o.price === lowestPrice)!.partNumber}`
      : null;
  const exactMatch = offers.find((o) => o.tag.includes("Exact"));
  const exactMatchId = exactMatch ? `${exactMatch.option}-${exactMatch.partNumber}` : null;
  const zephyr = offers.find((o) => o.option === "C");
  const zephyrId = zephyr ? `${zephyr.option}-${zephyr.partNumber}` : null;

  const cartSummary = lines.length;
  const subtotal = lines.reduce((s, l) => s + l.offer.price * l.quantity, 0);

  if (boot || transitioning) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <SearchSkeleton />
      </div>
    );
  }

  if (scenario === "none" || offers.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold text-cmp-text">No results available</h1>
        <p className="mt-2 text-cmp-muted">
          No distributor matches were returned for <span className="font-mono font-medium">{q}</span>. Adjust the
          query or upload a BOM for batch review.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/search"
            className="inline-flex items-center justify-center rounded-md border border-cmp-border bg-cmp-bg-elevated px-4 py-2 text-sm font-medium text-cmp-text shadow-cmp-sm transition hover:bg-cmp-surface-strong"
          >
            Back to search
          </Link>
          <Link
            href="/bom"
            className="inline-flex items-center justify-center rounded-md bg-cmp-accent-dim px-4 py-2 text-sm font-medium text-white shadow-cmp-sm transition hover:bg-cmp-accent"
          >
            Upload BOM
          </Link>
        </div>
        <p className="mt-8 text-xs text-cmp-muted">
          <span className="rounded bg-cmp-surface-strong px-1.5 py-0.5 font-mono text-cmp-muted">admin:scenario=none</span>
        </p>
      </div>
    );
  }

  const primary = bundle.optionA ?? bundle.optionB ?? bundle.optionC!;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-cmp-muted">
        <Link
          href="/search"
          className="inline-flex items-center gap-1 font-medium text-cmp-accent-dim hover:text-cmp-text"
        >
          <ArrowLeft className="h-4 w-4" />
          Search
        </Link>
        <span className="text-cmp-muted">/</span>
        <span className="font-mono text-cmp-text">{q || "—"}</span>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-cmp-text">Results for {q}</h1>
          <p className="mt-1 max-w-2xl text-sm text-cmp-muted">
            Candidate recommendations for sourcing review. Indicative pricing until checkout confirmation.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={() => setCompareOpen(true)}>
            <GitCompare className="h-4 w-4" />
            Compare A/B/C
          </Button>
        </div>
      </div>

      {(bundle.banner === "no_exact" || bundle.banner === "partial") && (
        <div
          className={cn(
            "mt-6 rounded-lg border px-4 py-3 text-sm",
            bundle.banner === "no_exact"
              ? "border-[color:var(--cmp-warn-border)] bg-[var(--cmp-warn-bg)] text-[var(--cmp-warn-fg)]"
              : "border-cmp-border bg-cmp-bg-elevated text-cmp-text",
          )}
        >
          {bundle.banner === "no_exact" && !bundle.partialMessage && (
            <p>
              We could not find an exact catalog match for this part number in the demo dataset. Showing structured
              alternatives for evaluation.
            </p>
          )}
          {bundle.partialMessage && <p>{bundle.partialMessage}</p>}
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-cmp-muted">Quick filters</span>
        {(
          [
            ["all", "All"],
            ["price", "Lowest price"],
            ["match", "Highest match"],
            ["stock", "In stock first"],
          ] as const
        ).map(([k, label]) => (
          <button
            key={k}
            type="button"
            onClick={() => setFilter(k)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium",
              filter === k
                ? "border-cmp-accent bg-cmp-accent-dim text-white"
                : "border-cmp-border bg-cmp-bg-elevated text-cmp-text hover:border-cmp-border",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-lg border border-dashed border-cmp-border bg-cmp-bg-elevated p-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-cmp-muted">Demo scenario (stakeholder)</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {(
            [
              ["full", "Full (A+B+C)"],
              ["bc", "B + C only"],
              ["c_only", "C only"],
              ["a_only", "A only"],
              ["none", "No results"],
            ] as const
          ).map(([k, label]) => (
            <button
              key={k}
              type="button"
              onClick={() => {
                const next = new URLSearchParams(searchParams.toString());
                next.set("scenario", k);
                if (q) next.set("q", q);
                setTransitioning(true);
                router.replace(`/search/results?${next.toString()}`);
                window.setTimeout(() => setTransitioning(false), 400);
              }}
              className={cn(
                "rounded-md px-2 py-1 text-xs font-medium",
                scenario === k
                  ? "bg-cmp-accent-dim text-white"
                  : "bg-cmp-surface-strong text-cmp-text hover:bg-cmp-surface-strong",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {offers.map((o) => (
            <ResultOptionCard
              key={`${o.option}-${o.partNumber}`}
              offer={o}
              searchedQuery={q}
              emphasizePreferred={o.option === "C"}
              onCompare={() => setCompareOpen(true)}
            />
          ))}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-cmp-border bg-cmp-bg-elevated p-4 shadow-cmp-sm">
            <h2 className="text-sm font-semibold text-cmp-text">Comparison summary</h2>
            <p className="mt-1 text-xs text-cmp-muted">
              Sticky panel for executive review. Lowest price and Zephyr preferred option are highlighted in the
              comparison drawer.
            </p>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between gap-2">
                <dt className="text-cmp-muted">Options shown</dt>
                <dd className="font-medium text-cmp-text">{offers.length}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-cmp-muted">Lowest indicative</dt>
                <dd className="font-mono text-cmp-text">
                  USD {lowestPrice === Infinity ? "—" : lowestPrice.toFixed(2)}
                </dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-cmp-muted">Zephyr option</dt>
                <dd className="text-right text-cmp-text">{zephyr ? zephyr.partNumber : "—"}</dd>
              </div>
            </dl>
            <Button className="mt-4 w-full" variant="secondary" onClick={() => setCompareOpen(true)}>
              Open comparison
            </Button>
          </div>

          <div className="rounded-xl border border-cmp-border bg-cmp-bg-elevated p-4 shadow-cmp-sm">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold text-cmp-text">Cart snapshot</h2>
              <ShoppingCart className="h-4 w-4 text-cmp-muted" />
            </div>
            {cartSummary === 0 ? (
              <p className="mt-2 text-sm text-cmp-muted">No items yet — add from the cards.</p>
            ) : (
              <p className="mt-2 text-sm text-cmp-text">
                {cartSummary} line(s) · Est. <span className="font-mono font-semibold">${subtotal.toFixed(2)}</span>
              </p>
            )}
            <Link href="/cart" className="mt-3 inline-block text-sm font-medium text-cmp-accent-dim hover:underline">
              View cart
            </Link>
          </div>

          <div className="rounded-xl border border-cmp-border bg-cmp-bg-elevated p-4 shadow-cmp-sm">
            <h2 className="text-sm font-semibold text-cmp-text">Saved searches (mock)</h2>
            <ul className="mt-2 space-y-1 text-sm text-cmp-accent-dim">
              <li>
                <Link href="/search/results?q=MT25QU512ABB" className="hover:underline">
                  MT25QU512ABB
                </Link>
              </li>
              <li>
                <Link href="/search/results?q=TPS5430DDAR" className="hover:underline">
                  TPS5430DDAR
                </Link>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-cmp-border bg-cmp-bg-elevated p-4 shadow-cmp-sm">
            <h2 className="text-sm font-semibold text-cmp-text">Recently viewed (mock)</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {["LM358DR", "ATMEGA328P-AU"].map((p) => (
                <Link key={p} href={`/search/results?q=${p}`}>
                  <Badge tone="neutral">{p}</Badge>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <div className="mt-10">
        <SeoPreview query={q || primary.partNumber} primary={primary} />
      </div>

      <ComparisonDrawer
        open={compareOpen}
        onClose={() => setCompareOpen(false)}
        offers={offers}
        lowestPriceId={lowestPriceId}
        exactMatchId={exactMatchId}
        zephyrId={zephyrId}
      />
    </div>
  );
}

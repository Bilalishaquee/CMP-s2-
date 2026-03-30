import type { PartOffer } from "@/types";

export function SeoPreview({ query, primary }: { query: string; primary: PartOffer }) {
  const canonical = `https://crossmypart.example/part/${encodeURIComponent(query)}`;
  const title = `${query} · Stock, alternatives & Zephyr pricing | CrossMyPart`;
  const description = `Evaluate ${query} (${primary.manufacturer}) with DigiKey exact match, LCSC alternatives, and Zephyr preferred pricing. Indicative data for sourcing review.`;

  const structured = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: primary.partNumber,
    brand: { "@type": "Brand", name: primary.manufacturer },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: primary.currency,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <section className="rounded-xl border border-dashed border-cmp-border bg-cmp-surface-strong/80 p-4">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-cmp-muted">SEO preview (prototype)</h3>
        <span className="rounded bg-cmp-surface-strong px-2 py-0.5 text-[10px] font-medium text-cmp-text">Internal</span>
      </div>
      <dl className="mt-3 space-y-2 text-sm">
        <div>
          <dt className="text-xs font-medium text-cmp-muted">Canonical URL</dt>
          <dd className="mt-0.5 break-all font-mono text-xs text-cmp-text">{canonical}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-cmp-muted">Page title</dt>
          <dd className="mt-0.5 text-cmp-text">{title}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-cmp-muted">Meta description</dt>
          <dd className="mt-0.5 text-cmp-text">{description}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-cmp-muted">Structured data (JSON-LD)</dt>
          <dd className="mt-2 overflow-x-auto rounded-lg border border-cmp-border bg-cmp-bg-elevated p-3 font-mono text-[11px] leading-relaxed text-cmp-text">
            {JSON.stringify(structured, null, 2)}
          </dd>
        </div>
      </dl>
    </section>
  );
}

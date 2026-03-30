"use client";

import { useCart } from "@/context/cart-context";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";

export function CartPageClient() {
  const { lines, setQuantity, removeLine } = useCart();
  const subtotal = lines.reduce((s, l) => s + l.offer.price * l.quantity, 0);
  const shipping = subtotal > 0 ? Math.min(24.5, subtotal * 0.02) : 0;

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-semibold text-cmp-text">Your cart is empty</h1>
        <p className="mt-2 text-cmp-muted">Add parts from search or BOM results to build a mixed-supplier cart.</p>
        <Link
          href="/search"
          className="mt-8 inline-flex items-center justify-center rounded-md bg-teal-950 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-teal-900"
        >
          Continue searching parts
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <h1 className="text-3xl font-semibold tracking-tight text-cmp-text">Cart</h1>
      <p className="mt-2 text-sm text-cmp-muted">
        Mixed suppliers (Option A/B/C). Live pricing and stock are confirmed at checkout.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="overflow-hidden rounded-xl border border-cmp-border bg-cmp-bg-elevated shadow-sm">
          <table className="w-full border-collapse text-sm">
            <thead className="border-b border-cmp-border bg-cmp-surface-strong text-left text-xs font-semibold uppercase tracking-wide text-cmp-muted">
              <tr>
                <th className="px-4 py-3">Part</th>
                <th className="px-4 py-3">Supplier option</th>
                <th className="px-4 py-3">Unit</th>
                <th className="px-4 py-3">Qty</th>
                <th className="px-4 py-3 text-right">Extended</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-cmp-border/50">
              {lines.map((l) => (
                <tr key={l.id}>
                  <td className="px-4 py-4">
                    <p className="font-mono text-sm font-semibold text-cmp-text">{l.offer.partNumber}</p>
                    <p className="text-xs text-cmp-muted">{l.offer.manufacturer}</p>
                    {l.queryContext && (
                      <p className="mt-1 text-[11px] text-cmp-muted">From query {l.queryContext}</p>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <span className="rounded-md bg-cmp-surface-strong px-2 py-0.5 text-xs font-medium text-cmp-text">
                      {l.offer.label} · {l.offer.supplierBadge}
                    </span>
                  </td>
                  <td className="px-4 py-4 tabular-nums text-cmp-text">
                    {l.offer.currency} {l.offer.price.toFixed(2)}
                  </td>
                  <td className="px-4 py-4">
                    <div className="inline-flex items-center rounded-md border border-cmp-border">
                      <button
                        type="button"
                        className="p-2 text-cmp-muted hover:bg-cmp-surface-strong disabled:opacity-40"
                        onClick={() => setQuantity(l.id, l.quantity - 1)}
                        disabled={l.quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="min-w-[2rem] px-2 text-center tabular-nums">{l.quantity}</span>
                      <button
                        type="button"
                        className="p-2 text-cmp-muted hover:bg-cmp-surface-strong"
                        onClick={() => setQuantity(l.id, l.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right font-medium tabular-nums text-cmp-text">
                    {l.offer.currency} {(l.offer.price * l.quantity).toFixed(2)}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <button
                      type="button"
                      className="rounded p-2 text-cmp-muted hover:bg-rose-50 hover:text-rose-700"
                      onClick={() => removeLine(l.id)}
                      aria-label="Remove line"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <aside className="space-y-4">
          <div className="rounded-xl border border-cmp-border bg-cmp-bg-elevated p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-cmp-text">Order summary</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-cmp-muted">Subtotal (indicative)</dt>
                <dd className="font-mono font-medium">${subtotal.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-cmp-muted">Est. shipping</dt>
                <dd className="font-mono font-medium">${shipping.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between border-t border-cmp-border/50 pt-2 text-base font-semibold">
                <dt>Total</dt>
                <dd className="font-mono">${(subtotal + shipping).toFixed(2)}</dd>
              </div>
            </dl>
            <p className="mt-3 text-xs text-cmp-muted">
              Indicative totals. Allocation, tariffs, and carrier fees may adjust at checkout.
            </p>
            <Link
              href="/checkout"
              className="mt-5 flex w-full items-center justify-center rounded-md bg-teal-950 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-teal-900"
            >
              Proceed to checkout
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

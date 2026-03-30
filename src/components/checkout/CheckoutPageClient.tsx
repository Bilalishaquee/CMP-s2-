"use client";

import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/context/toast-context";
import { useAuthModal } from "@/context/auth-modal-context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AlertTriangle, CheckCircle2, CreditCard, Truck } from "lucide-react";

export function CheckoutPageClient() {
  const { lines, clear } = useCart();
  const { show } = useToast();
  const { open: openAuth } = useAuthModal();
  const router = useRouter();
  const [method, setMethod] = useState<"ground" | "expedited">("ground");
  const [pay, setPay] = useState<"card" | "paypal">("card");
  const [priceChanged, setPriceChanged] = useState(false);

  const subtotal = lines.reduce((s, l) => s + l.offer.price * l.quantity, 0);
  const ship = subtotal > 0 ? (method === "ground" ? 18 : 42) : 0;
  const total = subtotal + ship;

  function placeOrder() {
    show("Order placed — confirmation is mocked in this prototype.", "success");
    clear();
    router.push("/order-confirmation?order=CMP-10501");
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-semibold text-cmp-text">Nothing to checkout</h1>
        <p className="mt-2 text-cmp-muted">Add items to your cart first.</p>
        <Link
          href="/search"
          className="mt-8 inline-flex items-center justify-center rounded-md bg-cmp-accent-dim px-4 py-2 text-sm font-medium text-white shadow-cmp-sm transition hover:bg-cmp-accent"
        >
          Search parts
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <h1 className="text-3xl font-semibold tracking-tight text-cmp-text">Checkout</h1>
      <p className="mt-2 text-sm text-cmp-muted">
        Guest checkout is available. Create an account after ordering to track POs centrally.
      </p>

      <div className="mt-6 rounded-lg border border-cmp-accent/20 bg-cmp-accent/15 px-4 py-3 text-sm text-cmp-text">
        <strong className="font-semibold">Live confirmation:</strong> pricing and stock are re-validated when you place
        the order. This prototype simulates that confirmation step.
      </div>

      {priceChanged && (
        <div className="mt-4 flex items-start gap-3 rounded-lg border border-[color:var(--cmp-warn-border)] bg-[var(--cmp-warn-bg)] px-4 py-3 text-sm text-[var(--cmp-warn-fg)]">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--cmp-warn-link)]" />
          <div>
            <p className="font-semibold">Stock / price changed since cart</p>
            <p className="mt-1">
              One or more lines were updated. Review the summary before submitting. (Mock toggle for stakeholder demo.)
            </p>
            <button
              type="button"
              className="mt-2 text-sm font-medium text-[color:var(--cmp-warn-link)] underline"
              onClick={() => setPriceChanged(false)}
            >
              Accept updates
            </button>
          </div>
        </div>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-8">
          <section className="card-elevated rounded-2xl border border-cmp-border bg-cmp-bg-elevated/95 p-6">
            <h2 className="text-sm font-semibold text-cmp-text">Account</h2>
            <p className="mt-1 text-sm text-cmp-muted">
              Optional:{" "}
              <button
                type="button"
                className="font-semibold text-cmp-accent-dim underline decoration-cmp-accent/50 underline-offset-2 hover:text-cmp-text"
                onClick={() => openAuth("signin")}
              >
                Sign in
              </button>{" "}
              or{" "}
              <button
                type="button"
                className="font-semibold text-cmp-accent-dim underline decoration-cmp-accent/50 underline-offset-2 hover:text-cmp-text"
                onClick={() => openAuth("register")}
              >
                create an account
              </button>
            </p>
            <label className="mt-4 flex items-center gap-2 text-sm">
              <input type="checkbox" defaultChecked className="rounded border-cmp-border" />
              Continue as guest
            </label>
          </section>

          <section className="rounded-xl border border-cmp-border bg-cmp-bg-elevated p-6 shadow-cmp-sm">
            <h2 className="text-sm font-semibold text-cmp-text">Shipping address</h2>
            <p className="mt-1 flex items-center gap-2 text-xs text-cmp-muted">
              <Truck className="h-4 w-4" />
              Shipping available to US, Canada, and Mexico only.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="text-xs font-medium text-cmp-muted">
                Full name
                <input className="mt-1 w-full rounded-md border border-cmp-border px-3 py-2 text-sm" defaultValue="Alex Rivera" />
              </label>
              <label className="text-xs font-medium text-cmp-muted">
                Company
                <input className="mt-1 w-full rounded-md border border-cmp-border px-3 py-2 text-sm" defaultValue="Zephyr Labs Inc." />
              </label>
              <label className="text-xs font-medium text-cmp-muted sm:col-span-2">
                Address
                <input className="mt-1 w-full rounded-md border border-cmp-border px-3 py-2 text-sm" defaultValue="1200 Industrial Blvd" />
              </label>
              <label className="text-xs font-medium text-cmp-muted">
                City
                <input className="mt-1 w-full rounded-md border border-cmp-border px-3 py-2 text-sm" defaultValue="Austin" />
              </label>
              <label className="text-xs font-medium text-cmp-muted">
                Region
                <select className="mt-1 w-full rounded-md border border-cmp-border px-3 py-2 text-sm" defaultValue="TX">
                  <option>TX</option>
                  <option>CA</option>
                  <option>ON</option>
                </select>
              </label>
            </div>
          </section>

          <section className="rounded-xl border border-cmp-border bg-cmp-bg-elevated p-6 shadow-cmp-sm">
            <h2 className="text-sm font-semibold text-cmp-text">Shipping method</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setMethod("ground")}
                className={`rounded-lg border p-4 text-left text-sm transition ${
                  method === "ground"
                    ? "border-cmp-accent ring-2 ring-[color:var(--cmp-ring-glass)]"
                    : "border-cmp-border hover:border-cmp-border"
                }`}
              >
                <p className="font-semibold text-cmp-text">Ground</p>
                <p className="mt-1 text-xs text-cmp-muted">Est. 4–6 business days</p>
                <p className="mt-2 font-mono text-sm">$18.00</p>
              </button>
              <button
                type="button"
                onClick={() => setMethod("expedited")}
                className={`rounded-lg border p-4 text-left text-sm transition ${
                  method === "expedited"
                    ? "border-cmp-accent ring-2 ring-[color:var(--cmp-ring-glass)]"
                    : "border-cmp-border hover:border-cmp-border"
                }`}
              >
                <p className="font-semibold text-cmp-text">Expedited</p>
                <p className="mt-1 text-xs text-cmp-muted">Est. 2 business days</p>
                <p className="mt-2 font-mono text-sm">$42.00</p>
              </button>
            </div>
          </section>

          <section className="rounded-xl border border-cmp-border bg-cmp-bg-elevated p-6 shadow-cmp-sm">
            <h2 className="text-sm font-semibold text-cmp-text">Payment</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setPay("card")}
                className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm ${
                  pay === "card" ? "border-cmp-accent bg-cmp-surface-strong" : "border-cmp-border"
                }`}
              >
                <CreditCard className="h-4 w-4" />
                Credit / Debit Card
              </button>
              <button
                type="button"
                onClick={() => setPay("paypal")}
                className={`rounded-md border px-3 py-2 text-sm ${
                  pay === "paypal" ? "border-cmp-accent bg-cmp-surface-strong" : "border-cmp-border"
                }`}
              >
                PayPal
              </button>
            </div>
            {pay === "card" && (
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <label className="text-xs font-medium text-cmp-muted sm:col-span-2">
                  Card number
                  <input
                    className="mt-1 w-full rounded-xl border border-cmp-border px-3 py-2 font-mono text-sm shadow-cmp-inner focus:border-cmp-accent/50 focus:outline-none focus:ring-2 focus:ring-cmp-accent/30"
                    placeholder="4242 4242 4242 4242"
                  />
                </label>
                <label className="text-xs font-medium text-cmp-muted">
                  Expiry
                  <input
                    className="mt-1 w-full rounded-xl border border-cmp-border px-3 py-2 text-sm shadow-cmp-inner focus:border-cmp-accent/50 focus:outline-none focus:ring-2 focus:ring-cmp-accent/30"
                    placeholder="MM/YY"
                  />
                </label>
                <label className="text-xs font-medium text-cmp-muted">
                  CVC
                  <input
                    className="mt-1 w-full rounded-xl border border-cmp-border px-3 py-2 text-sm shadow-cmp-inner focus:border-cmp-accent/50 focus:outline-none focus:ring-2 focus:ring-cmp-accent/30"
                    placeholder="123"
                  />
                </label>
              </div>
            )}
            {pay === "paypal" && (
              <p className="mt-4 rounded-xl border border-cmp-border bg-cmp-surface-strong/80 px-4 py-3 text-sm text-cmp-text">
                PayPal will open in a secure window to authorize payment.{" "}
                <span className="font-medium text-cmp-text">(mock — no redirect in this prototype)</span>
              </p>
            )}
            <button
              type="button"
              className="mt-4 text-sm font-medium text-cmp-accent-dim hover:underline"
              onClick={() => setPriceChanged(true)}
            >
              Simulate stock/price change (demo)
            </button>
          </section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-cmp-border bg-cmp-bg-elevated p-5 shadow-cmp-sm">
            <h2 className="text-sm font-semibold text-cmp-text">Order summary</h2>
            <ul className="mt-4 max-h-48 space-y-2 overflow-auto text-sm text-cmp-text">
              {lines.map((l) => (
                <li key={l.id} className="flex justify-between gap-2">
                  <span className="truncate font-mono text-xs">{l.offer.partNumber}</span>
                  <span className="shrink-0 tabular-nums">
                    ×{l.quantity} · ${(l.offer.price * l.quantity).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
            <dl className="mt-4 space-y-2 border-t border-cmp-border/50 pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-cmp-muted">Subtotal</dt>
                <dd className="font-mono">${subtotal.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-cmp-muted">Shipping</dt>
                <dd className="font-mono">${ship.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between text-base font-semibold">
                <dt>Total</dt>
                <dd className="font-mono">${total.toFixed(2)}</dd>
              </div>
            </dl>
            <div className="mt-4 flex items-start gap-2 rounded-lg border border-[color:var(--cmp-success-border)] bg-[var(--cmp-success-bg)] px-3 py-2 text-xs text-[var(--cmp-success-fg)]">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cmp-accent" />
              Indicative totals shown. Final charges confirmed on submit.
            </div>
            <Button className="mt-5 w-full" onClick={placeOrder}>
              Place order
            </Button>
            <p className="mt-3 text-center text-xs text-cmp-muted">
              By placing this order you agree to commercial terms (mock).
            </p>
          </div>
          <div className="rounded-xl border border-dashed border-cmp-border bg-cmp-surface-strong p-4 text-xs text-cmp-muted">
            <Badge tone="neutral" className="mb-2">
              Trust
            </Badge>
            <p>TLS encryption (mock), supplier-backed fulfillment disclosures, and audit-friendly order records.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

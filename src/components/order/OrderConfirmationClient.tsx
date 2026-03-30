"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Suspense } from "react";
import { useAuthModal } from "@/context/auth-modal-context";

function Inner() {
  const searchParams = useSearchParams();
  const { open: openAuth } = useAuthModal();
  const orderId = searchParams.get("order") ?? "CMP-10501";

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
        <CheckCircle2 className="h-8 w-8 text-emerald-700" />
      </div>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-cmp-text">Order confirmed</h1>
      <p className="mt-2 text-cmp-muted">
        Thank you. A confirmation email will be sent to <span className="font-medium">buyer@company.com</span>{" "}
        (mock).
      </p>
      <p className="mt-4 font-mono text-lg font-semibold text-cmp-text">Order {orderId}</p>

      <div className="mt-10 rounded-xl border border-cmp-border bg-cmp-bg-elevated p-6 text-left shadow-cmp-sm">
        <h2 className="text-sm font-semibold text-cmp-text">Summary</h2>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-cmp-muted">Items</dt>
            <dd className="text-cmp-text">Mixed suppliers (A/B/C)</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-cmp-muted">Shipping</dt>
            <dd className="text-cmp-text">Ground · Austin, TX</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-cmp-muted">Payment</dt>
            <dd className="text-cmp-text">Card ending 4242 (mock)</dd>
          </div>
        </dl>
      </div>

      <div className="mt-6 rounded-xl border border-cmp-accent/20 bg-gradient-to-r from-cmp-accent/12 to-cmp-bg-elevated px-4 py-3 text-sm text-cmp-text shadow-cmp-sm">
        Create an account to save addresses and reorder in one click.{" "}
        <button
          type="button"
          className="font-semibold text-cmp-text underline decoration-cmp-accent/50 underline-offset-2 hover:text-cmp-text"
          onClick={() => openAuth("register")}
        >
          Register
        </button>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link
          href="/search"
          className="inline-flex items-center justify-center rounded-md bg-cmp-accent-dim px-4 py-2 text-sm font-medium text-white shadow-cmp-sm transition hover:bg-cmp-accent"
        >
          Continue searching parts
        </Link>
        <Link
          href="/orders"
          className="inline-flex items-center justify-center rounded-md border border-cmp-border bg-cmp-bg-elevated px-4 py-2 text-sm font-medium text-cmp-text shadow-cmp-sm transition hover:bg-cmp-surface-strong"
        >
          View orders
        </Link>
      </div>
    </div>
  );
}

export function OrderConfirmationClient() {
  return (
    <Suspense fallback={<div className="p-16 text-center text-cmp-muted">Loading…</div>}>
      <Inner />
    </Suspense>
  );
}

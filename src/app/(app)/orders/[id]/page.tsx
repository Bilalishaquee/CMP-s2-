"use client";

import { ORDER_TIMELINE } from "@/data/orders";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Check } from "lucide-react";

export default function OrderDetailPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "CMP-10482";

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 lg:px-8">
      <Link href="/orders" className="text-sm font-medium text-cmp-accent-dim hover:underline">
        ← Back to orders
      </Link>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-cmp-text">Order {id}</h1>
      <p className="mt-2 text-sm text-cmp-muted">Timeline reflects a typical B2B fulfillment path (mock).</p>

      <ol className="mt-10 space-y-0">
        {ORDER_TIMELINE.map((step, i) => (
          <li key={step.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                  step.done
                    ? "border-[color:var(--cmp-success-border)] bg-[var(--cmp-success-bg-soft)] text-[var(--cmp-success-fg)]"
                    : "border-cmp-border bg-cmp-bg-elevated"
                }`}
              >
                {step.done ? <Check className="h-4 w-4" /> : <span className="text-xs text-cmp-muted">{i + 1}</span>}
              </div>
              {i < ORDER_TIMELINE.length - 1 && <div className="min-h-[2rem] w-px flex-1 bg-cmp-surface-strong" aria-hidden />}
            </div>
            <div className="pb-10">
              <p className="font-medium text-cmp-text">{step.label}</p>
              <p className="text-sm text-cmp-muted">{step.date}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

import { MOCK_ORDERS } from "@/data/orders";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";

export default function OrdersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <h1 className="cmp-page-title text-3xl font-semibold tracking-tight text-cmp-text">Orders</h1>
      <p className="mt-2 text-sm text-cmp-muted">Prototype order history — no backend persistence.</p>

      <div className="cmp-table-scroll mt-8 rounded-xl border border-cmp-border bg-cmp-bg-elevated shadow-cmp-sm">
        <table className="cmp-responsive-table min-w-[900px] text-left text-sm">
          <thead className="border-b border-cmp-border bg-cmp-surface-strong text-xs font-semibold uppercase tracking-wide text-cmp-muted">
            <tr>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Items</th>
              <th className="px-4 py-3">Supplier mix</th>
              <th className="px-4 py-3 text-right">Total</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-cmp-border/50">
            {MOCK_ORDERS.map((o) => (
              <tr key={o.id} className="hover:bg-cmp-surface-strong/80">
                <td className="px-4 py-3 font-mono text-xs font-semibold text-cmp-text">{o.id}</td>
                <td className="px-4 py-3 tabular-nums text-cmp-text">{o.date}</td>
                <td className="px-4 py-3">
                  <Badge tone={o.status === "Delivered" ? "success" : "neutral"}>{o.status}</Badge>
                </td>
                <td className="px-4 py-3 tabular-nums">{o.items}</td>
                <td className="px-4 py-3 text-cmp-text">{o.supplierMix}</td>
                <td className="px-4 py-3 text-right font-mono font-medium tabular-nums text-cmp-text">
                  ${o.total.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/orders/${o.id}`} className="font-medium text-cmp-accent-dim hover:underline">
                    View details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

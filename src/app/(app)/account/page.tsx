import Link from "next/link";
import { MOCK_ORDERS } from "@/data/orders";
import { ManageAddressesButton } from "@/components/account/ManageAddressesButton";

export default function AccountPage() {
  const recent = MOCK_ORDERS.slice(0, 2);
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 lg:px-8">
      <h1 className="text-3xl font-semibold tracking-tight text-cmp-text">Account</h1>
      <p className="mt-2 text-sm text-cmp-muted">Lightweight profile area — authentication not implemented.</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="card-elevated rounded-2xl border border-cmp-border bg-cmp-bg-elevated/95 p-6 shadow-black/40">
          <h2 className="text-sm font-semibold text-cmp-text">Profile</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div>
              <dt className="text-cmp-muted">Name</dt>
              <dd className="font-medium text-cmp-text">Alex Rivera</dd>
            </div>
            <div>
              <dt className="text-cmp-muted">Company</dt>
              <dd className="font-medium text-cmp-text">Zephyr Labs Inc.</dd>
            </div>
            <div>
              <dt className="text-cmp-muted">Email</dt>
              <dd className="font-medium text-cmp-text">buyer@company.com</dd>
            </div>
          </dl>
        </section>

        <section
          id="addresses"
          className="card-elevated scroll-mt-28 rounded-2xl border border-cmp-border bg-cmp-bg-elevated/95 p-6 shadow-black/40"
        >
          <h2 className="text-sm font-semibold text-cmp-text">Saved addresses</h2>
          <p className="mt-2 text-sm text-cmp-muted">1200 Industrial Blvd, Austin, TX (default)</p>
          <div className="mt-4 flex flex-wrap gap-4">
            <Link
              href="#addresses"
              className="text-sm font-semibold text-cmp-accent-dim underline decoration-cmp-accent/50 underline-offset-2 hover:text-cmp-text"
            >
              Jump to address
            </Link>
            <ManageAddressesButton />
          </div>
        </section>

        <section className="card-elevated rounded-2xl border border-cmp-border bg-cmp-bg-elevated/95 p-6 shadow-black/40 lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-cmp-text">Recent orders</h2>
            <Link href="/orders" className="text-sm font-semibold text-cmp-accent-dim hover:text-cmp-text">
              View all
            </Link>
          </div>
          <ul className="mt-4 divide-y divide-cmp-border/50">
            {recent.map((o) => (
              <li key={o.id} className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm">
                <span className="font-mono font-semibold text-cmp-text">{o.id}</span>
                <span className="text-cmp-muted">{o.date}</span>
                <Link href={`/orders/${o.id}`} className="font-medium text-cmp-accent-dim hover:text-cmp-text">
                  Details
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              href="/orders"
              className="inline-flex items-center justify-center rounded-xl border border-cmp-border bg-cmp-bg-elevated px-4 py-2 text-sm font-medium text-cmp-text shadow-sm shadow-black/40 transition hover:border-cmp-accent/30 hover:bg-cmp-accent/10 active:scale-[0.98]"
            >
              Reorder from last PO (mock)
            </Link>
          </div>
        </section>

        <section className="card-elevated rounded-2xl border border-cmp-border bg-cmp-bg-elevated/95 p-6 shadow-black/40 lg:col-span-2">
          <h2 className="text-sm font-semibold text-cmp-text">Preferred payment</h2>
          <p className="mt-2 text-sm text-cmp-muted">Net-30 terms placeholder · Card on file ending 4242 (mock)</p>
        </section>
      </div>
    </div>
  );
}

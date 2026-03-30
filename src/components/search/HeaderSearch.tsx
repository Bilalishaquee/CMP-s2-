"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Search } from "lucide-react";

export function HeaderSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = q.trim();
    if (!trimmed) return;
    router.push(`/search/results?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <form onSubmit={onSubmit} className="relative w-full">
      <Search
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cmp-accent/90"
        aria-hidden
      />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search by part number…"
        className="w-full rounded-xl border border-cmp-border bg-cmp-bg-elevated/90 py-2.5 pl-10 pr-3 text-sm text-cmp-text shadow-cmp-inner placeholder:text-cmp-muted focus:border-cmp-accent/50 focus:bg-cmp-bg-elevated focus:outline-none focus:ring-2 focus:ring-cmp-accent/30"
        aria-label="Part number search"
      />
    </form>
  );
}

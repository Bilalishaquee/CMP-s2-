"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import { useAuthModal } from "@/context/auth-modal-context";

export function LandingHeader() {
  const { open: openAuth } = useAuthModal();

  return (
    <header className="border-b border-cmp-border bg-cmp-bg-elevated/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        <Link href="/" className="group flex items-center gap-2.5 font-semibold tracking-tight text-cmp-text">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-950 via-cmp-bg-elevated to-cmp-violet text-xs font-bold text-white shadow-lg shadow-black/50 ring-1 ring-white/15 transition group-hover:shadow-teal-950/35">
            CM
          </span>
          CrossMyPart
        </Link>
        <nav className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/search"
            className="hidden text-sm font-medium text-cmp-muted transition hover:text-cmp-text sm:inline"
          >
            Search
          </Link>
          <Link href="/bom" className="hidden text-sm font-medium text-cmp-muted transition hover:text-cmp-text md:inline">
            BOM
          </Link>
          <Link
            href="/search"
            className={cn(
              "inline-flex items-center justify-center rounded-xl border border-cmp-border bg-cmp-bg-elevated/90 px-3 py-2 text-sm font-medium text-cmp-text shadow-sm shadow-black/40 transition hover:border-cmp-border hover:bg-cmp-bg-elevated hover:shadow-md active:scale-[0.98]",
            )}
          >
            Search a Part
          </Link>
          <button
            type="button"
            onClick={() => openAuth("signin")}
            className="rounded-xl border border-cmp-border bg-cmp-bg-elevated/90 px-3 py-2 text-sm font-medium text-cmp-text shadow-sm shadow-black/40 transition hover:border-cmp-accent/30 hover:bg-cmp-accent/10 hover:text-cmp-text active:scale-[0.98]"
          >
            Guest / Sign In
          </button>
        </nav>
      </div>
    </header>
  );
}

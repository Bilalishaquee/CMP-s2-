"use client";

import { cn } from "@/lib/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeaderSearch } from "@/components/search/HeaderSearch";
import { useCart } from "@/context/cart-context";
import { useAuthModal } from "@/context/auth-modal-context";
import { ShoppingCart } from "lucide-react";

const nav = [
  { href: "/search", label: "Search" },
  { href: "/bom", label: "BOM Upload" },
  { href: "/cart", label: "Cart" },
  { href: "/orders", label: "Orders" },
  { href: "/account", label: "Account" },
];

export function AppHeader({ showSearch = true }: { showSearch?: boolean }) {
  const pathname = usePathname();
  const { lines } = useCart();
  const { open: openAuth } = useAuthModal();
  const cartCount = lines.reduce((n, l) => n + l.quantity, 0);

  return (
    <header className="sticky top-0 z-50 border-b border-cmp-border bg-cmp-bg-elevated/85 shadow-[0_1px_0_rgb(0_0_0/0.35)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 lg:px-8">
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5 font-semibold tracking-tight text-cmp-text"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-950 via-cmp-bg-elevated to-cmp-violet text-xs font-bold text-white shadow-lg shadow-black/50 ring-1 ring-white/15 transition group-hover:shadow-teal-950/30">
            CM
          </span>
          <span className="hidden sm:inline">CrossMyPart</span>
        </Link>
        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150",
                  active
                    ? "bg-cmp-accent/10 text-cmp-text shadow-inner ring-1 ring-white/10"
                    : "text-cmp-muted hover:bg-cmp-surface/60 hover:text-cmp-text",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex min-w-0 flex-1 items-center justify-end gap-2 sm:gap-3">
          {showSearch && (
            <div className="hidden min-w-0 max-w-md flex-1 lg:block">
              <HeaderSearch />
            </div>
          )}
          <Link
            href="/cart"
            className="relative inline-flex items-center gap-2 rounded-xl border border-cmp-border bg-cmp-bg-elevated/90 px-3 py-2 text-sm font-medium text-cmp-text shadow-sm shadow-black/40 transition hover:border-cmp-border hover:bg-cmp-bg-elevated hover:shadow-md active:scale-[0.98]"
          >
            <ShoppingCart className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-cmp-bg-elevated px-1 text-[10px] font-semibold text-white shadow-sm">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            onClick={() => openAuth("signin")}
            className="rounded-xl border border-cmp-border bg-cmp-bg-elevated/90 px-3 py-2 text-sm font-medium text-cmp-text shadow-sm shadow-black/40 transition hover:border-cmp-accent/30 hover:bg-cmp-accent/10 hover:text-cmp-text active:scale-[0.98]"
          >
            <span className="hidden sm:inline">Guest / </span>Sign In
          </button>
        </div>
      </div>
      {showSearch && (
        <div className="border-t border-cmp-border/50 bg-cmp-surface/50 px-4 py-2 lg:hidden">
          <HeaderSearch />
        </div>
      )}
    </header>
  );
}

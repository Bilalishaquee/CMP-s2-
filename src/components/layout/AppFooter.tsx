import Link from "next/link";
import { FooterLegal } from "@/components/layout/FooterLegal";

export function AppFooter() {
  return (
    <footer className="relative border-t border-cmp-border bg-gradient-to-b from-cmp-bg-elevated to-cmp-surface/90">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cmp-accent/40 to-transparent" />
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 lg:flex-row lg:items-start lg:justify-between lg:px-8">
        <div>
          <p className="text-sm font-semibold text-cmp-text">CrossMyPart</p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-cmp-muted">
            Part-number intelligence for electronics sourcing. Results are recommendations for evaluation, not
            guaranteed drop-in replacements.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
          <Link href="/search" className="font-medium text-cmp-muted transition hover:text-cmp-text">
            Search
          </Link>
          <Link href="/bom" className="font-medium text-cmp-muted transition hover:text-cmp-text">
            BOM
          </Link>
          <FooterLegal />
          <Link href="/seo-preview" className="font-medium text-cmp-muted transition hover:text-cmp-text">
            SEO preview
          </Link>
        </div>
      </div>
    </footer>
  );
}

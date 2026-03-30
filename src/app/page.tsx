import { LandingHeader } from "@/components/layout/LandingHeader";
import { AppFooter } from "@/components/layout/AppFooter";
import { HeroCircuit3D } from "@/components/landing/HeroCircuit3D";
import { cn } from "@/lib/cn";
import Link from "next/link";
import { ArrowRight, ClipboardList, Layers, Search, ShoppingCart, Upload } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <LandingHeader />
      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-cmp-border bg-gradient-to-b from-cmp-bg-elevated/80 to-cmp-bg">
          <div className="pointer-events-none absolute inset-0 grid-pattern opacity-[0.35]" />
          <div className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-cmp-accent/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-cmp-violet/12 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 py-14 lg:px-8 lg:py-20">
            <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(280px,420px)] lg:gap-16">
              <div className="text-center lg:text-left">
                <p className="animate-fade-in text-xs font-semibold uppercase tracking-[0.22em] text-cmp-accent">
                  Electronics sourcing intelligence
                </p>
                <h1 className="mt-4 animate-fade-in bg-gradient-to-r from-cmp-text via-cmp-accent to-cmp-violet bg-clip-text text-4xl font-semibold tracking-tight text-transparent [animation-delay:60ms] lg:text-5xl xl:text-6xl">
                  CrossMyPart
                </h1>
                <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-cmp-muted lg:mx-0">
                  Find exact parts, Asian alternatives, and Zephyr recommended equivalents in one place.
                </p>
                <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-cmp-muted/90 lg:mx-0">
                  This tool helps engineers evaluate sourcing options. Results are candidate recommendations, not
                  guaranteed drop-in replacements.
                </p>

                <div className="mx-auto mt-10 max-w-xl animate-fade-in [animation-delay:120ms] lg:mx-0">
                  <div className="card-elevated rounded-2xl border border-cmp-border bg-cmp-bg-elevated/90 p-2 ring-1 ring-[color:var(--cmp-ring-glass)] backdrop-blur-md">
                    <form
                      action="/search/results"
                      method="get"
                      className="flex flex-col gap-2 sm:flex-row sm:items-stretch"
                    >
                      <input
                        name="q"
                        placeholder="Enter part number (e.g. STM32F407VGT6)"
                        className="w-full flex-1 rounded-xl border border-cmp-border bg-cmp-surface-strong/80 px-4 py-3.5 font-mono text-base text-cmp-text shadow-cmp-inner transition placeholder:text-cmp-muted focus:border-cmp-accent/50 focus:bg-cmp-bg-elevated focus:outline-none focus:ring-2 focus:ring-cmp-accent/30"
                        defaultValue="MT25QU512ABB"
                      />
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-cmp-accent to-cmp-violet px-8 py-3.5 text-sm font-semibold text-white shadow-cmp-lg ring-1 ring-[color:var(--cmp-ring-on-primary)] transition hover:from-cmp-accent-dim hover:to-cmp-violet active:scale-[0.98] sm:px-6"
                      >
                        <Search className="h-4 w-4" />
                        Search
                      </button>
                    </form>
                  </div>
                  <p className="mt-3 text-xs text-cmp-muted/80">
                    Indicative pricing and stock shown for evaluation. Confirmed at checkout.
                  </p>
                </div>

                <div className="mt-10 flex flex-wrap justify-center gap-3 lg:justify-start">
                  <Link
                    href="/search"
                    className={cn(
                      "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-sm font-medium transition active:scale-[0.98]",
                      "bg-gradient-to-b from-cmp-accent to-cmp-violet text-white shadow-cmp-lg ring-1 ring-[color:var(--cmp-ring-on-primary)] hover:from-cmp-accent-dim hover:to-cmp-violet",
                    )}
                  >
                    Search a Part
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/bom"
                    className={cn(
                      "inline-flex items-center justify-center gap-2 rounded-xl border border-cmp-border bg-cmp-bg-elevated px-6 py-2.5 text-sm font-medium text-cmp-text shadow-cmp-md transition hover:border-cmp-accent/35 hover:bg-cmp-accent/10 active:scale-[0.98]",
                    )}
                  >
                    <Upload className="h-4 w-4" />
                    Upload BOM
                  </Link>
                </div>
              </div>

              <div className="flex justify-center lg:justify-end">
                <HeroCircuit3D className="lg:translate-x-2" />
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-cmp-border py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="text-center text-sm font-semibold uppercase tracking-[0.18em] text-cmp-muted">
              Platform capabilities
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: Search,
                  title: "Exact part lookup",
                  body: "DigiKey-aligned catalog match (Option A) for US-centric procurement baselines.",
                },
                {
                  icon: Layers,
                  title: "Alternative matching",
                  body: "LCSC-sourced alternatives (Option B) with attribute-level technical comparison.",
                },
                {
                  icon: Upload,
                  title: "BOM upload",
                  body: "Batch validation with line-by-line status and best match scores.",
                },
                {
                  icon: ShoppingCart,
                  title: "Cart + checkout",
                  body: "Mixed-supplier carts with indicative totals and checkout confirmation flow.",
                },
              ].map((f) => (
                <div
                  key={f.title}
                  className="group card-elevated rounded-2xl border border-cmp-border bg-cmp-bg-elevated/90 p-6 transition duration-300 hover:-translate-y-1 hover:border-cmp-accent/35 hover:shadow-[var(--cmp-shadow-hover-accent)]"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cmp-surface-strong to-cmp-accent/10 text-cmp-accent shadow-cmp-inner ring-1 ring-cmp-border transition group-hover:from-cmp-accent/20 group-hover:to-cmp-accent/10 group-hover:text-cmp-text">
                    <f.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-semibold text-cmp-text">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cmp-muted">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-cmp-border bg-cmp-surface/40 py-16 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-cmp-muted">Example use cases</h2>
            <ul className="mt-8 grid gap-4 md:grid-cols-2">
              {[
                "Qualify a second source before a PCN or allocation event.",
                "Compare US catalog pricing against competitive Asian supply.",
                "Evaluate Zephyr-fulfilled options when lowest total cost matters.",
                "Screen a prototype BOM for risky lines before MP build.",
              ].map((t) => (
                <li
                  key={t}
                  className="flex gap-3 rounded-xl border border-cmp-border bg-gradient-to-br from-cmp-bg-elevated to-cmp-surface/80 px-4 py-4 text-sm text-cmp-text shadow-cmp-sm transition hover:border-cmp-accent/35"
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cmp-accent/10 text-cmp-accent ring-1 ring-cmp-accent/25">
                    <ClipboardList className="h-4 w-4" />
                  </span>
                  <span className="text-left leading-relaxed">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <AppFooter />
    </>
  );
}

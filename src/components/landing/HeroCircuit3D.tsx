"use client";

import { cn } from "@/lib/cn";

/**
 * Project-native hero scene: CSS 3D “package + substrate” and animated PCB-style traces.
 * No external 3D runtime — keeps the bundle light and matches CrossMyPart’s electronics metaphor.
 */
export function HeroCircuit3D({ className }: { className?: string }) {
  return (
    <div
      className={cn("relative mx-auto w-full max-w-[min(100%,420px)] select-none", className)}
      aria-hidden
    >
      <div className="cmp-perspective relative aspect-square max-h-[min(52vw,380px)] sm:max-h-[420px]">
        {/* Trace layer */}
        <svg
          className="absolute inset-[6%] text-cmp-accent/35"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="cmp-hero-trace"
            d="M32 200 H120 Q140 200 150 180 L200 96 Q210 72 236 72 H368"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
          <path
            className="cmp-hero-trace cmp-hero-trace-delay"
            d="M48 288 H168 Q188 288 202 268 L268 148 Q278 128 304 128 H372"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.75"
          />
          <path
            className="cmp-hero-trace"
            style={{ animationDelay: "1.1s" }}
            d="M56 112 C96 112 96 168 136 168 H320"
            stroke="url(#cmp-trace-grad)"
            strokeWidth="1.15"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="cmp-trace-grad" x1="56" y1="112" x2="320" y2="168" gradientUnits="userSpaceOnUse">
              <stop stopColor="rgb(45 212 191)" stopOpacity="0.5" />
              <stop offset="1" stopColor="rgb(167 139 250)" stopOpacity="0.35" />
            </linearGradient>
          </defs>
        </svg>

        {/* Soft field */}
        <div className="pointer-events-none absolute inset-[12%] rounded-[2rem] bg-gradient-to-br from-cmp-accent/8 via-transparent to-cmp-violet/10 blur-2xl" />

        {/* 3D stack */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-cmp-float cmp-preserve-3d relative h-[58%] w-[62%]">
            <div className="animate-cmp-orbit cmp-preserve-3d relative h-full w-full [transform:rotateX(54deg)_rotateZ(-18deg)]">
              {/* Substrate */}
              <div
                className="absolute left-1/2 top-1/2 h-[78%] w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-cmp-border bg-gradient-to-br from-cmp-bg-elevated via-cmp-bg to-cmp-bg-elevated shadow-[0_24px_60px_-20px_rgb(0_0_0/0.75)]"
                style={{ transform: "translate(-50%, -50%) translateZ(-36px)" }}
              >
                <div className="absolute inset-2 rounded-lg border border-cmp-accent/15 bg-[linear-gradient(90deg,transparent_0%,rgb(45_212_191/0.06)_50%,transparent_100%)] opacity-80" />
                <div className="absolute inset-x-4 bottom-3 top-3 rounded-md border border-dashed border-cmp-border/60 opacity-50" />
              </div>
              {/* Middle package */}
              <div
                className="absolute left-1/2 top-1/2 h-[52%] w-[68%] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-cmp-border-glow bg-gradient-to-br from-cmp-surface-strong to-cmp-bg-elevated cmp-glow-accent"
                style={{ transform: "translate(-50%, -50%) translateZ(8px)" }}
              >
                <div className="absolute inset-x-3 top-2 h-1 rounded-full bg-cmp-accent/25 blur-[2px]" />
                <div className="absolute inset-3 grid grid-cols-6 gap-1.5 opacity-90">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <span
                      key={i}
                      className="rounded-[2px] bg-gradient-to-b from-cmp-muted/25 to-cmp-bg/80 ring-1 ring-cmp-border/50"
                    />
                  ))}
                </div>
              </div>
              {/* Top lid */}
              <div
                className="absolute left-1/2 top-[26%] h-[22%] w-[58%] -translate-x-1/2 rounded-md border border-white/12 bg-gradient-to-b from-cmp-surface-strong to-cmp-surface shadow-lg"
                style={{ transform: "translate(-50%, 0) translateZ(44px) rotateX(8deg)" }}
              >
                <div className="absolute inset-x-4 top-1.5 h-px bg-gradient-to-r from-transparent via-cmp-accent/50 to-transparent" />
                <p className="absolute inset-0 flex items-center justify-center font-mono text-[10px] font-medium tracking-[0.35em] text-cmp-muted/90 sm:text-xs">
                  CMP
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Orbiting signal */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div
            className="h-[88%] w-[88%] rounded-full border border-cmp-accent/10 opacity-70"
            style={{ animation: "cmp-orbit 22s linear infinite reverse" }}
          >
            <span className="absolute left-1/2 top-0 block h-2 w-2 -translate-x-1/2 rounded-full bg-cmp-accent shadow-[0_0_14px_rgb(45_212_191/0.9)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

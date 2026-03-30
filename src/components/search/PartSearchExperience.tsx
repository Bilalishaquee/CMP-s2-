"use client";

import { SAMPLE_PART_CHIPS, suggestPrefixes } from "@/data/parts";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { cn } from "@/lib/cn";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { Clock, Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

type UiState = "empty" | "typing" | "loading" | "ready";

export function PartSearchExperience({
  large = false,
  showOnboarding = false,
}: {
  large?: boolean;
  showOnboarding?: boolean;
}) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [ui, setUi] = useState<UiState>("empty");
  const [recent, setRecent] = useLocalStorage<string[]>("cmp_recent_searches", []);
  const [dismissOnboarding, setDismissOnboarding] = useLocalStorage("cmp_onboarding_dismiss", false);

  const suggestions = useMemo(() => suggestPrefixes(q), [q]);

  function pushSearch(term: string) {
    const t = term.trim();
    if (!t) return;
    setRecent((prev) => {
      const next = [t, ...prev.filter((x) => x !== t)].slice(0, 8);
      return next;
    });
    router.push(`/search/results?q=${encodeURIComponent(t)}`);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (q.trim().length < 2) return;
    setUi("loading");
    window.setTimeout(() => {
      setUi("ready");
      pushSearch(q);
    }, 900);
  }

  const showSuggest = q.length >= 4 && suggestions.length > 0 && open;

  return (
    <div className="relative w-full max-w-2xl">
      {showOnboarding && !dismissOnboarding && (
        <div className="mb-3 rounded-lg border border-cmp-accent/30 bg-cmp-accent/10 px-3 py-2 text-sm text-cmp-text">
          <div className="flex items-start justify-between gap-2">
            <p>
              <strong className="font-semibold">Tip:</strong> enter at least four characters to see prefix
              suggestions. Results show Option A (DigiKey), B (LCSC), and C (Zephyr) for evaluation.
            </p>
            <button
              type="button"
              className="shrink-0 text-xs font-medium text-cmp-accent-dim underline"
              onClick={() => setDismissOnboarding(true)}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
      <form onSubmit={onSubmit} className="relative">
        <div
          className={cn(
            "relative rounded-xl border bg-cmp-bg-elevated shadow-sm transition",
            open ? "border-cmp-accent/45 ring-2 ring-cmp-accent/20" : "border-cmp-border",
            large && "shadow-md",
          )}
        >
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cmp-muted"
            aria-hidden
          />
          <input
            value={q}
            onFocus={() => setOpen(true)}
            onBlur={() => window.setTimeout(() => setOpen(false), 180)}
            onChange={(e) => {
              setQ(e.target.value.toUpperCase());
              setUi(e.target.value.length > 0 ? "typing" : "empty");
            }}
            placeholder="Enter exact part number or start typing to see prefix matches"
            className={cn(
              "w-full rounded-xl border-0 bg-transparent py-4 pl-12 pr-4 font-mono text-cmp-text placeholder:text-cmp-muted focus:outline-none focus:ring-0",
              large ? "text-lg" : "text-base",
            )}
            aria-label="Part number"
            aria-autocomplete="list"
          />
          {ui === "loading" && (
            <div className="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2 text-sm text-cmp-muted">
              <Loader2 className="h-4 w-4 animate-spin" />
              Searching…
            </div>
          )}
        </div>
        <p className="mt-2 text-sm text-cmp-muted">
          Enter exact part number or start typing to see prefix matches. Results are candidate recommendations for
          evaluation—not guaranteed drop-in replacements.
        </p>

        {showSuggest && (
          <ul
            className="absolute z-20 mt-1 max-h-64 w-full overflow-auto rounded-lg border border-cmp-border bg-cmp-bg-elevated py-1 shadow-lg"
            role="listbox"
          >
            {suggestions.map((s) => (
              <li key={s.part}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm hover:bg-cmp-surface-strong"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    setQ(s.part);
                    pushSearch(s.part);
                  }}
                >
                  <span className="font-mono font-medium text-cmp-text">{s.part}</span>
                  <span className="text-xs text-cmp-muted">{s.mfr}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </form>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-cmp-border bg-cmp-bg-elevated p-4 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-semibold text-cmp-text">
            <Clock className="h-4 w-4 text-cmp-muted" />
            Recent searches
          </div>
          {recent.length === 0 ? (
            <p className="mt-2 text-sm text-cmp-muted">No recent searches in this browser session.</p>
          ) : (
            <ul className="mt-3 space-y-1">
              {recent.map((r) => (
                <li key={r}>
                  <button
                    type="button"
                    className="w-full rounded-md px-2 py-1.5 text-left font-mono text-sm text-cmp-accent-dim hover:bg-cmp-surface-strong"
                    onClick={() => pushSearch(r)}
                  >
                    {r}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="rounded-xl border border-cmp-border bg-cmp-bg-elevated p-4 shadow-sm">
          <p className="text-sm font-semibold text-cmp-text">Popular sample parts</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {SAMPLE_PART_CHIPS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => pushSearch(p)}
                className="rounded-full border border-cmp-border bg-cmp-surface-strong px-3 py-1 font-mono text-xs font-medium text-cmp-text hover:border-cmp-border hover:bg-cmp-bg-elevated"
              >
                {p}
              </button>
            ))}
          </div>
          <div className="mt-4">
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => {
                setUi("loading");
                window.setTimeout(() => {
                  setUi("empty");
                  router.push("/search/results?q=STM32F407VGT6&scenario=bc");
                }, 700);
              }}
            >
              Demo partial-results state
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

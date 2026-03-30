"use client";

import { MOCK_BOM_LINES } from "@/data/bom";
import { getSearchResults } from "@/data/parts";
import { cn } from "@/lib/cn";
import type { BomLine } from "@/types";
import { useToast } from "@/context/toast-context";
import { useCart } from "@/context/cart-context";
import {
  ChevronDown,
  ChevronRight,
  FileSpreadsheet,
  Loader2,
  ShieldCheck,
  UploadCloud,
} from "lucide-react";
import Link from "next/link";
import { Fragment, useCallback, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ResultOptionCard } from "@/components/results/ResultOptionCard";

type JobPhase = "idle" | "uploading" | "validating" | "processing" | "completed";

export function BomUploadClient() {
  const { show } = useToast();
  const { addLine } = useCart();
  const [phase, setPhase] = useState<JobPhase>("idle");
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState<string | null>(null);
  const [lines, setLines] = useState<BomLine[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null);

  const runJob = useCallback(() => {
    setPhase("uploading");
    setProgress(5);
    const steps: { phase: JobPhase; p: number; delay: number }[] = [
      { phase: "uploading", p: 25, delay: 500 },
      { phase: "validating", p: 45, delay: 700 },
      { phase: "processing", p: 88, delay: 900 },
      { phase: "completed", p: 100, delay: 600 },
    ];
    let i = 0;
    const tick = () => {
      if (i >= steps.length) {
        setLines(MOCK_BOM_LINES);
        show("BOM processed — review line matches below.", "success");
        return;
      }
      const s = steps[i];
      window.setTimeout(() => {
        setPhase(s.phase);
        setProgress(s.p);
        i += 1;
        tick();
      }, s.delay);
    };
    tick();
  }, [show]);

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) {
      setFileName(f.name);
      runJob();
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-cmp-muted">Batch sourcing</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-cmp-text">BOM upload</h1>
          <p className="mt-2 max-w-2xl text-sm text-cmp-muted">
            Upload a CSV or XLSX bill of materials. Required column: Part Number. Max 5MB / 200 lines (prototype
            limits).
          </p>
        </div>
        <Badge tone="neutral" className="h-fit">
          Validation is client-side mock only
        </Badge>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
          className={cn(
            "rounded-xl border-2 border-dashed border-cmp-border bg-cmp-bg-elevated p-10 text-center shadow-sm transition hover:border-cmp-muted",
            phase !== "idle" && phase !== "completed" && "pointer-events-none opacity-70",
          )}
        >
          <UploadCloud className="mx-auto h-10 w-10 text-cmp-muted" />
          <p className="mt-4 text-sm font-medium text-cmp-text">Drag and drop BOM file</p>
          <p className="mt-1 text-xs text-cmp-muted">CSV, XLSX · Max 5MB · Max 200 line items</p>
          <label className="mt-6 inline-flex cursor-pointer items-center justify-center rounded-md bg-teal-950 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-900">
            <input
              type="file"
              accept=".csv,.xlsx"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) {
                  setFileName(f.name);
                  runJob();
                }
              }}
            />
            Choose file
          </label>
          <p className="mt-6 flex items-start justify-center gap-2 text-left text-xs text-cmp-muted">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-cmp-muted" />
            Files are validated for structure in this prototype. Production would scan for macros and enforce
            enterprise policies.
          </p>
        </div>

        <aside className="space-y-4 rounded-xl border border-cmp-border bg-cmp-bg-elevated p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-cmp-text">Requirements</h2>
          <ul className="space-y-2 text-sm text-cmp-muted">
            <li>• Required column: Part Number</li>
            <li>• Optional: Qty, Reference Designator</li>
            <li>• Encoding: UTF-8 recommended</li>
          </ul>
          <div className="rounded-lg bg-cmp-surface-strong p-3 text-xs text-cmp-muted">
            Demo file: <span className="font-mono">prototype-bom.csv</span> (use any CSV for the mock flow)
          </div>
        </aside>
      </div>

      {fileName && (
        <div className="mt-8 rounded-xl border border-cmp-border bg-cmp-bg-elevated p-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <FileSpreadsheet className="h-8 w-8 text-cmp-muted" />
              <div>
                <p className="font-medium text-cmp-text">{fileName}</p>
                <p className="text-xs text-cmp-muted">Uploaded in prototype — no server persistence</p>
              </div>
            </div>
            <Badge tone={phase === "completed" ? "success" : "warning"}>
              {phase === "idle" && "Ready"}
              {phase === "uploading" && "Uploading"}
              {phase === "validating" && "Validating"}
              {phase === "processing" && "Processing"}
              {phase === "completed" && "Completed"}
            </Badge>
          </div>
          <div className="mt-4">
            <div className="h-2 overflow-hidden rounded-full bg-cmp-surface-strong">
              <div
                className="h-full rounded-full bg-teal-950 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-2 flex justify-between text-xs text-cmp-muted">
              <span>
                {phase === "uploading" && "Uploading bytes…"}
                {phase === "validating" && "Validating columns & line count…"}
                {phase === "processing" && "Matching A/B/C options per line…"}
                {phase === "completed" && "Done — results below"}
                {phase === "idle" && "Idle"}
              </span>
              <span>{progress}%</span>
            </div>
          </div>
          {phase !== "idle" && phase !== "completed" && (
            <div className="mt-3 flex items-center gap-2 text-sm text-cmp-muted">
              <Loader2 className="h-4 w-4 animate-spin" />
              Simulated polling — per-line matching in progress
            </div>
          )}
        </div>
      )}

      {lines.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-cmp-text">BOM results</h2>
          <p className="mt-1 text-sm text-cmp-muted">
            Line-level Options A/B/C mirror the search experience. Expand a row for technical cards.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-cmp-border bg-cmp-bg-elevated shadow-sm">
            <table className="min-w-[1100px] w-full border-collapse text-left text-sm">
              <thead className="border-b border-cmp-border bg-cmp-surface-strong text-xs font-semibold uppercase tracking-wide text-cmp-muted">
                <tr>
                  <th className="px-3 py-3">Line</th>
                  <th className="px-3 py-3">Part Number</th>
                  <th className="px-3 py-3">Qty</th>
                  <th className="px-3 py-3">Ref Des</th>
                  <th className="px-3 py-3">Option A</th>
                  <th className="px-3 py-3">Option B</th>
                  <th className="px-3 py-3">Option C</th>
                  <th className="px-3 py-3">Best score</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="px-3 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cmp-border/50">
                {lines.map((row) => {
                  const open = expanded === row.line;
                  const bundle = getSearchResults(row.partNumber);
                  return (
                    <Fragment key={row.line}>
                      <tr className="hover:bg-cmp-surface-strong/80">
                        <td className="px-3 py-3 font-mono text-xs text-cmp-text">{row.line}</td>
                        <td className="px-3 py-3 font-mono text-xs font-medium text-cmp-text">{row.partNumber}</td>
                        <td className="px-3 py-3 tabular-nums">{row.qty}</td>
                        <td className="px-3 py-3 text-xs text-cmp-text">{row.refDes}</td>
                        <td className="px-3 py-3 text-xs text-cmp-text">{row.optionA}</td>
                        <td className="px-3 py-3 text-xs text-cmp-text">{row.optionB}</td>
                        <td className="px-3 py-3 text-xs text-cmp-text">{row.optionC}</td>
                        <td className="px-3 py-3 font-semibold tabular-nums text-cmp-text">{row.bestScore}%</td>
                        <td className="px-3 py-3">
                          <Badge tone={row.status === "Ready" ? "success" : "warning"}>{row.status}</Badge>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex flex-wrap gap-2">
                            <Button
                              variant="secondary"
                              className="px-2 py-1 text-xs"
                              onClick={() => setExpanded(open ? null : row.line)}
                            >
                              {open ? (
                                <>
                                  <ChevronDown className="h-3 w-3" /> Hide
                                </>
                              ) : (
                                <>
                                  <ChevronRight className="h-3 w-3" /> View matches
                                </>
                              )}
                            </Button>
                            <Button
                              className="px-2 py-1 text-xs"
                              onClick={() => {
                                const c = bundle.optionC ?? bundle.optionB ?? bundle.optionA;
                                if (c) {
                                  addLine(c, row.qty, row.partNumber);
                                  show(`Added ${c.partNumber} (preferred line) to cart`, "success");
                                }
                              }}
                            >
                              Add preferred
                            </Button>
                            <Link
                              href={`/search/results?q=${encodeURIComponent(row.partNumber)}`}
                              className="text-xs font-medium text-cmp-accent-dim hover:underline"
                            >
                              Open search
                            </Link>
                          </div>
                        </td>
                      </tr>
                      {open && (
                        <tr className="bg-cmp-surface-strong/60">
                          <td colSpan={10} className="px-4 py-6">
                            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                              {bundle.optionA && (
                                <ResultOptionCard offer={bundle.optionA} searchedQuery={row.partNumber} />
                              )}
                              {bundle.optionB && (
                                <ResultOptionCard offer={bundle.optionB} searchedQuery={row.partNumber} />
                              )}
                              {bundle.optionC && (
                                <ResultOptionCard
                                  offer={bundle.optionC}
                                  searchedQuery={row.partNumber}
                                  emphasizePreferred
                                />
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/Button";
import { useToast } from "@/context/toast-context";
import { cn } from "@/lib/cn";
import { Lock, Mail, Sparkles, X } from "lucide-react";
import { useEffect } from "react";

type Mode = "signin" | "register";

export function SignInModal({
  open,
  mode,
  onClose,
  onModeChange,
}: {
  open: boolean;
  mode: Mode;
  onClose: () => void;
  onModeChange: (m: Mode) => void;
}) {
  const { show } = useToast();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    show(
      mode === "signin"
        ? "Sign-in simulated — no backend in this prototype."
        : "Account creation simulated — no backend in this prototype.",
      "success",
    );
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-[3px] transition-opacity"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-cmp-border bg-cmp-bg-elevated shadow-[var(--cmp-shadow-modal)]"
      >
        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-cmp-accent/25 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 h-36 w-36 rounded-full bg-cmp-violet/15 blur-3xl" />
        <div className="relative border-b border-cmp-border/50 bg-gradient-to-r from-cmp-surface-strong to-cmp-accent/10 px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="cmp-auth-mark flex h-10 w-10 items-center justify-center rounded-xl text-white">
                <Sparkles className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p id="auth-title" className="text-lg font-semibold tracking-tight text-cmp-text">
                  {mode === "signin" ? "Welcome back" : "Create account"}
                </p>
                <p className="text-sm text-cmp-muted">CrossMyPart · prototype authentication</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-cmp-muted transition hover:bg-cmp-bg-elevated/80 hover:text-cmp-text"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-4 flex rounded-lg bg-cmp-bg-elevated/70 p-1 shadow-cmp-inner ring-1 ring-cmp-border">
            <button
              type="button"
              onClick={() => onModeChange("signin")}
              className={cn(
                "flex-1 rounded-md px-3 py-2 text-sm font-medium transition",
                mode === "signin"
                  ? "bg-cmp-bg-elevated text-cmp-text shadow-cmp-sm"
                  : "text-cmp-muted hover:text-cmp-text",
              )}
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => onModeChange("register")}
              className={cn(
                "flex-1 rounded-md px-3 py-2 text-sm font-medium transition",
                mode === "register"
                  ? "bg-cmp-bg-elevated text-cmp-text shadow-cmp-sm"
                  : "text-cmp-muted hover:text-cmp-text",
              )}
            >
              Register
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="relative space-y-4 px-6 py-6">
          <label className="block">
            <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-cmp-muted">
              <Mail className="h-3.5 w-3.5" />
              Work email
            </span>
            <input
              type="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              className="w-full rounded-xl border border-cmp-border bg-cmp-surface-strong/80 px-4 py-2.5 text-sm text-cmp-text shadow-cmp-inner transition placeholder:text-cmp-muted focus:border-cmp-accent/50 focus:bg-cmp-bg-elevated focus:outline-none focus:ring-2 focus:ring-cmp-accent/30"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-cmp-muted">
              <Lock className="h-3.5 w-3.5" />
              Password
            </span>
            <input
              type="password"
              required
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              placeholder="••••••••"
              className="w-full rounded-xl border border-cmp-border bg-cmp-surface-strong/80 px-4 py-2.5 text-sm text-cmp-text shadow-cmp-inner transition placeholder:text-cmp-muted focus:border-cmp-accent/50 focus:bg-cmp-bg-elevated focus:outline-none focus:ring-2 focus:ring-cmp-accent/30"
            />
          </label>
          {mode === "register" && (
            <label className="block">
              <span className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-cmp-muted">Company</span>
              <input
                type="text"
                placeholder="Organization name"
                className="w-full rounded-xl border border-cmp-border bg-cmp-surface-strong/80 px-4 py-2.5 text-sm text-cmp-text shadow-cmp-inner transition focus:border-cmp-accent/50 focus:bg-cmp-bg-elevated focus:outline-none focus:ring-2 focus:ring-cmp-accent/30"
              />
            </label>
          )}
          <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:justify-end">
            <Button type="button" variant="secondary" className="sm:order-1" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="sm:order-2">
              {mode === "signin" ? "Sign in" : "Create account"}
            </Button>
          </div>
          <p className="text-center text-xs text-cmp-muted">
            No accounts are stored. This flow demonstrates UX only.
          </p>
        </form>
      </div>
    </div>
  );
}

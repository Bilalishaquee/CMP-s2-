"use client";

import { useCallback, useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValueState] = useState<T>(initial);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw) as T;
        queueMicrotask(() => setValueState(parsed));
      }
    } catch {
      /* ignore */
    }
    queueMicrotask(() => setReady(true));
  }, [key]);

  const setValue = useCallback((next: T | ((prev: T) => T)) => {
    setValueState((prev) => {
      const resolved = typeof next === "function" ? (next as (p: T) => T)(prev) : next;
      return resolved;
    });
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* ignore */
    }
  }, [key, value, ready]);

  return [value, setValue, ready] as const;
}

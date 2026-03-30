"use client";

import type { CartLine, PartOffer } from "@/types";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type CartContextValue = {
  lines: CartLine[];
  addLine: (offer: PartOffer, quantity?: number, queryContext?: string) => void;
  removeLine: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function makeId() {
  return `line_${Math.random().toString(36).slice(2, 10)}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  const addLine = useCallback((offer: PartOffer, quantity = 1, queryContext?: string) => {
    setLines((prev) => {
      const existing = prev.find(
        (l) => l.offer.partNumber === offer.partNumber && l.offer.option === offer.option,
      );
      if (existing) {
        return prev.map((l) =>
          l.id === existing.id ? { ...l, quantity: l.quantity + quantity } : l,
        );
      }
      return [...prev, { id: makeId(), offer, quantity, queryContext }];
    });
  }, []);

  const removeLine = useCallback((id: string) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const setQuantity = useCallback((id: string, quantity: number) => {
    setLines((prev) =>
      prev
        .map((l) => (l.id === id ? { ...l, quantity: Math.max(1, quantity) } : l))
        .filter((l) => l.quantity > 0),
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo(
    () => ({ lines, addLine, removeLine, setQuantity, clear }),
    [lines, addLine, removeLine, setQuantity, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

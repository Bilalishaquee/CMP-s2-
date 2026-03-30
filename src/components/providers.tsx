"use client";

import { AuthModalProvider } from "@/context/auth-modal-context";
import { CartProvider } from "@/context/cart-context";
import { ThemeProvider } from "@/context/theme-context";
import { ToastProvider } from "@/context/toast-context";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthModalProvider>
          <CartProvider>{children}</CartProvider>
        </AuthModalProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

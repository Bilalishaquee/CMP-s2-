"use client";

import { SignInModal } from "@/components/auth/SignInModal";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type AuthMode = "signin" | "register";

type AuthModalContextValue = {
  open: (mode?: AuthMode) => void;
  close: () => void;
};

const AuthModalContext = createContext<AuthModalContextValue | null>(null);

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>("signin");

  const openModal = useCallback((m: AuthMode = "signin") => {
    setMode(m);
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => setOpen(false), []);

  const value = useMemo(() => ({ open: openModal, close: closeModal }), [openModal, closeModal]);

  return (
    <AuthModalContext.Provider value={value}>
      {children}
      <SignInModal open={open} mode={mode} onClose={closeModal} onModeChange={setMode} />
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const ctx = useContext(AuthModalContext);
  if (!ctx) throw new Error("useAuthModal must be used within AuthModalProvider");
  return ctx;
}

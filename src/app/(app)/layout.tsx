import { AppFooter } from "@/components/layout/AppFooter";
import { AppHeader } from "@/components/layout/AppHeader";
import type { ReactNode } from "react";

export default function AppShellLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AppHeader />
      <main className="relative flex-1 min-h-[60vh]">{children}</main>
      <AppFooter />
    </>
  );
}

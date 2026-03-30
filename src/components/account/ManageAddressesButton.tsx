"use client";

import { useToast } from "@/context/toast-context";

export function ManageAddressesButton() {
  const { show } = useToast();
  return (
    <button
      type="button"
      className="mt-4 text-sm font-semibold text-cmp-accent-dim underline decoration-cmp-accent/50 underline-offset-2 hover:text-cmp-text"
      onClick={() => show("Address book editing is a UI preview — no data is saved.", "success")}
    >
      Manage addresses
    </button>
  );
}

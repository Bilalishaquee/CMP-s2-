"use client";

import { useToast } from "@/context/toast-context";

const items = [
  { label: "Security", body: "Security overview: SOC-style controls are illustrative in this prototype." },
  { label: "Terms", body: "Terms of use would be linked from production. Not applicable in the demo." },
  { label: "Privacy", body: "Privacy policy placeholder — no personal data is persisted in this build." },
];

export function FooterLegal() {
  const { show } = useToast();

  return (
    <div className="flex flex-wrap gap-x-8 gap-y-2">
      {items.map((item) => (
        <button
          key={item.label}
          type="button"
          onClick={() => show(`${item.label}: ${item.body}`, "success")}
          className="font-medium text-cmp-muted transition hover:text-cmp-text"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

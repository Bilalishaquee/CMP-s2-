import { PartSearchExperience } from "@/components/search/PartSearchExperience";

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-cmp-text">Part number search</h1>
        <p className="mt-2 text-cmp-muted">
          Enter exact part number or start typing to see prefix matches. Results are recommendations for evaluation.
        </p>
      </div>
      <div className="mt-10">
        <PartSearchExperience large showOnboarding />
      </div>
    </div>
  );
}

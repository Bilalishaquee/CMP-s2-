import { ResultsPageClient } from "@/components/results/ResultsPageClient";
import { SearchSkeleton } from "@/components/search/SearchSkeleton";
import { Suspense } from "react";

export default function SearchResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
          <SearchSkeleton />
        </div>
      }
    >
      <ResultsPageClient />
    </Suspense>
  );
}

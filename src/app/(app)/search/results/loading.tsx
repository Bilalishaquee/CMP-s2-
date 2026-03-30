import { SearchSkeleton } from "@/components/search/SearchSkeleton";

export default function SearchResultsLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <SearchSkeleton />
    </div>
  );
}

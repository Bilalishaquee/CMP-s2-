import { SeoPreview } from "@/components/results/SeoPreview";
import { getSearchResults } from "@/data/parts";

export default function SeoPreviewPage() {
  const bundle = getSearchResults("MT25QU512ABB");
  const primary = bundle.optionA!;
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 lg:px-8">
      <h1 className="text-2xl font-semibold text-cmp-text">SEO module (prototype)</h1>
      <p className="mt-2 text-sm text-cmp-muted">
        Demonstrates how public part pages could expose canonical URLs, titles, and structured data for crawlers.
      </p>
      <div className="mt-8">
        <SeoPreview query="MT25QU512ABB" primary={primary} />
      </div>
    </div>
  );
}

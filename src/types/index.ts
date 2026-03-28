export type MatchStatus = "match" | "compatible" | "different";

export type AttributeComparison = {
  name: string;
  searchedValue: string;
  candidateValue: string;
  status: MatchStatus;
};

export type SupplierKey = "A" | "B" | "C";

export type PartOffer = {
  option: SupplierKey;
  label: string;
  supplierName: string;
  supplierBadge: string;
  tag: string;
  partNumber: string;
  manufacturer: string;
  specs: string[];
  price: number;
  currency: string;
  stock: number;
  datasheetUrl: string;
  matchScore?: number;
  attributes?: AttributeComparison[];
  disclosure?: string;
  isIndicativePricing: boolean;
};

export type SearchResultBundle = {
  query: string;
  banner?: "no_exact" | "partial" | null;
  partialMessage?: string;
  optionA?: PartOffer;
  optionB?: PartOffer;
  optionC?: PartOffer;
};

export type CartLine = {
  id: string;
  offer: PartOffer;
  quantity: number;
  queryContext?: string;
};

export type BomLine = {
  line: number;
  partNumber: string;
  qty: number;
  refDes: string;
  optionA: string;
  optionB: string;
  optionC: string;
  bestScore: number;
  status: "Ready" | "Review" | "No match";
};

export type MockOrder = {
  id: string;
  date: string;
  status: "Delivered" | "Shipped" | "Processing" | "Placed";
  items: number;
  supplierMix: string;
  total: number;
};

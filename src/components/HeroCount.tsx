"use client";

import { useGetPropertyFacetsQuery } from "@/services/propertyApi";

/**
 * Live count of available listings for a category, shown inline in the hero
 * subtitle ("We have {count} available …"). Sums the facet counts by property
 * type, which equals the total active listings for that listing type.
 */
export default function HeroCount({ listingType }: { listingType?: "RENT" | "BUY" | "SHORTLET" }) {
  const { data, isLoading } = useGetPropertyFacetsQuery(listingType ? { listingType } : undefined);
  const total = (data?.byPropertyType ?? []).reduce((sum, f) => sum + f.count, 0);
  return <span className="font-semibold">{isLoading ? "…" : total.toLocaleString()}</span>;
}

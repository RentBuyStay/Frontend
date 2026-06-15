"use client";

import { useSearchParams } from "next/navigation";
import { useGetActivePropertiesQuery } from "@/services/propertyApi";
import { toListingCard } from "@/lib/propertyMap";
import ListingCard from "./ListingCard";
import ListingsHeader from "./ListingsHeader";
import Pagination from "./Pagination";

const PAGE_SIZE = 10;

/**
 * Left column of the listing pages — reads the search/filter params from the URL
 * (set by the SearchBar / FilterModal) and renders live results from GET /properties.
 */
export default function ListingResults({
  listingType,
  tag,
  title,
}: {
  listingType: "RENT" | "BUY" | "SHORTLET";
  tag: "For Sale" | "For Rent" | "Shortlet";
  title: string;
}) {
  const sp = useSearchParams();
  const num = (k: string) => {
    const v = sp.get(k);
    return v ? Number(v) : undefined;
  };
  const furnished = sp.get("furnished");
  const serviced = sp.get("serviced");
  const shared = sp.get("shared");
  const tri = (v: string | null) => (v === "yes" || v === "furnished" ? true : v === "no" || v === "unfurnished" ? false : undefined);

  const { data, isLoading, isError } = useGetActivePropertiesQuery({
    listingType,
    q: sp.get("q") ?? undefined,
    propertyTypeId: num("type"),
    bedrooms: num("beds"),
    minPrice: num("minPrice"),
    maxPrice: num("maxPrice"),
    state: sp.get("state") ?? undefined,
    city: sp.get("city") ?? undefined,
    isFurnished: furnished === "furnished" ? true : furnished === "unfurnished" ? false : undefined,
    isServiced: tri(serviced),
    isShared: tri(shared),
    listedWithinDays: num("listedWithinDays"),
    size: PAGE_SIZE,
  });

  // Public list — only show approved listings.
  const items = (data?.content ?? []).filter((p) => p.status === "ACTIVE");
  const total = data?.totalElements ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const count = isLoading
    ? "Loading…"
    : total > 0
      ? `Showing 1 - ${items.length} of ${total}`
      : "No properties found";

  return (
    <div className="flex flex-col gap-6 min-w-0">
      <ListingsHeader title={title} count={count} />

      {isLoading ? (
        <div className="flex flex-col gap-6">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-[200px] rounded-[20px] border border-[#f6f6f6] bg-[#fafafa] animate-pulse" />
          ))}
        </div>
      ) : isError ? (
        <div className="rounded-[20px] border border-[#f6f6f6] bg-[#fafafa] py-16 text-center">
          <p className="text-[14px] text-[#807e7e]">Couldn&rsquo;t load listings right now. Please try again later.</p>
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-[20px] border border-[#f6f6f6] bg-[#fafafa] py-16 text-center">
          <p className="text-[14px] text-[#807e7e]">No properties match your search yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {items.map((p) => (
            <ListingCard key={p.id} listing={toListingCard(p)} tag={tag} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination current={1} totalPages={totalPages} />
        </div>
      )}
    </div>
  );
}

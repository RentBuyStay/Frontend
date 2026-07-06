"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import { useGetActivePropertiesQuery, type PropertyQuery } from "@/services/propertyApi";
import { toPropertyCard } from "@/lib/propertyMap";
import PropertyCard from "./PropertyCard";

const PAGE_SIZE = 24;

const SORTS: { label: string; value: PropertyQuery["sort"] }[] = [
  { label: "Newest First", value: "newest" },
  { label: "Price: Low to High", value: "priceAsc" },
  { label: "Price: High to Low", value: "priceDesc" },
];

/** Live search results — reads filters from the URL (q, state, type, beds, price,
 * furnished/serviced/shared, listingType) and renders GET /properties. */
export default function SearchResults() {
  const sp = useSearchParams();
  const [sort, setSort] = useState<PropertyQuery["sort"]>("newest");

  const num = (k: string) => {
    const v = sp.get(k);
    return v ? Number(v) : undefined;
  };
  const tri = (v: string | null) =>
    v === "yes" || v === "furnished" ? true : v === "no" || v === "unfurnished" ? false : undefined;

  const listingType = (sp.get("listingType")?.toUpperCase() ?? undefined) as PropertyQuery["listingType"];
  const state = sp.get("state") ?? undefined;

  const { data, isLoading, isError } = useGetActivePropertiesQuery({
    q: sp.get("q") ?? undefined,
    state,
    city: sp.get("city") ?? undefined,
    listingType,
    propertyTypeId: num("type"),
    bedrooms: num("beds"),
    minPrice: num("minPrice"),
    maxPrice: num("maxPrice"),
    isFurnished: tri(sp.get("furnished")),
    isServiced: tri(sp.get("serviced")),
    isShared: tri(sp.get("shared")),
    listedWithinDays: num("listedWithinDays"),
    sort,
    size: PAGE_SIZE,
  });

  const items = (data?.content ?? []).filter((p) => p.status === "ACTIVE");
  const total = data?.totalElements ?? 0;
  const where = state ? ` in ${state.charAt(0).toUpperCase()}${state.slice(1)}` : "";

  return (
    <section className="py-10 flex-1 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-[#7f7e7e]">
            {isLoading ? (
              "Loading…"
            ) : (
              <>
                Showing <span className="font-semibold text-[#121212]">{total}</span> result{total === 1 ? "" : "s"}
                {where}
              </>
            )}
          </p>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 text-sm border border-[#ededed] rounded-lg px-4 py-2 bg-white hover:border-[#305e82] transition-colors">
              <SlidersHorizontal size={15} />
              Filters
            </button>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as PropertyQuery["sort"])}
              className="text-sm border border-[#ededed] rounded-lg px-3 py-2 outline-none bg-white"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-[320px] rounded-[16px] border border-[#ededed] bg-white animate-pulse" />
            ))}
          </div>
        ) : isError ? (
          <div className="rounded-[16px] border border-[#ededed] bg-white py-16 text-center">
            <p className="text-sm text-[#7f7e7e]">Couldn&rsquo;t load results right now. Please try again later.</p>
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-[16px] border border-[#ededed] bg-white py-16 text-center">
            <p className="text-sm text-[#7f7e7e]">No properties found{where}.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {items.map((p) => (
              <PropertyCard key={p.id} property={toPropertyCard(p)} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

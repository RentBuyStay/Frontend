"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import { useGetActivePropertiesQuery, type PropertyQuery } from "@/services/propertyApi";
import { pageTotal } from "@/services/types";
import { toPropertyCard } from "@/lib/propertyMap";
import { resolveLocationQuery } from "@/lib/locationQuery";
import PropertyCard from "./PropertyCard";
import FilterModal, { type AppliedFilters } from "./FilterModal";

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
  const router = useRouter();
  const [sort, setSort] = useState<PropertyQuery["sort"]>("newest");
  const [showFilterModal, setShowFilterModal] = useState(false);

  // Apply the modal's filters by merging them into the current /search URL —
  // this component already reads every filter from there.
  function applyModalFilters(f: AppliedFilters) {
    const params = new URLSearchParams(window.location.search);
    const setOrDel = (k: string, v?: string) => (v ? params.set(k, v) : params.delete(k));
    // Resolve a location keyword to `state` + leftover `q`, same as the search bar.
    if (f.q && f.q.trim()) {
      const loc = resolveLocationQuery(f.q);
      setOrDel("q", loc.q);
      setOrDel("state", loc.state);
    } else {
      params.delete("q");
    }
    setOrDel("type", f.propertyTypeId != null ? String(f.propertyTypeId) : "");
    setOrDel("beds", f.bedrooms != null ? String(f.bedrooms) : "");
    setOrDel("minPrice", f.minPrice != null ? String(f.minPrice) : "");
    setOrDel("maxPrice", f.maxPrice != null ? String(f.maxPrice) : "");
    setOrDel("furnished", f.isFurnished != null ? (f.isFurnished ? "furnished" : "unfurnished") : "");
    setOrDel("serviced", f.isServiced != null ? (f.isServiced ? "yes" : "no") : "");
    setOrDel("shared", f.isShared != null ? (f.isShared ? "yes" : "no") : "");
    setOrDel("listedWithinDays", f.listedWithinDays != null ? String(f.listedWithinDays) : "");
    params.delete("page");
    router.push(`/search?${params.toString()}`, { scroll: false });
  }

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
  const total = pageTotal(data);
  const where = state ? ` in ${state.charAt(0).toUpperCase()}${state.slice(1)}` : "";

  // When the filters match nothing, suggest other available listings instead of a
  // dead end — fetched only in that case.
  const hasFilters = [
    "q", "type", "beds", "minPrice", "maxPrice", "state", "city", "listingType",
    "furnished", "serviced", "shared", "listedWithinDays",
  ].some((k) => sp.get(k));
  const noResults = !isLoading && !isError && items.length === 0;
  const { data: fbData } = useGetActivePropertiesQuery(
    { sort, size: PAGE_SIZE } satisfies PropertyQuery,
    { skip: !(noResults && hasFilters) },
  );
  const fallbackItems = (fbData?.content ?? []).filter((p) => p.status === "ACTIVE");
  const showFallback = noResults && hasFilters && fallbackItems.length > 0;

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
            <button
              type="button"
              onClick={() => setShowFilterModal(true)}
              className="flex items-center gap-2 text-sm border border-[#ededed] rounded-lg px-4 py-2 bg-white hover:border-[#305e82] transition-colors"
            >
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
          showFallback ? (
            <div className="flex flex-col gap-4">
              <div className="rounded-[16px] border border-[#ededed] bg-white px-5 py-4 flex items-center gap-3">
                <span
                  aria-hidden
                  className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full"
                  style={{ background: "rgba(48,94,130,0.08)" }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="11" cy="11" r="7" stroke="#305E82" strokeWidth="1.6" />
                    <path d="M20 20L16.65 16.65" stroke="#305E82" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </span>
                <div className="flex flex-col min-w-0">
                  <p className="text-[14px] font-semibold text-[#121212]" style={{ letterSpacing: "-0.02em" }}>
                    No exact matches{where}
                  </p>
                  <p className="text-[13px] leading-[20px] text-[#807e7e]">
                    Here are other available listings you might like.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {fallbackItems.map((p) => (
                  <PropertyCard key={p.id} property={toPropertyCard(p)} />
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-[16px] border border-[#ededed] bg-white py-16 text-center">
              <p className="text-sm text-[#7f7e7e]">No properties found{where}.</p>
            </div>
          )
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {items.map((p) => (
              <PropertyCard key={p.id} property={toPropertyCard(p)} />
            ))}
          </div>
        )}
      </div>

      <FilterModal
        open={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApply={applyModalFilters}
      />
    </section>
  );
}

"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { resolveLocationQuery } from "@/lib/locationQuery";
import { useGetPropertyTypesQuery } from "@/services/referenceApi";

/* Request search reuses the look of the hero search bar, but scoped to the
 * property-REQUESTS list: it stays on /property-requests and only exposes the
 * filters the public GET /property-requests endpoint actually supports —
 * listing type, property type and state. A typed location keyword is resolved to
 * the exact `state` filter (requests have no free-text keyword match), so we don't
 * surface controls that would silently do nothing (bedrooms / price / furnished). */

const GRADIENT = "linear-gradient(175deg, rgba(117,163,199,1) 0%, rgba(48,94,130,1) 100%)";
/* Solid brand blue shown on the Search button while a search is in flight. */
const SEARCH_PENDING = "#305E82";

const LISTING_TYPES = [
  { value: "", label: "All listing types" },
  { value: "RENT", label: "Rent" },
  { value: "BUY", label: "Buy" },
  { value: "SHORTLET", label: "Shortlet" },
] as const;

/* Inline spinner for the Search button's in-flight state; inherits the button's white text. */
function Spinner() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" className="animate-spin shrink-0" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.35" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export default function RequestSearch() {
  const router = useRouter();
  const [listingType, setListingType] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [keyword, setKeyword] = useState("");
  const [isPending, startTransition] = useTransition();
  const { data: propertyTypes } = useGetPropertyTypesQuery();

  // Seed the bar from the current URL once on mount so it reflects the active
  // filters after a search. Read from window on the client (not useSearchParams)
  // to avoid an SSR hydration mismatch — the same pattern the hero SearchBar uses.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    /* eslint-disable react-hooks/set-state-in-effect */
    setListingType(p.get("listingType") ?? "");
    setPropertyType(p.get("type") ?? "");
    // Requests filter location by exact `state`, so show that in the keyword box.
    setKeyword(p.get("state") ?? "");
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  // Build the /property-requests URL from the current values and navigate in place.
  // A location keyword is resolved to the exact `state` filter (the only location
  // filter requests support); anything that doesn't name a state simply doesn't
  // narrow the list rather than being sent as a keyword the endpoint can't match.
  function handleSearch() {
    const params = new URLSearchParams();
    if (listingType) params.set("listingType", listingType);
    if (propertyType) params.set("type", propertyType);
    const kw = keyword.trim();
    if (kw) {
      const resolved = resolveLocationQuery(kw);
      if (resolved.state) params.set("state", resolved.state);
    }
    const qs = params.toString();
    startTransition(() => {
      router.push(qs ? `/property-requests?${qs}` : "/property-requests", { scroll: false });
    });
  }

  const selectClass =
    "appearance-none h-full pr-9 text-[14px] text-[#121212] bg-transparent outline-none cursor-pointer";

  const listingSelect = (extra: string) => (
    <div className={`relative shrink-0 bg-[#F6F6F6] rounded-[12px] h-12 flex items-center pl-4 ${extra}`}>
      <select
        aria-label="Listing type"
        value={listingType}
        onChange={(e) => setListingType(e.target.value)}
        className={`${selectClass} w-full`}
        style={{ letterSpacing: "-0.02em" }}
      >
        {LISTING_TYPES.map((t) => (
          <option key={t.value || "all"} value={t.value}>{t.label}</option>
        ))}
      </select>
      <Image src="/icons/arrow-down.svg" alt="" width={16} height={16} className="absolute right-4 pointer-events-none" />
    </div>
  );

  const typeSelect = (extra: string) => (
    <div className={`relative bg-[#F6F6F6] rounded-[12px] h-12 flex items-center pl-4 ${extra}`}>
      <select
        aria-label="Property type"
        value={propertyType}
        onChange={(e) => setPropertyType(e.target.value)}
        className={`${selectClass} w-full`}
        style={{ letterSpacing: "-0.02em" }}
      >
        <option value="">All property types</option>
        {(propertyTypes ?? []).map((t) => (
          <option key={t.id} value={t.id}>{t.displayName}</option>
        ))}
      </select>
      <Image src="/icons/arrow-down.svg" alt="" width={16} height={16} className="absolute right-4 pointer-events-none" />
    </div>
  );

  const keywordInput = (
    <div className="flex items-center gap-2 flex-1 min-w-0 bg-[#F6F6F6] rounded-[12px] h-12 px-4">
      <Image src="/icons/hero-search.svg" alt="" width={20} height={20} className="shrink-0" />
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        placeholder="Enter a state or location..."
        className="flex-1 min-w-0 text-[14px] outline-none text-[#121212] bg-transparent placeholder:text-[12px] placeholder:text-[rgba(128,126,126,0.75)]"
      />
    </div>
  );

  const searchButton = (extra: string) => (
    <button
      type="button"
      onClick={handleSearch}
      disabled={isPending}
      className={`flex items-center justify-center gap-2 text-white text-[14px] font-medium h-12 rounded-[12px] hover:opacity-90 transition-opacity ${extra}`}
      style={{ background: isPending ? SEARCH_PENDING : GRADIENT, border: "1px solid rgba(120,158,187,0.5)" }}
    >
      {isPending && <Spinner />}
      Search
    </button>
  );

  return (
    <div className="w-full">
      {/* ===== MOBILE: compact stacked card ===== */}
      <div className="md:hidden bg-white rounded-[15px] p-2 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          {listingSelect("w-[128px]")}
          {keywordInput}
        </div>
        <div className="flex items-center gap-2">
          {typeSelect("flex-1 min-w-0")}
          {searchButton("shrink-0 w-[112px]")}
        </div>
      </div>

      {/* ===== DESKTOP: single row ===== */}
      <div className="hidden md:flex items-center gap-4 bg-white rounded-[12px] p-6">
        {listingSelect("")}
        {keywordInput}
        {typeSelect("shrink-0 w-[200px]")}
        {searchButton("shrink-0 w-[160px]")}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import FilterModal, { type AppliedFilters } from "./FilterModal";
import LocationAutocomplete from "./LocationAutocomplete";
import { resolveLocationQuery } from "@/lib/locationQuery";
import { useGetPropertyTypesQuery } from "@/services/referenceApi";
import { useGetPropertyFacetsQuery } from "@/services/propertyApi";

const tabs = ["Rent", "Buy", "Shortlet"] as const;
type Tab = (typeof tabs)[number];
type TabOrAll = Tab | "All";

const tabRoutes: Record<Tab, string> = {
  Rent: "/for-rent",
  Buy: "/for-sale",
  Shortlet: "/shortlet",
};

interface SearchBarProps {
  defaultTab?: Tab;
  /** On the /search page, apply filters in place (update the /search URL and keep
   * the current state/city) instead of navigating to a listing page. Adds an
   * "All" listing-type option so a search isn't silently restricted to one type. */
  inPlace?: boolean;
}

const GRADIENT = "linear-gradient(175deg, rgba(117,163,199,1) 0%, rgba(48,94,130,1) 100%)";

/* Filter field — Figma: 12px Medium #121212 label + #F6F6F6 box (value 14px #121212 + arrow-down 16) */
function FilterField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex-1 flex flex-col gap-2 min-w-0">
      <span className="text-[12px] font-medium text-[#121212]" style={{ lineHeight: "20px", letterSpacing: "-0.02em" }}>
        {label}
      </span>
      <div className="bg-[#F6F6F6] rounded-[12px] h-12 px-4 flex items-center justify-between gap-2">
        {children}
        <Image src="/icons/arrow-down.svg" alt="" width={16} height={16} className="shrink-0 pointer-events-none" />
      </div>
    </div>
  );
}

export default function SearchBar({ defaultTab = "Rent", inPlace = false }: SearchBarProps) {
  const router = useRouter();
  const tabOptions: TabOrAll[] = inPlace ? ["All", ...tabs] : [...tabs];
  const [activeTab, setActiveTab] = useState<TabOrAll>(inPlace ? "All" : defaultTab);
  const [query, setQuery] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [furnished, setFurnished] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const { data: propertyTypes } = useGetPropertyTypesQuery();

  // On /search, only offer property types that actually have active listings (scoped
  // to the selected listing type), so a user can't pick a type that returns nothing.
  const facetLt = activeTab === "All" ? undefined : (activeTab.toUpperCase() as "RENT" | "BUY" | "SHORTLET");
  const { data: facets } = useGetPropertyFacetsQuery(facetLt ? { listingType: facetLt } : undefined, {
    skip: !inPlace,
  });
  const availableTypeNames = new Set((facets?.byPropertyType ?? []).map((f) => f.id));
  const typeOptions =
    !inPlace || availableTypeNames.size === 0
      ? (propertyTypes ?? [])
      : (propertyTypes ?? []).filter(
          (t) => availableTypeNames.has(t.displayName) || String(t.id) === propertyType,
        );

  // Seed the bar from the current URL once on mount (both modes) so applying a
  // single control preserves — rather than wipes — the other active filters
  // (state, city, sort…). Read from window on the client to avoid an SSR
  // hydration mismatch; this is a legitimate one-time external-state sync.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    /* eslint-disable react-hooks/set-state-in-effect */
    // Show the active location in the box — the keyword `q` or, if the search was
    // resolved to a state filter (e.g. sidebar or a "Lagos State" search), the state.
    setQuery(p.get("q") || p.get("state") || "");
    setPropertyType(p.get("type") ?? "");
    setBedrooms(p.get("beds") ?? "");
    setMinPrice(p.get("minPrice") ?? "");
    setMaxPrice(p.get("maxPrice") ?? "");
    setFurnished(p.get("furnished") ?? "");
    if (inPlace) {
      const lt = p.get("listingType");
      setActiveTab(lt ? ((lt.charAt(0) + lt.slice(1).toLowerCase()) as TabOrAll) : "All");
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [inPlace]);

  // Where results live: /search when in place, else the active tab's listing page.
  const basePath = (tab: TabOrAll) => (inPlace ? "/search" : tabRoutes[tab as Tab] ?? "/search");

  // Apply the bar's values (plus any override from the control that just changed)
  // by merging into the current URL and navigating — so ANY change re-queries
  // immediately, no separate "Search" click needed, and untouched filters persist.
  function apply(
    o: Partial<{ query: string; propertyType: string; bedrooms: string; minPrice: string; maxPrice: string; furnished: string; activeTab: TabOrAll }> = {},
  ) {
    const v = { query, propertyType, bedrooms, minPrice, maxPrice, furnished, activeTab, ...o };
    const params = new URLSearchParams(window.location.search);
    const setOrDel = (k: string, val: string) => (val ? params.set(k, val) : params.delete(k));
    // Route a location keyword (e.g. "Lagos State", "Properties in Lagos") to the
    // exact `state` filter so it reliably matches; keep any leftover area as `q`.
    // Only touch `state` when the user actually typed something, so a state chosen
    // from the sidebar (empty keyword) is preserved.
    if (v.query.trim()) {
      const resolved = resolveLocationQuery(v.query);
      setOrDel("q", resolved.q);
      setOrDel("state", resolved.state ?? "");
    } else {
      // Cleared the box → clear the whole location (keyword + state).
      params.delete("q");
      params.delete("state");
    }
    setOrDel("type", v.propertyType);
    setOrDel("beds", v.bedrooms);
    setOrDel("minPrice", v.minPrice);
    setOrDel("maxPrice", v.maxPrice);
    setOrDel("furnished", v.furnished);
    if (inPlace) {
      if (v.activeTab !== "All") params.set("listingType", String(v.activeTab).toUpperCase());
      else params.delete("listingType");
    }
    params.delete("page"); // any filter change returns to page 1
    router.push(`${basePath(v.activeTab)}?${params.toString()}`, { scroll: false });
  }

  function handleSearch() {
    apply();
  }

  // FilterModal "Apply" → navigate to the active tab's listing page with its filters
  // (or refine the /search results in place when inPlace).
  function applyModalFilters(f: AppliedFilters) {
    // Merge into the current URL (both modes) so the modal refines rather than
    // replaces existing filters (e.g. a state selected from the sidebar).
    const params = new URLSearchParams(window.location.search);
    const setOrDel = (k: string, v?: string) => (v ? params.set(k, v) : params.delete(k));
    // Resolve a location keyword to `state` + leftover `q`, same as the search bar.
    // Only touch `state` when a location was actually entered, so an existing
    // state filter isn't wiped when the modal's location field is left blank.
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
    router.push(`${basePath(activeTab)}?${params.toString()}`, { scroll: false });
  }

  const selectClass =
    "appearance-none flex-1 min-w-0 text-[14px] text-[#121212] bg-transparent outline-none cursor-pointer";

  const filters = (
    <>
      <FilterField label="Property Type">
        <select
          value={propertyType}
          onChange={(e) => { setPropertyType(e.target.value); apply({ propertyType: e.target.value }); }}
          className={selectClass}
        >
          <option value="">All types</option>
          {typeOptions.map((t) => (
            <option key={t.id} value={t.id}>{t.displayName}</option>
          ))}
        </select>
      </FilterField>
      <FilterField label="Bedrooms">
        <select
          value={bedrooms}
          onChange={(e) => { setBedrooms(e.target.value); apply({ bedrooms: e.target.value }); }}
          className={selectClass}
        >
          <option value="">Any</option>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <option key={n} value={n}>{n} {n === 1 ? "Bedroom" : "Bedrooms"}</option>
          ))}
        </select>
      </FilterField>
      <FilterField label="Min. Price">
        <input
          type="text"
          inputMode="numeric"
          placeholder="No min"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          onBlur={() => apply()}
          onKeyDown={(e) => e.key === "Enter" && apply()}
          className="flex-1 min-w-0 text-[14px] text-[#121212] bg-transparent outline-none placeholder:text-[#121212]"
        />
      </FilterField>
      <FilterField label="Max Price">
        <input
          type="text"
          inputMode="numeric"
          placeholder="No max"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          onBlur={() => apply()}
          onKeyDown={(e) => e.key === "Enter" && apply()}
          className="flex-1 min-w-0 text-[14px] text-[#121212] bg-transparent outline-none placeholder:text-[#121212]"
        />
      </FilterField>
      <FilterField label="Furnished">
        <select
          value={furnished}
          onChange={(e) => { setFurnished(e.target.value); apply({ furnished: e.target.value }); }}
          className={selectClass}
        >
          <option value="">Any</option>
          <option value="furnished">Furnished</option>
          <option value="unfurnished">Unfurnished</option>
        </select>
      </FilterField>
    </>
  );

  return (
    <>
    <div className="w-full">

      {/* ===== MOBILE: compact 2-row card (Figma 329x128, r=15) — filters behind the filter button ===== */}
      <div className="md:hidden bg-white rounded-[15px] p-2 flex flex-col gap-4">
        {/* Row 1: tab dropdown + search input */}
        <div className="flex items-center gap-2">
          <div className="relative flex items-center bg-[#F6F6F6] rounded-[12px] w-[93px] h-12 pl-4 pr-3 shrink-0">
            <select
              value={activeTab}
              onChange={(e) => { const v = e.target.value as TabOrAll; setActiveTab(v); apply({ activeTab: v }); }}
              className="appearance-none w-full bg-transparent outline-none cursor-pointer text-[12px] text-[#121212]"
              style={{ letterSpacing: "-0.02em" }}
            >
              {tabOptions.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <Image src="/icons/hero-arrow-down.svg" alt="" width={16} height={16} className="pointer-events-none" />
          </div>
          <div className="flex items-center gap-2 flex-1 min-w-0 bg-[#F6F6F6] rounded-[12px] h-12 px-4">
            <Image src="/icons/hero-search.svg" alt="" width={16} height={16} className="shrink-0" />
            <LocationAutocomplete
              value={query}
              onChange={setQuery}
              onEnter={handleSearch}
              placeholder="Enter location, area or keyword..."
              className="flex-1 min-w-0 bg-transparent outline-none text-[#121212] text-[10px] placeholder:text-[rgba(128,126,126,0.75)]"
            />
          </div>
        </div>
        {/* Row 2: filter button (opens the filter page) + Search button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Filters"
            onClick={() => setShowFilterModal(true)}
            className="flex items-center justify-center bg-[#F6F6F6] rounded-[12px] w-12 h-12 shrink-0"
          >
            <Image src="/icons/hero-setting-5.svg" alt="" width={16} height={16} />
          </button>
          <button
            type="button"
            onClick={handleSearch}
            className="flex-1 h-12 rounded-[12px] text-white text-[14px] font-medium"
            style={{ background: GRADIENT, border: "1px solid rgba(120,158,187,0.5)" }}
          >
            Search
          </button>
        </div>
      </div>

      {/* ===== DESKTOP: full row + 5-filter grid (Figma 1344 wide) ===== */}
      <div className="hidden md:flex md:flex-col gap-4 bg-white rounded-[12px] p-6">
        {/* Top row: tab dropdown | search input | search button */}
        <div className="flex items-center gap-4">
          <div className="relative shrink-0 bg-[#F6F6F6] rounded-[12px] h-12 flex items-center pl-4 pr-9">
            <select
              value={activeTab}
              onChange={(e) => { const v = e.target.value as TabOrAll; setActiveTab(v); apply({ activeTab: v }); }}
              className="appearance-none text-[14px] text-[#121212] bg-transparent outline-none cursor-pointer"
              style={{ letterSpacing: "-0.02em" }}
            >
              {tabOptions.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <Image src="/icons/arrow-down.svg" alt="" width={16} height={16} className="absolute right-4 pointer-events-none" />
          </div>
          <div className="flex items-center gap-2 flex-1 bg-[#F6F6F6] rounded-[12px] h-12 px-4">
            <Image src="/icons/hero-search.svg" alt="" width={20} height={20} className="shrink-0" />
            <LocationAutocomplete
              value={query}
              onChange={setQuery}
              onEnter={handleSearch}
              placeholder="Enter location, area or keyword..."
              className="flex-1 min-w-0 text-[14px] outline-none text-[#121212] bg-transparent placeholder:text-[12px] placeholder:text-[rgba(128,126,126,0.75)]"
            />
          </div>
          <button
            type="button"
            onClick={handleSearch}
            className="shrink-0 flex items-center justify-center text-white text-[14px] font-medium w-[160px] h-12 rounded-[12px] hover:opacity-90 transition-opacity"
            style={{ background: GRADIENT, border: "1px solid rgba(120,158,187,0.5)" }}
          >
            Search
          </button>
          {/* Filter button — opens the advanced filter modal (Figma 77:1176) */}
          <button
            type="button"
            onClick={() => setShowFilterModal(true)}
            className="shrink-0 flex items-center gap-2 bg-[#F6F6F6] rounded-[12px] h-12 px-4 text-[14px] text-[#121212] hover:bg-[#ededed] transition-colors"
          >
            <Image src="/icons/hero-setting-5.svg" alt="" width={16} height={16} />
            Filter
          </button>
        </div>
        {/* Filter row */}
        <div className="flex items-start gap-4">{filters}</div>
      </div>
    </div>
    <FilterModal
      open={showFilterModal}
      onClose={() => setShowFilterModal(false)}
      onApply={applyModalFilters}
      availableTypes={inPlace && availableTypeNames.size > 0 ? [...availableTypeNames] : undefined}
    />
    </>
  );
}

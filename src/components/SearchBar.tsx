"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const tabs = ["Rent", "Buy", "Shortlet"] as const;
type Tab = (typeof tabs)[number];

const tabRoutes: Record<Tab, string> = {
  Rent: "/for-rent",
  Buy: "/for-sale",
  Shortlet: "/shortlet",
};

interface SearchBarProps {
  defaultTab?: Tab;
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

export default function SearchBar({ defaultTab = "Rent" }: SearchBarProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>(defaultTab);
  const [query, setQuery] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [furnished, setFurnished] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  function handleSearch() {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (propertyType) params.set("type", propertyType);
    if (bedrooms) params.set("beds", bedrooms);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    router.push(`${tabRoutes[activeTab]}?${params.toString()}`);
  }

  const selectClass =
    "appearance-none flex-1 min-w-0 text-[14px] text-[#121212] bg-transparent outline-none cursor-pointer";

  const filters = (
    <>
      <FilterField label="Property Type">
        <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} className={selectClass}>
          <option value="">All types</option>
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="land">Land</option>
          <option value="commercial">Commercial</option>
        </select>
      </FilterField>
      <FilterField label="Bedrooms">
        <select value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} className={selectClass}>
          <option value="">Any</option>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>{n}+</option>
          ))}
        </select>
      </FilterField>
      <FilterField label="Min. Price">
        <input
          type="text"
          placeholder="No min"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="flex-1 min-w-0 text-[14px] text-[#121212] bg-transparent outline-none placeholder:text-[#121212]"
        />
      </FilterField>
      <FilterField label="Max Price">
        <input
          type="text"
          placeholder="No max"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="flex-1 min-w-0 text-[14px] text-[#121212] bg-transparent outline-none placeholder:text-[#121212]"
        />
      </FilterField>
      <FilterField label="Furnished">
        <select value={furnished} onChange={(e) => setFurnished(e.target.value)} className={selectClass}>
          <option value="">Any</option>
          <option value="furnished">Furnished</option>
          <option value="unfurnished">Unfurnished</option>
        </select>
      </FilterField>
    </>
  );

  return (
    <div className="w-full">

      {/* ===== MOBILE: compact 2-row card (Figma 329x128, r=15) — filters behind the filter button ===== */}
      <div className="md:hidden bg-white rounded-[15px] p-2 flex flex-col gap-4">
        {/* Row 1: tab dropdown + search input */}
        <div className="flex items-center gap-2">
          <div className="relative flex items-center bg-[#F6F6F6] rounded-[12px] w-[93px] h-12 pl-4 pr-3 shrink-0">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value as Tab)}
              className="appearance-none w-full bg-transparent outline-none cursor-pointer text-[12px] text-[#121212]"
              style={{ letterSpacing: "-0.02em" }}
            >
              {tabs.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <Image src="/icons/hero-arrow-down.svg" alt="" width={16} height={16} className="pointer-events-none" />
          </div>
          <div className="flex items-center gap-2 flex-1 min-w-0 bg-[#F6F6F6] rounded-[12px] h-12 px-4">
            <Image src="/icons/hero-search.svg" alt="" width={16} height={16} className="shrink-0" />
            <input
              type="text"
              placeholder="Enter location, area or keyword..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1 min-w-0 bg-transparent outline-none text-[#121212] placeholder:text-[rgba(128,126,126,0.75)]"
              style={{ fontSize: "10px", letterSpacing: "-0.02em" }}
            />
          </div>
        </div>
        {/* Row 2: filter toggle + Search button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Filters"
            onClick={() => setShowFilters((s) => !s)}
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
        {/* Expanded filters (toggled by the filter button) */}
        {showFilters && <div className="grid grid-cols-2 gap-3 pt-1">{filters}</div>}
      </div>

      {/* ===== DESKTOP: full row + 5-filter grid (Figma 1344 wide) ===== */}
      <div className="hidden md:flex md:flex-col gap-4 bg-white rounded-[12px] p-6">
        {/* Top row: tab dropdown | search input | search button */}
        <div className="flex items-center gap-4">
          <div className="relative shrink-0 bg-[#F6F6F6] rounded-[12px] h-12 flex items-center pl-4 pr-9">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value as Tab)}
              className="appearance-none text-[14px] text-[#121212] bg-transparent outline-none cursor-pointer"
              style={{ letterSpacing: "-0.02em" }}
            >
              {tabs.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <Image src="/icons/arrow-down.svg" alt="" width={16} height={16} className="absolute right-4 pointer-events-none" />
          </div>
          <div className="flex items-center gap-2 flex-1 bg-[#F6F6F6] rounded-[12px] h-12 px-4">
            <Image src="/icons/hero-search.svg" alt="" width={20} height={20} className="shrink-0" />
            <input
              type="text"
              placeholder="Enter location, area or keyword..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1 min-w-0 text-[14px] outline-none text-[#121212] bg-transparent placeholder:text-[12px] placeholder:text-[rgba(128,126,126,0.75)]"
              style={{ letterSpacing: "-0.02em" }}
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
        </div>
        {/* Filter row */}
        <div className="flex items-start gap-4">{filters}</div>
      </div>
    </div>
  );
}

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

  return (
    <div className="bg-white rounded-[12px] w-full p-6 flex flex-col gap-4">

      {/* Top row — Figma: h48, gap 16: tab dropdown | search input | search button */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        {/* Tab dropdown — #F6F6F6 box, Rent 14px Regular #121212 + arrow-down 16 */}
        <div className="relative w-full sm:w-auto sm:shrink-0 bg-[#F6F6F6] rounded-[12px] h-12 flex items-center pl-4 pr-9">
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

        {/* Search input — flex-1 #F6F6F6 box, search 20 + placeholder 12px rgba(128,126,126,0.75) */}
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

        {/* Search button — gradient, w-160 h-48, rounded-12 with rounded gradient border */}
        <button
          onClick={handleSearch}
          className="shrink-0 flex items-center justify-center text-white text-[14px] font-medium w-full sm:w-[160px] h-12 rounded-[12px] hover:opacity-90 transition-opacity"
          style={{
            background: "linear-gradient(175deg, rgba(117,163,199,1) 0%, rgba(48,94,130,1) 100%)",
            border: "1px solid rgba(120,158,187,0.5)",
          }}
        >
          Search
        </button>
      </div>

      {/* Filter row — Figma: 5 columns, gap 16, each label + #F6F6F6 box (2-col on mobile) */}
      <div className="grid grid-cols-2 lg:flex lg:items-start gap-3 lg:gap-4">
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
      </div>
    </div>
  );
}

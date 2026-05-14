"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronDown } from "lucide-react";

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

  return (
    <div className="bg-white rounded-[12px] shadow-2xl w-full p-6 flex flex-col gap-4">

      {/* Top row: tab dropdown | search input | search button */}
      <div className="flex items-center gap-4">
        {/* Tab dropdown — pill with #F6F6F6 bg, rounded-12, h-48 */}
        <div className="relative shrink-0 bg-[#F6F6F6] rounded-[12px] h-12 flex items-center px-4">
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value as Tab)}
            className="appearance-none text-sm font-semibold text-[#121212] bg-transparent outline-none pr-6 cursor-pointer"
          >
            {tabs.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <ChevronDown size={14} className="absolute right-3 text-[#7f7e7e] pointer-events-none" />
        </div>

        {/* Search input — flex-1, #F6F6F6, rounded-12 */}
        <div className="flex items-center gap-2 flex-1 bg-[#F6F6F6] rounded-[12px] h-12 px-4">
          <Search size={16} className="text-[#7f7e7e] shrink-0" />
          <input
            type="text"
            placeholder="Enter location, area or keyword..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1 text-sm outline-none placeholder:text-[#7f7e7e] text-[#121212] bg-transparent"
          />
        </div>

        {/* Search button — gradient, w-160, h-48, rounded-12 */}
        <button
          onClick={handleSearch}
          className="shrink-0 text-white text-sm font-semibold w-[160px] h-12 rounded-[12px] hover:opacity-90 transition-opacity"
          style={{
            background: "linear-gradient(175deg, rgba(117,163,199,1) 0%, rgba(48,94,130,1) 100%)",
            border: "1px solid",
            borderImage: "linear-gradient(159deg, rgba(120,158,187,0.5) 0%, rgba(48,94,130,1) 100%) 1",
          }}
        >
          Search
        </button>
      </div>

      {/* Filter row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 divide-x divide-[#f0f0f0]">
        <div className="px-4 py-3">
          <p className="text-xs text-[#7f7e7e] mb-1">Property Type</p>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="text-sm font-medium text-[#121212] outline-none w-full bg-transparent cursor-pointer"
          >
            <option value="">All types</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="land">Land</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>

        <div className="px-4 py-3">
          <p className="text-xs text-[#7f7e7e] mb-1">Bedrooms</p>
          <select
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className="text-sm font-medium text-[#121212] outline-none w-full bg-transparent cursor-pointer"
          >
            <option value="">Any</option>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>{n}+</option>
            ))}
          </select>
        </div>

        <div className="px-4 py-3">
          <p className="text-xs text-[#7f7e7e] mb-1">Min. Price</p>
          <input
            type="text"
            placeholder="No min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="text-sm font-medium text-[#121212] outline-none w-full bg-transparent placeholder:text-[#b0b0b0]"
          />
        </div>

        <div className="px-4 py-3">
          <p className="text-xs text-[#7f7e7e] mb-1">Max Price</p>
          <input
            type="text"
            placeholder="No max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="text-sm font-medium text-[#121212] outline-none w-full bg-transparent placeholder:text-[#b0b0b0]"
          />
        </div>

        <div className="px-4 py-3">
          <p className="text-xs text-[#7f7e7e] mb-1">Furnished</p>
          <select
            value={furnished}
            onChange={(e) => setFurnished(e.target.value)}
            className="text-sm font-medium text-[#121212] outline-none w-full bg-transparent cursor-pointer"
          >
            <option value="">Any</option>
            <option value="furnished">Furnished</option>
            <option value="unfurnished">Unfurnished</option>
          </select>
        </div>
      </div>
    </div>
  );
}

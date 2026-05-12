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
    <div className="bg-white rounded-2xl shadow-2xl w-full overflow-hidden">

      {/* Top row: tab selector + search input + button */}
      <div className="flex items-center gap-0 px-4 py-3 border-b border-[#f0f0f0]">
        {/* Tab dropdown (Rent / Buy / Shortlet) */}
        <div className="relative shrink-0">
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value as Tab)}
            className="appearance-none text-sm font-semibold text-[#121212] bg-transparent outline-none pr-6 pl-1 cursor-pointer"
          >
            {tabs.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-[#7f7e7e] pointer-events-none" />
        </div>

        <div className="w-px h-5 bg-[#ededed] mx-3 shrink-0" />

        {/* Search input */}
        <div className="flex items-center gap-2 flex-1">
          <Search size={16} className="text-[#7f7e7e] shrink-0" />
          <input
            type="text"
            placeholder="Enter location, area or keyword..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1 text-sm outline-none placeholder:text-[#7f7e7e] text-[#121212]"
          />
        </div>

        {/* Search button */}
        <button
          onClick={handleSearch}
          className="ml-3 shrink-0 bg-[#305e82] text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-[#254d6b] transition-colors"
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

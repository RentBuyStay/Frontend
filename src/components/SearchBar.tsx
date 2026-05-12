"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

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
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-4xl">
      {/* Tabs */}
      <div className="flex border-b border-[#ededed]">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === tab
                ? "text-[#305e82] border-b-2 border-[#305e82]"
                : "text-[#7f7e7e] hover:text-[#121212]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main search row */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-[#ededed]">
        <Search size={18} className="text-[#7f7e7e] shrink-0" />
        <input
          type="text"
          placeholder="Enter location, area or keyword..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="flex-1 text-sm outline-none placeholder:text-[#7f7e7e]"
        />
        <button
          onClick={handleSearch}
          className="bg-[#305e82] text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-[#254d6b] transition-colors"
        >
          Search
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#ededed]">
        <div className="bg-white px-4 py-3">
          <p className="text-xs font-medium text-[#121212] mb-1">Property Type</p>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="text-sm text-[#7f7e7e] outline-none w-full bg-transparent"
          >
            <option value="">All types</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="land">Land</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>
        <div className="bg-white px-4 py-3">
          <p className="text-xs font-medium text-[#121212] mb-1">Bedrooms</p>
          <select
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className="text-sm text-[#7f7e7e] outline-none w-full bg-transparent"
          >
            <option value="">Any</option>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>{n}+</option>
            ))}
          </select>
        </div>
        <div className="bg-white px-4 py-3">
          <p className="text-xs font-medium text-[#121212] mb-1">Min. Price</p>
          <input
            type="number"
            placeholder="No min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="text-sm text-[#7f7e7e] outline-none w-full bg-transparent placeholder:text-[#7f7e7e]"
          />
        </div>
        <div className="bg-white px-4 py-3">
          <p className="text-xs font-medium text-[#121212] mb-1">Max Price</p>
          <input
            type="number"
            placeholder="No max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="text-sm text-[#7f7e7e] outline-none w-full bg-transparent placeholder:text-[#7f7e7e]"
          />
        </div>
      </div>
    </div>
  );
}

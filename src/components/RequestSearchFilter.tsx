"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, ChevronDown } from "lucide-react";
import FilterModal from "./FilterModal";

const filterColumns = [
  { label: "Property Type", value: "Flats & Apartments", options: ["All types", "Flats & Apartments", "House", "Commercial Property", "Co-working Space", "Land"] },
  { label: "Bedrooms", value: "1", options: ["Any", "1", "2", "3", "4", "5+"] },
  { label: "Min. Price", value: "No min", options: ["No min", "₦100,000", "₦500,000", "₦1 million", "₦5 million"] },
  { label: "Max Price", value: "₦1 million", options: ["No max", "₦1 million", "₦5 million", "₦10 million", "₦50 million"] },
  { label: "Furnished", value: "Any", options: ["Any", "Furnished", "Unfurnished"] },
];

export default function RequestSearchFilter() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="max-w-[1440px] mx-auto px-[80px] py-10 flex flex-col gap-5">
      {/* Top row: Tab dropdown + Search input + Search button + Filter button */}
      <div className="flex items-center gap-4">
        {/* Tab dropdown */}
        <div className="relative shrink-0 bg-[#F6F6F6] rounded-[12px] h-12 flex items-center px-4">
          <select
            defaultValue="Rent"
            className="appearance-none text-sm font-semibold text-[#121212] bg-transparent outline-none pr-6 cursor-pointer"
          >
            <option>Rent</option>
            <option>Buy</option>
            <option>Shortlet</option>
          </select>
          <ChevronDown size={14} className="absolute right-3 text-[#7f7e7e] pointer-events-none" />
        </div>

        {/* Search input */}
        <div className="flex items-center gap-2 flex-1 bg-[#F6F6F6] rounded-[12px] h-12 px-4">
          <Search size={16} className="text-[#7f7e7e] shrink-0" />
          <input
            type="text"
            placeholder="Jibowu, Yaba, Lagos"
            className="flex-1 text-sm outline-none placeholder:text-[#7f7e7e] text-[#121212] bg-transparent"
          />
        </div>

        {/* Search button — gradient */}
        <button
          className="shrink-0 text-white text-sm font-semibold w-[160px] h-12 rounded-[12px] hover:opacity-90 transition-opacity"
          style={{ background: "linear-gradient(175deg, rgba(117,163,199,1) 0%, rgba(48,94,130,1) 100%)" }}
        >
          Search
        </button>

        {/* Filter button — opens modal */}
        <button
          onClick={() => setShowModal(true)}
          className="shrink-0 flex items-center gap-2 px-4 h-12 rounded-[12px] bg-[#F6F6F6] hover:bg-[#ededed] transition-colors"
          style={{ fontSize: "14px", color: "#121212" }}
          aria-label="Open filters"
        >
          <Image src="/icons/filter.svg" alt="" width={16} height={16} />
          Filter
        </button>
      </div>

      {/* Filter modal */}
      <FilterModal open={showModal} onClose={() => setShowModal(false)} />

      {/* Quick filter columns — always visible */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
        {filterColumns.map((f) => (
          <div key={f.label} className="flex flex-col gap-1.5">
            <label style={{ fontSize: "12px", color: "#121212", fontWeight: 500 }}>{f.label}</label>
            <div className="relative bg-[#F6F6F6] rounded-[12px] h-12 flex items-center px-4">
              <select
                defaultValue={f.value}
                className="appearance-none text-sm text-[#121212] bg-transparent outline-none w-full pr-6 cursor-pointer"
              >
                {f.options.map((o) => <option key={o}>{o}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-4 text-[#7f7e7e] pointer-events-none" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

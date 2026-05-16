"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Search, ChevronDown } from "lucide-react";

const bedrooms = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

const propertyTypes = [
  "All",
  "Semi-detached Bungalow",
  "Warehouse",
  "Shop in a Mall",
  "Lands",
  "Detached Bungalow",
  "Office Spaces",
  "Flats & Apartments",
  "Self Contain",
  "Commercial Properties",
  "Houses",
  "Mini Flats",
  "Co-working Space",
  "Duplex",
  "Terraced Bungalow",
];

export default function FilterModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [activeBed, setActiveBed] = useState("1");
  const [activeType, setActiveType] = useState("All");

  // Lock body scroll when modal is open + ESC to close
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[24px] w-full max-w-[628px] max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header — sticky at top */}
        <div className="flex items-center justify-between" style={{ padding: "40px 40px 16px 40px" }}>
          <h2 style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 600, color: "#121212" }}>
            Filters
          </h2>
          <button onClick={onClose} aria-label="Close" className="hover:opacity-70 transition-opacity">
            <Image src="/icons/cancel.svg" alt="" width={24} height={24} />
          </button>
        </div>

        {/* Sections — Figma: column gap 16px, scrollable middle */}
        <div className="flex flex-col flex-1 overflow-y-auto" style={{ gap: "16px", padding: "8px 40px" }}>
          {/* Location */}
          <div className="flex flex-col gap-2">
            <label style={{ fontSize: "14px", lineHeight: "24px", fontWeight: 500, color: "#121212", letterSpacing: "-0.02em" }}>
              Location
            </label>
            <div className="bg-[#F6F6F6] rounded-[12px] h-12 flex items-center justify-between px-4 gap-3">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <Search size={18} className="text-[#807e7e] shrink-0" />
                <input
                  type="text"
                  placeholder="Search address, neighbourhood..."
                  className="flex-1 text-sm outline-none bg-transparent placeholder:text-[#807e7e] text-[#121212]"
                />
              </div>
              <button className="flex items-center gap-1.5 shrink-0" style={{ color: "#305e82", fontSize: "14px", fontWeight: 500 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#305e82" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="3" />
                  <line x1="12" y1="2" x2="12" y2="6" />
                  <line x1="12" y1="18" x2="12" y2="22" />
                  <line x1="2" y1="12" x2="6" y2="12" />
                  <line x1="18" y1="12" x2="22" y2="12" />
                </svg>
                Mark location on map
              </button>
            </div>
          </div>

          {/* Price Range — 2 columns */}
          <div className="flex flex-col gap-2">
            <label style={{ fontSize: "14px", lineHeight: "24px", fontWeight: 500, color: "#121212", letterSpacing: "-0.02em" }}>
              Price Range
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative bg-[#F6F6F6] rounded-[12px] h-12 flex items-center px-4">
                <select defaultValue="" className="appearance-none text-sm text-[#121212] bg-transparent outline-none w-full pr-6 cursor-pointer">
                  <option value="" disabled>Min. price</option>
                  <option>₦100,000</option>
                  <option>₦500,000</option>
                  <option>₦1 million</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 text-[#807e7e] pointer-events-none" />
              </div>
              <div className="relative bg-[#F6F6F6] rounded-[12px] h-12 flex items-center px-4">
                <select defaultValue="" className="appearance-none text-sm text-[#121212] bg-transparent outline-none w-full pr-6 cursor-pointer">
                  <option value="" disabled>Max. price</option>
                  <option>₦1 million</option>
                  <option>₦5 million</option>
                  <option>₦10 million</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 text-[#807e7e] pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Bedrooms — 10 buttons */}
          <div className="flex flex-col gap-2">
            <label style={{ fontSize: "14px", lineHeight: "24px", fontWeight: 500, color: "#121212", letterSpacing: "-0.02em" }}>
              Bedrooms
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              {bedrooms.map((b) => {
                const active = activeBed === b;
                return (
                  <button
                    key={b}
                    onClick={() => setActiveBed(b)}
                    className="rounded-[8px] transition-colors"
                    style={{
                      width: "48px",
                      height: "40px",
                      background: active ? "#E6EEF6" : "#F6F6F6",
                      color: active ? "#305e82" : "#807e7e",
                      fontSize: "14px",
                      fontWeight: active ? 600 : 400,
                    }}
                  >
                    {b}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Property Type — tag buttons */}
          <div className="flex flex-col gap-2">
            <label style={{ fontSize: "14px", lineHeight: "24px", fontWeight: 500, color: "#121212", letterSpacing: "-0.02em" }}>
              Property Type
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              {propertyTypes.map((t) => {
                const active = activeType === t;
                return (
                  <button
                    key={t}
                    onClick={() => setActiveType(t)}
                    className="px-4 py-2 rounded-[8px] transition-colors whitespace-nowrap"
                    style={{
                      background: active ? "#E6EEF6" : "#F6F6F6",
                      color: active ? "#305e82" : "#807e7e",
                      fontSize: "13px",
                      fontWeight: active ? 600 : 400,
                    }}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Furnished + Servicing */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label style={{ fontSize: "14px", lineHeight: "24px", fontWeight: 500, color: "#121212", letterSpacing: "-0.02em" }}>
                Furnished
              </label>
              <div className="relative bg-[#F6F6F6] rounded-[12px] h-12 flex items-center px-4">
                <select defaultValue="Any" className="appearance-none text-sm text-[#121212] bg-transparent outline-none w-full pr-6 cursor-pointer">
                  <option>Any</option>
                  <option>Furnished</option>
                  <option>Unfurnished</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 text-[#807e7e] pointer-events-none" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label style={{ fontSize: "14px", lineHeight: "24px", fontWeight: 500, color: "#121212", letterSpacing: "-0.02em" }}>
                Servicing
              </label>
              <div className="relative bg-[#F6F6F6] rounded-[12px] h-12 flex items-center px-4">
                <select defaultValue="Any" className="appearance-none text-sm text-[#121212] bg-transparent outline-none w-full pr-6 cursor-pointer">
                  <option>Any</option>
                  <option>Serviced</option>
                  <option>Unserviced</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 text-[#807e7e] pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Shared + Listed */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label style={{ fontSize: "14px", lineHeight: "24px", fontWeight: 500, color: "#121212", letterSpacing: "-0.02em" }}>
                Shared
              </label>
              <div className="relative bg-[#F6F6F6] rounded-[12px] h-12 flex items-center px-4">
                <select defaultValue="Any" className="appearance-none text-sm text-[#121212] bg-transparent outline-none w-full pr-6 cursor-pointer">
                  <option>Any</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 text-[#807e7e] pointer-events-none" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label style={{ fontSize: "14px", lineHeight: "24px", fontWeight: 500, color: "#121212", letterSpacing: "-0.02em" }}>
                Listed
              </label>
              <div className="relative bg-[#F6F6F6] rounded-[12px] h-12 flex items-center px-4">
                <select defaultValue="Anytime" className="appearance-none text-sm text-[#121212] bg-transparent outline-none w-full pr-6 cursor-pointer">
                  <option>Anytime</option>
                  <option>Last 24 hours</option>
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 text-[#807e7e] pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer — Figma: 40px top space from content, 40px bottom & 40px right */}
        <div className="flex items-center justify-end" style={{ gap: "16px", padding: "24px 40px 40px 40px" }}>
          <button
            onClick={() => { setActiveBed("1"); setActiveType("All"); }}
            className="hover:opacity-70 transition-opacity"
            style={{ fontSize: "14px", fontWeight: 500, color: "#121212", padding: "8px 16px" }}
          >
            Reset
          </button>
          <button
            onClick={onClose}
            className="text-white rounded-[12px] hover:opacity-90 transition-opacity"
            style={{
              height: "48px",
              padding: "8px 24px",
              fontSize: "14px",
              fontWeight: 500,
              background: "linear-gradient(175deg, rgba(117,163,199,1) 0%, rgba(48,94,130,1) 100%)",
              border: "1px solid rgba(120,158,187,0.5)",
            }}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Search, ChevronDown } from "lucide-react";
import { useGetPropertyTypesQuery } from "@/services/referenceApi";

const bedrooms = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

export type AppliedFilters = {
  q?: string;
  propertyTypeId?: number;
  bedrooms?: number;
  minPrice?: number;
  maxPrice?: number;
  isFurnished?: boolean;
  isServiced?: boolean;
  isShared?: boolean;
  listedWithinDays?: number;
};

const LISTED_DAYS: Record<string, number | undefined> = {
  Anytime: undefined,
  "Last 24 hours": 1,
  "Last 7 days": 7,
  "Last 30 days": 30,
};

export default function FilterModal({
  open,
  onClose,
  onApply,
}: {
  open: boolean;
  onClose: () => void;
  onApply?: (filters: AppliedFilters) => void;
}) {
  const [activeBed, setActiveBed] = useState(""); // "" = no bedroom filter
  const [activeType, setActiveType] = useState("All");
  const [loc, setLoc] = useState("");
  const [minP, setMinP] = useState("");
  const [maxP, setMaxP] = useState("");
  const [furn, setFurn] = useState("");
  const [serv, setServ] = useState("");
  const [shared, setShared] = useState("");
  const [listed, setListed] = useState("Anytime");
  // Real property types from the backend (GET /property-types).
  const { data: propertyTypes } = useGetPropertyTypesQuery();
  // Portal to <body> so the modal escapes any ancestor stacking context (e.g. the
  // hero's z-10 content wrapper, which otherwise lets the navbar paint over it).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

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

  if (!open || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[10000] overflow-y-auto md:flex md:items-center md:justify-center md:p-4"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className="bg-white w-full min-h-full md:min-h-0 md:max-w-[628px] md:rounded-[24px] md:max-h-[90vh] md:overflow-y-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-10 pb-4 md:px-10">
          <h2 style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 600, color: "#121212" }}>
            Filters
          </h2>
          <button onClick={onClose} aria-label="Close" className="hover:opacity-70 transition-opacity">
            <Image src="/icons/cancel.svg" alt="" width={24} height={24} />
          </button>
        </div>

        {/* Sections — column gap 16px; the content area scrolls on desktop, the page scrolls on mobile */}
        <div className="flex flex-col flex-1 md:overflow-y-auto px-4 md:px-10" style={{ gap: "16px", paddingTop: "8px", paddingBottom: "8px" }}>
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
                  value={loc}
                  onChange={(e) => setLoc(e.target.value)}
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
                <span className="hidden md:inline">Mark location on map</span>
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
                <select value={minP} onChange={(e) => setMinP(e.target.value)} className="appearance-none text-sm text-[#121212] bg-transparent outline-none w-full pr-6 cursor-pointer">
                  <option value="">Min. price</option>
                  <option value="100000">₦100,000</option>
                  <option value="500000">₦500,000</option>
                  <option value="1000000">₦1 million</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 text-[#807e7e] pointer-events-none" />
              </div>
              <div className="relative bg-[#F6F6F6] rounded-[12px] h-12 flex items-center px-4">
                <select value={maxP} onChange={(e) => setMaxP(e.target.value)} className="appearance-none text-sm text-[#121212] bg-transparent outline-none w-full pr-6 cursor-pointer">
                  <option value="">Max. price</option>
                  <option value="1000000">₦1 million</option>
                  <option value="5000000">₦5 million</option>
                  <option value="10000000">₦10 million</option>
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
              {[
                { id: "All", displayName: "All" },
                ...(propertyTypes ?? []).map((t) => ({ id: String(t.id), displayName: t.displayName })),
              ].map((t) => {
                const active = activeType === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveType(t.id)}
                    className="px-4 py-2 rounded-[8px] transition-colors whitespace-nowrap"
                    style={{
                      background: active ? "#E6EEF6" : "#F6F6F6",
                      color: active ? "#305e82" : "#807e7e",
                      fontSize: "13px",
                      fontWeight: active ? 600 : 400,
                    }}
                  >
                    {t.displayName}
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
                <select value={furn} onChange={(e) => setFurn(e.target.value)} className="appearance-none text-sm text-[#121212] bg-transparent outline-none w-full pr-6 cursor-pointer">
                  <option value="">Any</option>
                  <option value="furnished">Furnished</option>
                  <option value="unfurnished">Unfurnished</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 text-[#807e7e] pointer-events-none" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label style={{ fontSize: "14px", lineHeight: "24px", fontWeight: 500, color: "#121212", letterSpacing: "-0.02em" }}>
                Servicing
              </label>
              <div className="relative bg-[#F6F6F6] rounded-[12px] h-12 flex items-center px-4">
                <select value={serv} onChange={(e) => setServ(e.target.value)} className="appearance-none text-sm text-[#121212] bg-transparent outline-none w-full pr-6 cursor-pointer">
                  <option value="">Any</option>
                  <option value="serviced">Serviced</option>
                  <option value="unserviced">Unserviced</option>
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
                <select value={shared} onChange={(e) => setShared(e.target.value)} className="appearance-none text-sm text-[#121212] bg-transparent outline-none w-full pr-6 cursor-pointer">
                  <option value="">Any</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 text-[#807e7e] pointer-events-none" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label style={{ fontSize: "14px", lineHeight: "24px", fontWeight: 500, color: "#121212", letterSpacing: "-0.02em" }}>
                Listed
              </label>
              <div className="relative bg-[#F6F6F6] rounded-[12px] h-12 flex items-center px-4">
                <select value={listed} onChange={(e) => setListed(e.target.value)} className="appearance-none text-sm text-[#121212] bg-transparent outline-none w-full pr-6 cursor-pointer">
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

        {/* Footer — full-width buttons on mobile, right-aligned on desktop */}
        <div className="flex items-center gap-4 md:justify-end px-4 pt-4 pb-10 md:px-10">
          <button
            onClick={() => { setActiveBed(""); setActiveType("All"); setLoc(""); setMinP(""); setMaxP(""); setFurn(""); setServ(""); setShared(""); setListed("Anytime"); }}
            className="flex-1 md:flex-none flex items-center justify-center hover:opacity-70 transition-opacity"
            style={{ height: "48px", fontSize: "14px", fontWeight: 500, color: "#121212", padding: "8px 16px" }}
          >
            Reset
          </button>
          <button
            onClick={() => {
              onApply?.({
                q: loc.trim() || undefined,
                propertyTypeId: activeType !== "All" ? Number(activeType) : undefined,
                bedrooms: activeBed ? Number(activeBed) : undefined,
                minPrice: minP ? Number(minP) : undefined,
                maxPrice: maxP ? Number(maxP) : undefined,
                isFurnished: furn === "furnished" ? true : furn === "unfurnished" ? false : undefined,
                isServiced: serv === "serviced" ? true : serv === "unserviced" ? false : undefined,
                isShared: shared === "yes" ? true : shared === "no" ? false : undefined,
                listedWithinDays: LISTED_DAYS[listed],
              });
              onClose();
            }}
            className="flex-1 md:flex-none flex items-center justify-center text-white rounded-[12px] hover:opacity-90 transition-opacity"
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
    </div>,
    document.body
  );
}

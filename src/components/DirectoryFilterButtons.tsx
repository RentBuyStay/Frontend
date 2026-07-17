"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// The "State" / "Ratings" quick-filters shown in the agents / agencies list
// header. Same button look as the original static design, now functional:
//   State   → writes the `state` URL param (server-side filter on /agents,/agencies)
//   Ratings → writes `ratingSort=desc|asc` (the list sorts the loaded page)
// Both are URL-driven so they survive refresh and stay in sync with RealtorSearch.

const STATES = [
  "Lagos", "Abuja", "Rivers", "Oyo", "Ogun", "Enugu", "Kano", "Kaduna",
  "Delta", "Edo", "Anambra", "Akwa Ibom", "Ondo", "Osun", "Imo",
];

const RATINGS: { label: string; value: string }[] = [
  { label: "Highest rated", value: "desc" },
  { label: "Lowest rated", value: "asc" },
];

function Dropdown({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: { label: string; value: string }[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const current = options.find((o) => o.value === selected);

  return (
    <div ref={ref} className="relative flex-1 md:flex-none">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full md:w-[120px] flex items-center justify-between bg-[#F6F6F6] hover:bg-[#EDEDED] transition-colors rounded-[12px]"
        style={{ height: "40px", padding: "8px 16px" }}
      >
        <span
          className="truncate"
          style={{
            fontSize: "14px",
            lineHeight: "24px",
            fontWeight: 400,
            color: "#121212",
            letterSpacing: "-0.02em",
          }}
        >
          {current ? current.label : label}
        </span>
        <Image src="/icons/arrow-down.svg" alt="" width={16} height={16} />
      </button>

      {open && (
        <div
          className="absolute right-0 z-20 mt-2 bg-white rounded-[12px] border border-[#EDEDED] shadow-lg overflow-hidden max-h-[280px] overflow-y-auto"
          style={{ minWidth: "180px" }}
        >
          <button
            type="button"
            onClick={() => { onSelect(""); setOpen(false); }}
            className="w-full text-left px-4 py-2 text-[14px] text-[#807E7E] hover:bg-[#F6F6F6]"
          >
            {`All ${label.toLowerCase()}`}
          </button>
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => { onSelect(o.value); setOpen(false); }}
              className="w-full text-left px-4 py-2 text-[14px] text-[#121212] hover:bg-[#F6F6F6]"
              style={{ fontWeight: o.value === selected ? 600 : 400 }}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function DirectoryFilterButtons() {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(sp.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete("page"); // any filter change returns to page 1
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center" style={{ gap: "16px" }}>
      <span
        style={{
          fontSize: "14px",
          lineHeight: "18px",
          fontWeight: 500,
          color: "#121212",
          letterSpacing: "-0.02em",
        }}
      >
        Filter:
      </span>
      <Dropdown
        label="State"
        options={STATES.map((s) => ({ label: s, value: s }))}
        selected={sp.get("state") ?? ""}
        onSelect={(v) => setParam("state", v)}
      />
      <Dropdown
        label="Ratings"
        options={RATINGS}
        selected={sp.get("ratingSort") ?? ""}
        onSelect={(v) => setParam("ratingSort", v)}
      />
    </div>
  );
}

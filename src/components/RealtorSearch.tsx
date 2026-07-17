"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, ChevronDown } from "lucide-react";

// Shared "Select state + keyword + Search" search used on the agents / agencies /
// agents-all / blog pages. Figma 769:84434 / 769:88040: a narrow state dropdown +
// keyword input on row 1 and a full-width Search on row 2 (mobile), one row on
// desktop (the dropdown+input wrapper dissolves via `md:contents`).
// `className` lets each page position it (absolute in a hero, or static in a section).
// `target` is where a search lands — the full results list for that directory.
export default function RealtorSearch({
  className = "",
  target = "/agents/all",
}: {
  className?: string;
  target?: string;
}) {
  const router = useRouter();
  const sp = useSearchParams();
  const [state, setState] = useState(sp.get("state") ?? "");
  const [q, setQ] = useState(sp.get("q") ?? "");

  function submit() {
    const params = new URLSearchParams();
    if (state) params.set("state", state);
    if (q.trim()) params.set("q", q.trim());
    const qs = params.toString();
    router.push(qs ? `${target}?${qs}` : target);
  }

  return (
    <div className={`flex flex-col md:flex-row md:items-center gap-3 ${className}`}>
      <div className="flex items-center gap-2 md:contents">
        <div
          className="relative shrink-0 bg-[#F6F6F6] rounded-[12px] flex items-center w-[93px] md:w-[199px]"
          style={{ height: "48px", padding: "0 16px" }}
        >
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="appearance-none truncate text-[14px] text-[#121212] bg-transparent outline-none w-full pr-6 cursor-pointer"
          >
            <option value="">Select state</option>
            <option value="Lagos">Lagos</option>
            <option value="Abuja">Abuja</option>
            <option value="Port Harcourt">Port Harcourt</option>
          </select>
          <ChevronDown size={16} className="absolute right-4 text-[#121212] pointer-events-none" />
        </div>

        <div
          className="flex items-center gap-2 flex-1 min-w-0 bg-[#F6F6F6] rounded-[12px]"
          style={{ height: "48px", padding: "0 16px" }}
        >
          <Search size={20} className="text-[#807E7E] shrink-0" />
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="Enter location, area or keyword..."
            className="flex-1 min-w-0 text-[14px] outline-none placeholder:text-[#807E7E] text-[#121212] bg-transparent"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={submit}
        className="shrink-0 text-white text-[14px] font-medium rounded-[12px] hover:opacity-90 transition-opacity w-full md:w-[160px]"
        style={{
          height: "48px",
          background: "linear-gradient(175deg, rgba(117,163,199,1) 0%, rgba(48,94,130,1) 100%)",
          border: "1px solid rgba(120, 158, 187, 0.5)",
        }}
      >
        Search
      </button>
    </div>
  );
}

import { Search, ChevronDown } from "lucide-react";

// Shared "Select state + keyword + Search" search used on the agents / agencies /
// agents-all / blog pages. Figma 769:84434 / 769:88040: a narrow state dropdown +
// keyword input on row 1 and a full-width Search on row 2 (mobile), one row on
// desktop (the dropdown+input wrapper dissolves via `md:contents`).
// `className` lets each page position it (absolute in a hero, or static in a section).
export default function RealtorSearch({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col md:flex-row md:items-center gap-3 ${className}`}>
      <div className="flex items-center gap-2 md:contents">
        <div
          className="relative shrink-0 bg-[#F6F6F6] rounded-[12px] flex items-center w-[93px] md:w-[199px]"
          style={{ height: "48px", padding: "0 16px" }}
        >
          <select className="appearance-none truncate text-[14px] text-[#121212] bg-transparent outline-none w-full pr-6 cursor-pointer">
            <option>Select state</option>
            <option>Lagos</option>
            <option>Abuja</option>
            <option>Port Harcourt</option>
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
            placeholder="Enter location, area or keyword..."
            className="flex-1 min-w-0 text-[14px] outline-none placeholder:text-[#807E7E] text-[#121212] bg-transparent"
          />
        </div>
      </div>

      <button
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

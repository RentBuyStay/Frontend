import Image from "next/image";

export type SortValue = "newest" | "priceAsc" | "priceDesc";

const SORTS: { value: SortValue; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "priceAsc", label: "Price: Low to High" },
  { value: "priceDesc", label: "Price: High to Low" },
];

// Shared listings header for the for-sale / for-rent / shortlet / property-requests pages.
// Title (16px mobile / 24px desktop) + "Showing …" count, then a "Sort:" dropdown.
export default function ListingsHeader({
  title,
  count,
  sort = "newest",
  onSortChange,
}: {
  title: string;
  count: string;
  sort?: SortValue;
  onSortChange?: (v: SortValue) => void;
}) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-[16px] leading-[24px] md:text-[24px] md:leading-[32px]" style={{ fontWeight: 600, color: "#121212", letterSpacing: "-0.02em" }}>
          {title}
        </h2>
        <p style={{ fontSize: "14px", lineHeight: "24px", color: "#807E7E", letterSpacing: "-0.02em" }}>
          {count}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <span style={{ fontSize: "14px", fontWeight: 500, color: "#121212" }}>Sort:</span>
        <div className="relative w-[150px]">
          <select
            value={sort}
            onChange={(e) => onSortChange?.(e.target.value as SortValue)}
            className="appearance-none w-full truncate bg-[#F6F6F6] rounded-[12px] h-10 pl-3 pr-7 text-[14px] text-[#121212] outline-none cursor-pointer"
          >
            {SORTS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <Image src="/icons/arrow-down.svg" alt="" width={16} height={16} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}

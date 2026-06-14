import Image from "next/image";

// Shared listings header for the for-sale / for-rent / shortlet / property-requests pages.
// Figma 747:77662 (+ 769:80964): title (16px mobile / 24px desktop) + "Showing …" count,
// then a "Sort:" + fixed 89×40 dropdown. Stacks on mobile, one row on desktop.
export default function ListingsHeader({
  title,
  count,
  sortOptions = ["Newest", "Price: Low to High", "Price: High to Low"],
}: {
  title: string;
  count: string;
  sortOptions?: string[];
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
        <div className="relative w-[89px]">
          <select
            defaultValue={sortOptions[0]}
            className="appearance-none w-full truncate bg-[#F6F6F6] rounded-[12px] h-10 pl-3 pr-7 text-[14px] text-[#121212] outline-none cursor-pointer"
          >
            {sortOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
          <Image src="/icons/arrow-down.svg" alt="" width={16} height={16} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}

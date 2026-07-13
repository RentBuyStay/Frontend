import Link from "next/link";
import Image from "next/image";
import VerifiedAgentsList from "./VerifiedAgentsList";
import SidebarTypeCounts from "./SidebarTypeCounts";
import SidebarBedroomBreakdown from "./SidebarBedroomBreakdown";
import SidebarStates from "./SidebarStates";
import SubscribeNowButton from "./SubscribeNowButton";

const CATEGORY_LISTING_TYPE: Record<string, "RENT" | "BUY" | "SHORTLET"> = {
  Sale: "BUY",
  Rent: "RENT",
  Shortlet: "SHORTLET",
};

const LISTING_TYPE_PATH: Record<string, string> = {
  BUY: "/for-sale",
  RENT: "/for-rent",
  SHORTLET: "/shortlet",
};

/** Turn a curated "Other Related Properties" label into a real filtered-search URL. */
function relatedHref(label: string, listingType?: "RENT" | "BUY" | "SHORTLET"): string {
  const base = listingType ? LISTING_TYPE_PATH[listingType] : "/search";
  const l = label.toLowerCase();
  const params = new URLSearchParams();

  const range = l.match(/between\s+(\d+)\s*mil?l?ion\s+and\s+(\d+)\s*mil?l?ion/);
  if (range) {
    params.set("minPrice", String(Number(range[1]) * 1_000_000));
    params.set("maxPrice", String(Number(range[2]) * 1_000_000));
  } else if (l.includes("serviced")) {
    params.set("serviced", "yes");
  } else if (l.includes("furnished")) {
    params.set("furnished", "furnished");
  } else if (l.includes("newly")) {
    params.set("listedWithinDays", "30");
  } else if (l.includes("cheap")) {
    params.set("sort", "priceAsc");
  } else if (l.includes("luxury")) {
    params.set("sort", "priceDesc");
  }
  const qs = params.toString();
  return qs ? `${base}?${qs}` : base;
}

// Shared right-hand sidebar for the for-sale / for-rent / shortlet listing pages.
// The markup is identical across all three; only the data (and the category word
// in "Currently available properties for …") varies, so it all comes in via props.

export interface SidebarPropertyType {
  name: string;
  count: number;
}

export interface SidebarBedroomTable {
  cols: string[];
  rows: string[][];
}

export default function ListingSidebar({
  category,
  propertyTypes,
  bedroomTable,
  states,
  otherCategories,
  showVerifiedAgents = true,
}: {
  category: string; // "Sale" | "Rent" | "Shortlet" | "" (no listing-type scope)
  propertyTypes: SidebarPropertyType[];
  bedroomTable: SidebarBedroomTable;
  states: string[];
  otherCategories: string[];
  showVerifiedAgents?: boolean;
}) {
  // undefined when the page isn't scoped to a single listing type (e.g. requests).
  const listingType = CATEGORY_LISTING_TYPE[category];
  return (
    <aside className="flex flex-col gap-6 min-w-0">
      {/* Available Properties */}
      <div className="border border-[#ededed] rounded-[16px] p-6">
        <h3 style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 600, color: "#121212" }}>
          Available Properties
        </h3>
        <p style={{ fontSize: "12px", lineHeight: "20px", color: "#807e7e" }} className="mb-4">
          {category ? `Currently available properties for ${category}` : "Currently available properties"}
        </p>

        {/* First table: Property Type | Property Count (live from /properties/facets, static fallback) */}
        <SidebarTypeCounts listingType={listingType} fallback={propertyTypes} />

        <div className="border-t border-[#ededed] my-4 -mx-6" />

        {/* Second nested table: Type | 1 Bed | … (live from /properties/facets, static fallback) */}
        <SidebarBedroomBreakdown listingType={listingType} fallback={bedroomTable} />
      </div>

      {/* Explore States */}
      <div className="border border-[#ededed] rounded-[16px] p-6">
        <h3 style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 600, color: "#121212" }}>
          Explore States
        </h3>
        <p style={{ fontSize: "12px", lineHeight: "20px", color: "#807e7e" }} className="mb-4">
          Find available properties by states
        </p>
        <SidebarStates states={states} listingType={listingType} />
      </div>

      {/* Other Related Properties — bullet list, all blue */}
      <div className="border border-[#ededed] rounded-[16px] p-6">
        <h3 style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 600, color: "#121212" }} className="mb-4">
          Other Related Properties
        </h3>
        <ul className="flex flex-col gap-1">
          {otherCategories.map((c) => (
            <li key={c} className="flex items-start gap-2 min-w-0" style={{ fontSize: "14px", lineHeight: "24px", color: "#305e82" }}>
              <span className="shrink-0">•</span>
              <Link href={relatedHref(c, listingType)} className="hover:underline break-words min-w-0">
                {c}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Receive alerts card — bell icon top, 24px title, 14px subtitle, orange button */}
      <div className="rounded-[16px] p-6 text-white relative overflow-hidden" style={{ background: "linear-gradient(174deg, #75A3C7 0%, #305E82 96%)" }}>
        <Image src="/icons/bell-alert.svg" alt="" width={34} height={36} className="mb-4" />
        <h3 style={{ fontSize: "24px", lineHeight: "32px", fontWeight: 600 }} className="mb-2">
          Receive alerts for<br />new properties
        </h3>
        <p style={{ fontSize: "14px", lineHeight: "24px" }} className="mb-5 text-white/90">
          Get instant notifications for recent listings
        </p>
        <SubscribeNowButton />
      </div>

      {/* Verified Agents — live from GET /agents */}
      {showVerifiedAgents && <VerifiedAgentsList />}
    </aside>
  );
}

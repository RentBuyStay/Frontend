import Link from "next/link";
import Image from "next/image";
import VerifiedAgentsList from "./VerifiedAgentsList";
import SidebarTypeCounts from "./SidebarTypeCounts";
import SidebarBedroomBreakdown from "./SidebarBedroomBreakdown";
import SubscribeNowButton from "./SubscribeNowButton";

const CATEGORY_LISTING_TYPE: Record<string, "RENT" | "BUY" | "SHORTLET"> = {
  Sale: "BUY",
  Rent: "RENT",
  Shortlet: "SHORTLET",
};

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
        <div className="flex flex-wrap gap-x-3 gap-y-1" style={{ fontSize: "14px", lineHeight: "32px", color: "#305e82" }}>
          {states.map((s) => (
            <Link key={s} href={`/search?state=${s.toLowerCase()}`} className="hover:underline whitespace-nowrap">
              {s}
            </Link>
          ))}
        </div>
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
              <Link href="#" className="hover:underline break-words min-w-0">
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

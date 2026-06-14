import Link from "next/link";
import Image from "next/image";
import { Phone, MessageCircle } from "lucide-react";

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

export interface SidebarAgent {
  name: string;
  initials: string;
  agency: string;
  location: string;
  listings: number;
  rating?: number;
  avatar?: string;
}

export default function ListingSidebar({
  category,
  propertyTypes,
  bedroomTable,
  states,
  otherCategories,
  verifiedAgents,
}: {
  category: string; // "Sale" | "Rent" | "Shortlet"
  propertyTypes: SidebarPropertyType[];
  bedroomTable: SidebarBedroomTable;
  states: string[];
  otherCategories: string[];
  verifiedAgents: SidebarAgent[];
}) {
  return (
    <aside className="flex flex-col gap-6 min-w-0">
      {/* Available Properties */}
      <div className="border border-[#ededed] rounded-[16px] p-6">
        <h3 style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 600, color: "#121212" }}>
          Available Properties
        </h3>
        <p style={{ fontSize: "12px", lineHeight: "20px", color: "#807e7e" }} className="mb-4">
          Currently available properties for {category}
        </p>

        {/* First table: Property Type | Property Count */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between py-1.5 border-b border-[#ededed]" style={{ fontSize: "14px", color: "#305e82", fontWeight: 600 }}>
            <span>Property Type</span>
            <span>Property Count</span>
          </div>
          {propertyTypes.map((t) => (
            <div key={t.name} className="flex items-center justify-between py-1.5" style={{ fontSize: "14px", color: "#305e82" }}>
              <span>{t.name}</span>
              <span>{t.count}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-[#ededed] my-4 -mx-6" />

        {/* Second nested table: Type | 1 Bed | 2 Bed | … */}
        <div className="flex flex-col">
          <div className="grid grid-cols-6 gap-2 py-1.5 border-b border-[#ededed]" style={{ fontSize: "12px", color: "#305e82", fontWeight: 600 }}>
            {bedroomTable.cols.map((c) => (
              <span key={c} className={c === "Type" ? "" : "text-right"}>{c}</span>
            ))}
          </div>
          {bedroomTable.rows.map((row) => (
            <div key={row[0]} className="grid grid-cols-6 gap-2 py-1.5" style={{ fontSize: "12px", color: "#305e82" }}>
              {row.map((cell, i) => (
                <span key={i} className={i === 0 ? "" : "text-right"}>{cell}</span>
              ))}
            </div>
          ))}
        </div>
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
        <button
          className="text-white rounded-[8px] hover:opacity-90 transition-opacity"
          style={{ fontSize: "14px", fontWeight: 600, background: "#FFAE00", width: "147px", height: "48px" }}
        >
          Subscribe Now
        </button>
      </div>

      {/* Verified Agents — title 20px + subtitle 16px, then full agent cards */}
      <div className="flex flex-col gap-4">
        <div>
          <h3 style={{ fontSize: "20px", lineHeight: "32px", fontWeight: 600, color: "#121212" }}>
            Verified Agents
          </h3>
          <p style={{ fontSize: "16px", lineHeight: "24px", color: "#807e7e" }}>
            Connect with with verified agents and specialists in this area.
          </p>
        </div>

        {verifiedAgents.map((a) => (
          <div
            key={a.name}
            className="bg-white rounded-[20px] p-5 flex flex-col gap-4"
            style={{ border: "1px solid #f6f6f6" }}
          >
            {/* Avatar + name + agency + location */}
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-[#f3fefe] border border-[#ededed] overflow-hidden flex items-center justify-center shrink-0">
                {a.avatar ? (
                  <Image src={a.avatar} alt={a.name} width={56} height={56} className="object-cover w-full h-full" />
                ) : (
                  <span style={{ fontSize: "16px", fontWeight: 600, color: "#305e82" }}>{a.initials}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 600, color: "#121212" }} className="truncate">
                    {a.name}
                  </p>
                  <Image src="/icons/verify.svg" alt="" width={18} height={18} className="shrink-0" />
                </div>
                <p style={{ fontSize: "12px", color: "#807e7e" }} className="truncate">{a.agency}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Image src="/icons/location.svg" alt="" width={16} height={16} />
                  <span style={{ fontSize: "12px", color: "#305e82" }}>{a.location}</span>
                </div>
              </div>
            </div>

            <div className="h-px bg-[#f6f6f6] -mx-5" />

            {/* Rating + listings */}
            <div className="flex items-center gap-3" style={{ fontSize: "14px", color: "#807e7e" }}>
              <div className="flex items-center gap-1.5">
                <Image src="/icons/star.svg" alt="" width={20} height={20} />
                <span>{(a.rating ?? 4.6).toFixed(1)}</span>
              </div>
              <div className="w-px h-4 bg-[#807e7e]/40" />
              <div className="flex items-center gap-1.5">
                <Image src="/icons/buildings.svg" alt="" width={20} height={20} />
                <span>{a.listings} listings</span>
              </div>
            </div>

            <div className="h-px bg-[#f6f6f6] -mx-5" />

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                className="flex-1 flex items-center justify-center gap-2 rounded-[12px] hover:bg-[#f6f6f6] transition-colors"
                style={{ height: "48px", padding: "8px 24px", border: "1px solid #ededed", color: "#121212", fontSize: "14px", fontWeight: 500 }}
              >
                <Phone size={18} strokeWidth={1.5} /> Call
              </button>
              <button
                className="flex-1 flex items-center justify-center gap-2 rounded-[12px] text-white hover:opacity-90 transition-opacity"
                style={{ height: "48px", padding: "8px 24px", fontSize: "14px", fontWeight: 500, background: "linear-gradient(175deg, rgba(117,163,199,1) 0%, rgba(48,94,130,1) 100%)" }}
              >
                <MessageCircle size={18} strokeWidth={1.5} /> Message
              </button>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

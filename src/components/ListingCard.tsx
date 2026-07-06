import Link from "next/link";
import Image from "next/image";
import CardContactButtons from "./CardContactButtons";

// Shared listing card for the for-sale / for-rent / shortlet pages.
// Renders two layouts that swap at the `sm` breakpoint:
//   • mobile  (< sm): vertical card — Figma 732:67237
//   • desktop (≥ sm): horizontal card with image left, content right
// The only per-page difference is the badge `tag`.
export interface Listing {
  id: string;
  title: string;
  price: string;
  location: string;
  date: string;
  image: string;
  desc: string;
  agent: string;
  agentInitials: string;
  agentVerified?: boolean;
  tags: string[];
  beds: number;
  baths: number;
  area: string;
}

// Figma: all three tags share the same pill style (bg #FFAE00, white text).
const BADGE_BG = "#FFAE00";

export default function ListingCard({
  listing: p,
  tag,
}: {
  listing: Listing;
  tag: "For Sale" | "For Rent" | "Shortlet";
}) {
  return (
    <>
      {/* ===== MOBILE: vertical card — Figma 732:67237 ===== */}
      <Link
        href={`/properties/${p.id}`}
        className="sm:hidden bg-white border border-[#f6f6f6] rounded-[20px] overflow-hidden flex flex-col"
      >
        {/* Image 224 + overlays */}
        <div className="relative w-full h-[224px] bg-[#ededed]">
          <Image src={p.image} alt={p.title} fill className="object-cover" />
          {/* Tag badge — top-left, #FFAE00 */}
          <span
            className="absolute uppercase text-white"
            style={{ top: "16px", left: "16px", fontSize: "12px", lineHeight: "20px", fontWeight: 600, padding: "4px 8px", borderRadius: "8px", background: BADGE_BG }}
          >
            {tag}
          </span>
          {/* Gallery counter — bottom-left */}
          <div className="absolute flex items-center gap-[5px] text-white" style={{ left: "16px", bottom: "16px", background: "rgba(18,18,18,0.5)", borderRadius: "8px", padding: "4px 8px" }}>
            <Image src="/icons/gallery.svg" alt="" width={16} height={16} />
            <span style={{ fontSize: "14px" }}>3</span>
          </div>
          {/* Nav arrows — bottom-right */}
          <div className="absolute flex items-center gap-2" style={{ right: "16px", bottom: "16px", background: "rgba(18,18,18,0.5)", borderRadius: "8px", padding: "4px" }}>
            <Image src="/icons/arrow-right-white.svg" alt="" width={16} height={16} className="rotate-180" />
            <Image src="/icons/arrow-right-white.svg" alt="" width={16} height={16} />
          </div>
        </div>
        {/* Price + title + location */}
        <div className="px-4 pt-4 flex flex-col gap-4">
          <p style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 700, color: "#305E82" }}>{p.price}</p>
          <div className="flex flex-col gap-2">
            <p className="line-clamp-1" style={{ fontSize: "14px", lineHeight: "24px", fontWeight: 500, color: "#121212" }}>{p.title}</p>
            <div className="flex items-center gap-2">
              <Image src="/icons/location.svg" alt="" width={20} height={20} />
              <span style={{ fontSize: "12px", lineHeight: "20px", color: "#305E82" }}>{p.location}</span>
            </div>
          </div>
        </div>
        {/* divider — full width */}
        <div className="h-px bg-[#f6f6f6] mt-4" />
        {/* specs */}
        <div className="flex items-center gap-4 px-4 py-4" style={{ fontSize: "12px", lineHeight: "24px", color: "#807E7E" }}>
          <span className="flex items-center gap-2"><Image src="/icons/prop-maximize.svg" alt="" width={20} height={20} />{p.area}</span>
          <span className="w-px h-3.5 bg-[#f6f6f6]" />
          <span className="flex items-center gap-2"><Image src="/icons/prop-bed.svg" alt="" width={20} height={20} />{p.beds} Beds</span>
          <span className="w-px h-3.5 bg-[#f6f6f6]" />
          <span className="flex items-center gap-2"><Image src="/icons/prop-bath.svg" alt="" width={20} height={20} />{p.baths} Baths</span>
        </div>
        {/* divider — full width */}
        <div className="h-px bg-[#f6f6f6]" />
        {/* agent */}
        <div className="flex items-center gap-3 px-4 py-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(48,94,130,0.05)", color: "#305E82", fontSize: "14px", fontWeight: 600 }}>
            {p.agentInitials}
          </div>
          <span className="truncate" style={{ fontSize: "14px", fontWeight: 600, color: "#121212" }}>{p.agent}</span>
          {p.agentVerified && <Image src="/icons/verify.svg" alt="verified" width={20} height={20} className="shrink-0" />}
          <CardContactButtons propertyId={p.id} name={p.agent} pushRight />
        </div>
      </Link>

      {/* ===== DESKTOP: horizontal card ===== */}
      <Link
        href={`/properties/${p.id}`}
        className="hidden sm:flex flex-col bg-white border border-[#f6f6f6] rounded-[20px] p-5 gap-4 transition-shadow"
      >
        {/* TOP SECTION: image left + content right */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
          {/* Image — Figma: 184x184 square on left with badge, counter, nav arrows */}
          <div className="relative w-full h-[224px] sm:w-[184px] sm:h-[184px] rounded-[12px] overflow-hidden shrink-0 bg-[#ededed]">
            <Image src={p.image} alt={p.title} fill className="object-cover" />
            {/* Tag badge — top-left 8px inset, pill r=50, 10/600 white uppercase, padding 4/8, bg #FFAE00 */}
            <span
              className="absolute uppercase text-white rounded-full"
              style={{ top: "8px", left: "8px", fontSize: "10px", lineHeight: "20px", fontWeight: 600, padding: "4px 8px", letterSpacing: 0, background: BADGE_BG }}
            >
              {tag}
            </span>
            {/* Photo counter bottom-left */}
            <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white" style={{ fontSize: "12px" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
              </svg>
              <span>3</span>
            </div>
            {/* Nav arrows bottom-right (decorative — card links to detail page) */}
            <div className="absolute bottom-2 right-2 flex items-center gap-1 text-white" aria-hidden="true">
              <span className="w-5 h-5 flex items-center justify-center bg-black/30 rounded">‹</span>
              <span className="w-5 h-5 flex items-center justify-center bg-black/30 rounded">›</span>
            </div>
          </div>

          {/* Right content area — flex-1 */}
          <div className="flex-1 min-w-0 flex flex-col gap-2">
            {/* Title row + Price right */}
            <div className="flex items-start justify-between gap-3">
              <p style={{ fontSize: "20px", fontWeight: 600, color: "#121212", lineHeight: "28px" }} className="truncate flex-1">
                {p.title}
              </p>
              <p style={{ fontSize: "20px", fontWeight: 700, color: "#305e82" }} className="shrink-0">
                {p.price}
              </p>
            </div>

            {/* Location | Date row */}
            <div className="flex items-center gap-3" style={{ fontSize: "13px" }}>
              <span className="flex items-center gap-1.5" style={{ color: "#305e82" }}>
                <Image src="/icons/location.svg" alt="" width={16} height={16} />
                {p.location}
              </span>
              <span className="w-px h-3 bg-[#ededed]" />
              <span style={{ color: "#807e7e", fontWeight: 500 }}>{p.date}</span>
            </div>

            {/* Description — 2 lines */}
            <p style={{ fontSize: "14px", color: "#807e7e", lineHeight: "24px" }} className="line-clamp-2 mt-1">
              {p.desc}
            </p>

            {/* Tags */}
            <div className="flex items-center gap-2 flex-wrap mt-1">
              {p.tags.map((t) => (
                <span key={t} className="bg-[#f3fefe] px-3 py-1.5 rounded-[8px] whitespace-nowrap" style={{ fontSize: "12px", fontWeight: 500, color: "#305e82" }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM ROW (full card width): Agent + contact left | Stats right */}
        <div className="flex items-center justify-between gap-3 border-t border-[#ededed] pt-4 -mx-5 px-5">
          {/* Agent: avatar + name + verify + call/message */}
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#f3fefe] border border-[#ededed] flex items-center justify-center shrink-0" style={{ fontSize: "11px", fontWeight: 600, color: "#305e82" }}>
              {p.agentInitials}
            </div>
            <span className="truncate" style={{ fontSize: "14px", fontWeight: 600, color: "#121212" }}>{p.agent}</span>
            {p.agentVerified && <Image src="/icons/verify.svg" alt="verified" width={16} height={16} className="shrink-0" />}
            <CardContactButtons propertyId={p.id} name={p.agent} />
          </div>

          {/* Stats: sqft | beds | baths */}
          <div className="flex items-center gap-4 shrink-0" style={{ fontSize: "13px", color: "#807e7e" }}>
            <span className="flex items-center gap-1.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M3 8V3h5M21 8V3h-5M3 16v5h5M21 16v5h-5" /></svg>
              {p.area}
            </span>
            <span className="w-px h-3 bg-[#ededed]" />
            <span className="flex items-center gap-1.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M2 22V8.5h20V22M2 13h20M6 13V8.5M2 18h20" /></svg>
              {p.beds} Beds
            </span>
            <span className="w-px h-3 bg-[#ededed]" />
            <span className="flex items-center gap-1.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M9 6V3a1 1 0 011-1h4a1 1 0 011 1v3M3 11h18v6a4 4 0 01-4 4H7a4 4 0 01-4-4v-6z" /></svg>
              {p.baths} Baths
            </span>
          </div>
        </div>
      </Link>
    </>
  );
}

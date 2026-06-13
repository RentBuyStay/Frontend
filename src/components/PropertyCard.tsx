import Link from "next/link";
import Image from "next/image";

export interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
  sqft: string;
  beds: number;
  baths: number;
  tag: "For Sale" | "For Rent" | "Shortlet";
  agentName: string;
  agentInitials: string;
  image?: string;
}

// Figma: all three tags share the same pill style (bg #FFAE00, white text)
const BADGE_BG = "#FFAE00";

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <Link
      href={`/properties/${property.id}`}
      className="group block bg-white border border-[#f6f6f6] rounded-[20px] overflow-hidden transition-shadow"
    >
      {/* Image with badge — Figma: 224h, badge bottom-right r=8, 12px/600 white uppercase, pad 4/8 */}
      <div className="relative h-[224px] bg-[#ededed]">
        {property.image ? (
          <Image src={property.image} alt={property.title} fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#d7d7d7]">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 9.5L12 3l9 6.5V21H3V9.5z" />
            </svg>
          </div>
        )}
        <span
          className="absolute uppercase text-white inline-flex items-center"
          style={{
            right: "16px",
            bottom: "16px",
            fontSize: "12px",
            lineHeight: "20px",
            fontWeight: 600,
            padding: "4px 8px",
            borderRadius: "8px",
            background: BADGE_BG,
          }}
        >
          {property.tag}
        </span>
      </div>

      {/* Body — dividers run full-width (touch the card border), content stays inset */}
      <div className="px-4 flex flex-col">
        {/* Price + title + location */}
        <div className="flex flex-col gap-2 py-4">
          {/* Price — Figma: 16px Bold #305E82 */}
          <p style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 700, color: "#305E82" }}>
            {property.price}
          </p>
          {/* Title — Figma: 14px Medium #121212 */}
          <p className="line-clamp-1" style={{ fontSize: "14px", lineHeight: "24px", fontWeight: 500, color: "#121212" }}>
            {property.title}
          </p>
          {/* Location — Figma: location icon 20 + 12px #305E82 */}
          <div className="flex items-center gap-2">
            <Image src="/icons/location.svg" alt="" width={20} height={20} />
            <span style={{ fontSize: "12px", lineHeight: "20px", color: "#305E82" }}>{property.location}</span>
          </div>
        </div>

        <div className="h-px bg-[#f6f6f6] -mx-4" />

        {/* Specs row — Figma: 12px #807E7E, icons 20px */}
        <div className="flex items-center gap-4 py-4" style={{ fontSize: "12px", lineHeight: "24px", color: "#807E7E" }}>
          <span className="flex items-center gap-2">
            <Image src="/icons/prop-maximize.svg" alt="" width={20} height={20} />
            {property.sqft}
          </span>
          <span className="w-px h-3.5 bg-[#f6f6f6]" />
          <span className="flex items-center gap-2">
            <Image src="/icons/prop-bed.svg" alt="" width={20} height={20} />
            {property.beds} Beds
          </span>
          <span className="w-px h-3.5 bg-[#f6f6f6]" />
          <span className="flex items-center gap-2">
            <Image src="/icons/prop-bath.svg" alt="" width={20} height={20} />
            {property.baths} Baths
          </span>
        </div>

        <div className="h-px bg-[#f6f6f6] -mx-4" />

        {/* Agent row — Figma: avatar 40, name 14 SemiBold #121212, verify 20 */}
        <div className="flex items-center gap-3 py-4">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
            style={{ background: "rgba(48,94,130,0.05)", color: "#305E82", fontSize: "14px", fontWeight: 600 }}
          >
            {property.agentInitials}
          </div>
          <span style={{ fontSize: "14px", fontWeight: 600, color: "#121212" }}>{property.agentName}</span>
          <Image src="/icons/verify.svg" alt="" width={20} height={20} />
        </div>
      </div>
    </Link>
  );
}

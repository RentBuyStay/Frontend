import Link from "next/link";
import Image from "next/image";
import { MapPin, BadgeCheck } from "lucide-react";

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
      className="group block bg-white border border-[#ededed] rounded-[16px] overflow-hidden hover:shadow-lg transition-shadow"
    >
      {/* Image with badge */}
      <div className="relative h-[260px] bg-[#f6f6f6]">
        {property.image ? (
          <Image src={property.image} alt={property.title} fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#d7d7d7]">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 9.5L12 3l9 6.5V21H3V9.5z" />
            </svg>
          </div>
        )}
        {/* Badge — Figma: top-left 8px inset, pill r=50, 10px/600 white uppercase, padding 4/8, bg #FFAE00 */}
        <span
          className="absolute uppercase text-white rounded-full"
          style={{
            top: "8px",
            left: "8px",
            fontSize: "10px",
            lineHeight: "20px",
            fontWeight: 600,
            padding: "4px 8px",
            letterSpacing: 0,
            background: BADGE_BG,
          }}
        >
          {property.tag}
        </span>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-2">
        {/* Price */}
        <p className="text-[20px] font-bold text-[#121212] leading-tight">
          {property.price}
        </p>

        {/* Title */}
        <p className="text-[15px] font-medium text-[#121212] line-clamp-1 mt-1">
          {property.title}
        </p>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-sm text-[#7f7e7e]">
          <MapPin size={14} className="text-[#305e82]" />
          <span>{property.location}</span>
        </div>

        {/* Stats row — Figma icons: maximize (36:1764), ion:bed-outline (46:1803), solar:bath-linear (46:1811) at 20px */}
        <div className="flex items-center gap-3 mt-2 pt-3 border-t border-[#ededed] text-sm text-[#7f7e7e]">
          <span className="flex items-center gap-1.5">
            <Image src="/icons/prop-maximize.svg" alt="" width={20} height={20} />
            {property.sqft}
          </span>
          <span className="text-[#ededed]">|</span>
          <span className="flex items-center gap-1.5">
            <Image src="/icons/prop-bed.svg" alt="" width={20} height={20} />
            {property.beds} Beds
          </span>
          <span className="text-[#ededed]">|</span>
          <span className="flex items-center gap-1.5">
            <Image src="/icons/prop-bath.svg" alt="" width={20} height={20} />
            {property.baths} Baths
          </span>
        </div>

        {/* Agent row */}
        <div className="flex items-center gap-2 mt-2 pt-3 border-t border-[#ededed]">
          <div className="w-7 h-7 rounded-full bg-[#f3fefe] border border-[#ededed] flex items-center justify-center text-[#305e82] text-xs font-semibold">
            {property.agentInitials}
          </div>
          <span className="text-sm font-medium text-[#121212]">{property.agentName}</span>
          <BadgeCheck size={16} className="text-[#14ae5c] fill-[#14ae5c] [&>path:nth-child(2)]:stroke-white" />
        </div>
      </div>
    </Link>
  );
}

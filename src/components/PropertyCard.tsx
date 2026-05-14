import Link from "next/link";
import Image from "next/image";
import { MapPin, BedDouble, Bath, Maximize, BadgeCheck } from "lucide-react";

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

const tagColors: Record<Property["tag"], string> = {
  "For Sale": "bg-[#ff9c00] text-white",
  "For Rent": "bg-[#14ae5c] text-white",
  Shortlet: "bg-[#8a38f5] text-white",
};

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
        {/* Bottom-right badge */}
        <span
          className={`absolute bottom-3 right-3 text-xs font-semibold px-3 py-1 rounded-md uppercase tracking-wide ${tagColors[property.tag]}`}
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

        {/* Stats row with dividers */}
        <div className="flex items-center gap-3 mt-2 pt-3 border-t border-[#ededed] text-sm text-[#7f7e7e]">
          <span className="flex items-center gap-1.5">
            <Maximize size={14} strokeWidth={1.5} />
            {property.sqft}
          </span>
          <span className="text-[#ededed]">|</span>
          <span className="flex items-center gap-1.5">
            <BedDouble size={14} strokeWidth={1.5} />
            {property.beds} Beds
          </span>
          <span className="text-[#ededed]">|</span>
          <span className="flex items-center gap-1.5">
            <Bath size={14} strokeWidth={1.5} />
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

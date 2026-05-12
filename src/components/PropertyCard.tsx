import Link from "next/link";
import { MapPin, Maximize2, BedDouble, Bath } from "lucide-react";

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
  "For Sale": "bg-[#305e82] text-white",
  "For Rent": "bg-[#14ae5c] text-white",
  Shortlet: "bg-[#8a38f5] text-white",
};

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <Link href={`/properties/${property.id}`} className="group block">
      <div className="rounded-2xl overflow-hidden border border-[#ededed] bg-white hover:shadow-lg transition-shadow">
        <div className="relative h-[200px] bg-[#f6f6f6]">
          {property.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#d7d7d7]">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 9.5L12 3l9 6.5V21H3V9.5z" />
              </svg>
            </div>
          )}
          <span className={`absolute top-3 left-3 text-xs font-semibold px-2 py-1 rounded-md ${tagColors[property.tag]}`}>
            {property.tag}
          </span>
        </div>

        <div className="p-4">
          <p className="text-lg font-bold text-[#121212]">{property.price}</p>
          <p className="text-sm font-medium text-[#121212] mt-1 line-clamp-1">{property.title}</p>
          <div className="flex items-center gap-1 mt-1 text-xs text-[#7f7e7e]">
            <MapPin size={12} />
            <span>{property.location}</span>
          </div>

          <div className="flex items-center gap-4 mt-3 text-xs text-[#7f7e7e]">
            <span className="flex items-center gap-1">
              <Maximize2 size={12} />
              {property.sqft}
            </span>
            <span className="flex items-center gap-1">
              <BedDouble size={12} />
              {property.beds} Beds
            </span>
            <span className="flex items-center gap-1">
              <Bath size={12} />
              {property.baths} Baths
            </span>
          </div>

          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#ededed]">
            <div className="w-7 h-7 rounded-full bg-[#305e82] flex items-center justify-center text-white text-xs font-semibold">
              {property.agentInitials}
            </div>
            <span className="text-xs font-medium text-[#121212]">{property.agentName}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

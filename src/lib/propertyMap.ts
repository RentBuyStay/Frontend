import type { Property } from "@/components/PropertyCard";
import type { Listing } from "@/components/ListingCard";
import type { PropertyResponse } from "@/services/types";

// priceFrequency → human suffix shown after the amount (OUTRIGHT = sale, no suffix).
const FREQ_SUFFIX: Record<string, string> = {
  PER_NIGHT: "/night",
  PER_WEEK: "/week",
  PER_MONTH: "/month",
  PER_YEAR: "/year",
  OUTRIGHT: "",
};

// Backend listingType → the card's tag label.
const TAG: Record<string, Property["tag"]> = {
  RENT: "For Rent",
  BUY: "For Sale",
  SHORTLET: "Shortlet",
};

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase();
}

// TEMPORARY placeholders — until the backend ships a real photo-upload endpoint,
// photo-less listings get one of these house photos, chosen deterministically by
// id so each listing looks different but stays consistent across renders.
const PLACEHOLDERS = [
  "/images/prop1.jpg",
  "/images/prop2.jpg",
  "/images/prop3.jpg",
  "/images/prop4.jpg",
  "/images/prop5.jpg",
];

function placeholderFor(id: string): string {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return PLACEHOLDERS[h % PLACEHOLDERS.length];
}

/** Map a backend PropertyResponse to the landing PropertyCard's shape. */
export function toPropertyCard(p: PropertyResponse): Property {
  const currencyPrefix = !p.currency || p.currency === "NGN" ? "₦" : `${p.currency} `;
  const suffix = FREQ_SUFFIX[p.priceFrequency] ?? "";
  const agentName = p.assignedAgentName || p.ownerName || "Property Owner";
  const primary = p.photos?.find((ph) => ph.isPrimary) ?? p.photos?.[0];

  return {
    id: p.id,
    title: p.title,
    price: `${currencyPrefix}${p.price.toLocaleString()}${suffix}`,
    location: [p.city, p.state].filter(Boolean).join(", "),
    sqft: p.totalAreaSqm ? `${p.totalAreaSqm} sqm` : "—",
    beds: p.bedrooms ?? 0,
    baths: p.bathrooms ?? 0,
    tag: TAG[p.listingType] ?? "For Sale",
    agentName,
    agentInitials: initials(agentName) || "RB",
    // Real photo if the API returned one; otherwise a per-listing house
    // placeholder (temporary, until photo upload exists — see PLACEHOLDERS).
    image: primary?.url ?? placeholderFor(p.id),
  };
}

function formatListedDate(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return `Listed on ${d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}`;
}

/** Map a backend PropertyResponse to the listing-page ListingCard shape. */
export function toListingCard(p: PropertyResponse): Listing {
  const currencyPrefix = !p.currency || p.currency === "NGN" ? "₦" : `${p.currency} `;
  const suffix = FREQ_SUFFIX[p.priceFrequency] ?? "";
  const agent = p.assignedAgentName || p.ownerName || "Property Owner";
  const primary = p.photos?.find((ph) => ph.isPrimary) ?? p.photos?.[0];

  return {
    id: p.id,
    title: p.title,
    price: `${currencyPrefix}${p.price.toLocaleString()}${suffix}`,
    location: [p.city, p.state].filter(Boolean).join(", "),
    date: formatListedDate(p.listedAt ?? p.createdAt),
    image: primary?.url ?? placeholderFor(p.id),
    desc: p.description ?? "",
    agent,
    agentInitials: initials(agent) || "RB",
    tags: (p.amenities ?? []).slice(0, 3).map((a) => a.name),
    beds: p.bedrooms ?? 0,
    baths: p.bathrooms ?? 0,
    area: p.totalAreaSqm ? `${p.totalAreaSqm} sqm` : "—",
  };
}

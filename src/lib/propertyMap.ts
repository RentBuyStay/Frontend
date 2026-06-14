import type { Property } from "@/components/PropertyCard";
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
    // Only use a real photo if the API returned one; otherwise the card shows
    // its placeholder (never fabricate a stock image).
    image: primary?.url,
  };
}

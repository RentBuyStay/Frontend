import type { Property } from "@/components/PropertyCard";
import type { Listing } from "@/components/ListingCard";
import type { PropertyResponse } from "@/services/types";
import type { MediaItem } from "@/components/PropertyGallery";

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

/** Photos ordered primary-first, then by sortOrder. */
function orderedPhotos(p: PropertyResponse) {
  return [...(p.photos ?? [])].sort((a, b) => {
    if (a.isPrimary && !b.isPrimary) return -1;
    if (b.isPrimary && !a.isPrimary) return 1;
    return (a.sortOrder ?? 0) - (b.sortOrder ?? 0);
  });
}

/** All photo URLs for a property, primary first then by sortOrder. Falls back
 *  to a single per-listing placeholder so there's always at least one image. */
function imageList(p: PropertyResponse): string[] {
  const urls = orderedPhotos(p).map((ph) => ph.url).filter(Boolean);
  return urls.length ? urls : [placeholderFor(p.id)];
}

/** Ordered media items (image | video) for the gallery. */
function mediaList(p: PropertyResponse): MediaItem[] {
  const items = orderedPhotos(p)
    .filter((ph) => ph.url)
    .map((ph) => ({
      url: ph.url,
      type: (ph.contentType?.startsWith("video/") ? "video" : "image") as MediaItem["type"],
    }));
  return items.length ? items : [{ url: placeholderFor(p.id), type: "image" }];
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
    agentVerified: p.listerVerified ?? false,
    // Real photo if the API returned one; otherwise a per-listing house
    // placeholder (temporary, until photo upload exists — see PLACEHOLDERS).
    image: primary?.url ?? placeholderFor(p.id),
    images: imageList(p),
    media: mediaList(p),
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
    agentVerified: p.listerVerified ?? false,
    tags: (p.amenities ?? []).slice(0, 3).map((a) => a.name),
    beds: p.bedrooms ?? 0,
    baths: p.bathrooms ?? 0,
    area: p.totalAreaSqm ? `${p.totalAreaSqm} sqm` : "—",
    images: imageList(p),
    media: mediaList(p),
  };
}

/**
 * Buckets the backend's granular property types (e.g. "Flats & Apartments",
 * "Duplex", "Office Space") into the sidebar's curated categories, and maps a
 * sidebar row label ("Flats/Apartments", "House", "Apartments", "Studios"…) to
 * the same bucket — so the sidebar can keep its fixed category rows and fill in
 * real facet counts (0 when a category has none).
 */
export type TypeClass =
  | "flats"
  | "house"
  | "commercial"
  | "coworking"
  | "land"
  | "studio"
  | "penthouse"
  | "villa"
  | "loft"
  | "other";

/** Classify a backend property-type display name. */
export function classifyType(displayName: string): TypeClass {
  const s = displayName.toLowerCase();
  if (s.includes("studio")) return "studio"; // before flat/apartment ("Studio Apartment")
  if (s.includes("penthouse")) return "penthouse";
  if (s.includes("villa")) return "villa";
  if (s.includes("loft")) return "loft";
  if (s.includes("co-working") || s.includes("coworking") || s.includes("co working")) return "coworking";
  if (s.includes("land")) return "land";
  if (s.includes("shop") || s.includes("office") || s.includes("warehouse") || s.includes("commercial")) return "commercial";
  if (s.includes("duplex") || s.includes("terrace") || s.includes("detached") || s.includes("bungalow") || s.includes("semi")) return "house";
  if (s.includes("flat") || s.includes("apartment") || s.includes("self contain") || s.includes("self-contain")) return "flats";
  return "other";
}

/** A representative backend property-type id for each class — used to turn a
 * sidebar category into a "/search?type=…" link. */
export const CLASS_TO_TYPE_ID: Partial<Record<TypeClass, number>> = {
  flats: 16, // Flats & Apartments
  house: 6, // Duplex
  commercial: 13, // Office Space
  coworking: 21, // Co-working Space
  land: 15, // Land
  studio: 11, // Studio Apartment
  penthouse: 10, // Penthouse
};

/** Build the /search href for a sidebar category (optionally with a bedroom count). */
export function categorySearchHref(
  label: string,
  opts: { listingType?: string; bedrooms?: number } = {},
) {
  const params = new URLSearchParams();
  const id = CLASS_TO_TYPE_ID[classForLabel(label)];
  if (id) params.set("type", String(id));
  if (opts.bedrooms) params.set("beds", String(opts.bedrooms));
  if (opts.listingType) params.set("listingType", opts.listingType);
  return `/search?${params.toString()}`;
}

/** Classify a sidebar category/row label. */
export function classForLabel(label: string): TypeClass {
  const s = label.toLowerCase();
  if (s.includes("studio")) return "studio";
  if (s.includes("penthouse")) return "penthouse";
  if (s.includes("villa")) return "villa";
  if (s.includes("loft")) return "loft";
  if (s.includes("co-working") || s.includes("coworking")) return "coworking";
  if (s.includes("land")) return "land";
  if (s.includes("commercial")) return "commercial";
  if (s.includes("house")) return "house";
  if (s.includes("flat") || s.includes("apartment")) return "flats";
  return "other";
}

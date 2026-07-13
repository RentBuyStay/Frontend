"use client";

import Link from "next/link";
import { useGetPropertyFacetsQuery } from "@/services/propertyApi";
import { useGetPropertyTypesQuery } from "@/services/referenceApi";
import type { SidebarPropertyType } from "./ListingSidebar";

const CATEGORY_PATH: Record<string, string> = {
  BUY: "/for-sale",
  RENT: "/for-rent",
  SHORTLET: "/shortlet",
};

/**
 * "Property Type | Property Count" rows of the listing-page sidebar — the actual
 * property types (and counts) the backend returns from GET /properties/facets.
 * Falls back to the static reference rows only when the facets are empty
 * (e.g. before any listings exist) so the section is never blank.
 */
export default function SidebarTypeCounts({
  listingType,
  fallback,
}: {
  listingType?: "RENT" | "BUY" | "SHORTLET";
  fallback: SidebarPropertyType[];
}) {
  const { data } = useGetPropertyFacetsQuery(listingType ? { listingType } : undefined);
  const { data: types } = useGetPropertyTypesQuery();

  // Map a property-type display name → its numeric id, so a row can link to a
  // "?type=<id>" filtered search.
  const idByName = new Map<string, number>();
  for (const t of types ?? []) idByName.set(t.displayName.toLowerCase(), t.id);

  const live = data?.byPropertyType ?? [];
  const basePath = listingType ? CATEGORY_PATH[listingType] : "/search";

  // Real backend rows when we have them; otherwise the curated fallback (no link).
  const rows = live.length
    ? live.map((f) => ({ name: f.id, count: f.count, id: idByName.get(f.id.toLowerCase()) }))
    : fallback.map((f) => ({ name: f.name, count: f.count, id: undefined as number | undefined }));

  const hrefFor = (id?: number) => {
    const params = new URLSearchParams();
    if (id) params.set("type", String(id));
    if (listingType) params.set("listingType", listingType);
    return `${basePath}?${params.toString()}`;
  };

  return (
    <div className="flex flex-col">
      <div
        className="flex items-center justify-between py-1.5 border-b border-[#ededed]"
        style={{ fontSize: "14px", color: "#305e82", fontWeight: 600 }}
      >
        <span>Property Type</span>
        <span>Property Count</span>
      </div>
      {rows.map((t) => (
        <Link
          key={t.name}
          href={hrefFor(t.id)}
          className="flex items-center justify-between py-1.5 hover:underline"
          style={{ fontSize: "14px", color: "#305e82" }}
        >
          <span className="truncate pr-2">{t.name}</span>
          <span className="shrink-0">{t.count.toLocaleString()}</span>
        </Link>
      ))}
    </div>
  );
}

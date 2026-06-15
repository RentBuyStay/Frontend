"use client";

import { useGetPropertyFacetsQuery } from "@/services/propertyApi";
import type { SidebarPropertyType } from "./ListingSidebar";

/**
 * "Property Type | Property Count" rows of the listing-page sidebar.
 * Shows live grouped counts from GET /properties/facets when available, and
 * falls back to the static Figma reference rows when the facets are empty
 * (e.g. before the backend search index is populated) — keeping the UI intact.
 */
export default function SidebarTypeCounts({
  listingType,
  fallback,
}: {
  listingType: "RENT" | "BUY" | "SHORTLET";
  fallback: SidebarPropertyType[];
}) {
  const { data } = useGetPropertyFacetsQuery({ listingType });

  const live = data?.byPropertyType ?? [];
  const rows: SidebarPropertyType[] =
    live.length > 0
      ? [...live]
          .sort((a, b) => b.count - a.count)
          .slice(0, 5)
          .map((f) => ({ name: f.id, count: f.count }))
      : fallback;

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
        <div
          key={t.name}
          className="flex items-center justify-between py-1.5"
          style={{ fontSize: "14px", color: "#305e82" }}
        >
          <span className="truncate pr-2">{t.name}</span>
          <span className="shrink-0">{t.count.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

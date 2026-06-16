"use client";

import { useGetPropertyFacetsQuery } from "@/services/propertyApi";
import { classForLabel, classifyType } from "@/lib/propertyTypeGroups";
import type { SidebarBedroomTable } from "./ListingSidebar";

/**
 * The "Type × bedroom" grid of the listing-page sidebar. Built from the live
 * /properties/facets `byTypeBedrooms` cross-tab when available, falling back to
 * the static Figma reference rows when empty (e.g. before the backend redeploy),
 * so the layout stays intact.
 */
export default function SidebarBedroomBreakdown({
  listingType,
  fallback,
}: {
  listingType?: "RENT" | "BUY" | "SHORTLET";
  fallback: SidebarBedroomTable;
}) {
  const { data } = useGetPropertyFacetsQuery(listingType ? { listingType } : undefined);
  const xt = data?.byTypeBedrooms ?? [];

  // Keep the curated row labels (Flats / Houses, Apartments / Studios…) and bucket
  // the live type×bedroom counts into them (0 when none), so no row disappears.
  const rows: string[][] = fallback.rows.map((row) => {
    const cls = classForLabel(row[0]);
    return [
      row[0],
      ...[1, 2, 3, 4, 5].map((b) =>
        String(
          xt.reduce(
            (sum, r) => (classifyType(r.type) === cls && r.bedrooms === b ? sum + r.count : sum),
            0,
          ),
        ),
      ),
    ];
  });

  return (
    <div className="flex flex-col">
      <div
        className="grid grid-cols-6 gap-2 py-1.5 border-b border-[#ededed]"
        style={{ fontSize: "12px", color: "#305e82", fontWeight: 600 }}
      >
        {fallback.cols.map((c) => (
          <span key={c} className={c === "Type" ? "" : "text-right"}>
            {c}
          </span>
        ))}
      </div>
      {rows.map((row) => (
        <div
          key={row[0]}
          className="grid grid-cols-6 gap-2 py-1.5"
          style={{ fontSize: "12px", color: "#305e82" }}
        >
          {row.map((cell, i) => (
            <span key={i} className={i === 0 ? "truncate" : "text-right"}>
              {cell}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

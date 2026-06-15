"use client";

import { useGetPropertyFacetsQuery } from "@/services/propertyApi";
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
  listingType: "RENT" | "BUY" | "SHORTLET";
  fallback: SidebarBedroomTable;
}) {
  const { data } = useGetPropertyFacetsQuery({ listingType });
  const xt = data?.byTypeBedrooms ?? [];

  let rows: string[][];
  if (xt.length > 0) {
    const byType = new Map<string, Map<number, number>>();
    for (const r of xt) {
      if (!byType.has(r.type)) byType.set(r.type, new Map());
      byType.get(r.type)!.set(r.bedrooms, r.count);
    }
    rows = [...byType.entries()].map(([type, beds]) => [
      type,
      ...[1, 2, 3, 4, 5].map((b) => {
        const c = beds.get(b);
        return c ? String(c) : "—";
      }),
    ]);
  } else {
    rows = fallback.rows;
  }

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

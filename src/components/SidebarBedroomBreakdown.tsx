"use client";

import Link from "next/link";
import { useGetPropertyFacetsQuery } from "@/services/propertyApi";
import { useGetPropertyTypesQuery } from "@/services/referenceApi";
import type { SidebarBedroomTable } from "./ListingSidebar";

const CATEGORY_PATH: Record<string, string> = {
  BUY: "/for-sale",
  RENT: "/for-rent",
  SHORTLET: "/shortlet",
};

const BEDS = [1, 2, 3, 4, 5];
const COLS = ["Type", "1 Bed", "2 Bed", "3 Bed", "4 Bed", "5 Bed"];

/**
 * The "Type × bedroom" grid — built from the live /properties/facets
 * `byTypeBedrooms` cross-tab (real property types as rows, bedroom counts as
 * columns). Falls back to the static reference rows only when empty.
 */
export default function SidebarBedroomBreakdown({
  listingType,
  fallback,
}: {
  listingType?: "RENT" | "BUY" | "SHORTLET";
  fallback: SidebarBedroomTable;
}) {
  const { data } = useGetPropertyFacetsQuery(listingType ? { listingType } : undefined);
  const { data: types } = useGetPropertyTypesQuery();
  const xt = data?.byTypeBedrooms ?? [];

  const idByName = new Map<string, number>();
  for (const t of types ?? []) idByName.set(t.displayName.toLowerCase(), t.id);

  const basePath = listingType ? CATEGORY_PATH[listingType] : "/search";

  // Distinct real types (preserve backend order), each row = counts for beds 1..5.
  const typeNames = [...new Set(xt.map((r) => r.type))];
  const liveRows = typeNames.map((type) => ({
    type,
    id: idByName.get(type.toLowerCase()),
    cells: BEDS.map((b) => xt.reduce((sum, r) => (r.type === type && r.bedrooms === b ? sum + r.count : sum), 0)),
  }));

  const cols = liveRows.length ? COLS : fallback.cols;
  const hrefFor = (id?: number, beds?: number) => {
    const params = new URLSearchParams();
    if (id) params.set("type", String(id));
    if (beds) params.set("beds", String(beds));
    if (listingType) params.set("listingType", listingType);
    return `${basePath}?${params.toString()}`;
  };

  return (
    <div className="flex flex-col">
      <div
        className="grid grid-cols-6 gap-2 py-1.5 border-b border-[#ededed]"
        style={{ fontSize: "12px", color: "#305e82", fontWeight: 600 }}
      >
        {cols.map((c) => (
          <span key={c} className={c === "Type" ? "" : "text-right"}>
            {c}
          </span>
        ))}
      </div>

      {liveRows.length
        ? liveRows.map((row) => (
            <div key={row.type} className="grid grid-cols-6 gap-2 py-1.5" style={{ fontSize: "12px", color: "#305e82" }}>
              <Link href={hrefFor(row.id)} className="truncate hover:underline">
                {row.type}
              </Link>
              {row.cells.map((n, i) => (
                <Link key={i} href={hrefFor(row.id, BEDS[i])} className="text-right hover:underline">
                  {n}
                </Link>
              ))}
            </div>
          ))
        : fallback.rows.map((row) => (
            <div key={row[0]} className="grid grid-cols-6 gap-2 py-1.5" style={{ fontSize: "12px", color: "#305e82" }}>
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

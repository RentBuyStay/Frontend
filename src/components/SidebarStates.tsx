"use client";

import Link from "next/link";
import { useGetPropertyFacetsQuery } from "@/services/propertyApi";

const CATEGORY_PATH: Record<string, string> = {
  BUY: "/for-sale",
  RENT: "/for-rent",
  SHORTLET: "/shortlet",
};

/**
 * "Explore States" — keeps the full static list of states, but overlays live
 * counts from GET /properties/facets (byState) and links each to a filtered
 * search. States with listings are emphasised; the rest stay muted but clickable.
 */
export default function SidebarStates({
  states,
  listingType,
}: {
  states: string[];
  listingType?: "RENT" | "BUY" | "SHORTLET";
}) {
  const { data } = useGetPropertyFacetsQuery(listingType ? { listingType } : undefined);

  // Case-insensitive state → count map from the facets.
  const counts = new Map<string, number>();
  for (const f of data?.byState ?? []) {
    if (f.id) counts.set(f.id.toLowerCase(), (counts.get(f.id.toLowerCase()) ?? 0) + f.count);
  }

  const basePath = listingType ? CATEGORY_PATH[listingType] : "/search";

  return (
    <div className="flex flex-wrap gap-x-3 gap-y-1" style={{ fontSize: "14px", lineHeight: "32px" }}>
      {states.map((s) => {
        const count = counts.get(s.toLowerCase()) ?? 0;
        const has = count > 0;
        return (
          <Link
            key={s}
            href={`${basePath}?state=${encodeURIComponent(s)}`}
            className="hover:underline whitespace-nowrap"
            style={{ color: has ? "#305e82" : "#9aa6b2", fontWeight: has ? 600 : 400 }}
            title={has ? `${count} listing${count === 1 ? "" : "s"} in ${s}` : `No listings in ${s} yet`}
          >
            {s}
            {has && <span style={{ color: "#807e7e", fontWeight: 400 }}> ({count})</span>}
          </Link>
        );
      })}
    </div>
  );
}

"use client";

import { useGetActivePropertiesQuery } from "@/services/propertyApi";
import { toPropertyCard } from "@/lib/propertyMap";
import PropertyCard from "./PropertyCard";

const GRID = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6";

function CardSkeleton() {
  return (
    <div className="rounded-[20px] border border-[#f6f6f6] overflow-hidden animate-pulse">
      <div className="h-[224px] bg-[#ededed]" />
      <div className="px-4 py-4 flex flex-col gap-3">
        <div className="h-4 w-24 bg-[#ededed] rounded" />
        <div className="h-4 w-3/4 bg-[#f1f1f1] rounded" />
        <div className="h-3 w-1/2 bg-[#f1f1f1] rounded" />
      </div>
    </div>
  );
}

/**
 * Home "Featured Properties" — pulls the public listing directory
 * (GET /properties) and shows the first 3 ACTIVE listings.
 */
export default function FeaturedProperties() {
  const { data, isLoading, isError } = useGetActivePropertiesQuery({ size: 12 });

  if (isLoading) {
    return (
      <div className={GRID}>
        {[0, 1, 2].map((i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  const featured = (data?.content ?? [])
    .filter((p) => p.status === "ACTIVE")
    .slice(0, 3);

  if (isError || featured.length === 0) {
    return (
      <div className="rounded-[20px] border border-[#f6f6f6] bg-[#fafafa] py-16 text-center">
        <p className="text-[14px] text-[#807e7e]">
          {isError
            ? "Couldn't load listings right now. Please try again later."
            : "No featured listings available yet."}
        </p>
      </div>
    );
  }

  return (
    <div className={GRID}>
      {featured.map((p) => (
        <PropertyCard key={p.id} property={toPropertyCard(p)} />
      ))}
    </div>
  );
}

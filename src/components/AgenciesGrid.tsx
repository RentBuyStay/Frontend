"use client";

import { useGetAgenciesQuery } from "@/services/agentApi";
import { toAgencyCard } from "@/lib/agentMap";
import AgencyCard from "./AgencyCard";

const GRID = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
const GAP = { gap: "40px 24px" } as const;

/** Live "All Agencies & Developers" grid — GET /agencies. */
export default function AgenciesGrid({ limit = 6 }: { limit?: number }) {
  const { data, isLoading, isError } = useGetAgenciesQuery({ size: limit });

  if (isLoading) {
    return (
      <div className={GRID} style={GAP}>
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-[440px] rounded-[20px] border border-[#f6f6f6] bg-[#fafafa] animate-pulse" />
        ))}
      </div>
    );
  }

  const items = (data?.content ?? []).slice(0, limit);

  if (isError || items.length === 0) {
    return (
      <div className="rounded-[20px] border border-[#f6f6f6] bg-[#fafafa] py-16 text-center">
        <p className="text-[14px] text-[#807e7e]">
          {isError ? "Couldn’t load agencies right now." : "No agencies available yet."}
        </p>
      </div>
    );
  }

  return (
    <div className={GRID} style={GAP}>
      {items.map((a) => (
        <AgencyCard key={a.id} a={toAgencyCard(a)} />
      ))}
    </div>
  );
}

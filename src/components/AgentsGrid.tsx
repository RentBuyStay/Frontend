"use client";

import { useGetAgentsQuery } from "@/services/agentApi";
import { toAgentCard } from "@/lib/agentMap";
import AgentCard from "./AgentCard";

const GRID = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
const GAP = { gap: "40px 24px" } as const;

/** Live "All Agents" grid — GET /agents (user_type=property_agent). */
export default function AgentsGrid({ limit = 9 }: { limit?: number }) {
  const { data, isLoading, isError } = useGetAgentsQuery({ size: limit });

  if (isLoading) {
    return (
      <div className={GRID} style={GAP}>
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-[280px] rounded-[20px] border border-[#f6f6f6] bg-[#fafafa] animate-pulse" />
        ))}
      </div>
    );
  }

  const items = (data?.content ?? []).slice(0, limit);

  if (isError || items.length === 0) {
    return (
      <div className="rounded-[20px] border border-[#f6f6f6] bg-[#fafafa] py-16 text-center">
        <p className="text-[14px] text-[#807e7e]">
          {isError ? "Couldn’t load agents right now." : "No verified agents available yet."}
        </p>
      </div>
    );
  }

  return (
    <div className={GRID} style={GAP}>
      {items.map((a) => (
        <AgentCard key={a.userId} a={toAgentCard(a)} />
      ))}
    </div>
  );
}

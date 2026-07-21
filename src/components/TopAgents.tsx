"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGetAgentsQuery } from "@/services/agentApi";
import type { AgentListItem } from "@/services/types";
import LoginModal from "./LoginModal";
import { useAuthAction } from "@/lib/useAuthAction";

const GRID = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6";

function initials(name: string) {
  const p = name.trim().split(/\s+/).filter(Boolean);
  return ((p[0]?.[0] ?? "") + (p[1]?.[0] ?? "")).toUpperCase() || "RB";
}

function AgentCard({ a, onAction }: { a: AgentListItem; onAction: () => void }) {
  const name = `${a.firstName ?? ""} ${a.lastName ?? ""}`.trim() || (a.email ?? "Agent");
  const agency = a.organizationName || "Independent Agent";
  const location = [a.city, a.state].filter(Boolean).join(", ") || "Nigeria";
  const rating = a.averageRating != null && (a.reviewCount ?? 0) > 0 ? a.averageRating.toFixed(1) : "New";
  const listings = a.listingCount ?? 0;
  const { requireAuth } = useAuthAction();

  // Deep-link the exact action so Call dials and Message opens the chat with this
  // specific agent in the app, stopping the click from bubbling to the login modal.
  const contact = (action: "call" | "message") => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    requireAuth(
      action === "call"
        ? `/dashboard/messages?contact=${a.userId}&do=call`
        : `/dashboard/messages?contact=${a.userId}`,
    );
  };

  return (
    <div onClick={onAction} role="button" tabIndex={0} className="bg-white rounded-[20px] p-6 flex flex-col gap-5 cursor-pointer hover:shadow-sm transition-shadow" style={{ border: "1px solid #f6f6f6" }}>
      {/* Avatar + Name/Agency/Location */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-[#f3fefe] border border-[#ededed] flex items-center justify-center shrink-0">
          {a.avatarUrl ? (
            <Image src={a.avatarUrl} alt={name} width={64} height={64} className="object-cover w-full h-full" />
          ) : (
            <span className="text-[#305e82] font-semibold" style={{ fontSize: "18px" }}>
              {initials(name)}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <p style={{ fontSize: "18px", lineHeight: "24px", fontWeight: 600, color: "#121212" }} className="truncate">
              {name}
            </p>
            {a.identityVerified && (
              <Image src="/icons/verify.svg" alt="Verified" width={20} height={20} className="shrink-0" />
            )}
          </div>
          <p style={{ fontSize: "12px", color: "#807e7e" }} className="truncate">
            {agency}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <Image src="/icons/location.svg" alt="" width={20} height={20} />
            <span style={{ fontSize: "14px", color: "#305e82" }}>{location}</span>
          </div>
        </div>
      </div>

      <div className="h-px bg-[#f6f6f6] -mx-6" />

      {/* Rating + Listings | View all */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3" style={{ fontSize: "14px", color: "#807e7e" }}>
          <div className="flex items-center gap-1.5">
            <Image src="/icons/star.svg" alt="" width={20} height={20} />
            <span>{rating}</span>
          </div>
          <div className="w-px h-4 bg-[#807e7e]/40" />
          <div className="flex items-center gap-1.5">
            <Image src="/icons/buildings.svg" alt="" width={20} height={20} />
            <span>{listings} listings</span>
          </div>
        </div>
        <Link href={`/search?agentId=${a.userId}`} onClick={(e) => e.stopPropagation()} className="hover:underline" style={{ fontSize: "14px", fontWeight: 500, color: "#305e82" }}>
          View all Properties
        </Link>
      </div>

      <div className="h-px bg-[#f6f6f6] -mx-6" />

      {/* Call + Message */}
      <div className="flex gap-4">
        <button
          onClick={contact("call")}
          className="flex-1 flex items-center justify-center gap-2 rounded-[12px] hover:bg-[#f6f6f6] transition-colors"
          style={{ height: "48px", padding: "8px 24px", border: "1px solid #ededed", color: "#121212", fontSize: "14px", fontWeight: 500 }}
        >
          <Image src="/icons/call.svg" alt="" width={20} height={20} /> Call
        </button>
        <button
          onClick={contact("message")}
          className="flex-1 flex items-center justify-center gap-2 rounded-[12px] text-white hover:opacity-90 transition-opacity"
          style={{
            height: "48px",
            padding: "8px 24px",
            fontSize: "14px",
            fontWeight: 500,
            background: "linear-gradient(175deg, rgba(117,163,199,1) 0%, rgba(48,94,130,1) 100%)",
          }}
        >
          <Image src="/icons/messages-2.svg" alt="" width={20} height={20} /> Message
        </button>
      </div>
    </div>
  );
}

/** Home "Top Verified Agents" — live from GET /agents (user_type=property_agent). */
export default function TopAgents() {
  const { data, isLoading, isError } = useGetAgentsQuery({ size: 6 });
  const [showLogin, setShowLogin] = useState(false);

  if (isLoading) {
    return (
      <div className={GRID}>
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-[260px] rounded-[20px] border border-[#f6f6f6] bg-[#fafafa] animate-pulse" />
        ))}
      </div>
    );
  }

  const agents = data?.content ?? [];

  if (isError || agents.length === 0) {
    return (
      <div className="rounded-[20px] border border-[#f6f6f6] bg-[#fafafa] py-16 text-center">
        <p className="text-[14px] text-[#807e7e]">
          {isError ? "Couldn't load agents right now. Please try again later." : "No verified agents available yet."}
        </p>
      </div>
    );
  }

  return (
    <div className={GRID}>
      {agents.map((a) => (
        <AgentCard key={a.userId} a={a} onAction={() => setShowLogin(true)} />
      ))}
      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
}

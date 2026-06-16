"use client";

import { useState } from "react";
import Image from "next/image";
import { Phone, MessageCircle } from "lucide-react";
import { useGetAgentsQuery } from "@/services/agentApi";
import type { AgentListItem } from "@/services/types";
import LoginModal from "./LoginModal";

function initials(name: string) {
  const p = name.trim().split(/\s+/).filter(Boolean);
  return ((p[0]?.[0] ?? "") + (p[1]?.[0] ?? "")).toUpperCase() || "RB";
}

function AgentCardItem({ a, onAction }: { a: AgentListItem; onAction: () => void }) {
  const name = `${a.firstName ?? ""} ${a.lastName ?? ""}`.trim() || (a.email ?? "Agent");
  const agency = a.organizationName || "Independent Agent";
  const location = [a.city, a.state].filter(Boolean).join(", ") || "Nigeria";
  const listings = a.listingCount ?? 0;
  const rating = a.averageRating != null && (a.reviewCount ?? 0) > 0 ? a.averageRating.toFixed(1) : "New";
  const avatar = a.avatarUrl;

  return (
    <div className="bg-white rounded-[20px] p-5 flex flex-col gap-4" style={{ border: "1px solid #f6f6f6" }}>
      {/* Avatar + name + agency + location */}
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-full bg-[#f3fefe] border border-[#ededed] overflow-hidden flex items-center justify-center shrink-0">
          {avatar ? (
            <Image src={avatar} alt={name} width={56} height={56} className="object-cover w-full h-full" />
          ) : (
            <span style={{ fontSize: "16px", fontWeight: 600, color: "#305e82" }}>{initials(name)}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <p style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 600, color: "#121212" }} className="truncate">
              {name}
            </p>
            <Image src="/icons/verify.svg" alt="" width={18} height={18} className="shrink-0" />
          </div>
          <p style={{ fontSize: "12px", color: "#807e7e" }} className="truncate">{agency}</p>
          <div className="flex items-center gap-1 mt-0.5">
            <Image src="/icons/location.svg" alt="" width={16} height={16} />
            <span style={{ fontSize: "12px", color: "#305e82" }}>{location}</span>
          </div>
        </div>
      </div>

      <div className="h-px bg-[#f6f6f6] -mx-5" />

      {/* Rating + listings */}
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

      <div className="h-px bg-[#f6f6f6] -mx-5" />

      {/* Buttons — require sign-in */}
      <div className="flex gap-3">
        <button onClick={onAction} className="flex-1 flex items-center justify-center gap-2 rounded-[12px] hover:bg-[#f6f6f6] transition-colors" style={{ height: "48px", padding: "8px 24px", border: "1px solid #ededed", color: "#121212", fontSize: "14px", fontWeight: 500 }}>
          <Phone size={18} strokeWidth={1.5} /> Call
        </button>
        <button onClick={onAction} className="flex-1 flex items-center justify-center gap-2 rounded-[12px] text-white hover:opacity-90 transition-opacity" style={{ height: "48px", padding: "8px 24px", fontSize: "14px", fontWeight: 500, background: "linear-gradient(175deg, rgba(117,163,199,1) 0%, rgba(48,94,130,1) 100%)" }}>
          <MessageCircle size={18} strokeWidth={1.5} /> Message
        </button>
      </div>
    </div>
  );
}

/** Sidebar "Verified Agents" — live from GET /agents (keeps the existing card UI). */
export default function VerifiedAgentsList() {
  const { data, isLoading } = useGetAgentsQuery({ size: 4 });
  const agents = (data?.content ?? []).slice(0, 4);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 style={{ fontSize: "20px", lineHeight: "32px", fontWeight: 600, color: "#121212" }}>Verified Agents</h3>
        <p style={{ fontSize: "16px", lineHeight: "24px", color: "#807e7e" }}>
          Connect with with verified agents and specialists in this area.
        </p>
      </div>

      {isLoading ? (
        [0, 1].map((i) => <div key={i} className="h-[220px] rounded-[20px] border border-[#f6f6f6] bg-[#fafafa] animate-pulse" />)
      ) : agents.length === 0 ? (
        <div className="rounded-[20px] border border-[#f6f6f6] bg-[#fafafa] py-10 text-center">
          <p className="text-[14px] text-[#807e7e]">No verified agents yet.</p>
        </div>
      ) : (
        agents.map((a) => <AgentCardItem key={a.userId} a={a} onAction={() => setShowLogin(true)} />)
      )}

      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
}

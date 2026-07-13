"use client";

import Image from "next/image";
import { useGetPropertyRequestsQuery } from "@/services/propertyRequestApi";
import type { PropertyRequestResponse } from "@/services/types";
import ListingsHeader from "./ListingsHeader";
import Pagination from "./Pagination";

const PAGE_SIZE = 50;

const SEEKER_LABEL: Record<string, string> = {
  INDIVIDUAL: "Individual",
  CORPORATE: "Corporate",
  REAL_ESTATE_AGENT: "Real Estate Agent",
  DEVELOPER: "Developer",
};
const LISTING_LABEL: Record<string, string> = { RENT: "Rent", BUY: "Sale", SHORTLET: "Shortlet" };
const FREQ: Record<string, string> = { RENT: "/year", SHORTLET: "/night", BUY: "" };

function initials(name: string) {
  const p = name.trim().split(/\s+/).filter(Boolean);
  return ((p[0]?.[0] ?? "") + (p[1]?.[0] ?? "")).toUpperCase() || "RB";
}
function fmtDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? ""
    : `Listed on ${d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}`;
}

function RequestCard({ r }: { r: PropertyRequestResponse }) {
  const agent = `${r.posterFirstName ?? ""} ${r.posterLastName ?? ""}`.trim() || "Seeker";
  const lookingFor =
    r.title || `${r.propertyTypeName ?? "Property"} for ${LISTING_LABEL[r.listingType] ?? ""}`.trim();
  const area = [r.city, r.state].filter(Boolean).join(", ") || "—";
  const budget = r.budget != null ? `₦${r.budget.toLocaleString()}${FREQ[r.listingType] ?? ""}` : "—";
  const [budgetMain, budgetFreq] = budget.split("/");

  return (
    <div className="bg-white border border-[#f6f6f6] rounded-[20px] flex flex-col">
      <div className="flex flex-col gap-4 px-4 pt-6 pb-4">
        {/* Seeking | Bedroom */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1 min-w-0">
            <p style={{ fontSize: "12px", color: "#807e7e" }}>Seeking</p>
            <p className="truncate" style={{ fontSize: "14px", lineHeight: "20px", fontWeight: 500, color: "#121212" }}>{lookingFor}</p>
          </div>
          <div className="flex flex-col gap-1 min-w-0">
            <p style={{ fontSize: "12px", color: "#807e7e" }}>Bedroom</p>
            <p style={{ fontSize: "14px", lineHeight: "20px", fontWeight: 500, color: "#121212" }}>{r.bedrooms ?? "Any"}</p>
          </div>
        </div>

        {/* Budget */}
        <div className="flex flex-col gap-1">
          <p style={{ fontSize: "12px", color: "#807e7e" }}>Budget</p>
          <p style={{ color: "#305e82", lineHeight: "24px" }}>
            <span style={{ fontSize: "16px", fontWeight: 700 }}>{budgetMain}</span>
            {budgetFreq && <span style={{ fontSize: "14px", fontWeight: 400 }}>/{budgetFreq}</span>}
          </p>
        </div>

        {/* Area */}
        <div className="flex flex-col gap-1">
          <p style={{ fontSize: "12px", color: "#807e7e" }}>Area</p>
          <p style={{ fontSize: "14px", lineHeight: "20px", fontWeight: 500, color: "#121212" }}>{area}</p>
        </div>

        {/* Request by */}
        <div className="flex flex-col gap-1">
          <p style={{ fontSize: "12px", color: "#807e7e" }}>Request by</p>
          <p style={{ fontSize: "14px", lineHeight: "20px", fontWeight: 500, color: "#121212" }}>
            {SEEKER_LABEL[r.seekerType] ?? r.seekerType}
          </p>
        </div>
      </div>

      <div className="h-px bg-[#f6f6f6] mt-auto" />

      {/* Bottom: poster + date */}
      <div className="flex items-center justify-between gap-2 px-4 py-4">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(48,94,130,0.05)", fontSize: "14px", fontWeight: 600, color: "#305e82" }}>
            {initials(agent)}
          </div>
          <span className="truncate" style={{ fontSize: "14px", fontWeight: 600, color: "#121212" }}>{agent}</span>
        </div>
        <span className="shrink-0" style={{ fontSize: "12px", fontWeight: 500, color: "#305e82" }}>{fmtDate(r.createdAt)}</span>
      </div>
    </div>
  );
}

/** Left column of the property-requests page — live from GET /property-requests. */
export default function RequestResults() {
  const { data, isLoading, isError } = useGetPropertyRequestsQuery({ size: PAGE_SIZE });

  const items = data?.content ?? [];
  const total = data?.totalElements ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const count = isLoading ? "Loading…" : total > 0 ? `Showing 1 - ${items.length} of ${total}` : "No requests found";

  return (
    <div className="flex flex-col gap-6 min-w-0">
      <ListingsHeader title="Property Requests" count={count} />

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-[320px] rounded-[20px] border border-[#f6f6f6] bg-[#fafafa] animate-pulse" />
          ))}
        </div>
      ) : isError ? (
        <div className="rounded-[20px] border border-[#f6f6f6] bg-[#fafafa] py-16 text-center">
          <p className="text-[14px] text-[#807e7e]">Couldn&rsquo;t load requests right now. Please try again later.</p>
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-[20px] border border-[#f6f6f6] bg-[#fafafa] py-16 text-center">
          <p className="text-[14px] text-[#807e7e]">No property requests have been posted yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((r) => (
            <RequestCard key={r.id} r={r} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination current={1} totalPages={totalPages} />
        </div>
      )}
    </div>
  );
}

"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useGetAgenciesQuery } from "@/services/agentApi";
import { toAgencyCard } from "@/lib/agentMap";
import { pageTotal } from "@/services/types";
import AgencyCard from "@/components/AgencyCard";
import DirectoryFilterButtons from "@/components/DirectoryFilterButtons";

const PAGE_SIZE = 9;

// Live "All Agencies & Developers" list — same markup as the original static
// page, driven by GET /agencies with the state/keyword filters (from
// RealtorSearch → URL) and working pagination.
export default function AllAgenciesList() {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const q = sp.get("q") ?? undefined;
  const state = sp.get("state") ?? undefined;
  const page = Math.max(1, Number(sp.get("page") ?? 1) || 1);

  const { data, isLoading, isError } = useGetAgenciesQuery({
    q,
    state,
    page: page - 1, // backend is 0-indexed
    size: PAGE_SIZE,
  });

  // Client-side rating sort of the loaded page (backend has no rating sort yet —
  // see backend issue). Agencies with no reviews sort last.
  const ratingSort = sp.get("ratingSort");
  const raw = data?.content ?? [];
  const items = ratingSort
    ? [...raw].sort((a, b) => {
        const ra = a.averageRating ?? -1;
        const rb = b.averageRating ?? -1;
        return ratingSort === "asc" ? ra - rb : rb - ra;
      })
    : raw;
  const total = pageTotal(data);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const from = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const to = (page - 1) * PAGE_SIZE + items.length;

  const goToPage = (p: number) => {
    const params = new URLSearchParams(sp.toString());
    if (p <= 1) params.delete("page");
    else params.set("page", String(p));
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const pageNumbers = Array.from(
    new Set([1, page - 1, page, page + 1, totalPages].filter((p) => p >= 1 && p <= totalPages)),
  ).sort((a, b) => a - b);

  return (
    <>
      {/* Heading bar — Figma node 252:33985: 1281x72 */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-8 md:mb-10">
        <div className="flex flex-col" style={{ gap: "8px" }}>
          <h1
            style={{
              fontSize: "24px",
              lineHeight: "32px",
              fontWeight: 600,
              color: "#121212",
              letterSpacing: "-0.02em",
            }}
          >
            All Agencies &amp; Developers
          </h1>
          <p
            style={{
              fontSize: "14px",
              lineHeight: "32px",
              fontWeight: 400,
              color: "#807E7E",
              letterSpacing: "-0.02em",
            }}
          >
            {isLoading ? "Loading…" : total === 0 ? "No agencies found" : `Showing ${from} - ${to} of ${total}`}
          </p>
        </div>
        <DirectoryFilterButtons />
      </div>

      {/* Grid — 3 cols × 3 rows (9 cards), gap 24 col / 40 row */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "40px 24px" }}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-[280px] rounded-[20px] border border-[#f6f6f6] bg-[#fafafa] animate-pulse" />
          ))}
        </div>
      ) : isError || items.length === 0 ? (
        <div className="rounded-[20px] border border-[#f6f6f6] bg-[#fafafa] py-16 text-center">
          <p className="text-[14px] text-[#807e7e]">
            {isError ? "Couldn’t load agencies right now." : "No agencies match your search."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "40px 24px" }}>
          {items.map((a) => (
            <AgencyCard key={a.id} a={toAgencyCard(a)} />
          ))}
        </div>
      )}

      {/* Pagination — Figma node 252:34000: 845x36, simple text-link style */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center" style={{ marginTop: "60px", gap: "16px" }}>
          <button
            type="button"
            onClick={() => page > 1 && goToPage(page - 1)}
            disabled={page <= 1}
            className="flex items-center justify-center rounded-md hover:bg-[#F6F6F6] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ width: "36px", height: "36px" }}
            aria-label="Previous"
          >
            <Image src="/icons/arrow-left.svg" alt="" width={20} height={20} />
          </button>
          {pageNumbers.map((p, i) => {
            const gap = i > 0 && p - pageNumbers[i - 1] > 1;
            return (
              <span key={p} className="flex items-center" style={{ gap: "16px" }}>
                {gap && <span style={{ fontSize: "14px", color: "#121212" }}>…</span>}
                <button
                  type="button"
                  onClick={() => goToPage(p)}
                  className="flex items-center justify-center hover:opacity-70 transition-opacity"
                  style={{
                    minWidth: "13px",
                    height: "35px",
                    fontSize: p === page ? "16px" : "14px",
                    fontWeight: p === page ? 600 : 400,
                    color: "#121212",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {p}
                </button>
              </span>
            );
          })}
          <button
            type="button"
            onClick={() => page < totalPages && goToPage(page + 1)}
            disabled={page >= totalPages}
            className="flex items-center justify-center hover:opacity-70 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ gap: "8px", padding: "8px 12px", fontSize: "14px", fontWeight: 500, color: "#121212" }}
          >
            Next
            <Image src="/icons/arrow-right.svg" alt="" width={20} height={20} />
          </button>
        </div>
      )}
    </>
  );
}

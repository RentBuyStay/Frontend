"use client";

import Image from "next/image";

/** Compact page list with ellipses: 1 … (c-1) c (c+1) … N. */
function pageList(current: number, totalPages: number): (number | "…")[] {
  const pages = new Set<number>([1, totalPages, current, current - 1, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);
  const out: (number | "…")[] = [];
  let prev = 0;
  for (const p of sorted) {
    if (prev && p - prev > 1) out.push("…");
    out.push(p);
    prev = p;
  }
  return out;
}

export default function Pagination({
  current = 1,
  totalPages = 1,
  onChange,
}: {
  current?: number;
  totalPages?: number;
  onChange?: (page: number) => void;
}) {
  const go = (p: number) => {
    if (onChange && p >= 1 && p <= totalPages && p !== current) onChange(p);
  };

  return (
    <div className="w-full flex items-center justify-center" style={{ gap: "10px" }}>
      <div className="flex items-center" style={{ gap: "24px" }}>
        <button
          type="button"
          aria-label="Previous page"
          onClick={() => go(current - 1)}
          disabled={current <= 1}
          className="flex items-center rounded-full hover:bg-[#f6f6f6] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ padding: "8px" }}
        >
          <Image src="/icons/arrow-left.svg" alt="" width={20} height={20} />
        </button>

        {pageList(current, totalPages).map((p, i) =>
          p === "…" ? (
            <span key={`e${i}`} style={{ fontSize: "16px", fontWeight: 500, color: "#807E7E" }}>
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => go(p)}
              aria-current={p === current ? "page" : undefined}
              className="hover:opacity-80"
              style={{ fontSize: "16px", fontWeight: 500, color: p === current ? "#305E82" : "#807E7E" }}
            >
              {p}
            </button>
          ),
        )}

        <button
          type="button"
          aria-label="Next page"
          onClick={() => go(current + 1)}
          disabled={current >= totalPages}
          className="flex items-center rounded-full hover:bg-[#f6f6f6] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ padding: "8px", gap: "8px" }}
        >
          <span style={{ fontSize: "14px", fontWeight: 500, color: "#305E82" }}>Next</span>
          <Image src="/icons/arrow-right-pag.svg" alt="" width={20} height={20} />
        </button>
      </div>
    </div>
  );
}

import Image from "next/image";

export default function Pagination({
  current = 1,
  totalPages = 10,
}: {
  current?: number;
  totalPages?: number;
}) {
  return (
    <div
      className="w-full flex items-center justify-center"
      style={{ gap: "10px" }}
    >
      <div className="flex items-center" style={{ gap: "40px" }}>
        {/* Previous arrow — round button, no bg, just icon */}
        <button
          aria-label="Previous page"
          className="flex items-center rounded-full hover:bg-[#f6f6f6] transition-colors"
          style={{ padding: "8px", gap: "8px" }}
        >
          <Image src="/icons/arrow-left.svg" alt="" width={20} height={20} />
        </button>

        {/* Page 1 — active (blue) */}
        <span
          style={{
            fontSize: "16px",
            fontWeight: 500,
            color: current === 1 ? "#305E82" : "#807E7E",
          }}
        >
          1
        </span>

        {/* Page 2 — inactive (gray) */}
        <span
          style={{
            fontSize: "16px",
            fontWeight: 500,
            color: current === 2 ? "#305E82" : "#807E7E",
          }}
        >
          2
        </span>

        {/* Ellipsis — gray */}
        <span style={{ fontSize: "16px", fontWeight: 500, color: "#807E7E" }}>
          ...
        </span>

        {/* Next button — text "Next" + arrow */}
        <button
          aria-label="Next page"
          className="flex items-center rounded-full hover:bg-[#f6f6f6] transition-colors"
          style={{ padding: "8px", gap: "8px" }}
          disabled={current >= totalPages}
        >
          <span
            style={{
              fontSize: "14px",
              fontWeight: 500,
              color: "#305E82",
            }}
          >
            Next
          </span>
          <Image src="/icons/arrow-right-pag.svg" alt="" width={20} height={20} />
        </button>
      </div>
    </div>
  );
}

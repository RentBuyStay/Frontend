import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AgencyCard from "@/components/AgencyCard";
import ListPropertyCTA from "@/components/ListPropertyCTA";
import RealtorSearch from "@/components/RealtorSearch";
import { agencies } from "@/lib/agentsData";
import Image from "next/image";

export const metadata = {
  title: "All Agencies & Developers | RentBuyStay",
  description: "Browse verified real estate agencies and developers across Nigeria.",
};

export default function AllAgenciesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* HERO — Figma node 252:32515: plain white navbar + search bar, no border anywhere */}
      <Navbar />
      <section className="bg-white" style={{ padding: "40px 0" }}>
        <div className="max-w-[1440px] mx-auto px-4 md:px-[80px]">
          {/* Search — shared realtor search (state + keyword + Search) */}
          <RealtorSearch className="w-full py-6 md:h-24" />
        </div>
      </section>

      {/* MAIN — heading + filter dropdowns + grid + pagination */}
      <section className="bg-white" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
        <div className="max-w-[1440px] mx-auto px-4 md:px-[80px]">
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
                Showing 1 - 9 of 37
              </p>
            </div>
            <div className="flex items-center" style={{ gap: "16px" }}>
              <span
                style={{
                  fontSize: "14px",
                  lineHeight: "18px",
                  fontWeight: 500,
                  color: "#121212",
                  letterSpacing: "-0.02em",
                }}
              >
                Filter:
              </span>
              {(["State", "Ratings"] as const).map((label) => (
                <button
                  key={label}
                  type="button"
                  className="flex-1 md:flex-none md:w-[120px] flex items-center justify-between bg-[#F6F6F6] hover:bg-[#EDEDED] transition-colors rounded-[12px]"
                  style={{
                    height: "40px",
                    padding: "8px 16px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      lineHeight: "24px",
                      fontWeight: 400,
                      color: "#121212",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {label}
                  </span>
                  <Image src="/icons/arrow-down.svg" alt="" width={16} height={16} />
                </button>
              ))}
            </div>
          </div>

          {/* Grid — 3 cols × 3 rows (9 cards), gap 24 col / 40 row */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            style={{ gap: "40px 24px" }}
          >
            {agencies.map((a) => (
              <AgencyCard key={a.id} a={a} />
            ))}
          </div>

          {/* Pagination — Figma node 252:34000: 845x36, simple text-link style */}
          <div
            className="flex items-center justify-center"
            style={{ marginTop: "60px", gap: "16px" }}
          >
            <button
              type="button"
              className="flex items-center justify-center rounded-md hover:bg-[#F6F6F6] transition-colors"
              style={{ width: "36px", height: "36px" }}
              aria-label="Previous"
            >
              <Image src="/icons/arrow-left.svg" alt="" width={20} height={20} />
            </button>
            {["1", "2", "..."].map((p, i) => (
              <button
                key={i}
                type="button"
                className="flex items-center justify-center hover:opacity-70 transition-opacity"
                style={{
                  minWidth: "13px",
                  height: "35px",
                  fontSize: i === 0 ? "16px" : "14px",
                  fontWeight: i === 0 ? 600 : 400,
                  color: "#121212",
                  letterSpacing: "-0.02em",
                }}
              >
                {p}
              </button>
            ))}
            <button
              type="button"
              className="flex items-center justify-center hover:opacity-70 transition-opacity"
              style={{ gap: "8px", padding: "8px 12px", fontSize: "14px", fontWeight: 500, color: "#121212" }}
            >
              Next
              <Image src="/icons/arrow-right.svg" alt="" width={20} height={20} />
            </button>
          </div>
        </div>
      </section>

      <ListPropertyCTA />

      <Footer />
    </div>
  );
}

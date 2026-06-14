import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ListPropertyCTA from "@/components/ListPropertyCTA";
import AgentCard from "@/components/AgentCard";
import { agents } from "@/lib/agentsData";
import Image from "next/image";
import { Search, ChevronDown } from "lucide-react";

export const metadata = {
  title: "All Agents | RentBuyStay",
  description: "Browse all verified real estate agents across Nigeria.",
};

export default function AllAgentsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* HERO — Figma node 252:34023: plain white navbar + search bar, no border anywhere */}
      <Navbar />
      <section className="bg-white" style={{ padding: "40px 0" }}>
        <div className="max-w-[1440px] mx-auto px-4 md:px-[80px]">
          {/* Search bar — Figma is white-on-white (invisible card), so the items align with the navbar/heading at the section edge. No horizontal padding inside, just vertical breathing room. */}
          <div
            className="bg-white flex flex-col md:flex-row md:items-center"
            style={{
              width: "100%",
              borderRadius: "12px",
              padding: "24px 0",
              gap: "12px",
            }}
          >
            <div className="flex items-center gap-2 md:contents">
            <div
              className="relative shrink-0 bg-[#F6F6F6] rounded-[12px] flex items-center w-[93px] md:w-[199px]"
              style={{ height: "48px", padding: "0 16px" }}
            >
              <select className="appearance-none truncate text-[14px] text-[#121212] bg-transparent outline-none w-full pr-6 cursor-pointer">
                <option>Select state</option>
                <option>Lagos</option>
                <option>Abuja</option>
                <option>Port Harcourt</option>
              </select>
              <ChevronDown size={16} className="absolute right-4 text-[#121212] pointer-events-none" />
            </div>

            <div
              className="flex items-center gap-2 flex-1 min-w-0 bg-[#F6F6F6] rounded-[12px]"
              style={{ height: "48px", padding: "0 16px" }}
            >
              <Search size={20} className="text-[#807E7E] shrink-0" />
              <input
                type="text"
                placeholder="Enter location, area or keyword..."
                className="flex-1 min-w-0 text-[14px] outline-none placeholder:text-[#807E7E] text-[#121212] bg-transparent"
              />
            </div>
            </div>

            <button
              className="shrink-0 text-white text-[14px] font-medium rounded-[12px] hover:opacity-90 transition-opacity w-full md:w-[160px]"
              style={{
                height: "48px",
                background:
                  "linear-gradient(175deg, rgba(117,163,199,1) 0%, rgba(48,94,130,1) 100%)",
                border: "1px solid rgba(120, 158, 187, 0.5)",
              }}
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* MAIN — heading + filters + grid + pagination */}
      <section className="bg-white" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
        <div className="max-w-[1440px] mx-auto px-4 md:px-[80px]">
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
                All Agents
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
                Showing 1 - 12 of 37
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
                  style={{ height: "40px", padding: "8px 16px" }}
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

          {/* Grid — 3 cols × 4 rows (12 cards), gap 24 col / 40 row */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            style={{ gap: "40px 24px" }}
          >
            {agents.map((a, i) => (
              <AgentCard key={i} a={a} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center" style={{ marginTop: "60px", gap: "16px" }}>
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

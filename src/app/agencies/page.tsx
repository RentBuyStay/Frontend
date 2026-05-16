import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AgencyCard from "@/components/AgencyCard";
import { agencies } from "@/lib/agentsData";
import Image from "next/image";
import Link from "next/link";
import { Search, ChevronDown } from "lucide-react";

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
        <div className="max-w-[1440px] mx-auto px-[80px]">
          {/* Search bar — Figma is white-on-white (invisible card), so the items align with the navbar/heading at the section edge. No horizontal padding inside, just vertical breathing room. */}
          <div
            className="bg-white flex items-center"
            style={{
              width: "100%",
              height: "96px",
              borderRadius: "12px",
              padding: "24px 0",
              gap: "16px",
            }}
          >
            <div
              className="relative shrink-0 bg-[#F6F6F6] rounded-[12px] flex items-center"
              style={{ width: "199px", height: "48px", padding: "0 16px" }}
            >
              <select className="appearance-none text-[14px] text-[#121212] bg-transparent outline-none w-full pr-6 cursor-pointer">
                <option>Select state</option>
                <option>Lagos</option>
                <option>Abuja</option>
                <option>Port Harcourt</option>
              </select>
              <ChevronDown size={16} className="absolute right-4 text-[#121212] pointer-events-none" />
            </div>

            <div
              className="flex items-center gap-2 flex-1 bg-[#F6F6F6] rounded-[12px]"
              style={{ height: "48px", padding: "0 16px" }}
            >
              <Search size={20} className="text-[#807E7E] shrink-0" />
              <input
                type="text"
                placeholder="Enter name, location, area or keyword..."
                className="flex-1 text-[14px] outline-none placeholder:text-[#807E7E] text-[#121212] bg-transparent"
              />
            </div>

            <button
              className="shrink-0 text-white text-[14px] font-medium rounded-[12px] hover:opacity-90 transition-opacity"
              style={{
                width: "160px",
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

      {/* MAIN — heading + filter dropdowns + grid + pagination */}
      <section className="bg-white" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
        <div className="max-w-[1440px] mx-auto px-[80px]">
          {/* Heading bar — Figma node 252:33985: 1281x72 */}
          <div
            className="flex items-end justify-between"
            style={{ marginBottom: "40px" }}
          >
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
                  className="flex items-center justify-between bg-[#F6F6F6] hover:bg-[#EDEDED] transition-colors rounded-[12px]"
                  style={{
                    width: "120px",
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
            className="grid mx-auto"
            style={{
              gridTemplateColumns: "repeat(3, 411px)",
              gap: "40px 24px",
              justifyContent: "center",
            }}
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

      {/* CTA */}
      <section className="bg-white" style={{ padding: "24px" }}>
        <div
          className="relative overflow-hidden mx-auto flex flex-col items-center justify-center text-center"
          style={{
            maxWidth: "1392px",
            height: "464px",
            borderRadius: "20px",
            background: "linear-gradient(186deg, #75A3C7 0%, #305E82 100%)",
            padding: "0 80px",
          }}
        >
          <div className="flex flex-col" style={{ gap: "40px", maxWidth: "640px" }}>
            <div className="flex flex-col" style={{ gap: "16px" }}>
              <h2 className="text-white" style={{ fontSize: "48px", lineHeight: "64px", fontWeight: 600, letterSpacing: "-0.02em" }}>
                Ready to<br />List Your Property?
              </h2>
              <p className="text-white" style={{ fontSize: "18px", lineHeight: "32px", fontWeight: 400, letterSpacing: "-0.02em" }}>
                Join thousands of owners and agents on Nigeria&rsquo;s fastest-growing
                property platform. Get verified, list your property, and reach millions
                of seekers.
              </p>
            </div>
            <div className="flex items-center justify-center" style={{ gap: "16px" }}>
              <Link
                href="/post-property"
                className="flex items-center justify-center text-white rounded-[12px] hover:opacity-90 transition-opacity"
                style={{
                  height: "48px",
                  padding: "8px 24px",
                  fontSize: "14px",
                  fontWeight: 500,
                  background: "#FFAE00",
                  border: "1px solid rgba(120, 158, 187, 0.5)",
                  letterSpacing: "-0.02em",
                }}
              >
                Get Started Free
              </Link>
              <Link
                href="/login"
                className="flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                style={{
                  padding: "16px 32px",
                  fontSize: "14px",
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                }}
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

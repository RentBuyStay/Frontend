import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ListPropertyCTA from "@/components/ListPropertyCTA";
import RealtorSearch from "@/components/RealtorSearch";
import AgenciesGrid from "@/components/AgenciesGrid";
import AgentsGrid from "@/components/AgentsGrid";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Agents & Agencies | RentBuyStay",
  description: "Find all verified real estate agents and agencies across Nigeria.",
};

export default function AgentsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* HERO — Figma node 248:30168: 1440x712, card 1392x664 r=25, city skyline bg */}
      <section className="bg-white">
        <div className="w-full px-4 md:px-6 py-4 md:py-6">
        <div className="relative overflow-hidden bg-[#EBEBEB] rounded-[20px] md:rounded-[25px] min-h-[calc(100svh-32px)] md:min-h-[calc(100svh-48px)]">
          <Image
            src="/images/for-sale-hero.png"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0 z-[1]"
            style={{
              background:
                "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.96) 7%, rgba(0,0,0,0.94) 13%, rgba(0,0,0,0.91) 18%, rgba(0,0,0,0.84) 32%, rgba(0,0,0,0.5) 69%, rgba(102,102,102,0) 100%)",
              opacity: 0.65,
            }}
          />

          <Navbar variant="hero" />

          {/* Content — title vertically centred, search pinned at the bottom */}
          <div className="absolute inset-0 z-10 flex flex-col px-4 md:px-6 pt-[100px] md:pt-[120px] pb-4 md:pb-6">
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center flex flex-col items-center" style={{ width: "738px", maxWidth: "100%", gap: "16px" }}>
                <h1
                  className="text-white text-[32px] leading-[48px] md:text-[64px] md:leading-[80px]"
                  style={{ fontWeight: 600, letterSpacing: "-0.02em" }}
                >
                  Find All Realtors
                  <br />
                  in One Place
                </h1>
                <p
                  className="text-white text-[14px] leading-[24px] md:text-[18px] md:leading-[32px]"
                  style={{ fontWeight: 400, letterSpacing: "-0.02em", maxWidth: "735px" }}
                >
                  Explore the list or search for real estate agents, agencies and developers
                  in our directory.
                </p>
              </div>
            </div>

            {/* Search — shared realtor search, pinned to the bottom of the hero */}
            <RealtorSearch className="w-full max-w-[1344px] mx-auto bg-white rounded-[12px] p-4" />
          </div>
        </div>
        </div>
      </section>

      {/* ALL AGENCIES & DEVELOPERS — 3x2 grid, 411x456 cards, gap 24 */}
      <section className="bg-white" style={{ paddingTop: "80px", paddingBottom: "60px" }}>
        <div className="max-w-[1440px] mx-auto px-4 md:px-[80px]">
          <div className="flex items-center justify-between mb-6 md:mb-10">
            <h2
              className="text-[16px] leading-[32px] md:text-[32px] md:leading-[40px]"
              style={{
                fontWeight: 600,
                color: "#121212",
                letterSpacing: "-0.02em",
              }}
            >
              All Agencies &amp; Developers
            </h2>
            <Link
              href="/agencies"
              className="flex items-center gap-2 hover:text-[#305e82] transition-colors whitespace-nowrap"
              style={{
                fontSize: "14px",
                color: "#121212",
                fontWeight: 500,
                letterSpacing: "-0.02em",
              }}
            >
              View All <ArrowRight size={18} strokeWidth={1.5} />
            </Link>
          </div>

          <AgenciesGrid limit={6} />
        </div>
      </section>

      {/* ALL AGENTS — 3x3 grid, 411x284 cards, gap 24 */}
      <section className="bg-white" style={{ paddingTop: "60px", paddingBottom: "80px" }}>
        <div className="max-w-[1440px] mx-auto px-4 md:px-[80px]">
          <div className="flex items-center justify-between mb-6 md:mb-10">
            <h2
              className="text-[16px] leading-[32px] md:text-[32px] md:leading-[40px]"
              style={{
                fontWeight: 600,
                color: "#121212",
                letterSpacing: "-0.02em",
              }}
            >
              All Agents
            </h2>
            <Link
              href="/agents/all"
              className="flex items-center gap-2 hover:text-[#305e82] transition-colors whitespace-nowrap"
              style={{
                fontSize: "14px",
                color: "#121212",
                fontWeight: 500,
                letterSpacing: "-0.02em",
              }}
            >
              View All <ArrowRight size={18} strokeWidth={1.5} />
            </Link>
          </div>

          <AgentsGrid limit={9} />
        </div>
      </section>

      <ListPropertyCTA />

      <Footer />
    </div>
  );
}

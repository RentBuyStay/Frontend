import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ListPropertyCTA from "@/components/ListPropertyCTA";
import AgencyCard from "@/components/AgencyCard";
import AgentCard from "@/components/AgentCard";
import { agencies, agents } from "@/lib/agentsData";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search, ChevronDown } from "lucide-react";

export const metadata = {
  title: "Agents & Agencies | RentBuyStay",
  description: "Find all verified real estate agents and agencies across Nigeria.",
};

// Homepage shows first 6 agencies and first 9 agents (top of each list)
const featuredAgencies = agencies.slice(0, 6);
const featuredAgents = agents.slice(0, 9);

export default function AgentsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* HERO — Figma node 248:30168: 1440x712, card 1392x664 r=25, city skyline bg */}
      <section className="bg-white">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-4 md:py-6">
        <div className="relative overflow-hidden bg-[#EBEBEB] rounded-[20px] md:rounded-[25px] min-h-[calc(100svh-32px)] md:min-h-[560px]">
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

          <Navbar transparent />

          {/* Title block — Figma: 738x208 at y=216 from card top */}
          <div
            className="absolute left-1/2 -translate-x-1/2 z-10 text-center flex flex-col"
            style={{
              top: "120px",
              width: "738px",
              maxWidth: "calc(100% - 48px)",
              gap: "16px",
            }}
          >
            <h1
              className="text-white text-[32px] leading-[48px] md:text-[64px] md:leading-[80px]"
              style={{ fontWeight: 600, letterSpacing: "-0.02em" }}
            >
              Find All Realtors
              <br />
              in One Place
            </h1>
            <p
              className="text-white mx-auto text-[14px] leading-[24px] md:text-[18px] md:leading-[32px]"
              style={{ fontWeight: 400, letterSpacing: "-0.02em", maxWidth: "735px" }}
            >
              Explore the list or search for real estate agents, agencies and developers
              in our directory.
            </p>
          </div>

          {/* Search bar — Figma: 1344x96 at y=544 from card top, r=12, white, padding 24 */}
          <div
            className="absolute left-1/2 -translate-x-1/2 z-10 bg-white flex flex-col md:flex-row md:items-center"
            style={{
              bottom: "16px",
              width: "calc(100% - 32px)",
              maxWidth: "1344px",
              borderRadius: "12px",
              padding: "16px",
              gap: "12px",
            }}
          >
            <div className="flex items-center md:contents" style={{ gap: "12px" }}>
            <div
              className="relative shrink-0 bg-[#F6F6F6] rounded-[12px] flex items-center w-[130px] md:w-[199px]"
              style={{ height: "48px", padding: "0 16px" }}
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
              className="flex items-center gap-2 flex-1 min-w-0 bg-[#F6F6F6] rounded-[12px]"
              style={{ height: "48px", padding: "0 16px" }}
            >
              <Search size={20} className="text-[#807E7E] shrink-0" />
              <input
                type="text"
                placeholder="Enter name, location, area or keyword..."
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

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            style={{ gap: "40px 24px" }}
          >
            {featuredAgencies.map((a) => (
              <AgencyCard key={a.id} a={a} />
            ))}
          </div>
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

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            style={{ gap: "40px 24px" }}
          >
            {featuredAgents.map((a, i) => (
              <AgentCard key={i} a={a} />
            ))}
          </div>
        </div>
      </section>

      <ListPropertyCTA />

      <Footer />
    </div>
  );
}

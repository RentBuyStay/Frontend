import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
      <section className="bg-white p-6">
        <div
          className="relative overflow-hidden bg-[#F3FEFE]"
          style={{ borderRadius: "25px", height: "664px" }}
        >
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
              top: "216px",
              width: "738px",
              maxWidth: "calc(100% - 48px)",
              gap: "16px",
            }}
          >
            <h1
              className="text-white"
              style={{
                fontSize: "64px",
                lineHeight: "80px",
                fontWeight: 600,
                letterSpacing: "-0.02em",
              }}
            >
              Find All Realtors in
              <br />
              One Place
            </h1>
            <p
              className="text-white mx-auto"
              style={{
                fontSize: "18px",
                lineHeight: "32px",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                maxWidth: "735px",
              }}
            >
              Explore the list or search for real estate agents, agencies and developers
              in our directory.
            </p>
          </div>

          {/* Search bar — Figma: 1344x96 at y=544 from card top, r=12, white, padding 24 */}
          <div
            className="absolute left-1/2 -translate-x-1/2 z-10 bg-white flex items-center"
            style={{
              bottom: "24px",
              width: "calc(100% - 48px)",
              maxWidth: "1344px",
              height: "96px",
              borderRadius: "12px",
              padding: "24px",
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

      {/* ALL AGENCIES & DEVELOPERS — 3x2 grid, 411x456 cards, gap 24 */}
      <section className="bg-white" style={{ paddingTop: "80px", paddingBottom: "60px" }}>
        <div className="max-w-[1440px] mx-auto px-[80px]">
          <div className="flex items-center justify-between" style={{ marginBottom: "40px" }}>
            <h2
              style={{
                fontSize: "32px",
                lineHeight: "40px",
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
            className="grid mx-auto"
            style={{
              gridTemplateColumns: "repeat(3, 411px)",
              gap: "40px 24px",
              justifyContent: "center",
            }}
          >
            {featuredAgencies.map((a) => (
              <AgencyCard key={a.id} a={a} />
            ))}
          </div>
        </div>
      </section>

      {/* ALL AGENTS — 3x3 grid, 411x284 cards, gap 24 */}
      <section className="bg-white" style={{ paddingTop: "60px", paddingBottom: "80px" }}>
        <div className="max-w-[1440px] mx-auto px-[80px]">
          <div className="flex items-center justify-between" style={{ marginBottom: "40px" }}>
            <h2
              style={{
                fontSize: "32px",
                lineHeight: "40px",
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
            className="grid mx-auto"
            style={{
              gridTemplateColumns: "repeat(3, 411px)",
              gap: "40px 24px",
              justifyContent: "center",
            }}
          >
            {featuredAgents.map((a, i) => (
              <AgentCard key={i} a={a} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA — Figma: 1440x512, inner 1392x464 r=20 brand gradient */}
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
              <h2
                className="text-white"
                style={{
                  fontSize: "48px",
                  lineHeight: "64px",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                }}
              >
                Ready to
                <br />
                List Your Property?
              </h2>
              <p
                className="text-white"
                style={{
                  fontSize: "18px",
                  lineHeight: "32px",
                  fontWeight: 400,
                  letterSpacing: "-0.02em",
                }}
              >
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

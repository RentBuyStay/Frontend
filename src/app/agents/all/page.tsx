import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ListPropertyCTA from "@/components/ListPropertyCTA";
import RealtorSearch from "@/components/RealtorSearch";
import AllAgentsList from "@/components/AllAgentsList";

export const metadata = {
  title: "All Agents | RentBuyStay",
  description: "Browse all verified real estate agents across Nigeria.",
};

export default function AllAgentsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* HERO — Figma node 252:34023: plain white navbar + search bar, no border anywhere */}
      <Navbar variant="page" />
      <section className="bg-white" style={{ padding: "40px 0" }}>
        <div className="max-w-[1440px] mx-auto px-4 md:px-[80px]">
          {/* Search — shared realtor search (state + keyword + Search) */}
          <Suspense fallback={null}>
            <RealtorSearch className="w-full py-6" />
          </Suspense>
        </div>
      </section>

      {/* MAIN — heading + filters + grid + pagination (live: GET /agents) */}
      <section className="bg-white" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
        <div className="max-w-[1440px] mx-auto px-4 md:px-[80px]">
          <Suspense fallback={null}>
            <AllAgentsList />
          </Suspense>
        </div>
      </section>

      <ListPropertyCTA />

      <Footer />
    </div>
  );
}

import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ListPropertyCTA from "@/components/ListPropertyCTA";
import RealtorSearch from "@/components/RealtorSearch";
import AllAgenciesList from "@/components/AllAgenciesList";

export const metadata = {
  title: "All Agencies & Developers | RentBuyStay",
  description: "Browse verified real estate agencies and developers across Nigeria.",
};

export default function AllAgenciesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* HERO — Figma node 252:32515: plain white navbar + search bar, no border anywhere */}
      <Navbar variant="page" />
      <section className="bg-white" style={{ padding: "40px 0" }}>
        <div className="max-w-[1440px] mx-auto px-4 md:px-[80px]">
          {/* Search — shared realtor search (state + keyword + Search) */}
          <Suspense fallback={null}>
            <RealtorSearch className="w-full py-6 md:h-24" target="/agencies" />
          </Suspense>
        </div>
      </section>

      {/* MAIN — heading + filter dropdowns + grid + pagination (live: GET /agencies) */}
      <section className="bg-white" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
        <div className="max-w-[1440px] mx-auto px-4 md:px-[80px]">
          <Suspense fallback={null}>
            <AllAgenciesList />
          </Suspense>
        </div>
      </section>

      <ListPropertyCTA />

      <Footer />
    </div>
  );
}

import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import SearchResults from "@/components/SearchResults";

export const metadata = {
  title: "Search Results | RentBuyStay",
};

export default function SearchPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar variant="page" />

      <section className="bg-[#121212] text-white py-12">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <SearchBar />
        </div>
      </section>

      <Suspense fallback={<section className="py-10 flex-1 bg-[#f6f6f6]" />}>
        <SearchResults />
      </Suspense>

      <Footer />
    </div>
  );
}

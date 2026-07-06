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

      <section className="py-12 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <SearchBar inPlace />
        </div>
      </section>

      <Suspense fallback={<section className="py-10 flex-1 bg-white" />}>
        <SearchResults />
      </Suspense>

      <Footer />
    </div>
  );
}

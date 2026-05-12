import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import SearchBar from "@/components/SearchBar";
import { mockProperties } from "@/lib/mockData";
import { SlidersHorizontal } from "lucide-react";

export const metadata = {
  title: "Search Results | RentBuyStay",
};

export default function SearchPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="bg-[#121212] text-white py-12">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <SearchBar />
        </div>
      </section>

      <section className="py-10 flex-1 bg-[#f6f6f6]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-[#7f7e7e]">
              Showing <span className="font-semibold text-[#121212]">{mockProperties.length}</span> results
            </p>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 text-sm border border-[#ededed] rounded-lg px-4 py-2 bg-white hover:border-[#305e82] transition-colors">
                <SlidersHorizontal size={15} />
                Filters
              </button>
              <select className="text-sm border border-[#ededed] rounded-lg px-3 py-2 outline-none bg-white">
                <option>Newest First</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {mockProperties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

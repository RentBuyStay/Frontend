import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import Newsletter from "@/components/Newsletter";
import SearchBar from "@/components/SearchBar";
import { forSaleProperties } from "@/lib/mockData";

export const metadata = {
  title: "Properties for Sale in Nigeria | RentBuyStay",
  description: "Browse thousands of verified properties for sale across Nigeria.",
};

export default function ForSalePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#121212] text-white py-16">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <h1 className="text-3xl lg:text-5xl font-semibold mb-3">Properties for Sale</h1>
          <p className="text-[#7f7e7e] text-base mb-8">
            Find your dream home across Nigeria&apos;s top locations.
          </p>
          <SearchBar defaultTab="Buy" />
        </div>
      </section>

      {/* Listings */}
      <section className="py-14 bg-[#f6f6f6] flex-1">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-[#7f7e7e]">
              <span className="font-semibold text-[#121212]">{forSaleProperties.length}</span> properties found
            </p>
            <select className="text-sm border border-[#ededed] rounded-lg px-3 py-2 outline-none bg-white">
              <option>Newest First</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {forSaleProperties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
}

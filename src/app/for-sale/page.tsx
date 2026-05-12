import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import { mockProperties } from "@/lib/mockData";
import Image from "next/image";
import Link from "next/link";
import { MapPin, BedDouble, Bath, Maximize2, Heart } from "lucide-react";

export const metadata = {
  title: "Properties for Sale in Nigeria | RentBuyStay",
  description: "Browse thousands of verified properties for sale across Nigeria.",
};

const forSale = mockProperties.filter((p) => p.tag === "For Sale");

export default function ForSalePage() {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Hero with background image */}
      <section className="relative h-64 lg:h-80 flex flex-col">
        <Navbar transparent />
        <div className="absolute inset-0 z-0">
          <Image src="/images/prop2.jpg" alt="Properties for Sale" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 flex flex-col justify-center flex-1 px-6 lg:px-12 max-w-[1440px] mx-auto w-full pt-16">
          <h1 className="text-3xl lg:text-5xl font-semibold text-white mb-2">
            Properties for Sale in Nigeria
          </h1>
          <p className="text-white/70 text-sm max-w-xl">
            Browse verified properties for sale across all 36 states.
          </p>
        </div>
      </section>

      {/* Search bar */}
      <div className="bg-white border-b border-[#ededed] py-4 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <SearchBar defaultTab="Buy" />
        </div>
      </div>

      {/* Listings + Sidebar */}
      <section className="flex-1 bg-[#f6f6f6] py-10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex gap-6">

            {/* Property List */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-5">
                <p className="text-sm text-[#7f7e7e]">
                  <span className="font-semibold text-[#121212]">{forSale.length}</span> Properties for Sale in Nigeria
                </p>
                <select className="text-sm border border-[#ededed] rounded-lg px-3 py-2 outline-none bg-white">
                  <option>Newest First</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>

              <div className="flex flex-col gap-4">
                {forSale.map((p) => (
                  <Link key={p.id} href={`/properties/${p.id}`} className="group bg-white rounded-2xl overflow-hidden flex gap-0 hover:shadow-lg transition-shadow">
                    {/* Thumbnail */}
                    <div className="relative w-48 lg:w-64 shrink-0 bg-[#f6f6f6]">
                      {p.image ? (
                        <Image src={p.image} alt={p.title} fill className="object-cover" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#d7d7d7" strokeWidth="1.5">
                            <path d="M3 9.5L12 3l9 6.5V21H3V9.5z" />
                          </svg>
                        </div>
                      )}
                      <span className="absolute top-3 left-3 bg-[#305e82] text-white text-xs font-semibold px-2 py-0.5 rounded">
                        For Sale
                      </span>
                      <button className="absolute top-3 right-3 bg-white/90 p-1.5 rounded-lg">
                        <Heart size={14} className="text-[#7f7e7e]" />
                      </button>
                    </div>

                    {/* Details */}
                    <div className="flex-1 p-5">
                      <p className="text-xl font-bold text-[#121212]">{p.price}</p>
                      <p className="text-base font-medium text-[#121212] mt-1 group-hover:text-[#305e82] transition-colors">
                        {p.title}
                      </p>
                      <div className="flex items-center gap-1 text-sm text-[#7f7e7e] mt-1">
                        <MapPin size={13} /> {p.location}
                      </div>

                      <div className="flex items-center gap-5 mt-3 text-sm text-[#7f7e7e]">
                        <span className="flex items-center gap-1"><BedDouble size={14} /> {p.beds} Beds</span>
                        <span className="flex items-center gap-1"><Bath size={14} /> {p.baths} Baths</span>
                        <span className="flex items-center gap-1"><Maximize2 size={14} /> {p.sqft}</span>
                      </div>

                      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#ededed]">
                        <div className="w-7 h-7 rounded-full bg-[#305e82] flex items-center justify-center text-white text-xs font-bold">
                          {p.agentInitials}
                        </div>
                        <span className="text-xs text-[#7f7e7e]">{p.agentName}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Sidebar Filters */}
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="bg-white rounded-2xl p-5 sticky top-20">
                <h3 className="font-semibold text-[#121212] mb-4">Filter Properties</h3>

                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-xs font-medium text-[#121212] block mb-1.5">Property Type</label>
                    <select className="w-full border border-[#ededed] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#305e82] bg-white">
                      <option>All Types</option>
                      <option>House</option>
                      <option>Apartment</option>
                      <option>Land</option>
                      <option>Commercial</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[#121212] block mb-1.5">Bedrooms</label>
                    <select className="w-full border border-[#ededed] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#305e82] bg-white">
                      <option>Any</option>
                      {[1,2,3,4,5,6].map(n => <option key={n}>{n}+</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[#121212] block mb-1.5">Min Price (₦)</label>
                    <input type="number" placeholder="No minimum" className="w-full border border-[#ededed] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#305e82]" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[#121212] block mb-1.5">Max Price (₦)</label>
                    <input type="number" placeholder="No maximum" className="w-full border border-[#ededed] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#305e82]" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[#121212] block mb-1.5">Location</label>
                    <input type="text" placeholder="e.g. Lekki, Lagos" className="w-full border border-[#ededed] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#305e82]" />
                  </div>

                  <button className="w-full bg-[#305e82] text-white py-2.5 rounded-xl text-sm font-medium hover:bg-[#254d6b] transition-colors">
                    Apply Filters
                  </button>
                  <button className="w-full border border-[#ededed] text-[#7f7e7e] py-2.5 rounded-xl text-sm hover:border-[#305e82] transition-colors">
                    Clear All
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-[#305e82] text-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold mb-1">Ready to List Your Property?</h2>
            <p className="text-white/70 text-sm">Reach thousands of verified buyers on RentBuyStay.</p>
          </div>
          <Link href="/post-property" className="shrink-0 bg-[#ff5a00] text-white font-semibold px-8 py-3 rounded-xl hover:bg-[#e04f00] transition-colors">
            Post a Property
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

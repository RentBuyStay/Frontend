import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { Search, MapPin, Star, Phone, Mail } from "lucide-react";

export const metadata = {
  title: "Agents & Agencies | RentBuyStay",
  description: "Find all verified real estate agents and agencies across Nigeria.",
};

const agencies = [
  { id: "1", name: "Quantum Realty", initials: "QR", location: "Lagos", agents: 12, listings: 86 },
  { id: "2", name: "Union Blue Realty", initials: "UB", location: "Abuja", agents: 8, listings: 54 },
  { id: "3", name: "Blue Platinum Homes", initials: "BP", location: "Lagos", agents: 20, listings: 120 },
  { id: "4", name: "Prestige Properties", initials: "PP", location: "PH", agents: 6, listings: 38 },
  { id: "5", name: "Mersey Properties", initials: "MP", location: "Abuja", agents: 15, listings: 97 },
  { id: "6", name: "Skyline Homes", initials: "SH", location: "Lagos", agents: 9, listings: 62 },
];

const agents = [
  { id: "1", name: "Amelia Franklin", initials: "AF", location: "Lagos", listings: 24, rating: 4.9, reviews: 87, agency: "Quantum Realty" },
  { id: "2", name: "Chiamaka Obi", initials: "CO", location: "Abuja", listings: 18, rating: 4.8, reviews: 64, agency: "Union Blue Realty" },
  { id: "3", name: "Elizabeth Monroe", initials: "EM", location: "Lagos", listings: 31, rating: 4.7, reviews: 112, agency: "Blue Platinum Homes" },
  { id: "4", name: "Tunde Bello", initials: "TB", location: "PH", listings: 15, rating: 4.6, reviews: 43, agency: "Independent" },
  { id: "5", name: "Ngozi Eze", initials: "NE", location: "Lagos", listings: 22, rating: 4.9, reviews: 95, agency: "Prestige Properties" },
  { id: "6", name: "Kola Adeyemi", initials: "KA", location: "Ibadan", listings: 9, rating: 4.5, reviews: 38, agency: "Independent" },
  { id: "7", name: "Sade Okonkwo", initials: "SO", location: "Abuja", listings: 27, rating: 4.8, reviews: 71, agency: "Mersey Properties" },
  { id: "8", name: "Ibrahim Musa", initials: "IM", location: "Kano", listings: 13, rating: 4.6, reviews: 29, agency: "Independent" },
  { id: "9", name: "Funke Adeleke", initials: "FA", location: "Lagos", listings: 19, rating: 4.7, reviews: 55, agency: "Skyline Homes" },
];

export default function AgentsPage() {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Hero */}
      <section className="relative h-56 lg:h-72 flex flex-col">
        <Navbar transparent />
        <div className="absolute inset-0 z-0">
          <Image src="/images/prop2.jpg" alt="Find All Realtors" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 flex flex-col justify-center flex-1 px-6 lg:px-12 max-w-[1440px] mx-auto w-full pt-14">
          <h1 className="text-3xl lg:text-5xl font-semibold text-white mb-4">
            Find All Realtors in One Place
          </h1>
          <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 max-w-lg">
            <Search size={18} className="text-[#7f7e7e] shrink-0" />
            <input type="text" placeholder="Search by name, location or agency..." className="flex-1 text-sm text-[#121212] outline-none placeholder:text-[#7f7e7e]" />
            <button className="bg-[#305e82] text-white text-sm font-medium px-4 py-1.5 rounded-lg">Search</button>
          </div>
        </div>
      </section>

      <section className="flex-1 bg-[#f6f6f6] py-12">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

          {/* All Agencies & Developers */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#121212]">All Agencies &amp; Developers</h2>
              <Link href="/agencies" className="text-sm text-[#305e82] font-medium hover:underline">View all</Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {agencies.map((agency) => (
                <div key={agency.id} className="bg-white rounded-2xl p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
                  <div className="w-14 h-14 rounded-xl bg-[#f3fefe] border border-[#ededed] flex items-center justify-center text-[#305e82] font-bold text-lg mx-auto mb-3">
                    {agency.initials}
                  </div>
                  <p className="text-xs font-semibold text-[#121212] line-clamp-2 leading-tight">{agency.name}</p>
                  <p className="text-xs text-[#7f7e7e] mt-1">{agency.listings} listings</p>
                  <div className="flex items-center justify-center gap-1 mt-1 text-xs text-[#7f7e7e]">
                    <MapPin size={10} /> {agency.location}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* All Agents */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#121212]">All Agents</h2>
              <p className="text-sm text-[#7f7e7e]">{agents.length} verified agents</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {agents.map((agent) => (
                <div key={agent.id} className="bg-white rounded-2xl p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 rounded-full bg-[#305e82] flex items-center justify-center text-white text-lg font-semibold shrink-0">
                    {agent.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[#121212]">{agent.name}</p>
                    <p className="text-xs text-[#7f7e7e] mt-0.5">{agent.agency}</p>
                    <div className="flex items-center gap-1 text-xs text-[#7f7e7e] mt-0.5">
                      <MapPin size={10} /> {agent.location}
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1 text-xs">
                        <Star size={11} className="text-[#ffae00] fill-[#ffae00]" />
                        <span className="font-medium text-[#121212]">{agent.rating}</span>
                        <span className="text-[#7f7e7e]">({agent.reviews})</span>
                      </div>
                      <span className="text-xs text-[#7f7e7e]">{agent.listings} listings</span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button className="flex-1 flex items-center justify-center gap-1 bg-[#305e82] text-white text-xs py-2 rounded-lg hover:bg-[#254d6b] transition-colors">
                        <Phone size={12} /> Call
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-1 border border-[#305e82] text-[#305e82] text-xs py-2 rounded-lg hover:bg-[#f3fefe] transition-colors">
                        <Mail size={12} /> Message
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-[#305e82] text-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold mb-1">Ready to List Your Property?</h2>
            <p className="text-white/70 text-sm">List your property and let our verified agents connect you with buyers and tenants.</p>
          </div>
          <Link href="/post-property" className="shrink-0 bg-[#ff5a00] text-white font-semibold px-8 py-3 rounded-xl hover:bg-[#e04f00] transition-colors">Post a Property</Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

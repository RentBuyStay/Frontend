import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import { Search, MapPin, Building2 } from "lucide-react";

export const metadata = {
  title: "Agencies & Developers | RentBuyStay",
  description: "Find verified real estate agencies and developers across Nigeria.",
};

const agencies = [
  { id: "1", name: "Prime Realty Nigeria", initials: "PR", location: "Lagos", agents: 12, listings: 86, type: "Agency" },
  { id: "2", name: "Abuja Homes Ltd", initials: "AH", location: "Abuja", agents: 8, listings: 54, type: "Agency" },
  { id: "3", name: "Landmark Developers", initials: "LD", location: "Lagos", agents: 20, listings: 120, type: "Developer" },
  { id: "4", name: "Prestige Properties", initials: "PP", location: "Port Harcourt", agents: 6, listings: 38, type: "Agency" },
  { id: "5", name: "Arise Real Estate", initials: "AR", location: "Abuja", agents: 15, listings: 97, type: "Developer" },
  { id: "6", name: "Skyline Homes", initials: "SH", location: "Lagos", agents: 9, listings: 62, type: "Agency" },
];

export default function AgenciesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="bg-[#121212] text-white py-16">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <h1 className="text-3xl lg:text-5xl font-semibold mb-3">Agencies & Developers</h1>
          <p className="text-[#7f7e7e] mb-8">
            Find trusted real estate firms and property developers across Nigeria.
          </p>
          <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 max-w-lg">
            <Search size={18} className="text-[#7f7e7e]" />
            <input
              type="text"
              placeholder="Search agencies or developers..."
              className="flex-1 text-sm text-[#121212] outline-none placeholder:text-[#7f7e7e]"
            />
          </div>
        </div>
      </section>

      <section className="py-14 bg-[#f6f6f6] flex-1">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {agencies.map((agency) => (
              <div key={agency.id} className="bg-white rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-xl bg-[#f3fefe] border border-[#ededed] flex items-center justify-center text-[#305e82] font-bold text-lg">
                    {agency.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-[#121212]">{agency.name}</p>
                    <div className="flex items-center gap-1 text-xs text-[#7f7e7e] mt-0.5">
                      <MapPin size={11} />
                      {agency.location}
                    </div>
                    <span className="mt-1 inline-block text-xs bg-[#ededed] text-[#7f7e7e] px-2 py-0.5 rounded-full">
                      {agency.type}
                    </span>
                  </div>
                </div>

                <div className="flex gap-6 border-t border-[#ededed] pt-4 mb-5">
                  <div className="flex items-center gap-2 text-sm text-[#7f7e7e]">
                    <Building2 size={14} className="text-[#305e82]" />
                    <span>{agency.listings} Listings</span>
                  </div>
                  <div className="text-sm text-[#7f7e7e]">
                    {agency.agents} Agents
                  </div>
                </div>

                <button className="w-full border border-[#305e82] text-[#305e82] text-sm font-medium py-2.5 rounded-xl hover:bg-[#f3fefe] transition-colors">
                  View Agency
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
}

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import { Search, MapPin, Star } from "lucide-react";

export const metadata = {
  title: "Verified Agents | RentBuyStay",
  description: "Connect with verified real estate agents across Nigeria.",
};

const agents = [
  { id: "1", name: "Chioma Okeke", initials: "CO", location: "Lagos", speciality: "Luxury Homes", listings: 24, rating: 4.9, reviews: 87 },
  { id: "2", name: "Emeka Nwosu", initials: "EN", location: "Abuja", speciality: "Commercial", listings: 18, rating: 4.8, reviews: 64 },
  { id: "3", name: "Amaka Obi", initials: "AO", location: "Lagos", speciality: "Rentals", listings: 31, rating: 4.7, reviews: 112 },
  { id: "4", name: "Tunde Bello", initials: "TB", location: "Port Harcourt", speciality: "Land", listings: 15, rating: 4.6, reviews: 43 },
  { id: "5", name: "Ngozi Eze", initials: "NE", location: "Lagos", speciality: "Apartments", listings: 22, rating: 4.9, reviews: 95 },
  { id: "6", name: "Kola Adeyemi", initials: "KA", location: "Ibadan", speciality: "Shortlets", listings: 9, rating: 4.5, reviews: 38 },
  { id: "7", name: "Sade Okonkwo", initials: "SO", location: "Abuja", speciality: "Luxury Homes", listings: 27, rating: 4.8, reviews: 71 },
  { id: "8", name: "Ibrahim Musa", initials: "IM", location: "Kano", speciality: "Residential", listings: 13, rating: 4.6, reviews: 29 },
];

export default function AgentsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="bg-[#121212] text-white py-16">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <h1 className="text-3xl lg:text-5xl font-semibold mb-3">Verified Agents</h1>
          <p className="text-[#7f7e7e] mb-8">Connect with trusted real estate professionals across Nigeria.</p>
          <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 max-w-lg">
            <Search size={18} className="text-[#7f7e7e]" />
            <input
              type="text"
              placeholder="Search by name or location..."
              className="flex-1 text-sm text-[#121212] outline-none placeholder:text-[#7f7e7e]"
            />
          </div>
        </div>
      </section>

      <section className="py-14 bg-[#f6f6f6] flex-1">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {agents.map((agent) => (
              <div key={agent.id} className="bg-white rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col items-center text-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-[#305e82] flex items-center justify-center text-white text-xl font-semibold mb-3">
                    {agent.initials}
                  </div>
                  <p className="font-semibold text-[#121212]">{agent.name}</p>
                  <div className="flex items-center gap-1 text-xs text-[#7f7e7e] mt-1">
                    <MapPin size={11} />
                    {agent.location}
                  </div>
                  <span className="mt-2 text-xs bg-[#f3fefe] text-[#305e82] px-2 py-0.5 rounded-full font-medium">
                    {agent.speciality}
                  </span>
                </div>

                <div className="flex justify-between text-center border-t border-[#ededed] pt-4 mb-4">
                  <div>
                    <p className="font-semibold text-[#121212]">{agent.listings}</p>
                    <p className="text-xs text-[#7f7e7e]">Listings</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 justify-center">
                      <Star size={13} className="text-[#ffae00] fill-[#ffae00]" />
                      <p className="font-semibold text-[#121212]">{agent.rating}</p>
                    </div>
                    <p className="text-xs text-[#7f7e7e]">{agent.reviews} reviews</p>
                  </div>
                </div>

                <button className="w-full bg-[#305e82] text-white text-sm font-medium py-2.5 rounded-xl hover:bg-[#254d6b] transition-colors">
                  View Profile
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

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockProperties } from "@/lib/mockData";
import { MapPin, Maximize2, BedDouble, Bath, Phone, Mail, Share2, Heart } from "lucide-react";
import Link from "next/link";

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const property = mockProperties.find((p) => p.id === params.id) ?? mockProperties[0];

  const tagColors: Record<string, string> = {
    "For Sale": "bg-[#305e82]",
    "For Rent": "bg-[#14ae5c]",
    Shortlet: "bg-[#8a38f5]",
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-[#f6f6f6]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-10">
          {/* Breadcrumb */}
          <p className="text-sm text-[#7f7e7e] mb-6">
            <Link href="/" className="hover:text-[#305e82]">Home</Link>
            {" / "}
            <Link href="/search" className="hover:text-[#305e82]">Properties</Link>
            {" / "}
            <span className="text-[#121212]">{property.title}</span>
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left */}
            <div className="lg:col-span-2">
              {/* Image */}
              <div className="bg-[#d7d7d7] rounded-2xl h-[380px] flex items-center justify-center mb-6 relative">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#a0a0a0" strokeWidth="1">
                  <path d="M3 9.5L12 3l9 6.5V21H3V9.5z" />
                </svg>
                <span className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-md text-white ${tagColors[property.tag] ?? "bg-[#305e82]"}`}>
                  {property.tag}
                </span>
                <div className="absolute top-4 right-4 flex gap-2">
                  <button className="bg-white p-2 rounded-lg shadow hover:bg-[#f6f6f6] transition-colors">
                    <Heart size={16} className="text-[#121212]" />
                  </button>
                  <button className="bg-white p-2 rounded-lg shadow hover:bg-[#f6f6f6] transition-colors">
                    <Share2 size={16} className="text-[#121212]" />
                  </button>
                </div>
              </div>

              {/* Details */}
              <div className="bg-white rounded-2xl p-6 mb-6">
                <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
                  <div>
                    <p className="text-2xl font-bold text-[#121212]">{property.price}</p>
                    <h1 className="text-xl font-semibold text-[#121212] mt-1">{property.title}</h1>
                    <div className="flex items-center gap-1 mt-1 text-sm text-[#7f7e7e]">
                      <MapPin size={14} />
                      <span>{property.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-6 py-4 border-y border-[#ededed]">
                  <div className="flex items-center gap-2 text-sm text-[#7f7e7e]">
                    <Maximize2 size={16} className="text-[#305e82]" />
                    <span>{property.sqft}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#7f7e7e]">
                    <BedDouble size={16} className="text-[#305e82]" />
                    <span>{property.beds} Bedrooms</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#7f7e7e]">
                    <Bath size={16} className="text-[#305e82]" />
                    <span>{property.baths} Bathrooms</span>
                  </div>
                </div>

                <div className="mt-4">
                  <h2 className="text-base font-semibold text-[#121212] mb-2">Description</h2>
                  <p className="text-sm text-[#7f7e7e] leading-relaxed">
                    This stunning property is located in one of Nigeria&apos;s most sought-after
                    neighbourhoods. Featuring modern finishes, spacious rooms, and premium amenities,
                    this is an excellent opportunity for buyers looking for quality and value.
                    The property comes fully serviced with 24/7 security, standby generator,
                    and ample parking space.
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="bg-white rounded-2xl p-6">
                <h2 className="text-base font-semibold text-[#121212] mb-4">Property Features</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {["Swimming Pool", "24/7 Security", "Standby Generator", "CCTV", "Parking Space", "Fitted Kitchen", "Air Conditioning", "Boys Quarters", "Water Treatment"].map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-[#7f7e7e]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#305e82]" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — Agent Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 sticky top-20">
                <h3 className="text-base font-semibold text-[#121212] mb-4">Contact Agent</h3>

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#305e82] flex items-center justify-center text-white font-semibold">
                    {property.agentInitials}
                  </div>
                  <div>
                    <p className="font-medium text-[#121212]">{property.agentName}</p>
                    <p className="text-xs text-[#7f7e7e]">Verified Agent</p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button className="w-full flex items-center justify-center gap-2 bg-[#305e82] text-white py-3 rounded-xl text-sm font-medium hover:bg-[#254d6b] transition-colors">
                    <Phone size={16} />
                    Call Agent
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 border border-[#305e82] text-[#305e82] py-3 rounded-xl text-sm font-medium hover:bg-[#f3fefe] transition-colors">
                    <Mail size={16} />
                    Send Message
                  </button>
                </div>

                <div className="mt-6 pt-5 border-t border-[#ededed]">
                  <p className="text-xs text-[#7f7e7e] text-center">
                    By contacting the agent, you agree to our{" "}
                    <Link href="/tos" className="text-[#305e82] hover:underline">Terms of Service</Link>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

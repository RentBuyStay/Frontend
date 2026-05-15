import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search, ChevronDown, SlidersHorizontal } from "lucide-react";

export const metadata = {
  title: "Property Requests | RentBuyStay",
  description: "Browse what people are looking for and connect with verified seekers.",
};

const requests = [
  { id: "1", lookingFor: "House for Rent", beds: 1, area: "Lekki Phase 1, Lagos", requestBy: "Individual", budget: "₦800,000/year", agent: "Chioma Okeke", agentInitials: "CO", date: "Listed on 15 Apr 2026" },
  { id: "2", lookingFor: "Apartment for Sale", beds: 3, area: "Ikoyi, Lagos", requestBy: "Real Estate Agent", budget: "₦45,000,000", agent: "Emeka Nwosu", agentInitials: "EN", date: "Listed on 10 May 2026" },
  { id: "3", lookingFor: "Studio Apartment", beds: 1, area: "Yaba, Lagos", requestBy: "Student", budget: "₦300,000/year", agent: "Tunde Bello", agentInitials: "TB", date: "Listed on 22 Mar 2026" },
  { id: "4", lookingFor: "Commercial Space", beds: 2, area: "Victoria Island, Lagos", requestBy: "Company", budget: "₦10,000,000/year", agent: "Aisha Bello", agentInitials: "AB", date: "Listed on 03 May 2026" },
  { id: "5", lookingFor: "Duplex for Rent", beds: 4, area: "Surulere, Lagos", requestBy: "Family of 4", budget: "₦2,500,000/year", agent: "Femi Olajide", agentInitials: "FO", date: "Listed on 18 Apr 2026" },
  { id: "6", lookingFor: "Bungalow for Sale", beds: 3, area: "Ajah, Lagos", requestBy: "Couple", budget: "₦18,000,000", agent: "Chinwe Umeh", agentInitials: "CU", date: "Listed on 02 May 2026" },
  { id: "7", lookingFor: "Penthouse Apartment", beds: 5, area: "Banana Island, Lagos", requestBy: "Business Executive", budget: "₦120,000,000", agent: "Tunde Balogun", agentInitials: "TB", date: "Listed on 14 Apr 2026" },
  { id: "8", lookingFor: "Shared Accommodation", beds: 1, area: "Mushin, Lagos", requestBy: "Individual", budget: "₦250,000/year", agent: "Nkechi Okafor", agentInitials: "NO", date: "Listed on 26 Apr 2026" },
];

const propertyTypes = [
  { name: "Flats/Apartments", count: 5032 },
  { name: "House", count: 5032 },
  { name: "Commercial Property", count: 5032 },
  { name: "Co-working Space", count: 5032 },
  { name: "Land", count: 5032 },
];

const bedroomTable = {
  cols: ["Type", "1 Bed", "2 Bed", "3 Bed", "4 Bed", "5 Bed"],
  rows: [
    ["Flats", "406", "307", "228", "96", "386"],
    ["Houses", "192", "2081", "3872", "13181", "2059"],
  ],
};

const states = ["Lagos", "Abuja", "Oyo", "Ogun", "Enugu", "Edo", "Rivers", "Delta", "Akwa Ibom", "Ondo", "Imo", "Kaduna", "Anambra", "Osun", "Abia", "Nassarawa", "Kwara", "Plateau", "Ebonyi", "Bayelsa", "Benue", "Cross River", "Ekiti", "Bauchi", "Kogi", "Adamawa", "Niger"];

const otherCategories = [
  "Serviced Properties for sale",
  "Furnished Properties for sale",
  "Newly Built Properties for sale",
  "Cheap Properties for sale",
  "Luxury Properties for sale",
  "Property for sale between 20milion and 40milion",
  "Property for sale between 40milion and 60milion",
  "Property for sale between 60milion and 80milion",
  "Property for sale between 80milion and 100milion",
];

export default function PropertyRequestsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* HERO — Figma: WHITE bg, plain navbar with dropdowns + inline search row + filter dropdowns row */}
      <Navbar />

      <section className="bg-white">
        {/* Search row + filter row */}
        <div className="max-w-[1440px] mx-auto px-[80px] py-10 flex flex-col gap-5">
          {/* Top row: Tab dropdown | Search input | Search button | Filter button */}
          <div className="flex items-center gap-4">
            {/* Tab dropdown */}
            <div className="relative shrink-0 bg-[#F6F6F6] rounded-[12px] h-12 flex items-center px-4">
              <select defaultValue="Rent" className="appearance-none text-sm font-semibold text-[#121212] bg-transparent outline-none pr-6 cursor-pointer">
                <option>Rent</option>
                <option>Buy</option>
                <option>Shortlet</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 text-[#7f7e7e] pointer-events-none" />
            </div>

            {/* Search input */}
            <div className="flex items-center gap-2 flex-1 bg-[#F6F6F6] rounded-[12px] h-12 px-4">
              <Search size={16} className="text-[#7f7e7e] shrink-0" />
              <input
                type="text"
                placeholder="Jibowu, Yaba, Lagos"
                className="flex-1 text-sm outline-none placeholder:text-[#7f7e7e] text-[#121212] bg-transparent"
              />
            </div>

            {/* Search button — gradient */}
            <button className="shrink-0 text-white text-sm font-semibold w-[160px] h-12 rounded-[12px] hover:opacity-90 transition-opacity" style={{ background: "linear-gradient(175deg, rgba(117,163,199,1) 0%, rgba(48,94,130,1) 100%)" }}>
              Search
            </button>

            {/* Filter button */}
            <button className="shrink-0 flex items-center gap-2 px-4 h-12 rounded-[12px] bg-[#F6F6F6] hover:bg-[#ededed] transition-colors" style={{ fontSize: "14px", color: "#121212" }}>
              <SlidersHorizontal size={16} /> Filter
            </button>
          </div>

          {/* Filter columns — 5 dropdowns directly on white */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {[
              { label: "Property Type", value: "Flats & Apartments" },
              { label: "Bedrooms", value: "1" },
              { label: "Min. Price", value: "No min" },
              { label: "Max Price", value: "₦1 million" },
              { label: "Furnished", value: "Any" },
            ].map((f) => (
              <div key={f.label} className="flex flex-col gap-1.5">
                <label style={{ fontSize: "12px", color: "#121212", fontWeight: 500 }}>{f.label}</label>
                <div className="relative bg-[#F6F6F6] rounded-[12px] h-12 flex items-center px-4">
                  <select defaultValue={f.value} className="appearance-none text-sm text-[#121212] bg-transparent outline-none w-full pr-6 cursor-pointer">
                    <option>{f.value}</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-4 text-[#7f7e7e] pointer-events-none" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROPERTY REQUESTS + SIDEBAR */}
      <section className="bg-white">
        <div className="max-w-[1440px] mx-auto px-[80px] py-[60px]">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_411px] gap-6">

            {/* LEFT */}
            <div className="flex flex-col gap-6 min-w-0">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 style={{ fontSize: "24px", lineHeight: "32px", fontWeight: 600, color: "#121212" }}>
                    Property Requests
                  </h2>
                  <p style={{ fontSize: "14px", color: "#7f7e7e", marginTop: "4px" }}>
                    Showing 1 - 10 of 27
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: "14px", color: "#7f7e7e" }}>Sort</span>
                  <select className="px-4 py-2 border border-[#ededed] rounded-[8px] text-sm bg-white">
                    <option>Newest</option>
                    <option>Budget: Low to High</option>
                    <option>Budget: High to Low</option>
                  </select>
                </div>
              </div>

              {/* Request cards — 2 column grid, exact Figma 411x368 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {requests.map((r) => (
                  <div key={r.id} className="bg-white border border-[#ededed] rounded-[16px] p-6 flex flex-col gap-4">
                    {/* Top row: Seeking | Bedroom (2 columns) */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <p style={{ fontSize: "12px", color: "#807e7e" }}>Seeking</p>
                        <p style={{ fontSize: "16px", fontWeight: 600, color: "#121212" }}>{r.lookingFor}</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <p style={{ fontSize: "12px", color: "#807e7e" }}>Bedroom</p>
                        <p style={{ fontSize: "16px", fontWeight: 600, color: "#121212" }}>{r.beds}</p>
                      </div>
                    </div>

                    {/* Budget — Figma: 20px Geist SemiBold blue, /year smaller */}
                    <div className="flex flex-col gap-1">
                      <p style={{ fontSize: "12px", color: "#807e7e" }}>Budget</p>
                      <p style={{ color: "#305e82" }}>
                        <span style={{ fontSize: "20px", fontWeight: 600 }}>{r.budget.split('/')[0]}</span>
                        {r.budget.includes('/') && <span style={{ fontSize: "14px", fontWeight: 400 }}>/{r.budget.split('/')[1]}</span>}
                      </p>
                    </div>

                    {/* Area */}
                    <div className="flex flex-col gap-1">
                      <p style={{ fontSize: "12px", color: "#807e7e" }}>Area</p>
                      <p style={{ fontSize: "16px", fontWeight: 500, color: "#121212" }}>{r.area}</p>
                    </div>

                    {/* Request by */}
                    <div className="flex flex-col gap-1">
                      <p style={{ fontSize: "12px", color: "#807e7e" }}>Request by</p>
                      <p style={{ fontSize: "16px", fontWeight: 500, color: "#121212" }}>{r.requestBy}</p>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-[#ededed] mt-auto" />

                    {/* Bottom: Agent (left) + Date in blue (right) */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-[#f3fefe] border border-[#ededed] flex items-center justify-center" style={{ fontSize: "12px", fontWeight: 600, color: "#305e82" }}>
                          {r.agentInitials}
                        </div>
                        <span style={{ fontSize: "14px", fontWeight: 600, color: "#121212" }}>{r.agent}</span>
                        <Image src="/icons/verify.svg" alt="" width={18} height={18} />
                      </div>
                      <span style={{ fontSize: "12px", color: "#305e82" }}>{r.date}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center gap-2 mt-6">
                {[1, 2, 3].map((n) => (
                  <button key={n} className={`w-9 h-9 rounded-[8px] text-sm font-medium ${n === 1 ? "bg-[#305e82] text-white" : "bg-white border border-[#ededed] text-[#121212] hover:bg-[#f6f6f6]"}`}>
                    {n}
                  </button>
                ))}
                <span className="px-2 text-[#7f7e7e]">...</span>
                <button className="flex items-center gap-1 px-3 h-9 rounded-[8px] border border-[#ededed] text-sm font-medium text-[#121212] hover:bg-[#f6f6f6]">
                  Next <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* SIDEBAR (same as For Sale) */}
            <aside className="flex flex-col gap-6 min-w-0">
              <div className="border border-[#ededed] rounded-[16px] p-6">
                <h3 style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 600, color: "#121212" }}>
                  Available Properties
                </h3>
                <p style={{ fontSize: "12px", lineHeight: "20px", color: "#807e7e" }} className="mb-4">
                  Currently available properties
                </p>
                <div className="flex flex-col">
                  <div className="flex items-center justify-between py-1.5 border-b border-[#ededed]" style={{ fontSize: "14px", color: "#305e82", fontWeight: 600 }}>
                    <span>Property Type</span>
                    <span>Property Count</span>
                  </div>
                  {propertyTypes.map((t) => (
                    <div key={t.name} className="flex items-center justify-between py-1.5" style={{ fontSize: "14px", color: "#305e82" }}>
                      <span>{t.name}</span>
                      <span>{t.count}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#ededed] my-4" />

                <div className="flex flex-col">
                  <div className="grid grid-cols-6 gap-2 py-1.5 border-b border-[#ededed]" style={{ fontSize: "12px", color: "#305e82", fontWeight: 600 }}>
                    {bedroomTable.cols.map((c) => (
                      <span key={c} className={c === "Type" ? "" : "text-right"}>{c}</span>
                    ))}
                  </div>
                  {bedroomTable.rows.map((row) => (
                    <div key={row[0]} className="grid grid-cols-6 gap-2 py-1.5" style={{ fontSize: "12px", color: "#305e82" }}>
                      {row.map((cell, i) => (
                        <span key={i} className={i === 0 ? "" : "text-right"}>{cell}</span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-[#ededed] rounded-[16px] p-6">
                <h3 style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 600, color: "#121212" }}>
                  Explore States
                </h3>
                <p style={{ fontSize: "12px", lineHeight: "20px", color: "#807e7e" }} className="mb-4">
                  Find available properties by states
                </p>
                <div className="flex flex-wrap gap-x-3 gap-y-1" style={{ fontSize: "14px", lineHeight: "32px", color: "#305e82" }}>
                  {states.map((s) => (
                    <Link key={s} href={`/search?state=${s.toLowerCase()}`} className="hover:underline whitespace-nowrap">
                      {s}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="border border-[#ededed] rounded-[16px] p-6">
                <h3 style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 600, color: "#121212" }} className="mb-4">
                  Other Related Properties
                </h3>
                <ul className="flex flex-col gap-1">
                  {otherCategories.map((c) => (
                    <li key={c} className="flex items-start gap-2 min-w-0" style={{ fontSize: "14px", lineHeight: "24px", color: "#305e82" }}>
                      <span className="shrink-0">•</span>
                      <Link href="#" className="hover:underline break-words min-w-0">
                        {c}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[16px] p-6 text-white relative overflow-hidden" style={{ background: "linear-gradient(174deg, #75A3C7 0%, #305E82 96%)" }}>
                <Image src="/icons/bell-alert.svg" alt="" width={34} height={36} className="mb-4" />
                <h3 style={{ fontSize: "24px", lineHeight: "32px", fontWeight: 600 }} className="mb-2">
                  Receive alerts for<br />new properties
                </h3>
                <p style={{ fontSize: "14px", lineHeight: "24px" }} className="mb-5 text-white/90">
                  Get instant notifications for recent listings
                </p>
                <button className="text-white rounded-[8px] hover:opacity-90 transition-opacity" style={{ fontSize: "14px", fontWeight: 600, background: "#ff9c00", width: "147px", height: "48px" }}>
                  Subscribe Now
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white">
        <div className="max-w-[1440px] mx-auto px-6 py-6">
          <div className="rounded-[20px] h-[464px] flex flex-col items-center justify-center text-white text-center px-6" style={{ background: "linear-gradient(174deg, #75A3C7 0%, #305E82 96%)" }}>
            <h2 className="font-semibold mb-4 max-w-[500px]" style={{ fontSize: "48px", lineHeight: "60px", letterSpacing: "-0.02em" }}>
              Ready to<br />List Your Property?
            </h2>
            <p className="mb-8 max-w-[600px] text-white/85" style={{ fontSize: "16px", lineHeight: "150%" }}>
              Join thousands of owners and agents on Nigeria&apos;s fastest-growing property
              platform. Get verified, list your property, and reach millions of seekers.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/post-property" className="bg-[#ff9c00] text-white font-semibold px-7 py-3 rounded-[12px] hover:bg-[#e08800] transition-colors" style={{ fontSize: "14px" }}>
                Get Started Free
              </Link>
              <Link href="/login" className="text-white hover:underline" style={{ fontSize: "14px" }}>
                Log in
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

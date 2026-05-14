import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Properties for Sale in Nigeria | RentBuyStay",
  description: "Browse thousands of verified properties for sale across Nigeria.",
};

// Mock listings — Figma: 845x304 cards, 184x184 square image left
const listings = [
  { id: "1", title: "Luxury 4 Bedroom Detached Duplex", price: "₦87,000,000", location: "Lekki Phase 1, Lagos", date: "Listed on 27 Mar 2026", image: "/images/prop4.jpg", desc: "A very beautiful 4 bedroom duplex with state-of-the-earth facilities located in a serene estate in Lekki Phase 1, Lagos for Sale at a reasonable price.", agent: "Chioma Okeke", agentInitials: "CO", tags: ["Newly Built", "C of O", "Fitted Wardrobes/BIQ"], beds: 4, baths: 5, area: "3,500 sqft" },
  { id: "2", title: "Modern 3 Bedroom Penthouse Suite", price: "₦120,000,000", location: "Ikoyi, Lagos", date: "Listed on 27 Mar 2026", image: "/images/prop2.jpg", desc: "Elegant penthouse with panoramic views, premium finishes, and top-tier amenities in the heart of Ikoyi, ideal for luxury living or investment.", agent: "Emeka Nwosu", agentInitials: "EN", tags: ["Brand New", "Deed of Assignment", "24/7 Security"], beds: 3, baths: 4, area: "2,800 sqft" },
  { id: "3", title: "Cozy 2 Bedroom Apartment", price: "₦18,000,000", location: "Yaba, Lagos", date: "Listed on 22 Apr 2026", image: "/images/prop1.jpg", desc: "Comfortable 2 bedroom apartment perfect for small families or professionals, located near public transport and shopping centers.", agent: "Tunde Bello", agentInitials: "TB", tags: ["Governor's Consent", "24/7 Security", "0-3 Years"], beds: 2, baths: 2, area: "950 sqft" },
  { id: "4", title: "Spacious 5 Bedroom Mansion", price: "₦350,000,000", location: "Banana Island, Lagos", date: "Listed on 15 Apr 2026", image: "/images/prop5.jpg", desc: "Magnificent 5 bedroom mansion with a private pool, gym, and landscaped garden in the exclusive Banana Island community.", agent: "Aisha Bello", agentInitials: "AB", tags: ["Newly Renovated", "Certificate of Occupancy", "Gated Community"], beds: 5, baths: 6, area: "5,200 sqft" },
  { id: "5", title: "Elegant 3 Bedroom Townhouse", price: "₦90,000,000", location: "Victoria Island, Lagos", date: "Listed on 10 May 2026", image: "/images/prop3.jpg", desc: "Stylish townhouse with modern interiors, fitted kitchen, and spacious living areas near business districts.", agent: "Chinaza Okafor", agentInitials: "CO", tags: ["Newly Built", "Deed of Assignment", "24/7 Security"], beds: 3, baths: 3, area: "2,100 sqft" },
];

// Sidebar data — Figma exact text
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
  "Property for sale between 100milion and 120milion",
  "Property for sale between 120milion and 150milion",
];

const verifiedAgents = [
  { name: "Olaitan Badejo", initials: "OB", agency: "Prime Realty & Co.", location: "Lagos", listings: 13 },
  { name: "Lade Oyetola", initials: "LO", agency: "Propex", location: "Lagos", listings: 8, avatar: "/images/agent-6.png" },
];

export default function ForSalePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* ── HERO ── */}
      <section className="bg-white p-6">
        <div className="relative rounded-[25px] overflow-hidden bg-[#F3FEFE] min-h-[852px]">
          <div className="absolute inset-0 z-0">
            <Image src="/images/for-sale-hero.png" alt="Properties for Sale" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-black/55" />
          </div>

          <Navbar transparent />

          {/* Heading */}
          <div className="absolute top-[180px] left-1/2 -translate-x-1/2 w-[738px] max-w-[calc(100%-48px)] flex flex-col gap-4 z-10 text-center">
            <h1 className="text-white font-semibold" style={{ fontSize: "64px", lineHeight: "80px", letterSpacing: "-0.02em" }}>
              Properties for Sale in Nigeria
            </h1>
            <p className="text-white" style={{ fontSize: "16px", lineHeight: "32px", fontWeight: 400 }}>
              The properties have been listed by verified estate agents who can be contacted using
              the contact information provided for each property listing. We have 21,141 available
              flats, houses, land and commercial property for sale in Nigeria. Refine your property
              search by price, number of beds and type of property, etc.
            </p>
          </div>

          {/* Search bar at bottom */}
          <div className="absolute bottom-6 left-6 right-6 z-10">
            <SearchBar defaultTab="Buy" />
          </div>
        </div>
      </section>

      {/* ── LISTINGS + SIDEBAR ── */}
      <section className="bg-white">
        <div className="max-w-[1440px] mx-auto px-[80px] py-[60px]">

          {/* 2-column layout: flexible listings + fixed 411 sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_411px] gap-6">

            {/* LEFT column: header + listings */}
            <div className="flex flex-col gap-6 min-w-0">
              {/* Header inside left column */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 style={{ fontSize: "24px", lineHeight: "32px", fontWeight: 600, color: "#121212" }}>
                    All Properties for Sale in Nigeria
                  </h2>
                  <p style={{ fontSize: "14px", color: "#7f7e7e", marginTop: "4px" }}>
                    Showing 1 - 10 of 27
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: "14px", color: "#7f7e7e" }}>Sort</span>
                  <select className="px-4 py-2 border border-[#ededed] rounded-[8px] text-sm bg-white">
                    <option>Newest</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                  </select>
                </div>
              </div>

              {/* Listings cards */}
              <div className="flex flex-col gap-6">
              {listings.map((p) => (
                <Link key={p.id} href={`/properties/${p.id}`} className="bg-white border border-[#ededed] rounded-[16px] p-5 flex flex-col gap-4 hover:shadow-md transition-shadow">

                  {/* TOP SECTION: image left + content right */}
                  <div className="flex gap-5">
                    {/* Image — Figma: 184x184 SQUARE on left with FOR SALE pill, counter, nav arrows */}
                    <div className="relative w-[184px] h-[184px] rounded-[12px] overflow-hidden shrink-0 bg-[#f6f6f6]">
                      <Image src={p.image} alt={p.title} fill className="object-cover" />
                      {/* FOR SALE badge top-left */}
                      <span className="absolute top-3 left-3 bg-[#ff9c00] text-white px-3 py-1 rounded-md uppercase" style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.05em" }}>
                        For Sale
                      </span>
                      {/* Photo counter bottom-left */}
                      <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white" style={{ fontSize: "12px" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                        </svg>
                        <span>3</span>
                      </div>
                      {/* Nav arrows bottom-right */}
                      <div className="absolute bottom-2 right-2 flex items-center gap-1 text-white">
                        <button className="w-5 h-5 flex items-center justify-center bg-black/30 rounded">‹</button>
                        <button className="w-5 h-5 flex items-center justify-center bg-black/30 rounded">›</button>
                      </div>
                    </div>

                    {/* Right content area — flex-1 */}
                    <div className="flex-1 min-w-0 flex flex-col gap-2">
                      {/* Title row + Price right */}
                      <div className="flex items-start justify-between gap-3">
                        <p style={{ fontSize: "20px", fontWeight: 600, color: "#121212", lineHeight: "28px" }} className="truncate flex-1">
                          {p.title}
                        </p>
                        <p style={{ fontSize: "20px", fontWeight: 700, color: "#305e82" }} className="shrink-0">
                          {p.price}
                        </p>
                      </div>

                      {/* Location | Date row */}
                      <div className="flex items-center gap-3" style={{ fontSize: "13px" }}>
                        <span className="flex items-center gap-1.5" style={{ color: "#305e82" }}>
                          <Image src="/icons/location.svg" alt="" width={16} height={16} />
                          {p.location}
                        </span>
                        <span className="w-px h-3 bg-[#ededed]" />
                        <span style={{ color: "#807e7e", fontWeight: 500 }}>{p.date}</span>
                      </div>

                      {/* Description — 2 lines */}
                      <p style={{ fontSize: "14px", color: "#807e7e", lineHeight: "24px" }} className="line-clamp-2 mt-1">
                        {p.desc}
                      </p>

                      {/* Tags */}
                      <div className="flex items-center gap-2 flex-wrap mt-1">
                        {p.tags.map((tag) => (
                          <span key={tag} className="bg-[#f3fefe] px-3 py-1.5 rounded-[8px] whitespace-nowrap" style={{ fontSize: "12px", fontWeight: 500, color: "#305e82" }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* BOTTOM ROW (full card width): Agent left | Stats right */}
                  <div className="flex items-center justify-between border-t border-[#ededed] pt-4">
                    {/* Agent: avatar + name + verify */}
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#f3fefe] border border-[#ededed] flex items-center justify-center" style={{ fontSize: "11px", fontWeight: 600, color: "#305e82" }}>
                        {p.agentInitials}
                      </div>
                      <span style={{ fontSize: "14px", fontWeight: 600, color: "#121212" }}>{p.agent}</span>
                      <Image src="/icons/verify.svg" alt="" width={16} height={16} />
                    </div>

                    {/* Stats: sqft | beds | baths */}
                    <div className="flex items-center gap-4" style={{ fontSize: "13px", color: "#807e7e" }}>
                      <span className="flex items-center gap-1.5">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8V3h5M21 8V3h-5M3 16v5h5M21 16v5h-5"/></svg>
                        {p.area}
                      </span>
                      <span className="w-px h-3 bg-[#ededed]" />
                      <span className="flex items-center gap-1.5">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 22V8.5h20V22M2 13h20M6 13V8.5M2 18h20"/></svg>
                        {p.beds} Beds
                      </span>
                      <span className="w-px h-3 bg-[#ededed]" />
                      <span className="flex items-center gap-1.5">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 6V3a1 1 0 011-1h4a1 1 0 011 1v3M3 11h18v6a4 4 0 01-4 4H7a4 4 0 01-4-4v-6z"/></svg>
                        {p.baths} Baths
                      </span>
                    </div>
                  </div>
                </Link>
              ))}

              </div>{/* end listings cards wrapper */}

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
            </div>{/* end LEFT column wrapper */}

            {/* Sidebar — fixed 411px, prevents overflow */}
            <aside className="flex flex-col gap-6 min-w-0">

              {/* Available Properties — Figma: title 16px #121212, all body in blue #305e82 14px */}
              <div className="border border-[#ededed] rounded-[16px] p-6">
                <h3 style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 600, color: "#121212" }}>
                  Available Properties
                </h3>
                <p style={{ fontSize: "12px", lineHeight: "20px", color: "#807e7e" }} className="mb-4">
                  Currently available properties for Sale
                </p>

                {/* First table: Property Type | Property Count */}
                <div className="flex flex-col">
                  {/* Header row */}
                  <div className="flex items-center justify-between py-1.5 border-b border-[#ededed]" style={{ fontSize: "14px", color: "#305e82", fontWeight: 600 }}>
                    <span>Property Type</span>
                    <span>Property Count</span>
                  </div>
                  {/* Body rows */}
                  {propertyTypes.map((t) => (
                    <div key={t.name} className="flex items-center justify-between py-1.5" style={{ fontSize: "14px", color: "#305e82" }}>
                      <span>{t.name}</span>
                      <span>{t.count}</span>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="border-t border-[#ededed] my-4" />

                {/* Second nested table: Type | 1 Bed | 2 Bed | ... */}
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

              {/* Explore States */}
              <div className="border border-[#ededed] rounded-[16px] p-6">
                <h3 style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 600, color: "#121212" }}>
                  Explore States
                </h3>
                <p style={{ fontSize: "12px", lineHeight: "20px", color: "#807e7e" }} className="mb-4">
                  Find available properties by states
                </p>
                {/* States — flex-wrap so they break to new lines naturally */}
                <div className="flex flex-wrap gap-x-3 gap-y-1" style={{ fontSize: "14px", lineHeight: "32px", color: "#305e82" }}>
                  {states.map((s) => (
                    <Link key={s} href={`/search?state=${s.toLowerCase()}`} className="hover:underline whitespace-nowrap">
                      {s}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Other Related Properties — bullet list, all blue */}
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

              {/* Receive alerts card */}
              <div className="rounded-[16px] p-6 text-white" style={{ background: "linear-gradient(174deg, #75A3C7 0%, #305E82 96%)" }}>
                {/* Bell icon */}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white" className="mb-3">
                  <path d="M12 22a2 2 0 002-2H10a2 2 0 002 2zM18 16v-5a6 6 0 10-12 0v5l-2 2v1h16v-1l-2-2z"/>
                </svg>
                <h3 style={{ fontSize: "18px", lineHeight: "24px", fontWeight: 600 }} className="mb-2">
                  Receive alerts for new properties
                </h3>
                <p style={{ fontSize: "12px", lineHeight: "20px" }} className="mb-4 text-white/85">
                  Get instant notifications for recent listings
                </p>
                <button className="bg-[#ff9c00] text-white px-4 py-2 rounded-[8px] hover:bg-[#e08800] transition-colors" style={{ fontSize: "13px", fontWeight: 600 }}>
                  Subscribe Now
                </button>
              </div>

              {/* Verified Agents mini */}
              <div className="border border-[#ededed] rounded-[16px] p-5">
                <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#121212" }} className="mb-1">
                  Verified Agents
                </h3>
                <p style={{ fontSize: "12px", color: "#7f7e7e" }} className="mb-4">
                  Connect with verified agents and specialists in this area
                </p>
                <div className="flex flex-col gap-3">
                  {verifiedAgents.map((a) => (
                    <div key={a.name} className="flex items-center gap-3 p-3 border border-[#ededed] rounded-[12px]">
                      <div className="w-10 h-10 rounded-full bg-[#f3fefe] border border-[#ededed] overflow-hidden flex items-center justify-center shrink-0">
                        {a.avatar ? (
                          <Image src={a.avatar} alt={a.name} width={40} height={40} className="object-cover w-full h-full" />
                        ) : (
                          <span style={{ fontSize: "12px", fontWeight: 600, color: "#305e82" }}>{a.initials}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <p style={{ fontSize: "13px", fontWeight: 600, color: "#121212" }} className="truncate">{a.name}</p>
                          <Image src="/icons/verify.svg" alt="" width={14} height={14} />
                        </div>
                        <p style={{ fontSize: "11px", color: "#7f7e7e" }}>{a.location}</p>
                      </div>
                      <button className="px-3 py-1.5 text-white rounded-[8px]" style={{ fontSize: "12px", fontWeight: 500, background: "linear-gradient(175deg, #75A3C7 0%, #305E82 100%)" }}>
                        Message
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── CTA "Ready to List Your Property?" ── */}
      <section className="bg-white">
        <div className="max-w-[1440px] mx-auto px-6 py-6">
          <div
            className="rounded-[20px] h-[464px] flex flex-col items-center justify-center text-white text-center px-6"
            style={{ background: "linear-gradient(174deg, #75A3C7 0%, #305E82 96%)" }}
          >
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

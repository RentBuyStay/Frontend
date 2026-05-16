import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";
import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";
import Pagination from "@/components/Pagination";

export const metadata = {
  title: "Shortlet Apartments in Nigeria | RentBuyStay",
  description: "Book verified shortlet apartments across Nigeria for short stays.",
};

const listings = [
  { id: "1", title: "Luxury Studio Apartment", price: "₦150,000/night", location: "Victoria Island, Lagos", date: "Listed on 27 Mar 2026", image: "/images/prop1.jpg", desc: "Stylishly furnished studio with ocean views, modern amenities, and 24/7 concierge service in the heart of VI.", agent: "Kola Adeyemi", agentInitials: "KA", tags: ["Furnished", "Sea View", "24/7 Concierge"], beds: 1, baths: 1, area: "650 sqft" },
  { id: "2", title: "Executive 2 Bedroom Apartment", price: "₦220,000/night", location: "Ikoyi, Lagos", date: "Listed on 27 Mar 2026", image: "/images/prop2.jpg", desc: "Spacious 2 bedroom apartment with full kitchen, gym access, and pool — perfect for business travellers and families.", agent: "Emeka Nwosu", agentInitials: "EN", tags: ["Furnished", "Pool", "Gym"], beds: 2, baths: 2, area: "1,200 sqft" },
  { id: "3", title: "Cozy 1 Bedroom Loft", price: "₦95,000/night", location: "Yaba, Lagos", date: "Listed on 22 Apr 2026", image: "/images/prop1.jpg", desc: "Modern loft with industrial design, fully equipped kitchen, and Wi-Fi — ideal for digital nomads.", agent: "Tunde Bello", agentInitials: "TB", tags: ["Furnished", "Wi-Fi", "Workspace"], beds: 1, baths: 1, area: "750 sqft" },
  { id: "4", title: "Premium 3 Bedroom Penthouse", price: "₦450,000/night", location: "Banana Island, Lagos", date: "Listed on 15 Apr 2026", image: "/images/prop5.jpg", desc: "Top-floor penthouse with private terrace, jacuzzi, and stunning city views — ultimate luxury short stay.", agent: "Aisha Bello", agentInitials: "AB", tags: ["Penthouse", "Jacuzzi", "City View"], beds: 3, baths: 3, area: "2,800 sqft" },
  { id: "5", title: "Modern 1 Bedroom Suite", price: "₦80,000/night", location: "Lekki Phase 1, Lagos", date: "Listed on 10 May 2026", image: "/images/prop3.jpg", desc: "Compact and stylish suite perfect for short business trips, with everything needed for a comfortable stay.", agent: "Chinaza Okafor", agentInitials: "CO", tags: ["Furnished", "Smart TV", "Self Check-in"], beds: 1, baths: 1, area: "550 sqft" },
  { id: "6", title: "Family 4 Bedroom Villa", price: "₦580,000/night", location: "Maitama, Abuja", date: "Listed on 03 May 2026", image: "/images/prop5.jpg", desc: "Beautiful villa with private pool and garden, perfect for family vacations and special occasions.", agent: "Kemi Adeyemi", agentInitials: "KA", tags: ["Pool", "Garden", "Family Friendly"], beds: 4, baths: 4, area: "3,800 sqft" },
  { id: "7", title: "Charming 2 Bedroom Loft", price: "₦175,000/night", location: "Wuse 2, Abuja", date: "Listed on 02 May 2026", image: "/images/prop2.jpg", desc: "Centrally located loft with quick access to embassies and dining, ideal for business or leisure stays.", agent: "Olumide Fashola", agentInitials: "OF", tags: ["Furnished", "Central", "Fast Wi-Fi"], beds: 2, baths: 2, area: "1,100 sqft" },
  { id: "8", title: "Affordable Studio Apartment", price: "₦55,000/night", location: "Surulere, Lagos", date: "Listed on 01 May 2026", image: "/images/prop1.jpg", desc: "Budget-friendly studio in a quiet neighbourhood, perfect for solo travellers on a short visit.", agent: "Funmi Adebayo", agentInitials: "FA", tags: ["Budget", "Quiet Area", "Self Check-in"], beds: 1, baths: 1, area: "450 sqft" },
  { id: "9", title: "Beachfront 2 Bedroom Apartment", price: "₦320,000/night", location: "Eko Atlantic, Lagos", date: "Listed on 29 Apr 2026", image: "/images/prop2.jpg", desc: "Stunning beachfront apartment with direct access to the beach, fully furnished with modern amenities.", agent: "Ibrahim Musa", agentInitials: "IM", tags: ["Beachfront", "Furnished", "Pool"], beds: 2, baths: 2, area: "1,400 sqft" },
  { id: "10", title: "Boutique 1 Bedroom Studio", price: "₦120,000/night", location: "Ikeja GRA, Lagos", date: "Listed on 26 Apr 2026", image: "/images/prop3.jpg", desc: "Designer studio close to the airport, perfect for layovers and short business trips, with airport pickup.", agent: "Ngozi Okoro", agentInitials: "NO", tags: ["Near Airport", "Designer", "Airport Pickup"], beds: 1, baths: 1, area: "600 sqft" },
];

const propertyTypes = [
  { name: "Apartments", count: 5032 },
  { name: "Studios", count: 5032 },
  { name: "Penthouses", count: 5032 },
  { name: "Villas", count: 5032 },
  { name: "Lofts", count: 5032 },
];

const bedroomTable = {
  cols: ["Type", "1 Bed", "2 Bed", "3 Bed", "4 Bed", "5 Bed"],
  rows: [
    ["Apartments", "806", "907", "428", "126", "86"],
    ["Studios", "292", "—", "—", "—", "—"],
  ],
};

const states = ["Lagos", "Abuja", "Oyo", "Ogun", "Enugu", "Edo", "Rivers", "Delta", "Akwa Ibom", "Ondo", "Imo", "Kaduna", "Anambra", "Osun", "Abia", "Nassarawa", "Kwara", "Plateau", "Ebonyi", "Bayelsa", "Benue", "Cross River", "Ekiti", "Bauchi", "Kogi", "Adamawa", "Niger"];

const otherCategories = [
  "Serviced Shortlets",
  "Furnished Shortlets",
  "Newly Built Shortlets",
  "Cheap Shortlets",
  "Luxury Shortlets",
  "Shortlets between 50k and 100k per night",
  "Shortlets between 100k and 200k per night",
  "Shortlets between 200k and 300k per night",
  "Shortlets between 300k and 500k per night",
  "Shortlets above 500k per night",
];

const verifiedAgents = [
  { name: "Olaitan Badejo", initials: "OB", agency: "Prime Realty & Co.", location: "Lagos", listings: 13, rating: 4.6 },
  { name: "Lade Oyetola", initials: "LO", agency: "Propex", location: "Lagos", listings: 8, rating: 4.3, avatar: "/images/agent-6.png" },
];

export default function ShortletPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* HERO */}
      <section className="bg-white p-6">
        <div className="relative rounded-[25px] overflow-hidden bg-[#F3FEFE] min-h-[852px]">
          <div className="absolute inset-0 z-0">
            <Image src="/images/shortlet-hero.png" alt="Shortlet Apartments" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-black/55" />
          </div>

          <Navbar transparent />

          <div className="absolute top-[180px] left-1/2 -translate-x-1/2 w-[738px] max-w-[calc(100%-48px)] flex flex-col gap-4 z-10 text-center">
            <h1 className="text-white font-semibold" style={{ fontSize: "64px", lineHeight: "80px", letterSpacing: "-0.02em" }}>
              Properties for Shortlet in Nigeria
            </h1>
            <p className="text-white" style={{ fontSize: "16px", lineHeight: "32px", fontWeight: 400 }}>
              The properties have been listed by verified estate agents who can be contacted using
              the contact information provided for each property listing. We have 21,141 available
              flats, houses, and commercial property for shortlet in Nigeria. Refine your property
              search by price, number of beds and type of property, etc.
            </p>
          </div>

          <div className="absolute bottom-6 left-6 right-6 z-10">
            <SearchBar defaultTab="Shortlet" />
          </div>
        </div>
      </section>

      {/* LISTINGS + SIDEBAR */}
      <section className="bg-white">
        <div className="max-w-[1440px] mx-auto px-[80px] py-[60px]">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_411px] gap-6">

            {/* LEFT */}
            <div className="flex flex-col gap-6 min-w-0">
              <div className="flex items-center justify-between">
                <div>
                  <h2 style={{ fontSize: "24px", lineHeight: "32px", fontWeight: 600, color: "#121212" }}>
                    All Properties for Shortlet in Nigeria
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

              <div className="flex flex-col gap-6">
                {listings.map((p) => (
                  <Link key={p.id} href={`/properties/${p.id}`} className="bg-white border border-[#ededed] rounded-[16px] p-5 flex flex-col gap-4 hover:shadow-md transition-shadow">

                    <div className="flex gap-5">
                      <div className="relative w-[184px] h-[184px] rounded-[12px] overflow-hidden shrink-0 bg-[#f6f6f6]">
                        <Image src={p.image} alt={p.title} fill className="object-cover" />
                        {/* SHORTLET badge — Figma: top-left 8px inset, pill r=50, 10/600 white uppercase, padding 4/8, bg #FFAE00 */}
                        <span
                          className="absolute uppercase text-white rounded-full"
                          style={{
                            top: "8px",
                            left: "8px",
                            fontSize: "10px",
                            lineHeight: "20px",
                            fontWeight: 600,
                            padding: "4px 8px",
                            letterSpacing: 0,
                            background: "#FFAE00",
                          }}
                        >
                          Shortlet
                        </span>
                        <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white" style={{ fontSize: "12px" }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                          </svg>
                          <span>3</span>
                        </div>
                        <div className="absolute bottom-2 right-2 flex items-center gap-1 text-white">
                          <button className="w-5 h-5 flex items-center justify-center bg-black/30 rounded">‹</button>
                          <button className="w-5 h-5 flex items-center justify-center bg-black/30 rounded">›</button>
                        </div>
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col gap-2">
                        <div className="flex items-start justify-between gap-3">
                          <p style={{ fontSize: "20px", fontWeight: 600, color: "#121212", lineHeight: "28px" }} className="truncate flex-1">
                            {p.title}
                          </p>
                          <p style={{ fontSize: "20px", fontWeight: 700, color: "#305e82" }} className="shrink-0">
                            {p.price}
                          </p>
                        </div>

                        <div className="flex items-center gap-3" style={{ fontSize: "13px" }}>
                          <span className="flex items-center gap-1.5" style={{ color: "#305e82" }}>
                            <Image src="/icons/location.svg" alt="" width={16} height={16} />
                            {p.location}
                          </span>
                          <span className="w-px h-3 bg-[#ededed]" />
                          <span style={{ color: "#807e7e", fontWeight: 500 }}>{p.date}</span>
                        </div>

                        <p style={{ fontSize: "14px", color: "#807e7e", lineHeight: "24px" }} className="line-clamp-2 mt-1">
                          {p.desc}
                        </p>

                        <div className="flex items-center gap-2 flex-wrap mt-1">
                          {p.tags.map((tag) => (
                            <span key={tag} className="bg-[#f3fefe] px-3 py-1.5 rounded-[8px] whitespace-nowrap" style={{ fontSize: "12px", fontWeight: 500, color: "#305e82" }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-[#ededed] pt-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#f3fefe] border border-[#ededed] flex items-center justify-center" style={{ fontSize: "11px", fontWeight: 600, color: "#305e82" }}>
                          {p.agentInitials}
                        </div>
                        <span style={{ fontSize: "14px", fontWeight: 600, color: "#121212" }}>{p.agent}</span>
                        <Image src="/icons/verify.svg" alt="" width={16} height={16} />
                      </div>
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
              </div>

              <div className="mt-6">
                <Pagination current={1} />
              </div>
            </div>

            {/* SIDEBAR */}
            <aside className="flex flex-col gap-6 min-w-0">
              <div className="border border-[#ededed] rounded-[16px] p-6">
                <h3 style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 600, color: "#121212" }}>
                  Available Properties
                </h3>
                <p style={{ fontSize: "12px", lineHeight: "20px", color: "#807e7e" }} className="mb-4">
                  Currently available properties for Shortlet
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
                <button className="text-white rounded-[8px] hover:opacity-90 transition-opacity" style={{ fontSize: "14px", fontWeight: 600, background: "#FFAE00", width: "147px", height: "48px" }}>
                  Subscribe Now
                </button>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <h3 style={{ fontSize: "20px", lineHeight: "32px", fontWeight: 600, color: "#121212" }}>
                    Verified Agents
                  </h3>
                  <p style={{ fontSize: "16px", lineHeight: "24px", color: "#807e7e" }}>
                    Connect with with verified agents and specialists in this area.
                  </p>
                </div>

                {verifiedAgents.map((a) => (
                  <div key={a.name} className="bg-white rounded-[20px] p-5 flex flex-col gap-4" style={{ border: "1px solid #f6f6f6" }}>
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-full bg-[#f3fefe] border border-[#ededed] overflow-hidden flex items-center justify-center shrink-0">
                        {a.avatar ? (
                          <Image src={a.avatar} alt={a.name} width={56} height={56} className="object-cover w-full h-full" />
                        ) : (
                          <span style={{ fontSize: "16px", fontWeight: 600, color: "#305e82" }}>{a.initials}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 600, color: "#121212" }} className="truncate">
                            {a.name}
                          </p>
                          <Image src="/icons/verify.svg" alt="" width={18} height={18} className="shrink-0" />
                        </div>
                        <p style={{ fontSize: "12px", color: "#807e7e" }} className="truncate">{a.agency}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Image src="/icons/location.svg" alt="" width={16} height={16} />
                          <span style={{ fontSize: "12px", color: "#305e82" }}>{a.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="h-px bg-[#f6f6f6]" />

                    <div className="flex items-center gap-3" style={{ fontSize: "14px", color: "#807e7e" }}>
                      <div className="flex items-center gap-1.5">
                        <Image src="/icons/star.svg" alt="" width={20} height={20} />
                        <span>{a.rating.toFixed(1)}</span>
                      </div>
                      <div className="w-px h-4 bg-[#807e7e]/40" />
                      <div className="flex items-center gap-1.5">
                        <Image src="/icons/buildings.svg" alt="" width={20} height={20} />
                        <span>{a.listings} listings</span>
                      </div>
                    </div>

                    <div className="h-px bg-[#f6f6f6]" />

                    <div className="flex gap-3">
                      <button className="flex-1 flex items-center justify-center gap-2 rounded-[12px] hover:bg-[#f6f6f6] transition-colors" style={{ height: "48px", padding: "8px 24px", border: "1px solid #ededed", color: "#121212", fontSize: "14px", fontWeight: 500 }}>
                        <Phone size={18} strokeWidth={1.5} /> Call
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 rounded-[12px] text-white hover:opacity-90 transition-opacity" style={{ height: "48px", padding: "8px 24px", fontSize: "14px", fontWeight: 500, background: "linear-gradient(175deg, rgba(117,163,199,1) 0%, rgba(48,94,130,1) 100%)" }}>
                        <MessageCircle size={18} strokeWidth={1.5} /> Message
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

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
              <Link href="/post-property" className="bg-[#FFAE00] text-white font-semibold px-7 py-3 rounded-[12px] hover:bg-[#E69A00] transition-colors" style={{ fontSize: "14px" }}>
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

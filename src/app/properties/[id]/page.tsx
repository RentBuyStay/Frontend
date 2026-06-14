import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { mockProperties } from "@/lib/mockData";
import PropertyCard from "@/components/PropertyCard";
import ListPropertyCTA from "@/components/ListPropertyCTA";
import SearchBar from "@/components/SearchBar";

// Property detail — Figma node 133:18506 ("about prop for sale")
// Linked from home page featured-property cards via ON_CLICK prototype interaction.

const amenities = [
  "Gated Compound",
  "24/7 Security",
  "Air Conditioning",
  "Parking Space",
  "Water Treatment",
  "Furnished",
  "Gym Facility",
  "Underground Parking",
  "Smart Home System",
  "Swimming Pool",
  "Solar Panels",
  "Pet Friendly",
  "Community Hall",
  "Backup Generator",
  "High-Speed Internet",
];

// Other Related Properties — Figma 133:18632 / 743:70045 (sidebar bullet list)
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

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { id } = await params;
  const property = mockProperties.find((p) => p.id === id) ?? mockProperties[0];

  // "Interested in this Property?" card — Figma 133:18584. Rendered twice:
  // after the price on mobile (Figma order) and in the sidebar on desktop.
  const interestedCard = (
    <div
      className="bg-white"
      style={{ width: "100%", border: "1px solid #F6F6F6", borderRadius: "20px", padding: "24px" }}
    >
      <h3 style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 600, color: "#121212" }}>
        Interested in this Property?
      </h3>
      <div className="flex flex-col" style={{ gap: "24px", marginTop: "24px" }}>
        {/* Request Inspection — blue gradient bg */}
        <button
          className="flex items-center justify-center text-white hover:opacity-90 transition-opacity"
          style={{
            height: "56px",
            padding: "16px 24px",
            gap: "8px",
            background: "linear-gradient(175deg, #75A3C7 0%, #305E82 100%)",
            borderRadius: "12px",
          }}
        >
          <Image src="/icons/calendar-detail.svg" alt="" width={24} height={24} />
          <span style={{ fontSize: "14px", lineHeight: "24px", fontWeight: 500 }}>
            Request Inspection
          </span>
        </button>
        {/* Save for Later — white bg, gray border */}
        <button
          className="flex items-center justify-center hover:opacity-90 transition-opacity"
          style={{
            height: "56px",
            padding: "16px 24px",
            gap: "8px",
            background: "#FFFFFF",
            border: "1px solid #F6F6F6",
            borderRadius: "12px",
          }}
        >
          <Image src="/icons/heart.svg" alt="" width={24} height={24} />
          <span style={{ fontSize: "14px", lineHeight: "24px", fontWeight: 500, color: "#121212" }}>
            Save for Later
          </span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Hero — Figma 216:21621 / 743:69607: navbar (glass) + search inside a rounded
          white card, inset 24px (desktop) / 16px (mobile) from the page edges */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-[1440px] px-4 md:px-6 pt-4 md:pt-6">
          <div className="rounded-[20px] md:rounded-[25px] bg-white md:p-6 flex flex-col gap-10">
            <Navbar variant="card" />
            <SearchBar defaultTab="Rent" />
          </div>
        </div>
      </section>

      {/* TOP HEADER — Figma 133:18646 (Group 2087326551): x:80 y:40 w:1280 h:104
          Left column: Back link + Title + Location/Listed
          Right: Report Listing button at x:1117.8 y:31 w:162.2 h:48 */}
      <section className="bg-white" style={{ paddingTop: "40px" }}>
        <div className="relative mx-auto w-full max-w-[1440px] px-4 md:px-[80px]">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col min-w-0 flex-1" style={{ gap: "16px" }}>
              {/* Back — Figma 133:18648 */}
              <Link
                href="/"
                className="inline-flex items-center hover:opacity-80"
                style={{ gap: "12px", color: "#525252" }}
              >
                <Image src="/icons/arrow-back.svg" alt="" width={24} height={24} className="w-4 h-4 md:w-6 md:h-6" />
                <span className="text-[12px] md:text-[16px]" style={{ fontFamily: "Geist, sans-serif", lineHeight: "24px", fontWeight: 400 }}>
                  Back
                </span>
              </Link>
              {/* Title — Figma 133:18652: 24/600 line-height 32, TITLE case */}
              <h1
                className="truncate text-[16px] leading-[24px] md:text-[24px] md:leading-[32px]"
                style={{ fontWeight: 600, color: "#121212", letterSpacing: "-0.02em" }}
              >
                {property.beds} Bedroom Flat for Sale in {property.location}
              </h1>
              <div className="flex items-center" style={{ gap: "16px" }}>
                <div className="flex items-center" style={{ gap: "8px" }}>
                  <Image src="/icons/location-figma.svg" alt="" width={20} height={20} />
                  <span className="text-[12px] md:text-[14px]" style={{ lineHeight: "24px", fontWeight: 400, color: "#807E7E" }}>
                    {property.location}
                  </span>
                </div>
                <span style={{ fontSize: "12px", lineHeight: "24px", fontWeight: 400, color: "#807E7E" }}>
                  Listed 3 days ago
                </span>
              </div>
            </div>
            {/* Report Listing — Figma 133:18663: bg white, r:12, 8px 16px padding, w:162.2 h:48
                flag icon stroke #D80027, text "Report Listing" 14/500 #D80027 */}
            <button
              className="flex items-center justify-center shrink-0 gap-2 hover:opacity-80 transition-opacity w-10 h-10 md:w-auto md:h-12"
            >
              <Image src="/icons/flag-report.svg" alt="" width={24} height={24} />
              <span className="hidden md:inline" style={{ fontSize: "14px", lineHeight: "24px", fontWeight: 500, color: "#D80027" }}>
                Report Listing
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* MAIN BODY — Figma 133:18582 (1440x2803):
          Left content (133:18666): x:79 y:192 w:846 column gap 32
          Right sidebar (133:18583): x:949 y:192 w:411 column gap 24 */}
      <section className="bg-white" style={{ paddingTop: "48px", paddingBottom: "80px" }}>
        <div className="mx-auto w-full max-w-[1440px] px-4 md:px-[80px] flex flex-col lg:flex-row gap-6">
          {/* LEFT CONTENT */}
          <div className="flex flex-col w-full min-w-0 lg:flex-1" style={{ gap: "32px" }}>
            {/* Gallery — Figma 133:18667: 846x450 r:20 bg #F6F6F6 with main image + thumb + counter */}
            <div
              className="relative overflow-hidden bg-[#F6F6F6] w-full h-[300px] md:h-[450px]"
              style={{ borderRadius: "20px" }}
            >
              <Image
                src={property.image ?? "/images/pd-main.png"}
                alt={property.title}
                fill
                style={{ objectFit: "cover" }}
                priority
              />
              {/* Image counter — Figma 64x32 pill, bottom-left on BOTH mobile (743:70919)
                  and desktop (133:18670); gallery icon 16 + "2/11" 15px */}
              <div
                className="absolute flex items-center justify-center bottom-4 left-4"
                style={{
                  width: "64px",
                  height: "32px",
                  background: "rgba(18,18,18,0.5)",
                  borderRadius: "8px",
                  gap: "5px",
                }}
              >
                <Image src="/icons/gallery-count.svg" alt="" width={16} height={16} />
                <span style={{ fontSize: "15px", lineHeight: "16px", fontWeight: 400, color: "#FFFFFF" }}>
                  2/11
                </span>
              </div>
              {/* Nav arrows — mobile only, vertically centered (Figma 743:70963) */}
              <button
                type="button"
                aria-label="Previous photo"
                className="md:hidden absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center hover:opacity-90 transition-opacity"
                style={{ background: "rgba(18,18,18,0.2)", borderRadius: "10px", padding: "5px" }}
              >
                <span className="w-6 h-6 flex items-center justify-center">
                  <Image src="/icons/gallery-arrow.svg" alt="" width={9} height={18} />
                </span>
              </button>
              <button
                type="button"
                aria-label="Next photo"
                className="md:hidden absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center hover:opacity-90 transition-opacity"
                style={{ background: "rgba(18,18,18,0.2)", borderRadius: "10px", padding: "5px" }}
              >
                <span className="w-6 h-6 flex items-center justify-center rotate-180">
                  <Image src="/icons/gallery-arrow.svg" alt="" width={9} height={18} />
                </span>
              </button>
            </div>

            {/* Price + Stats row — Figma 133:18673 */}
            <div className="flex flex-col gap-4 py-4 border-t border-b border-[#f6f6f6] md:flex-row md:items-center md:justify-between md:gap-0">
              <span className="text-[20px] leading-[32px] md:text-[32px] md:leading-[56px]" style={{ fontWeight: 700, color: "#305E82" }}>
                {property.price}
              </span>
              <div className="flex items-center" style={{ gap: "16px" }}>
                <div className="flex items-center" style={{ gap: "8px" }}>
                  <Image src="/icons/prop-maximize.svg" alt="" width={24} height={24} />
                  <span style={{ fontSize: "14px", lineHeight: "20px", fontWeight: 500, color: "#121212" }}>
                    {property.sqft}
                  </span>
                </div>
                <span style={{ width: "1px", height: "20px", background: "#EDEDED" }} />
                <div className="flex items-center" style={{ gap: "8px" }}>
                  <Image src="/icons/prop-bed.svg" alt="" width={24} height={24} />
                  <span style={{ fontSize: "14px", lineHeight: "20px", fontWeight: 500, color: "#121212" }}>
                    {property.beds} Beds
                  </span>
                </div>
                <span style={{ width: "1px", height: "20px", background: "#EDEDED" }} />
                <div className="flex items-center" style={{ gap: "8px" }}>
                  <Image src="/icons/prop-bath.svg" alt="" width={24} height={24} />
                  <span style={{ fontSize: "14px", lineHeight: "20px", fontWeight: 500, color: "#121212" }}>
                    {property.baths} Baths
                  </span>
                </div>
              </div>
            </div>

            {/* Interested CTA — mobile only, sits right after the price (Figma order) */}
            <div className="lg:hidden">{interestedCard}</div>

            {/* Description — Figma 133:18697 */}
            <div className="flex flex-col" style={{ gap: "16px" }}>
              <h2 className="text-[14px] leading-[24px] md:text-[20px] md:leading-[32px]" style={{ fontWeight: 600, color: "#305E82" }}>
                Description
              </h2>
              <p className="text-[16px]" style={{ lineHeight: "24px", fontWeight: 400, color: "#121212" }}>
                This stunning {property.beds}-bedroom apartment is situated in the heart of{" "}
                {property.location}, offering breathtaking views and top-tier finishes throughout.
                The property features an open-plan living and dining area, a fully fitted kitchen,
                and spacious bedrooms with built-in wardrobes.
                <br />
                The apartment sits within a secure, well-managed estate with 24/7 security, backup
                power, and dedicated parking. Ideal for executives and families seeking premium urban
                living in Lagos.
              </p>
              <button
                className="self-start hover:opacity-80"
                style={{ fontSize: "14px", lineHeight: "24px", fontWeight: 500, color: "#305E82" }}
              >
                Show more
              </button>
            </div>

            {/* Amenities & Features — Figma 133:18700: 4-column grid with tick-circle bullets */}
            <div className="flex flex-col" style={{ gap: "16px" }}>
              <h2 className="text-[14px] leading-[24px] md:text-[20px] md:leading-[32px]" style={{ fontWeight: 600, color: "#305E82" }}>
                Amenities &amp; Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4 md:gap-x-[72px] md:gap-y-6">
                {amenities.map((a) => (
                  <div key={a} className="flex items-center" style={{ gap: "8px" }}>
                    <Image src="/icons/tick-circle.svg" alt="" width={20} height={20} />
                    <span style={{ fontSize: "14px", lineHeight: "20px", fontWeight: 400, color: "#121212" }}>
                      {a}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Property Details — Figma 133:18753: 2-column key/value grid */}
            <div className="flex flex-col" style={{ gap: "16px" }}>
              <h2 className="text-[14px] leading-[24px] md:text-[20px] md:leading-[32px]" style={{ fontWeight: 600, color: "#305E82" }}>
                Property Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "24px" }}>
                {[
                  { k: "PROPERTY ID", v: `RBS-L-00${4820 + parseInt(property.id, 10)}` },
                  { k: "TYPE", v: "Apartment and Flat" },
                  { k: "Status", v: "Active" },
                  { k: "LISTED ON", v: "28 Mar 2026" },
                ].map((row) => (
                  <div key={row.k} className="flex flex-col" style={{ gap: "8px" }}>
                    <span style={{ fontSize: "13px", lineHeight: "20px", fontWeight: 400, color: "#807E7E", letterSpacing: "-0.02em" }}>
                      {row.k}
                    </span>
                    <span style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 500, color: "#121212", letterSpacing: "-0.02em" }}>
                      {row.v}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* View Map — Figma 133:18770: real interactive map via OpenStreetMap embed.
                Lagos center: 6.5244, 3.3792 — small bbox keeps the marker visible. */}
            <div className="flex flex-col" style={{ gap: "16px" }}>
              <h2 className="text-[14px] leading-[24px] md:text-[20px] md:leading-[32px]" style={{ fontWeight: 600, color: "#305E82" }}>
                View Map
              </h2>
              <div
                className="relative overflow-hidden bg-[#F6F6F6]"
                style={{ width: "100%", height: "424px", borderRadius: "20px" }}
              >
                <iframe
                  title={`Map of ${property.location}`}
                  src="https://www.openstreetmap.org/export/embed.html?bbox=3.3492%2C6.4944%2C3.4092%2C6.5544&layer=mapnik&marker=6.5244%2C3.3792"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR — Figma 133:18583 */}
          <div className="flex flex-col w-full min-w-0 lg:w-[411px] lg:shrink-0" style={{ gap: "24px" }}>
            {/* Interested CTA — desktop sidebar only (mobile copy sits after price) */}
            <div className="hidden lg:block">{interestedCard}</div>

            {/* Agent card — Figma 133:18593: "Listed by" heading, avatar 64 + name + agency,
                location/joined rows (desktop), rating + View all between dividers,
                then Call (white) + Message (blue) buttons */}
            <div
              className="bg-white"
              style={{ width: "100%", border: "1px solid #F6F6F6", borderRadius: "20px", padding: "24px" }}
            >
              {/* Listed by heading */}
              <h3 style={{ fontSize: "16px", lineHeight: "32px", fontWeight: 600, color: "#121212" }}>
                Listed by
              </h3>

              {/* Avatar + name + agency */}
              <div className="flex items-center" style={{ gap: "16px", marginTop: "24px" }}>
                <div
                  className="rounded-full flex items-center justify-center text-white shrink-0"
                  style={{ width: "64px", height: "64px", background: "#305E82", fontSize: "18px", fontWeight: 600 }}
                >
                  {property.agentInitials}
                </div>
                <div className="flex flex-col" style={{ gap: "8px" }}>
                  <div className="flex items-center" style={{ gap: "8px" }}>
                    <span className="text-[16px] lg:text-[18px]" style={{ lineHeight: "24px", fontWeight: 600, color: "#121212" }}>
                      {property.agentName}
                    </span>
                    <Image src="/icons/verify-figma.svg" alt="" width={20} height={20} />
                  </div>
                  {/* Mobile: agency line — Figma 743:71200 */}
                  <span className="lg:hidden" style={{ fontSize: "11px", lineHeight: "16px", fontWeight: 400, color: "#807E7E" }}>
                    Prime Estates
                  </span>
                  {/* Desktop: "Propper." + AGENT pill — Figma 216:21683 */}
                  <div className="hidden lg:flex items-center" style={{ gap: "16px" }}>
                    <span style={{ fontSize: "14px", lineHeight: "20px", fontWeight: 500, color: "#807E7E" }}>
                      Propper.
                    </span>
                    <span
                      className="inline-flex items-center text-white"
                      style={{ background: "#305E82", borderRadius: "100px", padding: "3px 12px", fontSize: "12px", fontWeight: 500 }}
                    >
                      AGENT
                    </span>
                  </div>
                </div>
              </div>

              {/* Location + Joined — desktop only (Figma mobile omits these) */}
              <div className="hidden lg:flex flex-col" style={{ gap: "16px", marginTop: "24px" }}>
                <div className="flex items-center" style={{ gap: "8px" }}>
                  <Image src="/icons/location-detail.svg" alt="" width={20} height={20} />
                  <span style={{ fontSize: "12px", lineHeight: "24px", color: "#807E7E" }}>
                    {property.location}
                  </span>
                </div>
                <div className="flex items-center" style={{ gap: "8px" }}>
                  <Image src="/icons/user-profile.svg" alt="" width={20} height={20} />
                  <span style={{ fontSize: "12px", lineHeight: "24px", color: "#807E7E" }}>
                    Joined 2 years ago
                  </span>
                </div>
              </div>

              {/* Rating + listings + View all — between full-width dividers */}
              <div className="flex items-center justify-between gap-2 border-t border-b border-[#F6F6F6] py-4" style={{ marginTop: "24px" }}>
                <div className="flex items-center" style={{ gap: "16px" }}>
                  <div className="flex items-center" style={{ gap: "8px" }}>
                    <Image src="/icons/star.svg" alt="" width={20} height={20} />
                    <span className="text-[12px] md:text-[14px]" style={{ lineHeight: "20px", fontWeight: 500, color: "#807E7E" }}>
                      4.3
                    </span>
                  </div>
                  <span style={{ width: "1px", height: "14px", background: "#EDEDED" }} />
                  <div className="flex items-center" style={{ gap: "8px" }}>
                    <Image src="/icons/buildings.svg" alt="" width={20} height={20} />
                    <span className="text-[12px] md:text-[14px]" style={{ lineHeight: "20px", fontWeight: 500, color: "#807E7E" }}>
                      8 listings
                    </span>
                  </div>
                </div>
                <Link
                  href={`/agents/${property.agentInitials.toLowerCase()}`}
                  className="hover:opacity-80 shrink-0 whitespace-nowrap text-[12px] md:text-[14px]"
                  style={{ lineHeight: "20px", fontWeight: 500, color: "#305E82" }}
                >
                  View all Properties
                </Link>
              </div>

              {/* Call + Message buttons */}
              <div className="flex" style={{ gap: "12px", marginTop: "24px" }}>
                <button
                  className="flex items-center justify-center hover:opacity-90 transition-opacity flex-1"
                  style={{
                    height: "48px",
                    padding: "12px 16px",
                    gap: "8px",
                    background: "#FFFFFF",
                    border: "1px solid #F6F6F6",
                    borderRadius: "12px",
                  }}
                >
                  <Image src="/icons/call.svg" alt="" width={20} height={20} />
                  <span style={{ fontSize: "14px", lineHeight: "24px", fontWeight: 500, color: "#121212" }}>
                    Call
                  </span>
                </button>
                <button
                  className="flex items-center justify-center text-white hover:opacity-90 transition-opacity flex-1"
                  style={{
                    height: "48px",
                    padding: "12px 16px",
                    gap: "8px",
                    background: "linear-gradient(175deg, #75A3C7 0%, #305E82 100%)",
                    border: "1px solid rgba(120,158,187,0.5)",
                    borderRadius: "12px",
                  }}
                >
                  <Image src="/icons/messages-2.svg" alt="" width={20} height={20} />
                  <span style={{ fontSize: "14px", lineHeight: "24px", fontWeight: 500 }}>
                    Message
                  </span>
                </button>
              </div>
            </div>

            {/* Other Related Properties — Figma 133:18632: bordered card, bullet list */}
            <div
              className="bg-white"
              style={{ width: "100%", border: "1px solid #F6F6F6", borderRadius: "20px", padding: "24px" }}
            >
              <h3 className="mb-6" style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 500, color: "#121212" }}>
                Other Related Properties
              </h3>
              <ul className="flex flex-col gap-2">
                {otherCategories.map((c) => (
                  <li
                    key={c}
                    className="flex items-start gap-2 min-w-0"
                    style={{ fontSize: "14px", lineHeight: "24px", color: "#305E82" }}
                  >
                    <span className="shrink-0">•</span>
                    <Link href="#" className="hover:underline break-words min-w-0">
                      {c}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED LISTINGS — Figma 218:25720: x:79 y:2028 w:1282 column gap 24
          Title 24/600 line-height 32 + subtitle, then row of 3 cards (411 each, gap 24) */}
      <section className="bg-white" style={{ paddingBottom: "80px" }}>
        <div className="mx-auto w-full max-w-[1440px] px-4 md:px-[80px]">
          <div className="flex flex-col" style={{ gap: "8px", marginBottom: "24px" }}>
            <h2 className="text-[20px] leading-[24px] md:text-[24px] md:leading-[32px]" style={{ fontWeight: 600, color: "#121212", letterSpacing: "-0.02em" }}>
              Related Listings
            </h2>
            <p style={{ fontSize: "14px", lineHeight: "24px", fontWeight: 400, color: "#807E7E" }}>
              See similar property listings that you might like
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "24px" }}>
            {mockProperties.filter((p) => p.id !== property.id).slice(0, 3).map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      </section>

      <ListPropertyCTA />

      <Footer />
    </div>
  );
}

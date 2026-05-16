import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { mockProperties } from "@/lib/mockData";
import PropertyCard from "@/components/PropertyCard";
import GetStartedFreeButton from "@/components/GetStartedFreeButton";
import LogInButton from "@/components/LogInButton";

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

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { id } = await params;
  const property = mockProperties.find((p) => p.id === id) ?? mockProperties[0];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar — Figma uses a search/filter strip here; using regular Navbar for now */}
      <section className="bg-white" style={{ paddingTop: "24px", paddingLeft: "24px", paddingRight: "24px" }}>
        <Navbar />
      </section>

      {/* TOP HEADER — Figma 133:18646 (Group 2087326551): x:80 y:40 w:1280 h:104
          Left column: Back link + Title + Location/Listed
          Right: Report Listing button at x:1117.8 y:31 w:162.2 h:48 */}
      <section className="bg-white" style={{ paddingTop: "40px" }}>
        <div className="relative mx-auto" style={{ width: "1280px", maxWidth: "calc(100% - 160px)" }}>
          <div className="flex items-start justify-between">
            <div className="flex flex-col" style={{ gap: "16px" }}>
              {/* Back — Figma 133:18648 */}
              <Link
                href="/"
                className="inline-flex items-center hover:opacity-80"
                style={{ gap: "12px", color: "#525252" }}
              >
                <Image src="/icons/arrow-back.svg" alt="" width={24} height={24} />
                <span style={{ fontFamily: "Geist, sans-serif", fontSize: "16px", lineHeight: "24px", fontWeight: 400 }}>
                  Back
                </span>
              </Link>
              {/* Title — Figma 133:18652: 24/600 line-height 32, TITLE case */}
              <h1
                style={{
                  fontSize: "24px",
                  lineHeight: "32px",
                  fontWeight: 600,
                  color: "#121212",
                  letterSpacing: "-0.02em",
                }}
              >
                {property.beds} Bedroom Flat for Sale in {property.location}
              </h1>
              <div className="flex items-center" style={{ gap: "16px" }}>
                <div className="flex items-center" style={{ gap: "8px" }}>
                  <Image src="/icons/location-figma.svg" alt="" width={20} height={20} />
                  <span style={{ fontSize: "14px", lineHeight: "24px", fontWeight: 400, color: "#807E7E" }}>
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
              className="flex items-center justify-center hover:opacity-90 transition-opacity"
              style={{
                gap: "8px",
                padding: "8px 16px",
                background: "#FFFFFF",
                border: "1px solid #F6F6F6",
                borderRadius: "12px",
                width: "162px",
                height: "48px",
              }}
            >
              <Image src="/icons/flag-report.svg" alt="" width={24} height={24} />
              <span style={{ fontSize: "14px", lineHeight: "24px", fontWeight: 500, color: "#D80027" }}>
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
        <div className="mx-auto flex" style={{ width: "1280px", maxWidth: "calc(100% - 160px)", gap: "24px" }}>
          {/* LEFT CONTENT */}
          <div className="flex flex-col" style={{ width: "846px", flexShrink: 0, gap: "32px" }}>
            {/* Gallery — Figma 133:18667: 846x450 r:20 bg #F6F6F6 with main image + thumb + counter */}
            <div
              className="relative overflow-hidden bg-[#F6F6F6]"
              style={{ width: "846px", maxWidth: "100%", height: "450px", borderRadius: "20px" }}
            >
              <Image
                src={property.image ?? "/images/pd-main.png"}
                alt={property.title}
                fill
                style={{ objectFit: "cover" }}
                priority
              />
              {/* Image counter — bottom-right pill bg rgba(0,0,0,0.5) r:8 */}
              <div
                className="absolute flex items-center"
                style={{
                  bottom: "16px",
                  right: "16px",
                  background: "rgba(0,0,0,0.5)",
                  borderRadius: "8px",
                  padding: "6px 12px",
                  gap: "8px",
                }}
              >
                <Image src="/icons/gallery-count.svg" alt="" width={16} height={16} />
                <span style={{ fontSize: "12px", lineHeight: "16px", fontWeight: 500, color: "#FFFFFF" }}>
                  2/11
                </span>
              </div>
            </div>

            {/* Price + Stats row — Figma 133:18673 */}
            <div className="flex items-center justify-between" style={{ paddingTop: "8px", paddingBottom: "8px", borderBottom: "1px solid #F6F6F6" }}>
              <span style={{ fontSize: "28px", lineHeight: "36px", fontWeight: 700, color: "#305E82" }}>
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

            {/* Description — Figma 133:18697 */}
            <div className="flex flex-col" style={{ gap: "16px" }}>
              <h2 style={{ fontSize: "20px", lineHeight: "28px", fontWeight: 600, color: "#305E82" }}>
                Description
              </h2>
              <p style={{ fontSize: "14px", lineHeight: "24px", fontWeight: 400, color: "#121212" }}>
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
              <h2 style={{ fontSize: "20px", lineHeight: "28px", fontWeight: 600, color: "#305E82" }}>
                Amenities &amp; Features
              </h2>
              <div className="grid" style={{ gridTemplateColumns: "repeat(3, 1fr)", gap: "16px 24px" }}>
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
              <h2 style={{ fontSize: "20px", lineHeight: "28px", fontWeight: 600, color: "#305E82" }}>
                Property Details
              </h2>
              <div className="grid" style={{ gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }}>
                {[
                  { k: "PROPERTY ID", v: `RBS-L-00${4820 + parseInt(property.id, 10)}` },
                  { k: "TYPE", v: "Apartment and Flat" },
                  { k: "STATUS", v: "Active" },
                  { k: "LISTED ON", v: "28 Mar 2026" },
                ].map((row) => (
                  <div key={row.k} className="flex flex-col" style={{ gap: "4px" }}>
                    <span style={{ fontSize: "12px", lineHeight: "20px", fontWeight: 500, color: "#807E7E", letterSpacing: "0.05em" }}>
                      {row.k}
                    </span>
                    <span style={{ fontSize: "14px", lineHeight: "20px", fontWeight: 500, color: "#121212" }}>
                      {row.v}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* View Map — Figma 133:18770: real interactive map via OpenStreetMap embed.
                Lagos center: 6.5244, 3.3792 — small bbox keeps the marker visible. */}
            <div className="flex flex-col" style={{ gap: "16px" }}>
              <h2 style={{ fontSize: "20px", lineHeight: "28px", fontWeight: 600, color: "#305E82" }}>
                View Map
              </h2>
              <div
                className="relative overflow-hidden bg-[#F6F6F6]"
                style={{ width: "100%", height: "400px", borderRadius: "20px" }}
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
          <div className="flex flex-col" style={{ width: "411px", flexShrink: 0, gap: "24px" }}>
            {/* Interested CTA — Figma 133:18584: 411x232 r:20 1px #F6F6F6 border */}
            <div
              className="bg-white"
              style={{ width: "411px", border: "1px solid #F6F6F6", borderRadius: "20px", padding: "24px" }}
            >
              <h3 style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 600, color: "#121212" }}>
                Interested in this Property?
              </h3>
              <div className="flex flex-col" style={{ gap: "16px", marginTop: "24px" }}>
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

            {/* Agent card — Figma 133:18593: 411 wide r:20 1px #F6F6F6 border, padding 24
                Avatar 56x56, name + verify badge, "Propper." text + AGENT pill
                Call (white) + Message (blue) buttons, ratings/listings row, View all link */}
            <div
              className="bg-white"
              style={{ width: "411px", border: "1px solid #F6F6F6", borderRadius: "20px", padding: "24px" }}
            >
              <div className="flex items-center" style={{ gap: "16px" }}>
                <div
                  className="rounded-full flex items-center justify-center text-white shrink-0"
                  style={{
                    width: "56px",
                    height: "56px",
                    background: "#305E82",
                    fontSize: "16px",
                    fontWeight: 600,
                  }}
                >
                  {property.agentInitials}
                </div>
                <div className="flex flex-col" style={{ gap: "4px" }}>
                  <div className="flex items-center" style={{ gap: "4px" }}>
                    <span style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 600, color: "#121212" }}>
                      {property.agentName}
                    </span>
                    <Image src="/icons/verify-figma.svg" alt="" width={20} height={20} />
                  </div>
                  <div className="flex items-center" style={{ gap: "8px" }}>
                    <span style={{ fontSize: "12px", lineHeight: "16px", fontWeight: 500, color: "#807E7E" }}>
                      Propper.
                    </span>
                    <span
                      style={{
                        background: "#305E82",
                        color: "#FFFFFF",
                        padding: "2px 8px",
                        borderRadius: "100px",
                        fontSize: "10px",
                        fontWeight: 600,
                        letterSpacing: "0.05em",
                      }}
                    >
                      AGENT
                    </span>
                  </div>
                </div>
              </div>

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

              <div className="flex items-center justify-between" style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid #F6F6F6" }}>
                <div className="flex items-center" style={{ gap: "8px" }}>
                  <Image src="/icons/star.svg" alt="" width={20} height={20} />
                  <span style={{ fontSize: "14px", lineHeight: "20px", fontWeight: 500, color: "#807E7E" }}>
                    4.3
                  </span>
                </div>
                <span style={{ width: "1px", height: "20px", background: "#EDEDED" }} />
                <div className="flex items-center" style={{ gap: "8px" }}>
                  <Image src="/icons/buildings.svg" alt="" width={20} height={20} />
                  <span style={{ fontSize: "14px", lineHeight: "20px", fontWeight: 500, color: "#807E7E" }}>
                    8 listings
                  </span>
                </div>
                <span style={{ width: "1px", height: "20px", background: "#EDEDED" }} />
                <Link
                  href={`/agents/${property.agentInitials.toLowerCase()}`}
                  className="hover:opacity-80"
                  style={{ fontSize: "14px", lineHeight: "20px", fontWeight: 500, color: "#305E82" }}
                >
                  View all Properties
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED LISTINGS — Figma 218:25720: x:79 y:2028 w:1282 column gap 24
          Title 24/600 line-height 32 + subtitle, then row of 3 cards (411 each, gap 24) */}
      <section className="bg-white" style={{ paddingBottom: "80px" }}>
        <div className="mx-auto" style={{ width: "1282px", maxWidth: "calc(100% - 158px)" }}>
          <div className="flex flex-col" style={{ gap: "8px", marginBottom: "24px" }}>
            <h2 style={{ fontSize: "24px", lineHeight: "32px", fontWeight: 600, color: "#121212" }}>
              Related Listings
            </h2>
            <p style={{ fontSize: "14px", lineHeight: "24px", fontWeight: 400, color: "#807E7E" }}>
              See similar property listings that you might like
            </p>
          </div>
          <div className="grid" style={{ gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {mockProperties.filter((p) => p.id !== property.id).slice(0, 3).map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA — Figma 133:18774 ("newsletter"): 1440x512, card 1392x464 at x:24 y:24, r:20
          gradient 174deg #75A3C7 → #305E82 96% — same component as about/contact/legal */}
      <section className="bg-white" style={{ height: "512px", padding: "24px" }}>
        <div
          className="relative overflow-hidden mx-auto flex flex-col items-center justify-center text-center"
          style={{
            width: "1392px",
            maxWidth: "calc(100% - 48px)",
            height: "464px",
            borderRadius: "20px",
            background: "linear-gradient(174deg, rgba(117,163,199,1) 0%, rgba(48,94,130,1) 96%), #FFFFFF",
          }}
        >
          <div className="flex flex-col" style={{ width: "640px", maxWidth: "calc(100% - 96px)", gap: "40px" }}>
            <div className="flex flex-col" style={{ gap: "16px" }}>
              <h2
                className="text-white"
                style={{ fontSize: "48px", lineHeight: "64px", fontWeight: 600, textAlign: "center" }}
              >
                Ready to
                <br />
                List Your Property?
              </h2>
              <p
                className="text-white"
                style={{
                  fontSize: "18px",
                  lineHeight: "35px",
                  fontWeight: 400,
                  letterSpacing: "-0.02em",
                  textAlign: "center",
                }}
              >
                Join thousands of owners and agents on Nigeria&rsquo;s fastest-growing
                property platform. Get verified, list your property, and reach millions
                of seekers.
              </p>
            </div>
            <div className="flex items-center justify-center" style={{ gap: "16px" }}>
              <GetStartedFreeButton
                className="flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                style={{
                  height: "48px",
                  padding: "8px 24px",
                  fontSize: "14px",
                  fontWeight: 500,
                  background: "#FFAE00",
                  borderRadius: "12px",
                  border: "1px solid rgba(120,158,187,0.5)",
                  letterSpacing: "-0.02em",
                }}
              />
              <LogInButton
                className="flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                style={{
                  height: "48px",
                  padding: "16px 32px",
                  fontSize: "14px",
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

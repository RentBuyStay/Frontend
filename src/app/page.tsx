import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import PropertyCard from "@/components/PropertyCard";
import { mockProperties } from "@/lib/mockData";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, MessageCircle, Check } from "lucide-react";

// How RentBuyStay Works — 4 steps from Figma, with icon name + brand color (icon bg AND title color)
const steps = [
  {
    icon: "/icons/search-normal.svg",
    color: "#ff5a00",
    title: "Search & Filter",
    desc: "Use our powerful search to find properties by location, type, price, and more across Nigeria.",
  },
  {
    icon: "/icons/document-filter.svg",
    color: "#305e82",
    title: "Browse & Compare",
    desc: "View detailed property pages, photo galleries, floor plans, and neighbourhood maps.",
  },
  {
    icon: "/icons/call-calling.svg",
    color: "#ffae00",
    title: "Contact Agent",
    desc: "Reach out instantly via call or WhatsApp to verified agents and property owners.",
  },
  {
    icon: "/icons/like-shapes.svg",
    color: "#14ae5c",
    title: "Close the Deal",
    desc: "Schedule viewings, negotiate, and finalise your transaction securely through the platform.",
  },
];

const agents = [
  { name: "Ibrahim Fashola", avatar: "/images/agent-1.png", initials: "IF", agency: "Jaskaro Properties", location: "Lagos", rating: 5.0, listings: 9 },
  { name: "Pascaline Okonkwo", avatar: "/images/agent-2.png", initials: "PO", agency: "Prime Realty & Co.", location: "Abuja", rating: 4.9, listings: 24 },
  { name: "Chioma Idris", avatar: "", initials: "CI", agency: "Royal Realtors", location: "Port-Harcourt", rating: 4.7, listings: 27 },
  { name: "Olamide Adesokan", avatar: "/images/agent-4.png", initials: "OA", agency: "Nexus Property Hub", location: "Ogun", rating: 4.6, listings: 11 },
  { name: "Olaitan Badejo", avatar: "", initials: "OB", agency: "Prime Realty & Co.", location: "Lagos", rating: 4.6, listings: 13 },
  { name: "Lade Oyetola", avatar: "/images/agent-6.png", initials: "LO", agency: "Propex", location: "Lagos", rating: 4.3, listings: 8 },
];

const propertyTypes = [
  { label: "Residential Homes", desc: "Single family homes, condos, townhouses and luxury estates.", image: "/images/pt-residential.jpg", href: "/for-sale" },
  { label: "Commercial Spaces", desc: "Offices, retail spaces, warehouses, and mixed-use developments.", image: "/images/pt-commercial.jpg", href: "/for-sale?type=commercial" },
  { label: "Rental Properties", desc: "Short-term stays, long-term rentals, and corporate housing solutions.", image: "/images/pt-rental.jpg", href: "/for-rent" },
  { label: "Land & Lots", desc: "Residential lots, commercial land, and investment opportunities.", image: "/images/pt-land.jpg", href: "/for-sale?type=land" },
];

const locations = [
  { name: "Lagos", count: "1206 Properties Listed", image: "/images/city-lagos.png", href: "/search?location=lagos" },
  { name: "Ibadan", count: "830 Properties Listed", image: "/images/city-ibadan.png", href: "/search?location=ibadan" },
  { name: "Abuja", count: "718 Properties Listed", image: "/images/city-abuja.png", href: "/search?location=abuja" },
  { name: "Ogun", count: "472 Properties Listed", image: "/images/city-ogun.png", href: "/search?location=ogun" },
  { name: "Port-Harcourt", count: "718 Properties Listed", image: "/images/city-ph.png", href: "/search?location=port-harcourt" },
];

type LocationItem = (typeof locations)[number];

function LocationCard({ loc }: { loc: LocationItem }) {
  return (
    <Link href={loc.href} className="group relative h-[450px] rounded-[20px] overflow-hidden block bg-[#f4f4f4]">
      {/* Image fills the card */}
      <Image src={loc.image} alt={loc.name} fill className="object-cover group-hover:scale-[1.03] transition-transform duration-500" />
      {/* Gradient overlay — black to transparent */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      {/* Text + button bottom-left, with 32px padding */}
      <div className="absolute bottom-0 left-0 p-8 flex flex-col gap-4">
        {/* Title + subtitle */}
        <div className="flex flex-col gap-2">
          <p className="text-white" style={{ fontSize: "32px", lineHeight: "40px", fontWeight: 500, letterSpacing: "-0.02em" }}>
            {loc.name}
          </p>
          <p className="text-white" style={{ fontSize: "18px", lineHeight: "32px", fontWeight: 400 }}>
            {loc.count}
          </p>
        </div>
        {/* View Properties — Figma: NO background/border, padding 10px top/bottom 0 sides, gap 16px */}
        <div
          className="inline-flex items-center text-white"
          style={{
            paddingTop: "10px",
            paddingBottom: "10px",
            gap: "16px",
            fontSize: "16px",
            fontWeight: 500,
            fontFamily: "Geist, sans-serif",
          }}
        >
          View Properties
          <ArrowRight size={16} strokeWidth={2} />
        </div>
      </div>
    </Link>
  );
}

const faqs = [
  "What is RentBuyStay?",
  "How do I search for a property?",
  "Do I need to pay a subscription fee to find a house?",
  "How do I track my inquiries?",
  "How do I contact an agent or owner?",
  "How do I upload my property?",
  "Why is my account in “Restricted Mode”?",
  "What is the difference between an Agent and an Agency account?",
  "How is the platform moderated?",
];

const stats = [
  { value: "10K+", label: "Active Listings" },
  { value: "2K+", label: "Verified Agents" },
  { value: "36", label: "States Covered" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* ── HERO — Figma: rounded card 1392x934, 24px margin all sides, bg #F3FEFE, border-radius 25px ── */}
      <section className="bg-white p-6">
        <div className="relative rounded-[25px] overflow-hidden bg-[#F3FEFE] h-[934px]">

          {/* Background image — bleeds top/bottom (Figma position y=-21, height 976) */}
          <div className="absolute inset-x-0 -top-[21px] h-[976px] z-0">
            <Image
              src="/images/hero-bg.png"
              alt="Luxury living room"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Black gradient overlay — Figma exact gradient */}
          <div
            className="absolute inset-x-0 -top-[42px] h-[976px] z-[1]"
            style={{
              background:
                "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.96) 7%, rgba(0,0,0,0.94) 12%, rgba(0,0,0,0.91) 17%, rgba(0,0,0,0.84) 31%, rgba(0,0,0,0.5) 66%, rgba(102,102,102,0) 96%)",
            }}
          />
          {/* Additional flat 20% black overlay (from Figma fill_ORB2S1) */}
          <div className="absolute inset-0 bg-black/20 z-[1]" />

          {/* Navbar — inside the card, top: 24, sides: 24 */}
          <Navbar transparent />

          {/* Heading + subtitle — Figma: top 235, center horizontal, width 641 */}
          <div className="absolute top-[235px] left-1/2 -translate-x-1/2 w-[641px] max-w-[calc(100%-48px)] flex flex-col gap-4 z-10 text-center">
            <h1
              className="text-white font-semibold"
              style={{
                fontSize: "64px",
                lineHeight: "80px",
                letterSpacing: "-0.02em",
              }}
            >
              Find Your Perfect Home in Nigeria
            </h1>
            <p
              className="text-white"
              style={{
                fontSize: "18px",
                lineHeight: "32px",
                letterSpacing: "-0.02em",
                fontWeight: 400,
              }}
            >
              Rent, buy, or book short stays across Nigeria&apos;s top locations with verified agents
              and listings. Discover thousands of verified properties to rent, buy, or book for
              short stays — from Abuja to Lagos and beyond.
            </p>
          </div>

          {/* Stats row — Figma: top 526, center horizontal, gap 16px */}
          <div className="absolute top-[526px] left-1/2 -translate-x-1/2 z-10 flex items-center gap-4 text-white">
            {stats.map((s, i) => (
              <div key={s.label} className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Check size={20} className="text-[#ffae00]" strokeWidth={3} />
                  <span style={{ fontSize: "16px", fontWeight: 600, lineHeight: "150%", letterSpacing: "-0.01em" }}>
                    {s.value}
                  </span>
                  <span style={{ fontSize: "14px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em" }}>
                    {s.label}
                  </span>
                </div>
                {i < stats.length - 1 && <span className="text-white/60 text-base">•</span>}
              </div>
            ))}
          </div>

          {/* Search bar — Figma: top 722, sides 24, full inner width */}
          <div className="absolute top-[722px] left-6 right-6 z-10">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* ── FEATURED PROPERTIES — Figma: bg white, 80px padding, header at y=80, cards at y=224 ── */}
      <section className="bg-white">
        <div className="max-w-[1440px] mx-auto px-[80px] pt-[80px] pb-[80px]">
          {/* Header — Figma: width 1280, row space-between */}
          <div className="flex items-end justify-between mb-[64px]">
            <div className="flex flex-col gap-1">
              <h2
                className="text-[#121212] font-semibold"
                style={{ fontSize: "32px", lineHeight: "40px", letterSpacing: "-0.02em" }}
              >
                Featured Properties
              </h2>
              <p
                className="text-[#7f7e7e]"
                style={{ fontSize: "14px", lineHeight: "150%", letterSpacing: "-0.01em" }}
              >
                Premium and handpicked listings from verified agents.
              </p>
            </div>
            <Link
              href="/search"
              className="flex items-center gap-2 text-[14px] text-[#121212] hover:text-[#305e82] transition-colors whitespace-nowrap font-medium"
              style={{ letterSpacing: "-0.02em" }}
            >
              View All
              <ArrowRight size={18} strokeWidth={1.5} />
            </Link>
          </div>

          {/* Cards — Figma: row gap 24px, 3 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProperties.slice(0, 3).map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW RENTBUYSTAY WORKS — Figma: section 904h, bg white, header at y=80, content at y=224 (737x600 + 519x600 side by side) ── */}
      <section className="bg-white">
        <div className="max-w-[1440px] mx-auto px-[80px] pt-[80px] pb-[80px]">

          {/* Header — Figma: width 628, centered, column gap 8 */}
          <div className="max-w-[628px] mx-auto mb-[64px] flex flex-col items-center gap-2 text-center">
            <h2
              className="text-[#121212] font-semibold"
              style={{ fontSize: "32px", lineHeight: "40px", letterSpacing: "-0.02em" }}
            >
              How RentBuyStay Works
            </h2>
            <p
              className="text-[#7f7e7e]"
              style={{ fontSize: "14px", lineHeight: "150%", letterSpacing: "-0.01em" }}
            >
              Find and secure your ideal property in four easy steps
            </p>
          </div>

          {/* Two side-by-side panels — Figma ratio 737:519, gap 24, both grow with content */}
          <div className="grid grid-cols-1 lg:grid-cols-[737fr_519fr] gap-6 items-stretch">

            {/* Left: image panel — 737x600, rounded-25 — Figma rendered with full room background */}
            <div className="relative rounded-[25px] overflow-hidden bg-[#D8D8D8] min-h-[600px]">
              <Image
                src="/images/hiw-panel.png"
                alt="Happy customer using RentBuyStay"
                fill
                className="object-cover"
              />
            </div>

            {/* Right: 4 step cards container — Figma: 519w, bg #f6f6f6, rounded-20, gap 16px between cards */}
            <div className="bg-[#f6f6f6] rounded-[20px] p-6 flex flex-col gap-4 justify-center">
              {steps.map((step) => (
                <div
                  key={step.title}
                  className="bg-white rounded-[20px] flex items-start gap-4"
                  style={{ padding: "24px" }}
                >
                  {/* 48x48 colored icon — Figma: fully rounded (cornerRadius 33554400) */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: step.color }}
                  >
                    <Image src={step.icon} alt="" width={24} height={24} />
                  </div>
                  <div className="flex flex-col gap-2 min-w-0 flex-1">
                    {/* Title — Figma: Geist SemiBold 16px, line-height 24px, color matches icon bg */}
                    <p
                      style={{
                        fontSize: "16px",
                        lineHeight: "24px",
                        fontWeight: 600,
                        color: step.color,
                      }}
                    >
                      {step.title}
                    </p>
                    {/* Description — Figma: Geist Regular 14px, line-height 24px, color #121212 */}
                    <p
                      style={{
                        fontSize: "14px",
                        lineHeight: "24px",
                        fontWeight: 400,
                        color: "#121212",
                      }}
                    >
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TOP VERIFIED AGENTS — Figma: section 1440x928, bg white, header 1280x136, cards 1280x592 (3 cols x 2 rows) ── */}
      <section className="bg-white">
        <div className="max-w-[1440px] mx-auto px-[80px] pt-[80px] pb-[80px]">

          {/* Header — Figma: row space-between, heading 40px Geist SemiBold lh:64, subtitle 18px lh:32 */}
          <div className="flex items-end justify-between mb-[64px]">
            <div className="max-w-[628px] flex flex-col gap-1">
              <h2 style={{ fontSize: "40px", lineHeight: "64px", fontWeight: 600, color: "#121212", letterSpacing: "-0.02em" }}>
                Top Verified Agents
              </h2>
              <p style={{ fontSize: "18px", lineHeight: "32px", fontWeight: 400, color: "#2e2e2e" }}>
                Connect with our network of trusted and verified real estate professionals across Nigeria.
              </p>
            </div>
            <Link
              href="/agents"
              className="flex items-center gap-2 text-[#121212] hover:text-[#305e82] transition-colors whitespace-nowrap"
              style={{ fontSize: "14px", fontWeight: 500 }}
            >
              View All
              <Image src="/icons/arrow-right.svg" alt="" width={24} height={24} />
            </Link>
          </div>

          {/* Cards — 3 per row, gap 24 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <div
                key={agent.name}
                className="bg-white rounded-[20px] p-6 flex flex-col gap-5"
                style={{ border: "1px solid #f6f6f6" }}
              >
                {/* 1. Avatar + Name/Agency/Location */}
                <div className="flex items-center gap-4">
                  {/* Avatar 64x64 */}
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-[#f3fefe] border border-[#ededed] flex items-center justify-center shrink-0">
                    {agent.avatar ? (
                      <Image src={agent.avatar} alt={agent.name} width={64} height={64} className="object-cover w-full h-full" />
                    ) : (
                      <span className="text-[#305e82] font-semibold" style={{ fontSize: "18px" }}>
                        {agent.initials}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col gap-1">
                    {/* Name + verify */}
                    <div className="flex items-center gap-2">
                      <p style={{ fontSize: "18px", lineHeight: "24px", fontWeight: 600, color: "#121212" }} className="truncate">
                        {agent.name}
                      </p>
                      <Image src="/icons/verify.svg" alt="" width={20} height={20} className="shrink-0" />
                    </div>
                    {/* Agency */}
                    <p style={{ fontSize: "12px", color: "#807e7e" }} className="truncate">
                      {agent.agency}
                    </p>
                    {/* Location with bigger pin */}
                    <div className="flex items-center gap-2 mt-1">
                      <Image src="/icons/location.svg" alt="" width={20} height={20} />
                      <span style={{ fontSize: "14px", color: "#305e82" }}>{agent.location}</span>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-[#f6f6f6]" />

                {/* 2. Rating + Listings (LEFT) | View all Properties (RIGHT) — same row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3" style={{ fontSize: "14px", color: "#807e7e" }}>
                    <div className="flex items-center gap-1.5">
                      <Image src="/icons/star.svg" alt="" width={20} height={20} />
                      <span>{agent.rating.toFixed(1)}</span>
                    </div>
                    <div className="w-px h-4 bg-[#807e7e]/40" />
                    <div className="flex items-center gap-1.5">
                      <Image src="/icons/buildings.svg" alt="" width={20} height={20} />
                      <span>{agent.listings} listings</span>
                    </div>
                  </div>
                  <Link
                    href="/agents"
                    className="hover:underline"
                    style={{ fontSize: "14px", fontWeight: 500, color: "#305e82" }}
                  >
                    View all Properties
                  </Link>
                </div>

                {/* Divider */}
                <div className="h-px bg-[#f6f6f6]" />

                {/* 3. Call + Message buttons */}
                <div className="flex gap-4">
                  <button
                    className="flex-1 flex items-center justify-center gap-2 rounded-[12px] hover:bg-[#f6f6f6] transition-colors"
                    style={{ height: "48px", padding: "8px 24px", border: "1px solid #ededed", color: "#121212", fontSize: "14px", fontWeight: 500 }}
                  >
                    <Phone size={18} strokeWidth={1.5} /> Call
                  </button>
                  <button
                    className="flex-1 flex items-center justify-center gap-2 rounded-[12px] text-white hover:opacity-90 transition-opacity"
                    style={{
                      height: "48px",
                      padding: "8px 24px",
                      fontSize: "14px",
                      fontWeight: 500,
                      background: "linear-gradient(175deg, rgba(117,163,199,1) 0%, rgba(48,94,130,1) 100%)",
                    }}
                  >
                    <MessageCircle size={18} strokeWidth={1.5} /> Message
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVERY PROPERTY TYPE — Figma: section 1128h, bg white, header at y=80 (centered, w=628), cards at y=256, 120px sides ── */}
      <section className="bg-white">
        <div className="max-w-[1440px] mx-auto px-[120px] pt-[80px] pb-[80px]">

          {/* Header — centered, w=628 */}
          <div className="max-w-[628px] mx-auto mb-[64px] flex flex-col items-center gap-2 text-center">
            <h2
              className="text-[#121212] font-semibold"
              style={{ fontSize: "32px", lineHeight: "40px", letterSpacing: "-0.02em" }}
            >
              Every Property Type, Every Need
            </h2>
            <p
              className="text-[#7f7e7e]"
              style={{ fontSize: "14px", lineHeight: "150%", letterSpacing: "-0.01em" }}
            >
              Discover homes tailored to your lifestyle, from cozy apartments to luxury estates.
            </p>
          </div>

          {/* 2x2 grid — image top, text below on white */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {propertyTypes.map((type) => (
              <div key={type.label} className="group flex flex-col gap-4">
                {/* Image */}
                <div className="relative h-[200px] rounded-[16px] overflow-hidden bg-[#d7d7d7]">
                  <Image
                    src={type.image}
                    alt={type.label}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Text below image */}
                <div className="flex flex-col gap-1">
                  <p
                    className="text-[#121212] font-semibold"
                    style={{ fontSize: "18px", letterSpacing: "-0.01em" }}
                  >
                    {type.label}
                  </p>
                  <p
                    className="text-[#7f7e7e]"
                    style={{ fontSize: "13px", lineHeight: "150%" }}
                  >
                    {type.desc}
                  </p>
                  <Link
                    href={type.href}
                    className="text-[#305e82] hover:underline flex items-center gap-1 mt-2 font-medium group-hover:gap-2 transition-all"
                    style={{ fontSize: "13px" }}
                  >
                    Get Started Free <ArrowRight size={13} strokeWidth={1.5} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── READY TO LIST CTA — Figma: section 512h white, inner card 1392x464 with gradient bg, rounded-20, 24px page padding ── */}
      <section className="bg-white">
        <div className="max-w-[1440px] mx-auto px-6 py-6">
          <div
            className="rounded-[20px] h-[464px] flex flex-col items-center justify-center text-white text-center px-6"
            style={{
              background: "linear-gradient(174deg, rgba(117,163,199,1) 0%, rgba(48,94,130,1) 96%), #305E82",
            }}
          >
            <h2
              className="font-semibold mb-4 max-w-[500px]"
              style={{ fontSize: "48px", lineHeight: "60px", letterSpacing: "-0.02em" }}
            >
              Ready to<br />List Your Property?
            </h2>
            <p
              className="mb-8 max-w-[600px] text-white/85"
              style={{ fontSize: "16px", lineHeight: "150%", letterSpacing: "-0.01em" }}
            >
              Join thousands of owners and agents on Nigeria&apos;s fastest-growing property
              platform. Get verified, list your property, and reach millions of seekers.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/post-property"
                className="bg-[#ff9c00] text-white font-semibold px-7 py-3 rounded-[12px] hover:bg-[#e08800] transition-colors"
                style={{ fontSize: "14px" }}
              >
                Get Started Free
              </Link>
              <Link
                href="/login"
                className="text-white hover:underline"
                style={{ fontSize: "14px" }}
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── BROWSE BY LOCATION — Figma: section 1702h, white bg, header at y=80 (centered, w=628), grid at y=224, 1280 wide ── */}
      <section className="bg-white">
        <div className="max-w-[1440px] mx-auto px-[80px] pt-[80px] pb-[80px]">

          {/* Header centered */}
          <div className="max-w-[628px] mx-auto mb-[64px] flex flex-col items-center gap-2 text-center">
            <h2
              className="text-[#121212] font-semibold"
              style={{ fontSize: "32px", lineHeight: "40px", letterSpacing: "-0.02em" }}
            >
              Browse By Location
            </h2>
            <p
              className="text-[#7f7e7e]"
              style={{ fontSize: "14px", lineHeight: "150%", letterSpacing: "-0.01em" }}
            >
              Find properties in Nigeria&apos;s most popular cities.
            </p>
          </div>

          {/* Figma layout (verified via API):
              Row 1: Lagos full width 1280
              Row 2: Ibadan 845 (2/3) + Abuja 411 (1/3)  — asymmetric
              Row 3: Ogun 628 + Port-Harcourt 628        — equal 50/50 */}
          <div className="flex flex-col gap-6">
            {/* Lagos — full width */}
            <LocationCard loc={locations[0]} />

            {/* Row 2: Ibadan 2/3 + Abuja 1/3 */}
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2"><LocationCard loc={locations[1]} /></div>
              <div className="col-span-1"><LocationCard loc={locations[2]} /></div>
            </div>

            {/* Row 3: Ogun + PH equal 50/50 */}
            <div className="grid grid-cols-2 gap-6">
              <LocationCard loc={locations[3]} />
              <LocationCard loc={locations[4]} />
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ — Figma: 1440x1248 white bg, header 628x168 centered, list 846 wide centered, items 846x72 with gap 24, rounded-12, bg #f6f6f6 ── */}
      <section className="bg-white">
        <div className="max-w-[1440px] mx-auto px-[80px] pt-[80px] pb-[80px]">

          {/* Header — centered, 628 wide */}
          <div className="max-w-[628px] mx-auto mb-[64px] flex flex-col items-center gap-2 text-center">
            <h2 style={{ fontSize: "40px", lineHeight: "64px", fontWeight: 600, color: "#121212", letterSpacing: "-0.02em" }}>
              Frequently Asked Questions
            </h2>
            <p style={{ fontSize: "18px", lineHeight: "32px", fontWeight: 400, color: "#2e2e2e" }}>
              We&rsquo;re dedicated to revolutionizing the way property and people connect. Our platform is built on ease of access and trust to streamline the buying, selling, and leasing process for everyone.
            </p>
          </div>

          {/* FAQ list — 846 wide centered, gap 24 between items */}
          <div className="max-w-[846px] mx-auto flex flex-col gap-6">
            {faqs.map((q, i) => (
              <details key={i} className="group bg-[#f6f6f6] rounded-[12px] overflow-hidden">
                <summary
                  className="flex items-center justify-between cursor-pointer list-none px-6"
                  style={{ height: "72px" }}
                >
                  <span style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 600, color: "#121212" }}>
                    {q}
                  </span>
                  {/* Plus when closed, Minus when open */}
                  <span className="shrink-0 ml-4 w-6 h-6 flex items-center justify-center text-[#121212]">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      {/* Horizontal line — always visible */}
                      <line x1="0" y1="7" x2="14" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      {/* Vertical line — hidden when open */}
                      <line
                        x1="7" y1="0" x2="7" y2="14"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        className="group-open:opacity-0 transition-opacity"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 pt-0">
                  <p style={{ fontSize: "14px", lineHeight: "24px", color: "#2e2e2e" }}>
                    Our support team is happy to help. Contact us at help@rentbuystay.com or use the live chat below for assistance.
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

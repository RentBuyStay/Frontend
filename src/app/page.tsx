import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import PropertyCard from "@/components/PropertyCard";
import { mockProperties } from "@/lib/mockData";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";

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
  { label: "Residential Homes", desc: "Single-family houses, condos, townhouses, and luxury estates.", image: "/images/pt-residential.png", href: "/for-sale" },
  { label: "Commercial Spaces", desc: "Offices, retail spaces, warehouses, and mixed-use developments.", image: "/images/pt-commercial.png", href: "/for-sale?type=commercial" },
  { label: "Rental Properties", desc: "Short-term stays, long-term rentals, and corporate housing solutions.", image: "/images/pt-rental.png", href: "/for-rent" },
  { label: "Land & Lots", desc: "Residential lots, commercial land, and investment opportunities.", image: "/images/pt-land.png", href: "/for-sale?type=land" },
];

const locations = [
  { name: "Lagos", count: "1206 Properties Listed", image: "/images/city-lagos.png", href: "/search?location=lagos" },
  { name: "Ibadan", count: "830 Properties Listed", image: "/images/city-ibadan.png", href: "/search?location=ibadan" },
  { name: "Abuja", count: "718 Properties Listed", image: "/images/city-abuja.png", href: "/search?location=abuja" },
  { name: "Ogun", count: "472 Properties Listed", image: "/images/city-ogun.png", href: "/search?location=ogun" },
  { name: "Port-Harcourt", count: "718 Properties Listed", image: "/images/city-ph.png", href: "/search?location=port-harcourt" },
];

// Mobile hero stat — Figma: check icon + "{value} {label}" at 12px (value SemiBold)
function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <span className="flex items-center gap-2 whitespace-nowrap">
      <Check size={20} className="text-[#ffae00] shrink-0" strokeWidth={3} />
      <span style={{ fontSize: "12px", lineHeight: "150%", letterSpacing: "-0.01em" }}>
        <span style={{ fontWeight: 600 }}>{value}</span> {label}
      </span>
    </span>
  );
}

type LocationItem = (typeof locations)[number];

function LocationCard({ loc }: { loc: LocationItem }) {
  return (
    <Link href={loc.href} className="group relative h-[300px] md:h-[450px] rounded-[20px] overflow-hidden block bg-[#f4f4f4] border border-[#f8f8f8]">
      {/* Image fills the card */}
      <Image src={loc.image} alt={loc.name} fill className="object-cover group-hover:scale-[1.03] transition-transform duration-500" />
      {/* Gradient overlay — black to transparent */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      {/* Text + button bottom-left — Figma mobile: 16px pad, gap 16, name 20 Medium,
           count 12 @0.8, View Properties 14 Medium; desktop scales up */}
      <div className="absolute bottom-0 left-0 p-4 md:p-8 flex flex-col gap-4">
        {/* Title + count */}
        <div className="flex flex-col gap-2">
          <p className="text-white" style={{ fontSize: "clamp(20px, 4vw, 32px)", lineHeight: "1.3", fontWeight: 500, letterSpacing: "-0.02em" }}>
            {loc.name}
          </p>
          <p className="text-white/80 md:text-white text-[12px] leading-normal md:text-[18px] md:leading-[32px]" style={{ fontWeight: 400 }}>
            {loc.count}
          </p>
        </div>
        {/* View Properties — Figma: no bg/border, gap 8, arrow 16 (white) */}
        <div
          className="inline-flex items-center text-white text-[14px] md:text-[16px] gap-2 md:gap-4"
          style={{ paddingTop: "8px", paddingBottom: "8px", fontWeight: 500 }}
        >
          View Properties
          <Image src="/icons/arrow-right-white.svg" alt="" width={16} height={16} />
        </div>
      </div>
    </Link>
  );
}

const faqs = [
  {
    q: "What is RentBuyStay?",
    a: "It is a digital real estate marketplace in Nigeria designed to connect property seekers, owners, agents, and agencies for renting, buying, or booking short stays.",
  },
  {
    q: "How do I search for a property?",
    a: "Use the search bar on the homepage to filter by location, property type, price range and more. You can browse listings for sale, rent or shortlet without creating an account.",
  },
  {
    q: "Do I need to pay a subscription fee to find a house?",
    a: "No. Searching and browsing listings is completely free. Subscriptions only apply to agents and owners who want to list and promote their properties.",
  },
  {
    q: "How do I track my inquiries?",
    a: "Once you log in, your dashboard keeps a record of every property you’ve contacted or saved, so you can follow up on all your inquiries in one place.",
  },
  {
    q: "How do I contact an agent or owner?",
    a: "Open any listing and use the Call or Message button to reach the verified agent or owner directly.",
  },
  {
    q: "How do I upload my property?",
    a: "Click “Post Property”, create or log into your account and complete verification, then add your property details, photos and pricing. Listings are reviewed before going live.",
  },
  {
    q: "Why is my account in “Restricted Mode”?",
    a: "New accounts stay in Restricted Mode until identity (KYC) verification is complete. Once verified, full access — including listing and messaging — is unlocked.",
  },
  {
    q: "What is the difference between an Agent and an Agency account?",
    a: "An Agent account is for an individual real estate professional, while an Agency account represents a registered company that can manage multiple agents and listings under one profile.",
  },
  {
    q: "How is the platform moderated?",
    a: "Our team reviews listings and verifies agents and agencies. Suspicious activity and reported listings are investigated, and accounts that violate our policies can be restricted or suspended.",
  },
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
      <section className="bg-white">
        <div className="max-w-[1440px] mx-auto px-4 py-4 md:px-6 md:py-6">
        <div className="relative rounded-[20px] md:rounded-[25px] overflow-hidden bg-[#F3FEFE] h-[600px] md:h-[934px]">

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

          {/* ===== DESKTOP hero content (Figma desktop frame) ===== */}
          <div className="hidden md:block">
            {/* Heading + subtitle — Figma: top 235, center, width 641 */}
            <div className="absolute top-[235px] left-1/2 -translate-x-1/2 w-[641px] max-w-[calc(100%-48px)] flex flex-col gap-4 z-10 text-center">
              <h1 className="text-white font-semibold" style={{ fontSize: "64px", lineHeight: "80px", letterSpacing: "-0.02em" }}>
                Find Your Perfect Home in Nigeria
              </h1>
              <p className="text-white" style={{ fontSize: "18px", lineHeight: "32px", letterSpacing: "-0.02em", fontWeight: 400 }}>
                Rent, buy, or book short stays across Nigeria&apos;s top locations with verified agents
                and listings. Discover thousands of verified properties to rent, buy, or book for
                short stays — from Abuja to Lagos and beyond.
              </p>
            </div>

            {/* Stats row — Figma: top 526 */}
            <div className="absolute top-[526px] left-1/2 -translate-x-1/2 z-10 flex items-center gap-4 text-white">
              {stats.map((s, i) => (
                <div key={s.label} className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Check size={20} className="text-[#ffae00]" strokeWidth={3} />
                    <span style={{ fontSize: "16px", fontWeight: 600, lineHeight: "150%", letterSpacing: "-0.01em" }}>{s.value}</span>
                    <span style={{ fontSize: "14px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em" }}>{s.label}</span>
                  </div>
                  {i < stats.length - 1 && <span className="text-white/60 text-base">•</span>}
                </div>
              ))}
            </div>

            {/* Search bar — Figma y722 */}
            <div className="absolute top-[722px] left-6 right-6 z-10">
              <SearchBar />
            </div>
          </div>

          {/* ===== MOBILE hero content (Figma 312:9806) ===== */}
          <div className="md:hidden absolute inset-0 z-10 flex flex-col px-4 pb-4 pt-[100px]">
            <div className="flex-1 flex flex-col items-center justify-center gap-8 text-center">
              {/* Title — 32/48 SemiBold, 2-line break */}
              <div className="flex flex-col items-center gap-2">
                <h1 className="text-white" style={{ fontSize: "32px", lineHeight: "48px", fontWeight: 600, letterSpacing: "-0.02em" }}>
                  Find Your Perfect<br />Home in Nigeria
                </h1>
                <p className="text-white" style={{ fontSize: "14px", lineHeight: "24px", fontWeight: 400, letterSpacing: "-0.02em" }}>
                  Rent, buy, or book short stays across Nigeria&apos;s top locations with verified agents
                  and listings. Discover thousands of verified properties to rent, buy, or book for
                  short stays — from Abuja to Lagos and beyond.
                </p>
              </div>
              {/* Stats — 12px, icon 24, wraps to 2 rows */}
              <div className="flex flex-col items-center gap-2 text-white">
                <div className="flex items-center gap-2">
                  <HeroStat value="10K+" label="Active Listings" />
                  <span className="text-white/60">•</span>
                  <HeroStat value="2K+" label="Verified Agents" />
                </div>
                <HeroStat value="36" label="States Covered" />
              </div>
            </div>

            {/* Search — 2-row white card (Rent dropdown + input / filter + Search) */}
            <div className="bg-white rounded-[15px] p-2 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-between bg-[#F6F6F6] rounded-[12px] w-[93px] h-12 px-4 shrink-0">
                  <span style={{ fontSize: "12px", color: "#121212" }}>Rent</span>
                  <Image src="/icons/hero-arrow-down.svg" alt="" width={16} height={16} />
                </div>
                <div className="flex items-center gap-2 flex-1 min-w-0 bg-[#F6F6F6] rounded-[12px] h-12 px-4">
                  <Image src="/icons/hero-search.svg" alt="" width={16} height={16} className="shrink-0" />
                  <input
                    placeholder="Enter location, area or keyword..."
                    className="flex-1 min-w-0 bg-transparent outline-none placeholder:text-[#807e7ebf]"
                    style={{ fontSize: "10px", color: "#121212" }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button aria-label="Filters" className="flex items-center justify-center bg-[#F6F6F6] rounded-[12px] w-12 h-12 shrink-0">
                  <Image src="/icons/hero-setting-5.svg" alt="" width={16} height={16} />
                </button>
                <button
                  className="flex-1 h-12 rounded-[12px] text-white text-[14px] font-medium"
                  style={{ background: "linear-gradient(175deg, rgba(117,163,199,1) 0%, rgba(48,94,130,1) 100%)", border: "1px solid rgba(120,158,187,0.5)" }}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* ── FEATURED PROPERTIES — Figma: bg white, 80px padding, header at y=80, cards at y=224 ── */}
      <section className="bg-white">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[80px] pt-12 md:pt-[80px] pb-12 md:pb-[80px]">
          {/* Header — Figma: width 1280, row space-between */}
          <div className="mb-10 md:mb-[64px]">
            <div className="flex items-start justify-between gap-3">
              <h2
                className="text-[#121212] font-semibold min-w-0"
                style={{ fontSize: "clamp(20px, 4.5vw, 40px)", lineHeight: "1.6", letterSpacing: "-0.02em" }}
              >
                Featured Properties
              </h2>
              <Link
                href="/search"
                className="flex items-center gap-2 shrink-0 text-[14px] text-[#121212] hover:text-[#305e82] transition-colors whitespace-nowrap font-medium"
                style={{ letterSpacing: "-0.02em" }}
              >
                <span>View All</span>
                <Image src="/icons/arrow-right.svg" alt="" width={24} height={24} className="w-4 h-4 md:w-6 md:h-6 shrink-0" />
              </Link>
            </div>
            <p
              className="mt-2 max-w-full md:max-w-[628px] text-[14px] leading-[24px] text-[#807e7e] md:text-[16px] md:leading-[32px]"
              style={{ letterSpacing: "-0.02em" }}
            >
              Premium and handpicked listings from verified agents.
            </p>
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
        <div className="max-w-[1440px] mx-auto px-4 md:px-[80px] pt-12 md:pt-[80px] pb-12 md:pb-[80px]">

          {/* Header — Figma: width 628, centered, column gap 8 */}
          <div className="max-w-[628px] mx-auto mb-10 md:mb-[64px] flex flex-col items-center gap-2 text-center">
            <h2
              className="text-[#121212] font-semibold"
              style={{ fontSize: "clamp(20px, 4.5vw, 40px)", lineHeight: "1.6", letterSpacing: "-0.02em" }}
            >
              How RentBuyStay Works
            </h2>
            <p
              className="text-[14px] leading-[24px] text-[#807e7e] md:text-[16px] md:leading-[32px]"
              style={{ letterSpacing: "-0.02em" }}
            >
              Find and secure your ideal property in four easy steps.
            </p>
          </div>

          {/* Two side-by-side panels — Figma ratio 737:519, gap 24, both grow with content */}
          <div className="grid grid-cols-1 lg:grid-cols-[737fr_519fr] gap-6 items-stretch">

            {/* Left: image panel — 737x600, rounded-25 — Figma rendered with full room background */}
            <div className="relative rounded-[25px] overflow-hidden bg-[#D8D8D8] min-h-[450px] md:min-h-[600px]">
              <Image
                src="/images/hiw-panel.png"
                alt="Happy customer using RentBuyStay"
                fill
                className="object-cover"
              />
            </div>

            {/* Right: 4 step cards — fixed-height panel that clips; cards auto-scroll
                 vertically to reveal all four (Figma "how RBS works" animation) */}
            <div className="hiw-panel relative bg-[#f6f6f6] rounded-[20px] h-[450px] md:h-[600px] overflow-hidden">
              <div className="hiw-track absolute inset-x-0 top-0 flex flex-col items-stretch md:items-center gap-4 p-4 md:p-6 [--hiw-h:450px] md:[--hiw-h:600px]">
                {steps.map((step) => (
                <div
                  key={step.title}
                  className="bg-white rounded-[20px] border border-[#f4f4f4] flex items-start gap-4 w-full md:w-[384px]"
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
        </div>
      </section>

      {/* ── TOP VERIFIED AGENTS — Figma: section 1440x928, bg white, header 1280x136, cards 1280x592 (3 cols x 2 rows) ── */}
      <section className="bg-white">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[80px] pt-12 md:pt-[80px] pb-12 md:pb-[80px]">

          {/* Header — Figma: row space-between, heading 40px Geist SemiBold lh:64, subtitle 18px lh:32 */}
          <div className="mb-10 md:mb-[64px]">
            <div className="flex items-start justify-between gap-3">
              <h2 className="min-w-0" style={{ fontSize: "clamp(20px, 4.5vw, 40px)", lineHeight: "1.6", fontWeight: 600, color: "#121212", letterSpacing: "-0.02em" }}>
                Top Verified Agents
              </h2>
              <Link
                href="/agents"
                className="flex items-center gap-2 shrink-0 text-[#121212] hover:text-[#305e82] transition-colors whitespace-nowrap"
                style={{ fontSize: "14px", fontWeight: 500 }}
              >
                <span>View All</span>
                <Image src="/icons/arrow-right.svg" alt="" width={24} height={24} className="w-4 h-4 md:w-6 md:h-6 shrink-0" />
              </Link>
            </div>
            <p className="mt-2 max-w-full md:max-w-[628px] text-[14px] leading-[24px] text-[#807e7e] md:text-[16px] md:leading-[32px]" style={{ fontWeight: 400, letterSpacing: "-0.02em" }}>
              Connect with our network of trusted and verified real estate professionals across Nigeria.
            </p>
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
                <div className="h-px bg-[#f6f6f6] -mx-6" />

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
                <div className="h-px bg-[#f6f6f6] -mx-6" />

                {/* 3. Call + Message buttons */}
                <div className="flex gap-4">
                  <button
                    className="flex-1 flex items-center justify-center gap-2 rounded-[12px] hover:bg-[#f6f6f6] transition-colors"
                    style={{ height: "48px", padding: "8px 24px", border: "1px solid #ededed", color: "#121212", fontSize: "14px", fontWeight: 500 }}
                  >
                    <Image src="/icons/call.svg" alt="" width={20} height={20} /> Call
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
                    <Image src="/icons/messages-2.svg" alt="" width={20} height={20} /> Message
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVERY PROPERTY TYPE — Figma: section 1128h, bg white, header at y=80 (centered, w=628), cards at y=256, 120px sides ── */}
      <section className="bg-white">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[120px] pt-12 md:pt-[80px] pb-12 md:pb-[80px]">

          {/* Header — centered, w=628 */}
          <div className="max-w-[628px] mx-auto mb-10 md:mb-[64px] flex flex-col items-center gap-2 text-center">
            <h2
              className="text-[#121212] font-semibold"
              style={{ fontSize: "clamp(20px, 4.5vw, 40px)", lineHeight: "1.6", letterSpacing: "-0.02em" }}
            >
              Every Property Type, Every Need
            </h2>
            <p
              className="text-[14px] leading-[24px] text-[#807e7e] md:text-[16px] md:leading-[32px]"
              style={{ letterSpacing: "-0.02em" }}
            >
              Discover homes tailored to your lifestyle, from cozy apartments to luxury estates.
            </p>
          </div>

          {/* Cards — Figma: bordered card (#f8f8f8), image flush top, title + desc,
               full-width divider, then Get Started link. 1 col mobile / 2 col desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {propertyTypes.map((type) => (
              <Link
                key={type.label}
                href={type.href}
                className="group flex flex-col bg-white border border-[#f6f6f6] rounded-[20px] overflow-hidden transition-shadow"
              >
                {/* Image — flush to card top, bg #ededed */}
                <div className="relative w-full h-[150px] md:h-[200px] bg-[#ededed] overflow-hidden">
                  <Image
                    src={type.image}
                    alt={type.label}
                    fill
                    sizes="(max-width: 640px) 100vw, 588px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Text — Figma: title 16/20 SemiBold #121212, desc 14/16 Regular #807E7E */}
                <div className="px-4 md:px-6 pt-4 md:pt-6 flex flex-col gap-2 md:gap-4">
                  <p className="text-[16px] md:text-[20px]" style={{ lineHeight: "24px", fontWeight: 600, color: "#121212" }}>
                    {type.label}
                  </p>
                  <p className="text-[14px] md:text-[16px]" style={{ lineHeight: "24px", color: "#807E7E", letterSpacing: "-0.02em" }}>
                    {type.desc}
                  </p>
                </div>

                {/* Full-width divider — Figma: #F6F6F6 */}
                <div className="h-px bg-[#f6f6f6] mt-4" />

                {/* Get Started Free + arrow — Figma: row gap 8, 14/16 #305E82 */}
                <span
                  className="flex items-center gap-2 px-4 md:px-6 py-3 font-medium group-hover:gap-3 transition-all text-[14px] md:text-[16px]"
                  style={{ color: "#305E82" }}
                >
                  Get Started Free
                  <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── READY TO LIST CTA — Figma: section 512h white, inner card 1392x464 with gradient bg, rounded-20, 24px page padding ── */}
      <section className="bg-white">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-4 md:py-6">
          <div
            className="rounded-[20px] h-[296px] md:h-[464px] flex flex-col items-center justify-center text-white text-center px-4 md:px-6"
            style={{
              background: "linear-gradient(174deg, rgba(117,163,199,1) 0%, rgba(48,94,130,1) 96%), #305E82",
            }}
          >
            <h2
              className="font-semibold mb-2 md:mb-4 max-w-[500px]"
              style={{ fontSize: "clamp(24px, 6vw, 48px)", lineHeight: "1.33", letterSpacing: "-0.02em" }}
            >
              Ready to<br />List Your Property?
            </h2>
            <p
              className="mb-6 md:mb-10 max-w-[600px] text-[12px] leading-[24px] md:text-[18px] md:leading-[35px] tracking-[-0.02em]"
            >
              Join thousands of owners and agents on Nigeria&apos;s fastest-growing property
              platform. Get verified, list your property, and reach millions of seekers.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/post-property"
                className="bg-[#FFAE00] text-white font-medium h-12 px-6 rounded-[12px] flex items-center justify-center hover:opacity-90 transition-opacity whitespace-nowrap"
                style={{ fontSize: "14px", border: "1px solid rgba(120,158,187,0.5)" }}
              >
                Get Started Free
              </Link>
              <Link
                href="/login"
                className="flex items-center justify-center h-12 px-8 text-white font-medium hover:underline whitespace-nowrap"
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
        <div className="max-w-[1440px] mx-auto px-4 md:px-[80px] pt-12 md:pt-[80px] pb-12 md:pb-[80px]">

          {/* Header centered */}
          <div className="max-w-[628px] mx-auto mb-10 md:mb-[64px] flex flex-col items-center gap-2 text-center">
            <h2
              className="text-[#121212] font-semibold"
              style={{ fontSize: "clamp(20px, 4.5vw, 40px)", lineHeight: "1.6", letterSpacing: "-0.02em" }}
            >
              Browse By Location
            </h2>
            <p
              className="text-[14px] leading-[24px] text-[#807e7e] md:text-[16px] md:leading-[32px]"
              style={{ letterSpacing: "-0.02em" }}
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2"><LocationCard loc={locations[1]} /></div>
              <div className="md:col-span-1"><LocationCard loc={locations[2]} /></div>
            </div>

            {/* Row 3: Ogun + PH equal 50/50 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LocationCard loc={locations[3]} />
              <LocationCard loc={locations[4]} />
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ — Figma: 1440x1248 white bg, header 628x168 centered, list 846 wide centered, items 846x72 with gap 24, rounded-12, bg #f6f6f6 ── */}
      <section className="bg-white">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[80px] pt-12 md:pt-[80px] pb-12 md:pb-[80px]">

          {/* Header — centered, 628 wide */}
          <div className="max-w-[628px] mx-auto mb-10 md:mb-[64px] flex flex-col items-center gap-2 text-center">
            <h2 style={{ fontSize: "clamp(20px, 4.5vw, 40px)", lineHeight: "1.6", fontWeight: 600, color: "#121212", letterSpacing: "-0.02em" }}>
              Frequently Asked Questions
            </h2>
            <p className="text-[14px] leading-[24px] text-[#807e7e] md:text-[16px] md:leading-[32px]" style={{ fontWeight: 400, letterSpacing: "-0.02em" }}>
              We&rsquo;re dedicated to revolutionizing the way property and people connect. Our platform is built on ease of access and trust to streamline the buying, selling, and leasing process for everyone.
            </p>
          </div>

          {/* FAQ list — 846 wide centered, gap 24 between items */}
          <div className="max-w-[846px] mx-auto flex flex-col gap-4 md:gap-6">
            {faqs.map((f, i) => (
              <details key={i} className="group bg-[#f6f6f6] rounded-[12px] overflow-hidden">
                <summary
                  className="flex items-center justify-between cursor-pointer list-none px-4 md:px-6 py-4 md:py-0 min-h-[56px] md:min-h-0 md:h-[72px]"
                >
                  <span className="text-[14px] md:text-[16px]" style={{ lineHeight: "24px", fontWeight: 600, color: "#121212", letterSpacing: "-0.02em" }}>
                    {f.q}
                  </span>
                  {/* Plus when closed, Minus when open — Figma: orange #FFAE00 */}
                  <span className="shrink-0 ml-4 w-6 h-6 flex items-center justify-center text-[#ffae00]">
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
                <div className="px-4 md:px-6 pb-4 md:pb-6 pt-0">
                  <p className="text-[12px] leading-[20px] text-[#807e7e] md:text-[14px] md:leading-[24px] md:text-[#2e2e2e]" style={{ letterSpacing: "-0.02em" }}>
                    {f.a}
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

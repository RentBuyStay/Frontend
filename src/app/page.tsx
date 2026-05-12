import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import PropertyCard from "@/components/PropertyCard";
import { mockProperties } from "@/lib/mockData";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Star, Phone, MessageCircle, CheckCircle } from "lucide-react";

// How RentBuyStay Works steps
const steps = [
  {
    num: 1,
    title: "Search & Filter",
    desc: "Use our search engine to find properties by location, type, price and more across Nigeria.",
  },
  {
    num: 2,
    title: "Browse & Compare",
    desc: "View detailed property photos, photo galleries, floor plans, and neighbourhood maps.",
  },
  {
    num: 3,
    title: "Contact Agent",
    desc: "Reach out instantly via call or WhatsApp to verified agents and property owners.",
  },
  {
    num: 4,
    title: "Close the Deal",
    desc: "Complete your transaction safely with full documentation support from listing to handover.",
  },
];

const agents = [
  { name: "Ibrahim Fashola", initials: "IF", agency: "Jaskaro Properties", location: "Lagos", rating: 5.0, listings: 9 },
  { name: "Pascaline Okonkwo", initials: "PO", agency: "Prime Realty & Co.", location: "Abuja", rating: 4.9, listings: 24 },
  { name: "Chioma Idris", initials: "CI", agency: "Royal Realtors", location: "Port-Harcourt", rating: 4.7, listings: 27 },
  { name: "Olamide Adesokan", initials: "OA", agency: "Nexus Property Hub", location: "Ogun", rating: 4.6, listings: 11 },
  { name: "Olaitan Badejo", initials: "OB", agency: "Prime Realty & Co.", location: "Lagos", rating: 4.6, listings: 13 },
  { name: "Lade Oyetola", initials: "LO", agency: "Propex", location: "Lagos", rating: 4.3, listings: 8 },
];

const propertyTypes = [
  { label: "Residential Homes", desc: "Single family homes, condos, townhouses and luxury estates.", image: "/images/prop4.jpg", href: "/for-sale" },
  { label: "Commercial Spaces", desc: "Offices, retail spaces, warehouses, and mixed-use developments.", image: "/images/commercial.jpg", href: "/for-sale?type=commercial" },
  { label: "Rental Properties", desc: "Short-term stays, long-term rentals, and corporate housing solutions.", image: "/images/prop1.jpg", href: "/for-rent" },
  { label: "Land & Lots", desc: "Residential lots, commercial land, and investment opportunities.", image: "/images/land.jpg", href: "/for-sale?type=land" },
];

const locations = [
  { name: "Lagos", count: "1206 Properties Listed", image: "/images/lagos.jpg", href: "/search?location=lagos" },
  { name: "Ibadan", count: "830 Properties Listed", image: "/images/ibadan.jpg", href: "/search?location=ibadan" },
  { name: "Abuja", count: "718 Properties Listed", image: "/images/abuja.jpg", href: "/search?location=abuja" },
  { name: "Ogun", count: "472 Properties Listed", image: "/images/ogun.jpg", href: "/search?location=ogun" },
  { name: "Port-Harcourt", count: "719 Properties Listed", image: "/images/port-harcourt.jpg", href: "/search?location=port-harcourt" },
];

const faqs = [
  "Do I need to pay a subscription fee to find a house?",
  "How do I track my inquiries?",
  "How do I contact an agent or owner?",
  "How do I upload my property?",
  "Why is my account in 'Restricted Mode'?",
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

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image src="/images/hero-bg.jpg" alt="Luxury home" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Floating navbar */}
        <Navbar transparent />

        {/* Hero content — pushed below navbar */}
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-white px-6 text-center pt-32 pb-16">
          <h1 className="text-4xl lg:text-6xl font-semibold leading-tight max-w-3xl mb-4">
            Find Your Perfect Home in Nigeria
          </h1>
          <p className="text-sm lg:text-base text-white/75 max-w-2xl mb-8 leading-relaxed">
            Rent, buy, or book short stays across Nigeria&apos;s top locations with verified agents
            and listings. Discover thousands of verified properties to rent, buy, or book for
            short stays — from Abuja to Lagos and beyond.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
            {stats.map((s, i) => (
              <div key={s.label} className="flex items-center gap-2 text-sm">
                <CheckCircle size={15} className="text-[#ffae00]" />
                <span className="font-semibold">{s.value}</span>
                <span className="text-white/70">{s.label}</span>
                {i < stats.length - 1 && <span className="text-white/30 ml-4">•</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Search bar — sits at bottom of hero, overlapping into next section */}
        <div className="relative z-20 px-6 pb-0 max-w-5xl mx-auto w-full">
          <SearchBar />
        </div>
      </section>

      {/* ── FEATURED PROPERTIES ── */}
      <section className="py-14 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between mb-2">
            <div>
              <h2 className="text-2xl lg:text-3xl font-semibold text-[#121212]">Featured Properties</h2>
              <p className="text-sm text-[#7f7e7e] mt-1">Premium and handpicked listings from verified agents</p>
            </div>
            <Link href="/search" className="text-sm font-medium text-[#305e82] flex items-center gap-1 hover:gap-2 transition-all whitespace-nowrap">
              View All <ArrowRight size={15} />
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {mockProperties.slice(0, 3).map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW RENTBUYSTAY WORKS ── */}
      <section className="py-14 bg-[#f6f6f6]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-semibold text-[#121212]">How RentBuyStay Works</h2>
            <p className="text-sm text-[#7f7e7e] mt-2">Find and secure your ideal property in four easy steps</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Woman image */}
            <div className="relative h-[420px] rounded-2xl overflow-hidden">
              <Image src="/images/woman-phone.jpg" alt="Happy customer" fill className="object-cover object-top" />
            </div>
            {/* Steps */}
            <div className="flex flex-col gap-4">
              {steps.map((step) => (
                <div key={step.num} className="bg-white rounded-2xl p-5 flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-[#ff5a00] text-white flex items-center justify-center text-sm font-bold shrink-0">
                    {step.num}
                  </div>
                  <div>
                    <p className="font-semibold text-[#121212] text-sm">{step.title}</p>
                    <p className="text-sm text-[#7f7e7e] mt-1 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TOP VERIFIED AGENTS ── */}
      <section className="py-14 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between mb-2">
            <div>
              <h2 className="text-2xl lg:text-3xl font-semibold text-[#121212]">Top Verified Agents</h2>
              <p className="text-sm text-[#7f7e7e] mt-1 max-w-md">
                Connect with our network of trusted and verified real estate professionals across Nigeria.
              </p>
            </div>
            <Link href="/agents" className="text-sm font-medium text-[#305e82] flex items-center gap-1 hover:gap-2 transition-all whitespace-nowrap">
              View All <ArrowRight size={15} />
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {agents.map((agent) => (
              <div key={agent.name} className="border border-[#ededed] rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#305e82] flex items-center justify-center text-white font-semibold text-base shrink-0">
                    {agent.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <p className="font-semibold text-[#121212] text-sm">{agent.name}</p>
                      <CheckCircle size={14} className="text-[#14ae5c] fill-[#14ae5c]" />
                    </div>
                    <p className="text-xs text-[#7f7e7e]">{agent.agency}</p>
                    <div className="flex items-center gap-1 text-xs text-[#7f7e7e] mt-0.5">
                      <MapPin size={11} /> {agent.location}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1 text-xs">
                    <Star size={12} className="text-[#ffae00] fill-[#ffae00]" />
                    <span className="font-semibold text-[#121212]">{agent.rating}</span>
                  </div>
                  <span className="text-xs text-[#7f7e7e]">{agent.listings} listings</span>
                  <Link href="/agents" className="text-xs text-[#305e82] hover:underline ml-auto">View all Properties</Link>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-1.5 border border-[#ededed] text-[#121212] text-xs py-2.5 rounded-lg hover:border-[#305e82] transition-colors">
                    <Phone size={13} /> Call
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1.5 bg-[#305e82] text-white text-xs py-2.5 rounded-lg hover:bg-[#254d6b] transition-colors">
                    <MessageCircle size={13} /> Message
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVERY PROPERTY TYPE ── */}
      <section className="py-14 bg-[#f6f6f6]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-semibold text-[#121212]">Every Property Type, Every Need</h2>
            <p className="text-sm text-[#7f7e7e] mt-2">
              Discover homes tailored to your lifestyle, from cozy apartments to luxury estates.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {propertyTypes.map((type) => (
              <div key={type.label} className="group relative h-56 rounded-2xl overflow-hidden bg-[#d7d7d7]">
                <Image src={type.image} alt={type.label} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/35" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <p className="font-semibold text-base">{type.label}</p>
                  <p className="text-xs text-white/80 mt-1">{type.desc}</p>
                  <Link href={type.href} className="text-xs font-medium text-white flex items-center gap-1 mt-2 hover:gap-2 transition-all">
                    Get Started Free <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── READY TO LIST CTA ── */}
      <section className="py-14 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="bg-[#305e82] rounded-3xl px-8 lg:px-16 py-14 text-white text-center">
            <h2 className="text-2xl lg:text-4xl font-semibold mb-3">
              Ready to List Your Property?
            </h2>
            <p className="text-white/75 text-sm max-w-lg mx-auto mb-8 leading-relaxed">
              Join thousands of owners and agents on Nigeria&apos;s fastest-growing property
              platform. Get verified, list your property, and reach millions of seekers.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                href="/post-property"
                className="bg-[#ff5a00] text-white font-semibold px-8 py-3 rounded-xl hover:bg-[#e04f00] transition-colors"
              >
                Get Started Free
              </Link>
              <Link href="/login" className="text-white/80 text-sm hover:text-white transition-colors">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── BROWSE BY LOCATION ── */}
      <section className="py-14 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-semibold text-[#121212]">Browse By Location</h2>
            <p className="text-sm text-[#7f7e7e] mt-2">Find properties in Nigeria&apos;s most popular cities.</p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Lagos — full width */}
            <Link href={locations[0].href} className="group relative h-64 rounded-2xl overflow-hidden">
              <Image src={locations[0].image} alt={locations[0].name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <p className="text-2xl font-semibold">{locations[0].name}</p>
                <p className="text-sm text-white/80 mt-1">{locations[0].count}</p>
                <span className="text-xs font-medium flex items-center gap-1 mt-2">
                  View Properties <ArrowRight size={13} />
                </span>
              </div>
            </Link>

            {/* 2-column grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {locations.slice(1).map((loc) => (
                <Link key={loc.name} href={loc.href} className="group relative h-48 rounded-2xl overflow-hidden">
                  <Image src={loc.image} alt={loc.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute bottom-0 left-0 p-5 text-white">
                    <p className="text-lg font-semibold">{loc.name}</p>
                    <p className="text-xs text-white/80 mt-0.5">{loc.count}</p>
                    <span className="text-xs font-medium flex items-center gap-1 mt-2">
                      View Properties <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="py-14 bg-[#f6f6f6]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-3">
            <h2 className="text-2xl lg:text-3xl font-semibold text-[#121212]">Frequently Asked Questions</h2>
            <p className="text-sm text-[#7f7e7e] mt-2">
              We&apos;re dedicated to revolutionizing the way property and people connect.
            </p>
          </div>
          <div className="max-w-3xl mx-auto mt-8 flex flex-col gap-2">
            {faqs.map((q, i) => (
              <details key={i} className="group bg-white rounded-xl">
                <summary className="flex items-center justify-between px-5 py-4 text-sm font-medium text-[#121212] cursor-pointer list-none">
                  {q}
                  <ArrowRight size={16} className="text-[#7f7e7e] shrink-0 ml-4 group-open:rotate-90 transition-transform" />
                </summary>
                <p className="px-5 pb-4 text-sm text-[#7f7e7e] leading-relaxed border-t border-[#f6f6f6]">
                  Our support team is happy to help. Contact us at help@rentbuystay.com or use the live chat below.
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

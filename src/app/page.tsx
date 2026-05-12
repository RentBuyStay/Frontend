import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import PropertyCard from "@/components/PropertyCard";
import Newsletter from "@/components/Newsletter";
import { mockProperties } from "@/lib/mockData";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle, MapPin } from "lucide-react";

const stats = [
  { value: "10K+", label: "Active Listings" },
  { value: "2K+", label: "Verified Agents" },
  { value: "36", label: "States Covered" },
];

const howItWorks = [
  { step: 1, title: "Search & Discover", desc: "Browse thousands of verified listings. Filter by location, price, property type and more." },
  { step: 2, title: "Connect with Agents", desc: "Get in touch directly with verified agents who know the local market inside out." },
  { step: 3, title: "Close the Deal", desc: "Complete your transaction safely with full support from listing to handover." },
];

const categories = [
  { label: "For Rent", href: "/for-rent", image: "/images/prop1.jpg", desc: "Find rental homes & apartments" },
  { label: "For Sale", href: "/for-sale", image: "/images/prop2.jpg", desc: "Buy your dream property" },
  { label: "Shortlet", href: "/shortlet", image: "/images/prop3.jpg", desc: "Book short stays" },
];

const locations = [
  { name: "Lagos", count: "4,200+ listings" },
  { name: "Abuja", count: "2,100+ listings" },
  { name: "Port Harcourt", count: "980+ listings" },
  { name: "Ibadan", count: "620+ listings" },
  { name: "Kano", count: "410+ listings" },
  { name: "Enugu", count: "320+ listings" },
];

const topAgents = [
  { name: "Chioma Okeke", initials: "CO", location: "Lagos", listings: 24 },
  { name: "Emeka Nwosu", initials: "EN", location: "Abuja", listings: 18 },
  { name: "Amaka Obi", initials: "AO", location: "Lagos", listings: 31 },
  { name: "Tunde Bello", initials: "TB", location: "PH", listings: 15 },
];

const faqs = [
  { q: "How do I list my property on RentBuyStay?", a: "Click 'Post Property' in the top navigation, create an account, and follow the steps to add your listing. Our team reviews and publishes within 24 hours." },
  { q: "Are the agents on the platform verified?", a: "Yes. Every agent goes through identity checks, license verification, and track record review. Verified agents display a badge on their profile." },
  { q: "Is it free to search for properties?", a: "Yes, searching and browsing is completely free. We earn a commission only when a transaction is successfully completed." },
  { q: "What areas does RentBuyStay cover?", a: "We cover all 36 states in Nigeria plus the FCT. Strongest coverage in Lagos, Abuja, Port Harcourt, Kano, Ibadan and Enugu." },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col">
        <Navbar transparent />

        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Luxury home interior"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-white px-6 text-center pt-20 pb-16">
          <h1 className="text-4xl lg:text-6xl font-semibold leading-tight max-w-3xl mb-4">
            Find Your Perfect Home in Nigeria
          </h1>
          <p className="text-base lg:text-lg text-white/75 max-w-2xl mb-10 leading-relaxed">
            Rent, buy, or book short stays across Nigeria&apos;s top locations with verified agents
            and listings. Discover thousands of verified properties — from Abuja to Lagos and beyond.
          </p>

          <div className="w-full max-w-4xl">
            <SearchBar />
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-10">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-2 text-sm">
                <CheckCircle size={16} className="text-[#14ae5c]" />
                <span className="font-semibold">{s.value}</span>
                <span className="text-white/70">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PROPERTIES ── */}
      <section className="py-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl lg:text-3xl font-semibold text-[#121212]">Featured Properties</h2>
              <p className="text-sm text-[#7f7e7e] mt-1">Handpicked verified listings across Nigeria</p>
            </div>
            <Link href="/search" className="text-sm font-medium text-[#305e82] flex items-center gap-1 hover:gap-2 transition-all">
              View all <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {mockProperties.slice(0, 4).map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW RBS WORKS ── */}
      <section className="py-16 bg-[#f6f6f6]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold text-[#305e82] uppercase tracking-wider mb-3">How RentBuyStay Works</p>
              <h2 className="text-2xl lg:text-4xl font-semibold text-[#121212] mb-8">
                Finding your perfect home has never been easier
              </h2>
              <div className="flex flex-col gap-6">
                {howItWorks.map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="w-9 h-9 rounded-full bg-[#305e82] text-white flex items-center justify-center text-sm font-bold shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#121212] mb-1">{item.title}</h3>
                      <p className="text-sm text-[#7f7e7e] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[420px] rounded-2xl overflow-hidden">
              <Image src="/images/woman-phone.jpg" alt="Happy customer" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ── TOP VERIFIED AGENTS ── */}
      <section className="py-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl lg:text-3xl font-semibold text-[#121212]">Top Verified Agents</h2>
            <Link href="/agents" className="text-sm font-medium text-[#305e82] flex items-center gap-1 hover:gap-2 transition-all">
              View all <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {topAgents.map((agent) => (
              <div key={agent.name} className="bg-[#f6f6f6] rounded-2xl p-5 text-center">
                <div className="w-16 h-16 rounded-full bg-[#305e82] text-white text-xl font-semibold flex items-center justify-center mx-auto mb-3">
                  {agent.initials}
                </div>
                <p className="font-semibold text-[#121212] text-sm">{agent.name}</p>
                <div className="flex items-center justify-center gap-1 text-xs text-[#7f7e7e] mt-0.5">
                  <MapPin size={11} /> {agent.location}
                </div>
                <p className="text-xs text-[#7f7e7e] mt-1">{agent.listings} listings</p>
                <button className="mt-3 w-full text-xs font-medium border border-[#305e82] text-[#305e82] py-2 rounded-lg hover:bg-[#305e82] hover:text-white transition-colors">
                  View Profile
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVERY PROPERTY TYPE ── */}
      <section className="py-16 bg-[#f6f6f6]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-semibold text-[#121212]">Every Property Type, Every Need</h2>
            <p className="text-sm text-[#7f7e7e] mt-2">Whether you&apos;re renting, buying or booking a short stay</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {categories.map((cat) => (
              <Link key={cat.href} href={cat.href} className="group relative h-56 rounded-2xl overflow-hidden">
                <Image src={cat.image} alt={cat.label} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <p className="text-xl font-semibold">{cat.label}</p>
                  <p className="text-sm opacity-80 mt-1">{cat.desc}</p>
                  <span className="mt-2 text-xs flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Browse <ArrowRight size={13} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── READY TO LIST CTA ── */}
      <section className="py-16 bg-[#305e82] text-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl lg:text-3xl font-semibold mb-2">Ready to List Your Property?</h2>
            <p className="text-white/75 text-sm max-w-xl">
              Join thousands of landlords, agents and developers who use RentBuyStay to reach
              verified buyers and tenants across Nigeria.
            </p>
          </div>
          <Link
            href="/post-property"
            className="shrink-0 bg-[#ff5a00] text-white font-semibold px-8 py-3 rounded-xl hover:bg-[#e04f00] transition-colors"
          >
            Post a Property
          </Link>
        </div>
      </section>

      {/* ── BROWSE BY LOCATION ── */}
      <section className="py-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl lg:text-3xl font-semibold text-[#121212]">Browse By Location</h2>
            <Link href="/search" className="text-sm font-medium text-[#305e82] flex items-center gap-1 hover:gap-2 transition-all">
              View all <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {locations.map((loc) => (
              <Link
                key={loc.name}
                href={`/search?location=${loc.name.toLowerCase()}`}
                className="group bg-[#f6f6f6] rounded-xl p-4 text-center hover:bg-[#305e82] transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[#ededed] group-hover:bg-white/20 flex items-center justify-center mx-auto mb-2 transition-colors">
                  <MapPin size={16} className="text-[#305e82] group-hover:text-white" />
                </div>
                <p className="text-sm font-semibold text-[#121212] group-hover:text-white transition-colors">{loc.name}</p>
                <p className="text-xs text-[#7f7e7e] group-hover:text-white/70 transition-colors mt-0.5">{loc.count}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── MORE LISTINGS ── */}
      <section className="py-16 bg-[#f6f6f6]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl lg:text-3xl font-semibold text-[#121212]">Latest Properties</h2>
            <Link href="/search" className="text-sm font-medium text-[#305e82] flex items-center gap-1 hover:gap-2 transition-all">
              View all <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {mockProperties.slice(4).map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="py-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl lg:text-3xl font-semibold text-[#121212] text-center mb-10">
              Frequently Asked Questions
            </h2>
            <div className="flex flex-col gap-3">
              {faqs.map((faq, i) => (
                <details key={i} className="bg-[#f6f6f6] rounded-xl group">
                  <summary className="flex items-center justify-between px-5 py-4 text-sm font-medium text-[#121212] cursor-pointer list-none">
                    {faq.q}
                    <span className="text-[#7f7e7e] group-open:rotate-180 transition-transform text-lg leading-none">+</span>
                  </summary>
                  <p className="px-5 pb-4 text-sm text-[#7f7e7e] leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
}

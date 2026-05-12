import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import PropertyCard from "@/components/PropertyCard";
import Newsletter from "@/components/Newsletter";
import { mockProperties } from "@/lib/mockData";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const stats = [
  { value: "10K+", label: "Active Listings" },
  { value: "2K+", label: "Verified Agents" },
  { value: "36", label: "States Covered" },
];

const howItWorks = [
  {
    step: "01",
    title: "Search Properties",
    desc: "Browse thousands of verified listings across Nigeria. Filter by location, price, type and more.",
  },
  {
    step: "02",
    title: "Connect with Agents",
    desc: "Get in touch directly with verified agents and developers who know the local market.",
  },
  {
    step: "03",
    title: "Move In",
    desc: "Complete your transaction safely and move into your new home with full support.",
  },
];

const categories = [
  { label: "Buy", href: "/for-sale", color: "bg-[#305e82]", desc: "Find properties for sale" },
  { label: "Rent", href: "/for-rent", color: "bg-[#14ae5c]", desc: "Rent a home or apartment" },
  { label: "Shortlet", href: "/shortlet", color: "bg-[#8a38f5]", desc: "Book short stays" },
  { label: "Requests", href: "/property-requests", color: "bg-[#ff5a00]", desc: "Post what you need" },
];

export default function HomePage() {
  const featured = mockProperties.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#121212] text-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-20 lg:py-28">
          <div className="max-w-3xl mb-10">
            <h1 className="text-4xl lg:text-6xl font-semibold leading-tight mb-4">
              Find Your Perfect Home in Nigeria
            </h1>
            <p className="text-base lg:text-lg text-[#7f7e7e] leading-relaxed">
              Rent, buy, or book short stays across Nigeria&apos;s top locations with verified
              agents and listings. Discover thousands of verified properties from Abuja to Lagos
              and beyond.
            </p>
          </div>

          <SearchBar />

          <div className="flex flex-wrap gap-8 mt-10">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-semibold text-white">{s.value}</p>
                <p className="text-sm text-[#7f7e7e]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Cards */}
      <section className="py-14 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className={`${cat.color} text-white rounded-2xl p-6 hover:opacity-90 transition-opacity flex flex-col gap-2`}
              >
                <span className="text-xl font-semibold">{cat.label}</span>
                <span className="text-sm opacity-80">{cat.desc}</span>
                <ArrowRight size={18} className="mt-2" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-14 bg-[#f6f6f6]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl lg:text-3xl font-semibold text-[#121212]">Featured Listings</h2>
              <p className="text-sm text-[#7f7e7e] mt-1">Top verified properties across Nigeria</p>
            </div>
            <Link href="/search" className="text-sm font-medium text-[#305e82] flex items-center gap-1 hover:gap-2 transition-all">
              View all <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-14 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-semibold text-[#121212]">How RentBuyStay Works</h2>
            <p className="text-sm text-[#7f7e7e] mt-2">Simple steps to your perfect property</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {howItWorks.map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="text-3xl font-bold text-[#ededed] shrink-0">{item.step}</div>
                <div>
                  <h3 className="text-base font-semibold text-[#121212] mb-2 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#14ae5c]" />
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#7f7e7e] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest */}
      <section className="py-14 bg-[#f6f6f6]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl lg:text-3xl font-semibold text-[#121212]">Latest Properties</h2>
            <Link href="/search" className="text-sm font-medium text-[#305e82] flex items-center gap-1 hover:gap-2 transition-all">
              View all <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {mockProperties.slice(4).map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
}

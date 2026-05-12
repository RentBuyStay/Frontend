import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About Us | RentBuyStay",
};

const stats = [
  { value: "10K+", label: "Active Listings" },
  { value: "2K+", label: "Verified Agents" },
  { value: "36", label: "States" },
];

const trust = [
  { color: "bg-[#305e82]", title: "Verified Listings Only", desc: "Every property on our platform is reviewed and verified before going live. No fake listings, no misleading photos." },
  { color: "bg-[#ff5a00]", title: "Vetted Agents", desc: "All agents are thoroughly screened. We check identity, license and track record so you can trust who you deal with." },
  { color: "bg-[#2e2e2e]", title: "Transparent Pricing", desc: "No hidden fees, no surprise charges. What you see is what you pay. We believe transparency builds lasting trust." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Hero */}
      <section className="relative h-64 lg:h-80 flex flex-col">
        <Navbar transparent />
        <div className="absolute inset-0 z-0">
          <Image src="/images/interior.jpg" alt="About RentBuyStay" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/55" />
        </div>
        <div className="relative z-10 flex flex-col justify-center flex-1 px-6 lg:px-12 max-w-[1440px] mx-auto w-full pt-16">
          <h1 className="text-3xl lg:text-5xl font-semibold text-white mb-3">
            One Platform. Every Property Need.
          </h1>
          <p className="text-white/70 text-sm max-w-xl">
            Whether you&apos;re renting for a year, buying a lifetime home, or booking a short stay, RentBuyStay has you covered.
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#305e82] text-white py-8">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap gap-10 items-center justify-center lg:justify-start">
            {stats.map((s) => (
              <div key={s.label} className="text-center lg:text-left">
                <p className="text-3xl font-bold">{s.value}</p>
                <p className="text-sm text-white/70 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Property image grid */}
      <section className="py-14 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-3 gap-3 h-64 lg:h-80 mb-14">
            <div className="col-span-2 relative rounded-2xl overflow-hidden">
              <Image src="/images/interior.jpg" alt="Interior" fill className="object-cover" />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex-1 relative rounded-2xl overflow-hidden">
                <Image src="/images/prop1.jpg" alt="Property" fill className="object-cover" />
              </div>
              <div className="flex-1 relative rounded-2xl overflow-hidden">
                <Image src="/images/prop2.jpg" alt="Property" fill className="object-cover" />
              </div>
            </div>
          </div>

          {/* Story */}
          <div className="max-w-3xl">
            <p className="text-xs font-semibold text-[#305e82] uppercase tracking-wider mb-3">Our Story</p>
            <h2 className="text-2xl lg:text-3xl font-semibold text-[#121212] mb-4">
              We didn&apos;t just build a property platform.
            </h2>
            <p className="text-sm text-[#7f7e7e] leading-relaxed mb-4">
              We built the one we wished existed. Finding your perfect space — whether for a year, a year, or a lifetime — should feel exciting, not exhausting.
            </p>
            <p className="text-sm text-[#7f7e7e] leading-relaxed">
              Too many Nigerians have been burned by fake listings, unreliable agents, and opaque pricing. RentBuyStay was built to fix that — with verified listings, vetted agents, and a platform designed around trust.
            </p>
          </div>
        </div>
      </section>

      {/* Born From Frustration */}
      <section className="py-14 bg-[#f6f6f6]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold text-[#305e82] uppercase tracking-wider mb-3">Our Why</p>
              <h2 className="text-2xl lg:text-3xl font-semibold text-[#121212] mb-4">
                Born From A Very Real Frustration
              </h2>
              <p className="text-sm text-[#7f7e7e] leading-relaxed mb-4">
                Our founders spent months searching for apartments in Lagos. They were ghosted by agents, shown properties that didn&apos;t match the listing, and asked to pay fees upfront for properties that turned out not to exist.
              </p>
              <p className="text-sm text-[#7f7e7e] leading-relaxed">
                That experience became the blueprint for RentBuyStay. A platform where everything is verified, everyone is accountable, and the process is transparent from search to handover.
              </p>
            </div>
            <div className="relative h-72 rounded-2xl overflow-hidden">
              <Image src="/images/woman-phone.jpg" alt="Happy customer" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* We Earn Trust */}
      <section className="py-14 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-semibold text-[#121212]">We Earn Trust The Old-Fashioned Way</h2>
            <p className="text-sm text-[#7f7e7e] mt-2">By doing things right, every single time.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {trust.map((t) => (
              <div key={t.title} className={`${t.color} text-white rounded-2xl p-8`}>
                <h3 className="text-lg font-semibold mb-3">{t.title}</h3>
                <p className="text-sm opacity-80 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-[#305e82] text-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold mb-1">Ready to List Your Property?</h2>
            <p className="text-white/70 text-sm">Join thousands of landlords and agents on RentBuyStay.</p>
          </div>
          <Link href="/post-property" className="shrink-0 bg-[#ff5a00] text-white font-semibold px-8 py-3 rounded-xl hover:bg-[#e04f00] transition-colors">Post a Property</Link>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
}

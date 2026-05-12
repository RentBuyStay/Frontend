import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import { CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "About Us | RentBuyStay",
};

const values = [
  { title: "Transparency", desc: "We publish accurate, verified listings and never hide fees or charges from our users." },
  { title: "Trust", desc: "Every agent on our platform is vetted. Every listing is reviewed for authenticity." },
  { title: "Accessibility", desc: "We make property search easy for everyone, from first-time renters to seasoned investors." },
  { title: "Local Expertise", desc: "We understand Nigeria's unique real estate market and build tools for it specifically." },
];

const stats = [
  { value: "10K+", label: "Active Listings" },
  { value: "2K+", label: "Verified Agents" },
  { value: "36", label: "States Covered" },
  { value: "50K+", label: "Happy Users" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="bg-[#121212] text-white py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 max-w-3xl">
          <h1 className="text-3xl lg:text-5xl font-semibold mb-4">About RentBuyStay</h1>
          <p className="text-[#7f7e7e] text-base leading-relaxed">
            We are Nigeria&apos;s most trusted property platform, connecting millions of Nigerians
            with their perfect home — whether they want to rent, buy, or book a short stay.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#305e82] text-white py-12">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-bold">{s.value}</p>
                <p className="text-sm opacity-80 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl lg:text-3xl font-semibold text-[#121212] mb-4">Our Mission</h2>
              <p className="text-sm text-[#7f7e7e] leading-relaxed mb-4">
                RentBuyStay was founded with a single goal: to make finding a home in Nigeria
                simple, safe and stress-free. We know how challenging the Nigerian property market
                can be — from unverified listings to shady agents and hidden charges.
              </p>
              <p className="text-sm text-[#7f7e7e] leading-relaxed">
                That is why we built a platform where every listing is verified, every agent is
                vetted, and every user is protected. From Lagos to Kano, Abuja to Port Harcourt,
                we cover all 36 states so that no matter where you want to live, RentBuyStay is
                there for you.
              </p>
            </div>
            <div className="bg-[#f3fefe] rounded-2xl h-72 flex items-center justify-center text-[#a0a0a0]">
              About Image
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-[#f6f6f6]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <h2 className="text-2xl lg:text-3xl font-semibold text-[#121212] mb-10 text-center">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-6">
                <CheckCircle2 size={22} className="text-[#14ae5c] mb-3" />
                <h3 className="font-semibold text-[#121212] mb-2">{v.title}</h3>
                <p className="text-sm text-[#7f7e7e] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
}

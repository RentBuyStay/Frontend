import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft } from "lucide-react";

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const title = params.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-[#f6f6f6]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-10">
          <Link href="/blogs" className="inline-flex items-center gap-2 text-sm text-[#7f7e7e] hover:text-[#305e82] mb-8 transition-colors">
            <ArrowLeft size={16} /> Back to Blog
          </Link>

          <div className="max-w-3xl mx-auto">
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-[#305e82]/10 text-[#305e82]">
              Buying Guide
            </span>
            <h1 className="text-2xl lg:text-4xl font-semibold text-[#121212] mt-3 mb-4 leading-tight">
              {title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-[#7f7e7e] mb-6">
              <span className="flex items-center gap-1"><Calendar size={14} /> May 5, 2026</span>
              <span className="flex items-center gap-1"><Clock size={14} /> 6 min read</span>
            </div>

            <div className="bg-[#d7d7d7] rounded-2xl h-72 flex items-center justify-center text-[#a0a0a0] mb-8">
              Article Image
            </div>

            <div className="bg-white rounded-2xl p-8 prose prose-sm max-w-none">
              <p className="text-[#7f7e7e] leading-relaxed mb-4">
                Buying property in Nigeria is one of the most significant financial decisions you will
                ever make. With the right guidance and preparation, it can also be one of the most
                rewarding. This guide walks you through every step of the process from identifying
                your budget to collecting your keys.
              </p>
              <h2 className="text-lg font-semibold text-[#121212] mt-6 mb-3">1. Define Your Budget</h2>
              <p className="text-[#7f7e7e] leading-relaxed mb-4">
                Before you begin browsing listings, understand what you can afford. Consider not just
                the purchase price but also legal fees (typically 5–10%), agency commissions, and
                any renovation costs. Speak to your bank about mortgage options if needed.
              </p>
              <h2 className="text-lg font-semibold text-[#121212] mt-6 mb-3">2. Choose Your Location</h2>
              <p className="text-[#7f7e7e] leading-relaxed mb-4">
                Location is everything in real estate. Research areas based on proximity to work,
                schools, security, infrastructure and future development plans. Popular choices
                include Lekki and Ajah in Lagos, Maitama and Gwarinpa in Abuja.
              </p>
              <h2 className="text-lg font-semibold text-[#121212] mt-6 mb-3">3. Verify Documentation</h2>
              <p className="text-[#7f7e7e] leading-relaxed mb-4">
                Always verify the title of any property before committing. Look for a Certificate of
                Occupancy (C of O), Governor&apos;s Consent, or Deed of Assignment. Engage a
                qualified solicitor to conduct due diligence on your behalf.
              </p>
              <h2 className="text-lg font-semibold text-[#121212] mt-6 mb-3">4. Work with a Verified Agent</h2>
              <p className="text-[#7f7e7e] leading-relaxed">
                A reputable agent will save you time, protect you from scams, and negotiate on your
                behalf. Use RentBuyStay to find agents with verified credentials and proven track
                records in your target area.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Newsletter />
      <Footer />
    </div>
  );
}

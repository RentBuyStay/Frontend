import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Blog | RentBuyStay",
  description: "Real estate tips, guides and market insights for Nigeria.",
};

const posts = [
  { slug: "how-to-buy-your-first-home-in-nigeria", title: "How to Buy Your First Home in Nigeria", excerpt: "A step-by-step guide to navigating the Nigerian real estate market as a first-time buyer, from financing to final handover.", category: "Buying Guide", date: "May 5, 2026", readTime: "6 min read" },
  { slug: "best-areas-to-rent-in-lagos-2026", title: "Best Areas to Rent in Lagos in 2026", excerpt: "From Lekki to Surulere, we break down the most popular rental neighbourhoods in Lagos and what to expect.", category: "Area Guide", date: "Apr 28, 2026", readTime: "5 min read" },
  { slug: "shortlet-vs-long-term-rental", title: "Shortlet vs Long-Term Rental: Which is Right for You?", excerpt: "Understanding the pros and cons of short-stay apartments versus traditional annual leases in Nigerian cities.", category: "Shortlet", date: "Apr 18, 2026", readTime: "4 min read" },
  { slug: "abuja-real-estate-market-2026", title: "Abuja Real Estate Market Report 2026", excerpt: "An in-depth look at property prices, demand trends and investment opportunities in the FCT this year.", category: "Market Report", date: "Apr 10, 2026", readTime: "8 min read" },
  { slug: "tips-for-verified-property-agents", title: "5 Tips for Choosing a Verified Property Agent", excerpt: "How to vet real estate agents in Nigeria and avoid common pitfalls when working with intermediaries.", category: "Tips", date: "Mar 30, 2026", readTime: "4 min read" },
  { slug: "property-documentation-in-nigeria", title: "Understanding Property Documentation in Nigeria", excerpt: "C of O, Governor's Consent, Deed of Assignment — we explain every property document you need to know.", category: "Legal", date: "Mar 15, 2026", readTime: "7 min read" },
];

const categoryColors: Record<string, string> = {
  "Buying Guide": "bg-[#305e82]/10 text-[#305e82]",
  "Area Guide": "bg-[#14ae5c]/10 text-[#14ae5c]",
  "Shortlet": "bg-[#8a38f5]/10 text-[#8a38f5]",
  "Market Report": "bg-[#ff5a00]/10 text-[#ff5a00]",
  "Tips": "bg-[#00beff]/10 text-[#00beff]",
  "Legal": "bg-[#ffae00]/10 text-[#ffae00]",
};

export default function BlogsPage() {
  const [featured, ...rest] = posts;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="bg-[#121212] text-white py-16">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <h1 className="text-3xl lg:text-5xl font-semibold mb-3">Blog & Insights</h1>
          <p className="text-[#7f7e7e] text-base">
            Real estate tips, area guides and market reports to help you make smarter decisions.
          </p>
        </div>
      </section>

      <section className="py-14 bg-[#f6f6f6] flex-1">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          {/* Featured */}
          <Link href={`/blogs/${featured.slug}`} className="group block bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-shadow mb-10">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="h-60 lg:h-auto bg-[#d7d7d7] flex items-center justify-center text-[#a0a0a0] text-sm">
                Featured Image
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span className={`text-xs font-medium px-2 py-1 rounded-full w-fit mb-3 ${categoryColors[featured.category]}`}>
                  {featured.category}
                </span>
                <h2 className="text-xl lg:text-2xl font-semibold text-[#121212] group-hover:text-[#305e82] transition-colors mb-3">
                  {featured.title}
                </h2>
                <p className="text-sm text-[#7f7e7e] leading-relaxed mb-4">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-[#7f7e7e]">
                  <span className="flex items-center gap-1"><Calendar size={12} />{featured.date}</span>
                  <span className="flex items-center gap-1"><Clock size={12} />{featured.readTime}</span>
                </div>
                <span className="mt-4 text-sm font-medium text-[#305e82] flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read article <ArrowRight size={15} />
                </span>
              </div>
            </div>
          </Link>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((post) => (
              <Link key={post.slug} href={`/blogs/${post.slug}`} className="group bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-44 bg-[#d7d7d7] flex items-center justify-center text-[#a0a0a0] text-xs">
                  Post Image
                </div>
                <div className="p-5">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryColors[post.category] ?? "bg-[#ededed] text-[#7f7e7e]"}`}>
                    {post.category}
                  </span>
                  <h3 className="text-base font-semibold text-[#121212] mt-2 mb-2 group-hover:text-[#305e82] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-[#7f7e7e] leading-relaxed line-clamp-2 mb-3">{post.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-[#7f7e7e]">
                    <span className="flex items-center gap-1"><Calendar size={11} />{post.date}</span>
                    <span className="flex items-center gap-1"><Clock size={11} />{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
}

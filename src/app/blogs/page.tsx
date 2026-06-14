import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ListPropertyCTA from "@/components/ListPropertyCTA";
import RealtorSearch from "@/components/RealtorSearch";
import BlogCard from "@/components/BlogCard";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Blog | RentBuyStay",
  description: "Real estate insights, guides and market reports across Nigeria.",
};

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
};

const featured: Post = {
  slug: "navigating-lagos-property-titles",
  title: "Navigating Lagos Property Titles: What You Need to Know",
  excerpt:
    "Understanding property titles in Lagos can be complex. We've simplified the essential information on C of O, Governor's Consent, and other vital documents to ensure your property transactions are secure and stress-free.",
  image: "/images/blog-featured.png",
  date: "June 6, 2025",
};

const posts: Post[] = [
  {
    slug: "is-now-the-right-time-to-invest-in-lagos-real-estate",
    title: "Is Now the Right Time to Invest in Lagos Real Estate?",
    excerpt:
      "Lagos's real estate market continues to evolve. Our experts weigh in on current trends, emerging hot spots, and whether 2025 is the ideal year for you to make a strategic investment in the city's vibrant property landscape.",
    image: "/images/blog-1.png",
    date: "June 6, 2025",
  },
  {
    slug: "rise-of-eco-friendly-developments-in-abuja",
    title: "The Rise of Eco-Friendly Developments in Abuja Real Estate Sector",
    excerpt:
      "Discover how sustainability is shaping Abuja's property market, with new green-certified developments setting the standard for the future of urban living.",
    image: "/images/blog-2.png",
    date: "July 12, 2025",
  },
  {
    slug: "navigating-lagos-financing-options",
    title: "Navigating Lagos Real Estate Financing Options in 2025",
    excerpt:
      "A comprehensive guide to the latest financing products, interest rates, and mortgage tips that can help you secure your dream home or investment property in Lagos.",
    image: "/images/blog-3.png",
    date: "August 20, 2025",
  },
  {
    slug: "is-now-the-right-time-to-invest-in-lagos-real-estate-2",
    title: "Is Now the Right Time to Invest in Lagos Real Estate?",
    excerpt:
      "Lagos's real estate market continues to evolve. Our experts weigh in on current trends, emerging hot spots, and whether 2025 is the ideal year for you to make a strategic investment in the city's vibrant property landscape.",
    image: "/images/blog-1.png",
    date: "June 6, 2025",
  },
  {
    slug: "rise-of-eco-friendly-developments-in-abuja-2",
    title: "The Rise of Eco-Friendly Developments in Abuja Real Estate Sector",
    excerpt:
      "Discover how sustainability is shaping Abuja's property market, with new green-certified developments setting the standard for the future of urban living.",
    image: "/images/blog-2.png",
    date: "July 12, 2025",
  },
  {
    slug: "navigating-lagos-financing-options-2",
    title: "Navigating Lagos Real Estate Financing Options in 2025",
    excerpt:
      "A comprehensive guide to the latest financing products, interest rates, and mortgage tips that can help you secure your dream home or investment property in Lagos.",
    image: "/images/blog-3.png",
    date: "August 20, 2025",
  },
];

// Featured article date — just the date, no "RBS" prefix or divider line
function FeaturedDateBadge({ date }: { date: string }) {
  return (
    <span style={{ fontSize: "14px", lineHeight: "24px", fontWeight: 400, color: "#FFFFFF" }}>
      {date}
    </span>
  );
}

export default function BlogsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* HERO — Figma 769:88029: image bg + navbar + heading + realtor search at bottom */}
      <section className="bg-white">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-4 md:py-6">
          <div className="relative overflow-hidden bg-[#EBEBEB] rounded-[20px] md:rounded-[25px] min-h-[calc(100svh-32px)] md:min-h-[560px]">
            <div className="absolute inset-0 z-0">
              <Image src="/images/for-sale-hero.png" alt="" fill className="object-cover" priority />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.96) 7%, rgba(0,0,0,0.94) 13%, rgba(0,0,0,0.91) 18%, rgba(0,0,0,0.84) 32%, rgba(0,0,0,0.5) 69%, rgba(102,102,102,0) 100%)",
                  opacity: 0.65,
                }}
              />
            </div>

            <Navbar transparent />

            <div className="absolute inset-0 z-10 flex flex-col px-4 pt-[100px] pb-4 md:px-6 md:pt-[120px] md:pb-6">
              <div className="flex-1 flex items-center justify-center">
                <div className="w-[738px] max-w-full flex flex-col gap-2 md:gap-4 text-center">
                  <h1 className="text-white font-semibold text-[32px] leading-[48px] md:text-[44px] md:leading-[60px]" style={{ letterSpacing: "-0.02em" }}>
                    Redefining real estate ownership across Nigeria through integrity and exceptional delivery
                  </h1>
                  <p className="text-white text-[14px] leading-[24px] md:text-[16px] md:leading-[28px]" style={{ fontWeight: 400, letterSpacing: "-0.02em" }}>
                    As Nigeria&apos;s urban landscape expands rapidly, RentBuyStay establishes trust through
                    transparent property acquisition, verified listings, meticulous land checks, and
                    comprehensive post-sale support, ensuring a seamless and reliable journey for every
                    single client, investor, and prospective homeowner.
                  </p>
                </div>
              </div>
              <RealtorSearch className="w-full bg-white rounded-[12px] p-2 md:p-4" />
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT — Figma node 254:36886: 1440x1790, padding 80 top/bottom */}
      <section className="bg-white" style={{ paddingTop: "40px", paddingBottom: "80px" }}>
        <div className="max-w-[1440px] mx-auto px-4 md:px-[80px]">
          {/* Featured article — Figma: 1281x550, r=20, image bg with gradient overlay + bottom-left text */}
          <Link
            href={`/blogs/${featured.slug}`}
            className="relative block overflow-hidden group w-full h-[350px] md:h-[550px] rounded-[20px]"
          >
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              sizes="(max-width: 1440px) 100vw, 1281px"
              className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
              priority
            />
            {/* Gradient overlay — bottom fades to dark for legibility */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.4) 65%, rgba(0,0,0,0.85) 100%)",
              }}
            />
            {/* Text overlay bottom-left */}
            <div
              className="absolute left-0 right-0 bottom-0 flex flex-col text-white p-6 md:p-10"
              style={{ gap: "16px" }}
            >
              <FeaturedDateBadge date={featured.date} />
              <div className="flex flex-col" style={{ gap: "8px", maxWidth: "722px" }}>
                <h2
                  style={{
                    fontSize: "24px",
                    lineHeight: "40px",
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {featured.title}
                </h2>
                <p
                  style={{
                    fontSize: "15px",
                    lineHeight: "24px",
                    fontWeight: 400,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {featured.excerpt}
                </p>
              </div>
            </div>
          </Link>

          {/* Grid — 3 cols × 2 rows, gap 24 col / 40 row */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            style={{ gap: "40px 24px", marginTop: "40px" }}
          >
            {posts.map((p) => (
              <BlogCard key={p.slug} p={p} />
            ))}
          </div>
        </div>
      </section>

      <ListPropertyCTA />

      <Footer />
    </div>
  );
}

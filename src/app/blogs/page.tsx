import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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

function PostCard({ p }: { p: Post }) {
  return (
    <Link
      href={`/blogs/${p.slug}`}
      className="bg-white overflow-hidden flex flex-col group hover:shadow-md transition-shadow"
      style={{
        width: "411px",
        height: "500px",
        borderRadius: "20px",
      }}
    >
      <div className="relative shrink-0" style={{ width: "411px", height: "260px" }}>
        <Image src={p.image} alt={p.title} fill sizes="411px" style={{ objectFit: "cover" }} />
      </div>
      <div className="flex flex-col flex-1" style={{ padding: "24px", gap: "16px" }}>
        {/* Figma 268:37893 — smaller cards show ONLY the date, not "RBS | date" */}
        <span style={{ fontSize: "14px", lineHeight: "24px", fontWeight: 400, color: "#807E7E" }}>
          {p.date}
        </span>
        <div className="flex flex-col" style={{ gap: "8px", flex: 1 }}>
          <h3
            className="group-hover:text-[#305E82] transition-colors"
            style={{
              fontSize: "20px",
              lineHeight: "32px",
              fontWeight: 600,
              color: "#121212",
              letterSpacing: "-0.02em",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {p.title}
          </h3>
          <p
            style={{
              fontSize: "15px",
              lineHeight: "24px",
              fontWeight: 400,
              color: "#807E7E",
              letterSpacing: "-0.02em",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {p.excerpt}
          </p>
        </div>
        {/* Read more button — Figma: 103x40, r=12, transparent bg, #305E82 text + arrow */}
        <span
          className="inline-flex items-center group-hover:gap-3 transition-all"
          style={{
            gap: "8px",
            height: "40px",
            fontSize: "14px",
            lineHeight: "18px",
            fontWeight: 500,
            color: "#305E82",
            letterSpacing: "-0.02em",
          }}
        >
          Read more
          <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} />
        </span>
      </div>
    </Link>
  );
}

export default function BlogsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* CONTENT — Figma node 254:36886: 1440x1790, padding 80 top/bottom */}
      <section className="bg-white" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
        <div className="max-w-[1440px] mx-auto px-[80px]">
          {/* Featured article — Figma: 1281x550, r=20, image bg with gradient overlay + bottom-left text */}
          <Link
            href={`/blogs/${featured.slug}`}
            className="relative block overflow-hidden group"
            style={{ width: "100%", height: "550px", borderRadius: "20px" }}
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
              className="absolute left-0 right-0 bottom-0 flex flex-col text-white"
              style={{ padding: "40px", gap: "16px" }}
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
            className="grid mx-auto"
            style={{
              gridTemplateColumns: "repeat(3, 411px)",
              gap: "40px 24px",
              marginTop: "40px",
              justifyContent: "center",
            }}
          >
            {posts.map((p) => (
              <PostCard key={p.slug} p={p} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA — Figma node 254:37219 */}
      <section className="bg-white" style={{ padding: "24px" }}>
        <div
          className="relative overflow-hidden mx-auto flex flex-col items-center justify-center text-center"
          style={{
            maxWidth: "1392px",
            height: "464px",
            borderRadius: "20px",
            background: "linear-gradient(186deg, #75A3C7 0%, #305E82 100%)",
            padding: "0 80px",
          }}
        >
          <div className="flex flex-col" style={{ gap: "40px", maxWidth: "640px" }}>
            <div className="flex flex-col" style={{ gap: "16px" }}>
              <h2 className="text-white" style={{ fontSize: "48px", lineHeight: "64px", fontWeight: 600, letterSpacing: "-0.02em" }}>
                Ready to<br />List Your Property?
              </h2>
              <p className="text-white" style={{ fontSize: "18px", lineHeight: "32px", fontWeight: 400, letterSpacing: "-0.02em" }}>
                Join thousands of owners and agents on Nigeria&rsquo;s fastest-growing
                property platform. Get verified, list your property, and reach millions
                of seekers.
              </p>
            </div>
            <div className="flex items-center justify-center" style={{ gap: "16px" }}>
              <Link
                href="/post-property"
                className="flex items-center justify-center text-white rounded-[12px] hover:opacity-90 transition-opacity"
                style={{
                  height: "48px",
                  padding: "8px 24px",
                  fontSize: "14px",
                  fontWeight: 500,
                  background: "#FFAE00",
                  border: "1px solid rgba(120, 158, 187, 0.5)",
                  letterSpacing: "-0.02em",
                }}
              >
                Get Started Free
              </Link>
              <Link
                href="/login"
                className="flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                style={{
                  padding: "16px 32px",
                  fontSize: "14px",
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                }}
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ListPropertyCTA from "@/components/ListPropertyCTA";
import BlogCard from "@/components/BlogCard";
import Image from "next/image";

export const metadata = {
  title: "Navigating Lagos Property Titles | RentBuyStay",
  description: "What you need to know about property titles in Lagos.",
};

// Related posts — same as blog grid cards
const related = [
  {
    slug: "navigating-lagos-financing-options",
    title: "Navigating Lagos Real Estate Financing Options in 2025",
    excerpt:
      "A comprehensive guide to the latest financing products, interest rates, and mortgage tips that can help you secure your dream home or investment property in Lagos.",
    image: "/images/blog-3.png",
    date: "August 20, 2025",
  },
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
];

export default function BlogPostPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar variant="page" />

      {/* MAIN — Figma node 268:38037: 1440x2372, padding 80 top/bottom */}
      <section className="bg-white pt-10 md:pt-20 pb-20">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[80px]">
          {/* Hero image — Figma: 1280x600 desktop / 350 mobile, r=25 */}
          <div className="relative overflow-hidden w-full h-[350px] md:h-[600px] rounded-[20px] md:rounded-[25px]">
            <Image
              src="/images/blog-featured.png"
              alt="Navigating Lagos Property Titles"
              fill
              sizes="(max-width: 1440px) 100vw, 1280px"
              className="object-cover"
              priority
            />
          </div>

          {/* Article body + sidebar — Figma: 845 body + gap + 299 sidebar (stacks on mobile) */}
          <div className="flex flex-col lg:flex-row mt-8 md:mt-10 gap-10 lg:gap-[136px]">
            {/* Article content */}
            <article className="flex flex-col w-full lg:w-[845px]" style={{ gap: "40px" }}>
              <div className="flex flex-col" style={{ gap: "8px" }}>
                <h1
                  style={{
                    fontSize: "24px",
                    lineHeight: "40px",
                    fontWeight: 600,
                    color: "#121212",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Navigating Lagos Property Titles: What You Need to Know
                </h1>
                <span style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 400, color: "#807E7E" }}>
                  June 6, 2025
                </span>
              </div>

              <div
                className="text-[14px] leading-[32px] md:text-[18px] md:leading-[40px]"
                style={{
                  fontWeight: 400,
                  color: "#807E7E",
                  letterSpacing: "-0.02em",
                }}
              >
                <p style={{ marginBottom: "32px" }}>
                  The Nigerian real estate market offers unique avenues for growth, and we
                  are dedicated to helping you capitalize on them by providing data-driven
                  insights, identifying prime investment zones, managing high-performance
                  assets, and offering secure, reliable financial structuring that maximizes
                  your long-term returns and builds lasting generational wealth.
                </p>
                <p style={{ marginBottom: "32px" }}>
                  We understand that the path to homeownership in Nigeria can be complex,
                  and that is exactly why [Your Brand Name] streamlines the entire process,
                  offering a wide, vetted portfolio of diverse properties, introducing
                  flexible and innovative financing solutions, and providing expert legal
                  and logistical guidance to make your dream a practical reality for you
                  and your family.
                </p>
                <p style={{ marginBottom: "32px" }}>
                  As Nigeria&rsquo;s urban landscape expands rapidly, [Your Brand Name]
                  establishes trust through transparent property acquisition, verified
                  listings, meticulous land checks, and comprehensive post-sale support,
                  ensuring a seamless and reliable journey for every single client,
                  investor, and prospective homeowner.
                </p>
                <p>
                  The Nigerian real estate market offers unique avenues for growth, and we
                  are dedicated to helping you capitalize on them by providing data-driven
                  insights, identifying prime investment zones, managing high-performance
                  assets, and offering secure, reliable financial structuring that maximizes
                  your long-term returns and builds lasting generational wealth.
                </p>
              </div>
            </article>

            {/* Sidebar — Figma: 299x800, ADS banner placeholder (desktop only) */}
            <aside className="hidden lg:block" style={{ width: "299px" }}>
              <div
                className="flex flex-col items-center justify-between text-center"
                style={{
                  width: "299px",
                  height: "800px",
                  background: "#F4FBFF",
                  borderRadius: "12px",
                  padding: "40px 24px",
                }}
              >
                <span
                  style={{
                    fontSize: "16px",
                    lineHeight: "24px",
                    fontWeight: 400,
                    color: "#807E7E",
                  }}
                >
                  Size: 00 x 00px
                </span>
                <span
                  style={{
                    fontSize: "32px",
                    lineHeight: "40px",
                    fontWeight: 700,
                    color: "#305E82",
                    letterSpacing: "-0.02em",
                    textAlign: "center",
                  }}
                >
                  ADS Banner
                  <br />
                  here
                </span>
                <span
                  style={{
                    fontSize: "16px",
                    lineHeight: "24px",
                    fontWeight: 400,
                    color: "#807E7E",
                  }}
                >
                  Size: 00 x 00px
                </span>
              </div>
            </aside>
          </div>

          {/* Read More section — Figma: 1282x612, heading + 3 related cards */}
          <div className="flex flex-col mt-12 md:mt-20" style={{ gap: "24px" }}>
            <div className="flex flex-col" style={{ gap: "8px" }}>
              <h2
                className="text-[20px] leading-[28px] md:text-[24px] md:leading-[32px]"
                style={{
                  fontWeight: 600,
                  color: "#121212",
                  letterSpacing: "-0.02em",
                }}
              >
                Read More
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  lineHeight: "24px",
                  fontWeight: 400,
                  color: "#807E7E",
                  letterSpacing: "-0.02em",
                }}
              >
                Gain more insights on real estate market and rising developments with RentBuyStay.
              </p>
            </div>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full"
              style={{ gap: "24px" }}
            >
              {related.map((p) => (
                <BlogCard key={p.slug} p={p} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <ListPropertyCTA />

      <Footer />
    </div>
  );
}

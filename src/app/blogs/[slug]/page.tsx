import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

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

function RelatedCard({ p }: { p: (typeof related)[number] }) {
  return (
    <Link
      href={`/blogs/${p.slug}`}
      className="bg-white overflow-hidden flex flex-col group hover:shadow-md transition-shadow"
      style={{ width: "411px", height: "500px", borderRadius: "20px" }}
    >
      <div className="relative shrink-0" style={{ width: "411px", height: "260px" }}>
        <Image src={p.image} alt={p.title} fill sizes="411px" style={{ objectFit: "cover" }} />
      </div>
      <div className="flex flex-col flex-1" style={{ padding: "24px", gap: "16px" }}>
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

export default function BlogPostPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* MAIN — Figma node 268:38037: 1440x2372, padding 80 top/bottom */}
      <section className="bg-white" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
        <div className="max-w-[1440px] mx-auto px-[80px]">
          {/* Hero image — Figma: 1280x600, r=25 */}
          <div
            className="relative overflow-hidden"
            style={{ width: "100%", height: "600px", borderRadius: "25px" }}
          >
            <Image
              src="/images/blog-featured.png"
              alt="Navigating Lagos Property Titles"
              fill
              sizes="(max-width: 1440px) 100vw, 1280px"
              className="object-cover"
              priority
            />
          </div>

          {/* Article body + sidebar — Figma: 845 body + gap + 299 sidebar */}
          <div className="flex" style={{ marginTop: "40px", gap: "136px" }}>
            {/* Article content */}
            <article className="flex flex-col" style={{ width: "845px", gap: "40px" }}>
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
                style={{
                  fontSize: "18px",
                  lineHeight: "40px",
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

            {/* Sidebar — Figma: 299x800, ADS banner placeholder */}
            <aside style={{ width: "299px" }}>
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
          <div className="flex flex-col" style={{ marginTop: "80px", gap: "24px" }}>
            <div className="flex flex-col" style={{ gap: "8px" }}>
              <h2
                style={{
                  fontSize: "24px",
                  lineHeight: "32px",
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
              className="grid mx-auto"
              style={{
                gridTemplateColumns: "repeat(3, 411px)",
                gap: "24px",
                justifyContent: "center",
                width: "100%",
              }}
            >
              {related.map((p) => (
                <RelatedCard key={p.slug} p={p} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
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

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ListPropertyCTA from "@/components/ListPropertyCTA";
import RealtorSearch from "@/components/RealtorSearch";
import BlogCard from "@/components/BlogCard";
import Image from "next/image";
import Link from "next/link";
import { getBlogPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog | RentBuyStay",
  description: "Real estate insights, guides and market reports across Nigeria.",
};

// Cached page, refreshed hourly as a safety net. The admin invalidates the
// "blog" cache tag on publish/edit/delete (see /api/revalidate), so new posts
// appear instantly without waiting for the hourly window.
export const revalidate = 3600;

// Featured article date — just the date, no "RBS" prefix or divider line
function FeaturedDateBadge({ date }: { date: string }) {
  return (
    <span style={{ fontSize: "14px", lineHeight: "24px", fontWeight: 400, color: "#FFFFFF" }}>
      {date}
    </span>
  );
}

export default async function BlogsPage() {
  const all = await getBlogPosts(12);
  const featured = all[0];
  const posts = all.slice(1, 7);
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* HERO — Figma 769:88029: image bg + navbar + heading + realtor search at bottom */}
      <section className="bg-white">
        <div className="w-full px-4 md:px-6 py-4 md:py-6">
          <div className="relative overflow-hidden bg-[#EBEBEB] rounded-[20px] md:rounded-[25px] min-h-[calc(100svh-32px)] md:min-h-[calc(100svh-48px)]">
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

            <Navbar variant="hero" />

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
          {!featured ? (
            <p style={{ fontSize: "16px", lineHeight: "28px", color: "#807E7E", textAlign: "center", padding: "40px 0" }}>
              No articles published yet. Check back soon for insights, guides and market reports.
            </p>
          ) : (
          <>
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
          </>
          )}
        </div>
      </section>

      <ListPropertyCTA />

      <Footer />
    </div>
  );
}

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ListPropertyCTA from "@/components/ListPropertyCTA";
import BlogCard from "@/components/BlogCard";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getBlogPost, getBlogPosts } from "@/lib/blog";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  return {
    title: post ? `${post.title} | RentBuyStay` : "Blog | RentBuyStay",
    description: post?.excerpt ?? "Real estate insights, guides and market reports across Nigeria.",
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();
  const related = (await getBlogPosts(6)).filter((p) => p.slug !== slug).slice(0, 3);
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar variant="page" />

      {/* MAIN — Figma node 268:38037: 1440x2372, padding 80 top/bottom */}
      <section className="bg-white pt-10 md:pt-20 pb-20">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[80px]">
          {/* Hero image — Figma: 1280x600 desktop / 350 mobile, r=25 */}
          <div className="relative overflow-hidden w-full h-[350px] md:h-[600px] rounded-[20px] md:rounded-[25px]">
            <Image
              src={post.image}
              alt={post.title}
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
                  {post.title}
                </h1>
                <span style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 400, color: "#807E7E" }}>
                  {post.date}
                </span>
              </div>

              <div
                className="blog-body text-[14px] leading-[32px] md:text-[18px] md:leading-[40px] [&_p]:mb-8 [&_h2]:text-[#121212] [&_h2]:font-semibold [&_h3]:text-[#121212] [&_h3]:font-semibold [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_a]:text-[#305E82] [&_a]:underline"
                style={{
                  fontWeight: 400,
                  color: "#807E7E",
                  letterSpacing: "-0.02em",
                }}
                dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
              />
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

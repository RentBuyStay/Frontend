import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlacementCards from "@/components/PlacementCards";
import ListPropertyCTA from "@/components/ListPropertyCTA";
import Image from "next/image";

export const metadata = {
  title: "Place Banner Ad | RentBuyStay",
  description:
    "Reach millions with a strategic media placement on RentBuyStay. Choose from 8 placement options tailored to your campaign.",
};

export default function PlaceBannerAdPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* HERO — Figma 769:81209 (mobile) / 218:27209 (desktop): image bg + transparent navbar + heading.
          NOTE: the Figma mobile hero frame carries shortlet placeholder copy + a property search; the
          real banner-ad hero is the media-placement heading (no search), kept here and made responsive. */}
      <section className="bg-white p-4 md:p-6">
        <div className="relative overflow-hidden bg-[#EBEBEB] rounded-[20px] md:rounded-[25px] h-[520px] md:h-[852px]">
          <Image
            src="/images/banner-ad-hero.png"
            alt="Reach millions with a media placement"
            fill
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0 z-[1]"
            style={{
              background:
                "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.96) 7%, rgba(0,0,0,0.94) 13%, rgba(0,0,0,0.91) 18%, rgba(0,0,0,0.84) 32%, rgba(0,0,0,0.5) 69%, rgba(102,102,102,0) 100%)",
              opacity: 0.65,
            }}
          />

          <Navbar transparent />

          <div
            className="absolute left-1/2 -translate-x-1/2 z-10 text-center flex flex-col top-[120px] md:top-[250px] gap-2 md:gap-4"
            style={{ width: "738px", maxWidth: "calc(100% - 32px)" }}
          >
            <h1
              className="text-white text-[32px] leading-[40px] md:text-[64px] md:leading-[80px]"
              style={{ fontWeight: 600, letterSpacing: "-0.02em" }}
            >
              Reach Millions with a Media Placement on RentBuyStay
            </h1>
            <p
              className="text-white mx-auto text-[14px] leading-[24px] md:text-[18px] md:leading-[32px]"
              style={{ fontWeight: 400, letterSpacing: "-0.02em", maxWidth: "735px" }}
            >
              Position your brand at the forefront of the digital landscape with high-impact
              media placements that bridge the gap between your products and millions of
              motivated users across every sector and industry imaginable.
            </p>
          </div>
        </div>
      </section>

      {/* CARDS — Figma 769:81774: intro text + placement cards */}
      <section className="bg-white">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[80px] py-12 md:py-20">
          <p
            className="mx-auto text-center text-[14px] leading-[24px] md:text-[18px] md:leading-[32px]"
            style={{
              maxWidth: "735px",
              fontWeight: 400,
              color: "#121212",
              letterSpacing: "-0.02em",
            }}
          >
            Select a strategic media placement option and take note of the technical
            requirement for each ad placement below to get started and reach your
            audience on RentBuyStay.
          </p>
          <PlacementCards />
        </div>
      </section>

      <ListPropertyCTA />

      <Footer />
    </div>
  );
}

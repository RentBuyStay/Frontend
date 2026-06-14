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
      {/* HERO — Figma node 218:27209: 1440x900, inset 24px card, transparent navbar */}
      <section className="bg-white p-6">
        <div
          className="relative overflow-hidden bg-[#F3FEFE]"
          style={{ borderRadius: "25px", height: "852px" }}
        >
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
            className="absolute left-1/2 -translate-x-1/2 z-10 text-center flex flex-col"
            style={{
              top: "250px",
              width: "738px",
              maxWidth: "calc(100% - 48px)",
              gap: "16px",
            }}
          >
            <h1
              className="text-white"
              style={{
                fontSize: "64px",
                lineHeight: "80px",
                fontWeight: 600,
                letterSpacing: "-0.02em",
              }}
            >
              Reach Millions with a Media Placement on RentBuyStay
            </h1>
            <p
              className="text-white mx-auto"
              style={{
                fontSize: "18px",
                lineHeight: "32px",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                maxWidth: "735px",
              }}
            >
              Position your brand at the forefront of the digital landscape with high-impact
              media placements that bridge the gap between your products and millions of
              motivated users across every sector and industry imaginable.
            </p>
          </div>
        </div>
      </section>

      {/* CARDS — Figma node 218:26231: 1440x1663, padding 80 top/bottom */}
      <section className="bg-white" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
        <div className="max-w-[1440px] mx-auto px-[80px]">
          <p
            className="mx-auto text-center"
            style={{
              maxWidth: "735px",
              fontSize: "18px",
              lineHeight: "32px",
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

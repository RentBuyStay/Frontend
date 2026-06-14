import Footer from "@/components/Footer";
import ListingHero from "@/components/ListingHero";
import PlacementCards from "@/components/PlacementCards";
import ListPropertyCTA from "@/components/ListPropertyCTA";

export const metadata = {
  title: "Place Banner Ad | RentBuyStay",
  description:
    "Reach millions with a strategic media placement on RentBuyStay. Choose from 8 placement options tailored to your campaign.",
};

export default function PlaceBannerAdPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* HERO — Figma 769:81209: full-viewport image hero with navbar + heading + search at bottom
          (same hero as the listing pages, with the banner-ad heading) */}
      <ListingHero
        image="/images/banner-ad-hero.png"
        imageAlt="Reach millions with a media placement"
        heading="Reach Millions with a Media Placement on RentBuyStay"
        subtitle="Position your brand at the forefront of the digital landscape with high-impact media placements that bridge the gap between your products and millions of motivated users across every sector and industry imaginable."
        defaultTab="Rent"
        showSearch={false}
      />

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

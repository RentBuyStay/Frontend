import { Suspense } from "react";
import Footer from "@/components/Footer";
import ListPropertyCTA from "@/components/ListPropertyCTA";
import ListingSidebar from "@/components/ListingSidebar";
import ListingHero from "@/components/ListingHero";
import ListingResults from "@/components/ListingResults";

export const metadata = {
  title: "Properties for Sale in Nigeria | RentBuyStay",
  description: "Browse thousands of verified properties for sale across Nigeria.",
};

// Sidebar data — Figma exact text (static reference content)
const propertyTypes = [
  { name: "Flats/Apartments", count: 5032 },
  { name: "House", count: 5032 },
  { name: "Commercial Property", count: 5032 },
  { name: "Co-working Space", count: 5032 },
  { name: "Land", count: 5032 },
];

const bedroomTable = {
  cols: ["Type", "1 Bed", "2 Bed", "3 Bed", "4 Bed", "5 Bed"],
  rows: [
    ["Flats", "406", "307", "228", "96", "386"],
    ["Houses", "192", "2081", "3872", "13181", "2059"],
  ],
};

const states = ["Lagos", "Abuja", "Oyo", "Ogun", "Enugu", "Edo", "Rivers", "Delta", "Akwa Ibom", "Ondo", "Imo", "Kaduna", "Anambra", "Osun", "Abia", "Nassarawa", "Kwara", "Plateau", "Ebonyi", "Bayelsa", "Benue", "Cross River", "Ekiti", "Bauchi", "Kogi", "Adamawa", "Niger"];

const otherCategories = [
  "Serviced Properties for sale",
  "Furnished Properties for sale",
  "Newly Built Properties for sale",
  "Cheap Properties for sale",
  "Luxury Properties for sale",
  "Property for sale between 20milion and 40milion",
  "Property for sale between 40milion and 60milion",
  "Property for sale between 60milion and 80milion",
  "Property for sale between 80milion and 100milion",
  "Property for sale between 100milion and 120milion",
  "Property for sale between 120milion and 150milion",
];

export default function ForSalePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* ── HERO ── */}
      <ListingHero
        image="/images/for-sale-hero.png"
        imageAlt="Properties for Sale"
        headingSuffix="Sale"
        defaultTab="Buy"
        subtitle="The properties have been listed by verified estate agents who can be contacted using the contact information provided for each property listing. We have {count} available flats, houses, land and commercial property for sale in Nigeria. Refine your property search by price, number of beds and type of property, etc."
      />

      {/* ── LISTINGS + SIDEBAR ── */}
      <section className="bg-white">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[80px] py-10 md:py-[60px]">

          {/* 2-column layout: flexible listings + fixed 411 sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_411px] gap-6">

            {/* LEFT column: live results from GET /properties (BUY) */}
            <Suspense fallback={<div className="min-w-0" />}>
              <ListingResults
                listingType="BUY"
                tag="For Sale"
                title="All Properties for Sale in Nigeria"
              />
            </Suspense>

            <ListingSidebar
              category="Sale"
              propertyTypes={propertyTypes}
              bedroomTable={bedroomTable}
              states={states}
              otherCategories={otherCategories}
            />
          </div>
        </div>
      </section>

      <ListPropertyCTA />

      <Footer />
    </div>
  );
}

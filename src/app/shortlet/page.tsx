import { Suspense } from "react";
import Footer from "@/components/Footer";
import ListPropertyCTA from "@/components/ListPropertyCTA";
import ListingSidebar from "@/components/ListingSidebar";
import ListingHero from "@/components/ListingHero";
import ListingResults from "@/components/ListingResults";

export const metadata = {
  title: "Shortlet Apartments in Nigeria | RentBuyStay",
  description: "Book verified shortlet apartments across Nigeria for short stays.",
};

const propertyTypes = [
  { name: "Apartments", count: 5032 },
  { name: "Studios", count: 5032 },
  { name: "Penthouses", count: 5032 },
  { name: "Villas", count: 5032 },
  { name: "Lofts", count: 5032 },
];

const bedroomTable = {
  cols: ["Type", "1 Bed", "2 Bed", "3 Bed", "4 Bed", "5 Bed"],
  rows: [
    ["Apartments", "806", "907", "428", "126", "86"],
    ["Studios", "292", "—", "—", "—", "—"],
  ],
};

const states = ["Lagos", "Abuja", "Oyo", "Ogun", "Enugu", "Edo", "Rivers", "Delta", "Akwa Ibom", "Ondo", "Imo", "Kaduna", "Anambra", "Osun", "Abia", "Nassarawa", "Kwara", "Plateau", "Ebonyi", "Bayelsa", "Benue", "Cross River", "Ekiti", "Bauchi", "Kogi", "Adamawa", "Niger"];

const otherCategories = [
  "Serviced Shortlets",
  "Furnished Shortlets",
  "Newly Built Shortlets",
  "Cheap Shortlets",
  "Luxury Shortlets",
  "Shortlets between 50k and 100k per night",
  "Shortlets between 100k and 200k per night",
  "Shortlets between 200k and 300k per night",
  "Shortlets between 300k and 500k per night",
  "Shortlets above 500k per night",
];

export default function ShortletPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* HERO */}
      <ListingHero
        image="/images/shortlet-hero.png"
        imageAlt="Shortlet Apartments"
        headingSuffix="Shortlet"
        defaultTab="Shortlet"
        subtitle="The properties have been listed by verified estate agents who can be contacted using the contact information provided for each property listing. We have {count} available flats, houses, and commercial property for shortlet in Nigeria. Refine your property search by price, number of beds and type of property, etc."
      />

      {/* LISTINGS + SIDEBAR */}
      <section className="bg-white">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[80px] py-10 md:py-[60px]">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_411px] gap-6">

            {/* LEFT: live results from GET /properties (SHORTLET) */}
            <Suspense fallback={<div className="min-w-0" />}>
              <ListingResults
                listingType="SHORTLET"
                tag="Shortlet"
                title="All Properties for Shortlet in Nigeria"
              />
            </Suspense>

            {/* SIDEBAR */}
            <ListingSidebar
              category="Shortlet"
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

import { Suspense } from "react";
import Footer from "@/components/Footer";
import ListPropertyCTA from "@/components/ListPropertyCTA";
import ListingSidebar from "@/components/ListingSidebar";
import ListingHero from "@/components/ListingHero";
import ListingResults from "@/components/ListingResults";

export const metadata = {
  title: "Properties for Rent in Nigeria | RentBuyStay",
  description: "Browse verified rental properties across Nigeria.",
};

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
  "Serviced Properties for rent",
  "Furnished Properties for rent",
  "Newly Built Properties for rent",
  "Cheap Properties for rent",
  "Luxury Properties for rent",
  "Property for rent between 500k and 1milion",
  "Property for rent between 1milion and 2milion",
  "Property for rent between 2milion and 5milion",
  "Property for rent between 5milion and 10milion",
  "Property for rent between 10milion and 20milion",
  "Property for rent above 20milion",
];

const verifiedAgents = [
  { name: "Olaitan Badejo", initials: "OB", agency: "Prime Realty & Co.", location: "Lagos", listings: 13, rating: 4.6 },
  { name: "Lade Oyetola", initials: "LO", agency: "Propex", location: "Lagos", listings: 8, rating: 4.3, avatar: "/images/agent-6.png" },
];

export default function ForRentPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* HERO */}
      <ListingHero
        image="/images/for-rent-hero.png"
        imageAlt="Properties for Rent"
        headingSuffix="Rent"
        defaultTab="Rent"
        subtitle="The properties have been listed by verified estate agents who can be contacted using the contact information provided for each property listing. We have 25,141 available flats, houses, and commercial property for rent in Nigeria. Refine your property search by price, number of beds and type of property, etc."
      />

      {/* LISTINGS + SIDEBAR */}
      <section className="bg-white">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[80px] py-10 md:py-[60px]">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_411px] gap-6">

            {/* LEFT: live results from GET /properties (RENT) */}
            <Suspense fallback={<div className="min-w-0" />}>
              <ListingResults
                listingType="RENT"
                tag="For Rent"
                title="All Properties for Rent in Nigeria"
              />
            </Suspense>

            {/* SIDEBAR */}
            <ListingSidebar
              category="Rent"
              propertyTypes={propertyTypes}
              bedroomTable={bedroomTable}
              states={states}
              otherCategories={otherCategories}
              verifiedAgents={verifiedAgents}
            />
          </div>
        </div>
      </section>

      <ListPropertyCTA />

      <Footer />
    </div>
  );
}

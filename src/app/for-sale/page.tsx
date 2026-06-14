import Footer from "@/components/Footer";
import Pagination from "@/components/Pagination";
import ListPropertyCTA from "@/components/ListPropertyCTA";
import ListingCard from "@/components/ListingCard";
import ListingSidebar from "@/components/ListingSidebar";
import ListingHero from "@/components/ListingHero";
import ListingsHeader from "@/components/ListingsHeader";

export const metadata = {
  title: "Properties for Sale in Nigeria | RentBuyStay",
  description: "Browse thousands of verified properties for sale across Nigeria.",
};

// Mock listings — Figma shows ~10 cards in main column
const listings = [
  { id: "1", title: "Luxury 4 Bedroom Detached Duplex", price: "₦87,000,000", location: "Lekki Phase 1, Lagos", date: "Listed on 27 Mar 2026", image: "/images/prop4.jpg", desc: "A very beautiful 4 bedroom duplex with state-of-the-earth facilities located in a serene estate in Lekki Phase 1, Lagos for Sale at a reasonable price.", agent: "Chioma Okeke", agentInitials: "CO", tags: ["Newly Built", "C of O", "Only on RentBuyStay"], beds: 4, baths: 5, area: "3,500 sqft" },
  { id: "2", title: "Modern 3 Bedroom Penthouse Suite", price: "₦120,000,000", location: "Ikoyi, Lagos", date: "Listed on 27 Mar 2026", image: "/images/prop2.jpg", desc: "Elegant penthouse with panoramic views, premium finishes, and top-tier amenities in the heart of Ikoyi, ideal for luxury living or investment.", agent: "Emeka Nwosu", agentInitials: "EN", tags: ["Brand New", "Deed of Assignment", "24/7 Security"], beds: 3, baths: 4, area: "2,800 sqft" },
  { id: "3", title: "Cozy 2 Bedroom Apartment", price: "₦18,000,000", location: "Yaba, Lagos", date: "Listed on 22 Apr 2026", image: "/images/prop1.jpg", desc: "Comfortable 2 bedroom apartment perfect for small families or professionals, located near public transport and shopping centers.", agent: "Tunde Bello", agentInitials: "TB", tags: ["Governor's Consent", "24/7 Security", "0-3 Years"], beds: 2, baths: 2, area: "950 sqft" },
  { id: "4", title: "Spacious 5 Bedroom Mansion", price: "₦350,000,000", location: "Banana Island, Lagos", date: "Listed on 15 Apr 2026", image: "/images/prop5.jpg", desc: "Magnificent 5 bedroom mansion with a private pool, gym, and landscaped garden in the exclusive Banana Island community.", agent: "Aisha Bello", agentInitials: "AB", tags: ["Newly Renovated", "Certificate of Occupancy", "Gated Community"], beds: 5, baths: 6, area: "5,200 sqft" },
  { id: "5", title: "Elegant 3 Bedroom Townhouse", price: "₦90,000,000", location: "Victoria Island, Lagos", date: "Listed on 10 May 2026", image: "/images/prop3.jpg", desc: "Stylish townhouse with modern interiors, fitted kitchen, and spacious living areas near business districts.", agent: "Chinaza Okafor", agentInitials: "CO", tags: ["Newly Built", "Deed of Assignment", "24/7 Security"], beds: 3, baths: 3, area: "2,100 sqft" },
  { id: "6", title: "Charming 1 Bedroom Studio", price: "₦7,500,000", location: "Surulere, Lagos", date: "Listed on 03 May 2026", image: "/images/prop1.jpg", desc: "Perfectly sized studio apartment with simple design for singles or students, close to amenities and transport.", agent: "Kemi Adeyemi", agentInitials: "KA", tags: ["Well Maintained", "Security Post", "4-7 Years"], beds: 1, baths: 1, area: "650 sqft" },
  { id: "7", title: "Luxurious 6 Bedroom Villa", price: "₦430,000,000", location: "Asokoro, Abuja", date: "Listed on 02 May 2026", image: "/images/prop5.jpg", desc: "Expansive villa featuring smart-home technology, indoor and outdoor entertainment spaces, and a private pool.", agent: "Olumide Fashola", agentInitials: "OF", tags: ["Newly Built", "Certificate of Occupancy", "Gated Community"], beds: 6, baths: 7, area: "6,500 sqft" },
  { id: "8", title: "Affordable 2 Bedroom Flat", price: "₦15,000,000", location: "Kubwa, Abuja", date: "Listed on 01 May 2026", image: "/images/prop1.jpg", desc: "Practical and affordable flat ideal for first-time buyers or investors, situated in a thriving residential area.", agent: "Funmi Adebayo", agentInitials: "FA", tags: ["Well Maintained", "Governor's Consent", "4-5 Years"], beds: 2, baths: 2, area: "850 sqft" },
  { id: "9", title: "Contemporary 3 Bedroom Flat", price: "₦55,000,000", location: "Ajah, Lagos", date: "Listed on 29 Apr 2026", image: "/images/prop2.jpg", desc: "Modern flat with open-plan living, balconies, and views and access to swimming pool and gym facilities.", agent: "Ibrahim Musa", agentInitials: "IM", tags: ["Brand New", "Deed of Assignment", "24/7 Security"], beds: 3, baths: 3, area: "1,800 sqft" },
  { id: "10", title: "Family 4 Bedroom Semi-Detached", price: "₦95,000,000", location: "Magodo, Lagos", date: "Listed on 26 Apr 2026", image: "/images/prop4.jpg", desc: "Spacious family home in serene neighbourhood with attached BQ, parking for 4 cars, and large compound.", agent: "Ngozi Okoro", agentInitials: "NO", tags: ["Newly Built", "C of O", "Gated Estate"], beds: 4, baths: 4, area: "3,200 sqft" },
];

// Sidebar data — Figma exact text
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

const verifiedAgents = [
  { name: "Olaitan Badejo", initials: "OB", agency: "Prime Realty & Co.", location: "Lagos", listings: 13 },
  { name: "Lade Oyetola", initials: "LO", agency: "Propex", location: "Lagos", listings: 8, avatar: "/images/agent-6.png" },
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
        subtitle="The properties have been listed by verified estate agents who can be contacted using the contact information provided for each property listing. We have 21,141 available flats, houses, land and commercial property for sale in Nigeria. Refine your property search by price, number of beds and type of property, etc."
      />

      {/* ── LISTINGS + SIDEBAR ── */}
      <section className="bg-white">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[80px] py-10 md:py-[60px]">

          {/* 2-column layout: flexible listings + fixed 411 sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_411px] gap-6">

            {/* LEFT column: header + listings */}
            <div className="flex flex-col gap-6 min-w-0">
              <ListingsHeader
                title="All Properties for Sale in Nigeria"
                count="Showing 1 - 10 of 37"
              />

              {/* Listings cards */}
              <div className="flex flex-col gap-6">
              {listings.map((p) => (
                <ListingCard key={p.id} listing={p} tag="For Sale" />
              ))}

              </div>{/* end listings cards wrapper */}

              {/* Pagination — Figma exact */}
              <div className="mt-6">
                <Pagination current={1} />
              </div>
            </div>{/* end LEFT column wrapper */}

            <ListingSidebar
              category="Sale"
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

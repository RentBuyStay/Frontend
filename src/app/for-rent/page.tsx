import Footer from "@/components/Footer";
import Pagination from "@/components/Pagination";
import ListPropertyCTA from "@/components/ListPropertyCTA";
import ListingCard from "@/components/ListingCard";
import ListingSidebar from "@/components/ListingSidebar";
import ListingHero from "@/components/ListingHero";

export const metadata = {
  title: "Properties for Rent in Nigeria | RentBuyStay",
  description: "Browse verified rental properties across Nigeria.",
};

const listings = [
  { id: "1", title: "Furnished 2 Bedroom Flat", price: "₦800,000/yr", location: "Wuse 2, Abuja", date: "Listed on 27 Mar 2026", image: "/images/prop1.jpg", desc: "Beautifully furnished 2 bedroom flat in a serene Wuse 2 neighbourhood with 24/7 power and parking space.", agent: "Tunde Bello", agentInitials: "TB", tags: ["Furnished", "Newly Built", "24/7 Power"], beds: 2, baths: 2, area: "1,200 sqft" },
  { id: "2", title: "Executive 3 Bedroom Terrace", price: "₦1,200,000/yr", location: "Ikeja GRA, Lagos", date: "Listed on 27 Mar 2026", image: "/images/prop3.jpg", desc: "Modern 3 bedroom terrace with fitted kitchen, en-suite bedrooms, and dedicated parking in Ikeja GRA.", agent: "Ngozi Eze", agentInitials: "NE", tags: ["Newly Built", "BIQ", "Gated Estate"], beds: 3, baths: 3, area: "1,800 sqft" },
  { id: "3", title: "Brand New 2 Bedroom Flat", price: "₦600,000/yr", location: "Surulere, Lagos", date: "Listed on 22 Apr 2026", image: "/images/prop1.jpg", desc: "Brand new 2 bedroom flat with modern fittings, located in a quiet street with easy access to public transport.", agent: "Ibrahim Musa", agentInitials: "IM", tags: ["Brand New", "Pop Ceiling", "Tiled Floors"], beds: 2, baths: 2, area: "900 sqft" },
  { id: "4", title: "Spacious 4 Bedroom Duplex", price: "₦4,500,000/yr", location: "Lekki Phase 1, Lagos", date: "Listed on 15 Apr 2026", image: "/images/prop4.jpg", desc: "Stunning 4 bedroom duplex with private compound, BQ, and modern finishes throughout.", agent: "Aisha Bello", agentInitials: "AB", tags: ["Newly Built", "BIQ", "24/7 Security"], beds: 4, baths: 5, area: "3,500 sqft" },
  { id: "5", title: "Modern 1 Bedroom Studio", price: "₦450,000/yr", location: "Yaba, Lagos", date: "Listed on 10 May 2026", image: "/images/prop1.jpg", desc: "Compact studio apartment perfect for young professionals, close to tech hubs and entertainment.", agent: "Chinaza Okafor", agentInitials: "CO", tags: ["Furnished", "24/7 Power", "Wi-Fi Included"], beds: 1, baths: 1, area: "550 sqft" },
  { id: "6", title: "Family 4 Bedroom Bungalow", price: "₦2,800,000/yr", location: "Magodo, Lagos", date: "Listed on 03 May 2026", image: "/images/prop4.jpg", desc: "Family-friendly bungalow with large compound, ideal for families with children, in a secure neighbourhood.", agent: "Kemi Adeyemi", agentInitials: "KA", tags: ["Family Home", "Gated Estate", "Parking"], beds: 4, baths: 3, area: "2,800 sqft" },
  { id: "7", title: "Luxurious 5 Bedroom Mansion", price: "₦8,000,000/yr", location: "Maitama, Abuja", date: "Listed on 02 May 2026", image: "/images/prop5.jpg", desc: "Magnificent mansion with smart-home features, swimming pool, and private gym for the discerning tenant.", agent: "Olumide Fashola", agentInitials: "OF", tags: ["Luxury", "Pool", "Smart Home"], beds: 5, baths: 6, area: "5,500 sqft" },
  { id: "8", title: "Affordable 3 Bedroom Flat", price: "₦950,000/yr", location: "Egbeda, Lagos", date: "Listed on 01 May 2026", image: "/images/prop2.jpg", desc: "Cost-effective 3 bedroom flat in a developing area with all standard amenities and easy commute.", agent: "Funmi Adebayo", agentInitials: "FA", tags: ["Spacious", "Tiled Floors", "0-3 Years"], beds: 3, baths: 2, area: "1,500 sqft" },
  { id: "9", title: "Contemporary 2 Bedroom Apartment", price: "₦1,500,000/yr", location: "Victoria Island, Lagos", date: "Listed on 29 Apr 2026", image: "/images/prop2.jpg", desc: "Modern apartment with stunning views, fitted kitchen, and access to building amenities like gym and pool.", agent: "Emeka Nwosu", agentInitials: "EN", tags: ["Furnished", "Sea View", "24/7 Concierge"], beds: 2, baths: 2, area: "1,400 sqft" },
  { id: "10", title: "Cozy 3 Bedroom Penthouse", price: "₦5,500,000/yr", location: "Ikoyi, Lagos", date: "Listed on 26 Apr 2026", image: "/images/prop3.jpg", desc: "Top-floor penthouse with panoramic city views, modern interiors, and rooftop access for entertainment.", agent: "Ngozi Okoro", agentInitials: "NO", tags: ["Furnished", "Penthouse", "Rooftop"], beds: 3, baths: 3, area: "2,200 sqft" },
];

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

            {/* LEFT */}
            <div className="flex flex-col gap-6 min-w-0">
              <div className="flex items-center justify-between">
                <div>
                  <h2 style={{ fontSize: "24px", lineHeight: "32px", fontWeight: 600, color: "#121212" }}>
                    All Properties for Rent in Nigeria
                  </h2>
                  <p style={{ fontSize: "14px", color: "#7f7e7e", marginTop: "4px" }}>
                    Showing 1 - 10 of 27
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: "14px", color: "#7f7e7e" }}>Sort</span>
                  <select className="px-4 py-2 border border-[#ededed] rounded-[8px] text-sm bg-white">
                    <option>Newest</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                {listings.map((p) => (
                  <ListingCard key={p.id} listing={p} tag="For Rent" />
                ))}
              </div>

              <div className="mt-6">
                <Pagination current={1} />
              </div>
            </div>

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

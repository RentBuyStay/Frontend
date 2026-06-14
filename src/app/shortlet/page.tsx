import Footer from "@/components/Footer";
import Pagination from "@/components/Pagination";
import ListPropertyCTA from "@/components/ListPropertyCTA";
import ListingCard from "@/components/ListingCard";
import ListingSidebar from "@/components/ListingSidebar";
import ListingHero from "@/components/ListingHero";
import ListingsHeader from "@/components/ListingsHeader";

export const metadata = {
  title: "Shortlet Apartments in Nigeria | RentBuyStay",
  description: "Book verified shortlet apartments across Nigeria for short stays.",
};

const listings = [
  { id: "1", title: "Luxury Studio Apartment", price: "₦150,000/night", location: "Victoria Island, Lagos", date: "Listed on 27 Mar 2026", image: "/images/prop1.jpg", desc: "Stylishly furnished studio with ocean views, modern amenities, and 24/7 concierge service in the heart of VI.", agent: "Kola Adeyemi", agentInitials: "KA", tags: ["Furnished", "Sea View", "24/7 Concierge"], beds: 1, baths: 1, area: "650 sqft" },
  { id: "2", title: "Executive 2 Bedroom Apartment", price: "₦220,000/night", location: "Ikoyi, Lagos", date: "Listed on 27 Mar 2026", image: "/images/prop2.jpg", desc: "Spacious 2 bedroom apartment with full kitchen, gym access, and pool — perfect for business travellers and families.", agent: "Emeka Nwosu", agentInitials: "EN", tags: ["Furnished", "Pool", "Gym"], beds: 2, baths: 2, area: "1,200 sqft" },
  { id: "3", title: "Cozy 1 Bedroom Loft", price: "₦95,000/night", location: "Yaba, Lagos", date: "Listed on 22 Apr 2026", image: "/images/prop1.jpg", desc: "Modern loft with industrial design, fully equipped kitchen, and Wi-Fi — ideal for digital nomads.", agent: "Tunde Bello", agentInitials: "TB", tags: ["Furnished", "Wi-Fi", "Workspace"], beds: 1, baths: 1, area: "750 sqft" },
  { id: "4", title: "Premium 3 Bedroom Penthouse", price: "₦450,000/night", location: "Banana Island, Lagos", date: "Listed on 15 Apr 2026", image: "/images/prop5.jpg", desc: "Top-floor penthouse with private terrace, jacuzzi, and stunning city views — ultimate luxury short stay.", agent: "Aisha Bello", agentInitials: "AB", tags: ["Penthouse", "Jacuzzi", "City View"], beds: 3, baths: 3, area: "2,800 sqft" },
  { id: "5", title: "Modern 1 Bedroom Suite", price: "₦80,000/night", location: "Lekki Phase 1, Lagos", date: "Listed on 10 May 2026", image: "/images/prop3.jpg", desc: "Compact and stylish suite perfect for short business trips, with everything needed for a comfortable stay.", agent: "Chinaza Okafor", agentInitials: "CO", tags: ["Furnished", "Smart TV", "Self Check-in"], beds: 1, baths: 1, area: "550 sqft" },
  { id: "6", title: "Family 4 Bedroom Villa", price: "₦580,000/night", location: "Maitama, Abuja", date: "Listed on 03 May 2026", image: "/images/prop5.jpg", desc: "Beautiful villa with private pool and garden, perfect for family vacations and special occasions.", agent: "Kemi Adeyemi", agentInitials: "KA", tags: ["Pool", "Garden", "Family Friendly"], beds: 4, baths: 4, area: "3,800 sqft" },
  { id: "7", title: "Charming 2 Bedroom Loft", price: "₦175,000/night", location: "Wuse 2, Abuja", date: "Listed on 02 May 2026", image: "/images/prop2.jpg", desc: "Centrally located loft with quick access to embassies and dining, ideal for business or leisure stays.", agent: "Olumide Fashola", agentInitials: "OF", tags: ["Furnished", "Central", "Fast Wi-Fi"], beds: 2, baths: 2, area: "1,100 sqft" },
  { id: "8", title: "Affordable Studio Apartment", price: "₦55,000/night", location: "Surulere, Lagos", date: "Listed on 01 May 2026", image: "/images/prop1.jpg", desc: "Budget-friendly studio in a quiet neighbourhood, perfect for solo travellers on a short visit.", agent: "Funmi Adebayo", agentInitials: "FA", tags: ["Budget", "Quiet Area", "Self Check-in"], beds: 1, baths: 1, area: "450 sqft" },
  { id: "9", title: "Beachfront 2 Bedroom Apartment", price: "₦320,000/night", location: "Eko Atlantic, Lagos", date: "Listed on 29 Apr 2026", image: "/images/prop2.jpg", desc: "Stunning beachfront apartment with direct access to the beach, fully furnished with modern amenities.", agent: "Ibrahim Musa", agentInitials: "IM", tags: ["Beachfront", "Furnished", "Pool"], beds: 2, baths: 2, area: "1,400 sqft" },
  { id: "10", title: "Boutique 1 Bedroom Studio", price: "₦120,000/night", location: "Ikeja GRA, Lagos", date: "Listed on 26 Apr 2026", image: "/images/prop3.jpg", desc: "Designer studio close to the airport, perfect for layovers and short business trips, with airport pickup.", agent: "Ngozi Okoro", agentInitials: "NO", tags: ["Near Airport", "Designer", "Airport Pickup"], beds: 1, baths: 1, area: "600 sqft" },
];

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

const verifiedAgents = [
  { name: "Olaitan Badejo", initials: "OB", agency: "Prime Realty & Co.", location: "Lagos", listings: 13, rating: 4.6 },
  { name: "Lade Oyetola", initials: "LO", agency: "Propex", location: "Lagos", listings: 8, rating: 4.3, avatar: "/images/agent-6.png" },
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
        subtitle="The properties have been listed by verified estate agents who can be contacted using the contact information provided for each property listing. We have 21,141 available flats, houses, and commercial property for shortlet in Nigeria. Refine your property search by price, number of beds and type of property, etc."
      />

      {/* LISTINGS + SIDEBAR */}
      <section className="bg-white">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[80px] py-10 md:py-[60px]">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_411px] gap-6">

            {/* LEFT */}
            <div className="flex flex-col gap-6 min-w-0">
              <ListingsHeader
                title="All Properties for Shortlet in Nigeria"
                count="Showing 1 - 10 of 37"
              />

              <div className="flex flex-col gap-6">
                {listings.map((p) => (
                  <ListingCard key={p.id} listing={p} tag="Shortlet" />
                ))}
              </div>

              <div className="mt-6">
                <Pagination current={1} />
              </div>
            </div>

            {/* SIDEBAR */}
            <ListingSidebar
              category="Shortlet"
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

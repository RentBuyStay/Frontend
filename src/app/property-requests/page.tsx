import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import RequestResults from "@/components/RequestResults";
import ListPropertyCTA from "@/components/ListPropertyCTA";
import ListingSidebar from "@/components/ListingSidebar";

export const metadata = {
  title: "Property Requests | RentBuyStay",
  description: "Browse what people are looking for and connect with verified seekers.",
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
  "Serviced Properties for sale",
  "Furnished Properties for sale",
  "Newly Built Properties for sale",
  "Cheap Properties for sale",
  "Luxury Properties for sale",
  "Property for sale between 20milion and 40milion",
  "Property for sale between 40milion and 60milion",
  "Property for sale between 60milion and 80milion",
  "Property for sale between 80milion and 100milion",
];

export default function PropertyRequestsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* HERO — Figma 769:79786: navbar + search inside a rounded card (same as property detail) */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-[1440px] px-4 md:px-6 pt-4 md:pt-6">
          <div className="rounded-[20px] md:rounded-[25px] bg-white md:p-6 flex flex-col gap-10">
            <Navbar variant="card" />
            <SearchBar defaultTab="Rent" />
          </div>
        </div>
      </section>

      {/* PROPERTY REQUESTS + SIDEBAR */}
      <section className="bg-white">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[80px] py-[60px]">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_411px] gap-6">

            {/* LEFT — live requests from GET /property-requests */}
            <RequestResults />

            {/* SIDEBAR — shared component (live facets); not scoped to a listing type,
                and requests don't show the Verified Agents block. */}
            <ListingSidebar
              category=""
              propertyTypes={propertyTypes}
              bedroomTable={bedroomTable}
              states={states}
              otherCategories={otherCategories}
              showVerifiedAgents={false}
            />
          </div>
        </div>
      </section>

      <ListPropertyCTA />

      <Footer />
    </div>
  );
}

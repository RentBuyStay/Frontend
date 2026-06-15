import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import RequestResults from "@/components/RequestResults";
import ListPropertyCTA from "@/components/ListPropertyCTA";
import Image from "next/image";
import Link from "next/link";

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

            {/* SIDEBAR (same as For Sale) */}
            <aside className="flex flex-col gap-6 min-w-0">
              <div className="border border-[#ededed] rounded-[16px] p-6">
                <h3 style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 600, color: "#121212" }}>
                  Available Properties
                </h3>
                <p style={{ fontSize: "12px", lineHeight: "20px", color: "#807e7e" }} className="mb-4">
                  Currently available properties
                </p>
                <div className="flex flex-col">
                  <div className="flex items-center justify-between py-1.5 border-b border-[#ededed]" style={{ fontSize: "14px", color: "#305e82", fontWeight: 600 }}>
                    <span>Property Type</span>
                    <span>Property Count</span>
                  </div>
                  {propertyTypes.map((t) => (
                    <div key={t.name} className="flex items-center justify-between py-1.5" style={{ fontSize: "14px", color: "#305e82" }}>
                      <span>{t.name}</span>
                      <span>{t.count}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#ededed] my-4" />

                <div className="flex flex-col">
                  <div className="grid grid-cols-6 gap-2 py-1.5 border-b border-[#ededed]" style={{ fontSize: "12px", color: "#305e82", fontWeight: 600 }}>
                    {bedroomTable.cols.map((c) => (
                      <span key={c} className={c === "Type" ? "" : "text-right"}>{c}</span>
                    ))}
                  </div>
                  {bedroomTable.rows.map((row) => (
                    <div key={row[0]} className="grid grid-cols-6 gap-2 py-1.5" style={{ fontSize: "12px", color: "#305e82" }}>
                      {row.map((cell, i) => (
                        <span key={i} className={i === 0 ? "" : "text-right"}>{cell}</span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-[#ededed] rounded-[16px] p-6">
                <h3 style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 600, color: "#121212" }}>
                  Explore States
                </h3>
                <p style={{ fontSize: "12px", lineHeight: "20px", color: "#807e7e" }} className="mb-4">
                  Find available properties by states
                </p>
                <div className="flex flex-wrap gap-x-3 gap-y-1" style={{ fontSize: "14px", lineHeight: "32px", color: "#305e82" }}>
                  {states.map((s) => (
                    <Link key={s} href={`/search?state=${s.toLowerCase()}`} className="hover:underline whitespace-nowrap">
                      {s}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="border border-[#ededed] rounded-[16px] p-6">
                <h3 style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 600, color: "#121212" }} className="mb-4">
                  Other Related Properties
                </h3>
                <ul className="flex flex-col gap-1">
                  {otherCategories.map((c) => (
                    <li key={c} className="flex items-start gap-2 min-w-0" style={{ fontSize: "14px", lineHeight: "24px", color: "#305e82" }}>
                      <span className="shrink-0">•</span>
                      <Link href="#" className="hover:underline break-words min-w-0">
                        {c}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[16px] p-6 text-white relative overflow-hidden" style={{ background: "linear-gradient(174deg, #75A3C7 0%, #305E82 96%)" }}>
                <Image src="/icons/bell-alert.svg" alt="" width={34} height={36} className="mb-4" />
                <h3 style={{ fontSize: "24px", lineHeight: "32px", fontWeight: 600 }} className="mb-2">
                  Receive alerts for<br />new properties
                </h3>
                <p style={{ fontSize: "14px", lineHeight: "24px" }} className="mb-5 text-white/90">
                  Get instant notifications for recent listings
                </p>
                <button className="text-white rounded-[8px] hover:opacity-90 transition-opacity" style={{ fontSize: "14px", fontWeight: 600, background: "#FFAE00", width: "147px", height: "48px" }}>
                  Subscribe Now
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <ListPropertyCTA />

      <Footer />
    </div>
  );
}

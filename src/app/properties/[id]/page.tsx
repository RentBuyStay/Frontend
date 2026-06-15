import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ListPropertyCTA from "@/components/ListPropertyCTA";
import SearchBar from "@/components/SearchBar";
import PropertyDetail from "@/components/PropertyDetail";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Hero — glass navbar + search inside a rounded white card */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-[1440px] px-4 md:px-6 pt-4 md:pt-6">
          <div className="rounded-[20px] md:rounded-[25px] bg-white md:p-6 flex flex-col gap-10">
            <Navbar variant="card" />
            <SearchBar defaultTab="Rent" />
          </div>
        </div>
      </section>

      {/* Live property detail — GET /properties/{id} */}
      <PropertyDetail id={id} />

      <ListPropertyCTA />

      <Footer />
    </div>
  );
}

import Image from "next/image";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";

// Shared full-viewport hero for the for-sale / for-rent / shortlet listing pages.
// Identical layout across all three — only the image, heading word, subtitle copy
// and the SearchBar's default tab change, so those come in as props.
export default function ListingHero({
  image,
  imageAlt,
  headingSuffix,
  subtitle,
  defaultTab,
}: {
  image: string;
  imageAlt: string;
  headingSuffix: string; // "Sale" | "Rent" | "Shortlet"
  subtitle: string;
  defaultTab: "Buy" | "Rent" | "Shortlet";
}) {
  return (
    <section className="bg-white">
      <div className="max-w-[1440px] mx-auto px-4 py-4 md:px-6 md:py-6">
        <div className="relative rounded-[20px] md:rounded-[25px] overflow-hidden bg-[#F3FEFE] min-h-[calc(100svh-32px)] md:min-h-[852px]">
          <div className="absolute inset-0 z-0">
            <Image src={image} alt={imageAlt} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-black/55" />
          </div>

          <Navbar transparent />

          {/* Content — heading/paragraph centered vertically, search pinned to bottom */}
          <div className="absolute inset-0 z-10 flex flex-col px-4 pt-[100px] pb-4 md:px-6 md:pt-[120px] md:pb-6">
            <div className="flex-1 flex items-center justify-center">
              <div className="w-[738px] max-w-full flex flex-col gap-2 md:gap-4 text-center">
                <h1 className="text-white font-semibold text-[32px] leading-[48px] md:text-[64px] md:leading-[80px]" style={{ letterSpacing: "-0.02em" }}>
                  Properties for<br className="md:hidden" /> {headingSuffix} in Nigeria
                </h1>
                <p className="text-white text-[14px] leading-[24px] md:text-[16px] md:leading-[32px]" style={{ fontWeight: 400, letterSpacing: "-0.02em" }}>
                  {subtitle}
                </p>
              </div>
            </div>
            <div className="w-full">
              <SearchBar defaultTab={defaultTab} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

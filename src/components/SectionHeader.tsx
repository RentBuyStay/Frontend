import Link from "next/link";
import Image from "next/image";

// Shared section header used across the homepage sections.
// Two layouts, chosen by whether a `viewAllHref` is supplied:
//   • with viewAllHref  → left-aligned heading + "View All" link, subtitle below
//   • without           → centered heading + subtitle (max-width 628)
export default function SectionHeader({
  title,
  subtitle,
  viewAllHref,
}: {
  title: string;
  subtitle: string;
  viewAllHref?: string;
}) {
  if (viewAllHref) {
    return (
      <div className="mb-10 md:mb-[64px]">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-[#121212] font-semibold min-w-0" style={{ fontSize: "clamp(20px, 4.5vw, 40px)", lineHeight: "1.6", letterSpacing: "-0.02em" }}>
            {title}
          </h2>
          <Link
            href={viewAllHref}
            className="flex items-center gap-2 shrink-0 text-[14px] font-medium text-[#121212] hover:text-[#305e82] transition-colors whitespace-nowrap"
            style={{ letterSpacing: "-0.02em" }}
          >
            <span>View All</span>
            <Image src="/icons/arrow-right.svg" alt="" width={24} height={24} className="w-4 h-4 md:w-6 md:h-6 shrink-0" />
          </Link>
        </div>
        <p
          className="mt-2 max-w-full md:max-w-[628px] text-[14px] leading-[24px] text-[#807e7e] md:text-[16px] md:leading-[32px]"
          style={{ letterSpacing: "-0.02em" }}
        >
          {subtitle}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-[628px] mx-auto mb-10 md:mb-[64px] flex flex-col items-center gap-2 text-center">
      <h2 className="text-[#121212] font-semibold" style={{ fontSize: "clamp(20px, 4.5vw, 40px)", lineHeight: "1.6", letterSpacing: "-0.02em" }}>
        {title}
      </h2>
      <p
        className="text-[14px] leading-[24px] text-[#807e7e] md:text-[16px] md:leading-[32px]"
        style={{ letterSpacing: "-0.02em" }}
      >
        {subtitle}
      </p>
    </div>
  );
}

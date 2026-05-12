import Link from "next/link";

const columns = [
  {
    heading: "Buy",
    links: [
      { label: "Houses for Sale", href: "/for-sale?type=house" },
      { label: "Apartments for Sale", href: "/for-sale?type=apartment" },
      { label: "Land for Sale", href: "/for-sale?type=land" },
      { label: "Commercial for Sale", href: "/for-sale?type=commercial" },
    ],
  },
  {
    heading: "Rent",
    links: [
      { label: "Houses for Rent", href: "/for-rent?type=house" },
      { label: "Apartments for Rent", href: "/for-rent?type=apartment" },
      { label: "Shortlets", href: "/shortlet" },
      { label: "Commercial for Rent", href: "/for-rent?type=commercial" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Agents", href: "/agents" },
      { label: "Agencies & Developers", href: "/agencies" },
      { label: "Blog", href: "/blogs" },
      { label: "Contact", href: "/contact" },
      { label: "FAQs", href: "/faqs" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Terms of Service", href: "/tos" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#121212] text-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-14">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="font-semibold text-xl text-white">
              RentBuyStay
            </Link>
            <p className="mt-3 text-sm text-[#7f7e7e] leading-relaxed max-w-[220px]">
              Find your perfect home across Nigeria with verified agents and listings.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <h4 className="text-sm font-semibold mb-4">{col.heading}</h4>
              <ul className="flex flex-col gap-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-[#7f7e7e] hover:text-white transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-6">
          <p className="text-xs text-[#7f7e7e] leading-relaxed max-w-4xl">
            By using this site you agree to our{" "}
            <Link href="/tos" className="underline hover:text-white">Terms of service</Link>,{" "}
            <Link href="/privacy" className="underline hover:text-white">Privacy policy</Link>,
            Subscription Agreement and Cookies. Recommendations may use your activity to personalize
            results. Listings, availability and prices may change; restrictions may apply.
            Verification and inspections are informational only and not guarantees. RentBuyStay is
            not a broker or party to transactions.
          </p>
          <p className="mt-4 text-xs text-[#7f7e7e]">
            © {new Date().getFullYear()} RentBuyStay. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

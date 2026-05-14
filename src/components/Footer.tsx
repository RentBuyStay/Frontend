import Link from "next/link";
import Image from "next/image";

const company = [
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

const legal = [
  { label: "Terms of Service", href: "/tos" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Subscription Agreement", href: "/tos" },
  { label: "Cookie Policy", href: "/privacy" },
  { label: "Sitemap", href: "/" },
];

const reachUs = [
  { icon: "/icons/location-white.svg", text: "Lagos, Nigeria", href: "#" },
  { icon: "/icons/call-white.svg", text: "+234 800 RENT BUY", href: "tel:+2348000000000" },
  { icon: "/icons/sms.svg", text: "info@rentbuystay.com", href: "mailto:info@rentbuystay.com" },
];

const socials = [
  { icon: "/icons/facebook.svg", href: "#", label: "Facebook" },
  { icon: "/icons/instagram.svg", href: "#", label: "Instagram" },
  { icon: "/icons/linkedin.svg", href: "#", label: "LinkedIn" },
  { icon: "/icons/twitter.svg", href: "#", label: "X" },
];

export default function Footer() {
  return (
    <footer
      className="relative text-white overflow-hidden"
      style={{ background: "#305E82" }}
    >
      {/* Main content - top section */}
      <div className="max-w-[1440px] mx-auto px-[120px] pt-20 relative z-10">
        {/* Top layout — Figma: Brand left (282), Group of 3 right with justify-between */}
        <div className="flex flex-col lg:flex-row lg:justify-between gap-y-10">

          {/* Brand column — 282 wide, left-aligned */}
          <div className="flex flex-col gap-8 w-full lg:w-[282px] shrink-0">
            <div className="flex flex-col gap-4">
              {/* Use plain img to avoid Next.js Image wrapper issues */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo-footer.svg" alt="RentBuyStay" width={212} height={64} style={{ display: "block", marginLeft: 0 }} />
              <p style={{ fontSize: "12px", lineHeight: "24px", color: "#ffffff" }}>
                Nigeria&apos;s trusted digital real estate marketplace — connecting property
                seekers, owners, and agents across all 36 states.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <p style={{ fontSize: "14px", lineHeight: "24px", fontWeight: 600, color: "#ffffff" }}>
                Connect With Us
              </p>
              <div className="flex items-center gap-4">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} aria-label={s.label} className="opacity-90 hover:opacity-100 transition-opacity">
                    <Image src={s.icon} alt={s.label} width={24} height={24} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right group: Company + Legal + Reach Us */}
          <div className="flex flex-col sm:flex-row gap-6 w-full lg:w-auto">
            <div className="flex flex-col gap-4 w-full sm:w-[180px] shrink-0">
              <h4 style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 600, color: "#ffffff" }}>
                COMPANY
              </h4>
              <ul className="flex flex-col">
                {company.map((l) => (
                  <li key={l.href} style={{ height: "35px" }}>
                    <Link href={l.href} className="hover:underline" style={{ fontSize: "16px", lineHeight: "35px", color: "#ffffff" }}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4 w-full sm:w-[180px] shrink-0">
              <h4 style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 600, color: "#ffffff" }}>
                LEGAL
              </h4>
              <ul className="flex flex-col">
                {legal.map((l) => (
                  <li key={l.label} style={{ height: "35px" }}>
                    <Link href={l.href} className="hover:underline" style={{ fontSize: "16px", lineHeight: "35px", color: "#ffffff" }}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4 w-full sm:w-[282px] shrink-0">
              <h4 style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 600, color: "#ffffff" }}>
                REACH US
              </h4>
              <ul className="flex flex-col gap-0">
                {reachUs.map((r) => (
                  <li key={r.text} className="flex items-center gap-3" style={{ height: "35px" }}>
                    <Image src={r.icon} alt="" width={24} height={24} />
                    <a href={r.href} className="hover:underline" style={{ fontSize: "16px", color: "#ffffff" }}>
                      {r.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Disclaimer — 2 lines: first sentence with links, second sentence below */}
        <div className="mt-12 max-w-[1200px] flex flex-col" style={{ fontSize: "12px", lineHeight: "24px", color: "#ffffff" }}>
          <p>
            By using this site you agree to our{" "}
            <Link href="/tos" className="underline">Terms of service</Link>,{" "}
            <Link href="/privacy" className="underline">Privacy policy</Link>,{" "}
            <Link href="/tos" className="underline">Subscription Agreement</Link> and{" "}
            <Link href="/privacy" className="underline">Cookies</Link>.
          </p>
          <p>
            Recommendations may use your activity to personalize results. Listings, availability and
            prices may change; restrictions may apply. Verification and inspections are informational
            only and not guarantees. RentBuyStay is not a broker or party to transactions. External
            links are third-party; we&apos;re not responsible for their content. Payments are
            processed by third-party providers; review their terms/fees.
          </p>
        </div>
      </div>

      {/* Bottom section — watermark BG with divider+copyright OVERLAID */}
      <div className="relative mt-12">
        {/* Huge RENTBUYSTAY watermark — Figma 215px, gradient fade */}
        <div className="pointer-events-none select-none text-center overflow-hidden">
          <p
            className="font-black tracking-tight whitespace-nowrap leading-none"
            style={{
              fontSize: "clamp(80px, 15vw, 215px)",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.20) 2%, rgba(255,255,255,0) 94%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            RENTBUYSTAY
          </p>
        </div>

        {/* Copyright + divider — absolute overlay on top of watermark */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 max-w-[1440px] mx-auto px-[120px]">
          <div className="border-t border-white/30 pt-4">
            <p style={{ fontSize: "14px", lineHeight: "35px", fontWeight: 300, color: "#ffffff", textAlign: "center" }}>
              Copyright © {new Date().getFullYear()} RentBuyStay. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

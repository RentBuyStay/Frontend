import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ListPropertyCTA from "@/components/ListPropertyCTA";
import Image from "next/image";

const faqs = [
  {
    q: "What is RentBuyStay?",
    a: "It is a digital real estate marketplace in Nigeria designed to connect property seekers, owners, agents, and agencies for renting, buying, or booking short stays.",
  },
  {
    q: "How do I search for a property?",
    a: "You can use the homepage hero section’s search bar to filter by location, property type, or price. You can also switch to a map-based view to browse visually.",
  },
  {
    q: "Do I need to pay a subscription fee to find a house?",
    a: "No. The seeker experience is designed to be frictionless with no verification or subscription barriers.",
  },
  {
    q: "How do I track my inquiries?",
    a: "Your dashboard allows you to manage saved properties, track active inquiries, and view your messaging history with agents.",
  },
  {
    q: "How do I contact an agent or owner?",
    a: "Every property card and details page includes direct “Call” and “WhatsApp” buttons, as well as an internal messaging system.",
  },
  {
    q: "How do I upload my property?",
    a: "Once verified, use the “Add New Property” form on your dashboard. This multi-step process covers property details, pricing, and media (images, videos, or 3D tours).",
  },
  {
    q: "Why is my account in “Restricted Mode”?",
    a: "Owners, agents, and agencies must complete mandatory account verification (via Qore ID) before they can upload listings or access management tools.",
  },
  {
    q: "What is the difference between an Agent and an Agency account?",
    a: "Agents focus on lead tracking and personal listing performance while Agencies have a multi-user system that allows them to invite, remove, and monitor the performance of multiple agents under their brand.",
  },
  {
    q: "How is the platform moderated?",
    a: "Platform administrators review and approve all verifications and property listings to maintain quality and safety.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group" style={{ width: "100%", borderRadius: "12px", background: "#F6F6F6" }}>
      <summary
        className="flex items-center justify-between cursor-pointer list-none"
        style={{ padding: "24px" }}
      >
        <span
          style={{
            fontSize: "16px",
            lineHeight: "24px",
            fontWeight: 600,
            color: "#121212",
            letterSpacing: "-0.02em",
          }}
        >
          {q}
        </span>
        <span className="shrink-0 relative" style={{ width: "24px", height: "24px" }}>
          <Image src="/icons/plus-faq.svg" alt="" width={24} height={24} className="group-open:hidden" />
          <Image src="/icons/minus-faq.svg" alt="" width={24} height={24} className="hidden group-open:block" />
        </span>
      </summary>
      <div
        style={{
          padding: "0 24px 24px 24px",
          fontSize: "14px",
          lineHeight: "24px",
          fontWeight: 400,
          color: "#807E7E",
          letterSpacing: "-0.02em",
        }}
      >
        {a}
      </div>
    </details>
  );
}

// Parse body: lines starting with "N. " (digit + dot + space) OR "N.N " are SemiBold 20 headers
// All other lines are regular 16/40 body text. Bullets (•) are styled within their lines.
function renderBody(body: string) {
  const lines = body.split("\n");
  return lines.map((line, i) => {
    const isHeading = /^\d+(\.\d+)?\.\s/.test(line);
    if (isHeading) {
      return (
        <div
          key={i}
          style={{
            fontSize: "20px",
            lineHeight: "64px",
            fontWeight: 600,
            color: "#121212",
          }}
        >
          {line}
        </div>
      );
    }
    return (
      <div
        key={i}
        style={{
          fontSize: "16px",
          lineHeight: "40px",
          fontWeight: 400,
          color: "#121212",
        }}
      >
        {line}
      </div>
    );
  });
}

export interface LegalPageProps {
  /** Page title shown after "Legal" badge — e.g. "Terms of Service" */
  title: string;
  /** Plain-text body. Numbered headings (1. , 1.1 ) auto-bold to 20/600. */
  body: string;
  /** Defaults to "Effective Date: April 8, 2026        Last Updated: April 8, 2026" */
  effectiveDate?: string;
}

export default function LegalPage({
  title,
  body,
  effectiveDate = "Effective Date: April 8, 2026        Last Updated: April 8, 2026",
}: LegalPageProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-clip">
      <Navbar variant="page" />

      {/* TITLE + BODY — Figma 268:39232 (desktop) / 786:90807 (mobile).
          Same 16/40 body + 20/64 headings on both; gutter 16px mobile / 80px desktop. */}
      <section className="bg-white">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[80px] py-10 md:py-20 flex flex-col gap-8 md:gap-12">
          {/* Title block */}
          <div className="flex flex-col gap-2 lg:max-w-[845px]">
            <span className="text-[12px] md:text-[16px] leading-[20px] md:leading-[24px] font-normal text-[#807E7E]">
              Legal
            </span>
            <h1
              className="text-[24px] leading-[32px] md:text-[48px] md:leading-[64px]"
              style={{ fontWeight: 600, color: "#121212" }}
            >
              {title}
            </h1>
            {/* Split on the wide gap so "Effective Date" and "Last Updated" keep a real
                gap (HTML collapses the literal spaces); one line on desktop, wraps on mobile. */}
            <div className="flex gap-x-4 md:gap-x-8 text-[12px] md:text-[16px] leading-[20px] md:leading-[24px] font-normal text-[#807E7E]">
              {effectiveDate.split(/\s{2,}/).map((part, i) => (
                <span key={i} className="whitespace-nowrap">{part}</span>
              ))}
            </div>
          </div>

          {/* Body — numbered headings auto-bold to 20/64; body is 16/40 */}
          <div>{renderBody(body)}</div>
        </div>
      </section>

      <ListPropertyCTA />

      {/* FAQ — same 9 items as the About page */}
      <section className="bg-white">
        <div className="max-w-[846px] mx-auto px-4 md:px-0 py-12 md:py-20 flex flex-col items-center gap-8 md:gap-10">
          <div className="w-full flex flex-col text-center gap-2 lg:w-[628px]">
            <h2
              className="text-[28px] leading-[36px] md:text-[40px] md:leading-[64px]"
              style={{ fontWeight: 600, color: "#121212", letterSpacing: "-0.02em" }}
            >
              Frequently Asked Questions
            </h2>
            <p
              className="text-[14px] leading-[28px] md:text-[18px] md:leading-[32px]"
              style={{ fontWeight: 400, color: "rgba(46,46,46,0.6)", letterSpacing: "-0.02em" }}
            >
              We&rsquo;re dedicated to revolutionizing the way property and people connect.
              Our platform is built on ease of access and trust to streamline the buying,
              selling, and leasing process for everyone.
            </p>
          </div>
          <div className="w-full flex flex-col gap-4 md:gap-6">
            {faqs.map((f) => (
              <FAQItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ListPropertyCTA from "@/components/ListPropertyCTA";
import Image from "next/image";

export const metadata = {
  title: "About Us | RentBuyStay",
  description:
    "One platform. Every property need. Built by people who believe property discovery should feel exciting, not exhausting.",
};

const stats = [
  { value: "10K+", label: "Active Listings" },
  { value: "2K+", label: "Verified Agents" },
  { value: "36", label: "States Covered" },
];

const trustCards = [
  {
    title: "Radical Transparency",
    body: "No hidden fees. No misleading photos. Every listing is what it says it is and every deal is fully yours to understand before you sign.",
    color: "#305E82",
  },
  {
    title: "People First",
    body: "Behind every property search is a real person with real needs. Our team listens first, then helps, not the other way around.",
    color: "#F26210",
  },
  {
    title: "Smartly Human",
    body: "We use smart tools to make property discovery faster, but we never let a chatbot replace a caring human when it matters most.",
    color: "#8A38F5",
  },
  {
    title: "Built Together",
    body: "We grow when our users grow. Every review, referral, and repeat client makes RentBuyStay stronger and better for everyone.",
    color: "#FFAE00",
  },
];

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

// Pill label used above each section heading (icon + uppercase text on a grey rounded chip)
function SectionPill({ icon, label, centered }: { icon: string; label: string; centered?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 px-2 py-2 rounded-[50px] ${centered ? "self-center" : "self-start"}`}
      style={{ background: "#F6F6F6", boxShadow: "0px 10px 30px -8px rgba(176,176,176,0.15)" }}
    >
      <Image src={icon} alt="" width={20} height={20} />
      <span
        className="uppercase"
        style={{
          fontSize: "14px",
          lineHeight: "24px",
          fontWeight: 500,
          color: "#305E82",
          letterSpacing: "-0.01em",
        }}
      >
        {label}
      </span>
    </span>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <details
      className="group"
      style={{
        width: "100%",
        borderRadius: "12px",
        background: "#F6F6F6",
      }}
    >
      <summary
        className="flex items-center justify-between cursor-pointer list-none"
        style={{
          padding: "24px",
        }}
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
        <span
          className="shrink-0 relative"
          style={{ width: "24px", height: "24px" }}
        >
          <Image
            src="/icons/plus-faq.svg"
            alt=""
            width={24}
            height={24}
            className="group-open:hidden"
          />
          <Image
            src="/icons/minus-faq.svg"
            alt=""
            width={24}
            height={24}
            className="hidden group-open:block"
          />
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

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-clip">
      {/* HERO — full-viewport image card with the navbar inside, matching the
          listing/rent hero. Title + stats sit at the bottom of the card: stacked
          on mobile, title-left / stats-right on desktop. */}
      <section className="bg-white">
        <div className="w-full px-4 py-4 md:px-6 md:py-6">
          <div className="relative overflow-hidden bg-[#F3FEFE] rounded-[20px] md:rounded-[25px] min-h-[calc(100svh-32px)] md:min-h-[calc(100svh-48px)]">
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/about-hero.png"
                alt="One platform. Every property need."
                fill
                className="object-cover"
                priority
              />
              {/* Gradient overlay — dark at the bottom for legibility */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.96) 7%, rgba(0,0,0,0.94) 13%, rgba(0,0,0,0.91) 18%, rgba(0,0,0,0.84) 32%, rgba(0,0,0,0.5) 69%, rgba(102,102,102,0) 100%)",
                  opacity: 0.65,
                }}
              />
              <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.2)" }} />
            </div>

            <Navbar variant="hero" />

            {/* Title + stats: stacked at the bottom on mobile. On desktop this wrapper
                dissolves (lg:contents) so each block anchors to the bottom of the card. */}
            <div className="absolute z-10 inset-x-4 bottom-8 flex flex-col gap-10 lg:contents">
              {/* Title block */}
              <div className="flex flex-col gap-2 lg:gap-4 lg:absolute lg:z-10 lg:left-[64px] lg:bottom-[46px] lg:w-[641px] lg:max-w-[calc(100%-128px)]">
                <h1
                  className="text-white text-[32px] leading-[40px] lg:text-[64px] lg:leading-[1.2]"
                  style={{ fontWeight: 600, letterSpacing: "-0.02em" }}
                >
                  One Platform.
                  <br />
                  Every Property Need.
                </h1>
                <p
                  className="text-white text-[14px] leading-[24px] lg:text-[18px] lg:leading-[32px]"
                  style={{ fontWeight: 400, letterSpacing: "-0.02em" }}
                >
                  Whether you&rsquo;re looking for a furnished apartment this weekend, signing
                  a 12-month lease, or taking the big step of owning your first home, we&rsquo;ve
                  built the tools, the listings, and the support to make it seamless.
                </p>
              </div>

              {/* Stats */}
              <div className="flex items-center text-white gap-6 lg:gap-10 lg:absolute lg:z-10 lg:right-[64px] lg:bottom-[54px]">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="flex flex-col items-center justify-center whitespace-nowrap gap-2"
                  >
                    <span
                      className="text-[24px] lg:text-[48px]"
                      style={{ fontWeight: 600, letterSpacing: "-0.02em", textAlign: "center" }}
                    >
                      {s.value}
                    </span>
                    <span
                      className="text-[13px] leading-[20px] lg:text-[16px] lg:leading-[24px]"
                      style={{ fontWeight: 400, color: "rgba(255,255,255,0.75)", textAlign: "center" }}
                    >
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1 — overlapping image cards + big quote. Figma 276:9228 (desktop) /
          803:61332 top (mobile, quote 24px). Centered column on both. */}
      <section className="bg-white lg:h-[629px]">
        <div
          className="mx-auto flex flex-col items-center px-4 lg:px-0 py-12 lg:py-0 lg:pt-20 gap-8 lg:gap-10 lg:w-[1280px] lg:max-w-[calc(100%-160px)]"
        >
          {/* 3 overlapping photo cards — scaled down on mobile so the cluster fits. */}
          <div className="flex w-full items-center justify-center overflow-hidden lg:overflow-visible">
            <div className="flex items-center scale-[0.62] lg:scale-100 -my-8 lg:my-0 shrink-0">
              {[
                {
                  src: "/images/about-mi-1.png",
                  inner: { x: 9.04, y: 9.04 },
                  img: { x: -21.64, y: -5.09, w: 202.75, h: 149.64 },
                  rotate: "rotate-[-8deg]",
                  z: "z-[3]",
                },
                {
                  src: "/images/about-mi-2.png",
                  inner: { x: 11.26, y: 9.04 },
                  img: { x: -35.33, y: -6.04, w: 230.24, h: 150.01 },
                  rotate: "rotate-[8deg]",
                  z: "z-[2]",
                },
                {
                  src: "/images/about-mi-3.png",
                  inner: { x: 9.04, y: 9.04 },
                  img: { x: -19.83, y: -3.53, w: 198.25, h: 145.14 },
                  rotate: "rotate-[-8deg]",
                  z: "z-[1]",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className={`bg-white shrink-0 relative ${card.rotate} ${card.z} transition-all duration-300 ease-out shadow-[0_10px_30px_-8px_rgba(0,0,0,0.15)] hover:z-20 hover:-translate-y-1 hover:scale-[1.05] hover:shadow-[0_20px_45px_-10px_rgba(0,0,0,0.3)]`}
                  style={{
                    width: "179.6px",
                    height: "172.79px",
                    borderRadius: "24px",
                    marginLeft: i === 0 ? 0 : "-24px",
                    transformOrigin: "center center",
                  }}
                >
                  <div
                    className="overflow-hidden bg-[#F8F8F8] absolute"
                    style={{
                      left: `${card.inner.x}px`,
                      top: `${card.inner.y}px`,
                      width: "159.3px",
                      height: "138.87px",
                      borderRadius: "20px",
                    }}
                  >
                    <Image
                      src={card.src}
                      alt=""
                      width={Math.round(card.img.w * 2)}
                      height={Math.round(card.img.h * 2)}
                      style={{
                        position: "absolute",
                        left: `${card.img.x}px`,
                        top: `${card.img.y}px`,
                        width: `${card.img.w}px`,
                        height: `${card.img.h}px`,
                        maxWidth: "none",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quote — two-tone (first sentence dark, rest grey). 24px mobile / 40px desktop. */}
          <p
            className="text-center text-[24px] leading-[40px] lg:text-[40px] lg:leading-[1.3]"
            style={{
              maxWidth: "1280px",
              fontWeight: 500,
              color: "#121212",
              letterSpacing: "-0.02em",
            }}
          >
            We didn&rsquo;t just build a property platform. We built the one
            <br className="hidden lg:inline" /> we wished existed. Finding your perfect space,{" "}
            <span style={{ color: "#807E7E" }}>
              whether
              <br className="hidden lg:inline" /> for a night, a year, or a lifetime, should feel exciting,
              <br className="hidden lg:inline" /> not exhausting.
            </span>
          </p>
        </div>
      </section>

      {/* SECTION 2 — OUR STORY. Figma 791:92393 (desktop two-column) / 803:61881 (mobile stacked). */}
      <section className="bg-white">
        <div className="mx-auto flex flex-col gap-8 px-4 py-12 lg:flex-row lg:items-center lg:gap-10 lg:px-0 lg:py-20 lg:w-[1280px] lg:max-w-[calc(100%-160px)]">
          {/* Left text */}
          <div className="flex flex-col gap-4 lg:flex-1">
            <SectionPill icon="/icons/tag-user.svg" label="OUR STORY" />
            <h2
              className="text-[24px] leading-[32px] lg:text-[40px] lg:leading-[1.3] capitalize"
              style={{ fontWeight: 600, color: "#121212", letterSpacing: "-0.02em" }}
            >
              Born from a very
              <br className="hidden lg:inline" /> real frustration
            </h2>
            <p
              className="text-[14px] leading-[32px] lg:text-[18px] lg:leading-[32px]"
              style={{
                fontWeight: 400,
                color: "rgba(46, 46, 46, 0.6)",
                letterSpacing: "-0.02em",
                whiteSpace: "pre-line",
              }}
            >
              It started with a question most of us have asked ourselves at some
              point:&nbsp;why is finding a place to live so difficult?
              {"\n"}
              Endless agent calls. Listings that don&rsquo;t match the photos. Hidden
              charges. Landlords who are impossible to reach. We know the story because
              we&rsquo;ve lived it.
              {"\n"}
              RentBuyStay was founded by a team who believed the property market deserved
              better. Not just a prettier website, but a smarter, more honest, more human
              experience from first search to final handshake.
            </p>
          </div>

          {/* Right image card with overlay + quote */}
          <div
            className="relative overflow-hidden bg-[#F6F6F6] w-full h-[320px] rounded-[20px] lg:flex-1 lg:h-[456px]"
          >
            <Image
              src="/images/about-frustration.png"
              alt="Modern country house"
              fill
              sizes="(min-width: 1024px) 620px, 100vw"
              style={{ objectFit: "cover" }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.96) 7%, rgba(0,0,0,0.94) 13%, rgba(0,0,0,0.91) 18%, rgba(0,0,0,0.84) 32%, rgba(0,0,0,0.5) 69%, rgba(102,102,102,0) 100%)",
                opacity: 0.68,
              }}
            />
            <div className="absolute z-10 flex flex-col gap-4 inset-x-6 bottom-6 lg:bottom-auto lg:top-[320px]">
              <p
                className="text-white text-[18px] leading-[26px] lg:text-[24px] lg:leading-[32px]"
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontWeight: 600,
                  letterSpacing: "-0.48px",
                  fontStyle: "italic",
                }}
              >
                &ldquo;We Built RentBuyStay Because We Kept Seeing Good People Get A Bad
                Deal. That Changes Here.&rdquo;
              </p>
              <p
                className="text-white text-[14px] leading-[32px]"
                style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif", fontWeight: 400 }}
              >
                - THE RENTBUYSTAY TEAM
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — OUR VALUES. Figma 793:61154 (desktop) / 803:61770 (mobile, cards stack). */}
      <section className="bg-white">
        <div className="mx-auto flex flex-col gap-10 px-4 py-12 lg:gap-16 lg:px-0 lg:py-20 lg:w-[1280px] lg:max-w-[calc(100%-160px)]">
          {/* Title block */}
          <div className="flex flex-col items-center text-center gap-4 lg:w-[628px] lg:max-w-full lg:mx-auto">
            <SectionPill icon="/icons/octicon-goal.svg" label="OUR VALUES" centered />
            <h2
              className="text-[28px] leading-[36px] lg:text-[40px] lg:leading-[1.3] capitalize"
              style={{ fontWeight: 600, color: "#121212", letterSpacing: "-0.02em" }}
            >
              We earn trust the
              <br className="hidden lg:inline" /> old-fashioned way
            </h2>
            <p
              className="text-[14px] leading-[32px] lg:text-[18px] lg:leading-[32px]"
              style={{ fontWeight: 400, color: "rgba(46,46,46,0.6)", letterSpacing: "-0.02em" }}
            >
              At RentBuyStay, everything we do is shaped by a simple commitment: to put the
              person before the property.
            </p>
          </div>

          {/* Cards — stacked full-width on mobile, row of equal columns on desktop */}
          <div className="flex flex-col gap-6 lg:flex-row lg:gap-6">
            {trustCards.map((card) => (
              <div
                key={card.title}
                className="w-full lg:flex-1 flex flex-col min-h-[168px] rounded-[15px]"
                style={{ background: card.color, padding: "8px" }}
              >
                {/* Title row */}
                <div className="flex items-center gap-2" style={{ paddingTop: "8px", paddingBottom: "16px" }}>
                  <span className="inline-flex items-center justify-center shrink-0 w-4 h-4">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="8" fill="white" fillOpacity="0.15" />
                      <circle cx="7.977" cy="8.322" r="2.667" fill="white" />
                    </svg>
                  </span>
                  <span
                    style={{
                      fontSize: "16px",
                      lineHeight: "140%",
                      fontWeight: 500,
                      color: "#FAFBFD",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {card.title}
                  </span>
                </div>

                {/* White box — grows with its text so it never overflows */}
                <div className="bg-white rounded-[12px] flex-1" style={{ padding: "16px" }}>
                  <p
                    style={{
                      fontSize: "12px",
                      lineHeight: "24px",
                      fontWeight: 400,
                      color: "#121212",
                      textShadow: "0px 4px 12px rgba(0,0,0,0.04)",
                    }}
                  >
                    {card.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY IT MATTER — Figma 1177:78267 (mobile: image on top + text; desktop: two columns). */}
      <section className="bg-white">
        <div className="mx-auto flex flex-col gap-6 px-4 py-12 lg:flex-row lg:items-center lg:gap-10 lg:px-0 lg:py-20 lg:w-[1280px] lg:max-w-[calc(100%-160px)]">
          {/* Image — desktop 620×424 (Figma 1177:78297) */}
          <div className="relative overflow-hidden bg-[#F6F6F6] w-full h-[400px] rounded-[20px] lg:flex-1 lg:h-[424px]">
            <Image
              src="/images/about-fresh-voice-2a2d69.png"
              alt="Aerial view of a modern city skyline"
              fill
              sizes="(min-width: 1024px) 620px, 100vw"
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* Text */}
          <div className="flex flex-col gap-4 lg:flex-1">
            <SectionPill icon="/icons/emoji-normal.svg" label="WHY IT MATTER" />
            <h2
              className="text-[24px] leading-[32px] lg:text-[40px] lg:leading-[1.3] capitalize"
              style={{ fontWeight: 600, color: "#121212", letterSpacing: "-0.02em" }}
            >
              The Market
              <br /> Needed a Fresh Voice
            </h2>
            <p
              className="text-[14px] leading-[32px] lg:text-[18px] lg:leading-[32px]"
              style={{
                fontWeight: 400,
                color: "#807E7E",
                letterSpacing: "-0.02em",
                whiteSpace: "pre-line",
              }}
            >
              The property industry had been running the same playbook for decades, with
              complicated processes, opaque pricing, and too many middlemen taking a cut
              while buyers, renters, and sellers were left confused.
              {"\n"}
              We entered the market with a different philosophy: radical clarity, smart
              technology, and a genuine care for every person in every transaction. No
              matter where you are in your property journey, RentBuyStay is built to walk
              beside you, not ahead of you.
            </p>
          </div>
        </div>
      </section>

      <ListPropertyCTA />

      {/* FAQ — Figma 280:11201 (desktop) / 803:61837 (mobile, full-width accordion). */}
      <section className="bg-white">
        <div className="mx-auto flex flex-col items-center gap-8 px-4 py-12 lg:gap-16 lg:px-0 lg:py-20 lg:w-[846px] lg:max-w-[calc(100%-160px)]">
          <div className="w-full flex flex-col text-center gap-2 lg:w-[628px] lg:max-w-full">
            <h2
              className="text-[28px] leading-[36px] lg:text-[40px] lg:leading-[1.3]"
              style={{ fontWeight: 600, color: "#121212", letterSpacing: "-0.02em", textAlign: "center" }}
            >
              Frequently Asked Questions
            </h2>
            <p
              className="text-[14px] leading-[28px] lg:text-[18px] lg:leading-[32px]"
              style={{
                fontWeight: 400,
                color: "rgba(46,46,46,0.6)",
                letterSpacing: "-0.02em",
                textAlign: "center",
              }}
            >
              We&rsquo;re dedicated to revolutionizing the way property and people connect.
              Our platform is built on ease of access and trust to streamline the buying,
              selling, and leasing process for everyone.
            </p>
          </div>

          <div className="flex flex-col gap-4 lg:gap-6 w-full">
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

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GetStartedFreeButton from "@/components/GetStartedFreeButton";
import LogInButton from "@/components/LogInButton";
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
    <div className="min-h-screen flex flex-col bg-white">
      {/* HERO — Figma 280:11076: 1440x900; inner card 1392x852 r=24.91; dark gradient overlay, centered title + bottom stats */}
      <section className="bg-white" style={{ paddingLeft: "24px", paddingRight: "24px", paddingTop: "24px" }}>
        <div
          className="relative overflow-hidden bg-[#F3FEFE]"
          style={{ borderRadius: "24.91px", width: "100%", height: "852px" }}
        >
          <Image
            src="/images/about-hero.png"
            alt="One platform. Every property need."
            fill
            className="object-cover"
            priority
          />
          {/* Dark gradient overlay — Figma fill_T5DA0V */}
          {/* Gradient overlay — Figma 280:11080 Rectangle 43: gradient stops at 0/7/13/18/32/69/100%, fill opacity 0.65 */}
          <div
            className="absolute inset-0 z-1"
            style={{
              background:
                "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.96) 7%, rgba(0,0,0,0.94) 13%, rgba(0,0,0,0.91) 18%, rgba(0,0,0,0.84) 32%, rgba(0,0,0,0.5) 69%, rgba(102,102,102,0) 100%)",
              opacity: 0.65,
            }}
          />
          {/* Solid dark overlay 0.2 — Figma second fill */}
          <div className="absolute inset-0 z-1" style={{ background: "rgba(0,0,0,0.2)" }} />

          <Navbar transparent />

          {/* Title block — Figma 280:11081: 641 wide, x:64 y:540, column gap 16 */}
          <div
            className="absolute z-10 flex flex-col"
            style={{
              left: "64px",
              top: "540px",
              width: "641px",
              maxWidth: "calc(100% - 128px)",
              gap: "16px",
            }}
          >
            <h1
              className="text-white"
              style={{
                fontSize: "64px",
                lineHeight: "80px",
                fontWeight: 600,
                letterSpacing: "-0.02em",
              }}
            >
              One Platform.
              <br />
              Every Property Need.
            </h1>
            <p
              className="text-white"
              style={{
                fontSize: "18px",
                lineHeight: "32px",
                fontWeight: 400,
                letterSpacing: "-0.02em",
              }}
            >
              Whether you&rsquo;re looking for a furnished apartment this weekend, signing
              a 12-month lease, or taking the big step of owning your first home, we&rsquo;ve
              built the tools, the listings, and the support to make it seamless.
            </p>
          </div>

          {/* Stats — Figma 791:92392: right-bottom, x:921 y:718, row gap 40 */}
          <div
            className="absolute z-10 flex items-center text-white"
            style={{
              left: "921px",
              top: "718px",
              gap: "40px",
            }}
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center justify-center whitespace-nowrap"
                style={{ gap: "8px" }}
              >
                <span
                  style={{
                    fontSize: "48px",
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    textAlign: "center",
                  }}
                >
                  {s.value}
                </span>
                <span
                  style={{
                    fontSize: "16px",
                    lineHeight: "24px",
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.75)",
                    textAlign: "center",
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 1 — Figma 276:9228: 1440x629, content x:80 y:80 w:1280 column gap 40 center
          Image cards OVERLAP with negative gap -24px (Figma layout_1FIJ7I gap: -24px) */}
      <section className="bg-white" style={{ height: "629px" }}>
        <div
          className="mx-auto flex flex-col items-center"
          style={{
            width: "1280px",
            maxWidth: "calc(100% - 160px)",
            paddingTop: "80px",
            gap: "40px",
          }}
        >
          {/* 3 overlapping image cards — Figma 795:61267 component.
              Container layout: row, gap -24px (cards overlap).
              Each card: 179.6x172.79 white r:24 shadow.
              Each card has inner frame 159.3x138.87 r:20 bg #F8F8F8 with a positioned image inside (image bleeds outside inner frame, clipped by overflow). */}
          <div className="flex items-center" style={{ gap: "-24px" }}>
            {[
              {
                src: "/images/about-mi-1.png",
                inner: { x: 9.04, y: 9.04 },
                img: { x: -21.64, y: -5.09, w: 202.75, h: 149.64 },
                rotate: -8,
              },
              {
                src: "/images/about-mi-2.png",
                inner: { x: 11.26, y: 9.04 },
                img: { x: -35.33, y: -6.04, w: 230.24, h: 150.01 },
                rotate: 8,
              },
              {
                src: "/images/about-mi-3.png",
                inner: { x: 9.04, y: 9.04 },
                img: { x: -19.83, y: -3.53, w: 198.25, h: 145.14 },
                rotate: -8,
              },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-white shrink-0 relative"
                style={{
                  width: "179.6px",
                  height: "172.79px",
                  borderRadius: "24px",
                  marginLeft: i === 0 ? 0 : "-24px",
                  boxShadow: "0px 8px 30px 0px rgba(180, 180, 180, 0.25)",
                  zIndex: 3 - i,
                  transform: `rotate(${card.rotate}deg)`,
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

          {/* Quote — Figma 790:92349: 40px Geist Medium 500, line-height 64, letter-spacing -0.8px (-2%), CENTER.
              Two-tone via styleOverrideTable: first 101 chars = #121212, then "space —..." = #807E7E.
              Figma has an explicit \L line-separator after "platform." — reproduce as <br />. */}
          <p
            className="text-center"
            style={{
              maxWidth: "1280px",
              fontSize: "40px",
              lineHeight: "64px",
              fontWeight: 500,
              color: "#121212",
              letterSpacing: "-0.02em",
            }}
          >
            We didn&rsquo;t just build a property platform.
            <br />
            We built the one we wished existed. Finding your perfect{" "}
            <span style={{ color: "#807E7E" }}>
              space — whether for a night, a year, or a lifetime should feel exciting, not exhausting.
            </span>
          </p>
        </div>
      </section>

      {/* SECTION 2 — Figma 791:92393: 1440x616, two columns
          Left text x:80 y:80 w:620 column gap 16
          Right image card x:740 y:80 w:620 h:456 r:20 with DARK GRADIENT OVERLAY + QUOTE at bottom */}
      <section className="bg-white" style={{ height: "616px" }}>
        <div className="relative mx-auto" style={{ width: "1440px", maxWidth: "100%", height: "616px" }}>
          {/* Left text */}
          <div
            className="absolute flex flex-col justify-center"
            style={{ left: "80px", top: "80px", width: "620px", gap: "16px" }}
          >
            {/* OUR STORY pill — Figma 791:92456: bg #F6F6F6 r:50 padding 8 gap 8 shadow + tag-user icon */}
            <span
              className="inline-flex items-center self-start"
              style={{
                padding: "8px",
                background: "#F6F6F6",
                borderRadius: "50px",
                gap: "8px",
                boxShadow: "0px 10px 30px -8px rgba(176,176,176,0.15)",
              }}
            >
              <Image src="/icons/tag-user.svg" alt="" width={20} height={20} />
              <span
                style={{
                  fontSize: "14px",
                  lineHeight: "24px",
                  fontWeight: 500,
                  color: "#305E82",
                  letterSpacing: "-0.01em",
                  textTransform: "uppercase",
                }}
              >
                OUR STORY
              </span>
            </span>
            <h2
              style={{
                fontSize: "40px",
                lineHeight: "64px",
                fontWeight: 600,
                color: "#121212",
                letterSpacing: "-0.02em",
              }}
            >
              Born from a very
              <br />
              real frustration
            </h2>
            <p
              style={{
                fontSize: "18px",
                lineHeight: "32px",
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
              charges. Landlords who are impossible to reach. We know the story — because
              we&rsquo;ve lived it.
              {"\n"}
              RentBuyStay was founded by a team who believed the property market deserved
              better. Not just a prettier website — but a smarter, more honest, more human
              experience from first search to final handshake.
            </p>
          </div>

          {/* Right image card with overlay + quote — Figma 791:92514: 620x456 r:20 */}
          <div
            className="absolute overflow-hidden bg-[#F6F6F6]"
            style={{ left: "740px", top: "80px", width: "620px", height: "456px", borderRadius: "20px" }}
          >
            <Image
              src="/images/about-frustration.png"
              alt="Modern country house"
              fill
              sizes="620px"
              style={{ objectFit: "cover" }}
            />
            {/* Gradient overlay — Figma 795:61280 Rectangle 43: same gradient as hero but fill opacity 0.68 (no extra solid layer) */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.96) 7%, rgba(0,0,0,0.94) 13%, rgba(0,0,0,0.91) 18%, rgba(0,0,0,0.84) 32%, rgba(0,0,0,0.5) 69%, rgba(102,102,102,0) 100%)",
                opacity: 0.68,
              }}
            />
            {/* Quote overlay — Figma 795:61278: x:24 y:320, w:500, column gap 16, total height 112.
                Quote 791:92516 — Cormorant Garamond SemiBold Italic 24/32, letter-spacing -0.48px, h:64 (2 lines, TITLE case)
                Subtitle 791:92518 — Geist Regular 14/32, letter-spacing 0, h:32 */}
            <div
              className="absolute z-10 flex flex-col"
              style={{ left: "24px", top: "320px", width: "500px", gap: "16px" }}
            >
              <p
                className="text-white"
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "24px",
                  lineHeight: "32px",
                  fontWeight: 600,
                  letterSpacing: "-0.48px",
                  fontStyle: "italic",
                }}
              >
                &ldquo;We built RentBuyStay because we kept seeing good people get a bad
                deal. That changes here.&rdquo;
              </p>
              <p
                className="text-white"
                style={{
                  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                  fontSize: "14px",
                  lineHeight: "32px",
                  fontWeight: 400,
                  letterSpacing: 0,
                }}
              >
                - THE RENTBUYSTAY TEAM
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — Figma 793:61154: 1440x632 column
          Title block x:406 y:80 w:628 centered
          Cards row x:80 y:384 row gap 24, each 302x168 */}
      <section className="bg-white" style={{ height: "632px" }}>
        <div className="relative mx-auto" style={{ width: "1440px", maxWidth: "100%", height: "632px" }}>
          {/* Title block */}
          <div
            className="absolute flex flex-col items-center text-center"
            style={{ left: "406px", top: "80px", width: "628px", gap: "16px" }}
          >
            {/* OUR VALUES pill — Figma 793:61156 with octicon:goal-24 icon */}
            <span
              className="inline-flex items-center"
              style={{
                padding: "8px",
                background: "#F6F6F6",
                borderRadius: "50px",
                gap: "8px",
                boxShadow: "0px 10px 30px -8px rgba(176,176,176,0.15)",
              }}
            >
              <Image src="/icons/octicon-goal.svg" alt="" width={20} height={20} />
              <span
                style={{
                  fontSize: "14px",
                  lineHeight: "24px",
                  fontWeight: 500,
                  color: "#305E82",
                  letterSpacing: "-0.01em",
                  textTransform: "uppercase",
                }}
              >
                OUR vALUES
              </span>
            </span>
            <h2
              style={{
                fontSize: "40px",
                lineHeight: "64px",
                fontWeight: 600,
                color: "#121212",
                letterSpacing: "-0.02em",
              }}
            >
              We earn trust the
              <br />
              old-fashioned way
            </h2>
            <p
              style={{
                fontSize: "18px",
                lineHeight: "32px",
                fontWeight: 400,
                color: "rgba(46,46,46,0.6)",
                letterSpacing: "-0.02em",
              }}
            >
              At RentBuyStay, everything we do is shaped by a simple commitment: to put the
              person before the property.
            </p>
          </div>

          {/* 4 cards row — Figma 795:61216: x:80 y:384, row gap 24 */}
          <div
            className="absolute flex items-center"
            style={{ left: "80px", top: "384px", gap: "24px" }}
          >
            {trustCards.map((card) => (
              <div
                key={card.title}
                className="relative"
                style={{
                  width: "302px",
                  height: "168px",
                  borderRadius: "15px",
                  background: card.color,
                }}
              >
                {/* Title row — x:8 y:16, gap 8 */}
                <div
                  className="absolute flex items-center"
                  style={{ left: "8px", top: "16px", gap: "8px" }}
                >
                  <span
                    className="inline-flex items-center justify-center shrink-0"
                    style={{ width: "16px", height: "16px" }}
                  >
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

                {/* Inner white box — x:8 y:56, 286x104, r:12, padding 16 */}
                <div
                  className="absolute bg-white"
                  style={{
                    left: "8px",
                    top: "56px",
                    width: "286px",
                    height: "104px",
                    borderRadius: "12px",
                  }}
                >
                  <p
                    style={{
                      position: "absolute",
                      left: "16px",
                      top: "16px",
                      width: "254px",
                      height: "72px",
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

      {/* CTA — Figma 276:9329: 1440x512, card 1392x464 at x:24 y:24 r:20
          Gradient 174deg #75A3C7 0% → #305E82 96% */}
      <section className="bg-white" style={{ height: "512px", padding: "24px" }}>
        <div
          className="relative overflow-hidden mx-auto flex flex-col items-center justify-center text-center"
          style={{
            width: "1392px",
            maxWidth: "calc(100% - 48px)",
            height: "464px",
            borderRadius: "20px",
            background:
              "linear-gradient(174deg, rgba(117,163,199,1) 0%, rgba(48,94,130,1) 96%), #FFFFFF",
          }}
        >
          <div className="flex flex-col" style={{ width: "640px", maxWidth: "calc(100% - 96px)", gap: "40px" }}>
            <div className="flex flex-col" style={{ gap: "16px" }}>
              <h2
                className="text-white"
                style={{ fontSize: "48px", lineHeight: "64px", fontWeight: 600, textAlign: "center" }}
              >
                Ready to
                <br />
                List Your Property?
              </h2>
              <p
                className="text-white"
                style={{
                  fontSize: "18px",
                  lineHeight: "35px",
                  fontWeight: 400,
                  letterSpacing: "-0.02em",
                  textAlign: "center",
                }}
              >
                Join thousands of owners and agents on Nigeria&rsquo;s fastest-growing
                property platform. Get verified, list your property, and reach millions
                of seekers.
              </p>
            </div>
            <div className="flex items-center justify-center" style={{ gap: "16px" }}>
              <GetStartedFreeButton
                className="flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                style={{
                  height: "48px",
                  padding: "8px 24px",
                  fontSize: "14px",
                  fontWeight: 500,
                  background: "#FFAE00",
                  borderRadius: "12px",
                  border: "1px solid rgba(120,158,187,0.5)",
                  letterSpacing: "-0.02em",
                }}
              />
              <LogInButton
                className="flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                style={{
                  height: "48px",
                  padding: "16px 32px",
                  fontSize: "14px",
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ — Figma 280:11201: 1440x1248
          Title block x:406 y:80 w:628, gap 8
          FAQ list x:297 y:288 w:846 gap 24, each 72 tall r:12 bg #F6F6F6 with tabler:plus icon */}
      <section className="bg-white" style={{ height: "1248px" }}>
        <div className="relative mx-auto" style={{ width: "1440px", maxWidth: "100%", height: "1248px" }}>
          <div
            className="absolute flex flex-col text-center"
            style={{ left: "406px", top: "80px", width: "628px", gap: "8px" }}
          >
            <h2
              style={{
                fontSize: "40px",
                lineHeight: "64px",
                fontWeight: 600,
                color: "#121212",
                letterSpacing: "-0.02em",
                textAlign: "center",
              }}
            >
              Frequently Asked Questions
            </h2>
            <p
              style={{
                fontSize: "18px",
                lineHeight: "32px",
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

          <div
            className="absolute flex flex-col"
            style={{ left: "297px", top: "288px", width: "846px", gap: "24px" }}
          >
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

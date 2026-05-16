"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GetStartedFreeButton from "@/components/GetStartedFreeButton";
import LogInButton from "@/components/LogInButton";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [agreed, setAgreed] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* HERO — Figma 280:10873: 1440x900, inner card 1392x852 r=24.91 at x:24 y:24
          bg #F3FEFE, imageRef eafecfe1251862b1e7a8e26d92f6de3f1893e174 (cityscape)
          dark gradient + 0.2 black overlay
          Title block at x:327 y:282 w:738 column gap 16 (centered text) */}
      <section className="bg-white" style={{ paddingLeft: "24px", paddingRight: "24px", paddingTop: "24px" }}>
        <div
          className="relative overflow-hidden bg-[#F3FEFE]"
          style={{ borderRadius: "24.91px", width: "100%", height: "852px" }}
        >
          <Image
            src="/images/banner-ad-hero.png"
            alt="Contact RentBuyStay"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient overlay — Figma 280:10876 Rectangle 43: same gradient stops, fill opacity 0.65 */}
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

          {/* Title block — Figma 280:10877: x:327 y:282 w:738 column gap 16 */}
          <div
            className="absolute z-10 flex flex-col"
            style={{ left: "327px", top: "282px", width: "738px", maxWidth: "calc(100% - 654px)", gap: "16px" }}
          >
            <h1
              className="text-white text-center"
              style={{
                fontSize: "64px",
                lineHeight: "80px",
                fontWeight: 600,
                letterSpacing: "-0.02em",
              }}
            >
              We&rsquo;re Here to Help You Find Your Dream Home or Property
            </h1>
            <p
              className="text-white text-center"
              style={{
                width: "735px",
                maxWidth: "100%",
                fontSize: "18px",
                lineHeight: "32px",
                fontWeight: 400,
                letterSpacing: "-0.02em",
              }}
            >
              Get in touch with us for personalized guidance, and solutions tailored to your unique needs.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2 — Figma 276:9774: 1440x940, two cards side-by-side
          Form left (280:10915): x:80 y:80 w:628 h:780, white bg, 1px #F6F6F6 border, r:20
          Info right (280:10978): x:732 y:80 w:628 h:780, white bg, 1px #F6F6F6 border, r:20 */}
      <section className="bg-white" style={{ height: "940px" }}>
        <div className="relative mx-auto" style={{ width: "1440px", maxWidth: "100%", height: "940px" }}>
          {/* FORM CARD */}
          <div
            className="absolute bg-white"
            style={{
              left: "80px",
              top: "80px",
              width: "628px",
              height: "780px",
              border: "1px solid #F6F6F6",
              borderRadius: "20px",
            }}
          >
            {/* Title block — x:40 y:40 w:548 column gap 8 */}
            <div className="absolute flex flex-col" style={{ left: "40px", top: "40px", width: "548px", gap: "8px" }}>
              <h2 style={{ fontSize: "20px", lineHeight: "24px", fontWeight: 600, color: "#121212" }}>
                Send us a message
              </h2>
              <p style={{ fontSize: "12px", lineHeight: "20px", fontWeight: 400, color: "#807E7E" }}>
                Fill out the form below and our team will get back to you as soon as possible.
              </p>
            </div>

            {/* Form fields — x:40 y:132 w:548 column gap 16 */}
            <form
              onSubmit={handleSubmit}
              className="absolute flex flex-col"
              style={{ left: "40px", top: "132px", width: "548px", gap: "16px" }}
            >
              {/* First / Last name row — gap 16, each 266 */}
              <div className="flex" style={{ gap: "16px" }}>
                <div className="flex flex-col" style={{ width: "266px", gap: "8px" }}>
                  <label
                    style={{
                      fontSize: "14px",
                      lineHeight: "24px",
                      fontWeight: 500,
                      color: "#121212",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your first name here"
                    className="outline-none"
                    style={{
                      width: "100%",
                      background: "#F6F6F6",
                      borderRadius: "12px",
                      padding: "8px 16px",
                      fontSize: "14px",
                      lineHeight: "24px",
                      fontWeight: 400,
                      color: "#121212",
                      letterSpacing: "-0.02em",
                    }}
                  />
                </div>
                <div className="flex flex-col" style={{ width: "266px", gap: "8px" }}>
                  <label
                    style={{
                      fontSize: "14px",
                      lineHeight: "24px",
                      fontWeight: 500,
                      color: "#121212",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your last name here"
                    className="outline-none"
                    style={{
                      width: "100%",
                      background: "#F6F6F6",
                      borderRadius: "12px",
                      padding: "8px 16px",
                      fontSize: "14px",
                      lineHeight: "24px",
                      fontWeight: 400,
                      color: "#121212",
                      letterSpacing: "-0.02em",
                    }}
                  />
                </div>
              </div>

              {/* Phone Number — with country code + chevron */}
              <div className="flex flex-col" style={{ gap: "8px" }}>
                <label
                  style={{
                    fontSize: "14px",
                    lineHeight: "24px",
                    fontWeight: 500,
                    color: "#121212",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Phone Number
                </label>
                <div
                  className="flex items-center"
                  style={{
                    background: "#F6F6F6",
                    borderRadius: "12px",
                    padding: "8px 16px",
                    gap: "16px",
                  }}
                >
                  <div className="flex items-center" style={{ gap: "4px" }}>
                    <Image src="/icons/flag-us.svg" alt="" width={24} height={24} />
                    <span
                      style={{
                        fontSize: "14px",
                        lineHeight: "140%",
                        fontWeight: 500,
                        color: "#121212",
                      }}
                    >
                      +1
                    </span>
                    <Image src="/icons/chevron-down.svg" alt="" width={16} height={16} />
                  </div>
                  <input
                    type="tel"
                    placeholder="phone number"
                    className="outline-none flex-1 bg-transparent"
                    style={{
                      fontSize: "14px",
                      lineHeight: "24px",
                      fontWeight: 400,
                      color: "#121212",
                    }}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col" style={{ gap: "8px" }}>
                <label
                  style={{
                    fontSize: "14px",
                    lineHeight: "24px",
                    fontWeight: 500,
                    color: "#121212",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="Enter your email address here"
                  className="outline-none"
                  style={{
                    width: "100%",
                    background: "#F6F6F6",
                    borderRadius: "12px",
                    padding: "8px 16px",
                    fontSize: "14px",
                    lineHeight: "24px",
                    fontWeight: 400,
                    color: "#121212",
                    letterSpacing: "-0.02em",
                  }}
                />
              </div>

              {/* Message — taller field with padding 16, gap 8 (layout_68DLZ5) */}
              <div className="flex flex-col" style={{ gap: "8px" }}>
                <label
                  style={{
                    fontSize: "14px",
                    lineHeight: "24px",
                    fontWeight: 500,
                    color: "#121212",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Enter your message here"
                  className="outline-none resize-none"
                  style={{
                    width: "100%",
                    background: "#F6F6F6",
                    borderRadius: "12px",
                    padding: "16px",
                    fontSize: "14px",
                    lineHeight: "24px",
                    fontWeight: 400,
                    color: "#121212",
                    letterSpacing: "-0.02em",
                  }}
                />
              </div>

              {/* Checkbox + agreement — Figma 280:11018 row align-center gap 8 width 369
                  ts1 override: SemiBold underline #305E82 */}
              <label
                className="flex items-center cursor-pointer"
                style={{ width: "369px", maxWidth: "100%", gap: "8px" }}
              >
                <span
                  className="shrink-0 flex items-center justify-center"
                  style={{
                    width: "20px",
                    height: "20px",
                    border: "1.5px solid #807E7E",
                    borderRadius: "5px",
                    background: agreed ? "#305E82" : "transparent",
                    borderColor: agreed ? "#305E82" : "#807E7E",
                  }}
                  onClick={() => setAgreed((v) => !v)}
                >
                  {agreed && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
                <span
                  style={{
                    fontSize: "14px",
                    lineHeight: "24px",
                    fontWeight: 400,
                    color: "#807E7E",
                  }}
                >
                  By reaching out to us, you agree to our{" "}
                  <Link
                    href="/privacy-policy"
                    style={{
                      fontWeight: 600,
                      color: "#305E82",
                      textDecoration: "underline",
                    }}
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
            </form>

            {/* Proceed button — Figma 280:11024: x:40 y:692 w:548 h:48
                Background: BLUE gradient (175deg #75A3C7 0% → #305E82 100%) — NOT orange.
                Border: gradient. Text: Geist Medium 14 with white gradient fill */}
            <button
              type="submit"
              onClick={() => {
                // Form submit fallback
                const form = document.querySelector("form");
                if (form && (form as HTMLFormElement).reportValidity()) {
                  (form as HTMLFormElement).requestSubmit();
                }
              }}
              className="absolute flex items-center justify-center text-white hover:opacity-90 transition-opacity"
              style={{
                left: "40px",
                top: "692px",
                width: "548px",
                height: "48px",
                background: "linear-gradient(175deg, #75A3C7 0%, #305E82 100%)",
                border: "1px solid rgba(120, 158, 187, 0.5)",
                borderRadius: "12px",
                padding: "8px 24px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {submitted ? "Message Sent ✓" : "Proceed"}
            </button>
          </div>

          {/* INFO CARD — Figma 280:10978: x:732 y:80 w:628 h:780, white, 1px #F6F6F6, r:20 */}
          <div
            className="absolute bg-white"
            style={{
              left: "732px",
              top: "80px",
              width: "628px",
              height: "780px",
              border: "1px solid #F6F6F6",
              borderRadius: "20px",
            }}
          >
            {/* Decorative gray block — Figma 280:11027: x:16 y:16 w:596 h:400 r:16 bg #F6F6F6 */}
            <div
              className="absolute"
              style={{
                left: "16px",
                top: "16px",
                width: "596px",
                height: "400px",
                background: "#F6F6F6",
                borderRadius: "16px",
              }}
            />

            {/* Contact details — Figma 280:11073: x:16 y:472 w:497 column gap 24 */}
            <div
              className="absolute flex flex-col"
              style={{ left: "16px", top: "472px", width: "497px", gap: "24px" }}
            >
              {/* Email — Figma 280:11045: row align-center gap 16 */}
              <div className="flex items-center" style={{ gap: "16px" }}>
                <div className="shrink-0" style={{ width: "72px", height: "72px" }}>
                  <Image src="/icons/contact-sms.svg" alt="" width={72} height={72} />
                </div>
                <div className="flex flex-col justify-center" style={{ width: "409px", gap: "16px" }}>
                  <span style={{ fontSize: "20px", lineHeight: "24px", fontWeight: 600, color: "#121212" }}>
                    Email
                  </span>
                  <div className="flex items-center" style={{ gap: "10px" }}>
                    <span style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 400, color: "#807E7E" }}>
                      contact@rentbuystay.com
                    </span>
                    <span style={{ fontSize: "14px", lineHeight: "24px", fontWeight: 400, color: "#305E82" }}>
                      (24/7 Response within 24 hours)
                    </span>
                  </div>
                </div>
              </div>

              {/* Phone — Figma 280:11053: row align-center gap 16 */}
              <div className="flex items-center" style={{ gap: "16px" }}>
                <div className="shrink-0" style={{ width: "72px", height: "72px" }}>
                  <Image src="/icons/contact-call.svg" alt="" width={72} height={72} />
                </div>
                <div className="flex flex-col justify-center" style={{ width: "343px", gap: "16px" }}>
                  <span style={{ fontSize: "20px", lineHeight: "24px", fontWeight: 600, color: "#121212" }}>
                    Phone
                  </span>
                  <div className="flex items-center" style={{ gap: "10px" }}>
                    <span style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 400, color: "#807E7E" }}>
                      +234 818 123 4567, +234 705 632 0710
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA — Figma 276:9875: 1440x512, card 1392x464 at x:24 y:24, r:20
          gradient 174deg #75A3C7 0% → #305E82 96% */}
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

      <Footer />
    </div>
  );
}

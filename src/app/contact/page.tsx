"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ListPropertyCTA from "@/components/ListPropertyCTA";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const inputCls =
  "w-full h-12 bg-[#F6F6F6] rounded-[12px] px-4 text-[14px] leading-[24px] text-[#121212] placeholder:text-[#807E7E] tracking-[-0.02em] outline-none";

// Labelled field wrapper (label + control). `className` lets the First/Last row split into equal columns on desktop.
function Field({
  label,
  className = "",
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-[14px] leading-[24px] font-medium text-[#121212] tracking-[-0.02em]">
        {label}
      </label>
      {children}
    </div>
  );
}

// One contact detail row (icon + title + value) in the info card.
function ContactRow({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative shrink-0 w-12 h-12 lg:w-[72px] lg:h-[72px]">
        <Image src={icon} alt="" fill className="object-contain" />
      </div>
      <div className="flex flex-col justify-center gap-2 lg:gap-4">
        <span className="text-[16px] leading-[24px] lg:text-[20px] font-semibold text-[#121212]">
          {title}
        </span>
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">{children}</div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [agreed, setAgreed] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-clip">
      {/* HERO — Figma 280:10873 (desktop). Title centred; fills the viewport on mobile,
          852px card capped at 1440 on desktop (matches the home/about hero). */}
      <section className="bg-white">
        <div className="max-w-[1440px] mx-auto px-4 py-4 md:px-6 md:py-6">
          <div className="relative overflow-hidden bg-[#F3FEFE] rounded-[20px] md:rounded-[25px] min-h-[calc(100svh-32px)] md:min-h-[calc(100svh-48px)] lg:min-h-0 lg:h-[852px]">
            <Image
              src="/images/banner-ad-hero.png"
              alt="Contact RentBuyStay"
              fill
              className="object-cover"
              priority
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.96) 7%, rgba(0,0,0,0.94) 13%, rgba(0,0,0,0.91) 18%, rgba(0,0,0,0.84) 32%, rgba(0,0,0,0.5) 69%, rgba(102,102,102,0) 100%)",
                opacity: 0.65,
              }}
            />
            <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.2)" }} />

            <Navbar variant="hero" />

            {/* Title — vertically centred on mobile, placed at y=282 on desktop. */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center lg:justify-start lg:pt-[282px] lg:px-0">
              <div className="flex flex-col items-center gap-2 lg:gap-4 w-full lg:w-[738px] lg:max-w-[calc(100%-128px)]">
                <h1
                  className="text-white text-[30px] leading-[40px] lg:text-[64px] lg:leading-[1.2]"
                  style={{ fontWeight: 600, letterSpacing: "-0.02em" }}
                >
                  We&rsquo;re Here to Help You Find Your Dream Home or Property
                </h1>
                <p
                  className="text-white text-[14px] leading-[24px] lg:text-[18px] lg:leading-[32px]"
                  style={{ fontWeight: 400, letterSpacing: "-0.02em" }}
                >
                  Get in touch with us for personalized guidance, and solutions tailored to
                  your unique needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FORM + INFO — Figma 276:9774 (desktop two cards) / 785:90148 (mobile stacked).
          Mobile: borderless form, then bordered info card. Desktop: two bordered cards. */}
      <section className="bg-white">
        <div className="mx-auto flex flex-col gap-10 px-4 py-12 lg:flex-row lg:items-stretch lg:gap-6 lg:px-0 lg:py-20 lg:w-[1280px] lg:max-w-[calc(100%-160px)]">
          {/* FORM CARD — borderless on mobile, bordered + padded on desktop */}
          <div className="lg:flex-1 flex flex-col gap-8 lg:border lg:border-[#F6F6F6] lg:rounded-[20px] lg:p-10">
            <div className="flex flex-col gap-2">
              <h2 className="text-[16px] leading-[24px] lg:text-[20px] font-semibold text-[#121212]">
                Send us a message
              </h2>
              <p className="text-[12px] leading-[20px] text-[#807E7E]">
                Fill out the form below and our team will get back to you as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* First / Last — stacked on mobile, side-by-side on desktop */}
              <div className="flex flex-col gap-4 lg:flex-row">
                <Field label="First Name" className="lg:flex-1">
                  <input type="text" required placeholder="Enter your first name here" className={inputCls} />
                </Field>
                <Field label="Last Name" className="lg:flex-1">
                  <input type="text" required placeholder="Enter your last name here" className={inputCls} />
                </Field>
              </div>

              <Field label="Phone Number">
                <div className="flex items-center h-12 bg-[#F6F6F6] rounded-[12px] px-4 gap-4">
                  <div className="flex items-center gap-1 shrink-0">
                    <Image src="/icons/flag-us.svg" alt="" width={24} height={24} />
                    <span className="text-[14px] font-medium text-[#121212]">+1</span>
                    <Image src="/icons/chevron-down.svg" alt="" width={16} height={16} />
                  </div>
                  <input
                    type="tel"
                    placeholder="phone number"
                    className="flex-1 min-w-0 bg-transparent text-[14px] leading-[24px] text-[#121212] placeholder:text-[#807E7E] outline-none"
                  />
                </div>
              </Field>

              <Field label="Email">
                <input type="email" required placeholder="Enter your email address here" className={inputCls} />
              </Field>

              <Field label="Message">
                <textarea
                  required
                  placeholder="Enter your message here"
                  className="w-full min-h-[160px] bg-[#F6F6F6] rounded-[12px] p-4 text-[14px] leading-[24px] text-[#121212] placeholder:text-[#807E7E] tracking-[-0.02em] outline-none resize-none"
                />
              </Field>

              {/* Agreement checkbox */}
              <label className="flex items-center cursor-pointer gap-2">
                <span
                  className="shrink-0 flex items-center justify-center"
                  style={{
                    width: "20px",
                    height: "20px",
                    border: "1.5px solid",
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
                <span className="text-[12px] leading-[24px] lg:text-[14px] text-[#807E7E]">
                  By reaching out to us, you agree to our{" "}
                  <Link href="/privacy" className="font-semibold text-[#305E82] underline">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>

              {/* Submit — blue gradient, full width */}
              <button
                type="submit"
                className="flex items-center justify-center h-12 px-6 rounded-[12px] text-[14px] font-medium text-white hover:opacity-90 transition-opacity mt-2"
                style={{
                  background: "linear-gradient(175deg, #75A3C7 0%, #305E82 100%)",
                  border: "1px solid rgba(120, 158, 187, 0.5)",
                }}
              >
                {submitted ? "Message Sent ✓" : "Submit Report"}
              </button>
            </form>
          </div>

          {/* INFO CARD — bordered on both; gray block + email + phone */}
          <div className="lg:flex-1 flex flex-col gap-6 lg:gap-14 border border-[#F6F6F6] rounded-[20px] p-4">
            {/* Decorative block (map placeholder) */}
            <div className="w-full h-[250px] lg:h-[400px] bg-[#F6F6F6] rounded-[16px]" />

            <div className="flex flex-col gap-6">
              <ContactRow icon="/icons/contact-sms.svg" title="Email">
                <span className="text-[14px] leading-[24px] lg:text-[16px] text-[#807E7E]">
                  contact@rentbuystay.com
                </span>
                <span className="text-[14px] leading-[24px] text-[#305E82]">
                  (24/7 Response within 24 hours)
                </span>
              </ContactRow>

              <ContactRow icon="/icons/contact-call.svg" title="Phone">
                <span className="text-[14px] leading-[24px] lg:text-[16px] text-[#807E7E]">
                  +234 818 123 4567, +234 705 632 0710
                </span>
              </ContactRow>
            </div>
          </div>
        </div>
      </section>

      <ListPropertyCTA />

      <Footer />
    </div>
  );
}

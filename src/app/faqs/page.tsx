"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "How do I list my property on RentBuyStay?", a: "Click 'Post Property' in the top navigation. Create an account or log in, then follow the steps to add your property details, photos, and pricing. Our team will review and publish your listing within 24 hours." },
  { q: "Are the agents on the platform verified?", a: "Yes. Every agent on RentBuyStay goes through a verification process that includes identity checks, license verification, and review of their track record. Verified agents display a badge on their profile." },
  { q: "How do I contact a property agent?", a: "Visit any property listing and click 'Call Agent' or 'Send Message'. You will be connected directly with the agent responsible for that listing." },
  { q: "Is it free to search for properties?", a: "Yes, searching and browsing listings on RentBuyStay is completely free. We earn a commission only when a transaction is successfully completed." },
  { q: "What areas does RentBuyStay cover?", a: "We cover all 36 states in Nigeria plus the FCT. Our strongest coverage is in Lagos, Abuja, Port Harcourt, Kano, Ibadan and Enugu." },
  { q: "How do I report a fraudulent listing?", a: "Click the flag icon on any listing or contact our support team at hello@rentbuystay.com. We take fraud seriously and will investigate within 24 hours." },
  { q: "Can I book a property inspection?", a: "Yes. On any listing page, click 'Request Inspection' to schedule a visit with the agent at a convenient time." },
  { q: "How are shortlet bookings handled?", a: "Shortlet bookings are processed through our secure payment system. Once your booking is confirmed, you will receive all check-in details from the host or agent." },
];

export default function FAQsPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="bg-[#121212] text-white py-16">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <h1 className="text-3xl lg:text-5xl font-semibold mb-3">Frequently Asked Questions</h1>
          <p className="text-[#7f7e7e]">Everything you need to know about using RentBuyStay.</p>
        </div>
      </section>

      <section className="py-14 bg-[#f6f6f6] flex-1">
        <div className="max-w-3xl mx-auto px-6 lg:px-0">
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="text-sm font-medium text-[#121212]">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-[#7f7e7e] shrink-0 ml-4 transition-transform ${open === i ? "rotate-180" : ""}`}
                  />
                </button>
                {open === i && (
                  <div className="px-6 pb-5 text-sm text-[#7f7e7e] leading-relaxed border-t border-[#ededed] pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

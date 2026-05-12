"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

const contacts = [
  { icon: Mail, label: "Email Us", value: "hello@rentbuystay.com" },
  { icon: Phone, label: "Call Us", value: "+234 800 000 0000" },
  { icon: MapPin, label: "Office", value: "Victoria Island, Lagos, Nigeria" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="bg-[#121212] text-white py-16">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <h1 className="text-3xl lg:text-5xl font-semibold mb-3">Contact Us</h1>
          <p className="text-[#7f7e7e]">We&apos;d love to hear from you. Our team is always happy to help.</p>
        </div>
      </section>

      <section className="py-14 bg-[#f6f6f6] flex-1">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Info */}
            <div className="flex flex-col gap-6">
              {contacts.map((c) => (
                <div key={c.label} className="bg-white rounded-2xl p-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#f3fefe] flex items-center justify-center shrink-0">
                    <c.icon size={18} className="text-[#305e82]" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#7f7e7e]">{c.label}</p>
                    <p className="text-sm font-medium text-[#121212] mt-0.5">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-8">
              {submitted ? (
                <div className="text-center py-10">
                  <p className="text-xl font-semibold text-[#121212] mb-2">Message Sent!</p>
                  <p className="text-sm text-[#7f7e7e]">We&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="flex flex-col gap-5">
                  <h2 className="text-lg font-semibold text-[#121212]">Send us a message</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-medium text-[#121212] block mb-1.5">Full Name</label>
                      <input required type="text" placeholder="John Doe" className="w-full border border-[#ededed] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#305e82]" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-[#121212] block mb-1.5">Email Address</label>
                      <input required type="email" placeholder="you@example.com" className="w-full border border-[#ededed] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#305e82]" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[#121212] block mb-1.5">Subject</label>
                    <input required type="text" placeholder="How can we help?" className="w-full border border-[#ededed] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#305e82]" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[#121212] block mb-1.5">Message</label>
                    <textarea required rows={5} placeholder="Tell us more..." className="w-full border border-[#ededed] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#305e82] resize-none" />
                  </div>
                  <button type="submit" className="bg-[#305e82] text-white font-medium py-3 rounded-xl text-sm hover:bg-[#254d6b] transition-colors">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

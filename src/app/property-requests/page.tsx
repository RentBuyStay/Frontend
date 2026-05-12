"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function PropertyRequestsPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="bg-[#121212] text-white py-16">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <h1 className="text-3xl lg:text-5xl font-semibold mb-3">Property Requests</h1>
          <p className="text-[#7f7e7e] text-base">
            Can&apos;t find what you&apos;re looking for? Tell us what you need and our agents will reach out.
          </p>
        </div>
      </section>

      <section className="py-14 bg-[#f6f6f6] flex-1">
        <div className="max-w-2xl mx-auto px-6 lg:px-0">
          {submitted ? (
            <div className="bg-white rounded-2xl p-12 text-center">
              <div className="w-14 h-14 rounded-full bg-[#14ae5c]/10 flex items-center justify-center mx-auto mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#14ae5c" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="text-xl font-semibold text-[#121212] mb-2">Request Submitted!</p>
              <p className="text-sm text-[#7f7e7e]">Our agents will review your request and contact you within 48 hours.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8">
              <h2 className="text-lg font-semibold text-[#121212] mb-6">Tell us what you need</h2>
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-medium text-[#121212] block mb-1.5">Full Name</label>
                    <input required type="text" placeholder="John Doe" className="w-full border border-[#ededed] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#305e82]" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[#121212] block mb-1.5">Phone Number</label>
                    <input required type="tel" placeholder="+234 800 000 0000" className="w-full border border-[#ededed] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#305e82]" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-[#121212] block mb-1.5">Property Type</label>
                  <select required className="w-full border border-[#ededed] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#305e82] bg-white text-[#121212]">
                    <option value="">Select type</option>
                    <option>House</option>
                    <option>Apartment</option>
                    <option>Land</option>
                    <option>Commercial</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-[#121212] block mb-1.5">Purpose</label>
                  <select required className="w-full border border-[#ededed] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#305e82] bg-white text-[#121212]">
                    <option value="">Select purpose</option>
                    <option>Buy</option>
                    <option>Rent</option>
                    <option>Shortlet</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-[#121212] block mb-1.5">Preferred Location</label>
                  <input required type="text" placeholder="e.g. Lekki Phase 1, Lagos" className="w-full border border-[#ededed] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#305e82]" />
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-medium text-[#121212] block mb-1.5">Min Budget (₦)</label>
                    <input type="number" placeholder="e.g. 5000000" className="w-full border border-[#ededed] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#305e82]" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[#121212] block mb-1.5">Max Budget (₦)</label>
                    <input type="number" placeholder="e.g. 20000000" className="w-full border border-[#ededed] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#305e82]" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-[#121212] block mb-1.5">Additional Notes</label>
                  <textarea rows={4} placeholder="Any specific requirements, features or preferences..." className="w-full border border-[#ededed] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#305e82] resize-none" />
                </div>
                <button type="submit" className="bg-[#305e82] text-white font-medium py-3 rounded-xl text-sm hover:bg-[#254d6b] transition-colors">
                  Submit Request
                </button>
              </form>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

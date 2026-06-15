"use client";

import { useState } from "react";
import { useSubscribeNewsletterMutation } from "@/services/newsletterApi";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [subscribe, { isLoading }] = useSubscribeNewsletterMutation();
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setError("");
    try {
      // The Figma form only collects an email; the backend requires a name, so
      // derive a sensible display name from the email's local part.
      const name = email.split("@")[0]?.trim() || email;
      await subscribe({ name, email }).unwrap();
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <section className="bg-[#f3fefe] py-16">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
        <h2 className="text-2xl lg:text-3xl font-semibold text-[#121212] mb-2">
          Never Miss a Listing
        </h2>
        <p className="text-sm text-[#7f7e7e] mb-6 max-w-md mx-auto">
          Get the latest properties delivered straight to your inbox.
        </p>
        {submitted ? (
          <p className="text-sm font-medium text-[#14ae5c]">
            You&apos;re subscribed! We&apos;ll be in touch.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 border border-[#ededed] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#305e82] bg-white"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#305e82] text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-[#254d6b] transition-colors whitespace-nowrap disabled:opacity-60"
            >
              {isLoading ? "Subscribing…" : "Subscribe"}
            </button>
          </form>
        )}
        {error && <p className="text-sm font-medium text-[#e5484d] mt-3">{error}</p>}
      </div>
    </section>
  );
}

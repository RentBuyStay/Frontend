"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useSubscribeNewsletterMutation } from "@/services/newsletterApi";

const GRADIENT = "linear-gradient(175deg, rgba(117,163,199,1) 0%, rgba(48,94,130,1) 100%)";
const labelStyle = { fontSize: "14px", lineHeight: "24px", fontWeight: 500, color: "#121212", letterSpacing: "-0.02em" } as const;

/** "Get Instant Notifications" subscribe modal (Figma 110:3736 desktop / 743:72322 mobile).
 *  Posts to /newsletter/subscribe. Mobile = full page, desktop = centered 580px card. */
export default function SubscribeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [subscribe, { isLoading }] = useSubscribeNewsletterMutation();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open || !mounted) return null;

  async function handleSubscribe() {
    setError("");
    if (!name.trim() || !email.trim()) {
      setError("Please enter your name and email.");
      return;
    }
    try {
      await subscribe({
        name: name.trim(),
        email: email.trim(),
        phoneNumber: phone.trim() ? `+1 ${phone.trim()}` : undefined,
      }).unwrap();
      setDone(true);
    } catch {
      setError("Something went wrong. Please try again.");
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[10000] overflow-y-auto md:flex md:items-center md:justify-center md:p-4"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className="bg-white w-full min-h-full md:min-h-0 md:w-[580px] md:max-w-[580px] md:max-h-[90vh] md:overflow-y-auto md:rounded-[24px] p-4 pt-10 md:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header: title + subtitle on the left, close on the right */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-2 min-w-0">
            <h2 className="text-[16px] md:text-[20px]" style={{ lineHeight: "24px", fontWeight: 600, color: "#121212" }}>
              Get Instant Notifications
            </h2>
            <p className="text-[12px] md:max-w-[363px]" style={{ lineHeight: "20px", fontWeight: 400, color: "#807E7E" }}>
              Get priority alerts for newly available properties via email to ease your house search experience.
            </p>
          </div>
          <button onClick={onClose} aria-label="Close" className="shrink-0 hover:opacity-70 transition-opacity">
            <Image src="/icons/cancel.svg" alt="" width={24} height={24} />
          </button>
        </div>

        {done ? (
          <div className="mt-8 flex flex-col items-center text-center gap-3 py-6">
            <p className="text-[16px] font-semibold text-[#14ae5c]">You&apos;re subscribed!</p>
            <p className="text-[14px] text-[#807e7e] max-w-[360px]">
              We&apos;ll send you priority alerts for newly available properties.
            </p>
            <button
              onClick={onClose}
              className="mt-2 text-white rounded-[12px] hover:opacity-90 transition-opacity"
              style={{ height: "48px", padding: "8px 32px", fontSize: "14px", fontWeight: 500, background: GRADIENT, border: "1px solid rgba(120,158,187,0.5)" }}
            >
              Done
            </button>
          </div>
        ) : (
          <>
            {/* Fields */}
            <div className="flex flex-col gap-4 mt-6">
              <div className="flex flex-col gap-2">
                <label style={labelStyle}>Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name here"
                  className="h-12 rounded-[12px] bg-[#F6F6F6] px-4 text-[14px] text-[#121212] outline-none placeholder:text-[#807E7E]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label style={labelStyle}>Phone Number</label>
                <div className="h-12 rounded-[12px] bg-[#F6F6F6] px-4 flex items-center gap-4">
                  <div className="flex items-center gap-1 shrink-0">
                    <Image src="/icons/flag-us.svg" alt="US" width={24} height={24} />
                    <span className="text-[14px] font-medium text-[#807E7E]">+1</span>
                    <Image src="/icons/chevron-down.svg" alt="" width={16} height={16} />
                  </div>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    inputMode="tel"
                    placeholder="Enter phone number"
                    className="flex-1 min-w-0 bg-transparent text-[14px] text-[#121212] outline-none placeholder:text-[#807E7E]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label style={labelStyle}>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address here"
                  className="h-12 rounded-[12px] bg-[#F6F6F6] px-4 text-[14px] text-[#121212] outline-none placeholder:text-[#807E7E]"
                />
              </div>
            </div>

            {error && <p className="text-[13px] text-[#e5484d] mt-3">{error}</p>}

            {/* Subscribe */}
            <button
              onClick={handleSubscribe}
              disabled={isLoading}
              className="w-full flex items-center justify-center text-white rounded-[12px] hover:opacity-90 transition-opacity disabled:opacity-60 mt-10"
              style={{ height: "48px", padding: "8px 24px", fontSize: "14px", fontWeight: 500, background: GRADIENT, border: "1px solid rgba(120,158,187,0.5)" }}
            >
              {isLoading ? "Subscribing…" : "Subscribe"}
            </button>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}

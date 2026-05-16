"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

export default function LoginModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [showPassword, setShowPassword] = useState(false);

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

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[24px] relative"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "580px",
          maxWidth: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* Close X — absolute at Figma position (516, 40) within 580px modal */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute hover:opacity-70 transition-opacity"
          style={{ top: "40px", right: "40px", width: "24px", height: "24px" }}
        >
          <Image src="/icons/cancel.svg" alt="" width={24} height={24} />
        </button>

        {/* Content — Figma: at (40, 40), width 500, column gap 40, 4 children */}
        <div
          className="flex flex-col"
          style={{ padding: "40px", gap: "40px" }}
        >
          {/* 1. Logo — Figma: 76x64 */}
          <Image
            src="/images/logo-icon.png"
            alt="RentBuyStay"
            width={76}
            height={64}
            style={{ width: "76px", height: "64px" }}
          />

          {/* 2. Title — Figma: Geist SemiBold 24px / 32px LH, color #121212, 2 lines */}
          <h2 style={{ fontSize: "24px", lineHeight: "32px", fontWeight: 600, color: "#121212" }}>
            Sign in to unlock the best<br />of RentBuyStay
          </h2>

          {/* 3. Form fields — Figma: Frame 2147237035, column gap 16 */}
          <div className="flex flex-col" style={{ gap: "16px" }}>
            {/* Name section — gap 8 */}
            <div className="flex flex-col" style={{ gap: "8px" }}>
              <label style={{ fontSize: "14px", lineHeight: "24px", fontWeight: 500, color: "#121212", letterSpacing: "-0.02em" }}>
                Name
              </label>
              <div
                className="bg-[#F6F6F6] rounded-[12px] flex items-center"
                style={{ padding: "8px 16px" }}
              >
                <input
                  type="text"
                  placeholder="Enter your full name here"
                  className="flex-1 outline-none bg-transparent"
                  style={{ fontSize: "14px", lineHeight: "24px", color: "#121212" }}
                />
              </div>
            </div>

            {/* Password section — gap 8 between label, input, and remember/forgot row */}
            <div className="flex flex-col" style={{ gap: "8px" }}>
              <label style={{ fontSize: "14px", lineHeight: "24px", fontWeight: 500, color: "#121212", letterSpacing: "-0.02em" }}>
                Password
              </label>
              <div
                className="bg-[#F6F6F6] rounded-[12px] flex items-center justify-between gap-2"
                style={{ padding: "8px 16px" }}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="flex-1 outline-none bg-transparent"
                  style={{ fontSize: "14px", lineHeight: "24px", color: "#121212" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="text-[#807e7e] hover:text-[#121212] transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
              {/* Remember me + Forgot Password row — Figma: Frame 208 row justify-between */}
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer" style={{ gap: "8px" }}>
                  <input
                    type="checkbox"
                    className="rounded-[5px] border-[1.5px] border-[#807e7e] accent-[#305e82]"
                    style={{ width: "16px", height: "16px" }}
                  />
                  <span style={{ fontSize: "14px", lineHeight: "24px", color: "#807e7e" }}>Remember me</span>
                </label>
                <a href="#" style={{ fontSize: "14px", lineHeight: "24px", fontWeight: 500, color: "#305e82" }} className="hover:underline">
                  Forgot Password?
                </a>
              </div>
            </div>
          </div>

          {/* 4. Bottom section — Figma: Frame 2147237090, column gap 24 */}
          <div className="flex flex-col" style={{ gap: "24px" }}>
            {/* Proceed button — Figma: padding 8/24, h=48, rounded-12, gradient */}
            <button
              onClick={onClose}
              className="text-white rounded-[12px] hover:opacity-90 transition-opacity w-full flex items-center justify-center"
              style={{
                height: "48px",
                padding: "8px 24px",
                fontSize: "14px",
                fontWeight: 500,
                background: "linear-gradient(175deg, rgba(117,163,199,1) 0%, rgba(48,94,130,1) 100%)",
                border: "1px solid rgba(120,158,187,0.5)",
              }}
            >
              Proceed
            </button>
            {/* Register link — Figma: Manrope 16px center, color #807e7e + #305e82 */}
            <p className="text-center" style={{ fontSize: "16px", lineHeight: "24px", color: "#807e7e" }}>
              Don&rsquo;t have an account yet?{" "}
              <a href="#" style={{ fontWeight: 500, color: "#305e82" }} className="hover:underline">
                Register here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

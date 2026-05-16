"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Figma node 280:11625 "create account" — 580x680 modal opened by "Get Started Free" buttons.
// 4 user-type cards (Property Seeker / Real Estate Agent / Property Owner / Real Estate Agency or Developer)
// → Proceed (disabled at 25% opacity until selection) → "Have a RentBuyStay account? Sign In"

const userTypes = [
  { id: "seeker", label: "Property Seeker", icon: "/icons/user-profile.svg" },
  { id: "agent", label: "Real Estate Agent", icon: "/icons/user-tag.svg" },
  { id: "owner", label: "Property Owner", icon: "/icons/user-profile-tick.svg" },
  {
    id: "agency",
    label: "Real Estate Agency or Developer",
    icon: "/icons/user-crane-tower.svg",
  },
];

export default function CreateAccountModal({
  open,
  onClose,
  onSwitchToLogin,
}: {
  open: boolean;
  onClose: () => void;
  /** Optional: called when user clicks "Sign In" — typically closes this modal and opens LoginModal */
  onSwitchToLogin?: () => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);

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

  const proceedEnabled = selected !== null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className="relative bg-white"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "580px",
          maxWidth: "100%",
          height: "680px",
          maxHeight: "calc(100vh - 32px)",
          borderRadius: "24px",
          overflowY: "auto",
        }}
      >
        {/* Cancel — Figma 280:12319: x:516 y:40, 24x24 */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute hover:opacity-80"
          style={{ top: "40px", right: "40px", width: "24px", height: "24px" }}
        >
          <Image src="/icons/modal-cancel.svg" alt="" width={24} height={24} />
        </button>

        {/* Content frame — Figma 280:11626: x:40 y:40 w:500 column gap 40 */}
        <div
          className="absolute flex flex-col"
          style={{ left: "40px", top: "40px", width: "500px", maxWidth: "calc(100% - 80px)", gap: "40px" }}
        >
          {/* Title — Figma 24/600 line-height 32, textAlignHorizontal: LEFT */}
          <h2
            style={{
              fontSize: "24px",
              lineHeight: "32px",
              fontWeight: 600,
              color: "#121212",
              textAlign: "left",
            }}
          >
            What type of account
            <br />
            are you setting up?
          </h2>

          {/* User-type cards — Figma 280:11629 column gap 24, each 500x72 r:20 1px #F6F6F6 border */}
          <div className="flex flex-col" style={{ gap: "24px" }}>
            {userTypes.map((u) => (
              <button
                key={u.id}
                type="button"
                onClick={() => setSelected(u.id)}
                className="flex items-center hover:bg-[#FAFAFA] transition-colors"
                style={{
                  width: "100%",
                  height: "72px",
                  background: "#FFFFFF",
                  border:
                    selected === u.id ? "1px solid #305E82" : "1px solid #F6F6F6",
                  borderRadius: "20px",
                  padding: "24px",
                  gap: "16px",
                  cursor: "pointer",
                  textAlign: "left",
                  justifyContent: "flex-start",
                }}
              >
                <Image src={u.icon} alt="" width={24} height={24} className="shrink-0" />
                <span
                  style={{
                    fontSize: "16px",
                    lineHeight: "24px",
                    fontWeight: 500,
                    color: "#121212",
                    textAlign: "left",
                  }}
                >
                  {u.label}
                </span>
              </button>
            ))}
          </div>

          {/* Proceed + Sign-in row — Figma 280:11634 column gap 24 */}
          <div className="flex flex-col" style={{ gap: "24px" }}>
            {/* Proceed — Figma 280:11635: blue gradient r:12, padding 8 24, opacity 0.25 when disabled */}
            <button
              type="button"
              disabled={!proceedEnabled}
              className="flex items-center justify-center text-white transition-opacity"
              style={{
                width: "100%",
                padding: "8px 24px",
                gap: "8px",
                background:
                  "linear-gradient(175deg, #75A3C7 0%, #305E82 100%)",
                border: "1px solid rgba(120,158,187,0.5)",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: 500,
                opacity: proceedEnabled ? 1 : 0.25,
                cursor: proceedEnabled ? "pointer" : "not-allowed",
                height: "48px",
              }}
            >
              Proceed
            </button>

            {/* "Have a RentBuyStay account? Sign In" — Manrope 16/24 #807E7E, Sign In is Medium #305E82 */}
            <p
              className="text-center"
              style={{
                fontFamily: "Manrope, system-ui, sans-serif",
                fontSize: "16px",
                lineHeight: "24px",
                fontWeight: 400,
                color: "#807E7E",
              }}
            >
              Have a RentBuyStay account?{" "}
              <button
                type="button"
                onClick={() => {
                  if (onSwitchToLogin) onSwitchToLogin();
                  else onClose();
                }}
                style={{
                  fontWeight: 500,
                  color: "#305E82",
                  fontFamily: "inherit",
                  fontSize: "inherit",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

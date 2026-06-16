"use client";

import { useState } from "react";
import SubscribeModal from "./SubscribeModal";

/** The sidebar "Subscribe Now" button — opens the Get Instant Notifications modal. */
export default function SubscribeNowButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-white rounded-[8px] hover:opacity-90 transition-opacity"
        style={{ fontSize: "14px", fontWeight: 600, background: "#FFAE00", width: "147px", height: "48px" }}
      >
        Subscribe Now
      </button>
      <SubscribeModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

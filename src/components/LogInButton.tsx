"use client";

import { useState, type CSSProperties } from "react";
import LoginModal from "./LoginModal";

// Per Figma prototype: every "Log in" CTA next to "Get Started Free" (property-detail 133:18884,
// about 276:9439, contact 276:9985, legal 268:39410) has ON_CLICK → OVERLAY → node 254:36501
// (LoginModal) — the same modal that the navbar "Post a Request" dropdown opens.
//
// Intentionally does NOT also render CreateAccountModal: the user wants the same simple
// LoginModal experience here as in the navbar "Post a Request" flow.

export default function LogInButton({
  style,
  className,
}: {
  style?: CSSProperties;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={className}
        style={style}
      >
        Log in
      </button>
      <LoginModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

"use client";

import { useState, type CSSProperties } from "react";
import CreateAccountModal from "./CreateAccountModal";
import LoginModal from "./LoginModal";

// "Get Started Free" button — per Figma prototype (e.g. property-detail node 133:18882):
// ON_CLICK opens overlay 280:11625 ("create account") with the 4 user-type picker.
// Inside that modal, "Sign In" switches to LoginModal (the same modal Post a Request opens).

type AuthState = "closed" | "register" | "login";

export default function GetStartedFreeButton({
  style,
  className,
}: {
  style?: CSSProperties;
  className?: string;
}) {
  const [state, setState] = useState<AuthState>("closed");
  return (
    <>
      <button
        type="button"
        onClick={() => setState("register")}
        className={className}
        style={style}
      >
        Get Started Free
      </button>
      <CreateAccountModal
        open={state === "register"}
        onClose={() => setState("closed")}
        onSwitchToLogin={() => setState("login")}
      />
      <LoginModal
        open={state === "login"}
        onClose={() => setState("closed")}
        onSwitchToRegister={() => setState("register")}
      />
    </>
  );
}

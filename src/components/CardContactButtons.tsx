"use client";

import Image from "next/image";
import { useAuthAction } from "@/lib/useAuthAction";

/**
 * Call + Message icon buttons for a property card. Routes through the shared
 * auth helper (useAuthAction): hands the listing off to the dashboard app, which
 * owns auth. Lives inside a card <Link>, so it stops the click from navigating to
 * the detail page.
 */
export default function CardContactButtons({
  propertyId,
  name,
  pushRight = false,
}: {
  propertyId: string;
  name: string;
  /** Push the buttons to the far right of the row (for full-width agent rows). */
  pushRight?: boolean;
}) {
  const { requireAuth } = useAuthAction();

  // Deep-link the exact action so a card's Call dials and Message opens the chat
  // in the app (same as the property-detail buttons), not a generic details page.
  const contact = (action: "call" | "message") => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    requireAuth(`/dashboard/browse/${propertyId}?action=${action}`);
  };

  return (
    <div className={`flex items-center shrink-0 ${pushRight ? "ml-auto pl-3" : "ml-3"}`} style={{ gap: "14px" }}>
      <button
        type="button"
        onClick={contact("call")}
        aria-label={`Call ${name}`}
        className="hover:opacity-70"
        style={{ background: "none", border: "none", padding: 0, width: "20px", height: "20px", cursor: "pointer" }}
      >
        <Image src="/icons/call-dark.svg" alt="" width={20} height={20} />
      </button>
      <button
        type="button"
        onClick={contact("message")}
        aria-label={`Message ${name}`}
        className="hover:opacity-70"
        style={{ background: "none", border: "none", padding: 0, width: "18px", height: "18px", cursor: "pointer" }}
      >
        <Image src="/icons/messages-2-dark.svg" alt="" width={18} height={18} />
      </button>
    </div>
  );
}

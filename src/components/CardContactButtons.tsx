"use client";

import Image from "next/image";
import { config } from "@/lib/config";

/**
 * Call + Message icon buttons for a property card. Always hand off to the
 * property in the dashboard app — auth lives there and the marketing site can't
 * see that session across domains, so the app decides: a signed-in user goes
 * straight through, a signed-out one is prompted to log in and returned. Lives
 * inside a card <Link>, so it stops the click from navigating to the detail page.
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
  const contact = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.assign(`${config.appUrl}/dashboard/browse/${propertyId}`);
  };

  return (
    <div className={`flex items-center shrink-0 ${pushRight ? "ml-auto pl-3" : "ml-3"}`} style={{ gap: "14px" }}>
      <button
        type="button"
        onClick={contact}
        aria-label={`Call ${name}`}
        className="hover:opacity-70"
        style={{ background: "none", border: "none", padding: 0, width: "20px", height: "20px", cursor: "pointer" }}
      >
        <Image src="/icons/call-dark.svg" alt="" width={20} height={20} />
      </button>
      <button
        type="button"
        onClick={contact}
        aria-label={`Message ${name}`}
        className="hover:opacity-70"
        style={{ background: "none", border: "none", padding: 0, width: "18px", height: "18px", cursor: "pointer" }}
      >
        <Image src="/icons/messages-2-dark.svg" alt="" width={18} height={18} />
      </button>
    </div>
  );
}

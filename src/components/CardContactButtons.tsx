"use client";

import Image from "next/image";
import { useGetMeQuery } from "@/services/meApi";
import { config, appLoginUrl } from "@/lib/config";

/**
 * Call + Message icon buttons for a property card. Mirrors the app's saved-card
 * contact actions: signed-in users are taken to the property in the dashboard
 * app to call/message the lister; signed-out users go to the app login (with a
 * return URL) via the shared session. Lives inside a card <Link>, so it stops
 * the click from navigating to the detail page.
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
  const { data: me } = useGetMeQuery();
  const isAuthed = !!me;

  const contact = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAuthed) {
      window.location.assign(`${config.appUrl}/dashboard/browse/${propertyId}`);
    } else {
      const returnTo = typeof window !== "undefined" ? window.location.href : undefined;
      window.location.assign(appLoginUrl(returnTo));
    }
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

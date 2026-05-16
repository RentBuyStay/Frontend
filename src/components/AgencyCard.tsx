import Image from "next/image";
import Link from "next/link";
import { VerifyBadge, LocationIcon } from "./AgentCard";

export type Agency = {
  id: string;
  name: string;
  location: string;
  rating: number;
  listings: number;
  logo: string;
};

// Figma node 252:31624 — 411x456, r=20, bg white, 1px border #F6F6F6
export default function AgencyCard({ a }: { a: Agency }) {
  return (
    <div
      className="bg-white overflow-hidden flex flex-col"
      style={{
        width: "411px",
        height: "456px",
        borderRadius: "20px",
        border: "1px solid #F6F6F6",
      }}
    >
      <div
        className="relative shrink-0 overflow-hidden"
        style={{ width: "411px", height: "200px", background: "#F4FBFF" }}
      >
        <Image src={a.logo} alt={a.name} fill sizes="411px" style={{ objectFit: "cover" }} />
      </div>

      <div className="flex flex-col flex-1" style={{ padding: "24px 16px 24px 16px" }}>
        <div className="flex flex-col" style={{ gap: "8px" }}>
          <div className="flex items-center" style={{ gap: "8px" }}>
            <span
              style={{
                fontSize: "20px",
                lineHeight: "24px",
                fontWeight: 600,
                color: "#121212",
                letterSpacing: "-0.02em",
              }}
            >
              {a.name}
            </span>
            <VerifyBadge />
          </div>
          <div className="flex items-center" style={{ gap: "8px" }}>
            <LocationIcon />
            <span
              style={{
                fontSize: "12px",
                lineHeight: "24px",
                fontWeight: 400,
                color: "#305E82",
                letterSpacing: "-0.02em",
              }}
            >
              {a.location}
            </span>
          </div>
        </div>

        <div
          style={{
            height: "1px",
            background: "#EDEDED",
            marginTop: "24px",
            marginBottom: "16px",
            marginLeft: "-16px",
            marginRight: "-16px",
          }}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center" style={{ gap: "16px" }}>
            <div className="flex items-center" style={{ gap: "8px" }}>
              <Image src="/icons/star.svg" alt="" width={20} height={20} />
              <span style={{ fontSize: "12px", lineHeight: "24px", color: "#807E7E" }}>
                {a.rating.toFixed(1)}
              </span>
            </div>
            <div style={{ width: "1px", height: "14px", background: "#E5E5E5" }} />
            <div className="flex items-center" style={{ gap: "8px" }}>
              <Image src="/icons/buildings.svg" alt="" width={20} height={20} />
              <span style={{ fontSize: "12px", lineHeight: "24px", color: "#807E7E" }}>
                {a.listings} listings
              </span>
            </div>
          </div>
          <Link
            href="#"
            className="hover:underline"
            style={{
              fontSize: "14px",
              lineHeight: "18px",
              fontWeight: 500,
              color: "#305E82",
              letterSpacing: "-0.02em",
            }}
          >
            View all Properties
          </Link>
        </div>

        <div
          style={{
            height: "1px",
            background: "#EDEDED",
            marginTop: "16px",
            marginBottom: "24px",
            marginLeft: "-16px",
            marginRight: "-16px",
          }}
        />

        <div className="flex items-center" style={{ gap: "16px" }}>
          <button
            className="flex-1 flex items-center justify-center hover:bg-[#f6f6f6] transition-colors"
            style={{
              height: "48px",
              padding: "8px 24px",
              gap: "8px",
              borderRadius: "12px",
              border: "1px solid #EDEDED",
              fontSize: "14px",
              fontWeight: 500,
              color: "#121212",
              letterSpacing: "-0.02em",
            }}
          >
            <Image src="/icons/call.svg" alt="" width={20} height={20} />
            Call
          </button>
          <button
            className="flex-1 flex items-center justify-center text-white hover:opacity-90 transition-opacity"
            style={{
              height: "48px",
              padding: "8px 24px",
              gap: "8px",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: 500,
              background:
                "linear-gradient(175deg, rgba(117,163,199,1) 0%, rgba(48,94,130,1) 100%)",
              border: "1px solid rgba(120, 158, 187, 0.5)",
              letterSpacing: "-0.02em",
            }}
          >
            <Image src="/icons/messages-2.svg" alt="" width={20} height={20} />
            Message
          </button>
        </div>
      </div>
    </div>
  );
}

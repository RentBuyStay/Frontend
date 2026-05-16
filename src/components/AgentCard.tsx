import Image from "next/image";
import Link from "next/link";

export type Agent = {
  name: string;
  avatar?: string;
  initials: string;
  agency: string;
  location: string;
  rating: number;
  listings: number;
};

// Figma: vuesax/bold/verify, 20x20, green #14AE5C
export function VerifyBadge() {
  return (
    <span className="inline-flex shrink-0" style={{ width: "20px", height: "20px" }}>
      <Image src="/icons/verify.svg" alt="verified" width={20} height={20} />
    </span>
  );
}

// Figma: vuesax/linear/location group 24x24 containing 19x22 pin glyph (centered)
export function LocationIcon() {
  return (
    <span
      className="inline-flex items-center justify-center shrink-0"
      style={{ width: "24px", height: "24px" }}
    >
      <Image src="/icons/location.svg" alt="" width={19} height={22} />
    </span>
  );
}

// Figma node 252:31027 — 411x284, r=20, bg white, 1px border #F6F6F6, padding 24
export default function AgentCard({ a }: { a: Agent }) {
  return (
    <div
      className="bg-white overflow-hidden flex flex-col"
      style={{
        width: "411px",
        height: "284px",
        borderRadius: "20px",
        padding: "24px",
        border: "1px solid #F6F6F6",
      }}
    >
      <div className="flex items-center" style={{ gap: "16px" }}>
        <div
          className="rounded-full overflow-hidden bg-[#F3FEFE] border border-[#EDEDED] shrink-0 flex items-center justify-center"
          style={{ width: "64px", height: "64px" }}
        >
          {a.avatar ? (
            <Image
              src={a.avatar}
              alt={a.name}
              width={64}
              height={64}
              className="object-cover w-full h-full"
            />
          ) : (
            <span style={{ fontSize: "20px", fontWeight: 600, color: "#305E82" }}>
              {a.initials}
            </span>
          )}
        </div>
        <div className="flex flex-col min-w-0 flex-1" style={{ gap: "8px" }}>
          <div className="flex items-center" style={{ gap: "8px" }}>
            <span
              className="truncate"
              style={{
                fontSize: "18px",
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
          <span
            className="truncate"
            style={{
              fontSize: "12px",
              lineHeight: "20px",
              fontWeight: 400,
              color: "#807E7E",
              letterSpacing: "-0.02em",
            }}
          >
            {a.agency}
          </span>
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
      </div>

      <div
        style={{
          height: "1px",
          background: "#EDEDED",
          marginTop: "24px",
          marginBottom: "16px",
          marginLeft: "-24px",
          marginRight: "-24px",
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
          marginLeft: "-24px",
          marginRight: "-24px",
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
  );
}

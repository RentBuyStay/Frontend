"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  useGetPropertyQuery,
  useGetActivePropertiesQuery,
  useGetSavedPropertiesQuery,
  useSavePropertyMutation,
  useUnsavePropertyMutation,
} from "@/services/propertyApi";
import { useGetAgentsQuery } from "@/services/agentApi";
import { useGetMeQuery } from "@/services/meApi";
import { toPropertyCard } from "@/lib/propertyMap";
import { config, appLoginUrl } from "@/lib/config";
import PropertyCard from "./PropertyCard";
import { PropertyGallery } from "./PropertyGallery";
import LoginModal from "./LoginModal";

const FREQ: Record<string, string> = {
  PER_NIGHT: "/night",
  PER_WEEK: "/week",
  PER_MONTH: "/month",
  PER_YEAR: "/year",
  OUTRIGHT: "",
};

function initials(name: string) {
  const p = name.trim().split(/\s+/).filter(Boolean);
  return ((p[0]?.[0] ?? "") + (p[1]?.[0] ?? "")).toUpperCase() || "RB";
}
/** Relative "Joined …" label from an ISO date (null when unknown). */
function joinedAgo(iso?: string): string | null {
  if (!iso) return null;
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days < 1) return "Joined today";
  if (days < 30) return `Joined ${days} day${days === 1 ? "" : "s"} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `Joined ${months} month${months === 1 ? "" : "s"} ago`;
  const years = Math.floor(months / 12);
  return `Joined ${years} year${years === 1 ? "" : "s"} ago`;
}
function fmtDate(iso?: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? "—"
    : d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

// Other Related Properties — Figma 133:18632 / 743:70045 (sidebar bullet list)
const otherCategories = [
  "Serviced Properties for sale",
  "Furnished Properties for sale",
  "Newly Built Properties for sale",
  "Cheap Properties for sale",
  "Luxury Properties for sale",
  "Property for sale between 20milion and 40milion",
  "Property for sale between 40milion and 60milion",
  "Property for sale between 60milion and 80milion",
  "Property for sale between 80milion and 100milion",
  "Property for sale between 100milion and 120milion",
  "Property for sale between 120milion and 150milion",
];

export default function PropertyDetail({ id }: { id: string }) {
  const router = useRouter();
  // Go to the previous page in history; fall back to home on a direct landing.
  const goBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) router.back();
    else router.push("/");
  };
  const { data: p, isLoading, isError } = useGetPropertyQuery(id);
  const { data: relatedData } = useGetActivePropertiesQuery(
    p ? { listingType: p.listingType, size: 4 } : undefined,
    { skip: !p },
  );
  // Real "Listed by" agent info (location, joined date, rating, listing count)
  // from the public agent directory, matched on the listing's agent/owner id.
  const { data: agentsPage } = useGetAgentsQuery({ size: 50 });

  // Map centre: use the listing's coordinates when present; otherwise geocode its
  // address (OpenStreetMap/Nominatim) so the map points at the real area.
  const [geo, setGeo] = useState<{ lat: number; lng: number } | null>(null);
  // Gated actions (report / save / inspection / call / message). Auth is the
  // shared cookie session (recognised via /me); when signed out they route to
  // the dashboard app's login, and the shared cookie brings the user back.
  const [showLogin, setShowLogin] = useState(false);
  void showLogin; setShowLogin;
  const { data: me } = useGetMeQuery();
  const isAuthed = !!me;
  const { data: savedPage } = useGetSavedPropertiesQuery({ page: 0, size: 200 }, { skip: !isAuthed });
  const [saveProperty, { isLoading: saving }] = useSavePropertyMutation();
  const [unsaveProperty, { isLoading: unsaving }] = useUnsavePropertyMutation();

  const goToLogin = () => {
    const returnTo = typeof window !== "undefined" ? window.location.href : undefined;
    window.location.assign(appLoginUrl(returnTo));
  };
  // Actions with no inline flow here (inspection/call/message/report) open the
  // dashboard app's version of this listing when signed in.
  const openInApp = (propId: string) => window.location.assign(`${config.appUrl}/dashboard/browse/${propId}`);
  // Signed out → app login; signed in → continue in the dashboard app.
  const requireLogin = () => { if (isAuthed && p) openInApp(p.id); else goToLogin(); };
  useEffect(() => {
    if (!p) return;
    if (p.latitude != null && p.longitude != null) {
      setGeo({ lat: p.latitude, lng: p.longitude });
      return;
    }
    const query = `${p.address || [p.city, p.state].filter(Boolean).join(", ")}, Nigeria`;
    let cancelled = false;
    fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query)}`)
      .then((r) => (r.ok ? r.json() : []))
      .then((rows) => {
        if (!cancelled && Array.isArray(rows) && rows[0]) {
          setGeo({ lat: parseFloat(rows[0].lat), lng: parseFloat(rows[0].lon) });
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [p]);

  if (isLoading) {
    return (
      <section className="bg-white py-20">
        <div className="mx-auto w-full max-w-[1440px] px-4 md:px-[80px]">
          <div className="h-[300px] md:h-[450px] rounded-[20px] bg-[#fafafa] border border-[#f6f6f6] animate-pulse" />
        </div>
      </section>
    );
  }

  if (isError || !p) {
    return (
      <section className="bg-white py-24">
        <div className="mx-auto w-full max-w-[1440px] px-4 md:px-[80px] text-center">
          <p className="text-[16px] text-[#807e7e]">
            {isError ? "Couldn’t load this property." : "Property not found."}{" "}
            <Link href="/" className="text-[#305e82] underline">Back home</Link>
          </p>
        </div>
      </section>
    );
  }

  const currency = !p.currency || p.currency === "NGN" ? "₦" : `${p.currency} `;
  const price = `${currency}${p.price.toLocaleString()}${FREQ[p.priceFrequency] ?? ""}`;
  const location = [p.city, p.state].filter(Boolean).join(", ");
  const area = p.totalAreaSqm ? `${p.totalAreaSqm} sqm` : "—";
  const agentName = p.assignedAgentName || p.ownerName || "Property Owner";
  const agentInitials = initials(agentName);

  // Real agent profile (matched on the listing's agent/owner id).
  const agent = agentsPage?.content?.find(
    (a) => a.userId === (p.assignedAgentUserId || p.ownerUserId),
  );
  const agentLocation = agent
    ? [agent.city, agent.state].filter(Boolean).join(", ") || "Nigeria"
    : location;
  const agentAgency = agent?.organizationName || "Independent Agent";
  const agentJoined = joinedAgo(agent?.createdAt);
  const agentListings = agent?.listingCount;
  const agentRating =
    agent?.averageRating != null && (agent?.reviewCount ?? 0) > 0
      ? agent.averageRating.toFixed(1)
      : "New";
  const card = toPropertyCard(p);
  const heroImage = card.image ?? "/images/property-placeholder.png";
  const galleryImages = card.images ?? [heroImage];
  const galleryMedia = card.media;
  const amenities = (p.amenities ?? []).map((a) => a.name);
  const related = (relatedData?.content ?? [])
    .filter((x) => x.id !== p.id && x.status === "ACTIVE")
    .slice(0, 3);
  // Geocoded (or real) coordinates; Lagos default only until geocoding resolves.
  const mapLat = geo?.lat ?? p.latitude ?? 6.5244;
  const mapLng = geo?.lng ?? p.longitude ?? 3.3792;

  const isSaved = (savedPage?.content ?? []).some((x) => x.id === p.id);

  // "Interested in this Property?" card — rendered twice (after price on mobile, sidebar on desktop)
  const interestedCard = (
    <div className="bg-white" style={{ width: "100%", border: "1px solid #F6F6F6", borderRadius: "20px", padding: "24px" }}>
      <h3 style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 600, color: "#121212" }}>Interested in this Property?</h3>
      <div className="flex flex-col" style={{ gap: "24px", marginTop: "24px" }}>
        <button onClick={() => (isAuthed ? openInApp(p.id) : goToLogin())} className="flex items-center justify-center text-white hover:opacity-90 transition-opacity" style={{ height: "56px", padding: "16px 24px", gap: "8px", background: "linear-gradient(175deg, #75A3C7 0%, #305E82 100%)", borderRadius: "12px" }}>
          <Image src="/icons/calendar-detail.svg" alt="" width={24} height={24} />
          <span style={{ fontSize: "14px", lineHeight: "24px", fontWeight: 500 }}>Request Inspection</span>
        </button>
        <button
          onClick={() => {
            if (!isAuthed) { goToLogin(); return; }
            if (saving || unsaving) return;
            if (isSaved) unsaveProperty(p.id);
            else saveProperty(p.id);
          }}
          className="flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-60"
          disabled={saving || unsaving}
          style={{ height: "56px", padding: "16px 24px", gap: "8px", background: isSaved ? "rgba(48,94,130,0.06)" : "#FFFFFF", border: "1px solid #F6F6F6", borderRadius: "12px" }}
        >
          <Image src="/icons/heart.svg" alt="" width={24} height={24} />
          <span style={{ fontSize: "14px", lineHeight: "24px", fontWeight: 500, color: "#121212" }}>{isSaved ? "Saved" : "Save for Later"}</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* TOP HEADER — Figma 133:18646 */}
      <section className="bg-white" style={{ paddingTop: "40px" }}>
        <div className="relative mx-auto w-full max-w-[1440px] px-4 md:px-[80px]">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col min-w-0 flex-1" style={{ gap: "16px" }}>
              <button onClick={goBack} className="inline-flex items-center hover:opacity-80 cursor-pointer" style={{ gap: "12px", color: "#525252" }}>
                <Image src="/icons/arrow-back.svg" alt="" width={24} height={24} className="w-4 h-4 md:w-6 md:h-6" />
                <span className="text-[12px] md:text-[16px]" style={{ fontFamily: "Geist, sans-serif", lineHeight: "24px", fontWeight: 400 }}>Back</span>
              </button>
              <h1 className="text-[16px] leading-[24px] md:text-[24px] md:leading-[32px]" style={{ fontWeight: 600, color: "#121212", letterSpacing: "-0.02em" }}>
                {p.title}
              </h1>
              <div className="flex items-center" style={{ gap: "16px" }}>
                <div className="flex items-center" style={{ gap: "8px" }}>
                  <Image src="/icons/location-figma.svg" alt="" width={20} height={20} />
                  <span className="text-[12px] md:text-[14px]" style={{ lineHeight: "24px", fontWeight: 400, color: "#807E7E" }}>{location}</span>
                </div>
                <span style={{ fontSize: "12px", lineHeight: "24px", fontWeight: 400, color: "#807E7E" }}>Listed on {fmtDate(p.listedAt ?? p.createdAt)}</span>
              </div>
            </div>
            <button onClick={requireLogin} className="flex items-center justify-center shrink-0 gap-2 hover:opacity-80 transition-opacity w-10 h-10 md:w-auto md:h-12">
              <Image src="/icons/flag-report.svg" alt="" width={24} height={24} />
              <span className="hidden md:inline" style={{ fontSize: "14px", lineHeight: "24px", fontWeight: 500, color: "#D80027" }}>Report Listing</span>
            </button>
          </div>
        </div>
      </section>

      {/* MAIN BODY — Figma 133:18582 */}
      <section className="bg-white" style={{ paddingTop: "48px", paddingBottom: "80px" }}>
        <div className="mx-auto w-full max-w-[1440px] px-4 md:px-[80px] flex flex-col lg:flex-row gap-6">
          {/* LEFT CONTENT */}
          <div className="flex flex-col w-full min-w-0 lg:flex-1" style={{ gap: "32px" }}>
            {/* Gallery */}
            <PropertyGallery media={galleryMedia} images={galleryImages} alt={p.title} className="h-[300px] md:h-[450px]" />

            {/* Price + Stats row */}
            <div className="flex flex-col gap-4 py-4 border-t border-b border-[#f6f6f6] md:flex-row md:items-center md:justify-between md:gap-0">
              <span className="text-[20px] leading-[32px] md:text-[32px] md:leading-[56px]" style={{ fontWeight: 700, color: "#305E82" }}>{price}</span>
              <div className="flex items-center" style={{ gap: "16px" }}>
                <div className="flex items-center" style={{ gap: "8px" }}>
                  <Image src="/icons/prop-maximize.svg" alt="" width={24} height={24} />
                  <span style={{ fontSize: "14px", lineHeight: "20px", fontWeight: 500, color: "#121212" }}>{area}</span>
                </div>
                <span style={{ width: "1px", height: "20px", background: "#EDEDED" }} />
                <div className="flex items-center" style={{ gap: "8px" }}>
                  <Image src="/icons/prop-bed.svg" alt="" width={24} height={24} />
                  <span style={{ fontSize: "14px", lineHeight: "20px", fontWeight: 500, color: "#121212" }}>{p.bedrooms ?? 0} Beds</span>
                </div>
                <span style={{ width: "1px", height: "20px", background: "#EDEDED" }} />
                <div className="flex items-center" style={{ gap: "8px" }}>
                  <Image src="/icons/prop-bath.svg" alt="" width={24} height={24} />
                  <span style={{ fontSize: "14px", lineHeight: "20px", fontWeight: 500, color: "#121212" }}>{p.bathrooms ?? 0} Baths</span>
                </div>
              </div>
            </div>

            {/* Interested CTA — mobile only */}
            <div className="lg:hidden">{interestedCard}</div>

            {/* Description */}
            <div className="flex flex-col" style={{ gap: "16px" }}>
              <h2 className="text-[14px] leading-[24px] md:text-[20px] md:leading-[32px]" style={{ fontWeight: 600, color: "#305E82" }}>Description</h2>
              <p className="text-[16px] whitespace-pre-line" style={{ lineHeight: "24px", fontWeight: 400, color: "#121212" }}>
                {p.description || "No description provided for this property."}
              </p>
            </div>

            {/* Amenities & Features — shown when the listing has any */}
            {amenities.length > 0 && (
              <div className="flex flex-col" style={{ gap: "16px" }}>
                <h2 className="text-[14px] leading-[24px] md:text-[20px] md:leading-[32px]" style={{ fontWeight: 600, color: "#305E82" }}>Amenities &amp; Features</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4 md:gap-x-[72px] md:gap-y-6">
                  {amenities.map((a) => (
                    <div key={a} className="flex items-center" style={{ gap: "8px" }}>
                      <Image src="/icons/tick-circle.svg" alt="" width={20} height={20} />
                      <span style={{ fontSize: "14px", lineHeight: "20px", fontWeight: 400, color: "#121212" }}>{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Property Details — Figma 133:18753 */}
            <div className="flex flex-col" style={{ gap: "16px" }}>
              <h2 className="text-[14px] leading-[24px] md:text-[20px] md:leading-[32px]" style={{ fontWeight: 600, color: "#305E82" }}>Property Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "24px" }}>
                {[
                  { k: "PROPERTY ID", v: p.referenceCode || "—" },
                  { k: "TYPE", v: p.propertyTypeName || "—" },
                  { k: "Status", v: p.status === "ACTIVE" ? "Active" : p.status },
                  { k: "LISTED ON", v: fmtDate(p.listedAt ?? p.createdAt) },
                ].map((row) => (
                  <div key={row.k} className="flex flex-col" style={{ gap: "8px" }}>
                    <span style={{ fontSize: "13px", lineHeight: "20px", fontWeight: 400, color: "#807E7E", letterSpacing: "-0.02em" }}>{row.k}</span>
                    <span style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 500, color: "#121212", letterSpacing: "-0.02em" }}>{row.v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* View Map — Figma 133:18770 */}
            <div className="flex flex-col" style={{ gap: "16px" }}>
              <h2 className="text-[14px] leading-[24px] md:text-[20px] md:leading-[32px]" style={{ fontWeight: 600, color: "#305E82" }}>View Map</h2>
              <div className="relative overflow-hidden bg-[#F6F6F6]" style={{ width: "100%", height: "424px", borderRadius: "20px" }}>
                <iframe
                  title={`Map of ${location}`}
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${mapLng - 0.03}%2C${mapLat - 0.03}%2C${mapLng + 0.03}%2C${mapLat + 0.03}&layer=mapnik&marker=${mapLat}%2C${mapLng}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR — Figma 133:18583 */}
          <div className="flex flex-col w-full min-w-0 lg:w-[411px] lg:shrink-0" style={{ gap: "24px" }}>
            <div className="hidden lg:block">{interestedCard}</div>

            {/* Agent card — Figma 133:18593 / 216:21683 */}
            <div className="bg-white" style={{ width: "100%", border: "1px solid #F6F6F6", borderRadius: "20px", padding: "24px" }}>
              <h3 style={{ fontSize: "16px", lineHeight: "32px", fontWeight: 600, color: "#121212" }}>Listed by</h3>

              {/* Avatar + name + agency */}
              <div className="flex items-center" style={{ gap: "16px", marginTop: "24px" }}>
                <div className="rounded-full flex items-center justify-center text-white shrink-0" style={{ width: "64px", height: "64px", background: "#305E82", fontSize: "18px", fontWeight: 600 }}>
                  {agentInitials}
                </div>
                <div className="flex flex-col" style={{ gap: "8px" }}>
                  <div className="flex items-center" style={{ gap: "8px" }}>
                    <span className="text-[16px] lg:text-[18px]" style={{ lineHeight: "24px", fontWeight: 600, color: "#121212" }}>{agentName}</span>
                    <Image src="/icons/verify-figma.svg" alt="" width={20} height={20} />
                  </div>
                  {/* Mobile: agency line */}
                  <span className="lg:hidden" style={{ fontSize: "11px", lineHeight: "16px", fontWeight: 400, color: "#807E7E" }}>{agentAgency}</span>
                  {/* Desktop: agency + AGENT pill */}
                  <div className="hidden lg:flex items-center" style={{ gap: "16px" }}>
                    <span style={{ fontSize: "14px", lineHeight: "20px", fontWeight: 500, color: "#807E7E" }}>{agentAgency}</span>
                    <span className="inline-flex items-center text-white" style={{ background: "#305E82", borderRadius: "100px", padding: "3px 12px", fontSize: "12px", fontWeight: 500 }}>AGENT</span>
                  </div>
                </div>
              </div>

              {/* Location + Joined — desktop */}
              <div className="hidden lg:flex flex-col" style={{ gap: "16px", marginTop: "24px" }}>
                <div className="flex items-center" style={{ gap: "8px" }}>
                  <Image src="/icons/location-detail.svg" alt="" width={20} height={20} />
                  <span style={{ fontSize: "12px", lineHeight: "24px", color: "#807E7E" }}>{agentLocation}</span>
                </div>
                {agentJoined && (
                  <div className="flex items-center" style={{ gap: "8px" }}>
                    <Image src="/icons/user-profile.svg" alt="" width={20} height={20} />
                    <span style={{ fontSize: "12px", lineHeight: "24px", color: "#807E7E" }}>{agentJoined}</span>
                  </div>
                )}
              </div>

              {/* Rating + listings + View all */}
              <div className="flex items-center justify-between gap-2 border-t border-b border-[#F6F6F6] py-4" style={{ marginTop: "24px" }}>
                <div className="flex items-center" style={{ gap: "16px" }}>
                  <div className="flex items-center" style={{ gap: "8px" }}>
                    <Image src="/icons/star.svg" alt="" width={20} height={20} />
                    <span className="text-[12px] md:text-[14px]" style={{ lineHeight: "20px", fontWeight: 500, color: "#807E7E" }}>{agentRating}</span>
                  </div>
                  <span style={{ width: "1px", height: "14px", background: "#EDEDED" }} />
                  <div className="flex items-center" style={{ gap: "8px" }}>
                    <Image src="/icons/buildings.svg" alt="" width={20} height={20} />
                    <span className="text-[12px] md:text-[14px]" style={{ lineHeight: "20px", fontWeight: 500, color: "#807E7E" }}>{agentListings ?? 0} listings</span>
                  </div>
                </div>
                <Link href="/agents" className="hover:opacity-80 shrink-0 whitespace-nowrap text-[12px] md:text-[14px]" style={{ lineHeight: "20px", fontWeight: 500, color: "#305E82" }}>
                  View all Properties
                </Link>
              </div>

              {/* Call + Message */}
              <div className="flex" style={{ gap: "12px", marginTop: "24px" }}>
                <button onClick={requireLogin} className="flex items-center justify-center hover:opacity-90 transition-opacity flex-1" style={{ height: "48px", padding: "12px 16px", gap: "8px", background: "#FFFFFF", border: "1px solid #F6F6F6", borderRadius: "12px" }}>
                  <Image src="/icons/call.svg" alt="" width={20} height={20} />
                  <span style={{ fontSize: "14px", lineHeight: "24px", fontWeight: 500, color: "#121212" }}>Call</span>
                </button>
                <button onClick={requireLogin} className="flex items-center justify-center text-white hover:opacity-90 transition-opacity flex-1" style={{ height: "48px", padding: "12px 16px", gap: "8px", background: "linear-gradient(175deg, #75A3C7 0%, #305E82 100%)", border: "1px solid rgba(120,158,187,0.5)", borderRadius: "12px" }}>
                  <Image src="/icons/messages-2.svg" alt="" width={20} height={20} />
                  <span style={{ fontSize: "14px", lineHeight: "24px", fontWeight: 500 }}>Message</span>
                </button>
              </div>
            </div>

            {/* Other Related Properties */}
            <div className="bg-white" style={{ width: "100%", border: "1px solid #F6F6F6", borderRadius: "20px", padding: "24px" }}>
              <h3 className="mb-6" style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 500, color: "#121212" }}>Other Related Properties</h3>
              <ul className="flex flex-col gap-2">
                {otherCategories.map((c) => (
                  <li key={c} className="flex items-start gap-2 min-w-0" style={{ fontSize: "14px", lineHeight: "24px", color: "#305E82" }}>
                    <span className="shrink-0">•</span>
                    <Link href="/for-sale" className="hover:underline break-words min-w-0">{c}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED LISTINGS — Figma 218:25720 */}
      {related.length > 0 && (
        <section className="bg-white" style={{ paddingBottom: "80px" }}>
          <div className="mx-auto w-full max-w-[1440px] px-4 md:px-[80px]">
            <div className="flex flex-col" style={{ gap: "8px", marginBottom: "24px" }}>
              <h2 className="text-[20px] leading-[24px] md:text-[24px] md:leading-[32px]" style={{ fontWeight: 600, color: "#121212", letterSpacing: "-0.02em" }}>Related Listings</h2>
              <p style={{ fontSize: "14px", lineHeight: "24px", fontWeight: 400, color: "#807E7E" }}>See similar property listings that you might like</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "24px" }}>
              {related.map((r) => (
                <PropertyCard key={r.id} property={toPropertyCard(r)} />
              ))}
            </div>
          </div>
        </section>
      )}

      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
}

import type { Agency } from "@/components/AgencyCard";
import type { Agent } from "@/components/AgentCard";
import type { AgencyListItem, AgentListItem } from "@/services/types";

// AgencyListItem has no logo field yet → rotate the 3 design logos by id so each
// agency looks distinct but stable (temporary, until the backend stores a logo).
const AGENCY_LOGOS = ["/images/agency-logo-1.png", "/images/agency-logo-2.png", "/images/agency-logo-3.png"];

function hashIndex(id: string, mod: number) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return h % mod;
}

function initials(name: string) {
  const p = name.trim().split(/\s+/).filter(Boolean);
  return ((p[0]?.[0] ?? "") + (p[1]?.[0] ?? "")).toUpperCase() || "RB";
}

/** Map a backend AgencyListItem → the AgencyCard shape. */
export function toAgencyCard(a: AgencyListItem): Agency {
  return {
    id: a.id,
    name: a.name,
    location: "Nigeria", // DTO has no state/city yet
    rating: a.averageRating ?? 0,
    listings: a.agentCount ?? 0, // DTO exposes agentCount, not a property count
    logo: AGENCY_LOGOS[hashIndex(a.id, AGENCY_LOGOS.length)],
  };
}

/** Map a backend AgentListItem → the AgentCard shape. */
export function toAgentCard(a: AgentListItem): Agent {
  const name = `${a.firstName ?? ""} ${a.lastName ?? ""}`.trim() || (a.email ?? "Agent");
  return {
    name,
    avatar: a.avatarUrl || undefined,
    initials: initials(name),
    agency: a.organizationName || "Independent Agent",
    location: [a.city, a.state].filter(Boolean).join(", ") || "Nigeria",
    rating: a.averageRating ?? 0,
    listings: a.listingCount ?? 0,
  };
}

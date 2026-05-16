import type { Agency } from "@/components/AgencyCard";
import type { Agent } from "@/components/AgentCard";

// Figma uses 3 unique agency logos cycled across cards
export const agencies: Agency[] = [
  { id: "1", name: "Sydney Realtors", location: "Port-Harcourt", rating: 4.7, listings: 27, logo: "/images/agency-logo-1.png" },
  { id: "2", name: "Urban Nest Realty", location: "Lagos", rating: 4.6, listings: 18, logo: "/images/agency-logo-3.png" },
  { id: "3", name: "Blue Horizon Homes", location: "Abuja", rating: 4.8, listings: 32, logo: "/images/agency-logo-2.png" },
  { id: "4", name: "Coastal Estates", location: "Lagos", rating: 4.5, listings: 15, logo: "/images/agency-logo-2.png" },
  { id: "5", name: "Metro Living", location: "Lagos", rating: 4.4, listings: 27, logo: "/images/agency-logo-3.png" },
  { id: "6", name: "Sunset Properties", location: "Lagos", rating: 4.6, listings: 21, logo: "/images/agency-logo-1.png" },
  { id: "7", name: "Mountain View Residences", location: "Jos", rating: 4.5, listings: 19, logo: "/images/agency-logo-1.png" },
  { id: "8", name: "Greenfield Gardens", location: "Ibadan", rating: 4.7, listings: 24, logo: "/images/agency-logo-3.png" },
  { id: "9", name: "Sunset Villas", location: "Lagos", rating: 4.8, listings: 31, logo: "/images/agency-logo-2.png" },
];

export const agents: Agent[] = [
  { name: "Ibrahim Fashola", avatar: "/images/agent-ibrahim.png", initials: "IF", agency: "Jaskaro Properties", location: "Lagos", rating: 5.0, listings: 9 },
  { name: "Pascaline Okonkwo", avatar: "/images/agent-pascaline.png", initials: "PO", agency: "Prime Realty & Co.", location: "Abuja", rating: 4.9, listings: 24 },
  { name: "Chioma Idris", initials: "CI", agency: "Royal Realtors", location: "Port-Harcourt", rating: 4.7, listings: 27 },
  { name: "Olamide Adesokan", avatar: "/images/agent-olamide.png", initials: "OA", agency: "Nexus Property Hub", location: "Ogun", rating: 4.6, listings: 11 },
  { name: "Olaitan Badejo", initials: "OB", agency: "Prime Realty & Co.", location: "Lagos", rating: 4.6, listings: 13 },
  { name: "Lade Oyetola", avatar: "/images/agent-lade.png", initials: "LO", agency: "Propex", location: "Lagos", rating: 4.3, listings: 8 },
  { name: "Ibrahim Fashola", avatar: "/images/agent-ibrahim.png", initials: "IF", agency: "Jaskaro Properties", location: "Lagos", rating: 5.0, listings: 9 },
  { name: "Olamide Adesokan", avatar: "/images/agent-olamide.png", initials: "OA", agency: "Nexus Property Hub", location: "Ogun", rating: 4.6, listings: 11 },
  { name: "Chioma Idris", initials: "CI", agency: "Royal Realtors", location: "Port-Harcourt", rating: 4.7, listings: 27 },
  { name: "Kemi Olaniyi", avatar: "/images/agent-pascaline.png", initials: "KO", agency: "Royal Realtors", location: "Lagos", rating: 4.6, listings: 14 },
  { name: "Michael Johnson", initials: "MJ", agency: "Prime Realty & Co.", location: "Abuja", rating: 4.5, listings: 17 },
  { name: "Chinedu Akpabio", avatar: "/images/agent-ibrahim.png", initials: "CA", agency: "Coastal Estates", location: "Port-Harcourt", rating: 4.8, listings: 22 },
];

// The public search keyword (`q`) is matched by the backend as a plain substring
// against title/description/address/city/state. So "Lagos" matches a property
// whose state is "Lagos", but "Lagos State" or "Properties in Lagos" do NOT —
// the extra words break the substring match, and the user gets "no exact matches"
// even though Lagos listings exist.
//
// This resolves a free-text location keyword into structured params: when it names
// a Nigerian state, we route that to the exact `state` filter (which reliably
// matches) and keep any leftover area text as `q`. Everything else stays as `q`.

const NG_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe",
  "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara",
  "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau",
  "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara", "Abuja", "FCT",
];

// Longest names first so "Akwa Ibom" / "Cross River" match before any single token.
const STATES_BY_LEN = [...NG_STATES].sort((a, b) => b.length - a.length);

function esc(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export interface ResolvedLocation {
  q: string;
  /** Set only when the keyword named a Nigerian state. */
  state?: string;
}

export function resolveLocationQuery(raw: string): ResolvedLocation {
  const original = (raw ?? "").trim();
  if (!original) return { q: "" };

  // Strip filler like "properties for rent in", "homes in", and the word "state".
  const cleaned = original
    .replace(/^\s*(propert(?:y|ies)|homes?|houses?|flats?|apartments?)\s+(for\s+\w+\s+)?in\s+/i, "")
    .replace(/\bstate\b/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

  const lower = cleaned.toLowerCase();
  const match = STATES_BY_LEN.find((st) =>
    new RegExp(`(^|[\\s,])${esc(st.toLowerCase())}([\\s,]|$)`).test(lower),
  );

  if (!match) return { q: original };

  // Remove the matched state; any remaining text is a narrower area/keyword.
  const remainder = cleaned
    .replace(new RegExp(`(^|[\\s,])${esc(match)}([\\s,]|$)`, "i"), " ")
    .replace(/[,\s]+/g, " ")
    .trim();

  return { state: match, q: remainder };
}

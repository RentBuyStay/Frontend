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

// Filler people type around a real location ("a 3 bedroom flat for rent in ...").
// Stripped from the leftover text so a noisy sentence doesn't over-filter to zero.
const NOISE_WORDS = new Set([
  "a", "an", "the", "for", "in", "at", "on", "near", "around", "close", "to",
  "of", "with", "and", "or", "my", "me", "i", "want", "need", "looking", "search",
  "find", "get", "buy", "rent", "sale", "shortlet", "short", "stay", "lease",
  "property", "properties", "home", "homes", "house", "houses", "flat", "flats",
  "apartment", "apartments", "duplex", "bungalow", "room", "rooms", "bedroom",
  "bedrooms", "bed", "beds", "bath", "baths", "bathroom", "bathrooms", "self",
  "contain", "mini", "studio", "available", "cheap", "affordable", "luxury",
  "new", "newly", "built", "serviced", "furnished", "please", "pls",
]);

function esc(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export interface ResolvedLocation {
  q: string;
  /** Set only when the keyword named a Nigerian state. */
  state?: string;
}

// Drop noise words and digits so only meaningful area text survives as `q`.
function distill(text: string): string {
  return text
    .split(/[\s,]+/)
    .filter((w) => w && !/\d/.test(w) && !NOISE_WORDS.has(w.toLowerCase()))
    .join(" ")
    .trim();
}

export function resolveLocationQuery(raw: string): ResolvedLocation {
  const original = (raw ?? "").trim();
  if (!original) return { q: "" };

  // Users type anything ("a 3-bed flat for rent in Lagos state near Lekki"), so
  // rather than matching fixed phrases we just scan the whole string: drop the
  // word "state", then look for any Nigerian state token anywhere in the text.
  const cleaned = original.replace(/\bstate\b/gi, " ").replace(/\s+/g, " ").trim();
  const lower = cleaned.toLowerCase();
  const match = STATES_BY_LEN.find((st) =>
    new RegExp(`(^|[\\s,])${esc(st.toLowerCase())}([\\s,]|$)`).test(lower),
  );

  // No state named → keep the distilled keyword (fall back to the raw text if
  // distilling removed everything, so a pure keyword search still runs).
  if (!match) return { q: distill(original) || original };

  // State found → filter by it exactly; keep any remaining area word as `q`.
  const remainder = cleaned.replace(
    new RegExp(`(^|[\\s,])${esc(match)}([\\s,]|$)`, "i"),
    " ",
  );
  return { state: match, q: distill(remainder) };
}

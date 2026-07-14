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
  "nigeria", "naija", "ng", "area", "location", "place", "around",
]);

function esc(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export interface ResolvedLocation {
  q: string;
  /** Set only when the keyword named a Nigerian state. */
  state?: string;
}

// Is this token a real-looking word rather than filler or gibberish? The backend
// `q` is a contiguous-substring match, so a token must actually appear in a field
// to hit — a mistyped "hhhh" never will and only causes a false "no match".
function isMeaningful(w: string): boolean {
  const lw = w.toLowerCase();
  return (
    w.length >= 2 &&
    !/\d/.test(w) &&            // not a number ("3", "2bed")
    !NOISE_WORDS.has(lw) &&     // not filler ("rent", "nigeria", …)
    /[aeiou]/i.test(w) &&       // has a vowel → filters keyboard mash like "hhhh", "xzcv"
    !/^(.)\1+$/.test(lw)        // not a single char repeated ("aaaa")
  );
}

// Reduce free text to the single nearest keyword worth searching. People type
// noise around the real place ("Lagos yaba hhhh"), and since `q` matches a whole
// contiguous string, sending the phrase matches nothing — so we pick just the
// first meaningful token (the location they led with) and drop the rest.
function pickKeyword(text: string): string {
  return text.split(/[\s,]+/).find(isMeaningful) ?? "";
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

  // No state named → search the single nearest keyword (fall back to the raw
  // text only if nothing meaningful was found, so an honest no-match still shows).
  if (!match) return { q: pickKeyword(original) || original };

  // State found → filter by it exactly, and narrow by the nearest remaining
  // keyword (e.g. "Lagos yaba hhhh" → state=Lagos, q=yaba; the noise is dropped).
  const remainder = cleaned.replace(
    new RegExp(`(^|[\\s,])${esc(match)}([\\s,]|$)`, "i"),
    " ",
  );
  return { state: match, q: pickKeyword(remainder) };
}

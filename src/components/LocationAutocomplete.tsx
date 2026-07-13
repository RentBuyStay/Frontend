"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Search } from "lucide-react";

type Suggestion = { label: string; value: string };

/** Build a concise filter value (area/city) from a Nominatim result. */
function toValue(r: { display_name: string; address?: Record<string, string> }): string {
  const a = r.address ?? {};
  return (
    a.suburb || a.neighbourhood || a.quarter || a.city || a.town || a.village || a.county ||
    r.display_name.split(",")[0]
  ).trim();
}

/**
 * Address autocomplete (OpenStreetMap / Nominatim, Nigeria-scoped) — as the user
 * types, suggest matching places; selecting one sets the value. Free, no API key.
 * The suggestion list is portalled to <body> with fixed positioning so it's never
 * clipped by an ancestor's overflow (e.g. the hero) or z-index.
 */
export default function LocationAutocomplete({
  value,
  onChange,
  onEnter,
  placeholder,
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  onEnter?: () => void;
  placeholder?: string;
  className?: string;
}) {
  const [results, setResults] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pos, setPos] = useState<{ left: number; width: number; top?: number; bottom?: number; maxHeight: number } | null>(null);
  const [mounted, setMounted] = useState(false);
  const skipNext = useRef(false); // don't re-search right after a selection
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  // Debounced Nominatim search.
  useEffect(() => {
    if (skipNext.current) {
      skipNext.current = false;
      return;
    }
    const q = value.trim();
    /* eslint-disable react-hooks/set-state-in-effect */
    if (q.length < 3) {
      setResults([]);
      setOpen(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setOpen(true); // show the panel immediately (spinner → results or free-text)
    /* eslint-enable react-hooks/set-state-in-effect */
    const t = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&countrycodes=ng&limit=6&q=${encodeURIComponent(q)}`,
          { headers: { "Accept-Language": "en" } },
        );
        const arr: { display_name: string; address?: Record<string, string> }[] = await res.json();
        if (cancelled) return;
        const seen = new Set<string>();
        const sugg: Suggestion[] = [];
        for (const r of arr) {
          const v = toValue(r);
          if (v && !seen.has(v.toLowerCase())) {
            seen.add(v.toLowerCase());
            sugg.push({ label: r.display_name, value: v });
          }
        }
        setResults(sugg);
        setOpen(true);
      } catch {
        if (!cancelled) setResults([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 350);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [value]);

  // Keep the portalled list anchored to the input while open.
  useEffect(() => {
    if (!open) return;
    const update = () => {
      const r = inputRef.current?.getBoundingClientRect();
      if (!r) return;
      const GAP = 6;
      const spaceBelow = window.innerHeight - r.bottom - GAP;
      const spaceAbove = r.top - GAP;
      // Flip the panel above the input when there isn't room below it (e.g. the
      // hero search bar sitting near the bottom of the viewport).
      if (spaceBelow < 200 && spaceAbove > spaceBelow) {
        setPos({ left: r.left, width: r.width, bottom: window.innerHeight - r.top + GAP, maxHeight: Math.min(300, spaceAbove) });
      } else {
        setPos({ left: r.left, width: r.width, top: r.bottom + GAP, maxHeight: Math.min(300, spaceBelow) });
      }
    };
    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [open, results.length]);

  // Close on outside click (input or list).
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      const t = e.target as Node;
      if (inputRef.current?.contains(t) || listRef.current?.contains(t)) return;
      setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const select = (s: Suggestion) => {
    skipNext.current = true;
    onChange(s.value);
    setResults([]);
    setOpen(false);
  };

  // Search exactly what was typed (for places OSM doesn't know — e.g. a specific
  // street). Keeps the typed value and triggers the search.
  const searchTyped = () => {
    skipNext.current = true;
    setOpen(false);
    onEnter?.();
  };

  return (
    <>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => results.length > 0 && setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter") { setOpen(false); onEnter?.(); }
          else if (e.key === "Escape") setOpen(false);
        }}
        placeholder={placeholder}
        className={className}
      />

      {mounted && open && pos &&
        createPortal(
          <ul
            ref={listRef}
            className="bg-white rounded-[12px] border border-[#ededed] overflow-y-auto py-1"
            style={{ position: "fixed", top: pos.top, bottom: pos.bottom, left: pos.left, width: pos.width, maxHeight: pos.maxHeight, zIndex: 10050, boxShadow: "0 12px 32px rgba(0,0,0,0.14)" }}
          >
            {results.map((s, i) => (
              <li key={`${s.value}-${i}`}>
                <button
                  type="button"
                  // onMouseDown fires before the input blur so the pick isn't lost.
                  onMouseDown={(e) => { e.preventDefault(); select(s); }}
                  className="w-full text-left px-4 py-2.5 hover:bg-[#f6f9fc] flex items-start gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#305e82" strokeWidth="1.8" className="mt-0.5 shrink-0">
                    <path d="M12 21s-7-6.2-7-11a7 7 0 0114 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" />
                  </svg>
                  <span className="text-[13px] text-[#121212] leading-snug">{s.label}</span>
                </button>
              </li>
            ))}

            {loading && results.length === 0 && (
              <li className="px-4 py-2.5 text-[13px] text-[#807e7e]">Searching…</li>
            )}

            {!loading && results.length === 0 && (
              <li className="px-4 pt-2 pb-1 text-[12px] text-[#807e7e]">No place matched — search it as a keyword:</li>
            )}

            {/* Always let the user search exactly what they typed. */}
            {!loading && value.trim().length >= 3 && (
              <li className={results.length ? "border-t border-[#f0f0f0] mt-1 pt-1" : ""}>
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); searchTyped(); }}
                  className="w-full text-left px-4 py-2.5 hover:bg-[#f6f9fc] flex items-center gap-2"
                >
                  <Search size={16} className="text-[#305e82] shrink-0" />
                  <span className="text-[13px] text-[#121212]">
                    Search “<span className="font-medium">{value.trim()}</span>”
                  </span>
                </button>
              </li>
            )}
          </ul>,
          document.body,
        )}
    </>
  );
}

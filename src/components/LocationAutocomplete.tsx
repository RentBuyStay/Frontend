"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

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
  const [pos, setPos] = useState<{ top: number; left: number; width: number } | null>(null);
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
        setOpen(sugg.length > 0);
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
      if (r) setPos({ top: r.bottom + 6, left: r.left, width: r.width });
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
            style={{ position: "fixed", top: pos.top, left: pos.left, width: pos.width, maxHeight: 280, zIndex: 10050, boxShadow: "0 12px 32px rgba(0,0,0,0.14)" }}
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
          </ul>,
          document.body,
        )}
    </>
  );
}

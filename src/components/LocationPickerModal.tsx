"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "leaflet/dist/leaflet.css";
import type { Map as LeafletMap, Marker as LeafletMarker } from "leaflet";

export type PickedPlace = { lat: number; lng: number; label: string; state?: string; city?: string };

const NIGERIA_CENTER: [number, number] = [9.082, 8.6753];
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

/** Reverse-geocode a point to a human label + state/city — Mapbox when configured,
 *  otherwise the free OpenStreetMap geocoder. */
async function reverseGeocode(lat: number, lng: number): Promise<PickedPlace> {
  try {
    if (MAPBOX_TOKEN) {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_TOKEN}&language=en&limit=1&types=neighborhood,locality,place,region`,
      );
      const j = await res.json();
      const f = j.features?.[0];
      const ctx: { id: string; text: string }[] = f?.context ?? [];
      const city = f?.text || undefined;
      const state = ctx.find((c) => c.id?.startsWith("region"))?.text?.replace(/ State$/i, "");
      const label = [city, state].filter(Boolean).join(", ") || f?.place_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      return { lat, lng, label, state, city };
    }
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&zoom=14&addressdetails=1&lat=${lat}&lon=${lng}`,
      { headers: { "Accept-Language": "en" } },
    );
    const j = await res.json();
    const a = j.address ?? {};
    const city = a.city || a.town || a.village || a.suburb || a.county || undefined;
    const state = a.state ? String(a.state).replace(/ State$/i, "") : undefined;
    const label = [city, state].filter(Boolean).join(", ") || j.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    return { lat, lng, label, state, city };
  } catch {
    return { lat, lng, label: `${lat.toFixed(4)}, ${lng.toFixed(4)}` };
  }
}

export default function LocationPickerModal({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (place: PickedPlace) => void;
}) {
  const [mounted, setMounted] = useState(false);
  const mapEl = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markerRef = useRef<LeafletMarker | null>(null);
  const [picked, setPicked] = useState<PickedPlace | null>(null);
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  // Build the Leaflet map when the modal opens (client-only import to avoid SSR).
  useEffect(() => {
    if (!open || !mapEl.current) return;
    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !mapEl.current || mapRef.current) return;

      const map = L.map(mapEl.current, { center: NIGERIA_CENTER, zoom: 6 });
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(map);

      const pinIcon = L.divIcon({
        className: "",
        html: `<div style="font-size:28px;line-height:28px;transform:translate(-50%,-100%)">📍</div>`,
        iconSize: [0, 0],
      });

      async function place(lat: number, lng: number, fly = false) {
        if (markerRef.current) markerRef.current.setLatLng([lat, lng]);
        else markerRef.current = L.marker([lat, lng], { icon: pinIcon }).addTo(map);
        if (fly) map.setView([lat, lng], Math.max(map.getZoom(), 13));
        setLoading(true);
        const p = await reverseGeocode(lat, lng);
        if (!cancelled) setPicked(p);
        setLoading(false);
      }

      map.on("click", (e: { latlng: { lat: number; lng: number } }) => {
        void place(e.latlng.lat, e.latlng.lng);
      });

      mapRef.current = map;
      // Leaflet needs a size recalc once the container is visible.
      setTimeout(() => map.invalidateSize(), 60);
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      markerRef.current = null;
      setPicked(null);
    };
  }, [open]);

  function useMyLocation() {
    if (!navigator.geolocation) return;
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const L = (await import("leaflet")).default;
        const map = mapRef.current;
        if (map) {
          if (markerRef.current) markerRef.current.setLatLng([latitude, longitude]);
          else
            markerRef.current = L.marker([latitude, longitude], {
              icon: L.divIcon({ className: "", html: `<div style="font-size:28px;line-height:28px;transform:translate(-50%,-100%)">📍</div>`, iconSize: [0, 0] }),
            }).addTo(map);
          map.setView([latitude, longitude], 14);
        }
        setPicked(await reverseGeocode(latitude, longitude));
        setLoading(false);
      },
      () => setLoading(false),
      { enableHighAccuracy: true, timeout: 8000 },
    );
  }

  if (!open || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[10001] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)" }}
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-[720px] rounded-[20px] overflow-hidden flex flex-col"
        style={{ maxHeight: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#ededed]">
          <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#121212" }}>Pick a location</h3>
          <button onClick={onClose} aria-label="Close" className="text-[#807e7e] hover:text-[#121212] text-xl leading-none">
            ✕
          </button>
        </div>

        <p className="px-6 pt-3 text-[13px] text-[#807e7e]">Tap anywhere on the map to drop a pin, or use your current location.</p>

        <div ref={mapEl} className="mx-6 my-3 rounded-[12px] overflow-hidden" style={{ height: "360px", background: "#eef2f5" }} />

        <div className="px-6 pb-2 flex items-center justify-between gap-3 flex-wrap">
          <button
            type="button"
            onClick={useMyLocation}
            className="flex items-center gap-2 text-[14px] font-medium text-[#305e82] hover:underline"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="2" />
              <line x1="12" y1="2" x2="12" y2="5" /><line x1="12" y1="19" x2="12" y2="22" />
              <line x1="2" y1="12" x2="5" y2="12" /><line x1="19" y1="12" x2="22" y2="12" />
            </svg>
            Use my current location
          </button>
          <span className="text-[13px] text-[#121212] truncate max-w-[55%]">
            {loading ? "Locating…" : picked ? `📍 ${picked.label}` : "No location selected"}
          </span>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#ededed]">
          <button onClick={onClose} className="h-11 px-5 text-[14px] font-medium text-[#121212] hover:opacity-70">
            Cancel
          </button>
          <button
            type="button"
            disabled={!picked}
            onClick={() => { if (picked) { onSelect(picked); onClose(); } }}
            className="h-11 px-6 rounded-[12px] text-white text-[14px] font-medium disabled:opacity-50"
            style={{ background: "linear-gradient(175deg, rgba(117,163,199,1) 0%, rgba(48,94,130,1) 100%)", border: "1px solid rgba(120,158,187,0.5)" }}
          >
            Use this location
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

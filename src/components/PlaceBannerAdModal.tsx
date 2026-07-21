"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Navbar from "./Navbar";
import { unwrapApiError } from "@/services/api";
import {
  AD_PLACEMENT_LABELS,
  formatMoney,
  useCreateAdvertisementMutation,
  useGetAdvertisementRatesQuery,
  usePayAdvertisementMutation,
  useUploadCreativeMutation,
  type AdPlacement,
} from "@/services/advertisementApi";

const labelStyle = {
  fontSize: "14px",
  lineHeight: "24px",
  fontWeight: 500,
  color: "#121212",
  letterSpacing: "-0.02em",
} as const;

const inputStyle = {
  padding: "8px 16px",
  height: "48px",
  fontSize: "14px",
  lineHeight: "24px",
  color: "#121212",
  letterSpacing: "-0.02em",
} as const;

function TextField({
  label,
  required,
  type = "text",
  value,
  onChange,
  placeholder,
  autoComplete,
}: {
  label: string;
  required?: boolean;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div className="flex-1 flex flex-col" style={{ gap: "8px" }}>
      <label style={labelStyle}>
        {label}
        {required ? <span style={{ color: "#E30045" }}> *</span> : null}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full bg-[#F6F6F6] rounded-[12px] outline-none placeholder:text-[#807E7E]"
        style={inputStyle}
      />
    </div>
  );
}

export default function PlaceBannerAdModal({
  open,
  initialPlacement,
  onClose,
}: {
  open: boolean;
  initialPlacement?: string;
  onClose: () => void;
}) {
  const { data: rates, isLoading: ratesLoading, isError: ratesError } =
    useGetAdvertisementRatesQuery();
  const [uploadCreative] = useUploadCreativeMutation();
  const [createAdvertisement] = useCreateAdvertisementMutation();
  const [payAdvertisement] = usePayAdvertisementMutation();

  // The user's explicit dropdown choice (null until they pick one); the effective
  // placement falls back to the clicked card, then the first live rate.
  const [placementOverride, setPlacementOverride] = useState<AdPlacement | null>(null);
  const [placementOpen, setPlacementOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [email, setEmail] = useState("");
  const [advertiserName, setAdvertiserName] = useState("");
  const [phone, setPhone] = useState("");
  const [targetUrl, setTargetUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prevOpen, setPrevOpen] = useState(open);
  const [seenInitial, setSeenInitial] = useState(initialPlacement);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);

  // Reset transient state on (re)open or when a different card is chosen. Done
  // during render (React's supported pattern) rather than in an effect.
  if (prevOpen !== open) {
    setPrevOpen(open);
    if (open) {
      setError(null);
      setLoading(false);
    }
  }
  if (seenInitial !== initialPlacement) {
    setSeenInitial(initialPlacement);
    setPlacementOverride(null);
  }

  const today = new Date().toISOString().slice(0, 10);
  const initialIsValid =
    !!initialPlacement && !!rates?.some((r) => r.placement === initialPlacement);
  const selectedPlacement: AdPlacement | null =
    placementOverride ??
    (initialIsValid ? (initialPlacement as AdPlacement) : rates?.[0]?.placement ?? null);
  const selectedRate =
    rates?.find((r) => r.placement === selectedPlacement) ?? null;

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) setFile(f);
  }

  const placementButtonLabel = selectedRate
    ? `${AD_PLACEMENT_LABELS[selectedRate.placement]} — ${formatMoney(
        selectedRate.dailyRate,
        selectedRate.currency
      )}/day`
    : ratesLoading
      ? "Loading placements…"
      : ratesError
        ? "Couldn’t load placements"
        : "Select a placement";

  async function handleSubmit() {
    setError(null);
    if (!selectedPlacement) {
      setError("Select a placement option.");
      return;
    }
    if (!file) {
      setError("Please upload a banner creative.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Enter a valid advertiser email address.");
      return;
    }
    if (!startDate || !endDate) {
      setError("Select a start date and an end date.");
      return;
    }
    if (startDate < today) {
      setError("The start date cannot be in the past.");
      return;
    }
    if (endDate < startDate) {
      setError("The end date must be on or after the start date.");
      return;
    }

    setLoading(true);
    try {
      // 1) Upload the creative (multipart, field "file") to get its file id.
      const form = new FormData();
      form.append("file", file);
      const creative = await uploadCreative(form).unwrap();

      // 2) Create the advertisement (amount is computed server-side).
      const ad = await createAdvertisement({
        placement: selectedPlacement,
        startDate,
        endDate,
        creativeFileId: creative.id,
        advertiserEmail: email.trim(),
        advertiserName: advertiserName.trim() || undefined,
        advertiserPhone: phone.trim() || undefined,
        targetUrl: targetUrl.trim() || undefined,
      }).unwrap();

      // 3) Start the checkout and 4) hand off to the payment provider.
      const payment = await payAdvertisement(ad.id).unwrap();
      window.location.href = payment.authorizationUrl;
      // Leave `loading` true: the browser is navigating away.
    } catch (e) {
      setError(
        unwrapApiError(e)?.message ?? "Something went wrong. Please try again."
      );
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[10000] overflow-y-auto md:flex md:items-center md:justify-center md:p-4"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className="bg-white w-full min-h-full md:min-h-0 md:max-w-[751px] md:rounded-[24px] md:max-h-[90vh] md:overflow-y-auto relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile: full-screen page with the real site navbar (functional hamburger + drawer) */}
        <div className="md:hidden shrink-0">
          <Navbar variant="page" />
        </div>

        <div className="p-4 md:p-10">
          {/* Header — title + close, inline at the top-right */}
          <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col" style={{ gap: "8px", maxWidth: "497px" }}>
            <h2
              style={{
                fontSize: "20px",
                lineHeight: "32px",
                fontWeight: 600,
                color: "#121212",
                letterSpacing: "-0.02em",
              }}
            >
              Place Banner Ad on RentBuyStay
            </h2>
            <p
              style={{
                fontSize: "14px",
                lineHeight: "24px",
                fontWeight: 400,
                color: "#807E7E",
                letterSpacing: "-0.02em",
              }}
            >
              Select a strategic media placement option and take note of the technical
              requirement for each ad placement below.
            </p>
          </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="shrink-0 hover:opacity-70 transition-opacity"
              style={{ width: "24px", height: "24px" }}
            >
              <Image src="/icons/cancel.svg" alt="" width={24} height={24} />
            </button>
          </div>

          {/* Placement Option */}
          <div className="flex flex-col" style={{ gap: "8px", marginTop: "40px" }}>
            <label style={labelStyle}>Placement Option</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setPlacementOpen((s) => !s)}
                disabled={!rates || rates.length === 0}
                className="flex items-center justify-between w-full bg-[#F6F6F6] rounded-[12px] disabled:opacity-60"
                style={{ padding: "8px 16px", height: "48px" }}
              >
                <span
                  style={{
                    fontSize: "14px",
                    lineHeight: "24px",
                    color: selectedRate ? "#121212" : "#807E7E",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {placementButtonLabel}
                </span>
                <Image
                  src="/icons/arrow-down.svg"
                  alt=""
                  width={16}
                  height={16}
                  style={{
                    transform: placementOpen ? "rotate(180deg)" : "none",
                    transition: "transform 0.15s",
                  }}
                />
              </button>
              {placementOpen && rates && (
                <div
                  className="absolute left-0 right-0 mt-1 bg-white rounded-[12px] py-2 shadow-lg"
                  style={{ zIndex: 10 }}
                >
                  {rates.map((opt) => (
                    <button
                      key={opt.placement}
                      type="button"
                      onClick={() => {
                        setPlacementOverride(opt.placement);
                        setPlacementOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-[#F6F6F6] transition-colors"
                      style={{
                        fontSize: "14px",
                        lineHeight: "24px",
                        color: "#121212",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {AD_PLACEMENT_LABELS[opt.placement]} —{" "}
                      {formatMoney(opt.dailyRate, opt.currency)}/day
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Start date / End date */}
          <div className="flex flex-col md:flex-row" style={{ gap: "24px", marginTop: "24px" }}>
            <div className="flex-1 flex flex-col" style={{ gap: "8px" }}>
              <label style={labelStyle}>Start date</label>
              <button
                type="button"
                onClick={() => startDateRef.current?.showPicker?.()}
                className="flex items-center justify-between bg-[#F6F6F6] rounded-[12px] w-full"
                style={{ padding: "8px 16px", height: "48px" }}
              >
                <span className="flex items-center" style={{ gap: "8px" }}>
                  <Image src="/icons/calendar.svg" alt="" width={20} height={20} />
                  <span
                    style={{
                      fontSize: "14px",
                      lineHeight: "24px",
                      color: startDate ? "#121212" : "#807E7E",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {startDate || "Select date"}
                  </span>
                </span>
                <Image src="/icons/arrow-down.svg" alt="" width={16} height={16} />
                <input
                  ref={startDateRef}
                  type="date"
                  min={today}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="sr-only"
                  aria-label="Start date"
                />
              </button>
            </div>
            <div className="flex-1 flex flex-col" style={{ gap: "8px" }}>
              <label style={labelStyle}>End date</label>
              <button
                type="button"
                onClick={() => endDateRef.current?.showPicker?.()}
                className="flex items-center justify-between bg-[#F6F6F6] rounded-[12px] w-full"
                style={{ padding: "8px 16px", height: "48px" }}
              >
                <span className="flex items-center" style={{ gap: "8px" }}>
                  <Image src="/icons/calendar.svg" alt="" width={20} height={20} />
                  <span
                    style={{
                      fontSize: "14px",
                      lineHeight: "24px",
                      color: endDate ? "#121212" : "#807E7E",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {endDate || "Select date"}
                  </span>
                </span>
                <Image src="/icons/arrow-down.svg" alt="" width={16} height={16} />
                <input
                  ref={endDateRef}
                  type="date"
                  min={startDate || today}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="sr-only"
                  aria-label="End date"
                />
              </button>
            </div>
          </div>

          {/* Upload Banner */}
          <div className="flex flex-col" style={{ gap: "8px", marginTop: "24px" }}>
            <label style={labelStyle}>Upload Banner</label>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className="bg-[#F6F6F6] rounded-[12px] flex items-center justify-center cursor-pointer transition-colors"
              style={{
                height: "257px",
                outline: dragOver ? "2px dashed #305E82" : "none",
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="hidden"
              />
              <div className="flex flex-col items-center" style={{ gap: "24px" }}>
                <Image src="/icons/gallery-add.svg" alt="" width={64} height={64} />
                <div className="flex flex-col items-center" style={{ gap: "8px", maxWidth: "496px" }}>
                  <p
                    style={{
                      fontSize: "16px",
                      lineHeight: "21px",
                      fontWeight: 500,
                      color: "#121212",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {file ? (
                      file.name
                    ) : (
                      <>
                        Drag and drop file or{" "}
                        <span style={{ color: "#305E82", textDecoration: "underline" }}>
                          browse
                        </span>
                      </>
                    )}
                  </p>
                  <p
                    className="text-center"
                    style={{
                      fontSize: "12px",
                      lineHeight: "20px",
                      fontWeight: 400,
                      color: "#807E7E",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    All banner should follow placement option sizes (high-res),&nbsp;less
                    than 1MB&nbsp;in size, and in the&nbsp;JPG&nbsp;or&nbsp;PNG&nbsp;format.
                    They should have&nbsp;a clear message,&nbsp;legible text,
                    your&nbsp;name/brand/logo/url,&nbsp;good design&nbsp;and&nbsp;no border.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Advertiser details — the backend requires an email; the rest are optional. */}
          <div className="flex flex-col" style={{ gap: "24px", marginTop: "24px" }}>
            <TextField
              label="Advertiser Email"
              required
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="you@company.com"
              autoComplete="email"
            />
            <div className="flex flex-col md:flex-row" style={{ gap: "24px" }}>
              <TextField
                label="Advertiser Name"
                value={advertiserName}
                onChange={setAdvertiserName}
                placeholder="Your brand or company name"
                autoComplete="organization"
              />
              <TextField
                label="Phone Number"
                type="tel"
                value={phone}
                onChange={setPhone}
                placeholder="+234 800 000 0000"
                autoComplete="tel"
              />
            </div>
            <TextField
              label="Target URL"
              type="url"
              value={targetUrl}
              onChange={setTargetUrl}
              placeholder="https://your-landing-page.com"
              autoComplete="url"
            />
          </div>

          {error && (
            <p
              role="alert"
              style={{
                marginTop: "24px",
                fontSize: "14px",
                lineHeight: "20px",
                color: "#E30045",
                letterSpacing: "-0.02em",
              }}
            >
              {error}
            </p>
          )}

          <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-end" style={{ gap: "16px", marginTop: error ? "16px" : "40px" }}>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              style={{
                padding: "8px 16px",
                fontSize: "14px",
                fontWeight: 500,
                color: "#121212",
                letterSpacing: "-0.02em",
              }}
              className="w-full md:w-auto hover:opacity-70 transition-opacity disabled:opacity-40"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="w-full md:w-auto flex items-center justify-center text-white rounded-[12px] hover:opacity-90 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed"
              style={{
                height: "48px",
                padding: "8px 24px",
                fontSize: "14px",
                fontWeight: 500,
                background:
                  "linear-gradient(175deg, rgba(117,163,199,1) 0%, rgba(48,94,130,1) 100%)",
                border: "1px solid rgba(120,158,187,0.5)",
                letterSpacing: "-0.02em",
              }}
            >
              {loading ? "Processing…" : "Proceed to Payment"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

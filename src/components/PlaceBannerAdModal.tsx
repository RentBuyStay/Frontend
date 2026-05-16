"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export type PlacementOption = {
  label: string;
  value: string;
};

export const placementOptions: PlacementOption[] = [
  { label: "Header Strip - 1429 x 168px (₦150,000/month)", value: "header-strip" },
  { label: "Sidebar Ad - 300 x 600px (₦100,000/month)", value: "sidebar" },
  { label: "Footer Banner - 1200 x 90px (₦80,000/month)", value: "footer" },
  { label: "Middle Strip - 800 x 600px (₦120,000/month)", value: "middle-strip" },
  { label: "Leader Banner - 600 x 300px (₦130,000/month)", value: "leader" },
  { label: "Side Strip - 600 x 200px (₦110,000/month)", value: "side-strip" },
  { label: "Email Notification Footer - 1920 x 1080px (₦200,000/month)", value: "email-footer" },
  { label: "Newsletter Spotlight - 600 x 200px (₦110,000/month)", value: "newsletter" },
];

export default function PlaceBannerAdModal({
  open,
  initialPlacement,
  onClose,
}: {
  open: boolean;
  initialPlacement?: string;
  onClose: () => void;
}) {
  const [placement, setPlacement] = useState<PlacementOption>(placementOptions[1]);
  const [placementOpen, setPlacementOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    if (initialPlacement) {
      const match = placementOptions.find((p) => p.value === initialPlacement);
      if (match) setPlacement(match);
    }
  }, [open, initialPlacement]);

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

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[24px] relative"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "751px",
          maxWidth: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute hover:opacity-70 transition-opacity"
          style={{ top: "40px", right: "40px", width: "24px", height: "24px" }}
        >
          <Image src="/icons/cancel.svg" alt="" width={24} height={24} />
        </button>

        <div style={{ padding: "40px" }}>
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

          {/* Placement Option */}
          <div className="flex flex-col" style={{ gap: "8px", marginTop: "40px" }}>
            <label
              style={{
                fontSize: "14px",
                lineHeight: "24px",
                fontWeight: 500,
                color: "#121212",
                letterSpacing: "-0.02em",
              }}
            >
              Placement Option
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setPlacementOpen((s) => !s)}
                className="flex items-center justify-between w-full bg-[#F6F6F6] rounded-[12px]"
                style={{ padding: "8px 16px", height: "48px" }}
              >
                <span
                  style={{
                    fontSize: "14px",
                    lineHeight: "24px",
                    color: "#121212",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {placement.label}
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
              {placementOpen && (
                <div
                  className="absolute left-0 right-0 mt-1 bg-white rounded-[12px] py-2"
                  style={{ zIndex: 10, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
                >
                  {placementOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setPlacement(opt);
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
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Start date / End date */}
          <div className="flex" style={{ gap: "24px", marginTop: "24px" }}>
            <div className="flex-1 flex flex-col" style={{ gap: "8px" }}>
              <label
                style={{
                  fontSize: "14px",
                  lineHeight: "24px",
                  fontWeight: 500,
                  color: "#121212",
                  letterSpacing: "-0.02em",
                }}
              >
                Start date
              </label>
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
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="sr-only"
                  aria-label="Start date"
                />
              </button>
            </div>
            <div className="flex-1 flex flex-col" style={{ gap: "8px" }}>
              <label
                style={{
                  fontSize: "14px",
                  lineHeight: "24px",
                  fontWeight: 500,
                  color: "#121212",
                  letterSpacing: "-0.02em",
                }}
              >
                End date
              </label>
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
            <label
              style={{
                fontSize: "14px",
                lineHeight: "24px",
                fontWeight: 500,
                color: "#121212",
                letterSpacing: "-0.02em",
              }}
            >
              Upload Banner
            </label>
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

          <div className="flex items-center justify-end" style={{ gap: "16px", marginTop: "40px" }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "8px 16px",
                fontSize: "14px",
                fontWeight: 500,
                color: "#121212",
                letterSpacing: "-0.02em",
              }}
              className="hover:opacity-70 transition-opacity"
            >
              Cancel
            </button>
            <button
              type="button"
              className="text-white rounded-[12px] hover:opacity-90 transition-opacity"
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
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

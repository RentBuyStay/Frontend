"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PlaceBannerAdModal from "./PlaceBannerAdModal";
import {
  AD_PLACEMENT_DESCRIPTIONS,
  AD_PLACEMENT_DIMENSIONS,
  AD_PLACEMENT_LABELS,
  formatMoney,
  isAdvertisementPaid,
  useGetAdvertisementRatesQuery,
  useVerifyAdvertisementQuery,
  type AdPlacement,
  type AdvertisementRate,
} from "@/services/advertisementApi";

function PlacementCard({
  rate,
  onClick,
}: {
  rate: AdvertisementRate;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-[#F6F6F6] text-left transition-shadow w-full flex flex-col"
      style={{
        borderRadius: "24px",
        padding: "16px 16px 24px 16px",
        gap: "24px",
      }}
    >
      <div
        className="bg-white w-full"
        style={{ height: "221px", borderRadius: "20px" }}
      />
      <div className="flex flex-col" style={{ gap: "8px" }}>
        <h3
          style={{
            fontSize: "16px",
            lineHeight: "24px",
            fontWeight: 600,
            color: "#305E82",
          }}
        >
          {AD_PLACEMENT_LABELS[rate.placement]}
        </h3>
        <p
          style={{
            fontSize: "14px",
            lineHeight: "28px",
            fontWeight: 400,
            color: "#807E7E",
            letterSpacing: "-0.02em",
          }}
        >
          {AD_PLACEMENT_DESCRIPTIONS[rate.placement]}
        </p>
      </div>
      <div className="flex items-center flex-wrap" style={{ gap: "8px" }}>
        <div
          className="flex items-center"
          style={{
            gap: "8px",
            borderRadius: "10px",
            padding: "4px 12px",
            background: "rgba(120, 158, 187, 0.1)",
          }}
        >
          <Image src="/icons/maximize-3.svg" alt="" width={16} height={16} />
          <span
            style={{
              fontSize: "12px",
              lineHeight: "24px",
              fontWeight: 500,
              color: "#305E82",
            }}
          >
            {AD_PLACEMENT_DIMENSIONS[rate.placement]}
          </span>
        </div>
        <div
          className="flex items-center"
          style={{
            gap: "8px",
            borderRadius: "10px",
            padding: "4px 12px",
            background: "rgba(120, 158, 187, 0.1)",
          }}
        >
          <Image src="/icons/tag-2.svg" alt="" width={16} height={16} />
          <span
            style={{
              fontSize: "12px",
              lineHeight: "24px",
              fontWeight: 500,
              color: "#305E82",
            }}
          >
            {formatMoney(rate.dailyRate, rate.currency)}/day
          </span>
        </div>
      </div>
    </button>
  );
}

function PlacementCardSkeleton() {
  return (
    <div
      className="bg-[#F6F6F6] w-full flex flex-col animate-pulse"
      style={{ borderRadius: "24px", padding: "16px 16px 24px 16px", gap: "24px" }}
    >
      <div className="bg-white w-full" style={{ height: "221px", borderRadius: "20px" }} />
      <div className="flex flex-col" style={{ gap: "8px" }}>
        <div className="bg-white" style={{ height: "18px", width: "60%", borderRadius: "6px" }} />
        <div className="bg-white" style={{ height: "14px", width: "100%", borderRadius: "6px" }} />
        <div className="bg-white" style={{ height: "14px", width: "80%", borderRadius: "6px" }} />
      </div>
      <div className="flex items-center" style={{ gap: "8px" }}>
        <div className="bg-white" style={{ height: "28px", width: "96px", borderRadius: "10px" }} />
        <div className="bg-white" style={{ height: "28px", width: "96px", borderRadius: "10px" }} />
      </div>
    </div>
  );
}

export default function PlacementCards() {
  const { data: rates, isLoading, isError, refetch } =
    useGetAdvertisementRatesQuery();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<AdPlacement | undefined>(undefined);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-y-10 mt-8 md:mt-10">
        {isLoading &&
          [0, 1, 2, 3].map((i) => <PlacementCardSkeleton key={i} />)}
        {!isLoading &&
          rates?.map((rate) => (
            <PlacementCard
              key={rate.placement}
              rate={rate}
              onClick={() => {
                setSelected(rate.placement);
                setOpen(true);
              }}
            />
          ))}
      </div>

      {isError && (
        <div className="mt-8 text-center flex flex-col items-center" style={{ gap: "12px" }}>
          <p style={{ fontSize: "14px", lineHeight: "24px", color: "#807E7E" }}>
            We couldn’t load the placement options right now.
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="inline-flex items-center justify-center text-white rounded-[12px] hover:opacity-90 transition-opacity"
            style={{
              height: "44px",
              padding: "8px 24px",
              fontSize: "14px",
              fontWeight: 500,
              background:
                "linear-gradient(175deg, rgba(117,163,199,1) 0%, rgba(48,94,130,1) 100%)",
              border: "1px solid rgba(120,158,187,0.5)",
            }}
          >
            Try again
          </button>
        </div>
      )}

      <PlaceBannerAdModal
        open={open}
        initialPlacement={selected}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

/**
 * Payment-return screen. On coming back from the payment provider the banner-ad
 * page passes the ?reference= (or ?trxref=) here; we verify it against the
 * backend and show a truthful success/failure confirmation — success only once
 * the verified advertisement is actually paid.
 */
export function BannerAdPaymentReturn({ reference }: { reference: string }) {
  const { data, isLoading, isFetching, isError, error, refetch } =
    useVerifyAdvertisementQuery(reference);
  const verifying = isLoading || isFetching;
  const paid = isAdvertisementPaid(data);

  const errorMessage =
    error && typeof error === "object" && "data" in error
      ? (error as { data?: { message?: string | null } }).data?.message
      : null;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar variant="page" />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div
          className="max-w-[497px] w-full text-center flex flex-col items-center"
          style={{ gap: "40px" }}
        >
          {verifying ? (
            <div className="flex flex-col items-center" style={{ gap: "24px" }}>
              <div
                className="animate-spin rounded-full"
                style={{
                  width: "48px",
                  height: "48px",
                  border: "4px solid #E7EEF4",
                  borderTopColor: "#305E82",
                }}
              />
              <div className="flex flex-col items-center" style={{ gap: "8px" }}>
                <h1 style={{ fontSize: "20px", lineHeight: "30px", fontWeight: 600, color: "#121212" }}>
                  Verifying your payment…
                </h1>
                <p style={{ fontSize: "14px", lineHeight: "24px", fontWeight: 400, color: "#807E7E" }}>
                  Please hold on while we confirm your banner ad payment.
                </p>
              </div>
            </div>
          ) : paid ? (
            <>
              <div className="flex flex-col items-center" style={{ gap: "24px" }}>
                <Image src="/icons/payment-success.svg" alt="" width={113} height={113} />
                <div className="flex flex-col items-center" style={{ gap: "8px" }}>
                  <h1 style={{ fontSize: "20px", lineHeight: "30px", fontWeight: 600, color: "#121212" }}>
                    Payment Successful
                  </h1>
                  <p style={{ fontSize: "14px", lineHeight: "24px", fontWeight: 400, color: "#807E7E" }}>
                    Great! Your payment
                    {data?.amount != null
                      ? ` of ${formatMoney(data.amount, data.currency ?? "NGN")}`
                      : ""}{" "}
                    for banner ad placement on RentBuyStay platform is successful.
                    You will be notified when your ad has been placed.
                  </p>
                </div>
              </div>
              <Link
                href="/services/banner-ad"
                className="w-full inline-flex items-center justify-center text-white rounded-[12px] hover:opacity-90 transition-opacity"
                style={{
                  height: "48px",
                  padding: "8px 24px",
                  fontSize: "14px",
                  fontWeight: 500,
                  background: "linear-gradient(175deg, rgba(117,163,199,1) 0%, rgba(48,94,130,1) 100%)",
                  border: "1px solid rgba(120,158,187,0.5)",
                }}
              >
                Okay, proceed
              </Link>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center" style={{ gap: "24px" }}>
                <div
                  className="rounded-full flex items-center justify-center"
                  style={{
                    width: "80px",
                    height: "80px",
                    background: "rgba(227,0,69,0.08)",
                    color: "#E30045",
                    fontSize: "40px",
                    lineHeight: "1",
                  }}
                >
                  !
                </div>
                <div className="flex flex-col items-center" style={{ gap: "8px" }}>
                  <h1 style={{ fontSize: "20px", lineHeight: "30px", fontWeight: 600, color: "#121212" }}>
                    Payment not confirmed
                  </h1>
                  <p style={{ fontSize: "14px", lineHeight: "24px", fontWeight: 400, color: "#807E7E" }}>
                    {isError
                      ? errorMessage ??
                        "We couldn’t confirm your banner ad payment. If you were charged, please contact support — otherwise you can try placing your ad again."
                      : "Your banner ad payment hasn’t been completed yet. If you were charged, please contact support — otherwise you can try placing your ad again."}
                  </p>
                </div>
              </div>
              <div className="w-full flex flex-col md:flex-row" style={{ gap: "16px" }}>
                <button
                  type="button"
                  onClick={() => refetch()}
                  className="w-full inline-flex items-center justify-center rounded-[12px] hover:opacity-70 transition-opacity"
                  style={{
                    height: "48px",
                    padding: "8px 24px",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#121212",
                    border: "1px solid #EDEDED",
                  }}
                >
                  Check again
                </button>
                <Link
                  href="/services/banner-ad"
                  className="w-full inline-flex items-center justify-center text-white rounded-[12px] hover:opacity-90 transition-opacity"
                  style={{
                    height: "48px",
                    padding: "8px 24px",
                    fontSize: "14px",
                    fontWeight: 500,
                    background: "linear-gradient(175deg, rgba(117,163,199,1) 0%, rgba(48,94,130,1) 100%)",
                    border: "1px solid rgba(120,158,187,0.5)",
                  }}
                >
                  Place another ad
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

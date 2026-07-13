import { Suspense } from "react";
import Link from "next/link";

export const metadata = {
  title: "Unsubscribe | RentBuyStay",
  robots: { index: false, follow: false },
};

// The newsletter unsubscribe endpoint (on the API) processes the token and
// redirects here with ?status=success|error to confirm the result.
function UnsubscribeInner({ status }: { status?: string }) {
  const ok = status !== "error";
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 bg-white">
      <div className="max-w-[520px] w-full text-center flex flex-col items-center gap-4 border border-[#ededed] rounded-[20px] p-10">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
          style={{ background: ok ? "rgba(20,174,92,0.1)" : "rgba(227,0,69,0.08)", color: ok ? "#14AE5C" : "#E30045" }}
        >
          {ok ? "✓" : "!"}
        </div>
        <h1 className="text-[24px] font-semibold text-[#121212]">
          {ok ? "You’ve been unsubscribed" : "Something went wrong"}
        </h1>
        <p className="text-[15px] text-[#807e7e] leading-relaxed">
          {ok
            ? "You won’t receive property update emails from RentBuyStay anymore. Changed your mind? You can resubscribe anytime from the site."
            : "We couldn’t process that unsubscribe link — it may have expired or already been used. Please try again from a recent email."}
        </p>
        <Link
          href="/"
          className="mt-2 inline-flex items-center justify-center text-white rounded-[12px] h-12 px-6 text-[14px] font-medium hover:opacity-90 transition-opacity"
          style={{ background: "linear-gradient(175deg, rgba(117,163,199,1) 0%, rgba(48,94,130,1) 100%)", border: "1px solid rgba(120,158,187,0.5)" }}
        >
          Back to RentBuyStay
        </Link>
      </div>
    </div>
  );
}

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  return (
    <Suspense>
      <UnsubscribeInner status={status} />
    </Suspense>
  );
}

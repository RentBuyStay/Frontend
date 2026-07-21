import { api } from "./api";
import { endpoints } from "./endpoints";
import type { ApiEnvelope } from "./types";

/** The four real ad placements the backend sells (GET /advertisements/rates). */
export type AdPlacement =
  | "HOME_HERO"
  | "SEARCH_RESULTS_TOP"
  | "LISTING_SIDEBAR"
  | "PROPERTY_DETAIL";

/** A placement + its live daily price (data of GET /advertisements/rates). */
export type AdvertisementRate = {
  placement: AdPlacement;
  dailyRate: number;
  currency: string;
};

/** Data of POST /advertisements/creative — the uploaded creative. `id` is the
 *  creativeFileId used when creating the advertisement. */
export type CreativeUploadResponse = {
  id: string;
  url: string;
};

/** Body for POST /advertisements. amount is computed server-side. */
export type CreateAdvertisementRequest = {
  placement: AdPlacement;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  creativeFileId: string;
  targetUrl?: string;
  advertiserName?: string;
  advertiserEmail: string;
  advertiserPhone?: string;
};

/** Data of POST /advertisements — created ad, status PENDING_PAYMENT. */
export type AdvertisementResponse = {
  id: string;
  placement: AdPlacement;
  startDate: string;
  endDate: string;
  creativeFileId?: string;
  creativeFileUrl?: string;
  targetUrl?: string;
  advertiserName?: string;
  advertiserEmail?: string;
  advertiserPhone?: string;
  amount: number;
  currency: string;
  status: string; // PENDING_PAYMENT | ACTIVE | SCHEDULED | FAILED | ...
  paidAt?: string | null;
  createdAt?: string;
};

/** Data of POST /advertisements/{id}/pay — redirect the browser to
 *  authorizationUrl to complete payment. */
export type AdvertisementPaymentResponse = {
  authorizationUrl: string;
  reference: string;
  amount: number;
  currency: string;
};

/** Human-readable label for each placement (backend sends the raw enum). */
export const AD_PLACEMENT_LABELS: Record<AdPlacement, string> = {
  HOME_HERO: "Home Hero Banner",
  SEARCH_RESULTS_TOP: "Search Results Top",
  LISTING_SIDEBAR: "Listing Sidebar",
  PROPERTY_DETAIL: "Property Detail",
};

/** Marketing description for each placement (UI copy — the backend has none). */
export const AD_PLACEMENT_DESCRIPTIONS: Record<AdPlacement, string> = {
  HOME_HERO:
    "Front and centre on the homepage hero — the first thing every visitor sees when they land on RentBuyStay.",
  SEARCH_RESULTS_TOP:
    "Pinned to the top of the property search results, reaching seekers at the exact moment they are browsing.",
  LISTING_SIDEBAR:
    "A prominent vertical slot alongside property listings, perfect for targeted promotions and quick calls-to-action.",
  PROPERTY_DETAIL:
    "Featured on individual property detail pages, engaging high-intent users as they review a listing.",
};

/** Recommended creative size for each placement (UI guidance — the backend has none). */
export const AD_PLACEMENT_DIMENSIONS: Record<AdPlacement, string> = {
  HOME_HERO: "1440 x 400px",
  SEARCH_RESULTS_TOP: "1200 x 150px",
  LISTING_SIDEBAR: "300 x 600px",
  PROPERTY_DETAIL: "728 x 90px",
};

/** Format a rate as a currency amount (₦ for NGN, otherwise the currency code). */
export function formatMoney(amount: number, currency: string): string {
  const value = amount.toLocaleString("en-NG", { maximumFractionDigits: 0 });
  return currency === "NGN" ? `₦${value}` : `${currency} ${value}`;
}

/** Advertisement placements are considered paid once verify returns a status
 *  that is no longer awaiting/failed payment. The verify endpoint itself errors
 *  when payment was not successful, so any returned status here means the
 *  charge went through — this guard only rejects an explicit non-paid state. */
const NON_PAID_STATUSES = new Set([
  "PENDING_PAYMENT",
  "PENDING",
  "AWAITING_PAYMENT",
  "FAILED",
  "CANCELLED",
  "EXPIRED",
]);

export function isAdvertisementPaid(ad?: AdvertisementResponse | null): boolean {
  return Boolean(ad?.status) && !NON_PAID_STATUSES.has(ad!.status);
}

/** Public banner-ad flow: rates → creative upload → create → pay → verify. */
export const advertisementApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // The four real placements with their live daily rates + currency.
    getAdvertisementRates: builder.query<AdvertisementRate[], void>({
      query: () => ({ url: endpoints.advertisementRates, method: "GET" }),
      transformResponse: (res: ApiEnvelope<AdvertisementRate[]>) => res.data,
      keepUnusedDataFor: 600,
    }),

    // multipart/form-data upload (field name "file") → returns the creative file.
    uploadCreative: builder.mutation<CreativeUploadResponse, FormData>({
      query: (body) => ({
        url: endpoints.advertisementCreative,
        method: "POST",
        body,
      }),
      transformResponse: (res: ApiEnvelope<CreativeUploadResponse>) => res.data,
    }),

    // Creates the advertisement (status PENDING_PAYMENT; amount computed server-side).
    createAdvertisement: builder.mutation<
      AdvertisementResponse,
      CreateAdvertisementRequest
    >({
      query: (body) => ({
        url: endpoints.advertisements,
        method: "POST",
        body,
      }),
      transformResponse: (res: ApiEnvelope<AdvertisementResponse>) => res.data,
    }),

    // Starts a Paystack checkout; redirect the browser to authorizationUrl.
    payAdvertisement: builder.mutation<AdvertisementPaymentResponse, string>({
      query: (id) => ({ url: endpoints.advertisementPay(id), method: "POST" }),
      transformResponse: (res: ApiEnvelope<AdvertisementPaymentResponse>) =>
        res.data,
    }),

    // Called on return from Paystack with ?reference= (or ?trxref=).
    verifyAdvertisement: builder.query<AdvertisementResponse, string>({
      query: (reference) => ({
        url: endpoints.advertisementVerify(reference),
        method: "GET",
      }),
      transformResponse: (res: ApiEnvelope<AdvertisementResponse>) => res.data,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAdvertisementRatesQuery,
  useUploadCreativeMutation,
  useCreateAdvertisementMutation,
  usePayAdvertisementMutation,
  useVerifyAdvertisementQuery,
} = advertisementApi;

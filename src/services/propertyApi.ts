import { api } from "./api";
import { endpoints } from "./endpoints";
import type {
  ApiEnvelope,
  ArchiveReason,
  CreatePropertyRequest,
  Page,
  PropertyFacets,
  PropertyResponse,
} from "./types";

export type PageParams = { page?: number; size?: number; q?: string };

const toQuery = (params: PageParams = {}) => {
  const sp = new URLSearchParams();
  sp.set("page", String(params.page ?? 0));
  sp.set("size", String(params.size ?? 12));
  if (params.q) sp.set("q", params.q);
  return sp.toString();
};

/** Full filter set the public GET /properties endpoint supports (PropertyController). */
export type PropertyQuery = PageParams & {
  listingType?: "RENT" | "BUY" | "SHORTLET";
  propertyTypeId?: number;
  bedrooms?: number;
  minPrice?: number;
  maxPrice?: number;
  state?: string;
  city?: string;
  isFurnished?: boolean;
  isServiced?: boolean;
  isShared?: boolean;
  listedWithinDays?: number;
  sort?: "newest" | "priceAsc" | "priceDesc";
};

const toSearchQuery = (p: PropertyQuery = {}) => {
  const sp = new URLSearchParams();
  sp.set("page", String(p.page ?? 0));
  sp.set("size", String(p.size ?? 12));
  if (p.q) sp.set("q", p.q);
  if (p.listingType) sp.set("listingType", p.listingType);
  if (p.propertyTypeId != null) sp.set("propertyTypeId", String(p.propertyTypeId));
  if (p.bedrooms != null) sp.set("bedrooms", String(p.bedrooms));
  if (p.minPrice != null) sp.set("minPrice", String(p.minPrice));
  if (p.maxPrice != null) sp.set("maxPrice", String(p.maxPrice));
  if (p.state) sp.set("state", p.state);
  if (p.city) sp.set("city", p.city);
  if (p.isFurnished != null) sp.set("isFurnished", String(p.isFurnished));
  if (p.isServiced != null) sp.set("isServiced", String(p.isServiced));
  if (p.isShared != null) sp.set("isShared", String(p.isShared));
  if (p.listedWithinDays != null) sp.set("listedWithinDays", String(p.listedWithinDays));
  if (p.sort) sp.set("sort", p.sort);
  return sp.toString();
};

export const propertyApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // The current owner/agent's own listings (all statuses).
    getMyProperties: builder.query<Page<PropertyResponse>, PageParams | void>({
      query: (params) => ({
        url: `${endpoints.myProperties}?${toQuery(params ?? {})}`,
        method: "GET",
      }),
      transformResponse: (res: ApiEnvelope<Page<PropertyResponse>>) => res.data,
      providesTags: (result) =>
        result
          ? [
              ...result.content.map((p) => ({ type: "Property" as const, id: p.id })),
              { type: "Properties" as const, id: "MINE" },
            ]
          : [{ type: "Properties" as const, id: "MINE" }],
    }),

    // Public directory of listings (GET /properties) with server-side filters:
    // q, listingType, propertyTypeId, bedrooms, minPrice, maxPrice, state, city,
    // isFurnished, sort. Used by Featured Properties (no filters) and the listings.
    getActiveProperties: builder.query<Page<PropertyResponse>, PropertyQuery | void>({
      query: (params) => ({
        url: `${endpoints.properties}?${toSearchQuery(params ?? {})}`,
        method: "GET",
      }),
      transformResponse: (res: ApiEnvelope<Page<PropertyResponse>>) => res.data,
      providesTags: [{ type: "Properties", id: "PUBLIC" }],
    }),

    getProperty: builder.query<PropertyResponse, string>({
      query: (id) => ({ url: endpoints.property(id), method: "GET" }),
      transformResponse: (res: ApiEnvelope<PropertyResponse>) => res.data,
      providesTags: (_r, _e, id) => [{ type: "Property", id }],
    }),

    // Grouped active-listing counts for the listing-page sidebar (GET /properties/facets).
    getPropertyFacets: builder.query<
      PropertyFacets,
      { listingType?: "RENT" | "BUY" | "SHORTLET" } | void
    >({
      query: (params) => {
        const lt = params?.listingType;
        return {
          url: `${endpoints.propertiesFacets}${lt ? `?listingType=${lt}` : ""}`,
          method: "GET",
        };
      },
      transformResponse: (res: ApiEnvelope<PropertyFacets>) => res.data,
      providesTags: [{ type: "Properties", id: "FACETS" }],
    }),

    createProperty: builder.mutation<PropertyResponse, CreatePropertyRequest>({
      query: (body) => ({ url: endpoints.properties, method: "POST", body }),
      transformResponse: (res: ApiEnvelope<PropertyResponse>) => res.data,
      invalidatesTags: [{ type: "Properties", id: "MINE" }],
    }),

    updateProperty: builder.mutation<
      PropertyResponse,
      { id: string; body: Partial<CreatePropertyRequest> }
    >({
      query: ({ id, body }) => ({ url: endpoints.property(id), method: "PUT", body }),
      transformResponse: (res: ApiEnvelope<PropertyResponse>) => res.data,
      invalidatesTags: (_r, _e, { id }) => [
        { type: "Property", id },
        { type: "Properties", id: "MINE" },
      ],
    }),

    archiveProperty: builder.mutation<
      PropertyResponse,
      { id: string; reason: ArchiveReason }
    >({
      query: ({ id, reason }) => ({
        url: endpoints.propertyArchive(id),
        method: "PATCH",
        body: { reason },
      }),
      transformResponse: (res: ApiEnvelope<PropertyResponse>) => res.data,
      invalidatesTags: (_r, _e, { id }) => [
        { type: "Property", id },
        { type: "Properties", id: "MINE" },
      ],
    }),

    deleteProperty: builder.mutation<null, string>({
      query: (id) => ({ url: endpoints.property(id), method: "DELETE" }),
      transformResponse: (res: ApiEnvelope<null>) => res.data,
      invalidatesTags: (_r, _e, id) => [
        { type: "Property", id },
        { type: "Properties", id: "MINE" },
      ],
    }),

    // --- Saved properties (seeker) ---
    getSavedProperties: builder.query<Page<PropertyResponse>, PageParams | void>({
      query: (params) => ({
        url: `${endpoints.savedProperties}?${toQuery(params ?? {})}`,
        method: "GET",
      }),
      transformResponse: (res: ApiEnvelope<Page<PropertyResponse>>) => res.data,
      providesTags: [{ type: "SavedProperties", id: "LIST" }],
    }),

    saveProperty: builder.mutation<null, string>({
      query: (propertyId) => ({
        url: `${endpoints.savedProperties}/${propertyId}`,
        method: "POST",
      }),
      transformResponse: (res: ApiEnvelope<null>) => res.data,
      invalidatesTags: [{ type: "SavedProperties", id: "LIST" }],
    }),

    unsaveProperty: builder.mutation<null, string>({
      query: (propertyId) => ({
        url: `${endpoints.savedProperties}/${propertyId}`,
        method: "DELETE",
      }),
      transformResponse: (res: ApiEnvelope<null>) => res.data,
      invalidatesTags: [{ type: "SavedProperties", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMyPropertiesQuery,
  useGetActivePropertiesQuery,
  useGetPropertyFacetsQuery,
  useGetSavedPropertiesQuery,
  useSavePropertyMutation,
  useUnsavePropertyMutation,
  useGetPropertyQuery,
  useCreatePropertyMutation,
  useUpdatePropertyMutation,
  useArchivePropertyMutation,
  useDeletePropertyMutation,
} = propertyApi;

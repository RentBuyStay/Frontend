import { api } from "./api";
import { endpoints } from "./endpoints";
import type { ApiEnvelope } from "./types";

export type SubscribeRequest = {
  name: string;
  email: string;
  phoneNumber?: string;
};

/** Public newsletter signup (POST /newsletter/subscribe). */
export const newsletterApi = api.injectEndpoints({
  endpoints: (builder) => ({
    subscribeNewsletter: builder.mutation<null, SubscribeRequest>({
      query: (body) => ({
        url: endpoints.newsletterSubscribe,
        method: "POST",
        body,
      }),
      transformResponse: (res: ApiEnvelope<null>) => res.data,
    }),
  }),
  overrideExisting: false,
});

export const { useSubscribeNewsletterMutation } = newsletterApi;

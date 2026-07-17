import { api } from "./api";
import { endpoints } from "./endpoints";
import type { ApiEnvelope } from "./types";

/** Public Contact Us submission (POST /contact). Matches the backend
 * ContactRequest — firstName/lastName/email/message required, phone optional. */
export type ContactRequest = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  message: string;
};

export const contactApi = api.injectEndpoints({
  endpoints: (builder) => ({
    submitContact: builder.mutation<null, ContactRequest>({
      query: (body) => ({
        url: endpoints.contact,
        method: "POST",
        body,
      }),
      transformResponse: (res: ApiEnvelope<null>) => res.data,
    }),
  }),
  overrideExisting: false,
});

export const { useSubmitContactMutation } = contactApi;

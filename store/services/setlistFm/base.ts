import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * @see https://api.setlist.fm/docs/1.0/ui/index.html#/
 */
export const setlistFmApi = createApi({
  reducerPath: "setlistFm",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.setlist.fm/rest/1.0/",
    prepareHeaders: (headers) => {
      headers.set(
        "x-api-key",
        process.env.EXPO_PUBLIC_SETLISTFM_API_KEY ?? "NO_SETLISTFM_KEY_SET"
      );
      headers.set("Accept", "application/json");
      headers.set("Accept-Language", "en");
      return headers;
    },
  }),
  endpoints: () => ({}),
});

// export const {  } = setlistFmApi

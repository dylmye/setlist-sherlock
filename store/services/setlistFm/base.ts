import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getItem } from "expo-secure-store";
import { Platform } from "react-native";

import { version as appVersion } from "../../../package.json";
import { SETLIST_FM_API_LANGUAGE_STORAGE_KEY } from "../../../utils/i18n";

/**
 * @see https://api.setlist.fm/docs/1.0/ui/index.html#/
 */
export const setlistFmApi = createApi({
  reducerPath: "setlistFm",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_API_PROXY_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      headers.set(
        "Accept-Language",
        getItem(SETLIST_FM_API_LANGUAGE_STORAGE_KEY) ?? "en",
      ); // TODO: allow users to switch between en, es, fr, de, pt, tr, it, pl
      headers.set("x-sherlock-theatre-version", "1.0.0");
      headers.set(
        "User-Agent",
        `setlist-sherlock-client, ${Platform.OS}, ${appVersion}`,
      );
      return headers;
    },
  }),
  endpoints: () => ({}),
});

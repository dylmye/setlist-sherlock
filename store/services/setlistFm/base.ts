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
    baseUrl: "https://api.setlist.fm/rest/",
    prepareHeaders: (headers) => {
      headers.set(
        "x-api-key",
        process.env.EXPO_PUBLIC_SETLISTFM_API_KEY ?? "NO_SETLISTFM_KEY_SET",
      );
      headers.set("Origin", "https://setlist-sherlock.dylmye.me");
      headers.set("Accept", "application/json");
      headers.set(
        "Accept-Language",
        getItem(SETLIST_FM_API_LANGUAGE_STORAGE_KEY) ?? "en",
      ); // TODO: allow users to switch between en, es, fr, de, pt, tr, it, pl
      headers.set(
        "User-Agent",
        `setlist-sherlock, ${Platform.OS}, ${appVersion}`,
      );
      return headers;
    },
  }),
  endpoints: () => ({}),
});

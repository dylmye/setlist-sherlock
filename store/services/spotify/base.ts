import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { getItemAsync, setItemAsync } from "expo-secure-store";
import { refreshAsync } from "expo-auth-session";

import {
  REFRESH_TOKEN_STORAGE_KEY as SPOTIFY_REFRESH_TOKEN_STORAGE_KEY,
  BEARER_TOKEN_STORAGE_KEY as SPOTIFY_BEARER_TOKEN_STORAGE_KEY,
  discovery as spotifyDiscovery,
  clientId as spotifyClientId,
} from "../../oauth-configs/spotify";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://api.spotify.com/v1/",
  prepareHeaders: async (headers) => {
    headers.set("Origin", "https://setlist-sherlock.dylmye.me");

    const token = await getItemAsync(SPOTIFY_BEARER_TOKEN_STORAGE_KEY);

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  const refreshToken = await getItemAsync(SPOTIFY_REFRESH_TOKEN_STORAGE_KEY);

  if (result.error && result.error.status === 401 && !!refreshToken) {
    try {
      const refresh = await refreshAsync(
        {
          refreshToken,
          clientId: spotifyClientId ?? "NO_SPOTIFY_CLIENT_ID",
        },
        spotifyDiscovery,
      );
      await setItemAsync(SPOTIFY_BEARER_TOKEN_STORAGE_KEY, refresh.accessToken);
      await setItemAsync(
        SPOTIFY_REFRESH_TOKEN_STORAGE_KEY,
        refresh.refreshToken!,
      );
    } catch (e) {
      console.error(e);
      api.abort("Unable to refresh Spotify token");
    }

    result = await baseQuery(args, api, extraOptions);
  }
  return result;
};

/**
 * @see https://developer.spotify.com/documentation/web-api
 */
export const spotifyApi = createApi({
  reducerPath: "spotify",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});

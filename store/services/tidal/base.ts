import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { refreshAsync } from "expo-auth-session";
import { getItemAsync, setItemAsync } from "expo-secure-store";

import {
  REFRESH_TOKEN_STORAGE_KEY as TIDAL_REFRESH_TOKEN_STORAGE_KEY,
  BEARER_TOKEN_STORAGE_KEY as TIDAL_BEARER_TOKEN_STORAGE_KEY,
  discovery as tidalDiscovery,
  clientId as tidalClientId,
} from "../../oauth-configs/tidal";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://openapi.tidal.com/v2",
  prepareHeaders: async (headers) => {
    headers.set("Origin", "https://setlist-sherlock.dylmye.me");

    const token = await getItemAsync(TIDAL_BEARER_TOKEN_STORAGE_KEY);

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
  const refreshToken = await getItemAsync(TIDAL_REFRESH_TOKEN_STORAGE_KEY);

  if (result.error && result.error.status === 401 && !!refreshToken) {
    try {
      const refresh = await refreshAsync(
        {
          refreshToken,
          clientId: tidalClientId,
        },
        tidalDiscovery,
      );
      await setItemAsync(TIDAL_BEARER_TOKEN_STORAGE_KEY, refresh.accessToken);
      await setItemAsync(
        TIDAL_REFRESH_TOKEN_STORAGE_KEY,
        refresh.refreshToken!,
      );
    } catch (e) {
      console.error(e);
      api.abort("Unable to refresh TIDAL token");
    }

    result = await baseQuery(args, api, extraOptions);
  }
  return result;
};

export const tidalApi = createApi({
  reducerPath: "tidal",
  baseQuery,
  endpoints: () => ({}),
})
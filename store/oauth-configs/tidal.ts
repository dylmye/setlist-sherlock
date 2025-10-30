import { DiscoveryDocument } from "expo-auth-session";

export const discovery: DiscoveryDocument = {
  authorizationEndpoint: "https://login.tidal.com/authorize",
  tokenEndpoint: "https://auth.tidal.com/v1/oauth2/token",
};

// standard exports

export const clientId = process.env.EXPO_PUBLIC_TIDAL_API_KEY;
export const BEARER_TOKEN_STORAGE_KEY = "tidalBearerToken";
export const REFRESH_TOKEN_STORAGE_KEY = "tidalRefreshToken";


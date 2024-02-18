import { DiscoveryDocument } from "expo-auth-session";

export const discovery: DiscoveryDocument = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

// standard exports

export const clientId = process.env.EXPO_PUBLIC_SPOTIFY_API_KEY;
export const BEARER_TOKEN_STORAGE_KEY = "spotifyBearerToken";
export const REFRESH_TOKEN_STORAGE_KEY = "spotifyRefreshToken";

// custom exports

export const SPOTIFY_USERNAME_STORAGE_KEY = "spotifyUsername";

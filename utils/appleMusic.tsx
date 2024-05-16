import { Auth } from "@lomray/react-native-apple-music";
import { startActivityAsync } from "expo-intent-launcher";
import { Platform } from "react-native";
import { applicationId } from "expo-application";
import { setItemAsync } from "expo-secure-store";
import { add, getUnixTime } from "date-fns";

import MusicKitUserTokenError from "../types/MusicKitUserTokenError";
import {
  DEV_TOKEN_STORAGE_KEY as APPLE_MUSIC_DEV_TOKEN_STORAGE_KEY,
  DEV_TOKEN_EXPIRY_STORAGE_KEY as APPLE_MUSIC_DEV_TOKEN_EXPIRY_STORAGE_KEY,
  USER_TOKEN_STORAGE_KEY as APPLE_MUSIC_USER_TOKEN_STORAGE_KEY,
} from "../store/oauth-configs/appleMusic";

interface AuthIntentResult {
  /** if not successful, the enum value of why it failed */
  music_user_token_error?: (typeof MusicKitUserTokenError)[keyof typeof MusicKitUserTokenError];
  /** if successful, the user token to use as a header */
  music_user_token?: string;
  /** looks something like 143444-2,31 */
  apple_music_storefront?: string;
  /** two letter country */
  music_storefront?: string;
}

/**
 * On iOS, confirm authorised status. On Android, call
 * Apple Music app to get a user token and store it.
 * @returns Whether user is now authorised
 */
export const authorise = async (): Promise<boolean> => {
  if (Platform.OS === "ios") {
    const res = await Auth.authorize();
    return res === "authorized";
  }
  if (!process.env.EXPO_PUBLIC_APPLE_MUSIC_DEV_TOKEN_ENDPOINT) {
    console.error("No dev token endpoint available");
    return false;
  }
  try {
    const devTokenRes = await fetch(
      process.env.EXPO_PUBLIC_APPLE_MUSIC_DEV_TOKEN_ENDPOINT,
      {
        method: "GET",
        headers: {
          Origin: "https://setlist-sherlock.dylmye.me",
        },
      },
    );
    if (!devTokenRes.ok) {
      console.error(
        `Unable to get token from dev token endpoint: ${devTokenRes.statusText}`,
      );
      return false;
    }
    const devToken: { token: string } = await devTokenRes.json();
    const res = await startActivityAsync("android.intent.action.VIEW", {
      data: `musicsdk://applemusic/authenticate-v1?appPackage=${applicationId}&devToken=${devToken.token}`,
    });

    const extras: AuthIntentResult | undefined = res.extra;

    if (extras?.music_user_token_error !== undefined) {
      switch (extras.music_user_token_error) {
        case MusicKitUserTokenError.NO_SUBSCRIPTION: {
          console.error("Couldn't get user token: no subscription");
          break;
        }
        case MusicKitUserTokenError.SUBSCRIPTION_EXPIRED: {
          console.error("Couldn't get user token: subscription expired");
          break;
        }
        case MusicKitUserTokenError.TOKEN_FETCH_ERROR: {
          console.error("Couldn't get user token: token fetch error");
          break;
        }
        case MusicKitUserTokenError.USER_CANCELLED: {
          console.error("Couldn't get user token: user cancelled");
          break;
        }
        case MusicKitUserTokenError.UNKNOWN: {
          console.error("Couldn't get user token: unknown");
          break;
        }
      }
      return false;
    }

    if (!extras?.music_user_token) {
      console.error(
        "Successful response but no token provided:",
        JSON.stringify(res),
      );
    }

    const expiryDate = add(new Date(), {
      months: 5,
      days: 20,
    });

    await setItemAsync(APPLE_MUSIC_DEV_TOKEN_STORAGE_KEY, devToken.token);
    await setItemAsync(
      APPLE_MUSIC_DEV_TOKEN_EXPIRY_STORAGE_KEY,
      getUnixTime(expiryDate).toString(),
    );
    await setItemAsync(
      APPLE_MUSIC_USER_TOKEN_STORAGE_KEY,
      extras!.music_user_token!,
    );

    console.log(
      "dev token",
      devToken.token,
      "user token",
      extras!.music_user_token!,
    );

    return res.resultCode === -1;
  } catch (e) {
    console.error(e);
    return false;
  }
};

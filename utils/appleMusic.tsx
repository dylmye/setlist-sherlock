import { Auth } from "@lomray/react-native-apple-music";
import { add, getUnixTime } from "date-fns";
import { applicationId } from "expo-application";
import { startActivityAsync } from "expo-intent-launcher";
import { getLocales } from "expo-localization";
import { setItemAsync } from "expo-secure-store";
import { Platform } from "react-native";

import {
  DEV_TOKEN_STORAGE_KEY as APPLE_MUSIC_DEV_TOKEN_STORAGE_KEY,
  DEV_TOKEN_EXPIRY_STORAGE_KEY as APPLE_MUSIC_DEV_TOKEN_EXPIRY_STORAGE_KEY,
  USER_TOKEN_STORAGE_KEY as APPLE_MUSIC_USER_TOKEN_STORAGE_KEY,
} from "../store/oauth-configs/appleMusic";
import MusicKitUserTokenError from "../types/MusicKitUserTokenError";

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
 *
 * NB: Tokens are only required for Android. iOS will automatically
 * decorate requests when authorised.
 * @returns Whether user is now authorised
 */
export const authorise = async (): Promise<boolean> => {
  if (Platform.OS === "ios") {
    const res = await Auth.authorize();
    if (res === "authorized") {
      // set this token to show authorised/unauth state on settings,
      // also for api
      await setItemAsync(APPLE_MUSIC_USER_TOKEN_STORAGE_KEY, "IOS");
      return true;
    }
    return false;
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

    return res.resultCode === -1;
  } catch (e) {
    console.error(e);
    return false;
  }
};

/** These are ISO codes returned by the /storefronts endpoint. The inclusion of these regions in this code is not a position by the developer relating to the status or favourability of the country, all codes are provided directly by Apple Inc. */
const storefrontRegionCodes = [
  "dz" /** algeria */,
  "ao" /** angola */,
  "ai" /** anguilla */,
  "ag" /** antigua and barbuda */,
  "ar" /** argentina */,
  "am" /** armenia */,
  "au" /** australia */,
  "at" /** austria */,
  "az" /** azerbaijan */,
  "bs" /** bahamas */,
  "bh" /** bahrain */,
  "bb" /** barbados */,
  "by" /** belarus */,
  "be" /** belgium */,
  "bz" /** belize */,
  "bj" /** benin */,
  "bm" /** bermuda */,
  "bt" /** bhutan */,
  "bo" /** bolivia */,
  "ba" /** bosnia and herzegovina */,
  "bw" /** botswana */,
  "br" /** brazil */,
  "vg" /** british virgin islands */,
  "bg" /** bulgaria */,
  "kh" /** cambodia */,
  "cm" /** cameroon */,
  "ca" /** canada */,
  "cv" /** cape verde */,
  "ky" /** cayman islands */,
  "td" /** chad */,
  "cl" /** chile */,
  "cn" /** china mainland */,
  "co" /** colombia */,
  "cr" /** costa rica */,
  "hr" /** croatia */,
  "cy" /** cyprus */,
  "cz" /** czechia */,
  "ci" /** côte d'ivoire */,
  "cd" /** dem. rep. congo */,
  "dk" /** denmark */,
  "dm" /** dominica */,
  "do" /** dominican republic */,
  "ec" /** ecuador */,
  "eg" /** egypt */,
  "sv" /** el salvador */,
  "ee" /** estonia */,
  "sz" /** eswatini */,
  "fj" /** fiji */,
  "fi" /** finland */,
  "fr" /** france */,
  "ga" /** gabon */,
  "gm" /** gambia */,
  "ge" /** georgia */,
  "de" /** germany */,
  "gh" /** ghana */,
  "gd" /** grenada */,
  "gt" /** guatemala */,
  "gw" /** guinea-bissau */,
  "gy" /** guyana */,
  "hn" /** honduras */,
  "hk" /** hong kong */,
  "hu" /** hungary */,
  "is" /** iceland */,
  "in" /** india */,
  "id" /** indonesia */,
  "iq" /** iraq */,
  "ie" /** ireland */,
  "il" /** israel */,
  "it" /** italy */,
  "jm" /** jamaica */,
  "jp" /** japan */,
  "jo" /** jordan */,
  "kz" /** kazakhstan */,
  "ke" /** kenya */,
  "kr" /** south korea */,
  "xk" /** kosovo */,
  "kw" /** kuwait */,
  "kg" /** kyrgyzstan */,
  "la" /** laos */,
  "lv" /** latvia */,
  "lb" /** lebanon */,
  "lr" /** liberia */,
  "ly" /** libya */,
  "lt" /** lithuania */,
  "lu" /** luxembourg */,
  "mo" /** macao */,
  "mg" /** madagascar */,
  "mw" /** malawi */,
  "my" /** malaysia */,
  "mv" /** maldives */,
  "ml" /** mali */,
  "mt" /** malta */,
  "mr" /** mauritania */,
  "mu" /** mauritius */,
  "mx" /** mexico */,
  "fm" /** micronesia */,
  "md" /** moldova */,
  "mn" /** mongolia */,
  "me" /** montenegro */,
  "ms" /** monteserrat */,
  "ma" /** morocco */,
  "mz" /** mozambique */,
  "mm" /** myanmar */,
  "na" /** namibia */,
  "np" /** nepal */,
  "nl" /** netherlands */,
  "nz" /** new zealand */,
  "ni" /** nicaragua */,
  "ne" /** niger */,
  "ng" /** nigeria */,
  "mk" /** north macedonia */,
  "no" /** norway */,
  "om" /** oman */,
  "pa" /** panama */,
  "pg" /** papua new guinea */,
  "py" /** paraguay */,
  "pe" /** peru */,
  "ph" /** phillippines */,
  "pl" /** poland */,
  "pt" /** portugal */,
  "qa" /** qatar */,
  "cg" /** rep. congo */,
  "ro" /** romania */,
  "ru" /** russia */,
  "rw" /** rwanda */,
  "sa" /** saudi arabia */,
  "sn" /** senegal */,
  "rs" /** serbia */,
  "sc" /** seychelles */,
  "sl" /** sierra leone */,
  "sg" /** singapore */,
  "sk" /** slovakia */,
  "si" /** slovenia */,
  "sb" /** solomon islands */,
  "za" /** south africa */,
  "es" /** spain */,
  "lk" /** sri lanka */,
  "kn" /** st kitts and nevis */,
  "lc" /** st lucia */,
  "vc" /** st vincent and the grenadines */,
  "sr" /** suriname */,
  "se" /** sweden */,
  "ch" /** switzerland */,
  "tw" /** taiwan */,
  "tj" /** tajikistan */,
  "tz" /** tanzania */,
  "th" /** thailand */,
  "to" /** tonga */,
  "tt" /** trinidad and tobago */,
  "tn" /** tunisia */,
  "tm" /** turkmenistan */,
  "tc" /** turks and caicos */,
  "tr" /** turkey */,
  "ae" /** uae */,
  "ug" /** uganda */,
  "ua" /** ukraine */,
  "gb" /** united kingdom */,
  "us" /** united states */,
  "uy" /** uruguay */,
  "uz" /** uzbekistan */,
  "vu" /** vanuatu */,
  "ve" /** venezuela */,
  "vn" /** vietname */,
  "ye" /** yemen */,
  "zm" /** zambia */,
  "zw" /** zimbabwe */,
];

/** Returns the device's region code if it's in the storefront region code list, otherwise default to `us`. */
export const getUserStorefrontCode = () => {
  const deviceRegion = getLocales()[0].regionCode?.toLowerCase();

  if (!deviceRegion) {
    return "us";
  }

  if (storefrontRegionCodes.includes(deviceRegion)) {
    return deviceRegion;
  }

  return "us";
};

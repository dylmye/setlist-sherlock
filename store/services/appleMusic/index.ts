import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
  createApi,
} from "@reduxjs/toolkit/query/react";
import { deleteItemAsync, getItemAsync } from "expo-secure-store";
import { Platform } from "react-native";

import { authorise, getUserStorefrontCode } from "../../../utils/appleMusic";
import {
  USER_TOKEN_STORAGE_KEY as APPLE_MUSIC_USER_TOKEN_STORAGE_KEY,
  DEV_TOKEN_STORAGE_KEY as APPLE_MUSIC_DEV_TOKEN_STORAGE_KEY,
  DEV_TOKEN_EXPIRY_STORAGE_KEY as APPLE_MUSIC_DEV_TOKEN_EXPIRY_STORAGE_KEY,
} from "../../oauth-configs/appleMusic";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://api.music.apple.com/v1/",
  prepareHeaders: async (headers) => {
    headers.set("Origin", "https://setlist-sherlock.dylmye.me");

    // on Android this will be set to a token, on iOS a placeholder
    const userToken = await getItemAsync(APPLE_MUSIC_USER_TOKEN_STORAGE_KEY);

    if (Platform.OS === "android" && userToken) {
      const devToken = await getItemAsync(APPLE_MUSIC_DEV_TOKEN_STORAGE_KEY);
      headers.set("Authorization", `Bearer ${devToken}`);
      headers.set("Music-User-Token", userToken);
    }
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const authRes = await authorise();

    if (!authRes) {
      console.error("Unable to re-authorise");
      api.abort("Unable to refresh Apple authentication");

      // delete keys to prevent loads of repeat requests
      await deleteItemAsync(APPLE_MUSIC_USER_TOKEN_STORAGE_KEY);
      await deleteItemAsync(APPLE_MUSIC_DEV_TOKEN_STORAGE_KEY);
      await deleteItemAsync(APPLE_MUSIC_DEV_TOKEN_EXPIRY_STORAGE_KEY);
    }

    result = await baseQuery(args, api, extraOptions);
  }
  return result;
};

/**
 * @see https://developer.apple.com/documentation/applemusicapi
 */
export const appleMusicApi = createApi({
  reducerPath: "appleMusic",
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    search: build.query<SearchApiResponse, SearchApiArg | string>({
      query: (queryArg) => {
        const regionCode = getUserStorefrontCode();
        return {
          url: `catalog/${regionCode}/search`,
          params:
            typeof queryArg === "string"
              ? {
                  term: queryArg,
                  limit: 1,
                  types: "songs",
                }
              : {
                  term: queryArg.term,
                  limit: queryArg?.limit ?? 1,
                  types: queryArg?.types ?? "songs",
                },
        };
      },
    }),
    createNewLibraryPlaylist: build.mutation<
      LibraryPlaylistsResponse,
      LibraryPlaylistCreationArg
    >({
      query: (queryArg) => ({
        url: "me/library/playlists",
        method: "POST",
        body: {
          attributes: {
            name: queryArg.name,
            description: queryArg?.description ?? undefined,
          },
          relationships: queryArg?.songIds?.length
            ? {
                tracks: {
                  data: queryArg.songIds.map((s) => ({
                    id: s,
                    type: "songs",
                  })),
                },
              }
            : undefined,
        } as LibraryPlaylistCreationRequest,
      }),
    }),
  }),
});

export type SearchApiArg = {
  /** The entered text for the search with ‘+’ characters between each word, to replace spaces (for example term=james+br). */
  term: string;
  /** The localization to use, specified by a language tag. The possible values are in the `supportedLanguageTags` array belonging to the Storefront object specified by `storefront`. Otherwise, the default is `defaultLanguageTag` in `Storefront`. */
  l?: string;
  /** The number of objects or number of objects in the specified relationship returned. Default: 5, Maximum Value: 25 */
  limit?: number;
  /** The next page or group of objects to fetch. */
  offset?: string;
  /** The list of the types of resources to include in the results. */
  types?: SearchRequestTypes[];
  /** A list of modifications to apply to the request. */
  with?: "topResults"[];
};

export type SearchApiResponse = {
  results?: {
    activities?: any;
    albums?: any;
    "apple-curators"?: any;
    artists?: any;
    curators?: any;
    "music-videos"?: any;
    playlists?: any;
    "record-labels"?: any;
    songs?: {
      /** The resources for the search result. */
      data: {
        /** The identifier for the song. */
        id: string;
        /** This value is always `songs`. */
        type: "songs";
        /** The relative location for the song resource. */
        href: string;
        /** The attributes for the song. */
        attributes: SongsAttributesObject;
        /** (untyped) The relationships for the song. */
        relationships: any;
      }[];
      /** The relative location to fetch the search result. */
      href: string;
      /** A relative cursor to fetch the next paginated collection of resources in the result, if more exist. */
      next: string;
    };
    stations?: any;
    top?: any;
  };
};

export type LibraryPlaylistCreationArg = {
  name: string;
  description?: string;
  songIds?: string[];
};

type LibraryPlaylistCreationRequest = {
  attributes: {
    /** The name of the playlist. */
    name: string;
    /** The description of the playlist. */
    description?: string;
  };
  /** An optional key including tracks for the new playlist. */
  relationships?: {
    /** The songs and music videos the user adds to the playlist for the creation request. */
    tracks: {
      /** A dictionary that includes strings for the identifier and type of the new playlist. */
      data: {
        /** The unique identifier for the track. This ID can be a catalog identifier or a library identifier, depending on the track type. */
        id: string;
        /** The type of the track to be added. */
        type:
          | "library-music-videos"
          | "library-songs"
          | "music-videos"
          | "songs";
      }[];
    };
    /** (untyped) The library playlist folder which contains the created playlist. */
    parent?: any;
  };
};

export type LibraryPlaylistsResponse = {
  data: {
    /** The identifier for the library playlist. */
    id: string;
    type: "library-playlists";
    /** The relative location for the library playlist resource. */
    href: string;
    /** The attributes for the library playlist.  */
    attributes: any;
    /** The relationships for the library playlist. */
    relationships: any;
  }[];
};

/** @see https://developer.apple.com/documentation/applemusicapi/songs/attributes */
type SongsAttributesObject = {
  /** The name of the album the song appears on. */
  albumName: string;
  /** The artist’s name. */
  artistName: string;
  /** The URL of the artist for the content. */
  artistUrl: string;
  /** (untyped) The album artwork. */
  artwork: any;
  /** (Classical music only) The name of the artist or composer to attribute the song with. */
  attribution?: string;
  /** Indicates the specific audio variant for a song. */
  audioVariants?: AudioVariants[];
  /** The song’s composer. */
  composerName?: string;
  /** The Recording Industry Association of America (RIAA) rating of the content. No value means no rating. */
  contentRating?: "clean" | "explicit";
  /** The disc number of the album the song appears on. */
  discNumber?: number;
  /** The duration of the song in milliseconds. */
  durationInMillis: number;
  /** The notes about the song that appear in the Apple Music catalog. */
  editorialNotes: any;
  /** The genre names the song is associated with. */
  genreNames: string[];
  /** Indicates whether the song has lyrics available in the Apple Music catalog. If true, the song has lyrics available; otherwise, it doesn't. */
  hasLyrics: boolean;
  /** Indicates whether the response delivered the song as an Apple Digital Master.
   * @see https://www.apple.com/apple-music/apple-digital-masters/
   */
  isAppleDigitalMaster: boolean;
  /** The International Standard Recording Code (ISRC) for the song. */
  isrc?: string;
  /** (Classical music only) The movement count of the song. */
  movementCount?: number;
  /** (Classical music only) The movement name of the song. */
  movementName?: string;
  /** (Classical music only) The movement number of the song. */
  movementNumber?: number;
  /** The localized name of the song. */
  name: string;
  /** (untyped) When present, this attribute indicates that the song is available to play with an Apple Music subscription. The value map may be used to initiate playback. Previews of the song audio may be available with or without an Apple Music subscription. */
  playParams: any;
  /** (untyped) The preview assets for the song. */
  previews: any[];
  /** The release date of the song, when known, in YYYY-MM-DD or YYYY format. Prerelease songs may have an expected release date in the future. */
  releaseDate?: string;
  /** The number of the song in the album’s track list. */
  trackNumber?: number;
  /** The URL for sharing the song in Apple Music.  */
  url: string;
  /** (Classical music only) The name of the associated work. */
  workName?: string;
};

type SearchRequestTypes =
  | "activities"
  | "albums"
  | "apple-curators"
  | "artists"
  | "curators"
  | "music-videos"
  | "playlists"
  | "record-labels"
  | "songs"
  | "stations";

type AudioVariants =
  | "dolby-atmos"
  | "dolby-audio"
  | "hi-res-lossless"
  | "lossless"
  | "lossy-stereo";

export const { useCreateNewLibraryPlaylistMutation, useSearchQuery } =
  appleMusicApi;

import { spotifyApi as api } from "./base";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    search: build.query<SearchApiResponse, SearchApiArg>({
      query: (queryArg) => ({
        url: `/search`,
        params: {
          q: queryArg.q,
          type: queryArg["type"],
          market: queryArg.market,
          limit: queryArg.limit,
          offset: queryArg.offset,
          include_external: queryArg.includeExternal,
        },
      }),
    }),
    getMe: build.query<GetMeApiResponse, GetMeApiArg>({
      query: () => ({ url: `/me` }),
    }),
    postPlaylistsByPlaylistIdTracks: build.mutation<
      PostPlaylistsByPlaylistIdTracksApiResponse,
      PostPlaylistsByPlaylistIdTracksApiArg
    >({
      query: (queryArg) => ({
        url: `/playlists/${queryArg.playlistId}/tracks`,
        method: "POST",
        body: queryArg.body,
        params: { position: queryArg.position, uris: queryArg.uris },
      }),
    }),
    postUsersByUserIdPlaylists: build.mutation<
      PostUsersByUserIdPlaylistsApiResponse,
      PostUsersByUserIdPlaylistsApiArg
    >({
      query: (queryArg) => ({
        url: `/users/${queryArg.userId}/playlists`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as spotifyApi };
export type SearchApiResponse = /** status 200 Search response */ {
  tracks?: PagingTrackObject;
  artists?: PagingArtistObject;
  albums?: PagingSimplifiedAlbumObject;
  playlists?: PagingPlaylistObject;
  shows?: PagingSimplifiedShowObject;
  episodes?: PagingSimplifiedEpisodeObject;
  audiobooks?: PagingSimplifiedAudiobookObject;
};
export type SearchApiArg = {
  q: string;
  type: (
    | "album"
    | "artist"
    | "playlist"
    | "track"
    | "show"
    | "episode"
    | "audiobook"
  )[];
  market?: string;
  limit?: number;
  offset?: number;
  includeExternal?: "audio";
};
export type GetMeApiResponse = /** status 200 A user */ PrivateUserObject;
export type GetMeApiArg = void;
export type PostPlaylistsByPlaylistIdTracksApiResponse =
  /** status 201 A snapshot ID for the playlist */ {
    snapshot_id?: string;
  };
export type PostPlaylistsByPlaylistIdTracksApiArg = {
  playlistId: string;
  position?: number;
  uris?: string;
  body: {
    uris?: string[];
    position?: number;
    [key: string]: any;
  };
};
export type PostUsersByUserIdPlaylistsApiResponse =
  /** status 201 A playlist */ PlaylistObject;
export type PostUsersByUserIdPlaylistsApiArg = {
  userId: string;
  body: {
    name: string;
    public?: boolean;
    collaborative?: boolean;
    description?: string;
    [key: string]: any;
  };
};
export type PagingObject = {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
};
export type ExternalUrlObject = {
  spotify?: string;
};
export type ImageObject = {
  url: string;
  height: number | null;
  width: number | null;
};
export type AlbumRestrictionObject = {
  reason?: "market" | "product" | "explicit";
};
export type AlbumBase = {
  album_type: "album" | "single" | "compilation";
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrlObject;
  href: string;
  id: string;
  images: ImageObject[];
  name: string;
  release_date: string;
  release_date_precision: "year" | "month" | "day";
  restrictions?: AlbumRestrictionObject;
  type: "album";
  uri: string;
};
export type SimplifiedArtistObject = {
  external_urls?: ExternalUrlObject;
  href?: string;
  id?: string;
  name?: string;
  type?: "artist";
  uri?: string;
};
export type SimplifiedAlbumObject = AlbumBase & {
  artists: SimplifiedArtistObject[];
};
export type FollowersObject = {
  href?: string | null;
  total?: number;
};
export type ArtistObject = {
  external_urls?: ExternalUrlObject;
  followers?: FollowersObject;
  genres?: string[];
  href?: string;
  id?: string;
  images?: ImageObject[];
  name?: string;
  popularity?: number;
  type?: "artist";
  uri?: string;
};
export type ExternalIdObject = {
  isrc?: string;
  ean?: string;
  upc?: string;
};
export type LinkedTrackObject = {
  external_urls?: ExternalUrlObject;
  href?: string;
  id?: string;
  type?: string;
  uri?: string;
};
export type TrackRestrictionObject = {
  reason?: string;
};
export type TrackObject = {
  album?: SimplifiedAlbumObject;
  artists?: ArtistObject[];
  available_markets?: string[];
  disc_number?: number;
  duration_ms?: number;
  explicit?: boolean;
  external_ids?: ExternalIdObject;
  external_urls?: ExternalUrlObject;
  href?: string;
  id?: string;
  is_playable?: boolean;
  linked_from?: LinkedTrackObject;
  restrictions?: TrackRestrictionObject;
  name?: string;
  popularity?: number;
  preview_url?: string | null;
  track_number?: number;
  type?: "track";
  uri?: string;
  is_local?: boolean;
};
export type PagingTrackObject = PagingObject & {
  items?: TrackObject[];
};
export type PagingArtistObject = PagingObject & {
  items?: ArtistObject[];
};
export type PagingSimplifiedAlbumObject = PagingObject & {
  items?: SimplifiedAlbumObject[];
};
export type PlaylistUserObject = {
  external_urls?: ExternalUrlObject;
  followers?: FollowersObject;
  href?: string;
  id?: string;
  type?: "user";
  uri?: string;
};
export type PlaylistOwnerObject = PlaylistUserObject & {
  display_name?: string | null;
};
export type PlaylistTracksRefObject = {
  href?: string;
  total?: number;
};
export type SimplifiedPlaylistObject = {
  collaborative?: boolean;
  description?: string;
  external_urls?: ExternalUrlObject;
  href?: string;
  id?: string;
  images?: ImageObject[];
  name?: string;
  owner?: PlaylistOwnerObject;
  public?: boolean;
  snapshot_id?: string;
  tracks?: PlaylistTracksRefObject;
  type?: string;
  uri?: string;
};
export type PagingPlaylistObject = PagingObject & {
  items?: SimplifiedPlaylistObject[];
};
export type CopyrightObject = {
  text?: string;
  type?: string;
};
export type ShowBase = {
  available_markets: string[];
  copyrights: CopyrightObject[];
  description: string;
  html_description: string;
  explicit: boolean;
  external_urls: ExternalUrlObject;
  href: string;
  id: string;
  images: ImageObject[];
  is_externally_hosted: boolean;
  languages: string[];
  media_type: string;
  name: string;
  publisher: string;
  type: "show";
  uri: string;
  total_episodes: number;
};
export type SimplifiedShowObject = ShowBase;
export type PagingSimplifiedShowObject = PagingObject & {
  items?: SimplifiedShowObject[];
};
export type ResumePointObject = {
  fully_played?: boolean;
  resume_position_ms?: number;
};
export type EpisodeRestrictionObject = {
  reason?: string;
};
export type EpisodeBase = {
  audio_preview_url: string | null;
  description: string;
  html_description: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrlObject;
  href: string;
  id: string;
  images: ImageObject[];
  is_externally_hosted: boolean;
  is_playable: boolean;
  language?: string;
  languages: string[];
  name: string;
  release_date: string;
  release_date_precision: "year" | "month" | "day";
  resume_point: ResumePointObject;
  type: "episode";
  uri: string;
  restrictions?: EpisodeRestrictionObject;
};
export type SimplifiedEpisodeObject = EpisodeBase;
export type PagingSimplifiedEpisodeObject = PagingObject & {
  items?: SimplifiedEpisodeObject[];
};
export type AuthorObject = {
  name?: string;
};
export type NarratorObject = {
  name?: string;
};
export type AudiobookBase = {
  authors: AuthorObject[];
  available_markets: string[];
  copyrights: CopyrightObject[];
  description: string;
  html_description: string;
  edition?: string;
  explicit: boolean;
  external_urls: ExternalUrlObject;
  href: string;
  id: string;
  images: ImageObject[];
  languages: string[];
  media_type: string;
  name: string;
  narrators: NarratorObject[];
  publisher: string;
  type: "audiobook";
  uri: string;
  total_chapters: number;
};
export type SimplifiedAudiobookObject = AudiobookBase;
export type PagingSimplifiedAudiobookObject = PagingObject & {
  items?: SimplifiedAudiobookObject[];
};
export type ErrorObject = {
  status: number;
  message: string;
};
export type ExplicitContentSettingsObject = {
  filter_enabled?: boolean;
  filter_locked?: boolean;
};
export type PrivateUserObject = {
  country?: string;
  display_name?: string;
  email?: string;
  explicit_content?: ExplicitContentSettingsObject;
  external_urls?: ExternalUrlObject;
  followers?: FollowersObject;
  href?: string;
  id?: string;
  images?: ImageObject[];
  product?: string;
  type?: string;
  uri?: string;
};
export type EpisodeObject = EpisodeBase & {
  show: SimplifiedShowObject;
};
export type PlaylistTrackObject = {
  added_at?: string;
  added_by?: PlaylistUserObject;
  is_local?: boolean;
  track?:
    | ({
        type: "TrackObject";
      } & TrackObject)
    | ({
        type: "EpisodeObject";
      } & EpisodeObject);
};
export type PagingPlaylistTrackObject = PagingObject & {
  items?: PlaylistTrackObject[];
};
export type PlaylistObject = {
  collaborative?: boolean;
  description?: string | null;
  external_urls?: ExternalUrlObject;
  followers?: FollowersObject;
  href?: string;
  id?: string;
  images?: ImageObject[];
  name?: string;
  owner?: PlaylistOwnerObject;
  public?: boolean;
  snapshot_id?: string;
  tracks?: PagingPlaylistTrackObject;
  type?: string;
  uri?: string;
};
export const {
  useSearchQuery,
  useGetMeQuery,
  usePostPlaylistsByPlaylistIdTracksMutation,
  usePostUsersByUserIdPlaylistsMutation,
} = injectedRtkApi;

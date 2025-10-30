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
        params: {
          position: queryArg.position,
          uris: queryArg.uris,
        },
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
    putPlaylistsByPlaylistIdFollowers: build.mutation<
      PutPlaylistsByPlaylistIdFollowersApiResponse,
      PutPlaylistsByPlaylistIdFollowersApiArg
    >({
      query: (queryArg) => ({
        url: `/playlists/${queryArg.playlistId}/followers`,
        method: "PUT",
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
    /** A JSON array of the [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) to add. For example: `{"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh","spotify:track:1301WleyT98MSxVHPZCA6M", "spotify:episode:512ojhOuo1ktJprKbVcKyQ"]}`<br/>A maximum of 100 items can be added in one request. _**Note**: if the `uris` parameter is present in the query string, any URIs listed here in the body will be ignored._
     */
    uris?: string[];
    /** The position to insert the items, a zero-based index. For example, to insert the items in the first position: `position=0` ; to insert the items in the third position: `position=2`. If omitted, the items will be appended to the playlist. Items are added in the order they appear in the uris array. For example: `{"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh","spotify:track:1301WleyT98MSxVHPZCA6M"], "position": 3}`
     */
    position?: number;
    [key: string]: any;
  };
};
export type PostUsersByUserIdPlaylistsApiResponse =
  /** status 201 A playlist */ PlaylistObject;
export type PostUsersByUserIdPlaylistsApiArg = {
  userId: string;
  body: {
    /** The name for the new playlist, for example `"Your Coolest Playlist"`. This name does not need to be unique; a user may have several playlists with the same name.
     */
    name: string;
    /** Defaults to `true`. The playlist's public/private status (if it should be added to the user's profile or not): `true` the playlist will be public, `false` the playlist will be private. To be able to create private playlists, the user must have granted the `playlist-modify-private` [scope](/documentation/web-api/concepts/scopes/#list-of-scopes). For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)
     */
    public?: boolean;
    /** Defaults to `false`. If `true` the playlist will be collaborative. _**Note**: to create a collaborative playlist you must also set `public` to `false`. To create collaborative playlists you must have granted `playlist-modify-private` and `playlist-modify-public` [scopes](/documentation/web-api/concepts/scopes/#list-of-scopes)._
     */
    collaborative?: boolean;
    /** value for playlist description as displayed in Spotify Clients and in the Web API.
     */
    description?: string;
    [key: string]: any;
  };
};
export type PutPlaylistsByPlaylistIdFollowersApiResponse = unknown;
export type PutPlaylistsByPlaylistIdFollowersApiArg = {
  playlistId: string;
  body: {
    /** Defaults to `true`. If `true` the playlist will be included in user's public playlists (added to profile), if `false` it will remain private. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)
     */
    public?: boolean;
    [key: string]: any;
  };
};
export type PagingObject = {
  /** A link to the Web API endpoint returning the full result of the request
   */
  href: string;
  /** The maximum number of items in the response (as set in the query or by default).
   */
  limit: number;
  /** URL to the next page of items. ( `null` if none)
   */
  next: string | null;
  /** The offset of the items returned (as set in the query or by default)
   */
  offset: number;
  /** URL to the previous page of items. ( `null` if none)
   */
  previous: string | null;
  /** The total number of items available to return.
   */
  total: number;
};
export type ExternalUrlObject = {
  /** The [Spotify URL](/documentation/web-api/concepts/spotify-uris-ids) for the object.
   */
  spotify?: string;
};
export type ImageObject = {
  /** The source URL of the image.
   */
  url: string;
  /** The image height in pixels.
   */
  height: number | null;
  /** The image width in pixels.
   */
  width: number | null;
};
export type AlbumRestrictionObject = {
  /** The reason for the restriction. Albums may be restricted if the content is not available in a given market, to the user's subscription type, or when the user's account is set to not play explicit content.
    Additional reasons may be added in the future.
     */
  reason?: "market" | "product" | "explicit";
};
export type AlbumBase = {
  /** The type of the album.
   */
  album_type: "album" | "single" | "compilation";
  /** The number of tracks in the album. */
  total_tracks: number;
  /** The markets in which the album is available: [ISO 3166-1 alpha-2 country codes](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). _**NOTE**: an album is considered available in a market when at least 1 of its tracks is available in that market._
   */
  available_markets: string[];
  /** Known external URLs for this album.
   */
  external_urls: ExternalUrlObject;
  /** A link to the Web API endpoint providing full details of the album.
   */
  href: string;
  /** The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the album.
   */
  id: string;
  /** The cover art for the album in various sizes, widest first.
   */
  images: ImageObject[];
  /** The name of the album. In case of an album takedown, the value may be an empty string.
   */
  name: string;
  /** The date the album was first released.
   */
  release_date: string;
  /** The precision with which `release_date` value is known.
   */
  release_date_precision: "year" | "month" | "day";
  /** Included in the response when a content restriction is applied.
   */
  restrictions?: AlbumRestrictionObject;
  /** The object type.
   */
  type: "album";
  /** The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the album.
   */
  uri: string;
};
export type SimplifiedArtistObject = {
  /** Known external URLs for this artist.
   */
  external_urls?: ExternalUrlObject;
  /** A link to the Web API endpoint providing full details of the artist.
   */
  href?: string;
  /** The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the artist.
   */
  id?: string;
  /** The name of the artist.
   */
  name?: string;
  /** The object type.
   */
  type?: "artist";
  /** The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the artist.
   */
  uri?: string;
};
export type SimplifiedAlbumObject = AlbumBase & {
  /** The artists of the album. Each artist object includes a link in `href` to more detailed information about the artist.
   */
  artists: SimplifiedArtistObject[];
};
export type ExternalIdObject = {
  /** [International Standard Recording Code](http://en.wikipedia.org/wiki/International_Standard_Recording_Code)
   */
  isrc?: string;
  /** [International Article Number](http://en.wikipedia.org/wiki/International_Article_Number_%28EAN%29)
   */
  ean?: string;
  /** [Universal Product Code](http://en.wikipedia.org/wiki/Universal_Product_Code)
   */
  upc?: string;
};
export type LinkedTrackObject = {
  /** Known external URLs for this track.
   */
  external_urls?: ExternalUrlObject;
  /** A link to the Web API endpoint providing full details of the track.
   */
  href?: string;
  /** The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.
   */
  id?: string;
  /** The object type: "track".
   */
  type?: string;
  /** The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the track.
   */
  uri?: string;
};
export type TrackRestrictionObject = {
  /** The reason for the restriction. Supported values:
    - `market` - The content item is not available in the given market.
    - `product` - The content item is not available for the user's subscription type.
    - `explicit` - The content item is explicit and the user's account is set to not play explicit content.
    
    Additional reasons may be added in the future.
    **Note**: If you use this field, make sure that your application safely handles unknown values.
     */
  reason?: string;
};
export type TrackObject = {
  /** The album on which the track appears. The album object includes a link in `href` to full information about the album.
   */
  album?: SimplifiedAlbumObject;
  /** The artists who performed the track. Each artist object includes a link in `href` to more detailed information about the artist.
   */
  artists?: SimplifiedArtistObject[];
  /** A list of the countries in which the track can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.
   */
  available_markets?: string[];
  /** The disc number (usually `1` unless the album consists of more than one disc).
   */
  disc_number?: number;
  /** The track length in milliseconds.
   */
  duration_ms?: number;
  /** Whether or not the track has explicit lyrics ( `true` = yes it does; `false` = no it does not OR unknown).
   */
  explicit?: boolean;
  /** Known external IDs for the track.
   */
  external_ids?: ExternalIdObject;
  /** Known external URLs for this track.
   */
  external_urls?: ExternalUrlObject;
  /** A link to the Web API endpoint providing full details of the track.
   */
  href?: string;
  /** The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.
   */
  id?: string;
  /** Part of the response when [Track Relinking](/documentation/web-api/concepts/track-relinking) is applied. If `true`, the track is playable in the given market. Otherwise `false`.
   */
  is_playable?: boolean;
  /** Part of the response when [Track Relinking](/documentation/web-api/concepts/track-relinking) is applied, and the requested track has been replaced with different track. The track in the `linked_from` object contains information about the originally requested track. */
  linked_from?: LinkedTrackObject;
  /** Included in the response when a content restriction is applied.
   */
  restrictions?: TrackRestrictionObject;
  /** The name of the track.
   */
  name?: string;
  /** The popularity of the track. The value will be between 0 and 100, with 100 being the most popular.<br/>The popularity of a track is a value between 0 and 100, with 100 being the most popular. The popularity is calculated by algorithm and is based, in the most part, on the total number of plays the track has had and how recent those plays are.<br/>Generally speaking, songs that are being played a lot now will have a higher popularity than songs that were played a lot in the past. Duplicate tracks (e.g. the same track from a single and an album) are rated independently. Artist and album popularity is derived mathematically from track popularity. _**Note**: the popularity value may lag actual popularity by a few days: the value is not updated in real time._
   */
  popularity?: number;
  /** A link to a 30 second preview (MP3 format) of the track. Can be `null`
   */
  preview_url?: string | null;
  /** The number of the track. If an album has several discs, the track number is the number on the specified disc.
   */
  track_number?: number;
  /** The object type: "track".
   */
  type?: "track";
  /** The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the track.
   */
  uri?: string;
  /** Whether or not the track is from a local file.
   */
  is_local?: boolean;
};
export type PagingTrackObject = PagingObject & {
  items?: TrackObject[];
};
export type FollowersObject = {
  /** This will always be set to null, as the Web API does not support it at the moment.
   */
  href?: string | null;
  /** The total number of followers.
   */
  total?: number;
};
export type ArtistObject = {
  /** Known external URLs for this artist.
   */
  external_urls?: ExternalUrlObject;
  /** Information about the followers of the artist.
   */
  followers?: FollowersObject;
  /** A list of the genres the artist is associated with. If not yet classified, the array is empty.
   */
  genres?: string[];
  /** A link to the Web API endpoint providing full details of the artist.
   */
  href?: string;
  /** The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the artist.
   */
  id?: string;
  /** Images of the artist in various sizes, widest first.
   */
  images?: ImageObject[];
  /** The name of the artist.
   */
  name?: string;
  /** The popularity of the artist. The value will be between 0 and 100, with 100 being the most popular. The artist's popularity is calculated from the popularity of all the artist's tracks.
   */
  popularity?: number;
  /** The object type.
   */
  type?: "artist";
  /** The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the artist.
   */
  uri?: string;
};
export type PagingArtistObject = PagingObject & {
  items?: ArtistObject[];
};
export type PagingSimplifiedAlbumObject = PagingObject & {
  items?: SimplifiedAlbumObject[];
};
export type PlaylistUserObject = {
  /** Known public external URLs for this user.
   */
  external_urls?: ExternalUrlObject;
  /** A link to the Web API endpoint for this user.
   */
  href?: string;
  /** The [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids) for this user.
   */
  id?: string;
  /** The object type.
   */
  type?: "user";
  /** The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for this user.
   */
  uri?: string;
};
export type PlaylistOwnerObject = PlaylistUserObject & {
  /** The name displayed on the user's profile. `null` if not available.
   */
  display_name?: string | null;
};
export type PlaylistTracksRefObject = {
  /** A link to the Web API endpoint where full details of the playlist's tracks can be retrieved.
   */
  href?: string;
  /** Number of tracks in the playlist.
   */
  total?: number;
};
export type SimplifiedPlaylistObject = {
  /** `true` if the owner allows other users to modify the playlist.
   */
  collaborative?: boolean;
  /** The playlist description. _Only returned for modified, verified playlists, otherwise_ `null`.
   */
  description?: string;
  /** Known external URLs for this playlist.
   */
  external_urls?: ExternalUrlObject;
  /** A link to the Web API endpoint providing full details of the playlist.
   */
  href?: string;
  /** The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the playlist.
   */
  id?: string;
  /** Images for the playlist. The array may be empty or contain up to three images. The images are returned by size in descending order. See [Working with Playlists](/documentation/web-api/concepts/playlists). _**Note**: If returned, the source URL for the image (`url`) is temporary and will expire in less than a day._
   */
  images?: ImageObject[];
  /** The name of the playlist.
   */
  name?: string;
  /** The user who owns the playlist
   */
  owner?: PlaylistOwnerObject;
  /** The playlist's public/private status (if it is added to the user's profile): `true` the playlist is public, `false` the playlist is private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)
   */
  public?: boolean;
  /** The version identifier for the current playlist. Can be supplied in other requests to target a specific playlist version
   */
  snapshot_id?: string;
  /** A collection containing a link ( `href` ) to the Web API endpoint where full details of the playlist's tracks can be retrieved, along with the `total` number of tracks in the playlist. Note, a track object may be `null`. This can happen if a track is no longer available.
   */
  tracks?: PlaylistTracksRefObject;
  /** The object type: "playlist"
   */
  type?: string;
  /** The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the playlist.
   */
  uri?: string;
};
export type PagingPlaylistObject = PagingObject & {
  items?: SimplifiedPlaylistObject[];
};
export type CopyrightObject = {
  /** The copyright text for this content.
   */
  text?: string;
  /** The type of copyright: `C` = the copyright, `P` = the sound recording (performance) copyright.
   */
  type?: string;
};
export type ShowBase = {
  /** A list of the countries in which the show can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.
   */
  available_markets: string[];
  /** The copyright statements of the show.
   */
  copyrights: CopyrightObject[];
  /** A description of the show. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed.
   */
  description: string;
  /** A description of the show. This field may contain HTML tags.
   */
  html_description: string;
  /** Whether or not the show has explicit content (true = yes it does; false = no it does not OR unknown).
   */
  explicit: boolean;
  /** External URLs for this show.
   */
  external_urls: ExternalUrlObject;
  /** A link to the Web API endpoint providing full details of the show.
   */
  href: string;
  /** The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the show.
   */
  id: string;
  /** The cover art for the show in various sizes, widest first.
   */
  images: ImageObject[];
  /** True if all of the shows episodes are hosted outside of Spotify's CDN. This field might be `null` in some cases.
   */
  is_externally_hosted: boolean;
  /** A list of the languages used in the show, identified by their [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code.
   */
  languages: string[];
  /** The media type of the show.
   */
  media_type: string;
  /** The name of the episode.
   */
  name: string;
  /** The publisher of the show.
   */
  publisher: string;
  /** The object type.
   */
  type: "show";
  /** The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the show.
   */
  uri: string;
  /** The total number of episodes in the show.
   */
  total_episodes: number;
};
export type SimplifiedShowObject = ShowBase;
export type PagingSimplifiedShowObject = PagingObject & {
  items?: SimplifiedShowObject[];
};
export type ResumePointObject = {
  /** Whether or not the episode has been fully played by the user.
   */
  fully_played?: boolean;
  /** The user's most recent position in the episode in milliseconds.
   */
  resume_position_ms?: number;
};
export type EpisodeRestrictionObject = {
  /** The reason for the restriction. Supported values:
    - `market` - The content item is not available in the given market.
    - `product` - The content item is not available for the user's subscription type.
    - `explicit` - The content item is explicit and the user's account is set to not play explicit content.
    
    Additional reasons may be added in the future.
    **Note**: If you use this field, make sure that your application safely handles unknown values.
     */
  reason?: string;
};
export type EpisodeBase = {
  /** A URL to a 30 second preview (MP3 format) of the episode. `null` if not available.
   */
  audio_preview_url: string | null;
  /** A description of the episode. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed.
   */
  description: string;
  /** A description of the episode. This field may contain HTML tags.
   */
  html_description: string;
  /** The episode length in milliseconds.
   */
  duration_ms: number;
  /** Whether or not the episode has explicit content (true = yes it does; false = no it does not OR unknown).
   */
  explicit: boolean;
  /** External URLs for this episode.
   */
  external_urls: ExternalUrlObject;
  /** A link to the Web API endpoint providing full details of the episode.
   */
  href: string;
  /** The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the episode.
   */
  id: string;
  /** The cover art for the episode in various sizes, widest first.
   */
  images: ImageObject[];
  /** True if the episode is hosted outside of Spotify's CDN.
   */
  is_externally_hosted: boolean;
  /** True if the episode is playable in the given market. Otherwise false.
   */
  is_playable: boolean;
  /** The language used in the episode, identified by a [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code. This field is deprecated and might be removed in the future. Please use the `languages` field instead.
   */
  language?: string;
  /** A list of the languages used in the episode, identified by their [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639) code.
   */
  languages: string[];
  /** The name of the episode.
   */
  name: string;
  /** The date the episode was first released, for example `"1981-12-15"`. Depending on the precision, it might be shown as `"1981"` or `"1981-12"`.
   */
  release_date: string;
  /** The precision with which `release_date` value is known.
   */
  release_date_precision: "year" | "month" | "day";
  /** The user's most recent position in the episode. Set if the supplied access token is a user token and has the scope 'user-read-playback-position'.
   */
  resume_point?: ResumePointObject;
  /** The object type.
   */
  type: "episode";
  /** The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the episode.
   */
  uri: string;
  /** Included in the response when a content restriction is applied.
   */
  restrictions?: EpisodeRestrictionObject;
};
export type SimplifiedEpisodeObject = EpisodeBase;
export type PagingSimplifiedEpisodeObject = PagingObject & {
  items?: SimplifiedEpisodeObject[];
};
export type AuthorObject = {
  /** The name of the author.
   */
  name?: string;
};
export type NarratorObject = {
  /** The name of the Narrator.
   */
  name?: string;
};
export type AudiobookBase = {
  /** The author(s) for the audiobook.
   */
  authors: AuthorObject[];
  /** A list of the countries in which the audiobook can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.
   */
  available_markets: string[];
  /** The copyright statements of the audiobook.
   */
  copyrights: CopyrightObject[];
  /** A description of the audiobook. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed.
   */
  description: string;
  /** A description of the audiobook. This field may contain HTML tags.
   */
  html_description: string;
  /** The edition of the audiobook.
   */
  edition?: string;
  /** Whether or not the audiobook has explicit content (true = yes it does; false = no it does not OR unknown).
   */
  explicit: boolean;
  /** External URLs for this audiobook.
   */
  external_urls: ExternalUrlObject;
  /** A link to the Web API endpoint providing full details of the audiobook.
   */
  href: string;
  /** The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the audiobook.
   */
  id: string;
  /** The cover art for the audiobook in various sizes, widest first.
   */
  images: ImageObject[];
  /** A list of the languages used in the audiobook, identified by their [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code.
   */
  languages: string[];
  /** The media type of the audiobook.
   */
  media_type: string;
  /** The name of the audiobook.
   */
  name: string;
  /** The narrator(s) for the audiobook.
   */
  narrators: NarratorObject[];
  /** The publisher of the audiobook.
   */
  publisher: string;
  /** The object type.
   */
  type: "audiobook";
  /** The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the audiobook.
   */
  uri: string;
  /** The number of chapters in this audiobook.
   */
  total_chapters: number;
};
export type SimplifiedAudiobookObject = AudiobookBase;
export type PagingSimplifiedAudiobookObject = PagingObject & {
  items?: SimplifiedAudiobookObject[];
};
export type ErrorObject = {
  /** The HTTP status code (also returned in the response header; see [Response Status Codes](/documentation/web-api/concepts/api-calls#response-status-codes) for more information).
   */
  status: number;
  /** A short description of the cause of the error.
   */
  message: string;
};
export type ExplicitContentSettingsObject = {
  /** When `true`, indicates that explicit content should not be played.
   */
  filter_enabled?: boolean;
  /** When `true`, indicates that the explicit content setting is locked and can't be changed by the user.
   */
  filter_locked?: boolean;
};
export type PrivateUserObject = {
  /** The country of the user, as set in the user's account profile. An [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). _This field is only available when the current user has granted access to the [user-read-private](/documentation/web-api/concepts/scopes/#list-of-scopes) scope._
   */
  country?: string;
  /** The name displayed on the user's profile. `null` if not available.
   */
  display_name?: string;
  /** The user's email address, as entered by the user when creating their account. _**Important!** This email address is unverified; there is no proof that it actually belongs to the user._ _This field is only available when the current user has granted access to the [user-read-email](/documentation/web-api/concepts/scopes/#list-of-scopes) scope._
   */
  email?: string;
  /** The user's explicit content settings. _This field is only available when the current user has granted access to the [user-read-private](/documentation/web-api/concepts/scopes/#list-of-scopes) scope._
   */
  explicit_content?: ExplicitContentSettingsObject;
  /** Known external URLs for this user. */
  external_urls?: ExternalUrlObject;
  /** Information about the followers of the user. */
  followers?: FollowersObject;
  /** A link to the Web API endpoint for this user.
   */
  href?: string;
  /** The [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids) for the user.
   */
  id?: string;
  /** The user's profile image. */
  images?: ImageObject[];
  /** The user's Spotify subscription level: "premium", "free", etc. (The subscription level "open" can be considered the same as "free".) _This field is only available when the current user has granted access to the [user-read-private](/documentation/web-api/concepts/scopes/#list-of-scopes) scope._
   */
  product?: string;
  /** The object type: "user"
   */
  type?: string;
  /** The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the user.
   */
  uri?: string;
};
export type EpisodeObject = EpisodeBase & {
  /** The show on which the episode belongs.
   */
  show: SimplifiedShowObject;
};
export type PlaylistTrackObject = {
  /** The date and time the track or episode was added. _**Note**: some very old playlists may return `null` in this field._
   */
  added_at?: string;
  /** The Spotify user who added the track or episode. _**Note**: some very old playlists may return `null` in this field._
   */
  added_by?: PlaylistUserObject;
  /** Whether this track or episode is a [local file](/documentation/web-api/concepts/playlists/#local-files) or not.
   */
  is_local?: boolean;
  /** Information about the track or episode. */
  track?:
    | ({
        type: "track";
      } & TrackObject)
    | ({
        type: "EpisodeObject";
      } & EpisodeObject);
};
export type PagingPlaylistTrackObject = PagingObject & {
  items?: PlaylistTrackObject[];
};
export type PlaylistObject = {
  /** `true` if the owner allows other users to modify the playlist.
   */
  collaborative?: boolean;
  /** The playlist description. _Only returned for modified, verified playlists, otherwise_ `null`.
   */
  description?: string | null;
  /** Known external URLs for this playlist.
   */
  external_urls?: ExternalUrlObject;
  /** A link to the Web API endpoint providing full details of the playlist.
   */
  href?: string;
  /** The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the playlist.
   */
  id?: string;
  /** Images for the playlist. The array may be empty or contain up to three images. The images are returned by size in descending order. See [Working with Playlists](/documentation/web-api/concepts/playlists). _**Note**: If returned, the source URL for the image (`url`) is temporary and will expire in less than a day._
   */
  images?: ImageObject[];
  /** The name of the playlist.
   */
  name?: string;
  /** The user who owns the playlist
   */
  owner?: PlaylistOwnerObject;
  /** The playlist's public/private status (if it is added to the user's profile): `true` the playlist is public, `false` the playlist is private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)
   */
  public?: boolean;
  /** The version identifier for the current playlist. Can be supplied in other requests to target a specific playlist version
   */
  snapshot_id?: string;
  /** The tracks of the playlist.
   */
  tracks?: PagingPlaylistTrackObject;
  /** The object type: "playlist"
   */
  type?: string;
  /** The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the playlist.
   */
  uri?: string;
  /** Information about the followers of the playlist. */
  followers?: FollowersObject;
};
export const {
  useSearchQuery,
  useGetMeQuery,
  usePostPlaylistsByPlaylistIdTracksMutation,
  usePostUsersByUserIdPlaylistsMutation,
  usePutPlaylistsByPlaylistIdFollowersMutation,
} = injectedRtkApi;

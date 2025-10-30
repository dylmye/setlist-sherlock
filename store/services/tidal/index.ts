import { tidalApi as api } from "./base";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    postPlaylists: build.mutation<
      PostPlaylistsApiResponse,
      PostPlaylistsApiArg
    >({
      query: (queryArg) => ({
        url: `/playlists`,
        method: "POST",
        body: queryArg.playlistCreateOperationPayload,
        params: {
          countryCode: queryArg.countryCode,
        },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as tidalApi };
export type PostPlaylistsApiResponse =
  /** status 201 Successful response */ PlaylistsSingleResourceDataDocument;
export type PostPlaylistsApiArg = {
  /** ISO 3166-1 alpha-2 country code */
  countryCode: string;
  playlistCreateOperationPayload: PlaylistCreateOperationPayload;
};
export type ExternalLinkMeta = {
  type:
    | "TIDAL_SHARING"
    | "TIDAL_USER_SHARING"
    | "TIDAL_AUTOPLAY_ANDROID"
    | "TIDAL_AUTOPLAY_IOS"
    | "TIDAL_AUTOPLAY_WEB"
    | "TWITTER"
    | "FACEBOOK"
    | "INSTAGRAM"
    | "TIKTOK"
    | "SNAPCHAT"
    | "OFFICIAL_HOMEPAGE"
    | "CASHAPP_CONTRIBUTIONS";
};
export type ExternalLink = {
  href: string;
  meta: ExternalLinkMeta;
};
export type PlaylistsAttributes = {
  /** Access type */
  accessType: "PUBLIC" | "UNLISTED";
  /** Indicates if the playlist has a duration and set number of tracks */
  bounded: boolean;
  /** Datetime of playlist creation (ISO 8601) */
  createdAt: string;
  /** Playlist description */
  description?: string;
  /** Duration of playlist (ISO 8601) */
  duration?: string;
  externalLinks: ExternalLink[];
  /** Datetime of last modification of the playlist (ISO 8601) */
  lastModifiedAt: string;
  /** Playlist name */
  name: string;
  /** Number of items in the playlist */
  numberOfItems?: number;
  /** The type of the playlist */
  playlistType: "EDITORIAL" | "USER" | "MIX" | "ARTIST";
};
export type ResourceIdentifier = {
  /** Resource id */
  id: string;
  /** Resource type */
  type: string;
};
export type LinksMeta = {
  /** Only cursor part of next link */
  nextCursor: string;
};
export type Links = {
  meta?: LinksMeta;
  /** Link to next page */
  next?: string;
  /** Link to self */
  self: string;
};
export type MultiRelationshipDataDocument = {
  data?: ResourceIdentifier[];
  links: Links;
};
export type PlaylistsItemsResourceIdentifierMeta = {
  addedAt?: string;
  itemId?: string;
};
export type PlaylistsItemsResourceIdentifier = {
  /** Resource id */
  id: string;
  meta?: PlaylistsItemsResourceIdentifierMeta;
  /** Resource type */
  type: string;
};
export type Copyright = {
  text: string;
};
export type AlbumsAttributes = {
  /** Available usage for this album */
  availability?: ("STREAM" | "DJ" | "STEM")[];
  /** Barcode id (EAN-13 or UPC-A) */
  barcodeId: string;
  copyright?: Copyright;
  /** Duration (ISO 8601) */
  duration: string;
  /** Explicit content */
  explicit: boolean;
  /** Album links external to TIDAL API */
  externalLinks?: ExternalLink[];
  mediaTags: string[];
  /** Number of items in album */
  numberOfItems: number;
  /** Number of volumes */
  numberOfVolumes: number;
  /** Popularity (0.0 - 1.0) */
  popularity: number;
  /** Release date (ISO-8601) */
  releaseDate?: string;
  /** Album title */
  title: string;
  /** Album type */
  type: "ALBUM" | "EP" | "SINGLE";
  /** Album version */
  version?: string;
};
export type AlbumsItemsResourceIdentifierMeta = {
  /** track number */
  trackNumber: number;
  /** volume number */
  volumeNumber: number;
};
export type AlbumsItemsResourceIdentifier = {
  /** Resource id */
  id: string;
  meta?: AlbumsItemsResourceIdentifierMeta;
  /** Resource type */
  type: string;
};
export type AlbumsItemsMultiRelationshipDataDocument = {
  data?: AlbumsItemsResourceIdentifier[];
  included?: Included;
  links: Links;
};
export type AlbumsRelationships = {
  artists: MultiRelationshipDataDocument;
  coverArt: MultiRelationshipDataDocument;
  genres: MultiRelationshipDataDocument;
  items: AlbumsItemsMultiRelationshipDataDocument;
  owners: MultiRelationshipDataDocument;
  providers: MultiRelationshipDataDocument;
  similarAlbums: MultiRelationshipDataDocument;
};
export type AlbumsResourceObject = {
  attributes?: AlbumsAttributes;
  /** Resource id */
  id: string;
  relationships?: AlbumsRelationships;
  /** Resource type */
  type: string;
};
export type AppreciationsAttributes = {
  /** Time when the appreciation was created */
  createdAt: string;
};
export type AppreciationsResourceObject = {
  attributes?: AppreciationsAttributes;
  /** Resource id */
  id: string;
  /** Resource type */
  type: string;
};
export type ArtistBiographiesAttributes = {
  /** Boolean to indicate if the biography is editable (source = tidal or artist) */
  editable: boolean;
  /** Artist biography */
  text: string;
};
export type ArtistBiographiesRelationships = {
  owners: MultiRelationshipDataDocument;
};
export type ArtistBiographiesResourceObject = {
  attributes?: ArtistBiographiesAttributes;
  /** Resource id */
  id: string;
  relationships?: ArtistBiographiesRelationships;
  /** Resource type */
  type: string;
};
export type BarcodeId = {
  value: string;
};
export type ArtistClaimsAttributes = {
  /** The artist id which is being claimed */
  artistId: string;
  /** The DSP used for authentication */
  provider: "DISTROKID" | "CDBABY" | "TUNECORE";
  /** The recommended claim resolution */
  recommendation?:
    | "DSP_PROFILE_CLAIMED"
    | "CONTENT_MIGRATED_TO_UPLOADS"
    | "NO_CONTENT_MATCHED";
  /** The DSP redirect url used for authentication */
  redirectUrl?: string;
  /** List of UPCs retrieved from the DSP */
  retrievedUpcs?: BarcodeId[];
  /** Current status of this claim */
  status:
    | "AWAITING_OAUTH"
    | "FETCHING_CONTENT"
    | "VERIFIED"
    | "NO_MATCHES"
    | "AUTHENTICATION_FAILED"
    | "PROCESSING"
    | "COMPLETED"
    | "FAILED"
    | "CANCELLED";
};
export type ArtistClaimsRelationships = {
  acceptedArtists: MultiRelationshipDataDocument;
  owners: MultiRelationshipDataDocument;
  recommendedArtists: MultiRelationshipDataDocument;
};
export type ArtistClaimsResourceObject = {
  attributes?: ArtistClaimsAttributes;
  /** Resource id */
  id: string;
  relationships?: ArtistClaimsRelationships;
  /** Resource type */
  type: string;
};
export type ArtistRolesAttributes = {
  name?: string;
};
export type ArtistRolesResourceObject = {
  attributes?: ArtistRolesAttributes;
  /** Resource id */
  id: string;
  /** Resource type */
  type: string;
};
export type ArtistsAttributes = {
  /** Is the artist enabled for contributions? */
  contributionsEnabled?: boolean;
  /** Contributions sales pitch */
  contributionsSalesPitch?: string;
  /** Artist links external to TIDAL API */
  externalLinks?: ExternalLink[];
  /** Artist handle */
  handle?: string;
  /** Artist name */
  name: string;
  /** Artist popularity (0.0 - 1.0) */
  popularity: number;
  /** Is the artist spotlighted? */
  spotlighted?: boolean;
};
export type SingleRelationshipDataDocument = {
  data?: ResourceIdentifier;
  links: Links;
};
export type ArtistsFollowersResourceMetaViewerContext = {
  /** Boolean to indicate if the artist is following my artist */
  followsMyArtist?: boolean;
  /** Boolean to indicate if my artist is following the artist */
  myArtistFollows?: boolean;
};
export type ArtistsFollowersResourceIdentifierMeta = {
  viewer?: ArtistsFollowersResourceMetaViewerContext;
};
export type ArtistsFollowersResourceIdentifier = {
  /** Resource id */
  id: string;
  meta?: ArtistsFollowersResourceIdentifierMeta;
  /** Resource type */
  type: string;
};
export type ArtistsFollowersMultiRelationshipDataDocument = {
  data?: ArtistsFollowersResourceIdentifier[];
  included?: Included;
  links: Links;
};
export type ArtistsFollowingResourceIdentifierMeta = {
  viewer?: ArtistsFollowersResourceMetaViewerContext;
};
export type ArtistsFollowingResourceIdentifier = {
  /** Resource id */
  id: string;
  meta?: ArtistsFollowingResourceIdentifierMeta;
  /** Resource type */
  type: string;
};
export type ArtistsFollowingMultiRelationshipDataDocument = {
  data?: ArtistsFollowingResourceIdentifier[];
  included?: Included;
  links: Links;
};
export type ArtistsTrackProvidersResourceIdentifierMeta = {
  /** Total number of tracks released together with the provider */
  numberOfTracks: number;
};
export type ArtistsTrackProvidersResourceIdentifier = {
  /** Resource id */
  id: string;
  meta?: ArtistsTrackProvidersResourceIdentifierMeta;
  /** Resource type */
  type: string;
};
export type ArtistsTrackProvidersMultiRelationshipDataDocument = {
  data?: ArtistsTrackProvidersResourceIdentifier[];
  included?: Included;
  links: Links;
};
export type ArtistsRelationships = {
  albums: MultiRelationshipDataDocument;
  biography: SingleRelationshipDataDocument;
  followers: ArtistsFollowersMultiRelationshipDataDocument;
  following: ArtistsFollowingMultiRelationshipDataDocument;
  owners: MultiRelationshipDataDocument;
  profileArt: MultiRelationshipDataDocument;
  radio: MultiRelationshipDataDocument;
  roles: MultiRelationshipDataDocument;
  similarArtists: MultiRelationshipDataDocument;
  trackProviders: ArtistsTrackProvidersMultiRelationshipDataDocument;
  tracks: MultiRelationshipDataDocument;
  videos: MultiRelationshipDataDocument;
};
export type ArtistsResourceObject = {
  attributes?: ArtistsAttributes;
  /** Resource id */
  id: string;
  relationships?: ArtistsRelationships;
  /** Resource type */
  type: string;
};
export type ArtworkFileMeta = {
  /** Height (in pixels) */
  height: number;
  /** Width (in pixels) */
  width: number;
};
export type ArtworkFile = {
  /** Artwork file href */
  href: string;
  meta?: ArtworkFileMeta;
};
export type FileStatus = {
  /** Moderation status for file */
  moderationFileStatus:
    | "NOT_MODERATED"
    | "SCANNING"
    | "FLAGGED"
    | "TAKEN_DOWN"
    | "OK"
    | "ERROR";
  /** Technical status for file */
  technicalFileStatus: "UPLOAD_REQUESTED" | "PROCESSING" | "OK" | "ERROR";
};
export type FileUploadLinkMeta = {
  /** HTTP headers that must be added to the operation */
  headers?: {
    [key: string]: string;
  };
  /** HTTP method */
  method: string;
};
export type FileUploadLink = {
  /** Href to upload actual file to */
  href: string;
  meta: FileUploadLinkMeta;
};
export type ArtworkSourceFile = {
  /** MD5 hash of file to be uploaded */
  md5Hash: string;
  /** File size of the artwork in bytes */
  size: number;
  status: FileStatus;
  uploadLink: FileUploadLink;
};
export type ArtworksAttributes = {
  /** Artwork files */
  files: ArtworkFile[];
  /** Media type of artwork files */
  mediaType: "IMAGE" | "VIDEO";
  sourceFile?: ArtworkSourceFile;
};
export type ArtworksRelationships = {
  owners: MultiRelationshipDataDocument;
};
export type ArtworksResourceObject = {
  attributes?: ArtworksAttributes;
  /** Resource id */
  id: string;
  relationships?: ArtworksRelationships;
  /** Resource type */
  type: string;
};
export type GenresAttributes = {
  /** Genre name */
  genreName: string;
};
export type GenresResourceObject = {
  attributes?: GenresAttributes;
  /** Resource id */
  id: string;
  /** Resource type */
  type: string;
};
export type LyricsProviderBase = {
  name?: string;
  source?: "TIDAL" | "THIRD_PARTY";
};
export type ThirdParty = {
  source: "ThirdParty";
} & LyricsProviderBase & {
    commonTrackId: string;
    lyricsId: string;
  };
export type Tidal = {
  source: "Tidal";
} & LyricsProviderBase;
export type LyricsAttributes = {
  direction?: "LEFT_TO_RIGHT" | "RIGHT_TO_LEFT";
  lrcText?: string;
  provider?: ThirdParty | Tidal;
  technicalStatus: "PENDING" | "PROCESSING" | "ERROR" | "OK";
  text?: string;
};
export type LyricsRelationships = {
  owners: MultiRelationshipDataDocument;
  track: SingleRelationshipDataDocument;
};
export type LyricsResourceObject = {
  attributes?: LyricsAttributes;
  /** Resource id */
  id: string;
  relationships?: LyricsRelationships;
  /** Resource type */
  type: string;
};
export type PlayQueuesAttributes = {
  /** ISO 8601 creation timestamp */
  createdAt: string;
  /** ISO 8601 last modified timestamp */
  lastModifiedAt: string;
  /** Queue's repeat mode */
  repeat: "NONE" | "ONE" | "BATCH";
  /** Queue is shuffled or not */
  shuffled: boolean;
};
export type PlayQueuesFutureResourceIdentifierMeta = {
  batchId: string;
  itemId: string;
};
export type PlayQueuesFutureResourceIdentifier = {
  /** Resource id */
  id: string;
  meta?: PlayQueuesFutureResourceIdentifierMeta;
  /** Resource type */
  type: string;
};
export type PlayQueuesFutureMultiRelationshipDataDocument = {
  data?: PlayQueuesFutureResourceIdentifier[];
  included?: Included;
  links: Links;
};
export type PlayQueuesPastResourceIdentifierMeta = {
  batchId: string;
  itemId: string;
};
export type PlayQueuesPastResourceIdentifier = {
  /** Resource id */
  id: string;
  meta?: PlayQueuesPastResourceIdentifierMeta;
  /** Resource type */
  type: string;
};
export type PlayQueuesPastMultiRelationshipDataDocument = {
  data?: PlayQueuesPastResourceIdentifier[];
  included?: Included;
  links: Links;
};
export type PlayQueuesRelationships = {
  current: SingleRelationshipDataDocument;
  future: PlayQueuesFutureMultiRelationshipDataDocument;
  owners: MultiRelationshipDataDocument;
  past: PlayQueuesPastMultiRelationshipDataDocument;
};
export type PlayQueuesResourceObject = {
  attributes?: PlayQueuesAttributes;
  /** Resource id */
  id: string;
  relationships?: PlayQueuesRelationships;
  /** Resource type */
  type: string;
};
export type ProvidersAttributes = {
  /** Provider name */
  name: string;
};
export type ProvidersResourceObject = {
  attributes?: ProvidersAttributes;
  /** Resource id */
  id: string;
  /** Resource type */
  type: string;
};
export type SearchResultsAttributes = {
  /** 'did you mean' prompt */
  didYouMean?: string;
  /** search request unique tracking number */
  trackingId: string;
};
export type SearchResultsRelationships = {
  albums: MultiRelationshipDataDocument;
  artists: MultiRelationshipDataDocument;
  playlists: MultiRelationshipDataDocument;
  topHits: MultiRelationshipDataDocument;
  tracks: MultiRelationshipDataDocument;
  videos: MultiRelationshipDataDocument;
};
export type SearchResultsResourceObject = {
  attributes?: SearchResultsAttributes;
  /** Resource id */
  id: string;
  relationships?: SearchResultsRelationships;
  /** Resource type */
  type: string;
};
export type SearchSuggestionsHighlights = {
  length: number;
  start: number;
};
export type SearchSuggestionsHistory = {
  highlights?: SearchSuggestionsHighlights[];
  query: string;
};
export type SearchSuggestionsSuggestions = {
  highlights?: SearchSuggestionsHighlights[];
  query: string;
};
export type SearchSuggestionsAttributes = {
  /** Suggestions from search history */
  history?: SearchSuggestionsHistory[];
  /** Suggested search queries */
  suggestions?: SearchSuggestionsSuggestions[];
  /** Unique tracking id */
  trackingId: string;
};
export type SearchSuggestionsRelationships = {
  directHits: MultiRelationshipDataDocument;
};
export type SearchSuggestionsResourceObject = {
  attributes?: SearchSuggestionsAttributes;
  /** Resource id */
  id: string;
  relationships?: SearchSuggestionsRelationships;
  /** Resource type */
  type: string;
};
export type SharesAttributes = {
  /** Share code */
  code: string;
  /** Datetime of share creation (ISO 8601) */
  createdAt: string;
  /** Links external to TIDAL API */
  externalLinks?: ExternalLink[];
};
export type SharesRelationships = {
  owners: MultiRelationshipDataDocument;
  sharedResources: MultiRelationshipDataDocument;
};
export type SharesResourceObject = {
  attributes?: SharesAttributes;
  /** Resource id */
  id: string;
  relationships?: SharesRelationships;
  /** Resource type */
  type: string;
};
export type AudioNormalizationData = {
  peakAmplitude?: number;
  replayGain?: number;
};
export type TrackFilesAttributes = {
  albumAudioNormalizationData?: AudioNormalizationData;
  /** File's audio format */
  format?: "HEAACV1" | "AACLC" | "FLAC" | "FLAC_HIRES" | "EAC3_JOC";
  trackAudioNormalizationData?: AudioNormalizationData;
  /** Track presentation */
  trackPresentation?: "FULL" | "PREVIEW";
  /** File URL */
  url?: string;
};
export type TrackFilesResourceObject = {
  attributes?: TrackFilesAttributes;
  /** Resource id */
  id: string;
  /** Resource type */
  type: string;
};
export type DrmData = {
  certificateUrl?: string;
  drmSystem?: "FAIRPLAY" | "WIDEVINE";
  licenseUrl?: string;
};
export type TrackManifestsAttributes = {
  albumAudioNormalizationData?: AudioNormalizationData;
  drmData?: DrmData;
  /** Formats present in manifest */
  formats?: ("HEAACV1" | "AACLC" | "FLAC" | "FLAC_HIRES" | "EAC3_JOC")[];
  /** Unique manifest hash */
  hash?: string;
  trackAudioNormalizationData?: AudioNormalizationData;
  /** Track presentation */
  trackPresentation?: "FULL" | "PREVIEW";
  /** Manifest URI */
  uri?: string;
};
export type TrackManifestsResourceObject = {
  attributes?: TrackManifestsAttributes;
  /** Resource id */
  id: string;
  /** Resource type */
  type: string;
};
export type TrackSourceFilesAttributes = {
  /** MD5 hash of file to be uploaded */
  md5Hash: string;
  /** File size of the track in bytes */
  size: number;
  status: FileStatus;
  uploadLink: FileUploadLink;
};
export type TrackSourceFilesRelationships = {
  owners: MultiRelationshipDataDocument;
};
export type TrackSourceFilesResourceObject = {
  attributes?: TrackSourceFilesAttributes;
  /** Resource id */
  id: string;
  relationships?: TrackSourceFilesRelationships;
  /** Resource type */
  type: string;
};
export type TrackStatisticsAttributes = {
  /** Total playbacks */
  totalPlaybacks: number;
  /** Unique listeners */
  uniqueListeners: number;
};
export type TrackStatisticsRelationships = {
  owners: MultiRelationshipDataDocument;
};
export type TrackStatisticsResourceObject = {
  attributes?: TrackStatisticsAttributes;
  /** Resource id */
  id: string;
  relationships?: TrackStatisticsRelationships;
  /** Resource type */
  type: string;
};
export type TracksAttributes = {
  /** Access type */
  accessType?: "PUBLIC" | "UNLISTED" | "PRIVATE";
  /** Available usage for this track */
  availability?: ("STREAM" | "DJ" | "STEM")[];
  /** Beats per minute */
  bpm?: number;
  copyright?: Copyright;
  /** Datetime of track creation (ISO 8601) */
  createdAt?: string;
  /** Duration (ISO 8601) */
  duration: string;
  /** Explicit content */
  explicit: boolean;
  /** Track links external to TIDAL API */
  externalLinks?: ExternalLink[];
  /** International Standard Recording Code (ISRC) */
  isrc: string;
  /** Key */
  key:
    | "UNKNOWN"
    | "C"
    | "CSharp"
    | "D"
    | "Eb"
    | "E"
    | "F"
    | "FSharp"
    | "G"
    | "Ab"
    | "A"
    | "Bb"
    | "B";
  /** The scale of the key */
  keyScale:
    | "UNKNOWN"
    | "MAJOR"
    | "MINOR"
    | "AEOLIAN"
    | "BLUES"
    | "DORIAN"
    | "HARMONIC_MINOR"
    | "LOCRIAN"
    | "LYDIAN"
    | "MIXOLYDIAN"
    | "PENTATONIC_MAJOR"
    | "PHRYGIAN"
    | "MELODIC_MINOR"
    | "PENTATONIC_MINOR";
  mediaTags: string[];
  /** Popularity (0.0 - 1.0) */
  popularity: number;
  /** Is the track spotlighted? */
  spotlighted?: boolean;
  /** Track title */
  title: string;
  toneTags?: string[];
  /** Track version, complements title */
  version?: string;
};
export type TracksRelationships = {
  albums: MultiRelationshipDataDocument;
  artists: MultiRelationshipDataDocument;
  genres: MultiRelationshipDataDocument;
  lyrics: MultiRelationshipDataDocument;
  owners: MultiRelationshipDataDocument;
  providers: MultiRelationshipDataDocument;
  radio: MultiRelationshipDataDocument;
  shares: MultiRelationshipDataDocument;
  similarTracks: MultiRelationshipDataDocument;
  sourceFile: SingleRelationshipDataDocument;
  trackStatistics: SingleRelationshipDataDocument;
};
export type TracksResourceObject = {
  attributes?: TracksAttributes;
  /** Resource id */
  id: string;
  relationships?: TracksRelationships;
  /** Resource type */
  type: string;
};
export type UserCollectionFoldersAttributes = {
  collectionType: "PLAYLISTS";
  createdAt: string;
  lastModifiedAt: string;
  name: string;
};
export type UserCollectionFoldersItemsResourceIdentifierMeta = {
  addedAt: string;
  lastModifiedAt: string;
};
export type UserCollectionFoldersItemsResourceIdentifier = {
  /** Resource id */
  id: string;
  meta?: UserCollectionFoldersItemsResourceIdentifierMeta;
  /** Resource type */
  type: string;
};
export type UserCollectionFoldersItemsMultiRelationshipDataDocument = {
  data?: UserCollectionFoldersItemsResourceIdentifier[];
  included?: Included;
  links: Links;
};
export type UserCollectionFoldersRelationships = {
  items: UserCollectionFoldersItemsMultiRelationshipDataDocument;
  owners: MultiRelationshipDataDocument;
};
export type UserCollectionFoldersResourceObject = {
  attributes?: UserCollectionFoldersAttributes;
  /** Resource id */
  id: string;
  relationships?: UserCollectionFoldersRelationships;
  /** Resource type */
  type: string;
};
export type UserCollectionsAttributes = object;
export type UserCollectionsAlbumsResourceIdentifierMeta = {
  addedAt: string;
};
export type UserCollectionsAlbumsResourceIdentifier = {
  /** Resource id */
  id: string;
  meta?: UserCollectionsAlbumsResourceIdentifierMeta;
  /** Resource type */
  type: string;
};
export type UserCollectionsAlbumsMultiRelationshipDataDocument = {
  data?: UserCollectionsAlbumsResourceIdentifier[];
  included?: Included;
  links: Links;
};
export type UserCollectionsArtistsResourceIdentifierMeta = {
  addedAt: string;
};
export type UserCollectionsArtistsResourceIdentifier = {
  /** Resource id */
  id: string;
  meta?: UserCollectionsArtistsResourceIdentifierMeta;
  /** Resource type */
  type: string;
};
export type UserCollectionsArtistsMultiRelationshipDataDocument = {
  data?: UserCollectionsArtistsResourceIdentifier[];
  included?: Included;
  links: Links;
};
export type UserCollectionsPlaylistsResourceIdentifierMeta = {
  addedAt: string;
};
export type UserCollectionsPlaylistsResourceIdentifier = {
  /** Resource id */
  id: string;
  meta?: UserCollectionsPlaylistsResourceIdentifierMeta;
  /** Resource type */
  type: string;
};
export type UserCollectionsPlaylistsMultiRelationshipDataDocument = {
  data?: UserCollectionsPlaylistsResourceIdentifier[];
  included?: Included;
  links: Links;
};
export type UserCollectionsTracksResourceIdentifierMeta = {
  addedAt: string;
};
export type UserCollectionsTracksResourceIdentifier = {
  /** Resource id */
  id: string;
  meta?: UserCollectionsTracksResourceIdentifierMeta;
  /** Resource type */
  type: string;
};
export type UserCollectionsTracksMultiRelationshipDataDocument = {
  data?: UserCollectionsTracksResourceIdentifier[];
  included?: Included;
  links: Links;
};
export type UserCollectionsVideosResourceIdentifierMeta = {
  addedAt: string;
};
export type UserCollectionsVideosResourceIdentifier = {
  /** Resource id */
  id: string;
  meta?: UserCollectionsVideosResourceIdentifierMeta;
  /** Resource type */
  type: string;
};
export type UserCollectionsVideosMultiRelationshipDataDocument = {
  data?: UserCollectionsVideosResourceIdentifier[];
  included?: Included;
  links: Links;
};
export type UserCollectionsRelationships = {
  albums: UserCollectionsAlbumsMultiRelationshipDataDocument;
  artists: UserCollectionsArtistsMultiRelationshipDataDocument;
  owners: MultiRelationshipDataDocument;
  playlists: UserCollectionsPlaylistsMultiRelationshipDataDocument;
  tracks: UserCollectionsTracksMultiRelationshipDataDocument;
  videos: UserCollectionsVideosMultiRelationshipDataDocument;
};
export type UserCollectionsResourceObject = {
  attributes?: UserCollectionsAttributes;
  /** Resource id */
  id: string;
  relationships?: UserCollectionsRelationships;
  /** Resource type */
  type: string;
};
export type UserEntitlementsAttributes = {
  /** entitlements for user */
  entitlements: ("MUSIC" | "DJ")[];
};
export type UserEntitlementsResourceObject = {
  attributes?: UserEntitlementsAttributes;
  /** Resource id */
  id: string;
  /** Resource type */
  type: string;
};
export type UserRecommendationsAttributes = object;
export type UserRecommendationsRelationships = {
  discoveryMixes: MultiRelationshipDataDocument;
  myMixes: MultiRelationshipDataDocument;
  newArrivalMixes: MultiRelationshipDataDocument;
};
export type UserRecommendationsResourceObject = {
  attributes?: UserRecommendationsAttributes;
  /** Resource id */
  id: string;
  relationships?: UserRecommendationsRelationships;
  /** Resource type */
  type: string;
};
export type UserReportsAttributes = {
  /** Description */
  description: string;
  /** Reason */
  reason:
    | "SEXUAL_CONTENT_OR_NUDITY"
    | "VIOLENT_OR_DANGEROUS_CONTENT"
    | "HATEFUL_OR_ABUSIVE_CONTENT"
    | "HARASSMENT"
    | "PRIVACY_VIOLATION"
    | "SCAMS_OR_FRAUD"
    | "SPAM"
    | "COPYRIGHT_INFRINGEMENT"
    | "UNKNOWN";
};
export type UserReportsResourceObject = {
  attributes?: UserReportsAttributes;
  /** Resource id */
  id: string;
  /** Resource type */
  type: string;
};
export type UsersAttributes = {
  /** ISO 3166-1 alpha-2 country code */
  country: string;
  /** email address */
  email?: string;
  /** Is the email verified */
  emailVerified?: boolean;
  /** Users first name */
  firstName?: string;
  /** Users last name */
  lastName?: string;
  /** Users nostr public key */
  nostrPublicKey?: string;
  /** user name */
  username: string;
};
export type UsersResourceObject = {
  attributes?: UsersAttributes;
  /** Resource id */
  id: string;
  /** Resource type */
  type: string;
};
export type VideosAttributes = {
  /** Available usage for this video */
  availability?: ("STREAM" | "DJ" | "STEM")[];
  copyright?: Copyright;
  /** Duration (ISO 8601) */
  duration: string;
  /** Explicit content */
  explicit: boolean;
  /** Video links external to TIDAL API */
  externalLinks?: ExternalLink[];
  /** International Standard Recording Code (ISRC) */
  isrc: string;
  /** Popularity (0.0 - 1.0) */
  popularity: number;
  /** Release date (ISO-8601) */
  releaseDate?: string;
  /** Video title */
  title: string;
  /** Video version, complements title */
  version?: string;
};
export type VideosRelationships = {
  albums: MultiRelationshipDataDocument;
  artists: MultiRelationshipDataDocument;
  providers: MultiRelationshipDataDocument;
  thumbnailArt: MultiRelationshipDataDocument;
};
export type VideosResourceObject = {
  attributes?: VideosAttributes;
  /** Resource id */
  id: string;
  relationships?: VideosRelationships;
  /** Resource type */
  type: string;
};
export type Included = (
  | ({
      type: "albums";
    } & AlbumsResourceObject)
  | ({
      type: "appreciations";
    } & AppreciationsResourceObject)
  | ({
      type: "artistBiographies";
    } & ArtistBiographiesResourceObject)
  | ({
      type: "artistClaims";
    } & ArtistClaimsResourceObject)
  | ({
      type: "artistRoles";
    } & ArtistRolesResourceObject)
  | ({
      type: "artists";
    } & ArtistsResourceObject)
  | ({
      type: "artworks";
    } & ArtworksResourceObject)
  | ({
      type: "genres";
    } & GenresResourceObject)
  | ({
      type: "lyrics";
    } & LyricsResourceObject)
  | ({
      type: "playQueues";
    } & PlayQueuesResourceObject)
  | ({
      type: "playlists";
    } & PlaylistsResourceObject)
  | ({
      type: "providers";
    } & ProvidersResourceObject)
  | ({
      type: "searchResults";
    } & SearchResultsResourceObject)
  | ({
      type: "searchSuggestions";
    } & SearchSuggestionsResourceObject)
  | ({
      type: "shares";
    } & SharesResourceObject)
  | ({
      type: "trackFiles";
    } & TrackFilesResourceObject)
  | ({
      type: "trackManifests";
    } & TrackManifestsResourceObject)
  | ({
      type: "trackSourceFiles";
    } & TrackSourceFilesResourceObject)
  | ({
      type: "trackStatistics";
    } & TrackStatisticsResourceObject)
  | ({
      type: "tracks";
    } & TracksResourceObject)
  | ({
      type: "userCollectionFolders";
    } & UserCollectionFoldersResourceObject)
  | ({
      type: "userCollections";
    } & UserCollectionsResourceObject)
  | ({
      type: "userEntitlements";
    } & UserEntitlementsResourceObject)
  | ({
      type: "userRecommendations";
    } & UserRecommendationsResourceObject)
  | ({
      type: "userReports";
    } & UserReportsResourceObject)
  | ({
      type: "users";
    } & UsersResourceObject)
  | ({
      type: "videos";
    } & VideosResourceObject)
)[];
export type PlaylistsItemsMultiRelationshipDataDocument = {
  data?: PlaylistsItemsResourceIdentifier[];
  included?: Included;
  links: Links;
};
export type PlaylistsRelationships = {
  coverArt: MultiRelationshipDataDocument;
  items: PlaylistsItemsMultiRelationshipDataDocument;
  owners: MultiRelationshipDataDocument;
};
export type PlaylistsResourceObject = {
  attributes?: PlaylistsAttributes;
  /** Resource id */
  id: string;
  relationships?: PlaylistsRelationships;
  /** Resource type */
  type: string;
};
export type PlaylistsSingleResourceDataDocument = {
  data: PlaylistsResourceObject;
  included?: Included;
  links: Links;
};
export type ErrorObjectSource = {
  /** string indicating the name of a single request header which caused the error */
  header?: string;
  /** string indicating which URI query parameter caused the error. */
  parameter?: string;
  /** a JSON Pointer [RFC6901] to the value in the request document that caused the error */
  pointer?: string;
};
export type ErrorObject = {
  /** application-specific error code */
  code?: string;
  /** human-readable explanation specific to this occurrence of the problem */
  detail?: string;
  /** unique identifier for this particular occurrence of the problem */
  id?: string;
  source?: ErrorObjectSource;
  /** HTTP status code applicable to this problem */
  status?: string;
};
export type ErrorsDocument = {
  /** Array of error objects */
  errors?: ErrorObject[];
  links?: Links;
};
export type PlaylistCreateOperationPayloadDataAttributes = {
  /** Access type */
  accessType?: "PUBLIC" | "UNLISTED";
  description?: string;
  name: string;
};
export type PlaylistCreateOperationPayloadData = {
  attributes: PlaylistCreateOperationPayloadDataAttributes;
  type: "playlists";
};
export type PlaylistCreateOperationPayload = {
  data: PlaylistCreateOperationPayloadData;
};
export const { usePostPlaylistsMutation } = injectedRtkApi;

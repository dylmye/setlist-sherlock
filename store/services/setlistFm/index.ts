import { setlistFmApi as api } from "./base";

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    get10ArtistByMbid: build.query<
      Get10ArtistByMbidApiResponse,
      Get10ArtistByMbidApiArg
    >({
      query: (queryArg) => ({ url: `/1.0/artist/${queryArg.mbid}` }),
    }),
    get10ArtistByMbidSetlists: build.query<
      Get10ArtistByMbidSetlistsApiResponse,
      Get10ArtistByMbidSetlistsApiArg
    >({
      query: (queryArg) => ({
        url: `/1.0/artist/${queryArg.mbid}/setlists`,
        params: { p: queryArg.p },
      }),
    }),
    get10CityByGeoId: build.query<
      Get10CityByGeoIdApiResponse,
      Get10CityByGeoIdApiArg
    >({
      query: (queryArg) => ({ url: `/1.0/city/${queryArg.geoId}` }),
    }),
    get10SearchArtists: build.query<
      Get10SearchArtistsApiResponse,
      Get10SearchArtistsApiArg
    >({
      query: (queryArg) => ({
        url: `/1.0/search/artists`,
        params: {
          artistMbid: queryArg.artistMbid,
          artistName: queryArg.artistName,
          artistTmid: queryArg.artistTmid,
          p: queryArg.p,
          sort: queryArg.sort,
        },
      }),
    }),
    get10SearchCities: build.query<
      Get10SearchCitiesApiResponse,
      Get10SearchCitiesApiArg
    >({
      query: (queryArg) => ({
        url: `/1.0/search/cities`,
        params: {
          country: queryArg.country,
          name: queryArg.name,
          p: queryArg.p,
          state: queryArg.state,
          stateCode: queryArg.stateCode,
        },
      }),
    }),
    get10SearchCountries: build.query<
      Get10SearchCountriesApiResponse,
      Get10SearchCountriesApiArg
    >({
      query: () => ({ url: `/1.0/search/countries` }),
    }),
    get10SearchSetlists: build.query<
      Get10SearchSetlistsApiResponse,
      Get10SearchSetlistsApiArg
    >({
      query: (queryArg) => ({
        url: `/1.0/search/setlists`,
        params: {
          artistMbid: queryArg.artistMbid,
          artistName: queryArg.artistName,
          artistTmid: queryArg.artistTmid,
          cityId: queryArg.cityId,
          cityName: queryArg.cityName,
          countryCode: queryArg.countryCode,
          date: queryArg.date,
          lastFm: queryArg.lastFm,
          lastUpdated: queryArg.lastUpdated,
          p: queryArg.p,
          state: queryArg.state,
          stateCode: queryArg.stateCode,
          tourName: queryArg.tourName,
          venueId: queryArg.venueId,
          venueName: queryArg.venueName,
          year: queryArg.year,
        },
      }),
    }),
    get10SearchVenues: build.query<
      Get10SearchVenuesApiResponse,
      Get10SearchVenuesApiArg
    >({
      query: (queryArg) => ({
        url: `/1.0/search/venues`,
        params: {
          cityId: queryArg.cityId,
          cityName: queryArg.cityName,
          country: queryArg.country,
          name: queryArg.name,
          p: queryArg.p,
          state: queryArg.state,
          stateCode: queryArg.stateCode,
        },
      }),
    }),
    get10SetlistVersionByVersionId: build.query<
      Get10SetlistVersionByVersionIdApiResponse,
      Get10SetlistVersionByVersionIdApiArg
    >({
      query: (queryArg) => ({
        url: `/1.0/setlist/version/${queryArg.versionId}`,
      }),
    }),
    get10SetlistBySetlistId: build.query<
      Get10SetlistBySetlistIdApiResponse,
      Get10SetlistBySetlistIdApiArg
    >({
      query: (queryArg) => ({ url: `/1.0/setlist/${queryArg.setlistId}` }),
    }),
    get10UserByUserId: build.query<
      Get10UserByUserIdApiResponse,
      Get10UserByUserIdApiArg
    >({
      query: (queryArg) => ({ url: `/1.0/user/${queryArg.userId}` }),
    }),
    get10UserByUserIdAttended: build.query<
      Get10UserByUserIdAttendedApiResponse,
      Get10UserByUserIdAttendedApiArg
    >({
      query: (queryArg) => ({
        url: `/1.0/user/${queryArg.userId}/attended`,
        params: { p: queryArg.p },
      }),
    }),
    get10UserByUserIdEdited: build.query<
      Get10UserByUserIdEditedApiResponse,
      Get10UserByUserIdEditedApiArg
    >({
      query: (queryArg) => ({
        url: `/1.0/user/${queryArg.userId}/edited`,
        params: { p: queryArg.p },
      }),
    }),
    get10VenueByVenueId: build.query<
      Get10VenueByVenueIdApiResponse,
      Get10VenueByVenueIdApiArg
    >({
      query: (queryArg) => ({ url: `/1.0/venue/${queryArg.venueId}` }),
    }),
    get10VenueByVenueIdSetlists: build.query<
      Get10VenueByVenueIdSetlistsApiResponse,
      Get10VenueByVenueIdSetlistsApiArg
    >({
      query: (queryArg) => ({
        url: `/1.0/venue/${queryArg.venueId}/setlists`,
        params: { p: queryArg.p },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as setlistFmApi };
export type Get10ArtistByMbidApiResponse = /** status 200 Success */ Artist;
export type Get10ArtistByMbidApiArg = {
  /** a Musicbrainz MBID, e.g. 0bfba3d3-6a04-4779-bb0a-df07df5b0558 */
  mbid: string;
};
export type Get10ArtistByMbidSetlistsApiResponse =
  /** status 200 Success */ Setlists;
export type Get10ArtistByMbidSetlistsApiArg = {
  /** the Musicbrainz MBID of the artist */
  mbid: string;
  /** the number of the result page */
  p?: number;
};
export type Get10CityByGeoIdApiResponse = /** status 200 Success */ City;
export type Get10CityByGeoIdApiArg = {
  /** the city's geoId */
  geoId: string;
};
export type Get10SearchArtistsApiResponse = /** status 200 Success */ Artists;
export type Get10SearchArtistsApiArg = {
  /** the artist's Musicbrainz Identifier (mbid) */
  artistMbid?: string;
  /** the artist's name */
  artistName?: string;
  /** the artist's Ticketmaster Identifier (tmid) */
  artistTmid?: number;
  /** the number of the result page you'd like to have */
  p?: number;
  /** the sort of the result, either sortName (default) or relevance */
  sort?: string;
};
export type Get10SearchCitiesApiResponse = /** status 200 Success */ Cities;
export type Get10SearchCitiesApiArg = {
  /** the city's country */
  country?: string;
  /** name of the city */
  name?: string;
  /** the number of the result page you'd like to have */
  p?: number;
  /** state the city lies in */
  state?: string;
  /** state code the city lies in */
  stateCode?: string;
};
export type Get10SearchCountriesApiResponse =
  /** status 200 Success */ Countries;
export type Get10SearchCountriesApiArg = void;
export type Get10SearchSetlistsApiResponse = /** status 200 Success */ Setlists;
export type Get10SearchSetlistsApiArg = {
  /** the artist's Musicbrainz Identifier (mbid) */
  artistMbid?: string;
  /** the artist's name */
  artistName?: string;
  /** the artist's Ticketmaster Identifier (tmid) */
  artistTmid?: number;
  /** the city's geoId */
  cityId?: string;
  /** the name of the city */
  cityName?: string;
  /** the country code */
  countryCode?: string;
  /** the date of the event (format dd-MM-yyyy) */
  date?: string;
  /** the event's Last.fm Event ID (deprecated) */
  lastFm?: number;
  /** the date and time (UTC) when this setlist was last updated (format yyyyMMddHHmmss) - either edited or
    reverted. search will return setlists that were updated on or after this date */
  lastUpdated?: string;
  /** the number of the result page */
  p?: number;
  /** the state */
  state?: string;
  /** the state code */
  stateCode?: string;
  tourName?: string;
  /** the venue id */
  venueId?: string;
  /** the name of the venue */
  venueName?: string;
  /** the year of the event */
  year?: string;
};
export type Get10SearchVenuesApiResponse = /** status 200 Success */ Venues;
export type Get10SearchVenuesApiArg = {
  /** the city's geoId */
  cityId?: string;
  /** name of the city where the venue is located */
  cityName?: string;
  /** the city's country */
  country?: string;
  /** name of the venue */
  name?: string;
  /** the number of the result page you'd like to have */
  p?: number;
  /** the city's state */
  state?: string;
  /** the city's state code */
  stateCode?: string;
};
export type Get10SetlistVersionByVersionIdApiResponse =
  /** status 200 Success */ Setlist;
export type Get10SetlistVersionByVersionIdApiArg = {
  /** the version id */
  versionId: string;
};
export type Get10SetlistBySetlistIdApiResponse =
  /** status 200 Success */ Setlist;
export type Get10SetlistBySetlistIdApiArg = {
  /** the setlist id */
  setlistId: string;
};
export type Get10UserByUserIdApiResponse = /** status 200 Success */ User;
export type Get10UserByUserIdApiArg = {
  /** the user's userId */
  userId: string;
};
export type Get10UserByUserIdAttendedApiResponse =
  /** status 200 Success */ Setlists;
export type Get10UserByUserIdAttendedApiArg = {
  /** the user's userId */
  userId: string;
  /** the number of the result page */
  p?: number;
};
export type Get10UserByUserIdEditedApiResponse =
  /** status 200 Success */ Setlists;
export type Get10UserByUserIdEditedApiArg = {
  /** the user's userId */
  userId: string;
  /** the number of the result page */
  p?: number;
};
export type Get10VenueByVenueIdApiResponse = /** status 200 Success */ Venue;
export type Get10VenueByVenueIdApiArg = {
  /** the venue's id */
  venueId: string;
};
export type Get10VenueByVenueIdSetlistsApiResponse =
  /** status 200 Success */ Setlists;
export type Get10VenueByVenueIdSetlistsApiArg = {
  /** the id of the venue */
  venueId: string;
  /** the number of the result page */
  p?: number;
};
export type Artist = {
  mbid?: string;
  tmid?: number;
  name?: string;
  sortName?: string;
  disambiguation?: string;
  url?: string;
};
export type Coords = {
  long?: number;
  lat?: number;
};
export type Country = {
  code?: string;
  name?: string;
};
export type City = {
  id?: string;
  name?: string;
  stateCode?: string;
  state?: string;
  coords?: Coords;
  country?: Country;
};
export type Venue = {
  city?: City;
  url?: string;
  id?: string;
  name?: string;
};
export type Tour = {
  name?: string;
};
export type Song = {
  name?: string;
  with?: Artist;
  cover?: Artist;
  info?: string;
  tape?: boolean;
};
export type Set = {
  name?: string;
  encore?: number;
  song?: Song[];
};
export type Setlist = {
  artist?: Artist;
  venue?: Venue;
  tour?: Tour;
  set?: Set[];
  info?: string;
  url?: string;
  id?: string;
  versionId?: string;
  lastFmEventId?: number;
  eventDate?: string;
  lastUpdated?: string;
};
export type Setlists = {
  setlist?: Setlist[];
  total?: number;
  page?: number;
  itemsPerPage?: number;
};
export type Artists = {
  artist?: Artist[];
  total?: number;
  page?: number;
  itemsPerPage?: number;
};
export type Cities = {
  cities?: City[];
  total?: number;
  page?: number;
  itemsPerPage?: number;
};
export type Countries = {
  country?: Country[];
  total?: number;
  page?: number;
  itemsPerPage?: number;
};
export type Venues = {
  venue?: Venue[];
  total?: number;
  page?: number;
  itemsPerPage?: number;
};
export type User = {
  userId?: string;
  fullname?: string;
  lastFm?: string;
  mySpace?: string;
  twitter?: string;
  flickr?: string;
  website?: string;
  about?: string;
  url?: string;
};
export const {
  useGet10ArtistByMbidQuery,
  useGet10ArtistByMbidSetlistsQuery,
  useGet10CityByGeoIdQuery,
  useGet10SearchArtistsQuery,
  useGet10SearchCitiesQuery,
  useGet10SearchCountriesQuery,
  useGet10SearchSetlistsQuery,
  useGet10SearchVenuesQuery,
  useGet10SetlistVersionByVersionIdQuery,
  useGet10SetlistBySetlistIdQuery,
  useGet10UserByUserIdQuery,
  useGet10UserByUserIdAttendedQuery,
  useGet10UserByUserIdEditedQuery,
  useGet10VenueByVenueIdQuery,
  useGet10VenueByVenueIdSetlistsQuery,
} = injectedRtkApi;

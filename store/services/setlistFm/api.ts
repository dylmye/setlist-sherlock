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
        params: {
          p: queryArg.p,
        },
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
        params: {
          p: queryArg.p,
        },
      }),
    }),
    get10UserByUserIdEdited: build.query<
      Get10UserByUserIdEditedApiResponse,
      Get10UserByUserIdEditedApiArg
    >({
      query: (queryArg) => ({
        url: `/1.0/user/${queryArg.userId}/edited`,
        params: {
          p: queryArg.p,
        },
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
        params: {
          p: queryArg.p,
        },
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
  /** the artist's Ticketmaster Identifier (tmid) (deprecated) */
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
  /** the artist's Ticketmaster Identifier (tmid) (deprecated) */
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
  /** unique Musicbrainz Identifier (MBID), e.g. <em>&quot;b10bbbfc-cf9e-42e0-be17-e2c3e1d2600d&quot;</em> */
  mbid?: string;
  /** unique Ticket Master Identifier (TMID), e.g. <em>735610</em> (deprecated) */
  tmid?: number;
  /** the artist's name, e.g. <em>&quot;The Beatles&quot;</em> */
  name?: string;
  /** the artist's sort name, e.g. <em>&quot;Beatles, The&quot;</em> or <em>&quot;Springsteen, Bruce&quot;</em> */
  sortName?: string;
  /** disambiguation to distinguish between artists with same names */
  disambiguation?: string;
  /** the attribution url */
  url?: string;
};
export type Coords = {
  /** The longitude part of the coordinates. */
  long?: number;
  /** The latitude part of the coordinates. */
  lat?: number;
};
export type Country = {
  /** The country's <a href= "http://www.iso.org/iso/english_country_names_and_code_elements" >ISO code</a>. E.g.
    <em>&quot;ie&quot;</em> for Ireland */
  code?: string;
  /** The country's name. Can be a localized name - e.g. <em>&quot;Austria&quot;</em> or
    <em>&quot;&Ouml;sterreich&quot;</em> for Austria if the German name was requested. */
  name?: string;
};
export type City = {
  /** unique identifier */
  id?: string;
  /** the city's name, depending on the language valid values are e.g. <em>&quot;M&uuml;chen&quot;</em> or
    <em>Munich</em> */
  name?: string;
  /** The code of the city's state. For most countries this is a two-digit numeric code, with which the state can be
    identified uniquely in the specific Country. The code can also be a String for other cities. Valid
    examples are <em>&quot;CA&quot;</em> or <em>&quot;02&quot;</em>
    
    which in turn get uniquely identifiable when combined with the state's country:
    
    <em>&quot;US.CA&quot;</em> for California, United States or <em>&quot;DE.02&quot;</em> for Bavaria, Germany
    
    For a complete list of available states (that aren't necessarily used in this database) is available in
    <a href= "http://download.geonames.org/export/dump/admin1CodesASCII.txt">a textfile on geonames.org</a>.
    
    Note that this code is only unique combined with the city's Country. The code alone is
    <strong>not</strong> unique. */
  stateCode?: string;
  /** The name of city's state, e.g. <em>&quot;Bavaria&quot;</em> or <em>&quot;Florida&quot;</em> */
  state?: string;
  coords?: Coords;
  country?: Country;
};
export type Venue = {
  city?: City;
  /** the attribution url */
  url?: string;
  /** unique identifier */
  id?: string;
  /** the name of the venue, usually without city and country. E.g. <em>&quot;Madison Square Garden&quot;</em> or
    <em>&quot;Royal Albert Hall&quot;</em> */
  name?: string;
};
export type Tour = {
  /** The name of the tour. */
  name?: string;
};
export type Song = {
  /** The name of the song. E.g. <em>Yesterday</em> or <em>&quot;Wish You Were Here&quot;</em> */
  name?: string;
  with?: Artist;
  cover?: Artist;
  /** Special incidents or additional information about the way the song was performed at this specific concert. See
    the <a href="https://www.setlist.fm/guidelines">setlist.fm guidelines</a> for a complete list of allowed content. */
  info?: string;
  /** The song came from tape rather than being performed live. See the
    <a href="https://www.setlist.fm/guidelines#tape-songs">tape section of the guidelines</a> for valid usage. */
  tape?: boolean;
};
export type Set = {
  /** the description/name of the set. E.g. <em>&quot;Acoustic set&quot;</em> or <em>&quot;Paul McCartney
    solo&quot;</em> */
  name?: string;
  /** if the set is an encore, this is the number of the encore, starting with 1 for the first encore, 2 for the second
    and so on. */
  encore?: number;
  /** this set's songs */
  song?: Song[];
};
export type Setlist = {
  artist?: Artist;
  venue?: Venue;
  tour?: Tour;
  /** all sets of this setlist */
  set?: Set[];
  /** additional information on the concert - see the <a href="https://www.setlist.fm/guidelines">setlist.fm
    guidelines</a> for a complete list of allowed content. */
  info?: string;
  /** the attribution url to which you have to link to wherever you use data from this setlist in your application */
  url?: string;
  /** unique identifier */
  id?: string;
  /** unique identifier of the version */
  versionId?: string;
  /** the id this event has on <a href="http://last.fm/">last.fm</a> (deprecated) */
  lastFmEventId?: number;
  /** date of the concert in the format &quot;dd-MM-yyyy&quot; */
  eventDate?: string;
  /** date, time and time zone of the last update to this setlist in the format
    &quot;yyyy-MM-dd'T'HH:mm:ss.SSSZZZZZ&quot; */
  lastUpdated?: string;
};
export type Setlists = {
  /** result list of setlists */
  setlist?: Setlist[];
  /** the total amount of items matching the query */
  total?: number;
  /** the current page. starts at 1 */
  page?: number;
  /** the amount of items you get per page */
  itemsPerPage?: number;
};
export type Artists = {
  /** result list of artists */
  artist?: Artist[];
  /** the total amount of items matching the query */
  total?: number;
  /** the current page. starts at 1 */
  page?: number;
  /** the amount of items you get per page */
  itemsPerPage?: number;
};
export type Cities = {
  /** result list of cities */
  cities?: City[];
  /** the total amount of items matching the query */
  total?: number;
  /** the current page. starts at 1 */
  page?: number;
  /** the amount of items you get per page */
  itemsPerPage?: number;
};
export type Countries = {
  /** result list of countries */
  country?: Country[];
  /** the total amount of items matching the query */
  total?: number;
  /** the current page. starts at 1 */
  page?: number;
  /** the amount of items you get per page */
  itemsPerPage?: number;
};
export type Venues = {
  /** result list of venues */
  venue?: Venue[];
  /** the total amount of items matching the query */
  total?: number;
  /** the current page. starts at 1 */
  page?: number;
  /** the amount of items you get per page */
  itemsPerPage?: number;
};
export type User = {
  userId?: string;
  /** never set (deprecated) */
  fullname?: string;
  /** never set (deprecated) */
  lastFm?: string;
  /** never set (deprecated) */
  mySpace?: string;
  /** never set (deprecated) */
  twitter?: string;
  /** never set (deprecated) */
  flickr?: string;
  /** never set (deprecated) */
  website?: string;
  /** never set (deprecated) */
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

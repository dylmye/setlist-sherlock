import { setlistFmApi as api } from "./api";

/* eslint-disable @typescript-eslint/no-unused-vars */
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    // @TODO  https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#performing-multiple-requests-with-a-single-query
    //        Get Spotify top artists: https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
    //        Then get 1 setlist for each artist (Promise.all)
    //        Then return all 5 (or less)
    // get5TopArtistsLatestSetlist: build.query({
    //   async queryFn(_arg, api, extraOptions, baseQuery) {
    //   },
    // })
  }),
  overrideExisting: false,
});

export * from "./api";

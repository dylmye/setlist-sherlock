import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { setlistFmApi } from "./services/setlistFm";
import { spotifyApi } from "./services/spotify";
import { appleMusicApi } from "./services/appleMusic";
import { savedSlice } from "./saved/slice";

export const store = configureStore({
  reducer: {
    [setlistFmApi.reducerPath]: setlistFmApi.reducer,
    [spotifyApi.reducerPath]: spotifyApi.reducer,
    [appleMusicApi.reducerPath]: appleMusicApi.reducer,
    saved: savedSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(setlistFmApi.middleware)
      .concat(spotifyApi.middleware)
      .concat(appleMusicApi.middleware),
});

setupListeners(store.dispatch);

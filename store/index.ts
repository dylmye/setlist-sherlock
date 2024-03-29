import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { setlistFmApi } from "./services/setlistFm";
import { spotifyApi } from "./services/spotify";

export const store = configureStore({
  reducer: {
    [setlistFmApi.reducerPath]: setlistFmApi.reducer,
    [spotifyApi.reducerPath]: spotifyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(setlistFmApi.middleware)
      .concat(spotifyApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);

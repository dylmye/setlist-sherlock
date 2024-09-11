import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { setlistFmApi } from "./services/setlistFm";
import { spotifyApi } from "./services/spotify";
import { appleMusicApi } from "./services/appleMusic";
import { savedSlice } from "./saved/slice";

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['saved'],
}

const rootReducer = combineReducers({
  [setlistFmApi.reducerPath]: setlistFmApi.reducer,
  [spotifyApi.reducerPath]: spotifyApi.reducer,
  [appleMusicApi.reducerPath]: appleMusicApi.reducer,
  saved: savedSlice.reducer,
});

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(setlistFmApi.middleware)
      .concat(spotifyApi.middleware)
      .concat(appleMusicApi.middleware),
});

setupListeners(store.dispatch);

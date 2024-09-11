import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Setlist } from "../services/setlistFm";
import { parse } from "date-fns";
import { RootState } from "../types";
import { createAppSelector } from "../../hooks/store";

type PartialSetlist = Pick<Setlist, 'id' | 'artist' | 'eventDate' | 'venue'>;

interface SavedState {
  setlists: PartialSetlist[];
  setlistIds: string[];
}

const initialState: SavedState = {
  setlists: [],
  setlistIds: []
}

export const savedSlice = createSlice({
  name: "saved",
  initialState,
  reducers: {
    saveSetlist: (state, action: PayloadAction<PartialSetlist>) => {
      if (state.setlistIds.includes(action.payload.id!)) {
        return;
      }

      state.setlists.push(action.payload);
      state.setlists.sort((a, b) => (parse(b.eventDate!, "d-M-y", new Date()).valueOf() - parse(a.eventDate!, "d-M-y", new Date()).valueOf()));
      state.setlistIds = state.setlists.map(({ id }) => id!);
    },
    unsaveSetlistById: (state, action: PayloadAction<string>) => {
      const indexToRemove = state.setlistIds.findIndex(x => x === action.payload);

      if (indexToRemove === -1) {
        return;
      }

      state.setlistIds.splice(indexToRemove, 1);

      const indexInSetlists = state.setlists.findIndex(({ id }) => id === action?.payload);
      state.setlists.splice(indexInSetlists, 1);
    },
    clearList: (state) => {
      state.setlists = initialState.setlists;
      state.setlistIds = initialState.setlistIds;
    }
  }
});

export const { saveSetlist, clearList, unsaveSetlistById } = savedSlice.actions;

export const selectSavedSetlists = (state: RootState) => state.saved.setlists;
export const selectSetlistIsSaved = createAppSelector(
  [(state) => state.saved.setlistIds, (_, setlistId: string) => setlistId],
  (savedSetlistIds, currentId) => savedSetlistIds.includes(currentId)
);

export default savedSlice.reducer;

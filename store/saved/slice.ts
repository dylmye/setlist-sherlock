import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Setlist } from "../services/setlistFm";
import { parse } from "date-fns";
import { RootState } from "../types";

type PartialSetlist = Pick<Setlist, 'id' | 'artist' | 'eventDate'>;

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
    addSetlist: (state, action: PayloadAction<PartialSetlist>) => {
      if (state.setlistIds.includes(action.payload.id!)) {
        return;
      }

      state.setlists.push(action.payload);
      state.setlists.sort((a, b) => (parse(b.eventDate!, "d-M-y", new Date()).valueOf() - parse(a.eventDate!, "d-M-y", new Date()).valueOf()));
      state.setlistIds = state.setlists.map(({ id }) => id!);
    },
    removeSetlistById: (state, action: PayloadAction<string>) => {
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

export const { addSetlist, clearList, removeSetlistById } = savedSlice.actions;

export const selectSavedSetlists = (state: RootState) => state.saved.setlists;

export default savedSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Setlist } from "../services/setlistFm";
import { parse } from "date-fns";

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

      let newSetlists = [...state.setlists];
      newSetlists.push(action.payload);
      // newSetlists.sort((x, y) => parse(x.eventDate, "d-M-y")) @TODO
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

export default savedSlice.reducer;

import { createSelector } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

import type { RootState, AppDispatch } from "../store/types";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const createAppSelector = createSelector.withTypes<RootState>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

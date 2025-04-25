import { RootState } from "../store";

export const selectWords = (state: RootState) => state.home.words;
export const selectWordLoading = (state: RootState) => state.home.loadingRandom;
export const selectWordError = (state: RootState) => state.home.error;
export const selectCurrentCardIndex = (state: RootState) => state.home.currentCardIndex;

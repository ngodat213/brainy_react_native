import { RootState } from "../store";

export const selectWords = (state: RootState) => state.word.words;
export const selectWordLoading = (state: RootState) => state.word.loading;
export const selectWordError = (state: RootState) => state.word.error;


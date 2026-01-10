import { RootState } from "../store";

export const selectDictionaryWords = (state: RootState) => state.dictionary.words;
export const selectDictionaryWordAll = (state: RootState) => state.dictionary.wordAll;
export const selectDictionaryWordLearning = (state: RootState) => state.dictionary.wordLearning;
export const selectDictionaryWordLearned = (state: RootState) => state.dictionary.wordLearned;
export const selectDictionaryWordSkipped = (state: RootState) => state.dictionary.wordSkipped;
export const selectDictionaryLoading = (state: RootState) => state.dictionary.dictionaryLoading;
export const selectSearchLoading = (state: RootState) => state.dictionary.searchLoading;
export const selectDictionaryError = (state: RootState) => state.dictionary.error;
export const selectDictionaryPage = (state: RootState) => state.dictionary.page;
export const selectDictionaryLimit = (state: RootState) => state.dictionary.limit;
export const selectDictionarySearchError = (state: RootState) => state.dictionary.searchError;
export const selectDictionarySearchLoading = (state: RootState) => state.dictionary.searchLoading;
export const selectDictionarySearch = (state: RootState) => state.dictionary.search;
export const selectDictionaryStatus = (state: RootState) => state.dictionary.statusChange;
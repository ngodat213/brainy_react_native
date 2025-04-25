import { createSlice } from "@reduxjs/toolkit";
import { Word } from "../../../domain/entities/word";
import { fetchRandomWordsThunk } from "./homeThunks";
import { t } from "i18next";
import { WordByStatusDTO, WordDTO } from "../../../data/models/WordDTO";

interface WordState {
  words: Word[];
  allWords: WordDTO | null;
  currentCardIndex: number;
  loadingRandom: boolean;
  error: string | null;
}

const initialState: WordState = {
  words: [],
  allWords: null,
  currentCardIndex: 0,
  loadingRandom: false,
  error: null,
}

const wordSlice = createSlice({
  name: 'word',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loadingRandom = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setLoadingRandom: (state, action) => {
      state.loadingRandom = action.payload;
    },
    setCurrentCardIndex: (state, action) => {
      state.currentCardIndex = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Random Words
    builder.addCase(fetchRandomWordsThunk.pending, (state) => {
      state.loadingRandom = true;
      state.error = null;
    });
    builder.addCase(fetchRandomWordsThunk.fulfilled, (state, action) => {
      state.words = action.payload;
      state.loadingRandom = false;
    });
    builder.addCase(fetchRandomWordsThunk.rejected, (state, action) => {
      state.loadingRandom = false;
      state.error = action.error.message || t('word.failedToFetchRandomWords');
    });
  },
});

export const { setLoading, setError, clearError, setLoadingRandom, setCurrentCardIndex } = wordSlice.actions;
export default wordSlice.reducer;


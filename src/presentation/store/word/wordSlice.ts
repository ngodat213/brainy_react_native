import { createSlice } from "@reduxjs/toolkit";
import { Word } from "../../../domain/entities/word";
import { fetchRandomWordsThunk } from "./wordThunks";
import { t } from "i18next";

interface WordState {
  words: Word[];
  loading: boolean;
  error: string | null;
}

const initialState: WordState = {
  words: [],
  loading: false,
  error: null,
}

const wordSlice = createSlice({
  name: 'word',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRandomWordsThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchRandomWordsThunk.fulfilled, (state, action) => {
      state.words = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchRandomWordsThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || t('home.failedToFetchRandomWords');
    });
  },
});

export default wordSlice.reducer;


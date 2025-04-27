import { createSlice } from "@reduxjs/toolkit";
import { Category } from "../../../domain/entities/category";
import { fetchGrammar } from "./grammarThunks";

export interface GrammarState {
  grammar: Category[];
  isLoading: boolean;
  error: string | null;
}

const initialState: GrammarState = {
  grammar: [],
  isLoading: false,
  error: null,
};

export const grammarSlice = createSlice({
  name: 'grammar',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGrammar.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchGrammar.fulfilled, (state, action) => {
      state.isLoading = false;
      state.grammar = action.payload.categories;
    });
    builder.addCase(fetchGrammar.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to fetch grammar';
    });
  },
});

export default grammarSlice.reducer;
  
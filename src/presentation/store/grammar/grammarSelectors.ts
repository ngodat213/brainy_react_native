import { RootState } from "../store";

export const selectGrammar = (state: RootState) => state.grammar.grammar;
export const selectGrammarLoading = (state: RootState) => state.grammar.isLoading;
export const selectGrammarError = (state: RootState) => state.grammar.error;

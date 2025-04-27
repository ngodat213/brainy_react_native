import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetAllGrammarParams } from "../../../domain/usecases/grammar/getAllGrammarUseCase";
import { GetAllGrammarUseCase } from "../../../domain/usecases/grammar/getAllGrammarUseCase";
import { GrammarRepository } from "../../../domain/repositories/grammarRepository";

const grammarRepository = new GrammarRepository();
const getAllGrammarUseCase = new GetAllGrammarUseCase(grammarRepository);

export const fetchGrammar = createAsyncThunk(
  'grammar/fetchGrammar',
  async (params: GetAllGrammarParams, {rejectWithValue}) => {
    try {
      const response = await getAllGrammarUseCase.execute(params);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
import { createAsyncThunk } from "@reduxjs/toolkit";
import { WordRepository } from "../../../domain/repositories/wordRepository";
import { RandomWordParams, RandomWordUseCase } from "../../../domain/usecases/word/randomWordUseCase";

// Initialize repository
const wordRepository = new WordRepository();

// Initialize use cases
const randomWordUseCase = new RandomWordUseCase(wordRepository);

export const fetchRandomWordsThunk = createAsyncThunk(
  'word/fetchRandomWords',
  async (params: RandomWordParams, { rejectWithValue }) => {
    try {
      return await randomWordUseCase.execute(params);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
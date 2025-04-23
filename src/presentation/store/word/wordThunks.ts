import { createAsyncThunk } from "@reduxjs/toolkit";
import { WordRepository } from "../../../domain/repositories/wordRepository";
import { RandomWordParams } from "../../../domain/usecases/word/randomWordUseCase";

export const fetchRandomWordsThunk = createAsyncThunk(
  'home/fetchRandomWords',
  async (credentials: RandomWordParams, { rejectWithValue }) => {
    try {
      const wordRepository = new WordRepository();
      const response = await wordRepository.getRandomWords(credentials);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

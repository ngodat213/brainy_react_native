import {createAsyncThunk} from '@reduxjs/toolkit';
import {WordRepository} from '../../../domain/repositories/wordRepository';
import {
  GetAllWordParams,
  GetAllWordUseCase,
} from '../../../domain/usecases/word/getAllWordUseCase';
import {
  GetWordByStatusParams,
  GetWordByStatusUseCase,
} from '../../../domain/usecases/word/getWordByStatusUseCase';
import { SearchWordUseCase } from '../../../domain/usecases/word/searchWordUseCase';

// Initialize repository
const wordRepository = new WordRepository();

// Initialize use cases
const getAllWordUseCase = new GetAllWordUseCase(wordRepository);
const getWordByStatusUseCase = new GetWordByStatusUseCase(wordRepository);
const searchWordUseCase = new SearchWordUseCase(wordRepository);

export const fetchAllWordsThunk = createAsyncThunk(
  'word/fetchAllWords',
  async (params: GetAllWordParams, {rejectWithValue}) => {
    try {
      return await getAllWordUseCase.execute(params);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchWordsByStatusThunk = createAsyncThunk(
  'word/fetchWordsByStatus',
  async (params: GetWordByStatusParams, {rejectWithValue}) => {
    try {
      return await getWordByStatusUseCase.execute(params);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const searchWordsThunk = createAsyncThunk(
  'word/searchWords',
  async (params: string, {rejectWithValue}) => {
    try {
      return await searchWordUseCase.execute(params);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
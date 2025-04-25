import {createSlice} from '@reduxjs/toolkit';
import {Word} from '../../../domain/entities/word';
import {t} from 'i18next';
import {WordByStatusDTO, WordDTO} from '../../../data/models/WordDTO';
import {fetchAllWordsThunk, fetchWordsByStatusThunk, searchWordsThunk} from './dictionaryThunks';
import {
  LIMIT_WORD_DEFAULT,
  PAGE_DEFAULT,
} from '../../../core/constants/constants';
import {LearningStatus} from '../../../domain/enums/searchStautsEnum';

interface DictionaryState {
  words: Word[];
  wordAll: WordDTO | null;
  wordLearning: WordByStatusDTO | null;
  wordLearned: WordByStatusDTO | null;
  statusChange: LearningStatus;
  wordSkipped: WordByStatusDTO | null;
  page: number;
  limit: number;
  vocabTotal: number;
  learnTotal: number;
  skipTotal: number;
  learnedTotal: number;
  dictionaryLoading: boolean;
  search: string;
  searchLoading: boolean;
  searchError: string | null;
  error: string | null;
}

const initialState: DictionaryState = {
  words: [],
  wordAll: null,
  wordLearning: null,
  wordLearned: null,
  statusChange: LearningStatus.All,
  wordSkipped: null,
  page: PAGE_DEFAULT,
  limit: LIMIT_WORD_DEFAULT,
  vocabTotal: 0,
  learnTotal: 0,
  skipTotal: 0,
  learnedTotal: 0,
  dictionaryLoading: false,
  searchLoading: false,
  search: '',
  searchError: null,
  error: null,
};

const dictionarySlice = createSlice({
  name: 'dictionary',
  initialState,
  reducers: {
    setDictionaryLoading: (state, action) => {
      state.dictionaryLoading = action.payload;
    },
    setDictionaryError: (state, action) => {
      state.error = action.payload;
    },
    clearDictionaryError: state => {
      state.error = null;
    },
    setLoadingSearch: (state, action) => {
      state.searchLoading = action.payload;
    },
    clearSearch: state => {
      state.search = '';
      state.words = state.wordAll?.items || [];
    },
    setStatusChange: (state, action) => {
      state.statusChange = action.payload;
      if (action.payload === LearningStatus.All) {
        state.words = state.wordAll?.items || [];
      } else if (action.payload === LearningStatus.Learning) {
        state.words = state.wordLearning?.learn.items || [];
      } else if (action.payload === LearningStatus.Learned) {
        state.words = state.wordLearned?.learn.items || [];
      } else if (action.payload === LearningStatus.Skipped) {
        state.words = state.wordSkipped?.learn.items || [];
      }
    },
    setWord: (state, action) => {
      state.words = action.payload;
    },
    setVocabTotal: (state, action) => {
      state.vocabTotal = action.payload;
    },
    setLearnTotal: (state, action) => {
      state.learnTotal = action.payload;
    },
    setSkipTotal: (state, action) => {
      state.skipTotal = action.payload;
    },
    setLearnedTotal: (state, action) => {
      state.learnedTotal = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: builder => {
    // All Words
    builder.addCase(fetchAllWordsThunk.pending, state => {
      state.dictionaryLoading = true;
      state.error = null;
    });
    builder.addCase(fetchAllWordsThunk.fulfilled, (state, action) => {
      state.wordAll = action.payload;
      state.words = action.payload.items;
      state.vocabTotal = action.payload.total;
      state.dictionaryLoading = false;
    });
    builder.addCase(fetchAllWordsThunk.rejected, (state, action) => {
      state.dictionaryLoading = false;
      state.error = action.error.message || t('word.failedToFetchAllWords');
    });

    // Words By Status
    builder.addCase(fetchWordsByStatusThunk.pending, state => {
      state.dictionaryLoading = true;
      state.error = null;
    });
    builder.addCase(fetchWordsByStatusThunk.fulfilled, (state, action) => {
      state.dictionaryLoading = false;
      if (action.meta.arg.status === LearningStatus.Learned) {
        state.wordLearned = action.payload;
      } else if (action.meta.arg.status === LearningStatus.Learning) {
        state.wordLearning = action.payload;
      } else if (action.meta.arg.status === LearningStatus.Skipped) {
        state.wordSkipped = action.payload;
      }
    });
    builder.addCase(fetchWordsByStatusThunk.rejected, (state, action) => {
      state.dictionaryLoading = false;
      state.error =
        action.error.message || t('word.failedToFetchWordsByStatus');
    });

    // Search Words
    builder.addCase(searchWordsThunk.pending, state => {
      state.searchLoading = true;
      state.error = null;
    });
    builder.addCase(searchWordsThunk.fulfilled, (state, action) => {
      state.searchLoading = false;
      state.search = action.meta.arg;
      if (action.meta.arg === '') {
        state.words = state.wordAll?.items || [];
      } else {
        state.words = action.payload;
      }
    });
    builder.addCase(searchWordsThunk.rejected, (state, action) => {
      state.searchLoading = false;
      state.searchError = action.error.message || t('word.failedToSearchWords');
    });
  },
});

export const {
  setDictionaryLoading,
  setDictionaryError,
  clearDictionaryError,
  setLoadingSearch,
  setWord,
  setStatusChange,
  clearSearch,
} = dictionarySlice.actions;
export default dictionarySlice.reducer;

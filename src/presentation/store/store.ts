import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import wordReducer from './word/wordSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    word: wordReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
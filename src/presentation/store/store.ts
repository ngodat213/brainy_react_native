import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import homeReducer from './home/homeSlice'
import dictionaryReducer from './dictionary/dictionarySlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    home: homeReducer,
    dictionary: dictionaryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
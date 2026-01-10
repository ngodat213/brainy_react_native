import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../../domain/entities/user";
import { loginThunk, registerThunk } from "./authThunks";
import { t } from "i18next";

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  username: string | null
  password: string | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  username: 'ngodat213',
  password: 'Code26102003',
  loading: false,
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true
      state.error = null
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true
      state.user = action.payload
      state.loading = false
      state.error = null
    },
    setUsername: (state, action) => {
      state.username = action.payload
    },
    setPassword: (state, action) => {
      state.password = action.payload
    },
    loginFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      state.error = null
    },
    clearError: (state) => {
      state.error = null
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state) => {
      state.loading = true
    })
    builder.addCase(loginThunk.fulfilled, (state, action) => {  
      state.user = action.payload.user
      state.loading = false
    })
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.error = action.error.message || t('auth.loginFailed')
      state.loading = false
    })
    builder.addCase(registerThunk.pending, (state) => {
      state.loading = true
    })
    builder.addCase(registerThunk.fulfilled, (state, action) => {
      state.loading = false
    })
    builder.addCase(registerThunk.rejected, (state, action) => {
      state.error = action.error.message || t('auth.registerFailed')
      state.loading = false
    })
  } 
})

export const { clearError, setLoading, setUsername, setPassword } = authSlice.actions
export default authSlice.reducer
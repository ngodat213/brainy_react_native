import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../../domain/entities/user";
import { loginThunk, registerThunk } from "./authThunks";

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null
  } as AuthState,
  reducers: {
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
      state.error = action.error.message || 'Login failed'
      state.loading = false
    })
    builder.addCase(registerThunk.pending, (state) => {
      state.loading = true
    })
    builder.addCase(registerThunk.fulfilled, (state, action) => {
      state.loading = false
    })
    builder.addCase(registerThunk.rejected, (state, action) => {
      state.error = action.error.message || 'Register failed'
      state.loading = false
    })
  } 
})

export const { clearError, setLoading } = authSlice.actions
export default authSlice.reducer
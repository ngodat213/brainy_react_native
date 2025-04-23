import { createAsyncThunk } from '@reduxjs/toolkit'
import { AuthRepository } from '../../../domain/repositories/authRepository';
import { SignUpParams } from '../../../domain/usecases/auth/signUpUseCase';
import { LoginParams } from '../../../domain/usecases/auth/loginUseCase';
const authRepository = new AuthRepository()

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials: LoginParams, { rejectWithValue }) => {
    try {
      const result = await authRepository.login(credentials)
      return result
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (credentials: SignUpParams, { rejectWithValue }) => {
    try {
      const result = await authRepository.register(credentials)
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authRepository.logout()
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const refreshTokenThunk = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const result = await authRepository.refreshToken()
      return result
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)


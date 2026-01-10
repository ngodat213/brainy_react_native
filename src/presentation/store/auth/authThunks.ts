import { createAsyncThunk } from '@reduxjs/toolkit'
import { AuthRepository } from '../../../domain/repositories/authRepository';
import { SignUpParams, SignUpUseCase } from '../../../domain/usecases/auth/signUpUseCase';
import { LoginParams, LoginUseCase } from '../../../domain/usecases/auth/loginUseCase';

// Initialize repositories
const authRepository = new AuthRepository();

// Initialize use cases
const loginUseCase = new LoginUseCase(authRepository);
const signUpUseCase = new SignUpUseCase(authRepository);

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials: LoginParams, { rejectWithValue }) => {
    try {
      // Use the login use case
      const result = await loginUseCase.execute(credentials);
      return result;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (credentials: SignUpParams, { rejectWithValue }) => {
    try {
      // Use the sign up use case
      const result = await signUpUseCase.execute(credentials);
      return result;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authRepository.logout();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const refreshTokenThunk = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const result = await authRepository.refreshToken();
      return result;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);


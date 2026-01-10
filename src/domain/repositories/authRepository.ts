import { IAuthRepository, LoginResponse } from "../../data/repositories/IAuthRepository";
import EncryptedStorage from 'react-native-encrypted-storage'
import { User } from "../entities/user";
import { LoginResponseDTO } from "../../data/models/UserDTO";
import { apiClient } from "../../core/services/apiService";
import { LoginParams } from '../usecases/auth/LoginUseCase';
import { SignUpParams } from "../usecases/auth/signUpUseCase";
import { t } from "i18next";
import { REFRESH_TOKEN_KEY, TOKEN_KEY } from "../../core/constants/constants";

export class AuthRepository implements IAuthRepository {
  async login(credentials: LoginParams): Promise<LoginResponse> {
    try{
      const response = await apiClient.post<LoginResponseDTO>('/auth/login', credentials)
      await EncryptedStorage.setItem(TOKEN_KEY, response.access_token)
      await EncryptedStorage.setItem(REFRESH_TOKEN_KEY, response.refresh_token)
      return {
        user: response.user,
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
      }
    }catch(error){
      throw new Error(t('auth.loginFailed') + error)
    }
  }

  async register(credentials: SignUpParams): Promise<void> {
    try{
      await apiClient.post('/auth/register', credentials)
    }catch(error){
      throw new Error(t('auth.registerFailed') + error)
    }
  }

  async logout(): Promise<void> {
    try{
      await EncryptedStorage.removeItem(TOKEN_KEY)
      await EncryptedStorage.removeItem(REFRESH_TOKEN_KEY)
    }catch(error){
      throw new Error(t('auth.logoutFailed') + error)
    }
  }

  async refreshToken(): Promise<string> {
    try{
      const token = await EncryptedStorage.getItem(TOKEN_KEY)
      if(!token){
        throw new Error(t('auth.noTokenFound'))
      }
      return token
    }catch(error){
      throw new Error(t('auth.refreshTokenFailed') + error)
    }
  }

  async getCurrentUser(): Promise<User> {
    try{
      const token = await EncryptedStorage.getItem(TOKEN_KEY)
      if(!token){
        throw new Error(t('auth.noTokenFound'))
      }
      const response = await apiClient.get<User>('/auth/me')
      return response
    }catch(error){
      throw new Error(t('auth.getCurrentUserFailed') + error)
    }
  }

  async forgotPassword(email: string): Promise<void> {
    try{
      await apiClient.post('/auth/forgot-password', { email })
    }catch(error){
      throw new Error(t('auth.forgotPasswordFailed') + error)
    }
  }

  async resetPassword(email: string, token: string, newPassword: string): Promise<void> {
    try{
      await apiClient.post('/auth/reset-password', { email, token, newPassword })
    }catch(error){
      throw new Error(t('auth.resetPasswordFailed') + error)
    }
  }
}

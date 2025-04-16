import { IAuthRepository, LoginResponse } from "../../data/repositories/IAuthRepository";
import EncryptedStorage from 'react-native-encrypted-storage'
import { User } from "../entities/user";
import { LoginResponseDTO } from "../../data/models/UserDTO";
import { apiClient } from "../../core/services/apiService";
export class AuthRepository implements IAuthRepository {
  async login(credentials: { username: string; password: string }): Promise<LoginResponse> {
    try{
      const response = await apiClient.post<LoginResponseDTO>('/auth/login', credentials)
      await EncryptedStorage.setItem('token', response.access_token)
      await EncryptedStorage.setItem('refreshToken', response.refresh_token)
      return {
        user: response.user,
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
      }
    }catch(error){
      throw new Error('Login failed ' + error)
    }
  }

  async register(credentials: {fullName: string, username: string, email: string, password: string }): Promise<void> {
    try{
      await apiClient.post('/auth/register', credentials)
    }catch(error){
      throw new Error('Register failed')
    }
  }

  async logout(): Promise<void> {
    try{
      await EncryptedStorage.removeItem('token')
      await EncryptedStorage.removeItem('refreshToken')
    }catch(error){
      throw new Error('Logout failed')
    }
  }

  async refreshToken(): Promise<string> {
    try{
      const token = await EncryptedStorage.getItem('token')
      if(!token){
        throw new Error('No token found')
      }
      return token
    }catch(error){
      throw new Error('Refresh token failed')
    }
  }

  async getCurrentUser(): Promise<User> {
    try{
      const token = await EncryptedStorage.getItem('token')
      if(!token){
        throw new Error('No token found')
      }
      const response = await apiClient.get<User>('/auth/me')
      return response
    }catch(error){
      throw new Error('Get current user failed')
    }
  }

  async forgotPassword(email: string): Promise<void> {
    try{
      await apiClient.post('/auth/forgot-password', { email })
    }catch(error){
      throw new Error('Forgot password failed')
    }
  }

  async resetPassword(email: string, token: string, newPassword: string): Promise<void> {
    try{
      await apiClient.post('/auth/reset-password', { email, token, newPassword })
    }catch(error){
      throw new Error('Reset password failed')
    }
  }
}

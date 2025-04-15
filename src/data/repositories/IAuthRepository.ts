import { User } from "../../domain/entities/user";

export interface LoginResponse {
  user: User
  accessToken: string
  refreshToken: string
}

export interface IAuthRepository {
  login(credentials: { username: string; password: string }): Promise<LoginResponse>
  register(credentials: {fullName: string, username: string, email: string, password: string }): Promise<void>
  logout(): Promise<void>
  refreshToken(): Promise<string>
  getCurrentUser(): Promise<User>
  forgotPassword(email: string): Promise<void>
  resetPassword(email: string, token: string, newPassword: string): Promise<void>
}

import { User } from "../../domain/entities/user";
import { LoginParams } from "../../domain/usecases/auth/loginUseCase";
import { SignUpParams } from "../../domain/usecases/auth/signUpUseCase";

export interface LoginResponse {
  user: User
  accessToken: string
  refreshToken: string
}

export interface IAuthRepository {
  login(credentials: LoginParams): Promise<LoginResponse>
  register(credentials: SignUpParams): Promise<void>
  logout(): Promise<void>
  refreshToken(): Promise<string>
  getCurrentUser(): Promise<User>
  forgotPassword(email: string): Promise<void>
  resetPassword(email: string, token: string, newPassword: string): Promise<void>
}

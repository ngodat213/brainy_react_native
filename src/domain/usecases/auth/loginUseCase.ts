import { LoginResponse } from "../../../data/repositories/IAuthRepository";
import { AuthRepository } from "../../repositories/authRepository";

export class LoginUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(credentials: { username: string; password: string }): Promise<LoginResponse> {
    if (!this.validateEmail(credentials.username)) {
      throw new Error('Invalid email')
    }
    if (!this.validatePassword(credentials.password)) {
      throw new Error('Invalid password')
    }
    return this.authRepository.login(credentials)
  }

  private validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  private validatePassword(password: string): boolean {
    return password.length >= 8
  }
}
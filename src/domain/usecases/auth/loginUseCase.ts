import { LoginResponse } from '../../../data/repositories/IAuthRepository';
import { AuthRepository } from '../../repositories/AuthRepository';

export interface LoginParams {
  username: string;
  password: string;
}

export class LoginUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(params: LoginParams): Promise<LoginResponse> {
    // Validation
    if (!params.username) {
      throw new Error('auth.pleaseEnterUsername');
    }
    if (!params.password) {
      throw new Error('auth.pleaseEnterPassword');
    }

    // Execute login
    return this.authRepository.login(params);
  }
}
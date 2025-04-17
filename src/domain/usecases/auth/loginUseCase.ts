import { LoginResponse } from '../../../data/repositories/IAuthRepository';
import { AuthRepository } from '../../repositories/AuthRepository';
import { t } from 'i18next';

export interface LoginParams {
  username: string;
  password: string;
}

export class LoginUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(params: LoginParams): Promise<LoginResponse> {
    // Validation
    if (!params.username) {
      throw new Error(t('auth.pleaseEnterUsername'));
    }
    if (!params.password) {
      throw new Error(t('auth.pleaseEnterPassword'));
    }

    // Execute login
    return this.authRepository.login(params);
  }
}
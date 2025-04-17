import { t } from "i18next";
import { AuthRepository } from "../../repositories/AuthRepository";

export interface SignUpParams {
  full_name: string;
  username: string;
  password: string;
  email: string;
  confirmPassword: string;
}

export class SignUpUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(params: SignUpParams): Promise<void> {
    if (!params.full_name) {
      throw new Error(t('auth.pleaseEnterFullName'))
    } 
    if (!params.username) {
      throw new Error(t('auth.pleaseEnterUsername'))
    }
    if (!params.password) {
      throw new Error(t('auth.pleaseEnterPassword'))
    }
    if (!params.email) {
      throw new Error(t('auth.pleaseEnterEmail'))
    }

    if (params.password !== params.confirmPassword) {
      throw new Error('auth.passwordNotMatch')
    }
    return this.authRepository.register(params);
  }
}
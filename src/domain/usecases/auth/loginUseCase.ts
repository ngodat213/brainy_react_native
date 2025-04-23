import { LoginResponse } from '../../../data/repositories/IAuthRepository';
import { AuthRepository } from '../../repositories/AuthRepository';
import { LoginValidator } from '../../validators/auth/loginValidator';

export interface LoginParams {
  username: string;
  password: string;
}

export class LoginUseCase {
  private validator: LoginValidator;

  constructor(private authRepository: AuthRepository) {
    this.validator = new LoginValidator();
  }

  async execute(params: LoginParams): Promise<LoginResponse> {
    // Validate Login Params
    const validationResult = this.validator.validate(params);
    if (!validationResult.isValid) {
      throw new Error(validationResult.errors.join(', '));
    }

    // Execute login
    return this.authRepository.login(params);
  }
}
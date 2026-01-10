import { t } from "i18next";
import { AuthRepository } from "../../repositories/AuthRepository";
import { SignUpValidator } from "../../validators/auth/signUpValidator";

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
    // Validate SignUp Params
    const validator = new SignUpValidator();
    const validationResult = validator.validate(params);
    if (!validationResult.isValid) {
      throw new Error(validationResult.errors.join(', '));
    }
    return this.authRepository.register(params);
  }
}
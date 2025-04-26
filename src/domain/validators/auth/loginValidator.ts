import { Validator, ValidationResult } from '../validator';
import { LoginParams } from '../../usecases/auth/loginUseCase';
import { t } from 'i18next';
import { EMAIL_REGEX, DATA_LENGTH_VALID, PASSWORD_REGEX } from '../../../core/constants/constants';

export class LoginValidator implements Validator<LoginParams> {
  validate(data: LoginParams): ValidationResult {
    const errors: string[] = [];
    // Password validation
    if (!data.password) {
      errors.push(t('auth.pleaseEnterPassword'));
    } else if (!this.isValidPassword(data.password)) {
      errors.push(t('auth.invalidPasswordFormat'));
    }

    return {
      isValid: errors.length === DATA_LENGTH_VALID,
      errors
    };
  }

  private isValidPassword(password: string): boolean {
    return PASSWORD_REGEX.test(password);
  }
} 
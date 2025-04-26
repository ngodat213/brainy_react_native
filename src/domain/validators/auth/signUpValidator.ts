import {t} from 'i18next';
import {SignUpParams} from '../../usecases/auth/signUpUseCase';
import {ValidationResult, Validator} from '../validator';
import {
  DATA_LENGTH_VALID,
  EMAIL_REGEX,
  PASSWORD_REGEX,
} from '../../../core/constants/constants';

export class SignUpValidator implements Validator<SignUpParams> {
  validate(data: SignUpParams): ValidationResult {
    const errors: string[] = [];

    if (!data.full_name) {
      errors.push(t('auth.pleaseEnterFullName'));
    }
    if (!data.username) {
      errors.push(t('auth.pleaseEnterUsername'));
    }
    if (!data.password) {
      errors.push(t('auth.pleaseEnterPassword'));
    }
    if (!this.isValidPassword(data.password)) {
      errors.push(t('auth.invalidPasswordFormat'));
    }
    if (!data.email) {
      errors.push(t('auth.pleaseEnterEmail'));
    }
    if (!this.isValidEmail(data.email)) {
      errors.push(t('auth.invalidEmailFormat'));
    }
    if (data.password !== data.confirmPassword) {
      errors.push(t('auth.passwordNotMatch'));
    }

    return {
      isValid: errors.length === DATA_LENGTH_VALID,
      errors,
    };
  }

  private isValidEmail(email: string): boolean {
    return EMAIL_REGEX.test(email);
  }

  private isValidPassword(password: string): boolean {
    return PASSWORD_REGEX.test(password);
  }
}

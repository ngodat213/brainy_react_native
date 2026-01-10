export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface Validator<T> {
  validate(data: T): ValidationResult;
} 
import {t} from 'i18next';
import {RandomWordParams} from '../../usecases/word/randomWordUseCase';
import {ValidationResult, Validator} from '../validator';
import {DATA_LENGTH_VALID, LIMIT_WORD_MAX_VALID, LIMIT_WORD_MIN_VALID} from '../../../core/constants/constants';
export class RandomWordValidator implements Validator<RandomWordParams> {
  validate(params: RandomWordParams): ValidationResult {
    const errors: string[] = [];

    if (params.limit < LIMIT_WORD_MIN_VALID || params.limit > LIMIT_WORD_MAX_VALID) {
      errors.push(t('word.limitInvalid'));
    }

    if (!params.limit) {
      errors.push(t('word.limitRequired'));
    }
    return {isValid: errors.length === DATA_LENGTH_VALID, errors};
  }
}

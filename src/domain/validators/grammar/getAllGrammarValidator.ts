import { t } from "i18next";
import { GetAllGrammarParams } from "../../usecases/grammar/getAllGrammarUseCase";
import { ValidationResult, Validator } from "../validator";
import { DATA_LENGTH_VALID } from "../../../core/constants/constants";



export class GetAllGrammarValidator implements Validator<GetAllGrammarParams> {
  validate(params: GetAllGrammarParams): ValidationResult {
    const errors: string[] = [];

    if (params.with_lessons === undefined) {
      errors.push(t('getAll.with_lessonsInvalid'));
    }

    return { isValid: errors.length === DATA_LENGTH_VALID, errors };
  }
}

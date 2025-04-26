import { t } from "i18next";
import { DATA_LENGTH_VALID } from "../../../core/constants/constants";
import { GetAllWordParams } from "../../usecases/word/getAllWordUseCase";
import { ValidationResult, Validator } from "../validator";

export class GetAllWordValidator implements Validator<GetAllWordParams> {
  validate(params: GetAllWordParams): ValidationResult {
    const errors: string[] = [];

    if (params.page < 1) {
      errors.push(t('getAll.pageInvalid'));
    }

    if (params.limit < 1) {
      errors.push(t('getAll.limitInvalid'));
    }

    return {isValid: errors.length === DATA_LENGTH_VALID, errors};
  }
}

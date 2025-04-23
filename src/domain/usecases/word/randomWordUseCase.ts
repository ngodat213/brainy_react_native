import { Word } from "../../entities/word";
import { WordRepository } from "../../repositories/wordRepository";
import { LIMIT_WORD_MAX_VALID, LIMIT_WORD_MIN_VALID } from "../../../core/constants/constants";
import { t } from "i18next";
import { RandomWordValidator } from "../../validators/word/randomWordValidator";
export interface RandomWordParams {
  limit: number;
}

export class RandomWordUseCase {
  private validator: RandomWordValidator;

  constructor(private wordRepository: WordRepository) {
    this.validator = new RandomWordValidator();
  }

  async execute(params: RandomWordParams): Promise<Word[]> {
    const validationResult = this.validator.validate(params);
    if (!validationResult.isValid) {
      throw new Error(validationResult.errors.join(', '));
    }
    return this.wordRepository.getRandomWords(params);
  }
}
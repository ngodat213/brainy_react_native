import { WordRepository } from "../../repositories/wordRepository";
import { Word } from "../../entities/word";
import { GetAllWordValidator } from "../../validators/word/getAllWordValidator";
import { WordDTO } from "../../../data/models/WordDTO";

export interface GetAllWordParams {
  page: number;
  limit: number;
}

export class GetAllWordUseCase {
  private validator: GetAllWordValidator;
  constructor(private wordRepository: WordRepository) {
    this.validator = new GetAllWordValidator();
  }

  async execute(params: GetAllWordParams): Promise<WordDTO> {
    const validationResult = this.validator.validate(params);
    if (!validationResult.isValid) {
      throw new Error(validationResult.errors.join(', '));
    }
    return this.wordRepository.getWordPagnation(params);
  }
}
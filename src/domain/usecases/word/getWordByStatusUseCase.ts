import { WordRepository } from "../../repositories/wordRepository";
import { GetAllWordValidator } from "../../validators/word/getAllWordValidator";
import { WordByStatusDTO } from "../../../data/models/WordDTO";
import { LearningStatus } from "../../enums/searchStautsEnum";

export interface GetWordByStatusParams {
  page: number;
  limit: number;
  status: LearningStatus;
}

export class GetWordByStatusUseCase {
  private validator: GetAllWordValidator;
  constructor(private wordRepository: WordRepository) {
    this.validator = new GetAllWordValidator();
  }

  async execute(params: GetWordByStatusParams): Promise<WordByStatusDTO> {
    const validationResult = this.validator.validate(params);
    if (!validationResult.isValid) {
      throw new Error(validationResult.errors.join(', '));
    }
    return await this.wordRepository.getWordByStatus(params);
  }
}
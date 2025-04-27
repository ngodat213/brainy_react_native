import {GrammarDTO} from '../../../data/models/GrammarDTO';
import {GrammarRepository} from '../../repositories/grammarRepository';
import {GetAllGrammarValidator} from '../../validators/grammar/getAllGrammarValidator';

export interface GetAllGrammarParams {
  with_lessons: boolean;
}

export class GetAllGrammarUseCase {
  private validator: GetAllGrammarValidator;
  constructor(private grammarRepository: GrammarRepository) {
    this.validator = new GetAllGrammarValidator();
  }

  async execute(params: GetAllGrammarParams): Promise<GrammarDTO> {
    const validationResult = this.validator.validate(params);
    if (!validationResult.isValid) {
      throw new Error(validationResult.errors.join(', '));
    }
    return await this.grammarRepository.getGrammar(params);
  }
}

import { t } from "i18next";
import { apiClient } from "../../core/services/apiService";
import { GrammarDTO } from "../../data/models/GrammarDTO";
import { IGrammarRepository } from "../../data/repositories/IGrammarRepository";
import { GetAllGrammarParams } from "../usecases/grammar/getAllGrammarUseCase";
export class GrammarRepository implements IGrammarRepository {
  async getGrammar(params: GetAllGrammarParams): Promise<GrammarDTO> {
    try {
      const response = await apiClient.get<GrammarDTO>(
        '/categories?with_lessons=' + params.with_lessons,
      );
      return response;
    } catch (error) {
      throw new Error(t('grammar.failedToGetGrammar'));
    }
  }
}
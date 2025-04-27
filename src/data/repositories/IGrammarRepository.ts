import { GrammarDTO } from "../models/GrammarDTO";
import { GetAllGrammarParams } from "../../domain/usecases/grammar/getAllGrammarUseCase";

export interface IGrammarRepository {
  getGrammar(params: GetAllGrammarParams): Promise<GrammarDTO>;
}
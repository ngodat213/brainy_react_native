import { Word } from "../../entities/word";
import { WordRepository } from "../../repositories/wordRepository";

export class SearchWordUseCase {
  constructor(private wordRepository: WordRepository) {}

  async execute(params: string): Promise<Word[]> {
    return this.wordRepository.searchWords(params);
  }
}